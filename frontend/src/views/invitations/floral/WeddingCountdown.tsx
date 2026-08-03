import React, { useState, useEffect, useRef } from "react";
import { greatVibes, playfairDisplay, montserrat } from "@/shared/lib/fonts";
import { WeddingData } from "@/entities/invitation/model/types";

interface WeddingCountdownProps {
  weddingData: WeddingData;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

interface AnimatedCountdownItemProps {
  children: React.ReactNode;
  animationType: "slideDown" | "slideUp" | "zoomIn";
  delayMs?: number;
  className?: string;
}

function AnimatedCountdownItem({
  children,
  animationType,
  delayMs = 0,
  className = "",
}: AnimatedCountdownItemProps) {
  const [isVisible, setIsVisible] = useState(true);
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const getClasses = () => {
    switch (animationType) {
      case "slideDown":
        return isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-8";
      case "slideUp":
        return isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8";
      case "zoomIn":
        return isVisible
          ? "opacity-100 scale-100"
          : "opacity-0 scale-50";
      default:
        return isVisible ? "opacity-100" : "opacity-0";
    }
  };

  return (
    <div
      ref={itemRef}
      style={{ transitionDelay: `${delayMs}ms` }}
      className={`transition-all duration-1000 ease-out transform-gpu ${getClasses()} ${className}`}
    >
      {children}
    </div>
  );
}

export function WeddingCountdown({ weddingData }: WeddingCountdownProps) {
  // Parse target date or fallback
  const targetDateStr = weddingData.weddingDate || "2026-12-31";

  const calculateTimeLeft = (): TimeLeft => {
    const target = new Date(targetDateStr).getTime();
    const now = new Date().getTime();
    const difference = target - now;

    if (isNaN(target) || difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isPast: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDateStr]);

  const timeUnits = [
    { label: "NGÀY", value: timeLeft.days },
    { label: "GIỜ", value: timeLeft.hours },
    { label: "PHÚT", value: timeLeft.minutes },
    { label: "GIÂY", value: timeLeft.seconds },
  ];

  return (
    <section className="w-full bg-[#f8f6f0] py-12 sm:py-16 px-4 sm:px-6 flex flex-col items-center justify-center text-center select-none overflow-hidden">
      {/* ── CARD CONTAINER ── */}
      <div className="w-full max-w-sm sm:max-w-md mx-auto bg-[#fffdfa] rounded-3xl p-6 sm:p-9 border border-[#e5d9c8] shadow-[0_12px_40px_rgba(139,108,66,0.08)] space-y-6 sm:space-y-8 relative">
        {/* Decorative Top Line */}
        <div className="absolute top-3 inset-x-6 h-[1px] bg-gradient-to-r from-transparent via-[#d8c7b2] to-transparent pointer-events-none" />

        {/* ── HEADER TITLE (SLIDE DOWN) ── */}
        <div className="space-y-1 pt-1">
          <AnimatedCountdownItem animationType="slideDown">
            <p
              className={`${greatVibes.className} text-3xl sm:text-4xl text-[#aa8657] font-semibold`}
            >
              Cùng đếm ngược thời gian
            </p>
          </AnimatedCountdownItem>
          <AnimatedCountdownItem animationType="slideDown" delayMs={100}>
            <h2
              className={`${playfairDisplay.className} text-xl sm:text-2xl text-[#8b6c42] font-bold tracking-[0.18em] uppercase`}
            >
              NGÀY HẠNH PHÚC
            </h2>
          </AnimatedCountdownItem>
        </div>

        {/* ── 4 TIME COUNTDOWN BOXES (ZOOM IN SEPARATELY) ── */}
        {timeLeft.isPast ? (
          <div className="py-6">
            <AnimatedCountdownItem animationType="zoomIn">
              <p className={`${greatVibes.className} text-4xl text-[#8b6c42]`}>
                Ngày trọng đại đã đến! ❤️
              </p>
            </AnimatedCountdownItem>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-2 sm:gap-3 py-2">
            {timeUnits.map((unit, index) => (
              <AnimatedCountdownItem
                key={unit.label}
                animationType="zoomIn"
                delayMs={(index + 1) * 120}
              >
                <div className="bg-[#fcf8f2] rounded-2xl p-2.5 sm:p-4 border border-[#eee4d6] shadow-sm flex flex-col items-center justify-center space-y-1">
                  <span
                    className={`${playfairDisplay.className} text-2xl sm:text-4xl text-[#8b6c42] font-bold leading-none`}
                  >
                    {String(unit.value).padStart(2, "0")}
                  </span>
                  <span
                    className={`${montserrat.className} text-[10px] sm:text-xs text-[#785c37] font-bold tracking-widest uppercase`}
                  >
                    {unit.label}
                  </span>
                </div>
              </AnimatedCountdownItem>
            ))}
          </div>
        )}

        {/* Decorative Bottom Line */}
        <div className="absolute bottom-3 inset-x-6 h-[1px] bg-gradient-to-r from-transparent via-[#d8c7b2] to-transparent pointer-events-none" />
      </div>
    </section>
  );
}

