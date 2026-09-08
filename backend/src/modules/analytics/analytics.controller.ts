import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';
import { AnalyticsService } from './analytics.service';
import { TrackEventDto, AnalyticsOverviewQueryDto } from './dto/analytics.dto';
import { SocketGateway } from '../socket/socket.gateway';
import { AuthGuard } from '../auth/auth.guard';
import type { AuthenticatedRequest } from '../../common/interfaces/request.interface';

@Controller('analytics')
export class AnalyticsController {
  constructor(
    private readonly analyticsService: AnalyticsService,
    private readonly socketGateway: SocketGateway,
  ) {}

  private ensureAnalyticsAccess(req: AuthenticatedRequest) {
    if (!['admin', 'staff'].includes(req.user?.role || '')) {
      throw new ForbiddenException('Bạn không có quyền xem thống kê');
    }
  }

  @Post('track')
  async trackEvent(@Body() dto: TrackEventDto, @Req() req: Request) {
    const forwardedHeader =
      req.headers['x-forwarded-for'] || req.headers['x-real-ip'];
    const forwarded = Array.isArray(forwardedHeader)
      ? forwardedHeader[0]
      : forwardedHeader;
    const ip =
      typeof forwarded === 'string'
        ? forwarded.split(',')[0]?.trim()
        : req.ip || undefined;

    const cityHeader =
      req.headers['cf-ipcity'] || req.headers['x-vercel-ip-city'];
    const cfCity = Array.isArray(cityHeader)
      ? cityHeader[0]
      : typeof cityHeader === 'string'
        ? cityHeader
        : undefined;

    return this.analyticsService.trackVisit(dto, ip, cfCity);
  }

  @Get('overview')
  @UseGuards(AuthGuard)
  async getOverview(
    @Query() query: AnalyticsOverviewQueryDto,
    @Req() req: AuthenticatedRequest,
  ) {
    this.ensureAnalyticsAccess(req);
    return this.analyticsService.getOverview(query.range || '7days');
  }

  @Get('realtime')
  @UseGuards(AuthGuard)
  getRealtime(@Req() req: AuthenticatedRequest) {
    this.ensureAnalyticsAccess(req);
    return {
      onlineUsers: this.socketGateway.getOnlineCount(),
      timestamp: new Date().toISOString(),
    };
  }
}
