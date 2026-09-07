import { WeddingData } from "@/entities/invitation/model/types";
import { AnimateView } from "@/widgets/invitation-blocks";

interface ThankYouSectionProps {
  weddingData: WeddingData;
}

export function ThankYouSection({ weddingData }: ThankYouSectionProps) {
  const { galleryImages, coverImage, groomName, brideName } = weddingData;

  const closingImage =
    (galleryImages && galleryImages.length > 2
      ? galleryImages[galleryImages.length - 1]
      : null) ||
    coverImage ||
    "https://cdn.taothiep.com/wedding-user-assets/images/cmp2snpce001501myev2iysu3/7eadee5c-052f-48a0-95e7-21585ca210fb.webp?crop=0,586,1366,997&zoom=1";

  return (
    <footer className="relative w-full overflow-hidden bg-black text-white">
      {/* 1. Background Image with Dark Overlay (y=4933, w: 430, h: 314) */}
      <div className="relative w-full aspect-[430/320] overflow-hidden">
        <img
          src={closingImage}
          alt="Thank you"
          className="w-full h-full object-cover object-center pointer-events-none"
        />

        {/* Gradient Overlay (y=5062) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.65) 50%, rgba(0, 0, 0, 0.9) 100%)",
          }}
        />

        {/* Content Container */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 py-6 z-10 select-none">
          {/* Tiêu đề Thank you (y=5061, font Edwardian 38px) */}
          <AnimateView animation="fadeInUp" duration={1}>
            <h2
              className="text-[36px] sm:text-[42px] text-white font-normal leading-tight mb-2 select-none"
              style={{ fontFamily: "'Edwardian', 'Pinyon', cursive" }}
            >
              Thank you
            </h2>
          </AnimateView>

          {/* Lời Cảm Ơn (y=5128, font Lora 14px text-center) */}
          <AnimateView animation="fadeInUp" delay={0.1} duration={1}>
            <p className="font-lora text-[13px] sm:text-[14px] text-white/95 leading-relaxed text-center max-w-[400px] mx-auto">
              Cảm ơn Quý Khách đã dành tình cảm cho gia đình chúng tôi! Sự hiện
              diện của Quý Khách chính là món quà ý nghĩa nhất, gia đình chúng
              tôi vô cùng trân quý khi được cùng Quý Khách chia sẻ niềm hạnh phúc
              trong ngày trọng đại này.
            </p>
          </AnimateView>
        </div>
      </div>
    </footer>
  );
}
