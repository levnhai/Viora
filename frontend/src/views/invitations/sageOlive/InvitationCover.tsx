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

        {/* Darker Gradient Overlay từ bottom (h=60%) giúp chữ trắng luôn nổi bật trên mọi ảnh nền */}
        <div
          className="absolute inset-x-0 bottom-0 h-[60%] pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.45) 50%, rgba(0, 0, 0, 0) 100%)",
          }}
        />

        {/* Content Over the Hero Image */}
        <div className="absolute inset-x-0 bottom-0 pb-6 pt-12 flex flex-col items-center justify-end text-center z-10 select-none px-4">
          {/* Chữ "Wedding" nghệ thuật to mờ đè phía trên (font Arcittya Begatri) */}
          <AnimateView animation="fadeInUp" duration={1.2}>
            <p
              className="font-arcittya leading-none pointer-events-none select-none text-[88px] sm:text-[110px] text-white/70 [text-shadow:_0_2px_12px_rgba(0,0,0,0.5)] -mb-7 sm:-mb-9 tracking-wider"
              style={{
                fontFamily: "'Arcittya Begatri', 'Playfair Display', serif",
              }}
            >
              Wedding
            </p>
          </AnimateView>

          {/* Tên dâu rể (font Hastegi uppercase) đè lên ký tự & nghệ thuật ở lớp nền */}
          <AnimateView animation="fadeInUp" delay={0.15} duration={1.2} className="relative flex flex-col items-center justify-center my-1">
            {/* Ký tự & nghệ thuật nằm chìm ở dưới tên dâu rể */}
            <span
              className="absolute inset-0 flex items-center justify-center text-[110px] sm:text-[140px] text-white/35 pointer-events-none select-none font-pinyon z-0 [text-shadow:_0_2px_10px_rgba(0,0,0,0.6)]"
              style={{ fontFamily: "'Pinyon', cursive" }}
              aria-hidden="true"
            >
              &
            </span>

            <h1
              className="text-[32px] sm:text-[42px] leading-[1.25] uppercase text-white font-bold tracking-[0.12em] [text-shadow:_0_2px_12px_rgba(0,0,0,0.9)] relative z-10"
              style={{ fontFamily: "'Hastegi', sans-serif" }}
            >
              <div className="block drop-shadow-md">{groomName || "tuấn anh"}</div>
              <div className="block drop-shadow-md">{brideName || "bích ngọc"}</div>
            </h1>
          </AnimateView>

          {/* Ngày cưới (font Hastegi) */}
          <AnimateView animation="fadeInUp" delay={0.25} duration={1}>
            <p
              className="text-lg sm:text-[22px] uppercase text-white tracking-[0.2em] font-semibold [text-shadow:_0_2px_8px_rgba(0,0,0,0.85)] mt-1"
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


