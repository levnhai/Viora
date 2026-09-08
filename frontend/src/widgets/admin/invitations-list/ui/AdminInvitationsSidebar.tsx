import { Download, Trash2, Plus } from "lucide-react";
import Link from "next/link";

export function AdminInvitationsSidebar({
  topTemplatesData = [],
}: {
  topTemplatesData?: any[];
}) {
  const topTemplates =
    topTemplatesData.length > 0
      ? topTemplatesData
      : [
          {
            id: 1,
            name: "Chưa có dữ liệu",
            count: 0,
            percentage: 0,
            thumbnail:
              "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=100&q=80",
          },
        ];

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Top Templates Stats */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm transition-colors">
        <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm mb-1">
          Thống kê theo mẫu
        </h3>
        <p className="text-xs text-slate-400 mb-4">
          Top mẫu thiệp được sử dụng nhiều nhất
        </p>

        <div className="space-y-4">
          {topTemplates.map((item, idx) => (
            <div key={item._id || item.id || idx} className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-400 w-3">
                {idx + 1}
              </span>
              <img
                src={item.thumbnail}
                alt={item.name}
                className="w-8 h-10 object-cover rounded-lg shadow-2xs border border-slate-200 dark:border-slate-700"
              />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 truncate">
                    {item.name}
                  </span>
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300 font-mono ml-2">
                    {item.percentage}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-rose-500 to-indigo-500 rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <Link
          href="/admin/invitations/create"
          className="w-full mt-5 py-2 block text-center rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          Xem tất cả mẫu thiệp
        </Link>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm transition-colors">
        <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm mb-4">
          Thao tác nhanh
        </h3>
        <div className="space-y-2">
          <Link
            href="/admin/invitations/create"
            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-indigo-50/70 dark:hover:bg-indigo-950/40 border border-transparent hover:border-indigo-100 dark:hover:border-indigo-900/40 transition-all group text-left"
          >
            <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white flex items-center justify-center transition-colors shrink-0">
              <Plus size={16} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-700 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                Tạo thiệp mới
              </p>
              <p className="text-[11px] text-slate-400">
                Bắt đầu từ mẫu thiết kế có sẵn
              </p>
            </div>
          </Link>

          <button
            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-emerald-50/70 dark:hover:bg-emerald-950/40 border border-transparent hover:border-emerald-100 dark:hover:border-emerald-900/40 transition-all group text-left"
          >
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white flex items-center justify-center transition-colors shrink-0">
              <Download size={16} className="rotate-180" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-700 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                Import thiệp
              </p>
              <p className="text-[11px] text-slate-400">
                Nhập danh sách từ file dữ liệu
              </p>
            </div>
          </button>

          <button
            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-amber-50/70 dark:hover:bg-amber-950/40 border border-transparent hover:border-amber-100 dark:hover:border-amber-900/40 transition-all group text-left"
          >
            <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 group-hover:bg-amber-600 group-hover:text-white flex items-center justify-center transition-colors shrink-0">
              <Download size={16} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-700 dark:text-slate-200 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                Xuất dữ liệu
              </p>
              <p className="text-[11px] text-slate-400">
                Xuất file Excel / CSV danh sách
              </p>
            </div>
          </button>

          <button
            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-rose-50/70 dark:hover:bg-rose-950/40 border border-transparent hover:border-rose-100 dark:hover:border-rose-900/40 transition-all group text-left"
          >
            <div className="w-8 h-8 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 group-hover:bg-rose-600 group-hover:text-white flex items-center justify-center transition-colors shrink-0">
              <Trash2 size={16} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-700 dark:text-slate-200 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                Thùng rác
              </p>
              <p className="text-[11px] text-slate-400">
                Khôi phục thiệp đã xóa
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
