import { useState } from "react";
import { BookOpen } from "lucide-react";

interface GuestbookFormProps {
  onSendMessage: (name: string, msg: string) => void;
}

export function GuestbookForm({ onSendMessage }: GuestbookFormProps) {
  const [guestName, setGuestName] = useState("");
  const [guestMsg, setGuestMsg] = useState("");

  function submitMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!guestMsg.trim() || !guestName.trim()) return;
    onSendMessage(guestName, guestMsg);
    setGuestMsg("");
    setGuestName("");
  }

  return (
    <form onSubmit={submitMessage} className="bg-white rounded-2xl p-6 shadow-sm border mb-5 text-left" style={{ borderColor: "rgba(201,130,142,0.2)" }}>
      <p className="text-sm mb-4" style={{ color: "#7a5c4f" }}>Để lại lời chúc cho cặp đôi 💌</p>
      <div className="space-y-3">
        <input required value={guestName} onChange={(e) => setGuestName(e.target.value)}
          placeholder="Tên của bạn"
          className="w-full px-4 py-2.5 rounded-xl text-sm outline-none border"
          style={{ borderColor: "rgba(201,130,142,0.3)", backgroundColor: "#fdf6ef", color: "#2c1810" }} />
        <textarea required value={guestMsg} onChange={(e) => setGuestMsg(e.target.value)}
          placeholder="Lời chúc của bạn..."
          rows={3}
          className="w-full px-4 py-2.5 rounded-xl text-sm outline-none border resize-none"
          style={{ borderColor: "rgba(201,130,142,0.3)", backgroundColor: "#fdf6ef", color: "#2c1810" }} />
        <button type="submit"
          className="w-full py-2.5 rounded-xl text-sm font-medium text-white flex items-center justify-center gap-2 hover:opacity-90 transition-opacity cursor-pointer"
          style={{ backgroundColor: "#8b3a52" }}>
          <BookOpen size={14} /> Gửi lời chúc
        </button>
      </div>
    </form>
  );
}
