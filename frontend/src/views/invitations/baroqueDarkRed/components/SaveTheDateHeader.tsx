import React from "react";
import { WeddingData } from "@/entities/invitation/model/types";
import { AnimateView } from "@/widgets/invitation-blocks";

interface SaveTheDateHeaderProps {
  weddingData: WeddingData;
}

export const SaveTheDateHeader: React.FC<SaveTheDateHeaderProps> = ({ weddingData }) => {
  const groomName = weddingData.groomShortName || weddingData.groomName || "Gia Bảo";
  const brideName = weddingData.brideShortName || weddingData.brideName || "Ngọc Diệp";
  const coverImage =
    weddingData.coverImage ||
    weddingData.galleryImages?.[0] ||
    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=800";

  return (
    <header className="relative isolate flex w-full flex-col items-center pt-8 pb-4 md:pt-12 md:pb-6">
      {/* Subtitle */}
      <AnimateView animation="fadeInDown" duration={0.9}>
        <p
          className="relative z-20 whitespace-pre-line text-center text-[13px] md:text-[15px] uppercase font-semibold tracking-[0.18em]"
          style={{
            fontFamily: '"Playfair Display", "Times New Roman", serif',
            color: "#ffdfaf",
          }}
        >
          Save The Date
        </p>
      </AnimateView>

      {/* Khung tranh Baroque Mạ Vàng Ôm Ảnh Cưới */}
      <AnimateView animation="zoomIn" duration={1.1} delay={0.15} className="w-full flex justify-center">
        <div className="relative mt-6 w-[124%] max-w-none md:mt-8 md:w-[110%] group">
          <div
            className="relative mx-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            style={{ aspectRatio: "1237 / 1254" }}
          >
            {/* Ảnh cưới được đặt trong lồng khung */}
            <div
              className="absolute overflow-hidden shadow-2xl transition-transform duration-700 group-hover:scale-105"
              style={{
                left: "25.8%",
                top: "11.0%",
                width: "47.6%",
                height: "76.5%",
                boxShadow: "0 12px 30px rgba(0,0,0,0.6)",
              }}
            >
              <img
                src={coverImage}
                alt={`${groomName} & ${brideName}`}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* Lớp Overlay Khung Mạ Vàng Baroque Cổ Điển */}
            <img
              src="/images/themes/baroque-v2-dark-red/frame.webp"
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 h-full w-full max-w-none object-fill select-none drop-shadow-[0_15px_25px_rgba(0,0,0,0.5)]"
              loading="eager"
            />
          </div>
        </div>
      </AnimateView>

      {/* Tên Cặp Đôi Sang Trọng Kèm Dấu & Mờ Nền */}
      <div className="relative mt-8 flex w-full max-w-[340px] md:max-w-[440px] flex-col items-center gap-3 px-4 text-center">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 text-[96px] md:text-[115px] leading-none select-none"
          style={{
            fontFamily: '"The Nautigal", "Great Vibes", cursive',
            color: "rgba(255, 239, 214, 0.18)",
            transform: "translate(-50%, calc(-50% - 0.15em))",
          }}
        >
          &amp;
        </span>

        <AnimateView animation="fadeInUp" duration={0.9} delay={0.2} className="relative z-10 flex w-full justify-center">
          <span
            className="whitespace-nowrap uppercase leading-none text-3xl sm:text-4xl md:text-[45px] tracking-wider"
            style={{
              fontFamily: '"Viaoda Libre", "Cormorant Garamond", "EB Garamond", serif',
              color: "#ffdfaf",
            }}
          >
            {groomName}
          </span>
        </AnimateView>

        <AnimateView animation="fadeInUp" duration={0.9} delay={0.3} className="relative z-10 flex w-full justify-center">
          <span
            className="whitespace-nowrap uppercase leading-none text-3xl sm:text-4xl md:text-[45px] tracking-wider"
            style={{
              fontFamily: '"Viaoda Libre", "Cormorant Garamond", "EB Garamond", serif',
              color: "#ffdfaf",
            }}
          >
            {brideName}
          </span>
        </AnimateView>
      </div>
    </header>
  );
};
