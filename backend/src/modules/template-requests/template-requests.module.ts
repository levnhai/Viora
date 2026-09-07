import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  TemplateRequest,
  TemplateRequestSchema,
} from './schemas/template-request.schema';
import { TemplateRequestsService } from './template-requests.service';
import { TemplateRequestsController } from './template-requests.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TemplateRequest.name, schema: TemplateRequestSchema },
    ]),
  ],
  controllers: [TemplateRequestsController],
  providers: [TemplateRequestsService],
  exports: [TemplateRequestsService],
})
export class TemplateRequestsModule {}
