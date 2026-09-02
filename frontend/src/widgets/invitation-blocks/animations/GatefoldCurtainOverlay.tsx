"use client";

import { useState, useEffect } from "react";

export interface GatefoldCurtainOverlayProps {
  onComplete?: () => void;
  accentColor?: string;
  gradientTop?: string;
  gradientBottom?: string;
  autoOpenDelay?: number;
}

export function GatefoldCurtainOverlay({
  onComplete,
  accentColor = "#5D733F",
  gradientTop = "#6F884E",
  gradientBottom = "#4A5D32",
  autoOpenDelay = 400,
}: GatefoldCurtainOverlayProps) {
  const [opened, setOpened] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Tự động mở 2 cánh thiệp khi component được mount
    const openTimer = setTimeout(() => {
      setOpened(true);
      const hideTimer = setTimeout(() => {
        setHidden(true);
        if (onComplete) onComplete();
      }, 1000);
      return () => clearTimeout(hideTimer);
    }, autoOpenDelay);

    return () => clearTimeout(openTimer);
  }, [autoOpenDelay, onComplete]);

  if (hidden) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center select-none overflow-hidden transition-opacity duration-700 pointer-events-none`}
    >
      {/* Cánh Trái */}
      <div
        className={`absolute top-0 left-0 w-1/2 h-full shadow-2xl transition-transform duration-1000 ease-[cubic-bezier(0.77,0,0.175,1)] ${
          opened ? "-translate-x-full" : "translate-x-0"
        }`}
        style={{
          backgroundColor: accentColor,
          backgroundImage: `
            repeating-linear-gradient(90deg, transparent, transparent 16px, rgba(0,0,0,0.06) 16px, rgba(0,0,0,0.06) 32px),
            linear-gradient(180deg, ${gradientTop} 0%, ${accentColor} 50%, ${gradientBottom} 100%)
          `,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/30 pointer-events-none" />
      </div>

      {/* Cánh Phải */}
      <div
        className={`absolute top-0 right-0 w-1/2 h-full shadow-2xl transition-transform duration-1000 ease-[cubic-bezier(0.77,0,0.175,1)] ${
          opened ? "translate-x-full" : "translate-x-0"
        }`}
        style={{
          backgroundColor: accentColor,
          backgroundImage: `
            repeating-linear-gradient(90deg, transparent, transparent 16px, rgba(0,0,0,0.06) 16px, rgba(0,0,0,0.06) 32px),
            linear-gradient(180deg, ${gradientTop} 0%, ${accentColor} 50%, ${gradientBottom} 100%)
          `,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-l from-black/20 via-transparent to-black/30 pointer-events-none" />
      </div>
    </div>
  );
}
