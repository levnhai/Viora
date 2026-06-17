import { FadeIn } from "@/shared/ui/FadeIn";
import { SectionHeading } from "./SectionHeading";

interface GalleryGridProps {
  images?: string[];
}

export function GalleryGrid({ images }: GalleryGridProps) {
  if (!images || images.length === 0) return null;

  return (
    <section className="py-20 px-4 max-w-4xl mx-auto">
      <FadeIn><SectionHeading en="Gallery" vi="Khoảnh khắc của chúng mình" /></FadeIn>
      <FadeIn delay={100}>
        <div className="grid grid-cols-3 gap-3" style={{ gridAutoRows: "180px" }}>
          {images.map((src, i) => {
            const span = i % 3 === 0 ? "row-span-2" : "";
            return (
              <div key={i} className={`overflow-hidden rounded-xl ${span}`} style={{ backgroundColor: "rgba(201,130,142,0.1)" }}>
                <img src={src} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            );
          })}
        </div>
      </FadeIn>
    </section>
  );
}
