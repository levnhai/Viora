import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Template, TemplateSchema } from './schemas/template.schema';
import {
  TemplateSection,
  TemplateSectionSchema,
} from './schemas/template_sections.schema';
import { TemplatesController } from './templates.controller';
import { TemplatesService } from './templates.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Template.name, schema: TemplateSchema },
      { name: TemplateSection.name, schema: TemplateSectionSchema },
    ]),
  ],
  controllers: [TemplatesController],
  providers: [TemplatesService],
  exports: [MongooseModule, TemplatesService],
})
export class TemplatesModule {}
