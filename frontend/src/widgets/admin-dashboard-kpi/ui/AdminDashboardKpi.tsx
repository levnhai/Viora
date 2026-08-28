import { StatCard } from "@/shared/ui/admin/StatCard";
import { Heart, Users, MessageSquare, Coins, Eye } from "lucide-react";

interface AdminDashboardKpiProps {
  totalWeddings?: number;
  totalRequests?: number;
  revenue?: number;
  totalGuests?: number;
  totalViews?: number;
}

export function AdminDashboardKpi({
  totalWeddings = 0,
  totalRequests = 0,
  revenue = 0,
  totalGuests = 0,
  totalViews = 0,
}: AdminDashboardKpiProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {/* 1. Tổng thiệp cưới */}
      <StatCard
        icon={<Heart size={20} />}
        iconBg="bg-indigo-50 text-indigo-600"
        title="Tổng thiệp cưới"
        value={totalWeddings.toLocaleString()}
      />

      {/* 2. Yêu cầu tạo thiệp */}
      <StatCard
        icon={<MessageSquare size={20} />}
        iconBg="bg-amber-50 text-amber-600"
        title="Yêu cầu tạo thiệp"
        value={totalRequests.toLocaleString()}
      />

      {/* 3. Doanh thu */}
      <StatCard
        icon={<Coins size={20} />}
        iconBg="bg-emerald-50 text-emerald-600"
        title="Doanh thu"
        value={`${revenue.toLocaleString()} đ`}
      />

      {/* 4. Tổng khách mời */}
      <StatCard
        icon={<Users size={20} />}
        iconBg="bg-blue-50 text-blue-600"
        title="Tổng khách mời"
        value={totalGuests.toLocaleString()}
      />

      {/* 5. Tổng lượt xem */}
      <StatCard
        icon={<Eye size={20} />}
        iconBg="bg-pink-50 text-pink-600"
        title="Tổng lượt xem"
        value={totalViews.toLocaleString()}
      />
    </div>
  );
}
