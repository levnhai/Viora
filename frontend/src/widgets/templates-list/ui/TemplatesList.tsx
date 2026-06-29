import { useState, useRef } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { TEMPLATES } from "@/entities/template/model/templates";
import { TemplateConfig } from "@/entities/template/model/schema";
import { TemplateCard } from "@/entities/template/ui/TemplateCard";
import { PreviewModal } from "@/entities/template/ui/PreviewModal";

interface TemplatesListProps {
  onPreviewDemo: (tplId: number) => void;
  onUseTemplate: (tplId: number) => void;
}

const TIER_LABELS: Record<string, string> = {
  free: "Miễn phí",
  basic: "Cơ bản",
  premium: "Cao cấp",
};

export function TemplatesList({ onPreviewDemo, onUseTemplate }: TemplatesListProps) {
  const [activeTier, setActiveTier] = useState("Tất cả");
  const [previewTpl, setPreviewTpl] = useState<TemplateConfig | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const filtered =
    activeTier === "Tất cả"
      ? TEMPLATES
      : TEMPLATES.filter((t) => TIER_LABELS[t.tier] === activeTier);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { scrollLeft } = scrollContainerRef.current;
      const scrollAmount = 300; // Cuộn khoảng cách tương đương chiều rộng 1 card + gap
      scrollContainerRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="mau-thiep" className="py-24 bg-white relative">
      {/* Hide scrollbar styles */}
      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="text-left space-y-2">
            <p className="text-xs text-[#db2777] uppercase tracking-widest font-semibold flex items-center gap-1.5">
              <span>🌸</span> MẪU THIỆP NỔI BẬT
            </p>
            <h2
              className="text-4xl text-[#2c1810] font-bold flex flex-wrap items-baseline gap-x-2"
              style={{ fontFamily: "'EB Garamond', serif" }}
            >
              <span>Kho mẫu thiệp</span>
              <span className="text-[#db2777] font-normal text-4xl sm:text-5xl" style={{ fontFamily: "'Great Vibes', cursive" }}>da dạng &amp; ấn tượng</span>
            </h2>
            <p className="text-sm text-[#7a5c4f]/70 font-light max-w-xl">
              Lựa chọn từ hàng ngàn mẫu thiệp cưới được thiết kế bởi các nhà thiết kế chuyên nghiệp.
            </p>
          </div>
          <div>
            <Link
              href="/templates"
              className="border border-[#db2777]/30 bg-white text-[#db2777] hover:bg-[#db2777]/5 px-6 py-2.5 rounded-full font-semibold text-xs flex items-center gap-2 cursor-pointer transition-all active:scale-95 shadow-sm no-underline"
            >
              Xem tất cả mẫu thiệp <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Carousel / Grid Container */}
        <div className="relative px-4 group/carousel">
          {/* Nút chuyển trang trái */}
          <button 
            onClick={() => handleScroll("left")}
            className="absolute -left-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white shadow-md border border-[#e2d8cf]/50 flex items-center justify-center text-gray-400 hover:text-[#db2777] hover:border-[#db2777]/30 hover:bg-pink-50 transition-all cursor-pointer hover:scale-105 active:scale-95 lg:hidden lg:group-hover/carousel:flex"
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Grid hiển thị 6 cột trên màn hình lớn, cuộn ngang trên màn hình nhỏ */}
          <div 
            ref={scrollContainerRef}
            className="flex lg:grid lg:grid-cols-6 overflow-x-auto lg:overflow-visible gap-4 pb-6 scrollbar-none scroll-smooth snap-x snap-mandatory"
          >
            {filtered.map((tpl) => (
              <TemplateCard
                key={tpl.id}
                tpl={tpl}
                onPreviewDemo={() => {
                  setPreviewTpl(tpl);
                }}
                onUseTemplate={onUseTemplate}
              />
            ))}
          </div>

          {/* Nút chuyển trang phải */}
          <button 
            onClick={() => handleScroll("right")}
            className="absolute -right-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white shadow-md border border-[#e2d8cf]/50 flex items-center justify-center text-gray-400 hover:text-[#db2777] hover:border-[#db2777]/30 hover:bg-pink-50 transition-all cursor-pointer hover:scale-105 active:scale-95 lg:hidden lg:group-hover/carousel:flex"
            aria-label="Scroll right"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {previewTpl && (
        <PreviewModal
          tpl={previewTpl}
          onClose={() => setPreviewTpl(null)}
          onRequestDesign={() => {
            onUseTemplate(previewTpl.id);
          }}
          onSelectTemplate={setPreviewTpl}
        />
      )}
    </section>
  );
}
