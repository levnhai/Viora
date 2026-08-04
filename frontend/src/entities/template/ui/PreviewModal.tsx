"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X, Eye, ShieldCheck, Zap, Crown } from "lucide-react";
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

  const targetSlug = demoSlug || "vanan-thibinh";

  const getIframeUrl = () => {
    let url = `/w/${targetSlug}?embed=true`;
    if (groomName.trim()) url += `&groom=${encodeURIComponent(groomName.trim())}`;
    if (brideName.trim()) url += `&bride=${encodeURIComponent(brideName.trim())}`;
    return url;
  };

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
      {/* Original PreviewModal */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md"
        onClick={onClose}
      >
        <div
          className="relative bg-[#1c1b1b] border border-stone-800 rounded-[2rem] overflow-hidden shadow-2xl w-full max-w-[440px] h-[92vh] sm:h-[88vh] flex flex-col justify-between p-4 sm:p-6 text-white select-none text-left transition-all duration-300 scrollbar-none"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="flex items-start justify-between mb-2 shrink-0">
            <div className="space-y-1 pr-4">
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white font-sans">
                  {tpl.name}
                </h2>
                {tpl.tier === "basic" && (
                  <span className="bg-emerald-600/90 text-white text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full border border-emerald-400/40 shrink-0 flex items-center gap-1">
                    <ShieldCheck size={11} className="text-emerald-300" />
                    Cơ Bản
                  </span>
                )}
                {tpl.tier === "standard" && (
                  <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-600 text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border border-pink-400/40 shrink-0 flex items-center gap-1">
                    <Zap size={11} className="text-amber-300 fill-amber-300 animate-pulse" />
                    Tiêu Chuẩn
                  </span>
                )}
                {tpl.tier === "pro" && (
                  <span className="bg-gradient-to-r from-amber-500 via-pink-600 to-purple-600 text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border border-amber-300/40 shrink-0 flex items-center gap-1">
                    <Crown size={11} className="text-amber-300 fill-amber-300" />
                    Cao Cấp
                  </span>
                )}
              </div>
              <p className="text-xs text-stone-400 font-sans leading-relaxed">
                {getDetailedDesc(tpl)}
              </p>
              {/* Tag Pills & Price Tag */}
              <div className="flex items-center gap-1.5 pt-1 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full bg-pink-500/20 text-pink-300 text-[10px] font-bold font-sans border border-pink-500/30">
                  {tpl.price ? `${tpl.price.toLocaleString("vi-VN")}đ` : "Miễn phí"}
                </span>
                {getTemplateTags(tpl).map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-0.5 rounded-full bg-white/10 text-stone-300 text-[10px] font-medium font-sans border border-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 flex items-center justify-center text-stone-300 hover:text-white transition-colors cursor-pointer shrink-0 border-0"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
          </div>

          {/* Quick Name Sandbox Bar */}
          <div className="bg-stone-900/90 border border-stone-800/80 rounded-xl p-2 my-1 shrink-0 flex gap-2 items-center text-xs">
            <span className="text-pink-400 font-medium text-[11px] shrink-0 font-sans pl-1">✍️ Thử nhập tên:</span>
            <input
              type="text"
              placeholder="Tên chú rể"
              value={groomName}
              onChange={(e) => setGroomName(e.target.value)}
              className="w-1/2 bg-stone-950 border border-stone-800 rounded-lg px-2 py-1 text-white placeholder-stone-500 focus:outline-none focus:border-pink-500 text-[11px]"
            />
            <input
              type="text"
              placeholder="Tên cô dâu"
              value={brideName}
              onChange={(e) => setBrideName(e.target.value)}
              className="w-1/2 bg-stone-950 border border-stone-800 rounded-lg px-2 py-1 text-white placeholder-stone-500 focus:outline-none focus:border-pink-500 text-[11px]"
            />
          </div>

          {/* Modal Frame Preview (Center Invitation Preview) */}
          <div className="relative w-full flex-1 min-h-[300px] aspect-[9/16] mx-auto rounded-2xl overflow-hidden shadow-2xl border border-stone-800 bg-[#121110] my-1 sm:my-2">
            <iframe
              src={getIframeUrl()}
              className="w-full h-full border-0"
              title="Wedding Invitation Demo"
            />
          </div>

          {/* Action Buttons - Always visible */}
          <div className="flex gap-2.5 pt-2 shrink-0 bg-[#1c1b1b] z-10">
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex-1 py-3 px-4 rounded-full bg-[#ff007a] hover:bg-pink-600 active:scale-95 text-white font-bold text-xs sm:text-sm tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer border-0 shadow-lg shadow-pink-600/30"
            >
              <span>+</span> Tạo thiệp ({tpl.price ? `${tpl.price / 1000}k` : "Miễn phí"})
            </button>
            <button
              onClick={handlePreviewDemo}
              className="flex-1 py-3 px-4 rounded-full border border-stone-700 hover:border-stone-500 bg-transparent hover:bg-white/5 active:scale-95 text-white font-bold text-xs sm:text-sm tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Eye size={14} /> Xem demo
            </button>
          </div>
        </div>
      </div>

      {/* Form Đăng Ký Tạo Thiệp Modal hiển thị đè lên trên và giữ nguyên PreviewModal ở dưới */}
      {showCreateModal && (
        <CreateInvitationModal
          tpl={tpl}
          onClose={() => setShowCreateModal(false)}
        />
      )}
    </>
  );
}
