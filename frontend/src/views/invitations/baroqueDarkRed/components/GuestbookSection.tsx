import React, { useState } from "react";
import { Sparkles, Send } from "lucide-react";
import { GuestMessage } from "@/shared/lib/hooks";
import { AnimateView } from "@/widgets/invitation-blocks";

interface GuestbookSectionProps {
  guestName?: string;
  messages: GuestMessage[];
  onSendMessage: (name: string, content: string) => Promise<void>;
}

export const GuestbookSection: React.FC<GuestbookSectionProps> = ({
  guestName = "",
  messages,
  onSendMessage,
}) => {
  const [name, setName] = useState(guestName);
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Gợi ý lời chúc bằng AI
  const aiSuggestions = [
    "Chúc hai bạn trăm năm hạnh phúc, vẹn tròn nghĩa tình!",
    "Chúc tân lang tân nương luôn ngập tràn yêu thương và tiếng cười!",
    "Mừng ngày vui của hai bạn, chúc cho tình yêu mãi bền chặt theo năm tháng!",
    "Chúc hai bạn có một tổ ấm ngập tràn niềm vui và hạnh phúc viên mãn!",
  ];

  const handleAiSuggest = () => {
    const randomMsg = aiSuggestions[Math.floor(Math.random() * aiSuggestions.length)];
    setContent(randomMsg);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) return;

    setSubmitting(true);
    try {
      await onSendMessage(name.trim(), content.trim());
      setContent("");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="relative z-10 w-full px-5 sm:px-6 py-6" id="guestbook">
      <AnimateView animation="fadeInDown" duration={0.8} className="text-center">
        <h2
          className="uppercase text-center text-[20px] md:text-[24px] font-bold tracking-wider mb-3"
          style={{
            color: "#ffdfaf",
            fontFamily: '"Times New Roman", "Baskerville", serif',
          }}
        >
          Sổ Lưu Bút
        </h2>
        <p className="text-xs md:text-sm text-[#ffefd6]/80 italic">
          Gửi gắm lời chúc tốt đẹp nhất đến cô dâu &amp; chú rể
        </p>
      </AnimateView>

      {/* Form Gửi Lời Chúc */}
      <AnimateView animation="fadeInUp" duration={0.8} delay={0.1}>
        <form
          onSubmit={handleSubmit}
          className="mt-5 mx-auto w-full max-w-[340px] sm:max-w-[440px] flex flex-col gap-3"
        >
          <div>
            <input
              type="text"
              placeholder="Tên của bạn*"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={100}
              className="w-full rounded-xl border border-[#ffdfaf]/50 bg-black/30 px-4 py-2.5 text-sm text-[#ffefd6] placeholder-[#ffefd6]/50 focus:border-[#ffdfaf] focus:outline-none focus:ring-1 focus:ring-[#ffdfaf]"
            />
          </div>

          <div>
            <textarea
              placeholder="Nhập lời chúc chân thành của bạn*"
              required
              rows={3}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              maxLength={1000}
              className="w-full rounded-xl border border-[#ffdfaf]/50 bg-black/30 px-4 py-2.5 text-sm text-[#ffefd6] placeholder-[#ffefd6]/50 focus:border-[#ffdfaf] focus:outline-none focus:ring-1 focus:ring-[#ffdfaf] resize-none"
            />
          </div>

          <div className="flex items-center justify-between mt-1">
            <button
              type="button"
              onClick={handleAiSuggest}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#ffdfaf] bg-[#ffdfaf]/15 hover:bg-[#ffdfaf]/25 transition-all cursor-pointer"
              title="Gợi ý lời chúc bằng AI"
            >
              <Sparkles size={13} />
              <span>Gợi ý AI</span>
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 rounded-full px-6 py-2 text-xs md:text-sm font-bold uppercase transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 cursor-pointer shadow-lg"
              style={{
                backgroundColor: "#ffdfaf",
                color: "#511419",
                fontFamily: '"Times New Roman", serif',
              }}
            >
              <Send size={14} />
              <span>{submitting ? "Đang gửi..." : "GỬI LỜI CHÚC"}</span>
            </button>
          </div>
        </form>
      </AnimateView>

      {/* Danh Sách Lời Chúc */}
      <AnimateView animation="fadeInUp" duration={0.8} delay={0.2} className="mt-8 w-full max-w-[340px] sm:max-w-[440px] mx-auto flex flex-col gap-3 max-h-[360px] overflow-y-auto pr-1">
        {messages && messages.length > 0 ? (
          messages.map((item, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-[#ffdfaf]/20 bg-black/25 p-3 text-left transition-all"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-[13px] md:text-[14px] text-[#ffdfaf]">
                  {item.name || "Khách mời"}
                </span>
                <span className="text-[10px] text-[#ffefd6]/60">
                  {item.time || "Vừa xong"}
                </span>
              </div>
              <p className="text-xs md:text-sm text-[#ffefd6]/90 whitespace-pre-line leading-relaxed">
                {item.msg}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-xs text-[#ffefd6]/60 py-4 italic">
            Chưa có lời chúc nào. Hãy là người đầu tiên gửi lời chúc nhé!
          </p>
        )}
      </AnimateView>
    </section>
  );
};
