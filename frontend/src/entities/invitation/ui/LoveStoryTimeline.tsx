import { FadeIn } from "@/shared/ui/FadeIn";
import { SectionHeading } from "./SectionHeading";
import { LoveStoryTimelineItem } from "../model/types";

interface LoveStoryTimelineProps {
  timeline?: LoveStoryTimelineItem[];
}

export function LoveStoryTimeline({ timeline }: LoveStoryTimelineProps) {
  if (!timeline || timeline.length === 0) return null;

  return (
    <section className="py-20 px-4 max-w-2xl mx-auto">
      <FadeIn>
        <SectionHeading en="Love Story" vi="Chuyện tình của chúng mình" />
      </FadeIn>
      <div className="relative space-y-0">
        {/* Timeline line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2" style={{ backgroundColor: "rgba(201,130,142,0.25)" }} />
        {timeline.map((item, i) => {
          const side = i % 2 === 0 ? "left" : "right";
          return (
            <FadeIn key={`${item.year}-${i}`} delay={i * 100} className={`relative flex ${side === "right" ? "flex-row-reverse" : "flex-row"} items-center gap-0 pb-12`}>
              <div className="w-1/2 px-6">
                <div className={`bg-white rounded-2xl overflow-hidden shadow-md border ${side === "right" ? "mr-auto" : "ml-auto"}`} style={{ borderColor: "rgba(201,130,142,0.2)", maxWidth: 260 }}>
                  {item.imageUrl && <img src={item.imageUrl} alt={item.title} className="w-full h-36 object-cover" />}
                  <div className="p-4">
                    <p className="text-xs font-medium mb-1" style={{ color: "#c9828e", fontFamily: "'EB Garamond', serif" }}>{item.year}</p>
                    <h4 className="text-base mb-1.5" style={{ fontFamily: "'EB Garamond', serif", color: "#2c1810" }}>{item.title}</h4>
                    <p className="text-xs leading-relaxed" style={{ color: "#7a5c4f" }}>{item.description}</p>
                  </div>
                </div>
              </div>
              {/* Dot */}
              <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 bg-white" style={{ borderColor: "#c9828e" }} />
              <div className="w-1/2" />
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}
