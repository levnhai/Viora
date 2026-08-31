import { FadeIn } from "@/shared/ui/FadeIn";
import { SectionHeading } from "@/entities/invitation/ui/SectionHeading";
import { LoveStoryTimelineItem } from "@/entities/invitation/model/types";

interface SimpleListProps {
  data: LoveStoryTimelineItem[];
}

export function SimpleList({ data }: SimpleListProps) {
  return (
    <section className="py-20 px-4 max-w-xl mx-auto">
      <FadeIn>
        <SectionHeading en="Our Story" vi="Chuyện tình yêu" />
      </FadeIn>
      <div className="space-y-8 mt-10">
        {data.map((item, i) => (
          <FadeIn key={i} className="flex gap-6 text-left items-start">
            <div
              className="text-lg font-bold tracking-wider font-mono shrink-0 py-1"
              style={{ color: "var(--primary, #db2777)" }}
            >
              {item.year}
            </div>
            <div className="space-y-1.5 border-l border-stone-200 pl-6 relative">
              <div
                className="absolute left-[-4.5px] top-3 w-2 h-2 rounded-full"
                style={{ backgroundColor: "var(--primary, #db2777)" }}
              />
              <h4
                className="text-base font-semibold"
                style={{
                  fontFamily: "var(--font-heading, sans-serif)",
                  color: "var(--text-color, #292724)",
                }}
              >
                {item.title}
              </h4>
              <p className="text-xs text-stone-500 leading-relaxed">
                {item.description}
              </p>
              {item.imageUrl && (
                <div className="pt-2">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="max-w-xs rounded-xl shadow-xs object-cover max-h-40"
                  />
                </div>
              )}
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
