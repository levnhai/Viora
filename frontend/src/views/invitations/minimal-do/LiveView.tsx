import { useState, useEffect } from "react";
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
import bgPaper from "@/shared/assets/image/paper/paper1.webp";

import arch_1 from "@/shared/assets/image/architecture/img_1.svg";
import arch_2 from "@/shared/assets/image/architecture/img_2.svg";
import arch_3 from "@/shared/assets/image/architecture/img_3.svg";

// Envelope & Giftbox assets for instant preloading
import env_9 from "@/shared/assets/image/envelope/img_9.webp";
import env_10 from "@/shared/assets/image/envelope/img_10.webp";
import flw_16 from "@/shared/assets/image/flower/img_16.webp";
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
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY || window.pageYOffset || 0);
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
    textColor: "#4e0b12",
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
      [env_9, env_10, flw_16, gift_1, gift_2].forEach((img) => {
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
    events[0] ||
    {};

  return (
    <div className="w-full min-h-screen relative font-sans text-[#7c6a60] overflow-hidden bg-white">
      {/* phong bì */}
      {!envelopeOpen ? (
        <Envelope
          variant="envelope_6"
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
              backgroundColor: "rgb(255, 247, 243)",
              backgroundImage: `url(${bgPaper.src})`,
              backgroundBlendMode: "multiply",
            }}
          >
            <style>{`
              @keyframes float-flower-1 { 0%, 100% { transform: translateY(0px) translateZ(0); } 50% { transform: translateY(-20px) translateZ(0); } }
              @keyframes float-flower-2 { 0%, 100% { transform: translateY(0px) translateZ(0); } 50% { transform: translateY(25px) translateZ(0); } }
              .animate-float-1 { animation: float-flower-1 7s ease-in-out infinite; will-change: transform; }
              .animate-float-2 { animation: float-float-2 9s ease-in-out infinite; will-change: transform; }
              .animate-float-3 { animation: float-flower-1 8s ease-in-out infinite; will-change: transform; }
              .animate-float-4 { animation: float-flower-2 10s ease-in-out infinite; will-change: transform; }
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

            {/* Architectural sketch watermark backgrounds (Centered & Scroll-Driven Parallax) */}
            <div
              className="absolute top-[1%] left-1/2 w-[145%] max-w-none scale-140 sm:scale-[1.65] opacity-[0.18] mix-blend-multiply pointer-events-none z-0 transition-transform duration-75 ease-out"
              style={{
                transform: `translate3d(-50%, ${scrollY * 0.12}px, 0)`,
                willChange: "transform",
              }}
            >
              <img
                src={arch_1.src || (arch_1 as unknown as string)}
                alt=""
                decoding="async"
                className="w-full h-auto object-contain"
              />
            </div>
            <div
              className="absolute top-[34%] left-1/2 w-[145%] max-w-none scale-140 sm:scale-[1.65] opacity-[0.18] mix-blend-multiply pointer-events-none z-0 transition-transform duration-75 ease-out"
              style={{
                transform: `translate3d(-50%, ${scrollY * 0.1}px, 0)`,
                willChange: "transform",
              }}
            >
              <img
                src={arch_2.src || (arch_2 as unknown as string)}
                alt=""
                decoding="async"
                className="w-full h-auto object-contain"
              />
            </div>
            <div
              className="absolute top-[66%] left-1/2 w-[145%] max-w-none scale-140 sm:scale-[1.65] opacity-[0.18] mix-blend-multiply pointer-events-none z-0 transition-transform duration-75 ease-out"
              style={{
                transform: `translate3d(-50%, ${scrollY * 0.08}px, 0)`,
                willChange: "transform",
              }}
            >
              <img
                src={arch_3.src || (arch_3 as unknown as string)}
                alt=""
                decoding="async"
                className="w-full h-auto object-contain"
              />
            </div>

            {/* hero */}
            <GsapReveal direction="up" distance={50} duration={1.2}>
              <InvitationCover
                weddingData={weddingData}
                guestName={guestName}
              />
            </GsapReveal>
            <div className="relative pt-8">
              {/* thông tin chú rể & cô dâu */}
              <GsapReveal direction="left" distance={60} duration={1.2}>
                <MinimalCoupleSpotlight weddingData={weddingData} />
              </GsapReveal>

              {/* bộ sưu tập ảnh 3D Coverflow */}
              <GsapReveal direction="right" distance={60} duration={1.2}>
                <CoverflowGallery weddingData={weddingData} />
              </GsapReveal>

              {/* thông tin tiệc cưới */}
              <GsapReveal direction="left" distance={60} duration={1.2}>
                <EventInfo
                  variantId="EventInfo1"
                  weddingData={weddingData}
                  onOpenRsvpModal={() => setRsvpModalOpen(true)}
                  primaryColor={colorPalette.primaryColor}
                  textColor={colorPalette.textColor}
                />
              </GsapReveal>

              {/* địa điểm */}
              {primaryEvent && (
                <GsapReveal direction="right" distance={60} duration={1.2}>
                  <VenueMap
                    variantId="minimal"
                    event={primaryEvent}
                    primaryColor={colorPalette.primaryColor}
                    textColor={colorPalette.textColor}
                    fontFamily='"Times New Roman", serif'
                  />
                </GsapReveal>
              )}

              {/* time line */}
              <GsapReveal direction="left" distance={60} duration={1.2}>
                <Timeline
                  variant="Timeline1"
                  weddingData={weddingData}
                  primaryColor={colorPalette.primaryColor}
                  textColor={colorPalette.textColor}
                />
              </GsapReveal>
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
                ? "bg-[#540c14] text-white shadow-[0_0_25px_rgba(84,12,20,0.6)]"
                : "bg-white/90 backdrop-blur-md text-[#540c14] border border-[#540c14]/30 hover:bg-white"
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
              <div className="bg-[#fdfbf6] rounded-3xl w-full max-w-md relative flex flex-col max-h-[90vh] overflow-hidden shadow-2xl border border-[#4e0b12]/20 animate-in fade-in zoom-in duration-300">
                <div className="p-4 flex justify-between items-center border-b border-[#4e0b12]/10 shrink-0">
                  <div className="w-8" />
                  <h3 className="text-lg text-[#4e0b12] font-serif tracking-widest uppercase">
                    Xác Nhận Tham Dự
                  </h3>
                  <button
                    onClick={() => setRsvpModalOpen(false)}
                    className="w-8 h-8 flex items-center justify-center text-[#4e0b12]/70 hover:text-[#4e0b12] transition-colors"
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
