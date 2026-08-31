"use client";

import { useState } from "react";
import { GsapReveal } from "@/shared/ui/GsapReveal";
import { GuestMessage } from "@/entities/invitation/ui/GuestbookList";

interface MinimalGuestbookProps {
  messages: GuestMessage[];
  onSendMessage: (name: string, msg: string) => void;
  guestName?: string;
  primaryColor?: string;
  textColor?: string;
}

export function MinimalGuestbook({
  messages,
  onSendMessage,
  guestName: initialGuestName,
  primaryColor,
  textColor,
}: MinimalGuestbookProps) {
  const pColor = textColor || "rgb(225,188,124)";
  const tColor = primaryColor || "rgb(225,188,124)";
  const [guestName, setGuestName] = useState(initialGuestName || "");
  const [guestMsg, setGuestMsg] = useState("");

  function submitMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!guestMsg.trim() || !guestName.trim()) return;
    onSendMessage(guestName, guestMsg);
    setGuestMsg("");
  }

  return (
    <section className="sm:py-24 px-4 relative">
      <div className="max-w-4xl mx-auto">
        <GsapReveal direction="up" distance={30}>
          <div className="text-center mb-12 space-y-4">
            <h2
              className="text-2xl font-serif uppercase tracking-widest"
              style={{ color: pColor }}
            >
              SỔ LƯU BÚT
            </h2>
          </div>
        </GsapReveal>

        <GsapReveal delay={0.2} direction="up" distance={40}>
          <div
            className="max-w-xl mx-auto border p-8 rounded-xl relative"
            style={{ borderColor: pColor }}
          >
            <form onSubmit={submitMessage} className="space-y-6">
              <div>
                <input
                  required
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="Nhập tên của bạn*"
                  className="w-full px-4 py-3 bg-transparent border rounded-lg text-sm transition-colors"
                  style={{ color: pColor, borderColor: pColor }}
                />
              </div>
              <div>
                <textarea
                  required
                  value={guestMsg}
                  onChange={(e) => setGuestMsg(e.target.value)}
                  placeholder="Nhập lời chúc của bạn*"
                  rows={4}
                  className="w-full px-4 py-3 bg-transparent border rounded-lg text-sm transition-colors resize-none"
                  style={{ color: pColor, borderColor: pColor }}
                />
              </div>
              <div className="text-right">
                <button
                  type="submit"
                  className="px-8 py-3 font-serif rounded-full text-sm font-semibold hover:opacity-90 transition-opacity uppercase"
                  style={{ backgroundColor: pColor, color: tColor }}
                >
                  GỬI LỜI CHÚC
                </button>
              </div>
            </form>
          </div>
        </GsapReveal>

        {messages && messages.length > 0 && (
          <GsapReveal
            delay={0.4}
            direction="up"
            distance={40}
            className="mt-16 max-w-2xl mx-auto"
          >
            <style>{`
              .guestbook-mask {
                -webkit-mask-image: linear-gradient(to bottom, transparent, black 15%, black 85%, transparent);
                mask-image: linear-gradient(to bottom, transparent, black 15%, black 85%, transparent);
              }
              .animate-marquee-vertical {
                /* Tính toán tốc độ chạy dựa trên số lượng tin nhắn, đảm bảo mượt mà */
                animation: marquee-vertical ${Math.max(30, messages.length * 8)}s linear infinite;
              }
              .animate-marquee-vertical:hover {
                animation-play-state: paused;
              }
              @keyframes marquee-vertical {
                0% { transform: translateY(0); }
                /* Cuộn lên 50% tổng chiều cao vì ta lặp lại mảng 2 lần */
                100% { transform: translateY(-50%); }
              }
            `}</style>

            <div className="h-[400px] sm:h-[500px] overflow-hidden guestbook-mask relative px-2">
              {/* Vùng chứa nội dung chạy */}
              <div className="animate-marquee-vertical flex flex-col space-y-4">
                {/* Lặp lại nhiều lần để đảm bảo luôn đủ độ dài lấp đầy khung */}
                {[
                  ...messages,
                  ...messages,
                  ...messages,
                  ...messages,
                  ...messages,
                  ...messages,
                ]
                  .slice(0, Math.max(12, messages.length * 2))
                  .map((msg, idx) => (
                    <div
                      key={idx}
                      className="border rounded-2xl p-3 sm:p-4 relative transition-all duration-300 shadow-sm shrink-0"
                      style={{
                        borderColor: pColor,
                        backgroundColor: pColor + "0A",
                      }} // 0A is very low opacity
                    >
                      <div
                        className="absolute top-0 right-4 font-serif text-5xl pointer-events-none select-none opacity-20"
                        style={{ color: pColor }}
                      >
                        "
                      </div>
                      <div className="relative z-10">
                        <div className="flex items-baseline justify-between mb-2 gap-2">
                          <h4
                            className="font-serif text-lg sm:text-xl font-medium truncate"
                            style={{ color: pColor }}
                          >
                            {msg.name}
                          </h4>
                          <span
                            className="text-[10px] tracking-wider uppercase shrink-0 opacity-50"
                            style={{ color: pColor }}
                          >
                            {msg.time}
                          </span>
                        </div>
                        <div
                          className="w-10 h-px mb-3 opacity-20"
                          style={{ backgroundColor: pColor }}
                        />
                        <p
                          className="text-sm sm:text-base font-light leading-relaxed italic whitespace-pre-wrap opacity-90"
                          style={{ color: pColor }}
                        >
                          {msg.msg}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </GsapReveal>
        )}
      </div>
    </section>
  );
}
