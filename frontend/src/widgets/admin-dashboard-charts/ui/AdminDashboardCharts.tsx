import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { CheckCircle, XCircle, Heart, FileClock, Settings } from "lucide-react";

export function AdminDashboardCharts({ charts, tables, totalRsvp }: any) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Line Chart */}
      <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex flex-col h-[400px]">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-base font-semibold text-slate-800">
            Thống kê RSVP theo ngày
          </h3>
          <select className="text-xs border border-slate-200 rounded-md px-2 py-1 bg-white text-slate-600 outline-none">
            <option>30 ngày qua</option>
          </select>
        </div>
        <div className="flex-1 w-full h-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={charts.rsvpData}
              margin={{ top: 5, right: 20, bottom: 5, left: -20 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e2e8f0"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#64748b" }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#64748b" }}
                tickFormatter={(val) => (val >= 1000 ? `${val / 1000}k` : val)}
              />
              <RechartsTooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
              />
              <Legend
                iconType="circle"
                wrapperStyle={{ fontSize: "12px", paddingTop: "20px" }}
              />
              <Line
                name="Xác nhận"
                type="monotone"
                dataKey="confirm"
                stroke="#22c55e"
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 2 }}
                activeDot={{ r: 6 }}
              />
              <Line
                name="Từ chối"
                type="monotone"
                dataKey="decline"
                stroke="#f97316"
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 2 }}
                activeDot={{ r: 6 }}
              />
              <Line
                name="Chưa phản hồi"
                type="monotone"
                dataKey="pending"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 2 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Donut Chart & Activities */}
      <div className="grid grid-rows-2 gap-6 h-[400px]">
        {/* Donut Chart */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex flex-col h-full">
          <h3 className="text-base font-semibold text-slate-800 mb-2">
            Tỷ lệ RSVP
          </h3>
          <div className="flex-1 flex items-center justify-center relative -mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={charts.rsvpPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={75}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {charts.rsvpPieData.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xl font-bold text-slate-800">
                {totalRsvp.toLocaleString()}
              </span>
              <span className="text-[10px] text-slate-500">Tổng</span>
            </div>
          </div>
          <div className="mt-2 space-y-2">
            {charts.rsvpPieData.map((item: any) => (
              <div
                key={item.name}
                className="flex justify-between items-center text-xs"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-slate-600">{item.name}</span>
                </div>
                <span className="font-medium text-slate-800">
                  {item.value.toLocaleString()}{" "}
                  <span className="text-slate-400 font-normal">
                    ({((item.value / totalRsvp) * 100).toFixed(1)}%)
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex flex-col h-full overflow-hidden">
          <h3 className="text-base font-semibold text-slate-800 mb-4 shrink-0">
            Hoạt động gần đây
          </h3>
          <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
            {tables.recentActivities.length > 0 ? (
              tables.recentActivities.map((act: any) => (
                <div key={act.id} className="flex gap-3">
                  <div
                    className={`w-8 h-8 rounded-full ${act.bg} flex items-center justify-center shrink-0`}
                  >
                    {act.iconType === "check" ? (
                      <CheckCircle size={16} className="text-emerald-500" />
                    ) : act.iconType === "x" ? (
                      <XCircle size={16} className="text-red-500" />
                    ) : act.iconType === "heart" ? (
                      <Heart size={16} className="text-blue-500" />
                    ) : act.iconType === "file" ? (
                      <FileClock size={16} className="text-emerald-500" />
                    ) : (
                      <Settings size={16} className="text-slate-500" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-800 font-medium truncate">
                      {act.text}
                    </p>
                    {act.sub && (
                      <p className="text-[10px] text-slate-500 mt-0.5">
                        {act.sub}
                      </p>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400 whitespace-nowrap">
                    {act.time}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 text-center py-4">
                Chưa có hoạt động nào
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
