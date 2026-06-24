import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TemplatePurchaseDocument = TemplatePurchase & Document;

@Schema({ timestamps: true, collection: 'template_purchases' })
export class TemplatePurchase {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Template', required: true, index: true })
  templateId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Payment', index: true })
  paymentId?: Types.ObjectId;

  @Prop({ required: true })
  purchasedPrice: number;

  @Prop({ required: true, default: 'completed' })
  status: string; // 'pending' | 'completed' | 'failed'
}

export const TemplatePurchaseSchema = SchemaFactory.createForClass(TemplatePurchase);
