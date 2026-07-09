export function DeviceStat({ icon, name, percent, color }: any) {
  return (
    <div>
      <div className="flex justify-between items-center text-sm mb-1.5">
        <span className="text-slate-600 flex items-center gap-2 text-xs">
          {icon} {name}
        </span>
        <span className="font-semibold text-slate-800 text-xs">{percent}%</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="h-1.5 flex-1 bg-slate-100 rounded-full overflow-hidden">
          <div
            className={`h-full ${color} rounded-full`}
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
