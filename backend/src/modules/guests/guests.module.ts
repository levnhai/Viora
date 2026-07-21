import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GuestsController } from './guests.controller';
import { GuestsService } from './guests.service';
import { Guest, GuestSchema } from './schemas/guest.schema';
import { Wedding, WeddingSchema } from '../weddings/schemas/wedding.schema';
import { SocketModule } from '../socket/socket.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Guest.name, schema: GuestSchema },
      { name: Wedding.name, schema: WeddingSchema },
    ]),
    SocketModule,
  ],
  controllers: [GuestsController],
  providers: [GuestsService],
  exports: [GuestsService],
})
export class GuestsModule {}
