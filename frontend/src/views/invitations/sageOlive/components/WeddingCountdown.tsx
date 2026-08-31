import { useState, useEffect } from "react";
import { AnimateView } from "@/widgets/invitation-blocks";

interface WeddingCountdownProps {
  weddingDate?: string;
  weddingTime?: string;
}

export function WeddingCountdown({
  weddingDate,
  weddingTime,
}: WeddingCountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const targetDateStr = weddingDate || "2026-12-26";
    const targetTimeStr = weddingTime || "09:30";
    const target = new Date(`${targetDateStr}T${targetTimeStr}:00`).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
        return;
      }

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        days: d.toString().padStart(2, "0"),
        hours: h.toString().padStart(2, "0"),
        minutes: m.toString().padStart(2, "0"),
        seconds: s.toString().padStart(2, "0"),
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [weddingDate, weddingTime]);

  return (
    <section className="relative w-full bg-white text-[#5D733F] pt-8 pb-10 px-3 text-center overflow-hidden">
      <div className="max-w-[430px] mx-auto">
        {/* 1. Tiêu đề Countdown nghệ thuật (y=4529, font Monsieur La Doulaise 48px #5D733F) */}
        <AnimateView animation="zoomIn" duration={1}>
          <h2
            className="text-[42px] sm:text-[48px] text-[#5D733F] font-normal leading-tight mb-2 select-none"
            style={{ fontFamily: "'Monsieur La Doulaise', cursive" }}
          >
            Countdown
          </h2>
        </AnimateView>

        {/* 2. Dãy số đếm ngược (y=4590, flipInX) & Nhãn Ngày Giờ Phút Giây (y=4654, zoomIn) */}
        <AnimateView animation="flipInX" delay={0.1} duration={1.2}>
          <div className="flex justify-center items-center gap-4 sm:gap-6 max-w-[320px] mx-auto select-none">
            {/* Ngày */}
            <div className="flex flex-col items-center w-14">
              <span
                className="text-[36px] sm:text-[42px] text-[#5D733F] leading-none font-normal"
                style={{ fontFamily: "'Alisheia', sans-serif" }}
              >
                {timeLeft.days}
              </span>
              <span className="font-lora text-[13px] sm:text-[14px] text-[#5D733F] mt-1 font-normal">
                Ngày
              </span>
            </div>

            {/* Giờ */}
            <div className="flex flex-col items-center w-14">
              <span
                className="text-[36px] sm:text-[42px] text-[#5D733F] leading-none font-normal"
                style={{ fontFamily: "'Alisheia', sans-serif" }}
              >
                {timeLeft.hours}
              </span>
              <span className="font-lora text-[13px] sm:text-[14px] text-[#5D733F] mt-1 font-normal">
                Giờ
              </span>
            </div>

            {/* Phút */}
            <div className="flex flex-col items-center w-14">
              <span
                className="text-[36px] sm:text-[42px] text-[#5D733F] leading-none font-normal"
                style={{ fontFamily: "'Alisheia', sans-serif" }}
              >
                {timeLeft.minutes}
              </span>
              <span className="font-lora text-[13px] sm:text-[14px] text-[#5D733F] mt-1 font-normal">
                Phút
              </span>
            </div>

            {/* Giây */}
            <div className="flex flex-col items-center w-14">
              <span
                className="text-[36px] sm:text-[42px] text-[#5D733F] leading-none font-normal"
                style={{ fontFamily: "'Alisheia', sans-serif" }}
              >
                {timeLeft.seconds}
              </span>
              <span className="font-lora text-[13px] sm:text-[14px] text-[#5D733F] mt-1 font-normal">
                Giây
              </span>
            </div>
          </div>
        </AnimateView>
      </div>
    </section>
  );
}


