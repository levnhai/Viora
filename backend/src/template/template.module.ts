import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Template, TemplateSchema } from './schemas/template.schema';
import { TemplatePurchase, TemplatePurchaseSchema } from './schemas/template-purchase.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Template.name, schema: TemplateSchema },
      { name: TemplatePurchase.name, schema: TemplatePurchaseSchema },
    ]),
  ],
  exports: [MongooseModule],
})
export class TemplateModule {}
