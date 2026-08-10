import { useState } from "react";
import confetti from "canvas-confetti";
import { formatVietnameseDate } from "@/shared/lib/utils/date";
import bgWood from "@/shared/assets/image/wood/img_1.png";
import bannerWood from "@/shared/assets/image/wood/img_6.svg";

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
    typeof bannerWood === "string"
      ? bannerWood
      : (bannerWood as any)?.src || bannerWood;

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

        @keyframes drop-down-banner {
          0% {
            transform: translateY(-130%);
            opacity: 0;
          }
          65% {
            transform: translateY(8%);
            opacity: 1;
          }
          85% {
            transform: translateY(-3%);
          }
          100% {
            transform: translateY(0%);
            opacity: 1;
          }
        }

        @keyframes drop-down-text {
          0% {
            transform: translate(-50%, -200px) rotate(-42.8deg);
            opacity: 0;
          }
          65% {
            transform: translate(-50%, -45%) rotate(-42.8deg);
            opacity: 1;
          }
          85% {
            transform: translate(-50%, -53%) rotate(-42.8deg);
          }
          100% {
            transform: translate(-50%, -50%) rotate(-42.8deg);
            opacity: 1;
          }
        }

        .animate-drop-down-banner {
          animation: drop-down-banner 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .animate-drop-down-text {
          opacity: 0;
          animation: drop-down-text 1.2s cubic-bezier(0.22, 1, 0.36, 1) 2s forwards;
        }
      `}</style>

      {/* Khung phong bì: Trên desktop width chiếm 1/3 màn hình (w-full md:w-1/3) */}
      <div className="relative w-full md:w-1/3 h-full overflow-hidden bg-stone-900 shadow-2xl">
        {/* THẺ DIV 1: CÁNH TRÁI - TỶ LỆ 70% (7/3) */}
        <div
          className={`absolute top-0 bottom-0 left-0 w-[70%] z-20 overflow-hidden shadow-[5px_0_15px_rgba(0,0,0,0.5)] transition-transform duration-1000 ease-[cubic-bezier(0.77,0,0.175,1)] ${
            isOpening ? "-translate-x-[105%]" : "translate-x-0"
          }`}
        >
          {/* Background Wood image cánh trái */}
          <div
            className="absolute inset-0 bg-cover bg-left bg-no-repeat"
            style={{ backgroundImage: `url(${woodImgSrc})` }}
          />

          {/* BANNER WOOD IMG_6.SVG NẰM Ở GÓC TOP-LEFT */}
          <div className="absolute top-[-14%] sm:top-[-12%] left-[-16%] sm:left-[-18%] w-[100%] sm:w-[100%] max-w-[450px] sm:max-w-[550px] animate-drop-down-banner z-30 drop-shadow-2xl">
            <div className="relative w-full">
              {/* Hình ảnh svg img_6 */}
              <img
                src={bannerImgSrc}
                alt="Save The Date Banner"
                className="w-full h-auto object-contain"
              />

              {/* Nội dung "Save the Date" chữ nghệ thuật chạy từ trên xuống sau 2s */}
              <div
                className="absolute pointer-events-none z-10 flex items-center justify-center animate-drop-down-text"
                style={{
                  top: "56.5%",
                  left: "55%",
                }}
              >
                <h2
                  className="text-3xl sm:text-4xl md:text-5xl text-amber-50 font-medium tracking-wider drop-shadow-[0_4px_8px_rgba(0,0,0,0.95)] select-none whitespace-nowrap"
                  style={{
                    fontFamily: "'Great Vibes', 'Alex Brush', cursive",
                  }}
                >
                  Save the Date
                </h2>
              </div>
            </div>
          </div>

          {/* KHU VỰC CHÍNH GIỮA: TÊN CÔ DÂU & CHÚ RỂ, KÍNH MỜI, NGÀY THÁNG */}
          <div className="absolute inset-0 flex flex-col justify-between items-center pointer-events-none z-30 p-6 pt-28 sm:pt-36 pb-8 text-center">
            {/* KHỐI NỘI DUNG TRUNG TÂM */}
            <div className="my-auto flex flex-col items-center gap-3 sm:gap-4 max-w-lg w-full pointer-events-auto">
              {/* TRÂN TRỌNG KÍNH MỜI CÙNG 2 ĐƯỜNG KẺ VÀNG KIM TẠO ĐIỂM NHẤN */}
              <div className="flex items-center gap-3 w-full justify-center opacity-95">
                <div className="h-[1.5px] w-10 sm:w-16 bg-gradient-to-r from-transparent to-amber-300/80" />
                <span className="text-xs sm:text-sm uppercase tracking-[0.35em] text-amber-300 font-serif font-medium whitespace-nowrap drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  Trân trọng kính mời
                </span>
                <div className="h-[1.5px] w-10 sm:w-16 bg-gradient-to-l from-transparent to-amber-300/80" />
              </div>

              {/* THẺ KÍNH MỜI KHÁCH HÀNG */}
              {guestName && (
                <div className="my-1 px-5 py-2 rounded-xl bg-black/50 backdrop-blur-md border border-amber-400/40 shadow-2xl">
                  <span className="text-xs text-amber-300/85 uppercase tracking-widest mr-2">
                    Kính mời:
                  </span>
                  <span className="text-base sm:text-lg font-serif text-amber-100 font-medium">
                    {guestName}
                  </span>
                </div>
              )}

              {/* TÊN CHÚ RỂ & CÔ DÂU (CÂN ĐỐI, TO VÀ NỔI BẬT HƠN) */}
              <div className="flex flex-col items-center my-2 sm:my-3">
                <h1
                  className="text-4xl sm:text-5xl md:text-6xl text-amber-100 font-normal leading-tight tracking-wide drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)]"
                  style={{ fontFamily: "'Great Vibes', cursive" }}
                >
                  {groomName || "Văn An"}
                </h1>

                <span
                  className="text-2xl sm:text-3xl md:text-4xl text-amber-300 my-1 font-light italic drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]"
                  style={{ fontFamily: "'Great Vibes', cursive" }}
                >
                  &
                </span>

                <h1
                  className="text-4xl sm:text-5xl md:text-6xl text-amber-100 font-normal leading-tight tracking-wide drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)]"
                  style={{ fontFamily: "'Great Vibes', cursive" }}
                >
                  {brideName || "Thị Bình"}
                </h1>
              </div>

              {/* NGÀY THÁNG CƯỚI (ĐƯỢC TRANG TRÍ ĐẸP MẮT) */}
              {weddingDateLabel && (
                <div className="mt-2 flex flex-col items-center gap-2">
                  <div className="h-[1.5px] w-28 sm:w-40 bg-gradient-to-r from-transparent via-amber-400/70 to-transparent" />
                  <span className="text-xs sm:text-sm md:text-base font-serif italic text-amber-200 tracking-widest uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    {weddingDateLabel}
                  </span>
                </div>
              )}
            </div>

            {/* HƯỚNG DẪN MỞ THIỆP PHÍA DƯỚI */}
            <div className="flex items-center gap-2.5 text-amber-200/80 text-xs sm:text-sm font-light tracking-wider drop-shadow-md">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
              <span>Chạm vào màn hình để mở thiệp</span>
            </div>
          </div>
        </div>

        {/* THẺ DIV 2: CÁNH PHẢI - TỶ LỆ 30% (7/3) */}
        <div
          className={`absolute top-0 bottom-0 left-[70%] w-[30%] z-20 overflow-hidden shadow-[-5px_0_15px_rgba(0,0,0,0.5)] transition-transform duration-1000 ease-[cubic-bezier(0.77,0,0.175,1)] ${
            isOpening ? "translate-x-[105%]" : "translate-x-0"
          }`}
        >
          {/* Background Wood image cánh phải */}
          <div
            className="absolute inset-0 bg-cover bg-right bg-no-repeat"
            style={{ backgroundImage: `url(${woodImgSrc})` }}
          />
        </div>

        {/* ĐƯỜNG KHỚP NỐI GIỮA 2 CÁNH TẠI TỶ LỆ 70% */}
        {!isOpening && (
          <div
            className="absolute top-0 bottom-0 left-[70%] w-px z-30 pointer-events-none bg-black/40 shadow-[0_0_4px_rgba(0,0,0,0.6)]"
            style={{ transform: "translateX(-50%)" }}
          />
        )}
      </div>
    </div>
  );
}
