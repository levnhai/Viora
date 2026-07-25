"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X, Eye } from "lucide-react";
import { TemplateConfig } from "../model/schema";
import { CreateInvitationModal } from "./CreateInvitationModal";

interface PreviewModalProps {
  tpl: TemplateConfig;
  onClose: () => void;
  onRequestDesign: () => void;
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

export function PreviewModal({
  tpl,
  onClose,
}: PreviewModalProps) {
  const router = useRouter();
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handlePreviewDemo = () => {
    onClose();
    router.push(`/wedding-demo?templateId=${tpl.code}`);
  };

  return (
    <>
      {/* Original PreviewModal */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md"
        onClick={onClose}
      >
        <div
          className="relative bg-[#1c1b1b] border border-stone-800 rounded-[2rem] overflow-hidden shadow-2xl w-full max-w-[400px] max-h-[92vh] flex flex-col p-5 sm:p-6 text-white select-none text-left transition-all duration-300 scrollbar-none"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="flex items-start justify-between mb-3 shrink-0">
            <div className="space-y-1 pr-4">
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white font-sans">
                {tpl.name}
              </h2>
              <p className="text-xs text-stone-400 font-sans leading-relaxed">
                {getDetailedDesc(tpl)}
              </p>
              {/* Tag Pills */}
              <div className="flex items-center gap-1.5 pt-1 flex-wrap">
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

          {/* Modal Frame Preview (Center Invitation Preview) */}
          <div className="relative w-full aspect-[9/15] rounded-2xl overflow-hidden shadow-2xl border border-stone-800 bg-[#121110] shrink-0 my-3">
            <iframe
              src={`/wedding-demo?embed=true&templateId=${tpl.code}`}
              className="w-full h-full border-0"
              title="Wedding Invitation Demo"
            />
          </div>

          {/* Modal Footer Info */}
          <div className="text-center text-[11px] text-stone-400 space-y-0.5 my-2 shrink-0 font-sans">
            <p className="font-medium text-stone-300">Tạo miễn phí - Thử 3 ngày - Đẹp mới thanh toán</p>
            <p className="text-[10px] text-stone-500">Bạn có thể đổi mẫu bất cứ lúc nào khi chỉnh sửa</p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2.5 pt-2 shrink-0">
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex-1 py-3 px-4 rounded-full bg-[#ff007a] hover:bg-pink-600 active:scale-95 text-white font-bold text-xs tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer border-0 shadow-lg shadow-pink-600/30"
            >
              <span>+</span> Tạo thiệp
            </button>
            <button
              onClick={handlePreviewDemo}
              className="flex-1 py-3 px-4 rounded-full border border-stone-700 hover:border-stone-500 bg-transparent hover:bg-white/5 active:scale-95 text-white font-bold text-xs tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer"
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
