import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TemplateDocument = Template & Document;

@Schema({ timestamps: true, collection: 'templates' })
export class Template {
  @Prop({ required: true, unique: true, index: true })
  code: string; // e.g. "classic-pink", "modern-blue"

  @Prop({ required: true })
  name: string;

  @Prop()
  description?: string;

  @Prop()
  thumbnail?: string;

  @Prop({ type: [String], default: [] })
  previewImages: string[];

  @Prop()
  previewUrl?: string;

  @Prop({ required: true, default: 0 })
  price: number;

  @Prop({ default: '1.0.0' })
  version: string;

  @Prop({ default: 'active' })
  status: string; // 'active' | 'inactive'

  @Prop({ default: true })
  active: boolean; // Trạng thái mở bán

  @Prop()
  category?: string;

  @Prop({ type: Date, default: null, index: true })
  deletedAt: Date | null; // Phục vụ Soft Delete
}

export const TemplateSchema = SchemaFactory.createForClass(Template);
