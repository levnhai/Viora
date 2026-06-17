import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WeddingController } from './wedding.controller';
import { WeddingService } from './wedding.service';
import { Wedding, WeddingSchema } from './schemas/wedding.schema';
import { Rsvp, RsvpSchema } from './schemas/rsvp.schema';
import { Guestbook, GuestbookSchema } from './schemas/guestbook.schema';
import { Guest, GuestSchema } from './schemas/guest.schema';
import { User, UserSchema } from '../user/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Wedding.name, schema: WeddingSchema },
      { name: Rsvp.name, schema: RsvpSchema },
      { name: Guestbook.name, schema: GuestbookSchema },
      { name: Guest.name, schema: GuestSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [WeddingController],
  providers: [WeddingService],
  exports: [WeddingService],
})
export class WeddingModule {}

