import { Eye, Edit3, Copy, MoreVertical } from "lucide-react";
import Link from "next/link";

export function AdminInvitationsTable({
  invitations,
  total,
  page,
  limit,
  onPageChange,
}: {
  invitations: any[];
  total: number;
  page: number;
  limit: number;
  onPageChange: (newPage: number) => void;
}) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Đã xuất bản
          </span>
        );
      case "draft":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
            Bản nháp
          </span>
        );
      case "hidden":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            Tạm ẩn
          </span>
        );
      default:
        return null;
    }
  };

  const getSourceBadge = (source?: string) => {
    switch (source) {
      case "fb":
      case "facebook":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/60">
            📘 Facebook
          </span>
        );
      case "zalo":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60">
            💬 Zalo
          </span>
        );
      case "ins":
      case "instagram":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-pink-50 dark:bg-pink-950/60 text-pink-600 dark:text-pink-400 border border-pink-200 dark:border-pink-800/60">
            📸 Instagram
          </span>
        );
      case "tiktok":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-900 text-white border border-slate-700">
            🎵 TikTok
          </span>
        );
      case "demo":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800/60">
            🧪 Demo
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
            🌐 Khác
          </span>
        );
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden mb-6 transition-colors">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/50 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <th className="px-6 py-4">Thiệp cưới</th>
              <th className="px-6 py-4">Cô dâu & Chú rể</th>
              <th className="px-6 py-4">Nguồn</th>
              <th className="px-6 py-4">Ngày cưới</th>
              <th className="px-6 py-4">Lượt xem</th>
              <th className="px-6 py-4">Trạng thái</th>
              <th className="px-6 py-4">Cập nhật</th>
              <th className="px-6 py-4 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 text-xs">
            {invitations.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="px-6 py-12 text-center text-slate-400 font-medium"
                >
                  Không tìm thấy thiệp cưới nào.
                </td>
              </tr>
            ) : (
              invitations.map((item) => {
                const d = new Date(item.weddingDate);
                const formattedDate = !isNaN(d.getTime())
                  ? `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth() + 1).toString().padStart(2, "0")}/${d.getFullYear()}`
                  : "Chưa đặt";

                return (
                  <tr
                    key={item._id || item.id}
                    className="hover:bg-slate-50/70 dark:hover:bg-slate-800/50 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Link href={`/admin/invitations/${item.slug}`}>
                          <img
                            src={
                              item.templateId?.thumbnail ||
                              "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=100&q=80"
                            }
                            alt={item.templateId?.name || item.slug}
                            className="w-10 h-14 object-cover rounded-lg border border-slate-200 dark:border-slate-700 hover:opacity-80 transition-opacity shadow-2xs"
                          />
                        </Link>
                        <div>
                          <Link
                            href={`/admin/invitations/${item.slug}`}
                            className="font-bold text-slate-800 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                          >
                            {item.templateId?.name || "Giao diện tùy chỉnh"}
                          </Link>
                          <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                            /{item.slug}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-200 font-semibold">
                      {item.groomName} & {item.brideName}
                    </td>
                    <td className="px-6 py-4">{getSourceBadge(item.source)}</td>
                    <td className="px-6 py-4">
                      <p className="text-slate-800 dark:text-slate-100 font-semibold font-mono">
                        {formattedDate}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {item.weddingTime || "Cả ngày"}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold font-mono text-slate-800 dark:text-slate-100">
                        {(item.views || 0).toLocaleString()}
                      </p>
                    </td>
                    <td className="px-6 py-4">{getStatusBadge(item.status)}</td>
                    <td className="px-6 py-4 text-slate-400 font-mono text-[11px]">
                      {new Date(item.updatedAt || Date.now()).toLocaleDateString("vi-VN")}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-1.5">
                        <a
                          href={`/invitation/${item.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                          title="Xem online"
                        >
                          <Eye size={15} />
                        </a>
                        <Link
                          href={`/admin/invitations/${item.slug}`}
                          className="p-1.5 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                          title="Chỉnh sửa"
                        >
                          <Edit3 size={15} />
                        </Link>
                        <button
                          className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                          title="Sao chép"
                        >
                          <Copy size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Hiển thị {(page - 1) * limit + 1} - {Math.min(page * limit, total)} trong tổng số {total} thiệp
        </p>
        <div className="flex items-center gap-2">
          <button
            disabled={page === 1}
            onClick={() => onPageChange(page - 1)}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 text-xs font-semibold"
          >
            &lt;
          </button>

          <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-indigo-600 text-white font-bold text-xs shadow-xs">
            {page}
          </button>

          <button
            disabled={page * limit >= total}
            onClick={() => onPageChange(page + 1)}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 text-xs font-semibold"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
