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
      } inset-0 z-50 flex flex-col items-center justify-center bg-[#faf9f5] transition-all duration-1000 cursor-pointer ${
        isOpen ? "opacity-0 pointer-events-none scale-95" : "opacity-100 scale-100"
      }`}
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Background patterns nhạt thanh lịch */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#8a9a86_1px,transparent_1px)] [background-size:20px_20px]" />

      {/* ── HOA LÁ TRANG TRÍ PHÍA SAU PHONG BÌ ── */}
      {/* Cành hoa lá bên trái */}
      <svg
        className="absolute left-[calc(50%-220px)] sm:left-[calc(50%-280px)] top-[calc(50%-180px)] w-36 sm:w-52 h-64 sm:h-80 pointer-events-none select-none z-0 opacity-90 transition-transform duration-1000"
        style={{ transform: isOpen ? "translate(-20px, -10px) rotate(-5deg)" : "none" }}
        viewBox="0 0 120 180"
        fill="none"
      >
        {/* Nhánh cành */}
        <path
          d="M100,160 C80,120 40,70 55,20"
          stroke="#74856f"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M75,100 C50,85 30,65 35,40"
          stroke="#74856f"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        {/* Lá xanh bụi (Sage Leaves) */}
        <path d="M55,20 C48,15 38,18 45,25 C52,32 58,26 55,20 Z" fill="#96a891" />
        <path d="M35,40 C28,36 20,40 27,46 C34,52 40,46 35,40 Z" fill="#a7bca2" />
        <path d="M60,45 C50,38 42,42 49,50 C56,58 64,52 60,45 Z" fill="#8d9f88" />
        <path d="M42,65 C34,60 26,64 32,71 C38,78 46,72 42,65 Z" fill="#9bb096" />
        <path d="M70,75 C60,68 52,72 59,80 C66,88 74,82 70,75 Z" fill="#889a83" />
        <path d="M53,95 C45,90 38,94 44,101 C50,108 58,102 53,95 Z" fill="#a2b79d" />
        <path d="M80,110 C70,105 65,110 71,117 C77,124 85,118 80,110 Z" fill="#91a58c" />
        
        {/* Bông hoa hồng trắng kem */}
        <circle cx="55" cy="65" r="10" fill="#faf9f5" />
        <circle cx="51" cy="61" r="7" fill="#ffffff" />
        <circle cx="59" cy="61" r="7" fill="#ffffff" />
        <circle cx="55" cy="69" r="8" fill="#f5f4ee" />
        <circle cx="55" cy="65" r="3" fill="#dfd6c0" opacity="0.6" />
        
        <circle cx="35" cy="115" r="7" fill="#faf9f5" />
        <circle cx="32" cy="112" r="5" fill="#ffffff" />
        <circle cx="38" cy="112" r="5" fill="#ffffff" />
        <circle cx="35" cy="118" r="5" fill="#f5f4ee" />
        <circle cx="35" cy="115" r="2" fill="#dfd6c0" opacity="0.6" />
      </svg>

      {/* Cành hoa lá bên phải */}
      <svg
        className="absolute right-[calc(50%-220px)] sm:right-[calc(50%-280px)] top-[calc(50%-180px)] w-36 sm:w-52 h-64 sm:h-80 pointer-events-none select-none z-0 opacity-90 transition-transform duration-1000"
        style={{ transform: isOpen ? "translate(20px, -10px) rotate(5deg)" : "none" }}
        viewBox="0 0 120 180"
        fill="none"
      >
        {/* Nhánh cành đối xứng */}
        <path
          d="M20,160 C40,120 80,70 65,20"
          stroke="#74856f"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M45,100 C70,85 90,65 85,40"
          stroke="#74856f"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        {/* Lá xanh bụi (Sage Leaves) */}
        <path d="M65,20 C72,15 82,18 75,25 C68,32 62,26 65,20 Z" fill="#96a891" />
        <path d="M85,40 C92,36 100,40 93,46 C86,52 80,46 85,40 Z" fill="#a7bca2" />
        <path d="M60,45 C70,38 78,42 71,50 C64,58 56,52 60,45 Z" fill="#8d9f88" />
        <path d="M78,65 C86,60 94,64 88,71 C82,78 74,72 78,65 Z" fill="#9bb096" />
        <path d="M50,75 C60,68 68,72 61,80 C54,88 46,82 50,75 Z" fill="#889a83" />
        <path d="M67,95 C75,90 82,94 76,101 C70,108 62,102 67,95 Z" fill="#a2b79d" />
        <path d="M40,110 C50,105 55,110 49,117 C43,124 35,118 40,110 Z" fill="#91a58c" />
        
        {/* Bông hoa hồng trắng kem đối xứng */}
        <circle cx="65" cy="65" r="10" fill="#faf9f5" />
        <circle cx="61" cy="61" r="7" fill="#ffffff" />
        <circle cx="69" cy="61" r="7" fill="#ffffff" />
        <circle cx="65" cy="69" r="8" fill="#f5f4ee" />
        <circle cx="65" cy="65" r="3" fill="#dfd6c0" opacity="0.6" />
        
        <circle cx="85" cy="115" r="7" fill="#faf9f5" />
        <circle cx="82" cy="112" r="5" fill="#ffffff" />
        <circle cx="88" cy="112" r="5" fill="#ffffff" />
        <circle cx="85" cy="118" r="5" fill="#f5f4ee" />
        <circle cx="85" cy="115" r="2" fill="#dfd6c0" opacity="0.6" />
      </svg>

      {/* ── CHỮ PHÍA TRÊN PHONG BÌ ── */}
      <div className="text-center mb-8 z-10 space-y-2 select-none">
        <p className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#8a9a86] font-semibold">
          Together with their families
        </p>
        <h2
          className="text-3xl sm:text-4xl text-[#4a5548] font-normal"
          style={{ fontFamily: "'Great Vibes', cursive", lineHeight: 1.1 }}
        >
          {groomName} & {brideName}
        </h2>
      </div>

      {/* ── THÂN PHONG BÌ SAGE GREEN 3D ── */}
      <div
        className={`relative w-[90%] max-w-[420px] aspect-[1.48] bg-[#9ba896] rounded-b-lg shadow-2xl flex flex-col justify-between items-center transition-all duration-1000 ${
          isOpen ? "scale-90 rotate-2 translate-y-12 opacity-50" : "scale-100"
        }`}
      >
        {/* Nếp gấp chéo của thân phong bì ở phía dưới (vẽ bằng SVG) */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none rounded-b-lg overflow-hidden"
          viewBox="0 0 100 68"
          preserveAspectRatio="none"
        >
          {/* Nếp gập trái */}
          <polygon points="0,68 50,28 0,0" fill="#929f8d" opacity="0.8" />
          {/* Nếp gập phải */}
          <polygon points="100,68 50,28 100,0" fill="#929f8d" opacity="0.8" />
          {/* Nếp gập đáy */}
          <polygon points="0,68 100,68 50,28" fill="#9aa995" />
          {/* Đường bóng mờ nhẹ */}
          <line x1="0" y1="68" x2="50" y2="28" stroke="#7e8c79" strokeWidth="0.3" />
          <line x1="100" y1="68" x2="50" y2="28" stroke="#7e8c79" strokeWidth="0.3" />
        </svg>

        {/* Nắp gập tam giác chúc xuống ở phía trên (Vẽ bằng SVG có đổ bóng) */}
        <svg
          className="absolute top-0 left-0 w-full h-[62%] pointer-events-none overflow-visible filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.18)]"
          viewBox="0 0 100 62"
          preserveAspectRatio="none"
        >
          <polygon
            points="0,0 100,0 50,62"
            fill={isOpen ? "#a5b4a0" : "#8c9a87"}
            className="transition-all duration-1000"
            style={{
              transform: isOpen ? "scaleY(-0.8) translateY(-40px)" : "none",
              transformOrigin: "top center",
            }}
          />
        </svg>

        {/* ── BẢNG TÊN KHÁCH MỜI DÁN TRÊN PHONG BÌ ── */}
        <div className="w-full text-center z-10 my-auto px-10 flex flex-col items-center">
          <p className="text-[10px] text-[#fbfafa] font-light uppercase tracking-widest opacity-80 mb-2">
            Kính mời
          </p>
          <div className="bg-[#faf9f5]/90 backdrop-blur-xs px-6 py-2.5 rounded-lg border border-[#7e8c79]/15 shadow-sm min-w-[180px] max-w-[280px]">
            <span
              className="text-xs sm:text-sm font-semibold text-[#4a5548] tracking-wide block truncate"
              style={{ fontFamily: "'EB Garamond', serif" }}
            >
              {guestName ? guestName : "Quý khách mời thân thương"}
            </span>
          </div>
        </div>

        {/* ── CON DẤU SÁP TRÒN (WAX SEAL BUTTON) ── */}
        <div
          className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 transition-all duration-1000"
          style={{
            transform: isOpen
              ? "translate(-50%, -200px) scale(0.6) rotate(15deg)"
              : "translate(-50%, -50%) scale(1)",
            opacity: isOpen ? 0 : 1,
          }}
        >
          <button
            onClick={handleOpen}
            className="w-14 h-14 rounded-full bg-[#e3e2db] flex items-center justify-center shadow-lg border-2 border-white/60 active:scale-95 transition-all cursor-pointer group relative overflow-hidden shadow-[#7e8c79]/30"
          >
            {/* Rìa sáp loang lổ tự nhiên bên ngoài */}
            <div className="absolute inset-0 bg-[#deddd5] rounded-full scale-110 opacity-70 filter blur-[1px] transform rotate-12" />
            <div className="absolute inset-0 bg-[#d5d4cb] rounded-full scale-105 filter blur-[0.5px] transform -rotate-6" />

            {/* Tim sáp nổi ở giữa */}
            <div className="relative w-11 h-11 rounded-full bg-[#eae9df] border border-[#c5c4ba] shadow-inner flex flex-col items-center justify-center">
              <Heart
                size={14}
                className="text-[#969588] fill-[#969588]/10 group-hover:scale-110 transition-transform duration-300 animate-pulse"
              />
              <span className="text-[7px] uppercase tracking-wider font-bold text-[#969588] mt-0.5">
                Mở
              </span>
            </div>
            {/* Vòng hào quang pulsing nhẹ */}
            <span className="absolute inset-0 w-full h-full bg-[#e3e2db] rounded-full animate-ping opacity-10 pointer-events-none" />
          </button>
        </div>

        {/* Nhãn hiệu chìm chân thực */}
        <div className="mb-2 z-10 pointer-events-none opacity-40">
          <span className="text-[7px] text-[#f5f4ef] font-mono tracking-widest">
            VIORA INVITE STUDIO
          </span>
        </div>
      </div>

      {/* ── CHỮ PHÍA DƯỚI PHONG BÌ ── */}
      <div className="text-center mt-6 z-10 select-none">
        <p className="text-[10px] uppercase tracking-[0.25em] text-[#8a9a86] font-light">
          Click to Open
        </p>
      </div>
    </div>
  );
}
