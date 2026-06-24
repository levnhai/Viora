import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type WeddingDocument = Wedding & Document;

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

@Schema()
class WeddingSettings {
  @Prop({ default: true })
  showRSVP: boolean;

  @Prop({ default: true })
  showGuestbook: boolean;

  @Prop({ default: true })
  musicEnabled: boolean;

  @Prop()
  musicUrl?: string;
}

@Schema()
class WeddingSEO {
  @Prop()
  title?: string;

  @Prop()
  description?: string;

  @Prop()
  ogImage?: string;
}

@Schema({ timestamps: true, collection: 'weddings' })
export class Wedding {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  ownerId: Types.ObjectId; // Đổi liên kết chủ sở hữu thành ownerId (ref: User)

  @Prop({ required: true, unique: true, index: true })
  slug: string; // e.g. "minh-lan"

  @Prop({ type: Types.ObjectId, ref: 'Template', required: true })
  templateId: Types.ObjectId; // Liên kết tới Template schema

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

  @Prop({ type: [String], default: [] })
  galleryImages: string[];

  @Prop({ type: GiftRegistryInfo })
  giftInfo?: GiftRegistryInfo;

  @Prop({ type: ContactInfo })
  contactInfo?: ContactInfo;

  @Prop({ type: WeddingSettings, default: () => ({}) })
  settings?: WeddingSettings;

  @Prop({ type: WeddingSEO, default: () => ({}) })
  seo?: WeddingSEO;

  @Prop({ required: true, default: 'draft', index: true })
  status: string; // 'draft' | 'published' | 'hidden'

  @Prop({ default: 0 })
  views: number;
}

export const WeddingSchema = SchemaFactory.createForClass(Wedding);
