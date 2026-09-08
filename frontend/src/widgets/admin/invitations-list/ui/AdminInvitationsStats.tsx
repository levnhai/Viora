import { FileText, Send, Sparkles, EyeOff, TrendingUp } from "lucide-react";

export function AdminInvitationsStats({ statsData }: { statsData?: any }) {
  const stats = [
    {
      title: "Tổng thiệp",
      value: statsData?.total ?? 0,
      subtext: "Toàn hệ thống",
      icon: <FileText size={20} className="text-indigo-600 dark:text-indigo-400" />,
      bgIcon: "bg-indigo-500/10 border-indigo-500/20 text-indigo-600 dark:text-indigo-400",
      accent: "text-indigo-600 dark:text-indigo-400",
    },
    {
      title: "Đã xuất bản",
      value: statsData?.published ?? 0,
      subtext: "Đang hoạt động",
      icon: <Send size={20} className="text-emerald-600 dark:text-emerald-400" />,
      bgIcon: "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400",
      accent: "text-emerald-600 dark:text-emerald-400",
    },
    {
      title: "Bản nháp",
      value: statsData?.draft ?? 0,
      subtext: "Đang biên tập",
      icon: <Sparkles size={20} className="text-amber-600 dark:text-amber-400" />,
      bgIcon: "bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400",
      accent: "text-amber-600 dark:text-amber-400",
    },
    {
      title: "Tạm ẩn",
      value: statsData?.hidden ?? 0,
      subtext: "Đã lưu trữ / ẩn",
      icon: <EyeOff size={20} className="text-rose-500 dark:text-rose-400" />,
      bgIcon: "bg-rose-500/10 border-rose-500/20 text-rose-500 dark:text-rose-400",
      accent: "text-rose-500 dark:text-rose-400",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 mb-6">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="bg-white dark:bg-slate-900/90 backdrop-blur-xs p-4 sm:p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-xs hover:border-slate-300 dark:hover:border-slate-700/80 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between gap-3 mb-3">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              {stat.title}
            </span>
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center border shrink-0 transition-transform group-hover:scale-110 ${stat.bgIcon}`}>
              {stat.icon}
            </div>
          </div>
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {stat.value}
            </h3>
            <span className={`text-[11px] font-medium ${stat.accent} flex items-center gap-1`}>
              {stat.subtext}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
