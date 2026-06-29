import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { User, UserSchema } from './schemas/user.schema';
import { Wedding, WeddingSchema } from '../weddings/schemas/wedding.schema';
import {
  Guestbook,
  GuestbookSchema,
} from '../guestbooks/schemas/guestbook.schema';
import { Guest, GuestSchema } from '../guests/schemas/guest.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Wedding.name, schema: WeddingSchema },
      { name: Guestbook.name, schema: GuestbookSchema },
      { name: Guest.name, schema: GuestSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService, MongooseModule],
})
export class UsersModule {}
