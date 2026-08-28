import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AnalyticsVisitDocument = AnalyticsVisit & Document;

@Schema({ timestamps: true })
export class AnalyticsVisit {
  @Prop({ required: true, index: true })
  visitorId: string;

  @Prop({ default: false })
  isReturning: boolean;

  @Prop({ required: true, index: true })
  path: string;

  @Prop({ index: true })
  templateSlug?: string;

  @Prop({ default: 'unknown', index: true })
  deviceType: 'desktop' | 'mobile' | 'tablet' | 'unknown';

  @Prop({ default: 'Other', index: true })
  browser: string;

  @Prop({ default: 'Other' })
  os: string;

  @Prop()
  referrer?: string;

  @Prop()
  ipAddress?: string;

  @Prop({ default: 'TP. Hồ Chí Minh' })
  city?: string;

  @Prop({ type: Date, default: Date.now, expires: '90d' }) // Tự động xóa sau 90 ngày để tối ưu dung lượng DB
  createdAt: Date;
}

export const AnalyticsVisitSchema = SchemaFactory.createForClass(AnalyticsVisit);
AnalyticsVisitSchema.index({ createdAt: -1 });
AnalyticsVisitSchema.index({ templateSlug: 1, createdAt: -1 });
