import { useState, useEffect, useRef } from "react";
import { VolumeX, X, Music } from "lucide-react";

import { InvitationCover } from "./InvitationCover";
import { MinimalCoupleSpotlight } from "./components/MinimalCoupleSpotlight";
import { CoverflowGallery } from "./components/CoverflowGallery";
import { EventInfo } from "@/widgets/event-info";
import { Guestbook } from "@/widgets/guestbook";
import { Registry } from "@/widgets/registry";
import { VenueMap } from "@/widgets/venue-map";
import { Timeline } from "@/widgets/timeline";
import { Envelope } from "@/widgets/envelope";
import { RsvpForm } from "@/features/submit-rsvp/ui/RsvpForm";
import { WeddingData } from "@/entities/invitation/model/types";
import { GsapReveal } from "@/shared/ui/GsapReveal";
import { useWeddingMusic, useGuestbook } from "@/shared/lib/hooks";

import img_6 from "@/shared/assets/image/flower/img_6.svg";
import img_7 from "@/shared/assets/image/flower/img_7.svg";
import img_8 from "@/shared/assets/image/flower/img_8.svg";
import img_9 from "@/shared/assets/image/flower/img_9.svg";
import img_19 from "@/shared/assets/image/flower/img_19.webp";
import img_20 from "@/shared/assets/image/flower/img_20.webp";
import img_22 from "@/shared/assets/image/flower/img_22.webp";
import img_23 from "@/shared/assets/image/flower/img_23.webp";
import img_27 from "@/shared/assets/image/flower/img_27.webp";
import img_31 from "@/shared/assets/image/flower/img_31.webp";
import bgPaper from "@/shared/assets/image/paper/paper1.webp";

import arch_1 from "@/shared/assets/image/architecture/img_1.svg";
import arch_2 from "@/shared/assets/image/architecture/img_2.svg";
import arch_3 from "@/shared/assets/image/architecture/img_3.svg";

// Envelope & Giftbox assets for instant preloading
import env_11 from "@/shared/assets/image/envelope/img_11.webp";
import env_12 from "@/shared/assets/image/envelope/img_12.webp";
import flw_26 from "@/shared/assets/image/flower/img_26.webp";
import gift_1 from "@/shared/assets/image/giffbox/img_1.svg";
import gift_2 from "@/shared/assets/image/giffbox/img_2.svg";

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
  const [rsvpModalOpen, setRsvpModalOpen] = useState(false);

  const arch1Ref = useRef<HTMLDivElement>(null);
  const arch2Ref = useRef<HTMLDivElement>(null);
  const arch3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const sy = window.scrollY || window.pageYOffset || 0;
          if (arch1Ref.current) {
            arch1Ref.current.style.transform = `translate3d(-50%, ${sy * 0.12}px, 0)`;
          }
          if (arch2Ref.current) {
            arch2Ref.current.style.transform = `translate3d(-50%, ${sy * 0.1}px, 0)`;
          }
          if (arch3Ref.current) {
            arch3Ref.current.style.transform = `translate3d(-50%, ${sy * 0.08}px, 0)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const colorPalette = {
    primaryColor: "transparent",
    textColor: "#2E3D25",
    cardGradient:
      "linear-gradient(155deg, #8DA672 0%, #69824F 32%, #435832 68%, #26351B 100%)",
  };

  const { playing, togglePlay, setPlaying, audioRef } = useWeddingMusic(
    weddingData.musicUrl,
  );
  const { messages, handleSendMessage } = useGuestbook(weddingData.slug);

  useEffect(() => {
    if (previewMode) {
      setEnvelopeOpen(previewMode === "invitation");
    }

    // Preload invitation envelope & giftbox images silently in background
    if (typeof window !== "undefined") {
      [env_11, env_12, flw_26, img_27, gift_1, gift_2].forEach((img) => {
        const src = typeof img === "string" ? img : img?.src;
        if (src) {
          const i = new window.Image();
          i.src = src;
        }
      });
    }
  }, [previewMode]);

  const onSendMessage = async (name: string, msg: string) => {
    const result = await handleSendMessage(name, msg);
    if (!result.success) {
      alert(result.error || "Gửi lời chúc thất bại!");
    }
  };

  const events = weddingData?.events || [];
  const primaryEvent =
    events.find(
      (ev) =>
        ev?.title?.toUpperCase().includes("TIỆC") ||
        ev?.title?.toUpperCase().includes("HÔN LỄ"),
    ) ||
    events[0];

  return (
    <div className="w-full min-h-screen relative font-sans text-[#7c6a60] overflow-hidden bg-white">
      {/* phong bì */}
      {!envelopeOpen ? (
        <Envelope
          variant="envelope_7"
          groomName={weddingData.groomName}
          brideName={weddingData.brideName}
          weddingDate={weddingData.weddingDate}
          weddingTime={weddingData.weddingTime}
          guestName={guestName}
          isFixed={!previewMode}
          primaryColor="#fdfbf6"
          textColor={colorPalette.textColor}
          onOpen={() => {
            setEnvelopeOpen(true);
            if (weddingData.musicUrl) setPlaying(true);
          }}
        />
      ) : (
        <div className="relative z-10 w-full bg-white flex justify-center">
          <div
            className="w-full max-w-3xl min-h-screen relative z-10 pb-20 shadow-2xl bg-center bg-repeat overflow-hidden"
            style={{
              backgroundColor: "rgb(247, 249, 244)",
              backgroundImage: `url(${bgPaper.src})`,
              backgroundBlendMode: "multiply",
            }}
          >
            <style>{`
              @keyframes float-flower-1 { 0%, 100% { transform: translateY(0px) translateZ(0); } 50% { transform: translateY(-20px) translateZ(0); } }
              @keyframes float-flower-2 { 0%, 100% { transform: translateY(0px) translateZ(0); } 50% { transform: translateY(25px) translateZ(0); } }
              @keyframes fly-across-full-1 {
                0% {
                  transform: translate3d(-140%, 0, 0) rotate(-12deg);
                  opacity: 0;
                }
                6% {
                  opacity: 0.95;
                }
                92% {
                  opacity: 0.95;
                }
                100% {
                  transform: translate3d(820px, -35px, 0) rotate(16deg);
                  opacity: 0;
                }
              }
              @keyframes fly-across-full-2 {
                0% {
                  transform: translate3d(-140%, 0, 0) rotate(10deg);
                  opacity: 0;
                }
                6% {
                  opacity: 0.95;
                }
                92% {
                  opacity: 0.95;
                }
                100% {
                  transform: translate3d(820px, 35px, 0) rotate(-14deg);
                  opacity: 0;
                }
              }
              .animate-float-1 { animation: float-flower-1 7s ease-in-out infinite; will-change: transform; }
              .animate-float-2 { animation: float-flower-2 9s ease-in-out infinite; will-change: transform; }
              .animate-float-3 { animation: float-flower-1 8s ease-in-out infinite; will-change: transform; }
              .animate-float-4 { animation: float-flower-2 10s ease-in-out infinite; will-change: transform; }
              .animate-fly-across-1 { animation: fly-across-full-1 22s linear infinite; will-change: transform, opacity; }
              .animate-fly-across-2 { animation: fly-across-full-2 26s linear infinite 11s; will-change: transform, opacity; }
            `}</style>

            {/* Scrollable background accents */}
            <div className="absolute top-[15%] left-[-15%] w-64 opacity-20 mix-blend-multiply pointer-events-none z-0 animate-float-1">
              <img
                src={img_6.src || (img_6 as unknown as string)}
                alt=""
                decoding="async"
                className="w-full rotate-[15deg]"
              />
            </div>
            <div className="absolute top-[45%] right-[-15%] w-80 opacity-15 mix-blend-multiply pointer-events-none z-0 animate-float-2">
              <img
                src={img_7.src || (img_7 as unknown as string)}
                alt=""
                decoding="async"
                className="w-full -rotate-[20deg]"
              />
            </div>
            <div className="absolute top-[75%] left-[-10%] w-72 opacity-20 mix-blend-multiply pointer-events-none z-0 animate-float-3">
              <img
                src={img_8.src || (img_8 as unknown as string)}
                alt=""
                decoding="async"
                className="w-full rotate-[35deg]"
              />
            </div>
            <div className="absolute bottom-[5%] right-[-5%] w-64 opacity-25 mix-blend-multiply pointer-events-none z-0 animate-float-4">
              <img
                src={img_9.src || (img_9 as unknown as string)}
                alt=""
                decoding="async"
                className="w-full -rotate-[10deg]"
              />
            </div>

            {/* img_31 Foreground Floating Botanical Elements (Size 1x) */}
            <div className="absolute top-[28%] left-0 w-36 sm:w-48 opacity-0 pointer-events-none z-30 drop-shadow-[0_12px_24px_rgba(0,0,0,0.18)] animate-fly-across-1">
              <img
                src={img_31.src || (img_31 as unknown as string)}
                alt=""
                decoding="async"
                className="w-full h-auto object-contain"
              />
            </div>
            <div className="absolute top-[66%] left-0 w-40 sm:w-52 opacity-0 pointer-events-none z-30 drop-shadow-[0_12px_24px_rgba(0,0,0,0.18)] animate-fly-across-2">
              <img
                src={img_31.src || (img_31 as unknown as string)}
                alt=""
                decoding="async"
                className="w-full h-auto object-contain"
              />
            </div>

            {/* Botanical Floral Corner & Side Accents (Exclusive for temp_7) */}
            <div className="absolute top-[24%] -right-[25px] sm:-right-[15px] w-48 sm:w-60 opacity-45 mix-blend-multiply pointer-events-none z-0">
              <img
                src={img_19.src || (img_19 as unknown as string)}
                alt=""
                decoding="async"
                className="w-full h-auto object-contain -rotate-[12deg]"
              />
            </div>
            <div className="absolute top-[48%] -left-[30px] sm:-left-[20px] w-52 sm:w-64 opacity-40 mix-blend-multiply pointer-events-none z-0">
              <img
                src={img_20.src || (img_20 as unknown as string)}
                alt=""
                decoding="async"
                className="w-full h-auto object-contain rotate-[18deg]"
              />
            </div>
            <div className="absolute top-[70%] -right-[30px] sm:-right-[20px] w-48 sm:w-60 opacity-45 mix-blend-multiply pointer-events-none z-0">
              <img
                src={img_22.src || (img_22 as unknown as string)}
                alt=""
                decoding="async"
                className="w-full h-auto object-contain -rotate-[8deg]"
              />
            </div>
            <div className="absolute bottom-[8%] -left-[25px] sm:-left-[15px] w-52 sm:w-64 opacity-45 mix-blend-multiply pointer-events-none z-0">
              <img
                src={img_23.src || (img_23 as unknown as string)}
                alt=""
                decoding="async"
                className="w-full h-auto object-contain rotate-[14deg]"
              />
            </div>

            {/* Architectural sketch watermark backgrounds (Centered & Scroll-Driven Parallax) */}
            <div
              ref={arch1Ref}
              className="absolute top-[1%] left-1/2 w-[145%] max-w-none scale-140 sm:scale-[1.65] opacity-[0.18] pointer-events-none z-0 will-change-transform -translate-x-1/2"
            >
              <img
                src={arch_1.src || (arch_1 as unknown as string)}
                alt=""
                decoding="async"
                className="w-full h-auto object-contain"
              />
            </div>
            <div
              ref={arch2Ref}
              className="absolute top-[34%] left-1/2 w-[145%] max-w-none scale-140 sm:scale-[1.65] opacity-[0.18] pointer-events-none z-0 will-change-transform -translate-x-1/2"
            >
              <img
                src={arch_2.src || (arch_2 as unknown as string)}
                alt=""
                decoding="async"
                className="w-full h-auto object-contain"
              />
            </div>
            <div
              ref={arch3Ref}
              className="absolute top-[66%] left-1/2 w-[145%] max-w-none scale-140 sm:scale-[1.65] opacity-[0.18] pointer-events-none z-0 will-change-transform -translate-x-1/2"
            >
              <img
                src={arch_3.src || (arch_3 as unknown as string)}
                alt=""
                decoding="async"
                className="w-full h-auto object-contain"
              />
            </div>

            {/* hero */}
            <InvitationCover
              weddingData={weddingData}
              guestName={guestName}
            />
            <div className="relative pt-2 sm:pt-4">
              {/* thông tin chú rể & cô dâu */}
              <MinimalCoupleSpotlight weddingData={weddingData} />

              {/* bộ sưu tập ảnh 3D Coverflow */}
              <CoverflowGallery weddingData={weddingData} />

              {/* thông tin tiệc cưới */}
              <EventInfo
                variantId="EventInfo1"
                weddingData={weddingData}
                onOpenRsvpModal={() => setRsvpModalOpen(true)}
                primaryColor={colorPalette.primaryColor}
                textColor={colorPalette.cardGradient}
                flowerImage={img_27.src || (img_27 as unknown as string)}
              />

              {/* địa điểm */}
              {primaryEvent && (
                <VenueMap
                  variantId="minimal"
                  event={primaryEvent}
                  primaryColor={colorPalette.primaryColor}
                  textColor={colorPalette.textColor}
                  fontFamily='"Times New Roman", serif'
                />
              )}

              {/* time line */}
              <Timeline
                variant="Timeline1"
                weddingData={weddingData}
                primaryColor={colorPalette.primaryColor}
                textColor={colorPalette.cardGradient}
                flowerImage={img_27.src || (img_27 as unknown as string)}
              />
            </div>

            {/* sổ lời chúc */}
            <GsapReveal direction="up" distance={50} duration={1.2}>
              <Guestbook
                variantId="guestbook_4"
                messages={messages}
                guestName={guestName}
                onSendMessage={onSendMessage}
                primaryColor={colorPalette.primaryColor}
                textColor={colorPalette.textColor}
              />
            </GsapReveal>

            {/* mừng cưới */}
            <GsapReveal direction="up" distance={50} duration={1.2}>
              <Registry
                variantId="register_4"
                weddingData={weddingData}
                textColor={colorPalette.textColor}
              />
            </GsapReveal>
            <h4
              className="text-center text-sm px-4 font-serif pb-8"
              style={{ color: colorPalette.textColor }}
            >
              Sự hiện diện của quý khách là niềm vinh hạnh tới gia đình chúng
              tôi
            </h4>
          </div>

          {/* Nút bật/tắt nhạc */}
          <button
            onClick={togglePlay}
            className={`fixed bottom-6 right-6 z-50 w-12 h-12 flex items-center justify-center rounded-full transition-all duration-500 shadow-xl cursor-pointer ${
              playing
                ? "bg-[#2E3D25] text-white shadow-[0_0_25px_rgba(46,61,37,0.6)]"
                : "bg-white/90 backdrop-blur-md text-[#2E3D25] border border-[#2E3D25]/30 hover:bg-white"
            } hover:scale-110 active:scale-95`}
            aria-label={playing ? "Tắt nhạc" : "Bật nhạc"}
          >
            <div className={playing ? "animate-[spin_4s_linear_infinite]" : ""}>
              {playing ? <Music size={20} /> : <VolumeX size={20} />}
            </div>
            {playing && (
              <div className="absolute inset-0 rounded-full border-2 border-white/50 animate-ping opacity-30 pointer-events-none"></div>
            )}
          </button>

          {/* Audio Element */}
          <audio ref={audioRef} loop preload="auto">
            <source
              src={(weddingData as any).musicUrl || "/audio/wedding-song.mp3"}
              type="audio/mpeg"
            />
          </audio>

          {/* RSVP Modal */}
          {rsvpModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
              <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={() => setRsvpModalOpen(false)}
              />
              <div className="bg-[#fdfbf6] rounded-3xl w-full max-w-md relative flex flex-col max-h-[90vh] overflow-hidden shadow-2xl border border-[#2E3D25]/20 animate-in fade-in zoom-in duration-300">
                <div className="p-4 flex justify-between items-center border-b border-[#2E3D25]/10 shrink-0">
                  <div className="w-8" />
                  <h3 className="text-lg text-[#2E3D25] font-serif tracking-widest uppercase">
                    Xác Nhận Tham Dự
                  </h3>
                  <button
                    onClick={() => setRsvpModalOpen(false)}
                    className="w-8 h-8 flex items-center justify-center text-[#2E3D25]/70 hover:text-[#2E3D25] transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="p-4 sm:p-6 overflow-y-auto custom-scrollbar">
                  <RsvpForm
                    weddingSlug={weddingData.slug}
                    prefilledName={guestName}
                    theme="temp4"
                    textColor={colorPalette.textColor}
                    primaryColor="#fdfbf6"
                    hideMessage
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
