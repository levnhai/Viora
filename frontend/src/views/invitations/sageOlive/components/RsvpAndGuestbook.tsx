import { useState } from "react";
import { WeddingData } from "@/entities/invitation/model/types";
import { AnimateView } from "@/widgets/invitation-blocks";
import { Heart, Send, CheckCircle2, MessageSquare } from "lucide-react";

interface RsvpAndGuestbookProps {
  weddingData: WeddingData;
  guestName?: string;
  messages: Array<{ name: string; message: string; createdAt?: string }>;
  onSendMessage: (name: string, msg: string) => Promise<void>;
  onOpenGiftModal: () => void;
}

export function RsvpAndGuestbook({
  weddingData,
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
    <section className="relative w-full bg-white text-[#5D733F] pt-8 pb-4 px-3 overflow-hidden">
      <div className="max-w-[430px] mx-auto">
        {/* 1. Lời dẫn xác nhận tham dự (y=4061.5, font Lora 16px #5D733F) */}
        <AnimateView animation="fadeInUp" duration={1}>
          <div className="text-center font-lora text-[15px] sm:text-[16px] text-[#5D733F] leading-relaxed mb-4">
            <p>Hãy xác nhận sự có mặt của Quý Khách để gia đình</p>
            <p>chúng tôi chuẩn bị đón tiếp một cách chu đáo nhất.</p>
            <p className="font-medium mt-0.5">Trân trọng!</p>
          </div>
        </AnimateView>

        {/* 2. Form RSVP (y=4147.3) */}
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
                className="w-full h-10 px-4 rounded-full border border-[#5D733F] bg-transparent text-[#5D733F] placeholder:text-[#5D733F] text-[15px] sm:text-[16px] font-lora focus:outline-none focus:ring-1 focus:ring-[#5D733F] transition-all"
              />
            </div>

            {/* Textarea Wishes */}
            <div>
              <textarea
                placeholder="Nhập lời chúc của Quý Khách"
                value={wishes}
                onChange={(e) => setWishes(e.target.value)}
                rows={3}
                required
                className="w-full h-24 p-3 rounded-[18px] border border-[#5D733F] bg-transparent text-[#5D733F] placeholder:text-[#5D733F] text-[15px] sm:text-[16px] font-lora resize-none focus:outline-none focus:ring-1 focus:ring-[#5D733F] transition-all"
              />
            </div>

            {/* Attendance Select */}
            <div>
              <select
                value={attendance}
                onChange={(e) => setAttendance(e.target.value)}
                className="w-full h-10 px-4 pr-8 rounded-full border border-[#5D733F] bg-transparent text-[#5D733F] text-[15px] sm:text-[16px] font-lora focus:outline-none focus:ring-1 focus:ring-[#5D733F] appearance-none cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 24'%3E%3Cpolygon points='0,0 32,0 16,24' style='fill:rgb(93,115,63)'/%3E%3C/svg%3E")`,
                  backgroundSize: "9px 6px",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 0.8rem center",
                }}
              >
                <option value="Tôi sẽ tham dự">Tôi sẽ tham dự</option>
                <option value="Xin lỗi! Tôi không thể tham dự">
                  Xin lỗi! Tôi không thể tham dự
                </option>
              </select>
            </div>

            {/* Feedback alert */}
            {submitted && (
              <div className="flex items-center gap-2 text-xs sm:text-sm text-emerald-800 bg-emerald-50 border border-emerald-300 p-2.5 rounded-full font-lora text-center justify-center">
                <CheckCircle2 size={16} />
                <span>ĐÃ GỬI THÀNH CÔNG ❤️</span>
              </div>
            )}

            {/* Buttons Row: Submit & Heart Button */}
            <div className="flex gap-2.5 pt-1">
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 min-h-[40px] rounded-full bg-[#5D733F] text-white font-lora text-[14px] uppercase tracking-normal font-normal shadow-sm hover:bg-[#4d6034] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <span>{submitting ? "ĐANG GỬI..." : "GỬI LỜI CHÚC & XÁC NHẬN"}</span>
              </button>

              <button
                type="button"
                onClick={() => setShowWishesModal(true)}
                className="w-10 h-10 min-h-[40px] rounded-full bg-[#5D733F] text-white flex items-center justify-center shadow-sm hover:bg-[#4d6034] active:scale-95 transition-all shrink-0 cursor-pointer"
                title="Xem danh sách phản hồi"
                aria-label="Xem danh sách phản hồi"
              >
                <Heart size={18} className="fill-white" />
              </button>
            </div>
          </form>
        </AnimateView>

        {/* 3. Nút Lớn: GỬI QUÀ MỪNG CƯỚI (y=4439.3, w: 395px, h: 39px, Lora 14px uppercase) */}
        <AnimateView animation="fadeInUp" delay={0.15} duration={1} className="mt-3">
          <button
            onClick={onOpenGiftModal}
            className="w-full h-10 rounded-full bg-[#5D733F] text-white font-lora text-[14px] uppercase tracking-normal font-normal shadow-sm hover:bg-[#4d6034] active:scale-[0.98] transition-all flex items-center justify-center cursor-pointer"
          >
            GỬI QUÀ MỪNG CƯỚI
          </button>
        </AnimateView>
      </div>

      {/* Modal Popup Danh Sách Phản Hồi (popup_info) */}
      {showWishesModal && (
        <div
          className="fixed inset-0 z-[110] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 select-none animate-in fade-in duration-200"
          onClick={() => setShowWishesModal(false)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-[400px] max-h-[80vh] flex flex-col overflow-hidden shadow-2xl border border-[#5D733F]/20 text-[#30451c]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 bg-[#5D733F] text-white flex justify-between items-center shrink-0">
              <h3 className="font-lora text-[15px] font-semibold uppercase tracking-wider">
                DANH SÁCH PHẢN HỒI ({messages ? messages.length : 0})
              </h3>
              <button
                onClick={() => setShowWishesModal(false)}
                className="w-7 h-7 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20"
              >
                ✕
              </button>
            </div>

            <div className="p-4 overflow-y-auto space-y-3 flex-1">
              {messages && messages.length > 0 ? (
                messages.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-[#FAF8F5] rounded-xl border-l-2 border-[#5D733F] font-lora text-xs shadow-sm"
                  >
                    <p className="font-bold text-[#30451c] mb-1">{m.name}</p>
                    <p className="text-[#5D733F] italic leading-relaxed">
                      &ldquo;{m.message}&rdquo;
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-center font-lora text-sm text-gray-500 py-8">
                  Chưa có phản hồi nào.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

