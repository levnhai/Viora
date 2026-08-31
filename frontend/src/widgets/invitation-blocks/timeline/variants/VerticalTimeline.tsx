import { FadeIn } from "@/shared/ui/FadeIn";
import { SectionHeading } from "@/entities/invitation/ui/SectionHeading";
import { LoveStoryTimelineItem } from "@/entities/invitation/model/types";

interface VerticalTimelineProps {
  data: LoveStoryTimelineItem[];
}

export function VerticalTimeline({ data }: VerticalTimelineProps) {
  return (
    <section className="py-20 px-4 max-w-2xl mx-auto">
      <FadeIn>
        <SectionHeading en="Love Story" vi="Chuyện tình của chúng mình" />
      </FadeIn>
      <div className="relative space-y-0">
        {/* Timeline line - uses theme CSS variable or fallback */}
        <div
          className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
          style={{ backgroundColor: "var(--primary-opacity-25, rgba(201,130,142,0.25))" }}
        />
        {data.map((item, i) => {
          const side = i % 2 === 0 ? "left" : "right";
          return (
            <FadeIn
              key={`${item.year}-${i}`}
              delay={i * 100}
              className={`relative flex ${
                side === "right" ? "flex-row-reverse" : "flex-row"
              } items-center gap-0 pb-12`}
            >
              <div className="w-1/2 px-6">
                <div
                  className={`bg-white rounded-2xl overflow-hidden shadow-md border ${
                    side === "right" ? "mr-auto" : "ml-auto"
                  }`}
                  style={{
                    borderColor: "var(--primary-opacity-20, rgba(201,130,142,0.2))",
                    maxWidth: 260,
                  }}
                >
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-36 object-cover"
                    />
                  )}
                  <div className="p-4 text-left">
                    <p
                      className="text-xs font-medium mb-1"
                      style={{
                        color: "var(--primary, #c9828e)",
                        fontFamily: "var(--font-heading, 'EB Garamond', serif)",
                      }}
                    >
                      {item.year}
                    </p>
                    <h4
                      className="text-base mb-1.5"
                      style={{
                        fontFamily: "var(--font-heading, 'EB Garamond', serif)",
                        color: "var(--text-color, #2c1810)",
                      }}
                    >
                      {item.title}
                    </h4>
                    <p
                      className="text-xs leading-relaxed"
                      style={{ color: "var(--text-muted, #7a5c4f)" }}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
              {/* Dot */}
              <div
                className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 bg-white"
                style={{ borderColor: "var(--primary, #c9828e)" }}
              />
              <div className="w-1/2" />
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}
