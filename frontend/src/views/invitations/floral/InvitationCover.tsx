import { ChevronDown } from "lucide-react";
import { formatDate } from "@/shared/lib/utils/date";
import { playfairDisplay } from "@/shared/lib/fonts";
import bgImg1 from "@/shared/assets/image/hy/img_2.webp";
import bgImg2 from "@/shared/assets/image/hy/img_3.webp";

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
  // Format date to DD · MM · YYYY
  const dateObj = new Date(weddingDate);
  const formattedDate = !isNaN(dateObj.getTime())
    ? `${String(dateObj.getDate()).padStart(2, "0")} · ${String(
        dateObj.getMonth() + 1
      ).padStart(2, "0")} · ${dateObj.getFullYear()}`
    : weddingDate.replace(/\//g, " · ").replace(/-/g, " · ");

  return (
    <section
      className="relative min-h-[100dvh] flex flex-col items-center justify-center text-center overflow-hidden bg-[#91000b] selection:bg-[#d4af37] selection:text-[#91000b]"
    >
      {/* Background & Patterns */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Dragon/Phoenix patterns in corners */}
        <img
          src="https://chungdoi.com/images/themes/longphung-v3-red/rong.webp"
          alt="Dragon"
          className="absolute top-[5%] left-[-10%] w-[80%] max-w-[400px] opacity-[0.15] mix-blend-screen"
        />
        <img
          src="https://chungdoi.com/images/themes/longphung-v3-red/phuong.webp"
          alt="Phoenix"
          className="absolute bottom-[5%] right-[-10%] w-[80%] max-w-[400px] opacity-[0.15] mix-blend-screen"
        />
        
        {coverImageUrl && (
          <div className="absolute inset-0 opacity-10 mix-blend-overlay flex items-center justify-center">
            <img
              src={coverImageUrl}
              alt="Background"
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>

      <div className="relative z-10 px-6 w-full max-w-md mx-auto flex flex-col items-center pt-8 pb-24">
        {/* Hỷ Icon Top */}
        <div className="mb-10 mt-4">
          <div className="w-[70px] h-[70px] border border-[#d4af37] rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.2)] bg-[#91000b]/50 backdrop-blur-sm">
            <span className={`${playfairDisplay.className} text-[#d4af37] text-3xl font-medium tracking-wide`}>
              Hỷ
            </span>
          </div>
        </div>

        {/* Couple Names - Using Playfair Display */}
        <div className="flex flex-col items-center w-full mb-8">
          <h1
            className={`${playfairDisplay.className} text-[#ffd700] drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]`}
            style={{
              fontSize: "clamp(3rem, 12vw, 4.5rem)",
              lineHeight: "1.2",
              fontWeight: 500,
            }}
          >
            {groomName}
          </h1>
          
          <div className="flex items-center justify-center gap-4 my-2 w-[180px]">
            <div className="h-[1px] flex-1 bg-[#d4af37]/40" />
            <span className={`${playfairDisplay.className} text-[#d4af37] text-2xl italic`}>&</span>
            <div className="h-[1px] flex-1 bg-[#d4af37]/40" />
          </div>

          <h1
            className={`${playfairDisplay.className} text-[#ffd700] drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]`}
            style={{
              fontSize: "clamp(3rem, 12vw, 4.5rem)",
              lineHeight: "1.2",
              fontWeight: 500,
            }}
          >
            {brideName}
          </h1>
        </div>

        {/* Date Divider */}
        <div className="w-full max-w-[280px] border-y border-[#d4af37]/30 py-4 mb-10">
          <p className={`${playfairDisplay.className} text-base sm:text-lg text-[#d4af37] tracking-[0.3em] font-bold uppercase`}>
            {formattedDate}
          </p>
        </div>

        {/* Invitation Text */}
        <div className="flex flex-col items-center space-y-5">
          <div className="border border-[#d4af37]/60 rounded-full px-6 py-2.5 bg-[#660000]/30 shadow-inner">
            <p className="text-[11px] sm:text-[13px] uppercase tracking-[0.2em] font-medium text-[#d4af37] font-sans">
              {guestName ? `Thân mời: ${guestName}` : "Trân trọng kính mời"}
            </p>
          </div>

          <p className="text-[13px] sm:text-[15px] leading-[1.8] text-[#fdf5e6] font-light max-w-[300px] text-center font-sans opacity-90">
            {guestName
              ? `Sự hiện diện của ${guestName} là niềm vinh hạnh cho gia đình chúng tôi.`
              : "Sự hiện diện của quý vị là niềm vinh hạnh cho gia đình chúng tôi."}
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <span className="text-[#d4af37] text-[10px] uppercase tracking-[0.2em] mb-3 font-sans opacity-80">
          Mở thiệp
        </span>
        <button
          onClick={onScrollNext}
          className="text-[#d4af37] border border-[#d4af37] w-12 h-12 rounded-full flex items-center justify-center cursor-pointer hover:bg-[#d4af37]/10 transition-colors shadow-[0_0_15px_rgba(212,175,55,0.2)] animate-bounce"
        >
          <ChevronDown size={24} strokeWidth={1.5} />
        </button>
      </div>
    </section>
  );
}
