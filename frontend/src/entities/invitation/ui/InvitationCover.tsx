import { Heart, ChevronDown } from "lucide-react";
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
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background" />
      </div>
      <div className="relative z-10 px-6 max-w-xl mx-auto space-y-5">
        <p className="text-xs uppercase tracking-[0.2em] font-semibold text-primary bg-background/50 backdrop-blur-xs py-1.5 px-4 rounded-full border border-primary/15 inline-block">
          {guestName ? `Thân mời: ${guestName}` : "Trân trọng kính mời"}
        </p>
        <div>
          <h1
            style={{
              fontFamily: "'Great Vibes', cursive",
              fontSize: "clamp(3rem, 10vw, 5rem)",
              color: "var(--primary)",
              lineHeight: 1.1,
            }}
          >
            {groomName}
          </h1>
          <div className="flex items-center justify-center gap-4 my-2">
            <div className="h-px w-12 bg-border" />
            <Heart
              size={16}
              className="text-primary"
              fill="currentColor"
              stroke="currentColor"
            />
            <div className="h-px w-12 bg-border" />
          </div>
          <h1
            style={{
              fontFamily: "'Great Vibes', cursive",
              fontSize: "clamp(3rem, 10vw, 5rem)",
              color: "var(--primary)",
              lineHeight: 1.1,
            }}
          >
            {brideName}
          </h1>
        </div>
        <p
          className="text-sm text-muted-foreground"
          style={{ letterSpacing: "0.15em" }}
        >
          {formatDate(weddingDate)}
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {guestName
            ? `Rất vinh hạnh được đón tiếp ${guestName} đến chung vui cùng chúng tôi!`
            : "Trân trọng kính mời quý vị đến dự tiệc hôn lễ của chúng tôi"}
        </p>
      </div>
      <button
        onClick={onScrollNext}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-primary border-0 bg-transparent cursor-pointer"
      >
        <ChevronDown size={28} />
      </button>
    </section>
  );
}
