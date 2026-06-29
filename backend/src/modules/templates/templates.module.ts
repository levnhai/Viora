import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Template, TemplateSchema } from './schemas/template.schema';
import {
  TemplateSection,
  TemplateSectionSchema,
} from './schemas/template_sections.schema';
import {
  TemplatePurchase,
  TemplatePurchaseSchema,
} from './schemas/template-purchase.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Template.name, schema: TemplateSchema },
      { name: TemplateSection.name, schema: TemplateSectionSchema },
      { name: TemplatePurchase.name, schema: TemplatePurchaseSchema },
    ]),
  ],
  exports: [MongooseModule],
})
export class TemplatesModule {}
