import React, { useState, useEffect, useRef } from "react";
import { playfairDisplay, greatVibes } from "@/shared/lib/fonts";
import { WeddingData } from "@/entities/invitation/model/types";

interface WeddingGalleryProps {
  weddingData: WeddingData;
}

interface AnimatedGalleryItemProps {
  children: React.ReactNode;
  animationType: "fadeUp" | "slideLeft" | "slideRight" | "slideUpLeft" | "slideUpRight";
  delayMs?: number;
  className?: string;
  onClick?: () => void;
}

function AnimatedGalleryItem({
  children,
  animationType,
  delayMs = 0,
  className = "",
  onClick,
}: AnimatedGalleryItemProps) {
  const [isVisible, setIsVisible] = useState(true);
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.12 }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const getAnimationClasses = () => {
    switch (animationType) {
      case "fadeUp":
        return isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-16";
      case "slideLeft":
        // Trượt từ trái sang phải
        return isVisible
          ? "opacity-100 translate-x-0"
          : "opacity-0 -translate-x-20";
      case "slideRight":
        // Trượt từ phải sang trái
        return isVisible
          ? "opacity-100 translate-x-0"
          : "opacity-0 translate-x-20";
      case "slideUpLeft":
        // Trượt từ góc dưới bên trái lên
        return isVisible
          ? "opacity-100 translate-x-0 translate-y-0"
          : "opacity-0 -translate-x-16 translate-y-12";
      case "slideUpRight":
        // Trượt từ góc dưới bên phải lên
        return isVisible
          ? "opacity-100 translate-x-0 translate-y-0"
          : "opacity-0 translate-x-16 translate-y-12";
      default:
        return isVisible ? "opacity-100" : "opacity-0";
    }
  };

  return (
    <div
      ref={itemRef}
      onClick={onClick}
      style={{ transitionDelay: `${delayMs}ms` }}
      className={`transition-all duration-1200 ease-out transform-gpu ${getAnimationClasses()} ${className}`}
    >
      {children}
    </div>
  );
}

export function WeddingGallery({ weddingData }: WeddingGalleryProps) {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  // Fallback high quality wedding photos matching the exact pose & mood in user screenshot
  const defaultImages = [
    "https://i.pinimg.com/736x/d5/65/1d/d5651d80c2672de9c2c8a081746e51e9.jpg", // 1. Large Top Landscape/Wide
    "https://i.pinimg.com/736x/21/58/e7/2158e72798e09f87c95ef3930b8061e8.jpg", // 2. Tall Left Portrait
    "https://i.pinimg.com/736x/95/9b/44/959b441f71f11a43a059d0d347715f21.jpg", // 3. Top Right Small
    "https://i.pinimg.com/736x/01/71/84/017184285b0d04d80a13d73b22b2efbc.jpg", // 4. Bottom Right Small
    "https://i.pinimg.com/736x/6c/ae/2e/6cae2e8e916a048a129d2f6236bdfefd.jpg", // 5. Bottom Left Portrait
    "https://i.pinimg.com/736x/e8/38/54/e838547a46f7c10b427b329c2980c6fb.jpg", // 6. Bottom Right Portrait
  ];

  const galleryImages =
    weddingData.galleryImages && weddingData.galleryImages.length >= 4
      ? weddingData.galleryImages
      : defaultImages;

  // Handle prev/next switching
  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (activeImageIndex !== null) {
      setActiveImageIndex((prev) =>
        prev !== null ? (prev - 1 + galleryImages.length) % galleryImages.length : 0
      );
    }
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (activeImageIndex !== null) {
      setActiveImageIndex((prev) =>
        prev !== null ? (prev + 1) % galleryImages.length : 0
      );
    }
  };

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    if (activeImageIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "Escape") setActiveImageIndex(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeImageIndex, galleryImages.length]);

  // Touch swipe support for mobile
  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
  };

  return (
    <section className="w-full bg-[#f8f6f0] py-12 sm:py-16 px-4 sm:px-6 flex flex-col items-center justify-center text-center select-none overflow-hidden space-y-8">
      {/* ── GALLERY CONTAINER ── */}
      <div className="w-full max-w-sm sm:max-w-md mx-auto bg-[#fffdfa] rounded-3xl p-4 sm:p-6 border border-[#e5d9c8] shadow-[0_12px_45px_rgba(139,108,66,0.08)] space-y-4 sm:space-y-6 relative">
        {/* ── BANNER HEADER "ALBUM of LOVE" (FADE UP) ── */}
        <AnimatedGalleryItem animationType="fadeUp">
          <div className="w-full bg-[#8b6c42] rounded-2xl py-5 sm:py-6 px-4 text-white shadow-sm flex items-center justify-center gap-2">
            <h2
              className={`${playfairDisplay.className} text-2xl sm:text-3xl font-bold tracking-widest uppercase text-[#fffdfa]`}
            >
              ALBUM
            </h2>
            <span
              className={`${greatVibes.className} text-3xl sm:text-4xl text-[#f4ebe1] font-normal lowercase relative -top-1`}
            >
              of
            </span>
            <h2
              className={`${playfairDisplay.className} text-2xl sm:text-3xl font-bold tracking-widest uppercase text-[#fffdfa]`}
            >
              LOVE
            </h2>
          </div>
        </AnimatedGalleryItem>

        {/* ── ASYMMETRIC MASONRY PHOTO GRID (PER-PHOTO SCROLL ANIMATIONS) ── */}
        <div className="space-y-3 sm:space-y-4">
          {/* PHOTO 1: Large Top Landscape / Horizontal Photo (FADE UP FROM BOTTOM) */}
          {galleryImages[0] && (
            <AnimatedGalleryItem animationType="fadeUp" delayMs={100}>
              <div
                onClick={() => setActiveImageIndex(0)}
                className="w-full aspect-[4/3] rounded-xl overflow-hidden p-1.5 bg-white border border-[#eae0d2] shadow-sm cursor-pointer hover:opacity-95 transition-opacity"
              >
                <img
                  src={galleryImages[0]}
                  alt="Wedding Album 1"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </AnimatedGalleryItem>
          )}

          {/* ASYMMETRIC MIDDLE ROW: Tall Left Photo + 2 Small Right Photos Stacked */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 items-stretch">
            {/* PHOTO 2: Tall Left Photo (SLIDE IN FROM LEFT TO RIGHT) */}
            {galleryImages[1] && (
              <AnimatedGalleryItem
                animationType="slideLeft"
                delayMs={150}
                className="h-full"
              >
                <div
                  onClick={() => setActiveImageIndex(1)}
                  className="w-full h-full min-h-[220px] rounded-xl overflow-hidden p-1.5 bg-white border border-[#eae0d2] shadow-sm cursor-pointer hover:opacity-95 transition-opacity"
                >
                  <img
                    src={galleryImages[1]}
                    alt="Wedding Album 2"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </AnimatedGalleryItem>
            )}

            {/* RIGHT COLUMN: 2 Stacked Small Photos (SLIDE IN FROM RIGHT TO LEFT) */}
            <div className="flex flex-col gap-3 sm:gap-4 justify-between">
              {/* PHOTO 3: Top Right Small Photo (SLIDE RIGHT) */}
              {galleryImages[2] && (
                <AnimatedGalleryItem animationType="slideRight" delayMs={200}>
                  <div
                    onClick={() => setActiveImageIndex(2)}
                    className="w-full aspect-[4/3] rounded-xl overflow-hidden p-1.5 bg-white border border-[#eae0d2] shadow-sm cursor-pointer hover:opacity-95 transition-opacity"
                  >
                    <img
                      src={galleryImages[2]}
                      alt="Wedding Album 3"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </AnimatedGalleryItem>
              )}

              {/* PHOTO 4: Bottom Right Small Photo (SLIDE RIGHT WITH DELAY) */}
              {galleryImages[3] && (
                <AnimatedGalleryItem animationType="slideRight" delayMs={350}>
                  <div
                    onClick={() => setActiveImageIndex(3)}
                    className="w-full aspect-[4/3] rounded-xl overflow-hidden p-1.5 bg-white border border-[#eae0d2] shadow-sm cursor-pointer hover:opacity-95 transition-opacity"
                  >
                    <img
                      src={galleryImages[3]}
                      alt="Wedding Album 4"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </AnimatedGalleryItem>
              )}
            </div>
          </div>

          {/* BOTTOM ROW: 2 Equal Portrait Photos */}
          {(galleryImages[4] || galleryImages[5]) && (
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {/* PHOTO 5: Bottom Left Photo (SLIDE UP-LEFT) */}
              {galleryImages[4] && (
                <AnimatedGalleryItem animationType="slideUpLeft" delayMs={150}>
                  <div
                    onClick={() => setActiveImageIndex(4)}
                    className="w-full aspect-[3/4] rounded-xl overflow-hidden p-1.5 bg-white border border-[#eae0d2] shadow-sm cursor-pointer hover:opacity-95 transition-opacity"
                  >
                    <img
                      src={galleryImages[4]}
                      alt="Wedding Album 5"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </AnimatedGalleryItem>
              )}

              {/* PHOTO 6: Bottom Right Photo (SLIDE UP-RIGHT) */}
              {galleryImages[5] && (
                <AnimatedGalleryItem animationType="slideUpRight" delayMs={300}>
                  <div
                    onClick={() => setActiveImageIndex(5)}
                    className="w-full aspect-[3/4] rounded-xl overflow-hidden p-1.5 bg-white border border-[#eae0d2] shadow-sm cursor-pointer hover:opacity-95 transition-opacity"
                  >
                    <img
                      src={galleryImages[5]}
                      alt="Wedding Album 6"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </AnimatedGalleryItem>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── LIGHTBOX FULLSCREEN MODAL ── */}
      {activeImageIndex !== null && (
        <div
          onClick={() => setActiveImageIndex(null)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 select-none animate-fadeIn"
        >
          {/* Close Button */}
          <button
            onClick={() => setActiveImageIndex(null)}
            className="absolute top-4 right-4 text-white/90 hover:text-white text-3xl sm:text-4xl p-3 z-[120] font-light transition-colors"
          >
            ✕
          </button>

          {/* Prev Button */}
          <button
            onClick={handlePrev}
            className="absolute left-2 sm:left-6 text-white text-2xl sm:text-4xl w-11 h-11 sm:w-14 sm:h-14 bg-black/60 hover:bg-black/90 active:scale-95 rounded-full flex items-center justify-center transition-all z-[120] border border-white/20 shadow-lg cursor-pointer"
          >
            ❮
          </button>

          {/* Active Image Frame */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-[88vw] sm:max-w-3xl max-h-[82vh] p-2 bg-white rounded-2xl shadow-2xl overflow-hidden z-[105]"
          >
            <img
              src={galleryImages[activeImageIndex]}
              alt={`Wedding Album Full ${activeImageIndex + 1}`}
              className="max-w-full max-h-[76vh] object-contain rounded-xl mx-auto"
            />
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="absolute right-2 sm:right-6 text-white text-2xl sm:text-4xl w-11 h-11 sm:w-14 sm:h-14 bg-black/60 hover:bg-black/90 active:scale-95 rounded-full flex items-center justify-center transition-all z-[120] border border-white/20 shadow-lg cursor-pointer"
          >
            ❯
          </button>
        </div>
      )}
    </section>
  );
}


