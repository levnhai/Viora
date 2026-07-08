import { useState } from "react";
import { FadeIn } from "@/shared/ui/FadeIn";
import { GuestMessage } from "@/entities/invitation/ui/GuestbookList";

interface MinimalGuestbookProps {
  messages: GuestMessage[];
  onSendMessage: (name: string, msg: string) => void;
  guestName?: string;
}

export function MinimalGuestbook({ messages, onSendMessage, guestName: initialGuestName }: MinimalGuestbookProps) {
  const [guestName, setGuestName] = useState(initialGuestName || "");
  const [guestMsg, setGuestMsg] = useState("");

  function submitMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!guestMsg.trim() || !guestName.trim()) return;
    onSendMessage(guestName, guestMsg);
    setGuestMsg("");
  }

  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-4xl mx-auto">
        <FadeIn>
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-2xl text-[rgb(225,188,124)] font-serif uppercase tracking-widest">
              SỔ LƯU BÚT
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="max-w-xl mx-auto border border-[rgb(225,188,124)]/30 p-8 rounded-xl relative">
            <form onSubmit={submitMessage} className="space-y-6">
              <div>
                <input 
                  required 
                  value={guestName} 
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="Nhập tên của bạn*"
                  className="w-full px-4 py-3 bg-transparent border border-[rgb(225,188,124)]/30 rounded-lg text-sm text-[rgb(225,188,124)] placeholder-[rgb(225,188,124)]/50 focus:outline-none focus:border-[rgb(225,188,124)] transition-colors"
                />
              </div>
              <div>
                <textarea 
                  required 
                  value={guestMsg} 
                  onChange={(e) => setGuestMsg(e.target.value)}
                  placeholder="Nhập lời chúc của bạn*"
                  rows={4}
                  className="w-full px-4 py-3 bg-transparent border border-[rgb(225,188,124)]/30 rounded-lg text-sm text-[rgb(225,188,124)] placeholder-[rgb(225,188,124)]/50 focus:outline-none focus:border-[rgb(225,188,124)] transition-colors resize-none"
                />
              </div>
              <div className="text-right">
                <button 
                  type="submit"
                  className="px-8 py-3 bg-[rgb(225,188,124)] text-[rgb(0,26,8)] font-serif rounded-full text-sm font-semibold hover:bg-[rgb(225,188,124)]/90 transition-colors uppercase"
                >
                  GỬI LỜI CHÚC
                </button>
              </div>
            </form>
          </div>
        </FadeIn>

        {messages && messages.length > 0 && (
          <FadeIn delay={200} className="mt-16 max-w-2xl mx-auto">
            <div className="space-y-6 max-h-[500px] overflow-y-auto custom-scrollbar pr-4">
              {messages.map((msg, idx) => (
                <div key={idx} className="border-b border-[rgb(225,188,124)]/20 pb-6">
                  <h4 className="font-serif text-[rgb(225,188,124)] text-lg mb-2">{msg.name}</h4>
                  <p className="text-[rgb(225,188,124)]/80 text-sm font-light leading-relaxed">{msg.message}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
