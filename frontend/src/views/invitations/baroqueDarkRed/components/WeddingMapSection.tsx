import React from "react";
import { Navigation } from "lucide-react";
import { WeddingData } from "@/entities/invitation/model/types";
import { AnimateView } from "@/widgets/invitation-blocks";

interface WeddingMapSectionProps {
  weddingData: WeddingData;
}

export const WeddingMapSection: React.FC<WeddingMapSectionProps> = ({ weddingData }) => {
  const receptionLocation =
    weddingData.events?.[1]?.locationName ||
    weddingData.events?.[0]?.locationName ||
    "Trung tâm Tiệc cưới Bảo Ngọc Palace";
  const receptionAddress =
    weddingData.events?.[1]?.address ||
    weddingData.events?.[0]?.address ||
    "168 Nguyễn Tất Thành, TP. Buôn Ma Thuột, tỉnh Đắk Lắk";

  const mapQuery = encodeURIComponent(`${receptionLocation}, ${receptionAddress}`);
  const directMapUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`;
  const embedMapUrl = `https://maps.google.com/maps?q=${mapQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <section className="relative z-10 flex w-full flex-col items-center px-4 sm:px-6 py-6">
      {/* Tiêu đề */}
      <AnimateView animation="fadeInDown" duration={0.8} className="relative text-center">
        <h3
          className="uppercase text-center text-[18px] md:text-[22px] font-bold"
          style={{
            color: "#ffdfaf",
            fontFamily: '"Times New Roman", "Baskerville", serif',
          }}
        >
          Tiệc cưới sẽ tổ chức tại
        </h3>
        <div
          className="whitespace-pre-line mx-auto mt-2 max-w-[320px] md:max-w-[460px] text-center text-[13px] md:text-[14px] leading-relaxed text-[#ffefd6]"
          style={{
            fontFamily: '"Roboto", "Helvetica Neue", Arial, sans-serif',
          }}
        >
          <div className="font-semibold text-[#ffdfaf]">{receptionLocation}</div>
          <div className="text-xs md:text-sm mt-0.5 opacity-90">{receptionAddress}</div>
        </div>
      </AnimateView>

      {/* Map Container */}
      <div className="relative flex flex-col items-center gap-3 w-full mt-4 max-w-[340px] md:max-w-[540px]">
        <AnimateView animation="zoomIn" duration={0.9} delay={0.15} className="w-full h-[240px] md:h-[320px] rounded-2xl overflow-hidden border-2 border-[#ffdfaf]/30 shadow-2xl relative bg-black/40">
          <iframe
            title="Bản đồ chỉ đường"
            className="w-full h-full border-0"
            src={embedMapUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </AnimateView>

        {/* Nút Chỉ Đường */}
        <AnimateView animation="fadeInUp" duration={0.8} delay={0.2}>
          <a
            href={directMapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-6 py-2 text-sm font-semibold transition-transform hover:scale-105 active:scale-95 border border-[#ffdfaf]/40 shadow-md text-[#ffdfaf] hover:text-white bg-black/30"
            style={{
              fontFamily: '"Roboto", "Helvetica Neue", Arial, sans-serif',
            }}
          >
            <Navigation size={16} className="text-[#ffdfaf]" />
            <span>Chỉ đường</span>
          </a>
        </AnimateView>
      </div>
    </section>
  );
};
