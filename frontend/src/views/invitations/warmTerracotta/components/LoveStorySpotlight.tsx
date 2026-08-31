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

  return (
    <section className="relative w-full bg-white text-[#844C3A] pt-10 pb-8 px-3 overflow-hidden">
      <div className="max-w-[430px] mx-auto">
        {/* 1. Tiêu đề câu chuyện tình yêu (y=745, font Luxurious 48px #844C3A) */}
        <AnimateView animation="fadeInUp" duration={1.2}>
          <h2
            className="text-[36px] sm:text-[44px] text-[#844C3A] font-normal leading-tight text-center mb-3 select-none"
            style={{ fontFamily: "'Luxurious', 'Playfair Display', serif" }}
          >
            Hai Trái Tim, Một Hành Trình
          </h2>
        </AnimateView>

        {/* 2. Đoạn văn giới thiệu (y=800, font Lora 14px text-justify line-height 1.8) */}
        <AnimateView animation="fadeInUp" delay={0.15} duration={1}>
          <p className="font-lora text-[13px] sm:text-[14px] text-[#844C3A]/90 leading-[1.8] text-justify px-2 mb-8">
            {defaultStory}
          </p>
        </AnimateView>

        {/* 3. Bố Cục Chân Dung So Le Dích Dắc Độc Đáo */}
        <div className="space-y-4">
          {/* Hàng 1: [Ảnh Cô Dâu Trái 210x310] + [Chữ Cô Dâu Phải] */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 items-center">
            {/* Ảnh Cô Dâu (Trái) */}
            <AnimateView animation="fadeInLeft" delay={0.2} duration={1.2}>
              <div className="w-full aspect-[210/310] overflow-hidden rounded-none shadow-md bg-stone-100">
                <img
                  src={defaultBrideImg}
                  alt={brideName || "Cô dâu"}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </AnimateView>

            {/* Chữ Cô Dâu & Tên (Phải) */}
            <AnimateView animation="fadeInRight" delay={0.25} duration={1.2}>
              <div className="flex flex-col items-center justify-center text-center p-2">
                <span className="font-lora text-[18px] sm:text-[20px] uppercase font-semibold text-[#844C3A] tracking-wider mb-1">
                  Cô dâu
                </span>
                <h3
                  className="text-[32px] sm:text-[40px] text-[#844C3A] font-normal leading-tight capitalize"
                  style={{ fontFamily: "'Edwardian', 'Pinyon', cursive" }}
                >
                  {brideName || "Bích Ngọc"}
                </h3>
              </div>
            </AnimateView>
          </div>

          {/* Hàng 2: [Chữ Chú Rể Trái] + [Ảnh Chú Rể Phải 210x310] */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 items-center">
            {/* Chữ Chú Rể & Tên (Trái) */}
            <AnimateView animation="fadeInLeft" delay={0.3} duration={1.2}>
              <div className="flex flex-col items-center justify-center text-center p-2">
                <span className="font-lora text-[18px] sm:text-[20px] uppercase font-semibold text-[#844C3A] tracking-wider mb-1">
                  Chú rể
                </span>
                <h3
                  className="text-[32px] sm:text-[40px] text-[#844C3A] font-normal leading-tight capitalize"
                  style={{ fontFamily: "'Edwardian', 'Pinyon', cursive" }}
                >
                  {groomName || "Tuấn Anh"}
                </h3>
              </div>
            </AnimateView>

            {/* Ảnh Chú Rể (Phải) */}
            <AnimateView animation="fadeInRight" delay={0.35} duration={1.2}>
              <div className="w-full aspect-[210/310] overflow-hidden rounded-none shadow-md bg-stone-100">
                <img
                  src={defaultGroomImg}
                  alt={groomName || "Chú rể"}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </AnimateView>
          </div>
        </div>
      </div>
    </section>
  );
}
