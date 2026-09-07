import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
  ForbiddenException,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { GuestsService } from './guests.service';
import { AuthGuard } from '../auth/auth.guard';
import { CreateRsvpDto } from './dto/create-rsvp.dto';
import { CreateGuestDto } from './dto/create-guest.dto';
import { UpdateGuestDto } from './dto/update-guest.dto';

@Controller('weddings/:slug')
export class GuestsController {
  constructor(private readonly guestsService: GuestsService) {}

  // RSVP Endpoints
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @Post('rsvp')
  async createRsvp(
    @Param('slug') slug: string,
    @Body() rsvpDto: CreateRsvpDto,
  ) {
    const data = await this.guestsService.createRsvp(slug, rsvpDto);
    return {
      success: true,
      message: 'Gửi xác nhận tham dự thành công!',
      data,
    };
  }

  @Get('rsvp')
  @UseGuards(AuthGuard)
  async getRsvps(@Param('slug') slug: string, @Req() req: any) {
    const user = req.user;
    if (
      user.role !== 'admin' &&
      user.role !== 'staff' &&
      user.weddingSlug !== slug
    ) {
      throw new ForbiddenException(
        'Bạn không có quyền xem danh sách RSVP của thiệp cưới này!',
      );
    }
    const data = await this.guestsService.findRsvps(slug);
    return {
      success: true,
      data,
    };
  }

  // Guest list Endpoints
  @Post('guests')
  @UseGuards(AuthGuard)
  async createGuest(
    @Param('slug') slug: string,
    @Body() guestDto: CreateGuestDto,
    @Req() req: any,
  ) {
    const user = req.user;
    if (
      user.role !== 'admin' &&
      user.role !== 'staff' &&
      user.weddingSlug !== slug
    ) {
      throw new ForbiddenException(
        'Bạn không có quyền quản lý danh sách khách mời của thiệp cưới này!',
      );
    }
    const data = await this.guestsService.createGuest(slug, guestDto);
    return {
      success: true,
      message: 'Thêm khách mời thành công!',
      data,
    };
  }

  @Get('guests')
  @UseGuards(AuthGuard)
  async getGuests(@Param('slug') slug: string, @Req() req: any) {
    const user = req.user;
    if (
      user.role !== 'admin' &&
      user.role !== 'staff' &&
      user.weddingSlug !== slug
    ) {
      throw new ForbiddenException(
        'Bạn không có quyền xem danh sách khách mời của thiệp cưới này!',
      );
    }
    const data = await this.guestsService.findGuests(slug);
    return {
      success: true,
      data,
    };
  }

  @Put('guests/:id')
  @UseGuards(AuthGuard)
  async updateGuest(
    @Param('slug') slug: string,
    @Param('id') id: string,
    @Body() guestDto: UpdateGuestDto,
    @Req() req: any,
  ) {
    const user = req.user;
    if (
      user.role !== 'admin' &&
      user.role !== 'staff' &&
      user.weddingSlug !== slug
    ) {
      throw new ForbiddenException(
        'Bạn không có quyền cập nhật khách mời của thiệp cưới này!',
      );
    }
    const data = await this.guestsService.updateGuest(slug, id, guestDto);
    return {
      success: true,
      message: 'Cập nhật khách mời thành công!',
      data,
    };
  }

  @Delete('guests/:id')
  @UseGuards(AuthGuard)
  async deleteGuest(
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
        'Bạn không có quyền xóa khách mời của thiệp cưới này!',
      );
    }
    await this.guestsService.deleteGuest(slug, id);
    return {
      success: true,
      message: 'Xóa khách mời thành công!',
    };
  }
}
