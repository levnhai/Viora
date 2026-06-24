import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

export type PaymentDocument = Payment & Document;

@Schema({ timestamps: true, collection: 'payments' })
export class Payment {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Wedding', index: true })
  weddingId?: Types.ObjectId; // Giao dịch áp dụng mở khóa cho thiệp cưới này

  @Prop({ type: Types.ObjectId, ref: 'Template', index: true })
  templateId?: Types.ObjectId; // ID template được mở khóa nếu mua lẻ

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true, default: 'bank_transfer', index: true })
  paymentMethod: string; // 'bank_transfer' | 'momo' | 'vnpay'

  @Prop({ required: true, unique: true, index: true })
  transactionId: string; // Mã giao dịch duy nhất từ cổng thanh toán

  @Prop({ required: true, default: 'pending', index: true })
  status: string; // 'pending' | 'completed' | 'failed'

  @Prop({ required: true, index: true })
  planName: string; // 'premium' | 'business' | 'unlock_template'

  @Prop({ type: MongooseSchema.Types.Mixed })
  providerResponse?: any; // Lưu trữ JSON phản hồi từ gateway thanh toán
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
