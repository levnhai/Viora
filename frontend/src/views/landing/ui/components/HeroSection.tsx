"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Heart, Calendar, Play, CheckCircle2, PhoneCall, ShieldCheck } from "lucide-react";

export function HeroSection() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative pt-12 pb-24 md:pt-20 md:pb-36 overflow-hidden bg-gradient-to-b from-pink-50/70 via-rose-50/20 to-background dark:from-slate-950 dark:via-slate-900 dark:to-background">
      {/* Background Ambient Glow Orbs */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-pink-400/20 via-rose-300/20 to-amber-200/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 -right-24 w-80 h-80 bg-pink-300/15 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Headline & Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 text-center lg:text-left space-y-7"
          >
            {/* Top Tag Badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-pink-200/80 dark:border-pink-900/50 text-[#db2777] text-xs sm:text-sm font-semibold shadow-xs"
            >
              <Sparkles size={16} className="text-pink-600 animate-pulse" />
              <span>Dịch Vụ Thiệp Cưới Số Đột Phá #1 Việt Nam</span>
            </motion.div>

            {/* Main Title with Clean Be Vietnam Pro Sans Typography */}
            <h1 className="text-xl sm:text-3xl lg:text-5xl xl:text-6xl font-black text-foreground tracking-tight leading-[1.2]">
              Thiệp Cưới Online <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-[#db2777] via-rose-500 to-amber-600 bg-clip-text text-transparent">
                Sang Trọng, Nhanh Chóng
              </span> & Độc Bản
            </h1>

            {/* Sub-headline */}
            <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Giải pháp website thiệp cưới trực tuyến nghệ thuật trọn gói. Tích hợp quản lý phản hồi RSVP tự động, chỉ đường Google Maps, album ảnh HD và nhạc nền lãng mạn.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-3">
              <button
                onClick={() => scrollToSection("dang-ky-tu-van")}
                className="w-full sm:w-auto px-9 py-4 rounded-2xl bg-gradient-to-r from-[#db2777] to-rose-600 hover:from-[#be185d] hover:to-rose-700 text-white font-bold text-base shadow-xl shadow-pink-500/25 hover:shadow-2xl hover:shadow-pink-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2.5 group cursor-pointer"
              >
                <PhoneCall size={18} className="animate-bounce" />
                <span>Nhận tư vấn ngay</span>
                <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
              </button>

              <button
                onClick={() => scrollToSection("mau-thiep")}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-card hover:bg-accent/10 border border-border/80 text-foreground font-semibold text-base transition-all duration-300 hover:shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Play size={16} className="text-[#db2777] fill-[#db2777]" />
                <span>Khám phá bộ sưu tập</span>
              </button>
            </div>

            {/* Trust Stats Bar */}
            <div className="pt-8 border-t border-border/60 grid grid-cols-3 gap-6 text-center lg:text-left">
              <div className="space-y-0.5">
                <p className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
                  300+
                </p>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-semibold">Mẫu thiệp đa dạng</p>
              </div>
              <div className="space-y-0.5">
                <p className="text-2xl sm:text-3xl font-black text-[#db2777] tracking-tight">
                  10.000+
                </p>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-semibold">Cặp đôi tin dùng</p>
              </div>
              <div className="space-y-0.5">
                <p className="text-2xl sm:text-3xl font-black text-amber-600 dark:text-amber-400 tracking-tight">
                  99.8%
                </p>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-semibold">Hài lòng tuyệt đối</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Devices Mockup (Chỉ hiển thị trên màn hình laptop/desktop lg) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex lg:col-span-5 relative justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[480px]">
              
              {/* Laptop Screen Mockup */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="bg-slate-950 p-3 sm:p-4 rounded-3xl shadow-2xl border border-slate-800 shadow-pink-500/10"
              >
                <div className="flex items-center gap-1.5 mb-2 px-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  <div className="ml-2 text-[10px] text-slate-400 font-mono bg-slate-900 px-3 py-0.5 rounded-md flex-1 truncate">
                    viora.vn/wedding/minh-anh-bao-nam
                  </div>
                </div>

                {/* Laptop Content Preview */}
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-slate-900 border border-slate-800">
                  <img
                    src="https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop&q=80"
                    alt="Laptop Wedding Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-5 text-white">
                    <span className="text-[10px] uppercase tracking-widest text-pink-300 font-extrabold">SAVE THE DATE</span>
                    <h3 className="text-xl font-bold tracking-wide">Minh Anh & Bảo Nam</h3>
                    <p className="text-xs text-rose-200 flex items-center gap-1.5 mt-1 font-semibold">
                      <Calendar size={13} /> 24 THÁNG 12, 2026
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Floating Phone Mockup */}
              <motion.div 
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-8 -left-6 sm:-left-10 w-48 sm:w-56 bg-slate-950 p-2.5 rounded-[32px] shadow-2xl border-2 border-slate-700/80 -rotate-3 hover:rotate-0 transition-transform duration-500 z-20"
              >
                <div className="w-16 h-3.5 bg-slate-800 rounded-full mx-auto mb-2" />
                <div className="relative aspect-[9/18] rounded-[24px] overflow-hidden bg-card">
                  <img
                    src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&auto=format&fit=crop&q=80"
                    alt="Mobile Wedding Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent flex flex-col justify-end p-3.5 text-white">
                    <div className="inline-flex items-center gap-1 bg-pink-600/90 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[9px] font-extrabold w-fit mb-1 shadow-sm">
                      <Heart size={10} className="fill-white" /> RSVP Online
                    </div>
                    <p className="text-xs font-bold">Gửi lời chúc mừng</p>
                    <p className="text-[10px] text-slate-300 truncate">Hồng Hạnh: Chúc hai bạn trăm năm hạnh phúc!</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating Highlight Badge */}
              <div className="absolute -top-5 -right-5 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-pink-200/80 dark:border-slate-800 flex items-center gap-3 z-30">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <ShieldCheck size={22} />
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground">Dịch Vụ Trọn Gói</p>
                  <p className="text-[10px] text-muted-foreground font-semibold">Hỗ trợ kỹ thuật 24/7</p>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
