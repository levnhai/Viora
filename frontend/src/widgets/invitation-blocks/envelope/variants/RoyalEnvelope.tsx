"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import {
  cinzel,
  dancingScript,
  cormorantGaramond,
  montserrat,
} from "@/shared/lib/fonts";
import { getLastTwoNames } from "@/shared/lib/utils/string";

import envelopeImg from "@/shared/assets/image/envelope/img_3.png";
import { formatName } from "@/shared/lib/utils/string";

interface RoyalEnvelopeProps {
  guestName?: string;
  groomName: string;
  brideName: string;
  onOpen: () => void;
  isFixed?: boolean;
}

export function RoyalEnvelope({
  guestName,
  groomName,
  brideName,
  onOpen,
  isFixed = true,
}: RoyalEnvelopeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMerged, setIsMerged] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const envelopeRef = useRef<HTMLDivElement>(null);
  const floatTweenRef = useRef<gsap.core.Tween | null>(null);
  const exitTimelineRef = useRef<gsap.core.Timeline | null>(null);

  // GSAP Entrance & Float animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Đặt trạng thái ban đầu
      gsap.set(".header-subtitle", { y: -15, opacity: 0 });
      gsap.set(".groom-name", { x: -40, opacity: 0, filter: "blur(3px)" });
      gsap.set(".bride-name", { x: 40, opacity: 0, filter: "blur(3px)" });
      gsap.set(".ampersand", { scale: 0, rotation: -30, opacity: 0 });
      gsap.set(envelopeRef.current, {
        y: 35,
        opacity: 0,
        scale: 1.6,
        force3D: true,
      });
      gsap.set(".invitation-text", { y: 15, opacity: 0 });

      // Timeline xuất hiện cực mượt (Entrance)
      const tl = gsap.timeline();

      tl.to(".header-subtitle", {
        y: 0,
        opacity: 0.9,
        duration: 0.4,
        ease: "power2.out",
      })
        .to(
          ".groom-name",
          {
            x: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.2",
        )
        .to(
          ".bride-name",
          {
            x: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.5,
            ease: "power2.out",
          },
          "<",
        )
        .to(
          ".ampersand",
          {
            scale: 1,
            rotation: 0,
            opacity: 1,
            duration: 0.4,
            ease: "back.out(1.2)",
          },
          "-=0.3",
        )
        .to(
          envelopeRef.current,
          {
            y: -30,
            opacity: 1,
            scale: 2.15,
            duration: 0.7,
            ease: "power2.out",
            force3D: true,
            onComplete: () => {
              // Hiệu ứng bập bềnh cực kỳ mượt màng không bị giật
              floatTweenRef.current = gsap.to(envelopeRef.current, {
                y: -38,
                scale: 2.15,
                duration: 2.4,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                force3D: true,
              });
            },
          },
          "-=0.3",
        )
        .to(
          ".invitation-text",
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
            onComplete: () => {
              // Hiệu ứng nhịp đập cho nút "Chạm để mở"
              gsap.to(".touch-seal", {
                scale: 1.04,
                boxShadow: "0 10px 24px rgba(91, 107, 80, 0.3)",
                duration: 1.2,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut",
              });
            },
          },
          "-=0.2",
        );
    }, containerRef);

    return () => {
      ctx.revert();
      if (floatTweenRef.current) floatTweenRef.current.kill();
      if (exitTimelineRef.current) exitTimelineRef.current.kill();
    };
  }, []);

  const displayGroom = formatName(groomName || "Văn Hiếu");
  const displayBride = formatName(brideName || "Cẩm Tú");
  const displayGuest = guestName || "A/C Minh Anh";

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);

    if (floatTweenRef.current) {
      floatTweenRef.current.kill();
    }

    // Timeline mở thiệp
    exitTimelineRef.current = gsap.timeline({
      onComplete: () => {
        setIsMerged(true);
        onOpen();
      },
    });

    exitTimelineRef.current
      .to(".touch-seal", {
        scale: 1.15,
        opacity: 0,
        duration: 0.25,
        ease: "power2.out",
      })
      .to(
        [".names-wrapper", ".header-subtitle", ".invitation-text"],
        {
          opacity: 0,
          y: -20,
          duration: 0.35,
          stagger: 0.05,
          ease: "power2.in",
        },
        "-=0.15",
      )
      .to(
        envelopeRef.current,
        {
          scale: 1.75,
          y: -15,
          duration: 0.3,
          ease: "power2.out",
        },
        "-=0.2",
      )
      .to(envelopeRef.current, {
        scale: 1.2,
        y: 100,
        opacity: 0,
        duration: 0.5,
        ease: "back.in(1.4)",
      })
      .to(
        containerRef.current,
        {
          opacity: 0,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.3",
      );
  };

  if (isMerged) return null;

  return (
    <div
      ref={containerRef}
      className={`${
        isFixed ? "fixed" : "absolute"
      } inset-0 z-[1000] flex flex-col items-center justify-between py-4 sm:py-8 bg-gradient-to-b from-[#f8f9f6] via-[#f0f3eb] to-[#e4e9dd] select-none overflow-hidden will-change-opacity`}
    >
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#6b7a5e_1.2px,transparent_1.2px)] [background-size:24px_24px] pointer-events-none" />

      <div className="h-2 sm:h-4" />

      {/* TIÊU ĐỀ & TÊN CÔ DÂU CHÚ RỂ*/}
      <div className="names-wrapper text-center max-w-3xl mx-auto select-none pt-4 sm:pt-8 pb-10 z-20">
        <p
          className={`${cinzel.className} header-subtitle text-[11px] sm:text-sm md:text-base tracking-[0.38em] uppercase text-[#4a5840] font-semibold mb-2 sm:mb-3`}
        >
          Wedding Invitation
        </p>

        {/* Main Names Header */}
        <h1 className="leading-snug px-2 flex items-baseline justify-center gap-x-3 sm:gap-x-5 flex-wrap">
          <span
            className={`${dancingScript.className} groom-name text-4xl sm:text-6xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#3e4c34] via-[#657659] to-[#3e4c34] drop-shadow-[0_1px_3px_rgba(0,0,0,0.06)]`}
          >
            {displayGroom}
          </span>
          <span
            className={`${cormorantGaramond.className} ampersand text-3xl sm:text-4xl md:text-4xl italic text-[#6e7d62] font-light px-1`}
          >
            &
          </span>
          <span
            className={`${dancingScript.className} bride-name text-4xl sm:text-6xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#3e4c34] via-[#657659] to-[#3e4c34] drop-shadow-[0_1px_3px_rgba(0,0,0,0.06)]`}
          >
            {displayBride}
          </span>
        </h1>
      </div>

      {/* ── PHONG BÌ */}
      <div
        onClick={!isOpen ? handleOpen : undefined}
        className="relative w-full flex-1 flex items-center justify-center my-auto cursor-pointer z-10 py-1"
      >
        <div
          ref={envelopeRef}
          className="relative w-full max-w-[850px] aspect-[1.38] scale-110 sm:scale-105 transition-transform duration-300 hover:scale-[1.12]"
        >
          <Image
            src={envelopeImg}
            alt="Royal Wedding Envelope"
            placeholder="blur"
            fill
            sizes="(max-width: 768px) 100vw, 850px"
            priority
            className="object-contain pointer-events-none select-none drop-shadow-[0_12px_24px_rgba(0,0,0,0.08)]"
          />
        </div>
      </div>

      {/* khách mời*/}
      <div
        onClick={!isOpen ? handleOpen : undefined}
        className="invitation-text text-center select-none flex flex-col items-center gap-10 z-20 pb-4 sm:pb-6 cursor-pointer"
      >
        {/* Thông tin Khách Mời (Nếu có) */}
        {displayGuest && (
          <div className="mt-1 px-6 py-2 rounded-full bg-[#6b7a5e]/15 border border-[#6b7a5e]/30 backdrop-blur-md">
            <p
              className={`${montserrat.className} text-xs sm:text-sm uppercase tracking-[0.2em] text-[#4a5840] font-semibold`}
            >
              Kính mời:{" "}
              <span className="font-bold text-[#2a3622] tracking-normal text-sm sm:text-base">
                {displayGuest}
              </span>
            </p>
          </div>
        )}
        <button
          type="button"
          // className="touch-seal flex items-center gap-2.5 px-9 py-3.5 rounded-full bg-gradient-to-r from-[#5b6b50] via-[#7d8e71] to-[#5b6b50] text-white shadow-xl shadow-[#6b7a5e]/30 border border-[#d2dcc8]/50 transition-all hover:brightness-110 active:scale-95"
        >
          {/* <Sparkles className="w-5 h-5 text-emerald-100 animate-spin duration-3000" /> */}
          {/* <span
            className={`${montserrat.className} uppercase tracking-[0.22em] font-bold text-xs sm:text-sm`}
          >
            Chạm để mở thiệp
          </span> */}
        </button>
      </div>
    </div>
  );
}
