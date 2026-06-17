import { Injectable, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { User, UserDocument } from '../user/schemas/user.schema';
import * as crypto from 'crypto';

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly configService: ConfigService,
  ) {}

  async onModuleInit() {
    // Seed default users if collection is empty
    const count = await this.userModel.countDocuments().exec();
    if (count === 0) {
      console.log('--- Seeding default users (admin & buyers) ---');
      
      // Admin
      await this.createUser('admin', 'admin123', 'admin');
      
      // Buyers linked to their seeded weddings
      await this.createUser('minh-lan', '123456', 'buyer', 'minh-lan');
      await this.createUser('vanan', '123456', 'buyer', 'vanan-thibinh');
      await this.createUser('hoang-yen', '123456', 'buyer', 'hoang-yen');
      
      console.log('--- Seeding default users completed! ---');
    }
  }

  hashPassword(password: string): string {
    return crypto.createHash('sha256').update(password).digest('hex');
  }

  async createUser(username: string, passwordPlain: string, role: string, weddingSlug?: string): Promise<User> {
    const passwordHash = this.hashPassword(passwordPlain);
    const user = new this.userModel({
      username,
      passwordHash,
      role,
      weddingSlug,
    });
    return user.save();
  }

  async login(username: string, passwordPlain: string): Promise<{ token: string; role: string; weddingSlug?: string }> {
    const user = await this.userModel.findOne({ username }).exec();
    if (!user) {
      throw new UnauthorizedException('Tài khoản không tồn tại!');
    }

    const hash = this.hashPassword(passwordPlain);
    if (user.passwordHash !== hash) {
      throw new UnauthorizedException('Mật khẩu không chính xác!');
    }

    const secret = this.configService.get<string>('JWT_SECRET') || 'viora_wedding_secret_key';
    
    // Create token payload
    const payload = {
      id: user._id,
      username: user.username,
      role: user.role,
      weddingSlug: user.weddingSlug,
    };

    // Encrypt token
    const data = Buffer.from(JSON.stringify(payload)).toString('base64');
    const signature = crypto
      .createHmac('sha256', secret)
      .update(data)
      .digest('base64');
    
    const token = `${data}.${signature}`;

    return {
      token,
      role: user.role,
      weddingSlug: user.weddingSlug,
    };
  }

  async register(username: string, passwordPlain: string): Promise<{ token: string; role: string; weddingSlug?: string }> {
    const existingUser = await this.userModel.findOne({ username }).exec();
    if (existingUser) {
      throw new UnauthorizedException('Tên đăng nhập đã tồn tại!');
    }
    const user = await this.createUser(username, passwordPlain, 'buyer');
    return this.login(username, passwordPlain);
  }

}
