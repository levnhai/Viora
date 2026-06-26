"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, ArrowRight, X, ChevronDown, Check, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { Header } from "@/widgets/header/ui/Header";
import { Footer } from "@/widgets/footer/ui/Footer";
import { TemplateCard } from "@/entities/template/ui/TemplateCard";
import { PreviewModal } from "@/entities/template/ui/PreviewModal";
import { TEMPLATES } from "@/entities/template/model/templates";
import { TemplateConfig } from "@/entities/template/model/schema";

const CATEGORIES = [
  "Tất cả mẫu thiệp",
  "Thiệp hiện đại",
  "Thiệp sang trọng",
  "Thiệp cổ điển",
  "Thiệp tối giản",
  "Thiệp hoa lá",
  "Thiệp phong cách Hàn Quốc",
  "Thiệp theo chủ đề"
];

const COLORS = [
  { id: "pink", value: "#db2777", label: "Hồng" },
  { id: "red", value: "#b91c1c", label: "Đỏ" },
  { id: "gold", value: "#c6925c", label: "Vàng kim" },
  { id: "green", value: "#2d5a27", label: "Xanh lá" },
  { id: "navy", value: "#1e293b", label: "Xanh hải quân" },
  { id: "purple", value: "#7c4d90", label: "Tím" },
  { id: "classic", value: "#7a5c4f", label: "Nâu" }
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

  const navigate = (path: string) => router.push(path);

  const handleStartCreating = (tplId: number = 1) => {
    navigate(`/create?templateId=${tplId}`);
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

  // Logic lọc và tìm kiếm mẫu thiệp
  const filteredTemplates = TEMPLATES.filter((tpl) => {
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
        if (colorId === "red" && (tpl.accentColor === "#b91c1c" || tpl.themeClass === "theme-red")) return true;
        if (colorId === "green" && (tpl.accentColor === "#2d5a27" || tpl.themeClass === "theme-green")) return true;
        if (colorId === "navy" && (tpl.accentColor === "#1e293b" || tpl.themeClass === "theme-navy")) return true;
        if (colorId === "purple" && (tpl.accentColor === "#ac81bd" || tpl.accentColor === "#7c4d90" || tpl.themeClass === "theme-purple")) return true;
        if (colorId === "gold" && (tpl.accentColor === "#c6925c")) return true;
        if (colorId === "classic" && (tpl.accentColor === "#7a5c4f" || tpl.themeClass === "theme-modern")) return true;
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
        <h3 className="text-[13px] font-bold uppercase tracking-wider text-[#2c1810] mb-4">Danh mục</h3>
        <ul className="space-y-2.5">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <li key={cat}>
                <button
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left text-xs py-1 transition-colors cursor-pointer border-0 bg-transparent flex items-center justify-between font-sans ${
                    isSelected ? "text-[#db2777] font-semibold" : "text-[#7a5c4f]/80 hover:text-[#db2777]"
                  }`}
                >
                  <span>{cat}</span>
                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#db2777]" />}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <hr className="border-t border-[#e2d8cf]/30" />

      {/* Màu sắc */}
      <div>
        <h3 className="text-[13px] font-bold uppercase tracking-wider text-[#2c1810] mb-4">Màu sắc</h3>
        <div className="flex flex-wrap gap-2.5">
          {COLORS.map((c) => {
            const isSelected = selectedColors.includes(c.id);
            return (
              <button
                key={c.id}
                onClick={() => toggleColor(c.id)}
                title={c.label}
                className="w-7 h-7 rounded-full cursor-pointer relative border transition-all hover:scale-110 active:scale-95 flex items-center justify-center"
                style={{
                  backgroundColor: c.value,
                  borderColor: isSelected ? "#db2777" : "rgba(0,0,0,0.1)",
                  boxShadow: isSelected ? "0 0 0 2px white, 0 0 0 4px #db2777" : "none"
                }}
              >
                {isSelected && (
                  <Check size={12} className={c.id === "gold" || c.id === "pink" ? "text-white" : "text-white"} />
                )}
              </button>
            );
          })}
          {/* Nút mảng màu đa sắc */}
          <button
            onClick={() => setSelectedColors([])}
            title="Tất cả màu"
            className="w-7 h-7 rounded-full cursor-pointer relative border border-gray-200 flex items-center justify-center transition-all hover:scale-110 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #f43f5e, #3b82f6, #10b981, #eab308)"
            }}
          >
            {selectedColors.length === 0 && <Check size={12} className="text-white" />}
          </button>
        </div>
      </div>

      <hr className="border-t border-[#e2d8cf]/30" />

      {/* Khoảng giá */}
      <div>
        <h3 className="text-[13px] font-bold uppercase tracking-wider text-[#2c1810] mb-4">Khoảng giá</h3>
        <div className="space-y-3">
          {PRICE_RANGES.map((range) => (
            <label key={range.id} className="flex items-center gap-2.5 text-xs text-[#7a5c4f]/85 cursor-pointer font-sans select-none">
              <input
                type="checkbox"
                checked={priceRanges.includes(range.id)}
                onChange={() => togglePriceRange(range.id)}
                className="w-4 h-4 accent-[#db2777] rounded border-gray-300"
              />
              <span>{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      <hr className="border-t border-[#e2d8cf]/30" />

      {/* Phong cách */}
      <div>
        <h3 className="text-[13px] font-bold uppercase tracking-wider text-[#2c1810] mb-4">Phong cách</h3>
        <div className="space-y-3">
          {STYLES.map((st) => (
            <label key={st.id} className="flex items-center gap-2.5 text-xs text-[#7a5c4f]/85 cursor-pointer font-sans select-none">
              <input
                type="checkbox"
                checked={selectedStyles.includes(st.id)}
                onChange={() => toggleStyle(st.id)}
                className="w-4 h-4 accent-[#db2777] rounded border-gray-300"
              />
              <span>{st.label}</span>
            </label>
          ))}
        </div>
      </div>

      <hr className="border-t border-[#e2d8cf]/30" />

      {/* Tính năng nổi bật */}
      <div>
        <h3 className="text-[13px] font-bold uppercase tracking-wider text-[#2c1810] mb-4">Tính năng nổi bật</h3>
        <div className="space-y-3">
          {FEATURES.map((feat) => (
            <label key={feat.id} className="flex items-center gap-2.5 text-xs text-[#7a5c4f]/85 cursor-pointer font-sans select-none">
              <input
                type="checkbox"
                checked={selectedFeatures.includes(feat.id)}
                onChange={() => toggleFeature(feat.id)}
                className="w-4 h-4 accent-[#db2777] rounded border-gray-300"
              />
              <span>{feat.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Nút xóa bộ lọc */}
      <button
        onClick={clearFilters}
        className="w-full flex items-center justify-center gap-2 border border-[#e2d8cf] hover:border-[#db2777]/30 hover:bg-[#db2777]/5 text-xs text-[#7a5c4f] hover:text-[#db2777] font-semibold py-3 rounded-full cursor-pointer transition-all active:scale-95"
      >
        <RefreshCw size={12} />
        Xóa bộ lọc
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fffdfb] text-[#2c1810]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Header onOpenRequest={() => handleStartCreating(1)} />

      {/* Search & Hero Banner */}
      <section className="relative overflow-hidden pt-12 pb-16 bg-[#fdf6ef]">
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cover bg-no-repeat bg-right" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&h=800')" }}></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-cover bg-no-repeat bg-left rotate-180" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&h=800')" }}></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-5xl font-bold text-[#2c1810] tracking-tight leading-tight" style={{ fontFamily: "'EB Garamond', serif" }}>
              Kho mẫu thiệp cưới{" "}
              <span className="text-[#db2777] font-normal italic block sm:inline mt-1" style={{ fontFamily: "'Great Vibes', cursive", fontSize: "3rem" }}>
                đa dạng &amp; ấn tượng
              </span>
            </h1>
            <p className="text-xs md:text-sm text-[#7a5c4f]/70 font-light max-w-xl mx-auto">
              Hơn 1000+ mẫu thiệp cưới được thiết kế bởi các nhà thiết kế chuyên nghiệp.
            </p>
          </div>

          {/* Search Box */}
          <div className="max-w-xl mx-auto relative group">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm mẫu thiệp..."
              className="w-full pl-6 pr-12 py-3.5 sm:py-4 rounded-full border border-[#e2d8cf] focus:border-[#db2777]/50 bg-white text-[#2c1810] text-sm shadow-sm transition-all focus:outline-none focus:ring-4 focus:ring-[#db2777]/5 font-sans"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#db2777] hover:bg-[#c2185b] flex items-center justify-center text-white cursor-pointer transition-colors shadow-sm">
              <Search size={16} />
            </div>
          </div>

          {/* Highlights */}
          <div className="max-w-4xl mx-auto bg-white/60 backdrop-blur-sm border border-[#e2d8cf]/40 rounded-2xl p-4 md:p-6 grid grid-cols-2 md:grid-cols-4 gap-4 shadow-sm text-left">
            {[
              { icon: "🌸", title: "1000+", desc: "Mẫu thiệp đẹp" },
              { icon: "🎁", title: "Cập nhật", desc: "Hàng tuần" },
              { icon: "✏️", title: "Dễ dàng", desc: "Tùy chỉnh" },
              { icon: "📱", title: "Tối ưu", desc: "Trên mọi thiết bị" }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <span className="text-2xl bg-pink-100/50 w-11 h-11 rounded-xl flex items-center justify-center">{item.icon}</span>
                <div>
                  <h4 className="text-xs font-bold text-[#2c1810] leading-none">{item.title}</h4>
                  <p className="text-[10px] text-[#7a5c4f]/80 font-medium mt-1 leading-none">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex gap-8">
            {/* Sidebar filter cho Desktop */}
            <aside className="w-64 flex-shrink-0 hidden md:block border-r border-[#e2d8cf]/30 pr-8">
              <FilterSidebarContent />
            </aside>

            {/* List mẫu thiệp */}
            <div className="flex-1">
              <div className="flex items-center justify-between gap-4 mb-8">
                <div className="text-left">
                  <h2 className="text-lg font-bold text-[#2c1810]">
                    Tất cả mẫu thiệp{" "}
                    <span className="text-xs font-normal text-[#7a5c4f]/70 ml-1.5 font-sans">
                      ({sortedTemplates.length} mẫu thiệp)
                    </span>
                  </h2>
                </div>

                <div className="flex items-center gap-3">
                  {/* Nút lọc cho Mobile */}
                  <button
                    onClick={() => setMobileFilterOpen(true)}
                    className="md:hidden flex items-center gap-2 border border-[#e2d8cf] px-4 py-2 rounded-full text-xs font-semibold text-[#7a5c4f] hover:border-[#db2777]/30 hover:text-[#db2777] cursor-pointer bg-white"
                  >
                    <SlidersHorizontal size={12} /> Lọc
                  </button>

                  {/* Sắp xếp */}
                  <div className="flex items-center gap-1.5 border border-[#e2d8cf] rounded-full px-3.5 py-1.5 bg-white">
                    <span className="text-[11px] text-[#7a5c4f]/60 font-semibold uppercase tracking-wider font-sans">Sắp xếp:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="bg-transparent border-none text-xs font-semibold text-[#2c1810] focus:outline-none cursor-pointer pr-1 font-sans"
                    >
                      <option value="newest">Mới nhất</option>
                      <option value="popular">Phổ biến nhất</option>
                      <option value="price-asc">Giá tăng dần</option>
                      <option value="price-desc">Giá giảm dần</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Grid mẫu thiệp */}
              {sortedTemplates.length > 0 ? (
                <div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
                    {visibleTemplates.map((tpl) => (
                      <TemplateCard
                        key={tpl.id}
                        tpl={tpl}
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
                        className="bg-white hover:bg-pink-50 text-[#db2777] border border-[#db2777]/25 px-8 py-3.5 rounded-full font-semibold text-xs transition-all active:scale-95 shadow-sm inline-flex items-center gap-2 cursor-pointer"
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
      <section className="py-20 bg-[#fdf6ef]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-3xl bg-pink-50 border border-[#e2d8cf]/40 shadow-sm flex flex-col md:flex-row items-center justify-between p-8 md:p-14 text-left">
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 50%, white 0%, transparent 60%), radial-gradient(circle at 80% 20%, white 0%, transparent 50%)"
              }}
            />

            <div className="space-y-6 max-w-xl z-10">
              <h2
                className="text-4xl sm:text-5xl text-[#2c1810] font-bold leading-tight flex flex-col items-start gap-y-1"
                style={{ fontFamily: "'EB Garamond', serif" }}
              >
                <span>Không tìm thấy mẫu yêu thích?</span>
                <span className="text-[#db2777] font-normal text-4xl sm:text-5xl" style={{ fontFamily: "'Great Vibes', cursive" }}>
                  Thiết kế thiệp cưới riêng theo phong cách của bạn.
                </span>
              </h2>
              <p className="text-sm text-[#7a5c4f]/80 leading-relaxed font-light">
                Hãy liên hệ với chúng tôi để thiết kế mẫu thiệp cưới trực tuyến mang đậm dấu ấn cá nhân của riêng hai bạn. Hoàn thành nhanh chóng trong 24 giờ.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => handleStartCreating(1)}
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
              <h2 className="text-sm font-bold text-[#2c1810]">Bộ lọc tìm kiếm</h2>
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
          onClose={() => setPreviewTpl(null)}
          onRequestDesign={() => handleStartCreating(previewTpl.id)}
        />
      )}

      <Footer />
    </div>
  );
}
