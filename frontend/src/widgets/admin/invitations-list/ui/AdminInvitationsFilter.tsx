"use client";

import { useState } from "react";
import { Search, Filter, Plus, Calendar, LayoutGrid, List, Sparkles, X } from "lucide-react";
import Link from "next/link";

interface AdminInvitationsFilterProps {
  onFilterChange?: (f: any) => void;
  currentFilter?: any;
  viewMode?: "grid" | "table";
  onViewModeChange?: (mode: "grid" | "table") => void;
}

export function AdminInvitationsFilter({
  onFilterChange,
  currentFilter,
  viewMode = "grid",
  onViewModeChange,
}: AdminInvitationsFilterProps) {
  const [search, setSearch] = useState(currentFilter?.search || "");
  const [status, setStatus] = useState(currentFilter?.status || "");
  const [source, setSource] = useState(currentFilter?.source || "");
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSearch = (e: any) => {
    if (e.key === "Enter") {
      onFilterChange?.({ search, status, source });
    }
  };

  const handleQuickStatus = (newStatus: string) => {
    setStatus(newStatus);
    onFilterChange?.({ search, status: newStatus, source });
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

  const statusTabs = [
    { id: "", label: "Tất cả" },
    { id: "published", label: "Đã xuất bản" },
    { id: "draft", label: "Bản nháp" },
    { id: "hidden", label: "Tạm ẩn" },
  ];

  return (
    <div className="flex flex-col gap-3 mb-6">
      {/* Quick Status Pills Bar */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-1.5 p-1 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-2xs">
          {statusTabs.map((tab) => {
            const isActive = status === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleQuickStatus(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 text-white shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800/80"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* View Mode Switcher */}
        {onViewModeChange && (
          <div className="flex items-center gap-1 p-1 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-2xs">
            <button
              onClick={() => onViewModeChange("grid")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                viewMode === "grid"
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              }`}
              title="Xem dạng Lưới thiệp"
            >
              <LayoutGrid size={14} />
              <span className="hidden sm:inline">Lưới thẻ</span>
            </button>
            <button
              onClick={() => onViewModeChange("table")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                viewMode === "table"
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              }`}
              title="Xem dạng Bảng dữ liệu"
            >
              <List size={14} />
              <span className="hidden sm:inline">Bảng chi tiết</span>
            </button>
          </div>
        )}
      </div>

      {/* Main Filter Toolbar */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
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
            placeholder="Tìm theo tên cô dâu, chú rể, đường dẫn slug (nhấn Enter)..."
            className="w-full pl-10 pr-9 py-2 bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 rounded-xl text-xs sm:text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-medium"
          />
          {search && (
            <button
              onClick={() => {
                setSearch("");
                onFilterChange?.({ search: "", status, source });
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 flex-wrap shrink-0">
          <select
            value={source}
            onChange={handleSourceChange}
            className="px-3.5 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 cursor-pointer shadow-2xs"
          >
            <option value="">Tất cả kênh nguồn</option>
            <option value="fb">📘 Facebook (FB)</option>
            <option value="zalo">💬 Zalo</option>
            <option value="ins">📸 Instagram</option>
            <option value="tiktok">🎵 TikTok</option>
            <option value="demo">🧪 Bản Demo</option>
            <option value="other">🌐 Khác</option>
          </select>

          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`flex items-center gap-1.5 px-3 py-2 border rounded-xl text-xs font-bold transition-all cursor-pointer shadow-2xs ${
              showAdvanced || source
                ? "bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400"
                : "bg-slate-50 dark:bg-slate-800/80 border-slate-200/80 dark:border-slate-700/80 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-750"
            }`}
          >
            <Filter size={14} />
            <span>Bộ lọc</span>
            {source && (
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            )}
          </button>

          <Link
            href="/admin/invitations/create"
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 hover:opacity-95 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-rose-500/20 whitespace-nowrap active:scale-95"
          >
            <Plus size={15} />
            <span>Tạo thiệp mới</span>
          </Link>
        </div>
      </div>

      {/* Advanced Filters Expandable Drawer */}
      {showAdvanced && (
        <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles size={13} className="text-amber-500" />
              Tùy chọn lọc mở rộng
            </h3>
            {(search || status || source) && (
              <button
                onClick={handleClear}
                className="text-xs text-amber-600 dark:text-amber-400 hover:underline cursor-pointer font-bold"
              >
                Đặt lại tất cả
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                Lọc theo trạng thái
              </label>
              <select
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                  onFilterChange?.({ search, status: e.target.value, source });
                }}
                className="px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 rounded-xl text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
              >
                <option value="">Tất cả trạng thái</option>
                <option value="published">Đã xuất bản (Public)</option>
                <option value="draft">Bản nháp (Draft)</option>
                <option value="hidden">Tạm ẩn (Hidden)</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                Kênh khách hàng
              </label>
              <select
                value={source}
                onChange={handleSourceChange}
                className="px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 rounded-xl text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
              >
                <option value="">Tất cả kênh</option>
                <option value="fb">Facebook</option>
                <option value="zalo">Zalo</option>
                <option value="ins">Instagram</option>
                <option value="tiktok">TikTok</option>
                <option value="demo">Demo</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => {
                  onFilterChange?.({ search, status, source });
                  setShowAdvanced(false);
                }}
                className="w-full py-2 bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-600 hover:to-rose-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs active:scale-95"
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
