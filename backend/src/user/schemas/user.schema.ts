import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true, collection: 'users' })
export class User {
  @Prop({ required: true, unique: true, index: true })
  username: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ required: true, default: 'user' })
  role: string; // 'admin' | 'staff' | 'user'

  @Prop()
  weddingSlug?: string; // links to their wedding if they are a buyer

  @Prop({ default: '' })
  name: string;

  @Prop({ default: '' })
  phone: string;

  @Prop({ default: '' })
  email: string;

  @Prop({ default: true })
  emailNotification: boolean;

  @Prop({ default: true })
  showOnHomepage: boolean;

  @Prop({ default: 'free' })
  accountType: string;

  @Prop({ default: 'Magic link' })
  securityType: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
