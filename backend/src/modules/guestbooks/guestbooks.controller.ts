import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
  ForbiddenException,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { GuestbooksService } from './guestbooks.service';
import { AuthGuard } from '../auth/auth.guard';
import { CreateGuestbookDto } from './dto/create-guestbook.dto';

import type { AuthenticatedRequest } from '../../common/interfaces/request.interface';

@Controller('weddings/:slug/guestbook')
export class GuestbooksController {
  constructor(private readonly guestbooksService: GuestbooksService) {}

  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Post()
  async createGuestbook(
    @Param('slug') slug: string,
    @Body() guestbookDto: CreateGuestbookDto,
  ) {
    const data = await this.guestbooksService.createGuestbook(
      slug,
      guestbookDto,
    );
    return {
      success: true,
      message: 'Gửi lời chúc thành công!',
      data,
    };
  }

  @Get()
  async getGuestbook(@Param('slug') slug: string) {
    const data = await this.guestbooksService.findGuestbook(slug);
    return {
      success: true,
      data,
    };
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteGuestbook(
    @Param('slug') slug: string,
    @Param('id') id: string,
    @Req() req: AuthenticatedRequest,
  ) {
    const user = req.user;
    if (
      !user ||
      (user.role !== 'admin' &&
        user.role !== 'staff' &&
        user.weddingSlug !== slug)
    ) {
      throw new ForbiddenException(
        'Bạn không có quyền xóa lời chúc của thiệp cưới này!',
      );
    }
    await this.guestbooksService.deleteGuestbook(slug, id);
    return {
      success: true,
      message: 'Xóa lời chúc thành công!',
    };
  }
}
