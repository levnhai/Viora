import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type WeddingEventDocument = WeddingEvent & Document;

@Schema({ timestamps: true, collection: 'wedding_events' })
export class WeddingEvent {
  @Prop({ type: Types.ObjectId, ref: 'Wedding', required: true, index: true })
  weddingId: Types.ObjectId;

  @Prop({ required: true })
  title: string; // e.g. "Lễ Vu Quy", "Tiệc Chiêu Đãi"

  @Prop({ required: true })
  time: string; // e.g. "18:00"

  @Prop({ required: true })
  date: Date; // e.g. Ngày cưới cử hành sự kiện

  @Prop({ required: true })
  locationName: string; // e.g. "Nhà hàng tiệc cưới Đại Dương"

  @Prop({ required: true })
  address: string; // e.g. "123 Đường Nguyễn Huệ, Quận 1, TP. HCM"

  @Prop()
  mapUrl?: string; // Google Maps embed/redirect link
}

export const WeddingEventSchema = SchemaFactory.createForClass(WeddingEvent);
