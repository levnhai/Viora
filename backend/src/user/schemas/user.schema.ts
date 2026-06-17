import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true, collection: 'users' })
export class User {
  @Prop({ required: true, unique: true, index: true })
  username: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ required: true, default: 'buyer' })
  role: string; // 'admin' | 'buyer'

  @Prop()
  weddingSlug?: string; // links to their wedding if they are a buyer
}

export const UserSchema = SchemaFactory.createForClass(User);
