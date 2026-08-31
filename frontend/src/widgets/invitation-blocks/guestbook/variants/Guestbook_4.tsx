"use client";

import { useState } from "react";
import { GsapReveal } from "@/shared/ui/GsapReveal";
import { GuestMessage } from "@/entities/invitation/ui/GuestbookList";
import img_1 from "@/shared/assets/image/flower/img_1.png";

interface Guestbook_4Props {
  messages: GuestMessage[];
  onSendMessage: (name: string, msg: string) => void;
  guestName?: string;
  primaryColor?: string;
  textColor?: string;
}

export function Guestbook_4({
  messages,
  onSendMessage,
  guestName: initialGuestName,
  textColor,
}: Guestbook_4Props) {
  const pColor = textColor || "#4e0b12";
  const [guestName, setGuestName] = useState(initialGuestName || "");
  const [guestMsg, setGuestMsg] = useState("");

  function submitMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!guestMsg.trim() || !guestName.trim()) return;
    onSendMessage(guestName, guestMsg);
    setGuestMsg("");
  }

  const defaultMessages = [
    {
      name: "Duy Khang",
      time: "12:30:49 26/7/2026",
      msg: "Chúc mừng ngày vui của hai bạn, trăm năm hạnh phúc bền lâu!",
    },
    {
      name: "Lan Chi",
      time: "12:30:49 26/7/2026",
      msg: "Đẹp đôi quá! Chúc hai bạn sống bên nhau đầu bạc răng long.",
    },
    {
      name: "Tuấn Anh",
      time: "12:30:49 26/7/2026",
      msg: "Mừng hạnh phúc hai bạn! Chúc gia đình nhỏ luôn đầy ắp tiếng cười.",
    },
    {
      name: "Khánh Vy",
      time: "12:30:49 26/7/2026",
      msg: "Chúc cô dâu chú rể luôn giữ được nụ cười này mãi mãi nhé!",
    },
  ];

  const displayMessages =
    messages && messages.length > 0 ? messages : defaultMessages;

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
                  className="px-8 py-3 font-serif rounded-full text-xs sm:text-sm font-semibold hover:opacity-90 transition-opacity uppercase tracking-widest shadow-md"
                  style={{ backgroundColor: pColor, color: "#fdfbf6" }}
                >
                  GỬI LỜI CHÚC
                </button>
              </div>
            </form>
          </div>
        </GsapReveal>

        {/* Messages List */}
        {displayMessages && displayMessages.length > 0 && (
          <GsapReveal
            delay={0.4}
            direction="up"
            distance={40}
            className="mt-8 sm:mt-10"
          >
            <div className="max-h-[400px] overflow-y-auto space-y-3.5 pr-1.5 custom-scrollbar">
              {displayMessages.map((msg: any, idx: number) => (
                <div
                  key={idx}
                  className="border rounded-xl p-4 transition-all duration-300 shadow-sm bg-[#fdfbf6]/80"
                  style={{ borderColor: `${pColor}33` }}
                >
                  <div className="flex items-baseline justify-between mb-1.5 gap-2">
                    <h4
                      className="font-serif text-base sm:text-lg font-bold truncate"
                      style={{ color: pColor }}
                    >
                      {msg.name}
                    </h4>
                    <span
                      className="text-xs font-sans tracking-wider shrink-0 opacity-75 font-medium"
                      style={{
                        color: pColor,
                        fontVariantNumeric: "lining-nums tabular-nums",
                      }}
                    >
                      {msg.time}
                    </span>
                  </div>
                  <p
                    className="text-xs sm:text-sm font-serif leading-relaxed whitespace-pre-wrap opacity-90"
                    style={{ color: pColor }}
                  >
                    {msg.msg || msg.message}
                  </p>
                </div>
              ))}
            </div>
          </GsapReveal>
        )}
      </div>
    </section>
  );
}
