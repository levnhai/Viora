import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AnalyticsVisit, AnalyticsVisitDocument } from './schemas/analytics-visit.schema';
import { AnalyticsDaily, AnalyticsDailyDocument } from './schemas/analytics-daily.schema';
import { Wedding, WeddingDocument } from '../weddings/schemas/wedding.schema';
import { Template, TemplateDocument } from '../templates/schemas/template.schema';
import { TrackEventDto } from './dto/analytics.dto';
import { DEFAULT_TEMPLATES } from '../templates/template.data';

@Injectable()
export class AnalyticsService {
  private readonly logger = new Logger(AnalyticsService.name);

  constructor(
    @InjectModel(AnalyticsVisit.name)
    private readonly visitModel: Model<AnalyticsVisitDocument>,
    @InjectModel(AnalyticsDaily.name)
    private readonly dailyModel: Model<AnalyticsDailyDocument>,
    @InjectModel(Wedding.name)
    private readonly weddingModel: Model<WeddingDocument>,
    @InjectModel(Template.name)
    private readonly templateModel: Model<TemplateDocument>,
  ) {}

  private getTodayString(): string {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private sanitizeKey(key: string): string {
    // Mongo key không được chứa dấu chấm '.' hoặc ký tự đặc biệt
    return key.replace(/\./g, '_').trim() || 'Unknown';
  }

  async trackVisit(dto: TrackEventDto, ip?: string): Promise<{ success: boolean }> {
    try {
      const todayStr = this.getTodayString();
      const deviceType = dto.deviceType || 'unknown';
      const browser = this.sanitizeKey(dto.browser || 'Other');
      const templateSlug = dto.templateSlug ? this.sanitizeKey(dto.templateSlug) : undefined;

      // 1. Ghi log chi tiết vào AnalyticsVisit
      await this.visitModel.create({
        visitorId: dto.visitorId,
        isReturning: !!dto.isReturning,
        path: dto.path,
        templateSlug: dto.templateSlug,
        deviceType,
        browser: dto.browser || 'Other',
        os: dto.os || 'Other',
        referrer: dto.referrer,
        ipAddress: ip,
      });

      // 2. Cập nhật thống kê gộp AnalyticsDaily
      const incUpdate: Record<string, number> = {
        totalPageviews: 1,
        [`devices.${deviceType}`]: 1,
        [`browsers.${browser}`]: 1,
      };

      if (dto.isReturning) {
        incUpdate.returningVisitors = 1;
      } else {
        incUpdate.newVisitors = 1;
      }

      if (templateSlug) {
        incUpdate[`templateViews.${templateSlug}`] = 1;
      }

      await this.dailyModel.updateOne(
        { date: todayStr },
        {
          $inc: incUpdate,
          $setOnInsert: { date: todayStr },
        },
        { upsert: true },
      );

      return { success: true };
    } catch (err) {
      this.logger.error(`Error tracking visit: ${err.message}`, err.stack);
      return { success: false };
    }
  }

  async getOverview(range: 'today' | '7days' | '30days' | 'year' = '7days') {
    const daysCount = range === 'today' ? 1 : range === '7days' ? 7 : range === '30days' ? 30 : 365;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - (daysCount - 1));
    startDate.setHours(0, 0, 0, 0);

    // 1. Tạo danh sách ngày cần lấy
    const dateList: string[] = [];
    for (let i = daysCount - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      dateList.push(`${year}-${month}-${day}`);
    }

    // 2. Lấy dữ liệu gộp từ dailyModel
    const dailyRecords = await this.dailyModel
      .find({ date: { $in: dateList } })
      .lean()
      .exec();

    const dailyMap = new Map<string, any>();
    dailyRecords.forEach((rec) => dailyMap.set(rec.date, rec));

    let totalPageviews = 0;
    let newVisitors = 0;
    let returningVisitors = 0;
    const deviceMap = new Map<string, number>();
    const browserMap = new Map<string, number>();
    const templateViewsMap = new Map<string, number>();

    // 3. Chuẩn bị dữ liệu biểu đồ timeline
    let timeline: Array<{
      date: string;
      displayDate: string;
      pageviews: number;
      newVisitors: number;
      returningVisitors: number;
    }> = [];

    if (range === 'today') {
      // Với 'today', chia theo 12 khung giờ (mỗi 2 tiếng một mốc)
      const todayVisits = await this.visitModel
        .find({ createdAt: { $gte: startDate } })
        .lean()
        .exec();

      totalPageviews = todayVisits.length;
      const hourlyMap = new Map<number, { pageviews: number; newVisitors: number; returningVisitors: number }>();
      for (let h = 0; h < 24; h += 2) {
        hourlyMap.set(h, { pageviews: 0, newVisitors: 0, returningVisitors: 0 });
      }

      todayVisits.forEach((v) => {
        const hour = new Date(v.createdAt).getHours();
        const bucket = Math.floor(hour / 2) * 2;
        const current = hourlyMap.get(bucket) || { pageviews: 0, newVisitors: 0, returningVisitors: 0 };
        current.pageviews += 1;
        if (v.isReturning) {
          current.returningVisitors += 1;
          returningVisitors += 1;
        } else {
          current.newVisitors += 1;
          newVisitors += 1;
        }
        hourlyMap.set(bucket, current);

        // Thiết bị & trình duyệt
        deviceMap.set(v.deviceType || 'unknown', (deviceMap.get(v.deviceType || 'unknown') || 0) + 1);
        const b = v.browser || 'Other';
        browserMap.set(b, (browserMap.get(b) || 0) + 1);
        if (v.templateSlug) {
          templateViewsMap.set(v.templateSlug, (templateViewsMap.get(v.templateSlug) || 0) + 1);
        }
      });

      timeline = Array.from(hourlyMap.entries()).map(([hour, stats]) => ({
        date: `${hour}:00`,
        displayDate: `${hour.toString().padStart(2, '0')}:00`,
        ...stats,
      }));
    } else {
      timeline = dateList.map((dStr) => {
        const [y, m, d] = dStr.split('-');
        const displayDate = `${d}/${m}`;
        const rec = dailyMap.get(dStr);

        const pv = rec?.totalPageviews || 0;
        const nv = rec?.newVisitors || 0;
        const rv = rec?.returningVisitors || 0;

        totalPageviews += pv;
        newVisitors += nv;
        returningVisitors += rv;

        // Gom devices
        if (rec?.devices) {
          Object.entries(rec.devices).forEach(([dev, count]) => {
            deviceMap.set(dev, (deviceMap.get(dev) || 0) + (count as number));
          });
        }
        // Gom browsers
        if (rec?.browsers) {
          Object.entries(rec.browsers).forEach(([br, count]) => {
            browserMap.set(br, (browserMap.get(br) || 0) + (count as number));
          });
        }
        // Gom template views
        if (rec?.templateViews) {
          Object.entries(rec.templateViews).forEach(([t, count]) => {
            templateViewsMap.set(t, (templateViewsMap.get(t) || 0) + (count as number));
          });
        }

        return {
          date: dStr,
          displayDate,
          pageviews: pv,
          newVisitors: nv,
          returningVisitors: rv,
        };
      });
    }

    // 4. Định dạng thiết bị (Devices Breakdown)
    const totalDevices = Array.from(deviceMap.values()).reduce((a, b) => a + b, 0) || 1;
    const deviceLabels: Record<string, string> = {
      mobile: 'Điện thoại (Mobile)',
      desktop: 'Máy tính (Desktop)',
      tablet: 'Máy tính bảng (Tablet)',
      unknown: 'Khác',
    };
    const deviceColors: Record<string, string> = {
      mobile: '#6366f1', // Indigo
      desktop: '#06b6d4', // Cyan
      tablet: '#f59e0b', // Amber
      unknown: '#94a3b8', // Slate
    };

    const devices = Array.from(deviceMap.entries()).map(([key, count]) => ({
      key,
      name: deviceLabels[key] || key,
      count,
      percent: Math.round((count / totalDevices) * 100),
      color: deviceColors[key] || '#8b5cf6',
    })).sort((a, b) => b.count - a.count);

    // 5. Định dạng trình duyệt (Browsers Breakdown)
    const browsers = Array.from(browserMap.entries())
      .map(([name, count]) => ({
        name,
        count,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 7);

    // 6. Định dạng Top Templates
    const sortedTemplateEntries = Array.from(templateViewsMap.entries()).sort((a, b) => b[1] - a[1]);
    const totalTemplateViews = sortedTemplateEntries.reduce((total, [, count]) => total + count, 0);
    const templateEntries = sortedTemplateEntries.slice(0, 10);

    const topTemplates = await Promise.all(
      templateEntries.map(async ([slugOrCode, count]) => {// 1. Kiểm tra nếu slugOrCode khớp trực tiếp với Template Code hoặc ID
        let matchedTemplate: any = DEFAULT_TEMPLATES.find(
          (t) => t.code === slugOrCode || t.id.toString() === slugOrCode,
        );

        if (!matchedTemplate) {
          try {
            matchedTemplate = await this.templateModel
              .findOne({ $or: [{ code: slugOrCode }, { id: isNaN(Number(slugOrCode)) ? -1 : Number(slugOrCode) }] })
              .lean()
              .exec();
          } catch {}
        }

        if (matchedTemplate) {
          return {
            code: matchedTemplate.code || slugOrCode,
            name: matchedTemplate.name,
            subtitle: 'Mẫu thiệp cưới tiêu chuẩn',
            thumbnail: matchedTemplate.thumbnail || '',
            price: matchedTemplate.price || 0,
            views: count,
          };
        }

        // 2. Nếu slugOrCode là slug thiệp cưới (ví dụ: letuantu-dangbichhanh-311226)
        try {
          const wedding = await this.weddingModel.findOne({ slug: slugOrCode }).lean().exec();
          if (wedding) {
            let weddingTemplate: any = null;

            // Tìm theo templateId trong DB hoặc DEFAULT_TEMPLATES
            if (wedding.templateId) {
              try {
                weddingTemplate = await this.templateModel.findById(wedding.templateId).lean().exec();
              } catch {}
              if (!weddingTemplate) {
                const tidStr = wedding.templateId.toString();
                weddingTemplate = DEFAULT_TEMPLATES.find(
                  (t) => t.code === tidStr || t.id.toString() === tidStr,
                );
              }
            }

            // Fallback template mặc định nếu không tìm thấy
            if (!weddingTemplate) {
              weddingTemplate = DEFAULT_TEMPLATES[0];
            }

            return {
              code: weddingTemplate?.code || 'temp_1',
              name: weddingTemplate?.name || 'Song Hỷ - Xanh',
              subtitle: `Thiệp: ${wedding.groomName} & ${wedding.brideName}`,
              thumbnail: weddingTemplate?.thumbnail || '',
              price: weddingTemplate?.price || 99000,
              views: count,
            };
          }
        } catch {}

        return {
          code: slugOrCode,
          name: `Mẫu #${slugOrCode}`,
          subtitle: 'Mẫu thiệp trực tuyến',
          thumbnail: DEFAULT_TEMPLATES[0]?.thumbnail || '',
          price: 99000,
          views: count,
        };
      }),
    );

    const totalVisitors = newVisitors + returningVisitors;
    const returningRate = totalVisitors > 0 ? Math.round((returningVisitors / totalVisitors) * 100) : 0;

    return {
      range,
      kpi: {
        totalPageviews,
        totalVisitors,
        newVisitors,
        returningVisitors,
        returningRate,
        totalTemplateViews,
      },
      timeline,
      devices,
      browsers,
      topTemplates,
    };
  }

  async resetData(): Promise<{ success: boolean; message: string }> {
    await this.visitModel.deleteMany({});
    await this.dailyModel.deleteMany({});
    return { success: true, message: 'Cleaned all test analytics data' };
  }
}
