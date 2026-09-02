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
    "https://cdn.taothiep.com/wedding-user-assets/images/cmp2snpce001501myev2iysu3/c6882be2-c87c-4b5c-8fbc-7d3b6a39f674.webp";

  return (
    <footer className="relative w-full overflow-hidden bg-black text-white">
      {/* 1. Background Image with Dark Overlay (y=4721, w: 430, h: 314) */}
      <div className="relative w-full aspect-[430/320] overflow-hidden">
        <img
          src={closingImage}
          alt="Thank you"
          className="w-full h-full object-cover object-center pointer-events-none"
        />

        {/* Gradient Overlay từ y=4820 (h=215px) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.65) 50%, rgba(0, 0, 0, 0.9) 100%)",
          }}
        />

        {/* Content Container */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 py-6 z-10 select-none">
          {/* Tiêu đề Thank you (y=4835.5, font Monsieur La Doulaise 36px) */}
          <AnimateView animation="fadeInUp" duration={1}>
            <h2
              className="text-[34px] sm:text-[38px] text-white font-normal leading-tight mb-2 select-none"
              style={{ fontFamily: "'Monsieur La Doulaise', cursive" }}
            >
              Thank you
            </h2>
          </AnimateView>

          {/* Lời Cảm Ơn (y=4890, font Lora 14px text-center) */}
          <AnimateView animation="fadeInUp" delay={0.1} duration={1}>
            <p className="font-lora text-[13px] sm:text-[14px] text-white leading-relaxed text-center max-w-[400px] mx-auto">
              Cảm ơn Quý Khách đã dành tình cảm cho gia đình chúng tôi! Sự hiện
              diện của Quý Khách chính là món quà ý nghĩa nhất, gia đình chúng
              tôi vô cùng trân quý khi được cùng Quý Khách chia sẻ niềm hạnh phúc
              trong ngày trọng đại này.
            </p>
          </AnimateView>
        </div>
      </div>

      {/* 2. Chân Trang Footer Bar */}
      <div className="bg-black py-3 px-4 text-center border-t border-white/10 text-[12px] font-sans text-white/70">
        <p> {groomName || "Tuấn Anh"} &amp; {brideName || "Bích Ngọc"}</p>
      </div>
    </footer>
  );
}


