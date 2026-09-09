import { WeddingData } from "@/entities/invitation/model/types";
import { AnimateView } from "@/widgets/invitation-blocks";
import { Heart } from "lucide-react";
import { parseDateRobust } from "@/shared/lib/utils/date";

interface MonthlyCalendarCardProps {
  weddingData: WeddingData;
}

export function MonthlyCalendarCard({ weddingData }: MonthlyCalendarCardProps) {
  const { weddingDate, coverImage, galleryImages } = weddingData;

  const bgImage =
    (galleryImages && galleryImages.length > 3 ? galleryImages[3] : null) ||
    coverImage ||
    "https://cdn.taothiep.com/wedding-user-assets/images/cmp2snpce001501myev2iysu3/acee2e70-23fa-40cb-8e78-881e8e275b13.webp?crop=178,143,444,315&zoom=1.8";

  // Parse wedding date with robust parser
  const dateObj = parseDateRobust(weddingDate);
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth(); // 0-indexed
  const selectedDay = dateObj.getDate();

  // Get total days in this month
  const totalDays = new Date(year, month + 1, 0).getDate();
  // Get starting day of week (Monday as first day)
  const firstDayIndex = (new Date(year, month, 1).getDay() + 6) % 7; // 0 for Mon, 6 for Sun

  const daysOfWeek = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  // Generate calendar grid items
  const calendarCells: (number | null)[] = [];
  for (let i = 0; i < firstDayIndex; i++) {
    calendarCells.push(null);
  }
  for (let day = 1; day <= totalDays; day++) {
    calendarCells.push(day);
  }

  return (
    <section className="relative w-full overflow-hidden bg-[#2C6E91] text-white">
      {/* Background Image Container with Overlay */}
      <div className="relative w-full aspect-[430/340] min-h-[330px] md:min-h-[380px] overflow-hidden">
        <img
          src={bgImage}
          alt="Calendar background"
          className="w-full h-full object-cover object-center pointer-events-none"
        />

        {/* Gradient dark overlay */}
        <div className="absolute inset-0 bg-black/65 backdrop-blur-[2px] pointer-events-none" />

        {/* Calendar Content Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 z-10 select-none">
          {/* Tiêu đề Tháng */}
          <AnimateView animation="fadeInUp" duration={1}>
            <h3
              className="text-[28px] sm:text-[34px] md:text-[38px] font-normal tracking-wide text-white drop-shadow-md mb-2 text-center"
              style={{ fontFamily: "'Luxurious', 'Playfair Display', serif" }}
            >
              Tháng {month + 1} - {year}
            </h3>
          </AnimateView>

          {/* Lưới Lịch Tháng */}
          <AnimateView animation="fadeInUp" delay={0.15} duration={1} className="w-full max-w-[340px] sm:max-w-[390px] md:max-w-[430px]">
            <div className="bg-black/30 backdrop-blur-md rounded-2xl p-3 border border-white/20 shadow-2xl">
              {/* Day names header */}
              <div className="grid grid-cols-7 gap-1 text-center mb-2">
                {daysOfWeek.map((d, i) => (
                  <span
                    key={i}
                    className="text-[10px] sm:text-[11px] font-sans font-semibold tracking-wider text-white/80"
                  >
                    {d}
                  </span>
                ))}
              </div>

              {/* Day numbers grid */}
              <div className="grid grid-cols-7 gap-1 text-center">
                {calendarCells.map((day, idx) => {
                  if (day === null) {
                    return <div key={`empty-${idx}`} className="h-7 w-7" />;
                  }

                  const isWeddingDay = day === selectedDay;

                  return (
                    <div
                      key={`day-${day}`}
                      className="flex items-center justify-center h-7 w-7 sm:h-8 sm:w-8 mx-auto relative"
                    >
                      {isWeddingDay ? (
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#2C6E91] text-white font-bold flex flex-col items-center justify-center shadow-lg border-2 border-white animate-pulse">
                          <span className="text-[11px] leading-none">{day}</span>
                          <Heart size={8} className="fill-white text-white mt-0.5" />
                        </div>
                      ) : (
                        <span className="text-xs sm:text-sm font-lora text-white/90">
                          {day}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </AnimateView>
        </div>
      </div>
    </section>
  );
}

