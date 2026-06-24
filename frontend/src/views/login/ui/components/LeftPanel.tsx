import { Heart } from "lucide-react";

export function LeftPanel() {
  return (
    <div
      className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop')",
      }}
    >
      {/* Soft overlay */}
      <div className="absolute inset-0 bg-stone-950/25 pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-10 flex items-center gap-2 text-white/90">
        <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center">
          <Heart size={12} className="text-white" fill="currentColor" />
        </div>
        <span className="text-xs font-semibold uppercase tracking-wider font-sans">
          Viora Studio
        </span>
      </div>

      {/* Bottom Text */}
      <div className="relative z-10 space-y-2 max-w-md">
        <p className="text-[9px] font-bold uppercase tracking-widest text-white/80">
          Thiệp mời cưới online
        </p>
        <h1
          className="text-3xl text-white font-medium leading-tight"
          style={{ fontFamily: "'EB Garamond', serif" }}
        >
          Chia sẻ khoảnh khắc đáng nhớ nhất của bạn
        </h1>
        <p className="text-xs text-white/70">
          Tạo thiệp cưới tinh tế & gửi đến những người thân yêu
        </p>
      </div>
    </div>
  );
}
