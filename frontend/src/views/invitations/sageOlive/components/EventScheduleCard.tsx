import { WeddingData, WeddingEvent } from "@/entities/invitation/model/types";
import { AnimateView } from "@/widgets/invitation-blocks";
import { getVietnameseLunarDate } from "@/shared/lib/utils/date";

interface EventScheduleCardProps {
  weddingData: WeddingData;
}

export function EventScheduleCard({ weddingData }: EventScheduleCardProps) {
  const { events, weddingDate, weddingTime } = weddingData;

  // Helper to parse date strings into day, month, year, day of week
  const parseEventDate = (dateStr?: string) => {
    const defaultD = new Date("2026-12-25");
    const d = dateStr ? new Date(dateStr) : defaultD;
    const validD = isNaN(d.getTime()) ? defaultD : d;

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
      dayOfWeek: days[validD.getDay()],
      day: validD.getDate().toString().padStart(2, "0"),
      month: `tháng ${(validD.getMonth() + 1).toString().padStart(2, "0")}`,
      year: `năm ${validD.getFullYear()}`,
      lunar: getVietnameseLunarDate(validD.toISOString().split("T")[0]) || "(Tức ngày 17 tháng 11 năm Bính Ngọ)",
    };
  };

  // Default fallback events matching sample template
  const defaultEvents: WeddingEvent[] = [
    {
      id: "event_1",
      title: "bữa tiệc chung vui",
      time: weddingTime || "17:30",
      date: weddingDate || "2026-12-25",
      location: "tư gia nhà trai",
      address: weddingData.groomAddress || "Số 88 Vũ Trọng Phụng - Thanh Xuân - Hà Nội",
      mapUrl: "https://maps.app.goo.gl/zhLHF81Pjzu71Eru7",
    },
    {
      id: "event_2",
      title: "lễ thành hôn",
      time: "09:30",
      date: weddingDate ? new Date(new Date(weddingDate).getTime() + 86400000).toISOString().split("T")[0] : "2026-12-26",
      location: "tư gia nhà trai",
      address: weddingData.groomAddress || "Số 88 Vũ Trọng Phụng - Thanh Xuân - Hà Nội",
      mapUrl: "https://maps.app.goo.gl/zhLHF81Pjzu71Eru7",
    },
  ];

  const displayEvents = events && events.length > 0 ? events : defaultEvents;

  return (
    <section className="relative w-full bg-white text-[#5D733F] pt-8 pb-6 px-2 overflow-hidden">
      <div className="max-w-[430px] mx-auto space-y-8">
        {displayEvents.map((ev, index) => {
          const dateInfo = parseEventDate(ev.date || weddingDate);
          const timeDisplay = ev.time || weddingTime || "17:30";
          const mapLink =
            ev.mapUrl ||
            `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              `${ev.location || ""} ${ev.address || ""}`.trim() || "Hà Nội"
            )}`;

          return (
            <div key={ev.id || index} className="relative flex flex-col items-center text-center">
              {/* 1. Tiêu đề sự kiện (y=1769 / y=2186, font Lora 20px 600 uppercase) */}
              <AnimateView animation="fadeInUp" duration={1}>
                <h3 className="font-lora text-[20px] font-semibold uppercase tracking-normal text-[#5D733F] leading-snug">
                  {ev.title || "bữa tiệc chung vui"}
                </h3>
              </AnimateView>

              {/* 2. Dòng thời gian & Thứ (y=1804 / y=2221, font Lora 18px 400 uppercase) */}
              <AnimateView animation="fadeInUp" delay={0.1} duration={1}>
                <p className="font-lora text-[16px] sm:text-[18px] uppercase text-[#5D733F] mt-1 mb-2">
                  được tổ chức vào lúc {timeDisplay}, {dateInfo.dayOfWeek}
                </p>
              </AnimateView>

              {/* 3. Khung Ngày Tháng (y=1839 / y=2256): 
                  Cột Trái 'tháng 12' (w:120) | Giữa '25' (Alisheia 80px) | Cột Phải 'năm 2026' (w:120) */}
              <div className="w-full flex items-center justify-center gap-2 sm:gap-4 my-1">
                {/* Tháng (bên trái) */}
                <AnimateView animation="fadeInLeft" delay={0.15} duration={1} className="w-[110px] sm:w-[120px]">
                  <div className="border-y border-[#5D733F] py-1 text-center">
                    <span className="font-lora text-[18px] sm:text-[20px] uppercase text-[#5D733F] block font-normal leading-normal">
                      {dateInfo.month}
                    </span>
                  </div>
                </AnimateView>

                {/* Số ngày lớn ở giữa (Alisheia 80px) */}
                <AnimateView animation="zoomIn" delay={0.2} duration={1.2} className="w-[85px] sm:w-[95px]">
                  <div className="text-center">
                    <span
                      className="text-[72px] sm:text-[80px] leading-none text-[#5D733F] block font-normal select-none"
                      style={{ fontFamily: "'Alisheia', sans-serif" }}
                    >
                      {dateInfo.day}
                    </span>
                  </div>
                </AnimateView>

                {/* Năm (bên phải) */}
                <AnimateView animation="fadeInRight" delay={0.15} duration={1} className="w-[110px] sm:w-[120px]">
                  <div className="border-y border-[#5D733F] py-1 text-center">
                    <span className="font-lora text-[18px] sm:text-[20px] uppercase text-[#5D733F] block font-normal leading-normal">
                      {dateInfo.year}
                    </span>
                  </div>
                </AnimateView>
              </div>

              {/* 4. Ngày Âm Lịch (y=1924 / y=2343, font Lora 16px italic) */}
              <AnimateView animation="fadeInUp" delay={0.25} duration={1}>
                <p className="font-lora text-[15px] sm:text-[16px] italic text-[#5D733F] mt-1 mb-3">
                  {dateInfo.lunar}
                </p>
              </AnimateView>

              {/* 5. Nơi tổ chức (y=1962 / y=2379, font Lora 18px 600 uppercase) */}
              <AnimateView animation="fadeInUp" delay={0.3} duration={1}>
                <p className="font-lora text-[16px] sm:text-[18px] font-semibold uppercase text-[#5D733F]">
                  tại {ev.location || "tư gia nhà trai"}
                </p>
              </AnimateView>

              {/* 6. Địa chỉ (y=1999 / y=2416, font Lora 16px) */}
              <AnimateView animation="fadeInUp" delay={0.35} duration={1}>
                <p className="font-lora text-[15px] sm:text-[16px] text-[#5D733F] px-4 mt-0.5 mb-4 max-w-sm">
                  {ev.address || "Số 88 Vũ Trọng Phụng - Thanh Xuân - Hà Nội"}
                </p>
              </AnimateView>

              {/* 7. Nút XEM CHỈ ĐƯỜNG (pulse lặp lại) */}
              <AnimateView animation="pulse" infinite duration={1.8} className="flex justify-center">
                <a
                  href={mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[195px] h-[34px] rounded-full bg-[#5D733F] text-white font-lora text-[15px] sm:text-[16px] uppercase tracking-normal font-normal flex items-center justify-center shadow-md active:scale-95 transition-all duration-300"
                >
                  xem chỉ đường
                </a>
              </AnimateView>

              {/* Phân cách giữa các sự kiện: Icon nhẫn/hoa y=2107 */}
              {index < displayEvents.length - 1 && (
                <div className="pt-8 pb-4 flex justify-center">
                  <AnimateView animation="zoomIn" duration={1}>
                    <img
                      src="https://cdn.taothiep.com/wedding-user-assets/images/cmp2snpce001501myev2iysu3/ed45597b-0d1c-4ad8-a0a1-180b0483e2a4.webp"
                      alt="Wedding rings divider"
                      className="w-12 h-11 object-contain opacity-90"
                    />
                  </AnimateView>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}


