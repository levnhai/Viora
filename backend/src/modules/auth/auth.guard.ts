import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies?.token || request.headers.authorization?.replace(/^Bearer\s+/, '');
    const secret = this.configService.get<string>('JWT_SECRET') || 'viora_jwt_secret_key_2026_safe';
    if (!token) throw new UnauthorizedException('Thiếu mã token xác thực');
    try {
      const [header, payload, signature] = token.split('.');
      if (!header || !payload || !signature) throw new Error();
      const expected = crypto.createHmac('sha256', secret).update(`${header}.${payload}`).digest('base64url');
      if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) throw new Error();
      const user = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
      if (!user.exp || user.exp < Math.floor(Date.now() / 1000)) throw new Error();
      request.user = user; return true;
    } catch { throw new UnauthorizedException('Lỗi xác thực token'); }
  }
}