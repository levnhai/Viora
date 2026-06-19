import { useState } from "react";
import { MailOpen, Heart } from "lucide-react";

interface EnvelopeIntroProps {
  guestName?: string;
  groomName: string;
  brideName: string;
  onOpen: () => void;
}

export function EnvelopeIntro({ guestName, groomName, brideName, onOpen }: EnvelopeIntroProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMerged, setIsMerged] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    // Wait for envelope flip and card slide up animation to finish before calling parent onOpen
    setTimeout(() => {
      setIsMerged(true);
      onOpen();
    }, 1200);
  };

  if (isMerged) return null;

  return (
    <div 
      className={`absolute inset-0 z-50 flex items-center justify-center bg-foreground transition-opacity duration-1000 ${
        isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(var(--primary)_1px,transparent_1px)] [background-size:16px_16px]" />
      
      {/* Outer Envelope Wrapper */}
      <div 
        className={`relative w-[90%] max-w-[420px] aspect-[4/3] bg-card rounded-2xl shadow-2xl border border-primary/20 p-6 flex flex-col justify-between items-center transition-all duration-1000 ${
          isOpen ? "scale-90 rotate-2 translate-y-8" : "scale-100"
        }`}
      >
        {/* Decorative inner border */}
        <div className="absolute inset-3 border border-dashed border-primary/30 rounded-xl pointer-events-none" />

        {/* Header: Names */}
        <div className="text-center mt-6 z-10 space-y-1">
          <p className="text-2xs uppercase tracking-[0.25em] text-muted-foreground font-semibold">Wedding Invitation</p>
          <h2 className="text-2xl text-primary font-light" style={{ fontFamily: "'EB Garamond', serif" }}>
            {groomName} & {brideName}
          </h2>
        </div>

        {/* Body: Guest Name Panel */}
        <div className="w-full text-center z-10 space-y-4 px-4 my-auto">
          <div className="inline-block">
            <p className="text-xs text-muted-foreground/80 italic mb-1.5">Trân trọng kính mời</p>
            <div className="bg-background/80 backdrop-blur-xs px-6 py-3 rounded-2xl border border-primary/20 shadow-2xs min-w-[200px]">
              <span className="text-sm font-semibold text-primary tracking-wide" style={{ fontFamily: "'EB Garamond', serif", fontSize: "1.1rem" }}>
                {guestName ? guestName : "Quý Khách Hàng"}
              </span>
            </div>
          </div>
        </div>

        {/* Footer: Wax Seal / Interactive Button */}
        <div className="mb-6 z-20 relative">
          <button
            onClick={handleOpen}
            className="w-16 h-16 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground flex flex-col items-center justify-center shadow-lg border-4 border-background active:scale-95 transition-all cursor-pointer group relative overflow-hidden shadow-primary/40"
          >
            {/* Pulsing glow effect */}
            <span className="absolute inset-0 w-full h-full bg-primary rounded-full animate-ping opacity-15 pointer-events-none" />
            
            <Heart size={20} fill="currentColor" className="group-hover:scale-110 transition-transform duration-300 animate-pulse" />
            <span className="text-[9px] uppercase tracking-wider font-semibold mt-0.5">Mở</span>
          </button>
        </div>

        {/* Back and side flap graphics simulated with CSS borders to look like paper folding */}
        <div className="absolute bottom-0 left-0 right-0 h-[45%] bg-muted rounded-b-2xl border-t border-primary/10 pointer-events-none flex items-end justify-center pb-2">
          <span className="text-2xs text-muted-foreground/40 font-mono">Viora Studio Invite</span>
        </div>
      </div>
    </div>
  );
}
