import { MiniStat } from "@/shared/ui/admin/MiniStat";
import { DeviceStat } from "@/shared/ui/admin/DeviceStat";
import {
  Eye,
  Mail,
  Heart,
  DollarSign,
  Users,
  Activity,
  Database,
  Settings,
  Clock,
  Smartphone,
  Monitor,
  Tablet,
} from "lucide-react";

export function AdminDashboardSystem({ kpi, system }: any) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Quick Stats Grid */}
      <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-5">
        <h3 className="text-base font-semibold text-slate-800 mb-4">
          Thống kê tổng quan
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
          <MiniStat
            icon={<Eye size={12} />}
            title="Lượt xem trang"
            value={kpi.totalViews.toLocaleString()}
            color="text-orange-500"
            bg="bg-orange-50"
          />
          <MiniStat
            icon={<Mail size={12} />}
            title="Lượt mở thiệp"
            value="0"
            color="text-emerald-500"
            bg="bg-emerald-50"
          />
          <MiniStat
            icon={<Heart size={12} />}
            title="Lượt nhấp bản đồ"
            value="0"
            color="text-blue-500"
            bg="bg-blue-50"
          />
          <MiniStat
            icon={<Heart size={12} />}
            title="Lượt nhấp QR"
            value="0"
            color="text-purple-500"
            bg="bg-purple-50"
          />
          <MiniStat
            icon={<Heart size={12} />}
            title="Lời chúc đã gửi"
            value="0"
            color="text-pink-500"
            bg="bg-pink-50"
          />
          <MiniStat
            icon={<Heart size={12} />}
            title="Quà mừng"
            value="0"
            color="text-rose-500"
            bg="bg-rose-50"
          />
          <MiniStat
            icon={<DollarSign size={12} />}
            title="Doanh thu"
            value="0"
            color="text-emerald-600"
            bg="bg-emerald-50"
          />
        </div>
      </div>

      <div className="grid grid-rows-2 gap-6">
        {/* System Info */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <h3 className="text-base font-semibold text-slate-800 mb-4">
            Thông tin hệ thống
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500 flex items-center gap-2 text-xs">
                <Users size={14} /> Tổng người dùng
              </span>
              <span className="font-semibold text-slate-800 text-xs">
                {system.totalUsers}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500 flex items-center gap-2 text-xs">
                <Activity size={14} /> Đang hoạt động
              </span>
              <span className="font-semibold text-slate-800 text-xs">
                {system.activeUsers}
              </span>
            </div>
            <div>
              <div className="flex justify-between items-center text-sm mb-1.5">
                <span className="text-slate-500 flex items-center gap-2 text-xs">
                  <Database size={14} /> Dung lượng đã SD
                </span>
                <span className="font-semibold text-slate-800 text-[10px]">
                  48.6 GB / 200 GB
                </span>
              </div>
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-500 rounded-full"
                  style={{ width: "24%" }}
                />
              </div>
              <p className="text-right text-[9px] text-slate-400 mt-0.5">24%</p>
            </div>
            <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-xs">
              <span className="text-slate-400 flex items-center gap-1">
                <Settings size={12} /> Phiên bản hệ thống
              </span>
              <span className="font-medium text-slate-600">v2.3.1</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400 flex items-center gap-1">
                <Clock size={12} /> Cập nhật mới nhất
              </span>
              <span className="font-medium text-slate-600">28/05/2025</span>
            </div>
          </div>
        </div>

        {/* Device Access */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <h3 className="text-base font-semibold text-slate-800 mb-4">
            Truy cập theo thiết bị
          </h3>
          <div className="space-y-4">
            <DeviceStat
              icon={<Smartphone size={14} />}
              name="Mobile"
              percent={68.2}
              color="bg-indigo-500"
            />
            <DeviceStat
              icon={<Monitor size={14} />}
              name="Desktop"
              percent={28.7}
              color="bg-blue-500"
            />
            <DeviceStat
              icon={<Tablet size={14} />}
              name="Tablet"
              percent={3.1}
              color="bg-emerald-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
