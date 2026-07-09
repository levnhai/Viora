import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Wedding, WeddingDocument } from '../weddings/schemas/wedding.schema';
import { Guest, GuestDocument } from '../guests/schemas/guest.schema';
import { User, UserDocument } from '../users/schemas/user.schema';
import { AuditLog, AuditLogDocument } from './schemas/audit-log.schema';

@Injectable()
export class DashboardService {
  constructor(
    @InjectModel(Wedding.name) private readonly weddingModel: Model<WeddingDocument>,
    @InjectModel(Guest.name) private readonly guestModel: Model<GuestDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(AuditLog.name) private readonly auditLogModel: Model<AuditLogDocument>,
  ) {}

  async getDashboardStats() {
    // 1. Top KPI Cards
    const totalWeddings = await this.weddingModel.countDocuments();
    const totalGuests = await this.guestModel.countDocuments();
    
    // Aggregate Views
    const viewsAgg = await this.weddingModel.aggregate([
      { $group: { _id: null, totalViews: { $sum: '$views' } } }
    ]);
    const totalViews = viewsAgg.length > 0 ? viewsAgg[0].totalViews : 0;

    // RSVP Stats
    const rsvpConfirmed = await this.guestModel.countDocuments({ rsvpStatus: 'confirmed' });
    const rsvpDeclined = await this.guestModel.countDocuments({ rsvpStatus: 'declined' });
    const rsvpPending = await this.guestModel.countDocuments({ rsvpStatus: 'pending' });

    // 2. RSVP Pie Chart Data
    const rsvpPieData = [
      { name: 'Xác nhận', value: rsvpConfirmed, color: '#22c55e' },
      { name: 'Từ chối', value: rsvpDeclined, color: '#f97316' },
      { name: 'Chưa phản hồi', value: rsvpPending, color: '#3b82f6' },
    ];

    // 3. Line Chart Data (Last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 29);
    thirtyDaysAgo.setHours(0, 0, 0, 0);

    // Aggregate guests created in last 30 days, grouped by date and status
    const rsvpDailyAgg = await this.guestModel.aggregate([
      { $match: { createdAt: { $gte: thirtyDaysAgo } } },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: '%d/%m', date: '$createdAt' } },
            status: '$rsvpStatus'
          },
          count: { $sum: 1 }
        }
      }
    ]);

    // Format into timeline array
    const dateMap = new Map();
    // Pre-fill last 30 days with 0s
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}`;
      dateMap.set(dateStr, { name: dateStr, confirm: 0, decline: 0, pending: 0 });
    }

    rsvpDailyAgg.forEach((item) => {
      const dateStr = item._id.date;
      const status = item._id.status;
      if (dateMap.has(dateStr)) {
        const obj = dateMap.get(dateStr);
        if (status === 'confirmed') obj.confirm = item.count;
        if (status === 'declined') obj.decline = item.count;
        if (status === 'pending') obj.pending = item.count;
      }
    });
    const rsvpData = Array.from(dateMap.values());

    // 4. Top Weddings by Views
    const topWeddingsQuery = await this.weddingModel
      .find({ status: { $ne: 'hidden' } })
      .sort({ views: -1 })
      .limit(5)
      .exec();

    // Map top weddings, fetch guest counts for them
    const topWeddings = await Promise.all(topWeddingsQuery.map(async (w, i) => {
      const guestCount = await this.guestModel.countDocuments({ weddingId: w._id });
      return {
        id: w._id.toString(),
        name: `${w.groomName} & ${w.brideName}`,
        sub: w.slug,
        views: w.views.toLocaleString(),
        guests: guestCount.toLocaleString(),
        date: new Date((w as any).createdAt as Date).toLocaleDateString('vi-VN')
      };
    }));

    // 5. Recent Activities
    const recentLogs = await this.auditLogModel
      .find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('userId', 'fullName email')
      .exec();

    const recentActivities = recentLogs.map(log => {
      let icon = 'settings';
      let bg = 'bg-slate-50';
      if (log.action.includes('create')) { icon = 'file'; bg = 'bg-emerald-50'; }
      if (log.action.includes('rsvp')) { icon = 'check'; bg = 'bg-emerald-50'; }
      if (log.action.includes('decline')) { icon = 'x'; bg = 'bg-red-50'; }
      if (log.action.includes('guestbook')) { icon = 'heart'; bg = 'bg-blue-50'; }

      const timeDiff = Math.floor((new Date().getTime() - new Date((log as any).createdAt as Date).getTime()) / 60000);
      const timeStr = timeDiff < 60 ? `${timeDiff} phút trước` : 
                      timeDiff < 1440 ? `${Math.floor(timeDiff/60)} giờ trước` : 
                      `${Math.floor(timeDiff/1440)} ngày trước`;

      return {
        id: log._id.toString(),
        text: `${(log.userId as any)?.fullName || 'Hệ thống'} ${log.action}`,
        sub: log.resourceType,
        time: timeStr,
        iconType: icon,
        bg
      };
    });

    // 6. System Info
    const totalUsers = await this.userModel.countDocuments();
    const activeUsers = await this.userModel.countDocuments({ status: 'active' });

    return {
      kpi: {
        totalWeddings,
        totalGuests,
        rsvpConfirmed,
        rsvpDeclined,
        rsvpPending,
        totalViews
      },
      charts: {
        rsvpData,
        rsvpPieData
      },
      tables: {
        topWeddings,
        recentActivities
      },
      system: {
        totalUsers,
        activeUsers
      }
    };
  }
}
