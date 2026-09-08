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

interface TimelineWoodProps {
  weddingData: WeddingData;
  primaryColor?: string;
  textColor?: string;
  flowerImage?: string;
}

export function TimelineWood({
  weddingData,
  flowerImage,
}: TimelineWoodProps) {
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

  const getIconForEvent = (title: string) => {
    const t = title.toLowerCase();
    const iconClass = "w-5 h-5 text-[#e7bf78]";
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

  return (
    <section className="py-12 px-2 sm:px-8 relative overflow-visible z-20">
      <style>{`
        @keyframes gold-shine-sweep {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .gold-shine-text {
          background: linear-gradient(
            90deg,
            #ffffff 0%,
            #fef0d2 25%,
            #e7bf78 50%,
            #fef0d2 75%,
            #ffffff 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: gold-shine-sweep 5s linear infinite;
        }
        @keyframes border-breathe {
          0%, 100% {
            border-color: rgba(231, 191, 120, 0.35);
            box-shadow: 0 25px 60px rgba(91, 45, 24, 0.4);
          }
          50% {
            border-color: rgba(244, 215, 157, 0.65);
            box-shadow: 0 25px 65px rgba(213, 169, 77, 0.25);
          }
        }
        .card-breathe {
          animation: border-breathe 4s ease-in-out infinite;
        }
        @keyframes sway-slow {
          0%, 100% { transform: rotate(0deg) translateY(0px); }
          50% { transform: rotate(2deg) translateY(-4px); }
        }
        .animate-sway-slow {
          animation: sway-slow 6s ease-in-out infinite;
        }
      `}</style>
      <div className="max-w-xl mx-auto relative">
        <div className="relative">
          {/* Decorative Flower - Right side overlapping dark card */}
          <div className="absolute -right-16 sm:-right-14 md:-right-16 top-10 sm:top-14 w-28 sm:w-44 md:w-48 z-0 pointer-events-none drop-shadow-2xl opacity-90 sm:opacity-100 animate-sway-slow">
            <img
              src={
                flowerImage ||
                (img_16.src || (img_16 as unknown as string))
              }
              alt=""
              className="w-full h-auto"
            />
          </div>

          {/* Main Dark Rosewood Card */}
          <div className="relative z-10 py-10 sm:py-14 px-6 sm:px-12 flex flex-col items-center overflow-hidden rounded-[24px] sm:rounded-[32px] bg-[linear-gradient(155deg,#5b2d18_0%,#3c1f10_55%,#21120b_100%)] text-[#fff1cf] shadow-[0_25px_60px_rgba(91,45,24,0.4)] border border-[#e7bf78]/40 card-breathe">
            {/* Header */}
            <h2
              className="text-xl sm:text-2xl font-bold uppercase tracking-[0.2em] mb-10 text-center relative z-10 text-[#fcd34d] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
              style={{
                fontFamily: '"Lora", "Times New Roman", serif',
              }}
            >
              LỊCH TRÌNH NGÀY CƯỚI
            </h2>

            <div className="relative w-full mx-auto z-10">
              {/* Vertical Line */}
              <div
                className="absolute left-[26%] sm:left-[24%] w-[1px] -translate-x-1/2 bg-[#e7bf78]/40"
                style={{
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
                          className="text-sm sm:text-base font-serif tracking-wider font-normal text-[#fff1cf]"
                          style={{
                            fontFamily: '"Lora", "Times New Roman", serif',
                            fontVariantNumeric: "lining-nums tabular-nums",
                          }}
                        >
                          {item.time}
                        </span>
                      </div>

                      {/* Center Node Dot */}
                      <div className="absolute left-[26%] sm:left-[24%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full shadow-sm bg-[#e7bf78] flex items-center justify-center">
                        <span
                          className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e7bf78] opacity-75"
                          style={{ animationDuration: "2.4s" }}
                        />
                      </div>

                      {/* Right Side: Title & Description */}
                      <div className="w-[74%] sm:w-[76%] pl-4 sm:pl-6 pr-4 sm:pr-10 flex flex-col justify-center text-left">
                        <h4
                          className="text-sm sm:text-base font-bold font-serif leading-tight mb-1 text-[#fff1cf]"
                          style={{
                            fontFamily: '"Lora", "Times New Roman", serif',
                          }}
                        >
                          {item.title}
                        </h4>
                        {item.description && (
                          <p
                            className="text-xs font-serif leading-relaxed opacity-85 text-[#fff1cf]"
                            style={{
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
