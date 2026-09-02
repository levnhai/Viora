import { WeddingData, WeddingEvent } from "@/entities/invitation/model/types";
import { AnimateView } from "@/widgets/invitation-blocks";
import { getVietnameseLunarDate } from "@/shared/lib/utils/date";

interface EventScheduleCardProps {
  weddingData: WeddingData;
}

export function EventScheduleCard({ weddingData }: EventScheduleCardProps) {
  const { events, weddingDate, weddingTime } = weddingData;

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

  const defaultEvents: WeddingEvent[] = [
    {
      id: "event_1",
      title: "buổi tiệc chung vui",
      time: weddingTime || "17:30",
      date: weddingDate || "2026-12-25",
      locationName: "tư gia nhà trai",
      address: weddingData.groomAddress || "Số 88 Vũ Trọng Phụng - Thanh Xuân - Hà Nội",
      mapUrl: "https://maps.app.goo.gl/zhLHF81Pjzu71Eru7",
    },
    {
      id: "event_2",
      title: "lễ thành hôn",
      time: "09:30",
      date: weddingDate ? new Date(new Date(weddingDate).getTime() + 86400000).toISOString().split("T")[0] : "2026-12-26",
      locationName: "tư gia nhà trai",
      address: weddingData.groomAddress || "Số 88 Vũ Trọng Phụng - Thanh Xuân - Hà Nội",
      mapUrl: "https://maps.app.goo.gl/zhLHF81Pjzu71Eru7",
    },
  ];

  const displayEvents = events && events.length > 0 ? events : defaultEvents;

  return (
    <section className="relative w-full bg-white text-[#844C3A] pt-6 pb-6 px-2 overflow-hidden">
      <div className="max-w-[430px] mx-auto space-y-8">
        {displayEvents.map((ev, index) => {
          const dateInfo = parseEventDate(ev.date || weddingDate);
          const timeDisplay = ev.time || weddingTime || "17:30";
          const mapLink =
            ev.mapUrl ||
            `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              `${ev.locationName || (ev as any).location || ""} ${ev.address || ""}`.trim() || "Hà Nội"
            )}`;

          return (
            <div key={ev.id || index} className="relative flex flex-col items-center text-center">
              {/* 1. Tiêu đề sự kiện (y=1653 / y=2071, font Lora 20px 600 uppercase) */}
              <AnimateView animation="fadeInUp" duration={1}>
                <h3 className="font-lora text-[20px] font-semibold uppercase tracking-normal text-[#844C3A] leading-snug">
                  {ev.title || "buổi tiệc chung vui"}
                </h3>
              </AnimateView>

              {/* 2. Dòng thời gian & Thứ (y=1688 / y=2106, font Lora 18px 400 uppercase) */}
              <AnimateView animation="fadeInUp" delay={0.1} duration={1}>
                <p className="font-lora text-[16px] sm:text-[18px] uppercase text-[#844C3A] mt-1 mb-2">
                  được tổ chức vào lúc {timeDisplay}, {dateInfo.dayOfWeek}
                </p>
              </AnimateView>

              {/* 3. Khung Ngày Tháng (y=1723 / y=2141): 
                  Cột Trái 'tháng 12' (w:120) | Giữa '25' (Alisheia 80px) | Cột Phải 'năm 2026' (w:120) */}
              <div className="w-full flex items-center justify-center gap-2 sm:gap-4 my-1">
                {/* Tháng (bên trái) */}
                <AnimateView animation="fadeInLeft" delay={0.15} duration={1} className="w-[110px] sm:w-[120px]">
                  <div className="border-y border-[#844C3A] py-1 text-center">
                    <span className="font-lora text-[18px] sm:text-[20px] uppercase text-[#844C3A] block font-normal leading-normal">
                      {dateInfo.month}
                    </span>
                  </div>
                </AnimateView>

                {/* Số ngày lớn ở giữa (Alisheia 80px) */}
                <AnimateView animation="zoomIn" delay={0.2} duration={1.2} className="w-[85px] sm:w-[95px]">
                  <div className="text-center">
                    <span
                      className="text-[72px] sm:text-[80px] leading-none text-[#844C3A] block font-normal select-none"
                      style={{ fontFamily: "'Alisheia', sans-serif" }}
                    >
                      {dateInfo.day}
                    </span>
                  </div>
                </AnimateView>

                {/* Năm (bên phải) */}
                <AnimateView animation="fadeInRight" delay={0.15} duration={1} className="w-[110px] sm:w-[120px]">
                  <div className="border-y border-[#844C3A] py-1 text-center">
                    <span className="font-lora text-[18px] sm:text-[20px] uppercase text-[#844C3A] block font-normal leading-normal">
                      {dateInfo.year}
                    </span>
                  </div>
                </AnimateView>
              </div>

              {/* 4. Ngày Âm Lịch (y=1808 / y=2227, font Lora 16px italic) */}
              <AnimateView animation="fadeInUp" delay={0.25} duration={1}>
                <p className="font-lora text-[15px] sm:text-[16px] italic text-[#844C3A] mt-1 mb-3">
                  {dateInfo.lunar}
                </p>
              </AnimateView>

              {/* 5. Nơi tổ chức (y=1846 / y=2264, font Lora 18px 600 uppercase) */}
              <AnimateView animation="fadeInUp" delay={0.3} duration={1}>
                <p className="font-lora text-[16px] sm:text-[18px] font-semibold uppercase text-[#844C3A]">
                  tại {ev.locationName || (ev as any).location || "tư gia nhà trai"}
                </p>
              </AnimateView>

              {/* 6. Địa chỉ (y=1883 / y=2301, font Lora 16px) */}
              <AnimateView animation="fadeInUp" delay={0.35} duration={1}>
                <p className="font-lora text-[15px] sm:text-[16px] text-[#844C3A] px-4 mt-0.5 mb-4 max-w-sm">
                  {ev.address || "Số 88 Vũ Trọng Phụng - Thanh Xuân - Hà Nội"}
                </p>
              </AnimateView>

              {/* 7. Nút XEM CHỈ ĐƯỜNG (pulse) */}
              <AnimateView animation="pulse" infinite duration={1.8} className="flex justify-center">
                <a
                  href={mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[195px] h-[34px] rounded-full bg-[#844C3A] text-white font-lora text-[15px] sm:text-[16px] uppercase tracking-normal font-normal flex items-center justify-center shadow-md active:scale-95 transition-all duration-300"
                >
                  xem chỉ đường
                </a>
              </AnimateView>

              {/* Phân cách giữa 2 sự kiện (y=1990) */}
              {index < displayEvents.length - 1 && (
                <div className="pt-8 pb-4 flex justify-center">
                  <AnimateView animation="zoomIn" duration={1}>
                    <img
                      src="https://cdn.taothiep.com/wedding-user-assets/images/cmp2snpce001501myev2iysu3/9138ed97-03a5-4f7d-afab-96795ffbb609.webp?crop=0,123,533,346&zoom=1"
                      alt="Wedding divider"
                      className="w-16 h-10 object-contain opacity-90"
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
