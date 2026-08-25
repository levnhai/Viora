import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AnalyticsVisit, AnalyticsVisitSchema } from './schemas/analytics-visit.schema';
import { AnalyticsDaily, AnalyticsDailySchema } from './schemas/analytics-daily.schema';
import { Wedding, WeddingSchema } from '../weddings/schemas/wedding.schema';
import { Template, TemplateSchema } from '../templates/schemas/template.schema';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import { SocketModule } from '../socket/socket.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AnalyticsVisit.name, schema: AnalyticsVisitSchema },
      { name: AnalyticsDaily.name, schema: AnalyticsDailySchema },
      { name: Wedding.name, schema: WeddingSchema },
      { name: Template.name, schema: TemplateSchema },
    ]),
    SocketModule,
  ],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
  exports: [AnalyticsService],
})
export class AnalyticsModule {}
