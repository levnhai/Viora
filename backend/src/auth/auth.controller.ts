import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const data = await this.authService.login(loginDto.username, loginDto.password);
    return {
      success: true,
      message: 'Đăng nhập thành công!',
      data,
    };
  }

  @Post('register')
  async register(@Body() loginDto: LoginDto) {
    const data = await this.authService.register(loginDto.username, loginDto.password);
    return {
      success: true,
      message: 'Đăng ký tài khoản thành công!',
      data,
    };
  }

}
