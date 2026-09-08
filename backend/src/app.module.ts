import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { SystemModule } from './modules/system/system.module';
import { WeddingsModule } from './modules/weddings/weddings.module';
import { GuestsModule } from './modules/guests/guests.module';
import { GuestbooksModule } from './modules/guestbooks/guestbooks.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { TemplatesModule } from './modules/templates/templates.module';
import { MediaModule } from './modules/media/media.module';
import { SocketModule } from './modules/socket/socket.module';
import { TemplateRequestsModule } from './modules/template-requests/template-requests.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { AppCacheModule } from './modules/cache/cache.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV || 'development'}`, '.env'],
    }),
    AppCacheModule,
    ThrottlerModule.forRoot([
      {
        name: 'default',
        ttl: 60000,
        limit: 60,
      },
    ]),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri:
          configService.get<string>('MONGO_URI') ||
          'mongodb://localhost:27017/wedding-invitations',
      }),
      inject: [ConfigService],
    }),
    SystemModule,
    WeddingsModule,
    GuestsModule,
    GuestbooksModule,
    AuthModule,
    UsersModule,
    TemplatesModule,
    MediaModule,
    SocketModule,
    TemplateRequestsModule,
    AnalyticsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
