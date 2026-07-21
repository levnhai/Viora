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
import { formatDate } from "@/shared/lib/utils/date";
import hyImg from "@/shared/assets/image/hy/img_1.webp";
import bgImg1 from "@/shared/assets/image/hy/img_2.webp";
import bgImg2 from "@/shared/assets/image/hy/img_3.webp";
import frame1Svg from "@/shared/assets/image/frame/frame_1.svg";

import { InvitationCover } from "./InvitationCover";
import { Timeline } from "@/widgets/timeline";
import { GalleryGrid } from "@/widgets/gallery";
import { useWeddingMusic, useGuestbook } from "@/shared/lib/hooks";
import { Envelope } from "@/widgets/envelope";
import { greatVibes, playfairDisplay } from "@/shared/lib/fonts";
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
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const { playing, togglePlay, setPlaying, audioRef } = useWeddingMusic(weddingData.musicUrl || "https://assets.mixkit.co/music/preview/mixkit-beautiful-dream-200.mp3");
  const { messages, handleSendMessage } = useGuestbook(weddingData.slug);

  useEffect(() => {
    if (previewMode) {
      setEnvelopeOpen(previewMode === "invitation");
    }
  }, [previewMode]);

  const onSendMessage = async (name: string, msg: string) => {
    const result = await handleSendMessage(name, msg);
    if (!result.success) {
      alert(result.error || "Gửi lời chúc thất bại!");
    }
  };

  return (
    <div className={`w-full relative font-sans text-center long-phung-theme transition-all duration-500 ${!envelopeOpen ? "h-[100dvh] overflow-hidden" : ""}`}>
      {/* Background audio */}
      <audio ref={audioRef} src="https://assets.mixkit.co/music/preview/mixkit-beautiful-dream-200.mp3" loop />

      {!envelopeOpen && (
        <Envelope
          variant="floral"
          groomName={weddingData.groomName}
          brideName={weddingData.brideName}
          weddingDate={weddingData.weddingDate}
          guestName={guestName}
          isFixed={!previewMode}
          onOpen={() => {
            setEnvelopeOpen(true);
            if (weddingData.musicUrl) setPlaying(true);
          }}
        />
      )}

      {/* Main Content (Shown after envelope opens) */}
      <div className={`transition-opacity duration-1000 ${envelopeOpen ? "opacity-100" : "opacity-0"}`}>
        {/* Fixed Music Toggle */}
        <button
          onClick={togglePlay}
          className="fixed bottom-6 right-6 z-40 w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-b from-[#aa0000] to-[#5a0000] text-[#ffd700] flex items-center justify-center border-2 border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.4)] active:scale-95 transition-all cursor-pointer"
        >
          {playing ? <Volume2 size={18} /> : <VolumeX size={18} />}
        </button>

        {/* ── BACKGROUND FIXED MÔ TÍP ── */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-[#8b0000] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#aa0000] via-[#8b0000] to-[#5a0000]"></div>
          {/* Đan xen nhau làm background chìm */}
          <img src={bgImg1.src} alt="" className="absolute top-[5%] -left-[10%] md:left-[5%] w-[300px] md:w-[400px] opacity-20 mix-blend-screen" />
          <img src={bgImg2.src} alt="" className="absolute bottom-[5%] -right-[10%] md:right-[5%] w-[300px] md:w-[400px] opacity-20 mix-blend-screen" />
        </div>

        {/* ── INVITATION COVER (Full Screen) ── */}
        <InvitationCover
          onScrollNext={() => contentRef.current?.scrollIntoView({ behavior: "smooth" })}
          groomName={weddingData.groomName}
          brideName={weddingData.brideName}
          weddingDate={weddingData.weddingDate}
          guestName={guestName}
          coverImageUrl={weddingData.coverImage}
        />

        <div ref={contentRef} className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 pb-20 pt-10">
          
          {/* ── ARCH COVER ── */}
          <section className="mb-12 md:mb-20 flex flex-col items-center w-full">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-8 w-full">
              <h1 className={`${greatVibes.className} text-[3rem] md:text-[5rem] text-[#ffd700] flex-1 md:text-right whitespace-nowrap drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]`}>
                {weddingData.groomName}
              </h1>
              <div className="w-16 h-16 md:w-20 md:h-20 shrink-0 border-2 border-[#d4af37] rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.3)] bg-[#8b0000]/50 backdrop-blur-sm animate-float">
                 <img src={hyImg.src} className="w-10 h-10 md:w-12 md:h-12" alt="Hỷ" />
              </div>
              <h1 className={`${greatVibes.className} text-[3rem] md:text-[5rem] text-[#ffd700] flex-1 md:text-left whitespace-nowrap drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]`}>
                {weddingData.brideName}
              </h1>
            </div>

            {weddingData.galleryImages && weddingData.galleryImages[0] && (
              <div className="relative w-full max-w-xs md:max-w-md mx-auto mt-8 md:mt-12 mb-8 drop-shadow-2xl">
                {/* 2 Birds on top left and right - Using placeholders for now if not available, keeping img tag structure */}
                <img src="https://chungdoi.com/images/themes/longphung-v3-red/chim-en.webp" className="absolute -top-8 md:-top-12 -left-4 md:-left-12 w-20 md:w-32 -scale-x-100 opacity-90 z-20" alt="chim én" />
                <img src="https://chungdoi.com/images/themes/longphung-v3-red/chim-en.webp" className="absolute -top-8 md:-top-12 -right-4 md:-right-12 w-20 md:w-32 opacity-90 z-20" alt="chim én" />

                {/* The framed image container */}
                <div className="relative aspect-[754/1099] w-full border-[6px] md:border-[10px] border-[#d4af37] rounded-tl-full rounded-tr-full overflow-hidden shadow-[0_0_30px_rgba(212,175,55,0.4)]">
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
                    className="absolute inset-0 w-full h-full pointer-events-none z-10 mix-blend-multiply opacity-50" 
                  />
                </div>
              </div>
            )}
            
            <p className={`${playfairDisplay.className} mt-6 md:mt-8 text-[#ffd700] text-sm md:text-lg tracking-[0.2em] md:tracking-[0.4em] uppercase font-bold`}>{formatDate(weddingData.weddingDate)}</p>
          </section>

          {/* ── WEDDING EVENTS ── */}
          <section id="countdown" className="mb-16 md:mb-24 relative">
            <div className="flex items-center justify-center gap-4 mb-8 md:mb-12">
              <div className="w-12 md:w-24 h-[1px] bg-gradient-to-r from-transparent to-[#d4af37]"></div>
              <h2 className={`${playfairDisplay.className} text-xl md:text-3xl text-[#ffd700] uppercase tracking-widest m-0 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]`}>Sự Kiện</h2>
              <div className="w-12 md:w-24 h-[1px] bg-gradient-to-l from-transparent to-[#d4af37]"></div>
            </div>

            <div className="grid gap-8 md:gap-12 md:grid-cols-2">
              {weddingData.events.map((ev, idx) => (
                <div key={idx} className="relative p-6 md:p-8 bg-gradient-to-b from-[#8b0000] to-[#5a0000] border border-[#d4af37]/40 rounded-t-full rounded-b-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)] group hover:-translate-y-2 transition-transform duration-300">
                  <div className="absolute inset-0 opacity-20 pointer-events-none flex justify-center items-center overflow-hidden mix-blend-screen">
                     <img src={idx === 0 ? bgImg1.src : bgImg2.src} className="w-[120%] h-[120%] object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                  </div>
                  
                  <div className="relative z-10 flex flex-col items-center pt-10 md:pt-14">
                    <h3 className={`${playfairDisplay.className} text-[#ffd700] text-xl md:text-2xl uppercase mb-2 md:mb-4 tracking-widest drop-shadow-md`}>{ev.title}</h3>
                    <div className="w-16 h-[2px] bg-[#d4af37]/50 mb-4 md:mb-6"></div>
                    
                    <p className={`${playfairDisplay.className} text-white text-lg md:text-xl mb-2 font-medium`}>{ev.date}</p>
                    <p className="text-[#ffd700] font-sans text-[10px] md:text-xs uppercase tracking-[0.2em] mb-6 md:mb-8 bg-[#5a0000]/80 px-4 py-1.5 rounded-full border border-[#d4af37]/30">Thời gian: {ev.time}</p>
                    
                    <div className="bg-[#5a0000]/80 w-full p-4 md:p-6 rounded-xl border border-[#d4af37]/30 text-sm md:text-base backdrop-blur-md shadow-inner">
                      <p className="font-bold text-[#ffd700] mb-2 text-base md:text-lg">{ev.locationName}</p>
                      <p className="text-white/90 text-xs md:text-sm leading-relaxed">{ev.address}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── TIMELINE ── */}
          {weddingData.timeline && weddingData.timeline.length > 0 && (
            <section className="mb-16 md:mb-24">
              <div className="flex items-center justify-center gap-4 mb-8 md:mb-12">
                <div className="w-12 md:w-24 h-[1px] bg-gradient-to-r from-transparent to-[#d4af37]"></div>
                <h2 className={`${playfairDisplay.className} text-xl md:text-3xl text-[#ffd700] uppercase tracking-widest m-0 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]`}>Lịch Trình</h2>
                <div className="w-12 md:w-24 h-[1px] bg-gradient-to-l from-transparent to-[#d4af37]"></div>
              </div>
              <div className="bg-gradient-to-b from-[#8b0000]/80 to-[#5a0000]/80 rounded-2xl p-4 md:p-8 border border-[#d4af37]/30 shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-sm">
                <Timeline variant="vertical" data={weddingData.timeline} />
              </div>
            </section>
          )}

          {/* ── GALLERY ── */}
          {weddingData.galleryImages && weddingData.galleryImages.length > 0 && (
            <section className="mb-16 md:mb-24">
              <div className="flex items-center justify-center gap-4 mb-8 md:mb-12">
                <div className="w-12 md:w-24 h-[1px] bg-gradient-to-r from-transparent to-[#d4af37]"></div>
                <h2 className={`${playfairDisplay.className} text-xl md:text-3xl text-[#ffd700] uppercase tracking-widest m-0 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]`}>Album Ảnh</h2>
                <div className="w-12 md:w-24 h-[1px] bg-gradient-to-l from-transparent to-[#d4af37]"></div>
              </div>
              <div className="bg-[#8b0000]/30 p-2 md:p-4 rounded-2xl border border-[#d4af37]/20 backdrop-blur-sm">
                 <GalleryGrid variant="masonry" images={weddingData.galleryImages} />
              </div>
            </section>
          )}

          {/* ── GIFT INFO ── */}
          <section className="mb-16 md:mb-24">
             <div className="flex items-center justify-center gap-4 mb-6 md:mb-8">
              <div className="w-12 md:w-24 h-[1px] bg-gradient-to-r from-transparent to-[#d4af37]"></div>
              <h2 className={`${playfairDisplay.className} text-xl md:text-3xl text-[#ffd700] uppercase tracking-widest m-0 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]`}>Hộp Mừng Cưới</h2>
              <div className="w-12 md:w-24 h-[1px] bg-gradient-to-l from-transparent to-[#d4af37]"></div>
            </div>
            
            <p className="text-[#f3e5c8]/90 text-xs md:text-sm italic mb-8 md:mb-12 max-w-2xl mx-auto px-4 font-sans leading-relaxed">
              Sự hiện diện của quý vị là món quà quý giá nhất đối với chúng tôi. Nếu có lòng gửi thiệp mừng, quý vị có thể gửi qua số tài khoản dưới đây:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
               {weddingData.giftInfo?.groomAccountNumber && (
                  <div className="p-6 md:p-8 bg-gradient-to-b from-[#b22222] to-[#8b0000] border-2 border-[#d4af37] rounded-xl text-left relative overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.4)] group">
                    {/* Flap of the red envelope */}
                    <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-[#d4af37]/20 to-transparent pointer-events-none rounded-t-xl border-b border-[#d4af37]/30"></div>
                    
                    <img src={bgImg1.src} className="absolute -bottom-10 -right-10 w-48 opacity-20 mix-blend-screen group-hover:scale-110 transition-transform duration-500" alt="" />
                    <div className="flex justify-between items-start mb-6 border-b border-[#d4af37]/30 pb-4 relative z-10">
                      <p className={`${playfairDisplay.className} text-[#ffd700] text-lg md:text-xl uppercase tracking-widest font-bold`}>Nhà Trai</p>
                      <div className="w-8 h-8 rounded-full border border-[#d4af37] flex items-center justify-center bg-[#8b0000]">
                        <img src={hyImg.src} className="w-5 h-5" alt="Hỷ" />
                      </div>
                    </div>
                    <div className="space-y-3 relative z-10 font-sans">
                      <p className="text-sm md:text-base text-[#f3e5c8]/80">Ngân hàng: <span className="text-white font-medium ml-2">{weddingData.giftInfo.groomBankName}</span></p>
                      <p className="text-sm md:text-base text-[#f3e5c8]/80 flex items-center">
                        Số tài khoản: 
                        <span className="text-[#ffd700] font-bold text-lg md:text-xl ml-2 bg-[#5a0000]/50 px-3 py-1 rounded-md">{weddingData.giftInfo.groomAccountNumber}</span>
                      </p>
                      <p className="text-sm md:text-base text-[#f3e5c8]/80">Chủ tài khoản: <span className="text-white font-medium ml-2 uppercase">{weddingData.giftInfo.groomAccountName}</span></p>
                    </div>
                  </div>
                )}
                {weddingData.giftInfo?.brideAccountNumber && (
                  <div className="p-6 md:p-8 bg-gradient-to-b from-[#b22222] to-[#8b0000] border-2 border-[#d4af37] rounded-xl text-left relative overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.4)] group">
                    {/* Flap of the red envelope */}
                    <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-[#d4af37]/20 to-transparent pointer-events-none rounded-t-xl border-b border-[#d4af37]/30"></div>
                    
                    <img src={bgImg2.src} className="absolute -bottom-10 -right-10 w-48 opacity-20 mix-blend-screen group-hover:scale-110 transition-transform duration-500" alt="" />
                    <div className="flex justify-between items-start mb-6 border-b border-[#d4af37]/30 pb-4 relative z-10">
                      <p className={`${playfairDisplay.className} text-[#ffd700] text-lg md:text-xl uppercase tracking-widest font-bold`}>Nhà Gái</p>
                      <div className="w-8 h-8 rounded-full border border-[#d4af37] flex items-center justify-center bg-[#8b0000]">
                        <img src={hyImg.src} className="w-5 h-5" alt="Hỷ" />
                      </div>
                    </div>
                    <div className="space-y-3 relative z-10 font-sans">
                      <p className="text-sm md:text-base text-[#f3e5c8]/80">Ngân hàng: <span className="text-white font-medium ml-2">{weddingData.giftInfo.brideBankName}</span></p>
                      <p className="text-sm md:text-base text-[#f3e5c8]/80 flex items-center">
                        Số tài khoản: 
                        <span className="text-[#ffd700] font-bold text-lg md:text-xl ml-2 bg-[#5a0000]/50 px-3 py-1 rounded-md">{weddingData.giftInfo.brideAccountNumber}</span>
                      </p>
                      <p className="text-sm md:text-base text-[#f3e5c8]/80">Chủ tài khoản: <span className="text-white font-medium ml-2 uppercase">{weddingData.giftInfo.brideAccountName}</span></p>
                    </div>
                  </div>
                )}
            </div>
          </section>

          {/* ── GUESTBOOK ── */}
          <section className="mb-16 md:mb-24">
            <div className="flex items-center justify-center gap-4 mb-8 md:mb-12">
              <div className="w-12 md:w-24 h-[1px] bg-gradient-to-r from-transparent to-[#d4af37]"></div>
              <h2 className={`${playfairDisplay.className} text-xl md:text-3xl text-[#ffd700] uppercase tracking-widest m-0 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]`}>Sổ Lưu Bút</h2>
              <div className="w-12 md:w-24 h-[1px] bg-gradient-to-l from-transparent to-[#d4af37]"></div>
            </div>
            
            <div className="max-w-2xl mx-auto">
              <div className="bg-gradient-to-b from-[#fffaf0] to-[#fdf5e6] rounded-2xl p-6 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-4 border-[#8b0000]/20 relative">
                 {/* Decorative corners */}
                 <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-[#8b0000] opacity-50 rounded-tl-lg"></div>
                 <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-[#8b0000] opacity-50 rounded-tr-lg"></div>
                 <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-[#8b0000] opacity-50 rounded-bl-lg"></div>
                 <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-[#8b0000] opacity-50 rounded-br-lg"></div>

                 <GuestbookForm onSendMessage={onSendMessage} />
              </div>
              <div className="mt-8 text-[#5a0000] bg-gradient-to-b from-[#fffaf0] to-[#fdf5e6] rounded-2xl p-4 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-4 border-[#8b0000]/20 max-h-[500px] overflow-y-auto custom-scrollbar">
                 <GuestbookList messages={messages} />
              </div>
            </div>
          </section>

          {/* ── FOOTER ── */}
          <footer className="pt-12 pb-16 border-t border-[#d4af37]/30 text-center flex flex-col items-center">
             <div className="w-12 h-12 md:w-16 md:h-16 border-2 border-[#d4af37] rounded-full flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(212,175,55,0.3)] bg-[#8b0000]/50 backdrop-blur-sm animate-float">
               <img src={hyImg.src} className="w-6 h-6 md:w-8 md:h-8" alt="Hỷ" />
            </div>
            <h2 className={`${playfairDisplay.className} text-2xl md:text-4xl text-[#ffd700] tracking-[0.2em] md:tracking-[0.3em] uppercase mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]`}>Trân Trọng Cảm Ơn</h2>
            <p className={`${greatVibes.className} text-3xl md:text-5xl text-[#f3e5c8] mt-4 mb-2 opacity-90`}>
              {weddingData.groomName} &amp; {weddingData.brideName}
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
