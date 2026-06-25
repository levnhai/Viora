import { useState } from "react";
import { Monitor, Heart } from "lucide-react";
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
      className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex-shrink-0 w-[240px] sm:w-[260px] lg:w-auto snap-start"
    >
      <div className="relative overflow-hidden aspect-[3/4] bg-muted">
        <img
          src={tpl.preview}
          alt={tpl.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {tpl.popular && (
          <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-[10px] px-2.5 py-0.5 rounded-full font-medium">
            Phổ biến
          </span>
        )}
        <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3 p-4">
          <button
            onClick={() => onPreviewDemo(tpl.id)}
            className="bg-card text-foreground px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 hover:bg-secondary transition-colors cursor-pointer border-0"
          >
            <Monitor size={12} /> Xem demo thiệp
          </button>
          <button 
            onClick={() => onUseTemplate(tpl.id)}
            className="bg-[#db2777] text-white px-4 py-2 rounded-xl text-xs font-semibold hover:bg-[#c2185b] transition-colors cursor-pointer border-0"
          >
            Dùng mẫu này
          </button>
        </div>
      </div>
      <div className="p-3.5 flex items-center justify-between text-left bg-white">
        <div>
          <h3
            className="text-sm font-semibold text-[#2c1810]"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {tpl.name}
          </h3>
          <p className="text-xs text-[#7a5c4f]/70 mt-0.5 font-light">
            {tpl.price === 0 ? 'Miễn phí' : `${tpl.price.toLocaleString('vi-VN')}đ`}
          </p>
        </div>
        <button 
          onClick={() => setIsLiked(!isLiked)}
          className={`w-8 h-8 rounded-full border flex items-center justify-center active:scale-95 transition-all cursor-pointer ${isLiked ? 'border-[#db2777]/30 bg-pink-50 text-[#db2777]' : 'border-[#e2d8cf]/60 bg-white text-gray-300 hover:text-[#db2777] hover:border-[#db2777]/30 hover:bg-[#db2777]/5'}`}
          aria-label={isLiked ? "Unlike template" : "Like template"}
        >
          <Heart size={14} className={isLiked ? "fill-current" : "hover:fill-current"} />
        </button>
      </div>
    </div>
  );
}
