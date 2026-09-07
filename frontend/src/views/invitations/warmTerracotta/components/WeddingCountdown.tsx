import { useState, useEffect } from "react";
import { AnimateView } from "@/widgets/invitation-blocks";

interface WeddingCountdownProps {
  weddingDate?: string;
  weddingTime?: string;
}

function parseTargetTimestamp(dateStr?: string, timeStr?: string): number {
  const defaultTs = new Date("2026-12-31T09:30:00").getTime();
  if (!dateStr || !dateStr.trim()) return defaultTs;

  let cleanDate = dateStr.trim();
  if (cleanDate.includes("T")) {
    cleanDate = cleanDate.split("T")[0];
  }

  let hours = 9;
  let minutes = 30;

  if (timeStr && timeStr.trim()) {
    const tStr = timeStr.trim();
    const isPM = /pm/i.test(tStr);
    const isAM = /am/i.test(tStr);
    const match = tStr.match(/(\d{1,2}):(\d{2})/);
    if (match) {
      let h = parseInt(match[1], 10);
      minutes = parseInt(match[2], 10);
      if (isPM && h < 12) h += 12;
      if (isAM && h === 12) h = 0;
      hours = h;
    }
  }

  let year = 2026;
  let month = 12;
  let day = 31;

  if (cleanDate.includes("-")) {
    const parts = cleanDate.split("-").map((p) => parseInt(p, 10));
    if (parts.length === 3 && !parts.some(isNaN)) {
      if (parts[0] > 1000) {
        year = parts[0];
        month = parts[1];
        day = parts[2];
      } else {
        month = parts[0];
        day = parts[1];
        year = parts[2];
      }
    }
  } else if (cleanDate.includes("/")) {
    const parts = cleanDate.split("/").map((p) => parseInt(p, 10));
    if (parts.length === 3 && !parts.some(isNaN)) {
      if (parts[2] > 1000) {
        if (parts[0] > 12) {
          day = parts[0];
          month = parts[1];
          year = parts[2];
        } else {
          month = parts[0];
          day = parts[1];
          year = parts[2];
        }
      } else if (parts[0] > 1000) {
        year = parts[0];
        month = parts[1];
        day = parts[2];
      }
    }
  }

  const d = new Date(year, month - 1, day, hours, minutes, 0);
  const ts = d.getTime();
  return isNaN(ts) ? defaultTs : ts;
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
    const target = parseTargetTimestamp(weddingDate, weddingTime);

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (isNaN(difference) || difference <= 0) {
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
        days: isNaN(d) ? "00" : d.toString().padStart(2, "0"),
        hours: isNaN(h) ? "00" : h.toString().padStart(2, "0"),
        minutes: isNaN(m) ? "00" : m.toString().padStart(2, "0"),
        seconds: isNaN(s) ? "00" : s.toString().padStart(2, "0"),
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [weddingDate, weddingTime]);

  return (
    <section className="relative w-full bg-white text-[#2C6E91] pt-8 pb-10 px-3 text-center overflow-hidden">
      <div className="max-w-[430px] mx-auto">
        {/* 1. Tiêu đề Hẹn Gặp (y=4705, font Luxurious 48px #2C6E91) */}
        <AnimateView animation="zoomIn" duration={1}>
          <h2
            className="text-[34px] sm:text-[44px] text-[#2C6E91] font-normal leading-tight mb-3 select-none"
            style={{ fontFamily: "'Luxurious', 'Playfair Display', serif" }}
          >
            Đừng quên mình có hẹn nhé!
          </h2>
        </AnimateView>

        {/* 2. Dãy số đếm ngược (y=4782, flipInX) & Nhãn (y=4846, zoomIn) */}
        <AnimateView animation="flipInX" delay={0.1} duration={1.2}>
          <div className="flex justify-center items-center gap-4 sm:gap-6 max-w-[320px] mx-auto select-none">
            {/* Ngày */}
            <div className="flex flex-col items-center w-14">
              <span
                className="text-[36px] sm:text-[42px] text-[#2C6E91] leading-none font-normal"
                style={{ fontFamily: "'Alisheia', sans-serif" }}
              >
                {timeLeft.days}
              </span>
              <span className="font-lora text-[13px] sm:text-[14px] text-[#2C6E91] mt-1 font-normal">
                Ngày
              </span>
            </div>

            {/* Giờ */}
            <div className="flex flex-col items-center w-14">
              <span
                className="text-[36px] sm:text-[42px] text-[#2C6E91] leading-none font-normal"
                style={{ fontFamily: "'Alisheia', sans-serif" }}
              >
                {timeLeft.hours}
              </span>
              <span className="font-lora text-[13px] sm:text-[14px] text-[#2C6E91] mt-1 font-normal">
                Giờ
              </span>
            </div>

            {/* Phút */}
            <div className="flex flex-col items-center w-14">
              <span
                className="text-[36px] sm:text-[42px] text-[#2C6E91] leading-none font-normal"
                style={{ fontFamily: "'Alisheia', sans-serif" }}
              >
                {timeLeft.minutes}
              </span>
              <span className="font-lora text-[13px] sm:text-[14px] text-[#2C6E91] mt-1 font-normal">
                Phút
              </span>
            </div>

            {/* Giây */}
            <div className="flex flex-col items-center w-14">
              <span
                className="text-[36px] sm:text-[42px] text-[#2C6E91] leading-none font-normal"
                style={{ fontFamily: "'Alisheia', sans-serif" }}
              >
                {timeLeft.seconds}
              </span>
              <span className="font-lora text-[13px] sm:text-[14px] text-[#2C6E91] mt-1 font-normal">
                Giây
              </span>
            </div>
          </div>
        </AnimateView>
      </div>
    </section>
  );
}
