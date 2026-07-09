import { StatCard } from "@/shared/ui/admin/StatCard";
import { Heart, Users, CheckCircle, XCircle, Clock, Eye } from "lucide-react";

export function AdminDashboardKpi({ kpi }: { kpi: any }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <StatCard
        icon={<Heart size={20} />}
        iconBg="bg-indigo-50 text-indigo-600"
        title="Tổng thiệp cưới"
        value={kpi.totalWeddings.toLocaleString()}
      />
      <StatCard
        icon={<Users size={20} />}
        iconBg="bg-blue-50 text-blue-600"
        title="Tổng khách mời"
        value={kpi.totalGuests.toLocaleString()}
      />
      <StatCard
        icon={<CheckCircle size={20} />}
        iconBg="bg-emerald-50 text-emerald-600"
        title="Xác nhận tham dự"
        value={kpi.rsvpConfirmed.toLocaleString()}
      />
      <StatCard
        icon={<XCircle size={20} />}
        iconBg="bg-orange-50 text-orange-600"
        title="Từ chối tham dự"
        value={kpi.rsvpDeclined.toLocaleString()}
      />
      <StatCard
        icon={<Clock size={20} />}
        iconBg="bg-slate-100 text-slate-600"
        title="Chưa phản hồi"
        value={kpi.rsvpPending.toLocaleString()}
      />
      <StatCard
        icon={<Eye size={20} />}
        iconBg="bg-pink-50 text-pink-600"
        title="Tổng lượt xem"
        value={kpi.totalViews.toLocaleString()}
      />
    </div>
  );
}
