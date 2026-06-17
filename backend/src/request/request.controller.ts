import { Controller, Post, Get, Body } from '@nestjs/common';
import { RequestService } from './request.service';
import { CreateRequestDto } from './dto/create-request.dto';

@Controller('invitation-requests')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @Post()
  async create(@Body() createDto: CreateRequestDto) {
    const data = await this.requestService.create(createDto);
    return {
      success: true,
      message: 'Gửi yêu cầu thành công!',
      data,
    };
  }

  @Get()
  async findAll() {
    const data = await this.requestService.findAll();
    return {
      success: true,
      data,
    };
  }
}
