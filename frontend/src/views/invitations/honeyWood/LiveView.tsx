import { useState, useEffect } from "react";
import { VolumeX, X, Music } from "lucide-react";

import { InvitationCover } from "./InvitationCover";
import { MinimalCoupleSpotlight } from "./components/MinimalCoupleSpotlight";
import { CoverflowGallery } from "./components/CoverflowGallery";

import { EventInfo } from "@/widgets/invitation-blocks";
import { Guestbook } from "@/widgets/invitation-blocks";
import { Registry } from "@/widgets/invitation-blocks";
import { VenueMap } from "@/widgets/invitation-blocks";
import { Timeline } from "@/widgets/invitation-blocks";
import { Envelope } from "@/widgets/invitation-blocks";
import { RsvpForm } from "@/features/submit-rsvp/ui/RsvpForm";
import { WeddingData } from "@/entities/invitation/model/types";
import { GsapReveal } from "@/shared/ui/GsapReveal";
import { useWeddingMusic, useGuestbook } from "@/shared/lib/hooks";

import bgWood from "@/shared/assets/image/wood/img_12.webp";

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
    primaryColor: "#d5a94d",
    textColor: "#4a2918",
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

  const woodBgSrc =
    typeof bgWood === "string" ? bgWood : (bgWood as any)?.src || bgWood;

  useEffect(() => {
    if (typeof window !== "undefined" && woodBgSrc) {
      const img = new window.Image();
      img.src = woodBgSrc;
    }
  }, [woodBgSrc]);

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
    <div className="w-full min-h-screen relative font-sans text-[#4a2918] overflow-hidden bg-[#21120b]">
      {/* Preload ngầm ảnh nền gỗ để sẵn sàng ngay khi mở phong bì */}
      {woodBgSrc && (
        <img
          src={woodBgSrc}
          alt=""
          aria-hidden="true"
          className="hidden pointer-events-none opacity-0 select-none w-0 h-0 absolute -top-[9999px]"
          // @ts-ignore
          fetchpriority="high"
          loading="eager"
          decoding="async"
        />
      )}

      {/* phong bì */}
      {!envelopeOpen ? (
        <Envelope
          variant="envelope_8"
          groomName={weddingData.groomName}
          brideName={weddingData.brideName}
          weddingDate={weddingData.weddingDate}
          weddingTime={weddingData.weddingTime}
          guestName={guestName}
          isFixed={!previewMode}
          primaryColor="#d5a94d"
          textColor={colorPalette.textColor}
          onOpen={() => {
            setEnvelopeOpen(true);
            if (weddingData.musicUrl) setPlaying(true);
          }}
        />
      ) : (
        <div className="relative z-10 w-full bg-[#21120b] flex justify-center">
          <div
            className="w-full max-w-3xl min-h-screen relative z-10 pb-8 shadow-2xl overflow-hidden"
            style={{
              backgroundColor: "#2a170d",
              backgroundImage: `url(${woodBgSrc})`,
              backgroundSize: "100% auto",
              backgroundPosition: "center top",
              backgroundRepeat: "repeat-y",
            }}
          >
            {/* hero */}
            <InvitationCover
              weddingData={weddingData}
              guestName={guestName}
            />
            <div className="relative pt-4">
              {/* thông tin chú rể & cô dâu */}
              <GsapReveal direction="up" distance={35} duration={1.0}>
                <MinimalCoupleSpotlight weddingData={weddingData} />
              </GsapReveal>

              {/* bộ sưu tập ảnh 3D Coverflow */}
              <GsapReveal direction="up" distance={35} duration={1.0}>
                <CoverflowGallery weddingData={weddingData} />
              </GsapReveal>

              {/* thông tin tiệc cưới */}
              <GsapReveal direction="up" distance={35} duration={1.0}>
                <EventInfo
                  variantId="wood"
                  weddingData={weddingData}
                  onOpenRsvpModal={() => setRsvpModalOpen(true)}
                  primaryColor={colorPalette.primaryColor}
                  textColor={colorPalette.textColor}
                />
              </GsapReveal>

              {/* địa điểm */}
              {primaryEvent && (
                <GsapReveal direction="up" distance={35} duration={1.0}>
                  <VenueMap
                    variantId="minimal"
                    event={primaryEvent}
                    primaryColor={colorPalette.primaryColor}
                    textColor="#FBFBFB"
                    fontFamily='"Times New Roman", serif'
                  />
                </GsapReveal>
              )}

              {/* time line */}
              <GsapReveal direction="up" distance={35} duration={1.0}>
                <Timeline
                  variant="wood"
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
                variantId="register_8"
                weddingData={weddingData}
                textColor="#FBFBFB"
              />
            </GsapReveal>
            <h4 className="text-center text-sm px-4 font-serif text-[#FBFBFB] pb-8">
              Sự hiện diện của quý khách là niềm vinh hạnh tới gia đình chúng
              tôi
            </h4>
          </div>

          {/* Nút bật/tắt nhạc */}
          <button
            onClick={togglePlay}
            className={`fixed bottom-6 right-6 z-50 w-12 h-12 flex items-center justify-center rounded-full transition-all duration-500 shadow-xl cursor-pointer ${
              playing
                ? "bg-[#6b351c] text-[#fff1cf] shadow-[0_0_25px_rgba(213,169,77,0.5)]"
                : "bg-[#f8e4bd]/95 backdrop-blur-md text-[#5b2d18] border border-[#b87935] hover:bg-[#fff1d5]"
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
              <div className="bg-[#f6dfb5] rounded-3xl w-full max-w-md relative flex flex-col max-h-[90vh] overflow-hidden shadow-2xl border border-[#b87935]/50 animate-in fade-in zoom-in duration-300">
                <div className="p-4 flex justify-between items-center border-b border-[#9a5a28]/25 shrink-0">
                  <div className="w-8" />
                  <h3 className="text-lg text-[#5b2d18] font-serif tracking-widest uppercase">
                    Xác Nhận Tham Dự
                  </h3>
                  <button
                    onClick={() => setRsvpModalOpen(false)}
                    className="w-8 h-8 flex items-center justify-center text-[#5b2d18]/70 hover:text-[#5b2d18] transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="p-4 sm:p-6 overflow-y-auto custom-scrollbar">
                  <RsvpForm
                    weddingSlug={weddingData.slug}
                    prefilledName={guestName}
                    textColor={colorPalette.textColor}
                    primaryColor="#d5a94d"
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
