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
import { GuestbooksService } from './guestbooks.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('weddings/:slug/guestbook')
export class GuestbooksController {
  constructor(private readonly guestbooksService: GuestbooksService) {}

  @Post()
  async createGuestbook(
    @Param('slug') slug: string,
    @Body() guestbookData: any,
  ) {
    const data = await this.guestbooksService.createGuestbook(
      slug,
      guestbookData,
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
    @Req() req: any,
  ) {
    const user = req.user;
    if (
      user.role !== 'admin' &&
      user.role !== 'staff' &&
      user.weddingSlug !== slug
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
