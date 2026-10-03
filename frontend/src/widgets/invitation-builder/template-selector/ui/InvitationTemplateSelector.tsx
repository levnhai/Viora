"use client";

import { useState, useMemo } from "react";
import { Search, Sparkles, ArrowRight, Eye, Check } from "lucide-react";
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
          { label: "Studio Thiệp Cưới", href: "/admin/invitations" },
          { label: "Khởi tạo thiệp mới" },
        ]}
        title="Chọn phong cách thiệp cưới"
        description="Lựa chọn một tác phẩm nghệ thuật để bắt đầu tùy biến nội dung và xuất bản thiệp trực tuyến"
        badge={
          <span className="text-xs px-3 py-1 rounded-full font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center gap-1.5">
            <Sparkles size={12} />
            {templates.length} mẫu thiết kế
          </span>
        }
        actions={
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              placeholder="Tìm kiếm phong cách, tên mẫu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-100 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all shadow-2xs"
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
          <div className="flex items-center flex-wrap gap-3 p-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-2xs">
            {/* Step 1 */}
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 text-white flex items-center justify-center text-xs font-bold shadow-xs">
                1
              </div>
              <div>
                <p className="text-xs font-bold text-amber-600 dark:text-amber-400">
                  Bước 1: Chọn mẫu thiết kế
                </p>
                <p className="text-[10px] text-slate-400">Định hình phong cách thiệp</p>
              </div>
            </div>

            <ArrowRight size={14} className="text-slate-300 dark:text-slate-600 hidden sm:block mx-1" />

            {/* Step 2 */}
            <div className="flex items-center gap-2.5 opacity-60">
              <div className="w-7 h-7 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 flex items-center justify-center text-xs font-bold">
                2
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Bước 2: Studio Soạn thảo
                </p>
                <p className="text-[10px] text-slate-400">Dâu rể, album ảnh & QR mừng cưới</p>
              </div>
            </div>

            <ArrowRight size={14} className="text-slate-300 dark:text-slate-600 hidden sm:block mx-1" />

            {/* Step 3 */}
            <div className="flex items-center gap-2.5 opacity-60">
              <div className="w-7 h-7 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 flex items-center justify-center text-xs font-bold">
                3
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Bước 3: Xuất bản & Chia sẻ
                </p>
                <p className="text-[10px] text-slate-400">Lấy link và mã QR gửi khách</p>
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
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === tab
                ? "bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 text-white shadow-md shadow-rose-500/20"
                : "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Template Cards Grid */}
      <div>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md rounded-3xl border border-slate-200/80 dark:border-slate-800/80">
            <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mb-3" />
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Đang tải danh mục mẫu thiệp...
            </p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-rose-200 dark:border-rose-900/50 text-rose-500">
            <p className="font-bold text-sm mb-1">Đã xảy ra lỗi khi tải mẫu thiệp</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{error}</p>
          </div>
        ) : filteredTemplates.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md rounded-3xl border border-slate-200/80 dark:border-slate-800/80 text-slate-400">
            <Sparkles size={32} className="text-amber-500 mb-2" />
            <p className="text-xs font-semibold">Không tìm thấy mẫu phù hợp với từ khóa này.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {filteredTemplates.map((template) => (
              <div
                key={template._id}
                className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-3xl border border-slate-200/80 dark:border-slate-800/80 overflow-hidden shadow-xs hover:shadow-2xl hover:border-amber-500/40 dark:hover:border-amber-400/40 hover:-translate-y-1.5 transition-all duration-300 group flex flex-col"
              >
                {/* Thumbnail Cover */}
                <div className="relative aspect-[3/4] bg-slate-950 overflow-hidden">
                  <img
                    src={
                      template.thumbnail ||
                      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=400&auto=format&fit=crop"
                    }
                    alt={template.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                  {template.tags?.includes("Mới") && (
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 bg-rose-500 text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-md">
                      Mới
                    </span>
                  )}
                  {template.tags?.includes("VIP 3D") && (
                    <span className="absolute top-3 right-3 px-2.5 py-0.5 bg-gradient-to-r from-amber-500 to-rose-500 text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-md">
                      VIP 3D
                    </span>
                  )}

                  {/* Hover Quick Overlay Button */}
                  <div className="absolute inset-0 bg-slate-950/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                    <button
                      onClick={() => {
                        setActiveTemplate(template);
                        setIsTemplateModalOpen(true);
                      }}
                      className="px-4 py-2.5 rounded-xl bg-white text-slate-950 font-bold text-xs shadow-xl flex items-center gap-2 hover:scale-105 transition-transform cursor-pointer"
                    >
                      <Eye size={15} />
                      <span>Xem thử mẫu</span>
                    </button>
                  </div>
                </div>

                {/* Card Info */}
                <div className="p-4 flex flex-col flex-1 justify-between gap-3">
                  <div>
                    <h3 className="font-serif font-bold text-slate-900 dark:text-white text-base mb-1 truncate group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">
                      {template.name}
                    </h3>
                    <p className="text-[11px] text-slate-400 line-clamp-1">
                      {template.tags?.join(" • ") || "Thiệp cưới nghệ thuật"}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setActiveTemplate(template);
                      setIsTemplateModalOpen(true);
                    }}
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 hover:bg-gradient-to-r hover:from-amber-500 hover:via-rose-500 hover:to-indigo-600 hover:text-white text-slate-700 dark:text-slate-200 text-xs font-bold transition-all shadow-2xs text-center cursor-pointer active:scale-95"
                  >
                    Xem chi tiết & Chọn mẫu
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
