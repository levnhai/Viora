import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TemplateRequestDocument = TemplateRequest & Document;

@Schema({ timestamps: true })
export class TemplateRequest {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  phone: string;

  @Prop()
  notes?: string;

  @Prop()
  templateCode?: string;

  @Prop()
  templateName?: string;

  @Prop({ default: 'new' })
  status: string; // 'new' | 'contacted' | 'completed' | 'cancelled'
}

export const TemplateRequestSchema = SchemaFactory.createForClass(TemplateRequest);
