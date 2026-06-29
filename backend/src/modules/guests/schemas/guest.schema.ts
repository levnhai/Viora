import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type GuestDocument = Guest & Document;

@Schema({ timestamps: true, collection: 'guests' })
export class Guest {
  @Prop({ type: Types.ObjectId, ref: 'Wedding', required: true, index: true })
  weddingId: Types.ObjectId; // Đổi sang tham chiếu weddingId (ObjectId)

  @Prop({ required: true })
  name: string;

  @Prop()
  phone?: string;

  @Prop()
  relationship?: string; // 'Bạn chú rể', 'Bạn cô dâu', 'Họ hàng nhà trai', 'Họ hàng nhà gái', 'Đồng nghiệp', v.v.

  @Prop({ default: 'pending', index: true })
  rsvpStatus: string; // 'pending' | 'confirmed' | 'declined'

  @Prop({ default: 0 })
  guestsCount: number; // số người đi cùng khi xác nhận

  @Prop()
  note?: string; // Lời nhắn gửi riêng cho CD-CR (gộp từ bảng rsvps cũ)

  @Prop({ unique: true, index: true, sparse: true })
  inviteCode?: string; // Mã khách mời duy nhất

  @Prop()
  qrCode?: string; // URL hoặc nội dung mã QR Check-in

  @Prop()
  tableNumber?: string; // Số bàn tiệc được sắp xếp

  @Prop({ default: false })
  checkedIn: boolean; // Trạng thái đã check-in hay chưa

  @Prop()
  checkedInAt?: Date; // Thời điểm check-in thực tế

  @Prop({ type: Date, default: null, index: true })
  deletedAt: Date | null; // Phục vụ Soft Delete
}

export const GuestSchema = SchemaFactory.createForClass(Guest);
