import { useState, useEffect } from "react";
import Image from "next/image";
import { WeddingData } from "@/entities/invitation/model/types";

interface GraduationTimelineProps {
  weddingData: WeddingData;
  targetDate?: string;
}

export function GraduationTimeline({
  weddingData,
  targetDate = "2026-07-26T09:00:00",
}: GraduationTimelineProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const calculateTime = () => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, "0"),
          hours: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, "0"),
          minutes: String(Math.floor((difference / 1000 / 60) % 60)).padStart(2, "0"),
          seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, "0"),
        });
      } else {
        setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const timelineItems = weddingData.timeline && weddingData.timeline.length > 0
    ? weddingData.timeline
    : [
        { time: "08:00", title: "Làm lễ tốt nghiệp" },
        { time: "08:30", title: "Chụp ảnh kỷ niệm" },
      ];

  const campusPhoto =
    "https://w.ladicdn.com/s800x800/69b247cf4f6ddc0012f0ce55/1784774421245_3379540865962086579_g2668429489759155549_ca94957e804fcaef1c71387635c02dc2-20260723164939-z75d7.jpg";

  const polaroidPhoto =
    "https://w.ladicdn.com/s450x450/69b247cf4f6ddc0012f0ce55/1784774421208_3379540865962086579_g2668429489759155549_a296b5a3fa8d575c9bb0d8e874836f32-20260723163435-0sug9.jpg";

  return (
    <div className="w-full relative h-[765px] flex flex-col justify-between overflow-hidden bg-slate-900">
      {/* 1. Background Campus Photo with Top Light / Bottom Dark Gradient */}
      <div className="absolute inset-0 z-0">
        <Image
          src={campusPhoto}
          alt="Campus Background"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Soft overlay on top for clarity */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* 2. Top Interactive Section: Polaroid Photo (Left) + Pink Parchment Schedule Card (Right) */}
      <div className="relative z-10 w-full pt-10 px-4 flex items-start justify-between">
        {/* Left: Polaroid Frame with -8deg tilt */}
        <div className="relative w-[150px] h-[195px] flex-shrink-0">
          {/* Photo inside */}
          <div className="absolute inset-[10px] bottom-[30px] overflow-hidden rounded-sm transform -rotate-[8deg] z-0">
            <Image
              src={polaroidPhoto}
              alt="Polaroid Memory"
              fill
              sizes="150px"
              className="object-cover"
            />
          </div>
          {/* Authentic Polaroid Frame PNG Overlay */}
          <div className="absolute inset-0 pointer-events-none z-10">
            <Image
              src="https://w.ladicdn.com/s450x550/69b247cf4f6ddc0012f0ce55/thiep-ng-anh-element_0017_8-20251010190009-nhnpd-20260719163851-kns-a.png"
              alt="Polaroid Frame"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Right: Pink Parchment Schedule Card with 7deg tilt */}
        <div className="relative w-[210px] min-h-[220px] flex flex-col items-center justify-center p-4">
          {/* Background Pink Paper Asset */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <Image
              src="https://w.ladicdn.com/s650x650/69b247cf4f6ddc0012f0ce55/elements-thiep-1-20260722103551-xekb2.png"
              alt="Schedule Card Background"
              fill
              className="object-contain"
            />
          </div>

          {/* Schedule Content */}
          <div className="relative z-10 w-full flex flex-col items-center text-center transform rotate-[7deg] pt-2">
            <h3 className="text-[28px] sm:text-[30px] font-hoatay italic text-[#9B343D] leading-tight mb-2">
              Lịch trình
            </h3>

            <div className="flex flex-col gap-3 w-full">
              {timelineItems.map((item, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <span className="text-[16px] font-hastegi font-bold uppercase tracking-wider text-[#9B343D] leading-tight">
                    {item.time}
                  </span>
                  <span className="text-[13px] font-hastegi font-medium text-[#9B343D] leading-snug">
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Countdown Panel with Dark Gradient Background */}
      <div className="relative z-10 w-full pb-8 pt-16 flex flex-col items-center bg-gradient-to-t from-black/80 via-black/50 to-transparent">
        {/* COUNTDOWN Headline in Ergisa Font */}
        <h4 className="text-[33px] font-ergisa tracking-[0.2em] font-normal text-white uppercase text-center mb-3">
          COUNTDOWN
        </h4>

        {/* Countdown Digits Grid */}
        <div className="flex items-center justify-center gap-2 text-white">
          {/* Days */}
          <div className="flex flex-col items-center min-w-[50px]">
            <span className="text-[38px] sm:text-[40px] font-hastegi font-bold leading-none">
              {timeLeft.days}
            </span>
            <span className="text-[11px] font-hastegi uppercase tracking-wider text-white/80 mt-1">
              NGÀY
            </span>
          </div>

          <span className="text-[24px] font-bold self-start mt-1">:</span>

          {/* Hours */}
          <div className="flex flex-col items-center min-w-[50px]">
            <span className="text-[38px] sm:text-[40px] font-hastegi font-bold leading-none">
              {timeLeft.hours}
            </span>
            <span className="text-[11px] font-hastegi uppercase tracking-wider text-white/80 mt-1">
              GIỜ
            </span>
          </div>

          <span className="text-[24px] font-bold self-start mt-1">:</span>

          {/* Minutes */}
          <div className="flex flex-col items-center min-w-[50px]">
            <span className="text-[38px] sm:text-[40px] font-hastegi font-bold leading-none">
              {timeLeft.minutes}
            </span>
            <span className="text-[11px] font-hastegi uppercase tracking-wider text-white/80 mt-1">
              PHÚT
            </span>
          </div>

          <span className="text-[24px] font-bold self-start mt-1">:</span>

          {/* Seconds */}
          <div className="flex flex-col items-center min-w-[50px]">
            <span className="text-[38px] sm:text-[40px] font-hastegi font-bold leading-none">
              {timeLeft.seconds}
            </span>
            <span className="text-[11px] font-hastegi uppercase tracking-wider text-white/80 mt-1">
              GIÂY
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
