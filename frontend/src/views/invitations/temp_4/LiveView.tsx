import { useState, useEffect } from "react";
import { VolumeX, X, Music } from "lucide-react";

import { InvitationCover } from "./InvitationCover";
import { MinimalFrame } from "./components/MinimalFrame";
import { MinimalCoupleSpotlight } from "./components/MinimalCoupleSpotlight";
import { EventInfo } from "@/widgets/event-info";
import { Guestbook } from "@/widgets/guestbook";
import { Registry } from "@/widgets/registry";
import { VenueMap } from "@/widgets/venue-map";
import { Gallery } from "@/widgets/gallery";
import { Countdown } from "@/widgets/countdown";
import { Timeline } from "@/widgets/timeline";
import { Envelope } from "@/widgets/envelope";
import { RsvpForm } from "@/features/submit-rsvp/ui/RsvpForm";
import { WeddingData } from "@/entities/invitation/model/types";
import { GsapReveal } from "@/shared/ui/GsapReveal";
import { useWeddingMusic, useGuestbook } from "@/shared/lib/hooks";

import img_1 from "@/shared/assets/image/flower/img_1.png";
import img_6 from "@/shared/assets/image/flower/img_6.svg";
import img_7 from "@/shared/assets/image/flower/img_7.svg";
import img_8 from "@/shared/assets/image/flower/img_8.svg";
import img_9 from "@/shared/assets/image/flower/img_9.svg";
import bgPaper from "@/shared/assets/image/paper/paper1.webp";

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

  const colorPalette = {
    primaryColor: "transparent",
    textColor: "#7c6a60",
  };

  const { playing, togglePlay, setPlaying, audioRef } = useWeddingMusic(
    weddingData.musicUrl,
  );
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

  const primaryEvent =
    weddingData.events.find(
      (ev) =>
        ev.title.toUpperCase().includes("TIỆC") ||
        ev.title.toUpperCase().includes("HÔN LỄ"),
    ) || weddingData.events[0];

  return (
    <div
      className="w-full min-h-screen relative font-sans text-[#7c6a60] overflow-hidden bg-center bg-repeat"
      style={{
        backgroundColor: "rgb(255, 247, 243)",
        backgroundImage: `url(${bgPaper.src})`,
        backgroundBlendMode: "multiply",
      }}
    >
      {/* phong bì */}
      {!envelopeOpen ? (
        <Envelope
          variant="envelope_4"
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
        <div className="relative z-10 w-full bg-transparent">
          <div className="max-w-3xl mx-auto min-h-screen relative z-10 pb-20">
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

            {/* hero */}
            <GsapReveal direction="up" distance={50}>
              <InvitationCover
                weddingData={weddingData}
                guestName={guestName}
              />
            </GsapReveal>
            <div className="relative pt-8">
              {/* thông tin tiệc cưới */}
              <GsapReveal direction="up" distance={40}>
                <MinimalCoupleSpotlight weddingData={weddingData} />
              </GsapReveal>

              {/* bộ sưu tập ảnh */}
              <Gallery
                variantId="minimal"
                weddingData={weddingData}
                primaryColor={colorPalette.primaryColor}
                textColor={colorPalette.textColor}
              />

              <GsapReveal direction="up" distance={40}>
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
                <VenueMap
                  variantId="minimal"
                  event={primaryEvent}
                  primaryColor={colorPalette.primaryColor}
                  textColor={colorPalette.textColor}
                  fontFamily='"Times New Roman", serif'
                />
              )}

              {/* time line */}
              <GsapReveal direction="up" distance={40}>
                <Timeline
                  variant="Timeline1"
                  weddingData={weddingData}
                  primaryColor={colorPalette.primaryColor}
                  textColor={colorPalette.textColor}
                />
              </GsapReveal>
            </div>

            {/* sổ lời chúc */}
            <GsapReveal direction="up" distance={40}>
              <Guestbook
                variantId="guestbook_4"
                messages={messages}
                guestName={guestName}
                onSendMessage={onSendMessage}
                primaryColor={colorPalette.primaryColor}
                textColor={colorPalette.textColor}
              />
            </GsapReveal>

            {/*mừng cưới */}
            <GsapReveal direction="up" distance={40}>
              <Registry variantId="register_4" weddingData={weddingData} />
            </GsapReveal>
            <h4 className="text-center text-sm px-4">
              Sự hiện diện của quý khách là niềm vinh hạnh tới gia đình chúng
              tôi
            </h4>
          </div>

          {/* Nút bật/tắt nhạc */}
          <button
            onClick={togglePlay}
            className={`fixed bottom-6 right-6 z-50 w-12 h-12 flex items-center justify-center rounded-full transition-all duration-500 ${
              playing
                ? "bg-[#7c6a60] text-white shadow-[0_0_20px_rgba(124,106,96,0.5)] hover:shadow-[0_0_30px_rgba(124,106,96,0.7)]"
                : "bg-white/50 backdrop-blur-md text-[#7c6a60] border border-[#7c6a60]/30 hover:bg-white/80"
            } hover:scale-110`}
            aria-label={playing ? "Tắt nhạc" : "Bật nhạc"}
          >
            <div className={playing ? "animate-[spin_4s_linear_infinite]" : ""}>
              {playing ? <Music size={20} /> : <VolumeX size={20} />}
            </div>
            {/* Lấp lánh khi đang phát nhạc */}
            {playing && (
              <div className="absolute inset-0 rounded-full border-2 border-white/40 animate-ping opacity-20"></div>
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
              <div className="bg-[#fdfbf6] rounded-3xl w-full max-w-md relative flex flex-col max-h-[90vh] overflow-hidden shadow-2xl border border-[#7c6a60]/20 animate-in fade-in zoom-in duration-300">
                <div className="p-4 flex justify-between items-center border-b border-[#7c6a60]/10 shrink-0">
                  <div className="w-8" />
                  <h3 className="text-lg text-[#7c6a60] font-serif tracking-widest uppercase">
                    Xác Nhận Tham Dự
                  </h3>
                  <button
                    onClick={() => setRsvpModalOpen(false)}
                    className="w-8 h-8 flex items-center justify-center text-[#7c6a60]/70 hover:text-[#7c6a60] transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="p-4 sm:p-6 overflow-y-auto custom-scrollbar">
                  <RsvpForm
                    weddingSlug={weddingData.slug}
                    prefilledName={guestName}
                    theme="temp4"
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
