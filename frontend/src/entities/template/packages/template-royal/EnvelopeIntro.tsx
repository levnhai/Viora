import { useState, useEffect } from "react";
import Image from "next/image";
import envelopeImg from "@/shared/assets/image/envelope/img_3.png";

interface EnvelopeIntroProps {
  guestName?: string;
  groomName: string;
  brideName: string;
  onOpen: () => void;
  isFixed?: boolean;
}

const formatName = (name: string) => {
  if (!name) return "";
  return name
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export function EnvelopeIntro({
  guestName,
  groomName,
  brideName,
  onOpen,
  isFixed = true,
}: EnvelopeIntroProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isMerged, setIsMerged] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Hiệu ứng loading 1.5 giây
    return () => clearTimeout(timer);
  }, []);

  const displayGroom = formatName(groomName || "Văn Hiếu");
  const displayBride = formatName(brideName || "Cẩm Tú");

  const handleOpen = () => {
    setIsOpen(true);
    // Đợi hiệu ứng đóng gói và trượt mờ hoàn tất
    setTimeout(() => {
      setIsMerged(true);
      onOpen();
    }, 1000);
  };

  if (isMerged) return null;

  return (
    <div
      className={`${
        isFixed ? "fixed" : "absolute"
      } inset-0 z-[1000] flex flex-col items-center justify-center bg-[#f4f2eb] transition-all duration-1000 select-none overflow-hidden`}
    >
      {/* Dynamic Font and Custom Animation Styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Great+Vibes&family=Montserrat:wght@200;400;600&display=swap');
        
        .royal-loader-ring {
          display: inline-block;
          position: relative;
          width: 80px;
          height: 80px;
        }
        .royal-loader-ring div {
          box-sizing: border-box;
          display: block;
          position: absolute;
          width: 64px;
          height: 64px;
          margin: 8px;
          border: 2px solid #b38728;
          border-radius: 50%;
          animation: royal-ring-spin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
          border-color: #b38728 transparent transparent transparent;
        }
        .royal-loader-ring div:nth-child(1) {
          animation-delay: -0.45s;
        }
        .royal-loader-ring div:nth-child(2) {
          animation-delay: -0.3s;
        }
        .royal-loader-ring div:nth-child(3) {
          animation-delay: -0.15s;
        }
        @keyframes royal-ring-spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        /* Subtle float for envelope */
        @keyframes floatUpDown {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .envelope-float {
          animation: floatUpDown 4s ease-in-out infinite;
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-120px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(120px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes fadeInAmp {
          from {
            opacity: 0;
            transform: scale(0.3);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-slide-left {
          animation: slideInLeft 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
        .animate-slide-right {
          animation: slideInRight 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
        .animate-fade-amp {
          animation: fadeInAmp 1.0s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards;
          opacity: 0;
        }
      `}} />

      {/* ── SCREEN HIỂN THỊ LOADING ── */}
      {isLoading ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#f4f2eb] z-[1010] animate-[fadeIn_0.5s_ease-out]">
          <div className="royal-loader-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <p 
            style={{ fontFamily: "'Cinzel', serif" }}
            className="text-[10px] tracking-[0.3em] text-[#b38728] mt-6 uppercase animate-pulse"
          >
            Đang tải thiệp cưới...
          </p>
        </div>
      ) : (
        /* ── MÀN HÌNH PHONG BÌ CŨ (GIỮ NGUYÊN BỐ CỤC) ── */
        <div
          onClick={!isOpen ? handleOpen : undefined}
          className={`w-full h-full flex flex-col items-center justify-center cursor-pointer transition-all duration-1000 ${
            isOpen
              ? "opacity-0 pointer-events-none scale-95"
              : "opacity-100 scale-100 animate-[fadeIn_0.8s_ease-out]"
          }`}
        >
          {/* ── TÊN CÔ DÂU & CHÚ RỂ PHÍA TRÊN PHONG BÌ ── */}
          {!isOpen && (
            <div className="text-center mb-6 select-none transition-all overflow-hidden py-2">
              <h2
                style={{
                  fontFamily: "'Great Vibes', cursive",
                  fontSize: "calc(2.2rem + 1vw)",
                  color: "#b38728",
                  textShadow: "1px 1px 3px rgba(0, 0, 0, 0.05)",
                }}
                className="leading-tight px-4 flex items-center justify-center gap-x-3 sm:gap-x-4 flex-wrap"
              >
                <span className="animate-slide-left inline-block">{displayGroom}</span>
                <span className="animate-fade-amp inline-block text-[0.85em]">&</span>
                <span className="animate-slide-right inline-block">{displayBride}</span>
              </h2>
            </div>
          )}

          {/* ── CHỈ RENDER PHONG BÌ Ở GIỮA MÀN HÌNH ── */}
          <div
            className={`relative w-[100%] max-w-[600px] aspect-[1.4] transition-all duration-1000 envelope-float ${
              isOpen ? "scale-90 rotate-2 translate-y-12 opacity-0" : "scale-100"
            }`}
          >
            <div className="w-full h-full relative rounded-xl overflow-hidden border border-stone-200/20">
              <Image
                src={envelopeImg}
                alt="Wedding Envelope"
                placeholder="blur"
                fill
                sizes="(max-w-md) 100vw, 550px"
                priority
                className="object-cover pointer-events-none select-none"
              />
            </div>
          </div>

          {/* Dòng chữ kiểu bay bổng nằm ngay dưới phong bì */}
          {!isOpen && (
            <div className="text-center mt-8 select-none transition-all">
              <p
                style={{
                  fontFamily: "'Great Vibes', cursive",
                  fontSize: "1.5rem",
                  color: "#b38728",
                }}
                className="animate-pulse"
              >
                Chạm để mở
              </p>
              {guestName && (
                <p 
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                  className="text-[9px] uppercase tracking-[0.25em] text-[#7a5c4f] mt-3 font-semibold"
                >
                  Thân mời: <span className="font-bold text-[#2c1810] tracking-normal">{guestName}</span>
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
