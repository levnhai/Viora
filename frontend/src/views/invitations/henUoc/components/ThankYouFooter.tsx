"use client";

import { WeddingData } from "@/entities/invitation/model/types";

interface ThankYouFooterProps {
  weddingData: WeddingData;
}

export function ThankYouFooter({ weddingData }: ThankYouFooterProps) {
  const footerImage = "/templates/hen-uoc/gallery_3.jpg";

  return (
    <footer style={{ position: "relative", width: "100%", overflow: "hidden", backgroundColor: "#1f0508", color: "#ffffff" }}>
      {/* Khung ảnh cưới kỷ niệm cuối trang */}
      <div style={{ position: "relative", width: "100%", height: "580px" }}>
        <img
          src={footerImage}
          alt="Cặp đôi cảm ơn"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
          loading="eager"
        />

        {/* Lớp gradient tối từ dưới lên */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.5) 50%, transparent 100%)",
          }}
        />

        {/* Nội dung Cảm Ơn chuẩn mẫu ZenLove */}
        <div
          style={{
            position: "absolute",
            insetInline: 0,
            bottom: "36px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            padding: "0 24px",
            zIndex: 10,
            maxWidth: "440px",
            margin: "0 auto",
          }}
        >
          <h2
            style={{
              fontFamily: "'Great Vibes', cursive",
              fontSize: "64px",
              color: "#ffffff",
              marginBottom: "12px",
              textShadow: "0 2px 8px rgba(0,0,0,0.6)",
              lineHeight: 1.1,
              userSelect: "none",
            }}
            className="henuoc-reveal"
          >
            Thank you
          </h2>

          <p
            style={{
              fontFamily: "'Lora', Georgia, serif",
              fontSize: "13.5px",
              color: "rgba(255, 255, 255, 0.95)",
              lineHeight: 1.8,
              fontWeight: 300,
              margin: 0,
            }}
            className="henuoc-reveal henuoc-delay-2"
          >
            Cảm ơn Quý Khách đã dành tình cảm cho gia đình chúng tôi! Sự hiện diện của Quý Khách chính là món quà ý nghĩa nhất, gia đình chúng tôi vô cùng trân quý khi được cùng Quý Khách chia sẻ niềm hạnh phúc trong ngày trọng đại này.
          </p>
        </div>
      </div>
    </footer>
  );
}
