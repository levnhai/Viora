"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Eye, PhoneCall } from "lucide-react";
import Link from "next/link";
import { TEMPLATES } from "@/entities/template/model/templates";
import { TemplateConfig } from "@/entities/template/model/schema";
import { PreviewModal } from "@/entities/template/ui/PreviewModal";

export function FeaturedTemplatesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [previewTpl, setPreviewTpl] = useState<TemplateConfig | null>(null);

  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    const minDistance = 40;
    if (distance > minDistance) {
      // Vuốt sang trái -> chuyển mẫu tiếp theo
      setActiveIndex((prev) => (prev + 1) % TEMPLATES.length);
    } else if (distance < -minDistance) {
      // Vuốt sang phải -> chuyển mẫu trước đó
      setActiveIndex((prev) => (prev - 1 + TEMPLATES.length) % TEMPLATES.length);
    }
  };

  // Auto slide every 5s
  useEffect(() => {
    if (TEMPLATES.length <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TEMPLATES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="mau-thiep" className="py-16 md:py-28 bg-[#141313] text-white relative overflow-hidden">
      {/* Ambient Dark Pink Glow Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#ff007a]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header matching exact image styling */}
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-2.5">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Mẫu thiệp cưới online <span className="text-[#ff007a] italic font-serif font-black">đẹp nhất</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            Khám phá những mẫu thiệp cưới được thiết kế tinh tế và hiện đại
          </p>
        </div>

        {/* 3D Cover Flow Carousel Container (Hỗ trợ lướt/vuốt touch swipe & mouse drag) */}
        <div 
          className="relative h-[500px] sm:h-[600px] flex items-center justify-center my-4 overflow-hidden touch-pan-y select-none"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="relative w-full max-w-[280px] sm:max-w-[340px] h-full flex items-center justify-center">
            {TEMPLATES.map((tpl, idx) => {
              const offset = idx - activeIndex;
              const absOffset = Math.abs(offset);

              // 3D positioning rules
              let zIndex = 30 - absOffset * 10;
              let scale = 1 - absOffset * 0.16;
              let translateX = offset * 65; // percentage offset
              let rotateY = offset * -18;
              let opacity = absOffset === 0 ? 1 : absOffset === 1 ? 0.65 : absOffset === 2 ? 0.35 : 0;

              if (absOffset > 2) {
                return null;
              }

              const isCenter = offset === 0;

              return (
                <motion.div
                  key={tpl.id}
                  onClick={() => {
                    if (isCenter) {
                      setPreviewTpl(tpl);
                    } else {
                      setActiveIndex(idx);
                    }
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(e, info) => {
                    const threshold = 30;
                    if (info.offset.x < -threshold) {
                      setActiveIndex((prev) => (prev + 1) % TEMPLATES.length);
                    } else if (info.offset.x > threshold) {
                      setActiveIndex((prev) => (prev - 1 + TEMPLATES.length) % TEMPLATES.length);
                    }
                  }}
                  animate={{
                    x: `${translateX}%`,
                    scale: scale,
                    rotateY: rotateY,
                    opacity: opacity,
                    zIndex: zIndex,
                  }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className={`absolute inset-0 cursor-grab active:cursor-grabbing rounded-[28px] overflow-hidden bg-slate-950 ${
                    isCenter
                      ? "shadow-2xl shadow-pink-500/40"
                      : "shadow-xl opacity-80"
                  }`}
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Card Image Preview Full Edge-to-Edge */}
                  <div className="relative h-full w-full overflow-hidden bg-slate-950">
                    <img
                      src={tpl.preview}
                      alt={tpl.name}
                      className="w-full h-full object-cover pointer-events-none"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-black/30 to-transparent flex flex-col justify-end p-5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="bg-[#ff007a] text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md shadow-xs">
                          {tpl.style}
                        </span>
                        {tpl.tier === "premium" && (
                          <span className="bg-amber-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md">
                            👑 VIP
                          </span>
                        )}
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-white leading-tight truncate">
                        {tpl.name}
                      </h3>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Pagination Dots (Matching Image: Long Hot-Pink Pill for Active Item) */}
        <div className="flex items-center justify-center gap-2 my-8">
          {TEMPLATES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                activeIndex === idx
                  ? "w-9 bg-[#ff007a]"
                  : "w-2.5 bg-slate-700 hover:bg-slate-500"
              }`}
              aria-label={`Go to template ${idx + 1}`}
            />
          ))}
        </div>

        {/* Hot Pink CTA Pill Button -> Chuyển sang trang /templates danh sách mẫu thiệp */}
        <div className="text-center pt-2">
          <Link
            href="/templates"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#ff007a] to-[#db2777] hover:from-[#e0006c] hover:to-[#be185d] text-white font-black text-sm shadow-xl shadow-pink-500/30 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer no-underline"
          >
            <span>Xem tất cả mẫu thiệp</span>
            <ChevronRight size={18} />
          </Link>
        </div>

      </div>

      {/* Preview Modal */}
      {previewTpl && (
        <PreviewModal
          tpl={previewTpl}
          onClose={() => setPreviewTpl(null)}
          onRequestDesign={() => {
            setPreviewTpl(null);
            scrollToSection("dang-ky-tu-van");
          }}
          onSelectTemplate={() => {
            setPreviewTpl(null);
            scrollToSection("dang-ky-tu-van");
          }}
        />
      )}
    </section>
  );
}
