export interface AnalyticsKPI {
  totalPageviews: number;
  totalVisitors: number;
  newVisitors: number;
  returningVisitors: number;
  returningRate: number;
  totalTemplateViews: number;
}

export interface AnalyticsTimelineItem {
  date: string;
  displayDate: string;
  pageviews: number;
  newVisitors: number;
  returningVisitors: number;
}

export interface AnalyticsDeviceItem {
  key: string;
  name: string;
  count: number;
  percent: number;
  color: string;
}

export interface AnalyticsBrowserItem {
  name: string;
  count: number;
}

export interface AnalyticsTopTemplate {
  code: string;
  name: string;
  subtitle?: string;
  thumbnail: string;
  price: number;
  views: number;
}

export interface AnalyticsOverviewData {
  range: 'today' | '7days' | '30days' | 'year';
  kpi: AnalyticsKPI;
  timeline: AnalyticsTimelineItem[];
  devices: AnalyticsDeviceItem[];
  browsers: AnalyticsBrowserItem[];
  topTemplates: AnalyticsTopTemplate[];
}

export interface TrackEventPayload {
  visitorId: string;
  isReturning?: boolean;
  path: string;
  templateSlug?: string;
  deviceType?: 'desktop' | 'mobile' | 'tablet' | 'unknown';
  browser?: string;
  os?: string;
  referrer?: string;
}
