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
  } = weddingData;

  const displayCoverImage =
    coverImage ||
    (galleryImages && galleryImages.length > 0 ? galleryImages[0] : null) ||
    "https://cdn.taothiep.com/wedding-user-assets/images/cmp2snpce001501myev2iysu3/89ebe947-8dab-4bd4-87c1-5c3a219d9add.webp";

  const formattedDate = weddingDate ? formatDateToDDMMYYYY(weddingDate) : "26.12.2026";

  return (
    <section className="relative w-full bg-white text-[#2C2018]">
      {/* 1. Hero Image Container (y=0 -> y=700) */}
      <div className="relative w-full aspect-[430/700] overflow-hidden">
        <img
          src={displayCoverImage}
          alt={`${groomName} & ${brideName}`}
          className="w-full h-full object-cover object-center pointer-events-none"
        />

        {/* Gradient Overlay từ y=455 (h=245px) */}
        <div
          className="absolute inset-x-0 bottom-0 h-[42%] pointer-events-none"
          style={{
            background:
              "linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.4) 40%, rgba(0, 0, 0, 0.75) 100%)",
          }}
        />

        {/* Content Over the Hero Image */}
        <div className="absolute inset-x-0 bottom-0 pb-8 pt-12 flex flex-col items-center justify-end text-center z-10 select-none px-4">
          {/* the wedding of (font Edwardian / Arcittya 32px) */}
          <AnimateView animation="fadeInUp" duration={1.2}>
            <p
              className="text-[32px] sm:text-[38px] text-white/90 leading-tight drop-shadow-md select-none -mb-1"
              style={{ fontFamily: "'Edwardian', 'Pinyon', cursive" }}
            >
              the wedding of
            </p>
          </AnimateView>

          {/* Tên dâu rể (font Hastegi 42px - 48px uppercase) */}
          <AnimateView animation="fadeInUp" delay={0.15} duration={1.2}>
            <h1
              className="text-3xl sm:text-[44px] leading-tight uppercase text-white font-normal tracking-wide drop-shadow-lg my-1 flex items-center justify-center gap-2 flex-wrap"
              style={{ fontFamily: "'Hastegi', sans-serif" }}
            >
              <span>{groomName || "Tuấn Anh"}</span>
              <span className="font-serif italic text-2xl sm:text-3xl opacity-80">&amp;</span>
              <span>{brideName || "Bích Ngọc"}</span>
            </h1>
          </AnimateView>

          {/* Ngày cưới (font Hastegi 24px) */}
          <AnimateView animation="fadeInUp" delay={0.25} duration={1}>
            <p
              className="text-lg sm:text-[24px] uppercase text-white tracking-[0.2em] font-normal drop-shadow-md mt-1"
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
          <div className="bg-[#2C6E91]/10 border border-[#2C6E91]/30 rounded-full py-1.5 px-4 text-center">
            <p className="text-xs text-[#2C6E91] font-lora uppercase tracking-wider">
              Kính mời: <strong className="font-bold text-[#2C2018]">{guestName}</strong>
            </p>
          </div>
        </AnimateView>
      )}
    </section>
  );
}
