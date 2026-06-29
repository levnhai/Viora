import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GuestbooksController } from './guestbooks.controller';
import { GuestbooksService } from './guestbooks.service';
import { Guestbook, GuestbookSchema } from './schemas/guestbook.schema';
import { Wedding, WeddingSchema } from '../weddings/schemas/wedding.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Guestbook.name, schema: GuestbookSchema },
      { name: Wedding.name, schema: WeddingSchema },
    ]),
  ],
  controllers: [GuestbooksController],
  providers: [GuestbooksService],
  exports: [GuestbooksService],
})
export class GuestbooksModule {}
