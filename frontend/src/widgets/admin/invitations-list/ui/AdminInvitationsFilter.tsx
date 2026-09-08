"use client";

import { useState } from "react";
import { Search, Filter, Plus, Calendar } from "lucide-react";
import Link from "next/link";

export function AdminInvitationsFilter({
  onFilterChange,
  currentFilter,
}: {
  onFilterChange?: (f: any) => void;
  currentFilter?: any;
}) {
  const [search, setSearch] = useState(currentFilter?.search || "");
  const [status, setStatus] = useState(currentFilter?.status || "");
  const [source, setSource] = useState(currentFilter?.source || "");
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSearch = (e: any) => {
    if (e.key === "Enter") {
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
    <div className="flex flex-col gap-3 mb-6">
      {/* Main Filter Toolbar */}
      <div className="bg-white dark:bg-slate-900/90 backdrop-blur-xs p-2.5 sm:p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[240px]">
          <Search
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            size={16}
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSearch}
            placeholder="Tìm kiếm thiệp cưới, tên cô dâu chú rể..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 rounded-xl text-xs sm:text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 flex-wrap shrink-0">
          <select
            value={source}
            onChange={handleSourceChange}
            className="px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer shadow-xs"
          >
            <option value="">Tất cả nguồn</option>
            <option value="fb">Facebook (FB)</option>
            <option value="zalo">Zalo</option>
            <option value="ins">Instagram</option>
            <option value="tiktok">TikTok</option>
            <option value="demo">Bản Demo</option>
            <option value="other">Khác</option>
          </select>

          <select
            value={status}
            onChange={handleStatusChange}
            className="px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer shadow-xs"
          >
            <option value="">Tất cả trạng thái</option>
            <option value="published">Đã xuất bản</option>
            <option value="draft">Bản nháp</option>
            <option value="hidden">Tạm ẩn</option>
          </select>

          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`flex items-center gap-1.5 px-3 py-2 border rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-xs ${
              showAdvanced || status || source
                ? "bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400"
                : "bg-slate-50 dark:bg-slate-800 border-slate-200/80 dark:border-slate-700/80 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
            }`}
          >
            <Filter size={14} />
            <span>Bộ lọc</span>
            {(status || source) && (
              <span className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400" />
            )}
          </button>

          <Link
            href="/admin/invitations/create"
            className="flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-600/25 whitespace-nowrap active:scale-95"
          >
            <Plus size={15} />
            <span>Tạo thiệp mới</span>
          </Link>
        </div>
      </div>

      {/* Advanced Filters Expandable Drawer */}
      {showAdvanced && (
        <div className="bg-white dark:bg-slate-900/90 backdrop-blur-xs p-4 sm:p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-xs animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              Bộ lọc nâng cao
            </h3>
            {(search || status || source) && (
              <button
                onClick={handleClear}
                className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer font-medium"
              >
                Đặt lại tất cả
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                Theo mẫu (Template)
              </label>
              <select className="px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 rounded-xl text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20">
                <option value="">Tất cả mẫu thiệp</option>
                <option value="hoa-moc">Hoa Mộc</option>
                <option value="classic">Classic White</option>
                <option value="royal">The Royal</option>
                <option value="golden">The Golden</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                Khoảng thời gian
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Chọn thời gian tạo"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 rounded-xl text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
                <Calendar
                  size={14}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => {
                  onFilterChange?.({ search, status, source });
                  setShowAdvanced(false);
                }}
                className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs"
              >
                Áp dụng bộ lọc
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
