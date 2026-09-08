import React, { useState, useEffect, useRef } from "react";
import { playfairDisplay, montserrat, greatVibes } from "@/shared/lib/fonts";
import { WeddingData, WeddingEvent } from "@/entities/invitation/model/types";
import {
  getVietnameseLunarDate,
  getVietnameseWeekday,
} from "@/shared/lib/utils/date";

interface WeddingEventCardProps {
  weddingData: WeddingData;
}

interface AnimatedTextLineProps {
  children: React.ReactNode;
  animationType: "slideDown" | "slideUp" | "slideLeft" | "slideRight" | "zoomIn";
  delayMs?: number;
  className?: string;
}

function AnimatedTextLine({
  children,
  animationType,
  delayMs = 0,
  className = "",
}: AnimatedTextLineProps) {
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
        // Chạy từ Trên xuống Dưới
        return isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-8";
      case "slideUp":
        // Chạy từ Dưới lên Trên
        return isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8";
      case "slideLeft":
        // Chạy từ Trái sang Phải
        return isVisible
          ? "opacity-100 translate-x-0"
          : "opacity-0 -translate-x-12";
      case "slideRight":
        // Chạy từ Phải sang Trái
        return isVisible
          ? "opacity-100 translate-x-0"
          : "opacity-0 translate-x-12";
      case "zoomIn":
        // Nẩy từ Trong ra Ngoài (Zoom In)
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

export function WeddingEventCard({ weddingData }: WeddingEventCardProps) {
  // Family Info
  const groomFather = weddingData.groomFatherName;
  const groomMother = weddingData.groomMotherName;
  const brideFather = weddingData.brideFatherName;
  const brideMother = weddingData.brideMotherName;

  // Events list with fallback if empty
  const eventsList: WeddingEvent[] =
    weddingData.events && weddingData.events.length > 0
      ? weddingData.events
      : [
          {
            title: "Bữa Cơm Thân Mật",
            time: "16:00",
            date: weddingData.weddingDate || "2026-12-31",
            locationName: "Tư Gia Nhà Trai",
            address: "Thôn 3 - Xã Yên Xuân - Tỉnh Nghệ An",
          },
          {
            title: "Lễ Tiệc Cưới",
            time: "11:00 AM",
            date: weddingData.weddingDate || "2026-12-31",
            locationName: "Tư Gia Nhà Trai",
            address: "Thôn 3 - Xã Yên Xuân - Tỉnh Nghệ An",
          },
        ];

  return (
    <section className="w-full bg-[#f8f6f0] py-14 sm:py-20 px-4 sm:px-6 flex flex-col items-center justify-center text-center select-none space-y-12 sm:space-y-16 overflow-hidden">
      {/* ── SECTION 1: NHÀ TRAI & NHÀ GÁI FAMILY NAMES ── */}
      <div className="w-full max-w-sm sm:max-w-md mx-auto space-y-8 sm:space-y-10">
        {/* Family Columns Grid */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 border-b border-[#e5d9c8] pb-8 text-[#3a2d24]">
          {/* Nhà Trai - Chạy từ Trái sang Phải */}
          <AnimatedTextLine animationType="slideLeft">
            <div className="space-y-2.5 text-center sm:text-left sm:pl-4 border-r border-[#e5d9c8] pr-2">
              <h4
                className={`${playfairDisplay.className} text-lg sm:text-xl font-bold tracking-[0.15em] text-[#8b6c42] uppercase border-b border-[#e5d9c8] pb-1.5 mb-2`}
              >
                NHÀ TRAI
              </h4>
              {groomFather && groomFather.trim() ? (
                <p
                  className={`${montserrat.className} text-sm sm:text-base text-[#3a2d24] font-medium leading-relaxed`}
                >
                  Bố: <span className="font-bold text-[#231b15]">{groomFather}</span>
                </p>
              ) : null}
              {groomMother && groomMother.trim() ? (
                <p
                  className={`${montserrat.className} text-sm sm:text-base text-[#3a2d24] font-medium leading-relaxed`}
                >
                  Mẹ: <span className="font-bold text-[#231b15]">{groomMother}</span>
                </p>
              ) : null}
            </div>
          </AnimatedTextLine>

          {/* Nhà Gái - Chạy từ Phải sang Trái */}
          <AnimatedTextLine animationType="slideRight">
            <div className="space-y-2.5 text-center sm:text-right sm:pr-4 pl-2">
              <h4
                className={`${playfairDisplay.className} text-lg sm:text-xl font-bold tracking-[0.15em] text-[#8b6c42] uppercase border-b border-[#e5d9c8] pb-1.5 mb-2`}
              >
                NHÀ GÁI
              </h4>
              {brideFather && brideFather.trim() ? (
                <p
                  className={`${montserrat.className} text-sm sm:text-base text-[#3a2d24] font-medium leading-relaxed`}
                >
                  Bố: <span className="font-bold text-[#231b15]">{brideFather}</span>
                </p>
              ) : null}
              {brideMother && brideMother.trim() ? (
                <p
                  className={`${montserrat.className} text-sm sm:text-base text-[#3a2d24] font-medium leading-relaxed`}
                >
                  Mẹ: <span className="font-bold text-[#231b15]">{brideMother}</span>
                </p>
              ) : null}
            </div>
          </AnimatedTextLine>
        </div>

        {/* Invitation Text & Couple Names Header */}
        <div className="space-y-4 pt-2">
          <AnimatedTextLine animationType="slideDown">
            <p
              className={`${montserrat.className} text-xs sm:text-sm text-[#785c37] font-bold tracking-[0.18em] uppercase leading-relaxed max-w-xs mx-auto`}
            >
              TRÂN TRỌNG KÍNH MỜI QUÝ KHÁCH
              <br />
              ĐẾN DỰ VÀ CHIA SẺ NIỀM VUI
            </p>
          </AnimatedTextLine>

          {/* Flowing Calligraphic Couple Names */}
          <div className="pt-2 pb-4 space-y-1">
            <AnimatedTextLine animationType="slideLeft" delayMs={100}>
              <h2 className="font-wedding-script text-5xl sm:text-7xl text-[#8b6c42] font-normal tracking-wide drop-shadow-[0_2px_10px_rgba(139,108,66,0.15)] leading-snug">
                {weddingData.groomName}
              </h2>
            </AnimatedTextLine>
            <AnimatedTextLine animationType="zoomIn" delayMs={200}>
              <div className="text-2xl sm:text-4xl italic font-serif text-[#aa8657] font-normal my-1">
                &amp;
              </div>
            </AnimatedTextLine>
            <AnimatedTextLine animationType="slideRight" delayMs={300}>
              <h2 className="font-wedding-script text-5xl sm:text-7xl text-[#8b6c42] font-normal tracking-wide drop-shadow-[0_2px_10px_rgba(139,108,66,0.15)] leading-snug">
                {weddingData.brideName}
              </h2>
            </AnimatedTextLine>
          </div>
        </div>
      </div>

      {/* ── SECTION 2: EVENT DETAILS CARDS (ANIMATION TỪNG DÒNG CHỮ) ── */}
      <div className="w-full max-w-sm sm:max-w-md mx-auto space-y-8 sm:space-y-10">
        {eventsList.map((event, index) => {
          const eventDateObj = new Date(event.date || weddingData.weddingDate || "2026-12-31");
          const validEventDate = isNaN(eventDateObj.getTime())
            ? new Date("2026-12-31")
            : eventDateObj;

          const dayNum = String(validEventDate.getDate()).padStart(2, "0");
          const monthNum = String(validEventDate.getMonth() + 1).padStart(2, "0");
          const yearNum = validEventDate.getFullYear();

          const weekdayStr = getVietnameseWeekday(validEventDate.toISOString());
          const lunarStr = getVietnameseLunarDate(validEventDate.toISOString());

          return (
            <div
              key={index}
              className="bg-[#fffdfa] rounded-3xl p-6 sm:p-9 border border-[#e5d9c8] shadow-[0_12px_45px_rgba(139,108,66,0.08)] space-y-6 sm:space-y-7 relative overflow-hidden"
            >
              {/* Inner Delicate Line */}
              <div className="absolute inset-3 border border-[#f2ebe1] rounded-2xl pointer-events-none" />

              {/* DÒNG 1: Tiêu Đề Sự Kiện (Chạy từ Trên xuống Dưới) */}
              <div className="space-y-2 pt-1">
                <AnimatedTextLine animationType="slideDown">
                  <h3
                    className={`${playfairDisplay.className} text-2xl sm:text-3xl font-bold tracking-[0.18em] text-[#8b6c42] uppercase drop-shadow-sm`}
                  >
                    {event.title}
                  </h3>
                </AnimatedTextLine>

                {/* DÒNG 2: Thời Gian & Thứ (Chạy từ Trái sang Phải) */}
                <AnimatedTextLine animationType="slideLeft" delayMs={150}>
                  <p
                    className={`${montserrat.className} text-xs sm:text-sm font-bold tracking-wider text-[#785c37] uppercase`}
                  >
                    ĐƯỢC TỔ CHỨC VÀO LÚC {event.time}, {weekdayStr}
                  </p>
                </AnimatedTextLine>
              </div>

              {/* ── DÒNG 3: Khối 3 Cột Ngày Tháng (Chạy Trái - Giữa Zoom - Phải) ── */}
              <div className="grid grid-cols-3 items-center justify-center py-4 border-y border-[#e5d9c8] gap-2">
                {/* Tháng - Chạy từ Trái sang */}
                <AnimatedTextLine animationType="slideLeft" delayMs={200}>
                  <div className="text-right border-r border-[#e5d9c8] pr-3 sm:pr-4">
                    <span
                      className={`${playfairDisplay.className} text-base sm:text-xl text-[#8b6c42] font-semibold block whitespace-nowrap`}
                    >
                      Tháng {monthNum}
                    </span>
                  </div>
                </AnimatedTextLine>

                {/* Số Ngày - Zoom In từ Trong ra ngoài */}
                <AnimatedTextLine animationType="zoomIn" delayMs={300}>
                  <div className="text-center px-1">
                    <span
                      className={`${playfairDisplay.className} text-4xl sm:text-6xl text-[#8b6c42] font-bold block leading-none drop-shadow-sm`}
                    >
                      {dayNum}
                    </span>
                  </div>
                </AnimatedTextLine>

                {/* Năm - Chạy từ Phải sang */}
                <AnimatedTextLine animationType="slideRight" delayMs={200}>
                  <div className="text-left border-l border-[#e5d9c8] pl-3 sm:pl-4">
                    <span
                      className={`${playfairDisplay.className} text-base sm:text-xl text-[#8b6c42] font-semibold block whitespace-nowrap`}
                    >
                      Năm {yearNum}
                    </span>
                  </div>
                </AnimatedTextLine>
              </div>

              {/* DÒNG 4: Ngày Âm Lịch (Chạy từ Dưới lên Trên) */}
              {lunarStr && (
                <AnimatedTextLine animationType="slideUp" delayMs={250}>
                  <p
                    className={`${montserrat.className} text-xs sm:text-sm text-[#785c37] italic font-semibold`}
                  >
                    {lunarStr}
                  </p>
                </AnimatedTextLine>
              )}

              {/* DÒNG 5 & 6: Tên Địa Điểm & Địa Chỉ (Chạy từ Phải sang Trái và Dưới lên) */}
              <div className="space-y-2 pt-1">
                <AnimatedTextLine animationType="slideRight" delayMs={300}>
                  <h4
                    className={`${playfairDisplay.className} text-base sm:text-lg font-bold text-[#8b6c42] tracking-wider uppercase`}
                  >
                    TẠI {event.locationName.toUpperCase()}
                  </h4>
                </AnimatedTextLine>

                <AnimatedTextLine animationType="slideUp" delayMs={350}>
                  <p
                    className={`${montserrat.className} text-xs sm:text-sm text-[#3a2d24] font-medium leading-relaxed max-w-xs mx-auto`}
                  >
                    {event.address}
                  </p>
                </AnimatedTextLine>
              </div>

              {/* DÒNG 7: Nút Chỉ Đường (Nẩy nhẹ từ Trong ra Ngoài) */}
              <AnimatedTextLine animationType="zoomIn" delayMs={400}>
                <div className="pt-2">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      `${event.locationName} ${event.address}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#f4ebe1] hover:bg-[#e9ded2] text-[#6b4f36] text-xs sm:text-sm font-bold tracking-widest uppercase transition-all shadow-sm hover:shadow border border-[#dccdc0]"
                  >
                    <span>📍</span> CHỈ ĐƯỜNG
                  </a>
                </div>
              </AnimatedTextLine>
            </div>
          );
        })}
      </div>
    </section>
  );
}







