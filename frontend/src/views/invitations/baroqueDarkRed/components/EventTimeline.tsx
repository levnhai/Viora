import React from "react";
import { WeddingData } from "@/entities/invitation/model/types";
import { AnimateView } from "@/widgets/invitation-blocks";

interface EventTimelineProps {
  weddingData: WeddingData;
}

export const EventTimeline: React.FC<EventTimelineProps> = ({ weddingData }) => {
  const customTimeline = weddingData.timeline && weddingData.timeline.length > 0
    ? weddingData.timeline
    : null;

  const defaultSchedule = [
    { time: "17:00", title: "Đón khách", icon: null },
    {
      time: "18:00",
      title: "Khai tiệc",
      icon: "/images/themes/baroque-v2-dark-red/camera.webp",
    },
    {
      time: "18:20",
      title: "Rót rượu, cắt bánh",
      icon: "/images/themes/baroque-v2-dark-red/cake.webp",
    },
    {
      time: "18:45",
      title: "Phục vụ món chính",
      icon: "/images/themes/baroque-v2-dark-red/cook.webp",
    },
    { time: "20:30", title: "Kết thúc tiệc", icon: null },
  ];

  return (
    <section className="relative isolate flex w-full flex-col items-center py-6">
      <div className="relative z-10 flex w-full flex-col gap-4 px-6">
        <AnimateView animation="fadeInDown" duration={0.8}>
          <h2
            className="uppercase text-center relative z-10 text-[20px] md:text-[24px] font-bold tracking-wider mb-2"
            style={{
              color: "#ffdfaf",
              fontFamily: '"Times New Roman", "Baskerville", serif',
            }}
          >
            LỊCH TRÌNH NGÀY CƯỚI
          </h2>
        </AnimateView>

        {customTimeline ? (
          <ol className="relative mx-auto flex flex-col gap-6 w-full max-w-[420px]">
            {customTimeline.map((item, idx) => (
              <AnimateView
                key={idx}
                animation="fadeInUp"
                duration={0.8}
                delay={0.08 * idx}
              >
                <li
                  className="grid grid-cols-[80px_24px_1fr] items-center gap-3"
                  style={{ fontFamily: '"Times New Roman", serif' }}
                >
                  <span className="text-right text-[15px] md:text-[16px] font-semibold text-[#ffdfaf]">
                    {item.year || item.time || ""}
                  </span>
                  <span className="relative flex items-center justify-center h-full">
                    <span className="h-3 w-3 rounded-full bg-[#ffdfaf] ring-2 ring-[#ffdfaf]/30" />
                  </span>
                  <div className="text-left">
                    <div className="text-[14px] md:text-[15px] font-medium text-[#ffdfaf]">
                      {item.title}
                    </div>
                    {item.description && (
                      <div className="text-xs text-[#ffefd6]/80 mt-0.5">
                        {item.description}
                      </div>
                    )}
                  </div>
                </li>
              </AnimateView>
            ))}
          </ol>
        ) : (
          <ol
            className="relative mx-auto grid w-full max-w-[440px] grid-cols-[minmax(0,1fr)_20px_minmax(0,1fr)] items-center gap-x-6 md:gap-x-8 gap-y-7 md:gap-y-9"
            style={{ fontFamily: '"Times New Roman", serif' }}
          >
            {defaultSchedule.map((item, idx) => (
              <React.Fragment key={idx}>
                {/* Cột Giờ + Icon Minh Họa */}
                <AnimateView
                  animation="fadeInLeft"
                  duration={0.8}
                  delay={0.08 * idx}
                  className="flex items-center justify-end gap-2 text-right"
                >
                  {item.icon && (
                    <img
                      src={item.icon}
                      alt=""
                      aria-hidden="true"
                      className="block h-[34px] sm:h-[40px] w-auto shrink-0 object-contain drop-shadow-[2px_2px_4px_rgba(0,0,0,0.4)]"
                    />
                  )}
                  <span className="text-[15px] md:text-[17px] font-bold text-[#ffdfaf] tabular-nums">
                    {item.time}
                  </span>
                </AnimateView>

                {/* Trục Giữa */}
                <div className="relative flex items-center justify-center self-stretch">
                  {idx !== defaultSchedule.length - 1 && (
                    <div className="absolute left-1/2 -translate-x-1/2 w-px top-1/2 -bottom-7 md:-bottom-9 bg-[#ffdfaf]/40" />
                  )}
                  <div className="relative block h-2.5 w-2.5 rounded-full bg-[#ffdfaf] ring-4 ring-[#ffdfaf]/20 shadow-md" />
                </div>

                {/* Cột Hoạt Động */}
                <AnimateView
                  animation="fadeInRight"
                  duration={0.8}
                  delay={0.08 * idx}
                  className="text-left"
                >
                  <span className="text-[13px] md:text-[15px] font-medium text-[#ffefd6] leading-snug">
                    {item.title}
                  </span>
                </AnimateView>
              </React.Fragment>
            ))}
          </ol>
        )}
      </div>

      {/* Đường Phân Cách Mạ Vàng Dưới */}
      <AnimateView animation="fadeIn" duration={0.8} className="w-full flex justify-center">
        <img
          src="/images/themes/baroque-v2-dark-red/golden-line-decoration.webp"
          alt=""
          aria-hidden="true"
          className="pointer-events-none mx-auto block h-auto w-[75%] max-w-[320px] md:max-w-[420px] object-contain mt-8 md:mt-10"
          style={{ filter: "drop-shadow(4px 4px 2px rgba(0,0,0,0.25))" }}
          loading="lazy"
        />
      </AnimateView>
    </section>
  );
};
