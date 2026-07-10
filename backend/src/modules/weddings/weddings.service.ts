import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
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
  ) {}


  async findAll(query: any, user: any): Promise<any> {
    const { page = 1, limit = 10, status, search, templateId } = query;
    const skip = (Number(page) - 1) * Number(limit);

    // Xây dựng query cơ bản
    const filter: any = { deletedAt: null };

    // Phân quyền: Nếu không phải admin/staff thì chỉ lấy thiệp của chính họ
    if (user.role !== 'admin' && user.role !== 'staff') {
      filter.$or = [
        { ownerId: new Types.ObjectId(user.id) },
        { createdBy: new Types.ObjectId(user.id) }
      ];
    }

    // Lọc theo trạng thái
    if (status) {
      filter.status = status;
    }

    // Lọc theo template
    if (templateId) {
      filter.templateId = new Types.ObjectId(templateId);
    }

    // Tìm kiếm theo tên hoặc mã
    if (search) {
      filter.$or = [
        ...filter.$or || [],
        { brideName: { $regex: search, $options: 'i' } },
        { groomName: { $regex: search, $options: 'i' } },
        { slug: { $regex: search, $options: 'i' } }
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
      const statsQuery = user.role !== 'admin' && user.role !== 'staff' 
        ? { deletedAt: null, $or: [{ ownerId: new Types.ObjectId(user.id) }, { createdBy: new Types.ObjectId(user.id) }] }
        : { deletedAt: null };

      const allWeddings = await this.weddingModel.find(statsQuery, 'status templateId').populate('templateId', 'name code thumbnail').exec();
      
      stats = {
        total: allWeddings.length,
        published: allWeddings.filter(w => w.status === 'published').length,
        draft: allWeddings.filter(w => w.status === 'draft').length,
        hidden: allWeddings.filter(w => w.status === 'hidden').length,
      };

      // Tính top templates
      const templateCounts: Record<string, any> = {};
      allWeddings.forEach(w => {
        if (w.templateId && (w.templateId as any)._id) {
          const tId = (w.templateId as any)._id.toString();
          if (!templateCounts[tId]) {
            templateCounts[tId] = {
              template: w.templateId,
              count: 0
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
          percentage: allWeddings.length > 0 ? ((t.count / allWeddings.length) * 100).toFixed(1) : 0
        }));
    }

    return {
      items,
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / Number(limit)),
      stats,
      topTemplates
    };
  }

  async create(
    createDto: CreateWeddingDto,
    userId?: string,
    createdById?: string,
  ): Promise<any> {
    // Nếu slug đã tồn tại, thực hiện update thay vì báo lỗi duplicate
    const existing = await this.weddingModel
      .findOne({ slug: createDto.slug, deletedAt: null })
      .exec();
    if (existing) {
      return this.update(createDto.slug, createDto);
    }

    const { events, timeline, galleryImages, templateId, customerEmail, ...restDto } =
      createDto;

    // Tìm template tương ứng
    let targetTemplate: TemplateDocument | null = null;
    if (typeof templateId === 'number') {
      targetTemplate = await this.templateModel
        .findOne({ id: templateId, deletedAt: null })
        .exec();
    } else {
      targetTemplate = await this.templateModel
        .findOne({ _id: templateId, deletedAt: null })
        .exec();
    }

    if (!targetTemplate) {
      throw new NotFoundException(`Template không hợp lệ`);
    }

    let ownerObjectId = userId ? new Types.ObjectId(userId) : new Types.ObjectId();
    const createdByObjectId = createdById ? new Types.ObjectId(createdById) : ownerObjectId;
    let credentials: any = null;

    if (customerEmail) {
      // Check if user already exists
      let customerUser: any = await this.userModel.findOne({ email: customerEmail }).exec();
      if (!customerUser) {
        customerUser = await this.userModel.findOne({ username: customerEmail }).exec();
      }
      
      if (customerUser) {
        throw new BadRequestException('Email này đã tồn tại trong hệ thống. Vui lòng sử dụng email khác!');
      }
      
      // Create new user
      const generatedPassword = "cuoi@123"; // default password
      customerUser = await this.authService.createUser(
        customerEmail, // username
        generatedPassword,
        'user',
        createDto.slug,
        createDto.groomName + ' & ' + createDto.brideName, // fullName
        '', // phone
        'active'
      );
      credentials = {
        email: customerEmail,
        password: generatedPassword
      };
      ownerObjectId = customerUser?._id as Types.ObjectId;
    }

    const created = new this.weddingModel({
      ...restDto,
      ownerId: ownerObjectId,
      createdBy: createdByObjectId,
      templateId: targetTemplate._id,
      templateVersion: targetTemplate.version, // Khóa phiên bản template gốc
      weddingDate: new Date(createDto.weddingDate),
      status: 'published',
    });
    const saved = await created.save();

    // 1. Tạo Theme Settings mặc định cho thiệp cưới này
    await new this.weddingThemeSettingModel({
      weddingId: saved._id,
      primaryColor:
        targetTemplate.code === 'rose-gold' || targetTemplate.code === 'love-story'
          ? '#db2777'
          : targetTemplate.code === 'minimal-green'
            ? '#2d5a27'
            : targetTemplate.code === 'eternal-flower'
              ? '#ac81bd'
              : targetTemplate.code === 'black-elegant'
                ? '#1e293b'
                : '#7a5c4f', // classic-white (default)
      fontHeading: 'Dancing Script',
      fontBody: 'Inter',
      musicAutoplay: true,
      musicUrl: '',
      effectType: 'none',
    }).save();

    // 2. Nhân bản template_sections thành wedding_sections
    const tempSections = await this.templateSectionModel
      .find({ templateId: targetTemplate._id })
      .exec();
    for (const tSec of tempSections) {
      let customSettings = {};
      if (tSec.type === 'timeline' && timeline && timeline.length > 0) {
        customSettings = { timeline };
      } else if (tSec.type === 'rsvp' && events && events.length > 0) {
        // Gộp sự kiện cưới vào rsvp/event settings
        customSettings = { events };
      }

      await new this.weddingSectionModel({
        weddingId: saved._id,
        sectionVersion: 1,
        type: tSec.type,
        enabled: true,
        order: tSec.required ? 1 : 2, // Đơn giản hóa thứ tự
        layout: tSec.defaultLayout,
        settings: customSettings,
      }).save();
    }

    // 3. Lưu hình ảnh gallery trong media collection
    if (galleryImages && galleryImages.length > 0) {
      let order = 0;
      for (const imgUrl of galleryImages) {
        await new this.mediaModel({
          ownerId: ownerObjectId,
          weddingId: saved._id,
          type: 'gallery',
          url: imgUrl,
          order: order++,
          size: 0,
        }).save();
      }
    }

    if (userId) {
      await this.userModel
        .findByIdAndUpdate(userId, { weddingSlug: saved.slug })
        .exec();
    }

    const result = await this.findBySlug(saved.slug);
    return {
      ...result,
      credentials
    };
  }

  // Phục vụ API tương thích ngược cũ GET /weddings/:slug
  async findBySlug(slug: string): Promise<any> {
    const wedding = await this.weddingModel
      .findOneAndUpdate(
        { slug, deletedAt: null },
        { $inc: { views: 1 } },
        { returnDocument: 'after' },
      )
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

    // Lấy gallery images từ media collection
    const mediaImages = await this.mediaModel
      .find({ weddingId: wedding._id, type: 'gallery', deletedAt: null })
      .sort({ order: 1 })
      .exec();
    const galleryImages = mediaImages.map((m) => m.url);

    return {
      ...wedding,
      galleryImages,
      events,
      timeline,
    };
  }

  async update(slug: string, updateDto: any): Promise<any> {
    const wedding = await this.weddingModel
      .findOne({ slug, deletedAt: null })
      .exec();
    if (!wedding) {
      throw new NotFoundException(`Wedding with slug "${slug}" not found`);
    }

    const { events, timeline, galleryImages, templateId, customerEmail, ...restDto } = updateDto;

    let credentials: any = null;

    if (customerEmail) {
      // Check if user already exists
      let customerUser: any = await this.userModel.findOne({ email: customerEmail }).exec();
      if (!customerUser) {
        customerUser = await this.userModel.findOne({ username: customerEmail }).exec();
      }
      
      if (customerUser) {
        if (!wedding.ownerId || wedding.ownerId.toString() !== customerUser._id.toString()) {
          throw new BadRequestException('Email này đã tồn tại trong hệ thống. Vui lòng sử dụng email khác!');
        }
        // It's their own email, so we do nothing
      } else {
        // Create new user
        const generatedPassword = "cuoi@123"; // default password
        customerUser = await this.authService.createUser(
          customerEmail, // username
          generatedPassword,
          'user',
          updateDto.slug,
          updateDto.groomName + ' & ' + updateDto.brideName, // fullName
          '', // phone
          'active'
        );
        credentials = {
          email: customerEmail,
          password: generatedPassword
        };
        wedding.ownerId = customerUser?._id as Types.ObjectId;
      }
    }

    // Resolve template if templateId is provided
    if (templateId !== undefined) {
      let targetTemplate: TemplateDocument | null = null;
      if (typeof templateId === 'number') {
        targetTemplate = await this.templateModel
          .findOne({ id: templateId, deletedAt: null })
          .exec();
      } else {
        targetTemplate = await this.templateModel
          .findOne({ _id: templateId, deletedAt: null })
          .exec();
      }
      if (targetTemplate) {
        wedding.templateId = targetTemplate._id;
        wedding.templateVersion = targetTemplate.version;
      }
    }

    // Cập nhật thông tin cơ bản
    Object.assign(wedding, restDto);
    if (updateDto.weddingDate) {
      wedding.weddingDate = new Date(updateDto.weddingDate);
    }
    const saved = await wedding.save();

    // Cập nhật events trong wedding_sections
    if (events) {
      const eventSec = await this.weddingSectionModel
        .findOne({ weddingId: saved._id, type: 'rsvp' })
        .exec();
      if (eventSec) {
        eventSec.settings = { ...eventSec.settings, events };
        eventSec.markModified('settings');
        await eventSec.save();
      }
    }

    // Cập nhật timeline trong wedding_sections
    if (timeline) {
      const timelineSec = await this.weddingSectionModel
        .findOne({ weddingId: saved._id, type: 'timeline' })
        .exec();
      if (timelineSec) {
        timelineSec.settings = { ...timelineSec.settings, timeline };
        timelineSec.markModified('settings');
        await timelineSec.save();
      }
    }

    // Cập nhật gallery images trong media collection
    if (galleryImages) {
      // Soft delete toàn bộ ảnh gallery cũ của wedding này
      await this.mediaModel
        .updateMany(
          { weddingId: saved._id, type: 'gallery', deletedAt: null },
          { deletedAt: new Date() },
        )
        .exec();

      // Thêm ảnh mới
      let order = 0;
      for (const imgUrl of galleryImages) {
        await new this.mediaModel({
          ownerId: saved.ownerId,
          weddingId: saved._id,
          type: 'gallery',
          url: imgUrl,
          order: order++,
          size: 0,
        }).save();
      }
    }

    const result = await this.findBySlug(slug);
    return {
      ...result,
      credentials
    };
  }

  // ================= WEDDING RENDER API (NEW) =================
  async getRenderData(slug: string): Promise<any> {
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

    return {
      wedding: {
        id: wedding._id,
        slug: wedding.slug,
        brideName: wedding.brideName,
        groomName: wedding.groomName,
        weddingDate: wedding.weddingDate,
        weddingTime: wedding.weddingTime,
        templateVersion: wedding.templateVersion,
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
  }
}
