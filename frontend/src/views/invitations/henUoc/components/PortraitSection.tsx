"use client";

import { WeddingData } from "@/entities/invitation/model/types";

interface PortraitSectionProps {
  weddingData: WeddingData;
}

export function PortraitSection({ weddingData }: PortraitSectionProps) {
  const groom = (weddingData.groomShortName || weddingData.groomName || "Mạnh Đức").toUpperCase();
  const bride = (weddingData.brideShortName || weddingData.brideName || "Lan Nhi").toUpperCase();

  const groomImage =
    weddingData.groomImage || "/templates/hen-uoc/groom_portrait.jpg";
  const brideImage =
    weddingData.brideImage || "/templates/hen-uoc/bride_portrait.jpg";

  const storyContent =
    weddingData.storyContent ||
    "Mỗi câu chuyện tình yêu đều có một khởi đầu thật đẹp. Câu chuyện của chúng mình cũng vậy, được viết nên từ những điều giản dị và những khoảnh khắc không thể nào quên. Hôm nay, chúng mình rất hạnh phúc khi được chia sẻ cột mốc đặc biệt này cùng gia đình, bạn bè và những người thân yêu. Cảm ơn bạn đã đến và trở thành một phần trong câu chuyện của chúng mình.";

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        padding: "60px 20px 48px 20px",
        overflow: "hidden",
      }}
    >
      {/* Ảnh nền ngoại cảnh hoàng hôn mờ ảo nguyên bản */}
      <div style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
        <img
          src="/templates/hen-uoc/photo_1.png"
          alt="Nền hoàng hôn"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
          loading="eager"
        />
        <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0, 0, 0, 0.42)" }} />
      </div>

      <div style={{ position: "relative", zIndex: 10, maxWidth: "460px", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center" }}>
        {/* 2 Khung ảnh Chân dung Đôi viền trắng sắc nét */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", width: "100%", marginBottom: "20px" }}>
          {/* Chú rể */}
          <div
            style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}
            className="henuoc-reveal-left"
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "270px",
                border: "4px solid #ffffff",
                boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
                overflow: "hidden",
                backgroundColor: "#ffffff",
                marginBottom: "12px",
              }}
            >
              <img
                src={groomImage}
                alt={groom}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                loading="eager"
              />
            </div>
            <span
              style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: "30px",
                color: "#F5E6D3",
                lineHeight: 1,
                marginBottom: "2px",
                textShadow: "0 2px 4px rgba(0,0,0,0.6)",
              }}
            >
              Chú rể
            </span>
            <h4
              style={{
                fontFamily: "'Great Vibes', 'Alex Brush', cursive",
                fontSize: "36px",
                fontWeight: 400,
                color: "#ffffff",
                lineHeight: 1.1,
                textShadow: "0 2px 6px rgba(0,0,0,0.7)",
                margin: 0,
              }}
            >
              {weddingData.groomShortName || weddingData.groomName || "Mạnh Đức"}
            </h4>
          </div>

          {/* Cô dâu */}
          <div
            style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}
            className="henuoc-reveal-right"
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "270px",
                border: "4px solid #ffffff",
                boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
                overflow: "hidden",
                backgroundColor: "#ffffff",
                marginBottom: "12px",
              }}
            >
              <img
                src={brideImage}
                alt={bride}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                loading="eager"
              />
            </div>
            <span
              style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: "30px",
                color: "#F5E6D3",
                lineHeight: 1,
                marginBottom: "2px",
                textShadow: "0 2px 4px rgba(0,0,0,0.6)",
              }}
            >
              Cô dâu
            </span>
            <h4
              style={{
                fontFamily: "'Great Vibes', 'Alex Brush', cursive",
                fontSize: "36px",
                fontWeight: 400,
                color: "#ffffff",
                lineHeight: 1.1,
                textShadow: "0 2px 6px rgba(0,0,0,0.7)",
                margin: 0,
              }}
            >
              {weddingData.brideShortName || weddingData.brideName || "Lan Nhi"}
            </h4>
          </div>
        </div>

        {/* Đoạn trích dẫn tâm sự trên nền tối mờ */}
        <div
          style={{ width: "100%", padding: "4px 8px 0 8px", boxSizing: "border-box" }}
          className="henuoc-reveal henuoc-delay-2"
        >
          <p
            style={{
              fontFamily: "'Lora', Georgia, serif",
              fontSize: "13.5px",
              lineHeight: 1.8,
              color: "rgba(255, 255, 255, 0.94)",
              fontWeight: 300,
              textAlign: "justify",
              margin: 0,
            }}
          >
            {storyContent}
          </p>
        </div>

      </div>
    </section>
  );
}
