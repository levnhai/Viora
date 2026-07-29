import { Eye, Edit3, Copy, MoreVertical, ArrowUp, ArrowDown } from "lucide-react";
import Link from "next/link";

export function AdminInvitationsTable({
  invitations,
  total,
  page,
  limit,
  onPageChange
}: {
  invitations: any[];
  total: number;
  page: number;
  limit: number;
  onPageChange: (newPage: number) => void;
}) {
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'published':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-green-50 text-green-600"><span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>Đã xuất bản</span>;
      case 'draft':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-blue-50 text-blue-600"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>Bản nháp</span>;
      case 'hidden':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-orange-50 text-orange-500"><span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>Tạm ẩn</span>;
      default:
        return null;
    }
  };

  const getSourceBadge = (source?: string) => {
    switch (source) {
      case 'fb':
      case 'facebook':
        return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-50 text-blue-600 border border-blue-200">📘 Facebook</span>;
      case 'zalo':
        return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200">💬 Zalo</span>;
      case 'ins':
      case 'instagram':
        return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-pink-50 text-pink-600 border border-pink-200">📸 Instagram</span>;
      case 'tiktok':
        return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-900 text-white">🎵 TikTok</span>;
      case 'demo':
        return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-50 text-amber-600 border border-amber-200">🧪 Demo</span>;
      default:
        return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">🌐 Khác</span>;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-6">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/50 text-xs font-semibold text-slate-600 uppercase tracking-wider">
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
          <tbody className="divide-y divide-slate-100 text-sm">
            {invitations.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-6 py-10 text-center text-slate-500">
                  Không tìm thấy thiệp cưới nào.
                </td>
              </tr>
            ) : invitations.map((item) => {
              const d = new Date(item.weddingDate);
              const formattedDate = `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
              return (
              <tr key={item._id} className="hover:bg-slate-50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Link href={`/admin/invitations/${item.slug}`}>
                      <img src={item.templateId?.thumbnail || "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=100&q=80"} alt={item.templateId?.name || item.slug} className="w-10 h-14 object-cover rounded-md border border-slate-200 hover:opacity-80 transition-opacity" />
                    </Link>
                    <div>
                      <Link href={`/admin/invitations/${item.slug}`} className="font-semibold text-slate-800 hover:text-pink-600 transition-colors">
                        {item.templateId?.name || 'Giao diện tùy chỉnh'}
                      </Link>
                      <p className="text-xs text-slate-500">{item.slug}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-700 font-medium">
                  {item.groomName} & {item.brideName}
                </td>
                <td className="px-6 py-4">
                  {getSourceBadge(item.source)}
                </td>
                <td className="px-6 py-4">
                  <p className="text-slate-800 font-medium">{formattedDate}</p>
                  <p className="text-xs text-slate-500">{item.weddingTime || 'Cả ngày'}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="font-medium text-slate-800">{item.views}</p>
                  <p className={`text-xs flex items-center gap-1 text-slate-400`}>
                    -
                  </p>
                </td>
                <td className="px-6 py-4">
                  {getStatusBadge(item.status)}
                </td>
                <td className="px-6 py-4 text-slate-500 text-xs">
                  {new Date(item.updatedAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Xem trước">
                      <Eye size={16} />
                    </button>
                    <Link href={`/admin/invitations/${item.slug}`} className="p-1.5 flex items-center justify-center text-slate-400 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-colors" title="Chi tiết">
                      <Edit3 size={16} />
                    </Link>
                    <button className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors" title="Sao chép">
                      <Copy size={16} />
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            )})}
          </tbody>
        </table>
      </div>
      
      <div className="px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-slate-500">
          Hiển thị {(page - 1) * limit + 1} - {Math.min(page * limit, total)} trong tổng số {total} thiệp
        </p>
        <div className="flex items-center gap-2">
          <button 
            disabled={page === 1}
            onClick={() => onPageChange(page - 1)}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:opacity-50">
            &lt;
          </button>
          
          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-pink-500 bg-pink-50 text-pink-600 font-medium">
            {page}
          </button>
          
          <button 
            disabled={page * limit >= total}
            onClick={() => onPageChange(page + 1)}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50">
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
