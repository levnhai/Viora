import { GsapReveal } from "@/shared/ui/GsapReveal";
import { WeddingData } from "@/entities/invitation/model/types";
import { getVietnameseLunarDate } from "@/shared/lib/utils/date";
import img_16 from "@/shared/assets/image/wood/img_8.svg";

interface MinimalCoupleSpotlightProps {
  weddingData: WeddingData;
}

const getParentTitle = (father?: string, mother?: string) => {
  const hasFather = Boolean(father && father.trim());
  const hasMother = Boolean(mother && mother.trim());
  if (hasFather && hasMother) return "Ông Bà";
  if (hasFather) return "Ông";
  if (hasMother) return "Bà";
  return "";
};

export function MinimalCoupleSpotlight({
  weddingData,
}: MinimalCoupleSpotlightProps) {
  const {
    groomName,
    brideName,
    groomRank,
    brideRank,
    groomFatherName,
    groomMotherName,
    brideFatherName,
    brideMotherName,
    groomAddress,
    brideAddress,
    weddingDate,
    weddingTime,
  } = weddingData;

  const groomParentTitle = getParentTitle(groomFatherName, groomMotherName);
  const brideParentTitle = getParentTitle(brideFatherName, brideMotherName);

  const events = weddingData?.events || [];

  // Extract ceremony event (Lễ Vu Quy / Lễ Thành Hôn / Lễ Tân Hôn / Lễ Gia Tiên / Lễ tại Tư Gia)
  const ceremonyEvent =
    events.find((ev) => {
      const t = (ev?.title || "").toUpperCase();
      const loc = (ev?.locationName || "").toUpperCase();
      return (
        t.includes("THÀNH HÔN") ||
        t.includes("VU QUY") ||
        t.includes("TÂN HÔN") ||
        t.includes("GIA TIÊN") ||
        loc.includes("TƯ GIA")
      );
    }) || events[0];

  const rawTitle = (ceremonyEvent?.title || "LỄ THÀNH HÔN").toUpperCase();
  const displayCeremonyTitle = rawTitle.startsWith("LỄ")
    ? rawTitle
    : `LỄ ${rawTitle}`;
  const ceremonyLocation = (
    ceremonyEvent?.locationName || "TƯ GIA"
  ).toUpperCase();
  const ceremonyDate = ceremonyEvent?.date || weddingDate || "2026-12-31";
  const ceremonyTime = ceremonyEvent?.time || weddingTime || "11:00 AM";

  const getImgSrc = (img: any): string => {
    if (!img) return "";
    return typeof img === "string" ? img : img.src || "";
  };

  // Parse date info
  const parseDateInfo = (dateStr: string) => {
    if (!dateStr)
      return {
        dayOfWeek: "THỨ BẢY",
        date: "03",
        month: "THÁNG 01",
        year: "2026",
      };

    let year = "2026",
      month = "01",
      day = "03";

    if (dateStr.includes("-")) {
      const parts = dateStr.split("-");
      if (parts.length === 3) {
        year = parts[0];
        month = parts[1];
        day = parts[2];
      }
    } else if (dateStr.includes("/")) {
      const parts = dateStr.split("/");
      if (parts.length === 3) {
        day = parts[0];
        month = parts[1];
        year = parts[2];
      }
    }

    const d = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    if (isNaN(d.getTime()))
      return {
        dayOfWeek: "THỨ BẢY",
        date: "03",
        month: "THÁNG 01",
        year: "2026",
      };

    const days = [
      "CHỦ NHẬT",
      "THỨ HAI",
      "THỨ BA",
      "THỨ TƯ",
      "THỨ NĂM",
      "THỨ SÁU",
      "THỨ BẢY",
    ];
    return {
      dayOfWeek: days[d.getDay()],
      date: day.padStart(2, "0"),
      month: `THÁNG ${month.padStart(2, "0")}`,
      year: year,
    };
  };

  const dInfo = parseDateInfo(ceremonyDate);
  const lunarDateStr = getVietnameseLunarDate(ceremonyDate);

  return (
    <section className="relative py-12 px-4 sm:px-6 z-20 select-none overflow-visible">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Alex+Brush&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Great+Vibes&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&family=Pinyon+Script&display=swap');

        .font-calligraphy {
          font-family: "Alex Brush", "Great Vibes", "Pinyon Script", cursive;
        }
        .font-serif-title {
          font-family: "Playfair Display", "Cormorant Garamond", serif;
        }
        @keyframes sway-slow {
          0%, 100% { transform: rotate(0deg) translateY(0px); }
          50% { transform: rotate(2deg) translateY(-4px); }
        }
        .animate-sway-slow {
          animation: sway-slow 6s ease-in-out infinite;
        }
      `}</style>

      {/* Main Dark Rose Card */}
      <div className="relative max-w-xl mx-auto rounded-[24px] bg-[linear-gradient(155deg,#5b2d18_0%,#3c1f10_55%,#21120b_100%)] text-[#fff1cf] shadow-[0_25px_60px_rgba(91,45,24,0.4)] px-6 py-10 sm:px-10 sm:py-14 border border-[#e7bf78]/40">
        {/* Overflowing Right Woodland Ornament (img_16) */}
        <div className="absolute -right-16 sm:-right-14 md:-right-16 top-[8%] w-28 sm:w-44 md:w-56 z-0 pointer-events-none drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)] animate-sway-slow">
          <img
            src={getImgSrc(img_16)}
            alt="Woodland Ornament"
            loading="eager"
            decoding="async"
            className="w-full h-auto object-contain opacity-90 sm:opacity-100"
          />
        </div>

        {/* Content Container */}
        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Header Title */}
          <GsapReveal direction="up" distance={30}>
            <h2 className="font-serif-title tracking-[0.25em] text-xs sm:text-sm font-bold uppercase text-[#f4d79d] text-center mb-8 sm:mb-10 drop-shadow-xs">
              THÔNG TIN LỄ CƯỚI
            </h2>
          </GsapReveal>

          {/* Parents Info Grid (Nhà Trai | Nhà Gái) */}
          <GsapReveal
            delay={0.1}
            direction="up"
            distance={40}
            className="w-full mb-8"
          >
            <div className="flex flex-row items-stretch justify-between w-full max-w-md mx-auto text-center">
              {/* Groom Side */}
              <div className="flex-1 pr-3 sm:pr-4 flex flex-col justify-start">
                {groomParentTitle && (
                  <p className="text-xs text-[#e7bf78] uppercase tracking-wider mb-1 font-serif-title font-medium">
                    {groomParentTitle}
                  </p>
                )}
                {groomFatherName && groomFatherName.trim() ? (
                  <h3 className="text-sm sm:text-base font-bold text-white tracking-wide leading-snug">
                    {groomFatherName}
                  </h3>
                ) : null}
                {groomMotherName && groomMotherName.trim() ? (
                  <h3 className="text-sm sm:text-base font-bold text-white tracking-wide leading-snug mb-2">
                    {groomMotherName}
                  </h3>
                ) : null}
                {groomAddress ? (
                  <p className="text-[11px] sm:text-xs text-[#f7e4bc] leading-tight font-medium opacity-90">
                    {groomAddress}
                  </p>
                ) : null}
              </div>

              {/* Vertical Divider */}
              <div className="w-[1px] bg-[#e7bf78]/40 self-stretch my-1" />

              {/* Bride Side */}
              <div className="flex-1 pl-3 sm:pl-4 flex flex-col justify-start">
                {brideParentTitle && (
                  <p className="text-xs text-[#e7bf78] uppercase tracking-wider mb-1 font-serif-title font-medium">
                    {brideParentTitle}
                  </p>
                )}
                {brideFatherName && brideFatherName.trim() ? (
                  <h3 className="text-sm sm:text-base font-bold text-white tracking-wide leading-snug">
                    {brideFatherName}
                  </h3>
                ) : null}
                {brideMotherName && brideMotherName.trim() ? (
                  <h3 className="text-sm sm:text-base font-bold text-white tracking-wide leading-snug mb-2">
                    {brideMotherName}
                  </h3>
                ) : null}
                {brideAddress ? (
                  <p className="text-[11px] sm:text-xs text-[#f7e4bc] leading-tight font-medium opacity-90">
                    {brideAddress}
                  </p>
                ) : null}
              </div>
            </div>
          </GsapReveal>

          {/* Announcement Intro */}
          <GsapReveal delay={0.2} direction="up" distance={30}>
            <div className="my-6 text-center">
              <p className="font-serif-title tracking-[0.2em] text-xs sm:text-sm font-semibold uppercase text-[#f4d79d] leading-relaxed drop-shadow-xs">
                TRÂN TRỌNG BÁO TIN
                <br />
                {displayCeremonyTitle} CỦA CON CHÚNG TÔI
              </p>
            </div>
          </GsapReveal>

          {/* Bride & Groom Names */}
          <GsapReveal
            delay={0.3}
            direction="up"
            distance={40}
            className="w-full my-4 flex flex-col items-center"
          >
            {/* Groom */}
            <div className="flex flex-col items-center">
              <h3 className="font-serif-title text-3xl sm:text-4xl md:text-[44px] font-bold text-white tracking-wide mb-1 leading-tight drop-shadow-xs">
                {groomName || "Đặng Hoàng Long"}
              </h3>
              <p className="text-xs font-serif-title uppercase tracking-[0.25em] text-[#e7bf78] font-semibold">
                {groomRank || "TRƯỞNG NAM"}
              </p>
            </div>

            {/* Ampersand Icon */}
            <div className="font-calligraphy text-3xl sm:text-4xl text-[#e7bf78] my-2 select-none pointer-events-none drop-shadow-xs">
              &amp;
            </div>

            {/* Bride */}
            <div className="flex flex-col items-center">
              <h3 className="font-serif-title text-3xl sm:text-4xl md:text-[44px] font-bold text-white tracking-wide mb-1 leading-tight drop-shadow-xs">
                {brideName || "Vũ Bảo Ngọc"}
              </h3>
              <p className="text-xs font-serif-title uppercase tracking-[0.25em] text-[#e7bf78] font-semibold">
                {brideRank || "ÚT NỮ"}
              </p>
            </div>
          </GsapReveal>

          {/* Ceremony Details & Structured Date Block */}
          <GsapReveal
            delay={0.4}
            direction="up"
            distance={40}
            className="mt-8 pt-4 w-full flex flex-col items-center"
          >
            <p className="font-serif-title tracking-[0.2em] text-xs sm:text-sm font-semibold uppercase text-[#f4d79d] mb-5 leading-relaxed">
              {displayCeremonyTitle} ĐƯỢC CỬ HÀNH TẠI
              <br />
              <span className="font-bold text-white text-sm sm:text-base tracking-widest">
                {ceremonyLocation}
              </span>
            </p>

            <div className="flex items-center justify-center gap-4 tracking-[0.2em] text-xs sm:text-sm font-bold uppercase text-[#fff0f0] mb-4">
              <span>VÀO LÚC {ceremonyTime}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#e7bf78]" />
              <span>{dInfo.dayOfWeek}</span>
            </div>

            {/* Date Box: Large Date | Month & Year */}
            <div className="flex items-center justify-center gap-4 my-2">
              <span className="font-serif-title text-4xl sm:text-5xl font-normal text-white tracking-tight drop-shadow-xs" style={{ fontVariantNumeric: "lining-nums tabular-nums" }}>
                {dInfo.date}
              </span>
              <div className="w-[1.5px] h-10 bg-[#e7bf78]/40" />
              <div className="flex flex-col text-left font-serif-title uppercase leading-tight">
                <span className="text-sm font-bold tracking-widest text-white">
                  {dInfo.month}
                </span>
                <span className="text-xs sm:text-sm tracking-widest text-[#f4d79d] font-semibold" style={{ fontVariantNumeric: "lining-nums tabular-nums" }}>
                  {dInfo.year}
                </span>
              </div>
            </div>

            {/* Lunar Date */}
            <p className="text-xs font-serif-title uppercase tracking-widest text-[#f4d79d] font-medium mt-4 opacity-95">
              {lunarDateStr || "(TỨC NGÀY 15 THÁNG 11 NĂM ẤT TỴ)"}
            </p>
          </GsapReveal>
        </div>
      </div>
    </section>
  );
}


