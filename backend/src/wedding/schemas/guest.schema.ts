import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GuestDocument = Guest & Document;

@Schema({ timestamps: true, collection: 'wedding_guests' })
export class Guest {
  @Prop({ required: true, index: true })
  weddingSlug: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  phone?: string;

  @Prop()
  relationship?: string; // 'Bạn chú rể', 'Bạn cô dâu', 'Họ hàng nhà trai', 'Họ hàng nhà gái', 'Đồng nghiệp', v.v.

  @Prop({ default: 'pending' })
  rsvpStatus: string; // 'pending' (chưa phản hồi), 'confirmed' (sẽ tham dự), 'declined' (không tham dự)

  @Prop({ default: 0 })
  guestsCount: number; // số người đi cùng khi xác nhận
}

export const GuestSchema = SchemaFactory.createForClass(Guest);
