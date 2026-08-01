import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Template, TemplateDocument } from './schemas/template.schema';

const DEFAULT_TEMPLATES = [
  {
    id: 1,
    code: "temp_1",
    name: "Song Hỷ - Xanh",
    category: "Truyền thống",
    price: 99000,
    active: true,
  },
  {
    id: 2,
    code: "temp_2",
    name: "Song Hỷ - Đỏ",
    category: "Truyền thống",
    price: 99000,
    active: true,
  },
  {
    id: 3,
    code: "temp_3",
    name: "Hoa Mộc - Xanh",
    category: "Hoa lá",
    price: 460000,
    active: true,
  },
  {
    id: 4,
    code: "temp_4",
    name: "Elegant - Nâu",
    category: "Thanh Lịch",
    price: 149000,
    active: true,
  },
];

@Injectable()
export class TemplatesService {
  constructor(
    @InjectModel(Template.name)
    private readonly templateModel: Model<TemplateDocument>,
  ) {}

  async findAll(): Promise<TemplateDocument[]> {
    const list = await this.templateModel.find({ deletedAt: null }).exec();
    if (list && list.length > 0) {
      return list;
    }

    // Tự động Seed dữ liệu mẫu vào MongoDB nếu Database rỗng
    try {
      await this.templateModel.insertMany(DEFAULT_TEMPLATES);
    } catch (err) {
      console.error("Lỗi khi seed templates vào DB:", err);
    }

    return this.templateModel.find({ deletedAt: null }).exec();
  }
}
