import { Award, Heart } from "lucide-react";
import { WeddingData } from "@/entities/invitation/model/types";

interface InvitationGreetingProps {
  weddingData: WeddingData;
  guestName?: string;
}

export function InvitationGreeting({
  weddingData,
  guestName,
}: InvitationGreetingProps) {
  const graduateName =
    weddingData.brideName || weddingData.groomName || "Đặng Mai Trang";
  const recipient = guestName?.trim() || "Cả nhà iu & Bạn bè thân quý";

  return (
    <section className="w-full px-4 sm:px-6 py-6 flex flex-col items-center">
      <div className="w-full max-w-[420px] bg-white rounded-2xl p-6 sm:p-7 shadow-[0_10px_30px_rgba(11,32,70,0.08)] border border-[#0b2046]/10 relative text-center">
        {/* Ornate Corner Accents */}
        <div className="absolute top-2.5 left-2.5 w-4 h-4 border-t-2 border-l-2 border-[#d4af37]" />
        <div className="absolute top-2.5 right-2.5 w-4 h-4 border-t-2 border-r-2 border-[#d4af37]" />
        <div className="absolute bottom-2.5 left-2.5 w-4 h-4 border-b-2 border-l-2 border-[#d4af37]" />
        <div className="absolute bottom-2.5 right-2.5 w-4 h-4 border-b-2 border-r-2 border-[#d4af37]" />

        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#0b2046] text-[#f7e096] text-[11px] font-sans font-bold uppercase tracking-widest mb-3">
          <Award className="w-3.5 h-3.5 text-[#d4af37]" />
          THÂN MỜI
        </div>

        <h3 className="text-xs sm:text-[13px] font-sans uppercase tracking-wider text-[#64748b] font-medium">
          Trân trọng kính mời
        </h3>

        <div className="text-xl sm:text-2xl font-serif font-bold text-[#0b2046] my-2">
          {recipient}
        </div>

        <div className="w-10 h-[1.5px] bg-[#d4af37] mx-auto my-3" />

        <p className="text-xs sm:text-[13.5px] text-[#334155] leading-relaxed font-sans">
          Đến tham dự buổi lễ tốt nghiệp và chung vui trong ngày đặc biệt của
          tân cử nhân <strong className="text-[#0b2046] font-serif font-bold">{graduateName}</strong>.
        </p>

        <p className="text-xs sm:text-[12.5px] text-[#64748b] italic mt-3 font-serif flex items-center justify-center gap-1">
          <Heart className="w-3.5 h-3.5 text-[#d4af37] fill-[#d4af37]" />
          Sự hiện diện của bạn là niềm vinh hạnh và hạnh phúc lớn của mình!
        </p>
      </div>
    </section>
  );
}
