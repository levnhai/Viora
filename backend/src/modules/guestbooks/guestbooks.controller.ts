import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { GuestbooksService } from './guestbooks.service';

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
}
