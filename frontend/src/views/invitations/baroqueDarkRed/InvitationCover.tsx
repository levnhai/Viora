import React from "react";
import { WeddingData } from "@/entities/invitation/model/types";
import { parseDateRobust } from "@/shared/lib/utils/date";

interface InvitationCoverProps {
  weddingData: WeddingData;
  guestName?: string;
  onOpen: () => void;
}

export const InvitationCover: React.FC<InvitationCoverProps> = ({
  weddingData,
  guestName,
  onOpen,
}) => {
  const groomName = weddingData.groomShortName || weddingData.groomName || "Gia Bảo";
  const brideName = weddingData.brideShortName || weddingData.brideName || "Ngọc Diệp";
  const dateObj = parseDateRobust(weddingData.weddingDate);
  const formattedDate = `${dateObj.getDate()} tháng ${dateObj.getMonth() + 1}, ${dateObj.getFullYear()}`;

  // Danh sách các cánh hoa / hạt bụi vàng rơi lơ lửng
  const particles = [
    { left: "12%", size: 14, color: "#ffefd6", duration: "18s", delay: "-2s", sway: "8px" },
    { left: "28%", size: 18, color: "#ffdfaf", duration: "22s", delay: "-7s", sway: "-12px" },
    { left: "45%", size: 12, color: "#8a1f26", duration: "20s", delay: "-12s", sway: "15px" },
    { left: "62%", size: 16, color: "#c39a5e", duration: "24s", delay: "-4s", sway: "-18px" },
    { left: "78%", size: 20, color: "#ffefd6", duration: "19s", delay: "-9s", sway: "20px" },
    { left: "88%", size: 13, color: "#ffdfaf", duration: "23s", delay: "-15s", sway: "-10px" },
    { left: "20%", size: 10, color: "#8a1f26", duration: "21s", delay: "-1s", sway: "14px" },
    { left: "70%", size: 15, color: "#c39a5e", duration: "25s", delay: "-10s", sway: "-16px" },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at top, #3a0808 0%, #2b0303 55%, #1e0202 100%)",
      }}
    >
      {/* Hiệu ứng cánh hoa / bụi vàng rơi lơ lửng */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {particles.map((p, idx) => (
          <div
            key={idx}
            className="absolute animate-ambient-fall opacity-70"
            style={{
              left: p.left,
              top: "-30px",
              color: p.color,
              fontSize: `${p.size}px`,
              animationDuration: p.duration,
              animationDelay: p.delay,
              // @ts-expect-error - Custom CSS property
              "--sway": p.sway,
            }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em">
              <g>
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5" />
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(60 12 12)" />
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(120 12 12)" />
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(180 12 12)" />
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(240 12 12)" />
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(300 12 12)" />
              </g>
              <circle cx="12" cy="12" r="1.8" fillOpacity="0.45" />
            </svg>
          </div>
        ))}
      </div>

      {/* Thẻ Phong Bì Chính */}
      <div className="relative z-10 w-[310px] sm:w-[360px] md:w-[480px]">
        {/* Con Dấu Sáp Mạ Vàng (Wax Seal) */}
        <div
          className="absolute left-1/2 -top-6 -translate-x-1/2 rounded-full flex items-center justify-center z-30 shadow-2xl animate-seal-pulse"
          style={{
            width: "56px",
            height: "56px",
            background: "radial-gradient(circle at 30% 30%, #ffdfaf, rgb(225, 193, 145))",
            boxShadow:
              "0 4px 20px rgba(255, 223, 175, 0.5), inset 0 2px 4px rgba(255,255,255,0.4)",
          }}
        >
          <svg className="w-7 h-7" style={{ fill: "#511419" }} viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>

        {/* Khối Phong Bì Đỏ Đậm Damask */}
        <div
          className="relative rounded-2xl overflow-hidden shadow-2xl p-8 sm:p-10 text-center"
          style={{
            backgroundColor: "#3a0808",
            backgroundImage:
              "linear-gradient(rgba(58,8,8,0.68), rgba(58,8,8,0.68)), url('/images/themes/baroque-v2-dark-red/bg.webp')",
            backgroundSize: "100% auto",
            backgroundRepeat: "repeat",
            border: "1px solid rgba(255, 223, 175, 0.25)",
            boxShadow:
              "0 25px 60px -12px rgba(0, 0, 0, 0.6), 0 8px 24px rgba(0, 0, 0, 0.3), 0 0 40px rgba(255, 223, 175, 0.15)",
          }}
        >
          {/* Hoa Trang Trí Góc Phong Bì */}
          <img
            src="/images/themes/baroque-v2-dark-red/flower3-decoration.webp"
            alt=""
            aria-hidden="true"
            className="absolute pointer-events-none z-0 h-auto w-[130px] sm:w-[155px] opacity-95 -top-[12px] -left-[12px] -scale-x-100"
          />
          <img
            src="/images/themes/baroque-v2-dark-red/flower4-decoration.webp"
            alt=""
            aria-hidden="true"
            className="absolute pointer-events-none z-0 h-auto w-[130px] sm:w-[155px] opacity-95 -bottom-[10px] -right-[10px] -scale-x-100"
          />

          {/* Nội Dung Bìa */}
          <div className="relative z-10 pt-8 pb-4">
            <h1
              className="mb-3 flex flex-col items-center leading-tight text-3xl sm:text-4xl"
              style={{
                color: "#ffdfaf",
                fontFamily: '"Viaoda Libre", "EB Garamond", "Playfair Display", serif',
              }}
            >
              <span className="block w-full text-center tracking-wide">{groomName}</span>
              <span
                className="block w-full text-center text-xl sm:text-2xl my-1 font-serif italic"
                style={{ color: "rgba(255, 223, 175, 0.85)" }}
              >
                &amp;
              </span>
              <span className="block w-full text-center tracking-wide">{brideName}</span>
            </h1>

            {/* Phân Cách Cổ Điển */}
            <div className="flex items-center justify-center gap-3 mb-3">
              <div
                className="w-12 h-px"
                style={{ background: "linear-gradient(to right, transparent, #ffdfaf)" }}
              />
              <span style={{ color: "#ffdfaf", opacity: 0.8 }} className="text-sm">
                ❦
              </span>
              <div
                className="w-12 h-px"
                style={{ background: "linear-gradient(to left, transparent, #ffdfaf)" }}
              />
            </div>

            {/* Ngày Cưới */}
            <div
              className="text-[17px] sm:text-[18px] mb-5 tracking-wider"
              style={{
                color: "rgba(255, 239, 214, 0.9)",
                fontFamily: '"Lora", "EB Garamond", serif',
              }}
            >
              <span>{formattedDate}</span>
            </div>

            {/* Tên Khách Mời */}
            <div className="mb-6 max-w-[280px] sm:max-w-[340px] mx-auto">
              <p
                className="text-[16px] sm:text-[18px] font-light mb-1"
                style={{
                  color: "rgba(255, 239, 214, 0.85)",
                  fontFamily: '"Lora", "EB Garamond", serif',
                }}
              >
                {guestName ? `Kính mời: ${guestName}` : "Thân Mời"}
              </p>
            </div>

            {/* Nút Mở Thiệp Với Hiệu Ứng Ánh Sáng Quét Ngang */}
            <button
              onClick={onOpen}
              type="button"
              className="group relative px-9 py-2.5 text-base sm:text-lg font-medium rounded-full shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer mx-auto overflow-hidden flex items-center justify-center"
              style={{
                backgroundColor: "#ffdfaf",
                color: "#511419",
                boxShadow: "0 4px 20px rgba(255, 223, 175, 0.4)",
                fontFamily: '"Lora", "EB Garamond", serif',
              }}
            >
              <span className="relative z-10 font-semibold tracking-wider">Mở thiệp</span>
              <div
                className="absolute top-0 h-full w-[40px] pointer-events-none animate-shine"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent)",
                }}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
