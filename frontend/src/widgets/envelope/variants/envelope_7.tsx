import { useState, useRef, useEffect } from "react";
import { formatVietnameseDate } from "@/shared/lib/utils/date";
import { getLastTwoNames } from "@/shared/lib/utils/string";
import img_26 from "@/shared/assets/image/flower/img_26.webp";
import img_25 from "@/shared/assets/image/flower/img_25.svg";
import confetti from "canvas-confetti";
import gsap from "gsap";

interface Envelope_7Props {
  guestName?: string;
  groomName: string;
  brideName: string;
  weddingDate: string;
  weddingTime?: string;
  onOpen: () => void;
  isFixed?: boolean;
  primaryColor?: string;
  textColor?: string;
}

export function Envelope_7({
  guestName,
  groomName,
  brideName,
  weddingDate,
  weddingTime,
  onOpen,
  isFixed = true,
  textColor = "#2E3D25",
}: Envelope_7Props) {
  const [isOpening, setIsOpening] = useState(false);

  // GSAP Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const envelopeBodyRef = useRef<HTMLDivElement>(null);
  const floatingWrapperRef = useRef<HTMLDivElement>(null);
  const sealRef = useRef<HTMLDivElement>(null);
  const groomRef = useRef<HTMLSpanElement>(null);
  const ampersandRef = useRef<HTMLSpanElement>(null);
  const brideRef = useRef<HTMLSpanElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);
  const guestRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const flowerTopRef = useRef<HTMLDivElement>(null);
  const flowerBottomRef = useRef<HTMLDivElement>(null);

  // Kích hoạt GSAP Timeline khi Mount - Chậm rãi, êm ái, quý phái
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      // 1. Toàn bộ phong bì trượt nhẹ lên và hiện rõ chậm rãi
      if (envelopeBodyRef.current) {
        tl.fromTo(
          envelopeBodyRef.current,
          { y: 30, scale: 0.96, opacity: 0 },
          { y: 0, scale: 1, opacity: 1, duration: 1.2, ease: "power2.out" },
          0.1
        );
      }

      // 2. Con dấu sáp hiện ra êm ái
      if (sealRef.current) {
        tl.fromTo(
          sealRef.current,
          { scale: 0.2, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.1, ease: "back.out(1.2)" },
          0.4
        );
      }

      // 3. Tên Chú Rể trượt chậm rãi, thanh thoát từ trái vào
      if (groomRef.current) {
        tl.fromTo(
          groomRef.current,
          { x: -45, opacity: 0 },
          { x: 0, opacity: 1, duration: 1.5, ease: "power2.out" },
          0.6
        );
      }

      // 4. Ký tự & nở nhẹ
      if (ampersandRef.current) {
        tl.fromTo(
          ampersandRef.current,
          { scale: 0.4, opacity: 0 },
          { scale: 1, opacity: 0.85, duration: 1.2, ease: "power2.out" },
          0.8
        );
      }

      // 5. Tên Cô Dâu trượt chậm rãi, thanh thoát từ phải vào
      if (brideRef.current) {
        tl.fromTo(
          brideRef.current,
          { x: 45, opacity: 0 },
          { x: 0, opacity: 1, duration: 1.5, ease: "power2.out" },
          1.0
        );
      }

      // 6. Dải phân cách hoa văn mở rộng nhẹ nhàng
      if (dividerRef.current) {
        tl.fromTo(
          dividerRef.current,
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 1.0, ease: "power2.out" },
          1.3
        );
      }

      // 7. Ngày cưới & Tên khách mời
      const infoElements = [dateRef.current, guestRef.current].filter(Boolean);
      if (infoElements.length > 0) {
        tl.fromTo(
          infoElements,
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.1, stagger: 0.2, ease: "power2.out" },
          1.5
        );
      }

      // 8. Nút Mở thiệp xuất hiện sau cùng
      if (buttonRef.current) {
        tl.fromTo(
          buttonRef.current,
          { scale: 0.92, opacity: 0, y: 12 },
          { scale: 1, opacity: 1, y: 0, duration: 1.0, ease: "power2.out" },
          1.8
        );
      }

      // 9. Hiệu ứng đung đưa hoa góc cực chậm
      if (flowerTopRef.current) {
        gsap.to(flowerTopRef.current, {
          rotation: "+=2.5",
          duration: 5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      if (flowerBottomRef.current) {
        gsap.to(flowerBottomRef.current, {
          rotation: "+=2.5",
          duration: 5.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 0.8,
        });
      }

      // 10. Hiệu ứng bồng bềnh trên wrapper riêng biệt để không xung đột với envelopeBody
      if (floatingWrapperRef.current) {
        gsap.to(floatingWrapperRef.current, {
          y: -6,
          duration: 3.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 2.2,
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);

    try {
      confetti({
        particleCount: 110,
        spread: 85,
        origin: { y: 0.55 },
        colors: ["#A4B885", "#2E3D25", "#FAF5EE", "#e8d5c4", "#4A5D36"],
        zIndex: 10000,
      });
    } catch (e) {}

    // GSAP Cinematic Exit Timeline - Tối ưu êm ái, chuyển tiếp nhanh không đơ
    const exitTl = gsap.timeline({
      onComplete: () => {
        onOpen();
      },
    });

    if (sealRef.current) {
      exitTl.to(sealRef.current, { scale: 1.2, opacity: 0, duration: 0.2, ease: "power2.out" }, 0);
    }
    if (buttonRef.current) {
      exitTl.to(buttonRef.current, { scale: 0.9, opacity: 0, duration: 0.15 }, 0);
    }
    if (envelopeBodyRef.current) {
      exitTl.to(
        envelopeBodyRef.current,
        { scale: 1.03, y: -12, opacity: 0, duration: 0.4, ease: "power2.out" },
        0.05
      );
    }
    if (containerRef.current) {
      exitTl.to(containerRef.current, { opacity: 0, duration: 0.45, ease: "power2.out" }, 0.05);
    }
  };

  const weddingDateLabel = formatVietnameseDate(weddingDate, {
    includeWeekday: false,
    time: weddingTime,
  });

  // 12 hạt trái tim rơi được cấu hình tối ưu GPU
  const hearts = [
    { left: "6%", delay: "0s", duration: "8s", size: "18px", color: "rgba(255,255,255,0.65)" },
    { left: "15%", delay: "1.8s", duration: "9s", size: "15px", color: "#A4B885" },
    { left: "28%", delay: "3.5s", duration: "8.5s", size: "22px", color: "rgba(255,255,255,0.7)" },
    { left: "38%", delay: "0.8s", duration: "10s", size: "16px", color: "#dbe8c7" },
    { left: "50%", delay: "2.5s", duration: "7.5s", size: "14px", color: "rgba(255,255,255,0.55)" },
    { left: "62%", delay: "4.2s", duration: "9.5s", size: "19px", color: "#A4B885" },
    { left: "75%", delay: "1.2s", duration: "8.8s", size: "20px", color: "rgba(255,255,255,0.65)" },
    { left: "88%", delay: "3.0s", duration: "8.2s", size: "17px", color: "#f3d078" },
  ];

  return (
    <div
      ref={containerRef}
      className={`${isFixed ? "fixed" : "absolute"} inset-0 z-50 flex items-center justify-center overflow-hidden select-none`}
      style={{
        background: "linear-gradient(to bottom right, #2E3D25, #1E2B17, #131C0E)",
      }}
    >
      {/* Styles & Calligraphy Fonts */}
      <style>{`
        @keyframes fall-heart-smooth {
          0% {
            transform: translate3d(0, -50px, 0) scale(0.7) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.85;
          }
          90% {
            opacity: 0.85;
          }
          100% {
            transform: translate3d(0, 105vh, 0) scale(1) rotate(35deg);
            opacity: 0;
          }
        }

        .heart-particle {
          position: absolute;
          top: -20px;
          animation-name: fall-heart-smooth;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          will-change: transform, opacity;
          pointer-events: none;
          user-select: none;
        }

        .font-calligraphy {
          font-family: "Alex Brush", "Great Vibes", "MonteCarlo", "Pinyon Script", cursive;
        }
      `}</style>

      {/* Falling Hearts Background Animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {hearts.map((h, idx) => (
          <span
            key={idx}
            className="heart-particle"
            style={{
              left: h.left,
              animationDelay: h.delay,
              animationDuration: h.duration,
              fontSize: h.size,
              color: h.color,
            }}
          >
            ♥
          </span>
        ))}
      </div>

      <div className="relative z-10 w-full flex justify-center px-4">
        <div
          ref={floatingWrapperRef}
          className="relative w-full max-w-[310px] sm:max-w-[340px] md:max-w-[440px] lg:max-w-[480px] will-change-transform"
        >
          {/* Envelope Body */}
          <div
            ref={envelopeBodyRef}
            className="relative rounded-2xl w-full will-change-transform"
            style={{
              opacity: 0,
              boxShadow:
                "0 25px 60px -12px rgba(0, 0, 0, 0.7), 0 8px 24px rgba(0, 0, 0, 0.4)",
            }}
          >
            {/* Inner background & corners */}
            <div
              className="absolute inset-0 rounded-2xl overflow-hidden"
              style={{
                background: "linear-gradient(to bottom, #FAF5EE, #F4F7F0)",
                border: "1px solid rgba(164, 184, 133, 0.4)",
                clipPath: "inset(0 round 16px)",
              }}
            >
              {/* Top Right Flowers */}
              <div
                ref={flowerTopRef}
                className="absolute pointer-events-none w-[120px] sm:w-[120px] md:w-[150px] -top-[80px] -right-[25px] sm:-top-[35px] sm:-right-[20px] z-0 will-change-transform"
                style={{
                  transformOrigin: "center",
                  transform: "rotate(198deg)",
                }}
              >
                <div className="w-full h-full">
                  <img
                    src={img_26.src || (img_26 as unknown as string)}
                    alt=""
                    className="w-full h-auto object-contain opacity-95"
                  />
                </div>
              </div>

              {/* Bottom Left Flowers (img_25) */}
              <div
                ref={flowerBottomRef}
                className="absolute pointer-events-none w-[130px] sm:w-[130px] md:w-[130px] -bottom-[50px] -left-[36px] sm:-bottom-[50px] sm:-left-[36px] z-0 will-change-transform"
                style={{
                  transformOrigin: "center",
                  transform: "rotate(24deg)",
                }}
              >
                <div className="w-full h-full">
                  <img
                    src={img_25.src || (img_25 as unknown as string)}
                    alt=""
                    className="w-full h-auto object-contain opacity-95"
                  />
                </div>
              </div>
            </div>

            <div className="relative z-10 text-center px-6 pt-16 pb-12 sm:pt-20 sm:pb-14 flex flex-col items-center">
              {/* Wax Seal Badge */}
              <div
                ref={sealRef}
                className="mb-5 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105 will-change-transform cursor-pointer"
                onClick={handleOpen}
                style={{
                  opacity: 0,
                  width: "58px",
                  height: "58px",
                  background:
                    "radial-gradient(circle at 35% 35%, #4A5D36, #1E2B17)",
                  boxShadow:
                    "0 6px 18px rgba(30, 43, 23, 0.5), inset 0 0 0 2px rgba(164, 184, 133, 0.4)",
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-6 h-6 fill-white drop-shadow-xs"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>

              {/* Bay Bổng Calligraphy Names */}
              <h1 className="mb-2 flex flex-col items-center leading-tight">
                <span
                  ref={groomRef}
                  className="block w-full text-center text-[2.65rem] sm:text-5xl md:text-6xl font-calligraphy font-semibold capitalize tracking-normal py-1 will-change-transform"
                  style={{
                    opacity: 0,
                    color: textColor,
                    WebkitTextStroke: "0.2px currentColor",
                    textShadow: "0 1px 3px rgba(46, 61, 37, 0.12)",
                  }}
                >
                  {getLastTwoNames(groomName) || "Văn An"}
                </span>
                <span
                  ref={ampersandRef}
                  className="block w-full text-center text-2xl sm:text-3xl leading-none my-1 font-serif italic font-medium will-change-transform"
                  style={{
                    opacity: 0,
                    color: textColor,
                  }}
                >
                  &amp;
                </span>
                <span
                  ref={brideRef}
                  className="block w-full text-center text-[2.65rem] sm:text-5xl md:text-6xl font-calligraphy font-semibold capitalize tracking-normal py-1 will-change-transform"
                  style={{
                    opacity: 0,
                    color: textColor,
                    WebkitTextStroke: "0.2px currentColor",
                    textShadow: "0 1px 3px rgba(46, 61, 37, 0.12)",
                  }}
                >
                  {getLastTwoNames(brideName) || "Thị Bình"}
                </span>
              </h1>

              {/* Deluxe Ornamental Divider */}
              <div
                ref={dividerRef}
                className="flex items-center justify-center gap-3 my-3 w-full max-w-[170px] sm:max-w-[200px] will-change-transform"
                style={{ opacity: 0 }}
              >
                <div
                  className="flex-1 h-[1.5px]"
                  style={{
                    background:
                      "linear-gradient(to right, transparent, #A4B885, #2E3D25)",
                  }}
                ></div>
                <span className="text-sm text-[#4A5D36]">✦ ❦ ✦</span>
                <div
                  className="flex-1 h-[1.5px]"
                  style={{
                    background:
                      "linear-gradient(to left, transparent, #A4B885, #2E3D25)",
                  }}
                ></div>
              </div>

              {/* Date */}
              <div
                ref={dateRef}
                className="text-base sm:text-lg mb-4 flex flex-col items-center font-serif tracking-wide will-change-transform"
                style={{
                  opacity: 0,
                  color: textColor,
                  fontFamily: '"Playfair Display", "Lora", serif',
                }}
              >
                <span>{weddingDateLabel || "3 tháng 1, 2026"}</span>
              </div>

              {/* Guest Name */}
              <div
                ref={guestRef}
                className="mb-6 flex items-center justify-center gap-2 will-change-transform"
                style={{ opacity: 0 }}
              >
                <span
                  className="text-base sm:text-lg font-medium tracking-wide"
                  style={{
                    color: textColor,
                    fontFamily: '"Playfair Display", "Lora", serif',
                  }}
                >
                  {guestName ? `Thân Mời: ${guestName}` : "Thân Mời"}
                </span>
              </div>

              {/* Open Button */}
              <button
                ref={buttonRef}
                onClick={handleOpen}
                className="relative px-9 py-2.5 text-base sm:text-lg font-bold rounded-full flex items-center justify-center overflow-hidden transition-transform hover:scale-105 active:scale-95 cursor-pointer border border-[#A4B885]/50 will-change-transform"
                style={{
                  opacity: 0,
                  background: "linear-gradient(135deg, #2E3D25, #1E2B17)",
                  color: "#ffffff",
                  boxShadow:
                    "0 6px 20px rgba(30, 43, 23, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.2)",
                  fontFamily: '"Playfair Display", "Lora", serif',
                }}
              >
                <span>Mở thiệp</span>
                <div
                  className="absolute top-0 h-full w-8 pointer-events-none animate-shine"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)",
                  }}
                ></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


