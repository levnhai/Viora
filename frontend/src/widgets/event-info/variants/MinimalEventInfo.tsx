import { GsapReveal } from "@/shared/ui/GsapReveal";
import { WeddingData } from "@/entities/invitation/model/types";
import { Heart } from "lucide-react";
import React from "react";
import {
  getVietnameseWeekday,
  getVietnameseLunarDate,
} from "@/shared/lib/utils/date";

interface MinimalEventInfoProps {
  weddingData: WeddingData;
  onOpenRsvpModal: () => void;
  primaryColor?: string;
  textColor?: string;
}

export function MinimalEventInfo({
  weddingData,
  onOpenRsvpModal,
  primaryColor,
  textColor,
}: MinimalEventInfoProps) {
  const { events } = weddingData;
  if (!events || events.length === 0) return null;

  const pColor = textColor || "#e1bc7c";
  const tColor = primaryColor || "#001A08";
  const pColor30 = pColor + "4D"; // 30% opacity
  const pColor50 = pColor + "80"; // 50% opacity
  const pColor80 = pColor + "CC"; // 80% opacity
  const pColor05 = pColor + "0D"; // 5% opacity
  const pColor15 = pColor + "26"; // 15% opacity

  return (
    <section className="pt-12 sm:pt-24 sm:pb-24 px-4 relative">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col gap-24">
          {events.map((ev, i) => {
            let day = "";
            let month = "";
            let year = "2026";

            if (ev.date.includes("-")) {
              const parts = ev.date.split("-");
              year = parts[0];
              month = parts[1];
              day = parts[2];
            } else if (ev.date.includes("/")) {
              const parts = ev.date.split("/");
              day = parts[0];
              month = parts[1];
              year = parts[2];
            }

            const monthYear = month ? `THÁNG ${month}` : "";
            const yearStr = year || "2026";

            const isoDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
            const weekday = getVietnameseWeekday(isoDate) || "CHỦ NHẬT";
            const lunarDate =
              getVietnameseLunarDate(isoDate) ||
              "(Tức ngày 15/04 năm Bính Ngọ)";

            return (
              <GsapReveal key={i} delay={i * 0.1} direction="up" distance={40}>
                <div className="text-center">
                  <p
                    className="font-serif uppercase tracking-widest text-sm mb-4"
                    style={{
                      color: pColor,
                      textShadow: `0 0 10px ${pColor30}`,
                    }}
                  >
                    Lễ thành hôn được cử hành tại
                    <br />
                    {ev.locationName.toUpperCase()}
                  </p>
                  <p
                    className="font-serif uppercase tracking-widest text-sm mb-8"
                    style={{
                      color: pColor,
                      textShadow: `0 0 10px ${pColor30}`,
                    }}
                  >
                    VÀO LÚC
                  </p>
                  <h3
                    className="text-4xl mb-12 font-serif"
                    style={{
                      color: pColor,
                      textShadow: `0 0 15px ${pColor50}`,
                    }}
                  >
                    {ev.time.split(" ")[0]}
                  </h3>
                  <div
                    className="flex justify-center items-center gap-3 sm:gap-6 mb-8 font-serif"
                    style={{ color: pColor }}
                  >
                    <span className="uppercase tracking-widest text-sm">
                      {weekday}
                    </span>
                    <span className="text-xl font-light">|</span>
                    <span className="text-4xl">{day}</span>
                    <span className="text-xl font-light">|</span>
                    <span className="uppercase tracking-widest text-sm">
                      {monthYear}
                    </span>
                  </div>
                  <div className="space-y-4 mb-16">
                    <h4
                      className="text-2xl font-serif"
                      style={{ color: pColor }}
                    >
                      {yearStr}
                    </h4>
                    <p
                      className="text-xs uppercase tracking-widest font-serif"
                      style={{ color: pColor80 }}
                    >
                      {lunarDate}
                    </p>
                  </div>
                  {/* Lịch */}
                  <div
                    className="border rounded-lg p-6 max-w-[90%] sm:max-w-sm mx-auto mb-10 transition-shadow duration-500"
                    style={{
                      borderColor: pColor30,
                      backgroundColor: pColor05,
                      boxShadow: `inset 0 0 20px ${pColor05}, 0 0 20px ${pColor15}`,
                    }}
                  >
                    <h5
                      className="font-serif text-lg mb-4"
                      style={{
                        color: pColor,
                        textShadow: `0 0 8px ${pColor30}`,
                      }}
                    >
                      {monthYear.replace("THÁNG", "Tháng")} / {yearStr}
                    </h5>

                    <div className="grid grid-cols-7 gap-y-4 text-sm font-serif">
                      {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((day) => (
                        <div
                          key={day}
                          className="pb-2 border-b mb-2"
                          style={{
                            color: pColor80,
                            borderColor: pColor + "66",
                          }}
                        >
                          {day}
                        </div>
                      ))}

                      {(() => {
                        const m = parseInt(month) - 1 || 0;
                        const y = parseInt(yearStr) || 2026;
                        const firstDay = new Date(y, m, 1).getDay();
                        const startDayIndex = firstDay === 0 ? 6 : firstDay - 1;
                        const daysInMonth = new Date(y, m + 1, 0).getDate();
                        const targetDay = parseInt(day);

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
                                  className="absolute w-8 h-8 opacity-80"
                                  style={{ fill: pColor, color: pColor }}
                                />
                              )}
                              <span
                                className={`relative z-10 ${isTarget ? "font-bold" : ""}`}
                                style={
                                  isTarget
                                    ? { color: tColor }
                                    : { color: pColor }
                                }
                              >
                                {d}
                              </span>
                            </div>,
                          );
                        }
                        return cells;
                      })()}
                    </div>
                  </div>
                  <button
                    onClick={onOpenRsvpModal}
                    className="relative px-10 py-3 font-serif uppercase tracking-widest text-sm font-semibold rounded-full transition-transform hover:scale-105 active:scale-95 overflow-hidden"
                    style={{
                      backgroundColor: pColor,
                      color: tColor,
                      boxShadow: `0 0 20px ${pColor + "66"}`,
                    }}
                  >
                    <span style={{ opacity: 0.9 }}>XÁC NHẬN</span>
                    <div
                      className="absolute top-0 h-full w-8 pointer-events-none animate-shine"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)",
                      }}
                    ></div>
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
