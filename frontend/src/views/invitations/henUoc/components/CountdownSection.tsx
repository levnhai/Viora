"use client";

import { useState, useEffect } from "react";
import { WeddingData } from "@/entities/invitation/model/types";

interface CountdownSectionProps {
  weddingData: WeddingData;
}

export function CountdownSection({ weddingData }: CountdownSectionProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const targetDateStr = weddingData.weddingDate || "2026-12-29T17:30:00";

  useEffect(() => {
    const calculateTime = () => {
      const difference = +new Date(targetDateStr) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [targetDateStr]);

  return (
    <section
      style={{
        backgroundColor: "#FAF8F5",
        padding: "48px 24px 68px 24px",
      }}
      className="relative w-full"
    >
      <div style={{ maxWidth: "420px", margin: "0 auto", textAlign: "center" }}>
        {/* Tiêu đề viết tay Ngày Về Chung Nhà */}
        <h3
          style={{
            fontFamily: "'Great Vibes', 'Alex Brush', cursive",
            fontSize: "56px",
            color: "#7D1F2A",
            marginBottom: "32px",
            lineHeight: 1.2,
            margin: "0 0 32px 0",
          }}
          className="henuoc-reveal"
        >
          Ngày Về Chung Nhà
        </h3>

        {/* 4 ô vuông đỏ rượu bo góc nhẹ */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "12px",
            maxWidth: "360px",
            margin: "0 auto",
          }}
        >
          {/* Ngày */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "16px 4px",
              borderRadius: "10px",
              backgroundColor: "#7D1F2A",
              color: "#ffffff",
              boxShadow: "0 4px 12px rgba(125, 31, 42, 0.25)",
            }}
            className="henuoc-reveal-zoom henuoc-delay-1"
          >
            <span
              style={{
                fontFamily: "'Lora', Georgia, serif",
                fontSize: "28px",
                fontWeight: 300,
                lineHeight: 1,
              }}
            >
              {String(timeLeft.days).padStart(2, "0")}
            </span>
            <span
              style={{
                fontFamily: "'Lora', Georgia, serif",
                fontSize: "12px",
                color: "rgba(255, 255, 255, 0.85)",
                marginTop: "6px",
                textTransform: "lowercase",
              }}
            >
              ngày
            </span>
          </div>

          {/* Giờ */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "16px 4px",
              borderRadius: "10px",
              backgroundColor: "#7D1F2A",
              color: "#ffffff",
              boxShadow: "0 4px 12px rgba(125, 31, 42, 0.25)",
            }}
            className="henuoc-reveal-zoom henuoc-delay-2"
          >
            <span
              style={{
                fontFamily: "'Lora', Georgia, serif",
                fontSize: "28px",
                fontWeight: 300,
                lineHeight: 1,
              }}
            >
              {String(timeLeft.hours).padStart(2, "0")}
            </span>
            <span
              style={{
                fontFamily: "'Lora', Georgia, serif",
                fontSize: "12px",
                color: "rgba(255, 255, 255, 0.85)",
                marginTop: "6px",
                textTransform: "lowercase",
              }}
            >
              giờ
            </span>
          </div>

          {/* Phút */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "16px 4px",
              borderRadius: "10px",
              backgroundColor: "#7D1F2A",
              color: "#ffffff",
              boxShadow: "0 4px 12px rgba(125, 31, 42, 0.25)",
            }}
            className="henuoc-reveal-zoom henuoc-delay-3"
          >
            <span
              style={{
                fontFamily: "'Lora', Georgia, serif",
                fontSize: "28px",
                fontWeight: 300,
                lineHeight: 1,
              }}
            >
              {String(timeLeft.minutes).padStart(2, "0")}
            </span>
            <span
              style={{
                fontFamily: "'Lora', Georgia, serif",
                fontSize: "12px",
                color: "rgba(255, 255, 255, 0.85)",
                marginTop: "6px",
                textTransform: "lowercase",
              }}
            >
              phút
            </span>
          </div>

          {/* Giây */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "16px 4px",
              borderRadius: "10px",
              backgroundColor: "#7D1F2A",
              color: "#ffffff",
              boxShadow: "0 4px 12px rgba(125, 31, 42, 0.25)",
            }}
            className="henuoc-reveal-zoom henuoc-delay-4"
          >
            <span
              style={{
                fontFamily: "'Lora', Georgia, serif",
                fontSize: "28px",
                fontWeight: 300,
                lineHeight: 1,
              }}
            >
              {String(timeLeft.seconds).padStart(2, "0")}
            </span>
            <span
              style={{
                fontFamily: "'Lora', Georgia, serif",
                fontSize: "12px",
                color: "rgba(255, 255, 255, 0.85)",
                marginTop: "6px",
                textTransform: "lowercase",
              }}
            >
              giây
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
