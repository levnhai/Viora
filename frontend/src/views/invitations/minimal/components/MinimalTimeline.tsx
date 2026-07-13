import { FadeIn } from "@/shared/ui/FadeIn";
import { WeddingData } from "@/entities/invitation/model/types";

interface MinimalTimelineProps {
  weddingData: WeddingData;
}

export function MinimalTimeline({ weddingData }: MinimalTimelineProps) {
  const timelineSection = weddingData?.sections?.find((s:any) => s.type === 'timeline');
  const schedule = timelineSection?.settings?.timeline || [
    { time: "17:30", title: "Đón khách", description: "" },
    { time: "18:30", title: "Khai tiệc", description: "" },
    { time: "18:45", title: "Rót rượu, cắt bánh", description: "" },
    { time: "19:00", title: "Phục vụ món chính", description: "" },
    { time: "21:00", title: "Kết thúc tiệc", description: "" },
  ];

  return (
    <section className="pt-4 pb-10 sm:pt-8 sm:pb-20 px-4 relative">
      <div className="max-w-xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-2xl text-[rgb(225,188,124)] uppercase tracking-widest font-serif">
              THÔNG TIN TIỆC CƯỚI
            </h2>
          </div>
        </FadeIn>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 top-2 bottom-2 w-px -translate-x-1/2 bg-[rgb(225,188,124)]/50" />

          <div className="space-y-12">
            {schedule.map((item, i) => (
              <FadeIn
                key={i}
                delay={i * 100}
                className="relative flex items-center justify-center"
              >
                <div className="w-1/2 text-right pr-4 sm:pr-8">
                  <span className="text-base font-serif text-[rgb(225,188,124)] tracking-widest">
                    {item.time}
                  </span>
                </div>

                {/* Dot */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[rgb(225,188,124)] ring-4 ring-[rgb(0,26,8)]" />

                <div className="w-1/2 text-left pl-4 sm:pl-8 flex flex-col justify-center">
                  <span className="text-base font-serif text-[rgb(225,188,124)] leading-tight">
                    {item.title}
                  </span>
                  {item.description && (
                    <span className="text-sm font-sans text-[rgb(225,188,124)]/70 mt-1">
                      {item.description}
                    </span>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
