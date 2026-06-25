import { Injectable, OnModuleInit, NotFoundException } from '@nestjs/common';
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
export class WeddingsService implements OnModuleInit {
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

  async onModuleInit() {
    // Luôn dọn dẹp và nạp lại dữ liệu mẫu chuẩn cho chạy thử nghiệm
    await this.weddingModel.deleteMany({}).exec();
    await this.weddingSectionModel.deleteMany({}).exec();
    await this.weddingThemeSettingModel.deleteMany({}).exec();
    await this.templateModel.deleteMany({}).exec();
    await this.templateSectionModel.deleteMany({}).exec();
    await this.guestbookModel.deleteMany({}).exec();
    await this.guestModel.deleteMany({}).exec();
    await this.mediaModel.deleteMany({}).exec();
    console.log('--- Cleaning and seeding default Viora SaaS data ---');

    // 0. Seed templates
    const t1 = await new this.templateModel({
      code: 'classic-pink',
      name: 'Hồng Sương Mai',
      description: 'Mẫu thiết kế truyền thống, ấm cúng',
      price: 0,
      status: 'active',
      active: true,
      category: 'Truyền thống',
      version: '1.0.0',
    }).save();

    const t2 = await new this.templateModel({
      code: 'modern-blue',
      name: 'Xanh Tối Giản',
      description: 'Phong cách tối giản hiện đại thanh lịch',
      price: 199000,
      status: 'active',
      active: true,
      category: 'Hiện đại',
      version: '1.0.0',
    }).save();

    const t3 = await new this.templateModel({
      code: 'royal-gold',
      name: 'Vàng Hoàng Gia',
      description: 'Thiết kế sang trọng phong cách hoàng gia',
      price: 299000,
      status: 'active',
      active: true,
      category: 'Sang trọng',
      version: '1.0.0',
    }).save();

    // Seed default Template Sections
    const defaultSectionTypes = [
      {
        type: 'hero',
        name: 'Mở đầu',
        required: true,
        icon: 'heart-outline',
        maxInstances: 1,
      },
      {
        type: 'story',
        name: 'Chuyện tình yêu',
        required: false,
        icon: 'book-outline',
        maxInstances: 2,
      },
      {
        type: 'timeline',
        name: 'Dòng thời gian',
        required: false,
        icon: 'time-outline',
        maxInstances: 2,
      },
      {
        type: 'gallery',
        name: 'Album hình ảnh',
        required: false,
        icon: 'images-outline',
        maxInstances: 3,
      },
      {
        type: 'rsvp',
        name: 'Phản hồi tham dự',
        required: true,
        icon: 'mail-outline',
        maxInstances: 1,
      },
      {
        type: 'gift',
        name: 'Mừng cưới',
        required: false,
        icon: 'gift-outline',
        maxInstances: 1,
      },
      {
        type: 'footer',
        name: 'Lời cảm ơn',
        required: true,
        icon: 'sparkles-outline',
        maxInstances: 1,
      },
    ];

    const templates = [t1, t2, t3];
    for (const temp of templates) {
      for (const sect of defaultSectionTypes) {
        await new this.templateSectionModel({
          templateId: temp._id,
          type: sect.type,
          name: sect.name,
          icon: sect.icon,
          required: sect.required,
          maxInstances: sect.maxInstances,
          defaultLayout: `${sect.type}-v1`,
          availableLayouts: [`${sect.type}-v1`, `${sect.type}-v2`],
          defaultSettings: {},
        }).save();
      }
    }

    // Tìm hoặc tạo users để gán ownerId
    let userMinhLan = await this.userModel
      .findOne({ username: 'minh-lan' })
      .exec();
    if (!userMinhLan) {
      userMinhLan = await new this.userModel({
        username: 'minh-lan',
        passwordHash: '123456',
        role: 'user',
        fullName: 'Quang Minh',
        accountType: 'customer',
      }).save();
    }

    let userVanAn = await this.userModel.findOne({ username: 'vanan' }).exec();
    if (!userVanAn) {
      userVanAn = await new this.userModel({
        username: 'vanan',
        passwordHash: '123456',
        role: 'user',
        fullName: 'Văn An',
        accountType: 'customer',
      }).save();
    }

    let userHoangYen = await this.userModel
      .findOne({ username: 'hoang-yen' })
      .exec();
    if (!userHoangYen) {
      userHoangYen = await new this.userModel({
        username: 'hoang-yen',
        passwordHash: '123456',
        role: 'user',
        fullName: 'Hoàng Nam',
        accountType: 'customer',
      }).save();
    }

    // 1. Seed 'vanan-thibinh'
    await this.create(
      {
        slug: 'vanan-thibinh',
        templateId: 1, // Sẽ map sang t1._id
        groomName: 'Văn An',
        groomFatherName: 'Nguyễn Văn Hùng',
        groomMotherName: 'Lê Thị Lan',
        brideName: 'Thị Bình',
        brideFatherName: 'Trần Văn Đức',
        brideMotherName: 'Phạm Thị Thảo',
        weddingDate: '2026-11-15T18:00:00.000Z',
        weddingTime: '18:00',
        events: [
          {
            title: 'LỄ VU QUY',
            time: '09:00',
            date: '15/11/2026',
            locationName: 'Tư gia nhà gái',
            address: '456 Đường CMT8, Quận 3, TP. Hồ Chí Minh',
            mapUrl: 'https://maps.google.com',
          },
          {
            title: 'TIỆC CHIÊU ĐÃI',
            time: '18:00',
            date: '15/11/2026',
            locationName: 'Nhà hàng tiệc cưới Đại Dương',
            address: '789 Đường Song Hành, Quận 2, TP. Hồ Chí Minh',
            mapUrl: 'https://maps.google.com',
          },
        ],
        timeline: [
          {
            year: '2021',
            title: 'Lần Đầu Gặp Gỡ',
            description:
              'Chúng mình tình cờ gặp nhau tại thư viện đại học vào một buổi chiều mưa gió. Cả hai cùng đưa tay với lấy một cuốn sách, và thế là câu chuyện bắt đầu.',
            imageUrl:
              'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&h=400&fit=crop&auto=format',
          },
          {
            year: '2024',
            title: 'Lời Cầu Hôn Ngọt Ngào',
            description:
              'Tại thung lũng sương mù Đà Lạt, dưới bầu trời đầy sao lấp lánh, anh ấy đã quỳ gối và hỏi: "Làm vợ anh nhé?". Giọt nước mắt hạnh phúc và câu trả lời "Em đồng ý" vang lên.',
            imageUrl:
              'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=600&h=400&fit=crop&auto=format',
          },
        ],
        galleryImages: [
          'https://images.unsplash.com/photo-1596457221755-b96bc3a6df18?w=800&h=600&fit=crop&auto=format',
          'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&h=600&fit=crop&auto=format',
          'https://images.unsplash.com/photo-1519225495810-7517cbd14bc4?w=800&h=600&fit=crop&auto=format',
          'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=600&fit=crop&auto=format',
        ],
        giftInfo: {
          groomBankName: 'Vietcombank',
          groomAccountNumber: '0071001234567',
          groomAccountName: 'NGUYEN VAN AN',
          groomQrUrl:
            'https://img.vietqr.io/image/VCB-0071001234567-compact.png?amount=200000&addInfo=Chuc%20mung%20hanh%20phuc',
          brideBankName: 'Techcombank',
          brideAccountNumber: '1903456789012',
          brideAccountName: 'TRAN THI BINH',
          brideQrUrl:
            'https://img.vietqr.io/image/TCB-1903456789012-compact.png?amount=200000&addInfo=Chuc%20mung%20hanh%20phuc',
        },
        contactInfo: {
          groomPhone: '0901234567',
          bridePhone: '0907654321',
          email: 'vanan.thibinh@gmail.com',
        },
      },
      userVanAn._id.toString(),
      userVanAn._id.toString(),
    );

    // 2. Seed 'minh-lan'
    await this.create(
      {
        slug: 'minh-lan',
        templateId: 2,
        groomName: 'Quang Minh',
        groomFatherName: 'Nguyễn Quang Tiến',
        groomMotherName: 'Lê Thị Hương',
        brideName: 'Ngọc Lan',
        brideFatherName: 'Trần Ngọc Sơn',
        brideMotherName: 'Hoàng Thị Lan',
        weddingDate: '2026-12-12T18:00:00.000Z',
        weddingTime: '18:00',
        events: [
          {
            title: 'LỄ TÂN HÔN',
            time: '09:00',
            date: '12/12/2026',
            locationName: 'Tư gia nhà trai',
            address: '123 Đường Nguyễn Trãi, Quận 1, TP. Hồ Chí Minh',
            mapUrl: 'https://maps.google.com',
          },
          {
            title: 'TIỆC CƯỚI',
            time: '18:00',
            date: '12/12/2026',
            locationName: 'Trung tâm tiệc cưới Diamond Palace',
            address: '100 Đường Nguyễn Du, Quận 1, TP. Hồ Chí Minh',
            mapUrl: 'https://maps.google.com',
          },
        ],
        timeline: [
          {
            year: '2020',
            title: 'Mối Tình Học Đường',
            description:
              'Quen nhau khi cùng tham gia câu lạc bộ ghi-ta tại trường Đại học. Cây đàn và tiếng hát đã gắn kết trái tim hai đứa.',
            imageUrl:
              'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&h=400&fit=crop&auto=format',
          },
          {
            year: '2025',
            title: 'Lời Cầu Hôn Bên Bờ Biển',
            description:
              'Dưới ánh hoàng hôn Phú Quốc lãng mạn, anh quỳ xuống nói lời ước hẹn trọn đời và nàng đã gật đầu đồng ý.',
            imageUrl:
              'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=600&h=400&fit=crop&auto=format',
          },
        ],
        galleryImages: [
          'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&h=600&fit=crop&auto=format',
          'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop&auto=format',
          'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=600&fit=crop&auto=format',
          'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&h=600&fit=crop&auto=format',
        ],
        giftInfo: {
          groomBankName: 'MB Bank',
          groomAccountNumber: '1110123456789',
          groomAccountName: 'NGUYEN QUANG MINH',
          groomQrUrl:
            'https://img.vietqr.io/image/MB-1110123456789-compact.png?amount=200000&addInfo=Mung%20cuoi%20Quang%20Minh',
          brideBankName: 'ACB',
          brideAccountNumber: '2220987654321',
          brideAccountName: 'TRAN THI NGOC LAN',
          brideQrUrl:
            'https://img.vietqr.io/image/ACB-2220987654321-compact.png?amount=200000&addInfo=Mung%20cuoi%20Ngoc%20Lan',
        },
        contactInfo: {
          groomPhone: '0988888888',
          bridePhone: '0977777777',
          email: 'minh.lan@gmail.com',
        },
      },
      userMinhLan._id.toString(),
      userMinhLan._id.toString(),
    );

    // 3. Seed 'hoang-yen'
    await this.create(
      {
        slug: 'hoang-yen',
        templateId: 3,
        groomName: 'Hoàng Nam',
        groomFatherName: 'Nguyễn Hoàng Hải',
        groomMotherName: 'Trần Thị Hồng',
        brideName: 'Yến Chi',
        brideFatherName: 'Phạm Văn Tiến',
        brideMotherName: 'Lê Thị Thủy',
        weddingDate: '2026-10-10T18:00:00.000Z',
        weddingTime: '18:00',
        events: [
          {
            title: 'LỄ VU QUY',
            time: '09:00',
            date: '10/10/2026',
            locationName: 'Tư gia nhà gái',
            address: '15 Lý Thường Kiệt, Quận 5, TP. Hồ Chí Minh',
            mapUrl: 'https://maps.google.com',
          },
          {
            title: 'TIỆC THÀNH HÔN',
            time: '18:00',
            date: '10/10/2026',
            locationName: 'Trung tâm Hội nghị Tiệc cưới Melisa Center',
            address: '85 Thoại Ngọc Hầu, Quận Tân Phú, TP. Hồ Chí Minh',
            mapUrl: 'https://maps.google.com',
          },
        ],
        timeline: [
          {
            year: '2022',
            title: 'Đồng nghiệp tri kỷ',
            description:
              'Gặp gỡ lần đầu trong một dự án thiết kế công ty. Từ sự đồng điệu trong công việc, tình cảm dần đơm hoa kết trái.',
            imageUrl:
              'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop&auto=format',
          },
          {
            year: '2025',
            title: 'Lễ dính hôn ấm áp',
            description:
              'Dưới sự chúc phúc ấm áp của hai gia đình và những người bạn thân thiết nhất, chúng mình đã trao nhau chiếc nhẫn đính hôn.',
            imageUrl:
              'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=600&h=400&fit=crop&auto=format',
          },
        ],
        galleryImages: [
          'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop&auto=format',
          'https://images.unsplash.com/photo-1507504038482-7621c37b3f9d?w=800&h=600&fit=crop&auto=format',
          'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=600&fit=crop&auto=format',
          'https://images.unsplash.com/photo-1519225495810-7517cbd14bc4?w=800&h=600&fit=crop&auto=format',
        ],
        giftInfo: {
          groomBankName: 'Vietcombank',
          groomAccountNumber: '0071008888888',
          groomAccountName: 'NGUYEN HOANG NAM',
          groomQrUrl:
            'https://img.vietqr.io/image/VCB-0071008888888-compact.png?amount=200000&addInfo=Mung%20cuoi%20Hoang%20Nam',
          brideBankName: 'Techcombank',
          brideAccountNumber: '1903888888888',
          brideAccountName: 'PHAM THI YEN CHI',
          brideQrUrl:
            'https://img.vietqr.io/image/TCB-1903888888888-compact.png?amount=200000&addInfo=Mung%20cuoi%20Yen%20Chi',
        },
        contactInfo: {
          groomPhone: '0966666666',
          bridePhone: '0955555555',
          email: 'nam.chi@gmail.com',
        },
      },
      userHoangYen._id.toString(),
      userHoangYen._id.toString(),
    );

    console.log('--- Viora SaaS Seeding completed! ---');

    // Tìm các thiệp cưới vừa tạo để seed Guest & Guestbook
    const wMinhLan = await this.weddingModel
      .findOne({ slug: 'minh-lan' })
      .exec();
    if (wMinhLan) {
      await new this.guestModel({
        weddingId: wMinhLan._id,
        name: 'Chú Tiến & Cô Hương',
        phone: '0901112222',
        relationship: 'Họ hàng nhà trai',
        rsvpStatus: 'confirmed',
        guestsCount: 2,
        note: 'Chúc hai con trăm năm hạnh phúc, sớm có cháu bồng bế!',
      }).save();
      await new this.guestModel({
        weddingId: wMinhLan._id,
        name: 'Anh Sơn (bạn thân)',
        phone: '0903334444',
        relationship: 'Bạn chú rể',
        rsvpStatus: 'confirmed',
        guestsCount: 1,
        note: 'Chúc mừng hai bạn! Nhất định mình sẽ có mặt uống rượu mừng.',
      }).save();
      await new this.guestModel({
        weddingId: wMinhLan._id,
        name: 'Chị Hạnh',
        phone: '0905556666',
        relationship: 'Bạn cô dâu',
        rsvpStatus: 'declined',
        guestsCount: 0,
        note: 'Tiếc quá hôm đó chị bận lịch công tác, chúc hai em luôn hạnh phúc nha!',
      }).save();
      await new this.guestModel({
        weddingId: wMinhLan._id,
        name: 'Anh Đức (Bạn thân)',
        phone: '0907778888',
        relationship: 'Bạn chú rể',
        rsvpStatus: 'pending',
      }).save();
      await new this.guestModel({
        weddingId: wMinhLan._id,
        name: 'Chị Lan Vy',
        phone: '0909990000',
        relationship: 'Bạn cô dâu',
        rsvpStatus: 'pending',
      }).save();

      await new this.guestbookModel({
        weddingId: wMinhLan._id,
        name: 'Nguyễn Quang Anh',
        message: 'Thiệp cưới online đẹp quá! Chúc hai bạn trăm năm hạnh phúc.',
        isApproved: true,
      }).save();
      await new this.guestbookModel({
        weddingId: wMinhLan._id,
        name: 'Trần Bảo Ngọc',
        message: 'Mãi hạnh phúc và ngọt ngào như ngày đầu nhé hai bạn yêu quý!',
        isApproved: true,
      }).save();
    }

    const wVanAn = await this.weddingModel
      .findOne({ slug: 'vanan-thibinh' })
      .exec();
    if (wVanAn) {
      await new this.guestbookModel({
        weddingId: wVanAn._id,
        name: 'Cô Lan & Chú Hùng',
        message: 'Chúc hai con trăm năm hạnh phúc, sớm có tin vui!',
        isApproved: true,
      }).save();
      await new this.guestbookModel({
        weddingId: wVanAn._id,
        name: 'Anh Minh Đức',
        message: 'Tụi mày xứng đôi quá 💕 Chúc mừng nhé!',
        isApproved: true,
      }).save();
    }
  }

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
      const codes = ['classic-pink', 'modern-blue', 'royal-gold'];
      const code = codes[templateId - 1] || 'classic-pink';
      targetTemplate = await this.templateModel
        .findOne({ code, deletedAt: null })
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
        targetTemplate.code === 'classic-pink'
          ? '#ff6b81'
          : targetTemplate.code === 'modern-blue'
            ? '#2e86de'
            : '#ee5253',
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
        { new: true },
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
