import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Phone, Mail } from "lucide-react";

import { Envelope } from "@/widgets/invitation-blocks";
import { InvitationCover } from "./InvitationCover";

import { WeddingData } from "@/entities/invitation/model/types";
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
  const [envelopeOpen, setEnvelopeOpen] = useState(false);

  useEffect(() => {
    if (previewMode) {
      setEnvelopeOpen(previewMode === "invitation");
    }
  }, [previewMode]);

  return (
    <div
      className={`w-full text-center relative font-sans ${!envelopeOpen ? "h-screen overflow-hidden" : ""}`}
    >
      {!envelopeOpen && (
        <Envelope
          variant="royal"
          guestName={guestName}
          groomName={weddingData.groomName}
          brideName={weddingData.brideName}
          isFixed={!previewMode}
          onOpen={() => {
            setEnvelopeOpen(true);
            if (weddingData.musicUrl) setPlaying(true);
          }}
        />
      )}
      {/* ── hero ── */}
      <div id="cover">
        <InvitationCover
          groomName={weddingData.groomName}
          brideName={weddingData.brideName}
          weddingDate={weddingData.weddingDate}
          coverImageUrl={weddingData.galleryImages?.[0]}
          galleryImages={weddingData.galleryImages}
          guestName={guestName}
          onScrollNext={() => {
            document
              .getElementById("countdown")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        />
      </div>
    </div>
  );
}
