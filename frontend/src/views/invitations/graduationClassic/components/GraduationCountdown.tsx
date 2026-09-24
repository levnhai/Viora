import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

interface GraduationCountdownProps {
  targetDate?: string;
}

export function GraduationCountdown({
  targetDate = "2026-07-26T09:00:00",
}: GraduationCountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(targetDate).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const items = [
    { label: "NGÀY", value: timeLeft.days },
    { label: "GIỜ", value: timeLeft.hours },
    { label: "PHÚT", value: timeLeft.minutes },
    { label: "GIÂY", value: timeLeft.seconds },
  ];

  return (
    <section className="w-full px-4 sm:px-6 py-6 flex flex-col items-center">
      <div className="w-full max-w-[420px] bg-gradient-to-br from-[#0b2046] via-[#102a5c] to-[#071328] rounded-2xl p-6 sm:p-7 shadow-xl border border-[#d4af37]/40 text-center text-[#f7e096] relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-center gap-1.5 text-xs font-sans uppercase tracking-[0.3em] text-[#d4af37] font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>COUNTDOWN</span>
          <Sparkles className="w-3.5 h-3.5" />
        </div>

        <h3 className="text-lg sm:text-xl font-serif font-bold text-white mb-5">
          Cùng Đếm Ngược Đến Giờ G
        </h3>

        {/* 4 Counter Boxes */}
        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-md rounded-xl py-3 px-1 border border-[#d4af37]/30 shadow-inner"
            >
              <span className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-white tracking-tight">
                {String(item.value).padStart(2, "0")}
              </span>
              <span className="text-[10px] sm:text-[11px] font-sans font-semibold uppercase tracking-wider text-[#d4af37] mt-1">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
