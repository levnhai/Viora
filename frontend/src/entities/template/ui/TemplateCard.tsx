"use client";

import { Eye, Plus } from "lucide-react";
import { motion } from "framer-motion";
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
  const displayTags = tpl.tags && tpl.tags.length > 0 ? tpl.tags : [tpl.style, "Nổi bật"];

  const templateCode = tpl.code || "temp_1";
  const LiveViewComp = getTemplatePackage(templateCode).LiveView;
  const weddingDataToRender = demoData || DEFAULT_DEMO_WEDDING_DATA;

  return (
    <motion.div
      onClick={() => onPreviewDemo(tpl)}
      whileHover="hover"
      initial="initial"
      className="group bg-slate-950 rounded-2xl sm:rounded-3xl overflow-hidden aspect-[9/16] relative cursor-pointer shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-pink-500/20 w-full select-none"
    >
      {/* Live Invitation Template View từ Database API (Canh giữa 100%, Scroll khi Hover) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-slate-950">
        <div className="w-[375px] absolute left-1/2 -translate-x-1/2 top-0 origin-top transform scale-[0.78] sm:scale-[0.95] pointer-events-none select-none">
          <motion.div
            variants={{
              initial: { y: "0%" },
              hover: { y: "-65%", transition: { duration: 12, ease: "linear" } },
            }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <LiveViewComp weddingData={weddingDataToRender} previewMode="invitation" />
          </motion.div>
        </div>
      </div>

      {/* Top Badges (Góc trên bên phải) */}
      <div className="absolute top-3 right-3 z-30 flex items-center gap-1.5 pointer-events-none">
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

      {/* Hover Backdrop Overlay nút bấm */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 z-30 pointer-events-auto">
        <div className="flex flex-col gap-2 w-full max-w-[160px] transform scale-90 group-hover:scale-100 transition-transform duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPreviewDemo(tpl);
            }}
            className="w-full py-2 rounded-full bg-white text-slate-950 text-xs font-bold flex items-center justify-center gap-1.5 shadow-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <Eye size={13} /> Xem Demo
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onUseTemplate(tpl.code);
            }}
            className="w-full py-2 rounded-full bg-[#ff007a] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-lg hover:bg-pink-600 transition-colors cursor-pointer"
          >
            <Plus size={13} /> Tạo thiệp
          </button>
        </div>
      </div>

      {/* Bottom Dark Gradient Overlay (Hiển thị TÊN MẪU THIỆP) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent flex flex-col justify-end p-3.5 sm:p-4 text-left z-20 pointer-events-none">
        {/* Tên mẫu thiệp (ví dụ: Song Hỷ - Đỏ, Song Hỷ - Xanh, Elegant - Nâu...) */}
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
    </motion.div>
  );
}

