import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type GuestbookDocument = Guestbook & Document;

@Schema({ timestamps: true, collection: 'guestbooks' })
export class Guestbook {
  @Prop({ type: Types.ObjectId, ref: 'Wedding', required: true, index: true })
  weddingId: Types.ObjectId; // Đổi sang tham chiếu weddingId (ObjectId)

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  message: string;

  @Prop({ default: true, index: true })
  isApproved: boolean; // Thêm trường duyệt lưu bút (mặc định cho phép hiển thị)
}

export const GuestbookSchema = SchemaFactory.createForClass(Guestbook);
