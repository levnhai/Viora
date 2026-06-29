import { ArrowRight, Play, Heart, Edit3, Lock, Star } from "lucide-react";
import iphone15ProFrame from "@/shared/assets/image/frame/iphone15_pro.png";

interface HeroProps {
  onOpenRequest: () => void;
  onOpenDemo: () => void;
}

const PETALS = [
  { left: "5%", delay: "0s", duration: "12s", size: "14px", scale: 0.7 },
  { left: "18%", delay: "2s", duration: "15s", size: "18px", scale: 1.1 },
  { left: "32%", delay: "5s", duration: "11s", size: "12px", scale: 0.6 },
  { left: "48%", delay: "1s", duration: "14s", size: "16px", scale: 0.95 },
  { left: "62%", delay: "6s", duration: "16s", size: "20px", scale: 1.2 },
  { left: "75%", delay: "3s", duration: "13s", size: "15px", scale: 0.85 },
  { left: "88%", delay: "8s", duration: "17s", size: "17px", scale: 1.0 },
  { left: "12%", delay: "4s", duration: "14.5s", size: "13px", scale: 0.75 },
  { left: "55%", delay: "7s", duration: "12.5s", size: "19px", scale: 1.15 },
  { left: "95%", delay: "1.5s", duration: "13.5s", size: "14px", scale: 0.8 },
];

// Component vẽ hoa đào nghệ thuật bằng SVG
function SakuraFlower({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={style}>
      <defs>
        <radialGradient id="sakura-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff1f2" />
          <stop offset="55%" stopColor="#fecdd3" />
          <stop offset="90%" stopColor="#f43f5e" />
          <stop offset="100%" stopColor="#e11d48" />
        </radialGradient>
      </defs>
      <g className="drop-shadow-[0_4px_8px_rgba(244,63,94,0.25)]">
        {/* 5 cánh hoa đào hồng */}
        <path
          d="M50 50 C50 16, 68 12, 62 33 C56 50, 50 50, 50 50 Z"
          fill="url(#sakura-grad)"
        />
        <path
          d="M50 50 C78 30, 88 44, 70 56 C52 68, 50 50, 50 50 Z"
          fill="url(#sakura-grad)"
        />
        <path
          d="M50 50 C68 78, 54 88, 44 68 C34 48, 50 50, 50 50 Z"
          fill="url(#sakura-grad)"
        />
        <path
          d="M50 50 C22 70, 12 56, 30 44 C48 32, 50 50, 50 50 Z"
          fill="url(#sakura-grad)"
        />
        <path
          d="M50 50 C32 22, 46 12, 56 30 C66 48, 50 50, 50 50 Z"
          fill="url(#sakura-grad)"
        />

        {/* Nhụy hoa đào */}
        <circle cx="50" cy="50" r="5" fill="#e11d48" />
        <path
          d="M50 50 L50 38 M50 50 L58 43 M50 50 L56 58 M50 50 L42 58 M50 50 L42 42"
          stroke="#be123c"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <circle cx="50" cy="36" r="1.5" fill="#be123c" />
        <circle cx="60" cy="42" r="1.5" fill="#be123c" />
        <circle cx="58" cy="60" r="1.5" fill="#be123c" />
        <circle cx="40" cy="60" r="1.5" fill="#be123c" />
        <circle cx="40" cy="40" r="1.5" fill="#be123c" />
      </g>
    </svg>
  );
}

export function Hero({ onOpenRequest, onOpenDemo }: HeroProps) {
  return (
    <section
      className="relative overflow-hidden pt-16 pb-28 text-left bg-cover bg-center bg-no-repeat transition-all duration-500"
      style={{
        backgroundImage: "url('/hero-bg.png')",
        backgroundColor: "#fdf6ef",
      }}
    >
      {/* CSS Keyframes for falling petals */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes fall {
          0% {
            transform: translateY(-20px) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.75;
          }
          90% {
            opacity: 0.75;
          }
          100% {
            transform: translateY(750px) translateX(120px) rotate(360deg);
            opacity: 0;
          }
        }
      `,
        }}
      />

      {/* Floating Petals Container */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        {PETALS.map((p, idx) => (
          <div
            key={idx}
            className="absolute pointer-events-none"
            style={{
              left: p.left,
              top: "-20px",
              width: p.size,
              height: p.size,
              animation: `fall ${p.duration} linear infinite`,
              animationDelay: p.delay,
              transform: `scale(${p.scale})`,
            }}
          >
            <svg
              viewBox="0 0 24 24"
              className="w-full h-full fill-pink-300/60 drop-shadow-sm"
            >
              <path d="M12 21.5c-3.3 0-6-2.7-6-6 0-4 6-12 6-12s6 8 6 12c0 3.3-2.7 6-6 6z" />
            </svg>
          </div>
        ))}
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* CỘT TRÁI (L7 / 12) */}
          <div className="space-y-8 lg:col-span-7">
            {/* Tiêu đề chính */}
            <div className="space-y-4">
              <h1
                style={{
                  fontFamily: "'EB Garamond', Georgia, serif",
                  fontWeight: 500,
                  lineHeight: 1.15,
                }}
                className="text-5xl sm:text-6xl text-[#2c1810] tracking-tight"
              >
                Tạo thiệp cưới online
                <br />
                <span
                  className="text-[#db2777] font-normal text-6xl sm:text-7xl block mt-2"
                  style={{ fontFamily: "'Great Vibes', cursive" }}
                >
                  đẹp như mơ
                </span>
              </h1>

              {/* Slogan */}
              <p
                style={{ fontFamily: "'Great Vibes', cursive" }}
                className="text-2xl sm:text-3xl text-[#db2777] font-medium tracking-wide"
              >
                Dễ dàng — Nhanh chóng — Cá nhân hóa
              </p>
            </div>

            {/* Đoạn mô tả ngắn */}
            <p className="text-[15px] text-[#7a5c4f]/80 leading-relaxed max-w-lg font-light">
              Hơn 1000+ mẫu thiệp cưới hiện đại, sang trọng và tinh tế. <br />
              Tạo và chia sẻ thiệp cưới của bạn chỉ trong vài phút.
            </p>

            {/* Các nút hành động dạng Pill */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={onOpenRequest}
                className="bg-[#db2777] hover:bg-[#c2185b] text-white px-8 py-3.5 rounded-full font-semibold text-sm hover:opacity-95 active:scale-95 transition-all flex items-center gap-2 cursor-pointer border-0 shadow-lg shadow-pink-600/15"
              >
                Tạo thiệp ngay <ArrowRight size={16} />
              </button>
              <button
                onClick={onOpenDemo}
                className="border border-[#db2777]/30 bg-white text-[#db2777] hover:bg-[#db2777]/5 px-8 py-3.5 rounded-full font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <div className="w-5 h-5 rounded-full border border-[#db2777]/40 flex items-center justify-center bg-white">
                  <Play
                    size={10}
                    className="fill-[#db2777] text-[#db2777] ml-0.5"
                  />
                </div>
                Xem video demo
              </button>
            </div>

            {/* 3 Icon tính năng nhỏ */}
            <div className="grid grid-cols-3 gap-2 pt-2 max-w-xl">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-pink-50 flex items-center justify-center flex-shrink-0">
                  <Edit3 size={14} className="text-[#db2777]" />
                </div>
                <div className="text-left">
                  <p className="text-[11px] font-bold text-[#2c1810] leading-tight">
                    Thiết kế dễ dàng
                  </p>
                  <p className="text-[9px] text-[#7a5c4f]/60 mt-0.5">
                    Không cần kỹ năng
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-pink-50 flex items-center justify-center flex-shrink-0">
                  <Lock size={14} className="text-[#db2777]" />
                </div>
                <div className="text-left">
                  <p className="text-[11px] font-bold text-[#2c1810] leading-tight">
                    Bảo mật tuyệt đối
                  </p>
                  <p className="text-[9px] text-[#7a5c4f]/60 mt-0.5">
                    Thông tin của bạn
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-pink-50 flex items-center justify-center flex-shrink-0">
                  <Heart
                    size={14}
                    className="text-[#db2777] fill-[#db2777]/10"
                  />
                </div>
                <div className="text-left">
                  <p className="text-[11px] font-bold text-[#2c1810] leading-tight">
                    Chia sẻ nhanh chóng
                  </p>
                  <p className="text-[9px] text-[#7a5c4f]/60 mt-0.5">
                    Đến mọi người
                  </p>
                </div>
              </div>
            </div>

            {/* Ratings & Social Proof */}
            <div className="flex items-center gap-3 pt-2">
              <div className="flex -space-x-2.5 overflow-hidden">
                {[
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces",
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces",
                  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces",
                  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces",
                ].map((src, i) => (
                  <img
                    key={i}
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                    src={src}
                    alt="user"
                  />
                ))}
              </div>
              <div className="text-left text-xs">
                <p className="text-[#7a5c4f]/80 font-medium">
                  <span className="text-[#db2777] font-bold">5.000+</span> cặp
                  đôi đã tin tưởng lựa chọn Viora
                </p>
                <div className="flex items-center gap-1 mt-0.5">
                  <div className="flex text-[#db2777]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={11} className="fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] text-[#7a5c4f]/60 font-semibold">
                    4.9/5
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* CỘT PHẢI (L5 / 12) — Mockup Điện thoại + Polaroid Card + Custom Sakura Flowers */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end relative pt-6 lg:pt-0">
            <div className="relative w-full max-w-[340px] md:max-w-[360px] h-[480px]">
              
              {/* 1. Mockup Điện thoại di động */}
              <div className="absolute left-4 top-0 z-20 w-[230px] h-[460px] relative transition-transform duration-500 hover:scale-[1.02] hover:-rotate-[1deg] drop-shadow-2xl">
                {/* Ảnh Frame iPhone 15 Pro nằm ở lớp dưới */}
                <img
                  src={iphone15ProFrame.src}
                  alt="iPhone 15 Pro Frame"
                  className="absolute inset-0 w-full h-full object-fill pointer-events-none z-10"
                />

                {/* Màn hình trong (nằm đè lên trên phần màn hình đen của frame, lọt lòng viền bezel) */}
                <div className="absolute inset-[11px] rounded-[26px] overflow-hidden bg-[#fffdfa] flex flex-col z-20">
                  {/* Dynamic Island tự vẽ đè lên trên cùng màn hình trong */}
                  <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-20 h-4.5 bg-black rounded-full z-45 flex items-center justify-center pointer-events-none scale-[0.8]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#111] absolute right-4" />
                  </div>

                  {/* Container chính tự động cuộn dọc */}
                  <div className="w-full h-full overflow-hidden relative">
                    <div 
                      className="absolute w-full space-y-6 flex flex-col pb-8"
                      style={{
                        animation: "autoScrollMobile 24s cubic-bezier(0.45, 0, 0.55, 1) infinite alternate",
                      }}
                    >
                      {/* CSS Keyframes cho auto scroll mô phỏng cuộn thiệp cưới */}
                      <style dangerouslySetInnerHTML={{__html: `
                        @keyframes autoScrollMobile {
                          0%, 12% {
                            transform: translateY(0);
                          }
                          33%, 45% {
                            transform: translateY(-33.33%);
                          }
                          66%, 78% {
                            transform: translateY(-66.66%);
                          }
                          90%, 100% {
                            transform: translateY(-75%);
                          }
                        }
                      `}} />

                      {/* --- PHẦN 1: COVER (Chiều cao đúng bằng màn hình trong 438px) --- */}
                      <div className="h-[438px] w-full flex flex-col justify-between relative p-4 flex-shrink-0 text-white">
                        {/* Background Cặp đôi cưới Unsplash */}
                        <div
                          className="absolute inset-0 bg-cover bg-center"
                          style={{
                            backgroundImage: `url('https://images.unsplash.com/photo-1519225495810-7512c696505a?q=80&w=400&auto=format&fit=crop')`,
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-[#2c1810]/40 via-[#2c1810]/10 to-[#2c1810]/55 z-10" />

                        {/* Header */}
                        <div className="relative z-20 pt-6 text-center text-white/70 text-[7px] tracking-widest uppercase">
                          THE WEDDING OF
                        </div>

                        {/* Tên cặp đôi */}
                        <div className="relative z-20 text-center text-white space-y-1">
                          <h3 
                            style={{ fontFamily: "'EB Garamond', serif" }}
                            className="text-2xl font-medium tracking-wide"
                          >
                            Văn An
                          </h3>
                          <p 
                            style={{ fontFamily: "'EB Garamond', serif" }}
                            className="text-base italic opacity-85"
                          >
                            &amp;
                          </p>
                          <h3 
                            style={{ fontFamily: "'EB Garamond', serif" }}
                            className="text-2xl font-medium tracking-wide"
                          >
                            Thu Bình
                          </h3>
                          <p className="text-[8px] tracking-widest opacity-75 pt-1">
                            15 . 11 . 2026
                          </p>
                        </div>

                        {/* Countdown Timer hồng nhạt */}
                        <div className="relative z-20 px-2 pb-6">
                          <div className="bg-[#fdf2f8]/90 backdrop-blur-xs rounded-xl py-2 px-2.5 shadow-md border border-pink-100/50 flex justify-between gap-1 text-[#db2777]">
                            {[
                              ["32", "NGÀY"],
                              ["14", "GIỜ"],
                              ["45", "PHÚT"],
                              ["20", "GIÂY"],
                            ].map(([val, label]) => (
                              <div key={label} className="text-center flex-1">
                                <p className="text-xs font-bold leading-none">{val}</p>
                                <p className="text-[6px] text-[#7a5c4f]/60 tracking-wider font-semibold mt-0.5">{label}</p>
                              </div>
                            ))}
                          </div>
                          
                          {/* Nút scroll tròn */}
                          <div className="flex justify-center mt-3 animate-bounce">
                            <div className="w-5 h-5 rounded-full bg-[#db2777] flex items-center justify-center shadow-md">
                              <span className="text-[8px] text-white">▼</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* --- PHẦN 2: LỄ THÀNH HÔN & TIỆC CƯỚI --- */}
                      <div className="px-4 text-[#2c1810] space-y-3 flex-shrink-0 text-center pt-2">
                        <p className="text-[8px] uppercase tracking-widest text-[#db2777] font-bold">THÔNG TIN HÔN LỄ</p>
                        
                        <div className="border border-pink-100/40 bg-[#fdf6ef]/60 rounded-xl p-3 shadow-xs space-y-1.5">
                          <p className="text-[9px] font-bold text-[#db2777]">LỄ VU QUY</p>
                          <p className="text-[10px] font-bold">09:00 - 15.11.2026</p>
                          <p className="text-[8px] text-[#7a5c4f]/80 font-medium">Tư gia nhà gái</p>
                          <p className="text-[7px] text-[#7a5c4f]/60 leading-normal">Quận Tân Phú, TP. Hồ Chí Minh</p>
                        </div>

                        <div className="border border-pink-100/40 bg-[#fdf6ef]/60 rounded-xl p-3 shadow-xs space-y-1.5">
                          <p className="text-[9px] font-bold text-[#db2777]">LỄ THÀNH HÔN</p>
                          <p className="text-[10px] font-bold">11:30 - 15.11.2026</p>
                          <p className="text-[8px] text-[#7a5c4f]/80 font-medium">Nhà hàng Melisa Center</p>
                          <p className="text-[7px] text-[#7a5c4f]/60 leading-normal">85 Thoại Ngọc Hầu, Tân Phú, TP. HCM</p>
                        </div>
                      </div>

                      {/* --- PHẦN 3: ALBUM HÌNH CƯỚI --- */}
                      <div className="px-4 text-[#2c1810] space-y-2 flex-shrink-0 text-center pt-2">
                        <p className="text-[8px] uppercase tracking-wider text-[#db2777] font-bold">ALBUM HÌNH CƯỚI</p>
                        <div className="grid grid-cols-2 gap-2">
                          <img src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=200" alt="Wedding 1" className="w-full aspect-[3/4] object-cover rounded-lg shadow-xs" />
                          <img src="https://images.unsplash.com/photo-1519741497674-611481863552?w=200" alt="Wedding 2" className="w-full aspect-[3/4] object-cover rounded-lg shadow-xs" />
                          <img src="https://images.unsplash.com/photo-1507504038482-76210378664a?w=200" alt="Wedding 3" className="w-full aspect-[3/4] object-cover rounded-lg shadow-xs" />
                          <img src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=200" alt="Wedding 4" className="w-full aspect-[3/4] object-cover rounded-lg shadow-xs" />
                        </div>
                      </div>

                      {/* --- PHẦN 4: LỜI CHÚC & RSVP --- */}
                      <div className="px-4 text-[#2c1810] space-y-3 flex-shrink-0 text-center pt-2 pb-6">
                        <div className="border border-pink-100/40 bg-[#fdf6ef]/60 rounded-xl p-3 shadow-xs space-y-2">
                          <p className="text-[8px] uppercase tracking-wider text-[#db2777] font-bold">XÁC NHẬN THAM DỰ</p>
                          <p className="text-[7px] text-[#7a5c4f]/70">Để ngày vui của chúng tôi được trọn vẹn, xin vui lòng gửi phản hồi tham dự tiệc.</p>
                          <button className="w-full bg-[#db2777] text-white text-[8px] py-1.5 rounded-lg border-0 cursor-pointer hover:bg-[#c2185b] transition-colors font-semibold shadow-xs">
                            Gửi phản hồi RSVP
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Ảnh Polaroid xếp nghiêng phía sau (phải) */}
              <div className="absolute right-0 top-16 z-10 w-[180px] bg-white p-3 rounded-lg shadow-xl rotate-[6deg] border border-[#e2d8cf]/50 flex flex-col justify-between transition-transform duration-500 hover:scale-105 hover:rotate-[3deg] hover:z-30">
                {/* Ảnh đôi uyên ương cưới */}
                <div className="relative aspect-square overflow-hidden bg-gray-100 rounded-md">
                  <img
                    src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=400&auto=format&fit=crop"
                    alt="Couple Story"
                    className="w-full h-full object-cover"
                  />
                  {/* Nút Play tròn NỀN TRẮNG viền hồng, icon hồng ở trung tâm ảnh */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                    <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#db2777] border-0 shadow-lg cursor-pointer hover:scale-110 active:scale-95 transition-all">
                      <Play size={14} className="fill-current ml-0.5" />
                    </button>
                  </div>
                </div>

                {/* Chữ viết tay Polaroid bằng font Great Vibes cực đẹp */}
                <div className="pt-3 pb-1 text-center">
                  <span
                    style={{ fontFamily: "'Great Vibes', cursive" }}
                    className="text-2xl text-[#db2777] font-medium tracking-wide"
                  >
                    Our Love Story
                  </span>
                </div>
              </div>

              {/* 3. Các bông hoa anh đào Sakura trang trí nghệ thuật */}
              {/* Bông hoa lớn đè góc dưới bên trái điện thoại */}
              <SakuraFlower
                className="absolute -left-3 bottom-12 w-16 h-16 z-30 animate-pulse cursor-pointer hover:scale-110 transition-transform duration-300"
                style={{ animationDuration: "4s" }}
              />

              {/* Bông hoa nhỏ lấp ló góc dưới cùng bên trái */}
              <SakuraFlower className="absolute -left-10 bottom-24 w-10 h-10 z-10 opacity-80 rotate-45 cursor-pointer hover:scale-105 transition-transform" />

              {/* Bông hoa nhỏ đằng sau phía trên bên phải */}
              <SakuraFlower className="absolute -right-2 top-8 w-8 h-8 z-5 opacity-70 -rotate-12 cursor-pointer hover:scale-105 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
