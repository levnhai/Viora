import { useState } from "react";
import { ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react";

interface GraduationGalleryProps {
  galleryImages: string[];
  graduateName: string;
}

const DEFAULT_GALLERY_IMAGES = [
  "https://res.cloudinary.com/dynrs5wzt/image/upload/v1790438581/6bbbe3d9-ca16-4207-b2c6-d1f613aeb21e_gqnn4k.jpg",
  "https://res.cloudinary.com/dynrs5wzt/image/upload/v1790440270/423da089-11dc-4713-9038-96d658461368_urzzj7.jpg",
  "https://res.cloudinary.com/dynrs5wzt/image/upload/v1790438582/ad294fb9-613c-4d33-a2fd-ddae72523e7f_unos5e.jpg",
];

export function GraduationGallery({
  galleryImages,
  graduateName,
}: GraduationGalleryProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const images =
    galleryImages && galleryImages.length > 0
      ? galleryImages
      : DEFAULT_GALLERY_IMAGES;

  const currentImgSrc = images[currentIdx % images.length];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div id="SECTION24" className="ladi-section">
      <div className="ladi-section-background"></div>
      <div className="ladi-container">
        <div id="BOX86" className="ladi-element">
          <div className="ladi-box"></div>
        </div>

        {/* Gallery Slider */}
        <div id="GROUP202" className="ladi-element" style={{ zIndex: 10 }}>
          <div className="ladi-group">
            {/* Frame background */}
            <div id="IMAGE259" className="ladi-element" style={{ zIndex: 1 }}>
              <div className="ladi-image">
                <div className="ladi-image-background"></div>
              </div>
            </div>

            {/* Main Photo Gallery (zIndex 15 to ensure photo renders above solid IMAGE259 center) */}
            <div id="GALLERY4" className="ladi-element" style={{ zIndex: 15 }}>
              <div className="ladi-gallery ladi-gallery-bottom" style={{ overflow: "visible", height: "100%" }}>
                <div
                  className="ladi-gallery-view"
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    cursor: "pointer",
                    overflow: "hidden",
                    borderRadius: "4px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.12)",
                    zIndex: 15,
                  }}
                  onClick={() => setLightboxOpen(true)}
                >
                  {/* Left Arrow */}
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous image"
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center backdrop-blur-sm shadow-md border border-white/20 cursor-pointer button-pop-hover"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  {/* Right Arrow */}
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next image"
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center backdrop-blur-sm shadow-md border border-white/20 cursor-pointer button-pop-hover"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  {/* Expand / Maximize Hint Button */}
                  <div className="absolute top-2 right-2 z-30 w-7 h-7 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-sm shadow button-pop-hover">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>

                  {/* Gallery Image */}
                  <div
                    className="ladi-gallery-view-item selected overflow-hidden bg-slate-900/10"
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "block",
                      position: "relative",
                      zIndex: 15,
                    }}
                  >
                    {/* Blurred background to fill empty spaces gracefully */}
                    <img
                      src={currentImgSrc}
                      alt=""
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        filter: "blur(12px)",
                        opacity: 0.35,
                        transform: "scale(1.1)",
                        pointerEvents: "none",
                        zIndex: 14,
                      }}
                    />
                    {/* Main image with objectFit contain so no people are cropped on the sides */}
                    <img
                      key={currentIdx}
                      src={currentImgSrc}
                      alt={`Album photo ${currentIdx + 1}`}
                      className="animate-ken-burns"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        objectPosition: "center",
                        display: "block",
                        position: "relative",
                        zIndex: 15,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Wax Seal Bow at top of frame */}
            <div
              className="animate-float-breathe"
              style={{
                position: "absolute",
                top: "-14px",
                left: "calc(50% - 24px)",
                width: "48px",
                height: "48px",
                zIndex: 25,
                pointerEvents: "none",
              }}
            >
              <img
                src="https://w.ladicdn.com/s450x450/69b247cf4f6ddc0012f0ce55/elements-thiep-16-20260723042420-yfzqc.png"
                alt="Wax Seal Bow"
                style={{ width: "100%", height: "100%", objectFit: "contain", filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))" }}
              />
            </div>
          </div>
        </div>

        <div id="IMAGE260" className="ladi-element">
          <div className="ladi-image">
            <div className="ladi-image-background"></div>
          </div>
        </div>
        <div id="IMAGE275" className="ladi-element">
          <div className="ladi-image">
            <div className="ladi-image-background"></div>
          </div>
        </div>
        <div id="IMAGE276" className="ladi-element">
          <div className="ladi-image">
            <div className="ladi-image-background"></div>
          </div>
        </div>
        <div id="IMAGE277" className="ladi-element">
          <div className="ladi-image">
            <div className="ladi-image-background"></div>
          </div>
        </div>
        <div id="HEADLINE344" className="ladi-element">
          <h3 className="ladi-headline">of granduate</h3>
        </div>
        <div id="HEADLINE343" className="ladi-element">
          <h3 className="ladi-headline">ALBUM</h3>
        </div>
      </div>

      {/* Lightbox Fullscreen Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[99999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 transition-all"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxOpen(false);
            }}
            className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev Button */}
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all cursor-pointer"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          {/* Next Button */}
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all cursor-pointer"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          {/* Image Container */}
          <div
            className="relative max-w-4xl max-h-[85vh] w-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={currentImgSrc}
              alt={`Full view ${currentIdx + 1}`}
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
            />
            <div className="mt-3 text-white/80 font-hastegi text-sm tracking-widest uppercase">
              {currentIdx + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

