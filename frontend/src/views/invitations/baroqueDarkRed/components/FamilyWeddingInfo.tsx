import React from "react";
import { WeddingData } from "@/entities/invitation/model/types";
import { parseDateRobust, getVietnameseLunarDate, getVietnameseWeekday } from "@/shared/lib/utils/date";
import { AnimateView } from "@/widgets/invitation-blocks";

interface FamilyWeddingInfoProps {
  weddingData: WeddingData;
}

export const FamilyWeddingInfo: React.FC<FamilyWeddingInfoProps> = ({ weddingData }) => {
  const groomName = weddingData.groomName || "Lý Gia Bảo";
  const brideName = weddingData.brideName || "Phan Ngọc Diệp";

  const groomFather = weddingData.groomFatherName || "Lý Đình Khang";
  const groomMother = weddingData.groomMotherName || "Trương Thị Bích Vân";
  const groomAddress =
    weddingData.groomAddress ||
    "Số 27 Lê Lợi, phường Thắng Lợi, TP. Buôn Ma Thuột, tỉnh Đắk Lắk";

  const brideFather = weddingData.brideFatherName || "Phan Hữu Nghĩa";
  const brideMother = weddingData.brideMotherName || "Đoàn Thị Kim Yến";
  const brideAddress =
    weddingData.brideAddress ||
    "Thôn Tân Lập, xã Ea Kmút, huyện Ea Kar, tỉnh Đắk Lắk";

  const groomRank = weddingData.groomRank || "Trưởng Nam";
  const brideRank = weddingData.brideRank || "Út Nữ";

  const weddingDateStr = weddingData.weddingDate || "2026-12-19";
  const dateObj = parseDateRobust(weddingDateStr);
  const dayStr = String(dateObj.getDate()).padStart(2, "0");
  const monthStr = String(dateObj.getMonth() + 1).padStart(2, "0");
  const yearStr = String(dateObj.getFullYear());
  const weekdayStr = getVietnameseWeekday(weddingDateStr) || "THỨ BẢY";
  const lunarStr = getVietnameseLunarDate(weddingDateStr);

  const weddingTime = weddingData.weddingTime || "09:00";
  const ceremonyLocation =
    weddingData.events?.[0]?.locationName || "TƯ GIA";

  return (
    <section className="relative isolate flex w-full flex-col items-center">
      {/* Đường viền mạ vàng trên */}
      <AnimateView animation="fadeIn" duration={0.8} className="w-full flex justify-center">
        <img
          src="/images/themes/baroque-v2-dark-red/golden-line-decoration.webp"
          alt=""
          aria-hidden="true"
          className="pointer-events-none mx-auto block h-auto w-[75%] max-w-[320px] md:max-w-[420px] object-contain"
          style={{ filter: "drop-shadow(4px 4px 2px rgba(0,0,0,0.25))" }}
          loading="lazy"
        />
      </AnimateView>

      {/* Hoa mẫu đơn Burgundy trang trí hai bên */}
      <img
        src="/images/themes/baroque-v2-dark-red/flower5-decoration.webp"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute z-[1] h-auto max-w-none top-[16%] md:top-[12%]"
        style={{
          left: "-16%",
          width: "30%",
          filter: "drop-shadow(4px 4px 2px rgba(0,0,0,0.25))",
        }}
        loading="lazy"
      />
      <img
        src="/images/themes/baroque-v2-dark-red/flower5-decoration.webp"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute z-[1] h-auto max-w-none top-[16%] md:top-[12%]"
        style={{
          right: "-16%",
          width: "30%",
          transform: "scaleX(-1)",
          filter: "drop-shadow(4px 4px 2px rgba(0,0,0,0.25))",
        }}
        loading="lazy"
      />

      {/* Khối Nội Dung Thông Tin */}
      <div className="relative z-10 flex w-full max-w-[380px] md:max-w-[520px] flex-col items-center gap-6 px-5 pt-10 pb-6 md:gap-8 md:px-8 md:pt-12">
        {/* Tiêu đề */}
        <AnimateView animation="fadeInDown" duration={0.8}>
          <h2
            className="uppercase text-center relative z-10 text-[20px] md:text-[24px] tracking-wider font-bold"
            style={{
              color: "#ffdfaf",
              fontFamily: '"Times New Roman", "Baskerville", serif',
            }}
          >
            THÔNG TIN LỄ CƯỚI
          </h2>
        </AnimateView>

        {/* Khối Thông Tin Hai Nhà */}
        <div
          className="relative grid w-full grid-cols-[1fr_auto_1fr] justify-center gap-x-3 text-center"
          style={{
            color: "#ffdfaf",
            fontFamily: '"Baskerville", "Libre Baskerville", "Times New Roman", serif',
          }}
        >
          {/* Nhà Trai */}
          <AnimateView animation="fadeInLeft" duration={0.9} delay={0.1} className="flex flex-col items-center">
            <span className="text-[12px] md:text-[14px]" style={{ color: "#ffefd6" }}>
              Ông Bà
            </span>
            <span className="text-[12px] md:text-[14px] font-semibold text-[#ffdfaf] mt-0.5">
              {groomFather}
            </span>
            <span className="text-[12px] md:text-[14px] font-semibold text-[#ffdfaf]">
              {groomMother}
            </span>
            <div
              className="mt-1.5 text-[10px] md:text-[12px] leading-tight max-w-[140px] md:max-w-[190px]"
              style={{
                color: "#ffefd6",
                fontFamily: '"Roboto", "Helvetica Neue", Arial, sans-serif',
              }}
            >
              {groomAddress}
            </div>
          </AnimateView>

          {/* Đường Phân Cách Dọc Mạ Vàng */}
          <AnimateView animation="zoomIn" duration={0.8} delay={0.15} className="self-center">
            <img
              src="/images/themes/baroque-v2-dark-red/line3-decoration.webp"
              alt=""
              aria-hidden="true"
              className="block h-[84px] md:h-[104px] w-auto max-w-none shrink-0 object-contain"
              loading="lazy"
            />
          </AnimateView>

          {/* Nhà Gái */}
          <AnimateView animation="fadeInRight" duration={0.9} delay={0.1} className="flex flex-col items-center">
            <span className="text-[12px] md:text-[14px]" style={{ color: "#ffefd6" }}>
              Ông Bà
            </span>
            <span className="text-[12px] md:text-[14px] font-semibold text-[#ffdfaf] mt-0.5">
              {brideFather}
            </span>
            <span className="text-[12px] md:text-[14px] font-semibold text-[#ffdfaf]">
              {brideMother}
            </span>
            <div
              className="mt-1.5 text-[10px] md:text-[12px] leading-tight max-w-[140px] md:max-w-[190px]"
              style={{
                color: "#ffefd6",
                fontFamily: '"Roboto", "Helvetica Neue", Arial, sans-serif',
              }}
            >
              {brideAddress}
            </div>
          </AnimateView>
        </div>

        {/* Lời Báo Tin */}
        <AnimateView animation="fadeInUp" duration={0.8} delay={0.15} className="flex w-full flex-col items-center gap-2">
          <div
            className="text-center text-[12px] uppercase md:text-[14px] leading-relaxed"
            style={{
              fontFamily: '"Baskerville", "Libre Baskerville", "Times New Roman", serif',
              color: "#ffdfaf",
            }}
          >
            TRÂN TRỌNG BÁO TIN
            <br />
            LỄ THÀNH HÔN CỦA CON CHÚNG TÔI
          </div>
          <img
            src="/images/themes/baroque-v2-dark-red/line2-decoration.webp"
            alt=""
            aria-hidden="true"
            className="pointer-events-none block h-auto w-[140px] md:w-[180px] object-contain"
            style={{ filter: "drop-shadow(4px 4px 2px rgba(0,0,0,0.25))" }}
            loading="lazy"
          />
        </AnimateView>

        {/* Tên Chú Rể & Cô Dâu Kèm Thứ Bậc */}
        <AnimateView animation="zoomIn" duration={0.9} delay={0.2} className="w-full relative flex flex-col items-center text-center gap-2">
          <h3
            className="text-[36px] sm:text-[42px] md:text-[45px] leading-none"
            style={{
              fontFamily: '"Cormorant Garamond", "EB Garamond", "Times New Roman", serif',
              color: "#ffdfaf",
            }}
          >
            {groomName}
          </h3>
          <div
            className="text-[10px] md:text-[12px] uppercase tracking-[0.14em]"
            style={{
              color: "#ffefd6",
              fontFamily: '"Baskerville", "Times New Roman", serif',
            }}
          >
            {groomRank}
          </div>

          <div
            className="text-[32px] sm:text-[36px] leading-none my-1"
            style={{
              color: "#ffdfaf",
              fontFamily: '"The Nautigal", "Great Vibes", cursive',
            }}
          >
            &amp;
          </div>

          <h3
            className="text-[36px] sm:text-[42px] md:text-[45px] leading-none"
            style={{
              fontFamily: '"Cormorant Garamond", "EB Garamond", "Times New Roman", serif',
              color: "#ffdfaf",
            }}
          >
            {brideName}
          </h3>
          <div
            className="text-[10px] md:text-[12px] uppercase tracking-[0.14em]"
            style={{
              color: "#ffefd6",
              fontFamily: '"Baskerville", "Times New Roman", serif',
            }}
          >
            {brideRank}
          </div>
        </AnimateView>

        {/* Thời Gian & Địa Điểm Cử Hành Hôn Lễ */}
        <AnimateView animation="fadeInUp" duration={0.9} delay={0.25} className="relative flex flex-col items-center gap-2 text-center" style={{ fontFamily: '"Baskerville", "Libre Baskerville", "Times New Roman", serif' }}>
          <div style={{ color: "#ffdfaf" }} className="text-[12px] md:text-[14px] uppercase font-medium">
            LỄ THÀNH HÔN ĐƯỢC CỬ HÀNH TẠI
            <br />
            <span className="font-bold text-[#ffefd6]">{ceremonyLocation}</span>
          </div>

          <div
            className="flex items-center justify-center gap-4 text-[12px] md:text-[14px] uppercase mt-1"
            style={{ color: "#ffefd6" }}
          >
            <span>VÀO LÚC {weddingTime}</span>
            <span>•</span>
            <span>{weekdayStr}</span>
          </div>

          {/* Block Ngày Tháng Mạ Vàng Cổ Điển */}
          <div className="flex items-center justify-center gap-2 mt-1" style={{ color: "#ffdfaf" }}>
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
          </div>

          {/* Ngày Âm Lịch */}
          <div
            className="text-[11px] md:text-[13px] uppercase tracking-[0.1em] mt-1"
            style={{ color: "#ffefd6" }}
          >
            {lunarStr || "(Tức ngày 11 tháng 11 năm Bính Ngọ)"}
          </div>
        </AnimateView>
      </div>

      {/* Đường viền mạ vàng dưới */}
      <AnimateView animation="fadeIn" duration={0.8} className="w-full flex justify-center">
        <img
          src="/images/themes/baroque-v2-dark-red/golden-line-decoration.webp"
          alt=""
          aria-hidden="true"
          className="pointer-events-none mx-auto block h-auto w-[75%] max-w-[320px] md:max-w-[420px] object-contain mt-4"
          style={{ filter: "drop-shadow(4px 4px 2px rgba(0,0,0,0.25))" }}
          loading="lazy"
        />
      </AnimateView>
    </section>
  );
};
