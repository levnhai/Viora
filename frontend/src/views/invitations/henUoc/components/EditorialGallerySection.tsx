"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { WeddingData } from "@/entities/invitation/model/types";

interface EditorialGallerySectionProps {
  weddingData: WeddingData;
}

export function EditorialGallerySection({
  weddingData,
}: EditorialGallerySectionProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = {
    hero: "/templates/hen-uoc/gallery_1.jpg",
    couple1: "/templates/hen-uoc/gallery_2.jpg",
    couple2: "/templates/hen-uoc/gallery_3.jpg",
    couple3: "/templates/hen-uoc/gallery_4.jpg",
    couple4: "/templates/hen-uoc/gallery_5.jpg",
    couple5: "/templates/hen-uoc/couple_hero.jpg",
    couple6: "/templates/hen-uoc/couple_envelope.jpg",
  };

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        padding: "60px 16px 64px 16px",
        backgroundColor: "#7D1F2A",
        color: "#ffffff",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "460px", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center" }}>
        {/* Tiêu đề GOLDEN HOUR of LOVE */}
        <div
          style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "14px", textAlign: "center" }}
          className="henuoc-reveal"
        >
          <span
            style={{
              fontFamily: "'Cinzel', Georgia, serif",
              fontSize: "26px",
              fontWeight: 400,
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              color: "#ffffff",
            }}
          >
            GOLDEN HOUR
          </span>
          <span
            style={{
              fontFamily: "'Great Vibes', cursive",
              fontSize: "38px",
              color: "rgba(255, 255, 255, 0.95)",
              margin: "0 6px",
              lineHeight: 1,
            }}
          >
            of
          </span>
          <span
            style={{
              fontFamily: "'Cinzel', Georgia, serif",
              fontSize: "26px",
              fontWeight: 400,
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              color: "#ffffff",
            }}
          >
            LOVE
          </span>
        </div>

        {/* Trích dẫn tiếng Anh thanh lịch */}
        <p
          style={{
            fontFamily: "'Lora', Georgia, serif",
            fontSize: "13.5px",
            lineHeight: 1.8,
            color: "rgba(255, 255, 255, 0.92)",
            textAlign: "justify",
            maxWidth: "420px",
            fontWeight: 300,
            margin: "0 0 32px 0",
            padding: "0 4px",
          }}
          className="henuoc-reveal henuoc-delay-1"
        >
          Our wedding story unfolds through soft moments of love — filled with
          warm smiles, quiet tenderness, and timeless memories that will stay in
          our hearts forever.
        </p>

        {/* Bố cục Gallery đặc trưng của mẫu Hẹn Ước */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%" }}>
          {/* Hàng 1: Ảnh ngang to bản */}
          <div
            onClick={() => setSelectedImage(images.hero)}
            style={{
              position: "relative",
              width: "100%",
              height: "280px",
              overflow: "hidden",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
            className="henuoc-reveal-zoom henuoc-delay-1"
          >
            <img
              src={images.hero}
              alt="Golden Hour Hero"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              loading="eager"
            />
          </div>

          {/* Hàng 2: Cụm 1 ảnh dọc bên trái và 2 ảnh xếp chồng bên phải */}
          <div style={{ display: "grid", gridTemplateColumns: "7fr 5fr", gap: "10px", width: "100%", height: "390px" }}>
            {/* Ảnh dọc bên trái */}
            <div
              onClick={() => setSelectedImage(images.couple1)}
              style={{
                position: "relative",
                height: "100%",
                overflow: "hidden",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              }}
              className="henuoc-reveal-left henuoc-delay-1"
            >
              <img
                src={images.couple1}
                alt="Couple Left"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                loading="eager"
              />
            </div>

            {/* 2 ảnh xếp chồng bên phải */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", height: "100%" }}>
              <div
                onClick={() => setSelectedImage(images.couple2)}
                style={{
                  position: "relative",
                  flex: 1,
                  overflow: "hidden",
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                }}
                className="henuoc-reveal-right henuoc-delay-1"
              >
                <img
                  src={images.couple2}
                  alt="Couple Top Right"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  loading="eager"
                />
              </div>
              <div
                onClick={() => setSelectedImage(images.couple3)}
                style={{
                  position: "relative",
                  flex: 1,
                  overflow: "hidden",
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                }}
                className="henuoc-reveal-right henuoc-delay-2"
              >
                <img
                  src={images.couple3}
                  alt="Couple Bottom Right"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  loading="eager"
                />
              </div>
            </div>
          </div>

          {/* Hàng 3: 2 ảnh dọc bằng nhau */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", width: "100%", height: "290px" }}>
            <div
              onClick={() => setSelectedImage(images.couple4)}
              style={{
                position: "relative",
                height: "100%",
                overflow: "hidden",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              }}
              className="henuoc-reveal-left henuoc-delay-1"
            >
              <img
                src={images.couple4}
                alt="Couple Grid 1"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                loading="eager"
              />
            </div>
            <div
              onClick={() => setSelectedImage(images.couple5)}
              style={{
                position: "relative",
                height: "100%",
                overflow: "hidden",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              }}
              className="henuoc-reveal-right henuoc-delay-2"
            >
              <img
                src={images.couple5}
                alt="Couple Grid 2"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                loading="eager"
              />
            </div>
          </div>

          {/* Hàng 4: 2 ảnh dọc bằng nhau tiếp theo */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", width: "100%", height: "290px" }}>
            <div
              onClick={() => setSelectedImage(images.couple6)}
              style={{
                position: "relative",
                height: "100%",
                overflow: "hidden",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              }}
              className="henuoc-reveal-left henuoc-delay-1"
            >
              <img
                src={images.couple6}
                alt="Couple Grid 3"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                loading="eager"
              />
            </div>
            <div
              onClick={() => setSelectedImage(images.couple1)}
              style={{
                position: "relative",
                height: "100%",
                overflow: "hidden",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              }}
              className="henuoc-reveal-right henuoc-delay-2"
            >
              <img
                src={images.couple1}
                alt="Couple Grid 4"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox phóng to ảnh */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            backgroundColor: "rgba(0,0,0,0.9)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
          }}
        >
          <button
            onClick={() => setSelectedImage(null)}
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              padding: "8px",
              borderRadius: "9999px",
              backgroundColor: "rgba(255,255,255,0.2)",
              color: "#ffffff",
              border: "none",
              cursor: "pointer",
            }}
          >
            <X style={{ width: "24px", height: "24px" }} />
          </button>
          <div style={{ position: "relative", width: "100%", maxWidth: "600px", maxHeight: "85vh", height: "75vh" }}>
            <img
              src={selectedImage}
              alt="Zoomed Photo"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>
        </div>
      )}
    </section>
  );
}
