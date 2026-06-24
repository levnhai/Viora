import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RequestModule } from './request/request.module';
import { WeddingModule } from './wedding/wedding.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AffiliateModule } from './affiliate/affiliate.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
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
    RequestModule,
    WeddingModule,
    AuthModule,
    UserModule,
    AffiliateModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
