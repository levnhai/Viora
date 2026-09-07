"use client";

import React, { useState, useRef, memo } from "react";
import { Eye, Plus, ShieldCheck, Zap, Crown } from "lucide-react";
import { TemplateConfig } from "../model/schema";

interface TemplateCardProps {
  tpl: TemplateConfig;
  demoData?: any;
  onPreviewDemo: (tpl: TemplateConfig) => void;
  onUseTemplate: (tplId: string) => void;
}

export const TemplateCard = memo(function TemplateCard({
  tpl,
  demoData, 
  onPreviewDemo,
  onUseTemplate,
}: TemplateCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Lấy ảnh thumbnail đại diện
  const thumbnailSrc =
    tpl?.preview ||
    demoData?.thumbnail ||
    demoData?.coverImage ||
    demoData?.heroImage ||
    demoData?.groomAvatarUrl ||
    "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=800&fit=crop&auto=format";

  // Lấy video preview nếu có
  const videoSrc =
    tpl?.previewVideo ||
    demoData?.coverVideo ||
    demoData?.previewVideo ||
    null;

  const handleMouseEnter = () => {
    if (videoRef.current && videoSrc) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current && videoSrc) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const displayTags =
    tpl?.tags && tpl.tags.length > 0
      ? tpl.tags
      : [tpl?.style || "Cổ điển", "Nổi bật"];

  const templateCode = tpl?.code || "temp_1";

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onPreviewDemo?.(tpl)}
      className="group bg-slate-950 rounded-2xl sm:rounded-3xl overflow-hidden aspect-[9/16] relative cursor-pointer shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-pink-500/20 w-full select-none"
    >
      {/* Skeleton loader khi ảnh đang tải */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-slate-900 animate-pulse flex items-center justify-center z-10">
          <div className="w-6 h-6 border-2 border-pink-500/30 border-t-pink-500 rounded-full animate-spin" />
        </div>
      )}

      {/* Media Preview: Video hoặc Ảnh Thumbnail sắc nét */}
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-slate-950">
        {videoSrc ? (
          <video
            ref={videoRef}
            src={`${videoSrc}#t=0.001`}
            muted
            loop
            playsInline
            preload="auto"
            onLoadedData={() => setImageLoaded(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <img
            src={thumbnailSrc}
            alt={tpl.name}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        )}
      </div>

      {/* Top Left Tier Badge (Cơ Bản, Tiêu Chuẩn, Cao Cấp) */}
      <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-30 flex items-center gap-1 sm:gap-1.5 pointer-events-none">
        {tpl?.tier === "basic" && (
          <span className="bg-black/50 backdrop-blur-md text-stone-300 text-[9px] sm:text-[10px] font-medium uppercase px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-lg border border-white/15 tracking-wider flex items-center gap-1">
            <ShieldCheck size={11} className="text-stone-300" />
            <span>Cơ Bản</span>
          </span>
        )}
        {tpl?.tier === "standard" && (
          <span className="bg-black/60 backdrop-blur-md text-[#e0b769] text-[9px] sm:text-[10px] font-semibold uppercase px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-lg border border-[#e0b769]/40 tracking-wider flex items-center gap-1">
            <Zap size={11} className="text-[#e0b769] fill-[#e0b769]" />
            <span>Tiêu Chuẩn</span>
          </span>
        )}
        {tpl?.tier === "pro" && (
          <span className="bg-black/60 backdrop-blur-md text-amber-200 text-[9px] sm:text-[10px] font-semibold uppercase px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-lg border border-amber-300/50 tracking-wider flex items-center gap-1">
            <Crown size={11} className="text-amber-300 fill-amber-300" />
            <span>Cao Cấp</span>
          </span>
        )}
      </div>

      {/* Top Badges (Ghim, Mới, Hot) */}
      <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-30 flex items-center gap-1 sm:gap-1.5 pointer-events-none">
        {tpl?.isPinned && (
          <span className="bg-amber-400/90 text-stone-950 text-[8px] sm:text-[9px] font-bold uppercase px-2 py-0.5 rounded-full shadow-lg border border-amber-300 flex items-center gap-0.5">
            📌 Ghim
          </span>
        )}
        {tpl?.isNew && (
          <span className="bg-rose-900/80 backdrop-blur-md text-rose-200 text-[8px] sm:text-[9px] font-medium uppercase px-2 py-0.5 rounded-full shadow-md border border-rose-500/30">
            Mới
          </span>
        )}
        {tpl?.isHot && (
          <span className="bg-amber-900/80 backdrop-blur-md text-amber-200 text-[8px] sm:text-[9px] font-medium uppercase px-2 py-0.5 rounded-full shadow-md border border-amber-500/30">
            Hot
          </span>
        )}
      </div>

      {/* Hover Backdrop Overlay nút bấm */}
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-3 sm:p-4 z-30 pointer-events-auto backdrop-blur-xs">
        <div className="flex flex-col gap-2 w-full max-w-[140px] sm:max-w-[160px] transform scale-90 group-hover:scale-100 transition-transform duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPreviewDemo?.(tpl);
            }}
            className="w-full py-2 rounded-full bg-white/95 text-stone-950 text-[11px] sm:text-xs font-semibold flex items-center justify-center gap-1.5 shadow-lg hover:bg-white transition-colors cursor-pointer"
          >
            <Eye size={13} /> Xem Demo
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onUseTemplate?.(tpl?.code || templateCode);
            }}
            className="w-full py-2 rounded-full bg-gradient-to-r from-[#d4af37] to-[#e0b769] text-stone-950 text-[11px] sm:text-xs font-bold flex items-center justify-center gap-1.5 shadow-lg hover:brightness-110 transition-all cursor-pointer"
          >
            <Plus size={13} /> Tạo thiệp
          </button>
        </div>
      </div>

      {/* Bottom Dark Gradient Overlay (TÊN MẪU THIỆP & GIÁ TIỀN) */}
      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/85 to-transparent pt-14 p-3 sm:p-4 text-left z-20 pointer-events-none">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="text-xs sm:text-sm font-serif font-normal text-white tracking-wide leading-tight line-clamp-1">
            {tpl.name}
          </h3>

          <div className="text-right shrink-0">
            <span className="text-xs sm:text-sm font-semibold text-[#e0b769] font-sans">
              {tpl.price.toLocaleString("vi-VN")}đ
            </span>
          </div>
        </div>

        {/* Các thẻ phong cách (Pill Badges) */}
        <div className="flex items-center gap-1.5 mt-2 flex-wrap">
          {displayTags.slice(0, 2).map((tag, idx) => (
            <span
              key={idx}
              className="bg-white/10 backdrop-blur-md text-[9px] sm:text-[10px] font-light text-stone-300 px-2.5 py-0.5 rounded-full border border-white/10"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
});
