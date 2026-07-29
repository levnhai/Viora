import { GsapReveal } from "@/shared/ui/GsapReveal";
import { WeddingData } from "@/entities/invitation/model/types";

interface MinimalTimelineProps {
  weddingData: WeddingData;
  primaryColor?: string;
  textColor?: string;
}

export function MinimalTimeline({
  weddingData,
  primaryColor,
  textColor,
}: MinimalTimelineProps) {
  // Remove console.log
  const pColor = textColor || "rgb(225,188,124)";
  const tColor = primaryColor || "rgb(225,188,124)";
  const schedule = weddingData?.timeline || [
    { time: "17:30", title: "Đón khách", description: "" },
    { time: "18:30", title: "Khai tiệc", description: "" },
    { time: "18:45", title: "Rót rượu, cắt bánh", description: "" },
    { time: "19:00", title: "Phục vụ món chính", description: "" },
    { time: "21:00", title: "Kết thúc tiệc", description: "" },
  ];

  return (
    <section className="pb-16 sm:pt-24 sm:pb-32 px-4 relative">
      <div className="max-w-xl mx-auto">
        <GsapReveal direction="up" distance={30}>
          <div className="text-center mb-16 space-y-4">
            <h2
              className="text-2xl uppercase tracking-widest font-serif"
              style={{ color: pColor }}
            >
              THÔNG TIN TIỆC CƯỚI
            </h2>
          </div>
        </GsapReveal>

        <div className="relative">
          {/* Vertical Line */}
          <div
            className="absolute left-[40%] top-2 bottom-2 w-px -translate-x-1/2 opacity-50"
            style={{ backgroundColor: pColor }}
          />

          <div className="space-y-16">
            {schedule.map((item, i) => (
              <GsapReveal
                key={i}
                delay={i * 0.15}
                direction={i % 2 === 0 ? "left" : "right"}
                distance={50}
                className="relative flex items-center justify-center"
              >
                <div className="w-[40%] text-right pr-4 sm:pr-8">
                  <span
                    className="text-base font-serif tracking-widest"
                    style={{ color: pColor }}
                  >
                    {item.time}
                  </span>
                </div>

                {/* Dot */}
                <div
                  className="absolute left-[40%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full ring-4 ring-inherit"
                  style={{ backgroundColor: pColor }}
                />

                <div className="w-[60%] text-left pl-4 sm:pl-8 flex flex-col justify-center">
                  <span
                    className="text-base font-serif leading-tight"
                    style={{ color: pColor }}
                  >
                    {item.title}
                  </span>
                  {item.description && (
                    <span
                      className="text-sm font-sans mt-1 opacity-70"
                      style={{ color: pColor }}
                    >
                      {item.description}
                    </span>
                  )}
                </div>
              </GsapReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
