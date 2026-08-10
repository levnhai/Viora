import { useEffect } from "react";
import { WeddingData } from "@/entities/invitation/model/types";
import {
  formatDateToDDMMYYYY,
  formatVietnameseDate,
} from "@/shared/lib/utils/date";

// img
import img_16 from "@/shared/assets/image/flower/img_16.webp";
import img_9 from "@/shared/assets/image/envelope/img_9.webp";
import img_10 from "@/shared/assets/image/envelope/img_10.webp";

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
    // Preload envelope assets into browser memory immediately
    [img_9, img_10, img_16, couplePhoto].forEach((img) => {
      const src = getImgSrc(img);
      if (src && typeof window !== "undefined") {
        const i = new window.Image();
        i.src = src;
      }
    });
  }, [couplePhoto]);

  return (
    <section className="relative flex flex-col items-center justify-start text-center overflow-hidden pt-8 px-4 bg-transparent select-none">
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
      <div className="mb-6 flex flex-col items-center">
        <span className="font-serif-title tracking-[0.3em] text-md sm:text-sm font-semibold uppercase text-[#2E3D25] opacity-90 mb-1">
          SAVE THE DATE
        </span>
        <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#2E3D25] to-transparent opacity-40 my-1" />
      </div>

      {/* Envelope Graphic Composition */}
      <div className="relative w-full max-w-[340px] sm:max-w-[400px] md:max-w-[440px] aspect-[1013/1168] mx-auto my-10 filter drop-shadow-[0_20px_40px_rgba(20,35,15,0.22)]">
        {/* Layer 1: Envelope Interior & Back Flap (img_9) */}
        <img
          src={getImgSrc(img_9)}
          alt="Envelope Back"
          loading="eager"
          // @ts-ignore
          fetchPriority="high"
          decoding="async"
          className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none z-0"
        />

        {/* Layer 2: Couple Polaroid Photo Card */}
        <div className="absolute right-[3%] sm:right-[4%] top-[1%] sm:top-[2%] w-[62%] sm:w-[65%] aspect-[3/4] z-20 shadow-[0_22px_45px_rgba(0,0,0,0.48),0_6px_16px_rgba(0,0,0,0.25)] rounded-[4px] bg-white p-1.5 sm:p-2 border border-neutral-100/80 animate-float-photo">
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
        <div className="absolute left-[1%] sm:left-[-1%] top-[-10%] sm:top-[-10%] w-[40%] sm:w-[40%] z-10 pointer-events-none drop-shadow-md animate-sway-slow">
          <img
            src={getImgSrc(img_16)}
            alt="Flower Decoration"
            loading="eager"
            decoding="async"
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Layer 4: Envelope Front Pocket (img_10) */}
        <img
          src={getImgSrc(img_10)}
          alt="Envelope Front Flap"
          loading="eager"
          // @ts-ignore
          fetchPriority="high"
          decoding="async"
          className="absolute bottom-0 left-0 w-full h-auto pointer-events-none z-30 drop-shadow-sm"
        />
      </div>

      {/* Bottom Section: Bride & Groom Names directly below Envelope */}
      <div className="mt-10 mb-8 flex flex-col items-center justify-center text-center select-none">
        <h1 className="relative flex flex-col items-center justify-center font-serif-title uppercase text-[#2E3D25] tracking-[0.16em] leading-tight">
          <span
            className="text-[2.5rem] sm:text-5xl md:text-6xl font-bold py-1 transition-all duration-300 drop-shadow-sm"
            style={{
              textShadow:
                "0 2px 10px rgba(46, 61, 37, 0.2), 0 0 20px rgba(247, 249, 244, 0.9)",
            }}
          >
            {groomName || "HOÀNG LONG"}
          </span>
          <span
            className="font-calligraphy text-4xl sm:text-6xl md:text-7xl text-[#2E3D25]/70 my-1 select-none pointer-events-none"
            style={{
              textShadow: "0 2px 8px rgba(46, 61, 37, 0.12)",
            }}
          >
            &amp;
          </span>
          <span
            className="text-[2.5rem] sm:text-5xl md:text-6xl font-bold py-1 transition-all duration-300 drop-shadow-sm"
            style={{
              textShadow:
                "0 2px 10px rgba(46, 61, 37, 0.2), 0 0 20px rgba(247, 249, 244, 0.9)",
            }}
          >
            {brideName || "BẢO NGỌC"}
          </span>
        </h1>

        {guestName && (
          <div className="mt-6 px-6 py-2 rounded-full bg-white/90 backdrop-blur-xs border border-[#2E3D25]/20 shadow-sm text-xs sm:text-sm text-[#2E3D25] font-medium">
            Trân trọng kính mời: <span className="font-bold">{guestName}</span>
          </div>
        )}
      </div>
    </section>
  );
}
