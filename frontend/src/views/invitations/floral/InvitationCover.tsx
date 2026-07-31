import React, { useState, useEffect } from "react";
import { formatDate } from "@/shared/lib/utils/date";
import { cormorantGaramond } from "@/shared/lib/fonts";
import { WeddingData } from "@/entities/invitation/model/types";

interface InvitationCoverProps {
  weddingData: WeddingData;
  isOpened?: boolean;
}

export function InvitationCover({
  weddingData,
  isOpened = false,
}: InvitationCoverProps) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isOpened) {
      const timer = setTimeout(() => {
        setAnimate(true);
      }, 350);
      return () => clearTimeout(timer);
    } else {
      setAnimate(false);
    }
  }, [isOpened]);

  const heroImage =
    weddingData.coverImage ||
    weddingData.galleryImages?.[0] ||
    "https://i.pinimg.com/736x/d5/65/1d/d5651d80c2672de9c2c8a081746e51e9.jpg";

  return (
    <section className="relative w-full h-[100dvh] bg-[#f8f6f0] overflow-hidden select-none">
      {/* ── hình ảnh ── */}
      <div className="relative w-full h-full overflow-hidden">
        {/* Cover Photo */}
        <img
          src={heroImage}
          alt={`${weddingData.groomName} & ${weddingData.brideName}`}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

        {/* tên cô dâu và chú rễ*/}
        <div className="absolute bottom-8 left-6 sm:left-10 right-6 sm:right-10 text-white z-10 flex flex-col space-y-1 sm:space-y-2">
          {/* Groom Name (Slide from Left) */}
          <div
            className={`self-start text-left pl-2 sm:pl-6 transition-all duration-1000 ease-out delay-200 ${
              animate
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-16 sm:-translate-x-24"
            }`}
          >
            <h1 className="font-wedding-script text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-normal text-white drop-shadow-[0_4px_18px_rgba(0,0,0,0.9)] leading-relaxed tracking-wide">
              {weddingData.groomName}
            </h1>
          </div>

          {/* Ampersand (Fade and Scale in center) */}
          <div
            className={`self-center my-[-12px] sm:my-[-16px] transition-all duration-1000 ease-out delay-500 ${
              animate ? "opacity-100 scale-100" : "opacity-0 scale-50"
            }`}
          >
            <span className="italic font-serif text-[#f3e5c8] text-3xl sm:text-5xl md:text-6xl font-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              &amp;
            </span>
          </div>

          {/* Bride Name (Slide from Right) */}
          <div
            className={`self-end text-right pr-2 sm:pr-6 transition-all duration-1000 ease-out delay-700 ${
              animate
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-16 sm:translate-x-24"
            }`}
          >
            <h1 className="font-wedding-script text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-normal text-white drop-shadow-[0_4px_18px_rgba(0,0,0,0.9)] leading-relaxed tracking-wide">
              {weddingData.brideName}
            </h1>
          </div>

          {/* Wedding Date Display (Slide up from Bottom) */}
          <div
            className={`pt-4 sm:pt-6 flex items-center justify-center gap-3 sm:gap-4 self-center w-full transition-all duration-1000 ease-out delay-1000 ${
              animate
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8 sm:translate-y-12"
            }`}
          >
            <div className="h-[1px] w-8 sm:w-12 bg-gradient-to-r from-transparent to-[#f3e5c8]" />
            <p
              className={`${cormorantGaramond.className} text-[#f3e5c8] text-xl sm:text-2xl md:text-3xl tracking-[0.3em] font-light uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]`}
            >
              {formatDate(weddingData.weddingDate)}
            </p>
            <div className="h-[1px] w-8 sm:w-12 bg-gradient-to-l from-transparent to-[#f3e5c8]" />
          </div>
        </div>
      </div>
    </section>
  );
}
