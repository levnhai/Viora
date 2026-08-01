import {
  Controller,
  Post,
  Get,
  Put,
  Body,
  Param,
  UseGuards,
  Req,
  ForbiddenException,
} from '@nestjs/common';
import { WeddingsService } from './weddings.service';
import { CreateWeddingDto } from './dto/create-wedding.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('weddings')
export class WeddingsController {
  constructor(private readonly weddingsService: WeddingsService) {}

  @Get()
  @UseGuards(AuthGuard)
  async findAll(@Req() req: any) {
    const user = req.user;
    const query = req.query || {};
    const data = await this.weddingsService.findAll(query, user);
    return {
      success: true,
      data,
    };
  }

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() createDto: CreateWeddingDto, @Req() req: any) {
    const user = req.user;
    const data = await this.weddingsService.create(createDto, user.id, user.id);
    return {
      success: true,
      message: 'Tạo thông tin thiệp cưới thành công!',
      data,
    };
  }

  // API lấy danh sách thiệp mẫu demo mới nhất (Công khai - Public)
  @Get('public/demos')
  async getPublicDemos() {
    const data = await this.weddingsService.getPublicDemos();
    return {
      success: true,
      data,
    };
  }

  // API render mới - Tối ưu hóa render cho Frontend chỉ với 1 API duy nhất
  @Get(':slug/render')
  async getRenderData(@Param('slug') slug: string) {
    const data = await this.weddingsService.getRenderData(slug);
    return {
      success: true,
      data,
    };
  }

  @Get(':slug')
  async findBySlug(@Param('slug') slug: string) {
    const data = await this.weddingsService.findBySlug(slug);
    return {
      success: true,
      data,
    };
  }

  @Put(':slug')
  @UseGuards(AuthGuard)
  async update(
    @Param('slug') slug: string,
    @Body() updateDto: any,
    @Req() req: any,
  ) {
    const user = req.user;
    if (
      user.role !== 'admin' &&
      user.role !== 'staff' &&
      user.weddingSlug !== slug
    ) {
      throw new ForbiddenException(
        'Bạn không có quyền chỉnh sửa thiệp cưới này!',
      );
    }
    const data = await this.weddingsService.update(slug, updateDto);
    return {
      success: true,
      message: 'Cập nhật thông tin thiệp cưới thành công!',
      data,
    };
  }
}
