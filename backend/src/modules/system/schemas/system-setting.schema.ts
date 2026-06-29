import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type SystemSettingDocument = SystemSetting & Document;

@Schema({ timestamps: true, collection: 'system_settings' })
export class SystemSetting {
  @Prop({ required: true, unique: true, index: true })
  key: string; // e.g. "max_gallery_images", "allowed_upload_types"

  @Prop({ type: MongooseSchema.Types.Mixed, required: true })
  value: any; // Cấu hình giá trị động (number, string, array, object...)
}

export const SystemSettingSchema = SchemaFactory.createForClass(SystemSetting);
