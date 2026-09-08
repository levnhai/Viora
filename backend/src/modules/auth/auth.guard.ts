import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token =
      request.cookies?.token ||
      request.headers.authorization?.replace(/^Bearer\s+/i, '');

    if (!token) {
      throw new UnauthorizedException('Thiếu mã token xác thực');
    }

    try {
      const secret =
        this.configService.get<string>('JWT_SECRET') ||
        'viora_jwt_secret_key_2026_safe';

      const payload = await this.jwtService.verifyAsync(token, { secret });
      request.user = payload;
      return true;
    } catch (err) {
      if (err instanceof TokenExpiredError) {
        throw new UnauthorizedException(
          'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!',
        );
      }
      throw new UnauthorizedException(
        'Mã token không hợp lệ hoặc đã bị chỉnh sửa!',
      );
    }
  }
}
