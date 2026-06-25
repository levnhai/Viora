import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type SubscriptionDocument = Subscription & Document;

@Schema({ timestamps: true, collection: 'subscriptions' })
export class Subscription {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  userId: Types.ObjectId;

  @Prop({ required: true, default: 'free', index: true })
  plan: string; // 'free' | 'pro' | 'premium'

  @Prop({ required: true, default: 'active', index: true })
  status: string; // 'active' | 'expired' | 'cancelled'

  @Prop({ required: true })
  expiredAt: Date;
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
