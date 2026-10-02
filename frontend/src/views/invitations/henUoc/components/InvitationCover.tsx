"use client";

import { useState } from "react";
import { WeddingData } from "@/entities/invitation/model/types";
import { formatToDDMMYYYY } from "@/shared/lib/utils/date";

interface InvitationCoverProps {
  weddingData: WeddingData;
  guestName?: string;
  onOpen: () => void;
}

export function InvitationCover({
  weddingData,
  guestName,
  onOpen,
}: InvitationCoverProps) {
  const [opening, setOpening] = useState(false);

  const groom = weddingData.groomShortName || weddingData.groomName || "Mạnh Đức";
  const bride = weddingData.brideShortName || weddingData.brideName || "Lan Nhi";
  const weddingDateStr = formatToDDMMYYYY(weddingData.weddingDate, ".") || "29.12.2026";

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);
    setTimeout(() => {
      onOpen();
    }, 850);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md select-none overflow-hidden">
      <style>{`
        /* Vân vải dệt thô cao cấp (Linen Canvas Texture) chuẩn màu vàng cát phong bì */
        .henuoc-linen-texture {
          background-color: #9E8E67;
          background-image: 
            radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.09) 0%, rgba(0,0,0,0.2) 100%),
            repeating-linear-gradient(45deg, rgba(0, 0, 0, 0.05) 0px, rgba(0, 0, 0, 0.05) 1.5px, transparent 1.5px, transparent 3px),
            repeating-linear-gradient(-45deg, rgba(255, 255, 255, 0.04) 0px, rgba(255, 255, 255, 0.04) 1.5px, transparent 1.5px, transparent 3px),
            repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.06) 0px, rgba(0, 0, 0, 0.06) 1px, transparent 1px, transparent 2.5px),
            repeating-linear-gradient(90deg, rgba(0, 0, 0, 0.06) 0px, rgba(0, 0, 0, 0.06) 1px, transparent 1px, transparent 2.5px);
        }

        /* Hiệu ứng nhịp đập êm ái cho con dấu sáp hoa hồng */
        @keyframes henuocSealPulse {
          0%, 100% {
            transform: scale(1);
            filter: drop-shadow(0 6px 16px rgba(0, 0, 0, 0.45));
          }
          50% {
            transform: scale(1.05);
            filter: drop-shadow(0 10px 24px rgba(168, 28, 43, 0.6));
          }
        }
        .henuoc-seal-anim {
          animation: henuocSealPulse 2.8s ease-in-out infinite;
        }

        /* Hiệu ứng tia sáng quét ngang nút MỞ THIỆP */
        @keyframes henuocShimmer {
          0% { transform: translateX(-150%); }
          100% { transform: translateX(150%); }
        }
        .henuoc-shimmer {
          animation: henuocShimmer 3s infinite ease-in-out;
        }
      `}</style>

      {/* Khung phong bì tỉ lệ chuẩn mobile cao cấp */}
      <div className="relative w-full max-w-[440px] md:max-w-[460px] h-full sm:h-[860px] sm:max-h-[92vh] sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col justify-between">
        
        {/* ==============================================================
            1. HAI CÁNH CỬA PHONG BÌ (SPLIT DOORS) 50% / 50%
            ============================================================== */}
        <div className="absolute inset-0 w-full h-full flex pointer-events-none z-10 overflow-hidden">
          {/* Cánh trái (Left Flap): bóng đổ tràn sang cánh phải dọc theo rãnh giữa */}
          <div
            style={{
              width: "50%",
              height: "100%",
              transition: "transform 0.85s cubic-bezier(0.4, 0, 0.2, 1)",
              transform: opening ? "translateX(-105%)" : "translateX(0%)",
            }}
            className="henuoc-linen-texture relative border-r border-black/20 shadow-[4px_0_18px_rgba(0,0,0,0.35)]"
          />

          {/* Cánh phải (Right Flap) */}
          <div
            style={{
              width: "50%",
              height: "100%",
              transition: "transform 0.85s cubic-bezier(0.4, 0, 0.2, 1)",
              transform: opening ? "translateX(105%)" : "translateX(0%)",
            }}
            className="henuoc-linen-texture relative border-l border-white/10 shadow-[-4px_0_18px_rgba(0,0,0,0.25)]"
          />
        </div>

        {/* ==============================================================
            2. CÀNH HOA TRANG TRÍ RỦ TỪ GÓC PHONG BÌ (FLORAL ACCENT)
            ============================================================== */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "105px",
            height: "260px",
            zIndex: 15,
            pointerEvents: "none",
            transition: "opacity 0.6s ease, transform 0.85s ease",
            opacity: opening ? 0 : 1,
            transform: opening ? "translateX(-40px)" : "translateX(0)",
          }}
          className="henuoc-breeze"
        >
          <img
            src="/templates/hen-uoc/photo_2.png"
            alt="Cành hoa chuông trang trí phong bì"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </div>

        {/* ==============================================================
            3. NỘI DUNG BỔ SUNG TRÊN MẶT PHONG BÌ (BỔ SUNG ĐẦY ĐỦ NGHỆ THUẬT)
            ============================================================== */}
        <div
          style={{
            position: "relative",
            zIndex: 20,
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "44px 20px 48px 20px",
            boxSizing: "border-box",
            transition: "opacity 0.6s ease, transform 0.6s ease",
            opacity: opening ? 0 : 1,
            transform: opening ? "scale(0.95)" : "scale(1)",
          }}
        >
          {/* --- NỬA TRÊN: TIÊU ĐỀ & TÊN CÔ DÂU CHÚ RỂ THƯ PHÁP --- */}
          <div className="flex flex-col items-center text-center mt-2 w-full max-w-[340px]">
            {/* Dải huy hiệu WEDDING INVITATION */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1 rounded-full bg-black/25 border border-[#f5e6cc]/30 backdrop-blur-xs mb-3">
              <span className="text-[#edd6b0] text-[9px]">✦</span>
              <span
                style={{
                  fontFamily: "'Cinzel', Georgia, serif",
                  fontSize: "11px",
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: "#fcecd2",
                  fontWeight: 600,
                }}
              >
                Wedding Invitation
              </span>
              <span className="text-[#edd6b0] text-[9px]">✦</span>
            </div>

            {/* Dòng chữ nhỏ "Trân trọng kính mời" */}
            <div
              style={{
                fontFamily: "'Lora', Georgia, serif",
                fontSize: "13px",
                fontStyle: "italic",
                color: "#faede0",
                letterSpacing: "0.08em",
                marginBottom: "4px",
                textShadow: "0 1px 3px rgba(0,0,0,0.5)",
              }}
            >
              Hẹn Ước Trăm Năm
            </div>

            {/* Tên cặp đôi CHỮ KIỂU THƯ PHÁP NGHỆ THUẬT tuyệt đẹp */}
            <div className="flex flex-col items-center justify-center my-1 w-full">
              <h2
                style={{
                  fontFamily: "'Great Vibes', 'Alex Brush', cursive",
                  fontSize: "52px",
                  lineHeight: 1.1,
                  color: "#ffffff",
                  textShadow: "0 2px 10px rgba(0, 0, 0, 0.7)",
                  margin: 0,
                  fontWeight: 400,
                }}
              >
                {groom}
              </h2>
              <div
                style={{
                  fontFamily: "'Great Vibes', cursive",
                  fontSize: "30px",
                  color: "#edd6b0",
                  lineHeight: 1,
                  margin: "1px 0",
                  textShadow: "0 2px 6px rgba(0, 0, 0, 0.6)",
                }}
              >
                &amp;
              </div>
              <h2
                style={{
                  fontFamily: "'Great Vibes', 'Alex Brush', cursive",
                  fontSize: "52px",
                  lineHeight: 1.1,
                  color: "#ffffff",
                  textShadow: "0 2px 10px rgba(0, 0, 0, 0.7)",
                  margin: 0,
                  fontWeight: 400,
                }}
              >
                {bride}
              </h2>
            </div>
          </div>

          {/* --- CHÍNH GIỮA: CON DẤU SÁP ĐỎ HOA HỒNG 3D (ROSE WAX SEAL) --- */}
          <div
            onClick={handleOpen}
            className="my-auto cursor-pointer relative group flex items-center justify-center"
            title="Chạm vào con dấu sáp để mở thiệp"
          >
            {/* Vòng hào quang nhẹ bao quanh */}
            <div className="absolute inset-0 rounded-full bg-[#a81c2b]/20 blur-md scale-125 pointer-events-none" />

            {/* Con dấu sáp hoa hồng đỏ 3D dập nổi tinh xảo */}
            <div
              style={{
                width: "90px",
                height: "90px",
                borderRadius: "50%",
                background: "radial-gradient(circle at 35% 32%, #d62d40 0%, #a81c2b 45%, #6a0b17 100%)",
                boxShadow: "0 10px 28px rgba(0,0,0,0.55), inset 0 2px 6px rgba(255,255,255,0.45), inset 0 -4px 8px rgba(0,0,0,0.6)",
                border: "2px solid rgba(255,255,255,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              className="henuoc-seal-anim transition-transform duration-300 group-hover:scale-110 active:scale-95"
            >
              {/* Vòng viền sáp dập chìm bên trong */}
              <div
                style={{
                  width: "72px",
                  height: "72px",
                  borderRadius: "50%",
                  border: "1.5px solid rgba(255,255,255,0.22)",
                  boxShadow: "inset 0 2px 5px rgba(0,0,0,0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* SVG Bông Hoa Hồng Nổi Khối 3D */}
                <svg
                  viewBox="0 0 48 48"
                  className="w-10 h-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Cánh hoa hồng ngoài cùng */}
                  <path
                    d="M24 6C14 6 7 13 7 24C7 33 13 41 24 41C35 41 41 33 41 24C41 13 34 6 24 6Z"
                    stroke="#500710"
                    strokeWidth="1.5"
                    fill="#9c1524"
                  />
                  {/* Lớp cánh thứ hai cuộn lượn */}
                  <path
                    d="M17 15C13 19 12 28 17 33C22 38 29 37 33 33C37 29 36 20 32 16C27 11 20 11 17 15Z"
                    stroke="#ff8f9d"
                    strokeWidth="1"
                    fill="#b51b2c"
                  />
                  {/* Nhụy hoa hồng cuộn xoắn ốc ở giữa */}
                  <path
                    d="M21 20C19 22 19 26 22 28C25 30 28 29 30 27C32 25 31 22 29 20C26 18 23 18 21 20Z"
                    stroke="#ffb3bc"
                    strokeWidth="1.2"
                    fill="#c92235"
                  />
                  <path
                    d="M23 23C22.5 24 23 25.5 24.5 25.5C26 25.5 26.5 24.5 26 23.5C25.5 22.5 23.5 22 23 23Z"
                    fill="#ffe4e8"
                  />
                </svg>
              </div>
            </div>

            {/* Dòng chú thích gợi ý người dùng */}
            <div
              style={{
                position: "absolute",
                bottom: "-24px",
                fontFamily: "'Lora', Georgia, serif",
                fontSize: "11px",
                color: "rgba(255,255,255,0.75)",
                letterSpacing: "0.1em",
                whiteSpace: "nowrap",
                textShadow: "0 1px 3px rgba(0,0,0,0.6)",
              }}
            >
              Chạm để mở thiệp
            </div>
          </div>

          {/* --- NỬA DƯỚI: NGÀY THÁNG, THẺ KÍNH MỜI & NÚT MỞ THIỆP --- */}
          <div className="flex flex-col items-center text-center w-full max-w-[340px] mb-2">
            {/* Ngày cưới số thanh nhã */}
            <div
              style={{
                fontFamily: "'Lora', Georgia, serif",
                fontSize: "18px",
                letterSpacing: "0.22em",
                color: "#fcecd2",
                fontWeight: 600,
                textShadow: "0 1px 4px rgba(0,0,0,0.7)",
                marginBottom: "10px",
              }}
            >
              {weddingDateStr}
            </div>

            {/* Khung Kính Gửi Quý Khách */}
            <div className="mb-6 px-6 py-1.5 rounded-full bg-black/35 border border-[#edd6b0]/40 backdrop-blur-xs flex items-center gap-2">
              <span
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "11px",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  color: "#edd6b0",
                  fontWeight: 500,
                }}
              >
                Kính mời:
              </span>
              <span
                style={{
                  fontFamily: "'Lora', Georgia, serif",
                  fontSize: "14px",
                  color: "#ffffff",
                  fontWeight: 600,
                }}
              >
                {guestName || "Quý Khách"}
              </span>
            </div>

            {/* NÚT MỞ THIỆP MÀU VÀNG BE CHUẨN XÁC THEO HÌNH ẢNH CỦA BẠN */}
            <button
              onClick={handleOpen}
              style={{
                backgroundColor: "#EBD8A5",
                color: "#3A2415",
                padding: "11px 42px",
                borderRadius: "9999px",
                fontFamily: "'Cinzel', 'Lora', Georgia, serif",
                fontSize: "13px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.22em",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 6px 18px rgba(0, 0, 0, 0.35), inset 0 1px 2px rgba(255, 255, 255, 0.6)",
                position: "relative",
                overflow: "hidden",
                transition: "all 0.25s ease",
              }}
              className="hover:scale-105 active:scale-95 hover:brightness-105"
            >
              <span className="relative z-10">MỞ THIỆP</span>
              
              {/* Lớp ánh sáng shimmer quét ngang nút bấm */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent)",
                  pointerEvents: "none",
                }}
                className="henuoc-shimmer"
              />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
