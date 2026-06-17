import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WeddingController } from './wedding.controller';
import { WeddingService } from './wedding.service';
import { Wedding, WeddingSchema } from './schemas/wedding.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Wedding.name, schema: WeddingSchema },
    ]),
  ],
  controllers: [WeddingController],
  providers: [WeddingService],
  exports: [WeddingService],
})
export class WeddingModule {}
