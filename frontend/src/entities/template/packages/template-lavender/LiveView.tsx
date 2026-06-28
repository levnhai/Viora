import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Heart, MailOpen, Calendar, MapPin, Gift, Phone } from "lucide-react";

import { useCountdown } from "@/shared/lib/hooks";
import { WeddingData } from "@/entities/invitation/model/types";
import { RsvpForm } from "@/features/submit-rsvp/ui/RsvpForm";
import { GuestbookForm } from "@/features/write-guestbook/ui/GuestbookForm";
import { GuestbookList, GuestMessage } from "@/entities/invitation/ui/GuestbookList";
import { FadeIn } from "@/shared/ui/FadeIn";
import { API_URL } from "@/shared/lib/config";

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

  useEffect(() => {
    if (previewMode) {
      setEnvelopeOpen(previewMode === "invitation");
    }
  }, [previewMode]);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const targetTime = new Date(weddingData.weddingDate).getTime();
  const countdown = useCountdown(targetTime);

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
      .catch((err) => console.error("Lỗi tải lời chúc:", err));
  }, [weddingData.slug]);

  useEffect(() => {
    if (audioRef.current) {
      if (playing) {
        audioRef.current.play().catch(() => setPlaying(false));
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
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, message: msg }),
        },
      );
      if (response.ok) {
        setMessages((prev) => [{ name, msg, time: "Vừa xong" }, ...prev]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const primaryEvent = weddingData.events[0];

  return (
    <div className={`w-full relative font-sans text-center bg-background text-foreground transition-all duration-500 ${!envelopeOpen ? "h-screen overflow-hidden" : ""}`}>
      {/* Background Audio */}
      <audio
        ref={audioRef}
        src="https://assets.mixkit.co/music/preview/mixkit-beautiful-dream-200.mp3"
        loop
      />

      {/* ── CUSTOM LAVENDER ENVELOPE ────────────────────────────────────────── */}
      {!envelopeOpen && (
        <div className={`${previewMode ? "absolute" : "fixed"} inset-0 z-50 flex flex-col items-center justify-center bg-[#251b2b] px-6 text-white transition-all duration-1000`}>
          <div className="w-full max-w-sm bg-[#faf8fd] text-[#251b2b] border border-[#7c4d90]/25 rounded-3xl p-8 shadow-2xl relative space-y-6">
            <div className="absolute inset-2 border border-dashed border-[#7c4d90]/20 rounded-2xl pointer-events-none" />
            <div className="space-y-1">
              <span className="text-3xs uppercase tracking-widest text-[#7c4d90] font-semibold">Thư mời gửi tới</span>
              <p className="text-sm font-semibold text-[#7c4d90]" style={{ fontFamily: "'Playfair Display', serif" }}>
                {guestName || "Quý khách mời thân thương"}
              </p>
            </div>
            
            <div className="space-y-2 py-4">
              <h2 className="text-3xl font-light leading-none text-[#7c4d90]" style={{ fontFamily: "'Playfair Display', serif" }}>
                {weddingData.groomName}
              </h2>
              <Heart size={16} className="text-[#ac81bd] mx-auto animate-pulse" fill="currentColor" />
              <h2 className="text-3xl font-light leading-none text-[#7c4d90]" style={{ fontFamily: "'Playfair Display', serif" }}>
                {weddingData.brideName}
              </h2>
            </div>

            <button
              onClick={() => {
                setEnvelopeOpen(true);
                setPlaying(true);
              }}
              className="w-14 h-14 rounded-full bg-[#7c4d90] hover:bg-[#683f7a] text-white flex flex-col items-center justify-center border-4 border-white shadow-lg mx-auto active:scale-95 transition-all cursor-pointer"
            >
              <MailOpen size={18} />
              <span className="text-[8px] uppercase tracking-wider font-bold mt-0.5">Mở</span>
            </button>
          </div>
        </div>
      )}

      {/* Music Toggle */}
      {envelopeOpen && (
        <button
          onClick={() => setPlaying(!playing)}
          className="fixed bottom-6 right-6 z-45 w-12 h-12 rounded-full flex items-center justify-center shadow-lg border border-[#7c4d90]/20 transition-all cursor-pointer bg-[#7c4d90] text-white"
          style={{ animation: playing ? "spin 6s linear infinite" : "none" }}
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

      {/* ── CUSTOM COVER SECTION ───────────────────────────────────────────── */}
      <section className="relative h-[600px] flex flex-col items-center justify-center p-6 overflow-hidden">
        <div className="absolute inset-0 bg-[#eee4f3]/40 z-0" />
        <div className="absolute inset-4 border border-solid border-[#7c4d90]/15 rounded-2xl z-0 pointer-events-none" />
        
        <div className="relative z-10 space-y-6 max-w-md mx-auto">
          <p className="text-3xs uppercase tracking-widest text-[#7c4d90] bg-[#eee4f3] px-3.5 py-1.5 rounded-full inline-block font-semibold">
            Wedding Invitation
          </p>
          <div className="space-y-3">
            <h1 className="text-4xl text-[#7c4d90] font-light" style={{ fontFamily: "'Playfair Display', serif" }}>
              {weddingData.groomName}
            </h1>
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-[#7c4d90]/20" />
              <Heart size={14} className="text-[#ac81bd]" fill="currentColor" />
              <span className="h-px w-10 bg-[#7c4d90]/20" />
            </div>
            <h1 className="text-4xl text-[#7c4d90] font-light" style={{ fontFamily: "'Playfair Display', serif" }}>
              {weddingData.brideName}
            </h1>
          </div>
          
          <div className="py-2 text-[#705d7b] text-xs space-y-1">
            <p className="font-semibold">{weddingData.weddingDate}</p>
            <p className="opacity-85">{weddingData.weddingTime} · {primaryEvent?.locationName}</p>
          </div>

          <p className="text-xs text-[#705d7b] italic max-w-xs mx-auto leading-relaxed">
            {weddingData.customFields?.lavenderQuote || "Một tình yêu đẹp bắt đầu từ những điều giản dị nhất, hôm nay chúng mình chính thức về chung một nhà..."}
          </p>
        </div>
      </section>

      {/* ── PHOTO SPOTLIGHT ────────────────────────────────────────────────── */}
      {weddingData.galleryImages?.[0] && (
        <section className="py-16 px-6 bg-card text-center space-y-6">
          <div className="max-w-xs mx-auto bg-white p-3 shadow-md border border-[#eee4f3] rounded-sm transform rotate-1">
            <div className="w-full aspect-[4/5] overflow-hidden bg-stone-100">
              <img src={weddingData.galleryImages[0]} alt="Couple photo" className="w-full h-full object-cover" />
            </div>
            <p className="text-3xs uppercase mt-3 tracking-widest text-[#7c4d90] font-semibold">Our Happy Moment</p>
          </div>
        </section>
      )}

      {/* ── COUNTDOWN ──────────────────────────────────────────────────────── */}
      <section className="py-16 px-6 bg-background border-t border-[#7c4d90]/10">
        <FadeIn>
          <h2 className="text-xl text-[#7c4d90] font-semibold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            Đếm ngược ngày chung đôi
          </h2>
          <div className="flex justify-center gap-3">
            {[
              { val: countdown.days, label: "Ngày" },
              { val: countdown.hours, label: "Giờ" },
              { val: countdown.minutes, label: "Phút" },
              { val: countdown.seconds, label: "Giây" },
            ].map(({ val, label }) => (
              <div key={label} className="w-16 text-center">
                <div className="h-14 bg-[#eee4f3] border border-[#7c4d90]/10 rounded-xl flex items-center justify-center shadow-sm">
                  <span className="text-xl font-light text-[#7c4d90]">
                    {String(val).padStart(2, "0")}
                  </span>
                </div>
                <p className="text-[10px] mt-1.5 text-[#705d7b] uppercase font-semibold">{label}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ── EVENT INFO ────────────────────────────────────────────────────── */}
      <section className="py-16 px-6 bg-card border-t border-[#7c4d90]/10">
        <h2 className="text-xl text-[#7c4d90] font-semibold mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
          Thông tin Hôn lễ
        </h2>
        <div className="space-y-6 max-w-sm mx-auto">
          {weddingData.events.map((ev, index) => (
            <div key={index} className="p-5 bg-background border border-[#7c4d90]/15 rounded-2xl text-left space-y-3 shadow-xs">
              <span className="text-3xs bg-[#eee4f3] text-[#7c4d90] px-2.5 py-1 rounded-full font-bold uppercase">
                {ev.title}
              </span>
              <div className="space-y-1.5 text-xs text-[#705d7b]">
                <p className="flex items-center gap-2">
                  <Calendar size={13} className="text-[#7c4d90]" />
                  <span>{ev.date} vào lúc {ev.time}</span>
                </p>
                <p className="flex items-center gap-2">
                  <MapPin size={13} className="text-[#7c4d90]" />
                  <span>{ev.locationName} ({ev.address})</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── GIFT ──────────────────────────────────────────────────────────── */}
      <section className="py-16 px-6 bg-background border-t border-[#7c4d90]/10">
        <h2 className="text-xl text-[#7c4d90] font-semibold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
          Mừng cưới
        </h2>
        <div className="space-y-4 max-w-sm mx-auto text-xs text-[#705d7b]">
          <p className="opacity-90">Hạnh phúc của chúng mình là sự hiện diện của bạn. Nếu muốn chúc mừng thêm, bạn có thể gửi quà cưới qua số tài khoản:</p>
          <div className="grid grid-cols-1 gap-4">
            {weddingData.giftInfo?.groomAccountNumber && (
              <div className="p-4 bg-[#eee4f3]/40 border border-[#7c4d90]/10 rounded-xl space-y-2">
                <p className="font-bold text-[#7c4d90] text-[10px] uppercase">Gia đình nhà trai</p>
                <p>Ngân hàng: {weddingData.giftInfo.groomBankName}</p>
                <p>Số tài khoản: {weddingData.giftInfo.groomAccountNumber}</p>
                <p>Chủ tài khoản: {weddingData.giftInfo.groomAccountName}</p>
              </div>
            )}
            {weddingData.giftInfo?.brideAccountNumber && (
              <div className="p-4 bg-[#eee4f3]/40 border border-[#7c4d90]/10 rounded-xl space-y-2">
                <p className="font-bold text-[#7c4d90] text-[10px] uppercase">Gia đình nhà gái</p>
                <p>Ngân hàng: {weddingData.giftInfo.brideBankName}</p>
                <p>Số tài khoản: {weddingData.giftInfo.brideAccountNumber}</p>
                <p>Chủ tài khoản: {weddingData.giftInfo.brideAccountName}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── RSVP ──────────────────────────────────────────────────────────── */}
      <section className="py-16 px-6 bg-card border-t border-[#7c4d90]/10">
        <RsvpForm weddingSlug={weddingData.slug} prefilledName={guestName} />
      </section>

      {/* ── GUESTBOOK ─────────────────────────────────────────────────────── */}
      <section className="py-16 px-6 bg-background border-t border-[#7c4d90]/10 max-w-lg mx-auto">
        <h2 className="text-xl text-[#7c4d90] font-semibold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
          Sổ lưu bút
        </h2>
        <GuestbookForm onSendMessage={handleSendMessage} />
        <div className="mt-6 text-left">
          <GuestbookList messages={messages} />
        </div>
      </section>
    </div>
  );
}
