import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type CommissionDocument = Commission & Document;

@Schema({
  timestamps: { createdAt: true, updatedAt: false },
  collection: "commissions",
})
export class Commission {
  @Prop({ type: Types.ObjectId, ref: "User", required: true, index: true })
  affiliateId: Types.ObjectId; // Người nhận hoa hồng (Cộng tác viên)

  @Prop({ required: true })
  weddingSlug: string; // Đám cưới mang lại nguồn thu

  @Prop({ required: true })
  orderAmount: number; // Số tiền khách đã thanh toán mua mẫu thiệp

  @Prop({ required: true })
  commissionAmount: number; // Số tiền hoa hồng thực nhận
}

export const CommissionSchema = SchemaFactory.createForClass(Commission);
