import { useState } from "react";
import { Send, Heart } from "lucide-react";
import { FadeIn } from "@/shared/ui/FadeIn";
import { SectionHeading } from "@/entities/invitation/ui/SectionHeading";

export function RsvpForm() {
  const [rsvpData, setRsvpData] = useState({ name: "", attend: "yes", guests: "1", message: "" });
  const [rsvpSent, setRsvpSent] = useState(false);

  function submitRsvp(e: React.FormEvent) {
    e.preventDefault();
    setRsvpSent(true);
  }

  return (
    <section className="py-20 px-4 max-w-lg mx-auto">
      <FadeIn><SectionHeading en="RSVP" vi="Xác nhận tham dự" /></FadeIn>
      <FadeIn delay={100}>
        {rsvpSent ? (
          <div className="bg-white rounded-2xl p-10 text-center shadow-sm border" style={{ borderColor: "rgba(201,130,142,0.2)" }}>
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "rgba(139,58,82,0.08)" }}>
              <Heart size={28} fill="#8b3a52" stroke="#8b3a52" />
            </div>
            <h3 className="text-2xl mb-2" style={{ fontFamily: "'EB Garamond', serif", color: "#8b3a52" }}>Cảm ơn bạn!</h3>
            <p className="text-sm" style={{ color: "#7a5c4f" }}>Chúng mình đã nhận được xác nhận của bạn. Hẹn gặp nhau tại tiệc cưới! 🎉</p>
          </div>
        ) : (
          <form onSubmit={submitRsvp} className="bg-white rounded-2xl p-8 shadow-sm border space-y-5 text-left" style={{ borderColor: "rgba(201,130,142,0.2)" }}>
            <div>
              <label className="block text-xs uppercase tracking-wider mb-2 font-medium" style={{ color: "#7a5c4f" }}>Họ và tên *</label>
              <input required value={rsvpData.name} onChange={(e) => setRsvpData({ ...rsvpData, name: e.target.value })}
                placeholder="Nguyễn Văn A"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none border transition-colors"
                style={{ borderColor: "rgba(201,130,142,0.3)", backgroundColor: "#fdf6ef", color: "#2c1810" }}
                onFocus={(e) => e.target.style.borderColor = "#8b3a52"}
                onBlur={(e) => e.target.style.borderColor = "rgba(201,130,142,0.3)"}
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider mb-2 font-medium" style={{ color: "#7a5c4f" }}>Bạn sẽ tham dự? *</label>
              <div className="grid grid-cols-2 gap-3">
                {[{ val: "yes", label: "🎉 Có, mình sẽ đến" }, { val: "no", label: "😢 Rất tiếc, không thể" }].map((opt) => (
                  <button key={opt.val} type="button" onClick={() => setRsvpData({ ...rsvpData, attend: opt.val })}
                    className="py-3 rounded-xl text-sm border transition-all cursor-pointer"
                    style={{
                      borderColor: rsvpData.attend === opt.val ? "#8b3a52" : "rgba(201,130,142,0.3)",
                      backgroundColor: rsvpData.attend === opt.val ? "rgba(139,58,82,0.06)" : "transparent",
                      color: rsvpData.attend === opt.val ? "#8b3a52" : "#7a5c4f",
                      fontWeight: rsvpData.attend === opt.val ? 500 : 400,
                    }}>
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            {rsvpData.attend === "yes" && (
              <div>
                <label className="block text-xs uppercase tracking-wider mb-2 font-medium" style={{ color: "#7a5c4f" }}>Số người tham dự</label>
                <select value={rsvpData.guests} onChange={(e) => setRsvpData({ ...rsvpData, guests: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none border"
                  style={{ borderColor: "rgba(201,130,142,0.3)", backgroundColor: "#fdf6ef", color: "#2c1810" }}>
                  {["1", "2", "3", "4", "5+"].map((n) => <option key={n} value={n}>{n} người</option>)}
                </select>
              </div>
            )}
            <div>
              <label className="block text-xs uppercase tracking-wider mb-2 font-medium" style={{ color: "#7a5c4f" }}>Lời chúc (tùy chọn)</label>
              <textarea value={rsvpData.message} onChange={(e) => setRsvpData({ ...rsvpData, message: e.target.value })}
                placeholder="Gửi lời chúc đến cặp đôi..."
                rows={3}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none border resize-none transition-colors"
                style={{ borderColor: "rgba(201,130,142,0.3)", backgroundColor: "#fdf6ef", color: "#2c1810" }}
                onFocus={(e) => e.target.style.borderColor = "#8b3a52"}
                onBlur={(e) => e.target.style.borderColor = "rgba(201,130,142,0.3)"}
              />
            </div>
            <button type="submit"
              className="w-full py-3.5 rounded-xl text-sm font-medium text-white flex items-center justify-center gap-2 transition-opacity hover:opacity-90 cursor-pointer"
              style={{ backgroundColor: "#8b3a52" }}>
              <Send size={15} /> Gửi xác nhận
            </button>
          </form>
        )}
      </FadeIn>
    </section>
  );
}
