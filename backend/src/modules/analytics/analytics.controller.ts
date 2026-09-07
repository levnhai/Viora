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
import { AnalyticsService } from './analytics.service';
import { TrackEventDto, AnalyticsOverviewQueryDto } from './dto/analytics.dto';
import { SocketGateway } from '../socket/socket.gateway';
import { AuthGuard } from '../auth/auth.guard';

@Controller('analytics')
export class AnalyticsController {
  constructor(
    private readonly analyticsService: AnalyticsService,
    private readonly socketGateway: SocketGateway,
  ) {}

  private ensureAnalyticsAccess(req: { user?: { role?: string } }) {
    if (!['admin', 'staff'].includes(req.user?.role || '')) {
      throw new ForbiddenException('Bạn không có quyền xem thống kê');
    }
  }

  @Post('track')
  async trackEvent(@Body() dto: TrackEventDto, @Req() req: any) {
    const forwarded = req.headers
      ? req.headers['x-forwarded-for'] || req.headers['x-real-ip']
      : undefined;
    const ip =
      typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : req.ip;
    const cfCity = req.headers
      ? req.headers['cf-ipcity'] || req.headers['x-vercel-ip-city']
      : undefined;
    return this.analyticsService.trackVisit(dto, ip, cfCity);
  }

  @Get('overview')
  @UseGuards(AuthGuard)
  async getOverview(
    @Query() query: AnalyticsOverviewQueryDto,
    @Req() req: any,
  ) {
    this.ensureAnalyticsAccess(req);
    return this.analyticsService.getOverview(query.range || '7days');
  }

  @Get('realtime')
  @UseGuards(AuthGuard)
  async getRealtime(@Req() req: any) {
    this.ensureAnalyticsAccess(req);
    return {
      onlineUsers: this.socketGateway.getOnlineCount(),
      timestamp: new Date().toISOString(),
    };
  }
}
