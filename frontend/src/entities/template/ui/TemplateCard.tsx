"use client";

import { useState } from "react";
import { Heart, Eye } from "lucide-react";
import { TemplateConfig } from "../model/schema";

interface TemplateCardProps {
  tpl: TemplateConfig;
  onPreviewDemo: (tplId: number) => void;
  onUseTemplate: (tplId: number) => void;
}

export function TemplateCard({ tpl, onPreviewDemo, onUseTemplate }: TemplateCardProps) {
  const [isLiked, setIsLiked] = useState(false);

  // Lượt dùng giả lập dựa trên tpl.id để tạo sự chân thực
  const usageCount = tpl.id * 243 + 457;

  return (
    <div
      onClick={() => onPreviewDemo(tpl.id)}
      className="group bg-card rounded-2xl overflow-hidden border border-border/40 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5 flex-shrink-0 w-[240px] sm:w-[260px] lg:w-full aspect-[3/4] snap-start relative cursor-pointer"
    >
      {/* Container ảnh xem trước */}
      <div className="absolute inset-0 overflow-hidden bg-muted">
        <img
          src={tpl.preview}
          alt={tpl.name}
          className="w-full h-[145%] object-cover absolute top-0 left-0 transition-transform duration-[4500ms] ease-in-out group-hover:translate-y-[-31%]"
        />
        
        {/* Dark gradient overlay để nổi bật thông tin */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90 group-hover:from-black/95 transition-all duration-300" />
      </div>

      {/* Nút yêu thích góc trên bên phải */}
      <button 
        onClick={(e) => {
          e.stopPropagation(); // Ngăn mở modal
          setIsLiked(!isLiked);
        }}
        className={`absolute top-4 right-4 z-10 w-9 h-9 rounded-full border border-white/20 backdrop-blur-md flex items-center justify-center active:scale-95 transition-all cursor-pointer ${
          isLiked 
            ? 'bg-[#db2777] border-0 text-white' 
            : 'bg-black/35 hover:bg-[#db2777] text-white'
        }`}
        aria-label={isLiked ? "Unlike template" : "Like template"}
      >
        <Heart size={14} className={isLiked ? "fill-current" : ""} />
      </button>

      {/* Hiệu ứng Hover: Hiện nút xem chi tiết ở giữa */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <span className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 border border-white/10 shadow-lg">
          <Eye size={12} /> Xem chi tiết
        </span>
      </div>

      {/* Thông tin mẫu thiệp dạng overlay sát đáy */}
      <div className="absolute bottom-0 inset-x-0 p-5 text-left space-y-2 z-10">
        <h3
          className="text-base font-bold text-white tracking-wide drop-shadow-sm font-sans"
        >
          {tpl.name}
        </h3>
        
        {/* Các thẻ phân loại */}
        <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
          <span className="px-2 py-0.5 rounded bg-white/15 text-white/90 font-medium font-sans backdrop-blur-sm">
            {tpl.style}
          </span>
          <span className="px-2 py-0.5 rounded bg-white/15 text-white/90 font-medium font-sans backdrop-blur-sm">
            {tpl.tier === "premium" ? "Cao cấp" : "Cơ bản"}
          </span>
        </div>

        {/* Dòng gạch dưới cùng hiển thị lượt dùng và giá */}
        <div className="flex items-center justify-between pt-1.5 border-t border-white/10">
          <span className="text-[10px] text-white/70 font-sans flex items-center gap-1">
            ⏱️ {usageCount} lượt dùng
          </span>
          <span className="text-xs font-bold text-pink-400 font-sans">
            {tpl.price === 0 ? 'Miễn phí' : `${tpl.price.toLocaleString('vi-VN')}đ`}
          </span>
        </div>
      </div>
    </div>
  );
}
