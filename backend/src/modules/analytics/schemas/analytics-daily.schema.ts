import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AnalyticsDailyDocument = AnalyticsDaily & Document;

@Schema({ timestamps: true })
export class AnalyticsDaily {
  @Prop({ required: true, unique: true, index: true })
  date: string; // Format: 'YYYY-MM-DD'

  @Prop({ default: 0 })
  totalPageviews: number;

  @Prop({ default: 0 })
  uniqueVisitors: number;

  @Prop({ default: 0 })
  newVisitors: number;

  @Prop({ default: 0 })
  returningVisitors: number;

  @Prop({ type: Map, of: Number, default: {} })
  devices: Map<string, number>; // { desktop: 10, mobile: 50, tablet: 2 }

  @Prop({ type: Map, of: Number, default: {} })
  browsers: Map<string, number>; // { Chrome: 40, Safari: 20, 'Zalo In-App': 5 }

  @Prop({ type: Map, of: Number, default: {} })
  templateViews: Map<string, number>; // { 'temp_1': 15, 'temp_2': 30 }

  @Prop({ type: Map, of: Number, default: {} })
  locations: Map<string, number>; // { 'TP. Hồ Chí Minh': 120, 'Hà Nội': 85 }
}

export const AnalyticsDailySchema =
  SchemaFactory.createForClass(AnalyticsDaily);
