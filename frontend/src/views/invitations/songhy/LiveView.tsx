import { useState, useEffect } from "react";
import { VolumeX, X, Music } from "lucide-react";

import { InvitationCover } from "./InvitationCover";
import { MinimalFrame } from "./components/MinimalFrame";
import { MinimalCoupleSpotlight } from "./components/MinimalCoupleSpotlight";
import { EventInfo } from "@/widgets/invitation-blocks";
import { Guestbook } from "@/widgets/invitation-blocks";
import { Registry } from "@/widgets/invitation-blocks";
import { VenueMap } from "@/widgets/invitation-blocks";
import { Gallery } from "@/widgets/invitation-blocks";
import { Countdown } from "@/widgets/invitation-blocks";
import { Timeline } from "@/widgets/invitation-blocks";
import { Envelope } from "@/widgets/invitation-blocks";
import { RsvpForm } from "@/features/submit-rsvp/ui/RsvpForm";
import { WeddingData } from "@/entities/invitation/model/types";
import { TemplateConfig } from "@/entities/template/model/schema";
import { GsapReveal } from "@/shared/ui/GsapReveal";
import { useWeddingMusic, useGuestbook } from "@/shared/lib/hooks";

import img_1 from "@/shared/assets/image/flower/img_1.png";

interface LiveViewProps {
  weddingData: WeddingData;
  guestName?: string;
  previewMode?: "envelope" | "invitation";
  config?: TemplateConfig;
}

export function LiveView({
  weddingData,
  guestName,
  previewMode,
  config,
}: LiveViewProps) {
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [rsvpModalOpen, setRsvpModalOpen] = useState(false);

  const colorPalette = {
    primaryColor: config?.bgColor || "#001A08",
    textColor: config?.textColor || "#E1BC7C",
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

  const events = weddingData?.events || [];
  const primaryEvent =
    events.find(
      (ev) =>
        ev?.title?.toUpperCase().includes("TIỆC") ||
        ev?.title?.toUpperCase().includes("HÔN LỄ"),
    ) || events[0] || {};

  return (
    <div
      className="w-full min-h-screen relative font-sans overflow-hidden"
      style={{
        backgroundColor: colorPalette.primaryColor,
        color: colorPalette.textColor,
      }}
    >
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
        <div
          className="relative z-10 w-full"
          style={{
            backgroundColor: colorPalette.primaryColor,
            color: colorPalette.textColor,
          }}
        >
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
              <Registry
                variantId="minimal"
                weddingData={weddingData}
                primaryColor={colorPalette.primaryColor}
                textColor={colorPalette.textColor}
              />
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
                ? "shadow-lg hover:scale-110"
                : "bg-white/10 backdrop-blur-md border border-current/30 hover:bg-white/20"
            } hover:scale-110`}
            style={
              playing
                ? {
                    backgroundColor: colorPalette.textColor,
                    color: colorPalette.primaryColor,
                    boxShadow: `0 0 25px ${colorPalette.textColor}99`,
                  }
                : { color: colorPalette.textColor }
            }
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
              <div
                className="rounded-3xl w-full max-w-md relative flex flex-col max-h-[90vh] overflow-hidden shadow-2xl border border-current/30 animate-in fade-in zoom-in duration-300"
                style={{
                  backgroundColor: colorPalette.primaryColor,
                  color: colorPalette.textColor,
                }}
              >
                <div className="p-4 flex justify-between items-center border-b border-current/20 shrink-0">
                  <div className="w-8" />
                  <h3
                    className="text-lg font-serif tracking-widest uppercase"
                    style={{ color: colorPalette.textColor }}
                  >
                    Xác Nhận Tham Dự
                  </h3>
                  <button
                    onClick={() => setRsvpModalOpen(false)}
                    className="w-8 h-8 flex items-center justify-center opacity-70 hover:opacity-100 transition-colors"
                    style={{ color: colorPalette.textColor }}
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
                    primaryColor={colorPalette.primaryColor}
                    textColor={colorPalette.textColor}
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
