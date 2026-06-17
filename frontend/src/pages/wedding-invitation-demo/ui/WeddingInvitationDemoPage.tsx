import { useState } from "react";
import { Volume2, VolumeX, Phone, Mail } from "lucide-react";
import { InvitationCover } from "@/entities/invitation/ui/InvitationCover";
import { LoveStoryTimeline } from "@/entities/invitation/ui/LoveStoryTimeline";
import { GalleryGrid } from "@/entities/invitation/ui/GalleryGrid";
import { EventInfo } from "@/entities/invitation/ui/EventInfo";
import { VenueMap } from "@/entities/invitation/ui/VenueMap";
import { GiftRegistry } from "@/entities/invitation/ui/GiftRegistry";
import { GuestbookList, GuestMessage } from "@/entities/invitation/ui/GuestbookList";
import { RsvpForm } from "@/features/submit-rsvp/ui/RsvpForm";
import { GuestbookForm } from "@/features/write-guestbook/ui/GuestbookForm";
import { FadeIn } from "@/shared/ui/FadeIn";
import { SectionHeading } from "@/entities/invitation/ui/SectionHeading";
import { useCountdown } from "@/shared/lib/hooks";

interface WeddingInvitationDemoPageProps {
  onBack: () => void;
  onSelect?: () => void;
}

const INITIAL_MESSAGES: GuestMessage[] = [
  { name: "Chú Hùng & Cô Lan", msg: "Chúc hai con trăm năm hạnh phúc, sớm có tin vui!", time: "2 ngày trước" },
  { name: "Anh Minh Đức", msg: "Tụi mày xứng đôi quá 💕 Chúc mừng nhé!", time: "1 ngày trước" },
  { name: "Chị Thanh Thảo", msg: "Thiệp đẹp quá! Mình sẽ tham dự cùng gia đình nha!", time: "5 giờ trước" },
];

export function WeddingInvitationDemoPage({ onBack, onSelect }: WeddingInvitationDemoPageProps) {
  const countdown = useCountdown(new Date("2025-11-15T18:00:00").getTime());
  const [muted, setMuted] = useState(true);
  const [messages, setMessages] = useState<GuestMessage[]>(INITIAL_MESSAGES);

  const handleSendMessage = (name: string, msg: string) => {
    setMessages(prev => [{ name, msg, time: "Vừa xong" }, ...prev]);
  };

  return (
    <div className="min-h-screen text-center" style={{ backgroundColor: "#fdf6ef", fontFamily: "'DM Sans', sans-serif", color: "#2c1810" }}>
      
      {/* Demo bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#2c1810] text-white text-xs flex items-center justify-between px-4 py-2.5">
        <span style={{ opacity: 0.6 }}>👁 Đây là trang thiệp demo — thieponline.vn/vanan-thibinh</span>
        <div className="flex items-center gap-2">
          {onSelect && (
            <button onClick={onSelect} className="bg-[#8b3a52] text-white hover:opacity-90 transition-opacity px-3 py-1.5 rounded-lg font-medium cursor-pointer border-0">
              ✨ Dùng thiết kế này
            </button>
          )}
          <button onClick={onBack} className="text-white/70 hover:text-white transition-colors border border-white/20 px-3 py-1.5 rounded-lg cursor-pointer bg-transparent">
            ← Quay lại
          </button>
        </div>
      </div>

      {/* Music toggle */}
      <button
        onClick={() => setMuted(!muted)}
        className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full flex items-center justify-center shadow-lg border border-[#c9828e]/30 transition-all hover:scale-105 cursor-pointer"
        style={{ backgroundColor: "#8b3a52", color: "white" }}
      >
        {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>

      <InvitationCover onScrollNext={() => {
        document.getElementById("countdown")?.scrollIntoView({ behavior: "smooth" });
      }} />

      {/* ── COUNTDOWN ──────────────────────────────────────────────────────── */}
      <section id="countdown" className="py-20 px-4">
        <FadeIn>
          <SectionHeading en="Countdown" vi="Đếm ngược đến ngày vui" />
          <div className="flex justify-center gap-4 sm:gap-8 flex-wrap">
            {[
              { val: countdown.days, label: "Ngày" },
              { val: countdown.hours, label: "Giờ" },
              { val: countdown.minutes, label: "Phút" },
              { val: countdown.seconds, label: "Giây" },
            ].map(({ val, label }) => (
              <div key={label} className="text-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center shadow-md border"
                  style={{ backgroundColor: "rgba(139,58,82,0.06)", borderColor: "rgba(201,130,142,0.2)" }}>
                  <span className="text-3xl sm:text-4xl font-light" style={{ fontFamily: "'EB Garamond', serif", color: "#8b3a52" }}>
                    {String(val).padStart(2, "0")}
                  </span>
                </div>
                <p className="text-xs mt-2 uppercase tracking-wider" style={{ color: "#7a5c4f" }}>{label}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8 flex items-center justify-center gap-2 text-sm" style={{ color: "#7a5c4f" }}>
            🔗 Thứ Bảy, ngày 15 tháng 11 năm 2025 · 18:00
          </div>
        </FadeIn>
      </section>

      {/* Divider */}
      <div className="flex items-center justify-center gap-3 py-2">
        <div className="h-px w-24 sm:w-40" style={{ backgroundColor: "rgba(201,130,142,0.25)" }} />
        <span>❤️</span>
        <div className="h-px w-24 sm:w-40" style={{ backgroundColor: "rgba(201,130,142,0.25)" }} />
      </div>

      <LoveStoryTimeline />

      <GalleryGrid />

      <EventInfo />

      <VenueMap />

      <RsvpForm />

      <GiftRegistry />

      {/* ── GUESTBOOK ──────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 max-w-lg mx-auto">
        <FadeIn><SectionHeading en="Guestbook" vi="Sổ lưu bút" /></FadeIn>
        <FadeIn delay={100}>
          <GuestbookForm onSendMessage={handleSendMessage} />
          <GuestbookList messages={messages} />
        </FadeIn>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer className="py-16 px-4 text-center" style={{ backgroundColor: "#2c1810", color: "white" }}>
        <h2 style={{ fontFamily: "'Great Vibes', cursive", fontSize: "2.8rem", color: "#c9828e", lineHeight: 1.2 }}>
          Văn An & Thị Bình
        </h2>
        <p className="text-sm mt-3 mb-8" style={{ color: "rgba(255,255,255,0.5)" }}>15 · 11 · 2025 · Nhà hàng Đại Dương, TP. HCM</p>
        <div className="flex justify-center gap-6 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
          <a href="tel:0901234567" className="flex items-center gap-2 hover:text-[#c9828e] transition-colors"><Phone size={13} /> 0901 234 567</a>
          <a href="mailto:vanan.thibinh@gmail.com" className="flex items-center gap-2 hover:text-[#c9828e] transition-colors"><Mail size={13} /> Email</a>
        </div>
        <div className="mt-10 pt-8 border-t border-white/10">
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
            Thiệp được tạo tại <span style={{ color: "rgba(201,130,142,0.6)" }}>thieponline.vn</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
