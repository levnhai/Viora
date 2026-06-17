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
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden pt-8">
      <div className="absolute inset-0">
        <img
          src={coverImageUrl}
          alt="Couple photo"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(253,246,239,0.6) 0%, rgba(253,246,239,0.85) 60%, rgba(253,246,239,1) 100%)" }} />
      </div>
      <div className="relative z-10 px-6 max-w-xl mx-auto space-y-5">
        <p className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8b3a52] bg-white/50 backdrop-blur-xs py-1.5 px-4 rounded-full border border-[#c9828e]/15 inline-block">
          {guestName ? `Thân mời: ${guestName}` : "Trân trọng kính mời"}
        </p>
        <div>
          <h1 style={{ fontFamily: "'Great Vibes', cursive", fontSize: "clamp(3rem, 10vw, 5rem)", color: "#8b3a52", lineHeight: 1.1 }}>
            {groomName}
          </h1>
          <div className="flex items-center justify-center gap-4 my-2">
            <div className="h-px w-12" style={{ backgroundColor: "rgba(201,130,142,0.4)" }} />
            <Heart size={16} fill="#c9828e" stroke="#c9828e" />
            <div className="h-px w-12" style={{ backgroundColor: "rgba(201,130,142,0.4)" }} />
          </div>
          <h1 style={{ fontFamily: "'Great Vibes', cursive", fontSize: "clamp(3rem, 10vw, 5rem)", color: "#8b3a52", lineHeight: 1.1 }}>
            {brideName}
          </h1>
        </div>
        <p className="text-sm" style={{ color: "#7a5c4f", letterSpacing: "0.15em" }}>{formatDate(weddingDate)}</p>
        <p className="text-sm leading-relaxed" style={{ color: "#7a5c4f" }}>
          {guestName 
            ? `Rất vinh hạnh được đón tiếp ${guestName} đến chung vui cùng chúng tôi!` 
            : "Trân trọng kính mời quý vị đến dự tiệc hôn lễ của chúng tôi"}
        </p>
      </div>
      <button onClick={onScrollNext} className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-[#c9828e] border-0 bg-transparent cursor-pointer">
        <ChevronDown size={28} />
      </button>
    </section>
  );
}
