import React, { useState, useEffect, useRef } from "react";
import { playfairDisplay, montserrat } from "@/shared/lib/fonts";
import { WeddingData } from "@/entities/invitation/model/types";

interface SaveTheDateCalendarProps {
  weddingData: WeddingData;
}

export function SaveTheDateCalendar({ weddingData }: SaveTheDateCalendarProps) {
  const [isVisible, setIsVisible] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Parse date or fallback to 2026-12-31
  const dateStr = weddingData.weddingDate || "2026-12-31";
  const dateObj = new Date(dateStr);
  const validDate = isNaN(dateObj.getTime()) ? new Date("2026-12-31") : dateObj;

  const year = validDate.getFullYear();
  const month = validDate.getMonth(); // 0-indexed
  const targetDay = validDate.getDate(); // 1-31

  const monthYearLabel = `Tháng ${month + 1} · ${year}`;

  // Calculate Monday of the week containing validDate
  const dayOfWeek = validDate.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat
  const mondayDiff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

  const mondayDate = new Date(validDate);
  mondayDate.setDate(validDate.getDate() + mondayDiff);

  // Generate 7 days of that week
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(mondayDate);
    d.setDate(mondayDate.getDate() + i);
    return {
      dayNumber: d.getDate(),
      isTargetDay:
        d.getDate() === targetDay &&
        d.getMonth() === month &&
        d.getFullYear() === year,
    };
  });

  const daysOfWeek = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

  return (
    <section
      ref={sectionRef}
      suppressHydrationWarning
      className="w-full bg-[#f8f6f0] py-10 sm:py-16 px-4 sm:px-6 flex flex-col items-center justify-center text-center select-none overflow-hidden"
    >
      {/* ── ELEGANT CALENDAR WRAPPER ── */}
      <div
        className={`w-full max-w-sm sm:max-w-lg mx-auto bg-[#fffdfa] rounded-3xl p-6 sm:p-10 border border-[#e5d9c8] shadow-[0_10px_35px_rgba(139,108,66,0.06)] space-y-6 sm:space-y-8 relative transition-all duration-1000 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-14"
        }`}
      >
        {/* Top & Bottom Subtle Lines */}
        <div className="absolute top-3 inset-x-6 h-[1px] bg-gradient-to-r from-transparent via-[#e5d9c8] to-transparent pointer-events-none" />
        <div className="absolute bottom-3 inset-x-6 h-[1px] bg-gradient-to-r from-transparent via-[#e5d9c8] to-transparent pointer-events-none" />

        {/* ── MONTH & YEAR TITLE IN CHAMPAGNE GOLD ── */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 pt-1">
          <div className="h-[1px] w-6 sm:w-12 bg-gradient-to-r from-transparent via-[#8b6c42] to-[#8b6c42]" />
          <h2
            className={`${playfairDisplay.className} text-2xl sm:text-3xl md:text-4xl text-[#8b6c42] tracking-wider font-bold whitespace-nowrap drop-shadow-sm`}
          >
            {monthYearLabel}
          </h2>
          <div className="h-[1px] w-6 sm:w-12 bg-gradient-to-l from-transparent via-[#8b6c42] to-[#8b6c42]" />
        </div>

        {/* ── CONDENSED WEEKLY CALENDAR (SINGLE ROW) ── */}
        <div className="w-full mx-auto px-1 sm:px-2">
          {/* Days of Week Header */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-4 pb-3 border-b border-[#e5d9c8] text-center">
            {daysOfWeek.map((day) => (
              <span
                key={day}
                className={`${montserrat.className} text-sm sm:text-base font-bold text-[#785c37] tracking-wider uppercase`}
              >
                {day}
              </span>
            ))}
          </div>

          {/* Single 7-Day Row */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center items-center justify-center pt-2 pb-6">
            {weekDays.map((item, index) => {
              return (
                <div
                  key={index}
                  className="h-11 sm:h-14 flex items-center justify-center relative"
                >
                  {item.isTargetDay ? (
                    <div className="relative flex items-center justify-center w-11 h-11 sm:w-14 sm:h-14">
                      {/* Encircled Heart Balloon SVG Icon in Champagne Gold */}
                      <svg
                        className={`absolute -top-4 -left-4 w-19 h-22 sm:w-22 sm:h-28 text-[#aa8657] pointer-events-none overflow-visible drop-shadow-[0_4px_12px_rgba(170,134,87,0.35)] transition-all duration-1000 ease-out delay-500 ${
                          isVisible
                            ? "opacity-100 translate-y-0 scale-100"
                            : "opacity-0 translate-y-12 scale-75"
                        }`}
                        viewBox="0 0 100 115"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {/* Heart outline */}
                        <path d="M 50,32 C 38,10 10,22 18,48 C 24,72 50,88 50,88 C 50,88 76,72 82,48 C 90,22 62,10 50,32 Z" />
                        {/* Balloon String Tail */}
                        <path
                          d="M 50,88 Q 45,98 52,108"
                          strokeWidth="2.2"
                          strokeDasharray="3 2"
                          opacity="0.85"
                        />
                      </svg>
                      <span
                        className={`${playfairDisplay.className} relative z-10 text-xl sm:text-3xl font-bold text-[#8b6c42] drop-shadow-sm`}
                      >
                        {item.dayNumber}
                      </span>
                    </div>
                  ) : (
                    <span
                      className={`${playfairDisplay.className} text-xl sm:text-3xl text-[#3a2d24] font-bold hover:text-[#8b6c42] transition-colors`}
                    >
                      {item.dayNumber}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}









