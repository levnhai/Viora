import { GsapReveal } from "@/shared/ui/GsapReveal";
import { WeddingData } from "@/entities/invitation/model/types";
import {
  Wine,
  Cake,
  Camera,
  Utensils,
  Clock,
} from "lucide-react";

import img_5 from "@/shared/assets/image/flower/img_5.webp";
import img_16 from "@/shared/assets/image/flower/img_16.webp";
import bgPaper from "@/shared/assets/image/paper/paper1.webp";

interface Timeline1Props {
  weddingData: WeddingData;
  primaryColor?: string;
  textColor?: string;
  flowerImage?: string;
  paperBg?: boolean;
}

export function Timeline1({
  weddingData,
  textColor: textColorProp,
  flowerImage,
  paperBg,
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

  const isPaper = Boolean(paperBg || textColorProp === "#7c6a60");
  const cardBgColor = textColorProp || "#4e0b12";
  const mainTextColor = isPaper ? "rgb(124, 106, 96)" : "#fdfbf6";
  const img5Src = typeof img_5 === "string" ? img_5 : (img_5 as any)?.src || "";

  const getIconForEvent = (title: string) => {
    const t = title.toLowerCase();
    const iconClass = `w-5 h-5 ${isPaper ? "text-[#7c6a60]" : "text-amber-200/90"}`;
    if (t.includes("đón") || t.includes("ảnh") || t.includes("chụp"))
      return <Camera strokeWidth={1.5} className={iconClass} />;
    if (
      t.includes("bánh") ||
      t.includes("rượu") ||
      t.includes("ly") ||
      t.includes("nâng")
    )
      return <Wine strokeWidth={1.5} className={iconClass} />;
    if (t.includes("nghi thức") || t.includes("lễ") || t.includes("cưới"))
      return <Cake strokeWidth={1.5} className={iconClass} />;
    if (t.includes("tiệc") || t.includes("khai"))
      return <Utensils strokeWidth={1.5} className={iconClass} />;
    return <Clock strokeWidth={1.5} className={iconClass} />;
  };

  if (isPaper) {
    return (
      <section
        className="relative pt-12 pb-20 px-4 sm:px-8 mx-4 sm:mx-8 overflow-hidden z-20 my-8 bg-center bg-repeat rounded-md shadow-sm"
        style={{
          backgroundColor: "rgb(246, 234, 221)",
          backgroundImage: `url(${bgPaper.src})`,
          backgroundBlendMode: "multiply",
        }}
      >
        {/* Decorative Leaves - Left */}
        <div
          className="absolute top-[15%] -left-[45px] w-[180px] opacity-25 pointer-events-none drop-shadow-md z-0"
          style={{ transform: "rotate(15deg)" }}
        >
          <img src={img5Src} alt="" className="w-full h-auto" />
        </div>

        {/* Decorative Leaves - Right Bottom */}
        <div
          className="absolute bottom-[-10%] -right-[45px] w-[180px] opacity-35 pointer-events-none drop-shadow-md z-0"
          style={{ transform: "rotate(44deg) scaleX(-1)" }}
        >
          <img src={img5Src} alt="" className="w-full h-auto" />
        </div>

        <div className="max-w-xl mx-auto relative z-10 flex flex-col items-center">
          <GsapReveal direction="up" distance={40} className="w-full flex flex-col items-center">
            {/* Header */}
            <h2
              className="text-xl sm:text-2xl font-bold uppercase tracking-widest mb-10 text-center"
              style={{
                color: mainTextColor,
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
                  backgroundColor: mainTextColor,
                  opacity: 0.35,
                  top: "0.75rem",
                  bottom: "0.75rem",
                }}
              />

              <div className="flex flex-col space-y-8 sm:space-y-10">
                {schedule.map((item: any, i: number) => (
                  <GsapReveal
                    key={i}
                    direction="up"
                    distance={20}
                    delay={0.1 + i * 0.12}
                    duration={0.8}
                    className="w-full"
                  >
                    <div className="flex items-center relative z-10 w-full">
                      {/* Left Side: Icon + Time */}
                      <div className="w-[26%] sm:w-[24%] flex items-center justify-end pr-3 sm:pr-4 relative">
                        <div className="mr-2 sm:mr-3 flex-shrink-0">
                          {getIconForEvent(item.title)}
                        </div>
                        <span
                          className="text-sm sm:text-base font-serif tracking-wider font-normal"
                          style={{
                            color: mainTextColor,
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
                        style={{ backgroundColor: mainTextColor }}
                      />

                      {/* Right Side: Title & Description */}
                      <div className="w-[74%] sm:w-[76%] pl-4 sm:pl-6 pr-4 sm:pr-10 flex flex-col justify-center text-left">
                        <h4
                          className="text-sm sm:text-base font-bold font-serif leading-tight mb-1"
                          style={{
                            color: mainTextColor,
                            fontFamily: '"Lora", "Times New Roman", serif',
                          }}
                        >
                          {item.title}
                        </h4>
                        {item.description && (
                          <p
                            className="text-xs font-serif leading-relaxed opacity-85"
                            style={{
                              color: mainTextColor,
                              fontFamily: '"Lora", "Times New Roman", serif',
                            }}
                          >
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </GsapReveal>
                ))}
              </div>
            </div>
          </GsapReveal>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 px-2 sm:px-8 relative overflow-visible z-20">
      <div className="max-w-xl mx-auto relative">
        <div className="relative">
          {/* Decorative Flower - Right side overlapping dark card for minimal-do/xanh */}
            {!isPaper && (
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
            )}

            {/* Outer Card */}
            <div
              className={`py-10 sm:py-14 px-6 sm:px-12 relative z-10 flex flex-col items-center overflow-hidden ${
                isPaper
                  ? "rounded-2xl sm:rounded-3xl shadow-[0_12px_36px_-8px_rgba(124,106,96,0.25)] border border-[#7c6a60]/30 bg-center bg-repeat"
                  : "rounded-[24px] sm:rounded-[32px] shadow-2xl border border-[#DCE7CF]/25 bg-center bg-repeat"
              }`}
              style={
                isPaper
                  ? {
                      backgroundColor: "rgb(236, 218, 199)",
                      backgroundImage: `url(${bgPaper.src})`,
                      backgroundBlendMode: "multiply",
                      color: mainTextColor,
                    }
                  : {
                      background: cardBgColor?.includes("gradient")
                        ? cardBgColor
                        : undefined,
                      backgroundColor: cardBgColor?.includes("gradient")
                        ? undefined
                        : cardBgColor,
                      color: mainTextColor,
                    }
              }
            >
              {/* Decorative Leaves for Paper Theme */}
              {isPaper && (
                <>
                  <div
                    className="absolute top-[15%] -left-[45px] w-[170px] opacity-25 pointer-events-none drop-shadow-md z-0"
                    style={{ transform: "rotate(15deg)" }}
                  >
                    <img src={img5Src} alt="" className="w-full h-auto" />
                  </div>
                  <div
                    className="absolute bottom-[-15%] -right-[45px] w-[170px] opacity-35 pointer-events-none drop-shadow-md z-0"
                    style={{ transform: "rotate(44deg) scaleX(-1)" }}
                  >
                    <img src={img5Src} alt="" className="w-full h-auto" />
                  </div>
                </>
              )}

              {/* Header */}
              <h2
                className="text-xl sm:text-2xl font-bold uppercase tracking-[0.2em] mb-10 text-center relative z-10"
                style={{
                  fontFamily: '"Lora", "Times New Roman", serif',
                }}
              >
                LỊCH TRÌNH NGÀY CƯỚI
              </h2>

              <div className="relative w-full mx-auto z-10">
                {/* Vertical Line */}
                <div
                  className="absolute left-[26%] sm:left-[24%] w-[1px] -translate-x-1/2"
                  style={{
                    backgroundColor: mainTextColor,
                    opacity: 0.35,
                    top: "0.75rem",
                    bottom: "0.75rem",
                  }}
                />

                <div className="flex flex-col space-y-8 sm:space-y-10">
                  {schedule.map((item: any, i: number) => (
                    <GsapReveal
                      key={i}
                      direction="up"
                      distance={20}
                      delay={0.1 + i * 0.12}
                      duration={0.8}
                      className="w-full"
                    >
                      <div className="flex items-center relative z-10 w-full">
                        {/* Left Side: Icon + Time */}
                        <div className="w-[26%] sm:w-[24%] flex items-center justify-end pr-3 sm:pr-4 relative">
                          <div className="mr-2 sm:mr-3 flex-shrink-0">
                            {getIconForEvent(item.title)}
                          </div>
                          <span
                            className="text-sm sm:text-base font-serif tracking-wider font-normal"
                            style={{
                              color: mainTextColor,
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
                          style={{ backgroundColor: mainTextColor }}
                        />

                        {/* Right Side: Title & Description */}
                        <div className="w-[74%] sm:w-[76%] pl-4 sm:pl-6 pr-4 sm:pr-10 flex flex-col justify-center text-left">
                          <h4
                            className="text-sm sm:text-base font-bold font-serif leading-tight mb-1"
                            style={{
                              color: mainTextColor,
                              fontFamily: '"Lora", "Times New Roman", serif',
                            }}
                          >
                            {item.title}
                          </h4>
                          {item.description && (
                            <p
                              className="text-xs font-serif leading-relaxed opacity-85"
                              style={{
                                color: mainTextColor,
                                fontFamily: '"Lora", "Times New Roman", serif',
                              }}
                            >
                              {item.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </GsapReveal>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
