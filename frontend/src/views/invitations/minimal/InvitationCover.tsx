import { ChevronDown } from "lucide-react";
import { formatDate } from "@/shared/lib/utils/date";

interface InvitationCoverProps {
  onScrollNext: () => void;
  groomName: string;
  brideName: string;
  weddingDate: string;
  coverImageUrl?: string;
  guestName?: string;
}

export function InvitationCover({
  onScrollNext,
  groomName,
  brideName,
  weddingDate,
  coverImageUrl = "https://images.unsplash.com/photo-1596457221755-b96bc3a6df18?w=1400&h=900&fit=crop&auto=format",
  guestName,
}: InvitationCoverProps) {
  return (
    <section
      onClick={onScrollNext}
      className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden pt-8 cursor-pointer hover:opacity-[0.99] transition-all"
    >
      <div className="absolute inset-0">
        <img
          src={coverImageUrl}
          alt="Couple photo"
          className="w-full h-full object-cover"
        />
        {/* Nền phủ xám/trắng thanh khiết cho phong cách Botanical Minimalist */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#f7f7f5]/30 via-[#f7f7f5]/90 to-[#f7f7f5]" />
      </div>

      <div className="relative z-10 px-6 max-w-xl mx-auto space-y-6">
        <p className="text-[9px] uppercase tracking-[0.25em] font-medium text-stone-600 bg-white/70 backdrop-blur-xs py-2 px-5 rounded-md border border-stone-200 inline-block font-sans shadow-sm">
          {guestName ? `Thân mời: ${guestName}` : "Trân trọng kính mời"}
        </p>

        <div className="space-y-3 py-6 max-w-md mx-auto">
          <h1
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(2rem, 7vw, 3.5rem)",
              color: "#292724",
              lineHeight: 1.2,
              fontWeight: 300,
              letterSpacing: "0.05em",
            }}
          >
            {groomName}
          </h1>
          <p className="text-xs text-stone-400 font-sans tracking-widest my-1">
            &amp;
          </p>
          <h1
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(2rem, 7vw, 3.5rem)",
              color: "#292724",
              lineHeight: 1.2,
              fontWeight: 300,
              letterSpacing: "0.05em",
            }}
          >
            {brideName}
          </h1>
        </div>

        <p className="text-xs sm:text-sm text-stone-500 font-sans tracking-[0.25em] font-light">
          {formatDate(weddingDate)}
        </p>

        <p className="text-xs sm:text-sm leading-relaxed text-stone-500 font-sans font-light max-w-xs mx-auto">
          {guestName
            ? `Rất hy vọng được đón tiếp ${guestName} trong sự kiện đặc biệt của chúng tôi.`
            : "Hy vọng được chung vui cùng quý khách trong hôn lễ ấm cúng này."}
        </p>
      </div>

      <button
        onClick={onScrollNext}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-stone-600 border-0 bg-transparent cursor-pointer"
      >
        <ChevronDown size={28} />
      </button>
    </section>
  );
}
