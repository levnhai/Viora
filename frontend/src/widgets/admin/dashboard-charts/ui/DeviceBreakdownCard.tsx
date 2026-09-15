"use client";

import { Smartphone, Monitor, Tablet, Globe } from "lucide-react";

interface DeviceBreakdownCardProps {
  deviceStats?: {
    mobile?: number;
    desktop?: number;
    tablet?: number;
  };
  topBrowsers?: Array<{
    name?: string;
    browser?: string;
    count?: number;
    percent?: number;
    percentage?: number;
  }>;
}

export function DeviceBreakdownCard({
  deviceStats,
  topBrowsers = [],
}: DeviceBreakdownCardProps) {
  const mobile = deviceStats?.mobile || 0;
  const desktop = deviceStats?.desktop || 1;
  const tablet = deviceStats?.tablet || 0;
  const total = mobile + desktop + tablet || 1;

  const mobilePct = Math.round((mobile / total) * 100);
  const desktopPct = Math.round((desktop / total) * 100);
  const tabletPct = Math.round((tablet / total) * 100);

  const totalBrowserCount =
    topBrowsers.reduce((acc, b) => acc + (b.count || 0), 0) || 1;

  const formattedBrowsers =
    topBrowsers.length > 0
      ? topBrowsers.map((b) => ({
          browserName: b.name || b.browser || "Trình duyệt khác",
          count: b.count || 0,
          pct:
            b.percent ??
            b.percentage ??
            Math.round(((b.count || 0) / totalBrowserCount) * 100),
        }))
      : [
          { browserName: "Chrome", count: desktop || 1, pct: 80 },
          { browserName: "Mobile Safari", count: mobile, pct: 15 },
          { browserName: "Khác", count: 0, pct: 5 },
        ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 p-5 sm:p-6 lg:p-7 shadow-xs flex flex-col justify-between space-y-6 h-full">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center border border-rose-500/20">
            <Smartphone className="w-4.5 h-4.5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
              Thiết bị & Nền tảng
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Tỷ lệ truy cập theo thiết bị & trình duyệt
            </p>
          </div>
        </div>
      </div>

      {/* Device bars */}
      <div className="space-y-4 sm:space-y-5">
        {/* Mobile */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <span className="flex items-center gap-2 font-semibold">
              <Smartphone size={15} className="text-rose-500 shrink-0" />
              <span>Điện thoại</span>
            </span>
            <div className="flex items-baseline gap-1.5 tabular-nums">
              <span className="font-black text-sm text-slate-900 dark:text-white">
                {mobilePct}%
              </span>
              <span className="text-xs font-medium text-slate-400">
                ({mobile})
              </span>
            </div>
          </div>
          <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-rose-500 to-pink-500 rounded-full transition-all duration-500"
              style={{ width: `${mobilePct}%` }}
            />
          </div>
        </div>

        {/* Desktop */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <span className="flex items-center gap-2 font-semibold">
              <Monitor size={15} className="text-indigo-500 shrink-0" />
              <span>Máy tính</span>
            </span>
            <div className="flex items-baseline gap-1.5 tabular-nums">
              <span className="font-black text-sm text-slate-900 dark:text-white">
                {desktopPct}%
              </span>
              <span className="text-xs font-medium text-slate-400">
                ({desktop})
              </span>
            </div>
          </div>
          <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-500"
              style={{ width: `${desktopPct}%` }}
            />
          </div>
        </div>

        {/* Tablet */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <span className="flex items-center gap-2 font-semibold">
              <Tablet size={15} className="text-amber-500 shrink-0" />
              <span>Máy tính bảng</span>
            </span>
            <div className="flex items-baseline gap-1.5 tabular-nums">
              <span className="font-black text-sm text-slate-900 dark:text-white">
                {tabletPct}%
              </span>
              <span className="text-xs font-medium text-slate-400">
                ({tablet})
              </span>
            </div>
          </div>
          <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-orange-400 rounded-full transition-all duration-500"
              style={{ width: `${tabletPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Top Browsers */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
            <Globe size={13} className="text-slate-400" />
            Top Trình duyệt
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {formattedBrowsers.map((b, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700/60 text-xs shadow-2xs hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors"
            >
              <span className="font-medium text-slate-700 dark:text-slate-200">
                {b.browserName}
              </span>
              <span className="font-black text-indigo-600 dark:text-indigo-400 tabular-nums">
                {b.pct}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
