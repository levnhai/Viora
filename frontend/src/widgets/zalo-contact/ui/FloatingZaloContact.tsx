"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { MessageCircle, X, Sparkles } from "lucide-react";

interface FloatingZaloContactProps {
  phone?: string;
}

export function FloatingZaloContact({
  phone = "0842567202",
}: FloatingZaloContactProps) {
  const pathname = usePathname();
  const [showTooltip, setShowTooltip] = useState(true);

  if (pathname !== "/") return null;

  const zaloUrl = `https://zalo.me/${phone}`;

  return (
    <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center gap-2 select-none">
      {/* Tooltip Bubble Chat */}
      {showTooltip && (
        <div className="relative bg-slate-900 text-white text-xs font-semibold px-3 py-2 rounded-2xl shadow-xl border border-slate-700/80 flex items-center gap-2 animate-fade-in transition-all">
          <span className="flex items-center gap-1 text-[#0068ff]">
            <Sparkles size={13} className="animate-spin text-amber-400" />
            <span>Tư vấn Zalo 24/7</span>
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="text-slate-400 hover:text-white transition-colors cursor-pointer border-0 bg-transparent p-0.5"
            title="Đóng thông báo"
          >
            <X size={12} />
          </button>

          {/* Mũi tên chỉ sang bên phải */}
          <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-0 h-0 border-y-4 border-y-transparent border-l-6 border-l-slate-900" />
        </div>
      )}

      {/* Floating Zalo Button */}
      <a
        href={zaloUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative group flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-[#0068ff] to-[#0052cc] text-white shadow-2xl shadow-blue-600/40 hover:shadow-blue-600/60 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer text-decoration-none"
        title="Chat Zalo hỗ trợ ngay"
      >
        {/* Continuous Ping Wave Animation */}
        <span className="absolute inset-0 rounded-full bg-[#0068ff] opacity-40 animate-ping" />

        {/* Pulsing Outer Ring */}
        <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#0068ff] to-[#0099ff] opacity-30 blur-xs group-hover:opacity-60 transition-opacity" />

        {/* Zalo Icon Text Badge */}
        <div className="relative flex flex-col items-center justify-center font-sans">
          <span className="text-[13px] font-black tracking-tighter leading-none text-white drop-shadow-sm">
            Zalo
          </span>
          <span className="text-[8px] font-bold uppercase tracking-wider text-blue-100 opacity-90 mt-0.5">
            CHAT
          </span>
        </div>

        {/* Online Status Dot */}
        <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" />
      </a>
    </div>
  );
}
