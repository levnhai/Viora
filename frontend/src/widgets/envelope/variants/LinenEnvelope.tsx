import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import {
  cinzel,
  cinzelDecorative,
  cormorantGaramond,
  montserrat,
} from "@/shared/lib/fonts";
import fabricBg from "@/shared/assets/image/fabric/img_1.png";
import { formatName } from "@/shared/lib/utils/string";
import { formatVietnameseDate } from "@/shared/lib/utils/date";

interface LinenEnvelopeProps {
  guestName?: string;
  groomName: string;
  brideName: string;
  weddingDate?: string;
  weddingTime?: string;
  onOpen: () => void;
  isFixed?: boolean;
}

export function LinenEnvelope({
  guestName,
  groomName,
  brideName,
  weddingDate,
  weddingTime,
  onOpen,
  isFixed = true,
}: LinenEnvelopeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMerged, setIsMerged] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const namesContainerRef = useRef<HTMLDivElement>(null);
  const groomRef = useRef<HTMLHeadingElement>(null);
  const ampersandRef = useRef<HTMLDivElement>(null);
  const brideRef = useRef<HTMLHeadingElement>(null);
  const dateCardRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const exitTimelineRef = useRef<gsap.core.Timeline | null>(null);

  const displayGroom = formatName(groomName || "Văn Hiếu");
  const displayBride = formatName(brideName || "Cẩm Tú");
  const displayGuest = guestName || "Quý Khách";

  const weddingDateLabel = weddingDate
    ? formatVietnameseDate(weddingDate, {
        includeWeekday: true,
        time: weddingTime,
      })
    : "";

  // Entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(headerRef.current, { opacity: 0, y: -25, scale: 0.95 });
      gsap.set(groomRef.current, { opacity: 0, x: -50, scale: 0.9 });
      gsap.set(ampersandRef.current, { opacity: 0, scale: 0.3, rotate: -15 });
      gsap.set(brideRef.current, { opacity: 0, x: 50, scale: 0.9 });
      gsap.set([dateCardRef.current, footerRef.current], { opacity: 0, y: 25 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(headerRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.1,
        delay: 0.2,
      })
        .to(
          groomRef.current,
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1.2,
            ease: "back.out(1.3)",
          },
          "-=0.7",
        )
        .to(
          ampersandRef.current,
          {
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 0.9,
            ease: "back.out(1.8)",
          },
          "-=0.8",
        )
        .to(
          brideRef.current,
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1.2,
            ease: "back.out(1.3)",
          },
          "-=0.8",
        )
        .to(
          [dateCardRef.current, footerRef.current],
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.15,
            ease: "power2.out",
          },
          "-=0.5",
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);

    // Timeline mở thiệp
    exitTimelineRef.current = gsap.timeline({
      onComplete: () => {
        setIsMerged(true);
        onOpen();
      },
    });

    exitTimelineRef.current
      .to(contentRef.current, {
        opacity: 0,
        scale: 1.08,
        y: -15,
        duration: 0.5,
        ease: "power2.inOut",
      })
      .to(
        containerRef.current,
        {
          opacity: 0,
          scale: 0.98,
          duration: 0.55,
          ease: "power2.out",
        },
        "-=0.25",
      );
  };

  if (isMerged) return null;

  return (
    <div
      onClick={handleOpen}
      className={`${
        isFixed ? "fixed" : "absolute"
      } inset-0 z-[1000] flex items-center justify-center cursor-pointer bg-stone-950/85 backdrop-blur-md select-none overflow-hidden will-change-opacity`}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Alex+Brush&family=Cinzel:wght@500;600;700&family=Cinzel+Decorative:wght@600;700&family=Great+Vibes&family=MonteCarlo&family=Playfair+Display:ital,wght@0,500;0,600;1,400;1,600&family=Pinyon+Script&display=swap');

        .calligraphy-name {
          font-family: 'Great Vibes', 'Alex Brush', 'MonteCarlo', cursive;
        }
        .serif-italic {
          font-family: 'Playfair Display', 'Cormorant Garamond', serif;
        }
        .text-emboss-gold {
          background: linear-gradient(135deg, #381d0f 0%, #683b1c 45%, #422112 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 2px 5px rgba(66, 33, 18, 0.18)) drop-shadow(0 1px 1px rgba(255, 255, 255, 0.4));
        }
        .text-emboss-sub {
          text-shadow: 0 1px 2px rgba(255, 255, 255, 0.6), 0 2px 4px rgba(74, 46, 32, 0.12);
        }
      `}</style>

      {/* Khung thiệp giới hạn chiều rộng tương tự temp_8 */}
      <div
        ref={containerRef}
        className="relative w-full sm:max-w-[450px] md:max-w-[480px] h-full flex flex-col items-center justify-between py-10 sm:py-14 px-6 overflow-hidden shadow-2xl transition-transform duration-300"
      >
        {/* Background Linen Fabric */}
        <Image
          src={fabricBg}
          alt="Linen Fabric Background"
          placeholder="blur"
          fill
          priority
          className="object-cover pointer-events-none -z-10 select-none"
        />

        {/* Khung nội dung chính */}
        <div
          ref={contentRef}
          className="relative w-full h-full flex flex-col items-center justify-between pointer-events-none z-10 text-center"
        >
          {/* HEADER: SAVE THE DATE / WEDDING INVITATION */}
          <div
            ref={headerRef}
            className="pt-4 sm:pt-8 flex flex-col items-center gap-2.5"
          >
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#ffffff]/55 border border-[#8b5a36]/25 shadow-[0_2px_8px_rgba(110,60,29,0.06)] backdrop-blur-xs">
              <span className="text-[#965e38] text-[9px]">✦</span>
              <span
                className={`${cinzel.className} text-[10px] sm:text-[11px] tracking-[0.35em] uppercase text-[#5a341e] font-bold`}
              >
                Wedding Invitation
              </span>
              <span className="text-[#965e38] text-[9px]">✦</span>
            </div>

            <p
              className={`${cinzelDecorative.className} text-[11px] sm:text-xs text-[#80502e] tracking-[0.25em] uppercase opacity-85 font-semibold text-emboss-sub`}
            >
              Save Our Date
            </p>
          </div>

          {/* KHỐI TÊN CHÚ RỂ & CÔ DÂU: SO LE NGHỆ THUẬT */}
          <div
            ref={namesContainerRef}
            className="my-auto w-full flex flex-col justify-center px-4 sm:px-8 py-4"
          >
            {/* Tên Chú Rể - Lệch sang trái */}
            <div className="self-start text-left w-full pl-2 sm:pl-4">
              <span
                className={`${montserrat.className} block text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-[#8b5e3d] font-semibold mb-0.5 opacity-90`}
              >
                Groom
              </span>
              <h2
                ref={groomRef}
                className="calligraphy-name text-5xl sm:text-6xl md:text-[68px] leading-[1.1] tracking-wide text-emboss-gold font-normal py-1 pr-4 inline-block"
              >
                {displayGroom}
              </h2>
            </div>

            {/* Dấu & nghệ thuật hoàng gia ở giữa */}
            <div
              ref={ampersandRef}
              className="self-center my-0.5 sm:my-1 flex items-center justify-center gap-3 w-full max-w-[200px]"
            >
              <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#8b5a36]/40 to-[#8b5a36]/60" />
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center bg-[#ffffff]/60 border border-[#8b5a36]/30 shadow-xs">
                <span className="serif-italic text-2xl sm:text-3xl italic font-light text-[#7a4827] leading-none -translate-y-0.5">
                  &amp;
                </span>
              </div>
              <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-[#8b5a36]/40 to-[#8b5a36]/60" />
            </div>

            {/* Tên Cô Dâu - Lệch sang phải */}
            <div className="self-end text-right w-full pr-2 sm:pr-4">
              <span
                className={`${montserrat.className} block text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-[#8b5e3d] font-semibold mb-0.5 opacity-90`}
              >
                Bride
              </span>
              <h2
                ref={brideRef}
                className="calligraphy-name text-5xl sm:text-6xl md:text-[68px] leading-[1.1] tracking-wide text-emboss-gold font-normal py-1 pl-4 inline-block"
              >
                {displayBride}
              </h2>
            </div>
          </div>

          {/* FOOTER & THÔNG TIN NGÀY CƯỚI */}
          <div className="pb-2 sm:pb-4 flex flex-col items-center gap-3.5 w-full">
            {/* THẺ NGÀY CƯỚI (NẾU CÓ) */}
            {weddingDateLabel && (
              <div
                ref={dateCardRef}
                className="flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#ffffff]/65 border border-[#8b5a36]/30 backdrop-blur-xs shadow-[0_2px_8px_rgba(110,60,29,0.08)]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#965e38]" />
                <span
                  className={`${cormorantGaramond.className} text-xs sm:text-sm font-semibold tracking-wider text-[#4d2814] uppercase`}
                >
                  {weddingDateLabel}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#965e38]" />
              </div>
            )}

            {/* NÚT CHẠM ĐỂ MỞ THIỆP */}
            <div
              ref={footerRef}
              className="flex items-center gap-2.5 px-5 py-2 rounded-full bg-gradient-to-r from-[#442313] via-[#63371d] to-[#442313] text-[#fbf6ed] shadow-[0_4px_14px_rgba(68,35,19,0.3)] hover:brightness-110 transition-all cursor-pointer"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#fde68a] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#fef08a]"></span>
              </span>
              <span
                className={`${montserrat.className} text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-semibold text-[#fef9ee] drop-shadow-xs`}
              >
                Chạm để mở thiệp
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



