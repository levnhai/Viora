import { FadeIn } from "@/shared/ui/FadeIn";
import { WeddingData } from "@/entities/invitation/model/types";
import { useCountdown } from "@/shared/lib/hooks";
import { formatVietnameseDate } from "@/shared/lib/utils/date";

export interface MinimalCountdownProps {
  weddingData: WeddingData;
  primaryColor?: string;
  textColor?: string;
}

export function MinimalCountdown({ weddingData, primaryColor, textColor }: MinimalCountdownProps) {
  // Parse date and handle potential NaN issues
  let targetDateMs = Date.now() + 86400000 * 30; // fallback to 30 days
  try {
    // Attempt to parse just the date first
    const d = new Date(weddingData.weddingDate);
    if (!isNaN(d.getTime())) {
      // Nếu có giờ (vd "17:00"), ta gán giờ và phút vào ngày đó
      if (weddingData.weddingTime) {
        const [hours, minutes] = weddingData.weddingTime.split(":");
        if (hours && minutes) {
          d.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);
        }
      }
      targetDateMs = d.getTime();
    } else {
      // If the string is like DD-MM-YYYY, try basic split
      const parts = weddingData.weddingDate.split(/[-/]/);
      if (parts.length === 3) {
        // Assume DD-MM-YYYY
        const d2 = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
        if (!isNaN(d2.getTime())) targetDateMs = d2.getTime();
      }
    }
  } catch (e) {
    // fallback
  }

  const countdown = useCountdown(targetDateMs);
  console.log(countdown);

  const formattedDate = formatVietnameseDate(weddingData.weddingDate, {
    includeWeekday: true,
  });

  // Mặc định textColor nếu không truyền vào
  const color = textColor || "rgb(225,188,124)";

  return (
    <section className="pt-16 pb-4 px-4">
      <div className="max-w-4xl mx-auto">
        <FadeIn className="text-center space-y-4 mb-10">
          <h2 
            className="text-2xl font-serif uppercase tracking-widest"
            style={{ color }}
          >
            ĐẾM NGƯỢC THỜI GIAN
          </h2>
          <p 
            className="font-serif text-sm opacity-70"
            style={{ color }}
          >
            {formattedDate}
          </p>
        </FadeIn>

        <FadeIn delay={200} className="flex justify-center gap-4 sm:gap-8">
          {[
            { label: "Ngày", value: countdown.days },
            { label: "Giờ", value: countdown.hours },
            { label: "Phút", value: countdown.minutes },
            { label: "Giây", value: countdown.seconds },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div 
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border flex items-center justify-center shadow-[0_0_20px_rgba(225,188,124,0.1)] mb-3 relative overflow-hidden group"
                style={{ borderColor: `${color}80`, backgroundColor: `${color}0D` }}
              >
                <div 
                  className="absolute inset-0 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500"
                  style={{ backgroundColor: `${color}1A` }}
                ></div>
                <span 
                  className="text-2xl sm:text-3xl font-serif relative z-10"
                  style={{ color }}
                >
                  {isNaN(item.value)
                    ? "00"
                    : item.value.toString().padStart(2, "0")}
                </span>
              </div>
              <span 
                className="text-[11px] sm:text-xs uppercase tracking-[0.2em] opacity-70 font-sans font-semibold"
                style={{ color }}
              >
                {item.label}
              </span>
            </div>
          ))}
        </FadeIn>
      </div>
    </section>
  );
}
