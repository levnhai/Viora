import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true, collection: 'users' })
export class User {
  @Prop({ required: true, unique: true, index: true })
  username: string;

  @Prop({ unique: true, index: true, sparse: true })
  email?: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ default: '' })
  fullName: string;

  @Prop({ default: '' })
  phone: string;

  @Prop({ default: '' })
  avatar: string;

  @Prop({ required: true, default: 'user' })
  role: string; // 'user' | 'staff' | 'admin'

  @Prop({ required: true, default: 'customer' })
  accountType: string; // 'customer' | 'affiliate' | 'admin'

  @Prop({ unique: true, index: true, sparse: true })
  affiliateCode?: string;

  @Prop({ default: false })
  isEmailVerified: boolean;

  @Prop({ default: 'active' })
  status: string; // 'active' | 'blocked'

  @Prop()
  lastLoginAt?: Date;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop()
  deletedAt?: Date;

  // Giữ lại weddingSlug để tương thích ngược nếu cần thiết, hoặc có thể lưu trữ động
  @Prop()
  weddingSlug?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
