import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WeddingsController } from './weddings.controller';
import { WeddingsService } from './weddings.service';
import { Wedding, WeddingSchema } from './schemas/wedding.schema';
import {
  WeddingSection,
  WeddingSectionSchema,
} from './schemas/wedding_sections.schema';
import {
  WeddingThemeSetting,
  WeddingThemeSettingSchema,
} from './schemas/wedding_theme_settings.schema';
import { Template, TemplateSchema } from '../templates/schemas/template.schema';
import {
  TemplateSection,
  TemplateSectionSchema,
} from '../templates/schemas/template_sections.schema';
import { User, UserSchema } from '../users/schemas/user.schema';
import { Media, MediaSchema } from '../media/schemas/media.schema';
import { Guest, GuestSchema } from '../guests/schemas/guest.schema';
import {
  Guestbook,
  GuestbookSchema,
} from '../guestbooks/schemas/guestbook.schema';

import { AuthModule } from '../auth/auth.module';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Wedding.name, schema: WeddingSchema },
      { name: WeddingSection.name, schema: WeddingSectionSchema },
      { name: WeddingThemeSetting.name, schema: WeddingThemeSettingSchema },
      { name: Template.name, schema: TemplateSchema },
      { name: TemplateSection.name, schema: TemplateSectionSchema },
      { name: User.name, schema: UserSchema },
      { name: Media.name, schema: MediaSchema },
      { name: Guest.name, schema: GuestSchema },
      { name: Guestbook.name, schema: GuestbookSchema },
    ]),
    AuthModule,
    CloudinaryModule,
  ],
  controllers: [WeddingsController],
  providers: [WeddingsService],
  exports: [WeddingsService, MongooseModule],
})
export class WeddingsModule {}
