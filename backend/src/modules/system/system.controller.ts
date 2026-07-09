import {
  Controller,
  Post,
  Get,
  Put,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { SystemService } from './system.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('invitation-requests')
export class SystemController {
  constructor(private readonly systemService: SystemService) {}

  @Post()
  async createRequest(@Body() body: any) {
    const data = await this.systemService.createRequest(body);
    return {
      success: true,
      message: 'Gửi yêu cầu thành công! Chúng tôi sẽ liên hệ sớm nhất.',
      data,
    };
  }

  @Get()
  @UseGuards(AuthGuard)
  async getRequests() {
    const data = await this.systemService.getRequests();
    return {
      success: true,
      data,
    };
  }

  @Put(':id/status')
  @UseGuards(AuthGuard)
  async updateStatus(@Param('id') id: string, @Body('status') status: string) {
    const data = await this.systemService.updateRequestStatus(id, status);
    return {
      success: true,
      message: 'Cập nhật trạng thái yêu cầu thành công!',
      data,
    };
  }
}
