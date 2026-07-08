import { FadeIn } from "@/shared/ui/FadeIn";
import { WeddingData } from "@/entities/invitation/model/types";
import { Heart } from "lucide-react";

interface MinimalEventInfoProps {
  weddingData: WeddingData;
  onOpenRsvpModal: () => void;
}

export function MinimalEventInfo({
  weddingData,
  onOpenRsvpModal,
}: MinimalEventInfoProps) {
  const { events } = weddingData;
  if (!events || events.length === 0) return null;

  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col gap-24">
          {events.map((ev, i) => {
            const dateParts = ev.date.split("/");
            const day = dateParts[0] || "";
            const monthYear =
              dateParts.length >= 2 ? `THÁNG ${dateParts[1]}` : "";
            const yearStr = dateParts.length >= 3 ? dateParts[2] : "2026";

            return (
              <FadeIn key={i} delay={i * 100}>
                <div className="text-center">
                  <p
                    className="text-[rgb(225,188,124)] font-serif uppercase tracking-widest text-sm mb-4"
                    style={{ textShadow: "0 0 10px rgba(225,188,124,0.3)" }}
                  >
                    Lễ thành hôn được cử hành tại
                    <br />
                    {ev.locationName.toUpperCase()}
                  </p>
                  <p
                    className="text-[rgb(225,188,124)] font-serif uppercase tracking-widest text-sm mb-8"
                    style={{ textShadow: "0 0 10px rgba(225,188,124,0.3)" }}
                  >
                    VÀO LÚC
                  </p>
                  <h3 className="text-4xl mb-8 text-[rgb(225,188,124)] font-serif drop-shadow-[0_0_15px_rgba(225,188,124,0.5)]">
                    {ev.time.split(" ")[0]}
                  </h3>
                  <div className="flex justify-center items-center gap-6 mb-8 text-[rgb(225,188,124)] font-serif">
                    <span className="uppercase tracking-widest text-sm">
                      CHỦ NHẬT
                    </span>
                    <span className="text-xl font-light">|</span>
                    <span className="text-4xl">{day}</span>
                    <span className="text-xl font-light">|</span>
                    <span className="uppercase tracking-widest text-sm">
                      {monthYear}
                    </span>
                  </div>
                  <div className="space-y-4 mb-16">
                    <h4 className="text-2xl font-serif text-[rgb(225,188,124)]">
                      {yearStr}
                    </h4>
                    <p className="text-xs uppercase tracking-widest font-serif text-[rgb(225,188,124)]/80">
                      (Tức ngày 15/04 năm Bính Ngọ)
                    </p>
                  </div>
                  {/* Giờ đón khách & Khai tiệc */}
                  <div className="flex justify-center items-center gap-16 mb-16 font-serif">
                    <div className="text-center">
                      <p className="text-[rgb(225,188,124)] uppercase tracking-widest text-sm mb-2">
                        ĐÓN KHÁCH
                      </p>
                      <p className="text-[rgb(225,188,124)] text-xl font-light">
                        17:30
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-[rgb(225,188,124)] uppercase tracking-widest text-sm mb-2">
                        KHAI TIỆC
                      </p>
                      <p className="text-[rgb(225,188,124)] text-xl font-light">
                        18:00
                      </p>
                    </div>
                  </div>
                  {/* Lịch */}
                  <div className="border border-[rgb(225,188,124)]/30 rounded-lg p-6 max-w-sm mx-auto mb-10 bg-[rgb(225,188,124)]/5 shadow-[inset_0_0_20px_rgba(225,188,124,0.05)] hover:shadow-[0_0_20px_rgba(225,188,124,0.15)] transition-shadow duration-500 ml-2 mr-2">
                    <h5 className="text-[rgb(225,188,124)] font-serif text-lg mb-4 drop-shadow-[0_0_8px_rgba(225,188,124,0.3)]">
                      {monthYear.replace("THÁNG", "Tháng")} / {yearStr}
                    </h5>

                    <div className="grid grid-cols-7 gap-y-4 text-sm font-serif">
                      <div className="text-[rgb(225,188,124)]/80 pb-2 border-b border-[rgb(225,188,124)]/40 mb-2">
                        T2
                      </div>
                      <div className="text-[rgb(225,188,124)]/80 pb-2 border-b border-[rgb(225,188,124)]/40 mb-2">
                        T3
                      </div>
                      <div className="text-[rgb(225,188,124)]/80 pb-2 border-b border-[rgb(225,188,124)]/40 mb-2">
                        T4
                      </div>
                      <div className="text-[rgb(225,188,124)]/80 pb-2 border-b border-[rgb(225,188,124)]/40 mb-2">
                        T5
                      </div>
                      <div className="text-[rgb(225,188,124)]/80 pb-2 border-b border-[rgb(225,188,124)]/40 mb-2">
                        T6
                      </div>
                      <div className="text-[rgb(225,188,124)]/80 pb-2 border-b border-[rgb(225,188,124)]/40 mb-2">
                        T7
                      </div>
                      <div className="text-[rgb(225,188,124)]/80 pb-2 border-b border-[rgb(225,188,124)]/40 mb-2">
                        CN
                      </div>

                      {(() => {
                        const m = parseInt(dateParts[1]) - 1 || 0;
                        const y = parseInt(yearStr) || 2026;
                        const firstDay = new Date(y, m, 1).getDay();
                        const startDayIndex = firstDay === 0 ? 6 : firstDay - 1;
                        const daysInMonth = new Date(y, m + 1, 0).getDate();
                        const targetDay = parseInt(day);

                        const cells = [];
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
                                <Heart className="absolute fill-[rgb(225,188,124)] text-[rgb(225,188,124)] w-8 h-8 opacity-80" />
                              )}
                              <span
                                className={`relative z-10 ${isTarget ? "text-[rgb(0,26,8)] font-bold" : "text-[rgb(225,188,124)]"}`}
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
                    className="relative px-10 py-3 bg-[rgb(225,188,124)] text-[rgb(0,26,8)] font-serif uppercase tracking-widest text-sm font-semibold rounded-full hover:bg-[rgb(225,188,124)]/90 transition-transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(225,188,124,0.4)] overflow-hidden"
                  >
                    <span>XÁC NHẬN</span>
                    <div
                      className="absolute top-0 h-full w-8 pointer-events-none animate-shine"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)",
                      }}
                    ></div>
                  </button>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
