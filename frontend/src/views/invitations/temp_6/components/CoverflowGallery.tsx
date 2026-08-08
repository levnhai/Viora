import { useState, useRef, useEffect } from "react";
import { GsapReveal } from "@/shared/ui/GsapReveal";
import { WeddingData } from "@/entities/invitation/model/types";
import { ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react";

interface CoverflowGalleryProps {
  weddingData: WeddingData;
}

export function CoverflowGallery({ weddingData }: CoverflowGalleryProps) {
  const { galleryImages, coverImageUrl } = weddingData;

  const fallbackPhotos = [
    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80&w=800",
  ];

  const imagesList =
    galleryImages && galleryImages.length > 0
      ? galleryImages
      : coverImageUrl
        ? [coverImageUrl, ...fallbackPhotos]
        : fallbackPhotos;

  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    touchStartX.current = clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent | React.MouseEvent) => {
    if (touchStartX.current === null) return;
    const clientX =
      "changedTouches" in e ? e.changedTouches[0].clientX : e.clientX;
    const diff = clientX - touchStartX.current;
    if (Math.abs(diff) > 40) {
      if (diff < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % imagesList.length);
  };

  const handlePrev = () => {
    setActiveIndex(
      (prev) => (prev - 1 + imagesList.length) % imagesList.length,
    );
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex !== null) {
        if (e.key === "Escape") setLightboxIndex(null);
        if (e.key === "ArrowLeft")
          setLightboxIndex(
            (prev) => (prev! - 1 + imagesList.length) % imagesList.length,
          );
        if (e.key === "ArrowRight")
          setLightboxIndex((prev) => (prev! + 1) % imagesList.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, imagesList.length]);

  return (
    <section className="relative py-12 px-4 select-none z-20 overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;1,400&family=Playfair+Display:ital,wght@0,600;1,400&display=swap');

        .font-serif-title {
          font-family: "Playfair Display", "Cormorant Garamond", serif;
        }
      `}</style>

      {/* Header */}
      <GsapReveal direction="up" distance={30}>
        <div className="flex flex-col items-center mb-6">
          <h2 className="font-serif-title tracking-[0.25em] text-lg sm:text-xl md:text-2xl font-bold uppercase text-[#540c14] text-center">
            ALBUM ẢNH
          </h2>
          <div className="w-12 h-[1.5px] bg-gradient-to-r from-transparent via-[#540c14] to-transparent opacity-40 mt-2" />
        </div>
      </GsapReveal>

      {/* 3D Coverflow Stage */}
      <GsapReveal direction="up" distance={40} delay={0.1}>
        <div
          className="relative w-full max-w-2xl mx-auto h-[360px] sm:h-[430px] md:h-[480px] flex items-center justify-center overflow-visible"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleTouchStart}
          onMouseUp={handleTouchEnd}
        >
          {imagesList.map((imgUrl, index) => {
            // Compute relative index offset
            const total = imagesList.length;
            let offset = (index - activeIndex) % total;
            if (offset > total / 2) offset -= total;
            if (offset < -total / 2) offset += total;

            const isActive = offset === 0;
            const isVisible = Math.abs(offset) <= 2;

            if (!isVisible) return null;

            // Calculate 3D transforms based on offset position
            let translateX = "0%";
            let scale = 1;
            let rotateY = "0deg";
            let opacity = 1;
            let zIndex = 30;

            if (offset === 0) {
              translateX = "0%";
              scale = 1;
              rotateY = "0deg";
              opacity = 1;
              zIndex = 30;
            } else if (offset === -1) {
              translateX = "-52%";
              scale = 0.82;
              rotateY = "28deg";
              opacity = 0.85;
              zIndex = 20;
            } else if (offset === 1) {
              translateX = "52%";
              scale = 0.82;
              rotateY = "-28deg";
              opacity = 0.85;
              zIndex = 20;
            } else if (offset === -2) {
              translateX = "-90%";
              scale = 0.66;
              rotateY = "42deg";
              opacity = 0.45;
              zIndex = 10;
            } else if (offset === 2) {
              translateX = "90%";
              scale = 0.66;
              rotateY = "-42deg";
              opacity = 0.45;
              zIndex = 10;
            }

            return (
              <div
                key={index}
                onClick={() => {
                  if (isActive) {
                    setLightboxIndex(index);
                  } else {
                    setActiveIndex(index);
                  }
                }}
                className="absolute w-[62%] sm:w-[54%] aspect-[3/4] rounded-[22px] overflow-hidden cursor-pointer transition-all duration-500 ease-out shadow-[0_20px_45px_rgba(50,8,12,0.3)] bg-white p-1.5 sm:p-2 group"
                style={{
                  transform: `translateX(${translateX}) scale(${scale}) perspective(1000px) rotateY(${rotateY})`,
                  opacity,
                  zIndex,
                }}
              >
                <div className="relative w-full h-full rounded-[16px] overflow-hidden bg-neutral-100">
                  <img
                    src={imgUrl}
                    alt={`Gallery Image ${index + 1}`}
                    loading={index <= 2 ? "eager" : "lazy"}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {isActive && (
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-xs flex items-center justify-center text-[#540c14] shadow-md">
                        <Maximize2 size={18} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Dots (Pill indicators) */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {imagesList.map((_, dotIndex) => (
            <button
              key={dotIndex}
              onClick={() => setActiveIndex(dotIndex)}
              className={`transition-all duration-300 rounded-full ${
                dotIndex === activeIndex
                  ? "w-7 h-2.5 bg-[#540c14]"
                  : "w-2.5 h-2.5 bg-[#540c14]/30 hover:bg-[#540c14]/60"
              }`}
              aria-label={`Go to slide ${dotIndex + 1}`}
            />
          ))}
        </div>
      </GsapReveal>

      {/* Lightbox Full-screen Modal */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 z-50 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
          >
            <X size={28} />
          </button>

          <button
            onClick={() =>
              setLightboxIndex(
                (prev) => (prev! - 1 + imagesList.length) % imagesList.length,
              )
            }
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all"
          >
            <ChevronLeft size={32} />
          </button>

          <div className="relative max-w-4xl max-h-[85vh] aspect-[3/4] sm:aspect-auto flex items-center justify-center overflow-hidden rounded-xl">
            <img
              src={imagesList[lightboxIndex]}
              alt="Lightbox View"
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
            />
          </div>

          <button
            onClick={() =>
              setLightboxIndex((prev) => (prev! + 1) % imagesList.length)
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all"
          >
            <ChevronRight size={32} />
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm font-serif-title tracking-widest">
            {lightboxIndex + 1} / {imagesList.length}
          </div>
        </div>
      )}
    </section>
  );
}
