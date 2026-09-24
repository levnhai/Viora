import { useState } from "react";
import { MessageSquareHeart, Send, User } from "lucide-react";
import { GuestMessage } from "@/shared/lib/hooks";

interface GraduationGuestbookProps {
  guestName?: string;
  messages: GuestMessage[];
  onSendMessage: (name: string, msg: string) => Promise<void> | void;
}

export function GraduationGuestbook({
  guestName,
  messages,
  onSendMessage,
}: GraduationGuestbookProps) {
  const [name, setName] = useState(guestName || "");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultWishes: GuestMessage[] = [
    {
      name: "Thanh Hằng",
      msg: "Chúc mừng tân cử nhân Mai Trang! Chúc bạn chặng đường sắp tới luôn rực rỡ và thành công rực rỡ nhé! 🎓🎉",
      time: "Vừa xong",
    },
    {
      name: "Gia đình Bác Hùng",
      msg: "Tự hào về cháu gái nhiều lắm! Chúc cháu luôn vững bước trên con đường sự nghiệp tương lai!",
      time: "1 giờ trước",
    },
    {
      name: "Hội bạn thân PR41",
      msg: "Tốt nghiệp rồi bạn iu ơi! Chúc chúng mình ai cũng đạt được ước mơ và mãi gắn bó như này nhé ❤️",
      time: "2 giờ trước",
    },
  ];

  const displayList = messages && messages.length > 0 ? messages : defaultWishes;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) return;

    setIsSubmitting(true);
    try {
      await onSendMessage(name.trim(), content.trim());
      setContent("");
    } catch {
      // ignore
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full px-4 sm:px-6 py-6 flex flex-col items-center">
      <div className="text-center mb-6">
        <span className="text-xs uppercase tracking-[0.25em] font-sans font-semibold text-[#854d0e]">
          SỔ LƯU BÚT
        </span>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0b2046] mt-1">
          Gửi Lời Chúc Mừng
        </h2>
        <div className="w-12 h-[2px] bg-[#d4af37] mx-auto mt-2" />
      </div>

      <div className="w-full max-w-[420px] bg-white rounded-2xl p-6 sm:p-7 shadow-sm border border-[#0b2046]/10 flex flex-col items-center">
        {/* Wish Form */}
        <form onSubmit={handleSubmit} className="w-full mb-6">
          <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tên của bạn"
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#0b2046] transition-colors"
            />
          </div>

          <div className="mb-3.5">
            <textarea
              rows={3}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Nhập lời chúc tốt đẹp gửi đến tân cử nhân..."
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#0b2046] transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2.5 px-5 rounded-xl bg-[#0b2046] text-white font-sans font-semibold text-xs sm:text-[13px] uppercase tracking-wider hover:bg-[#132e5c] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>{isSubmitting ? "Đang gửi..." : "Gửi Lời Chúc"}</span>
          </button>
        </form>

        {/* Wishes Feed */}
        <div className="w-full border-t border-slate-100 pt-5">
          <div className="flex items-center gap-1.5 text-xs font-sans font-semibold uppercase tracking-wider text-slate-500 mb-3">
            <MessageSquareHeart className="w-4 h-4 text-[#b8860b]" />
            <span>Lời Chúc Đã Nhận ({displayList.length})</span>
          </div>

          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
            {displayList.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#fcfbfa] rounded-xl p-3.5 border border-slate-100 text-left"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-full bg-[#0b2046]/10 flex items-center justify-center text-[#0b2046]">
                      <User className="w-3 h-3" />
                    </div>
                    <span className="font-serif font-bold text-xs sm:text-[13px] text-[#0b2046]">
                      {item.name}
                    </span>
                  </div>
                  {item.time && (
                    <span className="text-[10px] text-slate-400 font-sans">
                      {item.time}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-sans pl-6">
                  {item.msg}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
