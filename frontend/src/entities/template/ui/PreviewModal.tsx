"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X, Eye, ShieldCheck, Zap, Crown, Loader2 } from "lucide-react";
import { TemplateConfig } from "../model/schema";
import { CreateInvitationModal } from "./CreateInvitationModal";

interface PreviewModalProps {
  tpl: TemplateConfig;
  demoSlug?: string;
  onClose: () => void;
  onRequestDesign?: () => void;
  onSelectTemplate?: (tpl: TemplateConfig) => void;
}

// Helper to get custom descriptive text for each template
const getDetailedDesc = (tpl: TemplateConfig) => {
  switch (tpl.id) {
    case 1:
      return "Chữ Hỷ nền xanh lá, khung ảnh cung, phong bì 囍";
    case 2:
      return "Thiết kế nâu phong cách Minimalism tinh tế, thanh lịch";
    case 3:
      return "Họa tiết hoa mộc xanh tươi mới, lãng mạn trang nhã";
    case 4:
      return "Phong cách truyền thống Song Hỷ tone đỏ rực rỡ cát tường";
    default:
      return `Mẫu thiệp phong cách ${tpl.style.toLowerCase()} tinh tế với tông màu đặc trưng.`;
  }
};

// Helper to get custom tags for each template
const getTemplateTags = (tpl: TemplateConfig) => {
  if (tpl.tags && tpl.tags.length > 0) return tpl.tags;
  switch (tpl.id) {
    case 1:
      return ["Truyền thống", "Chữ Hỷ"];
    case 2:
      return ["Tối giản", "Thanh lịch"];
    case 3:
      return ["Hoa lá", "Lãng mạn"];
    case 4:
      return ["Truyền thống", "Đỏ rực"];
    default:
      return [tpl.style, "Nổi bật"];
  }
};

export function PreviewModal({ tpl, demoSlug, onClose }: PreviewModalProps) {
  const router = useRouter();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [groomName, setGroomName] = useState("");
  const [brideName, setBrideName] = useState("");
  const [debouncedGroom, setDebouncedGroom] = useState("");
  const [debouncedBride, setDebouncedBride] = useState("");
  const [isIframeLoading, setIsIframeLoading] = useState(true);

  // Debounce input tránh reload iframe liên tục mỗi khi gõ phím
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedGroom(groomName.trim());
      setDebouncedBride(brideName.trim());
    }, 450);
    return () => clearTimeout(handler);
  }, [groomName, brideName]);

  const targetSlug = demoSlug || "vanan-thibinh";

  const getIframeUrl = () => {
    let url = `/w/${targetSlug}?embed=true`;
    if (debouncedGroom) url += `&groom=${encodeURIComponent(debouncedGroom)}`;
    if (debouncedBride) url += `&bride=${encodeURIComponent(debouncedBride)}`;
    return url;
  };

  const iframeSrc = getIframeUrl();

  // Reset loading khi targetSlug hoặc debounced names thay đổi
  useEffect(() => {
    setIsIframeLoading(true);
  }, [iframeSrc]);

  const handlePreviewDemo = () => {
    onClose();
    let url = `/w/${targetSlug}`;
    const params = new URLSearchParams();
    if (groomName.trim()) params.append("groom", groomName.trim());
    if (brideName.trim()) params.append("bride", brideName.trim());
    if (params.toString()) url += `?${params.toString()}`;
    window.open(url, "_blank");
  };

  return (
    <>
      {/* PreviewModal Backdrop */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md transition-all duration-300 will-change-transform"
        onClick={onClose}
      >
        <div
          className="relative bg-[#141312] border border-[#e0b769]/20 rounded-[2rem] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.85)] w-full max-w-[440px] sm:max-w-[460px] h-[95vh] sm:h-[92vh] max-h-[880px] flex flex-col justify-between p-3 sm:p-4 text-white select-none text-left transition-all duration-300 scrollbar-none transform-gpu backdrop-blur-xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Ambient Glow background inside modal */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-36 bg-[#e0b769]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Modal Header (Ultra Compact) */}
          <div className="flex items-start justify-between mb-1 shrink-0 z-10">
            <div className="space-y-0.5 pr-2">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h2 className="text-base sm:text-lg font-serif font-normal tracking-wide text-white leading-tight">
                  {tpl.name}
                </h2>
                {tpl.tier === "basic" && (
                  <span className="bg-stone-800/80 text-stone-300 text-[8px] font-semibold uppercase px-2 py-0.5 rounded-full border border-stone-700/60 shrink-0 flex items-center gap-0.5">
                    <ShieldCheck size={9} className="text-stone-300" />
                    Cơ Bản
                  </span>
                )}
                {tpl.tier === "standard" && (
                  <span className="bg-[#e0b769]/15 text-[#e0b769] text-[8px] font-bold uppercase px-2 py-0.5 rounded-full border border-[#e0b769]/40 shrink-0 flex items-center gap-0.5 shadow-sm shadow-amber-900/30">
                    <Zap size={9} className="text-[#e0b769] fill-[#e0b769]" />
                    Tiêu Chuẩn
                  </span>
                )}
                {tpl.tier === "pro" && (
                  <span className="bg-gradient-to-r from-amber-500/20 to-amber-300/20 text-amber-200 text-[8px] font-bold uppercase px-2 py-0.5 rounded-full border border-amber-300/40 shrink-0 flex items-center gap-0.5">
                    <Crown size={9} className="text-amber-300 fill-amber-300" />
                    Cao Cấp
                  </span>
                )}
              </div>

              {/* Tag Pills & Price Tag (Compact Row) */}
              <div className="flex items-center gap-1 pt-0.5 flex-wrap">
                <span className="px-2 py-0.5 rounded-full bg-[#e0b769]/15 text-[#e0b769] text-[9px] font-bold font-sans border border-[#e0b769]/30">
                  {tpl.price ? `${tpl.price.toLocaleString("vi-VN")}đ` : "Miễn phí"}
                </span>
                {getTemplateTags(tpl).map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-full bg-white/5 text-stone-300 text-[9px] font-light font-sans border border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-stone-400 hover:text-white transition-all cursor-pointer shrink-0 border border-white/10"
              aria-label="Close modal"
            >
              <X size={13} />
            </button>
          </div>

          {/* Quick Name Sandbox Bar (Ultra Slim) */}
          <div className="bg-white/5 border border-white/10 rounded-xl px-2 py-1 my-1 shrink-0 flex items-center gap-1.5 text-xs backdrop-blur-md z-10">
            <span className="text-[#e0b769] font-medium text-[10px] shrink-0 font-sans pl-0.5 flex items-center gap-1">
              ✨ Thử tên:
            </span>
            <div className="flex items-center gap-1.5 w-full">
              <input
                type="text"
                placeholder="Tên chú rể"
                value={groomName}
                onChange={(e) => setGroomName(e.target.value)}
                className="w-1/2 bg-black/40 border border-white/10 focus:border-[#e0b769]/60 rounded-lg px-2 py-0.5 text-white placeholder-stone-500 focus:outline-none focus:bg-black/60 transition-all text-[10px]"
              />
              <input
                type="text"
                placeholder="Tên cô dâu"
                value={brideName}
                onChange={(e) => setBrideName(e.target.value)}
                className="w-1/2 bg-black/40 border border-white/10 focus:border-[#e0b769]/60 rounded-lg px-2 py-0.5 text-white placeholder-stone-500 focus:outline-none focus:bg-black/60 transition-all text-[10px]"
              />
            </div>
          </div>

          {/* Modal Frame Preview (Phone Viewport Maximized) */}
          <div className="relative w-full flex-1 min-h-0 mx-auto rounded-[1.2rem] overflow-hidden shadow-2xl border border-white/10 bg-black my-1 z-10 group">
            {/* Loading Indicator */}
            {isIframeLoading && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#121111] transition-opacity duration-300 space-y-2">
                <Loader2 className="w-7 h-7 animate-spin text-[#e0b769]" />
                <p className="text-[11px] text-stone-400 font-light animate-pulse tracking-wide">
                  Đang tải thiệp cưới...
                </p>
              </div>
            )}

            <iframe
              key={iframeSrc}
              src={iframeSrc}
              onLoad={() => setIsIframeLoading(false)}
              className={`w-full h-full border-0 transition-opacity duration-300 ${
                isIframeLoading ? "opacity-0" : "opacity-100"
              }`}
              title="Wedding Invitation Demo"
              loading="eager"
            />
          </div>

          {/* Action Buttons - Compact Golden & Dark Luxury Theme */}
          <div className="flex gap-2 pt-1 shrink-0 z-10">
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#e0b769] to-[#c5a880] text-stone-950 font-bold text-xs tracking-wide transition-all hover:brightness-110 active:scale-95 flex items-center justify-center gap-1 cursor-pointer border-0 shadow-lg shadow-amber-900/20"
            >
              <span>+</span> Tạo thiệp ({tpl.price ? `${tpl.price / 1000}k` : "Miễn phí"})
            </button>
            <button
              onClick={handlePreviewDemo}
              className="flex-1 py-2 px-3 rounded-xl border border-white/15 hover:border-white/30 bg-white/5 hover:bg-white/10 active:scale-95 text-white font-semibold text-xs tracking-wide transition-all flex items-center justify-center gap-1 cursor-pointer backdrop-blur-md"
            >
              <Eye size={13} className="text-stone-300" /> Xem demo
            </button>
          </div>
        </div>
      </div>

      {/* Form Đăng Ký Tạo Thiệp Modal */}
      {showCreateModal && (
        <CreateInvitationModal
          tpl={tpl}
          onClose={() => setShowCreateModal(false)}
        />
      )}
    </>
  );
}
