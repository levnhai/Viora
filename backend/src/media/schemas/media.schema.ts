import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MediaDocument = Media & Document;

@Schema({ timestamps: true, collection: 'media' })
export class Media {
  @Prop({ type: Types.ObjectId, ref: 'Wedding', index: true })
  weddingId?: Types.ObjectId; // Liên kết tới đám cưới (nếu có, ví dụ ảnh cưới trong album)

  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  ownerId: Types.ObjectId; // Chủ sở hữu upload ảnh

  @Prop({ required: true, default: 'album', index: true })
  type: string; // 'avatar' | 'cover' | 'album' | 'other'

  @Prop({ required: true })
  url: string;

  @Prop()
  size?: number; // Dung lượng tệp tin bằng bytes

  @Prop()
  mimeType?: string; // e.g. image/jpeg, image/png

  @Prop()
  filename?: string; // Tên file ban đầu
}

export const MediaSchema = SchemaFactory.createForClass(Media);
