import { FadeIn } from "@/shared/ui/FadeIn";
import { SectionHeading } from "@/entities/invitation/ui/SectionHeading";

interface NormalGridProps {
  images: string[];
}

export function NormalGrid({ images }: NormalGridProps) {
  return (
    <section className="py-20 px-4 max-w-4xl mx-auto">
      <FadeIn>
        <SectionHeading en="Album" vi="Album Ảnh Cưới" />
      </FadeIn>
      <FadeIn delay={100}>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((src, i) => (
            <div
              key={i}
              className="aspect-square overflow-hidden rounded-xl bg-stone-100 border border-stone-200/50"
            >
              <img
                src={src}
                alt={`Gallery ${i + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
