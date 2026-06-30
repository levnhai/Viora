import { useState, useEffect, useRef } from "react";
import {
  Volume2,
  VolumeX,
  Heart,
  Calendar,
  MapPin,
  Phone,
} from "lucide-react";

import { useCountdown } from "@/shared/lib/hooks";
import { WeddingData } from "@/entities/invitation/model/types";
import { GuestbookForm } from "@/features/write-guestbook/ui/GuestbookForm";
import {
  GuestbookList,
  GuestMessage,
} from "@/entities/invitation/ui/GuestbookList";
import { FadeIn } from "@/shared/ui/FadeIn";
import { API_URL } from "@/shared/lib/config";
import { formatTimeAgo } from "@/shared/lib/utils/date";

import { Envelope } from "@/widgets/envelope";
import { InvitationCover } from "./InvitationCover";
import { Timeline } from "@/widgets/timeline";
import { GalleryGrid } from "@/widgets/gallery";

interface LiveViewProps {
  weddingData: WeddingData;
  guestName?: string;
  previewMode?: "envelope" | "invitation";
}

export function LiveView({
  weddingData,
  guestName,
  previewMode,
}: LiveViewProps) {
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
    fetch(`${API_URL}/api/weddings/${weddingData.slug}/guestbook`)
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
        `${API_URL}/api/weddings/${weddingData.slug}/guestbook`,
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

  const primaryEvent = weddingData.events[0];

  return (
    <div
      className={`w-full relative font-sans text-center bg-background text-foreground transition-all duration-500 ${
        !envelopeOpen ? "h-screen overflow-hidden" : ""
      }`}
    >
      {/* Background Audio */}
      <audio
        ref={audioRef}
        src="https://assets.mixkit.co/music/preview/mixkit-beautiful-dream-200.mp3"
        loop
      />

      {/* ── ENVELOPE INTRO ── */}
      {!envelopeOpen && (
        <Envelope
          variant="lavender"
          weddingData={weddingData}
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

      {/* Music toggle */}
      {envelopeOpen && (
        <button
          onClick={() => setPlaying(!playing)}
          className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-[#7c4d90] text-white flex items-center justify-center border-2 border-white shadow-lg active:scale-95 transition-all cursor-pointer"
        >
          {playing ? <Volume2 size={16} /> : <VolumeX size={16} />}
        </button>
      )}

      {/* ── CUSTOM COVER SECTION ── */}
      <InvitationCover
        onScrollNext={() => {
          document
            .getElementById("countdown")
            ?.scrollIntoView({ behavior: "smooth" });
        }}
        groomName={weddingData.groomName}
        brideName={weddingData.brideName}
        weddingDate={weddingData.weddingDate}
        coverImageUrl={weddingData.galleryImages?.[0]}
        guestName={guestName}
      />

      {/* ── SINGLE PORTRAIT COVER IMAGE ── */}
      {weddingData.galleryImages && weddingData.galleryImages[0] && (
        <section className="py-16 px-6 bg-card text-center space-y-6">
          <div className="max-w-xs mx-auto bg-white p-3 shadow-md border border-[#eee4f3] rounded-sm transform rotate-1">
            <div className="w-full aspect-[4/5] overflow-hidden bg-stone-100">
              <img
                src={weddingData.galleryImages[0]}
                alt="Couple photo"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-3xs uppercase mt-3 tracking-widest text-[#7c4d90] font-semibold">
              Our Happy Moment
            </p>
          </div>
        </section>
      )}

      {/* ── COUNTDOWN ── */}
      <section
        id="countdown"
        className="py-16 px-6 bg-background border-t border-[#7c4d90]/10"
      >
        <FadeIn>
          <h2
            className="text-xl text-[#7c4d90] font-semibold mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Đếm ngược ngày chung đôi
          </h2>
          <div className="flex justify-center gap-3">
            {[
              { val: countdown.days, label: "Ngày" },
              { val: countdown.hours, label: "Giờ" },
              { val: countdown.minutes, label: "Phút" },
              { val: countdown.seconds, label: "Giây" },
            ].map(({ val, label }) => (
              <div key={label} className="text-center">
                <div className="w-16 h-16 bg-[#eee4f3]/50 border border-[#7c4d90]/15 rounded-xl flex flex-col items-center justify-center">
                  <span className="text-xl font-bold text-[#7c4d90]">
                    {String(val).padStart(2, "0")}
                  </span>
                </div>
                <p className="text-[10px] mt-1.5 text-[#705d7b] uppercase font-semibold">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ── EVENT INFO ── */}
      <section className="py-16 px-6 bg-card border-t border-[#7c4d90]/10">
        <h2
          className="text-xl text-[#7c4d90] font-semibold mb-8"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Thông tin Hôn lễ
        </h2>
        <div className="space-y-6 max-w-sm mx-auto">
          {weddingData.events.map((ev, index) => (
            <div
              key={index}
              className="p-5 bg-background border border-[#7c4d90]/15 rounded-2xl text-left space-y-3 shadow-xs"
            >
              <span className="text-3xs bg-[#eee4f3] text-[#7c4d90] px-2.5 py-1 rounded-full font-bold uppercase">
                {ev.title}
              </span>
              <div className="space-y-2 text-xs text-[#705d7b] font-sans">
                <p className="flex items-center gap-2">
                  <Calendar size={13} className="text-[#7c4d90]" />
                  <span>
                    {ev.date} vào lúc {ev.time}
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <MapPin size={13} className="text-[#7c4d90]" />
                  <span>
                    {ev.locationName} ({ev.address})
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── LOVE STORY (Timeline) ── */}
      {weddingData.timeline && weddingData.timeline.length > 0 && (
        <div id="love-story" className="bg-background">
          <Timeline variant="vertical" data={weddingData.timeline} />
        </div>
      )}

      {/* ── GALLERY ── */}
      {weddingData.galleryImages && weddingData.galleryImages.length > 0 && (
        <div id="gallery" className="bg-background">
          <GalleryGrid variant="grid" images={weddingData.galleryImages} />
        </div>
      )}

      {/* ── GIFT ── */}
      <section className="py-16 px-6 bg-background border-t border-[#7c4d90]/10">
        <h2
          className="text-xl text-[#7c4d90] font-semibold mb-6"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Mừng cưới
        </h2>
        <div className="space-y-4 max-w-sm mx-auto text-xs text-[#705d7b]">
          <p className="opacity-90">
            Hạnh phúc của chúng mình là sự hiện diện của bạn. Nếu muốn chúc mừng
            thêm, bạn có thể gửi quà cưới qua số tài khoản:
          </p>
          <div className="grid grid-cols-1 gap-4">
            {weddingData.giftInfo?.groomAccountNumber && (
              <div className="p-4 bg-[#eee4f3]/40 border border-[#7c4d90]/10 rounded-xl space-y-2">
                <p className="font-bold text-[#7c4d90] text-[10px] uppercase">
                  Gia đình nhà trai
                </p>
                <p>Ngân hàng: {weddingData.giftInfo.groomBankName}</p>
                <p>Số tài khoản: {weddingData.giftInfo.groomAccountNumber}</p>
                <p>Chủ tài khoản: {weddingData.giftInfo.groomAccountName}</p>
              </div>
            )}
            {weddingData.giftInfo?.brideAccountNumber && (
              <div className="p-4 bg-[#eee4f3]/40 border border-[#7c4d90]/10 rounded-xl space-y-2">
                <p className="font-bold text-[#7c4d90] text-[10px] uppercase">
                  Gia đình nhà gái
                </p>
                <p>Ngân hàng: {weddingData.giftInfo.brideBankName}</p>
                <p>Số tài khoản: {weddingData.giftInfo.brideAccountNumber}</p>
                <p>Chủ tài khoản: {weddingData.giftInfo.brideAccountName}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── GUESTBOOK ── */}
      <section className="py-16 px-6 bg-background border-t border-[#7c4d90]/10 max-w-lg mx-auto">
        <h2
          className="text-xl text-[#7c4d90] font-semibold mb-6"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Sổ lưu bút
        </h2>
        <GuestbookForm onSendMessage={handleSendMessage} />
        <GuestbookList messages={messages} />
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-16 px-6 bg-card border-t border-[#7c4d90]/10 text-center space-y-3">
        <h2
          className="text-3xl font-light text-[#7c4d90]"
          style={{ fontFamily: "'Great Vibes', cursive" }}
        >
          Thank you!
        </h2>
        <p className="text-3xs uppercase tracking-widest text-[#705d7b] font-semibold">
          — {weddingData.groomName} & {weddingData.brideName} —
        </p>
      </footer>
    </div>
  );
}
