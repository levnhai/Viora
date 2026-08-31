import { useState, useEffect, useRef } from "react";
import { VolumeX, Music } from "lucide-react";

import { WeddingData } from "@/entities/invitation/model/types";
import { InvitationCover } from "./InvitationCover";
import { SaveTheDateCalendar } from "./SaveTheDateCalendar";
import { CouplePolaroidCards } from "./CouplePolaroidCards";
import { WeddingEventCard } from "./WeddingEventCard";
import { WeddingCountdown } from "./WeddingCountdown";
import { WeddingGallery } from "./WeddingGallery";
import { WeddingRSVP } from "./WeddingRSVP";
import { ThankYouFooter } from "./ThankYouFooter";
import { Envelope } from "@/widgets/invitation-blocks";
import { useWeddingMusic } from "@/shared/lib/hooks";
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

  const { playing, togglePlay, setPlaying, audioRef } = useWeddingMusic(
    weddingData?.musicUrl,
  );

  useEffect(() => {
    if (previewMode) {
      setEnvelopeOpen(previewMode === "invitation");
    }
  }, [previewMode]);

  return (
    <div
      className={`w-full relative font-sans text-center long-phung-theme transition-all duration-500 ${!envelopeOpen ? "h-[100dvh] overflow-hidden" : ""}`}
    >
      {!envelopeOpen ? (
        <Envelope
          variant="floral"
          groomName={weddingData.groomName}
          brideName={weddingData.brideName}
          weddingDate={weddingData.weddingDate}
          guestName={guestName}
          isFixed={!previewMode}
          onOpen={() => {
            setEnvelopeOpen(true);
            setPlaying(true);
          }}
        />
      ) : (
        <div className="w-full relative">
          <InvitationCover weddingData={weddingData} isOpened={envelopeOpen} />
          <SaveTheDateCalendar weddingData={weddingData} />
          <CouplePolaroidCards weddingData={weddingData} />
          <WeddingEventCard weddingData={weddingData} />
          <WeddingCountdown weddingData={weddingData} />
          <WeddingGallery weddingData={weddingData} />
          <WeddingRSVP weddingData={weddingData} />
          <ThankYouFooter weddingData={weddingData} />
        </div>
      )}

      {/* Floating Music Toggle Button */}
      <button
        onClick={togglePlay}
        className={`fixed bottom-6 right-6 z-50 w-12 h-12 flex items-center justify-center rounded-full transition-all duration-500 cursor-pointer ${
          playing
            ? "bg-rose-500 text-white shadow-lg shadow-rose-500/40 hover:scale-110"
            : "bg-white/80 backdrop-blur-md text-slate-700 border border-slate-200 hover:bg-white shadow-md"
        }`}
        aria-label={playing ? "Tắt nhạc" : "Bật nhạc"}
      >
        <div className={playing ? "animate-[spin_4s_linear_infinite]" : ""}>
          {playing ? <Music size={20} /> : <VolumeX size={20} />}
        </div>
        {playing && (
          <div className="absolute inset-0 rounded-full border-2 border-rose-400 animate-ping opacity-30 pointer-events-none" />
        )}
      </button>

      {/* Audio Element */}
      <audio ref={audioRef} loop preload="auto">
        <source
          src={(weddingData as any)?.musicUrl || "/audio/wedding-song.mp3"}
          type="audio/mpeg"
        />
      </audio>
    </div>
  );
}





