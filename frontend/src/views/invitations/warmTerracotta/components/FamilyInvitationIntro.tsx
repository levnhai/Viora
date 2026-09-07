import { WeddingData } from "@/entities/invitation/model/types";
import { AnimateView } from "@/widgets/invitation-blocks";

interface FamilyInvitationIntroProps {
  weddingData: WeddingData;
}

export function FamilyInvitationIntro({
  weddingData,
}: FamilyInvitationIntroProps) {
  const {
    groomFatherName,
    groomMotherName,
    brideFatherName,
    brideMotherName,
    groomAddress,
    brideAddress,
  } = weddingData;

  return (
    <section className="relative w-full bg-white text-[#2C6E91] pt-8 pb-6 px-3 overflow-hidden">
      <div className="max-w-[430px] mx-auto flex flex-col items-center text-center">
        {/* 1. Lời mời trang trọng (y=1475, font Lora 18px 600 uppercase) */}
        <AnimateView animation="fadeInUp" duration={1}>
          <h2 className="font-lora text-[16px] sm:text-[18px] font-semibold uppercase tracking-normal text-[#2C6E91] leading-snug px-4 mb-6">
            TRÂN TRỌNG KÍNH MỜI QUÝ KHÁCH đến
            <br />
            CHUNG VUI CÙNG GIA ĐÌNH CHÚNG TÔI
          </h2>
        </AnimateView>

        {/* 2. Thông tin hai họ 2 cột (y=1552) */}
        <div className="w-full grid grid-cols-2 gap-3 sm:gap-4 text-center mt-2">
          {/* Cột Nhà Trai */}
          <div className="flex flex-col items-center">
            <AnimateView animation="fadeInLeft" duration={1}>
              <h3 className="font-lora text-[15px] font-semibold uppercase text-[#2C6E91] leading-tight mb-1">
                nhà trai
              </h3>
            </AnimateView>

            <AnimateView animation="fadeInLeft" delay={0.1} duration={1}>
              <div className="font-lora text-[14px] text-[#2C6E91] uppercase leading-snug">
                <div>Ông. {groomFatherName || "Nguyễn Anh Tuấn"}</div>
                <div>Bà. {groomMotherName || "Nguyễn Ngọc Bích"}</div>
              </div>
            </AnimateView>

            <AnimateView animation="fadeInLeft" delay={0.15} duration={1}>
              <p className="font-lora text-[13px] sm:text-[14px] text-[#2C6E91]/80 mt-0.5">
                {groomAddress || "TP. Hà Nội"}
              </p>
            </AnimateView>
          </div>

          {/* Cột Nhà Gái */}
          <div className="flex flex-col items-center">
            <AnimateView animation="fadeInRight" duration={1}>
              <h3 className="font-lora text-[15px] font-semibold uppercase text-[#2C6E91] leading-tight mb-1">
                nhà gái
              </h3>
            </AnimateView>

            <AnimateView animation="fadeInRight" delay={0.1} duration={1}>
              <div className="font-lora text-[14px] text-[#2C6E91] uppercase leading-snug">
                <div>Ông. {brideFatherName || "Nguyễn Minh Toàn"}</div>
                <div>Bà. {brideMotherName || "Nguyễn Thu Nga"}</div>
              </div>
            </AnimateView>

            <AnimateView animation="fadeInRight" delay={0.15} duration={1}>
              <p className="font-lora text-[13px] sm:text-[14px] text-[#2C6E91]/80 mt-0.5">
                {brideAddress || "TP. Hà Nội"}
              </p>
            </AnimateView>
          </div>
        </div>
      </div>
    </section>
  );
}
