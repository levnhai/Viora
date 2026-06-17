import { Controller, Post, Get, Put, Delete, Body, Param, UseGuards, Req, ForbiddenException } from '@nestjs/common';
import { WeddingService } from './wedding.service';
import { CreateWeddingDto } from './dto/create-wedding.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('weddings')
export class WeddingController {
  constructor(private readonly weddingService: WeddingService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() createDto: CreateWeddingDto, @Req() req: any) {
    const user = req.user;
    const data = await this.weddingService.create(createDto, user.id);
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

  @Put(':slug')
  @UseGuards(AuthGuard)
  async update(@Param('slug') slug: string, @Body() updateDto: any, @Req() req: any) {
    const user = req.user;
    if (user.role !== 'admin' && user.weddingSlug !== slug) {
      throw new ForbiddenException('Bạn không có quyền chỉnh sửa thiệp cưới này!');
    }
    const data = await this.weddingService.update(slug, updateDto);
    return {
      success: true,
      message: 'Cập nhật thông tin thiệp cưới thành công!',
      data,
    };
  }

  // RSVP Endpoints
  @Post(':slug/rsvp')
  async createRsvp(@Param('slug') slug: string, @Body() rsvpData: any) {
    const data = await this.weddingService.createRsvp(slug, rsvpData);
    return {
      success: true,
      message: 'Gửi xác nhận tham dự thành công!',
      data,
    };
  }

  @Get(':slug/rsvp')
  @UseGuards(AuthGuard)
  async getRsvps(@Param('slug') slug: string, @Req() req: any) {
    const user = req.user;
    if (user.role !== 'admin' && user.weddingSlug !== slug) {
      throw new ForbiddenException('Bạn không có quyền xem danh sách khách mời của thiệp cưới này!');
    }
    const data = await this.weddingService.findRsvps(slug);
    return {
      success: true,
      data,
    };
  }

  // Guestbook Endpoints
  @Post(':slug/guestbook')
  async createGuestbook(@Param('slug') slug: string, @Body() guestbookData: any) {
    const data = await this.weddingService.createGuestbook(slug, guestbookData);
    return {
      success: true,
      message: 'Gửi lời chúc thành công!',
      data,
    };
  }

  @Get(':slug/guestbook')
  async getGuestbook(@Param('slug') slug: string) {
    const data = await this.weddingService.findGuestbook(slug);
    return {
      success: true,
      data,
    };
  }

  // Guest list Endpoints
  @Post(':slug/guests')
  @UseGuards(AuthGuard)
  async createGuest(@Param('slug') slug: string, @Body() guestData: any, @Req() req: any) {
    const user = req.user;
    if (user.role !== 'admin' && user.weddingSlug !== slug) {
      throw new ForbiddenException('Bạn không có quyền quản lý danh sách khách mời của thiệp cưới này!');
    }
    const data = await this.weddingService.createGuest(slug, guestData);
    return {
      success: true,
      message: 'Thêm khách mời thành công!',
      data,
    };
  }

  @Get(':slug/guests')
  @UseGuards(AuthGuard)
  async getGuests(@Param('slug') slug: string, @Req() req: any) {
    const user = req.user;
    if (user.role !== 'admin' && user.weddingSlug !== slug) {
      throw new ForbiddenException('Bạn không có quyền xem danh sách khách mời của thiệp cưới này!');
    }
    const data = await this.weddingService.findGuests(slug);
    return {
      success: true,
      data,
    };
  }

  @Put(':slug/guests/:id')
  @UseGuards(AuthGuard)
  async updateGuest(@Param('slug') slug: string, @Param('id') id: string, @Body() guestData: any, @Req() req: any) {
    const user = req.user;
    if (user.role !== 'admin' && user.weddingSlug !== slug) {
      throw new ForbiddenException('Bạn không có quyền cập nhật khách mời của thiệp cưới này!');
    }
    const data = await this.weddingService.updateGuest(slug, id, guestData);
    return {
      success: true,
      message: 'Cập nhật khách mời thành công!',
      data,
    };
  }

  @Delete(':slug/guests/:id')
  @UseGuards(AuthGuard)
  async deleteGuest(@Param('slug') slug: string, @Param('id') id: string, @Req() req: any) {
    const user = req.user;
    if (user.role !== 'admin' && user.weddingSlug !== slug) {
      throw new ForbiddenException('Bạn không có quyền xóa khách mời của thiệp cưới này!');
    }
    await this.weddingService.deleteGuest(slug, id);
    return {
      success: true,
      message: 'Xóa khách mời thành công!',
    };
  }
}
