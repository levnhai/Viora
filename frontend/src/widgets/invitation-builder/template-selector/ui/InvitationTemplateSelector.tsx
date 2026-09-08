"use client";

import { useState, useMemo } from "react";
import { Search, Sparkles, Check, ArrowRight, Eye } from "lucide-react";
import { useTemplates } from "@/entities/template/model/useTemplates";
import { useInvitationCreate } from "@/views/admin";
import { AdminPageHeader } from "@/widgets/admin";

export function InvitationTemplateSelector() {
  const { setActiveTemplate, setIsTemplateModalOpen } = useInvitationCreate();
  const [activeTab, setActiveTab] = useState("Tất cả");
  const [searchQuery, setSearchQuery] = useState("");
  const { templates, loading, error } = useTemplates();

  // Extract unique categories/tags dynamically from templates
  const categories = useMemo(() => {
    const tagSet = new Set<string>();
    templates.forEach((t) => {
      (t.tags || []).forEach((tag: string) => {
        if (tag && tag.trim()) tagSet.add(tag.trim());
      });
    });
    return ["Tất cả", ...Array.from(tagSet)];
  }, [templates]);

  const filteredTemplates = templates.filter((t) => {
    const matchTab =
      activeTab === "Tất cả" ||
      t.tags?.includes(activeTab) ||
      t.tags?.some((tag: string) => tag.toLowerCase() === activeTab.toLowerCase());
    const matchSearch = t.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchTab && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Page Header with Breadcrumbs */}
      <AdminPageHeader
        breadcrumbs={[
          { label: "Quản lý thiệp cưới", href: "/admin/invitations" },
          { label: "Tạo thiệp mới" },
        ]}
        title="Tạo thiệp mới"
        description="Chọn mẫu template thiết kế để bắt đầu khởi tạo thiệp cưới của bạn"
        actions={
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              placeholder="Tìm kiếm mẫu thiệp..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl text-xs font-medium text-slate-800 dark:text-slate-100 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-xs"
            />
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>
        }
      >
        {/* 3-Step Progress Stepper */}
        <div className="pt-2 pb-1">
          <div className="flex items-center flex-wrap gap-3 p-3 bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
            {/* Step 1 */}
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-xl bg-indigo-600 text-white flex items-center justify-center text-xs font-bold shadow-xs">
                1
              </div>
              <div>
                <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                  Bước 1: Chọn mẫu thiết kế
                </p>
                <p className="text-[10px] text-slate-400">Khởi tạo phong cách</p>
              </div>
            </div>

            <ArrowRight size={14} className="text-slate-400 hidden sm:block mx-1" />

            {/* Step 2 */}
            <div className="flex items-center gap-2.5 opacity-60">
              <div className="w-7 h-7 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 flex items-center justify-center text-xs font-bold">
                2
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Bước 2: Tùy biến nội dung
                </p>
                <p className="text-[10px] text-slate-400">Thông tin & album ảnh</p>
              </div>
            </div>

            <ArrowRight size={14} className="text-slate-400 hidden sm:block mx-1" />

            {/* Step 3 */}
            <div className="flex items-center gap-2.5 opacity-60">
              <div className="w-7 h-7 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 flex items-center justify-center text-xs font-bold">
                3
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Bước 3: Xem trước & Xuất bản
                </p>
                <p className="text-[10px] text-slate-400">Gửi lời mời trực tuyến</p>
              </div>
            </div>
          </div>
        </div>
      </AdminPageHeader>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs ${
              activeTab === tab
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/25"
                : "bg-white dark:bg-slate-900/90 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-800"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Template Cards Grid */}
      <div>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200/80 dark:border-slate-800/80">
            <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mb-3" />
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Đang tải danh sách mẫu thiệp...
            </p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-16 bg-white dark:bg-slate-900/90 rounded-2xl border border-rose-200 dark:border-rose-900/50 text-rose-500">
            <p className="font-bold text-sm mb-1">Đã xảy ra lỗi khi tải mẫu thiệp</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{error}</p>
          </div>
        ) : filteredTemplates.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 text-slate-400">
            <Sparkles size={32} className="text-slate-300 dark:text-slate-600 mb-2" />
            <p className="text-xs font-semibold">Không tìm thấy mẫu phù hợp với từ khóa này.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {filteredTemplates.map((template) => (
              <div
                key={template._id}
                className="bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 overflow-hidden shadow-xs hover:shadow-xl hover:border-indigo-400 dark:hover:border-indigo-600 hover:-translate-y-1 transition-all duration-300 group flex flex-col"
              >
                {/* Thumbnail Cover */}
                <div className="relative aspect-[3/4] bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <img
                    src={
                      template.thumbnail ||
                      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=400&auto=format&fit=crop"
                    }
                    alt={template.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {template.tags?.includes("Mới") && (
                    <span className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-rose-500 text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-md">
                      Mới
                    </span>
                  )}
                  {template.tags?.includes("VIP 3D") && (
                    <span className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-md">
                      VIP 3D
                    </span>
                  )}
                  {/* Hover Quick Overlay Button */}
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                    <button
                      onClick={() => {
                        setActiveTemplate(template);
                        setIsTemplateModalOpen(true);
                      }}
                      className="px-4 py-2 rounded-xl bg-white text-slate-900 font-bold text-xs shadow-lg flex items-center gap-1.5 hover:scale-105 transition-transform cursor-pointer"
                    >
                      <Eye size={14} />
                      <span>Xem trước</span>
                    </button>
                  </div>
                </div>

                {/* Card Info */}
                <div className="p-4 flex flex-col flex-1 justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm mb-1 truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {template.name}
                    </h3>
                    <p className="text-[11px] text-slate-400 line-clamp-1">
                      {template.tags?.join(" • ") || "Thiệp cưới sang trọng"}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setActiveTemplate(template);
                      setIsTemplateModalOpen(true);
                    }}
                    className="w-full py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-indigo-700 hover:text-white dark:hover:from-indigo-600 dark:hover:to-indigo-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all shadow-2xs text-center cursor-pointer active:scale-95"
                  >
                    Xem chi tiết & Áp dụng
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
