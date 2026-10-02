"use client";

import { WeddingData } from "@/entities/invitation/model/types";

interface FamilyInvitationSectionProps {
  weddingData: WeddingData;
}

export function FamilyInvitationSection({
  weddingData,
}: FamilyInvitationSectionProps) {
  const groomFather = (weddingData.groomFatherName || "Lê Văn Anh").toUpperCase();
  const groomMother = (weddingData.groomMotherName || "Lê Thị Nhung").toUpperCase();

  const brideFather = (weddingData.brideFatherName || "Vũ Văn Tài").toUpperCase();
  const brideMother = (weddingData.brideMotherName || "Trần Thị Hoà").toUpperCase();

  return (
    <section
      style={{
        backgroundColor: "#FAF8F5",
        padding: "60px 24px 36px 24px",
      }}
      className="relative w-full"
    >
      <div style={{ maxWidth: "440px", margin: "0 auto", textAlign: "center" }}>
        {/* Tiêu đề lời mời trang trọng */}
        <div style={{ marginBottom: "36px" }} className="henuoc-reveal">
          <h3
            style={{
              fontFamily: "'Lora', Georgia, serif",
              fontSize: "20px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              lineHeight: 1.5,
              color: "#7D1F2A",
              margin: 0,
            }}
          >
            TRÂN TRỌNG KÍNH MỜI QUÝ KHÁCH ĐẾN
            <span style={{ display: "block", marginTop: "6px" }}>
              CHUNG VUI CÙNG GIA ĐÌNH CHÚNG TÔI
            </span>
          </h3>
        </div>

        {/* Thông tin Hai Bên Gia Đình 2 Cột Thẳng Hàng */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "24px",
            width: "100%",
          }}
        >
          {/* Cột Nhà Trai */}
          <div
            style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}
            className="henuoc-reveal-left henuoc-delay-1"
          >
            <span
              style={{
                fontFamily: "'Lora', Georgia, serif",
                fontSize: "14px",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#7D1F2A",
                marginBottom: "10px",
                display: "block",
              }}
            >
              NHÀ TRAI
            </span>
            <div
              style={{
                fontFamily: "'Lora', Georgia, serif",
                fontSize: "14px",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                lineHeight: 1.8,
                color: "#7D1F2A",
              }}
            >
              <p style={{ margin: 0 }}>ÔNG. {groomFather}</p>
              <p style={{ margin: 0 }}>BÀ. {groomMother}</p>
            </div>
          </div>

          {/* Cột Nhà Gái */}
          <div
            style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}
            className="henuoc-reveal-right henuoc-delay-1"
          >
            <span
              style={{
                fontFamily: "'Lora', Georgia, serif",
                fontSize: "14px",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#7D1F2A",
                marginBottom: "10px",
                display: "block",
              }}
            >
              NHÀ GÁI
            </span>
            <div
              style={{
                fontFamily: "'Lora', Georgia, serif",
                fontSize: "14px",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                lineHeight: 1.8,
                color: "#7D1F2A",
              }}
            >
              <p style={{ margin: 0 }}>ÔNG. {brideFather}</p>
              <p style={{ margin: 0 }}>BÀ. {brideMother}</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
