import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type GuestbookDocument = Guestbook & Document;

@Schema({ timestamps: true, collection: 'guestbooks' })
export class Guestbook {
  @Prop({ type: Types.ObjectId, ref: 'Wedding', required: true, index: true })
  weddingId: Types.ObjectId; // Tham chiếu weddingId (ObjectId)

  @Prop({ required: true })
  name: string;

  @Prop({ default: '' })
  avatar?: string; // Ảnh đại diện của người gửi lời chúc (nếu có)

  @Prop({ required: true })
  message: string;

  @Prop({ default: true, index: true })
  isApproved: boolean; // Trạng thái phê duyệt hiển thị lưu bút (mặc định true)

  @Prop({ type: Date, default: null, index: true })
  deletedAt: Date | null; // Phục vụ Soft Delete
}

export const GuestbookSchema = SchemaFactory.createForClass(Guestbook);
