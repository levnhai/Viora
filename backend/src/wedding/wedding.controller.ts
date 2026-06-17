import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { WeddingService } from './wedding.service';
import { CreateWeddingDto } from './dto/create-wedding.dto';

@Controller('weddings')
export class WeddingController {
  constructor(private readonly weddingService: WeddingService) {}

  @Post()
  async create(@Body() createDto: CreateWeddingDto) {
    const data = await this.weddingService.create(createDto);
    return {
      success: true,
      message: 'Tạo thông tin thiệp cưới thành công!',
      data,
    };
  }

  @Get(':slug')
  async findBySlug(@Param('slug') slug: string) {
    const data = await this.weddingService.findBySlug(slug);
    return {
      success: true,
      data,
    };
  }
}
