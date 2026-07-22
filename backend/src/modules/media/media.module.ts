import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Media, MediaSchema } from './schemas/media.schema';
import { Wedding, WeddingSchema } from '../weddings/schemas/wedding.schema';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Media.name, schema: MediaSchema },
      { name: Wedding.name, schema: WeddingSchema },
    ]),
    CloudinaryModule,
  ],
  controllers: [MediaController],
  providers: [MediaService],
  exports: [MongooseModule, MediaService],
})
export class MediaModule {}
