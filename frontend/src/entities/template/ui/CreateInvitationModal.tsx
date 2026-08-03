"use client";

import { useState } from "react";
import { X, User, Phone, FileText, CheckCircle2, Send, Lock } from "lucide-react";
import { TemplateConfig } from "../model/schema";

interface CreateInvitationModalProps {
  tpl?: TemplateConfig | null;
  onClose: () => void;
}

export function CreateInvitationModal({
  tpl,
  onClose,
}: CreateInvitationModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg("Vui lòng nhập họ và tên");
      return;
    }
    if (!phone.trim()) {
      setErrorMsg("Vui lòng nhập số điện thoại (Zalo)");
      return;
    }

    setErrorMsg("");
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/template-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          notes: notes.trim(),
          templateCode: tpl?.code || "",
          templateName: tpl?.name || "",
        }),
      });

      const data = await res.json();
      if (data.success) {
        setIsSubmitting(false);
        setIsSubmitted(true);
      } else {
        setErrorMsg(data.message || "Gửi yêu cầu thất bại. Vui lòng thử lại.");
        setIsSubmitting(false);
      }
    } catch (err) {
      setErrorMsg("Đã xảy ra lỗi kết nối. Vui lòng thử lại.");
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative bg-white border border-stone-200/90 rounded-[2.2rem] overflow-hidden shadow-2xl w-full max-w-[420px] p-6 sm:p-7 text-slate-900 select-none text-left transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-500 hover:text-stone-900 transition-colors cursor-pointer border-0 z-10"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Header */}
            <div className="space-y-1.5 pr-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 border border-pink-200/80 text-[#ff007a] text-[11px] font-bold uppercase tracking-wider">
                <span>🌸</span>
                <span>Tạo thiệp cưới Viora</span>
              </div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight font-sans">
                Đăng ký tạo thiệp
              </h2>
              {tpl && (
                <div className="bg-pink-50/70 border border-pink-100 text-xs font-medium text-slate-600 px-3.5 py-2 rounded-2xl flex items-center justify-between">
                  <div>
                    <span className="block text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Mẫu đã chọn</span>
                    <span className="font-bold text-slate-900">{tpl.name}</span>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-black uppercase text-white ${
                      tpl.tier === 'pro' ? 'bg-gradient-to-r from-amber-500 to-pink-600' :
                      tpl.tier === 'standard' ? 'bg-blue-600' : 'bg-emerald-600'
                    }`}>
                      Gói {tpl.tier ? tpl.tier.toUpperCase() : 'BASIC'}
                    </span>
                    <span className="block font-black text-[#ff007a] text-sm font-mono mt-0.5">
                      {tpl.price ? `${tpl.price.toLocaleString('vi-VN')}đ` : '99.000đ'}
                    </span>
                  </div>
                </div>
              )}
              <p className="text-xs text-slate-500 font-sans leading-relaxed pt-0.5">
                Vui lòng điền thông tin bên dưới, chuyên viên Viora Studio sẽ liên hệ hỗ trợ bạn tạo thiệp ngay lập tức!
              </p>
            </div>

            {/* Error message */}
            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-semibold">
                {errorMsg}
              </div>
            )}

            {/* Field: Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <User size={14} className="text-[#ff007a]" />
                <span>Họ và tên <span className="text-[#ff007a]">*</span></span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nhập họ và tên của bạn..."
                className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-[#ff007a] focus:bg-white text-slate-900 text-xs font-sans focus:outline-none focus:ring-4 focus:ring-pink-500/10 transition-all placeholder:text-stone-400 font-medium"
                required
              />
            </div>

            {/* Field: Phone */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Phone size={14} className="text-[#ff007a]" />
                <span>Số điện thoại (Zalo) <span className="text-[#ff007a]">*</span></span>
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Nhập số điện thoại của bạn..."
                className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-[#ff007a] focus:bg-white text-slate-900 text-xs font-sans focus:outline-none focus:ring-4 focus:ring-pink-500/10 transition-all placeholder:text-stone-400 font-medium"
                required
              />
            </div>

            {/* Field: Notes */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <FileText size={14} className="text-[#ff007a]" />
                <span>Ghi chú thêm</span>
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Nhập ngày cưới, câu hỏi hoặc yêu cầu chỉnh sửa riêng (nếu có)..."
                rows={3}
                className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 focus:border-[#ff007a] focus:bg-white text-slate-900 text-xs font-sans focus:outline-none focus:ring-4 focus:ring-pink-500/10 transition-all placeholder:text-stone-400 font-medium resize-none"
              />
            </div>

            {/* Submit button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#ff007a] to-[#db2777] hover:from-[#e0006c] hover:to-[#be185d] active:scale-95 text-white font-black text-sm tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer border-0 shadow-xl shadow-pink-500/25 disabled:opacity-60"
              >
                {isSubmitting ? (
                  <span>Đang gửi yêu cầu...</span>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Gửi yêu cầu tạo thiệp</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-[11px] text-center text-slate-400 font-sans flex items-center justify-center gap-1 pt-1">
              <Lock size={12} className="text-emerald-500" />
              <span>Thông tin của bạn được bảo mật tuyệt đối 100%.</span>
            </p>
          </form>
        ) : (
          /* Success State */
          <div className="py-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-500 mx-auto shadow-sm">
              <CheckCircle2 size={36} />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-2xl font-black text-slate-900">Gửi yêu cầu thành công!</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-sans max-w-xs mx-auto">
                Cảm ơn <span className="font-bold text-[#ff007a]">{name}</span>! Chuyên viên tư vấn Viora Studio đã nhận được thông tin và sẽ gọi điện/nhắn Zalo hỗ trợ bạn tạo thiệp ngay trong 15 phút.
              </p>
            </div>
            <button
              onClick={onClose}
              className="mt-4 px-8 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs cursor-pointer border-0 transition-all shadow-md"
            >
              Đã hiểu &amp; Đóng
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
