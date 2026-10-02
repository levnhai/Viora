"use client";

import { WeddingData } from "@/entities/invitation/model/types";

interface WeddingScheduleSectionProps {
  weddingData: WeddingData;
}

export function WeddingScheduleSection({
  weddingData,
}: WeddingScheduleSectionProps) {
  const events = weddingData.events?.length
    ? weddingData.events
    : [
        {
          id: "reception",
          name: "BUỔI TIỆC CHUNG VUI",
          time: "17:30",
          dayOfWeek: "CHỦ NHẬT",
          date: weddingData.weddingDate || "2026-12-29",
          lunarDate: "Tức ngày 18 tháng 10 năm Bính Ngọ",
          locationName: "TẠI TƯ GIA NHÀ TRAI",
          address: "174 Đường Trần Văn Kiểu, Phường 10, TP Hồ Chí Minh",
          mapUrl: "https://maps.google.com/?q=174+Đường+Trần+Văn+Kiểu,+Phường+10,+Quận+6,+TP+Hồ+Chí+Minh",
        },
        {
          id: "ceremony",
          name: "LỄ THÀNH HÔN",
          time: "09:30",
          dayOfWeek: "THỨ BẢY",
          date: weddingData.weddingDate || "2026-12-29",
          lunarDate: "Tức ngày 18 tháng 10 năm Bính Ngọ",
          locationName: "TẠI TƯ GIA NHÀ TRAI",
          address: "174 Đường Trần Văn Kiểu, Phường 10, TPHồ Chí Minh",
          mapUrl: "https://maps.google.com/?q=174+Đường+Trần+Văn+Kiểu,+Phường+10,+Quận+6,+TP+Hồ+Chí+Minh",
        },
      ];

  const reception = events[0];
  const ceremony = events[1] || events[0];

  const renderEventBlock = (evt: typeof events[0]) => {
    const dateObj = new Date(evt.date);
    const day = !isNaN(dateObj.getDate()) ? dateObj.getDate() : 29;
    const month = !isNaN(dateObj.getMonth()) ? dateObj.getMonth() + 1 : 12;
    const year = !isNaN(dateObj.getFullYear()) ? dateObj.getFullYear() : 2026;

    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", width: "100%" }}>
        {/* Tên Sự Kiện */}
        <h4
          style={{
            fontFamily: "'Lora', Georgia, serif",
            fontSize: "22px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.14em",
            color: "#7D1F2A",
            margin: "0 0 8px 0",
          }}
          className="henuoc-reveal"
        >
          {evt.name}
        </h4>

        {/* Giờ & Ngày trong tuần */}
        <div
          style={{
            fontFamily: "'Lora', Georgia, serif",
            fontSize: "17px",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            color: "#7D1F2A",
            marginBottom: "20px",
          }}
          className="henuoc-reveal henuoc-delay-1"
        >
          ĐƯỢC TỔ CHỨC VÀO LÚC {evt.time}, {evt.dayOfWeek}
        </div>

        {/* Bố cục ngày tháng đặc trưng của Hẹn Ước */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            width: "100%",
            maxWidth: "360px",
            margin: "4px auto 12px auto",
          }}
        >
          {/* Tháng 12 viền trên dưới */}
          <div
            style={{
              flex: 1,
              borderTop: "1.5px solid #7D1F2A",
              borderBottom: "1.5px solid #7D1F2A",
              padding: "6px 8px",
              textAlign: "center",
            }}
            className="henuoc-reveal-left henuoc-delay-2"
          >
            <span
              style={{
                fontFamily: "'Lora', Georgia, serif",
                fontSize: "15px",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: "#7D1F2A",
                display: "block",
                fontWeight: 500,
              }}
            >
              THÁNG {month}
            </span>
          </div>

          {/* Số ngày siêu to ở giữa */}
          <div
            style={{
              fontFamily: "'Lora', 'Cormorant Garamond', Georgia, serif",
              fontSize: "86px",
              fontWeight: 300,
              lineHeight: 0.85,
              color: "#7D1F2A",
              padding: "0 12px",
              userSelect: "none",
            }}
            className="henuoc-reveal-zoom henuoc-delay-2"
          >
            {String(day).padStart(2, "0")}
          </div>

          {/* Năm 2026 viền trên dưới */}
          <div
            style={{
              flex: 1,
              borderTop: "1.5px solid #7D1F2A",
              borderBottom: "1.5px solid #7D1F2A",
              padding: "6px 8px",
              textAlign: "center",
            }}
            className="henuoc-reveal-right henuoc-delay-2"
          >
            <span
              style={{
                fontFamily: "'Lora', Georgia, serif",
                fontSize: "15px",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: "#7D1F2A",
                display: "block",
                fontWeight: 500,
              }}
            >
              NĂM {year}
            </span>
          </div>
        </div>

        {/* Âm lịch */}
        {evt.lunarDate && (
          <div
            style={{
              fontFamily: "'Lora', Georgia, serif",
              fontSize: "14px",
              fontStyle: "italic",
              color: "#7D1F2A",
              margin: "6px 0 16px 0",
            }}
            className="henuoc-reveal henuoc-delay-3"
          >
            ({evt.lunarDate})
          </div>
        )}

        {/* Địa điểm */}
        <div style={{ marginTop: "4px", marginBottom: "22px" }} className="henuoc-reveal henuoc-delay-3">
          <div
            style={{
              fontFamily: "'Lora', Georgia, serif",
              fontSize: "17px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "#7D1F2A",
              marginBottom: "6px",
            }}
          >
            {evt.locationName}
          </div>
          <div
            style={{
              fontFamily: "'Lora', Georgia, serif",
              fontSize: "14.5px",
              color: "#7D1F2A",
              maxWidth: "340px",
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            {evt.address}
          </div>
        </div>

        {/* Nút Xem Chỉ Đường đỏ rượu pill */}
        <a
          href={
            evt.mapUrl ||
            `https://maps.google.com/?q=${encodeURIComponent(evt.address || "")}`
          }
          target="_blank"
          rel="noopener noreferrer"
          className="henuoc-reveal henuoc-delay-4 henuoc-btn-pill"
        >
          XEM CHỈ ĐƯỜNG
        </a>
      </div>
    );
  };

  return (
    <section
      style={{
        backgroundColor: "#FAF8F5",
        padding: "10px 24px 64px 24px",
      }}
      className="relative w-full"
    >
      <div style={{ maxWidth: "440px", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center" }}>
        {/* Sự kiện 1: Buổi tiệc chung vui */}
        {renderEventBlock(reception)}

        {/* Đôi thiên nga trắng ở giữa */}
        <div
          style={{
            margin: "44px 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
          className="henuoc-reveal-zoom henuoc-float"
        >
          <img
            src="/templates/hen-uoc/photo_6.png"
            alt="Đôi thiên nga trắng"
            style={{
              width: "95px",
              height: "auto",
              objectFit: "contain",
              display: "block",
            }}
            loading="eager"
          />
        </div>

        {/* Sự kiện 2: Lễ thành hôn */}
        {renderEventBlock(ceremony)}
      </div>
    </section>
  );
}
