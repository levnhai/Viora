"use client";

import { useState, useEffect } from "react";
import { Search, RefreshCw } from "lucide-react";
import {
  TEMPLATES,
  getDemoSlugForTemplate,
} from "@/entities/template/model/templates";
import { TemplateConfig } from "@/entities/template/model/schema";
import { TemplateCard } from "@/entities/template/ui/TemplateCard";
import { PreviewModal } from "@/entities/template/ui/PreviewModal";
import { CreateInvitationModal } from "@/entities/template/ui/CreateInvitationModal";
import { fetchDemoInvitations } from "@/entities/invitation/api/invitation.api";
import { PackageComparisonSection } from "./PackageComparisonSection";
import { CustomerReviewsSection } from "./CustomerReviewsSection";

const TIER_TABS = [
  { id: "all", label: "Tất cả mẫu" },
  { id: "standard", label: "Tiêu Chuẩn" },
  { id: "basic", label: "Cơ Bản" },
];

export function AllTemplatesSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTier, setSelectedTier] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("default");
  const [previewTpl, setPreviewTpl] = useState<TemplateConfig | null>(null);
  const [requestTpl, setRequestTpl] = useState<TemplateConfig | null>(null);
  const [demos, setDemos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDemoInvitations()
      .then((data) => {
        if (Array.isArray(data)) {
          setDemos(data);
        }
      })
      .catch((err) => console.error("Lỗi tải thiệp demo:", err))
      .finally(() => setLoading(false));
  }, []);

  const demoTemplates: TemplateConfig[] = [];
  const seenCodes = new Set<string>();

  for (const demo of demos) {
    const rawTpl = demo.templateId;
    const tplObj = typeof rawTpl === "object" && rawTpl !== null ? rawTpl : {};
    const code =
      tplObj.code ||
      demo.templateCode ||
      (typeof rawTpl === "string" ? rawTpl : "") ||
      "";

    if (!code || seenCodes.has(code)) continue;
    seenCodes.add(code);

    const matched =
      TEMPLATES.find((t) => t.code === code || String(t.id) === String(code)) ||
      TEMPLATES[0];

    demoTemplates.push({
      ...matched,
      id: tplObj.id || tplObj._id || matched.id,
      code: code || matched.code,
      name: tplObj.name || matched.name,
      price: tplObj.price ?? matched.price,
      preview: tplObj.thumbnail || matched.preview,
      previewVideo: tplObj.previewVideo || matched.previewVideo,
    });
  }

  const allTemplates: TemplateConfig[] = [...demoTemplates];
  for (const tpl of TEMPLATES) {
    if (!seenCodes.has(tpl.code) && !seenCodes.has(String(tpl.id))) {
      allTemplates.push(tpl);
    }
  }

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
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-br from-[#d4af37]/10 via-[#c5a880]/10 to-transparent rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3.5">
          <p className="text-[11px] sm:text-xs uppercase tracking-[0.3em] text-[#e0b769] font-medium font-sans">
            Bộ Sưu Tập Thiệp Cưới Trực Tuyến 2026
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal tracking-wide text-white leading-[1.25]">
            Tất Cả Mẫu Thiệp Cưới{" "}
            <span className="italic font-light text-[#e0b769]">
              Online Đẹp Nhất
            </span>
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-stone-300/90 max-w-xl mx-auto leading-relaxed font-light font-sans">
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
                className={`px-5 py-2.5 rounded-2xl text-xs tracking-wide transition-all cursor-pointer whitespace-nowrap border ${
                  selectedTier === tab.id
                    ? "bg-gradient-to-r from-[#d4af37] to-[#e0b769] text-stone-950 font-semibold border-[#e0b769] shadow-lg shadow-amber-900/20"
                    : "bg-white/5 text-stone-300 font-normal border-white/10 hover:bg-white/10 hover:text-white"
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
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm mẫu thiệp..."
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white/10 border border-white/10 text-xs text-white placeholder-stone-400 focus:outline-none focus:border-[#e0b769] focus:bg-white/15 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Template Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-3">
            <RefreshCw size={28} className="animate-spin text-[#e0b769]" />
            <p className="text-xs text-slate-400 font-medium">
              Đang tải danh sách mẫu thiệp cưới...
            </p>
          </div>
        ) : displayedTemplates.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10 space-y-3">
            <p className="text-base font-bold text-slate-300">
              {demoTemplates.length === 0
                ? "Không có mẫu nào"
                : "Không tìm thấy mẫu thiệp phù hợp"}
            </p>
            <p className="text-xs text-slate-400">
              {demoTemplates.length === 0
                ? "Hiện tại chưa có mẫu thiệp cưới nào được xuất bản trên hệ thống."
                : "Vui lòng thử tìm kiếm bằng từ khóa khác hoặc bỏ lọc."}
            </p>
            {demoTemplates.length > 0 && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedTier("all");
                }}
                className="px-4 py-2 bg-[#ff007a] text-white text-xs font-bold rounded-xl border-0 cursor-pointer hover:bg-pink-600"
              >
                Xem tất cả mẫu
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
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

        {/* giá */}
        <PackageComparisonSection />

        {/* Khách hàng nói gì về chúng tôi */}
        <CustomerReviewsSection />
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
