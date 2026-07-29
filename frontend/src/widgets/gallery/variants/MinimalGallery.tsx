import { useState, useEffect } from "react";
import { GsapReveal } from "@/shared/ui/GsapReveal";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { WeddingData } from "@/entities/invitation/model/types";

export interface MinimalGalleryProps {
  weddingData: WeddingData;
  primaryColor?: string;
  textColor?: string;
}

export function MinimalGallery({
  weddingData,
  primaryColor,
  textColor,
}: MinimalGalleryProps) {
  const images = weddingData.galleryImages || [];
  if (images.length === 0) return null;

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Close modal on escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    if (selectedIndex !== null) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden"; // Prevent scrolling
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [selectedIndex]);

  const handleNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % images.length);
    }
  };

  const handlePrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
    }
  };

  const displayImages = images.slice(0, 4);
  const remainingCount = images.length - 4;

  const color = textColor || "rgb(225,188,124)";

  return (
    <>
      <section className="sm:py-24 px-4 text-center relative">
        <GsapReveal direction="up" distance={30}>
          <h2
            className="text-2xl mb-12 uppercase tracking-widest font-serif"
            style={{ color }}
          >
            ALBUM ẢNH CƯỚI
          </h2>
        </GsapReveal>

        <GsapReveal
          delay={0.2}
          direction="up"
          distance={40}
          className="max-w-xl mx-auto"
        >
          <div className="grid grid-cols-2 gap-2 sm:gap-4">
            {displayImages.map((src, idx) => {
              const isLast = idx === 3;
              const hasMore = remainingCount > 0;
              return (
                <div
                  key={idx}
                  className="aspect-square relative rounded-2xl overflow-hidden cursor-pointer group"
                  onClick={() => setSelectedIndex(idx)}
                >
                  <img
                    src={src}
                    alt={`Gallery ${idx + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {isLast && hasMore && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center transition-colors group-hover:bg-black/40">
                      <span className="text-white text-3xl font-serif">
                        +{remainingCount}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </GsapReveal>
      </section>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 z-[9999] bg-black flex flex-col justify-between">
          {/* Header */}
          <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-50 bg-gradient-to-b from-black/80 to-transparent">
            <span className="text-white/80 font-serif text-sm">
              {selectedIndex + 1} / {images.length}
            </span>
            <button
              onClick={() => setSelectedIndex(null)}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X size={32} />
            </button>
          </div>

          {/* Main Image View */}
          <div className="flex-1 relative flex items-center justify-center w-full h-full overflow-hidden">
            <img
              src={images[selectedIndex]}
              alt="Selected"
              className="max-w-full max-h-[80vh] object-contain px-12"
            />

            {/* Nav Buttons */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-sm border border-white/20 text-white/70 hover:bg-black/60 transition-all duration-300 hover:scale-110 shadow-lg z-50 group"
              style={
                {
                  "--tw-hover-text-opacity": 1,
                  "--hover-color": color,
                  "--hover-border-color": `${color}99`, // 60% opacity
                  "--hover-shadow-color": `${color}66`, // 40% opacity
                } as any
              }
              onMouseEnter={(e) => {
                e.currentTarget.style.color = color;
                e.currentTarget.style.borderColor = `${color}99`;
                e.currentTarget.style.boxShadow = `0 0 25px ${color}66`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "";
                e.currentTarget.style.borderColor = "";
                e.currentTarget.style.boxShadow = "";
              }}
            >
              <ChevronLeft
                size={28}
                className="group-hover:-translate-x-0.5 transition-transform"
              />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-sm border border-white/20 text-white/70 hover:bg-black/60 transition-all duration-300 hover:scale-110 shadow-lg z-50 group"
              style={
                {
                  "--tw-hover-text-opacity": 1,
                  "--hover-color": color,
                  "--hover-border-color": `${color}99`,
                  "--hover-shadow-color": `${color}66`,
                } as any
              }
              onMouseEnter={(e) => {
                e.currentTarget.style.color = color;
                e.currentTarget.style.borderColor = `${color}99`;
                e.currentTarget.style.boxShadow = `0 0 25px ${color}66`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "";
                e.currentTarget.style.borderColor = "";
                e.currentTarget.style.boxShadow = "";
              }}
            >
              <ChevronRight
                size={28}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </button>
          </div>

          {/* Thumbnails strip */}
          <div className="w-full bg-black/80 p-4 pb-8 overflow-x-auto flex gap-2 justify-center custom-scrollbar">
            {images.map((src, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedIndex(idx)}
                className={`w-16 h-16 rounded-md overflow-hidden flex-shrink-0 cursor-pointer transition-all duration-300 ${
                  idx === selectedIndex
                    ? "opacity-100 scale-110"
                    : "opacity-40 hover:opacity-100"
                }`}
                style={
                  idx === selectedIndex
                    ? { boxShadow: `0 0 0 2px ${color}` }
                    : {}
                }
              >
                <img
                  src={src}
                  className="w-full h-full object-cover"
                  alt={`Thumb ${idx}`}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
