import { Controller, Post, Get, Body, UseGuards, Req, ForbiddenException } from '@nestjs/common';
import { RequestService } from './request.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { AuthGuard } from '../auth/auth.guard';

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
  @UseGuards(AuthGuard)
  async findAll(@Req() req: any) {
    if (req.user.role !== 'admin') {
      throw new ForbiddenException('Chỉ có tài khoản admin mới xem được danh sách yêu cầu!');
    }
    const data = await this.requestService.findAll();
    return {
      success: true,
      data,
    };
  }
}
