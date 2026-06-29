import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() body: any) {
    const data = await this.newsService.create(body);
    return {
      success: true,
      message: 'Tạo bài viết thành công!',
      data,
    };
  }

  @Get()
  async findAll() {
    const data = await this.newsService.findAll();
    return {
      success: true,
      data,
    };
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string) {
    const data = await this.newsService.findOne(slug);
    return {
      success: true,
      data,
    };
  }

  @Put(':slug')
  @UseGuards(AuthGuard)
  async update(@Param('slug') slug: string, @Body() body: any) {
    const data = await this.newsService.update(slug, body);
    return {
      success: true,
      message: 'Cập nhật bài viết thành công!',
      data,
    };
  }

  @Delete(':slug')
  @UseGuards(AuthGuard)
  async remove(@Param('slug') slug: string) {
    await this.newsService.remove(slug);
    return {
      success: true,
      message: 'Xóa bài viết thành công!',
    };
  }
}
