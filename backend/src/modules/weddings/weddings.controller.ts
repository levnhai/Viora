import {
  Controller,
  Post,
  Get,
  Put,
  Body,
  Param,
  Query,
  UseGuards,
  Req,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { WeddingsService } from './weddings.service';
import { CreateWeddingDto } from './dto/create-wedding.dto';
import { AuthGuard } from '../auth/auth.guard';
import type { AuthenticatedRequest } from '../../common/interfaces/request.interface';

@Controller(['weddings', 'invitations'])
export class WeddingsController {
  constructor(
    private readonly weddingsService: WeddingsService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  private async extractUserFromRequest(req: any) {
    if (req.user) return req.user;
    const token =
      req.cookies?.token ||
      req.headers?.authorization?.replace(/^Bearer\s+/i, '');
    if (!token) return null;
    try {
      const secret =
        this.configService.get<string>('JWT_SECRET') ||
        'viora_jwt_secret_key_2026_safe';
      const payload = await this.jwtService.verifyAsync(token, { secret });
      req.user = payload;
      return payload;
    } catch {
      return null;
    }
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAll(
    @Req() req: AuthenticatedRequest,
    @Query() query: Record<string, string | undefined>,
  ) {
    const user = req.user;
    if (!user) {
      throw new UnauthorizedException('Không tìm thấy thông tin người dùng');
    }
    const data: unknown = await this.weddingsService.findAll(query, user);
    return {
      success: true,
      data,
    };
  }

  @Post()
  async create(
    @Body() createDto: CreateWeddingDto,
    @Req() req: any,
  ) {
    const user = await this.extractUserFromRequest(req);
    const data: any = await this.weddingsService.create(
      createDto,
      user?.id,
      user?.id,
    );
    return {
      success: true,
      message: 'Tạo thông tin thiệp cưới thành công!',
      data,
      credentials: data?.credentials,
    };
  }

  // API lấy danh sách thiệp mẫu demo mới nhất (Công khai - Public)
  @Get('public/demos')
  async getPublicDemos() {
    const data: unknown = await this.weddingsService.getPublicDemos();
    return {
      success: true,
      data,
    };
  }

  // API lấy thông tin thiệp cưới của User hiện tại (Dashboard)
  @Get('my-wedding')
  @UseGuards(AuthGuard)
  async getMyWedding(@Req() req: AuthenticatedRequest) {
    const user = req.user;
    if (!user) {
      throw new UnauthorizedException('Không tìm thấy thông tin người dùng');
    }
    const data: unknown = await this.weddingsService.getMyWedding(user.id);
    return {
      success: true,
      data,
    };
  }

  // API render mới - Tối ưu hóa render cho Frontend chỉ với 1 API duy nhất
  @Get(':slug/render')
  async getRenderData(@Param('slug') slug: string) {
    const data: unknown = await this.weddingsService.getRenderData(slug);
    return {
      success: true,
      data,
    };
  }

  @Get(':slug')
  async findBySlug(@Param('slug') slug: string) {
    const data: unknown = await this.weddingsService.findBySlug(slug);
    return {
      success: true,
      data,
    };
  }

  @Put(':slug')
  async update(
    @Param('slug') slug: string,
    @Body() updateDto: Record<string, unknown>,
    @Req() req: any,
  ) {
    const user = await this.extractUserFromRequest(req);
    if (
      user &&
      user.role !== 'admin' &&
      user.role !== 'staff' &&
      user.weddingSlug !== slug
    ) {
      throw new ForbiddenException(
        'Bạn không có quyền chỉnh sửa thiệp cưới này!',
      );
    }
    const data: any = await this.weddingsService.update(slug, updateDto);
    return {
      success: true,
      message: 'Cập nhật thông tin thiệp cưới thành công!',
      data,
      credentials: data?.credentials,
    };
  }
}
