import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Phone, Mail } from "lucide-react";

import { EnvelopeIntro } from "@/entities/invitation/ui/EnvelopeIntro";
import { InvitationCover } from "@/entities/invitation/ui/InvitationCover";
import { CoupleSpotlight } from "@/entities/invitation/ui/CoupleSpotlight";
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

interface LiveViewProps {
  weddingData: WeddingData;
  guestName?: string;
  previewMode?: "envelope" | "invitation";
}

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

export function LiveView({ weddingData, guestName, previewMode }: LiveViewProps) {
  const [playing, setPlaying] = useState(false);
  const [messages, setMessages] = useState<GuestMessage[]>([]);
  const [envelopeOpen, setEnvelopeOpen] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const targetTime = new Date(weddingData.weddingDate).getTime();
  const countdown = useCountdown(targetTime);

  useEffect(() => {
    if (previewMode) {
      setEnvelopeOpen(previewMode === "invitation");
    }
  }, [previewMode]);

  useEffect(() => {
    // Tải lời chúc lưu bút
    fetch(`http://localhost:8080/api/weddings/${weddingData.slug}/guestbook`)
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
  }, [weddingData.slug]);

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
        `http://localhost:8080/api/weddings/${weddingData.slug}/guestbook`,
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
      return `${dayName}, ngày ${day} tháng ${month} năm ${year} · ${weddingData.weddingTime || "18:00"}`;
    } catch {
      return weddingData.weddingDate;
    }
  };

  return (
    <div className={`w-full text-center relative font-sans ${!envelopeOpen ? "h-screen overflow-hidden" : ""}`}>
      {/* ── ENVELOPE INTRO ────────────────────────────────────────────────── */}
      {!envelopeOpen && (
        <EnvelopeIntro
          guestName={guestName}
          groomName={weddingData.groomName}
          brideName={weddingData.brideName}
          isFixed={!previewMode}
          onOpen={() => {
            setEnvelopeOpen(true);
            setPlaying(true);
          }}
        />
      )}

      {/* Sticky Navigation */}
      <WeddingNavigation
        groomName={weddingData.groomName}
        brideName={weddingData.brideName}
        isFixed={!previewMode}
      />

      {/* Audio player */}
      <audio
        ref={audioRef}
        src="https://assets.mixkit.co/music/preview/mixkit-beautiful-dream-200.mp3"
        loop
      />

      {/* Music toggle */}
      {envelopeOpen && (
        <button
          onClick={() => setPlaying(!playing)}
          className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full flex items-center justify-center shadow-lg border border-border transition-all cursor-pointer"
          style={{
            backgroundColor: "var(--primary)",
            color: "var(--primary-foreground)",
            animation: playing ? "spin 6s linear infinite" : "none",
          }}
        >
          {playing ? <Volume2 size={18} /> : <VolumeX size={18} />}
        </button>
      )}

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      {/* ── COVER (Hỗ trợ video nếu được cấu hình trong schema) ───────────────── */}
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

      {/* Lời trích dẫn hoàng gia (Custom fields dành riêng cho Royal) */}
      {weddingData.royalQuote && (
        <section className="py-12 px-6 bg-background italic text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
          "{weddingData.royalQuote}"
        </section>
      )}

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

      {/* ── SPOTLIGHT (Hiển thị ảnh chân dung từng người) ────────────────────────── */}
      <CoupleSpotlight
        groomName={weddingData.groomName}
        brideName={weddingData.brideName}
        groomImage={weddingData.galleryImages?.[1]}
        brideImage={weddingData.galleryImages?.[2]}
      />

      {/* Divider */}
      <div className="flex items-center justify-center gap-3 py-2 bg-background">
        <div className="h-px w-24 sm:w-40 bg-border" />
        <span className="text-accent">❤️</span>
        <div className="h-px w-24 sm:w-40 bg-border" />
      </div>

      {/* ── LOVE STORY (Timeline) ────────────────────────────────────────────── */}
      {weddingData.timeline && weddingData.timeline.length > 0 && (
        <div id="love-story" className="bg-background">
          <LoveStoryTimeline timeline={weddingData.timeline} />
        </div>
      )}

      {/* ── GALLERY (Album ảnh cưới đầy đủ) ──────────────────────────────────────── */}
      {weddingData.galleryImages && weddingData.galleryImages.length > 0 && (
        <div id="gallery" className="bg-background">
          <GalleryGrid images={weddingData.galleryImages} />
        </div>
      )}

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
        <RsvpForm weddingSlug={weddingData.slug || ""} prefilledName={guestName} />
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
        <div className="mt-10 pt-8 border-t border-white/10 opacity-30">
          <p className="text-xs">
            Thiệp được tạo tại{" "}
            <span className="text-accent">thieponline.vn</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
