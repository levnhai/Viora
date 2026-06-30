import Image from "next/image";

import img4Svg from "@/shared/assets/image/envelope/img_4.svg";
import { formatDate, formatDateToDDMMYYYY } from "@/shared/lib/utils/date";
import { getValidImage } from "@/shared/lib/utils/image";

interface InvitationCoverProps {
  onScrollNext: () => void;
  groomName: string;
  brideName: string;
  weddingDate: string;
  coverImageUrl?: string;
  galleryImages?: string[];
  guestName?: string;
}

export function InvitationCover({
  onScrollNext,
  groomName,
  brideName,
  weddingDate,
  galleryImages = [],
  guestName,
}: InvitationCoverProps) {
  // Use image placeholders if not provided
  const leftPhoto = getValidImage(
    galleryImages[1],
    "https://images.unsplash.com/photo-1519741497674-611481863552?w=500&fit=crop",
  );
  const rightPhoto = getValidImage(
    galleryImages[2],
    "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=500&fit=crop",
  );

  return (
    <section
      onClick={onScrollNext}
      className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-[#fbf9fc] cursor-pointer hover:opacity-[0.99] transition-all"
    >
      {/* Dynamic Font and Style */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Great+Vibes&family=EB+Garamond:ital,wght@0,400..700;1,400..700&display=swap');
          `,
        }}
      />

      {/* Background patterns nhạt thanh lịch */}
      <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#8b5cf6_1px,transparent_1px)] [background-size:20px_20px]" />

      {/* Container chính cho SVG trang trí ở giữa màn hình */}
      <div className="relative w-[340px] sm:w-[380px] aspect-[0.71] z-10 flex flex-col items-center justify-center select-none filter drop-shadow-[0_6px_14px_rgba(0,0,0,0.08)]">
        {/* Left Polaroid Photo */}
        <div className="absolute left-[20.2%] top-[16.5%] w-[23.5%] aspect-[0.83] overflow-hidden bg-stone-100 z-1 rotate-[-10.5deg]">
          <img
            src={leftPhoto}
            alt="Groom Photo"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Polaroid Photo */}
        <div className="absolute left-[52.3%] top-[12.2%] w-[23.5%] aspect-[0.83] overflow-hidden bg-stone-100 z-1 rotate-[5.5deg]">
          <img
            src={rightPhoto}
            alt="Bride Photo"
            className="w-full h-full object-cover"
          />
        </div>

        {/* SVG Khung viền trang trí (Envelope, polaroid borders, flowers) */}
        <Image
          src={img4Svg}
          alt="Luxury Frame Decor"
          fill
          priority
          className="object-contain z-10 pointer-events-none"
        />

        {/* Ticket Text Overlay */}
        <div
          className="absolute left-[24.5%] top-[43%] w-[49%] h-[19%] flex rotate-[-5.5deg] text-[#786470] z-20"
          style={{ fontFamily: "'EB Garamond', serif" }}
        >
          {/* Left vertical text */}
          <div className="w-[20%] h-full flex items-center justify-center border-r border-dashed border-[#786470]/30 select-none">
            <span className="text-[7px] font-bold uppercase tracking-widest whitespace-nowrap rotate-[-90deg] origin-center opacity-70">
              {groomName} - {brideName}
            </span>
          </div>

          {/* Right main text */}
          <div className="w-[80%] h-full flex flex-col items-center justify-center text-center p-2 space-y-0.5">
            <p
              className="text-[7px] tracking-[0.2em] font-semibold opacity-85 uppercase"
              style={{ fontFamily: "sans-serif" }}
            >
              Save Our Date
            </p>
            <h2 className="text-sm sm:text-base font-bold tracking-wide text-[#594852] my-0 leading-none">
              {formatDateToDDMMYYYY(weddingDate)}
            </h2>
            <p
              className="text-xs italic text-[#786470] font-normal mt-0.5"
              style={{ fontFamily: "'Great Vibes', cursive" }}
            >
              We're getting married!
            </p>
          </div>
        </div>

        {/* Bottom Names */}
        <div className="absolute bottom-[4.5%] w-full text-center z-20">
          <p
            className="text-sm tracking-widest text-[#594852] font-semibold uppercase"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            {groomName}{" "}
            <span className="font-serif italic text-xs text-[#786470] lowercase tracking-normal">
              and
            </span>{" "}
            {brideName}
          </p>
        </div>
      </div>
    </section>
  );
}
