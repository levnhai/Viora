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
    primaryColor: "#001A08",
    textColor: "#E1BC7C",
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
    <div className="w-full min-h-screen relative font-sans bg-[rgb(0,26,8)] text-[rgb(225,188,124)] overflow-hidden">
      {/* phong bì */}
      {!envelopeOpen ? (
        <Envelope
          variant="minimal"
          groomName={weddingData.groomName}
          brideName={weddingData.brideName}
          weddingDate={weddingData.weddingDate}
          weddingTime={weddingData.weddingTime}
          guestName={guestName}
          isFixed={!previewMode}
          primaryColor={colorPalette.primaryColor}
          textColor={colorPalette.textColor}
          onOpen={() => {
            setEnvelopeOpen(true);
            if (weddingData.musicUrl) setPlaying(true);
          }}
        />
      ) : (
        <div className="relative z-10 w-full bg-[rgb(0,26,8)]">
          <div className="max-w-3xl mx-auto min-h-screen relative pb-20">
            {/* hero */}
            <GsapReveal direction="up" distance={50}>
              <InvitationCover
                weddingData={weddingData}
                guestName={guestName}
              />
            </GsapReveal>
            <div className="relative pt-8 pb-12 mt-4 mb-16">
              <MinimalFrame />
              {/* thông tin tiệc cưới */}
              <GsapReveal direction="up" distance={40}>
                <MinimalCoupleSpotlight weddingData={weddingData} />
              </GsapReveal>

              <GsapReveal
                direction="up"
                distance={30}
                className="flex justify-center my-0 sm:my-0"
              >
                <img
                  src={img_1.src}
                  alt="divider"
                  className="w-24 sm:w-32 opacity-40"
                />
              </GsapReveal>

              <GsapReveal direction="up" distance={40}>
                <EventInfo
                  variantId="minimal"
                  weddingData={weddingData}
                  onOpenRsvpModal={() => setRsvpModalOpen(true)}
                  primaryColor={colorPalette.primaryColor}
                  textColor={colorPalette.textColor}
                />
              </GsapReveal>

              <GsapReveal
                direction="up"
                distance={30}
                className="flex justify-center my-0 sm:my-0"
              >
                <img
                  src={img_1.src}
                  alt="divider"
                  className="w-24 sm:w-32 opacity-40 -scale-y-100"
                />
              </GsapReveal>

              {/* bộ sưu tập ảnh */}
              <Gallery
                variantId="minimal"
                weddingData={weddingData}
                primaryColor={colorPalette.primaryColor}
                textColor={colorPalette.textColor}
              />

              {/* đếm ngược */}
              <Countdown
                variantId="minimal"
                weddingData={weddingData}
                primaryColor={colorPalette.primaryColor}
                textColor={colorPalette.textColor}
              />

              <GsapReveal
                direction="up"
                distance={30}
                className="flex justify-center my-0 sm:my-0"
              >
                <img
                  src={img_1.src}
                  alt="divider"
                  className="w-24 sm:w-32 opacity-40"
                />
              </GsapReveal>

              {/* thông tin tiệc cưới */}
              <GsapReveal direction="up" distance={40}>
                <Timeline
                  variant="minimal"
                  weddingData={weddingData}
                  primaryColor={colorPalette.primaryColor}
                  textColor={colorPalette.textColor}
                />
              </GsapReveal>
            </div>

            {/* địa điểm */}
            {primaryEvent && (
              <VenueMap
                variantId="minimal"
                event={primaryEvent}
                primaryColor={colorPalette.primaryColor}
                textColor={colorPalette.textColor}
              />
            )}
            {/*mừng cưới */}
            <GsapReveal direction="up" distance={40}>
              <Registry variantId="minimal" weddingData={weddingData} />
            </GsapReveal>

            {/* sổ lời chúc */}
            <GsapReveal direction="up" distance={40}>
              <Guestbook
                variantId="minimal"
                messages={messages}
                guestName={guestName}
                onSendMessage={onSendMessage}
                primaryColor={colorPalette.primaryColor}
                textColor={colorPalette.textColor}
              />
            </GsapReveal>
          </div>

          {/* Nút bật/tắt nhạc */}
          <button
            onClick={togglePlay}
            className={`fixed bottom-6 right-6 z-50 w-12 h-12 flex items-center justify-center rounded-full transition-all duration-500 ${
              playing
                ? "bg-[rgb(225,188,124)] text-[rgb(0,26,8)] shadow-[0_0_25px_rgba(225,188,124,0.6)] hover:shadow-[0_0_35px_rgba(225,188,124,0.8)]"
                : "bg-white/10 backdrop-blur-md text-[rgb(225,188,124)] border border-[rgb(225,188,124)]/30 hover:bg-white/20"
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
              <div className="bg-[rgb(0,26,8)] rounded-3xl w-full max-w-md relative flex flex-col max-h-[90vh] overflow-hidden shadow-2xl border border-[rgb(225,188,124)]/30 animate-in fade-in zoom-in duration-300">
                <div className="p-4 flex justify-between items-center border-b border-[rgb(225,188,124)]/20 shrink-0">
                  <div className="w-8" />
                  <h3 className="text-lg text-[rgb(225,188,124)] font-serif tracking-widest uppercase">
                    Xác Nhận Tham Dự
                  </h3>
                  <button
                    onClick={() => setRsvpModalOpen(false)}
                    className="w-8 h-8 flex items-center justify-center text-[rgb(225,188,124)]/70 hover:text-[rgb(225,188,124)] transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="p-4 sm:p-6 overflow-y-auto custom-scrollbar">
                  <RsvpForm
                    weddingSlug={weddingData.slug}
                    prefilledName={guestName}
                    theme="minimal"
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
