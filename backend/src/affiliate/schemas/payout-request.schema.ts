import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type PayoutRequestDocument = PayoutRequest & Document;

@Schema({ _id: false })
class BankInfo {
  @Prop({ required: true })
  bankName: string;

  @Prop({ required: true })
  accountName: string;

  @Prop({ required: true })
  accountNumber: string;
}

@Schema({ timestamps: true, collection: "payout_requests" })
export class PayoutRequest {
  @Prop({ type: Types.ObjectId, ref: "User", required: true, index: true })
  affiliateId: Types.ObjectId; // Người yêu cầu rút tiền (Cộng tác viên)

  @Prop({ required: true })
  amount: number; // Số tiền muốn rút

  @Prop({ type: BankInfo, required: true })
  bankInfo: BankInfo; // Tài khoản nhận tiền

  @Prop({ required: true, default: "pending" })
  status: string; // 'pending' | 'approved' | 'rejected'
}

export const PayoutRequestSchema = SchemaFactory.createForClass(PayoutRequest);
