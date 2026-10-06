import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type WeddingDocument = Wedding & Document;

// thông tin ngân hàngs
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

// thông tin liên hệ
@Schema()
class ContactInfo {
  @Prop()
  groomPhone?: string;

  @Prop()
  bridePhone?: string;

  @Prop()
  email?: string;
}

// cài đặt: hiển thị và không hiển thị
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

// seo
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
  ownerId: Types.ObjectId; // Chủ sở hữu thiệp cưới (khách hàng)

  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  createdBy: Types.ObjectId; // Người thực sự tạo thiệp cưới (Admin, CTV hoặc chính khách hàng)

  @Prop({ required: true, unique: true, index: true })
  slug: string; // e.g. "minh-lan"

  @Prop({ type: Types.ObjectId, ref: 'Template', required: true })
  templateId: Types.ObjectId; // Liên kết tới Template

  @Prop({ required: true, default: '1.0.0' })
  templateVersion: string; // Khóa phiên bản template khi tạo thiệp cưới

  // thông tin chú rễ
  @Prop({ required: true })
  groomName: string;

  @Prop()
  groomFatherName?: string;

  @Prop()
  groomMotherName?: string;

  @Prop()
  groomRank?: string; // Thứ bậc (ví dụ: Trưởng nam, Thứ nam, Út nam)

  @Prop()
  groomAddress?: string; // Địa chỉ nhà nam

  // thông tin cô dâu
  @Prop({ required: true })
  brideName: string;

  @Prop()
  brideFatherName?: string;

  @Prop()
  brideMotherName?: string;

  @Prop()
  brideRank?: string; // Thứ bậc (ví dụ: Trưởng nữ, Thứ nữ, Út nữ)

  @Prop()
  brideAddress?: string; // Địa chỉ nhà nữ

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

  @Prop()
  musicUrl?: string;

  @Prop({ required: true, default: 'draft', index: true })
  status: string; // 'draft' | 'published' | 'hidden'

  @Prop({ default: 'fb', index: true })
  source?: string; // 'fb' | 'zalo' | 'ins' | 'tiktok' | 'demo' | 'other'

  @Prop({ default: 0 })
  views: number;

  @Prop({ type: Date, default: null, index: true })
  deletedAt: Date | null; // Phục vụ Soft Delete
}

export const WeddingSchema = SchemaFactory.createForClass(Wedding);
