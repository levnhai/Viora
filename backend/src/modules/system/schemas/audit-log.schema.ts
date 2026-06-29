import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

export type AuditLogDocument = AuditLog & Document;

@Schema({
  timestamps: { createdAt: true, updatedAt: false },
  collection: 'audit_logs',
})
export class AuditLog {
  @Prop({ type: Types.ObjectId, ref: 'User', index: true })
  userId?: Types.ObjectId; // Người thực hiện (null nếu chưa đăng nhập)

  @Prop({ required: true, index: true })
  action: string; // e.g. 'login', 'create_wedding', 'update_settings', 'payment_success'

  @Prop({ required: true, index: true })
  resourceType: string; // e.g. 'User', 'Wedding', 'Template', 'Payment'

  @Prop({ index: true })
  resourceId?: string; // ID của đối tượng bị thay đổi/truy cập

  @Prop()
  ip?: string; // IP của client

  @Prop()
  userAgent?: string; // UserAgent của trình duyệt

  @Prop({ type: MongooseSchema.Types.Mixed })
  details?: any; // Các metadata chi tiết đi kèm dưới dạng JSON
}

export const AuditLogSchema = SchemaFactory.createForClass(AuditLog);
