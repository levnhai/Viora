"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { WeddingData } from "@/entities/invitation/model/types";

interface RsvpSectionProps {
  weddingData: WeddingData;
  guestName?: string;
}

export function RsvpSection({ guestName }: RsvpSectionProps) {
  const [name, setName] = useState(guestName || "");
  const [attending, setAttending] = useState<"yes" | "no">("yes");
  const [guestCount, setGuestCount] = useState("Chọn số người tham dự");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Vui lòng nhập họ và tên của bạn!");
      return;
    }
    setSubmitted(true);
  };

  return (
    <section
      id="rsvp"
      style={{
        backgroundColor: "#FAF8F5",
        padding: "50px 24px 40px 24px",
      }}
      className="relative w-full"
    >
      <div style={{ maxWidth: "440px", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center" }}>
        {/* Lời tựa ngoài card */}
        <p
          style={{
            fontFamily: "'Lora', Georgia, serif",
            fontSize: "16px",
            lineHeight: 1.7,
            color: "#7D1F2A",
            textAlign: "center",
            maxWidth: "380px",
            margin: "0 0 28px 0",
          }}
          className="henuoc-reveal"
        >
          Hãy xác nhận sự có mặt của Quý Khách để gia đình
          <br />
          chúng tôi chuẩn bị đón tiếp một cách chu đáo nhất.
          <br />
          Trân trọng!
        </p>

        {/* Khung Form card trắng chuẩn mẫu ZenLove */}
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            padding: "28px 24px",
            border: "1px solid #E5E7EB",
            boxShadow: "0 8px 25px rgba(0,0,0,0.06)",
            width: "100%",
            maxWidth: "420px",
            boxSizing: "border-box",
          }}
          className="henuoc-reveal-zoom henuoc-delay-1"
        >
          {submitted ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "20px 0" }}>
              <CheckCircle2 style={{ width: "44px", height: "44px", color: "#7D1F2A", marginBottom: "12px" }} />
              <h4
                style={{
                  fontFamily: "'Lora', Georgia, serif",
                  fontSize: "20px",
                  fontWeight: 600,
                  color: "#7D1F2A",
                  marginBottom: "8px",
                }}
              >
                Xác Nhận Thành Công!
              </h4>
              <p
                style={{
                  fontFamily: "'Lora', Georgia, serif",
                  fontSize: "14px",
                  color: "#4B5563",
                  lineHeight: 1.6,
                }}
              >
                Cảm ơn bạn đã phản hồi. Sự hiện diện của bạn là niềm vinh hạnh lớn của gia đình chúng tôi!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Tiêu đề trong card */}
              <h4
                style={{
                  fontFamily: "'Lora', Georgia, serif",
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "#1F2937",
                  textAlign: "center",
                  margin: "0 0 4px 0",
                }}
              >
                Xác nhận tham dự
              </h4>

              {/* Input Họ và tên */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "#374151",
                    marginBottom: "6px",
                  }}
                >
                  Họ và tên
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nhập tên của bạn"
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    border: "1px solid #D1D5DB",
                    fontSize: "14px",
                    color: "#1F2937",
                    boxSizing: "border-box",
                    outline: "none",
                  }}
                />
              </div>

              {/* Radio Bạn sẽ tham dự chứ? */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "#374151",
                    marginBottom: "8px",
                  }}
                >
                  Bạn sẽ tham dự chứ?
                </label>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      cursor: "pointer",
                      fontSize: "14px",
                      color: "#374151",
                      fontFamily: "'Montserrat', sans-serif",
                    }}
                  >
                    <input
                      type="radio"
                      name="attending"
                      checked={attending === "yes"}
                      onChange={() => setAttending("yes")}
                      style={{ accentColor: "#7D1F2A", width: "16px", height: "16px", cursor: "pointer" }}
                    />
                    <span>Có, tôi sẽ tham dự</span>
                  </label>
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      cursor: "pointer",
                      fontSize: "14px",
                      color: "#374151",
                      fontFamily: "'Montserrat', sans-serif",
                    }}
                  >
                    <input
                      type="radio"
                      name="attending"
                      checked={attending === "no"}
                      onChange={() => setAttending("no")}
                      style={{ accentColor: "#7D1F2A", width: "16px", height: "16px", cursor: "pointer" }}
                    />
                    <span>Tôi bận, rất tiếc không thể tham dự</span>
                  </label>
                </div>
              </div>

              {/* Select Số lượng người tham dự */}
              {attending === "yes" && (
                <div>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: "13px",
                      fontWeight: 500,
                      color: "#374151",
                      marginBottom: "6px",
                    }}
                  >
                    Số lượng người tham dự
                  </label>
                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "8px",
                      border: "1px solid #D1D5DB",
                      fontSize: "14px",
                      color: "#374151",
                      backgroundColor: "#ffffff",
                      boxSizing: "border-box",
                      outline: "none",
                      cursor: "pointer",
                    }}
                  >
                    <option value="Chọn số người tham dự">Chọn số người tham dự</option>
                    <option value="1 người">1 người</option>
                    <option value="2 người">2 người</option>
                    <option value="3 người">3 người</option>
                    <option value="Đi cả gia đình (4+ người)">Đi cả gia đình (4+ người)</option>
                  </select>
                </div>
              )}

              {/* Nút gửi xác nhận */}
              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "8px",
                  backgroundColor: "#7D1F2A",
                  color: "#ffffff",
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "14px",
                  fontWeight: 600,
                  border: "none",
                  cursor: "pointer",
                  marginTop: "8px",
                  boxShadow: "0 2px 8px rgba(125, 31, 42, 0.25)",
                }}
              >
                Gửi xác nhận
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
