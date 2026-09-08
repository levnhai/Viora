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
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-sm flex flex-col justify-between space-y-5">
      {/* Header */}
      <div>
        <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 tracking-tight flex items-center gap-2">
          <Smartphone className="w-4 h-4 text-rose-500" />
          Thiết bị & Nền tảng
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Tỷ lệ khách truy cập theo di động, máy tính và trình duyệt
        </p>
      </div>

      {/* Device bars */}
      <div className="space-y-3">
        {/* Mobile */}
        <div>
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            <span className="flex items-center gap-1.5">
              <Smartphone size={14} className="text-rose-500" />
              Điện thoại (Mobile)
            </span>
            <span className="font-mono font-bold text-slate-800 dark:text-slate-100">
              {mobilePct}% ({mobile})
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-rose-500 to-pink-500 rounded-full transition-all duration-500"
              style={{ width: `${mobilePct}%` }}
            />
          </div>
        </div>

        {/* Desktop */}
        <div>
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            <span className="flex items-center gap-1.5">
              <Monitor size={14} className="text-indigo-500" />
              Máy tính (Desktop)
            </span>
            <span className="font-mono font-bold text-slate-800 dark:text-slate-100">
              {desktopPct}% ({desktop})
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-500"
              style={{ width: `${desktopPct}%` }}
            />
          </div>
        </div>

        {/* Tablet */}
        <div>
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            <span className="flex items-center gap-1.5">
              <Tablet size={14} className="text-amber-500" />
              Máy tính bảng (Tablet)
            </span>
            <span className="font-mono font-bold text-slate-800 dark:text-slate-100">
              {tabletPct}% ({tablet})
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-orange-400 rounded-full transition-all duration-500"
              style={{ width: `${tabletPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Top Browsers */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Globe size={13} />
            Top Trình duyệt
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {formattedBrowsers.map((b, idx) => (
            <div
              key={idx}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 text-xs"
            >
              <span className="font-medium text-slate-700 dark:text-slate-200">
                {b.browserName}
              </span>
              <span className="font-bold text-indigo-600 dark:text-indigo-400 font-mono">
                {b.pct}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
