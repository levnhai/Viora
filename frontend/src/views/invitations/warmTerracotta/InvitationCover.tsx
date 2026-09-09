import { WeddingData } from "@/entities/invitation/model/types";
import { AnimateView } from "@/widgets/invitation-blocks";
import { formatToDDMMYYYY } from "@/shared/lib/utils/date";

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

  const formattedDate = formatToDDMMYYYY(weddingDate, ".");

  return (
    <section className="relative w-full bg-white text-[#2C2018]">
      {/* 1. Hero Image Container */}
      <div className="relative w-full aspect-[430/700] md:aspect-[430/620] overflow-hidden">
        <img
          src={displayCoverImage}
          alt={`${groomName || "Chú rể"} & ${brideName || "Cô dâu"}`}
          className="w-full h-full object-cover object-center pointer-events-none"
        />

        {/* Gradient Overlay từ đáy lên: chuyển sang nền sáng kem giúp chữ màu xanh #2C6E91 hiển thị sắc nét, tương phản hoàn hảo */}
        <div
          className="absolute inset-x-0 bottom-0 h-[52%] pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(255, 255, 255, 0.96) 0%, rgba(255, 255, 255, 0.85) 45%, rgba(255, 255, 255, 0.35) 75%, rgba(255, 255, 255, 0) 100%)",
          }}
        />

        {/* Content Over the Hero Image */}
        <div className="absolute inset-x-0 bottom-0 pb-6 pt-10 flex flex-col items-center justify-end text-center z-10 select-none px-4">
          {/* the wedding of */}
          <AnimateView animation="fadeInUp" duration={1.2}>
            <p
              className="text-[28px] sm:text-[34px] md:text-[40px] text-[#2C6E91]/80 leading-tight select-none -mb-1"
              style={{ fontFamily: "'Dancing Script', 'Alex Brush', 'Edwardian', 'Pinyon Script', cursive" }}
            >
              the wedding of
            </p>
          </AnimateView>

          {/* Tên dâu rể */}
          <AnimateView animation="fadeInUp" delay={0.15} duration={1.2}>
            <h1
              className="text-[48px] sm:text-[62px] md:text-[72px] lg:text-[78px] leading-[1.1] capitalize text-[#2C6E91] font-bold tracking-normal my-1 flex items-center justify-center gap-2 sm:gap-3 flex-wrap select-none drop-shadow-xs"
              style={{
                fontFamily: "'Dancing Script', 'Alex Brush', 'Edwardian', 'Pinyon Script', cursive",
              }}
            >
              <span>{groomName || "Tuấn Anh"}</span>
              <span className="text-[34px] sm:text-[46px] md:text-[54px] text-[#2C6E91]/75 mx-1 font-serif italic">&amp;</span>
              <span>{brideName || "Bích Ngọc"}</span>
            </h1>
          </AnimateView>

          {/* Ngày cưới */}
          <AnimateView animation="fadeInUp" delay={0.25} duration={1}>
            <p
              className="text-base sm:text-[20px] md:text-[22px] uppercase text-[#2C6E91]/90 tracking-[0.25em] font-semibold mt-1"
              style={{ fontFamily: "'Hastegi', 'Plus Jakarta Sans', sans-serif" }}
            >
              {formattedDate}
            </p>
          </AnimateView>
        </div>
      </div>

      {/* khách mời*/}
      {guestName && (
        <AnimateView animation="fadeInUp" delay={0.3} duration={1} className="w-full max-w-[390px] md:max-w-md mx-auto px-4 mt-4">
          <div className="bg-[#2C6E91]/10 border border-[#2C6E91]/30 rounded-full py-1.5 px-4 text-center shadow-sm">
            <p className="text-xs text-[#2C6E91] font-lora uppercase tracking-wider">
              Kính mời: <strong className="font-bold text-[#2C2018]">{guestName}</strong>
            </p>
          </div>
        </AnimateView>
      )}
    </section>
  );
}

