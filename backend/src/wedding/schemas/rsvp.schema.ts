import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RsvpDocument = Rsvp & Document;

@Schema({ timestamps: true, collection: 'rsvps' })
export class Rsvp {
  @Prop({ required: true, index: true })
  weddingSlug: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, default: 'yes' })
  attend: string; // 'yes' | 'no'

  @Prop({ required: true, default: 1 })
  guests: number;

  @Prop()
  message?: string;
}

export const RsvpSchema = SchemaFactory.createForClass(Rsvp);
