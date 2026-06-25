import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

export type TemplateSectionDocument = TemplateSection & Document;

@Schema({ timestamps: true, collection: 'template_sections' })
export class TemplateSection {
  @Prop({ type: Types.ObjectId, ref: 'Template', required: true, index: true })
  templateId: Types.ObjectId;

  @Prop({ required: true, index: true })
  type: string; // e.g. "hero", "timeline", "rsvp", "gift", "story", "gallery", "footer"

  @Prop({ required: true })
  name: string; // Tên hiển thị ở editor (e.g. "Album ảnh")

  @Prop({ default: '' })
  icon: string; // Tên icon hiển thị ở editor UI (e.g. "image-outline")

  @Prop({ required: true, default: false })
  required: boolean; // Có bắt buộc phải hiển thị không

  @Prop({ required: true, default: 1 })
  maxInstances: number; // Số lượng section tối đa được tạo (ví dụ: tối đa 3 gallery)

  @Prop({ required: true })
  defaultLayout: string; // Layout mặc định ban đầu (e.g. "gallery-grid")

  @Prop({ type: [String], default: [] })
  availableLayouts: string[]; // Danh sách các layout được hỗ trợ (e.g. ["gallery-grid", "gallery-carousel"])

  @Prop({ type: MongooseSchema.Types.Mixed, default: {} })
  defaultSettings: any; // Cấu hình mặc định ban đầu
}

export const TemplateSectionSchema =
  SchemaFactory.createForClass(TemplateSection);
