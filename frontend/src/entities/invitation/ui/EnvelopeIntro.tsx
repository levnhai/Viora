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
      className={`absolute inset-0 z-50 flex items-center justify-center bg-[#2c1810] transition-opacity duration-1000 ${
        isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#c9828e_1px,transparent_1px)] [background-size:16px_16px]" />
      
      {/* Outer Envelope Wrapper */}
      <div 
        className={`relative w-[90%] max-w-[420px] aspect-[4/3] bg-[#fdf6ef] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-[#c9828e]/20 p-6 flex flex-col justify-between items-center transition-all duration-1000 ${
          isOpen ? "scale-90 rotate-2 translate-y-8" : "scale-100"
        }`}
      >
        {/* Decorative inner border */}
        <div className="absolute inset-3 border border-dashed border-[#c9828e]/30 rounded-xl pointer-events-none" />

        {/* Header: Names */}
        <div className="text-center mt-6 z-10 space-y-1">
          <p className="text-2xs uppercase tracking-[0.25em] text-[#7a5c4f] font-semibold">Wedding Invitation</p>
          <h2 className="text-2xl text-[#8b3a52] font-light" style={{ fontFamily: "'EB Garamond', serif" }}>
            {groomName} & {brideName}
          </h2>
        </div>

        {/* Body: Guest Name Panel */}
        <div className="w-full text-center z-10 space-y-4 px-4 my-auto">
          <div className="inline-block">
            <p className="text-xs text-[#7a5c4f]/80 italic mb-1.5">Trân trọng kính mời</p>
            <div className="bg-white/80 backdrop-blur-xs px-6 py-3 rounded-2xl border border-[#c9828e]/20 shadow-2xs min-w-[200px]">
              <span className="text-sm font-semibold text-[#8b3a52] tracking-wide" style={{ fontFamily: "'EB Garamond', serif", fontSize: "1.1rem" }}>
                {guestName ? guestName : "Quý Khách Hàng"}
              </span>
            </div>
          </div>
        </div>

        {/* Footer: Wax Seal / Interactive Button */}
        <div className="mb-6 z-20 relative">
          <button
            onClick={handleOpen}
            className="w-16 h-16 rounded-full bg-[#8b3a52] hover:bg-[#7a3246] text-white flex flex-col items-center justify-center shadow-lg border-4 border-white active:scale-95 transition-all cursor-pointer group relative overflow-hidden"
            style={{ boxShadow: "0 10px 25px -5px rgba(139,58,82,0.4)" }}
          >
            {/* Pulsing glow effect */}
            <span className="absolute inset-0 w-full h-full bg-[#8b3a52] rounded-full animate-ping opacity-15 pointer-events-none" />
            
            <Heart size={20} fill="white" className="group-hover:scale-110 transition-transform duration-300 animate-pulse text-white" />
            <span className="text-[9px] uppercase tracking-wider font-semibold mt-0.5 text-white">Mở</span>
          </button>
        </div>

        {/* Back and side flap graphics simulated with CSS borders to look like paper folding */}
        <div className="absolute bottom-0 left-0 right-0 h-[45%] bg-[#faf5f0] rounded-b-2xl border-t border-[#c9828e]/10 pointer-events-none flex items-end justify-center pb-2">
          <span className="text-2xs text-[#7a5c4f]/40 font-mono">Viora Studio Invite</span>
        </div>
      </div>
    </div>
  );
}
