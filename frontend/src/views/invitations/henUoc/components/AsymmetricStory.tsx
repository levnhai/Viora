"use client";

import { WeddingData } from "@/entities/invitation/model/types";
import { formatToDDMMYYYY } from "@/shared/lib/utils/date";

interface AsymmetricStoryProps {
  weddingData: WeddingData;
}

export function AsymmetricStory({ weddingData }: AsymmetricStoryProps) {
  const groom = weddingData.groomShortName || weddingData.groomName || "Mạnh Đức";
  const bride = weddingData.brideShortName || weddingData.brideName || "Lan Nhi";
  const weddingDateStr = formatToDDMMYYYY(weddingData.weddingDate, ".") || "29.12.2026";

  const envelopeCoupleImg =
    weddingData.galleryImages?.[1] || "/templates/hen-uoc/couple_envelope.jpg";

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        padding: "48px 16px 64px 16px",
        backgroundColor: "#FAF8F5",
        color: "#7D1F2A",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Cụm 1: Phong bì cài hoa chuông & Ảnh cưới so le */}
      <div style={{ position: "relative", width: "100%", maxWidth: "440px", height: "370px", marginBottom: "32px" }}>
        {/* Cành hoa chuông đỏ rủ từ góc trên bên trái */}
        <div
          style={{ position: "absolute", top: 0, left: "-8px", width: "114px", height: "343px", zIndex: 20, pointerEvents: "none" }}
          className="henuoc-reveal-left henuoc-breeze"
        >
          <img
            src="/templates/hen-uoc/photo_2.png"
            alt="Hoa chuông đỏ rủ"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
            loading="eager"
          />
        </div>

        {/* Phong bì màu kem */}
        <div
          style={{ position: "absolute", top: "48px", left: "40px", width: "350px", height: "245px", zIndex: 0, filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.08))" }}
          className="henuoc-reveal-zoom henuoc-delay-1"
        >
          <img
            src="/templates/hen-uoc/photo_5.png"
            alt="Phong bì cưới"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
            loading="eager"
          />
        </div>

        {/* Tem sáp đỏ hình trái tim ngay giữa nắp gập */}
        <div
          style={{ position: "absolute", top: "116px", left: "185px", width: "62px", height: "62px", zIndex: 10, pointerEvents: "none" }}
          className="henuoc-reveal-zoom henuoc-delay-2 henuoc-pulse"
        >
          <img
            src="/templates/hen-uoc/photo_3.png"
            alt="Tem sáp trái tim"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
            loading="eager"
          />
        </div>

        {/* Ảnh cưới kẹp góc phải phong bì */}
        <div
          style={{
            position: "absolute",
            top: "105px",
            right: "12px",
            width: "180px",
            height: "245px",
            zIndex: 15,
            border: "4px solid #ffffff",
            backgroundColor: "#ffffff",
            overflow: "hidden",
            boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
          }}
          className="henuoc-reveal-right henuoc-delay-2"
        >
          <img
            src={envelopeCoupleImg}
            alt="Ảnh kẹp phong bì"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            loading="eager"
          />
        </div>
      </div>

      {/* Cụm 2: Tấm thiệp viền ren lượn sóng (Deckle edge) */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "410px",
          height: "550px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "16px 0",
        }}
        className="henuoc-reveal-zoom"
      >
        {/* Tấm thiệp ren lượn sóng làm nền bao quanh */}
        <div style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.12))" }}>
          <img
            src="/templates/hen-uoc/photo_7.png"
            alt="Khung thiệp ren"
            style={{ width: "100%", height: "100%", objectFit: "fill" }}
            loading="eager"
          />
        </div>

        {/* Cành hoa rum trắng Calla Lily cài góc dưới bên phải thiệp */}
        <div
          style={{ position: "absolute", bottom: "-32px", right: "-12px", width: "140px", height: "235px", zIndex: 20, pointerEvents: "none", filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.12))" }}
          className="henuoc-reveal-right henuoc-delay-3"
        >
          <img
            src="/templates/hen-uoc/photo_4.png"
            alt="Hoa rum trắng"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
            loading="eager"
          />
        </div>

        {/* Nội dung bên trong tấm thiệp ren */}
        <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "36px 24px", maxWidth: "320px" }}>
          {/* Tên cặp đôi viết tay thư pháp đỏ mận */}
          <div className="henuoc-reveal henuoc-delay-1">
            <h2
              style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: "56px",
                color: "#7D1F2A",
                lineHeight: 1.1,
                userSelect: "none",
                margin: 0,
              }}
            >
              {groom}
            </h2>
            <div
              style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: "32px",
                color: "#7D1F2A",
                margin: "2px 0",
                userSelect: "none",
              }}
            >
              &
            </div>
            <h2
              style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: "56px",
                color: "#7D1F2A",
                lineHeight: 1.1,
                userSelect: "none",
                margin: 0,
              }}
            >
              {bride}
            </h2>
          </div>

          {/* Ngày cưới số to thanh nhã */}
          <div
            style={{
              fontFamily: "'Lora', Georgia, serif",
              fontSize: "26px",
              letterSpacing: "0.22em",
              color: "#7D1F2A",
              margin: "12px 0 16px 0",
              fontWeight: 400,
            }}
            className="henuoc-reveal henuoc-delay-2"
          >
            {weddingDateStr}
          </div>

          {/* 4 câu thơ Hẹn Ước lướt từng câu */}
          <div
            style={{
              fontFamily: "'Lora', Georgia, serif",
              fontSize: "15px",
              lineHeight: 1.9,
              color: "#7D1F2A",
              fontWeight: 400,
            }}
          >
            <p style={{ margin: "2px 0" }} className="henuoc-reveal henuoc-delay-2">Một lời hẹn ước</p>
            <p style={{ margin: "2px 0" }} className="henuoc-reveal henuoc-delay-3">Một hành trình mới</p>
            <p style={{ margin: "2px 0" }} className="henuoc-reveal henuoc-delay-4">Một mái nhà chung</p>
            <p style={{ margin: "2px 0" }} className="henuoc-reveal henuoc-delay-5">Một đời bên nhau</p>
          </div>
        </div>
      </div>

    </section>
  );
}
