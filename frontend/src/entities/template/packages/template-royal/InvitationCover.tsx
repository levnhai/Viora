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
        {/* Sang trọng, mờ ảo với màu đỏ rượu nhạt và nền tối */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-[#180303]/90 to-[#121110]" />
      </div>

      <div className="relative z-10 px-6 max-w-xl mx-auto space-y-6">
        <p className="text-[10px] sm:text-xs uppercase tracking-[0.25em] font-bold text-[#ecc96e] bg-[#801010]/60 backdrop-blur-xs py-2 px-5 rounded-full border border-[#ecc96e]/30 inline-block font-sans shadow-md">
          {guestName ? `Thân mời: ${guestName}` : "Trân trọng kính mời"}
        </p>

        <div className="py-4 border-y border-[#ecc96e]/20 max-w-md mx-auto space-y-1">
          <h1 
            style={{ 
              fontFamily: "'EB Garamond', serif", 
              fontSize: "clamp(2.5rem, 8vw, 4.2rem)", 
              color: "#ecc96e", 
              lineHeight: 1.1,
              fontWeight: 300 
            }}
          >
            {groomName}
          </h1>
          <div className="flex items-center justify-center gap-4 my-2">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#ecc96e]" />
            <Heart size={14} className="text-[#ecc96e] fill-[#ecc96e]/20" />
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#ecc96e]" />
          </div>
          <h1 
            style={{ 
              fontFamily: "'EB Garamond', serif", 
              fontSize: "clamp(2.5rem, 8vw, 4.2rem)", 
              color: "#ecc96e", 
              lineHeight: 1.1,
              fontWeight: 300 
            }}
          >
            {brideName}
          </h1>
        </div>

        <p className="text-xs sm:text-sm text-stone-300 font-serif tracking-[0.2em]">{formatDate(weddingDate)}</p>
        
        <p className="text-xs sm:text-sm leading-relaxed text-stone-400 font-light max-w-sm mx-auto">
          {guestName 
            ? `Rất vinh hạnh được đón tiếp ${guestName} đến chung vui trong ngày hạnh phúc của chúng tôi!` 
            : "Trân trọng kính mời quý vị đến dự lễ hôn phối thành hôn của chúng tôi"}
        </p>
      </div>

      <button onClick={onScrollNext} className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-[#ecc96e] border-0 bg-transparent cursor-pointer">
        <ChevronDown size={28} />
      </button>
    </section>
  );
}
