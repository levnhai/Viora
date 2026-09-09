"use client";

import { useState, useRef } from "react";
import { Heart, Sparkles, X } from "lucide-react";
import { GsapReveal } from "@/shared/ui/GsapReveal";
import { GuestMessage } from "@/entities/invitation/ui/GuestbookList";
import img_1 from "@/shared/assets/image/flower/img_1.png";

interface Guestbook_4Props {
  messages: GuestMessage[];
  onSendMessage: (name: string, msg: string) => void | Promise<any>;
  guestName?: string;
  primaryColor?: string;
  textColor?: string;
}

export function Guestbook_4({
  messages,
  onSendMessage,
  guestName: initialGuestName,
  textColor,
  primaryColor = "#d5a94d",
}: Guestbook_4Props) {
  const pColor = textColor || "#4e0b12";
  const [guestName, setGuestName] = useState(initialGuestName || "");
  const [guestMsg, setGuestMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [lastSubmitted, setLastSubmitted] = useState<{ name: string; msg: string } | null>(null);
  const listContainerRef = useRef<HTMLDivElement>(null);

  async function submitMessage(e: React.FormEvent) {
    e.preventDefault();
    const trimmedName = guestName.trim();
    const trimmedMsg = guestMsg.trim();
    if (!trimmedMsg || !trimmedName || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const res: any = await onSendMessage(trimmedName, trimmedMsg);
      if (res && res.success === false) {
        return;
      }
      setLastSubmitted({ name: trimmedName, msg: trimmedMsg });
      setShowSuccessModal(true);
      setGuestMsg("");
      setTimeout(() => {
        listContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
      }, 150);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  }

  const displayMessages = messages || [];

  return (
    <section className="py-12 sm:py-20 px-4 relative z-20 overflow-visible">
      <div className="max-w-xl mx-auto">
        <GsapReveal delay={0.2} direction="up" distance={40}>
          <div className="bg-[#f5eee6] p-6 sm:p-8 rounded-[24px] sm:rounded-[32px] shadow-lg relative border border-[#4e0b12]/10">
            {/* Decorative Flower - Bottom Left overlapping card */}
            <div className="absolute -left-6 sm:-left-12 -bottom-8 sm:-bottom-12 w-28 sm:w-40 z-20 pointer-events-none drop-shadow-xl">
              <img
                src={img_1.src || (img_1 as unknown as string)}
                alt=""
                className="w-full h-auto"
              />
            </div>

            <div className="text-center mb-6">
              <h2
                className="text-xl sm:text-2xl font-serif uppercase tracking-[0.2em] font-bold"
                style={{ color: pColor }}
              >
                SỔ LƯU BÚT
              </h2>
            </div>

            <form onSubmit={submitMessage} className="space-y-4 relative z-10">
              <div>
                <input
                  required
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="Nhập tên*"
                  className="w-full px-4 py-3 bg-[#fdfbf6]/90 border rounded-xl text-sm transition-colors outline-none font-serif"
                  style={{ color: pColor, borderColor: `${pColor}4d` }}
                  onFocus={(e) => (e.target.style.borderColor = pColor)}
                  onBlur={(e) => (e.target.style.borderColor = `${pColor}4d`)}
                />
              </div>
              <div>
                <textarea
                  required
                  value={guestMsg}
                  onChange={(e) => setGuestMsg(e.target.value)}
                  placeholder="Nhập lời chúc*"
                  rows={3}
                  className="w-full px-4 py-3 bg-[#fdfbf6]/90 border rounded-xl text-sm transition-colors resize-none outline-none font-serif"
                  style={{ color: pColor, borderColor: `${pColor}4d` }}
                  onFocus={(e) => (e.target.style.borderColor = pColor)}
                  onBlur={(e) => (e.target.style.borderColor = `${pColor}4d`)}
                />
              </div>
              <div className="flex justify-between items-center pt-2">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg opacity-80"
                  style={{ backgroundColor: `${pColor}15` }}
                >
                  🪄
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 font-serif rounded-full text-xs sm:text-sm font-semibold hover:opacity-90 active:scale-98 transition-all uppercase tracking-widest shadow-md disabled:opacity-50 cursor-pointer"
                  style={{ backgroundColor: pColor, color: "#fdfbf6" }}
                >
                  {isSubmitting ? "ĐANG GỬI..." : "GỬI LỜI CHÚC"}
                </button>
              </div>
            </form>
          </div>
        </GsapReveal>

        {/* Messages List */}
        {displayMessages && displayMessages.length > 0 ? (
          <GsapReveal
            delay={0.4}
            direction="up"
            distance={40}
            className="mt-8 sm:mt-10"
          >
            {/* Header & Counter */}
            <div className="flex items-center justify-between mb-4 px-2">
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg">💌</span>
                <h3
                  className="font-serif text-sm sm:text-base font-bold uppercase tracking-wider text-[#fdfbf6] drop-shadow-sm"
                >
                  Lời Chúc Từ Khách Quý
                </h3>
              </div>
              <span
                className="text-[11px] sm:text-xs font-sans font-medium px-3 py-1 rounded-full backdrop-blur-md border shadow-sm"
                style={{
                  backgroundColor: "rgba(253, 251, 246, 0.18)",
                  borderColor: "rgba(213, 169, 77, 0.4)",
                  color: "#fdfbf6",
                }}
              >
                {displayMessages.length} lời chúc
              </span>
            </div>

            {/* Scrollable List Container */}
            <div
              ref={listContainerRef}
              className="max-h-[520px] sm:max-h-[560px] overflow-y-auto space-y-3.5 pr-2.5 custom-scrollbar transition-all scroll-smooth [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-black/10 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#d5a94d]/60 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-[#d5a94d]/90"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: `${primaryColor}80 rgba(0, 0, 0, 0.05)`,
              }}
            >
              {displayMessages.map((msg: any, idx: number) => {
                const isNewest = idx === 0 && lastSubmitted && msg.name === lastSubmitted.name;
                const rawName = (msg.name || "K").trim();
                const initialLetter = rawName.charAt(0).toUpperCase();

                return (
                  <div
                    key={idx}
                    className={`group relative rounded-2xl p-4 sm:p-5 transition-all duration-300 shadow-md backdrop-blur-md overflow-hidden border ${
                      isNewest
                        ? "bg-gradient-to-br from-[#fffdfa] via-[#fdf6ea] to-[#f8ecd4] ring-2 ring-[#d5a94d] shadow-[0_0_25px_rgba(213,169,77,0.4)] animate-in fade-in slide-in-from-top-3 duration-500"
                        : "bg-gradient-to-br from-[#fdfbf6]/95 via-[#fbf7f0]/90 to-[#f6efe4]/92 hover:shadow-xl hover:-translate-y-0.5 hover:border-[#d5a94d]/60"
                    }`}
                    style={{ borderColor: isNewest ? primaryColor : `${primaryColor}40` }}
                  >
                    {/* Background Watermark Quote Mark */}
                    <div
                      className="absolute -right-2 -bottom-4 text-6xl sm:text-7xl font-serif font-black select-none pointer-events-none opacity-[0.06] group-hover:opacity-[0.14] transition-opacity duration-300"
                      style={{ color: pColor }}
                    >
                      &rdquo;
                    </div>

                    <div className="flex items-start gap-3 relative z-10">
                      {/* Monogram Avatar */}
                      <div
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-serif font-bold text-sm sm:text-base shadow-inner shrink-0 border select-none transition-transform duration-300 group-hover:scale-105"
                        style={{
                          backgroundColor: `${primaryColor}20`,
                          borderColor: `${primaryColor}50`,
                          color: pColor,
                        }}
                      >
                        {initialLetter}
                      </div>

                      {/* Content Area */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1.5 gap-2">
                          <div className="flex items-center gap-1.5 truncate">
                            <h4
                              className="font-serif text-sm sm:text-base font-bold truncate tracking-wide"
                              style={{ color: pColor }}
                            >
                              {msg.name}
                            </h4>
                            {isNewest && (
                              <span
                                className="text-[10px] font-sans uppercase font-bold px-2 py-0.5 rounded-full tracking-wider animate-pulse shadow-sm shrink-0"
                                style={{
                                  backgroundColor: `${primaryColor}35`,
                                  color: pColor,
                                  border: `1px solid ${primaryColor}70`,
                                }}
                              >
                                Vừa xong ✨
                              </span>
                            )}
                          </div>
                          <span
                            className="text-[11px] font-sans tracking-wider shrink-0 opacity-70 font-medium px-2 py-0.5 rounded-full bg-black/5"
                            style={{
                              color: pColor,
                              fontVariantNumeric: "lining-nums tabular-nums",
                            }}
                          >
                            {msg.time}
                          </span>
                        </div>
                        <p
                          className="text-xs sm:text-sm font-serif leading-relaxed whitespace-pre-wrap opacity-95 max-h-[130px] overflow-y-auto pr-1 italic"
                          style={{ color: pColor }}
                        >
                          &ldquo;{msg.msg || msg.message}&rdquo;
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </GsapReveal>
        ) : (
          <div
            className="mt-8 text-center text-xs sm:text-sm font-serif opacity-80 italic text-[#fdfbf6] drop-shadow-sm"
          >
            Chưa có lời chúc nào. Hãy là người đầu tiên gửi lời chúc cho dâu rể!
          </div>
        )}
      </div>

      {/* Success Modal Popup */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300">
          <div
            className="absolute inset-0 bg-black/65 backdrop-blur-sm transition-opacity"
            onClick={() => setShowSuccessModal(false)}
          />
          <div
            className="bg-[#fdfbf6] rounded-[28px] w-full max-w-sm sm:max-w-md relative p-6 sm:p-8 shadow-2xl border border-[#d5a94d]/40 z-10 text-center animate-in zoom-in-95 duration-300"
            style={{ color: pColor }}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowSuccessModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center opacity-60 hover:opacity-100 hover:bg-black/5 transition-all cursor-pointer"
              style={{ color: pColor }}
              aria-label="Đóng"
            >
              <X size={18} />
            </button>

            {/* Glowing Icon */}
            <div
              className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center shadow-inner relative"
              style={{ backgroundColor: `${primaryColor}20` }}
            >
              <Heart
                className="w-8 h-8 animate-pulse"
                style={{ fill: primaryColor, color: primaryColor }}
              />
              <Sparkles
                className="w-4 h-4 absolute top-2 right-2 animate-bounce"
                style={{ color: primaryColor }}
              />
            </div>

            {/* Content */}
            <h3 className="text-lg sm:text-xl font-serif font-bold uppercase tracking-wider mb-2">
              Gửi Lời Chúc Thành Công!
            </h3>
            <p className="text-xs sm:text-sm font-serif opacity-80 mb-5 leading-relaxed">
              Cảm ơn bạn đã gửi những tâm tư, lời chúc tốt đẹp nhất đến cô dâu & chú rể 💕
            </p>

            {/* Preview of Submitted Wish */}
            {lastSubmitted && (
              <div
                className="bg-[#f5eee6] border rounded-2xl p-4 mb-6 text-left shadow-sm relative overflow-hidden"
                style={{ borderColor: `${pColor}25` }}
              >
                <div className="flex items-center justify-between mb-1.5 gap-2">
                  <h4 className="font-serif text-sm sm:text-base font-bold truncate">
                    {lastSubmitted.name}
                  </h4>
                  <span
                    className="text-[11px] font-sans px-2.5 py-0.5 rounded-full font-medium shrink-0"
                    style={{ backgroundColor: `${primaryColor}30`, color: pColor }}
                  >
                    Vừa xong
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-serif italic leading-relaxed whitespace-pre-wrap opacity-90">
                  &ldquo;{lastSubmitted.msg}&rdquo;
                </p>
              </div>
            )}

            {/* Close Button */}
            <button
              type="button"
              onClick={() => setShowSuccessModal(false)}
              className="w-full py-3 px-6 font-serif rounded-full text-xs sm:text-sm font-semibold uppercase tracking-widest shadow-md hover:opacity-90 active:scale-98 transition-all cursor-pointer"
              style={{ backgroundColor: pColor, color: "#fdfbf6" }}
            >
              Xem lời chúc
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

