import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WeddingController } from './wedding.controller';
import { WeddingService } from './wedding.service';
import { Wedding, WeddingSchema } from './schemas/wedding.schema';
import { WeddingEvent, WeddingEventSchema } from './schemas/wedding-event.schema';
import { WeddingTimeline, WeddingTimelineSchema } from './schemas/wedding-timeline.schema';
import { Guestbook, GuestbookSchema } from './schemas/guestbook.schema';
import { Guest, GuestSchema } from './schemas/guest.schema';
import { User, UserSchema } from '../user/schemas/user.schema';
import { Template, TemplateSchema } from '../template/schemas/template.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Wedding.name, schema: WeddingSchema },
      { name: WeddingEvent.name, schema: WeddingEventSchema },
      { name: WeddingTimeline.name, schema: WeddingTimelineSchema },
      { name: Guestbook.name, schema: GuestbookSchema },
      { name: Guest.name, schema: GuestSchema },
      { name: User.name, schema: UserSchema },
      { name: Template.name, schema: TemplateSchema },
    ]),
  ],
  controllers: [WeddingController],
  providers: [WeddingService],
  exports: [WeddingService, MongooseModule],
})
export class WeddingModule {}

