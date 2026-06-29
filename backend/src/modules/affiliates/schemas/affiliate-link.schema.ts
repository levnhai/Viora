import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AffiliateLinkDocument = AffiliateLink & Document;

@Schema({ timestamps: true, collection: 'affiliate_links' })
export class AffiliateLink {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  affiliateId: Types.ObjectId; // ID tài khoản CTV

  @Prop({ required: true, unique: true, index: true })
  refCode: string; // Mã CTV giới thiệu (e.g. "CTV123")

  @Prop({ required: true, default: 0 })
  clickCount: number; // Thống kê số lượt click vào link giới thiệu

  @Prop({ required: true, default: 0 })
  conversionCount: number; // Số đơn hàng/thiệp cưới được tạo thành công qua link này
}

export const AffiliateLinkSchema = SchemaFactory.createForClass(AffiliateLink);
