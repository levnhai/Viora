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
      {/* 1. Background Image with Dark Overlay */}
      <div className="relative w-full aspect-[430/340] min-h-[320px] md:min-h-[380px] overflow-hidden">
        <img
          src={closingImage}
          alt="Thank you"
          className="w-full h-full object-cover object-center pointer-events-none"
        />

        {/* Gradient Overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.65) 50%, rgba(0, 0, 0, 0.92) 100%)",
          }}
        />

        {/* Content Container */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 py-6 z-10 select-none">
          {/* Tiêu đề Thank you */}
          <AnimateView animation="fadeInUp" duration={1}>
            <h2
              className="text-[38px] sm:text-[46px] md:text-[52px] text-white font-normal leading-tight mb-2 select-none drop-shadow-md"
              style={{ fontFamily: "'Edwardian', 'Pinyon Script', cursive" }}
            >
              Thank you
            </h2>
          </AnimateView>

          {/* Lời Cảm Ơn */}
          <AnimateView animation="fadeInUp" delay={0.1} duration={1}>
            <p className="font-lora text-[13px] sm:text-[14px] md:text-[15px] text-white/95 leading-relaxed text-center max-w-[380px] sm:max-w-md md:max-w-lg mx-auto px-2">
              Cảm ơn Quý Khách đã dành tình cảm cho gia đình chúng tôi! Sự hiện
              diện của Quý Khách chính là món quà ý nghĩa nhất, gia đình chúng
              tôi vô cùng trân quý khi được cùng Quý Khách chia sẻ niềm hạnh phúc
              trong ngày trọng đại này.
            </p>
          </AnimateView>

          {/* Chữ ký dâu rể */}
          <AnimateView animation="fadeInUp" delay={0.2} duration={1.2}>
            <p
              className="text-[28px] sm:text-[34px] md:text-[38px] text-white/95 leading-tight select-none mt-3 capitalize tracking-wide drop-shadow-md"
              style={{ fontFamily: "'Edwardian', 'Pinyon Script', cursive" }}
            >
              {groomName || "Tuấn Anh"} &amp; {brideName || "Bích Ngọc"}
            </p>
          </AnimateView>
        </div>
      </div>
    </footer>
  );
}

