import { useEffect } from "react";
import { WeddingData } from "@/entities/invitation/model/types";
import {
  formatDateToDDMMYYYY,
} from "@/shared/lib/utils/date";

// img
import img_16 from "@/shared/assets/image/flower/img_16.webp";
import img_11 from "@/shared/assets/image/envelope/img_11.svg";
import img_12 from "@/shared/assets/image/envelope/img_12.svg";

interface InvitationCoverProps {
  weddingData: WeddingData;
  guestName?: string;
}

export function InvitationCover({
  weddingData,  
  guestName,
}: InvitationCoverProps) {
  const {
    groomName,
    brideName,
    galleryImages,
    coverImageUrl,
    weddingDate,
    weddingTime,
  } = weddingData;

  const couplePhoto =
    (galleryImages && galleryImages[0]) ||
    coverImageUrl ||
    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=800";

  const formattedDateStr = formatDateToDDMMYYYY(weddingDate || "2026-05-23");

  const getImgSrc = (img: any): string => {
    if (!img) return "";
    return typeof img === "string" ? img : img.src || "";
  };

  useEffect(() => {
    [img_11, img_12, img_16, couplePhoto].forEach((img) => {
      const src = getImgSrc(img);
      if (src && typeof window !== "undefined") {
        const i = new window.Image();
        i.src = src;
      }
    });
  }, [couplePhoto]);

  return (
    <section className="relative flex flex-col items-center justify-start text-center overflow-hidden pt-2 sm:pt-4 pb-2 sm:pb-4 px-2 sm:px-4 md:px-6 bg-transparent select-none">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Alex+Brush&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Great+Vibes&family=Playfair+Display:ital,wght@0,500;0,600;1,400&family=Pinyon+Script&display=swap');

        .font-calligraphy {
          font-family: "Alex Brush", "Great Vibes", "Pinyon Script", cursive;
        }
        .font-serif-title {
          font-family: "Playfair Display", "Cormorant Garamond", serif;
        }
        @keyframes sway-slow {
          0%, 100% { transform: rotate(0deg) translateY(0px); }
          50% { transform: rotate(2deg) translateY(-4px); }
        }
        .animate-sway-slow {
          animation: sway-slow 6s ease-in-out infinite;
        }
        @keyframes float-photo {
          0%, 100% { transform: translateY(0px) rotate(7deg); }
          50% { transform: translateY(-8px) rotate(8deg); }
        }
        .animate-float-photo {
          animation: float-photo 5s ease-in-out infinite;
          will-change: transform;
        }
      `}</style>

      {/* Top Section Header */}
      <div className="mb-1 sm:mb-2 flex flex-col items-center">
        <span className="font-serif-title tracking-[0.25em] sm:tracking-[0.35em] text-xs sm:text-sm md:text-base font-semibold uppercase text-[#2E3D25] opacity-90 mb-0.5">
          SAVE THE DATE
        </span>
        <div className="w-14 sm:w-20 h-[1px] bg-gradient-to-r from-transparent via-[#2E3D25] to-transparent opacity-40 my-0.5" />
      </div>

      {/* Envelope Graphic Composition - Responsive Scale for Mobile & Desktop */}
      <div className="relative w-full max-w-[390px] sm:max-w-[480px] md:max-w-[540px] lg:max-w-[580px] aspect-[1063/1891] mx-auto -my-4 sm:-my-6 md:-my-8 filter drop-shadow-[0_20px_45px_rgba(20,35,15,0.25)]">
        {/* Layer 1: Envelope Interior & Back Flap (img_11) */}
        <img
          src={getImgSrc(img_11)}
          alt="Envelope Back"
          loading="eager"
          // @ts-ignore
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-contain pointer-events-none z-0"
        />

        {/* Layer 2: Couple Polaroid Photo Card */}
        <div className="absolute right-[11%] sm:right-[13%] top-[23%] sm:top-[24%] w-[60%] sm:w-[62%] aspect-[3/4] z-20 shadow-[0_22px_45px_rgba(0,0,0,0.48),0_6px_16px_rgba(0,0,0,0.25)] rounded-[4px] bg-white p-1.5 sm:p-2.5 border border-neutral-100/80 animate-float-photo">
          <div className="relative w-full h-full overflow-hidden rounded-[2px] bg-neutral-100">
            <img
              src={couplePhoto}
              alt="Groom & Bride"
              loading="eager"
              // @ts-ignore
              fetchPriority="high"
              decoding="async"
              className="w-full h-full object-cover contrast-[1.03]"
            />
            {/* Subtle Polaroid Gloss Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-white/20 pointer-events-none" />
          </div>
        </div>

        {/* Layer 3: Flower Bouquet inside Envelope (img_16) */}
        <div className="absolute left-[7%] sm:left-[5%] top-[15%] sm:top-[14%] w-[40%] sm:w-[42%] z-10 pointer-events-none drop-shadow-md animate-sway-slow">
          <img
            src={getImgSrc(img_16)}
            alt="Flower Decoration"
            loading="eager"
            decoding="async"
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Layer 4: Envelope Front Pocket (img_12) đè lên khít đáy, trái, phải và kẹp ảnh ở giữa */}
        <img
          src={getImgSrc(img_12)}
          alt="Envelope Front Flap"
          loading="eager"
          // @ts-ignore
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-contain pointer-events-none z-30 drop-shadow-sm translate-y-[11.73%]"
        />
      </div>

      {/* Bottom Section: Bride & Groom Names directly below Envelope */}
      <div className="mt-0 sm:mt-1 mb-4 sm:mb-6 flex flex-col items-center justify-center text-center select-none">
        <h1 className="relative flex flex-col items-center justify-center font-serif-title uppercase text-[#2E3D25] tracking-[0.16em] leading-tight">
          <span
            className="text-[2.2rem] sm:text-5xl md:text-6xl font-bold py-0.5 transition-all duration-300 drop-shadow-sm"
            style={{
              textShadow:
                "0 2px 10px rgba(46, 61, 37, 0.2), 0 0 20px rgba(247, 249, 244, 0.9)",
            }}
          >
            {groomName || "HOÀNG LONG"}
          </span>
          <span
            className="font-calligraphy text-3xl sm:text-5xl md:text-6xl text-[#2E3D25]/70 my-0.5 select-none pointer-events-none"
            style={{
              textShadow: "0 2px 8px rgba(46, 61, 37, 0.12)",
            }}
          >
            &amp;
          </span>
          <span
            className="text-[2.2rem] sm:text-5xl md:text-6xl font-bold py-0.5 transition-all duration-300 drop-shadow-sm"
            style={{
              textShadow:
                "0 2px 10px rgba(46, 61, 37, 0.2), 0 0 20px rgba(247, 249, 244, 0.9)",
            }}
          >
            {brideName || "BẢO NGỌC"}
          </span>
        </h1>

        {guestName && (
          <div className="mt-2 sm:mt-3 px-5 sm:px-7 py-1.5 sm:py-2 rounded-full bg-white/90 backdrop-blur-xs border border-[#2E3D25]/20 shadow-sm text-xs sm:text-sm md:text-base text-[#2E3D25] font-medium">
            Trân trọng kính mời: <span className="font-bold">{guestName}</span>
          </div>
        )}
      </div>
    </section>
  );
}
