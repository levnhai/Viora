"use client";

import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { RefreshCw, Activity, Eye, Users } from "lucide-react";

interface TrafficAreaChartProps {
  data?: any[];
  range: "today" | "7days" | "30days" | "year";
  onRangeChange: (range: "today" | "7days" | "30days" | "year") => void;
  onRefresh: () => void;
  isRefreshing?: boolean;
}

export function TrafficAreaChart({
  data = [],
  range,
  onRangeChange,
  onRefresh,
  isRefreshing = false,
}: TrafficAreaChartProps) {
  const [metric, setMetric] = useState<"pageviews" | "visitors">("pageviews");

  // Format chart data with fallbacks
  const chartData =
    data && data.length > 0
      ? data.map((item) => ({
          time: item.date || item.hour || item.time || "",
          pageviews: item.pageviews || item.views || item.count || 0,
          visitors: item.uniqueVisitors || item.visitors || item.newVisitors || 0,
          returning: item.returningVisitors || 0,
        }))
      : [
          { time: "00:00", pageviews: 0, visitors: 0 },
          { time: "06:00", pageviews: 0, visitors: 0 },
          { time: "12:00", pageviews: 1, visitors: 1 },
          { time: "18:00", pageviews: 0, visitors: 0 },
          { time: "23:59", pageviews: 0, visitors: 0 },
        ];

  const ranges = [
    { key: "today", label: "Hôm nay" },
    { key: "7days", label: "7 ngày" },
    { key: "30days", label: "30 ngày" },
    { key: "year", label: "Năm nay" },
  ] as const;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 p-5 sm:p-6 lg:p-7 shadow-xs flex flex-col justify-between">
      {/* Chart Top Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800/80">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-500/20">
              <Activity className="w-4.5 h-4.5" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                  Lưu lượng & Hành vi truy cập
                </h3>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Phân tích lượt xem trang và số lượng khách xem thiệp
              </p>
            </div>
          </div>
        </div>

        {/* Range Selector & Refresh button */}
        <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
          {/* Metric switcher */}
          <div className="flex items-center bg-slate-100/90 dark:bg-slate-800/90 p-1 rounded-xl text-xs font-semibold border border-slate-200/60 dark:border-slate-700/60">
            <button
              onClick={() => setMetric("pageviews")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all text-xs ${
                metric === "pageviews"
                  ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-2xs font-bold"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              <Eye size={13} />
              <span>Lượt xem</span>
            </button>
            <button
              onClick={() => setMetric("visitors")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all text-xs ${
                metric === "visitors"
                  ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-2xs font-bold"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              <Users size={13} />
              <span>Khách</span>
            </button>
          </div>

          {/* Time range pills */}
          <div className="flex items-center bg-slate-100/90 dark:bg-slate-800/90 p-1 rounded-xl text-xs font-semibold border border-slate-200/60 dark:border-slate-700/60">
            {ranges.map((r) => (
              <button
                key={r.key}
                onClick={() => onRangeChange(r.key)}
                className={`px-3 py-1.5 rounded-lg transition-all text-xs ${
                  range === r.key
                    ? "bg-indigo-600 text-white shadow-xs font-bold"
                    : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>

          {/* Refresh button */}
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="p-2 rounded-xl border border-slate-200/90 dark:border-slate-700/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors disabled:opacity-50 shrink-0"
            title="Làm mới dữ liệu"
          >
            <RefreshCw
              size={14}
              className={`${isRefreshing ? "animate-spin text-indigo-600" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Main Area Chart Canvas */}
      <div className="h-[340px] sm:h-[380px] lg:h-[400px] w-full pt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorPageviews" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f1f5f9"
              className="dark:stroke-slate-800"
            />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11, fill: "#94a3b8" }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11, fill: "#94a3b8" }}
              allowDecimals={false}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-slate-900/95 text-white p-3.5 rounded-xl shadow-xl border border-slate-700/80 text-xs backdrop-blur-md">
                      <div className="font-bold text-slate-300 border-b border-slate-700/80 pb-1.5 mb-2">
                        Thời gian: {label}
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between gap-6">
                          <span className="flex items-center gap-1.5 text-indigo-400 font-medium">
                            <span className="w-2 h-2 rounded-full bg-indigo-500" />
                            Lượt xem trang:
                          </span>
                          <strong className="font-bold tabular-nums text-white">
                            {payload[0]?.value || 0}
                          </strong>
                        </div>
                        {payload[1] && (
                          <div className="flex items-center justify-between gap-6">
                            <span className="flex items-center gap-1.5 text-rose-400 font-medium">
                              <span className="w-2 h-2 rounded-full bg-rose-500" />
                              Khách truy cập:
                            </span>
                            <strong className="font-bold tabular-nums text-white">
                              {payload[1]?.value || 0}
                            </strong>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey={metric === "pageviews" ? "pageviews" : "visitors"}
              stroke={metric === "pageviews" ? "#6366f1" : "#f43f5e"}
              strokeWidth={2.5}
              fillOpacity={1}
              fill={
                metric === "pageviews"
                  ? "url(#colorPageviews)"
                  : "url(#colorVisitors)"
              }
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
