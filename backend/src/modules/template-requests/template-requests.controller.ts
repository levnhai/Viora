import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { AuthGuard } from '../auth/auth.guard';
import { AdminGuard } from '../auth/admin.guard';
import { TemplateRequestsService } from './template-requests.service';
import { CreateTemplateRequestDto } from './dto/create-template-request.dto';

@Controller('template-requests')
export class TemplateRequestsController {
  constructor(private readonly requestsService: TemplateRequestsService) {}

  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @Post()
  async create(@Body() createDto: CreateTemplateRequestDto) {
    return {
      success: true,
      message: 'Gửi yêu cầu thành công',
      data: await this.requestsService.create(createDto),
    };
  }
  @Get()
  @UseGuards(AuthGuard, AdminGuard)
  async findAll() {
    return { success: true, data: await this.requestsService.findAll() };
  }
  @Patch(':id')
  @UseGuards(AuthGuard, AdminGuard)
  async updateStatus(
    @Param('id') id: string,
    @Body() body: { status: string },
  ) {
    return {
      success: true,
      message: 'Cập nhật trạng thái thành công',
      data: await this.requestsService.updateStatus(id, body.status),
    };
  }
  @Delete(':id')
  @UseGuards(AuthGuard, AdminGuard)
  async remove(@Param('id') id: string) {
    await this.requestsService.remove(id);
    return { success: true, message: 'Xóa yêu cầu thành công' };
  }
}
