import { GsapReveal } from "@/shared/ui/GsapReveal";
import { WeddingData } from "@/entities/invitation/model/types";
import React from "react";
import {
  getVietnameseWeekday,
  getVietnameseLunarDate,
} from "@/shared/lib/utils/date";

import img_1 from "@/shared/assets/image/flower/img_1.png";
import img_5 from "@/shared/assets/image/flower/img_5.webp";
import bgPaper from "@/shared/assets/image/paper/paper1.webp";

interface EventInfo1Props {
  weddingData: WeddingData;
  onOpenRsvpModal: () => void;
  primaryColor?: string;
  textColor?: string;
  flowerImage?: string;
  paperBg?: boolean;
}

export function EventInfo1({
  weddingData,
  onOpenRsvpModal,
  textColor: textColorProp,
  flowerImage,
  paperBg,
}: EventInfo1Props) {
  const { events } = weddingData;
  if (!events || events.length === 0) return null;

  // Filter party/reception events or display all events
  const partyEvents = events.filter((ev) => {
    const t = (ev?.title || "").toUpperCase();
    return (
      t.includes("TIỆC") ||
      t.includes("BÁO HỶ") ||
      t.includes("HÔN LỄ") ||
      t.includes("RECEPTION")
    );
  });
  const eventsToDisplay =
    partyEvents.length > 0 ? partyEvents : events.length > 1 ? [events[1]] : [events[0]];

  const isPaper = Boolean(paperBg || textColorProp === "#7c6a60");
  const isGradient = Boolean(textColorProp?.includes("gradient"));
  let solidThemeColor = textColorProp || "#4e0b12";
  if (isGradient) {
    if (
      textColorProp?.includes("#A82431") ||
      textColorProp?.includes("#851621") ||
      textColorProp?.includes("#4e0b12")
    ) {
      solidThemeColor = "#4e0b12";
    } else if (
      textColorProp?.includes("#7C") ||
      textColorProp?.includes("#5E") ||
      textColorProp?.includes("#423023") ||
      textColorProp?.includes("#2B1D14")
    ) {
      solidThemeColor = "#423023";
    } else {
      solidThemeColor = "#2E3D25";
    }
  }
  const cardBgColor = textColorProp || "#4e0b12";
  const mainTextColor = isPaper ? "rgb(124, 106, 96)" : "#fdfbf6";
  const calendarBgColor = isPaper ? "rgb(255, 252, 248)" : "#f5eee6";
  const calendarTextColor = isPaper ? "rgb(124, 106, 96)" : solidThemeColor;

  const bgPaperSrc =
    typeof bgPaper === "string" ? bgPaper : (bgPaper as any)?.src || "";
  const img5Src =
    typeof img_5 === "string" ? img_5 : (img_5 as any)?.src || "";

  const parseDateInfo = (dateStr: string) => {
    let year = "2026",
      month = "01",
      day = "03";
    if (dateStr) {
      if (dateStr.includes("-")) {
        [year, month, day] = dateStr.split("-");
      } else if (dateStr.includes("/")) {
        [day, month, year] = dateStr.split("/");
      }
    }
    const isoDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    const weekday = getVietnameseWeekday(isoDate) || "THỨ BẢY";
    let lunarDate =
      getVietnameseLunarDate(isoDate) || "(TỨC NGÀY 15 THÁNG 11 NĂM ẤT TỴ)";
    if (lunarDate) {
      lunarDate = lunarDate.toUpperCase().replace("/", " THÁNG ");
      if (!lunarDate.startsWith("(")) lunarDate = `(${lunarDate})`;
    }

    return {
      year,
      month: month.padStart(2, "0"),
      day: day.padStart(2, "0"),
      weekday,
      lunarDate,
    };
  };

  const calculateTimes = (baseTime?: string) => {
    const time = baseTime || "18:00";
    const [hStr, mStr] = time.split(":");
    let h = parseInt(hStr || "18");
    let m = parseInt(mStr || "00");
    let donH = h;
    let donM = m - 30;
    if (donM < 0) {
      donM += 60;
      donH -= 1;
    }
    return {
      donKhach: `${donH.toString().padStart(2, "0")}:${donM.toString().padStart(2, "0")}`,
      khaiTiec: `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`,
    };
  };

  const getGoogleCalendarUrl = (ev: any, dInfo: any) => {
    try {
      const title = ev?.title || "Tiệc Cưới";
      const year = dInfo.year || "2026";
      const month = dInfo.month || "01";
      const day = dInfo.day || "03";
      const [h = "18", m = "00"] = (ev?.time || "18:00").split(":");
      const startIso = `${year}${month}${day}T${h.padStart(2, "0")}${m.padStart(2, "0")}00`;
      const endH = (parseInt(h) + 3).toString().padStart(2, "0");
      const endIso = `${year}${month}${day}T${endH}${m.padStart(2, "0")}00`;
      const location = ev?.address || ev?.location || "";
      return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
        title,
      )}&dates=${startIso}/${endIso}&location=${encodeURIComponent(location)}`;
    } catch {
      return "#";
    }
  };

  if (isPaper) {
    return (
      <section
        className="relative pt-12 pb-20 px-4 sm:px-8 mx-4 sm:mx-8 overflow-hidden z-20 my-8 bg-center bg-repeat rounded-md shadow-sm"
        style={{
          backgroundColor: "rgb(246, 234, 221)",
          backgroundImage: `url(${bgPaper.src})`,
          backgroundBlendMode: "multiply",
        }}
      >
        {/* Decorative Leaves - Left */}
        <div
          className="absolute top-[15%] -left-[45px] w-[180px] opacity-25 pointer-events-none drop-shadow-md z-0"
          style={{ transform: "rotate(15deg)" }}
        >
          <img src={img5Src} alt="" className="w-full h-auto" />
        </div>

        {/* Decorative Leaves - Right Bottom */}
        <div
          className="absolute bottom-[-10%] -right-[45px] w-[180px] opacity-35 pointer-events-none drop-shadow-md z-0"
          style={{ transform: "rotate(44deg) scaleX(-1)" }}
        >
          <img src={img5Src} alt="" className="w-full h-auto" />
        </div>

        <div className="max-w-xl mx-auto relative z-10 flex flex-col items-center text-center">
          {eventsToDisplay.map((ev, i) => {
            const dInfo = parseDateInfo(ev.date);
            const times = calculateTimes(ev.time);
            const gcalUrl = getGoogleCalendarUrl(ev, dInfo);

            return (
              <div key={i} className="w-full flex flex-col items-center">
                {/* Header */}
                <GsapReveal direction="up" distance={20} delay={0.1} duration={0.8}>
                  <h2
                    className="text-xl sm:text-2xl font-bold uppercase tracking-widest mb-4 text-center"
                    style={{
                      color: mainTextColor,
                      fontFamily: '"Lora", "Times New Roman", serif',
                    }}
                  >
                    {(ev?.title || "THÔNG TIN TIỆC CƯỚI").toUpperCase()}
                  </h2>
                </GsapReveal>

                {/* Subtitle */}
                <GsapReveal direction="up" distance={20} delay={0.18} duration={0.8}>
                  <p
                    className="text-sm sm:text-base uppercase tracking-[0.15em] mb-6 opacity-90 text-center"
                    style={{
                      color: mainTextColor,
                      fontFamily: '"Lora", "Times New Roman", serif',
                    }}
                  >
                    TIỆC CƯỚI SẼ DIỄN RA VÀO LÚC:
                  </p>
                </GsapReveal>

                {/* Weekday & Time */}
                <GsapReveal direction="up" distance={20} delay={0.26} duration={0.8}>
                  <p
                    className="text-xs sm:text-sm font-medium uppercase tracking-[0.2em] mb-6 opacity-90"
                    style={{
                      color: mainTextColor,
                      fontFamily: '"Lora", "Times New Roman", serif',
                      fontVariantNumeric: "lining-nums tabular-nums",
                    }}
                  >
                    {dInfo.weekday} &nbsp;&nbsp; {ev.time || "18:00"}
                  </p>
                </GsapReveal>

                {/* Date Block */}
                <GsapReveal direction="up" distance={25} delay={0.34} duration={0.9}>
                  <div
                    className="flex items-center justify-center gap-4 mb-6"
                    style={{
                      color: mainTextColor,
                      fontFamily: '"Lora", "Times New Roman", serif',
                      fontVariantNumeric: "lining-nums tabular-nums",
                    }}
                  >
                    <span className="text-5xl sm:text-6xl font-normal leading-none">
                      {dInfo.day}
                    </span>
                    <div className="w-[1px] h-10 mx-1 bg-[#7c6a60]/30" />
                    <div className="flex flex-col text-left justify-center">
                      <span className="text-xs uppercase tracking-[0.2em] font-medium opacity-90">
                        THÁNG {dInfo.month}
                      </span>
                      <span className="text-xl font-normal mt-0.5">
                        {dInfo.year}
                      </span>
                    </div>
                  </div>
                </GsapReveal>

                {/* Lunar Date */}
                <GsapReveal direction="up" distance={15} delay={0.42} duration={0.8}>
                  <p
                    className="text-xs sm:text-sm uppercase tracking-[0.15em] mb-8 opacity-80"
                    style={{
                      color: mainTextColor,
                      fontFamily: '"Lora", "Times New Roman", serif',
                      fontVariantNumeric: "lining-nums tabular-nums",
                    }}
                  >
                    {dInfo.lunarDate}
                  </p>
                </GsapReveal>

                {/* Schedule */}
                <GsapReveal direction="up" distance={20} delay={0.5} duration={0.8}>
                  <div
                    className="flex items-center justify-center gap-12 sm:gap-16 text-center mb-8"
                    style={{
                      color: mainTextColor,
                      fontFamily: '"Lora", "Times New Roman", serif',
                      fontVariantNumeric: "lining-nums tabular-nums",
                    }}
                  >
                    <div>
                      <p className="text-[11px] uppercase tracking-widest opacity-70 mb-1 font-sans">
                        ĐÓN KHÁCH
                      </p>
                      <p className="text-xl sm:text-2xl font-normal">
                        {times.donKhach}
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-widest opacity-70 mb-1 font-sans">
                        KHAI TIỆC
                      </p>
                      <p className="text-xl sm:text-2xl font-normal">
                        {times.khaiTiec}
                      </p>
                    </div>
                  </div>
                </GsapReveal>

                {/* Calendar Card */}
                <GsapReveal direction="up" distance={25} delay={0.58} duration={0.9} className="w-full flex justify-center">
                  <div
                    className="rounded-2xl p-6 sm:p-8 w-full max-w-[340px] mx-auto mb-6 shadow-sm border border-[#7c6a60]/15"
                    style={{
                      backgroundColor: "rgb(255, 252, 248)",
                      color: calendarTextColor,
                      fontVariantNumeric: "lining-nums tabular-nums",
                    }}
                  >
                    <h5
                      className="text-2xl sm:text-3xl mb-3 text-center italic font-serif"
                      style={{
                        fontFamily: '"Lora", "Times New Roman", serif',
                      }}
                    >
                      Tháng {parseInt(dInfo.month)} / {dInfo.year}
                    </h5>

                    <div
                      className="border-b mb-3 pb-1"
                      style={{ borderColor: `${calendarTextColor}33` }}
                    />

                    <div className="grid grid-cols-7 gap-y-1 text-xs font-serif relative">
                      {/* Grid Headers */}
                      {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map(
                        (dayName) => (
                          <div
                            key={dayName}
                            className="text-center font-medium opacity-70 pb-2"
                          >
                            {dayName}
                          </div>
                        ),
                      )}

                      {/* Grid Cells */}
                      {(() => {
                        const m = parseInt(dInfo.month) - 1 || 0;
                        const y = parseInt(dInfo.year) || 2026;
                        const firstDay = new Date(y, m, 1).getDay();
                        const startDayIndex = firstDay === 0 ? 6 : firstDay - 1;
                        const daysInMonth = new Date(y, m + 1, 0).getDate();
                        const targetDay = parseInt(dInfo.day);

                        const cells: React.ReactNode[] = [];
                        for (let j = 0; j < startDayIndex; j++) {
                          cells.push(<div key={`empty-${j}`} />);
                        }
                        for (let d = 1; d <= daysInMonth; d++) {
                          const isTarget = d === targetDay;
                          cells.push(
                            <div
                              key={`day-${d}`}
                              className="relative flex items-center justify-center h-7"
                            >
                              {isTarget ? (
                                <div
                                  className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shadow-sm relative z-10"
                                  style={{
                                    backgroundColor: "#7c6a60",
                                    color: "#fdfbf6",
                                  }}
                                >
                                  {d}
                                </div>
                              ) : (
                                <span className="text-xs font-serif">
                                  {d}
                                </span>
                              )}
                            </div>,
                          );
                        }
                        return cells;
                      })()}
                    </div>
                  </div>
                </GsapReveal>

                {/* Add to Calendar Link */}
                <GsapReveal direction="up" distance={15} delay={0.66} duration={0.8}>
                  <a
                    href={gcalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs underline underline-offset-4 tracking-widest opacity-90 hover:opacity-100 transition-opacity mb-6 block text-center cursor-pointer"
                    style={{
                      color: mainTextColor,
                      fontFamily: '"Lora", "Times New Roman", serif',
                    }}
                  >
                    Thêm vào lịch
                  </a>
                </GsapReveal>

                {/* RSVP Button */}
                <GsapReveal direction="up" distance={20} delay={0.74} duration={0.8}>
                  <button
                    onClick={onOpenRsvpModal}
                    className="px-8 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-[0.15em] uppercase transition-all duration-300 hover:scale-105 active:scale-95 shadow-md cursor-pointer"
                    style={{
                      backgroundColor: "#7c6a60",
                      color: "#fdfbf6",
                      fontFamily: '"Lora", "Times New Roman", serif',
                    }}
                  >
                    XÁC NHẬN THAM DỰ
                  </button>
                </GsapReveal>
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 px-2 sm:px-8 relative overflow-visible">
      <div className="max-w-xl mx-auto relative">
        {eventsToDisplay.map((ev, i) => {
          const dInfo = parseDateInfo(ev.date);
          const times = calculateTimes(ev.time);
          const gcalUrl = getGoogleCalendarUrl(ev, dInfo);

          return (
            <div key={i} className="relative">
              {/* Decorative Flower - Left side overlapping dark card for minimal-do/xanh */}
              {!isPaper && (
                <div className="absolute -left-16 sm:-left-14 md:-left-16 top-12 sm:top-16 w-28 sm:w-44 md:w-48 z-0 pointer-events-none drop-shadow-2xl opacity-90 sm:opacity-100">
                  <img
                    src={
                      flowerImage ||
                      (img_1.src || (img_1 as unknown as string))
                    }
                    alt=""
                    className="w-full h-auto"
                  />
                </div>
              )}

              {/* Outer Card */}
              <div
                className={`py-10 sm:py-14 px-6 sm:px-12 relative z-10 flex flex-col items-center text-center overflow-hidden bg-center bg-repeat ${
                  isPaper
                    ? "rounded-2xl sm:rounded-3xl shadow-[0_12px_36px_-8px_rgba(124,106,96,0.25)] border border-[#7c6a60]/30"
                    : "rounded-[24px] sm:rounded-[32px] shadow-2xl border border-[#DCE7CF]/25"
                }`}
                style={{
                  backgroundColor: isPaper
                    ? "rgb(236, 218, 199)"
                    : cardBgColor?.includes("gradient")
                    ? undefined
                    : cardBgColor,
                  backgroundImage: isPaper ? `url(${bgPaper.src})` : undefined,
                  backgroundBlendMode: isPaper ? "multiply" : undefined,
                  background:
                    !isPaper && cardBgColor?.includes("gradient")
                      ? cardBgColor
                      : undefined,
                  color: mainTextColor,
                }}
              >
                  {/* Decorative Leaves for Paper Theme - matching MinimalCoupleSpotlight */}
                  {isPaper && (
                    <>
                      <div
                        className="absolute top-[20%] -left-[45px] w-[170px] opacity-25 pointer-events-none drop-shadow-md z-0"
                        style={{ transform: "rotate(15deg)" }}
                      >
                        <img src={img5Src} alt="" className="w-full h-auto" />
                      </div>
                      <div
                        className="absolute bottom-[-15%] -right-[45px] w-[170px] opacity-35 pointer-events-none drop-shadow-md z-0"
                        style={{ transform: "rotate(44deg) scaleX(-1)" }}
                      >
                        <img src={img5Src} alt="" className="w-full h-auto" />
                      </div>
                    </>
                  )}

                  {/* Header */}
                  <GsapReveal direction="up" distance={20} delay={0.1} duration={0.8}>
                    <h2
                      className="text-xl sm:text-2xl font-bold uppercase tracking-[0.2em] mb-4 relative z-10"
                      style={{
                        fontFamily: '"Lora", "Times New Roman", serif',
                      }}
                    >
                      {(ev?.title || "THÔNG TIN TIỆC CƯỚI").toUpperCase()}
                    </h2>
                  </GsapReveal>

                  {/* Subtitle */}
                  <GsapReveal direction="up" distance={20} delay={0.18} duration={0.8}>
                    <p
                      className="text-sm sm:text-base uppercase tracking-[0.15em] mb-6 opacity-90 relative z-10"
                      style={{
                        fontFamily: '"Lora", "Times New Roman", serif',
                      }}
                    >
                      TIỆC CƯỚI SẼ DIỄN RA VÀO LÚC:
                    </p>
                  </GsapReveal>

                  {/* Weekday & Time */}
                  <GsapReveal direction="up" distance={20} delay={0.26} duration={0.8}>
                    <p
                      className="text-xs sm:text-sm font-medium uppercase tracking-[0.2em] mb-6 opacity-90 relative z-10"
                      style={{
                        fontFamily: '"Lora", "Times New Roman", serif',
                        fontVariantNumeric: "lining-nums tabular-nums",
                      }}
                    >
                      {dInfo.weekday} &nbsp;&nbsp; {ev.time || "18:00"}
                    </p>
                  </GsapReveal>

                  {/* Date Block */}
                  <GsapReveal direction="up" distance={25} delay={0.34} duration={0.9}>
                    <div
                      className="flex items-center justify-center gap-4 mb-6 relative z-10"
                      style={{
                        fontFamily: '"Lora", "Times New Roman", serif',
                        fontVariantNumeric: "lining-nums tabular-nums",
                      }}
                    >
                      <span className="text-5xl sm:text-6xl font-normal leading-none">
                        {dInfo.day}
                      </span>
                      <div
                        className={`w-[1px] h-10 mx-1 ${
                          isPaper ? "bg-[#7c6a60]/30" : "bg-white/40"
                        }`}
                      />
                      <div className="flex flex-col text-left justify-center">
                        <span className="text-xs uppercase tracking-[0.2em] font-medium opacity-90">
                          THÁNG {dInfo.month}
                        </span>
                        <span className="text-xl font-normal mt-0.5">
                          {dInfo.year}
                        </span>
                      </div>
                    </div>
                  </GsapReveal>

                  {/* Lunar Date */}
                  <GsapReveal direction="up" distance={15} delay={0.42} duration={0.8}>
                    <p
                      className="text-xs sm:text-sm uppercase tracking-[0.15em] mb-8 opacity-80"
                      style={{
                        fontFamily: '"Lora", "Times New Roman", serif',
                        fontVariantNumeric: "lining-nums tabular-nums",
                      }}
                    >
                      {dInfo.lunarDate}
                    </p>
                  </GsapReveal>

                  {/* Schedule */}
                  <GsapReveal direction="up" distance={20} delay={0.5} duration={0.8}>
                    <div
                      className="flex items-center justify-center gap-12 sm:gap-16 text-center mb-8"
                      style={{
                        fontFamily: '"Lora", "Times New Roman", serif',
                        fontVariantNumeric: "lining-nums tabular-nums",
                      }}
                    >
                      <div>
                        <p className="text-[11px] uppercase tracking-widest opacity-70 mb-1 font-sans">
                          ĐÓN KHÁCH
                        </p>
                        <p className="text-xl sm:text-2xl font-normal">
                          {times.donKhach}
                        </p>
                      </div>
                      <div>
                        <p className="text-[11px] uppercase tracking-widest opacity-70 mb-1 font-sans">
                          KHAI TIỆC
                        </p>
                        <p className="text-xl sm:text-2xl font-normal">
                          {times.khaiTiec}
                        </p>
                      </div>
                    </div>
                  </GsapReveal>

                  {/* Calendar Card */}
                  <GsapReveal direction="up" distance={25} delay={0.58} duration={0.9} className="w-full flex justify-center">
                    <div
                      className="rounded-2xl p-6 sm:p-8 w-full max-w-[340px] mx-auto mb-6 shadow-md"
                      style={{
                        backgroundColor: calendarBgColor,
                        color: calendarTextColor,
                        fontVariantNumeric: "lining-nums tabular-nums",
                      }}
                    >
                      <h5
                        className="text-2xl sm:text-3xl mb-3 text-center italic font-serif"
                        style={{
                          fontFamily: '"Lora", "Times New Roman", serif',
                        }}
                      >
                        Tháng {parseInt(dInfo.month)} / {dInfo.year}
                      </h5>

                      <div
                        className="border-b mb-3 pb-1"
                        style={{ borderColor: `${calendarTextColor}33` }}
                      />

                      <div className="grid grid-cols-7 gap-y-1 text-xs font-serif relative">
                        {/* Grid Headers */}
                        {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map(
                          (dayName) => (
                            <div
                              key={dayName}
                              className="text-center font-medium opacity-70 pb-2"
                            >
                              {dayName}
                            </div>
                          ),
                        )}

                        {/* Grid Cells */}
                        {(() => {
                          const m = parseInt(dInfo.month) - 1 || 0;
                          const y = parseInt(dInfo.year) || 2026;
                          const firstDay = new Date(y, m, 1).getDay();
                          const startDayIndex = firstDay === 0 ? 6 : firstDay - 1;
                          const daysInMonth = new Date(y, m + 1, 0).getDate();
                          const targetDay = parseInt(dInfo.day);

                          const cells: React.ReactNode[] = [];
                          for (let j = 0; j < startDayIndex; j++) {
                            cells.push(<div key={`empty-${j}`} />);
                          }
                          for (let d = 1; d <= daysInMonth; d++) {
                            const isTarget = d === targetDay;
                            cells.push(
                              <div
                                key={`day-${d}`}
                                className="relative flex items-center justify-center h-7"
                              >
                                {isTarget ? (
                                  <div
                                    className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shadow-sm relative z-10"
                                    style={{
                                      backgroundColor: isPaper ? "#7c6a60" : calendarTextColor,
                                      color: isPaper ? "#fdfbf6" : (isGradient ? "#fdfbf6" : "#fdfbf6"),
                                    }}
                                  >
                                    {d}
                                  </div>
                                ) : (
                                  <span className="text-xs font-serif">
                                    {d}
                                  </span>
                                )}
                              </div>,
                            );
                          }
                          return cells;
                        })()}
                      </div>
                    </div>
                  </GsapReveal>

                  {/* Add to Calendar Link */}
                  <GsapReveal direction="up" distance={15} delay={0.66} duration={0.8}>
                    <a
                      href={gcalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs underline underline-offset-4 tracking-widest opacity-90 hover:opacity-100 transition-opacity mb-6 block text-center cursor-pointer"
                      style={{
                        color: mainTextColor,
                        fontFamily: '"Lora", "Times New Roman", serif',
                      }}
                    >
                      Thêm vào lịch
                    </a>
                  </GsapReveal>

                  {/* RSVP Button */}
                  <GsapReveal direction="up" distance={20} delay={0.74} duration={0.8}>
                    <button
                      onClick={onOpenRsvpModal}
                      className="px-8 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-[0.15em] uppercase transition-all duration-300 hover:scale-105 active:scale-95 shadow-md cursor-pointer"
                      style={{
                        backgroundColor: isPaper ? "#7c6a60" : "#fdfbf6",
                        color: isPaper ? "#fdfbf6" : solidThemeColor,
                        fontFamily: '"Lora", "Times New Roman", serif',
                      }}
                    >
                      XÁC NHẬN THAM DỰ
                    </button>
                  </GsapReveal>
                </div>
              </div>
          );
        })}
      </div>
    </section>
  );
}
