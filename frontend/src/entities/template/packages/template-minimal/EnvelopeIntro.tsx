import { useState } from "react";
import { Heart } from "lucide-react";

interface EnvelopeIntroProps {
  guestName?: string;
  groomName: string;
  brideName: string;
  onOpen: () => void;
  isFixed?: boolean;
}

export function EnvelopeIntro({
  guestName,
  groomName,
  brideName,
  onOpen,
  isFixed = true,
}: EnvelopeIntroProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMerged, setIsMerged] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    // Đợi hiệu ứng đóng gói và mở phong bì hoàn tất
    setTimeout(() => {
      setIsMerged(true);
      onOpen();
    }, 1200);
  };

  if (isMerged) return null;

  return (
    <div
      onClick={!isOpen ? handleOpen : undefined}
      className={`${
        isFixed ? "fixed" : "absolute"
      } inset-0 z-50 flex flex-col items-center justify-center bg-[#f4f4f2] transition-all duration-1000 cursor-pointer ${
        isOpen ? "opacity-0 pointer-events-none scale-95" : "opacity-100 scale-100"
      }`}
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Tối giản hoàn toàn, không có hoa lá rườm rà phía sau */}
      <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:30px_30px]" />

      {/* ── TIÊU ĐỀ TỐI GIẢN PHÍA TRÊN PHONG BÌ ── */}
      <div className="text-center mb-10 z-10 space-y-2 select-none">
        <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-stone-400 font-medium font-sans">
          Wedding Invitation
        </p>
        <h2 className="text-2xl sm:text-3xl text-stone-800 font-light font-sans tracking-wide">
          {groomName} & {brideName}
        </h2>
      </div>

      {/* ── THÂN PHONG BÌ XÁM CÁT TỐI GIẢN ── */}
      <div
        className={`relative w-[90%] max-w-[420px] aspect-[1.48] bg-[#d9d9d3] rounded-b-md shadow-xl flex flex-col justify-between items-center transition-all duration-1000 ${
          isOpen ? "scale-90 rotate-1 translate-y-10 opacity-50" : "scale-100"
        }`}
      >
        {/* Nếp gấp chéo của thân phong bì ở phía dưới */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none rounded-b-md overflow-hidden"
          viewBox="0 0 100 68"
          preserveAspectRatio="none"
        >
          {/* Nếp gập trái */}
          <polygon points="0,68 50,28 0,0" fill="#d0d0ca" opacity="0.8" />
          {/* Nếp gập phải */}
          <polygon points="100,68 50,28 100,0" fill="#d0d0ca" opacity="0.8" />
          {/* Nếp gập đáy */}
          <polygon points="0,68 100,68 50,28" fill="#d5d5cf" />
          {/* Đường bóng mờ nhẹ */}
          <line x1="0" y1="68" x2="50" y2="28" stroke="#bebeb8" strokeWidth="0.3" />
          <line x1="100" y1="68" x2="50" y2="28" stroke="#bebeb8" strokeWidth="0.3" />
        </svg>

        {/* Nắp gập tam giác chúc xuống ở phía trên */}
        <svg
          className="absolute top-0 left-0 w-full h-[62%] pointer-events-none overflow-visible filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]"
          viewBox="0 0 100 62"
          preserveAspectRatio="none"
        >
          <polygon
            points="0,0 100,0 50,62"
            fill={isOpen ? "#e0e0da" : "#c9c9c3"}
            className="transition-all duration-1000"
            style={{
              transform: isOpen ? "scaleY(-0.8) translateY(-40px)" : "none",
              transformOrigin: "top center",
            }}
          />
        </svg>

        {/* ── BẢNG TÊN KHÁCH MỜI DÁN TRÊN PHONG BÌ ── */}
        <div className="w-full text-center z-10 my-auto px-10 flex flex-col items-center">
          <p className="text-[9px] text-stone-500 font-light uppercase tracking-widest opacity-80 mb-2">
            Kính mời
          </p>
          <div className="bg-white/95 px-5 py-2 rounded-md border border-stone-200 shadow-sm min-w-[170px] max-w-[260px]">
            <span className="text-xs font-semibold text-stone-700 tracking-wide block truncate font-sans">
              {guestName ? guestName : "Quý khách mời thân thương"}
            </span>
          </div>
        </div>

        {/* ── CON DẤU SÁP XÁM BẠC ── */}
        <div
          className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 transition-all duration-1000"
          style={{
            transform: isOpen
              ? "translate(-50%, -200px) scale(0.6) rotate(10deg)"
              : "translate(-50%, -50%) scale(1)",
            opacity: isOpen ? 0 : 1,
          }}
        >
          <button
            onClick={handleOpen}
            className="w-13 h-13 rounded-full bg-gradient-to-br from-[#e0e0e0] via-[#c8c8c8] to-[#999999] flex items-center justify-center shadow-md border border-[#cccccc] active:scale-95 transition-all cursor-pointer group relative overflow-hidden"
          >
            {/* Rìa sáp loang lổ */}
            <div className="absolute inset-0 bg-[#c8c8c8]/50 rounded-full scale-110 opacity-70 filter blur-[1px] transform rotate-12" />

            {/* Tim sáp nổi ở giữa */}
            <div className="relative w-10.5 h-10.5 rounded-full bg-gradient-to-br from-[#fafafa] to-[#c8c8c8] border border-[#cccccc] shadow-inner flex flex-col items-center justify-center">
              <Heart
                size={12}
                className="text-stone-500 fill-stone-500/10 group-hover:scale-110 transition-transform duration-300 animate-pulse"
              />
              <span className="text-[6.5px] uppercase tracking-wider font-bold text-stone-500 mt-0.5 font-sans">
                Mở
              </span>
            </div>
          </button>
        </div>

        {/* Nhãn hiệu chìm chân thực */}
        <div className="mb-2 z-10 pointer-events-none opacity-30">
          <span className="text-[6.5px] text-stone-600 font-mono tracking-widest">
            MINIMALIST INVITE
          </span>
        </div>
      </div>

      {/* ── CHỮ PHÍA DƯỚI PHONG BÌ ── */}
      <div className="text-center mt-6 z-10 select-none">
        <p className="text-[9px] uppercase tracking-[0.25em] text-stone-400 font-light">
          Chạm để mở thiệp
        </p>
      </div>
    </div>
  );
}
