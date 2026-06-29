import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MediaDocument = Media & Document;

@Schema({ timestamps: true, collection: 'media' })
export class Media {
  @Prop({ type: Types.ObjectId, ref: 'Wedding', index: true })
  weddingId?: Types.ObjectId; // Liên kết tới đám cưới

  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  ownerId: Types.ObjectId; // Chủ sở hữu upload ảnh

  @Prop({ required: true, default: 'gallery', index: true })
  type: string; // 'cover' | 'gallery' | 'story' | 'video' | 'music' | 'avatar'

  @Prop({ required: true })
  url: string;

  @Prop({ default: 0 })
  order: number; // Thứ tự sắp xếp

  @Prop()
  size?: number; // Dung lượng tệp tin bằng bytes

  @Prop()
  mimeType?: string; // e.g. image/jpeg, image/png

  @Prop()
  filename?: string; // Tên file ban đầu

  @Prop({ type: Date, default: null, index: true })
  deletedAt: Date | null; // Phục vụ Soft Delete
}

export const MediaSchema = SchemaFactory.createForClass(Media);
