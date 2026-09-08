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
        @keyframes gold-shine-sweep {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .gold-shine-text {
          background: linear-gradient(
            90deg,
            #ffffff 0%,
            #fef0d2 25%,
            #e7bf78 50%,
            #fef0d2 75%,
            #ffffff 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: gold-shine-sweep 5s linear infinite;
        }
        @keyframes border-breathe {
          0%, 100% {
            border-color: rgba(231, 191, 120, 0.35);
            box-shadow: 0 25px 60px rgba(91, 45, 24, 0.4);
          }
          50% {
            border-color: rgba(244, 215, 157, 0.65);
            box-shadow: 0 25px 65px rgba(213, 169, 77, 0.25);
          }
        }
        .card-breathe {
          animation: border-breathe 4s ease-in-out infinite;
        }
      `}</style>

      {/* Main Dark Rose Card */}
      <div className="relative max-w-xl mx-auto rounded-[24px] bg-[linear-gradient(155deg,#5b2d18_0%,#3c1f10_55%,#21120b_100%)] text-[#fff1cf] shadow-[0_25px_60px_rgba(91,45,24,0.4)] px-6 py-10 sm:px-10 sm:py-14 border border-[#e7bf78]/40 card-breathe">
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
          {/* Header Title - Chạy từng chữ từ TRÁI sang PHẢI */}
          <GsapReveal direction="right" distance={45} duration={1.0} stagger={0.08}>
            <h2 className="font-serif-title tracking-[0.25em] text-xs sm:text-sm font-bold uppercase text-center mb-8 sm:mb-10 text-[#fcd34d] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              <span className="inline-block mr-2">THÔNG</span>
              <span className="inline-block mr-2">TIN</span>
              <span className="inline-block mr-2">LỄ</span>
              <span className="inline-block">CƯỚI</span>
            </h2>
          </GsapReveal>

          {/* Parents Info Grid: Nhà Trai (Trái -> Phải) | Nhà Gái (Phải -> Trái) */}
          <div className="w-full mb-8">
            <div className="flex flex-row items-stretch justify-between w-full max-w-md mx-auto text-center">
              {/* Groom Side: Trượt mượt từ TRÁI sang PHẢI */}
              <GsapReveal
                delay={0.1}
                direction="right"
                distance={55}
                duration={1.0}
                className="flex-1 pr-3 sm:pr-4 flex flex-col justify-start"
              >
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
              </GsapReveal>

              {/* Vertical Divider */}
              <GsapReveal delay={0.15} direction="none">
                <div className="w-[1px] bg-[#e7bf78]/40 h-full my-1" />
              </GsapReveal>

              {/* Bride Side: Trượt mượt từ PHẢI sang TRÁI */}
              <GsapReveal
                delay={0.1}
                direction="left"
                distance={55}
                duration={1.0}
                className="flex-1 pl-3 sm:pl-4 flex flex-col justify-start"
              >
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
              </GsapReveal>
            </div>
          </div>

          {/* Announcement Intro: Dòng 1 (Trái -> Phải), Dòng 2 (Phải -> Trái) */}
          <div className="my-6 text-center w-full flex flex-col items-center">
            <GsapReveal delay={0.2} direction="right" distance={45} duration={0.9}>
              <p className="font-serif-title tracking-[0.2em] text-xs sm:text-sm font-semibold uppercase text-[#f4d79d] leading-relaxed drop-shadow-xs">
                TRÂN TRỌNG BÁO TIN
              </p>
            </GsapReveal>
            <GsapReveal delay={0.25} direction="left" distance={45} duration={0.9}>
              <p className="font-serif-title tracking-[0.2em] text-xs sm:text-sm font-semibold uppercase text-[#f4d79d] leading-relaxed drop-shadow-xs">
                {displayCeremonyTitle} CỦA CON CHÚNG TÔI
              </p>
            </GsapReveal>
          </div>

          {/* Bride & Groom Names: Tên Chú Rể (Trái -> Phải), Tên Cô Dâu (Phải -> Trái) */}
          <div className="w-full my-4 flex flex-col items-center">
            {/* Groom - Trượt mượt từ TRÁI sang PHẢI */}
            <GsapReveal delay={0.3} direction="right" distance={65} duration={1.1} className="flex flex-col items-center">
              <h3 className="font-serif-title text-3xl sm:text-4xl md:text-[44px] font-bold tracking-wide mb-1 leading-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
                {groomName || "Đặng Hoàng Long"}
              </h3>
              <p className="text-xs font-serif-title uppercase tracking-[0.25em] text-[#e7bf78] font-semibold">
                {groomRank || "TRƯỞNG NAM"}
              </p>
            </GsapReveal>

            {/* Ampersand Icon - Fade & Scale ở giữa */}
            <GsapReveal delay={0.35} direction="none">
              <div className="font-calligraphy text-3xl sm:text-4xl text-[#fcd34d] my-2 select-none pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)] animate-pulse">
                &amp;
              </div>
            </GsapReveal>

            {/* Bride - Trượt mượt từ PHẢI sang TRÁI */}
            <GsapReveal delay={0.4} direction="left" distance={65} duration={1.1} className="flex flex-col items-center">
              <h3 className="font-serif-title text-3xl sm:text-4xl md:text-[44px] font-bold tracking-wide mb-1 leading-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
                {brideName || "Vũ Bảo Ngọc"}
              </h3>
              <p className="text-xs font-serif-title uppercase tracking-[0.25em] text-[#e7bf78] font-semibold">
                {brideRank || "ÚT NỮ"}
              </p>
            </GsapReveal>
          </div>

          {/* Ceremony Details & Structured Date Block */}
          <div className="mt-8 pt-4 w-full flex flex-col items-center">
            <GsapReveal delay={0.45} direction="right" distance={45}>
              <p className="font-serif-title tracking-[0.2em] text-xs sm:text-sm font-semibold uppercase text-[#f4d79d] leading-relaxed">
                {displayCeremonyTitle} ĐƯỢC CỬ HÀNH TẠI
              </p>
            </GsapReveal>

            <GsapReveal delay={0.5} direction="left" distance={45} className="mb-5">
              <p className="font-bold text-white text-sm sm:text-base tracking-widest uppercase font-serif-title">
                {ceremonyLocation}
              </p>
            </GsapReveal>

            <GsapReveal delay={0.55} direction="right" distance={45}>
              <div className="flex items-center justify-center gap-4 tracking-[0.2em] text-xs sm:text-sm font-bold uppercase text-[#fff0f0] mb-4">
                <span>VÀO LÚC {ceremonyTime}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#e7bf78]" />
                <span>{dInfo.dayOfWeek}</span>
              </div>
            </GsapReveal>

            {/* Date Box: Large Date (Trái -> Phải) | Month & Year (Phải -> Trái) */}
            <div className="flex items-center justify-center gap-4 my-2">
              <GsapReveal delay={0.6} direction="right" distance={45}>
                <span className="font-serif-title text-4xl sm:text-5xl font-normal text-white tracking-tight drop-shadow-xs" style={{ fontVariantNumeric: "lining-nums tabular-nums" }}>
                  {dInfo.date}
                </span>
              </GsapReveal>
              <GsapReveal delay={0.62} direction="none">
                <div className="w-[1.5px] h-10 bg-[#e7bf78]/40" />
              </GsapReveal>
              <GsapReveal delay={0.65} direction="left" distance={45}>
                <div className="flex flex-col text-left font-serif-title uppercase leading-tight">
                  <span className="text-sm font-bold tracking-widest text-white">
                    {dInfo.month}
                  </span>
                  <span className="text-xs sm:text-sm tracking-widest text-[#f4d79d] font-semibold" style={{ fontVariantNumeric: "lining-nums tabular-nums" }}>
                    {dInfo.year}
                  </span>
                </div>
              </GsapReveal>
            </div>

            {/* Lunar Date */}
            <GsapReveal delay={0.7} direction="right" distance={35}>
              <p className="text-xs font-serif-title uppercase tracking-widest text-[#f4d79d] font-medium mt-4 opacity-95">
                {lunarDateStr || "(TỨC NGÀY 15 THÁNG 11 NĂM ẤT TỴ)"}
              </p>
            </GsapReveal>
          </div>
        </div>
      </div>
    </section>
  );
}


