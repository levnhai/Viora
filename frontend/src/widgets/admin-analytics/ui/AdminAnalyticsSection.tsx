"use client";

import { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import {
  Activity,
  Users,
  Eye,
  Smartphone,
  Globe,
  Radio,
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  LayoutTemplate,
  Loader2,
  RotateCcw,
} from "lucide-react";
import { fetchAnalyticsOverview } from "@/entities/analytics/api/analyticsApi";
import { useRealtimeOnline } from "@/entities/analytics/model/useRealtimeOnline";
import { AnalyticsOverviewData } from "@/entities/analytics/model/types";

interface Props {
  initialRange?: "today" | "7days" | "30days" | "year";
}

export function AdminAnalyticsSection({ initialRange = "7days" }: Props) {
  const [range, setRange] = useState<"today" | "7days" | "30days" | "year">(initialRange);
  const [loading, setLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [data, setData] = useState<AnalyticsOverviewData | null>(null);
  const { onlineCount, isLive } = useRealtimeOnline();

  const loadData = async (selectedRange: "today" | "7days" | "30days" | "year", isBackground = false) => {
    if (!isBackground) setLoading(true);
    else setIsRefreshing(true);

    const res = await fetchAnalyticsOverview(selectedRange);
    if (res) {
      setData(res);
    }
    setLoading(false);
    setIsRefreshing(false);
  };

  useEffect(() => {
    loadData(range);

    // Tự động cập nhật số liệu ngầm mỗi 8 giây
    const interval = setInterval(() => {
      loadData(range, true);
    }, 8000);

    return () => clearInterval(interval);
  }, [range]);

  const kpi = data?.kpi || {
    totalPageviews: 0,
    totalVisitors: 0,
    newVisitors: 0,
    returningVisitors: 0,
    returningRate: 0,
    totalTemplateViews: 0,
  };

  const timeline = data?.timeline || [];
  const devices = data?.devices || [];
  const browsers = data?.browsers || [];
  const topTemplates = data?.topTemplates || [];

  return (
    <div className="space-y-6 mt-6">
      {/* Header Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-5 rounded-2xl shadow-lg border border-slate-800">
        <div>
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-indigo-400" />
              Thống kê Lưu lượng & Hành vi Khách hàng
            </h3>
            {/* Realtime Live Pulse Badge */}
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{isLive ? "REALTIME LIVE" : "ONLINE"}</span>
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Theo dõi người dùng trực tiếp, thiết bị, trình duyệt và độ quan tâm mẫu thiệp
          </p>
        </div>

        {/* Range Selector & Refresh Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => loadData(range)}
            title="Làm mới số liệu ngay"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium border border-slate-700 transition-all cursor-pointer"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${isRefreshing || loading ? "animate-spin text-indigo-400" : ""}`} />
            <span>Làm mới</span>
          </button>

          <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700">
            {(
              [
                { key: "today", label: "Hôm nay" },
                { key: "7days", label: "7 ngày" },
                { key: "30days", label: "30 ngày" },
                { key: "year", label: "Năm nay" },
              ] as const
            ).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setRange(tab.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  range === tab.key
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 4 Cards KPI */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Realtime Online */}
        <div className="relative overflow-hidden bg-white p-5 rounded-xl border border-emerald-100 shadow-sm flex flex-col justify-between group hover:border-emerald-300 transition-all">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                Đang trực tuyến
              </p>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-3xl font-extrabold text-slate-800">
                  {onlineCount}
                </span>
                <span className="text-xs font-semibold text-emerald-600 flex items-center">
                  khách online
                </span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Radio className="w-5 h-5 animate-pulse" />
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Cập nhật liên tục</span>
            <span className="text-emerald-600 font-medium flex items-center gap-0.5">
              Live Socket <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Tổng Pageviews */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between hover:border-indigo-300 transition-all">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                Tổng Lượt Truy Cập
              </p>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-3xl font-extrabold text-slate-800">
                  {kpi.totalPageviews.toLocaleString()}
                </span>
                <span className="text-xs font-semibold text-indigo-600">
                  lượt xem
                </span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Eye className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Khách truy cập:</span>
            <span className="text-slate-800 font-semibold">
              {kpi.totalVisitors.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Khách mới vs Quay lại */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between hover:border-amber-300 transition-all">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                Tỷ Lệ Quay Lại
              </p>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-3xl font-extrabold text-slate-800">
                  {kpi.returningRate}%
                </span>
                <span className="text-xs text-amber-600 font-medium">
                  {kpi.returningVisitors} khách cũ
                </span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Khách mới:</span>
            <span className="text-slate-800 font-semibold">
              {kpi.newVisitors.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Xem Mẫu Thiệp */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between hover:border-rose-300 transition-all">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                Xem Mẫu Thiệp
              </p>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-3xl font-extrabold text-slate-800">
                  {kpi.totalTemplateViews.toLocaleString()}
                </span>
                <span className="text-xs text-rose-600 font-medium">
                  lượt xem mẫu
                </span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <LayoutTemplate className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Mẫu hot nhất:</span>
            <span className="text-slate-800 font-semibold truncate max-w-[120px]">
              {topTemplates[0]?.name || "Chưa có"}
            </span>
          </div>
        </div>
      </div>

      {/* Main Charts Grid: Timeline (2/3) + Devices (1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Timeline Area Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex flex-col min-h-[380px]">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h4 className="text-base font-semibold text-slate-800 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-indigo-600" />
                Biểu đồ Lượt truy cập theo Thời gian
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Phân tích lưu lượng xem trang, khách mới và khách quay lại
              </p>
            </div>
            {loading && <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />}
          </div>

          <div className="flex-1 w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={timeline}
                margin={{ top: 10, right: 20, bottom: 5, left: -20 }}
              >
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorReturning" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis
                  dataKey="displayDate"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#64748b" }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#64748b" }}
                />
                <RechartsTooltip
                  contentStyle={{
                    borderRadius: "10px",
                    border: "none",
                    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                    fontSize: "12px",
                  }}
                />
                <Legend
                  iconType="circle"
                  wrapperStyle={{ fontSize: "12px", paddingTop: "16px" }}
                />
                <Area
                  name="Tổng lượt xem"
                  type="monotone"
                  dataKey="pageviews"
                  stroke="#6366f1"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorViews)"
                />
                <Area
                  name="Khách mới"
                  type="monotone"
                  dataKey="newVisitors"
                  stroke="#10b981"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorNew)"
                />
                <Area
                  name="Khách quay lại"
                  type="monotone"
                  dataKey="returningVisitors"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorReturning)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Devices Breakdown Donut Chart */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex flex-col justify-between">
          <div>
            <h4 className="text-base font-semibold text-slate-800 flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-cyan-600" />
              Thiết bị truy cập
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Phân bổ theo Điện thoại, Máy tính, Tablet
            </p>
          </div>

          <div className="flex-1 flex items-center justify-center relative min-h-[190px]">
            {devices.length > 0 ? (
              <ResponsiveContainer width="100%" height={190}>
                <PieChart>
                  <Pie
                    data={devices}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="count"
                    stroke="none"
                  >
                    {devices.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-xs text-slate-400">Chưa có dữ liệu thiết bị</div>
            )}
            {devices.length > 0 && (
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xl font-bold text-slate-800">
                  {kpi.totalPageviews}
                </span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider">
                  Lượt xem
                </span>
              </div>
            )}
          </div>

          <div className="mt-3 space-y-2 border-t border-slate-100 pt-3">
            {devices.map((dev) => (
              <div key={dev.key} className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: dev.color }}
                  />
                  <span className="text-slate-600">{dev.name}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-slate-800">
                    {dev.count.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    ({dev.percent}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: Browsers Breakdown & Top Templates Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Browsers Chart */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex flex-col justify-between">
          <div>
            <h4 className="text-base font-semibold text-slate-800 flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-600" />
              Trình duyệt phổ biến
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Chrome, Safari, Cốc Cốc, Zalo & FB In-app
            </p>
          </div>

          <div className="mt-4 space-y-3">
            {browsers.length > 0 ? (
              browsers.map((b, idx) => {
                const maxCount = browsers[0]?.count || 1;
                const percent = Math.round((b.count / maxCount) * 100);
                return (
                  <div key={b.name || idx} className="space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-medium text-slate-700 truncate max-w-[180px]">
                        {b.name}
                      </span>
                      <span className="font-semibold text-slate-800">
                        {b.count.toLocaleString()} <span className="text-[10px] text-slate-400 font-normal">lượt</span>
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-xs text-slate-400 py-8 text-center">
                Chưa có dữ liệu trình duyệt
              </div>
            )}
          </div>
        </div>

        {/* Top Templates Table */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h4 className="text-base font-semibold text-slate-800 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                Mẫu Thiệp Được Xem Nhiều Nhất
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Xếp hạng độ yêu thích và số lần xem mẫu của khách hàng
              </p>
            </div>
          </div>

          <div className="overflow-x-auto flex-1">
            {topTemplates.length > 0 ? (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    <th className="pb-3 pl-2">#</th>
                    <th className="pb-3">Mẫu thiệp</th>
                    <th className="pb-3">Mã code</th>
                    <th className="pb-3">Giá niêm yết</th>
                    <th className="pb-3 text-right pr-2">Lượt xem</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-xs">
                  {topTemplates.map((item, index) => (
                    <tr key={item.code} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 pl-2 font-bold text-slate-400">
                        {index === 0 ? (
                          <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-[10px]">
                            1
                          </span>
                        ) : index === 1 ? (
                          <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[10px]">
                            2
                          </span>
                        ) : index === 2 ? (
                          <span className="w-5 h-5 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center text-[10px]">
                            3
                          </span>
                        ) : (
                          index + 1
                        )}
                      </td>
                      <td className="py-3 font-medium text-slate-800">
                        <div className="flex items-center gap-3">
                          {item.thumbnail ? (
                            <img
                              src={item.thumbnail}
                              alt={item.name}
                              className="w-9 h-12 object-cover rounded-md border border-slate-200 shadow-2xs"
                            />
                          ) : (
                            <div className="w-9 h-12 bg-slate-100 rounded-md border border-slate-200 flex items-center justify-center text-slate-400">
                              <LayoutTemplate className="w-4 h-4" />
                            </div>
                          )}
                          <div>
                            <p className="font-semibold text-slate-800">{item.name}</p>
                            <p className="text-[10px] text-indigo-600 font-medium mt-0.5">
                              {item.subtitle || "Mẫu thiệp cưới tiêu chuẩn"}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3">
                        <span className="px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 font-mono text-xs font-semibold border border-indigo-100/80 shadow-2xs">
                          {item.code}
                        </span>
                      </td>
                      <td className="py-3 font-medium text-slate-700">
                        {item.price ? `${item.price.toLocaleString()} đ` : "Miễn phí"}
                      </td>
                      <td className="py-3 text-right pr-2 font-bold text-indigo-600">
                        {item.views.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="py-12 text-center text-xs text-slate-400">
                Chưa có lượt xem mẫu thiệp nào được ghi nhận
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
