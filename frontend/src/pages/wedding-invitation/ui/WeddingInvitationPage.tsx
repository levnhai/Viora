import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router";
import { Volume2, VolumeX, Phone, Mail, Loader2 } from "lucide-react";

import { InvitationCover } from "@/entities/invitation/ui/InvitationCover";
import { CoupleSpotlight } from "@/entities/invitation/ui/CoupleSpotlight";
import { EnvelopeIntro } from "@/entities/invitation/ui/EnvelopeIntro";
import { LoveStoryTimeline } from "@/entities/invitation/ui/LoveStoryTimeline";
import { GalleryGrid } from "@/entities/invitation/ui/GalleryGrid";
import { EventInfo } from "@/entities/invitation/ui/EventInfo";
import { VenueMap } from "@/entities/invitation/ui/VenueMap";
import { GiftRegistry } from "@/entities/invitation/ui/GiftRegistry";
import {
  GuestbookList,
  GuestMessage,
} from "@/entities/invitation/ui/GuestbookList";
import { RsvpForm } from "@/features/submit-rsvp/ui/RsvpForm";
import { GuestbookForm } from "@/features/write-guestbook/ui/GuestbookForm";
import { FadeIn } from "@/shared/ui/FadeIn";
import { SectionHeading } from "@/entities/invitation/ui/SectionHeading";
import { useCountdown } from "@/shared/lib/hooks";
import { WeddingData } from "@/entities/invitation/model/types";
import { WeddingNavigation } from "@/entities/invitation/ui/WeddingNavigation";

function formatTimeAgo(dateStr: string | Date) {
  try {
    const diffMs = Date.now() - new Date(dateStr).getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHr = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHr / 24);

    if (diffSec < 60) return "Vừa xong";
    if (diffMin < 60) return `${diffMin} phút trước`;
    if (diffHr < 24) return `${diffHr} giờ trước`;
    return `${diffDay} ngày trước`;
  } catch {
    return "Mới đây";
  }
}

export function WeddingInvitationPage() {
  const { weddingSlug } = useParams<{ weddingSlug: string }>();
  const queryParams = new URLSearchParams(window.location.search);
  const guestName = queryParams.get("to") || undefined;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [weddingData, setWeddingData] = useState<WeddingData | null>(null);

  const [playing, setPlaying] = useState(false);
  const [messages, setMessages] = useState<GuestMessage[]>([]);
  const [envelopeOpen, setEnvelopeOpen] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize countdown hook conditionally or safely
  const targetTime = weddingData
    ? new Date(weddingData.weddingDate).getTime()
    : Date.now();
  const countdown = useCountdown(targetTime);

  useEffect(() => {
    if (!weddingSlug) return;

    setLoading(true);
    setError(null);

    // Fetch wedding details
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

    // Fetch guestbook messages
    fetch(`http://localhost:8080/api/weddings/${weddingSlug}/guestbook`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          const formatted = data.data.map((item: any) => ({
            name: item.name,
            msg: item.message,
            time: formatTimeAgo(item.createdAt),
          }));
          setMessages(formatted);
        }
      })
      .catch((err) => console.error("Lỗi khi tải sổ lưu bút:", err));
  }, [weddingSlug]);

  useEffect(() => {
    if (audioRef.current) {
      if (playing) {
        audioRef.current.play().catch(() => {
          setPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [playing]);

  const handleSendMessage = async (name: string, msg: string) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/weddings/${weddingSlug}/guestbook`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, message: msg }),
        },
      );
      const data = await response.json();
      if (response.ok && data.success) {
        setMessages((prev) => [{ name, msg, time: "Vừa xong" }, ...prev]);
      } else {
        alert(data.message || "Gửi lời chúc thất bại!");
      }
    } catch (err) {
      console.error(err);
      alert("Đã xảy ra lỗi khi gửi lời chúc!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fdf6ef] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-10 h-10 animate-spin text-[#8b3a52]" />
        <p className="text-sm font-medium text-[#7a5c4f] tracking-wide animate-pulse">
          Đang tải thiệp cưới...
        </p>
      </div>
    );
  }

  if (error || !weddingData) {
    return (
      <div className="min-h-screen bg-[#fdf6ef] flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-white rounded-3xl p-8 max-w-md shadow-md border border-[#c9828e]/20 space-y-5">
          <div className="text-4xl">💔</div>
          <h2
            className="text-2xl font-semibold text-[#8b3a52]"
            style={{ fontFamily: "'EB Garamond', serif" }}
          >
            Không tìm thấy thiệp cưới
          </h2>
          <p className="text-sm text-[#7a5c4f] leading-relaxed">
            Đường dẫn thiệp mời không tồn tại hoặc đã hết hạn lưu trữ. Vui lòng
            kiểm tra lại liên kết.
          </p>
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-[#8b3a52] text-white rounded-xl text-sm font-medium hover:opacity-95 transition-opacity border-0"
          >
            Quay lại trang chủ
          </Link>
        </div>
      </div>
    );
  }

  // Get primary event mapping for maps
  const primaryEvent =
    weddingData.events.find(
      (ev) =>
        ev.title.toUpperCase().includes("TIỆC") ||
        ev.title.toUpperCase().includes("HÔN LỄ"),
    ) || weddingData.events[0];

  const formattedWeddingDateLabel = () => {
    try {
      const d = new Date(weddingData.weddingDate);
      const daysOfWeek = [
        "Chủ Nhật",
        "Thứ Hai",
        "Thứ Ba",
        "Thứ Tư",
        "Thứ Năm",
        "Thứ Sáu",
        "Thứ Bảy",
      ];
      const dayName = daysOfWeek[d.getDay()];
      const day = String(d.getDate()).padStart(2, "0");
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const year = d.getFullYear();
      return `${dayName}, ngày ${day} tháng ${month} năm ${year} · {weddingData.weddingTime || "18:00"}`;
    } catch {
      return weddingData.weddingDate;
    }
  };

  const getThemeClass = (id: number) => {
    if (id === 2) return "theme-green";
    if (id === 3) return "theme-navy";
    return "theme-pink";
  };

  const currentTheme = getThemeClass(weddingData.templateId);

  return (
    <div
      className={`min-h-screen text-center bg-background text-foreground transition-all duration-500 ${currentTheme}`}
    >
      {/* ── ENVELOPE INTRO ────────────────────────────────────────────────── */}
      <EnvelopeIntro
        guestName={guestName}
        groomName={weddingData.groomName}
        brideName={weddingData.brideName}
        onOpen={() => {
          setEnvelopeOpen(true);
          setPlaying(true);
        }}
      />

      {/* Sticky Navigation */}
      <WeddingNavigation
        groomName={weddingData.groomName}
        brideName={weddingData.brideName}
      />

      {/* Audio player */}
      <audio
        ref={audioRef}
        src="https://assets.mixkit.co/music/preview/mixkit-beautiful-dream-200.mp3"
        loop
      />

      {/* Music toggle - Slow Vinyl rotation */}
      <button
        onClick={() => setPlaying(!playing)}
        className={`fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full flex items-center justify-center shadow-lg border border-border transition-all cursor-pointer`}
        style={{
          backgroundColor: "var(--primary)",
          color: "var(--primary-foreground)",
          animation: playing ? "spin 6s linear infinite" : "none",
        }}
      >
        {playing ? <Volume2 size={18} /> : <VolumeX size={18} />}
      </button>

      {/* CSS Spin Keyframes for vinyl disc */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        html {
          scroll-behavior: smooth;
        }
      `}</style>

      {/* ── COVER ─────────────────────────────────────────────────────────── */}
      <div id="cover">
        <InvitationCover
          groomName={weddingData.groomName}
          brideName={weddingData.brideName}
          weddingDate={weddingData.weddingDate}
          coverImageUrl={weddingData.galleryImages?.[0]}
          guestName={guestName}
          onScrollNext={() => {
            document
              .getElementById("countdown")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        />
      </div>

      {/* ── COUNTDOWN ──────────────────────────────────────────────────────── */}
      <section id="countdown" className="py-24 px-4 bg-background">
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
                <div
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center shadow-md border"
                  style={{
                    backgroundColor: "rgba(139,58,82,0.04)",
                    borderColor: "var(--border)",
                  }}
                >
                  <span className="text-3xl sm:text-4xl font-light text-primary">
                    {String(val).padStart(2, "0")}
                  </span>
                </div>
                <p className="text-xs mt-2 uppercase tracking-wider text-muted-foreground">
                  {label}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            🔗 {formattedWeddingDateLabel()}
          </div>
        </FadeIn>
      </section>

      {/* ── SPOTLIGHT ──────────────────────────────────────────────────────── */}
      <CoupleSpotlight
        groomName={weddingData.groomName}
        brideName={weddingData.brideName}
        groomImage={weddingData.galleryImages?.[1]}
        brideImage={weddingData.galleryImages?.[2]}
      />

      {/* Divider */}
      <div className="flex items-center justify-center gap-3 py-2 bg-background">
        <div
          className="h-px w-24 sm:w-40"
          style={{ backgroundColor: "var(--border)" }}
        />
        <span className="text-accent">❤️</span>
        <div
          className="h-px w-24 sm:w-40"
          style={{ backgroundColor: "var(--border)" }}
        />
      </div>

      {/* ── LOVE STORY ────────────────────────────────────────────────────── */}
      <div id="love-story" className="bg-background">
        <LoveStoryTimeline timeline={weddingData.timeline} />
      </div>

      {/* ── GALLERY ───────────────────────────────────────────────────────── */}
      <div id="gallery" className="bg-background">
        <GalleryGrid images={weddingData.galleryImages} />
      </div>

      {/* ── EVENTS ────────────────────────────────────────────────────────── */}
      <div id="events" className="bg-background">
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
      </div>

      {/* ── RSVP & GUESTBOOK ──────────────────────────────────────────────── */}
      <div id="guestbook" className="bg-background py-10">
        <RsvpForm weddingSlug={weddingSlug || ""} prefilledName={guestName} />
        <section className="py-10 px-4 max-w-lg mx-auto">
          <FadeIn>
            <SectionHeading en="Guestbook" vi="Sổ lưu bút" />
          </FadeIn>
          <FadeIn delay={100}>
            <GuestbookForm onSendMessage={handleSendMessage} />
            <GuestbookList messages={messages} />
          </FadeIn>
        </section>
      </div>

      {/* ── GIFT ──────────────────────────────────────────────────────────── */}
      <div id="gift" className="bg-background">
        <GiftRegistry giftInfo={weddingData.giftInfo} />
      </div>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer
        className="py-20 px-4 text-center bg-slate-900 text-white"
        style={{
          backgroundColor: "var(--foreground)",
          color: "var(--background)",
        }}
      >
        <h2
          style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: "2.8rem",
            color: "var(--accent)",
            lineHeight: 1.2,
          }}
        >
          {weddingData.groomName} & {weddingData.brideName}
        </h2>
        <p className="text-sm mt-3 mb-8 opacity-75">
          {formattedWeddingDateLabel().split(" · ")[0]} ·{" "}
          {primaryEvent?.locationName}
        </p>
        <div className="flex justify-center gap-6 text-sm flex-wrap opacity-75">
          {weddingData.contactInfo?.groomPhone && (
            <a
              href={`tel:${weddingData.contactInfo.groomPhone}`}
              className="flex items-center gap-2 hover:text-accent transition-colors"
            >
              <Phone size={13} /> Chú rể: {weddingData.contactInfo.groomPhone}
            </a>
          )}
          {weddingData.contactInfo?.bridePhone && (
            <a
              href={`tel:${weddingData.contactInfo.bridePhone}`}
              className="flex items-center gap-2 hover:text-accent transition-colors"
            >
              <Phone size={13} /> Cô dâu: {weddingData.contactInfo.bridePhone}
            </a>
          )}
          {weddingData.contactInfo?.email && (
            <a
              href={`mailto:${weddingData.contactInfo.email}`}
              className="flex items-center gap-2 hover:text-accent transition-colors"
            >
              <Mail size={13} /> Email
            </a>
          )}
        </div>
        <div className="mt-10 pt-8 border-t border-white/10 opacity-50">
          <p className="text-xs">
            Thiệp được tạo tại{" "}
            <span className="text-accent">thieponline.vn</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
