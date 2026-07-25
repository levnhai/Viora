"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const TESTIMONIALS = [
    {
      name: "Minh Anh & Bảo Nam",
      role: "Đã cưới tháng 10/2025",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      content: "Thiệp cưới rất đẹp, giao diện sang trọng đúng gu 2 đứa mình. Bạn bè và họ hàng nhận link khen nức nở, việc khách xác nhận RSVP tự động gửi về điện thoại tiện vô cùng!",
      rating: 5,
      location: "Hà Nội",
    },
    {
      name: "Hoàng Yến & Đức Anh",
      role: "Đã cưới tháng 12/2025",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      content: "Đội ngũ tư vấn nhiệt tình, chỉnh sửa thông tin cực nhanh. Mình thích nhất phần nhúng bản đồ Google Maps và nhạc nền tự chọn. Rất đáng tiền!",
      rating: 5,
      location: "TP. Hồ Chí Minh",
    },
    {
      name: "Thanh Hằng & Quốc Khánh",
      role: "Đã cưới tháng 01/2026",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
      content: "Ban đầu định đi in thiệp giấy đắt đỏ, may biết tới Viora. Đã tiết kiệm được một khoản lớn mà thiệp online lại hiện đại, gửi Zalo cho bạn bè ở xa rất lịch sự.",
      rating: 5,
      location: "Đà Nẵng",
    },
    {
      name: "Phương Thảo & Tuấn Kiệt",
      role: "Đã cưới tháng 02/2026",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      content: "Thiết kế thiệp vượt ngoài mong đợi, hiệu ứng hoa rơi lãng mạn vô cùng. Rất nhiều bạn bè sau đám cưới đã xin link Viora để làm thiệp cho đám cưới của họ!",
      rating: 5,
      location: "Hải Phòng",
    },
  ];

  // Auto-play slider every 4.5 seconds
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused, TESTIMONIALS.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section className="py-20 md:py-32 bg-slate-50/70 dark:bg-slate-900/40 relative overflow-hidden border-t border-border/40">
      {/* Background Ambient Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-pink-400/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-4">
          <span className="inline-block text-xs uppercase tracking-widest font-bold text-[#db2777] bg-pink-100/80 dark:bg-pink-950/50 px-3.5 py-1.5 rounded-full border border-pink-200/60">
            Chia Sẻ Yêu Thương
          </span>
          <h2 className="text-lg sm:text-2xl md:text-4xl font-black text-foreground tracking-tight">
            Các Cặp Đôi Nói Gì Về Viora?
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            Hơn 10.000+ cặp đôi đã đồng hành cùng Viora tạo nên những dấu ấn thiệp cưới trọn vẹn.
          </p>
        </div>

        {/* Testimonial Slider Card Container */}
        <div 
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="bg-card p-7 sm:p-12 rounded-[32px] border border-border/80 shadow-xl relative overflow-hidden min-h-[300px] flex flex-col justify-between">
            
            {/* Background Quote Icon Accent */}
            <Quote className="absolute top-6 right-8 text-pink-500/10 dark:text-pink-400/10 w-24 h-24 -rotate-12 pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="space-y-6 relative z-10"
              >
                {/* 5 Stars Rating */}
                <div className="flex items-center gap-1.5 text-amber-400">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} size={20} className="fill-amber-400" />
                  ))}
                  <span className="ml-2 text-xs font-bold text-slate-500 dark:text-slate-400">
                    5.0 / 5.0 Tuyệt vời
                  </span>
                </div>

                {/* Content Quote */}
                <p className="text-xs sm:text-base md:text-xl text-foreground leading-relaxed font-medium italic">
                  "{current.content}"
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-4 pt-4 border-t border-border/60">
                  <img
                    src={current.avatar}
                    alt={current.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-[#db2777] shadow-md shrink-0"
                  />
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-foreground">
                      {current.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
                      {current.role} • <span className="text-[#db2777] font-semibold">{current.location}</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slider Controls (Next / Prev Buttons & Pagination Dots) */}
            <div className="flex items-center justify-between pt-8 relative z-20">
              {/* Pagination Dots */}
              <div className="flex items-center gap-2">
                {TESTIMONIALS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                      currentIndex === idx
                        ? "w-8 bg-[#db2777]"
                        : "w-2.5 bg-slate-300 dark:bg-slate-700 hover:bg-pink-400"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Prev / Next Arrows */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-[#db2777] hover:text-white text-foreground flex items-center justify-center transition-colors shadow-xs cursor-pointer"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={handleNext}
                  className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-[#db2777] hover:text-white text-foreground flex items-center justify-center transition-colors shadow-xs cursor-pointer"
                  aria-label="Next testimonial"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
