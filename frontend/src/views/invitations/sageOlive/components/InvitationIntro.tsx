import { WeddingData } from "@/entities/invitation/model/types";
import { AnimateView } from "@/widgets/invitation-blocks";

interface InvitationIntroProps {
  weddingData?: WeddingData;
}

export function InvitationIntro({ weddingData }: InvitationIntroProps) {
  const gallery = weddingData?.galleryImages || [];

  const centerImg =
    (gallery.length > 3 ? gallery[3] : null) ||
    "https://cdn.taothiep.com/wedding-user-assets/images/cmp2snpce001501myev2iysu3/7a47d253-3827-47a0-a30f-ea21f7bc9c55.webp";

  const leftImg =
    (gallery.length > 4 ? gallery[4] : null) ||
    "https://cdn.taothiep.com/wedding-user-assets/images/cmp2snpce001501myev2iysu3/c7ea5c1e-49ea-46f6-8352-26511809a7e9.webp";

  const rightImg =
    (gallery.length > 5 ? gallery[5] : null) ||
    "https://cdn.taothiep.com/wedding-user-assets/images/cmp2snpce001501myev2iysu3/9a86931b-0820-4023-b975-a48c397d9f3e.webp";

  return (
    <section className="relative w-full bg-white text-[#30451c] pt-8 pb-4 px-2 overflow-hidden">
      <div className="max-w-[430px] mx-auto flex flex-col items-center">
        {/* 1. Lời mời trang trọng (y=1411, font Lora 18px 600 #5D733F) */}
        <AnimateView animation="fadeInUp" duration={1}>
          <h2 className="font-lora text-[16px] sm:text-[18px] font-semibold uppercase tracking-normal text-[#5D733F] text-center leading-snug px-4">
            TRÂN TRỌNG KÍNH MỜI QUÝ KHÁCH đến
            <br />
            CHUNG VUI CÙNG GIA ĐÌNH CHÚNG TÔI
          </h2>
        </AnimateView>

        {/* 2. Cụm 3 Ảnh Xếp So Le (y=1499 -> y=1730) */}
        <div className="relative w-full max-w-[400px] h-[240px] sm:h-[260px] mt-6 flex items-center justify-center">
          {/* Ảnh Bên Trái (w: 120, h: 175, fadeInLeft) */}
          <AnimateView
            animation="fadeInLeft"
            delay={0.1}
            duration={1.2}
            className="absolute left-2 top-[30px] z-10 w-[110px] sm:w-[120px]"
          >
            <div className="w-full aspect-[120/175] overflow-hidden rounded-none shadow-md bg-stone-100">
              <img
                src={leftImg}
                alt="Moment left"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </AnimateView>

          {/* Ảnh Trung Tâm (w: 150, h: 230, zoomIn, nằm đè lên trên) */}
          <AnimateView
            animation="zoomIn"
            delay={0.2}
            duration={1.2}
            className="absolute left-1/2 -translate-x-1/2 top-0 z-20 w-[140px] sm:w-[150px]"
          >
            <div className="w-full aspect-[150/230] overflow-hidden rounded-none shadow-xl border-2 border-white bg-stone-100">
              <img
                src={centerImg}
                alt="Moment center"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </AnimateView>

          {/* Ảnh Bên Phải (w: 120, h: 175, fadeInRight) */}
          <AnimateView
            animation="fadeInRight"
            delay={0.15}
            duration={1.2}
            className="absolute right-2 top-[30px] z-10 w-[110px] sm:w-[120px]"
          >
            <div className="w-full aspect-[120/175] overflow-hidden rounded-none shadow-md bg-stone-100">
              <img
                src={rightImg}
                alt="Moment right"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </AnimateView>
        </div>
      </div>
    </section>
  );
}


