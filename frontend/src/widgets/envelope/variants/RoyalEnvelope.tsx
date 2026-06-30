import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";

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
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isMerged, setIsMerged] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const envelopeRef = useRef<HTMLDivElement>(null);
  const floatTweenRef = useRef<gsap.core.Tween | null>(null);

  // Hiệu ứng loading 1.5 giây
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // GSAP Entrance & Float animations
  useEffect(() => {
    if (isLoading) return;

    const ctx = gsap.context(() => {
      // Thiết lập trạng thái ban đầu của các phần tử
      gsap.set(".groom-name", { x: -80, opacity: 0 });
      gsap.set(".bride-name", { x: 80, opacity: 0 });
      gsap.set(".ampersand", { scale: 0, opacity: 0 });
      gsap.set(envelopeRef.current, { y: 60, opacity: 0, scale: 0.95 });
      gsap.set(".invitation-text", { y: 20, opacity: 0 });

      // Chạy timeline xuất hiện (Entrance)
      const tl = gsap.timeline();
      tl.to(".groom-name", { x: 0, opacity: 1, duration: 1.2, ease: "power3.out" })
        .to(".bride-name", { x: 0, opacity: 1, duration: 1.2, ease: "power3.out" }, "<")
        .to(".ampersand", { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)" }, "-=0.8")
        .to(envelopeRef.current, { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" }, "-=0.6")
        .to(".invitation-text", { y: 0, opacity: 1, duration: 0.8 }, "-=0.4")
        .add(() => {
          // Sau khi xuất hiện xong, bắt đầu hiệu ứng bập bềnh vô hạn cho phong bì
          floatTweenRef.current = gsap.to(envelopeRef.current, {
            y: -8,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });

          // Hiệu ứng pulse nhẹ cho dòng chữ "Chạm để mở"
          gsap.to(".touch-hint", {
            opacity: 0.5,
            duration: 1,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
          });
        });
    }, containerRef);

    return () => ctx.revert();
  }, [isLoading]);

  const displayGroom = formatName(groomName || "Văn Hiếu");
  const displayBride = formatName(brideName || "Cẩm Tú");

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);

    // Dừng hiệu ứng bập bềnh của phong bì để tránh xung đột
    if (floatTweenRef.current) {
      floatTweenRef.current.kill();
    }

    // Chạy timeline đóng gói và ẩn màn hình intro
    const tl = gsap.timeline({
      onComplete: () => {
        setIsMerged(true);
        onOpen();
      },
    });

    tl.to([".names-wrapper", ".invitation-text"], {
      opacity: 0,
      y: -15,
      duration: 0.5,
      stagger: 0.1,
      ease: "power2.in",
    })
      .to(
        envelopeRef.current,
        {
          scale: 0.9,
          rotation: 3,
          y: 80,
          opacity: 0,
          duration: 0.8,
          ease: "back.in(1.5)",
        },
        "-=0.3"
      )
      .to(
        containerRef.current,
        {
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.4"
      );
  };

  if (isMerged) return null;

  return (
    <div
      ref={containerRef}
      className={`${
        isFixed ? "fixed" : "absolute"
      } inset-0 z-[1000] flex flex-col items-center justify-center bg-[#f4f2eb] select-none overflow-hidden`}
    >
      {/* Dynamic Font and Loader Styles */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
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
      `,
        }}
      />

      {/* ── SCREEN HIỂN THỊ LOADING ── */}
      {isLoading ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#f4f2eb] z-[1010]">
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
        /* ── MÀN HÌNH PHONG BÌ ── */
        <div
          onClick={!isOpen ? handleOpen : undefined}
          className="w-full h-full flex flex-col items-center justify-center cursor-pointer"
        >
          {/* ── TÊN CÔ DÂU & CHÚ RỂ PHÍA TRÊN PHONG BÌ ── */}
          <div className="names-wrapper text-center mb-6 select-none py-2 overflow-hidden">
            <h2
              style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: "calc(2.2rem + 1vw)",
                color: "#b38728",
                textShadow: "1px 1px 3px rgba(0, 0, 0, 0.05)",
              }}
              className="leading-tight px-4 flex items-center justify-center gap-x-3 sm:gap-x-4 flex-wrap"
            >
              <span className="groom-name inline-block">
                {displayGroom}
              </span>
              <span className="ampersand inline-block text-[0.85em]">
                &
              </span>
              <span className="bride-name inline-block">
                {displayBride}
              </span>
            </h2>
          </div>

          {/* ── PHONG BÌ Ở GIỮA MÀN HÌNH ── */}
          <div
            ref={envelopeRef}
            className="relative w-[100%] max-w-[600px] aspect-[1.4]"
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
          <div className="invitation-text text-center mt-8 select-none">
            <p
              style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: "1.5rem",
                color: "#b38728",
              }}
              className="touch-hint"
            >
              Chạm để mở
            </p>
            {guestName && (
              <p
                style={{ fontFamily: "'Montserrat', sans-serif" }}
                className="text-[9px] uppercase tracking-[0.25em] text-[#7a5c4f] mt-3 font-semibold"
              >
                Thân mời:{" "}
                <span className="font-bold text-[#2c1810] tracking-normal">
                  {guestName}
                </span>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
