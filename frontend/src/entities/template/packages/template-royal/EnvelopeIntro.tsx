import { useState } from "react";
import Image from "next/image";
import envelopeImg from "@/shared/assets/image/envelope/img_3.png";

interface EnvelopeIntroProps {
  guestName?: string;
  groomName: string;
  brideName: string;
  onOpen: () => void;
  isFixed?: boolean;
}

export function EnvelopeIntro({ onOpen, isFixed = true }: EnvelopeIntroProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMerged, setIsMerged] = useState(false);

  const groomName = "văn hiếu";
  const brideName = "cẩm tú";

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
      onClick={!isOpen ? handleOpen : undefined}
      className={`${
        isFixed ? "fixed" : "absolute"
      } inset-0 z-[1000] flex flex-col items-center justify-center bg-[#f4f2eb] transition-all duration-1000 cursor-pointer ${
        isOpen
          ? "opacity-0 pointer-events-none scale-95"
          : "opacity-100 scale-100"
      }`}
    >
      {/* ── TÊN CÔ DÂU & CHÚ RỂ PHÍA TRÊN PHONG BÌ ── */}
      {!isOpen && (
        <div className="text-center mb-6 select-none transition-all">
          <h2
            style={{
              fontFamily: "'Great Vibes', cursive",
              fontSize: "2.6rem",
              color: "#a07855",
            }}
            className="leading-tight"
          >
            {groomName} & {brideName}
          </h2>
        </div>
      )}

      {/* ── CHỈ RENDER PHONG BÌ Ở GIỮA MÀN HÌNH ── */}
      <div
        className={`relative w-[100%] max-w-[600px] aspect-[1.4] transition-all duration-1000 ${
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
        <p
          style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: "1.9rem",
            color: "#a07855",
          }}
          className="text-center mt-8 select-none animate-pulse transition-all"
        >
          Chạm để mở
        </p>
      )}
    </div>
  );
}
