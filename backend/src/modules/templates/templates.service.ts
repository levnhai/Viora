import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Template, TemplateDocument } from './schemas/template.schema';
import { DEFAULT_TEMPLATES } from './template.data';

@Injectable()
export class TemplatesService implements OnModuleInit {
  constructor(
    @InjectModel(Template.name)
    private readonly templateModel: Model<TemplateDocument>,
  ) {}

  async onModuleInit() {
    await this.syncTemplatesWithDb();
  }

  /**
   * Tự động đồng bộ (Upsert) danh sách mẫu thiệp xuất bản từ template.data.ts vào MongoDB
   * Và ẩn (active: false) các mẫu không có trong danh sách xuất bản.
   */
  async syncTemplatesWithDb() {
    try {
      if (!DEFAULT_TEMPLATES || DEFAULT_TEMPLATES.length === 0) return;

      const publishedCodes = DEFAULT_TEMPLATES.map((t) => t.code);

      // 1. Upsert các mẫu chính thức được xuất bản
      const bulkOps: any[] = DEFAULT_TEMPLATES.map((tpl) => ({
        updateOne: {
          filter: { code: tpl.code },
          update: { $set: { ...tpl, active: true, deletedAt: null } },
          upsert: true,
        },
      }));

      // 2. Ẩn (deactivate) các mẫu cũ/demo không có trong template.data.ts
      bulkOps.push({
        updateMany: {
          filter: { code: { $nin: publishedCodes } },
          update: { $set: { active: false } },
        },
      });

      await this.templateModel.bulkWrite(bulkOps);
      console.log(
        '✅ [TemplatesService] Đã đồng bộ mẫu thiệp xuất bản từ template.data.ts vào MongoDB.',
      );
    } catch (err) {
      console.error(
        '❌ [TemplatesService] Lỗi khi đồng bộ templates vào DB:',
        err,
      );
    }
  }

  async findAll(): Promise<TemplateDocument[]> {
    return this.templateModel.find({ active: true, deletedAt: null }).exec();
  }
}
