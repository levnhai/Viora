import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Types, Connection } from 'mongoose';
import { Wedding, WeddingDocument } from './schemas/wedding.schema';
import {
  WeddingSection,
  WeddingSectionDocument,
} from './schemas/wedding_sections.schema';
import {
  WeddingThemeSetting,
  WeddingThemeSettingDocument,
} from './schemas/wedding_theme_settings.schema';
import {
  Template,
  TemplateDocument,
} from '../templates/schemas/template.schema';
import {
  TemplateSection,
  TemplateSectionDocument,
} from '../templates/schemas/template_sections.schema';
import { User, UserDocument } from '../users/schemas/user.schema';
import { Media, MediaDocument } from '../media/schemas/media.schema';
import { Guest, GuestDocument } from '../guests/schemas/guest.schema';
import {
  Guestbook,
  GuestbookDocument,
} from '../guestbooks/schemas/guestbook.schema';
import { CreateWeddingDto } from './dto/create-wedding.dto';
import { AuthService } from '../auth/auth.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import {
  DEFAULT_THEME_COLORS,
  FALLBACK_THEME_COLOR,
  DEFAULT_PASSWORD,
} from './constants/theme-colors.constant';
import { AppCacheService } from '../cache/cache.service';

@Injectable()
export class WeddingsService {
  constructor(
    @InjectModel(Wedding.name)
    private readonly weddingModel: Model<WeddingDocument>,
    @InjectModel(WeddingSection.name)
    private readonly weddingSectionModel: Model<WeddingSectionDocument>,
    @InjectModel(WeddingThemeSetting.name)
    private readonly weddingThemeSettingModel: Model<WeddingThemeSettingDocument>,
    @InjectModel(Template.name)
    private readonly templateModel: Model<TemplateDocument>,
    @InjectModel(TemplateSection.name)
    private readonly templateSectionModel: Model<TemplateSectionDocument>,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    @InjectModel(Media.name)
    private readonly mediaModel: Model<MediaDocument>,
    @InjectModel(Guest.name)
    private readonly guestModel: Model<GuestDocument>,
    @InjectModel(Guestbook.name)
    private readonly guestbookModel: Model<GuestbookDocument>,
    private readonly authService: AuthService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly cacheService: AppCacheService,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  async findAll(query: any, user: any): Promise<any> {
    const { page = 1, limit = 10, status, search, templateId, source } = query;
    const skip = (Number(page) - 1) * Number(limit);

    // Xây dựng query cơ bản
    const filter: any = { deletedAt: null };

    // Phân quyền: Nếu không phải admin/staff thì chỉ lấy thiệp của chính họ
    if (user.role !== 'admin' && user.role !== 'staff') {
      filter.$or = [
        { ownerId: new Types.ObjectId(user.id) },
        { createdBy: new Types.ObjectId(user.id) },
      ];
    }

    // Lọc theo trạng thái
    if (status) {
      filter.status = status;
    }

    // Lọc theo nguồn thiệp (source)
    if (source) {
      filter.source = source;
    }

    // Lọc theo template
    if (templateId) {
      filter.templateId = new Types.ObjectId(templateId);
    }

    // Tìm kiếm theo tên hoặc mã
    if (search) {
      filter.$or = [
        ...(filter.$or || []),
        { brideName: { $regex: search, $options: 'i' } },
        { groomName: { $regex: search, $options: 'i' } },
        { slug: { $regex: search, $options: 'i' } },
      ];
    }

    // Đếm tổng số
    const total = await this.weddingModel.countDocuments(filter).exec();

    // Lấy dữ liệu, populate templateId để lấy thông tin template
    const items = await this.weddingModel
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .populate('templateId', 'name code thumbnail')
      .exec();

    // Lấy thêm thống kê nhanh cho Admin/User dashboard
    let stats: any = null;
    let topTemplates: any = null;
    if (Number(page) === 1) {
      // Đếm số lượng theo status
      const statsQuery =
        user.role !== 'admin' && user.role !== 'staff'
          ? {
              deletedAt: null,
              $or: [
                { ownerId: new Types.ObjectId(user.id) },
                { createdBy: new Types.ObjectId(user.id) },
              ],
            }
          : { deletedAt: null };

      const allWeddings = await this.weddingModel
        .find(statsQuery, 'status templateId')
        .populate('templateId', 'name code thumbnail')
        .exec();

      stats = {
        total: allWeddings.length,
        published: allWeddings.filter((w) => w.status === 'published').length,
        draft: allWeddings.filter((w) => w.status === 'draft').length,
        hidden: allWeddings.filter((w) => w.status === 'hidden').length,
      };

      // Tính top templates
      const templateCounts: Record<string, any> = {};
      allWeddings.forEach((w) => {
        if (w.templateId && (w.templateId as any)._id) {
          const tId = (w.templateId as any)._id.toString();
          if (!templateCounts[tId]) {
            templateCounts[tId] = {
              template: w.templateId,
              count: 0,
            };
          }
          templateCounts[tId].count += 1;
        }
      });

      topTemplates = Object.values(templateCounts)
        .sort((a: any, b: any) => b.count - a.count)
        .slice(0, 5)
        .map((t: any) => ({
          ...t.template.toObject(),
          count: t.count,
          percentage:
            allWeddings.length > 0
              ? ((t.count / allWeddings.length) * 100).toFixed(1)
              : 0,
        }));
    }

    return {
      items,
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / Number(limit)),
      stats,
      topTemplates,
    };
  }

  async create(
    createDto: CreateWeddingDto,
    userId?: string,
    createdById?: string,
  ): Promise<any> {
    const existing = await this.weddingModel
      .findOne({ slug: createDto.slug, deletedAt: null })
      .exec();
    if (existing) {
      throw new BadRequestException(
        `Mã đường dẫn thiệp (Slug) "${createDto.slug}" đã tồn tại trong hệ thống. Vui lòng chọn đường dẫn khác!`,
      );
    }

    const {
      events,
      timeline,
      galleryImages,
      deletedGalleryImages,
      templateId,
      customerEmail,
      ...restDto
    } = createDto;

    let targetTemplate: TemplateDocument | null = null;
    const numericTemplateId = Number(templateId);
    if (!isNaN(numericTemplateId) && String(templateId).trim() !== '') {
      targetTemplate = await this.templateModel
        .findOne({ id: numericTemplateId, deletedAt: null })
        .exec();
    }
    if (!targetTemplate && templateId) {
      const strId = String(templateId);
      if (Types.ObjectId.isValid(strId)) {
        targetTemplate = await this.templateModel
          .findOne({ _id: strId, deletedAt: null })
          .exec();
      }
      if (!targetTemplate) {
        targetTemplate = await this.templateModel
          .findOne({ code: strId, deletedAt: null })
          .exec();
      }
    }
    if (!targetTemplate) throw new NotFoundException(`Template không hợp lệ`);

    let session: any = null;
    try {
      session = await this.connection.startSession();
      session.startTransaction();
    } catch {
      session = null;
    }

    try {
      let ownerObjectId = userId
        ? new Types.ObjectId(userId)
        : new Types.ObjectId();
      const createdByObjectId = createdById
        ? new Types.ObjectId(createdById)
        : ownerObjectId;
      let credentials: any = null;

      if (customerEmail) {
        let customerUser: any = await this.userModel
          .findOne({
            $or: [{ email: customerEmail }, { username: customerEmail }],
          })
          .session(session)
          .exec();

        if (customerUser) {
          throw new BadRequestException(
            'Email này đã tồn tại trong hệ thống. Vui lòng sử dụng email khác!',
          );
        }

        customerUser = await this.authService.createUser(
          customerEmail,
          DEFAULT_PASSWORD,
          'user',
          createDto.slug,
          createDto.groomName + ' & ' + createDto.brideName,
          '',
          'active',
        );
        credentials = { email: customerEmail, password: DEFAULT_PASSWORD };
        ownerObjectId = customerUser?._id as Types.ObjectId;
      }

      const created = new this.weddingModel({
        ...restDto,
        ownerId: ownerObjectId,
        createdBy: createdByObjectId,
        templateId: targetTemplate._id,
        templateVersion: targetTemplate.version,
        weddingDate: new Date(createDto.weddingDate),
        galleryImages: galleryImages || [],
        source: createDto.source || 'fb',
        status: 'published',
      });
      const saved = await created.save({ session });

      await new this.weddingThemeSettingModel({
        weddingId: saved._id,
        primaryColor:
          DEFAULT_THEME_COLORS[targetTemplate.code] || FALLBACK_THEME_COLOR,
        fontHeading: 'Dancing Script',
        fontBody: 'Inter',
        musicAutoplay: true,
        musicUrl: createDto.musicUrl || '',
        effectType: 'none',
      }).save({ session });

      const tempSections = await this.templateSectionModel
        .find({ templateId: targetTemplate._id })
        .exec();

      let newSections: any[] = [];
      if (tempSections && tempSections.length > 0) {
        newSections = tempSections.map((tSec) => {
          let customSettings = {};
          if (tSec.type === 'timeline' && timeline && timeline.length > 0)
            customSettings = { timeline };
          else if (tSec.type === 'rsvp' && events && events.length > 0)
            customSettings = { events };

          return {
            weddingId: saved._id,
            sectionVersion: 1,
            type: tSec.type,
            enabled: true,
            order: tSec.required ? 1 : 2,
            layout: tSec.defaultLayout,
            settings: customSettings,
          };
        });
      } else {
        newSections = [
          {
            weddingId: saved._id,
            sectionVersion: 1,
            type: 'timeline',
            enabled: true,
            order: 1,
            layout: 'default',
            settings: { timeline: timeline || [] },
          },
          {
            weddingId: saved._id,
            sectionVersion: 1,
            type: 'rsvp',
            enabled: true,
            order: 2,
            layout: 'default',
            settings: { events: events || [] },
          },
        ];
      }

      if (newSections.length > 0)
        await this.weddingSectionModel.insertMany(newSections, { session });

      if (deletedGalleryImages && deletedGalleryImages.length > 0) {
        const mediaToDelete = await this.mediaModel
          .find({ url: { $in: deletedGalleryImages } })
          .session(session)
          .exec();
        for (const m of mediaToDelete) {
          if (
            m.filename &&
            !m.filename.startsWith('gallery_') &&
            !m.filename.startsWith('external_')
          ) {
            this.cloudinaryService
              .deleteFile(m.filename)
              .catch((e) => console.error('Cloudinary delete error:', e));
          }
        }
        await this.mediaModel
          .deleteMany(
            { _id: { $in: mediaToDelete.map((m) => m._id) } },
            { session },
          )
          .exec();
      }

      if (galleryImages && galleryImages.length > 0) {
        const orphans = await this.mediaModel
          .find({ url: { $in: galleryImages } })
          .session(session)
          .exec();
        const orphanUrls = orphans.map((m) => m.url);

        if (orphanUrls.length > 0) {
          await this.mediaModel
            .updateMany(
              { url: { $in: orphanUrls } },
              { $set: { weddingId: saved._id, type: 'gallery' } },
              { session },
            )
            .exec();
        }

        const trulyNewUrls = galleryImages.filter(
          (url) => !orphanUrls.includes(url),
        );
        if (trulyNewUrls.length > 0) {
          const newMediaDocs = trulyNewUrls.map((url: string, idx: number) => ({
            ownerId: ownerObjectId,
            weddingId: saved._id,
            type: 'gallery',
            url: url,
            order: orphanUrls.length + idx,
            size: 0,
          }));
          await this.mediaModel.insertMany(newMediaDocs, { session });
        }
      }

      if (userId) {
        await this.userModel
          .findByIdAndUpdate(userId, { weddingSlug: saved.slug }, { session })
          .exec();
      }

      if (session) await session.commitTransaction();

      // Xóa cache danh sách demo công khai và cache thiệp khi có thiệp mới
      await this.cacheService.del('weddings:public_demos');
      await this.cacheService.del(`wedding:slug:${saved.slug}`);

      const result = await this.findBySlug(saved.slug);
      return { ...result, credentials };
    } catch (err) {
      if (session) await session.abortTransaction();
      throw err;
    } finally {
      if (session) session.endSession();
    }
  }

  // Phục vụ API tương thích ngược cũ GET /weddings/:slug
  async findBySlug(slug: string): Promise<any> {
    const cacheKey = `wedding:slug:${slug}`;
    const cachedData = await this.cacheService.get<any>(cacheKey);
    if (cachedData) {
      const weddingId = cachedData._id || cachedData.id;
      if (weddingId) {
        this.weddingModel
          .findByIdAndUpdate(weddingId, { $inc: { views: 1 } })
          .exec()
          .catch(() => {});
      }
      return cachedData;
    }

    const wedding = await this.weddingModel
      .findOneAndUpdate(
        { slug, deletedAt: null },
        { $inc: { views: 1 } },
        { returnDocument: 'after' },
      )
      .populate('templateId')
      .lean()
      .exec();

    if (!wedding) {
      throw new NotFoundException(`Wedding with slug "${slug}" not found`);
    }

    // Lấy sự kiện và timeline từ wedding_sections
    const sections = await this.weddingSectionModel
      .find({ weddingId: wedding._id })
      .exec();
    const eventSec = sections.find((s) => s.type === 'rsvp'); // events gộp trong RSVP hoặc Event
    const timelineSec = sections.find((s) => s.type === 'timeline');

    const events =
      eventSec && eventSec.settings ? eventSec.settings.events || [] : [];
    const timeline =
      timelineSec && timelineSec.settings
        ? timelineSec.settings.timeline || []
        : [];

    const mediaImages = await this.mediaModel
      .find({ weddingId: wedding._id, type: 'gallery', deletedAt: null })
      .sort({ order: 1 })
      .exec();
    const galleryImages =
      mediaImages.length > 0
        ? mediaImages.map((m) => m.url)
        : wedding.galleryImages || [];

    const themeSettings = await this.weddingThemeSettingModel
      .findOne({ weddingId: wedding._id })
      .lean()
      .exec();

    const templateCode = (wedding.templateId as any)?.code || 'temp_1';

    const result = {
      ...wedding,
      templateId: templateCode,
      themeSettings,
      galleryImages,
      events,
      timeline,
    };

    await this.cacheService.set(cacheKey, result, 300000);
    return result;
  }

  async update(slug: string, updateDto: any): Promise<any> {
    const wedding = await this.weddingModel
      .findOne({ slug, deletedAt: null })
      .exec();
    if (!wedding)
      throw new NotFoundException(`Wedding with slug "${slug}" not found`);

    const {
      events,
      timeline,
      galleryImages,
      deletedGalleryImages,
      templateId,
      customerEmail,
      musicUrl,
      ...restDto
    } = updateDto;

    let targetTemplate: TemplateDocument | null = null;
    if (templateId !== undefined && templateId !== null) {
      const numericTemplateId = Number(templateId);
      if (!isNaN(numericTemplateId) && String(templateId).trim() !== '') {
        targetTemplate = await this.templateModel
          .findOne({ id: numericTemplateId, deletedAt: null })
          .exec();
      }
      if (!targetTemplate) {
        const strId = String(templateId);
        if (Types.ObjectId.isValid(strId)) {
          targetTemplate = await this.templateModel
            .findOne({ _id: strId, deletedAt: null })
            .exec();
        }
        if (!targetTemplate) {
          targetTemplate = await this.templateModel
            .findOne({ code: strId, deletedAt: null })
            .exec();
        }
      }
    }

    let session: any = null;
    try {
      session = await this.connection.startSession();
      session.startTransaction();
    } catch {
      session = null;
    }

    try {
      let credentials: any = null;

      if (customerEmail) {
        let customerUser: any = await this.userModel
          .findOne({
            $or: [{ email: customerEmail }, { username: customerEmail }],
          })
          .session(session)
          .exec();

        if (customerUser) {
          if (
            !wedding.ownerId ||
            wedding.ownerId.toString() !== customerUser._id.toString()
          ) {
            throw new BadRequestException(
              'Email này đã tồn tại trong hệ thống. Vui lòng sử dụng email khác!',
            );
          }
        } else {
          customerUser = await this.authService.createUser(
            customerEmail,
            DEFAULT_PASSWORD,
            'user',
            updateDto.slug,
            updateDto.groomName + ' & ' + updateDto.brideName,
            '',
            'active',
          );
          credentials = { email: customerEmail, password: DEFAULT_PASSWORD };
          wedding.ownerId = customerUser?._id as Types.ObjectId;
        }
      }

      if (targetTemplate) {
        wedding.templateId = targetTemplate._id;
        wedding.templateVersion = targetTemplate.version;
      }

      Object.assign(wedding, restDto);
      if (galleryImages) {
        wedding.galleryImages = galleryImages;
      }
      if (updateDto.weddingDate)
        wedding.weddingDate = new Date(updateDto.weddingDate);
      await wedding.save({ session });

      if (musicUrl !== undefined) {
        const themeSettings = await this.weddingThemeSettingModel
          .findOne({ weddingId: wedding._id })
          .session(session)
          .exec();
        if (themeSettings) {
          themeSettings.musicUrl = musicUrl;
          await themeSettings.save({ session });
        } else {
          await new this.weddingThemeSettingModel({
            weddingId: wedding._id,
            primaryColor: FALLBACK_THEME_COLOR,
            fontHeading: 'Dancing Script',
            fontBody: 'Inter',
            musicAutoplay: true,
            musicUrl: musicUrl,
            effectType: 'none',
          }).save({ session });
        }
      }

      if (events) {
        const eventSec = await this.weddingSectionModel
          .findOne({ weddingId: wedding._id, type: 'rsvp' })
          .session(session)
          .exec();
        if (eventSec) {
          eventSec.settings = { ...eventSec.settings, events };
          eventSec.markModified('settings');
          await eventSec.save({ session });
        } else {
          await new this.weddingSectionModel({
            weddingId: wedding._id,
            sectionVersion: 1,
            type: 'rsvp',
            enabled: true,
            order: 2,
            layout: 'default',
            settings: { events },
          }).save({ session });
        }
      }

      if (timeline) {
        const timelineSec = await this.weddingSectionModel
          .findOne({ weddingId: wedding._id, type: 'timeline' })
          .session(session)
          .exec();
        if (timelineSec) {
          timelineSec.settings = { ...timelineSec.settings, timeline };
          timelineSec.markModified('settings');
          await timelineSec.save({ session });
        } else {
          await new this.weddingSectionModel({
            weddingId: wedding._id,
            sectionVersion: 1,
            type: 'timeline',
            enabled: true,
            order: 1,
            layout: 'default',
            settings: { timeline },
          }).save({ session });
        }
      }

      if (deletedGalleryImages && deletedGalleryImages.length > 0) {
        console.log(
          '--- DEBUG: deletedGalleryImages ---',
          deletedGalleryImages,
        );
        const mediaToDelete = await this.mediaModel
          .find({ url: { $in: deletedGalleryImages } })
          .session(session)
          .exec();

        for (const m of mediaToDelete) {
          if (
            m.filename &&
            !m.filename.startsWith('gallery_') &&
            !m.filename.startsWith('external_')
          ) {
            this.cloudinaryService
              .deleteFile(m.filename)
              .catch((e) => console.error('Cloudinary delete error:', e));
          }
        }

        await this.mediaModel
          .deleteMany(
            { _id: { $in: mediaToDelete.map((m) => m._id) } },
            { session },
          )
          .exec();
      }

      if (galleryImages) {
        const existingMedia = await this.mediaModel
          .find({ weddingId: wedding._id, type: 'gallery', deletedAt: null })
          .session(session)
          .exec();
        const existingUrls = existingMedia.map((m) => m.url);

        const urlsToDelete = existingUrls.filter(
          (url) =>
            !galleryImages.includes(url) &&
            (!deletedGalleryImages || !deletedGalleryImages.includes(url)),
        );
        if (urlsToDelete.length > 0) {
          const mediaToDelete = await this.mediaModel
            .find({
              weddingId: wedding._id,
              type: 'gallery',
              url: { $in: urlsToDelete },
              deletedAt: null,
            })
            .session(session)
            .exec();

          for (const m of mediaToDelete) {
            if (
              m.filename &&
              !m.filename.startsWith('gallery_') &&
              !m.filename.startsWith('external_')
            ) {
              this.cloudinaryService
                .deleteFile(m.filename)
                .catch((e) => console.error('Cloudinary delete error:', e));
            }
          }

          await this.mediaModel
            .deleteMany(
              { _id: { $in: mediaToDelete.map((m) => m._id) } },
              { session },
            )
            .exec();
        }

        const urlsToInsert = galleryImages.filter(
          (url: string) => !existingUrls.includes(url),
        );
        if (urlsToInsert.length > 0) {
          // Link orphan uploads (uploaded via API but no weddingId yet)
          const orphans = await this.mediaModel
            .find({ url: { $in: urlsToInsert } })
            .session(session)
            .exec();
          const orphanUrls = orphans.map((m) => m.url);

          if (orphanUrls.length > 0) {
            await this.mediaModel
              .updateMany(
                { url: { $in: orphanUrls } },
                { $set: { weddingId: wedding._id, type: 'gallery' } },
                { session },
              )
              .exec();
          }

          const trulyNewUrls = urlsToInsert.filter(
            (url) => !orphanUrls.includes(url),
          );
          if (trulyNewUrls.length > 0) {
            const newMediaDocs = trulyNewUrls.map(
              (url: string, idx: number) => ({
                ownerId: wedding.ownerId,
                weddingId: wedding._id,
                type: 'gallery',
                url: url,
                order: existingUrls.length + idx,
                size: 0,
              }),
            );
            await this.mediaModel.insertMany(newMediaDocs, { session });
          }
        }

        const bulkOps = galleryImages.map((url: string, idx: number) => ({
          updateOne: {
            filter: {
              weddingId: wedding._id,
              type: 'gallery',
              url: url,
              deletedAt: null,
            },
            update: { $set: { order: idx } },
          },
        }));
        if (bulkOps.length > 0) {
          await this.mediaModel.bulkWrite(bulkOps, { session });
        }
      }

      if (session) await session.commitTransaction();

      // Invalidate cache khi thông tin thiệp cưới được cập nhật
      await this.cacheService.del(`wedding:render:${slug}`);
      await this.cacheService.del(`wedding:slug:${slug}`);
      await this.cacheService.del('weddings:public_demos');

      const result = await this.findBySlug(slug);
      return { ...result, credentials };
    } catch (err) {
      if (session) await session.abortTransaction();
      throw err;
    } finally {
      if (session) session.endSession();
    }
  }

  // ================= WEDDING RENDER API (OPTIMIZED WITH CACHE) =================
  async getRenderData(slug: string): Promise<any> {
    const cacheKey = `wedding:render:${slug}`;

    // 1. Kiểm tra cache RAM trước
    const cachedData = await this.cacheService.get<any>(cacheKey);
    if (cachedData) {
      // Tăng view bất đồng bộ trong background, không làm chậm response trả về cho khách
      const weddingId = cachedData.wedding?.id || cachedData.wedding?._id;
      if (weddingId) {
        this.weddingModel
          .findByIdAndUpdate(weddingId, { $inc: { views: 1 } })
          .exec()
          .catch(() => {});
      }
      return cachedData;
    }

    // 2. Cache miss: Truy vấn MongoDB
    const wedding = await this.weddingModel
      .findOne({ slug, deletedAt: null })
      .exec();
    if (!wedding) {
      throw new NotFoundException(`Wedding with slug "${slug}" not found`);
    }

    // Tăng lượt xem
    await this.weddingModel
      .findByIdAndUpdate(wedding._id, { $inc: { views: 1 } })
      .exec();

    // Lấy thông tin Template
    const template = await this.templateModel
      .findById(wedding.templateId)
      .exec();

    // Lấy cấu hình Theme Settings
    const themeSettings = await this.weddingThemeSettingModel
      .findOne({ weddingId: wedding._id })
      .exec();

    // Lấy danh sách Sections chưa bị xóa
    const sections = await this.weddingSectionModel
      .find({ weddingId: wedding._id })
      .sort({ order: 1 })
      .exec();

    // Lấy danh sách Media chưa bị xóa
    const media = await this.mediaModel
      .find({ weddingId: wedding._id, deletedAt: null })
      .sort({ order: 1 })
      .exec();

    // Thống kê nhanh khách mời
    const rsvpConfirmedCount = await this.guestModel
      .countDocuments({
        weddingId: wedding._id,
        rsvpStatus: 'confirmed',
        deletedAt: null,
      })
      .exec();

    const renderData = {
      wedding: {
        ...wedding.toObject(),
        id: wedding._id,
        views: wedding.views + 1,
      },
      template: template
        ? {
            code: template.code,
            name: template.name,
          }
        : null,
      themeSettings: themeSettings || {},
      sections: sections || [],
      media: media || [],
      guestStats: {
        rsvpConfirmedCount,
      },
    };

    // 3. Lưu vào Cache 5 phút (300.000 ms) để phục vụ hàng ngàn lượt xem tiếp theo
    await this.cacheService.set(cacheKey, renderData, 300000);

    return renderData;
  }

  async getPublicDemos(): Promise<any> {
    const cacheKey = 'weddings:public_demos';

    // 1. Kiểm tra cache
    const cachedDemos = await this.cacheService.get<any>(cacheKey);
    if (cachedDemos) {
      return cachedDemos;
    }

    // 2. Cache miss: Truy vấn MongoDB
    const demoWeddings = await this.weddingModel
      .find({ source: 'demo', deletedAt: null })
      .populate('templateId', 'code name _id')
      .sort({ createdAt: -1 })
      .exec();

    let result: any[];
    if (!demoWeddings || demoWeddings.length === 0) {
      result = await this.weddingModel
        .find({ deletedAt: null })
        .populate('templateId', 'code name _id')
        .sort({ createdAt: -1 })
        .exec();
    } else {
      result = demoWeddings;
    }

    // 3. Lưu vào Cache 10 phút (600.000 ms)
    await this.cacheService.set(cacheKey, result, 600000);

    return result;
  }
}
