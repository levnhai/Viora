import React, { useState } from "react";
import bgImg1 from "@/shared/assets/image/hy/img_2.webp";
import bgImg2 from "@/shared/assets/image/hy/img_3.webp";
import sealImg from "@/shared/assets/image/seal/img_3.svg";

interface FloralEnvelopeProps {
  guestName?: string;
  groomName: string;
  brideName: string;
  weddingDate: string;
  weddingTime?: string;
  onOpen: () => void;
  isFixed?: boolean;
}

export function FloralEnvelope({
  guestName,
  groomName,
  brideName,
  weddingDate,
  weddingTime,
  onOpen,
  isFixed = true,
}: FloralEnvelopeProps) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);
    setTimeout(() => {
      onOpen();
    }, 800);
  };

  return (
    <div
      onClick={handleOpen}
      className={`${
        isFixed ? "fixed" : "absolute"
      } inset-0 z-50 flex w-full h-full overflow-hidden bg-transparent cursor-pointer ${
        isOpening ? "pointer-events-none" : ""
      }`}
    >
      <style>{`
        @keyframes expand-left {
          0% {
            transform: scaleX(0);
            opacity: 0;
          }
          100% {
            transform: scaleX(1);
            opacity: 1;
          }
        }
        @keyframes expand-right {
          0% {
            transform: scaleX(0);
            opacity: 0;
          }
          100% {
            transform: scaleX(1);
            opacity: 1;
          }
        }
        .animate-expand-left {
          animation: expand-left 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          transform-origin: right center;
        }
        .animate-expand-right {
          animation: expand-right 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          transform-origin: left center;
        }
      `}</style>

      {/* Left Div - 70% Ratio */}
      <div
        className={`w-[70%] h-full animate-expand-left relative flex flex-col items-center justify-center p-6 md:p-12 border-r border-[#d4af37]/40 shadow-[10px_0_30px_rgba(0,0,0,0.5)] overflow-hidden transition-transform duration-800 ease-in-out ${
          isOpening ? "-translate-x-full" : "translate-x-0"
        }`}
        style={{
          background:
            "linear-gradient(135deg, #710001 0%, #5a0001 50%, #3e0001 100%)",
        }}
      >
        {/* Background Overlay Motifs */}
        <img
          src={bgImg1.src}
          alt=""
          className="absolute top-[-10%] left-[-10%] w-[350px] md:w-[500px] opacity-15 mix-blend-screen pointer-events-none"
        />
        <img
          src={bgImg2.src}
          alt=""
          className="absolute bottom-[-10%] right-[-10%] w-[350px] md:w-[500px] opacity-15 mix-blend-screen pointer-events-none"
        />
      </div>

      {/* Right Div - 30% Ratio */}
      <div
        className={`w-[30%] h-full animate-expand-right relative flex flex-col items-center justify-center p-4 border-l border-[#d4af37]/20 shadow-inner overflow-hidden transition-transform duration-800 ease-in-out ${
          isOpening ? "translate-x-full" : "translate-x-0"
        }`}
        style={{
          background:
            "linear-gradient(135deg, #5a0001 0%, #450001 50%, #2a0001 100%)",
        }}
      >
        {/* Background Overlay */}
        <img
          src={bgImg2.src}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-screen pointer-events-none"
        />
      </div>

      {/* Wax Seal on the seam line between the 2 divs */}
      <div
        className={`absolute -translate-x-1/2 z-30 transition-all duration-800 cubic-bezier(0.4, 0, 0.2, 1) pointer-events-none w-[200px] sm:w-[380px] md:w-[480px] ${
          isOpening
            ? "top-0 -translate-y-full opacity-0 scale-90"
            : "top-1/2 -translate-y-1/2 opacity-100 scale-100"
        }`}
        style={{ left: "70%" }}
      >
        <img
          src={sealImg.src || sealImg}
          alt="Wax Seal"
          className="w-full h-auto object-contain drop-shadow-[0_15px_35px_rgba(0,0,0,0.8)]"
        />
      </div>
    </div>
  );
}
