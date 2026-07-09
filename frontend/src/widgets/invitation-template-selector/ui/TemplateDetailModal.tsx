"use client";

import { X, Check, Eye } from "lucide-react";
import { Template } from "@/entities/template/api/template.api";
import { useInvitationCreate } from "@/views/admin-invitation-create/model/InvitationCreateProvider";

export function TemplateDetailModal() {
  const {
    activeTemplate,
    isTemplateModalOpen,
    setIsTemplateModalOpen,
    setTemplateId,
    setStep,
  } = useInvitationCreate();

  if (!isTemplateModalOpen || !activeTemplate) return null;

  const handleCreate = () => {
    setTemplateId(activeTemplate._id);
    setIsTemplateModalOpen(false);
    setStep("editor");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#1e1e2d]/80 backdrop-blur-sm"
        onClick={() => setIsTemplateModalOpen(false)}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-5xl flex overflow-hidden animate-in fade-in zoom-in-95 duration-200 h-[600px]">
        {/* Left: Big Image */}
        <div className="w-[45%] bg-slate-100 relative shrink-0 p-6 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10"></div>
          <img
            src={activeTemplate.thumbnail || "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=400&auto=format&fit=crop"}
            alt={activeTemplate.name}
            className="relative z-10 w-full h-full object-cover rounded-xl shadow-lg border-4 border-white"
          />
        </div>

        {/* Right: Info */}
        <div className="flex-1 p-8 flex flex-col overflow-y-auto custom-scrollbar">
          <button
            onClick={() => setIsTemplateModalOpen(false)}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>

          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold text-slate-800">
                {activeTemplate.name}
              </h2>
              {activeTemplate.tags?.includes("Mới") && (
                <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-600 text-[10px] font-bold uppercase tracking-wider">
                  Mới
                </span>
              )}
            </div>
            <p className="text-sm text-slate-500">
              Hoa mộc watercolor với tông xanh lá thanh nhã trên nền kem trắng
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {activeTemplate.tags?.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Features */}
          <div className="mb-8">
            <h3 className="text-sm font-bold text-slate-800 mb-4">Tính năng nổi bật</h3>
            <div className="grid grid-cols-2 gap-y-3 gap-x-4">
              {[
                "Tùy chỉnh nội dung",
                "RSVP xác nhận tham dự",
                "Google Maps",
                "Lời chúc & bình luận",
                "Album ảnh & Video",
                "QR Code chuyển khoản",
                "Timeline sự kiện",
                "Chia sẻ mạng xã hội",
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                  <Check size={16} className="text-emerald-500 shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* QR Code and Info */}
          <div className="flex items-center gap-6 mb-8 p-4 bg-slate-50 rounded-xl border border-slate-100">
            <div className="w-20 h-20 bg-white p-1 rounded-lg shadow-sm border border-slate-200 shrink-0">
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://wedding.com" alt="QR" className="w-full h-full" />
            </div>
            <div className="text-xs text-slate-500 leading-relaxed">
              Quét mã QR để xem demo trực tiếp trên điện thoại.
              <br />
              Tạo miễn phí • Thử 3 ngày • Đẹp mãi thanh xuân.
              <br />
              Bạn có thể đổi mẫu khác bất cứ lúc nào khi chỉnh sửa.
            </div>
          </div>

          <div className="mt-auto flex items-center gap-4 pt-4 border-t border-slate-100">
            <a
              href={activeTemplate.previewUrl || "#"}
              target="_blank"
              rel="noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 border-slate-200 text-slate-700 font-medium hover:border-slate-300 hover:bg-slate-50 transition-all"
            >
              <Eye size={18} /> Xem demo
            </a>
            <button
              onClick={handleCreate}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-rose-500 text-white font-medium hover:bg-rose-600 shadow-md shadow-rose-500/20 transition-all"
            >
              + Tạo từ template
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
