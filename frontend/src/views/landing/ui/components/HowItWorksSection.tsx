"use client";

import { motion } from "framer-motion";
import { LayoutGrid, FileEdit, Palette, Share2, ArrowRight } from "lucide-react";

export function HowItWorksSection() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const STEPS = [
    {
      num: "01",
      icon: LayoutGrid,
      title: "Chọn mẫu thiết kế",
      description: "Khám phá kho mẫu đa phong cách: Sang trọng, Hàn Quốc, Cổ điển hoặc Tinh giản.",
      color: "text-rose-600 dark:text-rose-400",
      bgColor: "bg-rose-100/70 dark:bg-rose-950/40",
    },
    {
      num: "02",
      icon: FileEdit,
      title: "Cung cấp thông tin",
      description: "Cung cấp thông tin hai họ, ngày giờ cử hành hôn lễ, địa điểm nhà hàng & lịch trình.",
      color: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-100/70 dark:bg-amber-950/40",
    },
    {
      num: "03",
      icon: Palette,
      title: "Tùy chỉnh & Hoàn thiện",
      description: "Cập nhật ảnh cưới HD, nhạc nền tự chọn, mã QR mừng cưới và màu sắc hòa hợp.",
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-100/70 dark:bg-purple-950/40",
    },
    {
      num: "04",
      icon: Share2,
      title: "Nhận link & Chia sẻ",
      description: "Nhận đường link thiệp cưới riêng & mã QR code để gửi nhanh tới bạn bè qua Zalo, Messenger.",
      color: "text-[#db2777]",
      bgColor: "bg-pink-100/70 dark:bg-pink-950/40",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-32 bg-background relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-block text-xs uppercase tracking-widest font-bold text-[#db2777] bg-pink-100/80 dark:bg-pink-950/50 px-3.5 py-1.5 rounded-full border border-pink-200/60">
            Dễ Dàng & Chuyên Nghiệp
          </span>
          <h2 className="text-lg sm:text-2xl md:text-4xl font-black text-foreground tracking-tight">
            4 Bước Triển Khai Thiệp Cưới Số
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            Quy trình hỗ trợ chuyên nghiệp, giúp bạn nhanh chóng sở hữu website thiệp cưới ưng ý nhất.
          </p>
        </div>

        {/* 4 Steps Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative bg-card p-7 rounded-3xl border border-border/80 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Step Number & Icon Header */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-black text-muted-foreground/30 font-mono">
                      {step.num}
                    </span>
                    <div className={`w-13 h-13 rounded-2xl ${step.bgColor} ${step.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon size={24} />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>

                {/* Connecting Arrow for Desktop */}
                {idx < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-10 text-muted-foreground/30">
                    <ArrowRight size={22} />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Call to Action */}
        <div className="mt-14 text-center">
          <button
            onClick={() => scrollToSection("mau-thiep")}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-[#db2777] hover:bg-[#be185d] text-white font-bold text-sm sm:text-base shadow-xl shadow-pink-500/25 hover:shadow-pink-500/35 transition-all duration-300 cursor-pointer"
          >
            <span>Khám phá bộ sưu tập mẫu thiệp</span>
            <ArrowRight size={18} />
          </button>
        </div>

      </div>
    </section>
  );
}
