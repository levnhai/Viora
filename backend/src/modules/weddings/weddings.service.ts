import { Injectable, NotFoundException } from '@nestjs/common';
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
  ) {}


  async create(
    createDto: CreateWeddingDto,
    userId?: string,
    createdById?: string,
  ): Promise<any> {
    const { events, timeline, galleryImages, templateId, ...restDto } =
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

    const ownerObjectId = userId
      ? new Types.ObjectId(userId)
      : new Types.ObjectId();
    const createdByObjectId = createdById
      ? new Types.ObjectId(createdById)
      : ownerObjectId;

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

    return this.findBySlug(saved.slug);
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

    const { events, timeline, galleryImages, ...restDto } = updateDto;

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

    return this.findBySlug(slug);
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
