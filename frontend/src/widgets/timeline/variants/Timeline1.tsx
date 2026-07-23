import { GsapReveal } from "@/shared/ui/GsapReveal";
import { WeddingData } from "@/entities/invitation/model/types";
import {
  Wine,
  CakeSlice,
  Utensils,
  HeartHandshake,
  PartyPopper,
} from "lucide-react";

//img
import bgPaper from "@/shared/assets/image/paper/paper1.webp";

interface Timeline1Props {
  weddingData: WeddingData;
  primaryColor?: string;
  textColor?: string;
}

export function Timeline1({ weddingData }: Timeline1Props) {
  const schedule = weddingData?.timeline || [
    { time: "17:00", title: "Đón khách" },
    { time: "18:00", title: "Khai tiệc" },
    { time: "18:30", title: "Nghi thức cưới" },
    { time: "19:00", title: "Cắt bánh & nâng ly" },
    { time: "20:30", title: "Kết thúc tiệc" },
  ];

  if (schedule.length === 0) return null;

  const textColor = "#7c6a60";
  const bgCardColor = "#f4efe6";

  // Helper to assign a Lucide icon based on keywords
  const getIconForEvent = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes("đón") || t.includes("kết thúc")) return null;
    if (t.includes("bánh") || t.includes("rượu") || t.includes("ly"))
      return (
        <Wine strokeWidth={1.5} className="w-[22px] h-[22px] opacity-70" />
      );
    if (t.includes("nghi thức") || t.includes("lễ"))
      return (
        <CakeSlice strokeWidth={1.5} className="w-[22px] h-[22px] opacity-70" />
      );
    if (t.includes("tiệc"))
      return (
        <PartyPopper
          strokeWidth={1.5}
          className="w-[22px] h-[22px] opacity-70"
        />
      );
    return (
      <HeartHandshake
        strokeWidth={1.5}
        className="w-[22px] h-[22px] opacity-70"
      />
    );
  };

  return (
    <section className="px-4 sm:px-8 relative z-20">
      <div className="max-w-xl mx-auto">
        <div
          className="rounded-[16px] p-8 sm:p-12 shadow-sm relative overflow-hidden"
          style={{
            backgroundColor: "rgb(246, 234, 221)",
            backgroundImage: `url(${bgPaper.src})`,
          }}
        >
          {/* Header */}
          <GsapReveal direction="up" distance={30}>
            <h2
              className="text-xl sm:text-2xl font-bold uppercase tracking-[0.15em] mb-12 text-center"
              style={{
                color: textColor,
                fontFamily: '"Lora", "Times New Roman", serif',
              }}
            >
              LỊCH TRÌNH NGÀY CƯỚI
            </h2>
          </GsapReveal>

          <div className="relative max-w-sm mx-auto">
            {/* The vertical line (only spans from the first dot to the last) */}
            <div
              className="absolute left-[40%] sm:left-[35%] w-px -translate-x-1/2"
              style={{
                backgroundColor: textColor,
                opacity: 0.3,
                top: "1.5rem", // roughly offset to the first dot
                bottom: "1.5rem", // roughly offset to the last dot
              }}
            ></div>

            <div className="flex flex-col space-y-12">
              {schedule.map((item, i) => (
                <GsapReveal
                  key={i}
                  delay={i * 0.15}
                  direction="up"
                  distance={30}
                >
                  <div className="flex items-center relative z-10 w-full">
                    {/* Left container (Icon + Time) */}
                    <div className="w-[40%] sm:w-[35%] flex items-center justify-end pr-5 sm:pr-8 relative h-6">
                      {/* Icon placed absolute on the far left of this left-container */}
                      <div
                        className="absolute left-0 top-1/2 -translate-y-1/2"
                        style={{ color: textColor }}
                      >
                        {getIconForEvent(item.title)}
                      </div>

                      {/* Time */}
                      <span
                        className="text-[16px] sm:text-[18px]"
                        style={{
                          color: textColor,
                          fontFamily: '"Lora", "Times New Roman", serif',
                        }}
                      >
                        {item.time}
                      </span>
                    </div>

                    {/* Dot on the line */}
                    <div
                      className="absolute left-[40%] sm:left-[35%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-[8px] h-[8px] rounded-full ring-4 ring-[#f4efe6]"
                      style={{ backgroundColor: textColor }}
                    />

                    {/* Right container (Title) */}
                    <div className="w-[60%] sm:w-[65%] pl-5 sm:pl-8 flex flex-col justify-center">
                      <span
                        className="text-[14px] sm:text-[15px] leading-tight"
                        style={{
                          color: "rgba(124, 106, 96, 0.9)",
                          fontFamily: '"Lora", "Times New Roman", serif',
                        }}
                      >
                        {item.title}
                      </span>
                      {"description" in item && item.description && (
                        <span
                          className="text-[12px] font-sans mt-1 opacity-70"
                          style={{ color: textColor }}
                        >
                          {item.description}
                        </span>
                      )}
                    </div>
                  </div>
                </GsapReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
