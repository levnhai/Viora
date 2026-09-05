import { Module } from '@nestjs/common';
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
import { NewsModule } from './modules/news/news.module';
import { SocketModule } from './modules/socket/socket.module';
import { TemplateRequestsModule } from './modules/template-requests/template-requests.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV || 'development'}`, '.env'],
    }),
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
    NewsModule,
    SocketModule,
    TemplateRequestsModule,
    AnalyticsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
