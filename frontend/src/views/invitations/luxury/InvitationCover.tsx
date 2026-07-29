import Image from "next/image";
import { cinzel, greatVibes, ebGaramond } from "@/shared/lib/fonts";
import { formatDateToDDMMYYYY } from "@/shared/lib/utils/date";

import img4Svg from "@/shared/assets/image/envelope/img_4.svg";
import polaroid1 from "@/shared/assets/image/polaroid/1.svg";
import polaroid3 from "@/shared/assets/image/polaroid/3.svg";
import img1Webp from "@/shared/assets/image/hy/img_1.webp";
import img2Webp from "@/shared/assets/image/hy/img_2.webp";

interface InvitationCoverProps {
  onScrollNext?: () => void;
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
  const leftPhotoSrc = galleryImages[0] || img1Webp;
  const rightPhotoSrc = galleryImages[1] || galleryImages[0] || img2Webp;
  const formattedDate = formatDateToDDMMYYYY(weddingDate || "2026-05-23");

  return (
    <section
      onClick={onScrollNext}
      className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-[#fbf9fc] cursor-pointer hover:opacity-[0.99] transition-all px-4 py-8 select-none"
    >
      {/* Background patterns nhạt thanh lịch */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#8b5cf6_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Dòng chữ Nhấp để mở / cuộn xuống */}
      <div className="z-20 mb-3 animate-bounce">
        <p className={`${ebGaramond.className} text-[#786470] text-sm sm:text-base tracking-widest italic opacity-85`}>
          Nhấp để mở !!!
        </p>
      </div>

      {/* Container chính cho SVG trang trí ở giữa màn hình */}
      <div className="relative w-[95%] sm:w-[480px] aspect-[0.71] z-10 flex flex-col items-center justify-center select-none filter drop-shadow-[0_8px_20px_rgba(0,0,0,0.08)]">
        {/* Left Polaroid Photo */}
        <div className="absolute left-[20%] top-[12.5%] w-[32%] aspect-[0.8] z-1 rotate-[-10.5deg]">
          <div
            className="absolute overflow-hidden bg-stone-100 rounded-sm"
            style={{
              top: "15.4%",
              bottom: "15.4%",
              left: "19.5%",
              right: "19.5%",
            }}
          >
            <Image
              src={leftPhotoSrc}
              alt="Groom Photo"
              fill
              className="object-cover"
              unoptimized={typeof leftPhotoSrc === "string"}
            />
          </div>
          <Image
            src={polaroid1}
            alt="Left Polaroid Frame"
            fill
            priority
            className="object-contain pointer-events-none z-10"
          />
        </div>

        {/* Right Polaroid Photo */}
        <div className="absolute left-[20%] top-[-4.5%] w-[60%] aspect-[0.8] z-1 rotate-[5.5deg]">
          <div
            className="absolute overflow-hidden bg-stone-100 rounded-sm"
            style={{
              top: "30.0%",
              bottom: "30.1%",
              left: "33.8%",
              right: "33.8%",
            }}
          >
            <Image
              src={rightPhotoSrc}
              alt="Bride Photo"
              fill
              className="object-cover"
              unoptimized={typeof rightPhotoSrc === "string"}
            />
          </div>
          <Image
            src={polaroid3}
            alt="Right Polaroid Frame"
            fill
            priority
            className="object-contain pointer-events-none z-10"
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
          className={`${ebGaramond.className} absolute left-[24.5%] top-[43%] w-[49%] h-[19%] flex text-[#786470] z-20`}
        >
          {/* Left vertical text */}
          <div className="w-[40%] h-full flex items-center justify-center border-r border-dashed border-[#786470]/30 select-none">
            <span className="text-[7px] sm:text-[9px] font-bold uppercase tracking-widest whitespace-nowrap rotate-[-90deg] origin-center opacity-75">
              {groomName} - {brideName}
            </span>
          </div>

          {/* Right main text */}
          <div className="w-[80%] h-full flex flex-col items-center justify-center text-center p-1.5 space-y-0.5">
            <p
              className="text-[7px] sm:text-[9px] tracking-[0.2em] font-semibold opacity-85 uppercase"
              style={{ fontFamily: "sans-serif" }}
            >
              Save Our Date
            </p>
            <h2 className="text-sm sm:text-base font-bold tracking-wide text-[#594852] my-0 leading-none">
              {formattedDate}
            </h2>
            <p
              className={`${greatVibes.className} text-xs sm:text-sm italic text-[#786470] font-normal mt-0.5`}
            >
              We're getting married!
            </p>
          </div>
        </div>

        {/* Bottom Names */}
        <div className="absolute bottom-[4.5%] w-full text-center z-20">
          <p
            className={`${cinzel.className} text-sm sm:text-lg tracking-widest text-[#594852] font-semibold uppercase`}
          >
            {groomName}{" "}
            <span className="font-serif italic text-xs sm:text-sm text-[#786470] lowercase tracking-normal">
              and
            </span>{" "}
            {brideName}
          </p>
        </div>
      </div>
    </section>
  );
}

