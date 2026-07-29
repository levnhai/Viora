import { useState } from "react";
import { Search, Filter, Plus, Calendar, Trash2 } from "lucide-react";

export function AdminInvitationsFilter({ onFilterChange, currentFilter }: { onFilterChange?: (f: any) => void, currentFilter?: any }) {
  const [search, setSearch] = useState(currentFilter?.search || "");
  const [status, setStatus] = useState(currentFilter?.status || "");
  const [source, setSource] = useState(currentFilter?.source || "");
  
  const handleSearch = (e: any) => {
    if (e.key === 'Enter') {
      onFilterChange?.({ search, status, source });
    }
  };

  const handleStatusChange = (e: any) => {
    setStatus(e.target.value);
    onFilterChange?.({ search, status: e.target.value, source });
  };

  const handleSourceChange = (e: any) => {
    setSource(e.target.value);
    onFilterChange?.({ search, status, source: e.target.value });
  };

  const handleClear = () => {
    setSearch("");
    setStatus("");
    setSource("");
    onFilterChange?.({ search: "", status: "", source: "" });
  };

  return (
    <div className="flex flex-col gap-4 mb-6">
      {/* Top Search & Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSearch}
            placeholder="Tìm kiếm thiệp, tên cô dâu chú rể..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all shadow-sm"
          />
        </div>
        
        <div className="flex items-center gap-3">
          <select 
            value={source}
            onChange={handleSourceChange}
            className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-pink-500/20 shadow-sm cursor-pointer min-w-[140px]">
            <option value="">Tất cả nguồn</option>
            <option value="fb">Facebook (FB)</option>
            <option value="zalo">Zalo</option>
            <option value="ins">Instagram (Ins)</option>
            <option value="tiktok">TikTok</option>
            <option value="demo">Bản Demo</option>
            <option value="other">Nguồn khác</option>
          </select>

          <select 
            value={status}
            onChange={handleStatusChange}
            className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-pink-500/20 shadow-sm cursor-pointer min-w-[150px]">
            <option value="">Tất cả trạng thái</option>
            <option value="published">Đã xuất bản</option>
            <option value="draft">Bản nháp</option>
            <option value="hidden">Tạm ẩn</option>
          </select>

          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm">
            <Filter size={16} />
            Bộ lọc
          </button>

          <button className="flex items-center gap-2 px-4 py-2 bg-pink-600 text-white rounded-lg text-sm font-medium hover:bg-pink-700 transition-colors shadow-sm shadow-pink-600/20 whitespace-nowrap">
            <Plus size={16} />
            Tạo thiệp mới
          </button>
        </div>
      </div>

      {/* Advanced Filters */}
      <div className="bg-white p-4 rounded-xl border border-pink-200 shadow-sm">
        <h3 className="text-sm font-semibold text-pink-600 mb-3">Bộ lọc nâng cao</h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-slate-600">Nguồn thiệp</label>
            <select 
              value={source}
              onChange={handleSourceChange}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-pink-500/20">
              <option value="">Tất cả nguồn</option>
              <option value="fb">Facebook (FB)</option>
              <option value="zalo">Zalo</option>
              <option value="ins">Instagram (Ins)</option>
              <option value="tiktok">TikTok</option>
              <option value="demo">Bản Demo</option>
              <option value="other">Nguồn khác</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-slate-600">Theo mẫu (Template)</label>
            <select className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-pink-500/20">
              <option value="">Chọn mẫu thiệp</option>
              <option value="hoa-moc">Hoa Mộc</option>
              <option value="classic">Classic White</option>
            </select>
          </div>
          
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-slate-600">Trạng thái</label>
            <select 
              value={status}
              onChange={handleStatusChange}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-pink-500/20">
              <option value="">Tất cả trạng thái</option>
              <option value="published">Đã xuất bản</option>
              <option value="draft">Bản nháp</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-slate-600">Khoảng thời gian</label>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Chọn thời gian" 
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-pink-500/20"
              />
              <Calendar size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
          </div>
        </div>
        
        <div className="flex justify-end mt-4">
          <button 
            onClick={handleClear}
            className="flex items-center gap-2 px-4 py-2 border border-slate-200 text-slate-600 hover:text-slate-800 hover:bg-slate-50 rounded-lg text-sm font-medium transition-colors">
            Xóa bộ lọc
          </button>
        </div>
      </div>
    </div>
  );
}
