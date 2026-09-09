import { WeddingData } from "@/entities/invitation/model/types";
import { AnimateView } from "@/widgets/invitation-blocks";

interface LoveStorySpotlightProps {
  weddingData: WeddingData;
}

export function LoveStorySpotlight({ weddingData }: LoveStorySpotlightProps) {
  const {
    groomName,
    brideName,
    groomImage,
    brideImage,
    galleryImages,
    story,
    groomTitle,
    brideTitle,
    groomRank,
    brideRank,
    displayOrder,
  } = weddingData;

  const defaultBrideImg =
    brideImage ||
    (galleryImages && galleryImages.length > 1 ? galleryImages[1] : null) ||
    "https://cdn.taothiep.com/wedding-user-assets/images/cmp2snpce001501myev2iysu3/d8e5c156-adc4-4bee-a44e-04293b81dbf6.webp";

  const defaultGroomImg =
    groomImage ||
    (galleryImages && galleryImages.length > 2 ? galleryImages[2] : null) ||
    "https://cdn.taothiep.com/wedding-user-assets/images/cmp2snpce001501myev2iysu3/72a8ebb4-a18c-41da-86da-7b55abb463b2.webp";

  const defaultStory =
    story ||
    "Mỗi câu chuyện tình yêu đều có một khởi đầu riêng, và câu chuyện của chúng mình được viết nên từ những điều giản dị nhất. Qua từng ngày, tình yêu lớn dần theo sự thấu hiểu, sẻ chia và những lời hẹn ước cho tương lai.";

  const isGroomFirst = displayOrder === "groom_first";

  const brideCard = (
    <div key="bride-card" className="grid grid-cols-2 gap-3 sm:gap-6 md:gap-8 items-center">
      {/* Ảnh Cô Dâu (Trái) */}
      <AnimateView animation="fadeInLeft" delay={0.2} duration={1.2}>
        <div className="w-full aspect-[210/310] overflow-hidden rounded-none shadow-md bg-stone-100 group">
          <img
            src={defaultBrideImg}
            alt={brideName || "Cô dâu"}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
          />
        </div>
      </AnimateView>

      {/* Chữ Cô Dâu & Tên (Phải) */}
      <AnimateView animation="fadeInRight" delay={0.25} duration={1.2}>
        <div className="flex flex-col items-center justify-center text-center p-2">
          <span className="font-lora text-[18px] sm:text-[20px] md:text-[22px] uppercase font-semibold text-[#2C6E91] tracking-wider mb-1">
            Cô dâu
          </span>
          <h3
            className="text-[32px] sm:text-[40px] md:text-[46px] text-[#2C6E91] font-normal leading-tight capitalize"
            style={{ fontFamily: "'Edwardian', 'Pinyon Script', cursive" }}
          >
            {brideName || "Bích Ngọc"}
          </h3>
          {(brideTitle || brideRank) && (
            <span className="font-lora text-xs md:text-sm uppercase tracking-wider text-[#2C6E91]/75 mt-1 font-medium">
              ({brideTitle || brideRank})
            </span>
          )}
        </div>
      </AnimateView>
    </div>
  );

  const groomCard = (
    <div key="groom-card" className="grid grid-cols-2 gap-3 sm:gap-6 md:gap-8 items-center">
      {/* Chữ Chú Rể & Tên (Trái) */}
      <AnimateView animation="fadeInLeft" delay={0.3} duration={1.2}>
        <div className="flex flex-col items-center justify-center text-center p-2">
          <span className="font-lora text-[18px] sm:text-[20px] md:text-[22px] uppercase font-semibold text-[#2C6E91] tracking-wider mb-1">
            Chú rể
          </span>
          <h3
            className="text-[32px] sm:text-[40px] md:text-[46px] text-[#2C6E91] font-normal leading-tight capitalize"
            style={{ fontFamily: "'Edwardian', 'Pinyon Script', cursive" }}
          >
            {groomName || "Tuấn Anh"}
          </h3>
          {(groomTitle || groomRank) && (
            <span className="font-lora text-xs md:text-sm uppercase tracking-wider text-[#2C6E91]/75 mt-1 font-medium">
              ({groomTitle || groomRank})
            </span>
          )}
        </div>
      </AnimateView>

      {/* Ảnh Chú Rể (Phải) */}
      <AnimateView animation="fadeInRight" delay={0.35} duration={1.2}>
        <div className="w-full aspect-[210/310] overflow-hidden rounded-none shadow-md bg-stone-100 group">
          <img
            src={defaultGroomImg}
            alt={groomName || "Chú rể"}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
          />
        </div>
      </AnimateView>
    </div>
  );

  return (
    <section className="relative w-full bg-white text-[#2C6E91] pt-10 pb-8 px-4 sm:px-6 md:px-8 overflow-hidden">
      <div className="w-full max-w-2xl mx-auto">
        {/* 1. Tiêu đề câu chuyện tình yêu */}
        <AnimateView animation="fadeInUp" duration={1.2}>
          <h2
            className="text-[36px] sm:text-[44px] md:text-[50px] text-[#2C6E91] font-normal leading-tight text-center mb-3 select-none"
            style={{ fontFamily: "'Luxurious', 'Playfair Display', serif" }}
          >
            Hai Trái Tim, Một Hành Trình
          </h2>
        </AnimateView>

        {/* 2. Đoạn văn giới thiệu */}
        <AnimateView animation="fadeInUp" delay={0.15} duration={1}>
          <p className="font-lora text-[13px] sm:text-[14px] md:text-[15px] text-[#2C6E91]/90 leading-[1.8] text-justify px-2 mb-8">
            {defaultStory}
          </p>
        </AnimateView>

        {/* 3. Bố Cục Chân Dung So Le Dích Dắc Độc Đáo */}
        <div className="space-y-4 sm:space-y-6">
          {isGroomFirst ? [groomCard, brideCard] : [brideCard, groomCard]}
        </div>
      </div>
    </section>
  );
}

