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

  return (
    <div
      onClick={() => onPreviewDemo(tpl.id)}
      className="group bg-white rounded-2xl overflow-hidden border border-[#e2d8cf]/50 hover:shadow-md transition-all duration-300 flex flex-col w-full aspect-[2/3] cursor-pointer shadow-sm relative"
    >
      {/* Container ảnh xem trước */}
      <div className="relative flex-1 overflow-hidden bg-[#fdf6ef]">
        <img
          src={tpl.preview}
          alt={tpl.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Huy hiệu vương miện đỏ ở góc trên bên phải ảnh */}
        <div className="absolute top-2.5 right-2.5 z-10 bg-[#e11d48] text-white w-6 h-7 rounded-b-md shadow-sm flex items-center justify-center">
          <svg className="w-3.5 h-3.5 fill-current text-white" viewBox="0 0 24 24">
            <path d="M2 4l3 6 7-7 7 7 3-6v16h-20v-16z" />
          </svg>
        </div>

        {/* Hover overlay để hiện nút xem chi tiết ở giữa */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="bg-white/95 backdrop-blur-sm text-[#db2777] px-4 py-2 rounded-full text-xs font-semibold shadow-md flex items-center gap-1.5 transition-all transform scale-90 group-hover:scale-100">
            <Eye size={12} /> Xem chi tiết
          </span>
        </div>
      </div>

      {/* Thông tin mẫu thiệp nền trắng bên dưới */}
      <div className="p-4 bg-white flex flex-col text-left">
        <h3 className="text-[14px] font-bold text-[#2c1810] line-clamp-1 font-sans transition-colors group-hover:text-[#db2777]">
          {tpl.name}
        </h3>
        
        <div className="flex items-center justify-between mt-2">
          <span className="text-[13px] font-bold text-[#7a5c4f] font-sans">
            {tpl.price === 0 ? 'Miễn phí' : `${tpl.price.toLocaleString('vi-VN')}đ`}
          </span>
          
          <button 
            onClick={(e) => {
              e.stopPropagation(); // Ngăn mở modal preview
              setIsLiked(!isLiked);
            }}
            className={`w-7 h-7 rounded-full flex items-center justify-center transition-all cursor-pointer border border-[#e2d8cf]/80 hover:border-[#db2777]/30 hover:bg-pink-50/50 ${
              isLiked 
                ? 'bg-pink-50 border-pink-200 text-[#db2777]' 
                : 'bg-white text-[#7a5c4f]/60 hover:text-[#db2777]'
            }`}
            aria-label={isLiked ? "Unlike template" : "Like template"}
          >
            <Heart size={13} className={isLiked ? "fill-current text-[#db2777]" : ""} />
          </button>
        </div>
      </div>
    </div>
  );
}
