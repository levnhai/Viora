import { WeddingData } from "@/entities/invitation/model/types";
import { AnimateView } from "@/widgets/invitation-blocks";
import { formatDateToDDMMYYYY } from "@/shared/lib/utils/date";

interface InvitationCoverProps {
  weddingData: WeddingData;
  guestName?: string;
}

export function InvitationCover({
  weddingData,
  guestName,
}: InvitationCoverProps) {
  const {
    groomName,
    brideName,
    weddingDate,
    coverImage,
    galleryImages,
    story,
  } = weddingData;

  const displayCoverImage =
    coverImage ||
    (galleryImages && galleryImages.length > 0 ? galleryImages[0] : null) ||
    "https://cdn.taothiep.com/wedding-user-assets/images/cmp2snpce001501myev2iysu3/a9a133e8-edef-4ba3-927e-2dcc81904051.webp";

  const formattedDate = weddingDate ? formatDateToDDMMYYYY(weddingDate) : "26.12.2026";

  const defaultQuote =
    story ||
    "\"Hôn nhân là chuyện cả đời,\nYêu người vừa ý, cưới người mình thương...\"";

  return (
    <section className="relative w-full bg-white text-[#30451c]">
      {/* 1. Hero Image Container (y=0 -> y=645) */}
      <div className="relative w-full aspect-[430/645] overflow-hidden">
        <img
          src={displayCoverImage}
          alt={`${groomName} & ${brideName}`}
          className="w-full h-full object-cover object-center pointer-events-none"
        />

        {/* Gradient Overlay từ y=400 (h=245px) */}
        <div
          className="absolute inset-x-0 bottom-0 h-[40%] pointer-events-none"
          style={{
            background:
              "linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.55) 100%)",
          }}
        />

        {/* Content Over the Hero Image */}
        <div className="absolute inset-x-0 bottom-0 pb-6 pt-12 flex flex-col items-center justify-end text-center z-10 select-none">
          {/* Chữ "Wedding" nghệ thuật to mờ đè phía trên (font Arcittya Begatri 106px) */}
          <AnimateView animation="fadeInUp" duration={1.2}>
            <p
              className="font-arcittya leading-none pointer-events-none select-none text-[84px] sm:text-[106px] text-white/60 drop-shadow-sm -mb-6 sm:-mb-8 tracking-wider"
              style={{
                fontFamily: "'Arcittya Begatri', 'Playfair Display', serif",
              }}
            >
              Wedding
            </p>
          </AnimateView>

          {/* Tên dâu rể (font Hastegi 36px uppercase) chạy từ dưới lên */}
          <AnimateView animation="fadeInUp" delay={0.15} duration={1.2}>
            <h1
              className="text-2xl sm:text-[34px] leading-tight uppercase text-white font-normal tracking-wide drop-shadow-md my-1"
              style={{ fontFamily: "'Hastegi', sans-serif" }}
            >
              <div className="block">{groomName || "tuấn anh"}</div>
              <div className="block">{brideName || "bích ngọc"}</div>
            </h1>
          </AnimateView>

          {/* Ngày cưới (font Hastegi 20px) */}
          <AnimateView animation="fadeInUp" delay={0.25} duration={1}>
            <p
              className="text-base sm:text-[20px] uppercase text-white tracking-widest font-normal drop-shadow-md mt-1"
              style={{ fontFamily: "'Hastegi', sans-serif" }}
            >
              {formattedDate}
            </p>
          </AnimateView>
        </div>
      </div>

      {/* Guest Name banner nếu có */}
      {guestName && (
        <AnimateView animation="fadeInUp" delay={0.3} duration={1} className="w-full max-w-[390px] mx-auto px-4 mt-4">
          <div className="bg-[#5D733F]/10 border border-[#5D733F]/30 rounded-full py-1.5 px-4 text-center">
            <p className="text-xs text-[#5D733F] font-lora uppercase tracking-wider">
              Kính mời: <strong className="font-bold text-[#30451c]">{guestName}</strong>
            </p>
          </div>
        </AnimateView>
      )}

      {/* 2. Câu thơ trích dẫn tình yêu (y=680, font Pinyon 22px, màu #5D733F) */}
      <div className="px-4 py-8 text-center flex flex-col items-center">
        <AnimateView animation="fadeInUp" delay={0.35} duration={1.3} className="w-full max-w-sm">
          <div className="whitespace-pre-line text-lg sm:text-[22px] leading-relaxed text-[#5D733F] italic font-pinyon select-none">
            {defaultQuote}
          </div>
        </AnimateView>
      </div>
    </section>
  );
}


