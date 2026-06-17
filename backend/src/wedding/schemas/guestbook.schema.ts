import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GuestbookDocument = Guestbook & Document;

@Schema({ timestamps: true, collection: 'guestbooks' })
export class Guestbook {
  @Prop({ required: true, index: true })
  weddingSlug: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  message: string;
}

export const GuestbookSchema = SchemaFactory.createForClass(Guestbook);
