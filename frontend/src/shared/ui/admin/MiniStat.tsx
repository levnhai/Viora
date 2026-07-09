export function MiniStat({ icon, title, value, color, bg }: any) {
  return (
    <div className="flex flex-col gap-1.5 items-center justify-center text-center p-2 rounded-lg hover:bg-slate-50 transition-colors">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center ${bg} ${color} mb-1`}
      >
        {icon}
      </div>
      <span className="text-[9px] text-slate-500 uppercase font-semibold leading-tight">
        {title}
      </span>
      <p className="text-sm font-bold text-slate-800">{value}</p>
    </div>
  );
}
