"use client";

import { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import gsap from "gsap";
import { formatVietnameseDate } from "@/shared/lib/utils/date";
import bgWood from "@/shared/assets/image/wood/img_1.webp";
import img_6 from "@/shared/assets/image/wood/img_6.svg";
import img_18 from "@/shared/assets/image/flower/img_18.svg";
import bird_1 from "@/shared/assets/image/bird/img_1.svg";
import bird_2 from "@/shared/assets/image/bird/img_2.svg";
import bird_3 from "@/shared/assets/image/bird/img_3.svg";
import img_7 from "@/shared/assets/image/wood/img_7.svg";
import img_8 from "@/shared/assets/image/wood/img_8.svg";
import img_9 from "@/shared/assets/image/wood/img_9.svg";
import img_10 from "@/shared/assets/image/wood/img_10.svg";

interface Envelope_8Props {
  guestName?: string;
  groomName?: string;
  brideName?: string;
  weddingDate?: string;
  weddingTime?: string;
  onOpen: () => void;
  isFixed?: boolean;
  primaryColor?: string;
  textColor?: string;
}

export function Envelope_8({
  guestName,
  groomName,
  brideName,
  weddingDate,
  weddingTime,
  onOpen,
  isFixed = true,
}: Envelope_8Props) {
  const [isOpening, setIsOpening] = useState(false);

  // GSAP Refs cho các phần tử thiệp
  const containerRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const bannerTextRef = useRef<HTMLDivElement>(null);
  const groomRef = useRef<HTMLHeadingElement>(null);
  const ampersandRef = useRef<HTMLSpanElement>(null);
  const brideRef = useRef<HTMLHeadingElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);
  const bottomCardRef = useRef<HTMLDivElement>(null);
  const wood7Ref = useRef<HTMLDivElement>(null);
  const wood8Ref = useRef<HTMLDivElement>(null);
  const wood9Ref = useRef<HTMLDivElement>(null);
  const wood10Ref = useRef<HTMLDivElement>(null);
  const flower18Ref = useRef<HTMLDivElement>(null);

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);

    try {
      confetti({
        particleCount: 110,
        spread: 85,
        origin: { y: 0.55 },
        colors: ["#D4AF37", "#F7E7CE", "#8B4513", "#FFF0F0", "#E87A7A"],
        zIndex: 10000,
      });
    } catch (e) {}

    setTimeout(() => {
      onOpen();
    }, 900);
  };

  const woodImgSrc =
    typeof bgWood === "string" ? bgWood : (bgWood as any)?.src || bgWood;
  const bannerImgSrc =
    typeof img_6 === "string" ? img_6 : (img_6 as any)?.src || img_6;
  const img18Src =
    typeof img_18 === "string" ? img_18 : (img_18 as any)?.src || img_18;
  const bird1Src =
    typeof bird_1 === "string" ? bird_1 : (bird_1 as any)?.src || bird_1;
  const bird2Src =
    typeof bird_2 === "string" ? bird_2 : (bird_2 as any)?.src || bird_2;
  const bird3Src =
    typeof bird_3 === "string" ? bird_3 : (bird_3 as any)?.src || bird_3;
  const img7Src =
    typeof img_7 === "string" ? img_7 : (img_7 as any)?.src || img_7;
  const img8Src =
    typeof img_8 === "string" ? img_8 : (img_8 as any)?.src || img_8;
  const img9Src =
    typeof img_9 === "string" ? img_9 : (img_9 as any)?.src || img_9;
  const img10Src =
    typeof img_10 === "string" ? img_10 : (img_10 as any)?.src || img_10;

  // Preload tất cả hình ảnh ngay khi component mount
  useEffect(() => {
    const assetsToPreload = [
      woodImgSrc,
      bannerImgSrc,
      img18Src,
      bird1Src,
      bird2Src,
      bird3Src,
      img7Src,
      img8Src,
      img9Src,
      img10Src,
    ].filter(Boolean);

    assetsToPreload.forEach((src) => {
      if (typeof src === "string") {
        const img = new Image();
        img.src = src;
      }
    });
  }, [
    woodImgSrc,
    bannerImgSrc,
    img18Src,
    bird1Src,
    bird2Src,
    bird3Src,
    img7Src,
    img8Src,
    img9Src,
    img10Src,
  ]);

  // KÍCH HOẠT CHUYỂN ĐỘNG NGHỆ THUẬT GSAP TIMELINE KHI MOUNT
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Banner "Save the Date" thả xuống từ phía trên với độ nảy nhẹ
      if (bannerRef.current) {
        tl.fromTo(
          bannerRef.current,
          { y: -200, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, ease: "back.out(1.2)" },
          0.1,
        );
      }

      if (bannerTextRef.current) {
        tl.fromTo(
          bannerTextRef.current,
          { y: -100, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.0, ease: "power2.out" },
          0.7,
        );
      }

      // 2. Họa tiết gỗ & hoa hiện lên tự nhiên
      const woodDecorations = [
        wood7Ref.current,
        wood8Ref.current,
        wood9Ref.current,
        wood10Ref.current,
        flower18Ref.current,
      ].filter(Boolean);

      if (woodDecorations.length > 0) {
        tl.fromTo(
          woodDecorations,
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 0.85,
            duration: 0.9,
            stagger: 0.12,
            ease: "power2.out",
          },
          0.3,
        );
      }

      // 3. Tên chú rể trượt mượt từ TRÁI sang với hiệu ứng nảy mượt
      if (groomRef.current) {
        tl.fromTo(
          groomRef.current,
          { x: -140, opacity: 0, scale: 0.9 },
          { x: 0, opacity: 1, scale: 1, duration: 1.3, ease: "back.out(1.4)" },
          0.5,
        );
      }

      // 4. Ký tự "&" nảy xoay từ trung tâm
      if (ampersandRef.current) {
        tl.fromTo(
          ampersandRef.current,
          { scale: 0.2, rotate: -20, opacity: 0 },
          {
            scale: 1,
            rotate: 0,
            opacity: 1,
            duration: 0.9,
            ease: "back.out(2)",
          },
          0.7,
        );
      }

      // 5. Tên cô dâu trượt mượt từ PHẢI sang với hiệu ứng nảy mượt
      if (brideRef.current) {
        tl.fromTo(
          brideRef.current,
          { x: 140, opacity: 0, scale: 0.9 },
          { x: 0, opacity: 1, scale: 1, duration: 1.3, ease: "back.out(1.4)" },
          0.85,
        );
      }

      // 6. Ngày cưới & Thẻ Kính mời trượt từ DƯỚI (BOTTOM) lên
      if (dateRef.current) {
        tl.fromTo(
          dateRef.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.0, ease: "power2.out" },
          1.05,
        );
      }

      if (bottomCardRef.current) {
        tl.fromTo(
          bottomCardRef.current,
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, ease: "back.out(1.2)" },
          1.2,
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const weddingDateLabel = weddingDate
    ? formatVietnameseDate(weddingDate, {
        includeWeekday: true,
        time: weddingTime,
      })
    : "";

  return (
    <div
      onClick={handleOpen}
      className={`${
        isFixed ? "fixed" : "absolute"
      } inset-0 z-50 flex items-center justify-center cursor-pointer select-none bg-stone-950/80 backdrop-blur-sm overflow-hidden transition-opacity duration-700 ${
        isOpening ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Alex+Brush&family=Cinzel:wght@600;700&family=Great+Vibes&family=Playfair+Display:ital,wght@0,600;1,400&family=Pinyon+Script&display=swap');

        /* HIỆU ỨNG CHIM BAY CHUYỂN ĐỘNG LIÊN TỤC */
        @keyframes fly-bird-sequence-1 {
          0% {
            transform: translate(-30%, 15vh) scale(1.2) rotate(-6deg);
            opacity: 0;
          }
          5% {
            opacity: 1;
          }
          26% {
            transform: translate(50%, 10vh) scale(1.4) rotate(3deg);
            opacity: 1;
          }
          32% {
            opacity: 1;
          }
          35%, 100% {
            transform: translate(125%, 18vh) scale(1.2) rotate(-2deg);
            opacity: 0;
          }
        }

        @keyframes fly-bird-sequence-2 {
          0%, 33% {
            transform: translate(-30%, 30vh) scale(1.15) rotate(-8deg);
            opacity: 0;
          }
          38% {
            opacity: 1;
          }
          58% {
            transform: translate(55%, 22vh) scale(1.35) rotate(4deg);
            opacity: 1;
          }
          65% {
            opacity: 1;
          }
          68%, 100% {
            transform: translate(125%, 28vh) scale(1.15) rotate(-3deg);
            opacity: 0;
          }
        }

        @keyframes fly-bird-sequence-3 {
          0%, 66% {
            transform: translate(-30%, 45vh) scale(1.1) rotate(-10deg);
            opacity: 0;
          }
          71% {
            opacity: 1;
          }
          90% {
            transform: translate(50%, 35vh) scale(1.3) rotate(3deg);
            opacity: 1;
          }
          97% {
            opacity: 1;
          }
          100% {
            transform: translate(125%, 42vh) scale(1.1) rotate(-4deg);
            opacity: 0;
          }
        }

        .animate-fly-seq-1 {
          animation: fly-bird-sequence-1 15s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .animate-fly-seq-2 {
          animation: fly-bird-sequence-2 15s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .animate-fly-seq-3 {
          animation: fly-bird-sequence-3 15s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>

      {/* Khung phong bì*/}
      <div
        ref={containerRef}
        className="relative w-full sm:max-w-[450px] md:max-w-[480px] h-full overflow-hidden bg-stone-900 shadow-2xl"
      >
        {/*CHIM BAY*/}
        <div
          className={`absolute inset-0 pointer-events-none z-35 overflow-hidden transition-opacity duration-700 ${
            isOpening ? "opacity-0" : "opacity-100"
          }`}
        >
          {/* CHIM 1(0s -> 5s) */}
          <div className="absolute top-0 left-0 w-[300px] sm:w-[320px] max-w-[360px] animate-fly-seq-1">
            <img
              src={bird1Src}
              alt="Chim bay 1"
              loading="eager"
              decoding="async"
              className="w-full h-auto object-contain filter drop-shadow-[0_8px_20px_rgba(0,0,0,0.95)] brightness-110 contrast-125"
            />
          </div>

          {/* CHIM 2 (5s -> 10s) */}
          <div className="absolute top-0 left-0 w-[280px] sm:w-[300px] max-w-[340px] animate-fly-seq-2">
            <img
              src={bird2Src}
              alt="Chim bay 2"
              loading="eager"
              decoding="async"
              className="w-full h-auto object-contain filter drop-shadow-[0_8px_20px_rgba(0,0,0,0.95)] brightness-110 contrast-125"
            />
          </div>

          {/* CHIM 3 (10s -> 15s) */}
          <div className="absolute top-0 left-0 w-[260px] sm:w-[280px] max-w-[320px] animate-fly-seq-3">
            <img
              src={bird3Src}
              alt="Chim bay 3"
              loading="eager"
              decoding="async"
              className="w-full h-auto object-contain filter drop-shadow-[0_8px_20px_rgba(0,0,0,0.95)] brightness-110 contrast-125"
            />
          </div>
        </div>
        {/* THẺ DIV 1: CÁNH TRÁI - TỶ LỆ 70% (7/3) */}
        <div
          className={`absolute top-0 bottom-0 left-0 w-[70%] z-20 overflow-hidden shadow-[5px_0_15px_rgba(0,0,0,0.5)] transition-transform duration-1000 ease-[cubic-bezier(0.77,0,0.175,1)] ${
            isOpening ? "-translate-x-[105%]" : "translate-x-0"
          }`}
        >
          <div
            className="absolute inset-0 bg-[#3d2314] bg-cover bg-left bg-no-repeat"
            style={{ backgroundImage: `url(${woodImgSrc})` }}
          />

          <div
            ref={bannerRef}
            className="absolute top-[-18%] sm:top-[-14%] left-[-18%] sm:left-[-14%] w-[100%] sm:w-[95%] max-w-[420px] sm:max-w-[450px] z-30 drop-shadow-2xl"
          >
            <div className="relative w-full">
              {/* Hình ảnh svg img_6 */}
              <img
                src={bannerImgSrc}
                alt="Save The Date Banner"
                loading="eager"
                decoding="async"
                className="w-full h-auto object-contain"
              />

              {/*  "Save the Date"*/}
              <div
                ref={bannerTextRef}
                className="absolute pointer-events-none z-10 flex items-center justify-center"
                style={{
                  top: "56.5%",
                  left: "55%",
                  transform: "translate(-50%, -50%) rotate(-42.8deg)",
                }}
              >
                <h2
                  className="text-3xl sm:text-4xl text-amber-50 font-medium tracking-wider drop-shadow-[0_4px_8px_rgba(0,0,0,0.95)] select-none whitespace-nowrap"
                  style={{
                    fontFamily: "'Great Vibes', 'Alex Brush', cursive",
                  }}
                >
                  Save the Date
                </h2>
              </div>
            </div>
          </div>
          {/* HOẠ TIẾT GỖ IMG_7*/}
          <div
            ref={wood7Ref}
            className="absolute top-[34%] left-[-6%] sm:left-[-8%] w-[130px] sm:w-[150px] max-w-[170px] z-25 pointer-events-none drop-shadow-xl rotate-12 opacity-85"
          >
            <img
              src={img7Src}
              alt="Họa tiết gỗ img 7"
              loading="eager"
              decoding="async"
              className="w-full h-auto object-contain filter drop-shadow-lg"
            />
          </div>

          {/* HOẠ TIẾT GỖ IMG_9 */}
          <div
            ref={wood9Ref}
            className="absolute bottom-[18%] left-[-4%] sm:left-[-6%] w-[120px] sm:w-[140px] max-w-[160px] z-25 pointer-events-none drop-shadow-xl -rotate-15 opacity-85"
          >
            <img
              src={img9Src}
              alt="Họa tiết gỗ img 9"
              loading="eager"
              decoding="async"
              className="w-full h-auto object-contain filter drop-shadow-lg"
            />
          </div>
        </div>

        {/* THẺ DIV 2 (7/3) */}
        <div
          className={`absolute top-0 bottom-0 left-[70%] w-[30%] z-30 transition-transform duration-1000 ease-[cubic-bezier(0.77,0,0.175,1)] ${
            isOpening ? "translate-x-[105%]" : "translate-x-0"
          }`}
        >
          <div
            className="absolute inset-0 bg-[#3d2314] bg-cover bg-right bg-no-repeat overflow-hidden shadow-[-5px_0_15px_rgba(0,0,0,0.5)]"
            style={{ backgroundImage: `url(${woodImgSrc})` }}
          />

          {/* HOẠ TIẾT GỖ IMG_8*/}
          <div
            ref={wood8Ref}
            className="absolute top-[38%] right-[-6%] sm:right-[-8%] w-[125px] sm:w-[145px] max-w-[165px] z-25 pointer-events-none drop-shadow-xl rotate-45 opacity-85"
          >
            <img
              src={img8Src}
              alt="Họa tiết gỗ img 8"
              className="w-full h-auto object-contain filter drop-shadow-lg"
            />
          </div>

          {/* HOẠ TIẾT GỖ IMG_10*/}
          <div
            ref={wood10Ref}
            className="absolute bottom-[28%] right-[-5%] sm:right-[-7%] w-[115px] sm:w-[135px] max-w-[155px] z-25 pointer-events-none drop-shadow-xl -rotate-12 opacity-85"
          >
            <img
              src={img10Src}
              alt="Họa tiết gỗ img 10"
              className="w-full h-auto object-contain filter drop-shadow-lg"
            />
          </div>

          {/* HÌNH ẢNH HOA IMG_18*/}
          <div
            ref={flower18Ref}
            className="absolute top-[-3%] sm:top-[-4%] right-[-10%] sm:right-[-12%] w-[240px] sm:w-[280px] max-w-[320px] z-35 pointer-events-none drop-shadow-2xl"
          >
            <img
              src={img18Src}
              alt="Họa tiết hoa góc trên phải"
              className="w-full h-auto object-contain filter drop-shadow-2xl opacity-90"
            />
          </div>
        </div>

        {!isOpening && (
          <div
            className="absolute top-0 bottom-0 left-[70%] w-px z-30 pointer-events-none bg-black/40 shadow-[0_0_4px_rgba(0,0,0,0.6)]"
            style={{ transform: "translateX(-50%)" }}
          />
        )}

        {/* Phong Bì*/}
        <div
          className={`absolute inset-0 pointer-events-none z-40 transition-all duration-700 ${
            isOpening
              ? "opacity-0 scale-95 pointer-events-none"
              : "opacity-100 scale-100"
          }`}
        >
          <div className="absolute top-[53%] sm:top-[57%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-3 sm:gap-4 max-w-lg w-full px-4 text-center pointer-events-auto">
            <div className="flex flex-col gap-4 sm:gap-6 w-[88%] sm:w-[82%] px-2 sm:px-4 my-1 sm:my-2">
              {/* TÊN CHÚ RỂ*/}
              <h1
                ref={groomRef}
                className="self-start text-left text-5xl sm:text-6xl text-amber-100 font-normal leading-tight tracking-wide ml-1 sm:ml-3 -translate-x-2 sm:-translate-x-3"
                style={{
                  fontFamily: "'Great Vibes', cursive",
                  textShadow:
                    "0 6px 22px rgba(0,0,0,0.95), 0 2px 6px rgba(0,0,0,0.9), 0 0 32px rgba(212,175,55,0.45)",
                  filter: "drop-shadow(0 10px 22px rgba(0,0,0,0.95))",
                }}
              >
                {groomName || "Văn An"}
              </h1>

              {/* KÝ TỰ & */}
              <span
                ref={ampersandRef}
                className="self-center text-4xl sm:text-5xl text-amber-300 -my-2 sm:-my-3 font-light italic"
                style={{
                  fontFamily: "'Great Vibes', cursive",
                  textShadow:
                    "0 4px 14px rgba(0,0,0,0.95), 0 0 24px rgba(212,175,55,0.6)",
                  filter: "drop-shadow(0 6px 14px rgba(0,0,0,0.9))",
                }}
              >
                &
              </span>

              {/* TÊN CÔ DÂU*/}
              <h1
                ref={brideRef}
                className="self-end text-right text-5xl sm:text-6xl text-amber-100 font-normal leading-tight tracking-wide mr-1 sm:mr-3 translate-x-2 sm:translate-x-3"
                style={{
                  fontFamily: "'Great Vibes', cursive",
                  textShadow:
                    "0 6px 22px rgba(0,0,0,0.95), 0 2px 6px rgba(0,0,0,0.9), 0 0 32px rgba(212,175,55,0.45)",
                  filter: "drop-shadow(0 10px 22px rgba(0,0,0,0.95))",
                }}
              >
                {brideName || "Thị Bình"}
              </h1>
            </div>

            {/* NGÀY THÁNG CƯỚI*/}
            {weddingDateLabel && (
              <div
                ref={dateRef}
                className="mt-1 flex flex-col items-center gap-2"
              >
                <div className="h-[2px] w-36 sm:w-48 bg-gradient-to-r from-transparent via-amber-400/80 to-transparent" />
                <span className="text-sm sm:text-base font-serif italic text-amber-200 tracking-widest uppercase drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                  {weddingDateLabel}
                </span>
              </div>
            )}
          </div>

          {/* KHỐI BOTTOM*/}
          <div
            ref={bottomCardRef}
            className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 w-full px-4 text-center pointer-events-auto z-50"
          >
            {/* THẺ KÍNH MỜI KHÁCH HÀNG */}
            <div className="px-6 py-2.5 rounded-xl bg-black/60 backdrop-blur-md border border-amber-400/50 shadow-2xl">
              <span className="text-xs sm:text-sm text-amber-300/90 uppercase tracking-widest mr-2">
                Kính mời:
              </span>
              <span className="text-lg sm:text-xl font-serif text-amber-100 font-medium">
                {guestName || "Quý khách"}
              </span>
            </div>

            <div className="flex items-center gap-2.5 text-amber-200/90 text-xs sm:text-sm font-light tracking-wider drop-shadow-md">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
              <span>Chạm để mở thiệp</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
