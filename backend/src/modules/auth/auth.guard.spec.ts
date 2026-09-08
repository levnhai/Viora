import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let jwtService: JwtService;
  let configService: ConfigService;

  const secret = 'test_jwt_secret_key';

  beforeEach(() => {
    jwtService = new JwtService({ secret });
    configService = {
      get: jest.fn().mockReturnValue(secret),
    } as any;
    authGuard = new AuthGuard(jwtService, configService);
  });

  it('should allow request with valid Bearer token', async () => {
    const payload = { id: 'u123', username: 'testuser', role: 'user' };
    const token = jwtService.sign(payload);

    const mockRequest: any = {
      headers: { authorization: `Bearer ${token}` },
      cookies: {},
    };
    const mockContext: any = {
      switchToHttp: () => ({
        getRequest: () => mockRequest,
      }),
    };

    const result = await authGuard.canActivate(mockContext);
    expect(result).toBe(true);
    expect(mockRequest.user).toBeDefined();
    expect(mockRequest.user.id).toBe('u123');
    expect(mockRequest.user.username).toBe('testuser');
  });

  it('should allow request with valid cookie token', async () => {
    const payload = { id: 'u456', username: 'cookieuser', role: 'admin' };
    const token = jwtService.sign(payload);

    const mockRequest: any = {
      headers: {},
      cookies: { token },
    };
    const mockContext: any = {
      switchToHttp: () => ({
        getRequest: () => mockRequest,
      }),
    };

    const result = await authGuard.canActivate(mockContext);
    expect(result).toBe(true);
    expect(mockRequest.user).toBeDefined();
    expect(mockRequest.user.id).toBe('u456');
  });

  it('should throw UnauthorizedException when token is missing', async () => {
    const mockRequest: any = { headers: {}, cookies: {} };
    const mockContext: any = {
      switchToHttp: () => ({
        getRequest: () => mockRequest,
      }),
    };

    await expect(authGuard.canActivate(mockContext)).rejects.toThrow(
      new UnauthorizedException('Thiếu mã token xác thực'),
    );
  });

  it('should throw UnauthorizedException when token is invalid or tampered', async () => {
    const mockRequest: any = {
      headers: { authorization: 'Bearer invalid.token.value' },
      cookies: {},
    };
    const mockContext: any = {
      switchToHttp: () => ({
        getRequest: () => mockRequest,
      }),
    };

    await expect(authGuard.canActivate(mockContext)).rejects.toThrow(
      new UnauthorizedException('Mã token không hợp lệ hoặc đã bị chỉnh sửa!'),
    );
  });

  it('should throw UnauthorizedException when token is expired', async () => {
    const expiredToken = jwtService.sign(
      { id: 'expired' },
      { expiresIn: '-1s' },
    );

    const mockRequest: any = {
      headers: { authorization: `Bearer ${expiredToken}` },
      cookies: {},
    };
    const mockContext: any = {
      switchToHttp: () => ({
        getRequest: () => mockRequest,
      }),
    };

    await expect(authGuard.canActivate(mockContext)).rejects.toThrow(
      new UnauthorizedException(
        'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!',
      ),
    );
  });
});
