"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Heart, Calendar, Play, PhoneCall, ShieldCheck } from "lucide-react";
import iphone15ProFrame from "@/shared/assets/image/frame/iphone15_pro.png";
import { fetchDemoInvitations } from "@/entities/invitation/api/invitation.api";
import { getTemplatePackage } from "@/entities/template/model/registry";
import { DEFAULT_DEMO_WEDDING_DATA } from "@/entities/invitation/model/mockData";

export function HeroSection() {
  const [demos, setDemos] = useState<any[]>([]);

  useEffect(() => {
    fetchDemoInvitations()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setDemos(data);
        }
      })
      .catch((err) => {
        console.error("Lỗi khi kết nối API thiệp mẫu:", err);
      });
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  // Dữ liệu thực từ Database API (mới nhất với source = 'demo')
  const d0 = demos[0] || DEFAULT_DEMO_WEDDING_DATA;
  const d1 = demos[1] || demos[0] || DEFAULT_DEMO_WEDDING_DATA;
  const d2 = demos[2] || demos[0] || DEFAULT_DEMO_WEDDING_DATA;

  // Render động LiveView của từng mẫu thiệp tương ứng từ Database
  const LiveView0 = getTemplatePackage(d0.templateId || "temp_1").LiveView;
  const LiveView1 = getTemplatePackage(d1.templateId || "temp_4").LiveView;
  const LiveView2 = getTemplatePackage(d2.templateId || "temp_3").LiveView;

  return (
    <section className="relative pt-12 pb-24 md:pt-20 md:pb-36 overflow-hidden bg-gradient-to-b from-pink-50/70 via-rose-50/20 to-background dark:from-slate-950 dark:via-slate-900 dark:to-background">
      {/* Background Ambient Glow Orbs */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-pink-400/20 via-rose-300/20 to-amber-200/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 -right-24 w-80 h-80 bg-pink-300/15 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Headline & Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 text-center lg:text-left space-y-6 sm:space-y-7"
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
            <h1 className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-foreground tracking-tight leading-[1.18]">
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
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 sm:gap-4 pt-2">
              <button
                onClick={() => scrollToSection("dang-ky-tu-van")}
                className="w-full sm:w-auto px-8 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-[#db2777] to-rose-600 hover:from-[#be185d] hover:to-rose-700 text-white font-bold text-sm sm:text-base shadow-xl shadow-pink-500/25 hover:shadow-2xl hover:shadow-pink-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2.5 group cursor-pointer"
              >
                <PhoneCall size={18} className="animate-bounce" />
                <span>Nhận tư vấn ngay</span>
                <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
              </button>

              <button
                onClick={() => scrollToSection("mau-thiep")}
                className="w-full sm:w-auto px-7 py-3.5 sm:py-4 rounded-2xl bg-card hover:bg-accent/10 border border-border/80 text-foreground font-semibold text-sm sm:text-base transition-all duration-300 hover:shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Play size={16} className="text-[#db2777] fill-[#db2777]" />
                <span>Khám phá bộ sưu tập</span>
              </button>
            </div>

            {/* Trust Stats Bar */}
            <div className="pt-6 sm:pt-8 border-t border-border/60 grid grid-cols-3 gap-4 sm:gap-6 text-center lg:text-left">
              <div className="space-y-0.5">
                <p className="text-xl sm:text-3xl font-black text-foreground tracking-tight">
                  300+
                </p>
                <p className="text-[11px] sm:text-sm text-slate-500 dark:text-slate-400 font-semibold">Mẫu thiệp đa dạng</p>
              </div>
              <div className="space-y-0.5">
                <p className="text-xl sm:text-3xl font-black text-[#db2777] tracking-tight">
                  10.000+
                </p>
                <p className="text-[11px] sm:text-sm text-slate-500 dark:text-slate-400 font-semibold">Cặp đôi tin dùng</p>
              </div>
              <div className="space-y-0.5">
                <p className="text-xl sm:text-3xl font-black text-amber-600 dark:text-amber-400 tracking-tight">
                  99.8%
                </p>
                <p className="text-[11px] sm:text-sm text-slate-500 dark:text-slate-400 font-semibold">Hài lòng tuyệt đối</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: 3 iPhone 15 Pro Showcase Trio với Live Template từ Database API */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex lg:col-span-5 relative justify-center items-center mt-6 lg:mt-0"
          >
            {/* Background Ambient Glow for Phones */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-400/20 via-rose-400/25 to-amber-300/20 rounded-full blur-3xl scale-110 pointer-events-none" />

            {/* 3 Phones Trio Container */}
            <div className="relative flex items-center justify-center -space-x-8 sm:-space-x-12 md:-space-x-14 lg:-space-x-10 xl:-space-x-12 py-4">
              
              {/* Phone 1 (Left): Live Template 1 từ Database API */}
              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                whileHover="hover"
                className="relative w-[135px] sm:w-[170px] md:w-[190px] lg:w-[165px] xl:w-[185px] aspect-[415/876] drop-shadow-2xl z-10 -rotate-6 hover:rotate-0 hover:z-40 hover:scale-105 transition-all duration-500 cursor-pointer group"
              >
                {/* iPhone 15 Pro Frame nằm bên dưới */}
                <img 
                  src={iphone15ProFrame.src} 
                  alt="iPhone 15 Pro Frame Left" 
                  className="absolute inset-0 w-full h-full object-fill pointer-events-none z-10"
                />

                {/* Live Template Content từ API (z-20) - Chỉ scroll khi hover */}
                <div className="absolute top-[2.28%] left-[4.58%] w-[90.84%] h-[95.43%] rounded-[10%] overflow-hidden bg-transparent z-20">
                  <div className="w-[375px] absolute left-1/2 -translate-x-1/2 top-0 origin-top transform scale-[0.36] sm:scale-[0.46] pointer-events-none select-none">
                    <motion.div
                      initial="initial"
                      variants={{
                        initial: { y: "0%" },
                        hover: { y: "-65%", transition: { duration: 12, ease: "linear" } },
                      }}
                      transition={{ duration: 1, ease: "easeInOut" }}
                    >
                      <LiveView0 weddingData={d0} previewMode="invitation" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Phone 2 (Center): Live Template 2 từ Database API - Prominent */}
              <motion.div
                animate={{ y: [0, 7, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                whileHover="hover"
                className="relative w-[150px] sm:w-[190px] md:w-[210px] lg:w-[185px] xl:w-[205px] aspect-[415/876] drop-shadow-2xl z-30 scale-105 hover:scale-110 transition-all duration-500 cursor-pointer group"
              >
                {/* iPhone 15 Pro Frame nằm bên dưới */}
                <img 
                  src={iphone15ProFrame.src} 
                  alt="iPhone 15 Pro Frame Center" 
                  className="absolute inset-0 w-full h-full object-fill pointer-events-none z-10"
                />

                {/* Live Template Content từ API (z-20) - Chỉ scroll khi hover */}
                <div className="absolute top-[2.28%] left-[4.58%] w-[90.84%] h-[95.43%] rounded-[10%] overflow-hidden bg-transparent z-20">
                  <div className="w-[375px] absolute left-1/2 -translate-x-1/2 top-0 origin-top transform scale-[0.41] sm:scale-[0.52] pointer-events-none select-none">
                    <motion.div
                      initial="initial"
                      variants={{
                        initial: { y: "0%" },
                        hover: { y: "-65%", transition: { duration: 12, ease: "linear" } },
                      }}
                      transition={{ duration: 1, ease: "easeInOut" }}
                    >
                      <LiveView1 weddingData={d1} previewMode="invitation" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Phone 3 (Right): Live Template 3 từ Database API */}
              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                whileHover="hover"
                className="relative w-[135px] sm:w-[170px] md:w-[190px] lg:w-[165px] xl:w-[185px] aspect-[415/876] drop-shadow-2xl z-10 rotate-6 hover:rotate-0 hover:z-40 hover:scale-105 transition-all duration-500 cursor-pointer group"
              >
                {/* iPhone 15 Pro Frame nằm bên dưới */}
                <img 
                  src={iphone15ProFrame.src} 
                  alt="iPhone 15 Pro Frame Right" 
                  className="absolute inset-0 w-full h-full object-fill pointer-events-none z-10"
                />

                {/* Live Template Content từ API (z-20) - Chỉ scroll khi hover */}
                <div className="absolute top-[2.28%] left-[4.58%] w-[90.84%] h-[95.43%] rounded-[10%] overflow-hidden bg-transparent z-20">
                  <div className="w-[375px] absolute left-1/2 -translate-x-1/2 top-0 origin-top transform scale-[0.36] sm:scale-[0.46] pointer-events-none select-none">
                    <motion.div
                      initial="initial"
                      variants={{
                        initial: { y: "0%" },
                        hover: { y: "-65%", transition: { duration: 12, ease: "linear" } },
                      }}
                      transition={{ duration: 1, ease: "easeInOut" }}
                    >
                      <LiveView2 weddingData={d2} previewMode="invitation" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}




