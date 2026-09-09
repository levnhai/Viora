import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { WeddingData } from "@/entities/invitation/model/types";
import { FullImageModal } from "./components/FullImageModal";
import img_12 from "@/shared/assets/image/wood/img_12.webp";
import img_13 from "@/shared/assets/image/wood/img_13.svg";
import img_14 from "@/shared/assets/image/wood/img_14.png";
import img_16 from "@/shared/assets/image/wood/img_16.png";
import img_18 from "@/shared/assets/image/wood/img_18.png";
import img_4 from "@/shared/assets/image/wood/img_4.svg";

interface InvitationCoverProps {
  weddingData: WeddingData;
  guestName?: string;
}

export function InvitationCover({
  weddingData,
  guestName,
}: InvitationCoverProps) {
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const { groomName, brideName, galleryImages, coverImageUrl } =
    weddingData || {};

  const guestDisplayName = guestName || "Quý Khách";

  const couplePhoto =
    (galleryImages && galleryImages[0]) ||
    coverImageUrl ||
    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=800";

  const woodBgSrc =
    typeof img_12 === "string" ? img_12 : (img_12 as any)?.src || img_12;
  const img13Src =
    typeof img_13 === "string" ? img_13 : (img_13 as any)?.src || img_13;
  const img14Src =
    typeof img_14 === "string" ? img_14 : (img_14 as any)?.src || img_14;
  const img16Src =
    typeof img_16 === "string" ? img_16 : (img_16 as any)?.src || img_16;
  const img18Src =
    typeof img_18 === "string" ? img_18 : (img_18 as any)?.src || img_18;
  const img4Src =
    typeof img_4 === "string" ? img_4 : (img_4 as any)?.src || img_4;

  const containerRef = useRef<HTMLElement>(null);
  const branchLeftRef = useRef<HTMLDivElement>(null);
  const branchRightRef = useRef<HTMLDivElement>(null);
  const board1Ref = useRef<HTMLDivElement>(null);
  const board2Ref = useRef<HTMLDivElement>(null);
  const textSaveTheDateRef = useRef<HTMLDivElement>(null);
  const textNamesRef = useRef<HTMLDivElement>(null);
  const board3Ref = useRef<HTMLDivElement>(null);
  const board4Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      [
        woodBgSrc,
        img13Src,
        img14Src,
        img16Src,
        img18Src,
        img4Src,
        couplePhoto,
      ].forEach((src) => {
        if (src) {
          const img = new window.Image();
          img.src = src;
        }
      });
    }
  }, [woodBgSrc, img13Src, img14Src, img16Src, img18Src, img4Src, couplePhoto]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power2.out", force3D: true },
      });

      // 0. Cành lá hoa góc trên trượt xuống nhẹ nhàng
      tl.fromTo(
        [branchLeftRef.current, branchRightRef.current],
        { y: -45, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, ease: "power2.out" },
        0
      )
        // 1. Bảng 1 (Save The Date) hạ xuống êm ái
        .fromTo(
          board1Ref.current,
          { y: -55, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
          0.1
        )
        // 2. Bảng 2 (Tên Dâu Rể) hạ xuống nối liền mượt mà cùng trục chuyển động
        .fromTo(
          board2Ref.current,
          { y: -40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
          0.25
        )
        // 3. Chữ Save The Date và Tên dâu rể unblur fade-in sang trọng
        .fromTo(
          textSaveTheDateRef.current,
          { opacity: 0, scale: 0.92, filter: "blur(6px)" },
          {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.85,
            ease: "power2.out",
          },
          0.32
        )
        .fromTo(
          textNamesRef.current,
          { opacity: 0, y: 12, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.95,
            ease: "power2.out",
          },
          0.45
        )
        // 4. Bảng 3 (Khung ảnh dâu rể) trồi lên mượt mà và chuyển tiếp vào floating tự nhiên
        .fromTo(
          board3Ref.current,
          { y: 35, opacity: 0, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.85,
            ease: "power2.out",
            onComplete: () => {
              gsap.to(board3Ref.current, {
                y: -6,
                rotation: -1,
                duration: 3.2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
              });
            },
          },
          0.5
        )
        .fromTo(
          board4Ref.current,
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.75, ease: "power2.out" },
          0.65
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen md:min-h-[900px] lg:min-h-[940px] bg-transparent overflow-hidden select-none"
      style={{
        backgroundImage: woodBgSrc ? `url(${woodBgSrc})` : undefined,
        backgroundSize: "100% auto",
        backgroundRepeat: "repeat-y",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Alex+Brush&family=Cinzel+Decorative:wght@700;900&family=Great+Vibes&family=MonteCarlo&family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=Pinyon+Script&display=swap');

        .font-calligraphy {
          font-family: "Great Vibes", "Alex Brush", "Pinyon Script", cursive;
        }
        .font-decorative {
          font-family: "Cinzel Decorative", "Playfair Display", serif;
        }
        .font-serif-title {
          font-family: "Playfair Display", "Cormorant Garamond", serif;
        }
        @keyframes gold-shine-sweep {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .gold-shine-text {
          background: linear-gradient(
            90deg,
            #fff3d6 0%,
            #ffe5a3 25%,
            #ffffff 50%,
            #ffe5a3 75%,
            #fff3d6 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: gold-shine-sweep 4.5s linear infinite;
        }
        @keyframes subtle-sway {
          0%, 100% { transform: rotate(0deg) translateY(0px); }
          50% { transform: rotate(1.5deg) translateY(-3px); }
        }
        .animate-subtle-sway {
          animation: subtle-sway 5s ease-in-out infinite;
        }
      `}</style>

      {/* TRANG TRÍ GÓC TRÊN BÊN TRÁI (TOP LEFT) */}
      <div
        ref={branchLeftRef}
        className="absolute top-[-70px] left-[-40px] w-32 sm:w-44 md:w-56 pointer-events-none z-20 opacity-90 filter drop-shadow-md animate-subtle-sway"
      >
        <img
          src={img13Src}
          alt="Wood branch top left"
          className="w-full h-auto object-contain"
        />
      </div>

      {/* TRANG TRÍ GÓC TRÊN BÊN PHẢI (TOP RIGHT) */}
      <div
        ref={branchRightRef}
        className="absolute top-[-40px] right-[-30px] w-32 sm:w-44 md:w-56 pointer-events-none z-20 opacity-90 filter drop-shadow-md scale-x-[-1] animate-subtle-sway"
        style={{ animationDelay: "-2.5s" }}
      >
        <img
          src={img13Src}
          alt="Wood branc"
          className="w-full h-auto object-contain"
        />
      </div>

      {/* CỤM BẢNG GỖ & KHUNG ẢNH CỦA DÂU RỂ */}
      <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 w-full max-w-[400px] sm:max-w-md md:max-w-[560px] lg:max-w-[590px] pointer-events-none z-10 flex flex-col items-center">
        {/* BẢNG 1: BẢNG GỖ TREO PHÍA TRÊN (SAVE THE DATE) */}
        <div
          ref={board1Ref}
          className="relative w-[75%] top-[-20px] sm:w-[70%] md:max-w-[360px] z-10 flex items-center justify-center transform-gpu will-change-transform"
        >
          <img
            src={img14Src}
            alt="Bảng gỗ treo 1"
            loading="eager"
            decoding="async"
            className="w-full h-auto object-contain filter drop-shadow-md"
          />
          <div
            ref={textSaveTheDateRef}
            className="absolute left-0 right-0 top-[38%] bottom-[4%] flex items-center justify-center text-center px-4 z-20 will-change-opacity"
          >
            <span
              className="font-decorative tracking-[0.2em] sm:tracking-[0.25em] text-xs sm:text-sm md:text-base font-black uppercase text-[#fffdfa]"
              style={{
                textShadow:
                  "0 2px 4px rgba(0, 0, 0, 0.95), 0 0 10px rgba(0, 0, 0, 0.8)",
              }}
            >
              SAVE THE DATE
            </span>
          </div>
        </div>

        {/* BẢNG 2: BẢNG GỖ TREO NỐI TRỰC TIẾP NGAY BÊN DƯỚI BẢNG 1 (TÊN CÔ DÂU VÀ CHÚ RỂ) */}
        <div
          ref={board2Ref}
          className="relative w-[98%] sm:w-[94%] -mt-[44px] sm:-mt-[48px] md:max-w-[490px] lg:max-w-[520px] z-0 flex items-center justify-center transform-gpu will-change-transform filter drop-shadow-xl"
        >
          <img
            src={img14Src}
            alt="Bảng gỗ treo 2"
            loading="eager"
            decoding="async"
            className="w-full h-auto object-contain filter drop-shadow-md"
          />
          <div
            ref={textNamesRef}
            className="absolute left-0 right-0 top-[41%] bottom-[4%] flex items-center justify-center text-center px-3 sm:px-6 z-20 will-change-opacity"
          >
            <div
              className="font-calligraphy text-[26px] sm:text-[32px] md:text-[40px] lg:text-[46px] font-bold flex items-center justify-center flex-wrap gap-x-2.5 gap-y-0.5 leading-none sm:leading-tight text-white"
              style={{
                textShadow:
                  "0 2px 5px rgba(0, 0, 0, 0.98), 0 1px 2px rgba(0, 0, 0, 0.98), 0 0 12px rgba(0, 0, 0, 0.95)",
              }}
            >
              <span className="capitalize text-white tracking-wide drop-shadow-md">
                {groomName || "Hoàng Long"}
              </span>
              <span
                className="text-[#fcd34d] text-[20px] sm:text-2xl md:text-3xl font-serif-title mx-1.5 font-bold"
                style={{
                  textShadow:
                    "0 2px 5px rgba(0, 0, 0, 0.98), 0 0 10px rgba(252, 211, 77, 0.5)",
                }}
              >
                &amp;
              </span>
              <span className="capitalize text-white tracking-wide drop-shadow-md">
                {brideName || "Bảo Ngọc"}
              </span>
            </div>
          </div>
        </div>

        {/* BẢNG 3 / KHUNG ẢNH GỖ IMG_16 NẰM DƯỚI TÊN CÔ DÂU CHÚ RỂ */}
        <div className="w-full flex justify-center z-10">
          <div
            ref={board3Ref}
            className="relative w-[95%] sm:w-[90%] md:w-full max-w-[340px] sm:max-w-[380px] md:max-w-[490px] lg:max-w-[520px] mt-11 sm:mt-6 md:mt-14 lg:mt-18 z-10 flex items-center justify-center filter drop-shadow-2xl will-change-transform"
          >
            {/* Họa tiết trang trí img_4.svg ở góc trên bên phải khung ảnh gỗ */}
            <div className="absolute -top-26 right-[-70px] sm:-top-5 sm:-right-5 md:-top-7 md:-right-7 w-50 sm:w-28 md:w-36 z-30 pointer-events-none filter drop-shadow-md">
              <img
                src={img4Src}
                alt="Họa tiết trang trí góc trên phải khung ảnh"
                className="w-full h-auto object-contain"
              />
            </div>

            {/* Ảnh cưới dâu rể lấp đầy 100% khung gỗ với tiêu điểm khuôn mặt ở giữa/trên */}
            <div
              className="absolute left-[15%] right-[15%] top-[14%] bottom-[15%] flex items-center justify-center overflow-hidden rounded-[2px] bg-neutral-900 z-10 cursor-pointer group"
              onClick={() => setIsPhotoModalOpen(true)}
              title="Click để xem ảnh phóng to"
            >
              <img
                src={couplePhoto}
                alt="Groom & Bride"
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover object-[center_20%] contrast-[1.03] group-hover:scale-105 transition-transform duration-700 z-10"
              />
              <div className="absolute inset-0 shadow-[inset_0_3px_10px_rgba(0,0,0,0.65)] pointer-events-none z-20" />
            </div>

            {/* Viền khung gỗ img_16 đè phía trên (với cửa sổ trong suốt) */}
            <img
              src={img16Src}
              alt="Khung ảnh gỗ 16"
              loading="eager"
              decoding="async"
              className="relative w-full h-auto object-contain pointer-events-none z-10"
            />
          </div>
        </div>

        {/* BẢNG 4 / BẢNG GỖ IMG_18 NẰM DƯỚI KHUNG ẢNH (KÍNH MỜI KHÁCH) */}
        <div
          ref={board4Ref}
          className="relative w-[85%] sm:w-[80%] max-w-[320px] sm:max-w-[350px] md:max-w-[380px] mt-10 sm:mt-2 md:mt-6 lg:mt-8 z-20 flex items-center justify-center filter drop-shadow-xl pointer-events-auto"
        >
          <img
            src={img18Src}
            alt="Bảng gỗ kính mời 18"
            loading="eager"
            decoding="async"
            className="w-full h-auto object-contain"
          />
          <div className="absolute left-0 right-0 top-0 bottom-0 flex flex-col items-center justify-center text-center px-4 z-20">
            <span
              className="font-decorative text-[11px] sm:text-xs tracking-[0.2em] font-bold text-[#fde047] uppercase"
              style={{
                textShadow:
                  "0 1px 2px rgba(0, 0, 0, 0.95), 0 2px 4px rgba(0, 0, 0, 0.9)",
              }}
            >
              Kính Mời
            </span>
            <span
              className="font-calligraphy text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight mt-0.5 tracking-wide"
              style={{
                textShadow:
                  "0 2px 4px rgba(0, 0, 0, 0.95), 0 1px 2px rgba(0, 0, 0, 0.95), 0 0 2px rgba(0, 0, 0, 0.9)",
              }}
            >
              {guestDisplayName}
            </span>
          </div>
        </div>
      </div>

      {isPhotoModalOpen && (
        <FullImageModal
          images={galleryImages && galleryImages.length > 0 ? galleryImages : [couplePhoto]}
          initialIndex={0}
          onClose={() => setIsPhotoModalOpen(false)}
        />
      )}
    </section>
  );
}
