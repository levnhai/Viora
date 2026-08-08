"use client";

import { useState, useEffect } from "react";
import { Search, SlidersHorizontal, ArrowRight, X, ChevronDown, Check, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { Header } from "@/widgets/header/ui/Header";
import { TemplateCard } from "@/entities/template/ui/TemplateCard";
import { PreviewModal } from "@/entities/template/ui/PreviewModal";
import { TEMPLATES, getDemoSlugForTemplate } from "@/entities/template/model/templates";
import { TemplateConfig } from "@/entities/template/model/schema";
import { fetchDemoInvitations } from "@/entities/invitation/api/invitation.api";
import { fetchTemplates } from "@/entities/template/api/template.api";
import tempBanner from "@/shared/assets/image/banner/temp_banner.png";



const COLORS = [
  { id: "pink", value: "#f472b6", label: "Hồng" },
  { id: "orange", value: "#fb923c", label: "Cam" },
  { id: "gold", value: "#fcd34d", label: "Vàng" },
  { id: "green", value: "#86efac", label: "Xanh lá" },
  { id: "blue", value: "#60a5fa", label: "Xanh dương" },
  { id: "purple", value: "#c084fc", label: "Tím" }
];

const PRICE_RANGES = [
  { id: "free", label: "Miễn phí" },
  { id: "under-200", label: "Dưới 200.000đ" },
  { id: "200-400", label: "200.000đ - 400.000đ" },
  { id: "400-600", label: "400.000đ - 600.000đ" },
  { id: "above-600", label: "Trên 600.000đ" }
];

const STYLES = [
  { id: "Luxury", label: "Luxury" },
  { id: "Minimal", label: "Minimal" },
  { id: "Classic", label: "Classic" },
  { id: "Romantic", label: "Romantic" },
  { id: "Floral", label: "Floral" },
  { id: "Modern", label: "Modern" },
  { id: "Korean Style", label: "Korean Style" },
  { id: "Vintage", label: "Vintage" }
];

const FEATURES = [
  { id: "music", label: "Có nhạc nền" },
  { id: "video", label: "Hiệu ứng động" },
  { id: "gallery", label: "Album ảnh" },
  { id: "rsvp", label: "RSVP online" },
  { id: "timeline", label: "Đếm ngược" },
  { id: "maps", label: "Bản đồ chỉ đường" }
];

export function TemplatesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả mẫu thiệp");
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRanges, setPriceRanges] = useState<string[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("newest");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [previewTpl, setPreviewTpl] = useState<TemplateConfig | null>(null);
  const [visibleCount, setVisibleCount] = useState(12);
  const [demos, setDemos] = useState<any[]>([]);
  const [dbTemplates, setDbTemplates] = useState<any[]>([]);

  useEffect(() => {
    // Call API lấy danh sách Template trực tiếp từ Database MongoDB (/api/templates)
    fetchTemplates()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setDbTemplates(data);
        }
      })
      .catch((err) => console.error("Lỗi khi gọi API database templates:", err));

    // Call API lấy danh sách thiệp demo thực từ Database (/api/weddings/public/demos)
    fetchDemoInvitations()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setDemos(data);
        }
      })
      .catch((err) => {
        console.error("Lỗi khi kết nối API thiệp mẫu:", err);
      });
  }, []);

  const templatesToUse = dbTemplates.length > 0
    ? dbTemplates.map((dbTpl, idx) => {
        const match = TEMPLATES.find((t) => t.code === dbTpl.code || t.id === dbTpl.id) || TEMPLATES[idx % TEMPLATES.length];
        return {
          ...match,
          id: dbTpl.id || match.id,
          code: dbTpl.code || match.code,
          name: dbTpl.name || match.name,
          price: dbTpl.price ?? match.price,
          style: dbTpl.category || match.style,
        };
      })
    : TEMPLATES;

  const navigate = (path: string) => router.push(path);

  const handleStartCreating = (tplId: string = "temp_1") => {
    const found =
      templatesToUse.find(
        (t: any) => t.code === tplId || t.id.toString() === tplId,
      ) || templatesToUse[0];
    setPreviewTpl(found);
  };

  const toggleColor = (colorId: string) => {
    setSelectedColors(prev =>
      prev.includes(colorId) ? prev.filter(c => c !== colorId) : [...prev, colorId]
    );
  };

  const togglePriceRange = (rangeId: string) => {
    setPriceRanges(prev =>
      prev.includes(rangeId) ? prev.filter(r => r !== rangeId) : [...prev, rangeId]
    );
  };

  const toggleStyle = (styleId: string) => {
    setSelectedStyles(prev =>
      prev.includes(styleId) ? prev.filter(s => s !== styleId) : [...prev, styleId]
    );
  };

  const toggleFeature = (featId: string) => {
    setSelectedFeatures(prev =>
      prev.includes(featId) ? prev.filter(f => f !== featId) : [...prev, featId]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("Tất cả mẫu thiệp");
    setSelectedColors([]);
    setPriceRanges([]);
    setSelectedStyles([]);
    setSelectedFeatures([]);
  };

  // Logic lọc và tìm kiếm mẫu thiệp lấy trực tiếp từ Database
  const filteredTemplates = templatesToUse.filter((tpl) => {
    // 1. Tìm kiếm bằng tên hoặc phong cách
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchName = tpl.name.toLowerCase().includes(q);
      const matchStyle = tpl.style.toLowerCase().includes(q);
      if (!matchName && !matchStyle) return false;
    }

    // 2. Lọc theo Danh mục chính
    if (selectedCategory !== "Tất cả mẫu thiệp") {
      if (selectedCategory === "Thiệp hiện đại" && tpl.style !== "Hiện đại") return false;
      if (selectedCategory === "Thiệp sang trọng" && tpl.style !== "Sang trọng") return false;
      if (selectedCategory === "Thiệp cổ điển" && tpl.style !== "Cổ điển") return false;
      if (selectedCategory === "Thiệp tối giản" && tpl.style !== "Tinh giản") return false;
      if (selectedCategory === "Thiệp hoa lá" && !(tpl.style === "Lãng mạn" || tpl.style === "Thơ mộng")) return false;
      if (selectedCategory === "Thiệp phong cách Hàn Quốc" && !(tpl.style === "Tinh giản" || tpl.style === "Lãng mạn")) return false;
    }

    // 3. Lọc theo mảng màu (selectedColors)
    if (selectedColors.length > 0) {
      const matchColor = selectedColors.some((colorId) => {
        if (colorId === "pink" && (tpl.accentColor === "#db2777" || tpl.themeClass === "theme-pink")) return true;
        if (colorId === "orange" && (tpl.accentColor === "#fb923c" || tpl.accentColor === "#c6925c")) return true;
        if (colorId === "gold" && (tpl.accentColor === "#c6925c" || tpl.accentColor === "#fcd34d")) return true;
        if (colorId === "green" && (tpl.accentColor === "#2d5a27" || tpl.themeClass === "theme-green")) return true;
        if (colorId === "blue" && (tpl.accentColor === "#1e293b" || tpl.themeClass === "theme-navy" || tpl.accentColor === "#60a5fa")) return true;
        if (colorId === "purple" && (tpl.accentColor === "#ac81bd" || tpl.accentColor === "#7c4d90" || tpl.themeClass === "theme-purple")) return true;
        return false;
      });
      if (!matchColor) return false;
    }

    // 4. Lọc theo Khoảng giá (priceRanges)
    if (priceRanges.length > 0) {
      const matchPrice = priceRanges.some((range) => {
        if (range === "free" && tpl.price === 0) return true;
        if (range === "under-200" && tpl.price > 0 && tpl.price < 200000) return true;
        if (range === "200-400" && tpl.price >= 200000 && tpl.price <= 400000) return true;
        if (range === "400-600" && tpl.price >= 400000 && tpl.price <= 600000) return true;
        if (range === "above-600" && tpl.price > 600000) return true;
        return false;
      });
      if (!matchPrice) return false;
    }

    // 5. Lọc theo Phong cách checkbox (selectedStyles)
    if (selectedStyles.length > 0) {
      const matchStyle = selectedStyles.some((styleId) => {
        if (styleId === "Luxury" && tpl.style === "Sang trọng") return true;
        if (styleId === "Minimal" && tpl.style === "Tinh giản") return true;
        if (styleId === "Classic" && tpl.style === "Cổ điển") return true;
        if (styleId === "Romantic" && (tpl.style === "Lãng mạn" || tpl.style === "Thơ mộng")) return true;
        if (styleId === "Floral" && tpl.style === "Lãng mạn") return true;
        if (styleId === "Modern" && tpl.style === "Hiện đại") return true;
        if (styleId === "Korean Style" && tpl.style === "Tinh giản") return true;
        if (styleId === "Vintage" && tpl.style === "Cổ điển") return true;
        return false;
      });
      if (!matchStyle) return false;
    }

    // 6. Lọc theo tính năng đặc trưng (selectedFeatures)
    if (selectedFeatures.length > 0) {
      const matchFeatures = selectedFeatures.every((featId) => {
        if (featId === "music") return true;
        if (featId === "video") return tpl.schema.cover.hasBackgroundVideo;
        if (featId === "gallery") return tpl.schema.gallery.maxImages > 0;
        if (featId === "rsvp") return true;
        if (featId === "timeline") return tpl.schema.timeline.enabled;
        if (featId === "maps") return true;
        return false;
      });
      if (!matchFeatures) return false;
    }

    return true;
  });

  // Sắp xếp
  const sortedTemplates = [...filteredTemplates].sort((a, b) => {
    if (sortBy === "price-asc") {
      return a.price - b.price;
    }
    if (sortBy === "price-desc") {
      return b.price - a.price;
    }
    if (sortBy === "popular") {
      return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
    }
    // Mới nhất (mặc định)
    return b.id - a.id;
  });

  // Phân trang đơn giản (Xem thêm)
  const visibleTemplates = sortedTemplates.slice(0, visibleCount);
  const hasMore = sortedTemplates.length > visibleCount;

  const FilterSidebarContent = () => (
    <div className="space-y-8 text-left">
      {/* Danh mục */}
      <div>
        <h3 className="text-[13px] font-bold uppercase tracking-wider text-[#2c1810] mb-4 font-sans">Danh mục</h3>
        <div className="space-y-2.5">
          {[
            { name: "Tất cả mẫu thiệp", count: 1024 },
            { name: "Thiệp hiện đại", count: 324 },
            { name: "Thiệp sang trọng", count: 286 },
            { name: "Thiệp cổ điển", count: 168 },
            { name: "Thiệp tối giản", count: 156 },
            { name: "Thiệp hoa lá", count: 234 },
            { name: "Thiệp phong cách Hàn Quốc", count: 198 },
            { name: "Thiệp theo chủ đề", count: 98 }
          ].map((cat) => {
            const isSelected = selectedCategory === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`w-full text-left text-xs py-1 cursor-pointer border-0 bg-transparent flex items-center justify-between font-sans transition-colors ${
                  isSelected ? "text-[#db2777] font-semibold" : "text-[#7a5c4f]/80 hover:text-[#db2777]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => {}} // Tránh warning của React
                    className="w-3.5 h-3.5 accent-[#db2777] rounded border-gray-300 cursor-pointer pointer-events-none"
                  />
                  <span>{cat.name}</span>
                </div>
                <span className={`text-[11px] ${isSelected ? "text-[#db2777] font-semibold" : "text-[#7a5c4f]/60"}`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <hr className="border-t border-[#e2d8cf]/30" />

      {/* Màu sắc */}
      <div>
        <h3 className="text-[13px] font-bold uppercase tracking-wider text-[#2c1810] mb-4 font-sans">Màu sắc</h3>
        <div className="flex flex-wrap gap-3">
          {COLORS.map((c) => {
            const isSelected = selectedColors.includes(c.id);
            return (
              <button
                key={c.id}
                onClick={() => toggleColor(c.id)}
                title={c.label}
                className={`w-6 h-6 rounded-full cursor-pointer relative border border-black/5 transition-all hover:scale-110 active:scale-95 ${
                  isSelected ? "ring-2 ring-[#db2777] ring-offset-2 scale-110" : ""
                }`}
                style={{
                  backgroundColor: c.value
                }}
              />
            );
          })}
          {/* Nút mảng màu đa sắc */}
          <button
            onClick={() => setSelectedColors([])}
            title="Tất cả màu"
            className={`w-6 h-6 rounded-full cursor-pointer relative border border-gray-200 flex items-center justify-center transition-all hover:scale-110 active:scale-95 ${
              selectedColors.length === 0 ? "ring-2 ring-[#db2777] ring-offset-2 scale-110" : ""
            }`}
            style={{
              background: "linear-gradient(135deg, #f43f5e, #3b82f6, #10b981, #eab308)"
            }}
          />
        </div>
      </div>

      {/* Nút xóa bộ lọc */}
      {(selectedCategory !== "Tất cả mẫu thiệp" || selectedColors.length > 0 || searchQuery !== "") && (
        <button
          onClick={clearFilters}
          className="w-full flex items-center justify-center gap-2 border border-[#e2d8cf] hover:border-[#db2777]/30 hover:bg-[#db2777]/5 text-xs text-[#7a5c4f] hover:text-[#db2777] font-semibold py-2.5 rounded-lg cursor-pointer transition-all active:scale-95 mt-4"
        >
          <RefreshCw size={12} />
          Xóa bộ lọc
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fffdfb] text-[#2c1810]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Header onOpenRequest={() => handleStartCreating("temp_1")} />

      {/* Search & Hero Banner */}
      <section 
        className="relative overflow-hidden pt-14 pb-20 bg-cover bg-center bg-no-repeat border-b border-[#e2d8cf]/20"
        style={{ backgroundImage: `url(${tempBanner.src})` }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 md:gap-12">
            {/* Cột trái: Tiêu đề */}
            <div className="space-y-3.5 text-left max-w-xl">
              <h1 className="text-3xl md:text-5xl font-bold text-[#2c1810] tracking-tight leading-tight" style={{ fontFamily: "'EB Garamond', serif" }}>
                Kho mẫu thiệp cưới <br />
                <span className="text-[#db2777]">đa dạng &amp; ấn tượng</span>
              </h1>
              <p className="text-xs md:text-sm text-[#7a5c4f]/80 font-normal leading-relaxed max-w-lg">
                Hơn 1000+ mẫu thiệp cưới được thiết kế bởi các nhà thiết kế chuyên nghiệp.
              </p>
            </div>

            {/* Cột phải: Ô tìm kiếm */}
            <div className="w-full md:w-[320px] lg:w-[380px] relative text-left">
              <div className="relative group">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm kiếm mẫu thiệp..."
                  className="w-full pl-5 pr-14 py-3 rounded-lg border border-[#e2d8cf] focus:border-[#db2777]/50 bg-white text-[#2c1810] text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#db2777]/10 font-sans"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg flex items-center justify-center text-[#db2777] border border-[#e2d8cf]/50 hover:bg-pink-50/50 cursor-pointer transition-all active:scale-95">
                  <Search size={15} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Bar */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-8 relative z-20">
        <div className="bg-white border border-[#e2d8cf]/40 rounded-2xl md:rounded-3xl p-5 md:p-6 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 shadow-sm text-left">
          {[
            { 
              icon: (
                <svg className="w-4 h-4 text-[#db2777]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              ), 
              title: "1000+", 
              desc: "Mẫu thiệp đẹp" 
            },
            { 
              icon: (
                <svg className="w-4 h-4 text-[#db2777]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>
              ), 
              title: "Cập nhật", 
              desc: "Hàng tuần" 
            },
            { 
              icon: (
                <svg className="w-4 h-4 text-[#db2777]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
              ), 
              title: "Dễ dàng", 
              desc: "Tùy chỉnh" 
            },
            { 
              icon: (
                <svg className="w-4 h-4 text-[#db2777]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                  <line x1="12" y1="18" x2="12.01" y2="18" />
                </svg>
              ), 
              title: "Tối ưu", 
              desc: "Trên mọi thiết bị" 
            }
          ].map((item, idx) => (
            <div key={idx} className={`flex items-center gap-3.5 ${idx > 0 ? 'md:border-l md:border-[#e2d8cf]/40 md:pl-6' : ''}`}>
              <span className="w-9 h-9 rounded-full bg-pink-50 flex items-center justify-center flex-shrink-0">
                {item.icon}
              </span>
              <div>
                <h4 className="text-sm font-bold text-[#2c1810] leading-none">{item.title}</h4>
                <p className="text-[11px] text-[#7a5c4f]/80 mt-1 leading-none font-sans font-medium">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <section className="py-16 bg-[#fffdfb]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="w-full">
            {/* List mẫu thiệp */}
            <div className="w-full">
              <div className="flex items-center justify-center gap-4 mb-8 text-center">
                <h2 className="text-base sm:text-lg font-bold text-[#2c1810] font-sans">
                  Tất cả mẫu thiệp
                  <span className="text-xs font-normal text-[#7a5c4f]/60 ml-2 font-sans">
                    ({sortedTemplates.length} mẫu thiệp)
                  </span>
                </h2>
              </div>

              {/* Grid container tất cả các mẫu thiệp (2 cột trên Mobile, 4 cột trên Desktop) */}
              {sortedTemplates.length > 0 ? (
                <div>
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 mx-auto w-full">
                    {visibleTemplates.map((tpl, idx) => (
                      <TemplateCard
                        key={tpl.id}
                        tpl={tpl}
                        demoData={demos.find((d) => d.templateId === tpl.code) || demos[idx % (demos.length || 1)]}
                        onPreviewDemo={() => setPreviewTpl(tpl)}
                        onUseTemplate={handleStartCreating}
                      />
                    ))}
                  </div>

                  {/* Nút Xem thêm */}
                  {hasMore && (
                    <div className="mt-12 text-center">
                      <button
                        onClick={() => setVisibleCount((prev) => prev + 12)}
                        className="bg-white hover:bg-pink-50/50 text-[#db2777] border border-[#db2777]/25 px-8 py-3 rounded-full font-semibold text-xs transition-all active:scale-95 shadow-sm inline-flex items-center gap-2 cursor-pointer"
                      >
                        Xem thêm mẫu thiệp <ChevronDown size={14} />
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-20 bg-[#fdf6ef]/30 rounded-3xl border border-dashed border-[#e2d8cf] space-y-4">
                  <span className="text-4xl">🌸</span>
                  <div className="space-y-1">
                    <h3 className="text-sm font-semibold text-[#2c1810]">Không tìm thấy mẫu thiệp nào phù hợp</h3>
                    <p className="text-xs text-[#7a5c4f]/70 font-light">Thử thay đổi bộ lọc hoặc xóa bộ lọc để xem lại toàn bộ mẫu thiệp.</p>
                  </div>
                  <button
                    onClick={clearFilters}
                    className="bg-[#db2777] hover:bg-[#c2185b] text-white px-5 py-2.5 rounded-full text-xs font-semibold transition-all active:scale-95 cursor-pointer border-0"
                  >
                    Xóa tất cả bộ lọc
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Banner CTA ở chân trang */}
      <section className="py-20 bg-[#fdf6ef]/60 border-t border-[#e2d8cf]/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-3xl bg-pink-50/40 border border-[#e2d8cf]/40 shadow-sm flex flex-col md:flex-row items-center justify-between p-8 md:p-14 text-left">
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 50%, white 0%, transparent 60%), radial-gradient(circle at 80% 20%, white 0%, transparent 50%)"
              }}
            />

            <div className="space-y-6 max-w-xl z-10">
              <h2
                className="text-3xl sm:text-4xl text-[#2c1810] font-bold leading-tight flex flex-col items-start gap-y-1"
                style={{ fontFamily: "'EB Garamond', serif" }}
              >
                <span>Không tìm thấy mẫu yêu thích?</span>
                <span className="text-[#db2777] font-normal text-3xl sm:text-4xl" style={{ fontFamily: "'Great Vibes', cursive" }}>
                  Thiết kế thiệp cưới riêng theo phong cách của bạn.
                </span>
              </h2>
              <p className="text-sm text-[#7a5c4f]/80 leading-relaxed font-light">
                Hãy liên hệ với chúng tôi để thiết kế mẫu thiệp cưới trực tuyến mang đậm dấu ấn cá nhân của riêng hai bạn. Hoàn thành nhanh chóng trong 24 giờ.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => handleStartCreating("temp_1")}
                  className="bg-white hover:bg-pink-50 text-[#db2777] border border-[#db2777]/20 px-8 py-3.5 rounded-full font-semibold text-xs shadow-md transition-all inline-flex items-center gap-2 cursor-pointer"
                >
                  Tạo thiệp riêng ngay <ArrowRight size={14} />
                </button>
              </div>
            </div>

            <div className="mt-8 md:mt-0 w-full md:w-1/3 max-w-[280px] aspect-[4/5] rounded-2xl overflow-hidden shadow-lg border-4 border-white/80 rotate-[3deg] transition-transform hover:rotate-0 duration-500 z-10">
              <img
                src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=400&auto=format&fit=crop"
                alt="Thiết kế thiệp riêng"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Drawer lọc cho Mobile */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm" onClick={() => setMobileFilterOpen(false)}>
          <div
            className="w-80 max-w-xs h-full bg-white p-6 overflow-y-auto shadow-2xl flex flex-col animate-slide-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-bold text-[#2c1810] font-sans">Bộ lọc tìm kiếm</h2>
              <button onClick={() => setMobileFilterOpen(false)} className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:text-[#db2777]">
                <X size={16} />
              </button>
            </div>
            <div className="flex-1 pb-10">
              <FilterSidebarContent />
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewTpl && (
        <PreviewModal
          tpl={previewTpl}
          demoSlug={getDemoSlugForTemplate(previewTpl, demos)}
          onClose={() => setPreviewTpl(null)}
          onRequestDesign={() => handleStartCreating(previewTpl.code)}
          onSelectTemplate={setPreviewTpl}
        />
      )}
    </div>
  );
}
