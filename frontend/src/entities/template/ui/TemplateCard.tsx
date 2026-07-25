"use client";

import { Eye, PhoneCall } from "lucide-react";
import { TemplateConfig } from "../model/schema";

interface TemplateCardProps {
  tpl: TemplateConfig;
  onPreviewDemo: (tpl: TemplateConfig) => void;
  onUseTemplate: (tplId: string) => void;
}

export function TemplateCard({
  tpl,
  onPreviewDemo,
  onUseTemplate,
}: TemplateCardProps) {
  const displayTags = tpl.tags && tpl.tags.length > 0 ? tpl.tags : [tpl.style, "Nổi bật"];

  return (
    <div
      onClick={() => onPreviewDemo(tpl)}
      className="group bg-slate-950 rounded-2xl sm:rounded-3xl overflow-hidden aspect-[9/16] relative cursor-pointer shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-pink-500/20 w-full"
    >
      {/* Background Preview Image Full Cover */}
      <img
        src={tpl.preview}
        alt={tpl.name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Top Badges (Góc trên bên phải) */}
      <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5">
        {tpl.isNew && (
          <span className="bg-[#ff0055] text-white text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full shadow-md">
            Mới
          </span>
        )}
        {(tpl.isHot || tpl.tier === "premium") && (
          <span className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full shadow-md">
            Hot
          </span>
        )}
      </div>

      {/* Hover Backdrop Overlay */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 z-20">
        <div className="flex flex-col gap-2 w-full max-w-[160px] transform scale-90 group-hover:scale-100 transition-transform duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPreviewDemo(tpl);
            }}
            className="w-full py-2 rounded-full bg-white text-slate-950 text-xs font-bold flex items-center justify-center gap-1.5 shadow-lg hover:bg-slate-100 transition-colors"
          >
            <Eye size={13} /> Xem Demo
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onUseTemplate(tpl.code);
            }}
            className="w-full py-2 rounded-full bg-[#ff007a] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-lg hover:bg-pink-600 transition-colors"
          >
            <PhoneCall size={13} /> Chọn Mẫu
          </button>
        </div>
      </div>

      {/* Bottom Dark Gradient Overlay (Nền tối gradient bên dưới) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent flex flex-col justify-end p-3.5 sm:p-4 text-left z-10 pointer-events-none">
        {/* Tên mẫu thiệp */}
        <h3 className="text-sm sm:text-base font-bold text-white leading-tight drop-shadow-sm line-clamp-1">
          {tpl.name}
        </h3>

        {/* Các thẻ phong cách (Pill Badges) */}
        <div className="flex items-center gap-1.5 mt-2 flex-wrap">
          {displayTags.map((tag, idx) => (
            <span
              key={idx}
              className="bg-white/20 backdrop-blur-md text-[10px] font-medium text-white/90 px-2.5 py-0.5 rounded-full border border-white/10"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
