import { GsapReveal } from "@/shared/ui/GsapReveal";
import { WeddingData } from "@/entities/invitation/model/types";
import {
  Wine,
  Cake,
  Camera,
  Utensils,
  Clock,
} from "lucide-react";

import img_16 from "@/shared/assets/image/flower/img_16.webp";

interface Timeline1Props {
  weddingData: WeddingData;
  primaryColor?: string;
  textColor?: string;
  flowerImage?: string;
}

export function Timeline1({
  weddingData,
  textColor: textColorProp,
  flowerImage,
}: Timeline1Props) {
  const schedule =
    weddingData?.timeline && weddingData.timeline.length > 0
      ? weddingData.timeline
      : [
          { time: "17:00", title: "Đón khách" },
          { time: "18:00", title: "Khai tiệc" },
          { time: "18:30", title: "Nghi thức cưới" },
          { time: "19:00", title: "Cắt bánh & nâng ly" },
          { time: "20:30", title: "Kết thúc tiệc" },
        ];

  if (schedule.length === 0) return null;

  const cardBgColor = textColorProp || "#4e0b12";
  const textLightColor = "#fdfbf6";

  const getIconForEvent = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes("đón") || t.includes("ảnh") || t.includes("chụp"))
      return <Camera strokeWidth={1.5} className="w-5 h-5 text-amber-200/90" />;
    if (
      t.includes("bánh") ||
      t.includes("rượu") ||
      t.includes("ly") ||
      t.includes("nâng")
    )
      return <Wine strokeWidth={1.5} className="w-5 h-5 text-amber-200/90" />;
    if (t.includes("nghi thức") || t.includes("lễ") || t.includes("cưới"))
      return <Cake strokeWidth={1.5} className="w-5 h-5 text-amber-200/90" />;
    if (t.includes("tiệc") || t.includes("khai"))
      return <Utensils strokeWidth={1.5} className="w-5 h-5 text-amber-200/90" />;
    return <Clock strokeWidth={1.5} className="w-5 h-5 text-amber-200/90" />;
  };

  return (
    <section className="py-12 px-4 sm:px-8 relative overflow-visible z-20">
      <div className="max-w-xl mx-auto relative">
        <GsapReveal direction="up" distance={40}>
          <div className="relative">
            {/* Decorative Flower - Right side overlapping card */}
            <div className="absolute -right-16 sm:-right-14 md:-right-16 top-10 sm:top-14 w-28 sm:w-44 md:w-48 z-0 pointer-events-none drop-shadow-2xl opacity-90 sm:opacity-100">
              <img
                src={
                  flowerImage ||
                  (img_16.src || (img_16 as unknown as string))
                }
                alt=""
                className="w-full h-auto"
              />
            </div>

            {/* Outer Dark Card */}
            <div
              className="rounded-[24px] sm:rounded-[32px] py-10 sm:py-12 px-6 sm:px-12 shadow-2xl relative z-10 flex flex-col items-center border border-[#DCE7CF]/25 overflow-hidden"
              style={{
                backgroundColor: cardBgColor?.includes("gradient")
                  ? undefined
                  : cardBgColor,
                background: cardBgColor?.includes("gradient")
                  ? cardBgColor
                  : undefined,
                color: textLightColor,
              }}
            >
              {/* Header */}
              <h2
                className="text-xl sm:text-2xl font-bold uppercase tracking-[0.2em] mb-10 text-center"
                style={{
                  fontFamily: '"Lora", "Times New Roman", serif',
                }}
              >
                LỊCH TRÌNH NGÀY CƯỚI
              </h2>

              <div className="relative w-full mx-auto">
                {/* Vertical Line */}
                <div
                  className="absolute left-[26%] sm:left-[24%] w-[1px] -translate-x-1/2"
                  style={{
                    backgroundColor: textLightColor,
                    opacity: 0.35,
                    top: "0.75rem",
                    bottom: "0.75rem",
                  }}
                />

                <div className="flex flex-col space-y-8 sm:space-y-10">
                  {schedule.map((item: any, i: number) => (
                    <div
                      key={i}
                      className="flex items-center relative z-10 w-full"
                    >
                      {/* Left Side: Icon + Time */}
                      <div className="w-[26%] sm:w-[24%] flex items-center justify-end pr-3 sm:pr-4 relative">
                        <div className="mr-2 sm:mr-3 flex-shrink-0">
                          {getIconForEvent(item.title)}
                        </div>
                        <span
                          className="text-sm sm:text-base font-serif tracking-wider font-normal text-[#fdfbf6]"
                          style={{
                            fontFamily: '"Lora", "Times New Roman", serif',
                            fontVariantNumeric: "lining-nums tabular-nums",
                          }}
                        >
                          {item.time}
                        </span>
                      </div>

                      {/* Center Node Dot */}
                      <div
                        className="absolute left-[26%] sm:left-[24%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full shadow-sm"
                        style={{ backgroundColor: textLightColor }}
                      />

                      {/* Right Side: Title & Description */}
                      <div className="w-[74%] sm:w-[76%] pl-4 sm:pl-6 pr-4 sm:pr-10 flex flex-col justify-center text-left">
                        <span
                          className="text-base sm:text-lg font-serif font-medium leading-snug text-[#fdfbf6]"
                          style={{
                            fontFamily: '"Lora", "Times New Roman", serif',
                          }}
                        >
                          {item.title}
                        </span>
                        {item.description && (
                          <span className="text-xs sm:text-sm font-sans mt-0.5 opacity-80 leading-relaxed">
                            {item.description}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </GsapReveal>
      </div>
    </section>
  );
}
