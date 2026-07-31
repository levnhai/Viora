import { useState, useEffect, useRef } from "react";

import { WeddingData } from "@/entities/invitation/model/types";
import { InvitationCover } from "./InvitationCover";
import { SaveTheDateCalendar } from "./SaveTheDateCalendar";
import { CouplePolaroidCards } from "./CouplePolaroidCards";
import { WeddingEventCard } from "./WeddingEventCard";
import { WeddingCountdown } from "./WeddingCountdown";
import { WeddingGallery } from "./WeddingGallery";
import { WeddingRSVP } from "./WeddingRSVP";
import { ThankYouFooter } from "./ThankYouFooter";
import { Envelope } from "@/widgets/envelope";
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
  console.log("weddingData", weddingData);
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (previewMode) {
      setEnvelopeOpen(previewMode === "invitation");
    }
  }, [previewMode]);

  return (
    <div
      className={`w-full relative font-sans text-center long-phung-theme transition-all duration-500 ${!envelopeOpen ? "h-[100dvh] overflow-hidden" : ""}`}
    >
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
          }}
        />
      )}

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
    </div>
  );
}





