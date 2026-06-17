import { Injectable, OnModuleInit, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Wedding, WeddingDocument } from './schemas/wedding.schema';
import { CreateWeddingDto } from './dto/create-wedding.dto';

@Injectable()
export class WeddingService implements OnModuleInit {
  constructor(
    @InjectModel(Wedding.name)
    private readonly weddingModel: Model<WeddingDocument>,
  ) {}

  async onModuleInit() {
    // Seed data if database is empty
    const count = await this.weddingModel.countDocuments().exec();
    if (count === 0) {
      console.log('--- Seeding default wedding data for "minh-lan" ---');
      await this.create({
        slug: 'minh-lan',
        templateId: 1,
        groomName: 'Văn An',
        groomFatherName: 'Nguyễn Văn Hùng',
        groomMotherName: 'Lê Thị Lan',
        brideName: 'Thị Bình',
        brideFatherName: 'Trần Văn Đức',
        brideMotherName: 'Phạm Thị Thảo',
        weddingDate: '2026-11-15T18:00:00.000Z', // Dùng năm 2026 để countdown vẫn chạy tiếp
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
      });
      console.log('--- Default wedding data seeded successfully! ---');
    }
  }

  async create(createDto: CreateWeddingDto): Promise<Wedding> {
    const created = new this.weddingModel({
      ...createDto,
      weddingDate: new Date(createDto.weddingDate),
    });
    return created.save();
  }

  async findBySlug(slug: string): Promise<Wedding> {
    const wedding = await this.weddingModel.findOne({ slug }).exec();
    if (!wedding) {
      throw new NotFoundException(`Wedding with slug "${slug}" not found`);
    }
    return wedding;
  }
}
