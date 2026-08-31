import { ArrowUpRight, Download, Trash2, Plus } from "lucide-react";

export function AdminInvitationsSidebar({ topTemplatesData = [] }: { topTemplatesData?: any[] }) {
  const topTemplates = topTemplatesData.length > 0 ? topTemplatesData : [
    {
      id: 1,
      name: "Chưa có dữ liệu",
      count: 0,
      percentage: 0,
      thumbnail: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=100&q=80",
    }
  ];

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Top Templates Stats */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="font-semibold text-slate-800 mb-1">Thống kê theo mẫu</h3>
        <p className="text-xs text-slate-500 mb-4">Top mẫu thiệp được sử dụng nhiều nhất</p>
        
        <div className="space-y-4">
          {topTemplates.map((item, idx) => (
            <div key={item._id || item.id} className="flex items-center gap-3">
              <span className="text-sm font-medium text-slate-400 w-3">{idx + 1}</span>
              <img src={item.thumbnail} alt={item.name} className="w-8 h-10 object-cover rounded shadow-sm border border-slate-100" />
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-semibold text-slate-700">{item.name}</span>
                  <span className="text-xs font-medium text-slate-500">{item.percentage}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-slate-400">{item.count} thiệp</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full mt-1.5 overflow-hidden">
                  <div 
                    className="h-full bg-pink-500 rounded-full" 
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <button className="w-full mt-5 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
          Xem tất cả thống kê
        </button>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="font-semibold text-slate-800 mb-4">Thao tác nhanh</h3>
        <div className="space-y-3">
          <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-indigo-50 border border-transparent hover:border-indigo-100 transition-colors group text-left">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors shrink-0">
              <Plus size={16} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-700 group-hover:text-indigo-700 transition-colors">Tạo thiệp mới</p>
              <p className="text-xs text-slate-500">Bắt đầu tạo thiệp từ template</p>
            </div>
          </button>

          <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-green-50 border border-transparent hover:border-green-100 transition-colors group text-left">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors shrink-0">
              <Download size={16} className="rotate-180" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-700 group-hover:text-green-700 transition-colors">Import thiệp</p>
              <p className="text-xs text-slate-500">Import thiệp từ file dữ liệu</p>
            </div>
          </button>

          <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-orange-50 border border-transparent hover:border-orange-100 transition-colors group text-left">
            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors shrink-0">
              <Download size={16} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-700 group-hover:text-orange-700 transition-colors">Xuất dữ liệu</p>
              <p className="text-xs text-slate-500">Xuất danh sách thiệp</p>
            </div>
          </button>

          <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 border border-transparent hover:border-red-100 transition-colors group text-left">
            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors shrink-0">
              <Trash2 size={16} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-700 group-hover:text-red-700 transition-colors">Thùng rác</p>
              <p className="text-xs text-slate-500">Xem thiệp đã xóa</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
