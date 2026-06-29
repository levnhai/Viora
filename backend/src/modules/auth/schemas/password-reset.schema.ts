import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PasswordResetDocument = PasswordReset & Document;

@Schema({
  timestamps: { createdAt: true, updatedAt: false },
  collection: 'password_resets',
})
export class PasswordReset {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  userId: Types.ObjectId;

  @Prop({ required: true, index: true })
  token: string;

  @Prop({ required: true, index: { expireAfterSeconds: 0 } })
  expiredAt: Date; // TTL Index: Tự động xóa khi hết hạn
}

export const PasswordResetSchema = SchemaFactory.createForClass(PasswordReset);
