import { Controller, Post, Body, Res, Req, UseGuards } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';

import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from './auth.guard';
import { AdminGuard } from './admin.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ChangeAdminCredentialsDto } from './dto/change-credentials.dto';
import * as express from 'express';
import type { AuthenticatedRequest } from '../../common/interfaces/request.interface';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  private setTokenCookie(res: express.Response, token: string) {
    const isProd = process.env.NODE_ENV === 'production';
    res.cookie('token', token, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
  }

  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: express.Response,
  ) {
    const data = await this.authService.login(
      loginDto.username,
      loginDto.password,
    );
    this.setTokenCookie(res, data.token);
    return {
      success: true,
      data: {
        token: data.token,
        role: data.role,
        name: data.name,
        email: data.email,
      },
    };
  }

  @Post('admin/change-credentials')
  @UseGuards(AuthGuard, AdminGuard)
  async changeAdminCredentials(
    @Req() req: AuthenticatedRequest,
    @Body() body: ChangeAdminCredentialsDto,
    @Res({ passthrough: true }) res: express.Response,
  ) {
    const data = await this.authService.changeAdminCredentials(
      req.user?.id || '',
      body.currentPassword,
      body.newEmail,
      body.newPassword,
    );
    this.setTokenCookie(res, data.token);
    return { success: true, message: 'Đã cập nhật thông tin đăng nhập' };
  }
  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const data = await this.authService.register(
      registerDto.username,
      registerDto.password,
      registerDto.fullName,
      registerDto.phone,
    );
    return {
      success: true,
      message: data.message,
    };
  }

  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Post('register-verify-otp')
  async registerVerifyOtp(
    @Body('email') email: string,
    @Body('code') code: string,
    @Res({ passthrough: true }) res: express.Response,
  ) {
    const data = await this.authService.registerVerifyOtp(email, code);
    this.setTokenCookie(res, data.token);
    return {
      success: true,
      message: 'Kích hoạt tài khoản và đăng nhập thành công!',
      data: {
        token: data.token,
        role: data.role,
        weddingSlug: data.weddingSlug,
        name: data.name,
        email: data.email,
      },
    };
  }

  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @Post('forgot-password')
  async forgotPassword(@Body('email') email: string) {
    return this.authService.forgotPassword(email);
  }

  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Post('verify-forgot-password-otp')
  async verifyForgotPasswordOtp(
    @Body('email') email: string,
    @Body('code') code: string,
  ) {
    return this.authService.verifyForgotPasswordOtp(email, code);
  }

  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Post('reset-password')
  async resetPassword(
    @Body('email') email: string,
    @Body('code') code: string,
    @Body('passwordNew') passwordNew: string,
  ) {
    return this.authService.resetPassword(email, code, passwordNew);
  }

  @Post('send-otp')
  async sendOtp(@Body('email') email: string) {
    return this.authService.sendOtp(email);
  }

  @Post('verify-otp')
  async verifyOtp(
    @Body('email') email: string,
    @Body('code') code: string,
    @Res({ passthrough: true }) res: express.Response,
  ) {
    const data = await this.authService.verifyOtp(email, code);
    this.setTokenCookie(res, data.token);
    return {
      success: true,
      message: 'Đăng nhập bằng mã OTP thành công!',
      data: {
        token: data.token,
        role: data.role,
        weddingSlug: data.weddingSlug,
        name: data.name,
        email: data.email,
      },
    };
  }

  @Post('google')
  async googleLogin(
    @Body('token') token: string,
    @Res({ passthrough: true }) res: express.Response,
  ) {
    const data = await this.authService.googleLogin(token);
    this.setTokenCookie(res, data.token);
    return {
      success: true,
      message: 'Đăng nhập bằng Google thành công!',
      data: {
        token: data.token,
        role: data.role,
        weddingSlug: data.weddingSlug,
        name: data.name,
        picture: data.picture,
        email: data.email,
      },
    };
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: express.Response) {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });
    return {
      success: true,
      message: 'Đăng xuất thành công!',
    };
  }
}
