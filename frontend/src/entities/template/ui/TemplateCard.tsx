"use client";

import { useState, useEffect, useRef, createElement } from "react";
import { Eye, Plus, ShieldCheck, Zap, Crown } from "lucide-react";

// TemplateCard component for invitation templates
import { TemplateConfig } from "../model/schema";
import { getTemplatePackage } from "@/entities/template/model/registry";
import { DEFAULT_DEMO_WEDDING_DATA } from "@/entities/invitation/model/mockData";

interface TemplateCardProps {
  tpl: TemplateConfig;
  demoData?: any;
  onPreviewDemo: (tpl: TemplateConfig) => void;
  onUseTemplate: (tplId: string) => void;
}

export function TemplateCard({
  tpl,
  demoData,
  onPreviewDemo,
  onUseTemplate,
}: TemplateCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number>(0.75);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (!containerRef.current || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(([entry]) => {
      if (entry && entry.contentRect) {
        const cardWidth = entry.contentRect.width;
        if (cardWidth > 0) {
          setScale(cardWidth / 375);
          setIsLoaded(true);
        }
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const displayTags = tpl?.tags && tpl.tags.length > 0 ? tpl.tags : [tpl?.style || "Cổ điển", "Nổi bật"];

  const templateCode = tpl?.code || "temp_1";
  const pkg = getTemplatePackage(templateCode);
  const LiveViewComp = pkg?.LiveView;
  const weddingDataToRender = demoData || DEFAULT_DEMO_WEDDING_DATA;

  return (
    <div
      ref={containerRef}
      onClick={() => onPreviewDemo?.(tpl)}
      className="group bg-slate-950 rounded-2xl sm:rounded-3xl overflow-hidden aspect-[9/16] relative cursor-pointer shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-pink-500/20 w-full select-none"
    >
      {/* Skeleton loader before scale measurement */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-slate-900 animate-pulse flex items-center justify-center z-10">
          <div className="w-6 h-6 border-2 border-pink-500/30 border-t-pink-500 rounded-full animate-spin" />
        </div>
      )}

      {/* Live Invitation Template View từ Database API (Tự động scale vừa khít 100% bề ngang card) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-slate-950">
        <div
          className={`w-[375px] absolute top-0 left-0 pointer-events-none select-none transition-all duration-300 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          <div className="transition-transform duration-[16000ms] ease-linear group-hover:-translate-y-[82%]">
            {LiveViewComp ? (
              createElement(LiveViewComp, {
                weddingData: weddingDataToRender,
                previewMode: "invitation",
              })
            ) : null}
          </div>
        </div>
      </div>

      {/* Top Left Tier Badge (Cơ Bản & Tiêu Chuẩn) */}
      <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-30 flex items-center gap-1 sm:gap-1.5 pointer-events-none">
        {tpl?.tier === "basic" && (
          <span className="bg-emerald-600/90 text-white text-[9px] sm:text-[10px] font-bold uppercase px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-lg border border-emerald-400/40 tracking-wider flex items-center gap-1 backdrop-blur-md">
            <ShieldCheck size={11} className="text-emerald-300" />
            <span>Cơ Bản</span>
          </span>
        )}
        {tpl?.tier === "standard" && (
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-600 text-white text-[9px] sm:text-[10px] font-black uppercase px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-lg border border-pink-400/40 tracking-wider flex items-center gap-1 backdrop-blur-md">
            <Zap size={11} className="text-amber-300 fill-amber-300 animate-pulse" />
            <span>Tiêu Chuẩn</span>
          </span>
        )}
        {tpl?.tier === "pro" && (
          <span className="bg-gradient-to-r from-amber-500 via-pink-600 to-purple-600 text-white text-[9px] sm:text-[10px] font-black uppercase px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-lg border border-amber-300/50 tracking-wider flex items-center gap-1 backdrop-blur-md">
            <Crown size={11} className="text-amber-300 fill-amber-300" />
            <span>Cao Cấp</span>
          </span>
        )}
      </div>

      {/* Top Badges (Góc trên bên phải) */}
      <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-30 flex items-center gap-1 sm:gap-1.5 pointer-events-none">
        {tpl?.isPinned && (
          <span className="bg-amber-400 text-slate-950 text-[8px] sm:text-[10px] font-black uppercase px-1.5 py-0.5 sm:px-2.5 sm:py-0.5 rounded-full shadow-lg border border-amber-300 flex items-center gap-0.5">
            📌 Ghim
          </span>
        )}
        {tpl?.isNew && (
          <span className="bg-[#ff0055] text-white text-[8px] sm:text-[10px] font-extrabold uppercase px-1.5 py-0.5 sm:px-2.5 sm:py-0.5 rounded-full shadow-md">
            Mới
          </span>
        )}
        {tpl?.isHot && (
          <span className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-[8px] sm:text-[10px] font-extrabold uppercase px-1.5 py-0.5 sm:px-2.5 sm:py-0.5 rounded-full shadow-md">
            Hot
          </span>
        )}
      </div>

      {/* Hover Backdrop Overlay nút bấm */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-3 sm:p-4 z-30 pointer-events-auto">
        <div className="flex flex-col gap-2 w-full max-w-[140px] sm:max-w-[160px] transform scale-90 group-hover:scale-100 transition-transform duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPreviewDemo?.(tpl);
            }}
            className="w-full py-1.5 sm:py-2 rounded-full bg-white text-slate-950 text-[11px] sm:text-xs font-bold flex items-center justify-center gap-1 shadow-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <Eye size={12} /> Xem Demo
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onUseTemplate?.(tpl?.code || templateCode);
            }}
            className="w-full py-1.5 sm:py-2 rounded-full bg-[#ff007a] text-white text-[11px] sm:text-xs font-bold flex items-center justify-center gap-1 shadow-lg hover:bg-pink-600 transition-colors cursor-pointer"
          >
            <Plus size={12} /> Tạo thiệp
          </button>
        </div>
      </div>

      {/* Bottom Dark Gradient Overlay (Hiển thị TÊN MẪU THIỆP & GIÁ TIỀN) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent flex flex-col justify-end p-2.5 sm:p-4 text-left z-20 pointer-events-none">
        <div className="flex items-center justify-between gap-1.5">
          {/* Tên mẫu thiệp */}
          <h3 className="text-xs sm:text-base font-bold text-white leading-tight drop-shadow-sm line-clamp-1">
            {tpl.name}
          </h3>

          {/* Giá niêm yết */}
          <div className="text-right shrink-0">
            <span className="text-[11px] sm:text-sm font-black text-pink-400 font-mono">
              {tpl.price.toLocaleString("vi-VN")}đ
            </span>
          </div>
        </div>

        {/* Các thẻ phong cách (Pill Badges) */}
        <div className="flex items-center gap-1 mt-1.5 sm:mt-2 flex-wrap">
          {displayTags.slice(0, 2).map((tag, idx) => (
            <span
              key={idx}
              className="bg-white/20 backdrop-blur-md text-[9px] sm:text-[10px] font-medium text-white/90 px-2 py-0.5 sm:px-2.5 sm:py-0.5 rounded-full border border-white/10"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
