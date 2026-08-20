import { useState, useEffect, useRef } from "react";
import { WeddingData } from "@/entities/invitation/model/types";
import {
  formatDateToDDMMYYYY,
} from "@/shared/lib/utils/date";

// img
import img_16 from "@/shared/assets/image/flower/img_16.webp";
import img_11 from "@/shared/assets/image/envelope/img_11.webp";
import img_12 from "@/shared/assets/image/envelope/img_12.webp";

interface InvitationCoverProps {
  weddingData: WeddingData;
  guestName?: string;
}

export function InvitationCover({
  weddingData,  
  guestName,
}: InvitationCoverProps) {
  const [animReady, setAnimReady] = useState(false);
  const [namesVisible, setNamesVisible] = useState(false);
  const namesRef = useRef<HTMLDivElement>(null);

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
    // Preload ảnh
    [img_11, img_12, img_16, couplePhoto].forEach((img) => {
      const src = getImgSrc(img);
      if (src && typeof window !== "undefined") {
        const i = new window.Image();
        i.src = src;
      }
    });

    // Kích hoạt animation phong bì sau mount
    const timer = setTimeout(() => {
      setAnimReady(true);
    }, 60);

    return () => clearTimeout(timer);
  }, [couplePhoto]);

  // Kích hoạt animation chữ khi người dùng lướt tới
  useEffect(() => {
    if (!namesRef.current || typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNamesVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -20px 0px",
      }
    );

    observer.observe(namesRef.current);

    return () => observer.disconnect();
  }, []);

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
        /* 1. Phong bì img_11 và img_12 hiển thị hoàn tất mượt mà đầu tiên */
        @keyframes envelope-appear {
          0% {
            opacity: 0;
            transform: translate3d(0, 4px, 0);
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        .animate-envelope-appear {
          animation: envelope-appear 0.4s ease-out both;
          will-change: opacity, transform;
        }

        /* 2. Sau khi phong bì hiển thị hoàn tất (delay 0.35s), hình ảnh mới bắt đầu chạy từ từ dưới lên trong 2s */
        @keyframes photo-slide-up {
          0% {
            opacity: 0;
            transform: translate3d(0, 160px, 0);
          }
          8% {
            opacity: 1;
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        .animate-photo-slide-up {
          animation: photo-slide-up 2s cubic-bezier(0.16, 1, 0.3, 1) 0.35s both;
          will-change: transform;
        }

        /* 3. Hoa trồi lên đồng bộ cùng lúc với hình ảnh */
        @keyframes flower-slide-up {
          0% {
            opacity: 0;
            transform: translate3d(0, 70px, 0);
          }
          12% {
            opacity: 1;
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        .animate-flower-slide-up {
          animation: flower-slide-up 1.8s cubic-bezier(0.16, 1, 0.3, 1) 0.35s both;
          will-change: transform;
        }

        /* 4. Sau khi hình ảnh trượt lên hoàn tất (0.35s + 2s = 2.35s), bắt đầu lơ lửng */
        @keyframes sway-slow {
          0%, 100% { transform: rotate(0deg) translate3d(0, 0, 0); }
          50% { transform: rotate(2deg) translate3d(0, -4px, 0); }
        }
        .animate-sway-slow {
          animation: sway-slow 6s ease-in-out infinite 2.4s;
        }
        @keyframes float-photo {
          0%, 100% { transform: rotate(7deg) translate3d(0, 0, 0); }
          50% { transform: rotate(8.5deg) translate3d(0, -8px, 0); }
        }
        .animate-float-photo {
          transform: rotate(7deg);
          animation: float-photo 5s ease-in-out infinite 2.4s;
          will-change: transform;
        }

        /* 5. Animation chữ kiểu kích hoạt khi lướt tới: Chú Rể chạy từ trái, & nở nhẹ, Cô Dâu chạy từ phải */
        @keyframes groom-slide-in {
          0% {
            opacity: 0;
            transform: translate3d(-45px, 0, 0);
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        .animate-groom-in {
          animation: groom-slide-in 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both;
          will-change: transform, opacity;
        }

        @keyframes ampersand-in {
          0% {
            opacity: 0;
            transform: scale(0.35) translate3d(0, 8px, 0);
          }
          100% {
            opacity: 1;
            transform: scale(1) translate3d(0, 0, 0);
          }
        }
        .animate-ampersand-in {
          animation: ampersand-in 1.0s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both;
          will-change: transform, opacity;
        }

        @keyframes bride-slide-in {
          0% {
            opacity: 0;
            transform: translate3d(45px, 0, 0);
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        .animate-bride-in {
          animation: bride-slide-in 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.45s both;
          will-change: transform, opacity;
        }

        @keyframes guest-pill-in {
          0% {
            opacity: 0;
            transform: translate3d(0, 16px, 0) scale(0.94);
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
          }
        }
        .animate-guest-in {
          animation: guest-pill-in 1.0s cubic-bezier(0.16, 1, 0.3, 1) 0.65s both;
          will-change: transform, opacity;
        }
      `}</style>

      {/* Top Section Header */}
      <div className="mb-1 mt-6 sm:mb-2 flex flex-col items-center">
        <span className="font-serif-title tracking-[0.25em] sm:tracking-[0.35em] text-sm sm:text-sm md:text-base font-semibold uppercase text-[#2E3D25] opacity-90 mb-0.5">
          SAVE THE DATE
        </span>
        <div className="w-14 sm:w-20 h-[1px] bg-gradient-to-r from-transparent via-[#2E3D25] to-transparent opacity-40 my-0.5" />
      </div>

      {/* Envelope Graphic Composition - Responsive Scale for Mobile & Desktop */}
      <div className={`relative w-full max-w-[390px] sm:max-w-[480px] md:max-w-[540px] lg:max-w-[580px] aspect-[1063/1891] mx-auto -mt-4 sm:-mt-6 -mb-24 sm:-mb-32 md:-mb-40 filter drop-shadow-[0_20px_45px_rgba(20,35,15,0.25)] ${animReady ? 'animate-envelope-appear' : 'opacity-0'}`}>
        {/* Layer 1: Envelope Interior & Back Flap (img_11) - Hiển thị cùng lúc với img_12 */}
        <img
          src={getImgSrc(img_11)}
          alt="Envelope Back"
          loading="eager"
          // @ts-ignore
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-contain pointer-events-none z-10"
        />

        {/* Layer 2: Flower Bouquet inside Envelope (img_16) - Hiện sau khi phong bì hiển thị hoàn tất */}
        <div className={`absolute left-[7%] sm:left-[5%] top-[15%] sm:top-[14%] w-[40%] sm:w-[42%] z-10 pointer-events-none drop-shadow-md ${animReady ? 'animate-flower-slide-up' : 'opacity-0'}`}>
          <div className="w-full h-full animate-sway-slow">
            <img
              src={getImgSrc(img_16)}
              alt="Flower Decoration"
              loading="eager"
              decoding="async"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* Layer 3: Couple Polaroid Photo Card - Hiện sau khi phong bì hiển thị hoàn tất, trượt từ từ dưới lên trong 2s */}
        <div className={`absolute right-[11%] sm:right-[13%] top-[23%] sm:top-[24%] w-[60%] sm:w-[62%] aspect-[3/4] z-20 ${animReady ? 'animate-photo-slide-up' : 'opacity-0'}`}>
          <div className="w-full h-full shadow-[0_22px_45px_rgba(0,0,0,0.48),0_6px_16px_rgba(0,0,0,0.25)] rounded-[4px] bg-white p-1.5 sm:p-2.5 border border-neutral-100/80 animate-float-photo">
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
        </div>

        {/* Layer 4: Envelope Front Pocket (img_12) hiển thị cùng lúc img_11, đè lên trước ảnh */}
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

      {/* Bottom Section: Bride & Groom Names directly below Envelope - 1 Hàng Ngang To Rõ Sắc Nét */}
      <div
        ref={namesRef}
        className="-mt-4 sm:-mt-6 mb-2 sm:mb-3 w-full max-w-full sm:max-w-[620px] md:max-w-[700px] mx-auto flex flex-col items-center select-none px-2"
      >
        <h1 className="relative flex flex-row items-center justify-center text-center leading-tight text-[#2E3D25] gap-x-2 sm:gap-x-4">
          {/* Tên Chú Rể */}
          <span
            className={`font-calligraphy capitalize text-[2.35rem] sm:text-4xl md:text-5xl lg:text-[54px] font-bold tracking-wide py-0.5 whitespace-nowrap ${namesVisible ? 'animate-groom-in' : 'opacity-0'}`}
            style={{
              WebkitTextStroke: "0.35px currentColor",
              textShadow:
                "0 2px 12px rgba(46, 61, 37, 0.18), 0 0 20px rgba(247, 249, 244, 0.9)",
            }}
          >
            {groomName || "Văn An"}
          </span>

          {/* Ký tự & */}
          <span
            className={`font-serif italic text-2xl sm:text-3xl md:text-4xl text-[#2E3D25]/80 select-none pointer-events-none ${namesVisible ? 'animate-ampersand-in' : 'opacity-0'}`}
            style={{
              textShadow: "0 1px 4px rgba(46, 61, 37, 0.12)",
            }}
          >
            &amp;
          </span>

          {/* Tên Cô Dâu */}
          <span
            className={`font-calligraphy capitalize text-[2.35rem] sm:text-4xl md:text-5xl lg:text-[54px] font-bold tracking-wide py-0.5 whitespace-nowrap ${namesVisible ? 'animate-bride-in' : 'opacity-0'}`}
            style={{
              WebkitTextStroke: "0.35px currentColor",
              textShadow:
                "0 2px 12px rgba(46, 61, 37, 0.18), 0 0 20px rgba(247, 249, 244, 0.9)",
            }}
          >
            {brideName || "Thị Bình"}
          </span>
        </h1>

        {guestName && (
          <div
            className={`mt-3 sm:mt-4 px-6 sm:px-8 py-1.5 sm:py-2 rounded-full bg-white/90 backdrop-blur-xs border border-[#2E3D25]/20 shadow-sm text-xs sm:text-sm md:text-base text-[#2E3D25] font-medium text-center ${namesVisible ? 'animate-guest-in' : 'opacity-0'}`}
          >
            Trân trọng kính mời: <span className="font-bold">{guestName}</span>
          </div>
        )}
      </div>
    </section>
  );
}
