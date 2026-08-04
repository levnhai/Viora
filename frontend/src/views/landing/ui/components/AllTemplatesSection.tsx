"use client";

import { useState, useEffect } from "react";
import { Search, Sparkles, RefreshCw } from "lucide-react";
import { TEMPLATES, getDemoSlugForTemplate } from "@/entities/template/model/templates";
import { TemplateConfig } from "@/entities/template/model/schema";
import { TemplateCard } from "@/entities/template/ui/TemplateCard";
import { PreviewModal } from "@/entities/template/ui/PreviewModal";
import { CreateInvitationModal } from "@/entities/template/ui/CreateInvitationModal";
import { fetchDemoInvitations } from "@/entities/invitation/api/invitation.api";
import { fetchTemplates } from "@/entities/template/api/template.api";
import { PackageComparisonSection } from "./PackageComparisonSection";

const TIER_TABS = [
  { id: "all", label: "Tất cả mẫu" },
  { id: "basic", label: "Cơ Bản" },
  { id: "standard", label: "Tiêu Chuẩn" },
  // { id: "pro", label: "Cao Cấp" },
];

export function AllTemplatesSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTier, setSelectedTier] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("default");
  const [previewTpl, setPreviewTpl] = useState<TemplateConfig | null>(null);
  const [requestTpl, setRequestTpl] = useState<TemplateConfig | null>(null);
  const [demos, setDemos] = useState<any[]>([]);
  const [dbTemplates, setDbTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Call API lấy danh sách Template từ Database MongoDB
    fetchTemplates()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setDbTemplates(data);
        }
      })
      .catch((err) => console.error("Lỗi tải danh sách template từ DB:", err))
      .finally(() => setLoading(false));

    // Call API lấy dữ liệu demo thiệp cưới từ DB
    fetchDemoInvitations()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setDemos(data);
        }
      })
      .catch((err) => console.error("Lỗi tải thiệp demo:", err));
  }, []);

  // Merge DB templates với local registry
  const allTemplates: TemplateConfig[] =
    dbTemplates.length > 0
      ? dbTemplates.map((dbTpl, idx) => {
          const matched =
            TEMPLATES.find((t) => t.code === dbTpl.code || t.id === dbTpl.id) ||
            TEMPLATES[idx % TEMPLATES.length];
          return {
            ...matched,
            ...dbTpl,
            id: dbTpl.id || matched.id,
            code: dbTpl.code || matched.code,
            name: dbTpl.name || matched.name,
            style: dbTpl.style || matched.style,
            tier: dbTpl.tier || matched.tier || "basic",
            price: dbTpl.price || matched.price || 99000,
            originalPrice:
              dbTpl.originalPrice || matched.originalPrice || 150000,
          };
        })
      : TEMPLATES;

  // Lọc mẫu thiệp theo tìm kiếm và Gói Dịch Vụ (Tier)
  const filteredTemplates = allTemplates.filter((tpl) => {
    const matchesSearch =
      searchQuery.trim() === "" ||
      tpl.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tpl.style.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (tpl.tags &&
        tpl.tags.some((t) =>
          t.toLowerCase().includes(searchQuery.toLowerCase()),
        ));

    const matchesTier = selectedTier === "all" || tpl.tier === selectedTier;

    return matchesSearch && matchesTier;
  });

  // Thuật toán sắp xếp đa tầng (Ghim 📌 -> HOT 🔥 -> MỚI 🆕 -> Tiêu chuẩn -> Giá)
  const displayedTemplates = [...filteredTemplates].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;

    // Sắp xếp mặc định thông minh:
    // 1. Mẫu Ghim (isPinned = true) luôn lên ĐẦU TIÊN
    if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
    if (a.isPinned && b.isPinned) return (a.pinOrder || 0) - (b.pinOrder || 0);

    // 2. Mẫu HOT (isHot = true)
    if (a.isHot !== b.isHot) return a.isHot ? -1 : 1;

    // 3. Mẫu MỚI (isNew = true)
    if (a.isNew !== b.isNew) return a.isNew ? -1 : 1;

    // 4. Mẫu Tiêu Chuẩn (standard) xếp trước Cơ Bản
    if (a.tier !== b.tier) {
      if (a.tier === "standard") return -1;
      if (b.tier === "standard") return 1;
    }

    return (a.sortOrder || a.id) - (b.sortOrder || b.id);
  });

  return (
    <section
      id="mau-thiep"
      className="py-12 sm:py-20 bg-[#121111] text-white min-h-screen relative overflow-hidden"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#ff007a]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Tất cả mẫu thiệp cưới
            <span className="text-[#ff007a] italic font-serif">
              online đẹp nhất
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Khám phá trọn bộ các mẫu thiệp cưới trực tuyến sang trọng, hiện đại.
            Chọn mẫu yêu thích và gửi đăng ký để chuyên viên hỗ trợ tạo thiệp
            ngay lập tức.
          </p>
        </div>

        {/* Filter & Search Toolbar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white/5 p-4 rounded-3xl border border-white/10 backdrop-blur-md">
          {/* Tier Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {TIER_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTier(tab.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap border ${
                  selectedTier === tab.id
                    ? "bg-[#ff007a] text-white border-[#ff007a] shadow-lg shadow-pink-600/30"
                    : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box & Sort Selector */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
            {/* Search Box */}
            <div className="relative w-full sm:w-60">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm mẫu thiệp..."
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white/10 border border-white/10 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#ff007a] focus:bg-white/15 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Template Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-3">
            <RefreshCw size={28} className="animate-spin text-[#ff007a]" />
            <p className="text-xs text-slate-400 font-medium">
              Đang tải danh sách mẫu thiệp cưới...
            </p>
          </div>
        ) : displayedTemplates.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10 space-y-3">
            <p className="text-base font-bold text-slate-300">
              Không tìm thấy mẫu thiệp phù hợp
            </p>
            <p className="text-xs text-slate-400">
              Vui lòng thử tìm kiếm bằng từ khóa khác hoặc bỏ lọc.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedTier("all");
              }}
              className="px-4 py-2 bg-[#ff007a] text-white text-xs font-bold rounded-xl border-0 cursor-pointer hover:bg-pink-600"
            >
              Xem tất cả mẫu
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayedTemplates.map((tpl) => {
              const demoSlug = getDemoSlugForTemplate(tpl, demos);
              const demoForTpl = demos.find((d) => d.slug === demoSlug);
              return (
                <TemplateCard
                  key={tpl.code || tpl.id}
                  tpl={tpl}
                  demoData={demoForTpl}
                  onPreviewDemo={(targetTpl) => setPreviewTpl(targetTpl)}
                  onUseTemplate={() => setRequestTpl(tpl)}
                />
              );
            })}
          </div>
        )}

        {/* Bảng so sánh tính năng & giá các gói dịch vụ (Cơ Bản, Tiêu Chuẩn, Cao Cấp) */}
        <PackageComparisonSection />
      </div>

      {/* Preview Modal */}
      {previewTpl && (
        <PreviewModal
          tpl={previewTpl}
          demoSlug={getDemoSlugForTemplate(previewTpl, demos)}
          onClose={() => setPreviewTpl(null)}
          onRequestDesign={() => {
            const current = previewTpl;
            setPreviewTpl(null);
            setRequestTpl(current);
          }}
          onSelectTemplate={(selected) => setPreviewTpl(selected)}
        />
      )}

      {/* Request Modal */}
      {requestTpl && (
        <CreateInvitationModal
          tpl={requestTpl}
          onClose={() => setRequestTpl(null)}
        />
      )}
    </section>
  );
}
