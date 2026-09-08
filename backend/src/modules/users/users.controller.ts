import {
  Controller,
  Get,
  Put,
  Body,
  UseGuards,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';
import type { AuthenticatedRequest } from '../../common/interfaces/request.interface';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @UseGuards(AuthGuard)
  async getProfile(@Req() req: AuthenticatedRequest) {
    const userId = req.user?.id;
    if (!userId) {
      throw new UnauthorizedException('Không tìm thấy thông tin người dùng');
    }
    const data = await this.userService.getProfile(userId);
    return {
      success: true,
      data,
    };
  }

  @Put('profile')
  @UseGuards(AuthGuard)
  async updateProfile(
    @Req() req: AuthenticatedRequest,
    @Body() updateDto: UpdateProfileDto,
  ) {
    const userId = req.user?.id;
    if (!userId) {
      throw new UnauthorizedException('Không tìm thấy thông tin người dùng');
    }
    const data = await this.userService.updateProfile(userId, updateDto);
    return {
      success: true,
      message: 'Cập nhật thông tin tài khoản thành công!',
      data,
    };
  }
}
