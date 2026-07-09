import { TrendingUp, TrendingDown } from "lucide-react";

export function StatCard({ icon, iconBg, title, value, trend, trendUp }: any) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-3">
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${iconBg}`}
        >
          {icon}
        </div>
      </div>
      <div>
        <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
          {title}
        </p>
        <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
        {trend && (
          <div className="flex items-center gap-1 mt-2">
            {trendUp ? (
              <TrendingUp size={12} className="text-emerald-500" />
            ) : (
              <TrendingDown size={12} className="text-red-500" />
            )}
            <span
              className={`text-xs font-medium ${trendUp ? "text-emerald-600" : "text-red-600"}`}
            >
              {trend}
            </span>
            <span className="text-[10px] text-slate-400 ml-1">
              so với tháng trước
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
