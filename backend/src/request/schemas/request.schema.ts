import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type InvitationRequestDocument = InvitationRequest & Document;

@Schema({ timestamps: true, collection: 'invitation_requests' })
export class InvitationRequest {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop()
  email?: string;

  @Prop({ required: true })
  templateId: number;

  @Prop({ required: true })
  templateName: string;

  @Prop({ required: true })
  planName: string;

  @Prop()
  weddingDate?: Date;

  @Prop()
  notes?: string;

  @Prop({ default: 'pending' })
  status: string; // 'pending', 'contacted', 'completed'
}

export const InvitationRequestSchema = SchemaFactory.createForClass(InvitationRequest);
