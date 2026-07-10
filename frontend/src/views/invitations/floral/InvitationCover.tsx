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
  coverImageUrl,
  guestName,
}: InvitationCoverProps) {
  return (
    <section
      onClick={onScrollNext}
      className="relative min-h-[100dvh] flex flex-col items-center justify-center text-center overflow-hidden pt-8 cursor-pointer hover:opacity-[0.99] transition-all"
    >
      <div className="absolute inset-0 bg-[#7a0f1b]">
        {/* Họa tiết chìm (nếu có thể, sử dụng SVG hoặc pattern, tạm thời dùng gradient radial tạo điểm nhấn) */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#9b1525] via-[#7a0f1b] to-[#590912]" />
        
        {coverImageUrl && (
          <div className="absolute inset-0 opacity-20 mix-blend-overlay">
            <img
              src={coverImageUrl}
              alt="Background"
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>

      <div className="relative z-10 px-6 max-w-xl mx-auto space-y-8 mt-10">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 border-2 border-[#d4af37] rounded-full flex items-center justify-center text-[#d4af37] text-2xl font-serif">
            Hỷ
          </div>
        </div>

        <div className="space-y-4 py-4">
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 8vw, 3.5rem)",
              color: "#d4af37",
              lineHeight: 1.2,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.05em"
            }}
          >
            {groomName}
          </h1>
          
          <div className="flex items-center justify-center gap-4 my-2">
            <div className="h-[1px] w-12 bg-[#d4af37]/50" />
            <span className="text-[#d4af37] font-serif text-xl italic">&</span>
            <div className="h-[1px] w-12 bg-[#d4af37]/50" />
          </div>

          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 8vw, 3.5rem)",
              color: "#d4af37",
              lineHeight: 1.2,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.05em"
            }}
          >
            {brideName}
          </h1>
        </div>

        <div className="py-4 border-y border-[#d4af37]/30 my-6">
          <p className="text-sm sm:text-base text-[#e5c07b] font-serif tracking-[0.2em] font-light">
            {formatDate(weddingDate)}
          </p>
        </div>

        <p className="text-sm uppercase tracking-[0.1em] font-medium text-[#d4af37] inline-block font-sans">
          {guestName ? `Thân mời: ${guestName}` : "Trân trọng kính mời"}
        </p>

        <p className="text-xs sm:text-sm leading-relaxed text-[#f3e5c8] font-light max-w-xs mx-auto font-sans opacity-90 mt-2">
          {guestName
            ? `Sự hiện diện của ${guestName} là niềm hạnh phúc lớn nhất của gia đình chúng tôi.`
            : "Sự hiện diện của quý vị là niềm vinh hạnh cho gia đình chúng tôi."}
        </p>
      </div>

      <button
        onClick={onScrollNext}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-[#d4af37] bg-[#7a0f1b] border border-[#d4af37] p-3 rounded-full cursor-pointer hover:bg-[#8a1321] transition-colors shadow-lg"
      >
        <ChevronDown size={24} />
      </button>
    </section>
  );
}
