"use client";

import { useState } from "react";
import { MessageSquareHeart, Send } from "lucide-react";

interface GuestbookSectionProps {
  messages: Array<{ name: string; message: string; createdAt?: string }>;
  onSendMessage: (name: string, msg: string) => Promise<void>;
  guestName?: string;
}

export function GuestbookSection({
  messages,
  onSendMessage,
  guestName,
}: GuestbookSectionProps) {
  const [name, setName] = useState(guestName || "");
  const [msg, setMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const defaultMessages = [
    {
      name: "Minh Tuấn & Gia Đình",
      message: "Chúc hai bạn trăm năm hạnh phúc, mãi mãi bên nhau và cùng xây đắp tổ ấm ngập tràn niềm vui!",
      createdAt: "Vừa xong",
    },
    {
      name: "Huyền Trang",
      message: "Chúc mừng cô dâu chú rể! Ngày về chung nhà thật rực rỡ và đong đầy yêu thương nhé!",
      createdAt: "10 phút trước",
    },
    {
      name: "Nhóm Bạn Thân Đại Học",
      message: "Cuối cùng ngày này cũng tới, chúc cặp đôi Mạnh Đức & Lan Nhi luôn mặn nồng son sắt!",
      createdAt: "1 giờ trước",
    },
  ];

  const displayList = messages && messages.length > 0 ? messages : defaultMessages;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !msg.trim()) {
      alert("Vui lòng nhập tên và lời chúc!");
      return;
    }
    setSubmitting(true);
    try {
      await onSendMessage(name, msg);
      setMsg("");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="guestbook" className="relative w-full px-5 py-14 bg-[#F5F3EF] text-[#7D1F2A] border-t border-[#7D1F2A]/10">
      <div className="max-w-[440px] mx-auto flex flex-col items-center">
        {/* Header Sổ lời chúc */}
        <div className="text-center mb-8">
          <div className="w-10 h-10 rounded-full bg-[#7D1F2A]/10 flex items-center justify-center mx-auto mb-3 text-[#7D1F2A]">
            <MessageSquareHeart className="w-5 h-5" />
          </div>
          <span className="text-[11px] uppercase tracking-[0.3em] font-henuoc-sans text-[#7D1F2A]/60 block mb-1">
            Guestbook
          </span>
          <h3 className="text-2xl sm:text-3xl font-henuoc-serif font-medium uppercase tracking-wide">
            Sổ Lời Chúc
          </h3>
          <p className="mt-2 text-xs sm:text-sm font-henuoc-serif italic text-[#7D1F2A]/80 leading-relaxed max-w-[340px] mx-auto">
            Gửi gắm những lời chúc tốt đẹp và tình cảm của bạn đến cặp đôi trong ngày trọng đại
          </p>
        </div>

        {/* Form gửi lời chúc */}
        <form
          onSubmit={handleSubmit}
          className="w-full p-5 rounded-2xl bg-white border border-[#7D1F2A]/15 shadow-sm mb-8 flex flex-col gap-3"
        >
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tên của bạn..."
            className="w-full px-4 py-2.5 rounded-xl border border-[#7D1F2A]/25 bg-[#F5F3EF]/50 text-sm font-henuoc-serif text-[#7D1F2A] focus:outline-none focus:ring-1 focus:ring-[#7D1F2A]"
          />
          <textarea
            rows={3}
            required
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Viết lời chúc ý nghĩa của bạn..."
            className="w-full px-4 py-2.5 rounded-xl border border-[#7D1F2A]/25 bg-[#F5F3EF]/50 text-sm font-henuoc-serif text-[#7D1F2A] focus:outline-none focus:ring-1 focus:ring-[#7D1F2A] resize-none"
          />
          <button
            type="submit"
            disabled={submitting}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#7D1F2A] text-white font-henuoc-sans text-xs uppercase tracking-[0.2em] font-medium shadow hover:bg-[#621620] active:scale-95 transition-all disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{submitting ? "Đang gửi..." : "Gửi Lời Chúc"}</span>
          </button>
        </form>

        {/* Danh sách lời chúc */}
        <div className="w-full flex flex-col gap-3 max-h-[360px] overflow-y-auto pr-1 henuoc-scrollbar">
          {displayList.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-white border border-[#7D1F2A]/15 text-left shadow-xs"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-henuoc-serif font-semibold text-sm text-[#7D1F2A]">
                  {item.name}
                </span>
                {item.createdAt && (
                  <span className="text-[10px] text-[#7D1F2A]/50 font-henuoc-sans">
                    {item.createdAt}
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm font-henuoc-serif text-[#7D1F2A]/85 leading-relaxed">
                {item.message}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
