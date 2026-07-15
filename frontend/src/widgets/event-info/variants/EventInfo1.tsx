import { GsapReveal } from "@/shared/ui/GsapReveal";
import { WeddingData } from "@/entities/invitation/model/types";
import { Heart } from "lucide-react";
import React from "react";
import {
  getVietnameseWeekday,
  getVietnameseLunarDate,
} from "@/shared/lib/utils/date";
import img_5 from "@/shared/assets/image/flower/img_5.webp";
// Assuming img_1 is available, but the user used img_5 for both. I'll stick to img_5 or what is imported.

interface EventInfo1Props {
  weddingData: WeddingData;
  onOpenRsvpModal: () => void;
  primaryColor?: string;
  textColor?: string;
}

export function EventInfo1({
  weddingData,
  onOpenRsvpModal,
}: EventInfo1Props) {
  const { events } = weddingData;
  if (!events || events.length === 0) return null;

  const textColor = "#7c6a60";
  const bgCardColor = "#7c6a60"; 
  const textLightColor = "#fdfbf6";

  const parseDateInfo = (dateStr: string) => {
    let year = "2026", month = "01", day = "03";
    if (dateStr.includes("-")) {
      [year, month, day] = dateStr.split("-");
    } else if (dateStr.includes("/")) {
      [day, month, year] = dateStr.split("/");
    }
    const isoDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    const weekday = getVietnameseWeekday(isoDate) || "THỨ BẢY";
    const lunarDate = getVietnameseLunarDate(isoDate) || "(TỨC NGÀY 15/11 NĂM ẤT TỴ)";

    return {
      year,
      month,
      day,
      weekday,
      lunarDate,
    };
  };

  const calculateTimes = (baseTime: string) => {
    const [hStr, mStr] = baseTime.split(":");
    let h = parseInt(hStr || "17");
    let m = parseInt(mStr || "30");
    m += 30;
    if (m >= 60) {
      m -= 60;
      h += 1;
    }
    return {
      donKhach: baseTime,
      khaiTiec: `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`,
    };
  };

  return (
    <section className="pt-4 pb-24 px-4 sm:px-8 relative overflow-hidden">
      
      {/* Decorative Leaves - Top Right */}
      <div
        className="absolute top-[5%] -right-[30px] w-[200px] opacity-80 pointer-events-none drop-shadow-md z-0"
        style={{ transform: "rotate(-10deg) scaleX(-1)" }}
      >
        <img src={img_5.src || (img_5 as unknown as string)} alt="" className="w-full h-auto" />
      </div>

      {/* Decorative Leaves - Bottom Left */}
      <div
        className="absolute bottom-[2%] -left-[30px] w-[180px] opacity-90 pointer-events-none drop-shadow-md z-0"
        style={{ transform: "rotate(15deg)" }}
      >
        <img src={img_5.src || (img_5 as unknown as string)} alt="" className="w-full h-auto" />
      </div>

      <div className="max-w-xl mx-auto relative z-10">
        <div className="flex flex-col gap-24">
          {events.map((ev, i) => {
            const dInfo = parseDateInfo(ev.date);
            const times = calculateTimes(ev.time);

            return (
              <GsapReveal key={i} delay={i * 0.1} direction="up" distance={40}>
                <div className="flex flex-col items-center text-center">
                  
                  {/* Header */}
                  <h2
                    className="text-2xl sm:text-[26px] font-bold uppercase tracking-[0.2em] mb-10"
                    style={{ color: textColor, fontFamily: '"Lora", "Times New Roman", serif' }}
                  >
                    THÔNG TIN TIỆC CƯỚI
                  </h2>

                  <p
                    className="text-[13px] sm:text-[14px] uppercase tracking-[0.15em] leading-relaxed mb-6"
                    style={{ color: textColor, fontFamily: '"Lora", "Times New Roman", serif' }}
                  >
                    TIỆC CƯỚI SẼ DIỄN RA VÀO LÚC:
                  </p>

                  <h3
                    className="text-4xl mb-6"
                    style={{ color: textColor, fontFamily: '"Lora", "Times New Roman", serif' }}
                  >
                    {ev.time}
                  </h3>

                  {/* Date Block */}
                  <div
                    className="flex items-center justify-center gap-6 w-full mb-6"
                    style={{ fontFamily: '"Lora", "Times New Roman", serif', color: textColor }}
                  >
                    <span className="text-[12px] uppercase tracking-widest">{dInfo.weekday}</span>
                    <div className="w-[1px] h-6 bg-[#7c6a60] opacity-50"></div>
                    <span className="text-4xl leading-none font-medium">{dInfo.day}</span>
                    <div className="w-[1px] h-6 bg-[#7c6a60] opacity-50"></div>
                    <span className="text-[12px] uppercase tracking-widest">THÁNG {dInfo.month}</span>
                  </div>

                  <p
                    className="text-[22px] mb-4"
                    style={{ color: textColor, fontFamily: '"Lora", "Times New Roman", serif' }}
                  >
                    {dInfo.year}
                  </p>

                  <p
                    className="text-[12px] uppercase tracking-[0.15em] mb-10"
                    style={{ color: "rgba(124, 106, 96, 0.7)", fontFamily: '"Lora", "Times New Roman", serif' }}
                  >
                    {dInfo.lunarDate}
                  </p>

                  {/* Schedule */}
                  <div className="flex flex-row justify-center items-center gap-16 w-full mb-12">
                    <div className="flex flex-col items-center">
                      <p className="text-[11px] uppercase tracking-widest font-semibold mb-2" style={{ color: "rgba(124, 106, 96, 0.7)", fontFamily: '"Lora", "Times New Roman", serif' }}>
                        ĐÓN KHÁCH
                      </p>
                      <p className="text-xl" style={{ color: textColor, fontFamily: '"Lora", "Times New Roman", serif' }}>
                        {times.donKhach}
                      </p>
                    </div>
                    <div className="flex flex-col items-center">
                      <p className="text-[11px] uppercase tracking-widest font-semibold mb-2" style={{ color: "rgba(124, 106, 96, 0.7)", fontFamily: '"Lora", "Times New Roman", serif' }}>
                        KHAI TIỆC
                      </p>
                      <p className="text-xl" style={{ color: textColor, fontFamily: '"Lora", "Times New Roman", serif' }}>
                        {times.khaiTiec}
                      </p>
                    </div>
                  </div>

                  {/* Calendar Block */}
                  <div
                    className="rounded-[10px] p-6 pb-8 w-full max-w-[340px] mx-auto mb-10 shadow-md"
                    style={{ backgroundColor: bgCardColor }}
                  >
                    <h5
                      className="text-4xl mb-6 text-center capitalize"
                      style={{ color: textLightColor, fontFamily: 'var(--font-cursive)' }}
                    >
                      Tháng {parseInt(dInfo.month)} / {dInfo.year}
                    </h5>

                    <div className="grid grid-cols-7 gap-y-4 text-xs font-serif relative">
                      {/* Grid Headers */}
                      <div className="col-span-7 grid grid-cols-7 border-b pb-3 mb-2" style={{ borderColor: "rgba(253, 251, 246, 0.3)" }}>
                        {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((dayName) => (
                          <div
                            key={dayName}
                            className="text-center"
                            style={{ color: "rgba(253, 251, 246, 0.7)" }}
                          >
                            {dayName}
                          </div>
                        ))}
                      </div>

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
                              className="relative flex items-center justify-center h-8"
                            >
                              {isTarget && (
                                <Heart
                                  className="absolute w-7 h-7 drop-shadow-sm"
                                  style={{ fill: textLightColor, color: textLightColor }}
                                />
                              )}
                              <span
                                className={`relative z-10 ${isTarget ? "font-bold text-[14px]" : "text-[13px]"}`}
                                style={{
                                  color: isTarget ? textColor : textLightColor,
                                  marginTop: isTarget ? "-2px" : "0", 
                                }}
                              >
                                {d}
                              </span>
                            </div>
                          );
                        }
                        return cells;
                      })()}
                    </div>
                  </div>

                  {/* Add to Calendar Link */}
                  <div
                    className="text-[13px] font-medium tracking-[0.1em] underline underline-offset-4 mb-8 cursor-pointer hover:opacity-70 transition-opacity"
                    style={{ color: textColor, fontFamily: '"Lora", "Times New Roman", serif' }}
                  >
                    Thêm vào lịch
                  </div>

                  {/* RSVP Button */}
                  <button
                    onClick={onOpenRsvpModal}
                    className="px-8 py-3 rounded-full text-[13px] font-medium tracking-[0.15em] uppercase transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm"
                    style={{
                      backgroundColor: textColor,
                      color: textLightColor,
                      fontFamily: '"Lora", "Times New Roman", serif'
                    }}
                  >
                    XÁC NHẬN THAM DỰ
                  </button>

                </div>
              </GsapReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
