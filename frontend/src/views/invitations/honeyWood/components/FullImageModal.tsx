import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface FullImageModalProps {
  images: string[];
  initialIndex?: number;
  onClose: () => void;
}

export function FullImageModal({
  images,
  initialIndex = 0,
  onClose,
}: FullImageModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [mounted, setMounted] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [images.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 40) {
      if (diff < 0) handleNext();
      else handlePrev();
    }
    touchStartX.current = null;
  };

  if (!mounted || images.length === 0) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-xl flex flex-col justify-between items-center p-3 sm:p-6 w-screen h-screen overflow-hidden select-none"
      onClick={onClose}
    >
      {/* Top Header Bar */}
      <div
        className="w-full flex items-center justify-between z-50 px-2 sm:px-6 pt-2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-white/80 font-mono text-sm sm:text-base font-medium tracking-widest bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-md border border-white/10">
          {currentIndex + 1} / {images.length}
        </div>
        <button
          onClick={onClose}
          className="text-white/80 hover:text-white p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 transition-all cursor-pointer border border-white/10 shadow-lg"
          aria-label="Close modal"
        >
          <X size={26} />
        </button>
      </div>

      {/* Main Image View Container */}
      <div
        className="relative w-full flex-1 flex items-center justify-center my-2 overflow-hidden px-4"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Navigation Arrow Left */}
        {images.length > 1 && (
          <button
            onClick={handlePrev}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-50 p-2.5 sm:p-3.5 rounded-full bg-black/50 hover:bg-black/80 text-white/90 hover:text-white transition-all hover:scale-110 active:scale-95 cursor-pointer border border-white/20 shadow-2xl backdrop-blur-md"
            aria-label="Previous photo"
          >
            <ChevronLeft size={30} />
          </button>
        )}

        {/* Display Active Image */}
        <div className="relative max-w-full max-h-[75vh] sm:max-h-[82vh] flex items-center justify-center">
          <img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`Wedding Photo ${currentIndex + 1}`}
            className="max-w-full max-h-[75vh] sm:max-h-[82vh] object-contain rounded-lg sm:rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] transition-all duration-300"
          />
        </div>

        {/* Navigation Arrow Right */}
        {images.length > 1 && (
          <button
            onClick={handleNext}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-50 p-2.5 sm:p-3.5 rounded-full bg-black/50 hover:bg-black/80 text-white/90 hover:text-white transition-all hover:scale-110 active:scale-95 cursor-pointer border border-white/20 shadow-2xl backdrop-blur-md"
            aria-label="Next photo"
          >
            <ChevronRight size={30} />
          </button>
        )}
      </div>

      {/* Bottom Thumbnails Navigation */}
      {images.length > 1 && (
        <div
          className="w-full max-w-xl flex items-center justify-center gap-2 overflow-x-auto py-2 px-4 z-50 no-scrollbar"
          onClick={(e) => e.stopPropagation()}
        >
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative flex-shrink-0 w-12 h-14 sm:w-14 sm:h-16 rounded-md overflow-hidden transition-all duration-200 cursor-pointer border-2 ${
                idx === currentIndex
                  ? "border-[#e7bf78] scale-105 shadow-[0_0_12px_rgba(231,191,120,0.6)]"
                  : "border-transparent opacity-50 hover:opacity-100"
              }`}
            >
              <img
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>,
    document.body
  );
}
