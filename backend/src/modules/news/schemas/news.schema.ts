import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NewsDocument = News & Document;

@Schema({ timestamps: true, collection: 'news' })
export class News {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, unique: true, index: true })
  slug: string;

  @Prop({ required: true })
  content: string;

  @Prop({ default: 'Admin' })
  author: string;

  @Prop()
  thumbnail?: string;

  @Prop({ required: true, default: 'draft', index: true })
  status: string; // 'draft' | 'published'

  @Prop({ type: Date, default: null, index: true })
  deletedAt: Date | null; // Phục vụ Soft Delete
}

export const NewsSchema = SchemaFactory.createForClass(News);
