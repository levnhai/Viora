import { WeddingData } from "@/entities/invitation/model/types";
import { AnimateView } from "@/widgets/invitation-blocks";

interface FamilyCoupleSpotlightProps {
  weddingData: WeddingData;
}

export function FamilyCoupleSpotlight({
  weddingData,
}: FamilyCoupleSpotlightProps) {
  const {
    groomName,
    brideName,
    groomFatherName,
    groomMotherName,
    brideFatherName,
    brideMotherName,
    groomAddress,
    brideAddress,
    groomImage,
    brideImage,
    galleryImages,
  } = weddingData;

  const defaultGroomImg =
    groomImage ||
    (galleryImages && galleryImages.length > 1 ? galleryImages[1] : null) ||
    "https://cdn.taothiep.com/wedding-user-assets/images/cmp2snpce001501myev2iysu3/597bd80f-d5da-4763-bb64-1f0f24df2493.webp";

  const defaultBrideImg =
    brideImage ||
    (galleryImages && galleryImages.length > 2 ? galleryImages[2] : null) ||
    "https://cdn.taothiep.com/wedding-user-assets/images/cmp2snpce001501myev2iysu3/a2de8ee0-be0e-4471-86a4-caa97f6e488b.webp";

  return (
    <section className="relative w-full bg-white text-[#30451c] pt-2 pb-0 overflow-hidden">
      {/* 1. Phần Thông Tin Hai Họ (y=776 -> y=865) */}
      <div className="w-full max-w-[430px] mx-auto px-2">
        <div className="grid grid-cols-2 gap-2 text-center">
          {/* Cột Nhà Trai: Chạy chữ từ bên trái vào */}
          <div className="flex flex-col items-center">
            <AnimateView animation="fadeInLeft" duration={1}>
              <h3 className="font-lora text-[15px] font-semibold uppercase text-[#30451c] leading-tight mb-1">
                nhà trai
              </h3>
            </AnimateView>

            <AnimateView animation="fadeInLeft" delay={0.1} duration={1}>
              <div className="font-lora text-[14px] text-[#30451c] uppercase leading-snug">
                {groomFatherName && groomFatherName.trim() ? (
                  <div>Ông. {groomFatherName}</div>
                ) : null}
                {groomMotherName && groomMotherName.trim() ? (
                  <div>Bà. {groomMotherName}</div>
                ) : null}
              </div>
            </AnimateView>

            <AnimateView animation="fadeInLeft" delay={0.15} duration={1}>
              {groomAddress ? (
                <p className="font-lora text-[14px] text-[#30451c] mt-0.5">
                  {groomAddress}
                </p>
              ) : null}
            </AnimateView>
          </div>

          {/* Cột Nhà Gái: Chạy chữ từ bên phải vào */}
          <div className="flex flex-col items-center">
            <AnimateView animation="fadeInRight" duration={1}>
              <h3 className="font-lora text-[15px] font-semibold uppercase text-[#30451c] leading-tight mb-1">
                nhà gái
              </h3>
            </AnimateView>

            <AnimateView animation="fadeInRight" delay={0.1} duration={1}>
              <div className="font-lora text-[14px] text-[#30451c] uppercase leading-snug">
                {brideFatherName && brideFatherName.trim() ? (
                  <div>Ông. {brideFatherName}</div>
                ) : null}
                {brideMotherName && brideMotherName.trim() ? (
                  <div>Bà. {brideMotherName}</div>
                ) : null}
              </div>
            </AnimateView>

            <AnimateView animation="fadeInRight" delay={0.15} duration={1}>
              {brideAddress ? (
                <p className="font-lora text-[14px] text-[#30451c] mt-0.5">
                  {brideAddress}
                </p>
              ) : null}
            </AnimateView>
          </div>
        </div>

        {/* 2. Icon Nghệ Thuật Phân Cách Ở Giữa (y=870, pulse lặp lại) */}
        <div className="flex justify-center my-3">
          <AnimateView animation="pulse" infinite duration={1.5}>
            <div className="w-16 h-16 flex items-center justify-center">
              <img
                src="https://cdn.taothiep.com/wedding-user-assets/images/cmp2snpce001501myev2iysu3/32a9c870-167a-4c88-a460-1f09800aacb1.webp"
                alt="Decorative floral icon"
                className="w-14 h-14 object-contain"
              />
            </div>
          </AnimateView>
        </div>

        {/* 3. Tên Chú Rể & Cô Dâu (y=962 -> y=1024) */}
        <div className="grid grid-cols-2 gap-2 text-center mb-5 relative">
          {/* Ký tự & nghệ thuật nằm chìm ở giữa nền đè bên dưới 2 tên */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
            <span
              className="text-[70px] sm:text-[85px] text-[#5D733F]/20 font-pinyon leading-none"
              style={{ fontFamily: "'Pinyon', cursive" }}
              aria-hidden="true"
            >
              &
            </span>
          </div>
          {/* Chú rể */}
          <div className="flex flex-col items-center">
            <AnimateView animation="fadeInLeft" delay={0.2} duration={1}>
              <span className="font-lora text-[13px] sm:text-[14px] font-bold text-[#5D733F] uppercase tracking-[0.2em] mb-1">
                CHÚ RỂ
              </span>
            </AnimateView>
            <AnimateView animation="fadeInUp" delay={0.25} duration={1.2}>
              <h2
                className="text-[36px] sm:text-[44px] text-[#233814] font-semibold leading-tight mt-0.5 tracking-wide drop-shadow-sm"
                style={{ fontFamily: "'Uvn Hoa Tay 1', cursive" }}
              >
                {groomName || "Tuấn Anh"}
              </h2>
            </AnimateView>
          </div>

          {/* Cô dâu */}
          <div className="flex flex-col items-center">
            <AnimateView animation="fadeInRight" delay={0.2} duration={1}>
              <span className="font-lora text-[13px] sm:text-[14px] font-bold text-[#5D733F] uppercase tracking-[0.2em] mb-1">
                CÔ DÂU
              </span>
            </AnimateView>
            <AnimateView animation="fadeInUp" delay={0.25} duration={1.2}>
              <h2
                className="text-[36px] sm:text-[44px] text-[#233814] font-semibold leading-tight mt-0.5 tracking-wide drop-shadow-sm"
                style={{ fontFamily: "'Uvn Hoa Tay 1', cursive" }}
              >
                {brideName || "Bích Ngọc"}
              </h2>
            </AnimateView>
          </div>
        </div>
      </div>

      {/* 4. Khung Xanh Olive Chứa 2 Ảnh Chân Dung (y=1065, h=310) */}
      <div className="w-full bg-[#5D733F] py-3.5 px-3">
        <div className="max-w-[430px] mx-auto grid grid-cols-2 gap-3 sm:gap-4 items-center justify-items-center">
          {/* Ảnh Chú Rể: Chạy từ trái vào */}
          <AnimateView animation="fadeInLeft" delay={0.1} duration={1.2} className="w-full max-w-[195px]">
            <div className="w-full aspect-[195/285] overflow-hidden rounded-none shadow-sm">
              <img
                src={defaultGroomImg}
                alt={groomName || "Chú rể"}
                className="w-full h-full object-cover object-center"
              />
            </div>
          </AnimateView>

          {/* Ảnh Cô Dâu: Chạy từ phải vào */}
          <AnimateView animation="fadeInRight" delay={0.1} duration={1.2} className="w-full max-w-[195px]">
            <div className="w-full aspect-[195/285] overflow-hidden rounded-none shadow-sm">
              <img
                src={defaultBrideImg}
                alt={brideName || "Cô dâu"}
                className="w-full h-full object-cover object-center"
              />
            </div>
          </AnimateView>
        </div>
      </div>
    </section>
  );
}


