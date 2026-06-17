import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { Volume2, VolumeX, Phone, Mail, Loader2 } from "lucide-react";
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
import { WeddingData } from "@/entities/invitation/model/types";

const INITIAL_MESSAGES: GuestMessage[] = [
  { name: "Chú Hùng & Cô Lan", msg: "Chúc hai con trăm năm hạnh phúc, sớm có tin vui!", time: "2 ngày trước" },
  { name: "Anh Minh Đức", msg: "Tụi mày xứng đôi quá 💕 Chúc mừng nhé!", time: "1 ngày trước" },
  { name: "Chị Thanh Thảo", msg: "Thiệp đẹp quá! Mình sẽ tham dự cùng gia đình nha!", time: "5 giờ trước" },
];

export function WeddingInvitationPage() {
  const { weddingSlug } = useParams<{ weddingSlug: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [weddingData, setWeddingData] = useState<WeddingData | null>(null);
  
  const [muted, setMuted] = useState(true);
  const [messages, setMessages] = useState<GuestMessage[]>(INITIAL_MESSAGES);

  // Initialize countdown hook conditionally or safely
  const targetTime = weddingData ? new Date(weddingData.weddingDate).getTime() : Date.now();
  const countdown = useCountdown(targetTime);

  useEffect(() => {
    if (!weddingSlug) return;
    
    setLoading(true);
    setError(null);

    fetch(`http://localhost:8080/api/weddings/${weddingSlug}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Không tìm thấy thiệp cưới hoặc lỗi máy chủ!");
        }
        return res.json();
      })
      .then((data) => {
        if (data.success && data.data) {
          setWeddingData(data.data);
        } else {
          throw new Error("Không lấy được thông tin đám cưới!");
        }
      })
      .catch((err) => {
        setError(err.message || "Đã xảy ra lỗi kết nối!");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [weddingSlug]);

  const handleSendMessage = (name: string, msg: string) => {
    setMessages((prev) => [{ name, msg, time: "Vừa xong" }, ...prev]);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fdf6ef] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-10 h-10 animate-spin text-[#8b3a52]" />
        <p className="text-sm font-medium text-[#7a5c4f] tracking-wide animate-pulse">Đang tải thiệp cưới...</p>
      </div>
    );
  }

  if (error || !weddingData) {
    return (
      <div className="min-h-screen bg-[#fdf6ef] flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-white rounded-3xl p-8 max-w-md shadow-md border border-[#c9828e]/20 space-y-5">
          <div className="text-4xl">💔</div>
          <h2 className="text-2xl font-semibold text-[#8b3a52]" style={{ fontFamily: "'EB Garamond', serif" }}>
            Không tìm thấy thiệp cưới
          </h2>
          <p className="text-sm text-[#7a5c4f] leading-relaxed">
            Đường dẫn thiệp mời không tồn tại hoặc đã hết hạn lưu trữ. Vui lòng kiểm tra lại liên kết.
          </p>
          <Link to="/" className="inline-block px-6 py-3 bg-[#8b3a52] text-white rounded-xl text-sm font-medium hover:opacity-95 transition-opacity border-0">
            Quay lại trang chủ
          </Link>
        </div>
      </div>
    );
  }

  // Get primary event mapping for maps
  const primaryEvent = weddingData.events.find(
    (ev) => ev.title.toUpperCase().includes("TIỆC") || ev.title.toUpperCase().includes("HÔN LỄ")
  ) || weddingData.events[0];

  const formattedWeddingDateLabel = () => {
    try {
      const d = new Date(weddingData.weddingDate);
      const daysOfWeek = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
      const dayName = daysOfWeek[d.getDay()];
      const day = String(d.getDate()).padStart(2, "0");
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const year = d.getFullYear();
      return `${dayName}, ngày ${day} tháng ${month} năm ${year} · ${weddingData.weddingTime || "18:00"}`;
    } catch {
      return weddingData.weddingDate;
    }
  };

  return (
    <div className="min-h-screen text-center" style={{ backgroundColor: "#fdf6ef", fontFamily: "'DM Sans', sans-serif", color: "#2c1810" }}>
      
      {/* Music toggle */}
      <button
        onClick={() => setMuted(!muted)}
        className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full flex items-center justify-center shadow-lg border border-[#c9828e]/30 transition-all hover:scale-105 cursor-pointer"
        style={{ backgroundColor: "#8b3a52", color: "white" }}
      >
        {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>

      <InvitationCover 
        groomName={weddingData.groomName}
        brideName={weddingData.brideName}
        weddingDate={weddingData.weddingDate}
        coverImageUrl={weddingData.galleryImages?.[0]}
        onScrollNext={() => {
          document.getElementById("countdown")?.scrollIntoView({ behavior: "smooth" });
        }} 
      />

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
            🔗 {formattedWeddingDateLabel()}
          </div>
        </FadeIn>
      </section>

      {/* Divider */}
      <div className="flex items-center justify-center gap-3 py-2">
        <div className="h-px w-24 sm:w-40" style={{ backgroundColor: "rgba(201,130,142,0.25)" }} />
        <span>❤️</span>
        <div className="h-px w-24 sm:w-40" style={{ backgroundColor: "rgba(201,130,142,0.25)" }} />
      </div>

      <LoveStoryTimeline timeline={weddingData.timeline} />

      <GalleryGrid images={weddingData.galleryImages} />

      <EventInfo 
        events={weddingData.events}
        groomFatherName={weddingData.groomFatherName}
        groomMotherName={weddingData.groomMotherName}
        brideFatherName={weddingData.brideFatherName}
        brideMotherName={weddingData.brideMotherName}
      />

      {primaryEvent && (
        <VenueMap 
          locationName={primaryEvent.locationName}
          address={primaryEvent.address}
          mapUrl={primaryEvent.mapUrl}
        />
      )}

      <RsvpForm />

      <GiftRegistry giftInfo={weddingData.giftInfo} />

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
          {weddingData.groomName} & {weddingData.brideName}
        </h2>
        <p className="text-sm mt-3 mb-8" style={{ color: "rgba(255,255,255,0.5)" }}>
          {formattedWeddingDateLabel().split(" · ")[0]} · {primaryEvent?.locationName}
        </p>
        <div className="flex justify-center gap-6 text-sm flex-wrap" style={{ color: "rgba(255,255,255,0.4)" }}>
          {weddingData.contactInfo?.groomPhone && (
            <a href={`tel:${weddingData.contactInfo.groomPhone}`} className="flex items-center gap-2 hover:text-[#c9828e] transition-colors">
              <Phone size={13} /> Chú rể: {weddingData.contactInfo.groomPhone}
            </a>
          )}
          {weddingData.contactInfo?.bridePhone && (
            <a href={`tel:${weddingData.contactInfo.bridePhone}`} className="flex items-center gap-2 hover:text-[#c9828e] transition-colors">
              <Phone size={13} /> Cô dâu: {weddingData.contactInfo.bridePhone}
            </a>
          )}
          {weddingData.contactInfo?.email && (
            <a href={`mailto:${weddingData.contactInfo.email}`} className="flex items-center gap-2 hover:text-[#c9828e] transition-colors">
              <Mail size={13} /> Email
            </a>
          )}
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
