import { useState } from "react";
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

  // Fallback demo photos exactly as in template thiepcuoimau26
  const defaultImages = [
    "https://cdn.taothiep.com/wedding-user-assets/images/cmp2snpce001501myev2iysu3/f9b6ebb8-fac3-43fc-b9a8-a629d401e46d.webp",
    "https://cdn.taothiep.com/wedding-user-assets/images/cmp2snpce001501myev2iysu3/d563a32d-0581-47a3-bd52-4f82897fc856.webp",
    "https://cdn.taothiep.com/wedding-user-assets/images/cmp2snpce001501myev2iysu3/c7ea5c1e-49ea-46f6-8352-26511809a7e9.webp",
    "https://cdn.taothiep.com/wedding-user-assets/images/cmp2snpce001501myev2iysu3/a7e4871f-40bd-4cfa-a053-8df8f10ea70a.webp",
    "https://cdn.taothiep.com/wedding-user-assets/images/cmp2snpce001501myev2iysu3/c7ea5c1e-49ea-46f6-8352-26511809a7e9.webp",
    "https://cdn.taothiep.com/wedding-user-assets/images/cmp2snpce001501myev2iysu3/9a86931b-0820-4023-b975-a48c397d9f3e.webp",
    "https://cdn.taothiep.com/wedding-user-assets/images/cmp2snpce001501myev2iysu3/19a87c7e-8b3c-4262-8059-f9e7b3cb66ec.webp",
    "https://cdn.taothiep.com/wedding-user-assets/images/cmp2snpce001501myev2iysu3/98fc3fc7-4980-4b94-9dcc-0614c038b005.webp",
  ];

  const images =
    galleryImages && galleryImages.length >= 3 ? galleryImages : defaultImages;

  const handleOpenLightbox = (index: number) => {
    setActiveLightboxIndex(index % images.length);
  };

  const handleCloseLightbox = () => {
    setActiveLightboxIndex(null);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex - 1 + images.length) % images.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex + 1) % images.length);
    }
  };

  return (
    <section className="relative w-full bg-[#5D733F] text-white pt-10 pb-12 px-3 overflow-hidden">
      <div className="max-w-[430px] mx-auto relative z-10">
        {/* 1. Tiêu đề: GOLDEN HOUR of LOVE (y=2568 -> y=2584) */}
        <AnimateView animation="fadeInUp" duration={1}>
          <div className="relative flex items-center justify-center gap-2 mb-3 select-none">
            <h2 className="font-lora text-[26px] sm:text-[32px] uppercase text-white font-normal tracking-wide">
              golden hour
            </h2>
            <span
              className="text-[34px] sm:text-[42px] text-white font-normal -mt-1"
              style={{ fontFamily: "'UVN', serif" }}
            >
              of
            </span>
            <h2 className="font-lora text-[26px] sm:text-[32px] uppercase text-white font-normal tracking-wide">
              love
            </h2>
          </div>
        </AnimateView>

        {/* 2. Đoạn văn mô tả (y=2638, font Lora 14px text-justify line-height 1.8) */}
        <AnimateView animation="fadeInUp" delay={0.1} duration={1}>
          <p className="font-lora text-[13px] sm:text-[14px] text-white/95 leading-[1.8] text-justify px-1 sm:px-2 mb-6">
            Our wedding story unfolds through soft moments of love — filled with
            warm smiles, quiet tenderness, and timeless memories that will stay
            in our hearts forever.
          </p>
        </AnimateView>

        {/* 3. Bộ ảnh Mosaic 8 ảnh chuẩn kích thước và animation của mẫu gốc */}
        <div className="space-y-3 sm:space-y-4">
          {/* Hàng 1: 1 Ảnh ngang lớn (flipInY) */}
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
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <ZoomIn size={26} className="text-white drop-shadow-md" />
                </div>
              </div>
            </AnimateView>
          )}

          {/* Hàng 2: 1 Ảnh dọc cao bên trái (fadeInRight) + 2 Ảnh nhỏ bên phải (fadeInUp & fadeInDown) */}
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
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
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
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
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
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <ZoomIn size={20} className="text-white drop-shadow-md" />
                    </div>
                  </div>
                </AnimateView>
              )}
            </div>
          </div>

          {/* Hàng 3: Cặp 2 ảnh đứng song song (fadeInRight + fadeInLeft) */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            {images[4] && (
              <AnimateView animation="fadeInRight" delay={0.35} duration={1}>
                <div
                  onClick={() => handleOpenLightbox(4)}
                  className="w-full aspect-[195/285] overflow-hidden rounded-none shadow-md cursor-pointer relative group bg-black/20"
                >
                  <img
                    src={images[4]}
                    alt="Gallery 5"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
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
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <ZoomIn size={22} className="text-white drop-shadow-md" />
                  </div>
                </div>
              </AnimateView>
            )}
          </div>

          {/* Hàng 4: Cặp 2 ảnh đứng song song (fadeInRight + fadeInLeft) */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            {images[6] && (
              <AnimateView animation="fadeInRight" delay={0.4} duration={1}>
                <div
                  onClick={() => handleOpenLightbox(6)}
                  className="w-full aspect-[195/285] overflow-hidden rounded-none shadow-md cursor-pointer relative group bg-black/20"
                >
                  <img
                    src={images[6]}
                    alt="Gallery 7"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
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
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <ZoomIn size={22} className="text-white drop-shadow-md" />
                  </div>
                </div>
              </AnimateView>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeLightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 select-none animate-in fade-in duration-200"
          onClick={handleCloseLightbox}
        >
          <button
            onClick={handleCloseLightbox}
            className="absolute top-5 right-5 z-20 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
            aria-label="Đóng"
          >
            <X size={24} />
          </button>

          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all"
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
              className="max-w-full max-h-[85vh] object-contain shadow-2xl"
            />
            <div className="absolute bottom-[-32px] inset-x-0 text-center text-xs text-white/70 font-mono">
              {activeLightboxIndex + 1} / {images.length}
            </div>
          </div>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all"
            aria-label="Ảnh sau"
          >
            <ChevronRight size={28} />
          </button>
        </div>
      )}
    </section>
  );
}


