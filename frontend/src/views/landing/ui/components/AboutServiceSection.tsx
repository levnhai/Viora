"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export function AboutServiceSection() {
  const STATS = [
    { value: "300+", label: "Mẫu thiệp đa phong cách", sub: "Cập nhật liên tục theo xu hướng mới" },
    { value: "10.000+", label: "Cặp đôi đã đồng hành", sub: "Tổ chức ngày vui trọn vẹn" },
    { value: "99%", label: "Khách hàng hài lòng", sub: "Đánh giá 5 sao về chất lượng dịch vụ" },
  ];

  return (
    <section className="py-20 md:py-32 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Showcase Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-3xl overflow-hidden border border-pink-200/60 dark:border-slate-800 shadow-2xl bg-gradient-to-tr from-pink-50 via-rose-50/40 to-amber-50/30 dark:from-slate-900 dark:via-slate-850 dark:to-slate-800 p-7 sm:p-9 space-y-6">
              
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#db2777] to-rose-500 text-white flex items-center justify-center shadow-lg shadow-pink-500/25">
                <Heart size={26} className="fill-white" />
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-black text-foreground leading-snug tracking-tight">
                Không gian thiệp số tuyệt đẹp cho ngày hạnh phúc
              </h3>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                Viora biến mỗi thông điệp thiệp mời thông thường thành một trải nghiệ m tương tác trực tuyến nghệ thuật lãng mạn, lưu giữ trọn vẹn khoảnh khắc thiêng liêng.
              </p>

              <div className="space-y-3.5 pt-2">
                {[
                  "Giao diện thiết kế độc quyền, tối ưu hoàn hảo mọi màn hình",
                  "Tùy chỉnh linh hoạt màu sắc, nhạc nền, font chữ & hình ảnh",
                  "Bảo mật thông tin khách mời & vận hành ổn định 24/7"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-xs sm:text-sm text-foreground font-semibold">
                    <div className="w-6 h-6 rounded-full bg-pink-100 dark:bg-pink-950/60 text-[#db2777] flex items-center justify-center shrink-0 font-extrabold">
                      ✓
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

            </div>
          </motion.div>

          {/* Right Column: Text & 3 Big Stat Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="space-y-4">
              <span className="inline-block text-xs uppercase tracking-widest font-bold text-[#db2777] bg-pink-100/80 dark:bg-pink-950/50 px-3.5 py-1.5 rounded-full border border-pink-200/60">
                Về Dịch Vụ Viora
              </span>

              <h2 className="text-lg sm:text-2xl md:text-4xl font-black text-foreground tracking-tight">
                Nền Tảng Thiệp Cưới Online Thông Minh & Đẳng Cấp
              </h2>

              <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                Chúng tôi mang đến giải pháp dịch vụ thiệp cưới trực tuyến chuyên nghiệp trọn gói, giúp các cặp đôi sở hữu trang thiệp đẹp lộng lẫy và độc đáo theo đúng phong cách riêng mà <strong className="text-foreground font-bold">không gặp bất kỳ trở ngại nào</strong>.
              </p>
            </div>

            {/* Stat Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
              {STATS.map((stat, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-card border border-border/80 text-center space-y-2 hover:border-[#db2777]/50 transition-all duration-300 shadow-xs hover:shadow-md"
                >
                  <p className="text-3xl sm:text-4xl font-black text-[#db2777] tracking-tight">
                    {stat.value}
                  </p>
                  <p className="text-xs sm:text-sm font-bold text-foreground">
                    {stat.label}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {stat.sub}
                  </p>
                </div>
              ))}
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
