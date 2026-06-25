import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

export type WeddingSectionDocument = WeddingSection & Document;

@Schema({ timestamps: true, collection: 'wedding_sections' })
export class WeddingSection {
  @Prop({ type: Types.ObjectId, ref: 'Wedding', required: true, index: true })
  weddingId: Types.ObjectId;

  @Prop({ required: true, default: 1 })
  sectionVersion: number; // Quản lý phiên bản hiển thị của section

  @Prop({ required: true, index: true })
  type: string; // e.g. "hero", "timeline", "rsvp", "gift", "story"

  @Prop({ required: true, default: true })
  enabled: boolean; // Bật/tắt hiển thị section

  @Prop({ required: true, default: 0 })
  order: number; // Thứ tự hiển thị kéo thả

  @Prop({ required: true })
  layout: string; // Layout cụ thể (e.g. "hero-v1")

  @Prop({ type: MongooseSchema.Types.Mixed, default: {} })
  settings: any; // Cấu hình chi tiết (text, color, alignment, image...)
}

export const WeddingSectionSchema =
  SchemaFactory.createForClass(WeddingSection);
