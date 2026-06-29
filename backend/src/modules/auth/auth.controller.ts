import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import * as express from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  private setTokenCookie(res: express.Response, token: string) {
    res.cookie('token', token, {
      httpOnly: true,
      secure: false, // Set to true in production (HTTPS)
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
  }

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
      message: 'Đăng nhập thành công!',
      data: {
        role: data.role,
        weddingSlug: data.weddingSlug,
        name: data.name,
        email: data.email,
      },
    };
  }

  @Post('register')
  async register(
    @Body() loginDto: LoginDto,
  ) {
    const data = await this.authService.register(
      loginDto.username,
      loginDto.password,
      loginDto.fullName,
      loginDto.phone,
    );
    return {
      success: true,
      message: data.message,
    };
  }

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
        role: data.role,
        weddingSlug: data.weddingSlug,
        name: data.name,
        email: data.email,
      },
    };
  }

  @Post('forgot-password')
  async forgotPassword(@Body('email') email: string) {
    return this.authService.forgotPassword(email);
  }

  @Post('verify-forgot-password-otp')
  async verifyForgotPasswordOtp(
    @Body('email') email: string,
    @Body('code') code: string,
  ) {
    return this.authService.verifyForgotPasswordOtp(email, code);
  }

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
        role: data.role,
        weddingSlug: data.weddingSlug,
        name: data.name,
        picture: data.picture,
        email: data.email,
      },
    };
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: express.Response) {
    res.clearCookie('token', {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/',
    });
    return {
      success: true,
      message: 'Đăng xuất thành công!',
    };
  }
}
