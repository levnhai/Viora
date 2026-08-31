"use client";

import { useState } from "react";
import { Sparkles, Heart } from "lucide-react";

export interface GatefoldCurtainOverlayProps {
  onComplete?: () => void;
  accentColor?: string;
  gradientTop?: string;
  gradientBottom?: string;
}

export function GatefoldCurtainOverlay({
  onComplete,
  accentColor = "#5D733F",
  gradientTop = "#6F884E",
  gradientBottom = "#4A5D32",
}: GatefoldCurtainOverlayProps) {
  const [opened, setOpened] = useState(false);
  const [hidden, setHidden] = useState(false);

  const handleOpen = () => {
    if (opened) return;
    setOpened(true);
    setTimeout(() => {
      setHidden(true);
      if (onComplete) onComplete();
    }, 1200);
  };

  if (hidden) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center select-none overflow-hidden transition-opacity duration-700 ${
        opened ? "pointer-events-none" : "pointer-events-auto"
      }`}
    >
      {/* Cánh Trái */}
      <div
        className={`absolute top-0 left-0 w-1/2 h-full shadow-2xl transition-transform duration-1000 ease-[cubic-bezier(0.77,0,0.175,1)] ${
          opened ? "-translate-x-full" : "translate-x-0"
        }`}
        style={{
          backgroundColor: accentColor,
          backgroundImage: `
            repeating-linear-gradient(90deg, transparent, transparent 16px, rgba(0,0,0,0.06) 16px, rgba(0,0,0,0.06) 32px),
            linear-gradient(180deg, ${gradientTop} 0%, ${accentColor} 50%, ${gradientBottom} 100%)
          `,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/30 pointer-events-none" />
      </div>

      {/* Cánh Phải */}
      <div
        className={`absolute top-0 right-0 w-1/2 h-full shadow-2xl transition-transform duration-1000 ease-[cubic-bezier(0.77,0,0.175,1)] ${
          opened ? "translate-x-full" : "translate-x-0"
        }`}
        style={{
          backgroundColor: accentColor,
          backgroundImage: `
            repeating-linear-gradient(90deg, transparent, transparent 16px, rgba(0,0,0,0.06) 16px, rgba(0,0,0,0.06) 32px),
            linear-gradient(180deg, ${gradientTop} 0%, ${accentColor} 50%, ${gradientBottom} 100%)
          `,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-l from-black/20 via-transparent to-black/30 pointer-events-none" />
      </div>

      {/* Con Dấu Sáp Tròn Ở Giữa */}
      <div
        onClick={handleOpen}
        className={`relative z-20 flex flex-col items-center justify-center cursor-pointer transition-all duration-700 ${
          opened ? "scale-150 opacity-0" : "scale-100 opacity-100 hover:scale-105"
        }`}
      >
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#EFECE6] border-4 border-[#C9C4B8] shadow-[0_10px_35px_rgba(0,0,0,0.4)] flex flex-col items-center justify-center p-2 text-[#30451c]">
          <div
            className="w-full h-full rounded-full border border-dashed flex flex-col items-center justify-center text-center p-1"
            style={{ borderColor: `${accentColor}80` }}
          >
            <Heart size={20} style={{ color: accentColor, fill: accentColor }} className="mb-1 animate-pulse" />
            <span
              className="text-[12px] uppercase tracking-[0.25em] font-serif font-bold"
              style={{ color: accentColor, fontFamily: "'Lora', serif" }}
            >
              MỞ THIỆP
            </span>
            <span
              className="text-[9px] uppercase tracking-widest font-sans mt-0.5"
              style={{ color: `${accentColor}B3` }}
            >
              Open Invitation
            </span>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-1.5 text-white/90 text-xs font-serif tracking-widest uppercase bg-black/30 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/20">
          <Sparkles size={12} />
          <span>Chạm để mở thiệp</span>
        </div>
      </div>
    </div>
  );
}
