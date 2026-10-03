"use client";

import { FileText, Send, Sparkles, EyeOff } from "lucide-react";

interface AdminInvitationsStatsProps {
  statsData?: any;
  activeStatus?: string;
  onSelectStatus?: (status: string) => void;
}

export function AdminInvitationsStats({
  statsData,
  activeStatus,
  onSelectStatus,
}: AdminInvitationsStatsProps) {
  const stats = [
    {
      id: "",
      title: "Tổng thiệp",
      value: statsData?.total ?? 0,
      subtext: "Toàn hệ thống",
      icon: <FileText size={20} className="text-amber-500" />,
      bgIcon: "bg-amber-500/10 border-amber-500/20 text-amber-500",
      accent: "text-amber-600 dark:text-amber-400",
      activeRing: "ring-2 ring-amber-500 border-amber-500",
    },
    {
      id: "published",
      title: "Đã xuất bản",
      value: statsData?.published ?? 0,
      subtext: "Đang hoạt động",
      icon: <Send size={20} className="text-emerald-500" />,
      bgIcon: "bg-emerald-500/10 border-emerald-500/20 text-emerald-500",
      accent: "text-emerald-600 dark:text-emerald-400",
      activeRing: "ring-2 ring-emerald-500 border-emerald-500",
    },
    {
      id: "draft",
      title: "Bản nháp",
      value: statsData?.draft ?? 0,
      subtext: "Đang biên tập",
      icon: <Sparkles size={20} className="text-rose-500" />,
      bgIcon: "bg-rose-500/10 border-rose-500/20 text-rose-500",
      accent: "text-rose-600 dark:text-rose-400",
      activeRing: "ring-2 ring-rose-500 border-rose-500",
    },
    {
      id: "hidden",
      title: "Tạm ẩn",
      value: statsData?.hidden ?? 0,
      subtext: "Đã lưu trữ / ẩn",
      icon: <EyeOff size={20} className="text-slate-400" />,
      bgIcon: "bg-slate-500/10 border-slate-500/20 text-slate-400",
      accent: "text-slate-500 dark:text-slate-400",
      activeRing: "ring-2 ring-slate-500 border-slate-500",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 mb-6">
      {stats.map((stat) => {
        const isSelected = activeStatus === stat.id;
        return (
          <button
            key={stat.id}
            type="button"
            onClick={() => onSelectStatus?.(isSelected ? "" : stat.id)}
            className={`text-left bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-4 sm:p-5 rounded-3xl border transition-all duration-200 group flex flex-col justify-between shadow-xs hover:shadow-md hover:-translate-y-0.5 cursor-pointer ${
              isSelected
                ? `${stat.activeRing} bg-slate-50 dark:bg-slate-800/90`
                : "border-slate-200/80 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700"
            }`}
          >
            <div className="flex items-center justify-between gap-3 mb-3 w-full">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                {stat.title}
              </span>
              <div
                className={`w-9 h-9 rounded-2xl flex items-center justify-center border shrink-0 transition-transform group-hover:scale-110 ${stat.bgIcon}`}
              >
                {stat.icon}
              </div>
            </div>
            <div className="flex items-baseline justify-between gap-2 w-full">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {stat.value}
              </h3>
              <span className={`text-[11px] font-semibold ${stat.accent}`}>
                {stat.subtext}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
