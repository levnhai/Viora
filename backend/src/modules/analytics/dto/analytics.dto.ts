import { IsNotEmpty, IsOptional, IsString, IsBoolean, IsIn } from 'class-validator';

export class TrackEventDto {
  @IsNotEmpty()
  @IsString()
  visitorId: string;

  @IsOptional()
  @IsBoolean()
  isReturning?: boolean;

  @IsNotEmpty()
  @IsString()
  path: string;

  @IsOptional()
  @IsString()
  templateSlug?: string;

  @IsOptional()
  @IsString()
  deviceType?: 'desktop' | 'mobile' | 'tablet' | 'unknown';

  @IsOptional()
  @IsString()
  browser?: string;

  @IsOptional()
  @IsString()
  os?: string;

  @IsOptional()
  @IsString()
  referrer?: string;
}

export class AnalyticsOverviewQueryDto {
  @IsOptional()
  @IsIn(['today', '7days', '30days', 'year'])
  range?: 'today' | '7days' | '30days' | 'year';
}
