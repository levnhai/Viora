import { WeddingData } from "@/entities/invitation/model/types";
import { AnimateView } from "@/widgets/invitation-blocks";
import { formatParentName } from "@/shared/lib/utils/date";

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
    displayOrder,
  } = weddingData;

  const isGroomFirst = displayOrder !== "bride_first";

  const formattedGroomFather = formatParentName("Ông", groomFatherName || "Nguyễn Văn Hùng");
  const formattedGroomMother = formatParentName("Bà", groomMotherName || "Trần Thị Mai");
  const formattedBrideFather = formatParentName("Ông", brideFatherName || "Lê Văn Tuấn");
  const formattedBrideMother = formatParentName("Bà", brideMotherName || "Phạm Thị Cúc");

  const groomSide = (
    <div key="groom-family" className="flex flex-col items-center">
      <AnimateView animation="fadeInLeft" duration={1}>
        <h3 className="font-lora text-[15px] font-semibold uppercase text-[#2C6E91] leading-tight mb-1 tracking-wider">
          nhà trai
        </h3>
      </AnimateView>

      <AnimateView animation="fadeInLeft" delay={0.1} duration={1}>
        <div className="font-lora text-[14px] text-[#2C6E91] uppercase leading-snug space-y-0.5">
          {formattedGroomFather && <div>{formattedGroomFather}</div>}
          {formattedGroomMother && <div>{formattedGroomMother}</div>}
        </div>
      </AnimateView>

      <AnimateView animation="fadeInLeft" delay={0.15} duration={1}>
        {groomAddress ? (
          <p className="font-lora text-[13px] sm:text-[14px] text-[#2C6E91]/80 mt-1 max-w-[180px] sm:max-w-[240px] md:max-w-[280px]">
            {groomAddress}
          </p>
        ) : null}
      </AnimateView>
    </div>
  );

  const brideSide = (
    <div key="bride-family" className="flex flex-col items-center">
      <AnimateView animation="fadeInRight" duration={1}>
        <h3 className="font-lora text-[15px] font-semibold uppercase text-[#2C6E91] leading-tight mb-1 tracking-wider">
          nhà gái
        </h3>
      </AnimateView>

      <AnimateView animation="fadeInRight" delay={0.1} duration={1}>
        <div className="font-lora text-[14px] text-[#2C6E91] uppercase leading-snug space-y-0.5">
          {formattedBrideFather && <div>{formattedBrideFather}</div>}
          {formattedBrideMother && <div>{formattedBrideMother}</div>}
        </div>
      </AnimateView>

      <AnimateView animation="fadeInRight" delay={0.15} duration={1}>
        {brideAddress ? (
          <p className="font-lora text-[13px] sm:text-[14px] text-[#2C6E91]/80 mt-1 max-w-[180px] sm:max-w-[240px] md:max-w-[280px]">
            {brideAddress}
          </p>
        ) : null}
      </AnimateView>
    </div>
  );

  return (
    <section className="relative w-full bg-white text-[#2C6E91] pt-8 pb-6 px-4 sm:px-6 md:px-8 overflow-hidden">
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center text-center">
        {/* 1. Lời mời trang trọng */}
        <AnimateView animation="fadeInUp" duration={1}>
          <h2 className="font-lora text-[16px] sm:text-[18px] md:text-[20px] font-semibold uppercase tracking-normal text-[#2C6E91] leading-snug px-4 mb-6">
            TRÂN TRỌNG KÍNH MỜI QUÝ KHÁCH đến
            <br />
            CHUNG VUI CÙNG GIA ĐÌNH CHÚNG TÔI
          </h2>
        </AnimateView>

        {/* 2. Thông tin hai họ 2 cột */}
        <div className="w-full grid grid-cols-2 gap-3 sm:gap-6 text-center mt-2">
          {isGroomFirst ? [groomSide, brideSide] : [brideSide, groomSide]}
        </div>
      </div>
    </section>
  );
}

