import React, { useState, useEffect, useRef } from "react";
import { greatVibes, playfairDisplay } from "@/shared/lib/fonts";
import { WeddingData } from "@/entities/invitation/model/types";

interface CouplePolaroidCardsProps {
  weddingData: WeddingData;
}

export function CouplePolaroidCards({ weddingData }: CouplePolaroidCardsProps) {
  // Individual visibility state for each element so animations trigger per scroll position
  const [headerVisible, setHeaderVisible] = useState(false);
  const [groomVisible, setGroomVisible] = useState(false);
  const [brideVisible, setBrideVisible] = useState(false);

  const headerRef = useRef<HTMLDivElement>(null);
  const groomRef = useRef<HTMLDivElement>(null);
  const brideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const createObserver = (setter: React.Dispatch<React.SetStateAction<boolean>>) =>
      new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setter(true);
          }
        },
        { threshold: 0.15 }
      );

    const headerObserver = createObserver(setHeaderVisible);
    const groomObserver = createObserver(setGroomVisible);
    const brideObserver = createObserver(setBrideVisible);

    if (headerRef.current) headerObserver.observe(headerRef.current);
    if (groomRef.current) groomObserver.observe(groomRef.current);
    if (brideRef.current) brideObserver.observe(brideRef.current);

    return () => {
      headerObserver.disconnect();
      groomObserver.disconnect();
      brideObserver.disconnect();
    };
  }, []);

  const groomPhoto =
    weddingData.groomImage ||
    weddingData.galleryImages?.[0] ||
    "https://i.pinimg.com/736x/d5/65/1d/d5651d80c2672de9c2c8a081746e51e9.jpg";

  const bridePhoto =
    weddingData.brideImage ||
    weddingData.galleryImages?.[1] ||
    weddingData.galleryImages?.[0] ||
    "https://i.pinimg.com/736x/d5/65/1d/d5651d80c2672de9c2c8a081746e51e9.jpg";

  return (
    <section className="w-full bg-[#f8f6f0] py-12 sm:py-18 px-4 sm:px-6 flex flex-col items-center justify-center text-center select-none overflow-hidden space-y-12 sm:space-y-16">
      {/* ── SAVE THE DATE HEADER: HIỆN TỪ TỪ TỪ TRONG RA NGOÀI KHI CUỘN TỚI ── */}
      <div
        ref={headerRef}
        className={`transition-all duration-1600 ease-out transform-gpu ${
          headerVisible
            ? "opacity-100 scale-100"
            : "opacity-0 scale-50 pointer-events-none"
        }`}
      >
        <h2
          className={`${greatVibes.className} text-5xl sm:text-7xl md:text-8xl text-[#8b6c42] font-normal tracking-wide drop-shadow-[0_2px_10px_rgba(139,108,66,0.15)]`}
        >
          Save The Date
        </h2>
      </div>

      {/* ── POLAROID CARDS CONTAINER ── */}
      <div className="w-full max-w-sm sm:max-w-md mx-auto space-y-10 sm:space-y-12">
        {/* ── GROOM POLAROID CARD: CHẠY TỪ TRÁI VÀO KHI CUỘN TỚI ÁNH ẢNH CHÚ RỂ ── */}
        <div
          ref={groomRef}
          className={`bg-[#fffdfa] rounded-2xl p-4 sm:p-5 pb-6 sm:pb-8 border border-[#e5d9c8] shadow-[0_15px_45px_rgba(139,108,66,0.08)] relative transition-all duration-1600 ease-out ${
            groomVisible
              ? "opacity-100 translate-x-0 rotate-[-1deg]"
              : "opacity-0 -translate-x-24 sm:-translate-x-32 rotate-[-6deg]"
          }`}
        >
          {/* Photo Frame */}
          <div className="relative w-full aspect-[4/5] overflow-hidden rounded-lg bg-[#f0e9df]">
            <img
              src={groomPhoto}
              alt={weddingData.groomName}
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Card Caption: TÊN CHÚ RỂ HIỆN RÕ TỪ TỪ ── */}
          <div
            className={`pt-5 sm:pt-6 space-y-1.5 text-center transition-all duration-1400 ease-out delay-300 ${
              groomVisible
                ? "opacity-100 blur-0 scale-100"
                : "opacity-0 blur-sm scale-95"
            }`}
          >
            <p
              className={`${greatVibes.className} text-3xl sm:text-4xl text-[#aa8657] font-semibold`}
            >
              Chú rể
            </p>
            <h3
              className={`${playfairDisplay.className} text-2xl sm:text-3xl text-[#8b6c42] font-bold tracking-[0.15em] uppercase drop-shadow-sm`}
            >
              {weddingData.groomName}
            </h3>
          </div>
        </div>

        {/* ── BRIDE POLAROID CARD: CHẠY TỪ PHẢI VÀO KHI CUỘN TỚI ẢNH CÔ DÂU ── */}
        <div
          ref={brideRef}
          className={`bg-[#fffdfa] rounded-2xl p-4 sm:p-5 pb-6 sm:pb-8 border border-[#e5d9c8] shadow-[0_15px_45px_rgba(139,108,66,0.08)] relative transition-all duration-1600 ease-out ${
            brideVisible
              ? "opacity-100 translate-x-0 rotate-[1deg]"
              : "opacity-0 translate-x-24 sm:translate-x-32 rotate-[6deg]"
          }`}
        >
          {/* Photo Frame */}
          <div className="relative w-full aspect-[4/5] overflow-hidden rounded-lg bg-[#f0e9df]">
            <img
              src={bridePhoto}
              alt={weddingData.brideName}
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Card Caption: TÊN CÔ DÂU HIỆN RÕ TỪ TỪ ── */}
          <div
            className={`pt-5 sm:pt-6 space-y-1.5 text-center transition-all duration-1400 ease-out delay-300 ${
              brideVisible
                ? "opacity-100 blur-0 scale-100"
                : "opacity-0 blur-sm scale-95"
            }`}
          >
            <p
              className={`${greatVibes.className} text-3xl sm:text-4xl text-[#aa8657] font-semibold`}
            >
              Cô dâu
            </p>
            <h3
              className={`${playfairDisplay.className} text-2xl sm:text-3xl text-[#8b6c42] font-bold tracking-[0.15em] uppercase drop-shadow-sm`}
            >
              {weddingData.brideName}
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}

