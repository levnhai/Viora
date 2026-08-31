import React from "react";

export function LoginBanner() {
  return (
    <div className="hidden lg:flex w-1/2 bg-white relative flex-col justify-between p-16 overflow-hidden">
      {/* Background Image with overlay gradient */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-10000 hover:scale-105"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#2c1810]/70 via-[#2c1810]/40 to-[#2c1810]/10" />

      {/* Header Logo */}
      <div className="relative z-10 flex items-center gap-2">
        <span 
          className="text-2xl font-bold tracking-widest text-white flex items-center gap-1.5"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          <span className="text-[#f472b6]">🌸</span> VIORA
        </span>
      </div>

      {/* Hero Slogan */}
      <div className="relative z-10 my-auto max-w-md text-white">
        <h1 
          className="text-4xl sm:text-5xl font-semibold leading-tight drop-shadow-md"
          style={{ fontFamily: "'EB Garamond', serif" }}
        >
          Tạo thiệp cưới online <br />
          <span className="text-[#f472b6]">đẹp như mơ</span>
        </h1>
        <p className="text-sm font-sans font-light mt-4 text-white/85 italic leading-relaxed">
          Dễ dàng — Nhanh chóng — Cá nhân hóa
        </p>
        <p className="text-xs font-sans font-light mt-2 text-white/70 leading-relaxed">
          Hơn 1000+ mẫu thiệp cưới đẹp, đa phong cách. <br />
          Tạo và chia sẻ thiệp cưới của bạn chỉ trong vài phút.
        </p>
      </div>

      {/* Footer Features */}
      <div className="relative z-10 grid grid-cols-4 gap-4 pt-8 border-t border-white/20 text-white/90">
        <div className="flex flex-col items-center text-center gap-2">
          <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-lg shadow-inner">
            📚
          </div>
          <span className="text-[10px] font-medium tracking-wide">Kho mẫu đa dạng</span>
        </div>
        <div className="flex flex-col items-center text-center gap-2">
          <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-lg shadow-inner">
            ✏️
          </div>
          <span className="text-[10px] font-medium tracking-wide">Chỉnh sửa dễ dàng</span>
        </div>
        <div className="flex flex-col items-center text-center gap-2">
          <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-lg shadow-inner">
            🔗
          </div>
          <span className="text-[10px] font-medium tracking-wide">Chia sẻ nhanh chóng</span>
        </div>
        <div className="flex flex-col items-center text-center gap-2">
          <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-lg shadow-inner">
            🛡️
          </div>
          <span className="text-[10px] font-medium tracking-wide">Bảo mật tuyệt đối</span>
        </div>
      </div>
    </div>
  );
}
