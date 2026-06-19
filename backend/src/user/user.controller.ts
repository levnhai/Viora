import { Controller, Get, Put, Body, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @UseGuards(AuthGuard)
  async getProfile(@Req() req: any) {
    const user = req.user;
    const data = await this.userService.getProfile(user.id);
    return {
      success: true,
      data,
    };
  }

  @Put('profile')
  @UseGuards(AuthGuard)
  async updateProfile(@Req() req: any, @Body() updateDto: any) {
    const user = req.user;
    const data = await this.userService.updateProfile(user.id, updateDto);
    return {
      success: true,
      message: 'Cập nhật thông tin tài khoản thành công!',
      data,
    };
  }
}
