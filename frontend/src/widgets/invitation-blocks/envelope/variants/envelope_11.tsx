"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

interface Envelope_11Props {
  guestName?: string;
  groomName: string;
  brideName: string;
  weddingDate?: string;
  weddingTime?: string;
  onOpen: () => void;
  isFixed?: boolean;
  coverImage?: string;
}

export function Envelope_11({
  onOpen,
  isFixed = true,
}: Envelope_11Props) {
  const [isOpening, setIsOpening] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const leftDoorRef = useRef<HTMLDivElement>(null);
  const rightDoorRef = useRef<HTMLDivElement>(null);
  const ribbonRef = useRef<HTMLDivElement>(null);
  const sealRef = useRef<HTMLDivElement>(null);

  const startOpenAnimation = () => {
    if (isOpening) return;
    setIsOpening(true);

    const tl = gsap.timeline({
      onComplete: () => {
        onOpen();
      },
    });

    // 1. Con dấu sáp & ruy băng mờ và thu nhẹ
    if (sealRef.current) {
      tl.to(
        sealRef.current,
        {
          scale: 1.15,
          opacity: 0,
          duration: 0.45,
          ease: "power2.out",
        },
        0.1
      );
    }

    if (ribbonRef.current) {
      tl.to(
        ribbonRef.current,
        {
          opacity: 0,
          scaleY: 0.85,
          duration: 0.45,
          ease: "power2.out",
        },
        0.1
      );
    }

    // 2. Hai cánh cửa trượt từ từ sang 2 bên (smooth, cinematic)
    if (leftDoorRef.current) {
      tl.to(
        leftDoorRef.current,
        {
          xPercent: -105,
          duration: 1.8,
          ease: "power2.inOut",
        },
        0.3
      );
    }

    if (rightDoorRef.current) {
      tl.to(
        rightDoorRef.current,
        {
          xPercent: 105,
          duration: 1.8,
          ease: "power2.inOut",
        },
        0.3
      );
    }

    // 3. Khung mờ hoàn toàn để hiển thị mẫu thiệp bên dưới
    if (containerRef.current) {
      tl.to(
        containerRef.current,
        {
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        1.5
      );
    }
  };

  // Tự động kích hoạt mở cánh cửa khi vừa truy cập trang
  useEffect(() => {
    const timer = setTimeout(() => {
      startOpenAnimation();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`${
        isFixed ? "fixed" : "absolute"
      } inset-0 z-[100] flex items-center justify-center select-none bg-black/80 backdrop-blur-sm overflow-hidden pointer-events-none`}
    >
      <style>{`
        /* Vân gân sọc ngang chuẩn màu olive */
        .olive-ribbed-texture {
          background-color: #658147;
          background-image: repeating-linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.08) 0px,
            rgba(0, 0, 0, 0.08) 1.5px,
            transparent 1.5px,
            transparent 3px
          );
        }

        /* Hình dạng con dấu sáp lượn sóng tự nhiên */
        .wax-seal-scallop {
          background: radial-gradient(circle at 35% 35%, #FBF6E9 0%, #E8DEC7 60%, #D5C7A8 100%);
          box-shadow: 
            0 10px 30px rgba(0, 0, 0, 0.4),
            0 2px 6px rgba(0, 0, 0, 0.2),
            inset 0 2px 4px rgba(255, 255, 255, 0.8),
            inset 0 -2px 4px rgba(160, 140, 100, 0.4);
          clip-path: polygon(
            50% 0%, 62% 4%, 73% 2%, 82% 9%, 91% 18%, 98% 27%, 98% 38%, 100% 50%, 
            98% 62%, 98% 73%, 91% 82%, 82% 91%, 73% 98%, 62% 96%, 50% 100%, 
            38% 96%, 27% 98%, 18% 91%, 9% 82%, 2% 73%, 2% 62%, 0% 50%, 
            2% 38%, 2% 27%, 9% 18%, 18% 9%, 27% 2%, 38% 4%
          );
        }
      `}</style>

      {/* Main Container - Full Mobile Viewport, khép kín hoàn toàn */}
      <div className="relative w-full max-w-[430px] h-full sm:h-[844px] bg-[#658147] sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* BODY: 2 CÁNH CỬA KHÉP KÍN 50% / 50% */}
        <div className="relative w-full h-full overflow-hidden flex">
          {/* CÁNH CỬA TRÁI (LEFT DOOR - 50%) */}
          <div
            ref={leftDoorRef}
            className="absolute top-0 bottom-0 left-0 w-1/2 z-10 olive-ribbed-texture origin-left border-r border-black/15 shadow-[2px_0_10px_rgba(0,0,0,0.25)]"
          />

          {/* CÁNH CỬA PHẢI (RIGHT DOOR - 50%) */}
          <div
            ref={rightDoorRef}
            className="absolute top-0 bottom-0 right-0 w-1/2 z-10 olive-ribbed-texture origin-right border-l border-white/10 shadow-[-2px_0_10px_rgba(0,0,0,0.25)]"
          />

          {/* DẢI RUY BĂNG TRẮNG CHẠY DỌC CHÍNH GIỮA */}
          <div
            ref={ribbonRef}
            className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-6 sm:w-7 bg-white z-20 shadow-[0_0_10px_rgba(0,0,0,0.15)] flex items-center justify-center pointer-events-none"
          >
            {/* Đường chỉ may tinh tế 2 mép ruy băng */}
            <div className="absolute inset-y-0 left-0.5 w-[1px] border-l border-dashed border-gray-300 opacity-60" />
            <div className="absolute inset-y-0 right-0.5 w-[1px] border-r border-dashed border-gray-300 opacity-60" />
          </div>

          {/* CON DẤU SÁP KEM (CREAM WAX SEAL) ĐÈ CHÍNH GIỮA */}
          <div
            ref={sealRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex items-center justify-center pointer-events-none"
          >
            {/* Con dấu sáp hoa văn lượn sóng */}
            <div className="relative w-22 h-22 sm:w-26 sm:h-26 wax-seal-scallop flex items-center justify-center">
              {/* Viền tròn chìm bên trong con dấu */}
              <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full border-2 border-[#D5C7A8]/75 shadow-inner flex items-center justify-center bg-gradient-to-br from-[#FAF5EA] to-[#E2D6B8]">
                <div className="text-center font-serif text-[#8A795D] font-bold text-xs sm:text-sm tracking-wider opacity-85 select-none">
                  WEDDING
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
