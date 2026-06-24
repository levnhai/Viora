import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type WeddingTimelineDocument = WeddingTimeline & Document;

@Schema({ timestamps: true, collection: 'wedding_timelines' })
export class WeddingTimeline {
  @Prop({ type: Types.ObjectId, ref: 'Wedding', required: true, index: true })
  weddingId: Types.ObjectId;

  @Prop({ required: true })
  year: string; // e.g. "2020" hoặc mốc thời gian

  @Prop({ required: true })
  title: string; // e.g. "Lần đầu gặp gỡ"

  @Prop({ required: true })
  description: string;

  @Prop()
  imageUrl?: string;
}

export const WeddingTimelineSchema = SchemaFactory.createForClass(WeddingTimeline);
