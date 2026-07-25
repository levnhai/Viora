import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from '@nestjs/common';
import { TemplateRequestsService } from './template-requests.service';

@Controller('template-requests')
export class TemplateRequestsController {
  constructor(private readonly requestsService: TemplateRequestsService) {}

  @Post()
  async create(@Body() body: { name: string; phone: string; notes?: string; templateCode?: string; templateName?: string }) {
    const data = await this.requestsService.create(body);
    return { success: true, message: 'Gửi yêu cầu thành công', data };
  }

  @Get()
  async findAll() {
    const data = await this.requestsService.findAll();
    return { success: true, data };
  }

  @Patch(':id')
  async updateStatus(@Param('id') id: string, @Body() body: { status: string }) {
    const data = await this.requestsService.updateStatus(id, body.status);
    return { success: true, message: 'Cập nhật trạng thái thành công', data };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.requestsService.remove(id);
    return { success: true, message: 'Xóa yêu cầu thành công' };
  }
}
