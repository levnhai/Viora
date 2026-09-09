import { useState, useEffect } from "react";
import { WeddingData } from "@/entities/invitation/model/types";
import { AnimateView } from "@/widgets/invitation-blocks";
import { Heart, CheckCircle2 } from "lucide-react";

import { GuestMessage } from "@/shared/lib/hooks";

interface RsvpAndGuestbookProps {
  weddingData: WeddingData;
  guestName?: string;
  messages: GuestMessage[];
  onSendMessage: (name: string, msg: string) => Promise<void>;
  onOpenGiftModal: () => void;
}

export function RsvpAndGuestbook({
  guestName: prefilledName,
  messages,
  onSendMessage,
  onOpenGiftModal,
}: RsvpAndGuestbookProps) {
  const [name, setName] = useState(prefilledName || "");
  const [wishes, setWishes] = useState("");
  const [attendance, setAttendance] = useState("Tôi sẽ tham dự");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showWishesModal, setShowWishesModal] = useState(false);

  // Tự động điền tên nếu khách mời có link định danh
  useEffect(() => {
    if (prefilledName && !name) {
      setName(prefilledName);
    }
  }, [prefilledName]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Vui lòng nhập tên của Quý Khách");
      return;
    }
    setSubmitting(true);
    try {
      const fullMsg = `${wishes.trim()} (${attendance})`;
      await onSendMessage(name.trim(), fullMsg);
      setSubmitted(true);
      setWishes("");
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="relative w-full bg-white text-[#2C6E91] pt-8 pb-6 px-4 sm:px-6 md:px-8 overflow-hidden">
      <div className="w-full max-w-2xl mx-auto">
        {/* 1. Lời dẫn xác nhận tham dự */}
        <AnimateView animation="fadeInUp" duration={1}>
          <div className="text-center font-lora text-[15px] sm:text-[16px] text-[#2C6E91] leading-relaxed mb-4">
            <p>Hãy xác nhận sự có mặt của Quý Khách để gia đình</p>
            <p>chúng tôi chuẩn bị đón tiếp một cách chu đáo nhất.</p>
            <p className="font-medium mt-0.5">Trân trọng!</p>
          </div>
        </AnimateView>

        {/* 2. Form RSVP */}
        <AnimateView animation="fadeInUp" delay={0.1} duration={1}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 py-2">
            {/* Input Name */}
            <div>
              <input
                type="text"
                placeholder="Tên của Quý Khách?"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full h-11 px-4 rounded-full border border-[#2C6E91]/40 bg-white text-[#2C6E91] placeholder:text-[#2C6E91]/60 text-[15px] sm:text-[16px] font-lora focus:outline-none focus:border-[#2C6E91] focus:ring-1 focus:ring-[#2C6E91] transition-all shadow-sm"
              />
            </div>

            {/* Textarea Wishes */}
            <div>
              <textarea
                placeholder="Nhập lời chúc tốt đẹp gửi đến đôi uyên ương..."
                value={wishes}
                onChange={(e) => setWishes(e.target.value)}
                rows={3}
                required
                className="w-full h-24 p-3 rounded-2xl border border-[#2C6E91]/40 bg-white text-[#2C6E91] placeholder:text-[#2C6E91]/60 text-[15px] sm:text-[16px] font-lora resize-none focus:outline-none focus:border-[#2C6E91] focus:ring-1 focus:ring-[#2C6E91] transition-all shadow-sm"
              />
            </div>

            {/* Attendance Select */}
            <div>
              <select
                value={attendance}
                onChange={(e) => setAttendance(e.target.value)}
                className="w-full h-11 px-4 pr-8 rounded-full border border-[#2C6E91]/40 bg-white text-[#2C6E91] text-[15px] sm:text-[16px] font-lora focus:outline-none focus:border-[#2C6E91] focus:ring-1 focus:ring-[#2C6E91] appearance-none cursor-pointer shadow-sm transition-all"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 24'%3E%3Cpolygon points='0,0 32,0 16,24' style='fill:rgb(44,110,145)'/%3E%3C/svg%3E")`,
                  backgroundSize: "9px 6px",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 1rem center",
                }}
              >
                <option value="Tôi sẽ tham dự">Tôi sẽ tham dự (1 người)</option>
                <option value="Tôi và người thương sẽ tham dự">Tôi và người thương sẽ tham dự (2 người)</option>
                <option value="Tôi và gia đình sẽ tham dự">Tôi và gia đình sẽ tham dự</option>
                <option value="Xin lỗi! Tôi không thể tham dự">
                  Xin lỗi! Tôi không thể tham dự
                </option>
              </select>
            </div>

            {/* Feedback alert */}
            {submitted && (
              <div className="flex items-center gap-2 text-xs sm:text-sm text-emerald-800 bg-emerald-50 border border-emerald-300 p-2.5 rounded-full font-lora text-center justify-center animate-in fade-in zoom-in-95 duration-300">
                <CheckCircle2 size={16} />
                <span>GỬI LỜI CHÚC THÀNH CÔNG ❤️</span>
              </div>
            )}

            {/* Buttons Row */}
            <div className="flex gap-2.5 pt-1">
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 min-h-[42px] rounded-full bg-[#2C6E91] text-white font-lora text-[14px] uppercase tracking-normal font-medium shadow-md hover:bg-[#1f5470] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <span>{submitting ? "ĐANG GỬI..." : "GỬI LỜI CHÚC & XÁC NHẬN"}</span>
              </button>

              <button
                type="button"
                onClick={() => setShowWishesModal(true)}
                className="w-11 h-11 min-h-[42px] rounded-full bg-[#2C6E91] text-white flex items-center justify-center shadow-md hover:bg-[#1f5470] active:scale-95 transition-all shrink-0 cursor-pointer relative"
                title="Xem danh sách phản hồi"
                aria-label="Xem danh sách phản hồi"
              >
                <Heart size={18} className="fill-white" />
                {messages && messages.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {messages.length > 99 ? "99+" : messages.length}
                  </span>
                )}
              </button>
            </div>
          </form>
        </AnimateView>

        {/* 3. Nút Lớn: GỬI QUÀ MỪNG CƯỚI */}
        <AnimateView animation="fadeInUp" delay={0.15} duration={1} className="mt-3">
          <button
            onClick={onOpenGiftModal}
            className="w-full h-11 rounded-full bg-[#2C6E91] text-white font-lora text-[14px] uppercase tracking-normal font-medium shadow-md hover:bg-[#1f5470] active:scale-[0.98] transition-all flex items-center justify-center cursor-pointer"
          >
            GỬI QUÀ MỪNG CƯỚI
          </button>
        </AnimateView>
      </div>

      {/* Modal Popup Danh Sách Phản Hồi */}
      {showWishesModal && (
        <div
          className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 select-none animate-in fade-in duration-200"
          onClick={() => setShowWishesModal(false)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-[440px] sm:max-w-lg max-h-[80vh] flex flex-col overflow-hidden shadow-2xl border border-[#2C6E91]/20 text-[#2C2018]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 bg-[#2C6E91] text-white flex justify-between items-center shrink-0">
              <h3 className="font-lora text-[15px] font-semibold uppercase tracking-wider">
                DANH SÁCH LỜI CHÚC ({messages ? messages.length : 0})
              </h3>
              <button
                onClick={() => setShowWishesModal(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-colors cursor-pointer text-lg"
              >
                ✕
              </button>
            </div>

            <div className="p-4 overflow-y-auto space-y-3 flex-1 divide-y divide-stone-100">
              {messages && messages.length > 0 ? (
                messages.map((m, idx) => (
                  <div
                    key={idx}
                    className="pt-3 first:pt-0 p-3 bg-[#FAF8F5] rounded-xl border-l-3 border-[#2C6E91] font-lora text-xs shadow-xs"
                  >
                    <p className="font-bold text-[#2C2018] text-sm mb-1">{m.name}</p>
                    <p className="text-[#2C6E91] italic leading-relaxed text-[13px]">
                      &ldquo;{m.msg || (m as any).message}&rdquo;
                    </p>
                  </div>
                ))
              ) : (
                <div className="text-center font-lora text-sm text-stone-500 py-10 space-y-2">
                  <p>Chưa có lời chúc nào.</p>
                  <p className="text-xs text-[#2C6E91]">Hãy là người đầu tiên gửi lời chúc tốt đẹp nhất!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

