"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { WeddingData } from "@/entities/invitation/model/types";

interface InvitationCoverProps {
  weddingData?: WeddingData;
  guestName?: string;
  onStartOpen?: () => void;
  onOpen: () => void;
}

export function InvitationCover({ onStartOpen, onOpen }: InvitationCoverProps) {
  const [opening, setOpening] = useState(false);
  const isTriggeredRef = useRef(false);
  const onStartOpenRef = useRef(onStartOpen);
  const onOpenRef = useRef(onOpen);

  // Cập nhật tham chiếu callback mới nhất mà không gây re-run effect
  useEffect(() => {
    onStartOpenRef.current = onStartOpen;
    onOpenRef.current = onOpen;
  });

  const startOpen = useCallback(() => {
    if (isTriggeredRef.current) return;
    isTriggeredRef.current = true;
    setOpening(true);

    if (onStartOpenRef.current) {
      onStartOpenRef.current();
    }

    setTimeout(() => {
      if (onOpenRef.current) {
        onOpenRef.current();
      }
    }, 1200);
  }, []);

  // Tự động chạy mở thiệp ngay khi trang sẵn sàng (150ms sau khi mount, deps rỗng đảm bảo không bị reset)
  useEffect(() => {
    const timer = setTimeout(() => {
      startOpen();
    }, 150);

    return () => clearTimeout(timer);
  }, [startOpen]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center select-none overflow-hidden transition-all duration-[1200ms] ${
        opening
          ? "bg-black/0 backdrop-blur-none pointer-events-none"
          : "bg-black/75 backdrop-blur-xs"
      }`}
    >
      <style>{`
        /* Vân vải dệt thô cao cấp (Linen Canvas Texture) chuẩn màu vàng cát phong bì */
        .henuoc-linen-texture {
          background-color: #9E8E67;
          background-image: 
            radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.09) 0%, rgba(0,0,0,0.2) 100%),
            repeating-linear-gradient(45deg, rgba(0, 0, 0, 0.05) 0px, rgba(0, 0, 0, 0.05) 1.5px, transparent 1.5px, transparent 3px),
            repeating-linear-gradient(-45deg, rgba(255, 255, 255, 0.04) 0px, rgba(255, 255, 255, 0.04) 1.5px, transparent 1.5px, transparent 3px),
            repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.06) 0px, rgba(0, 0, 0, 0.06) 1px, transparent 1px, transparent 2.5px),
            repeating-linear-gradient(90deg, rgba(0, 0, 0, 0.06) 0px, rgba(0, 0, 0, 0.06) 1px, transparent 1px, transparent 2.5px);
        }
      `}</style>

      {/* Khung phong bì tỉ lệ chuẩn mobile cao cấp khớp với chiều rộng thân thiệp cưới */}
      <div
        onClick={startOpen}
        className="relative w-full max-w-[480px] md:max-w-[500px] h-full min-h-screen shadow-2xl overflow-hidden cursor-pointer"
        title="Chạm vào phong bì để mở thiệp"
      >
        {/* ==============================================================
            1. HAI CÁNH CỬA PHONG BÌ (SPLIT DOORS) 50% / 50% - MỞ SANG 2 BÊN
            ============================================================== */}
        <div className="absolute inset-0 w-full h-full flex pointer-events-none z-10 overflow-hidden">
          {/* Cánh trái (Left Flap): bóng đổ tràn sang cánh phải dọc theo rãnh giữa */}
          <div
            style={{
              width: "50%",
              height: "100%",
              transition: "transform 1.2s cubic-bezier(0.25, 1, 0.5, 1)",
              transform: opening ? "translateX(-105%)" : "translateX(0%)",
            }}
            className="henuoc-linen-texture relative border-r border-black/25 shadow-[6px_0_20px_rgba(0,0,0,0.4)]"
          />

          {/* Cánh phải (Right Flap) */}
          <div
            style={{
              width: "50%",
              height: "100%",
              transition: "transform 1.2s cubic-bezier(0.25, 1, 0.5, 1)",
              transform: opening ? "translateX(105%)" : "translateX(0%)",
            }}
            className="henuoc-linen-texture relative border-l border-white/10 shadow-[-6px_0_20px_rgba(0,0,0,0.3)]"
          />
        </div>

        {/* ==============================================================
            2. CÀNH HOA TRANG TRÍ RỦ TỪ GÓC TRÊN BÊN TRÁI (TOP LEFT)
            ============================================================== */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "115px",
            height: "280px",
            zIndex: 15,
            pointerEvents: "none",
            transition: "opacity 0.9s ease, transform 1.2s cubic-bezier(0.25, 1, 0.5, 1)",
            opacity: opening ? 0 : 1,
            transform: opening ? "translateX(-50px) scale(0.95)" : "translateX(0) scale(1)",
          }}
          className="henuoc-breeze"
        >
          <img
            src="/templates/hen-uoc/photo_2.png"
            alt="Cành hoa trang trí phong bì"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </div>
      </div>
    </div>
  );
}
