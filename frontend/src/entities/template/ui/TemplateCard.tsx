import { Monitor } from "lucide-react";
import { TemplateConfig } from "../model/schema";

interface TemplateCardProps {
  tpl: TemplateConfig;
  onPreviewDemo: (tplId: number) => void;
  onUseTemplate: (tplId: number) => void;
}

export function TemplateCard({ tpl, onPreviewDemo, onUseTemplate }: TemplateCardProps) {
  return (
    <div
      className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative overflow-hidden aspect-[3/4] bg-muted">
        <img
          src={tpl.preview}
          alt={tpl.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {tpl.popular && (
          <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full font-medium">
            Phổ biến
          </span>
        )}
        <div className="absolute inset-0 bg-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3">
          <button
            onClick={() => onPreviewDemo(tpl.id)}
            className="bg-card text-foreground px-5 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-secondary transition-colors cursor-pointer"
          >
            <Monitor size={14} /> Xem demo thiệp
          </button>
          <button 
            onClick={() => onUseTemplate(tpl.id)}
            className="bg-primary text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity cursor-pointer"
          >
            Dùng mẫu này
          </button>
        </div>
      </div>
      <div className="p-5 flex items-center justify-between">
        <div>
          <h3
            className="text-base text-foreground"
            style={{ fontFamily: "'EB Garamond', serif" }}
          >
            {tpl.name}
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1.5">
            <span>{tpl.style}</span>
            <span>•</span>
            <span className={`font-semibold ${tpl.price === 0 ? 'text-green-600' : tpl.price === 299000 ? 'text-amber-600' : 'text-[#db2777]'}`}>
              {tpl.price === 0 ? 'Miễn phí' : `${tpl.price.toLocaleString('vi-VN')}đ`}
            </span>
          </p>
        </div>
        <div
          className="w-5 h-5 rounded-full border-2 border-white shadow-sm"
          style={{ backgroundColor: tpl.accentColor }}
        />
      </div>
    </div>
  );
}
