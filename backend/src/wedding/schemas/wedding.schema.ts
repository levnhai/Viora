import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WeddingDocument = Wedding & Document;

@Schema()
class WeddingEvent {
  @Prop({ required: true })
  title: string; // e.g. "Lễ Vu Quy", "Tiệc Chiêu Đãi"

  @Prop({ required: true })
  time: string; // e.g. "18:00"

  @Prop({ required: true })
  date: string; // e.g. "15/11/2025" or ISO string

  @Prop({ required: true })
  locationName: string; // e.g. "Nhà hàng tiệc cưới Đại Dương"

  @Prop({ required: true })
  address: string; // e.g. "123 Đường Nguyễn Huệ, Quận 1, TP. HCM"

  @Prop()
  mapUrl?: string; // Google Maps embed/redirect link
}

@Schema()
class LoveStoryTimeline {
  @Prop({ required: true })
  year: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  imageUrl?: string;
}

@Schema()
class GiftRegistryInfo {
  @Prop()
  groomBankName?: string;

  @Prop()
  groomAccountNumber?: string;

  @Prop()
  groomAccountName?: string;

  @Prop()
  groomQrUrl?: string;

  @Prop()
  brideBankName?: string;

  @Prop()
  brideAccountNumber?: string;

  @Prop()
  brideAccountName?: string;

  @Prop()
  brideQrUrl?: string;
}

@Schema()
class ContactInfo {
  @Prop()
  groomPhone?: string;

  @Prop()
  bridePhone?: string;

  @Prop()
  email?: string;
}

@Schema({ timestamps: true, collection: 'weddings' })
export class Wedding {
  @Prop({ required: true, unique: true, index: true })
  slug: string; // e.g. "minh-lan"

  @Prop({ required: true, default: 1 })
  templateId: number;

  @Prop({ required: true })
  groomName: string;

  @Prop()
  groomFatherName?: string;

  @Prop()
  groomMotherName?: string;

  @Prop({ required: true })
  brideName: string;

  @Prop()
  brideFatherName?: string;

  @Prop()
  brideMotherName?: string;

  @Prop({ required: true })
  weddingDate: Date;

  @Prop()
  weddingTime?: string;

  @Prop({ type: [WeddingEvent], default: [] })
  events: WeddingEvent[];

  @Prop({ type: [LoveStoryTimeline], default: [] })
  timeline: LoveStoryTimeline[];

  @Prop({ type: [String], default: [] })
  galleryImages: string[];

  @Prop({ type: GiftRegistryInfo })
  giftInfo?: GiftRegistryInfo;

  @Prop({ type: ContactInfo })
  contactInfo?: ContactInfo;
}

export const WeddingSchema = SchemaFactory.createForClass(Wedding);
