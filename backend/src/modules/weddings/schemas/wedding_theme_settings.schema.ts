import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type WeddingThemeSettingDocument = WeddingThemeSetting & Document;

@Schema({ timestamps: true, collection: 'wedding_theme_settings' })
export class WeddingThemeSetting {
  @Prop({
    type: Types.ObjectId,
    ref: 'Wedding',
    required: true,
    unique: true,
    index: true,
  })
  weddingId: Types.ObjectId;

  @Prop({ default: '#ff6b81' })
  primaryColor: string; // Màu chủ đạo

  @Prop({ default: '#f1f2f6' })
  secondaryColor: string; // Màu phụ

  @Prop({ default: 'Dancing Script' })
  fontHeading: string; // Font tiêu đề

  @Prop({ default: 'Inter' })
  fontBody: string; // Font nội dung

  @Prop({ default: false })
  musicAutoplay: boolean; // Tự động phát nhạc nền

  @Prop({ default: '' })
  musicUrl: string; // URL nhạc nền

  @Prop({ default: 'none' })
  effectType: string; // Hiệu ứng rơi lá, hoa đào, tuyết... ('none', 'leaves', 'cherry_blossom', 'snow')
}

export const WeddingThemeSettingSchema =
  SchemaFactory.createForClass(WeddingThemeSetting);
