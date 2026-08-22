import { useState } from "react";
import { formatVietnameseDate } from "@/shared/lib/utils/date";
import { getLastTwoNames } from "@/shared/lib/utils/string";
import img_15 from "@/shared/assets/image/flower/img_15.webp";
import confetti from "canvas-confetti";

interface Envelope_6Props {
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

export function Envelope_6({
  guestName,
  groomName,
  brideName,
  weddingDate,
  weddingTime,
  onOpen,
  isFixed = true,
  textColor = "#540c14",
}: Envelope_6Props) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);

    try {
      confetti({
        particleCount: 110,
        spread: 85,
        origin: { y: 0.55 },
        colors: ["#540c14", "#c5a059", "#FAF5EE", "#e8d5c4", "#8c1d28"],
        zIndex: 10000,
      });
    } catch (e) {}

    setTimeout(() => {
      onOpen();
    }, 750);
  };

  const weddingDateLabel = formatVietnameseDate(weddingDate, {
    includeWeekday: false,
    time: weddingTime,
  });

  return (
    <div
      className={`${isFixed ? "fixed" : "absolute"} inset-0 z-50 flex items-center justify-center overflow-hidden transition-all duration-700 ease-out ${
        isOpening
          ? "opacity-0 scale-105 pointer-events-none"
          : "opacity-100 scale-100"
      }`}
      style={{
        background:
          "linear-gradient(to bottom right, #540c14, #3d070c, #260306)",
      }}
    >
      {/* Styles & Calligraphy Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Alex+Brush&family=Great+Vibes&family=MonteCarlo&family=Playfair+Display:ital,wght@0,500;0,600;1,400&family=Pinyon+Script&display=swap');

        @keyframes fall-pause-heart-1 {
          0% {
            transform: translateY(-10vh) rotate(0deg) scale(0.6);
            opacity: 0;
          }
          15% {
            opacity: 0.7;
          }
          42% {
            transform: translateY(50vh) rotate(15deg) scale(1);
            opacity: 0.95;
          }
          52% {
            transform: translateY(50vh) rotate(15deg) scale(1);
            opacity: 0.95;
          }
          100% {
            transform: translateY(115vh) rotate(35deg) scale(1.1);
            opacity: 0;
          }
        }

        @keyframes fall-pause-heart-2 {
          0% {
            transform: translateY(-10vh) rotate(0deg) scale(0.7);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          38% {
            transform: translateY(35vh) rotate(-20deg) scale(1.1);
            opacity: 0.95;
          }
          48% {
            transform: translateY(35vh) rotate(-20deg) scale(1.1);
            opacity: 0.95;
          }
          100% {
            transform: translateY(115vh) rotate(-40deg) scale(0.8);
            opacity: 0;
          }
        }

        @keyframes fall-pause-heart-3 {
          0% {
            transform: translateY(-10vh) rotate(0deg) scale(0.5);
            opacity: 0;
          }
          20% {
            opacity: 0.6;
          }
          45% {
            transform: translateY(65vh) rotate(10deg) scale(0.9);
            opacity: 0.9;
          }
          55% {
            transform: translateY(65vh) rotate(10deg) scale(0.9);
            opacity: 0.9;
          }
          100% {
            transform: translateY(115vh) rotate(25deg) scale(1.2);
            opacity: 0;
          }
        }

        @keyframes sway-slow {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(4deg); }
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(15px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fall-heart-1 { animation: fall-pause-heart-1 10s ease-in-out infinite; }
        .animate-fall-heart-2 { animation: fall-pause-heart-2 11s ease-in-out 2.5s infinite; }
        .animate-fall-heart-3 { animation: fall-pause-heart-1 9.5s ease-in-out 5s infinite; }
        .animate-fall-heart-4 { animation: fall-pause-heart-2 10.5s ease-in-out 1.2s infinite; }
        .animate-fall-heart-5 { animation: fall-pause-heart-1 12s ease-in-out 4s infinite; }
        .animate-fall-heart-6 { animation: fall-pause-heart-2 11.5s ease-in-out 7s infinite; }
        .animate-fall-heart-7 { animation: fall-pause-heart-1 10.8s ease-in-out 3.2s infinite; }
        .animate-fall-heart-8 { animation: fall-pause-heart-2 9.8s ease-in-out 6.1s infinite; }

        .animate-sway-slow { animation: sway-slow 7s ease-in-out infinite; }
        .animate-fade-in-up {
          animation: fade-in-up 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          opacity: 0;
        }
        .font-calligraphy {
          font-family: "Alex Brush", "Great Vibes", "MonteCarlo", "Pinyon Script", cursive;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-600 { animation-delay: 0.6s; }
      `}</style>

      {/* Falling Hearts Background Animation (Gold, White & Red - Pauses 1s in Middle) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* White Hearts */}
        <span className="absolute top-0 left-[6%] text-white/60 text-xl animate-fall-heart-1">
          ♥
        </span>
        <span className="absolute top-0 left-[28%] text-white/70 text-2xl animate-fall-heart-3">
          ♥
        </span>
        <span className="absolute top-0 left-[50%] text-white/50 text-base animate-fall-heart-7">
          ♥
        </span>
        <span className="absolute top-0 left-[76%] text-white/65 text-xl animate-fall-heart-5">
          ♥
        </span>

        {/* Gold Hearts */}
        <span className="absolute top-0 left-[15%] text-amber-300/75 text-lg animate-fall-heart-2">
          ♥
        </span>
        <span className="absolute top-0 left-[42%] text-[#f3d078]/80 text-2xl animate-fall-heart-4">
          ♥
        </span>
        <span className="absolute top-0 left-[64%] text-amber-400/70 text-sm animate-fall-heart-8">
          ♥
        </span>
        <span className="absolute top-0 left-[90%] text-amber-300/75 text-xl animate-fall-heart-6">
          ♥
        </span>

        {/* Red / Crimson Accent Hearts */}
        <span className="absolute top-0 left-[10%] text-red-700/40 text-sm animate-fall-heart-8">
          ♥
        </span>
        <span className="absolute top-0 left-[35%] text-rose-800/35 text-xl animate-fall-heart-1">
          ♥
        </span>
        <span className="absolute top-0 left-[58%] text-red-800/40 text-lg animate-fall-heart-3">
          ♥
        </span>
        <span className="absolute top-0 left-[82%] text-rose-700/35 text-2xl animate-fall-heart-2">
          ♥
        </span>
      </div>

      <div className="relative z-10 w-full flex justify-center px-4">
        <div className="relative w-full max-w-[310px] sm:max-w-[340px] md:max-w-[440px] lg:max-w-[480px]">
          {/* Envelope Body */}
          <div
            className="relative rounded-2xl w-full"
            style={{
              boxShadow:
                "0 25px 60px -12px rgba(0, 0, 0, 0.7), 0 8px 24px rgba(0, 0, 0, 0.4)",
            }}
          >
            {/* Inner background & corners */}
            <div
              className="absolute inset-0 rounded-2xl overflow-hidden"
              style={{
                background: "linear-gradient(to bottom, #FAF5EE, #F6EDE3)",
                border: "1px solid rgba(197, 160, 89, 0.3)",
                clipPath: "inset(0 round 16px)",
              }}
            >
              {/* Top Right Flowers (img_15) */}
              <div
                className="absolute pointer-events-none w-[125px] sm:w-[140px] md:w-[150px] -top-[45px] -right-[25px] sm:-top-[35px] sm:-right-[20px] z-0"
                style={{
                  transformOrigin: "center",
                  transform: "rotate(198deg)",
                }}
              >
                <div className="w-full h-full animate-sway-slow">
                  <img
                    src={img_15.src || (img_15 as unknown as string)}
                    alt=""
                    className="w-full h-auto object-contain opacity-95"
                  />
                </div>
              </div>

              {/* Bottom Left Flowers (img_15) */}
              <div
                className="absolute pointer-events-none w-[125px] sm:w-[140px] md:w-[150px] -bottom-[45px] -left-[22px] sm:-bottom-[35px] sm:-left-[20px] z-0"
                style={{
                  transformOrigin: "center",
                  transform: "rotate(24deg)",
                }}
              >
                <div className="w-full h-full animate-sway-slow">
                  <img
                    src={img_15.src || (img_15 as unknown as string)}
                    alt=""
                    className="w-full h-auto object-contain opacity-95"
                  />
                </div>
              </div>
            </div>

            <div className="relative z-10 text-center px-6 pt-16 pb-12 sm:pt-20 sm:pb-14 flex flex-col items-center">
              {/* Wax Seal Badge */}
              <div
                className="mb-5 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105"
                style={{
                  width: "58px",
                  height: "58px",
                  background:
                    "radial-gradient(circle at 35% 35%, #6e1620, #38080d)",
                  boxShadow:
                    "0 6px 18px rgba(56, 8, 13, 0.5), inset 0 0 0 2px rgba(197, 160, 89, 0.4)",
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
                  className="block w-full text-center text-[2.65rem] sm:text-5xl md:text-6xl font-calligraphy font-semibold capitalize tracking-normal py-1 animate-title-fade"
                  style={{
                    color: textColor,
                    WebkitTextStroke: "0.2px currentColor",
                    textShadow: "0 1px 3px rgba(78, 11, 18, 0.2)",
                  }}
                >
                  {getLastTwoNames(groomName) || "Hoàng Long"}
                </span>
                <span
                  className="block w-full text-center text-2xl sm:text-3xl leading-none my-1 font-serif italic font-medium"
                  style={{
                    color: textColor,
                  }}
                >
                  &amp;
                </span>
                <span
                  className="block w-full text-center text-[2.65rem] sm:text-5xl md:text-6xl font-calligraphy font-semibold capitalize tracking-normal py-1 animate-title-fade"
                  style={{
                    color: textColor,
                    WebkitTextStroke: "0.2px currentColor",
                    textShadow: "0 1px 3px rgba(78, 11, 18, 0.2)",
                  }}
                >
                  {getLastTwoNames(brideName) || "Bảo Ngọc"}
                </span>
              </h1>

              {/* Deluxe Ornamental Divider */}
              <div className="flex items-center justify-center gap-3 my-3 w-full max-w-[170px] sm:max-w-[200px] animate-fade-in-up delay-400">
                <div
                  className="flex-1 h-[1.5px]"
                  style={{
                    background:
                      "linear-gradient(to right, transparent, #c5a059, #540c14)",
                  }}
                ></div>
                <span className="text-sm text-[#b8860b]">✦ ❦ ✦</span>
                <div
                  className="flex-1 h-[1.5px]"
                  style={{
                    background:
                      "linear-gradient(to left, transparent, #c5a059, #540c14)",
                  }}
                ></div>
              </div>

              {/* Date */}
              <div
                className="text-base sm:text-lg mb-4 flex flex-col items-center animate-fade-in-up delay-500 font-serif tracking-wide"
                style={{
                  color: textColor,
                  fontFamily: '"Playfair Display", "Lora", serif',
                }}
              >
                <span>{weddingDateLabel || "3 tháng 1, 2026"}</span>
              </div>

              {/* Guest Name */}
              <div className="mb-6 flex items-center justify-center gap-2 animate-fade-in-up delay-500">
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
                onClick={handleOpen}
                className="relative px-9 py-2.5 text-base sm:text-lg font-bold rounded-full flex items-center justify-center overflow-hidden transition-transform hover:scale-105 active:scale-95 animate-fade-in-up delay-600 cursor-pointer border border-[#c5a059]/40"
                style={{
                  background: "linear-gradient(135deg, #540c14, #38080d)",
                  color: "#ffffff",
                  boxShadow:
                    "0 6px 20px rgba(56, 8, 13, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.2)",
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
