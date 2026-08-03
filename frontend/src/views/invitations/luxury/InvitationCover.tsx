import Image from "next/image";
import { cinzel, greatVibes, ebGaramond } from "@/shared/lib/fonts";
import { formatDateToDDMMYYYY } from "@/shared/lib/utils/date";

import img4Svg from "@/shared/assets/image/envelope/img_8.svg";
import paper3Img from "@/shared/assets/image/paper/paper4.svg";
import imgWebp from "@/shared/assets/image/frame/frame_2.svg";

interface InvitationCoverProps {
  onScrollNext?: () => void;
  groomName: string;
  brideName: string;
  weddingDate: string;
  coverImageUrl?: string;
  galleryImages?: string[];
  guestName?: string;
}

export function InvitationCover({
  onScrollNext,
  groomName,
  brideName,
  weddingDate,
  coverImageUrl,
  galleryImages = [],
  guestName,
}: InvitationCoverProps) {
  const formattedDate = formatDateToDDMMYYYY(weddingDate || "2026-05-23");

  const img1 =
    (galleryImages && galleryImages[0]) ||
    coverImageUrl ||
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=600";
  const img2 =
    (galleryImages && galleryImages[1]) ||
    coverImageUrl ||
    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=600";

  return (
    <section
      onClick={onScrollNext}
      className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-[#fbf9fc] cursor-pointer hover:opacity-[0.99] transition-all px-1 py-4 sm:px-2 sm:py-6 select-none"
    >
      <style>{`
        @keyframes slideUpFromBottom {
          0% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }
      `}</style>

      {/* Background patterns nhạt thanh lịch */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#8b5cf6_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Container chính cho SVG trang trí ở giữa màn hình */}
      <div className="relative w-[110%] max-w-[860px] aspect-[0.71] z-10 flex flex-col items-center justify-center select-none filter drop-shadow-[0_8px_20px_rgba(0,0,0,0.08)]">
        {/* 1. Khung ảnh cặp đôi (imgWebp) nhô cao lên ở phía sau/trên Paper Card */}
        <div className="absolute top-[-70%] sm:top-[-75%] w-full h-[120%] z-15 pointer-events-none flex justify-center items-center animate-[slideUpFromBottom_1.2s_cubic-bezier(0.16,1,0.3,1)_0.1s_both]">
          {/* Frame trái */}
          <div className="absolute left-[0%] sm:left-[4%] top-[10%] w-[56%] sm:w-[50%] aspect-[0.71] -rotate-6 filter drop-shadow-xl transition-transform hover:scale-105">
            <div className="relative w-full h-full">
              {/* Ảnh nằm chính xác bên trong ô cửa sổ của khung imgWebp */}
              <div className="absolute left-[32.9%] top-[34.1%] w-[34%] h-[25.8%] overflow-hidden z-0 rounded-[1px]">
                <img
                  src={img1}
                  alt="Groom & Bride 1"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Khung viền SVG imgWebp đè lên trên */}
              <Image
                src={imgWebp}
                alt="Frame Overlay"
                fill
                priority
                className="object-contain pointer-events-none z-10"
              />
            </div>
          </div>

          {/* Frame phải */}
          <div className="absolute right-[0%] sm:right-[4%] top-[0%] w-[56%] sm:w-[50%] aspect-[0.71] rotate-6 filter drop-shadow-xl transition-transform hover:scale-105">
            <div className="relative w-full h-full">
              {/* Ảnh nằm chính xác bên trong ô cửa sổ của khung imgWebp */}
              <div className="absolute left-[32.9%] top-[34.1%] w-[34%] h-[25.8%] overflow-hidden z-0 rounded-[1px]">
                <img
                  src={img2}
                  alt="Groom & Bride 2"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Khung viền SVG imgWebp đè lên trên */}
              <Image
                src={imgWebp}
                alt="Frame Overlay"
                fill
                priority
                className="object-contain pointer-events-none z-10"
              />
            </div>
          </div>
        </div>

        {/* 2. Paper Card (Thiệp cưới) nằm đè lên chân ảnh và nhô ra khỏi bao thư */}
        <div className="absolute top-[-55%] left-[-5%] w-[110%] h-[180%] z-10 flex flex-col items-center justify-center text-[#594852] p-6 select-none drop-shadow-[0_8px_20px_rgba(0,0,0,0.12)] animate-[slideUpFromBottom_1.2s_cubic-bezier(0.16,1,0.3,1)_0.2s_both]">
          <Image
            src={paper3Img}
            alt="Paper Invitation Card"
            fill
            priority
            className="object-fill pointer-events-none z-0"
          />

          {/* Nội dung thông tin trên thiệp paper */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 -mt-16 sm:-mt-20 space-y-1 sm:space-y-2">
            <p
              className={`${cinzel.className} text-[11px] sm:text-xs tracking-[0.25em] uppercase text-[#8c7362] font-semibold`}
            >
              SAVE THE DATE
            </p>

            <div
              className={`${ebGaramond.className} text-xl sm:text-3xl font-medium tracking-wider text-[#4a3b32] my-0.5 sm:my-1`}
            >
              {formattedDate}
            </div>

            <h2
              className={`${greatVibes.className} text-2xl sm:text-4xl text-[#6b4e3d] leading-snug`}
            >
              {groomName || "Hoàng Nam"}{" "}
              <span className="text-lg sm:text-2xl font-serif">&amp;</span>{" "}
              {brideName || "Thảo Vy"}
            </h2>
          </div>
        </div>

        {/* 3. Envelope - Nằm ở lớp trên cùng z-20 che chân paper & ảnh */}
        <Image
          src={img4Svg}
          alt="Luxury Envelope Decor"
          fill
          priority
          className="object-contain z-20 pointer-events-none"
        />
      </div>
    </section>
  );
}
