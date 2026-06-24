import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type RefreshTokenDocument = RefreshToken & Document;

@Schema({ timestamps: { createdAt: true, updatedAt: false }, collection: "refresh_tokens" })
export class RefreshToken {
  @Prop({ type: Types.ObjectId, ref: "User", required: true, index: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  tokenHash: string;

  @Prop({ required: true, index: { expireAfterSeconds: 0 } })
  expiredAt: Date; // TTL Index: Tự động xóa khi hết hạn
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);
