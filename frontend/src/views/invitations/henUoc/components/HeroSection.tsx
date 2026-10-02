"use client";

import { WeddingData } from "@/entities/invitation/model/types";

interface HeroSectionProps {
  weddingData: WeddingData;
}

export function HeroSection({ weddingData }: HeroSectionProps) {
  const groom = (weddingData.groomShortName || weddingData.groomName || "Mạnh Đức").toUpperCase();
  const bride = (weddingData.brideShortName || weddingData.brideName || "Lan Nhi").toUpperCase();
  const coverImage = weddingData.coverImage || "/templates/hen-uoc/couple_hero.jpg";

  return (
    <section style={{ position: "relative", width: "100%", overflow: "hidden", backgroundColor: "#1f0508" }}>
      {/* Khung ảnh cưới Hero dọc đúng tỉ lệ 500:750 của mẫu gốc */}
      <div style={{ position: "relative", width: "100%", height: "740px" }}>
        <img
          src={coverImage}
          alt={`${groom} & ${bride}`}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
          loading="eager"
        />

        {/* Lớp gradient tối nhẹ phủ phần dưới ảnh để làm nổi bật typography */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0.65) 100%)",
            pointerEvents: "none",
          }}
        />

        {/* Chữ "Wedding" thư pháp trắng mờ uốn lượn vắt ngang */}
        <div
          style={{
            position: "absolute",
            bottom: "160px",
            insetInline: 0,
            display: "flex",
            justifyContent: "center",
            pointerEvents: "none",
            userSelect: "none",
            zIndex: 10,
          }}
          className="animate-henuoc-fade-in"
        >
          <span
            style={{
              fontFamily: "'Great Vibes', 'Alex Brush', cursive",
              fontSize: "105px",
              color: "rgba(255, 255, 255, 0.5)",
              lineHeight: 1,
              textShadow: "0 2px 10px rgba(0, 0, 0, 0.4)",
            }}
          >
            Wedding
          </span>
        </div>

        {/* Tên cặp đôi CHỮ KIỂU THƯ PHÁP NGHỆ THUẬT tuyệt đẹp chuẩn thiệp cưới */}
        <div
          style={{
            position: "absolute",
            bottom: "28px",
            insetInline: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            padding: "0 16px",
            color: "#ffffff",
            zIndex: 20,
            pointerEvents: "none",
          }}
          className="animate-henuoc-fade-in [animation-delay:300ms]"
        >
          <h1
            style={{
              fontFamily: "'Great Vibes', 'Alex Brush', 'Dancing Script', cursive",
              fontSize: "52px",
              lineHeight: 1.1,
              color: "#ffffff",
              margin: 0,
              textShadow: "0 2px 12px rgba(0, 0, 0, 0.8)",
              fontWeight: 400,
              letterSpacing: "0.02em",
            }}
          >
            {weddingData.groomShortName || weddingData.groomName || "Mạnh Đức"}
          </h1>
          <span
            style={{
              fontFamily: "'Great Vibes', cursive",
              fontSize: "30px",
              color: "#F5E6D3",
              margin: "0",
              lineHeight: 1.1,
              textShadow: "0 2px 8px rgba(0, 0, 0, 0.8)",
            }}
          >
            &
          </span>
          <h1
            style={{
              fontFamily: "'Great Vibes', 'Alex Brush', 'Dancing Script', cursive",
              fontSize: "52px",
              lineHeight: 1.1,
              color: "#ffffff",
              margin: 0,
              textShadow: "0 2px 12px rgba(0, 0, 0, 0.8)",
              fontWeight: 400,
              letterSpacing: "0.02em",
            }}
          >
            {weddingData.brideShortName || weddingData.brideName || "Lan Nhi"}
          </h1>
        </div>


        {/* Watermark nhỏ góc dưới bên trái như mẫu gốc */}
        <div
          style={{
            position: "absolute",
            bottom: "12px",
            left: "16px",
            zIndex: 20,
            fontSize: "10px",
            color: "rgba(255, 255, 255, 0.6)",
            letterSpacing: "0.2em",
            fontFamily: "system-ui, sans-serif",
            userSelect: "none",
            pointerEvents: "none",
          }}
        >
          小調映画 / UNIQUE IMAGE
        </div>
      </div>
    </section>
  );
}

