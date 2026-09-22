import React, { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { WeddingData } from "@/entities/invitation/model/types";
import { AnimateView } from "@/widgets/invitation-blocks";

interface CoverFlowGalleryProps {
  weddingData: WeddingData;
}

export const CoverFlowGallery: React.FC<CoverFlowGalleryProps> = ({ weddingData }) => {
  const images =
    weddingData.galleryImages && weddingData.galleryImages.length > 0
      ? weddingData.galleryImages
      : [
          "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=800",
          "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800",
          "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800",
          "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&q=80&w=800",
          "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=800",
          "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80&w=800",
          "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=800",
        ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      }
      if (e.key === "ArrowRight") {
        setLightboxIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, images.length]);

  return (
    <div className="relative z-10 flex w-full flex-col items-center px-4 sm:px-6 pt-6 pb-4">
      {/* Tiêu đề */}
      <AnimateView animation="fadeInDown" duration={0.8}>
        <h2
          className="uppercase text-center relative z-10 text-[20px] md:text-[24px] font-bold tracking-wider mb-2"
          style={{
            color: "#ffdfaf",
            fontFamily: '"Times New Roman", "Baskerville", serif',
          }}
        >
          Album Ảnh Cưới
        </h2>
      </AnimateView>

      {/* 3D Cover Flow Carousel Container */}
      <AnimateView animation="zoomIn" duration={0.9} delay={0.15} className="relative z-10 mt-4 w-full max-w-[340px] md:max-w-[560px]">
        <div
          className="relative w-full"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
        <div className="relative h-[320px] sm:h-[360px] md:h-[460px] flex items-center justify-center">
          {/* Nút Điều Hướng Trái (Desktop) */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Ảnh trước"
            className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-[200] w-9 h-9 items-center justify-center rounded-full bg-black/60 hover:bg-black/80 text-[#ffdfaf] transition-all cursor-pointer shadow-lg border border-[#ffdfaf]/30"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Nút Điều Hướng Phải (Desktop) */}
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Ảnh sau"
            className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-[200] w-9 h-9 items-center justify-center rounded-full bg-black/60 hover:bg-black/80 text-[#ffdfaf] transition-all cursor-pointer shadow-lg border border-[#ffdfaf]/30"
          >
            <ChevronRight size={20} />
          </button>

          {/* 3D Stage */}
          <div
            className="relative w-full h-full flex items-center justify-center"
            style={{ perspective: "1000px" }}
          >
            {images.map((img, idx) => {
              // Tính khoảng cách offset so với activeIndex
              let offset = idx - activeIndex;
              if (offset > images.length / 2) offset -= images.length;
              if (offset < -images.length / 2) offset += images.length;

              const isCurrent = offset === 0;
              const absOffset = Math.abs(offset);

              // Ẩn các ảnh quá xa để tối ưu render
              if (absOffset > 3) return null;

              const translateX = offset * 55; // %
              const translateZ = -absOffset * 140; // px
              const rotateY = offset * -40; // deg
              const scale = isCurrent ? 1 : Math.max(0.7, 1 - absOffset * 0.15);
              const opacity = isCurrent ? 1 : Math.max(0.25, 0.9 - absOffset * 0.25);
              const zIndex = 100 - absOffset;

              return (
                <div
                  key={idx}
                  onClick={() => {
                    if (isCurrent) {
                      setLightboxIndex(idx);
                      setLightboxOpen(true);
                    } else {
                      setActiveIndex(idx);
                    }
                  }}
                  className={`absolute h-[90%] rounded-2xl overflow-hidden shadow-2xl cursor-pointer transition-all duration-700 ease-out select-none ${
                    isCurrent
                      ? "ring-2 ring-[#ffdfaf] shadow-[0_15px_35px_rgba(0,0,0,0.7)]"
                      : "hover:opacity-90"
                  }`}
                  style={{
                    aspectRatio: "2 / 3",
                    transform: `translateX(${translateX}%) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                    opacity,
                    zIndex,
                    transformStyle: "preserve-3d",
                  }}
                >
                  <img
                    src={img}
                    alt={`Wedding Photo ${idx + 1}`}
                    className="h-full w-full object-cover pointer-events-none"
                    loading="lazy"
                  />
                  {isCurrent && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

          {/* Indicators / Dots */}
          <div className="flex justify-center items-center gap-1.5 mt-4">
            {images.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIndex(idx)}
                aria-label={`Chuyển tới ảnh ${idx + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  idx === activeIndex
                    ? "w-6 h-1.5 bg-[#ffdfaf]"
                    : "w-1.5 h-1.5 bg-[#ffdfaf]/30 hover:bg-[#ffdfaf]/60"
                }`}
              />
            ))}
          </div>
        </div>
      </AnimateView>

      {/* Lightbox Xem Ảnh Phóng To */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[999] bg-black/90 backdrop-blur-md flex flex-col items-center justify-between p-4 animate-fade-in">
          {/* Header Lightbox */}
          <div className="w-full flex items-center justify-between text-white px-2 py-2 max-w-5xl">
            <span className="text-sm font-medium text-[#ffdfaf]">
              {lightboxIndex + 1} / {images.length}
            </span>
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="p-2 rounded-full hover:bg-white/20 text-[#ffdfaf] transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Ảnh Lớn */}
          <div className="relative flex-1 w-full max-w-4xl flex items-center justify-center p-2 min-h-0">
            <button
              type="button"
              onClick={() =>
                setLightboxIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
              }
              className="absolute left-2 p-3 rounded-full bg-black/50 hover:bg-black/80 text-[#ffdfaf] transition-all z-10"
            >
              <ChevronLeft size={28} />
            </button>

            <img
              src={images[lightboxIndex]}
              alt={`Ảnh cưới ${lightboxIndex + 1}`}
              className="max-h-full max-w-full rounded-xl object-contain shadow-2xl"
            />

            <button
              type="button"
              onClick={() =>
                setLightboxIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
              }
              className="absolute right-2 p-3 rounded-full bg-black/50 hover:bg-black/80 text-[#ffdfaf] transition-all z-10"
            >
              <ChevronRight size={28} />
            </button>
          </div>

          {/* Dải Thumbnail */}
          <div className="flex gap-2 overflow-x-auto max-w-full py-2 px-4 no-scrollbar">
            {images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setLightboxIndex(idx)}
                className={`h-14 w-14 rounded-lg overflow-hidden shrink-0 transition-all ${
                  idx === lightboxIndex
                    ? "ring-2 ring-[#ffdfaf] scale-105"
                    : "opacity-50 hover:opacity-100"
                }`}
              >
                <img src={img} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
