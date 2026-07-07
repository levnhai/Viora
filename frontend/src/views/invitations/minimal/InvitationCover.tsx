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
  coverImageUrl = "",
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

      <button
        onClick={onScrollNext}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-stone-600 border-0 bg-transparent cursor-pointer"
      >
        <ChevronDown size={28} />
      </button>
    </section>
  );
}
