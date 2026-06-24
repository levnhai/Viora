import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, UserSchema } from './schemas/user.schema';
import { Wedding, WeddingSchema } from '../wedding/schemas/wedding.schema';
import { Guestbook, GuestbookSchema } from '../wedding/schemas/guestbook.schema';
import { Guest, GuestSchema } from '../wedding/schemas/guest.schema';

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
  exports: [UserService],
})
export class UserModule {}
