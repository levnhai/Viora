import { Heart, ChevronDown } from "lucide-react";

interface InvitationCoverProps {
  onScrollNext: () => void;
  groomName: string;
  brideName: string;
  weddingDate: string;
  coverImageUrl?: string;
  guestName?: string;
}

const formatDate = (dateStr: string) => {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day} · ${month} · ${year}`;
  } catch (e) {
    return dateStr;
  }
};

export function InvitationCover({ 
  onScrollNext,
  groomName,
  brideName,
  weddingDate,
  coverImageUrl = "https://images.unsplash.com/photo-1596457221755-b96bc3a6df18?w=1400&h=900&fit=crop&auto=format",
  guestName
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
        {/* Nền phủ tím mộng mơ dịu ngọt cho Lavender theme */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#f3e8ff]/40 via-[#f3e8ff]/90 to-[#f3e8ff]" />
      </div>

      <div className="relative z-10 px-6 max-w-xl mx-auto space-y-6">
        <p className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8b5cf6] bg-white/60 backdrop-blur-xs py-2 px-5 rounded-full border border-[#c084fc]/20 inline-block font-sans shadow-sm">
          {guestName ? `Thân mời: ${guestName}` : "Trân trọng kính mời"}
        </p>

        <div className="space-y-2 py-4">
          <h1 
            style={{ 
              fontFamily: "'Great Vibes', cursive", 
              fontSize: "clamp(3rem, 10vw, 5rem)", 
              color: "#6d28d9", 
              lineHeight: 1.1 
            }}
          >
            {groomName}
          </h1>
          <div className="flex items-center justify-center gap-4 my-2">
            <div className="h-[1px] w-12 bg-[#c084fc]/30" />
            <Heart size={16} className="text-[#8b5cf6]" fill="currentColor" stroke="currentColor" />
            <div className="h-[1px] w-12 bg-[#c084fc]/30" />
          </div>
          <h1 
            style={{ 
              fontFamily: "'Great Vibes', cursive", 
              fontSize: "clamp(3rem, 10vw, 5rem)", 
              color: "#6d28d9", 
              lineHeight: 1.1 
            }}
          >
            {brideName}
          </h1>
        </div>

        <p className="text-xs sm:text-sm text-stone-500 font-sans tracking-[0.2em] font-light">{formatDate(weddingDate)}</p>
        
        <p className="text-xs sm:text-sm leading-relaxed text-stone-600 font-light max-w-xs mx-auto font-sans">
          {guestName 
            ? `Sự hiện diện của ${guestName} là niềm hạnh phúc lớn nhất của chúng tôi!` 
            : "Rất vinh hạnh được đón tiếp quý vị đến chung vui cùng gia đình chúng tôi!"}
        </p>
      </div>

      <button onClick={onScrollNext} className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-[#8b5cf6] border-0 bg-transparent cursor-pointer">
        <ChevronDown size={28} />
      </button>
    </section>
  );
}
