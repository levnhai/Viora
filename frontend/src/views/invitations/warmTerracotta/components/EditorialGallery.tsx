import { useState, useEffect, useRef } from "react";
import { WeddingData } from "@/entities/invitation/model/types";
import { AnimateView } from "@/widgets/invitation-blocks";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

interface EditorialGalleryProps {
  weddingData: WeddingData;
}

export function EditorialGallery({ weddingData }: EditorialGalleryProps) {
  const { galleryImages } = weddingData;
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(
    null
  );

  const defaultImages = [
    "https://cdn.taothiep.com/wedding-user-assets/images/cmp2snpce001501myev2iysu3/29408985-77be-48e0-81c4-c78ef421c7a7.webp?crop=68,664,1242,807&zoom=1.1",
    "https://cdn.taothiep.com/wedding-user-assets/images/cmp2snpce001501myev2iysu3/dd3fd73f-4e43-4eae-a994-0b2880788d7f.webp",
    "https://cdn.taothiep.com/wedding-user-assets/images/cmp2snpce001501myev2iysu3/312fd739-be27-40e4-8c7e-74a3a2a09d4e.webp",
    "https://cdn.taothiep.com/wedding-user-assets/images/cmp2snpce001501myev2iysu3/a2f5509d-8683-4e54-b6b8-604647a7d798.webp",
    "https://cdn.taothiep.com/wedding-user-assets/images/cmp2snpce001501myev2iysu3/323954f8-1f8b-41f8-a3de-69f1694c09de.webp",
    "https://cdn.taothiep.com/wedding-user-assets/images/cmp2snpce001501myev2iysu3/4fb4d918-0452-4ee3-a451-00e467eb3077.webp",
    "https://cdn.taothiep.com/wedding-user-assets/images/cmp2snpce001501myev2iysu3/6cf96863-7e16-44fb-9664-9194906c3ff0.webp",
    "https://cdn.taothiep.com/wedding-user-assets/images/cmp2snpce001501myev2iysu3/0c955dd3-d558-4a53-9338-da83e8b30d42.webp",
  ];

  // Chỉ dùng ảnh mẫu khi hoàn toàn chưa có ảnh nào trong DB (Demo Mode).
  // Khi người dùng đã có ảnh trong DB thì lấy 100% đúng từ DB.
  const hasUserImages = galleryImages && galleryImages.length > 0;
  const images = hasUserImages ? galleryImages : defaultImages;

  const handleOpenLightbox = (index: number) => {
    setActiveLightboxIndex(index % images.length);
  };

  const handleCloseLightbox = () => {
    setActiveLightboxIndex(null);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex - 1 + images.length) % images.length);
    }
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex + 1) % images.length);
    }
  };

  // Hỗ trợ phím Escape, Left, Right
  useEffect(() => {
    if (activeLightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleCloseLightbox();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeLightboxIndex, images.length]);

  // Hỗ trợ vuốt cảm ứng trên thiết bị di động
  const touchStartX = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (diff > 50) handlePrev();
    else if (diff < -50) handleNext();
    touchStartX.current = null;
  };

  return (
    <section className="relative w-full bg-[#2C6E91] text-white pt-10 pb-12 px-4 sm:px-6 md:px-8 overflow-hidden">
      <div className="w-full max-w-2xl mx-auto relative z-10">
        {/* 1. Tiêu đề: GOLDEN HOUR of LOVE */}
        <AnimateView animation="fadeInUp" duration={1}>
          <div className="relative flex items-center justify-center gap-2 mb-3 select-none">
            <h2 className="font-lora text-[26px] sm:text-[32px] md:text-[36px] uppercase text-white font-normal tracking-wide">
              golden hour
            </h2>
            <span
              className="text-[34px] sm:text-[42px] md:text-[48px] text-white font-normal -mt-1"
              style={{ fontFamily: "'Edwardian', 'Pinyon Script', cursive" }}
            >
              of
            </span>
            <h2 className="font-lora text-[26px] sm:text-[32px] md:text-[36px] uppercase text-white font-normal tracking-wide">
              love
            </h2>
          </div>
        </AnimateView>

        {/* 2. Đoạn văn mô tả */}
        <AnimateView animation="fadeInUp" delay={0.1} duration={1}>
          <p className="font-lora text-[13px] sm:text-[14px] md:text-[15px] text-white/95 leading-[1.8] text-justify px-1 sm:px-2 mb-6">
            Mỗi khoảnh khắc bên nhau đều là một mảnh ghép dịu dàng của tình yêu — đong đầy nụ cười, sự chở che và những kỷ niệm ngọt ngào sẽ theo hai chúng mình suốt chặng đường phía trước.
          </p>
        </AnimateView>

        {/* 3. Bộ ảnh Mosaic 8 ảnh chuẩn kích thước */}
        <div className="space-y-3 sm:space-y-4">
          {/* Hàng 1: 1 Ảnh ngang lớn */}
          {images[0] && (
            <AnimateView animation="flipInY" delay={0.15} duration={1}>
              <div
                onClick={() => handleOpenLightbox(0)}
                className="w-full aspect-[400/260] overflow-hidden rounded-none shadow-md cursor-pointer relative group bg-black/20"
              >
                <img
                  src={images[0]}
                  alt="Gallery 1"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <ZoomIn size={26} className="text-white drop-shadow-md" />
                </div>
              </div>
            </AnimateView>
          )}

          {/* Hàng 2: 1 Ảnh dọc cao bên trái + 2 Ảnh nhỏ bên phải */}
          <div className="grid grid-cols-12 gap-2 sm:gap-3 items-stretch">
            {/* Ảnh dọc cao bên trái */}
            {images[1] && (
              <AnimateView
                animation="fadeInRight"
                delay={0.2}
                duration={1}
                className="col-span-7 h-full"
              >
                <div
                  onClick={() => handleOpenLightbox(1)}
                  className="w-full h-full min-h-[260px] sm:min-h-[300px] overflow-hidden rounded-none shadow-md cursor-pointer relative group bg-black/20"
                >
                  <img
                    src={images[1]}
                    alt="Gallery 2"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <ZoomIn size={24} className="text-white drop-shadow-md" />
                  </div>
                </div>
              </AnimateView>
            )}

            {/* 2 Ảnh vuông nhỏ bên phải xếp tầng */}
            <div className="col-span-5 flex flex-col gap-2 sm:gap-3">
              {images[2] && (
                <AnimateView animation="fadeInUp" delay={0.25} duration={1}>
                  <div
                    onClick={() => handleOpenLightbox(2)}
                    className="w-full aspect-[140/190] overflow-hidden rounded-none shadow-md cursor-pointer relative group bg-black/20"
                  >
                    <img
                      src={images[2]}
                      alt="Gallery 3"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <ZoomIn size={20} className="text-white drop-shadow-md" />
                    </div>
                  </div>
                </AnimateView>
              )}

              {images[3] && (
                <AnimateView animation="fadeInDown" delay={0.3} duration={1}>
                  <div
                    onClick={() => handleOpenLightbox(3)}
                    className="w-full aspect-[140/190] overflow-hidden rounded-none shadow-md cursor-pointer relative group bg-black/20"
                  >
                    <img
                      src={images[3]}
                      alt="Gallery 4"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <ZoomIn size={20} className="text-white drop-shadow-md" />
                    </div>
                  </div>
                </AnimateView>
              )}
            </div>
          </div>

          {/* Hàng 3: Cặp 2 ảnh hoặc 1 ảnh mở rộng */}
          {(images[4] || images[5]) && (
            <div className={`grid ${images[5] ? "grid-cols-2" : "grid-cols-1"} gap-2 sm:gap-3`}>
              {images[4] && (
                <AnimateView animation="fadeInRight" delay={0.35} duration={1} className={!images[5] ? "w-full" : ""}>
                  <div
                    onClick={() => handleOpenLightbox(4)}
                    className={`w-full ${!images[5] ? "aspect-[400/260]" : "aspect-[195/285]"} overflow-hidden rounded-none shadow-md cursor-pointer relative group bg-black/20`}
                  >
                    <img
                      src={images[4]}
                      alt="Gallery 5"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <ZoomIn size={22} className="text-white drop-shadow-md" />
                    </div>
                  </div>
                </AnimateView>
              )}

              {images[5] && (
                <AnimateView animation="fadeInLeft" delay={0.35} duration={1}>
                  <div
                    onClick={() => handleOpenLightbox(5)}
                    className="w-full aspect-[195/285] overflow-hidden rounded-none shadow-md cursor-pointer relative group bg-black/20"
                  >
                    <img
                      src={images[5]}
                      alt="Gallery 6"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <ZoomIn size={22} className="text-white drop-shadow-md" />
                    </div>
                  </div>
                </AnimateView>
              )}
            </div>
          )}

          {/* Hàng 4: Cặp 2 ảnh đứng song song (nếu có từ 7 ảnh trở lên) */}
          {(images[6] || images[7]) && (
            <div className={`grid ${images[7] ? "grid-cols-2" : "grid-cols-1"} gap-2 sm:gap-3`}>
              {images[6] && (
                <AnimateView animation="fadeInRight" delay={0.4} duration={1} className={!images[7] ? "w-full" : ""}>
                  <div
                    onClick={() => handleOpenLightbox(6)}
                    className={`w-full ${!images[7] ? "aspect-[400/260]" : "aspect-[195/285]"} overflow-hidden rounded-none shadow-md cursor-pointer relative group bg-black/20`}
                  >
                    <img
                      src={images[6]}
                      alt="Gallery 7"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <ZoomIn size={22} className="text-white drop-shadow-md" />
                    </div>
                  </div>
                </AnimateView>
              )}

              {images[7] && (
                <AnimateView animation="fadeInLeft" delay={0.4} duration={1}>
                  <div
                    onClick={() => handleOpenLightbox(7)}
                    className="w-full aspect-[195/285] overflow-hidden rounded-none shadow-md cursor-pointer relative group bg-black/20"
                  >
                    <img
                      src={images[7]}
                      alt="Gallery 8"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <ZoomIn size={22} className="text-white drop-shadow-md" />
                    </div>
                  </div>
                </AnimateView>
              )}
            </div>
          )}

          {/* Các ảnh bổ sung nếu user upload nhiều hơn 8 ảnh */}
          {images.length > 8 && (
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {images.slice(8).map((img, idx) => (
                <AnimateView key={idx + 8} animation="fadeInUp" delay={0.2} duration={1}>
                  <div
                    onClick={() => handleOpenLightbox(idx + 8)}
                    className="w-full aspect-[195/285] overflow-hidden rounded-none shadow-md cursor-pointer relative group bg-black/20"
                  >
                    <img
                      src={img}
                      alt={`Gallery ${idx + 9}`}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <ZoomIn size={22} className="text-white drop-shadow-md" />
                    </div>
                  </div>
                </AnimateView>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeLightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 select-none animate-in fade-in duration-200"
          onClick={handleCloseLightbox}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button
            onClick={handleCloseLightbox}
            className="absolute top-5 right-5 z-20 text-white/80 hover:text-white p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-all cursor-pointer"
            aria-label="Đóng"
          >
            <X size={24} />
          </button>

          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all cursor-pointer"
            aria-label="Ảnh trước"
          >
            <ChevronLeft size={28} />
          </button>

          <div
            className="relative max-w-2xl max-h-[85vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[activeLightboxIndex]}
              alt={`Zoom view ${activeLightboxIndex + 1}`}
              className="max-w-full max-h-[85vh] object-contain shadow-2xl rounded-sm"
            />
            <div className="absolute bottom-[-32px] inset-x-0 text-center text-xs text-white/80 font-mono tracking-wider">
              {activeLightboxIndex + 1} / {images.length}
            </div>
          </div>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all cursor-pointer"
            aria-label="Ảnh sau"
          >
            <ChevronRight size={28} />
          </button>
        </div>
      )}
    </section>
  );
}

