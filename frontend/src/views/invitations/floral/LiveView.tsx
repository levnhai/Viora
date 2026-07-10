import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Heart, Calendar, MapPin, Phone } from "lucide-react";

import { useCountdown } from "@/shared/lib/hooks";
import { WeddingData } from "@/entities/invitation/model/types";
import { GuestbookForm } from "@/features/write-guestbook/ui/GuestbookForm";
import {
  GuestbookList,
  GuestMessage,
} from "@/entities/invitation/ui/GuestbookList";
import { FadeIn } from "@/shared/ui/FadeIn";
import { API_URL } from "@/shared/lib/config";
import { formatTimeAgo, formatDate } from "@/shared/lib/utils/date";
import hyImg from "@/shared/assets/image/hy/img_1.webp";
import bgImg1 from "@/shared/assets/image/hy/img_2.webp";
import bgImg2 from "@/shared/assets/image/hy/img_3.webp";
import frame1Svg from "@/shared/assets/image/frame/frame_1.svg";

import { LongPhungEnvelope } from "./LongPhungEnvelope";
import { InvitationCover } from "./InvitationCover";
import { Timeline } from "@/widgets/timeline";
import { GalleryGrid } from "@/widgets/gallery";
import "./styles.css";

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
    <div className={`w-full relative font-sans text-center long-phung-theme transition-all duration-500 ${!envelopeOpen ? "h-[100dvh] overflow-hidden" : ""}`}>
      {/* Background audio */}
      <audio ref={audioRef} src="https://assets.mixkit.co/music/preview/mixkit-beautiful-dream-200.mp3" loop />

      {!envelopeOpen && (
        <LongPhungEnvelope
          weddingData={weddingData}
          onOpen={() => {
            setEnvelopeOpen(true);
            setPlaying(true);
          }}
        />
      )}

      {/* Main Content (Shown after envelope opens) */}
      <div className={`transition-opacity duration-1000 ${envelopeOpen ? "opacity-100" : "opacity-0"}`}>
        {/* Fixed Music Toggle */}
        <button
          onClick={() => setPlaying(!playing)}
          className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-[#7a0014] text-[#FFBE89] flex items-center justify-center border-2 border-[#FFBE89] shadow-lg active:scale-95 transition-all cursor-pointer"
        >
          {playing ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </button>

        {/* ── BACKGROUND FIXED MÔ TÍP ── */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-[#7a0014]"></div>
          {/* Đan xen nhau làm background chìm */}
          <img src={bgImg1.src} alt="" className="absolute top-[10%] -left-[10%] w-[500px] opacity-40 rotate-[25deg]" />
          <img src={bgImg2.src} alt="" className="absolute bottom-[10%] -right-[10%] w-[500px] opacity-40 -rotate-[25deg]" />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto px-4 pb-20 pt-10">
          {/* ── ARCH COVER ── */}
          <section className="mb-16 flex flex-col items-center w-full">
            <div className="flex items-center justify-center gap-4 sm:gap-6 mb-8 w-full max-w-2xl mx-auto px-2">
              <h1 style={{ fontFamily: "'Playfair Display', serif", color: "#FFBE89" }} className="text-[1.3rem] sm:text-3xl md:text-4xl uppercase tracking-widest flex-1 text-right whitespace-nowrap">
                {weddingData.groomName}
              </h1>
              <div className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 border border-[#FFBE89] rounded-full flex items-center justify-center">
                 <img src={hyImg.src} className="w-10 h-10 sm:w-12 sm:h-12" alt="Hỷ" />
              </div>
              <h1 style={{ fontFamily: "'Playfair Display', serif", color: "#FFBE89" }} className="text-[1.3rem] sm:text-3xl md:text-4xl uppercase tracking-widest flex-1 text-left whitespace-nowrap">
                {weddingData.brideName}
              </h1>
            </div>

            {weddingData.galleryImages && weddingData.galleryImages[0] && (
              <div className="relative w-[90%] sm:w-[80%] max-w-sm mx-auto mt-12 mb-8">
                {/* 2 Birds on top left and right */}
                <img src="https://chungdoi.com/images/themes/longphung-v3-red/chim-en.webp" className="absolute -top-12 -left-6 sm:-left-12 w-24 sm:w-32 -scale-x-100 opacity-90 z-20" alt="chim én" />
                <img src="https://chungdoi.com/images/themes/longphung-v3-red/chim-en.webp" className="absolute -top-12 -right-6 sm:-right-12 w-24 sm:w-32 opacity-90 z-20" alt="chim én" />

                {/* The framed image container */}
                <div className="relative aspect-[754/1099] w-full">
                  {/* The actual photo */}
                  <img
                    src={weddingData.galleryImages[0]}
                    alt="Cover"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  {/* The SVG frame acting as a cookie-cutter overlay */}
                  <img 
                    src={frame1Svg.src} 
                    alt="Frame" 
                    className="absolute inset-0 w-full h-full pointer-events-none z-10" 
                  />
                </div>
              </div>
            )}
            
            <p className="mt-8 text-[#FFBE89] font-serif tracking-[0.2em]">{formatDate(weddingData.weddingDate)}</p>
          </section>

          {/* ── WEDDING EVENTS ── */}
          <section id="countdown" className="mb-16 relative">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-[#FFBE89]"></div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#FFBE89" }} className="text-2xl uppercase tracking-widest m-0">Sự Kiện</h2>
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-[#FFBE89]"></div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {weddingData.events.map((ev, idx) => (
                <div key={idx} className="relative p-6 bg-[#660000] border-2 border-[#FFBE89]/40 rounded-t-full rounded-b-lg overflow-hidden shadow-xl mt-8">
                  <div className="absolute inset-0 opacity-30 pointer-events-none flex justify-center items-center overflow-hidden">
                     <img src={idx === 0 ? bgImg1.src : bgImg2.src} className="w-[150%] h-[150%] object-cover" alt="" />
                  </div>
                  
                  <div className="relative z-10 flex flex-col items-center pt-8">
                    <h3 className="text-[#FFBE89] font-serif text-xl uppercase mb-1 tracking-widest">{ev.title}</h3>
                    <div className="w-12 h-px bg-[#FFBE89]/30 mb-4"></div>
                    
                    <p className="text-white font-serif text-lg mb-1">{ev.date}</p>
                    <p className="text-[#FFBE89] font-sans text-xs uppercase tracking-widest mb-4">Thời gian: {ev.time}</p>
                    
                    <div className="bg-[#5a0001] w-full p-4 rounded-md border border-[#FFBE89]/20 text-sm">
                      <p className="font-bold text-[#FFBE89] mb-1">{ev.locationName}</p>
                      <p className="text-white/80 text-xs leading-relaxed">{ev.address}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── TIMELINE ── */}
          {weddingData.timeline && weddingData.timeline.length > 0 && (
            <section className="mb-16">
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="w-16 h-px bg-gradient-to-r from-transparent to-[#FFBE89]"></div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#FFBE89" }} className="text-2xl uppercase tracking-widest m-0">Lịch Trình</h2>
                <div className="w-16 h-px bg-gradient-to-l from-transparent to-[#FFBE89]"></div>
              </div>
              <div className="bg-[#660000]/80 rounded-xl p-4 border border-[#FFBE89]/20">
                <Timeline variant="vertical" data={weddingData.timeline} />
              </div>
            </section>
          )}

          {/* ── GALLERY ── */}
          {weddingData.galleryImages && weddingData.galleryImages.length > 0 && (
            <section className="mb-16">
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="w-16 h-px bg-gradient-to-r from-transparent to-[#FFBE89]"></div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#FFBE89" }} className="text-2xl uppercase tracking-widest m-0">Album Ảnh</h2>
                <div className="w-16 h-px bg-gradient-to-l from-transparent to-[#FFBE89]"></div>
              </div>
              <GalleryGrid variant="masonry" images={weddingData.galleryImages} />
            </section>
          )}

          {/* ── GIFT INFO ── */}
          <section className="mb-16">
             <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-[#FFBE89]"></div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#FFBE89" }} className="text-2xl uppercase tracking-widest m-0">Hộp Mừng Cưới</h2>
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-[#FFBE89]"></div>
            </div>
            
            <p className="text-[#f3e5c8]/80 text-sm italic mb-6">Sự hiện diện của quý vị là món quà quý giá nhất. Nếu có lòng gửi thiệp mừng, quý vị có thể gửi qua số tài khoản dưới đây:</p>
            
            <div className="grid sm:grid-cols-2 gap-4">
               {weddingData.giftInfo?.groomAccountNumber && (
                  <div className="p-5 bg-[#5a0001] border border-[#FFBE89]/30 rounded-lg text-left relative overflow-hidden">
                    <img src={bgImg1.src} className="absolute top-[-20%] right-[-10%] w-32 opacity-40" alt="" />
                    <p className="text-[#FFBE89] text-xs uppercase tracking-widest font-bold mb-3 border-b border-[#FFBE89]/20 pb-2 relative z-10">Nhà Trai</p>
                    <p className="text-sm font-serif">NH: <span className="text-white">{weddingData.giftInfo.groomBankName}</span></p>
                    <p className="text-sm font-serif">STK: <span className="text-white font-bold">{weddingData.giftInfo.groomAccountNumber}</span></p>
                    <p className="text-sm font-serif">Tên: <span className="text-white">{weddingData.giftInfo.groomAccountName}</span></p>
                  </div>
                )}
                {weddingData.giftInfo?.brideAccountNumber && (
                  <div className="p-5 bg-[#5a0001] border border-[#FFBE89]/30 rounded-lg text-left relative overflow-hidden">
                    <img src={bgImg2.src} className="absolute bottom-[-20%] right-[-10%] w-32 opacity-40" alt="" />
                    <p className="text-[#FFBE89] text-xs uppercase tracking-widest font-bold mb-3 border-b border-[#FFBE89]/20 pb-2 relative z-10">Nhà Gái</p>
                    <p className="text-sm font-serif">NH: <span className="text-white">{weddingData.giftInfo.brideBankName}</span></p>
                    <p className="text-sm font-serif">STK: <span className="text-white font-bold">{weddingData.giftInfo.brideAccountNumber}</span></p>
                    <p className="text-sm font-serif">Tên: <span className="text-white">{weddingData.giftInfo.brideAccountName}</span></p>
                  </div>
                )}
            </div>
          </section>

          {/* ── GUESTBOOK ── */}
          <section className="mb-16">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-[#FFBE89]"></div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#FFBE89" }} className="text-2xl uppercase tracking-widest m-0">Sổ Lưu Bút</h2>
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-[#FFBE89]"></div>
            </div>
            
            <div className="bg-[#fff7f0] rounded-xl p-1 shadow-2xl">
               <GuestbookForm onSendMessage={handleSendMessage} />
            </div>
            <div className="mt-6 text-[#710001] bg-[#fff7f0] rounded-xl p-4 shadow-2xl">
               <GuestbookList messages={messages} />
            </div>
          </section>

          {/* ── FOOTER ── */}
          <footer className="pt-8 pb-12 border-t border-[#FFBE89]/20 text-center flex flex-col items-center">
             <div className="w-10 h-10 border border-[#FFBE89] rounded-full flex items-center justify-center mb-4">
               <img src={hyImg.src} className="w-6 h-6" alt="Hỷ" />
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-3xl text-[#FFBE89] tracking-widest uppercase mb-2">Trân Trọng Cảm ƠN</h2>
            <p className="text-xs uppercase tracking-[0.2em] text-[#FFBE89]/70 mt-2">
              {weddingData.groomName} &amp; {weddingData.brideName}
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
