import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CommissionDocument = Commission & Document;

@Schema({ timestamps: true, collection: 'commissions' })
export class Commission {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  affiliateId: Types.ObjectId; // Người nhận hoa hồng (Cộng tác viên)

  @Prop({ type: Types.ObjectId, ref: 'Wedding', required: true, index: true })
  weddingId: Types.ObjectId; // Đám cưới mang lại nguồn thu (đã đổi từ weddingSlug)

  @Prop({ type: Types.ObjectId, ref: 'Payment', required: true, index: true })
  paymentId: Types.ObjectId; // Đơn thanh toán tương ứng tạo ra hoa hồng

  @Prop({ required: true })
  orderAmount: number; // Số tiền khách đã thanh toán mua mẫu thiệp

  @Prop({ required: true })
  commissionPercent: number; // Tỷ lệ hoa hồng ghi nhận (e.g. 20%)

  @Prop({ required: true })
  commissionAmount: number; // Số tiền hoa hồng thực nhận (orderAmount * commissionPercent / 100)

  @Prop({ required: true, default: 'pending', index: true })
  status: string; // 'pending' | 'approved' | 'paid'
}

export const CommissionSchema = SchemaFactory.createForClass(Commission);
