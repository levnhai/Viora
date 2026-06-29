import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

export type PaymentDocument = Payment & Document;

@Schema({ timestamps: true, collection: 'payments' })
export class Payment {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Wedding', index: true })
  weddingId?: Types.ObjectId; // Giao dịch áp dụng mở khóa cho thiệp cưới này

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true, default: 'VND' })
  currency: string; // Đơn vị tiền tệ (mặc định VND)

  @Prop({ required: true, default: 'bank_transfer', index: true })
  paymentMethod: string; // 'bank_transfer' | 'momo' | 'vnpay'

  @Prop({ required: true, unique: true, index: true })
  transactionId: string; // Mã giao dịch duy nhất từ cổng thanh toán

  @Prop({ required: true, default: 'pending', index: true })
  status: string; // 'pending' | 'completed' | 'failed'

  @Prop({ required: true, index: true, default: 'template' })
  itemType: string; // 'template' | 'subscription'

  @Prop({ type: Types.ObjectId, index: true })
  itemId?: Types.ObjectId; // ID của template hoặc gói subscription được mua

  @Prop({ type: MongooseSchema.Types.Mixed, default: {} })
  itemSnapshot: any; // Snapshot lưu thông tin sản phẩm lúc mua (tên, giá...) để tránh sai lệch khi đổi giá

  @Prop({ type: MongooseSchema.Types.Mixed })
  providerResponse?: any; // Lưu trữ JSON phản hồi từ gateway thanh toán
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
