import { Injectable, OnModuleInit, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Wedding, WeddingDocument } from './schemas/wedding.schema';
import { WeddingEvent, WeddingEventDocument } from './schemas/wedding-event.schema';
import { WeddingTimeline, WeddingTimelineDocument } from './schemas/wedding-timeline.schema';
import { Guestbook, GuestbookDocument } from './schemas/guestbook.schema';
import { Guest, GuestDocument } from './schemas/guest.schema';
import { User, UserDocument } from '../user/schemas/user.schema';
import { Template, TemplateDocument } from '../template/schemas/template.schema';
import { CreateWeddingDto } from './dto/create-wedding.dto';

@Injectable()
export class WeddingService implements OnModuleInit {
  constructor(
    @InjectModel(Wedding.name)
    private readonly weddingModel: Model<WeddingDocument>,
    @InjectModel(WeddingEvent.name)
    private readonly weddingEventModel: Model<WeddingEventDocument>,
    @InjectModel(WeddingTimeline.name)
    private readonly weddingTimelineModel: Model<WeddingTimelineDocument>,
    @InjectModel(Guestbook.name)
    private readonly guestbookModel: Model<GuestbookDocument>,
    @InjectModel(Guest.name)
    private readonly guestModel: Model<GuestDocument>,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    @InjectModel(Template.name)
    private readonly templateModel: Model<TemplateDocument>,
  ) {}

  async onModuleInit() {
    // Luôn dọn dẹp và nạp lại dữ liệu mẫu chuẩn cho chạy thử nghiệm
    await this.weddingModel.deleteMany({}).exec();
    await this.weddingEventModel.deleteMany({}).exec();
    await this.weddingTimelineModel.deleteMany({}).exec();
    await this.guestbookModel.deleteMany({}).exec();
    await this.guestModel.deleteMany({}).exec();
    await this.templateModel.deleteMany({}).exec();
    console.log('--- Cleaning and seeding default wedding data ---');

    // 0. Seed templates
    const t1 = await new this.templateModel({
      code: 'classic-pink',
      name: 'Hồng Sương Mai',
      description: 'Mẫu thiết kế truyền thống, ấm cúng',
      price: 0,
      status: 'active',
      category: 'Truyền thống',
    }).save();

    const t2 = await new this.templateModel({
      code: 'modern-blue',
      name: 'Xanh Tối Giản',
      description: 'Phong cách tối giản hiện đại thanh lịch',
      price: 199000,
      status: 'active',
      category: 'Hiện đại',
    }).save();

    const t3 = await new this.templateModel({
      code: 'royal-gold',
      name: 'Vàng Hoàng Gia',
      description: 'Thiết kế sang trọng phong cách hoàng gia',
      price: 299000,
      status: 'active',
      category: 'Sang trọng',
    }).save();

    // Tìm hoặc tạo users để gán ownerId
    let userMinhLan = await this.userModel.findOne({ username: 'minh-lan' }).exec();
    if (!userMinhLan) {
      userMinhLan = await new this.userModel({
        username: 'minh-lan',
        passwordHash: '123456', // Sẽ được hash thực tế khi chạy qua AuthService
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

    let userHoangYen = await this.userModel.findOne({ username: 'hoang-yen' }).exec();
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
    await this.create({
      slug: 'vanan-thibinh',
      templateId: 1, // Sẽ map sang t1._id trong hàm create
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
          description: 'Chúng mình tình cờ gặp nhau tại thư viện đại học vào một buổi chiều mưa gió. Cả hai cùng đưa tay với lấy một cuốn sách, và thế là câu chuyện bắt đầu.',
          imageUrl: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&h=400&fit=crop&auto=format',
        },
        {
          year: '2024',
          title: 'Lời Cầu Hôn Ngọt Ngào',
          description: 'Tại thung lũng sương mù Đà Lạt, dưới bầu trời đầy sao lấp lánh, anh ấy đã quỳ gối và hỏi: "Làm vợ anh nhé?". Giọt nước mắt hạnh phúc và câu trả lời "Em đồng ý" vang lên.',
          imageUrl: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=600&h=400&fit=crop&auto=format',
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
        groomQrUrl: 'https://img.vietqr.io/image/VCB-0071001234567-compact.png?amount=200000&addInfo=Chuc%20mung%20hanh%20phuc',
        brideBankName: 'Techcombank',
        brideAccountNumber: '1903456789012',
        brideAccountName: 'TRAN THI BINH',
        brideQrUrl: 'https://img.vietqr.io/image/TCB-1903456789012-compact.png?amount=200000&addInfo=Chuc%20mung%20hanh%20phuc',
      },
      contactInfo: {
        groomPhone: '0901234567',
        bridePhone: '0907654321',
        email: 'vanan.thibinh@gmail.com',
      },
    }, userVanAn._id.toString());

    // 2. Seed 'minh-lan'
    await this.create({
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
          description: 'Quen nhau khi cùng tham gia câu lạc bộ ghi-ta tại trường Đại học. Cây đàn và tiếng hát đã gắn kết trái tim hai đứa.',
          imageUrl: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&h=400&fit=crop&auto=format',
        },
        {
          year: '2025',
          title: 'Lời Cầu Hôn Bên Bờ Biển',
          description: 'Dưới ánh hoàng hôn Phú Quốc lãng mạn, anh quỳ xuống nói lời ước hẹn trọn đời và nàng đã gật đầu đồng ý.',
          imageUrl: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=600&h=400&fit=crop&auto=format',
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
        groomQrUrl: 'https://img.vietqr.io/image/MB-1110123456789-compact.png?amount=200000&addInfo=Mung%20cuoi%20Quang%20Minh',
        brideBankName: 'ACB',
        brideAccountNumber: '2220987654321',
        brideAccountName: 'TRAN THI NGOC LAN',
        brideQrUrl: 'https://img.vietqr.io/image/ACB-2220987654321-compact.png?amount=200000&addInfo=Mung%20cuoi%20Ngoc%20Lan',
      },
      contactInfo: {
        groomPhone: '0988888888',
        bridePhone: '0977777777',
        email: 'minh.lan@gmail.com',
      },
    }, userMinhLan._id.toString());

    // 3. Seed 'hoang-yen'
    await this.create({
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
          description: 'Gặp gỡ lần đầu trong một dự án thiết kế công ty. Từ sự đồng điệu trong công việc, tình cảm dần đơm hoa kết trái.',
          imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop&auto=format',
        },
        {
          year: '2025',
          title: 'Lễ dính hôn ấm áp',
          description: 'Dưới sự chúc phúc ấm áp của hai gia đình và những người bạn thân thiết nhất, chúng mình đã trao nhau chiếc nhẫn đính hôn.',
          imageUrl: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=600&h=400&fit=crop&auto=format',
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
        groomQrUrl: 'https://img.vietqr.io/image/VCB-0071008888888-compact.png?amount=200000&addInfo=Mung%20cuoi%20Hoang%20Nam',
        brideBankName: 'Techcombank',
        brideAccountNumber: '1903888888888',
        brideAccountName: 'PHAM THI YEN CHI',
        brideQrUrl: 'https://img.vietqr.io/image/TCB-1903888888888-compact.png?amount=200000&addInfo=Mung%20cuoi%20Yen%20Chi',
      },
      contactInfo: {
        groomPhone: '0966666666',
        bridePhone: '0955555555',
        email: 'nam.chi@gmail.com',
      },
    }, userHoangYen._id.toString());

    console.log('--- Seeding completed! ---');

    // Seed guest list, rsvps và guestbooks dựa trên slug
    await this.createGuest('minh-lan', { name: 'Chú Tiến & Cô Hương', phone: '0901112222', relationship: 'Họ hàng nhà trai' });
    await this.createGuest('minh-lan', { name: 'Anh Sơn (bạn thân)', phone: '0903334444', relationship: 'Bạn chú rể' });
    await this.createGuest('minh-lan', { name: 'Chị Hạnh', phone: '0905556666', relationship: 'Bạn cô dâu' });
    await this.createGuest('minh-lan', { name: 'Anh Đức (Bạn thân)', phone: '0907778888', relationship: 'Bạn chú rể' });
    await this.createGuest('minh-lan', { name: 'Chị Lan Vy', phone: '0909990000', relationship: 'Bạn cô dâu' });

    // Seed RSVP bằng cách gọi hàm createRsvp (lưu trực tiếp vào guests)
    await this.createRsvp('minh-lan', { name: 'Chú Tiến & Cô Hương', attend: 'yes', guests: 2, message: 'Chúc hai con trăm năm hạnh phúc, sớm có cháu bồng bế!' });
    await this.createRsvp('minh-lan', { name: 'Anh Sơn (bạn thân)', attend: 'yes', guests: 1, message: 'Chúc mừng hai bạn! Nhất định mình sẽ có mặt uống rượu mừng.' });
    await this.createRsvp('minh-lan', { name: 'Chị Hạnh', attend: 'no', guests: 0, message: 'Tiếc quá hôm đó chị bận lịch công tác, chúc hai em luôn hạnh phúc nha!' });

    await this.createGuestbook('minh-lan', { name: 'Nguyễn Quang Anh', message: 'Thiệp cưới online đẹp quá! Chúc hai bạn trăm năm hạnh phúc.' });
    await this.createGuestbook('minh-lan', { name: 'Trần Bảo Ngọc', message: 'Mãi hạnh phúc và ngọt ngào như ngày đầu nhé hai bạn yêu quý!' });

    await this.createGuestbook('vanan-thibinh', { name: 'Cô Lan & Chú Hùng', message: 'Chúc hai con trăm năm hạnh phúc, sớm có tin vui!' });
    await this.createGuestbook('vanan-thibinh', { name: 'Anh Minh Đức', message: 'Tụi mày xứng đôi quá 💕 Chúc mừng nhé!' });
  }

  async create(createDto: CreateWeddingDto, userId?: string): Promise<any> {
    const { events, timeline, templateId, ...restDto } = createDto;

    // Tìm template tương ứng để lấy ObjectId
    let targetTemplateId: Types.ObjectId;
    if (typeof templateId === 'number') {
      const codes = ['classic-pink', 'modern-blue', 'royal-gold'];
      const code = codes[templateId - 1] || 'classic-pink';
      const tmp = await this.templateModel.findOne({ code }).exec();
      targetTemplateId = tmp ? (tmp._id as Types.ObjectId) : new Types.ObjectId();
    } else {
      targetTemplateId = new Types.ObjectId(templateId as any);
    }

    const ownerObjectId = userId ? new Types.ObjectId(userId) : new Types.ObjectId();

    const created = new this.weddingModel({
      ...restDto,
      ownerId: ownerObjectId,
      templateId: targetTemplateId,
      weddingDate: new Date(createDto.weddingDate),
      status: 'published',
    });
    const saved = await created.save();

    // Lưu các sự kiện liên quan
    if (events && events.length > 0) {
      for (const evt of events) {
        await new this.weddingEventModel({
          weddingId: saved._id,
          title: evt.title,
          time: evt.time,
          date: new Date(evt.date.split('/').reverse().join('-')), // convert dd/mm/yyyy to Date
          locationName: evt.locationName,
          address: evt.address,
          mapUrl: evt.mapUrl,
        }).save();
      }
    }

    // Lưu dòng lịch sử liên quan
    if (timeline && timeline.length > 0) {
      for (const tl of timeline) {
        await new this.weddingTimelineModel({
          weddingId: saved._id,
          year: tl.year,
          title: tl.title,
          description: tl.description,
          imageUrl: tl.imageUrl,
        }).save();
      }
    }

    if (userId) {
      await this.userModel.findByIdAndUpdate(userId, { weddingSlug: saved.slug }).exec();
    }

    return this.findBySlug(saved.slug);
  }

  async findBySlug(slug: string): Promise<any> {
    const wedding = await this.weddingModel.findOneAndUpdate(
      { slug },
      { $inc: { views: 1 } },
      { new: true }
    ).lean().exec();
    if (!wedding) {
      throw new NotFoundException(`Wedding with slug "${slug}" not found`);
    }

    const events = await this.weddingEventModel.find({ weddingId: wedding._id }).exec();
    const timeline = await this.weddingTimelineModel.find({ weddingId: wedding._id }).exec();

    return {
      ...wedding,
      events,
      timeline,
    };
  }

  async update(slug: string, updateDto: any): Promise<any> {
    const wedding = await this.weddingModel.findOne({ slug }).exec();
    if (!wedding) {
      throw new NotFoundException(`Wedding with slug "${slug}" not found`);
    }

    const { events, timeline, ...restDto } = updateDto;

    // Cập nhật thông tin cơ bản
    Object.assign(wedding, restDto);
    if (updateDto.weddingDate) {
      wedding.weddingDate = new Date(updateDto.weddingDate);
    }
    const saved = await wedding.save();

    // Cập nhật events
    if (events) {
      await this.weddingEventModel.deleteMany({ weddingId: saved._id }).exec();
      for (const evt of events) {
        await new this.weddingEventModel({
          ...evt,
          weddingId: saved._id,
          date: evt.date ? new Date(evt.date) : new Date(),
        }).save();
      }
    }

    // Cập nhật timeline
    if (timeline) {
      await this.weddingTimelineModel.deleteMany({ weddingId: saved._id }).exec();
      for (const tl of timeline) {
        await new this.weddingTimelineModel({
          ...tl,
          weddingId: saved._id,
        }).save();
      }
    }

    return this.findBySlug(slug);
  }

  // RSVP methods (Lưu trực tiếp vào bảng Guest)
  async createRsvp(slug: string, rsvpData: any): Promise<Guest> {
    const wedding = await this.weddingModel.findOne({ slug }).exec();
    if (!wedding) {
      throw new NotFoundException(`Wedding with slug "${slug}" not found`);
    }

    const normalizedName = rsvpData.name.trim().toLowerCase();
    let guest = await this.guestModel.findOne({ 
      weddingId: wedding._id, 
      name: new RegExp(`^${normalizedName}$`, 'i') 
    }).exec();

    if (guest) {
      guest.rsvpStatus = rsvpData.attend === 'yes' ? 'confirmed' : 'declined';
      guest.guestsCount = rsvpData.attend === 'yes' ? Number(rsvpData.guests || 1) : 0;
      guest.note = rsvpData.message;
      return guest.save();
    } else {
      const newGuest = new this.guestModel({
        weddingId: wedding._id,
        name: rsvpData.name,
        rsvpStatus: rsvpData.attend === 'yes' ? 'confirmed' : 'declined',
        guestsCount: rsvpData.attend === 'yes' ? Number(rsvpData.guests || 1) : 0,
        note: rsvpData.message,
      });
      return newGuest.save();
    }
  }

  async findRsvps(slug: string): Promise<Guest[]> {
    const wedding = await this.weddingModel.findOne({ slug }).exec();
    if (!wedding) return [];
    return this.guestModel.find({ 
      weddingId: wedding._id, 
      rsvpStatus: { $ne: 'pending' } 
    }).sort({ updatedAt: -1 }).exec();
  }

  // Guestbook methods
  async createGuestbook(slug: string, guestbookData: any): Promise<Guestbook> {
    const wedding = await this.weddingModel.findOne({ slug }).exec();
    if (!wedding) {
      throw new NotFoundException(`Wedding with slug "${slug}" not found`);
    }
    const gb = new this.guestbookModel({
      ...guestbookData,
      weddingId: wedding._id,
    });
    return gb.save();
  }

  async findGuestbook(slug: string): Promise<Guestbook[]> {
    const wedding = await this.weddingModel.findOne({ slug }).exec();
    if (!wedding) return [];
    return this.guestbookModel.find({ weddingId: wedding._id, isApproved: true }).sort({ createdAt: -1 }).exec();
  }

  // GUEST LIST CRUD
  async createGuest(slug: string, guestData: any): Promise<Guest> {
    const wedding = await this.weddingModel.findOne({ slug }).exec();
    if (!wedding) {
      throw new NotFoundException(`Wedding with slug "${slug}" not found`);
    }
    const guest = new this.guestModel({
      ...guestData,
      weddingId: wedding._id,
    });
    return guest.save();
  }

  async findGuests(slug: string): Promise<Guest[]> {
    const wedding = await this.weddingModel.findOne({ slug }).exec();
    if (!wedding) return [];
    return this.guestModel.find({ weddingId: wedding._id }).sort({ createdAt: -1 }).exec();
  }

  async updateGuest(slug: string, id: string, guestData: any): Promise<Guest> {
    const wedding = await this.weddingModel.findOne({ slug }).exec();
    if (!wedding) {
      throw new NotFoundException(`Wedding with slug "${slug}" not found`);
    }
    const guest = await this.guestModel.findOneAndUpdate(
      { _id: id, weddingId: wedding._id },
      guestData,
      { new: true }
    ).exec();
    if (!guest) {
      throw new NotFoundException(`Guest with ID "${id}" not found for wedding "${slug}"`);
    }
    return guest;
  }

  async deleteGuest(slug: string, id: string): Promise<any> {
    const wedding = await this.weddingModel.findOne({ slug }).exec();
    if (!wedding) {
      throw new NotFoundException(`Wedding with slug "${slug}" not found`);
    }
    const result = await this.guestModel.deleteOne({ _id: id, weddingId: wedding._id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Guest with ID "${id}" not found for wedding "${slug}"`);
    }
    return { success: true };
  }
}
