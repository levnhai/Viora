import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    let token = request.cookies?.token;

    if (!token) {
      const authHeader = request.headers.authorization;
      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
      }
    }

    if (!token) {
      throw new UnauthorizedException('Thiếu mã token xác thực');
    }
    const secret = this.configService.get<string>('JWT_SECRET') || 'viora_wedding_secret_key';

    try {
      const [data, signature] = token.split('.');
      if (!data || !signature) {
        throw new UnauthorizedException('Định dạng token không hợp lệ');
      }

      const expectedSignature = crypto
        .createHmac('sha256', secret)
        .update(data)
        .digest('base64');

      if (signature !== expectedSignature) {
        throw new UnauthorizedException('Token không chính xác hoặc đã hết hạn');
      }

      const user = JSON.parse(Buffer.from(data, 'base64').toString('utf8'));
      request.user = user;
      return true;
    } catch (err) {
      throw new UnauthorizedException('Lỗi xác thực token');
    }
  }
}
