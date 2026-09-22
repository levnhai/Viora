import React, { useState, useEffect } from "react";
import { WeddingData } from "@/entities/invitation/model/types";
import { parseDateRobust, getVietnameseLunarDate, getVietnameseWeekday } from "@/shared/lib/utils/date";
import { AnimateView } from "@/widgets/invitation-blocks";

interface ReceptionInfoProps {
  weddingData: WeddingData;
  onScrollToRsvp?: () => void;
}

export const ReceptionInfo: React.FC<ReceptionInfoProps> = ({
  weddingData,
  onScrollToRsvp,
}) => {
  const weddingDateStr = weddingData.weddingDate || "2026-12-19";
  const dateObj = parseDateRobust(weddingDateStr);
  const dayStr = String(dateObj.getDate()).padStart(2, "0");
  const monthStr = String(dateObj.getMonth() + 1).padStart(2, "0");
  const yearStr = String(dateObj.getFullYear());
  const weekdayStr = getVietnameseWeekday(weddingDateStr) || "THỨ BẢY";
  const lunarStr = getVietnameseLunarDate(weddingDateStr);

  const receptionTime = weddingData.events?.[1]?.time || weddingData.weddingTime || "18:00";
  const receptionLocation =
    weddingData.events?.[1]?.locationName ||
    weddingData.events?.[0]?.locationName ||
    "Trung tâm Tiệc cưới Bảo Ngọc Palace";
  const receptionAddress =
    weddingData.events?.[1]?.address ||
    weddingData.events?.[0]?.address ||
    "168 Nguyễn Tất Thành, thành phố Buôn Ma Thuột, tỉnh Đắk Lắk";

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Trích xuất target timestamp an toàn tuyệt đối
    let targetMs: number;
    try {
      const parsed = parseDateRobust(weddingDateStr);
      let h = 18;
      let m = 0;
      if (receptionTime) {
        const cleanTime = String(receptionTime).replace(/[^0-9:]/g, "");
        const parts = cleanTime.split(":");
        if (parts.length >= 1) h = parseInt(parts[0], 10) || 18;
        if (parts.length >= 2) m = parseInt(parts[1], 10) || 0;
      }
      parsed.setHours(h, m, 0, 0);
      targetMs = parsed.getTime();
      if (isNaN(targetMs)) {
        targetMs = new Date(2026, 11, 19, 18, 0, 0).getTime();
      }
    } catch {
      targetMs = new Date(2026, 11, 19, 18, 0, 0).getTime();
    }

    const updateCountdown = () => {
      const now = Date.now();
      const difference = targetMs - now;

      if (isNaN(difference) || difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const rawDays = Math.floor(difference / (1000 * 60 * 60 * 24));
      const rawHours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const rawMinutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const rawSeconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        days: isNaN(rawDays) ? 0 : rawDays,
        hours: isNaN(rawHours) ? 0 : rawHours,
        minutes: isNaN(rawMinutes) ? 0 : rawMinutes,
        seconds: isNaN(rawSeconds) ? 0 : rawSeconds,
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [weddingDateStr, receptionTime]);

  // Render Monthly Calendar an toàn
  const targetYear = isNaN(dateObj.getFullYear()) ? 2026 : dateObj.getFullYear();
  const targetMonth = isNaN(dateObj.getMonth()) ? 12 : dateObj.getMonth() + 1; // 1-12
  const targetDay = isNaN(dateObj.getDate()) ? 19 : dateObj.getDate();

  const firstDayOfMonth = new Date(targetYear, targetMonth - 1, 1).getDay(); // 0 is Sunday, 1 is Monday
  const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1; // 0 is Mon, 6 is Sun
  const daysInMonth = new Date(targetYear, targetMonth, 0).getDate();

  const calendarDays: (number | null)[] = [];
  for (let i = 0; i < adjustedFirstDay; i++) {
    calendarDays.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    calendarDays.push(d);
  }

  // Google Calendar URL
  const groomName = weddingData.groomShortName || weddingData.groomName || "Gia Bảo";
  const brideName = weddingData.brideShortName || weddingData.brideName || "Ngọc Diệp";
  const gCalTitle = encodeURIComponent(`Đám cưới ${groomName} & ${brideName}`);
  const gCalDetails = encodeURIComponent(`Tiệc cưới của ${groomName} & ${brideName} tại ${receptionLocation}, ${receptionAddress}`);
  const gCalLocation = encodeURIComponent(`${receptionLocation}, ${receptionAddress}`);
  const cleanDate = weddingDateStr.replace(/-/g, "");
  const gCalDates = `${cleanDate}T110000Z/${cleanDate}T140000Z`;
  const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${gCalTitle}&dates=${gCalDates}&ctz=Asia/Ho_Chi_Minh&details=${gCalDetails}&location=${gCalLocation}`;

  return (
    <section className="relative isolate flex w-full flex-col items-center mt-4">
      {/* Hoa mẫu đơn 4 góc */}
      <img
        src="/images/themes/baroque-v2-dark-red/flower3-decoration.webp"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute z-[1] h-auto max-w-none opacity-80"
        style={{
          left: "-13%",
          top: "-13px",
          width: "46%",
          filter: "drop-shadow(4px 4px 2px rgba(0,0,0,0.25))",
          transform: "scaleX(-1)",
        }}
        loading="lazy"
      />
      <img
        src="/images/themes/baroque-v2-dark-red/flower3-decoration.webp"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute z-[1] h-auto max-w-none opacity-80"
        style={{
          right: "-13%",
          top: "-13px",
          width: "46%",
          filter: "drop-shadow(4px 4px 2px rgba(0,0,0,0.25))",
        }}
        loading="lazy"
      />
      <img
        src="/images/themes/baroque-v2-dark-red/flower4-decoration.webp"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute z-[1] h-auto max-w-none opacity-80"
        style={{
          left: "-10%",
          bottom: "10px",
          width: "40%",
          filter: "drop-shadow(4px 4px 2px rgba(0,0,0,0.25))",
        }}
        loading="lazy"
      />
      <img
        src="/images/themes/baroque-v2-dark-red/flower4-decoration.webp"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute z-[1] h-auto max-w-none opacity-80"
        style={{
          right: "-10%",
          bottom: "10px",
          width: "40%",
          transform: "scaleX(-1)",
          filter: "drop-shadow(4px 4px 2px rgba(0,0,0,0.25))",
        }}
        loading="lazy"
      />

      <div className="relative z-10 flex w-full max-w-[400px] md:max-w-[540px] flex-col items-center gap-3 px-5 pb-8 pt-16 md:px-8 md:pt-20">
        {/* Tiêu đề */}
        <AnimateView animation="fadeInDown" duration={0.8}>
          <h2
            className="uppercase text-center relative z-10 text-[20px] md:text-[24px] font-bold tracking-wider"
            style={{
              color: "#ffdfaf",
              fontFamily: '"Times New Roman", "Baskerville", serif',
            }}
          >
            THÔNG TIN TIỆC CƯỚI
          </h2>
        </AnimateView>

        <AnimateView animation="fadeIn" duration={0.8} delay={0.1}>
          <img
            src="/images/themes/baroque-v2-dark-red/line2-decoration.webp"
            alt=""
            aria-hidden="true"
            className="pointer-events-none mb-2 block h-auto w-[140px] md:w-[180px] object-contain"
            style={{ filter: "drop-shadow(4px 4px 2px rgba(0,0,0,0.25))" }}
            loading="lazy"
          />
        </AnimateView>

        {/* Nội dung ngày giờ tiệc */}
        <div
          className="flex w-full flex-col items-center gap-2 text-center"
          style={{
            fontFamily: '"Baskerville", "Libre Baskerville", "Times New Roman", serif',
            color: "#ffdfaf",
          }}
        >
          <AnimateView animation="fadeInUp" duration={0.8} delay={0.1}>
            <h3 className="font-semibold uppercase text-[16px] md:text-[18px]">
              Tiệc cưới sẽ diễn ra vào lúc:
            </h3>

            <div className="flex items-center justify-center gap-4 text-[14px] md:text-[15px] uppercase font-semibold text-[#ffefd6] mt-1">
              <span>{weekdayStr}</span>
              <span>•</span>
              <span>{receptionTime}</span>
            </div>
          </AnimateView>

          {/* Ngày Tháng Block */}
          <AnimateView animation="zoomIn" duration={0.9} delay={0.15} className="flex items-center justify-center gap-2 mt-1" style={{ color: "#ffdfaf" }}>
            <img
              src="/images/themes/baroque-v2-dark-red/line4-decoration.webp"
              alt=""
              aria-hidden="true"
              className="pointer-events-none block h-[75px] md:h-[85px] w-auto shrink-0 object-contain"
              style={{ filter: "drop-shadow(4px 4px 2px rgba(0,0,0,0.25))" }}
              loading="lazy"
            />
            <span
              className="text-[48px] md:text-[54px] leading-none font-bold"
              style={{
                fontFamily: '"Baskerville", "Times New Roman", serif',
                color: "#ffdfaf",
              }}
            >
              {dayStr}
            </span>
            <div className="h-[42px] w-px bg-[#ffdfaf]" />
            <div className="flex flex-col items-start justify-center gap-0.5 text-left">
              <span className="text-[14px] md:text-[16px] font-bold uppercase">
                THÁNG {monthStr}
              </span>
              <span className="text-[14px] md:text-[16px] font-bold uppercase">
                {yearStr}
              </span>
            </div>
            <img
              src="/images/themes/baroque-v2-dark-red/line4-decoration.webp"
              alt=""
              aria-hidden="true"
              className="pointer-events-none block h-[75px] md:h-[85px] w-auto shrink-0 object-contain"
              style={{
                filter: "drop-shadow(4px 4px 2px rgba(0,0,0,0.25))",
                transform: "scaleX(-1)",
              }}
              loading="lazy"
            />
          </AnimateView>

          {/* Âm Lịch */}
          <div
            className="text-[11px] md:text-[13px] uppercase tracking-[0.1em] font-medium"
            style={{ color: "#ffefd6" }}
          >
            {lunarStr || "(Tức ngày 11 tháng 11 năm Bính Ngọ)"}
          </div>

          {/* Cột mốc Đón khách & Khai tiệc */}
          <AnimateView animation="fadeInUp" duration={0.8} delay={0.2} className="flex items-center justify-center gap-10 mt-3">
            <div className="flex flex-col items-center">
              <span className="text-[11px] md:text-[13px] uppercase text-[#ffefd6]">
                Đón khách
              </span>
              <span className="text-[18px] md:text-[20px] font-bold text-[#ffdfaf] mt-0.5">
                {weddingData.events?.[0]?.time || "17:00"}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[11px] md:text-[13px] uppercase text-[#ffefd6]">
                Khai tiệc
              </span>
              <span className="text-[18px] md:text-[20px] font-bold text-[#ffdfaf] mt-0.5">
                {receptionTime}
              </span>
            </div>
          </AnimateView>

          {/* Đồng Hồ Đếm Ngược */}
          <AnimateView animation="zoomIn" duration={0.9} delay={0.2} className="flex items-center justify-center flex-col mt-5 w-full">
            <h4 className="text-[16px] md:text-[18px] uppercase tracking-wider text-[#ffefd6] font-medium">
              Cùng đếm ngược
            </h4>
            <div className="grid grid-cols-4 gap-2 sm:gap-3 mt-3 w-full max-w-[280px]">
              <div className="flex flex-col items-center bg-black/30 border border-[#ffdfaf]/20 rounded-lg py-2">
                <span className="text-xl sm:text-2xl font-bold text-[#ffdfaf]">
                  {String(Number(timeLeft.days) || 0).padStart(2, "0")}
                </span>
                <span className="text-[10px] uppercase text-[#ffefd6]">Ngày</span>
              </div>
              <div className="flex flex-col items-center bg-black/30 border border-[#ffdfaf]/20 rounded-lg py-2">
                <span className="text-xl sm:text-2xl font-bold text-[#ffdfaf]">
                  {String(Number(timeLeft.hours) || 0).padStart(2, "0")}
                </span>
                <span className="text-[10px] uppercase text-[#ffefd6]">Giờ</span>
              </div>
              <div className="flex flex-col items-center bg-black/30 border border-[#ffdfaf]/20 rounded-lg py-2">
                <span className="text-xl sm:text-2xl font-bold text-[#ffdfaf]">
                  {String(Number(timeLeft.minutes) || 0).padStart(2, "0")}
                </span>
                <span className="text-[10px] uppercase text-[#ffefd6]">Phút</span>
              </div>
              <div className="flex flex-col items-center bg-black/30 border border-[#ffdfaf]/20 rounded-lg py-2">
                <span className="text-xl sm:text-2xl font-bold text-[#ffdfaf]">
                  {String(Number(timeLeft.seconds) || 0).padStart(2, "0")}
                </span>
                <span className="text-[10px] uppercase text-[#ffefd6]">Giây</span>
              </div>
            </div>
          </AnimateView>

          {/* Lưới Lịch Tháng (Calendar Grid) */}
          <AnimateView animation="fadeInUp" duration={0.9} delay={0.25} className="mt-5 w-full max-w-[280px] sm:max-w-[320px] mx-auto rounded-xl overflow-hidden border border-[#ffdfaf]/25 bg-black/20 p-3">
            <div
              className="text-center py-1.5 text-[15px] sm:text-[16px] font-bold tracking-wide border-b border-[#ffdfaf]/30"
              style={{ color: "#ffdfaf" }}
            >
              Tháng {monthStr} / {yearStr}
            </div>

            <div className="grid grid-cols-7 border-b border-[#ffdfaf]/30 py-1 text-[#ffdfaf]/70 text-[10px] sm:text-[11px] font-medium text-center">
              <div>T2</div>
              <div>T3</div>
              <div>T4</div>
              <div>T5</div>
              <div>T6</div>
              <div>T7</div>
              <div>CN</div>
            </div>

            <div className="grid grid-cols-7 gap-y-1 py-2 text-center text-xs">
              {calendarDays.map((day, idx) => {
                if (!day) return <div key={idx} className="h-7" />;
                const isWeddingDay = day === targetDay;

                return (
                  <div key={idx} className="h-7 flex items-center justify-center">
                    {isWeddingDay ? (
                      <div className="relative w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center">
                        <svg
                          viewBox="0 0 24 22"
                          className="absolute inset-0 w-full h-full drop-shadow-md"
                          fill="#ffdfaf"
                        >
                          <path d="M12 21C12 21 1.5 13.5 1.5 7.5C1.5 4.46 3.96 2 7 2C8.76 2 10.35 2.81 11.4 4.09L12 4.8L12.6 4.09C13.65 2.81 15.24 2 17 2C20.04 2 22.5 4.46 22.5 7.5C22.5 13.5 12 21 12 21Z" />
                        </svg>
                        <span className="relative z-10 text-[10px] sm:text-[11px] font-bold text-[#511419]">
                          {day}
                        </span>
                      </div>
                    ) : (
                      <span className="text-[#ffefd6] text-[11px] sm:text-[12px] opacity-80">
                        {day}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </AnimateView>

          {/* Thêm Vào Lịch (Google Calendar Link) & Nút Xác Nhận */}
          <AnimateView animation="fadeInUp" duration={0.8} delay={0.3} className="flex flex-col items-center w-full">
            <a
              href={googleCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center justify-center text-[13px] md:text-[14px] underline underline-offset-4 text-[#ffdfaf] hover:text-white transition-colors"
            >
              Thêm vào lịch
            </a>

            {/* Nút Xác Nhận Tham Dự */}
            {onScrollToRsvp && (
              <div className="mt-4">
                <button
                  type="button"
                  onClick={onScrollToRsvp}
                  className="inline-flex items-center justify-center rounded-full px-8 py-2 text-[13px] font-bold uppercase transition-transform hover:scale-105 active:scale-95 shadow-lg cursor-pointer"
                  style={{
                    backgroundColor: "#ffdfaf",
                    color: "#511419",
                    fontFamily: '"Roboto", "Helvetica Neue", Arial, sans-serif',
                  }}
                >
                  XÁC NHẬN THAM DỰ
                </button>
              </div>
            )}
          </AnimateView>
        </div>
      </div>
    </section>
  );
};
