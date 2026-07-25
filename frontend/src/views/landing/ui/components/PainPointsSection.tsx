"use client";

import { motion } from "framer-motion";
import { Clock, Users, DollarSign, Share2, Sparkles, CheckCircle2 } from "lucide-react";

export function PainPointsSection() {
  const PAIN_POINTS = [
    {
      icon: Clock,
      title: "Mất nhiều thời gian gửi thiệp giấy?",
      description: "Đi lại trao thiệp tận tay tốn cả tuần liền, vất vả mà vẫn dễ sót người thân ở xa.",
      color: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-100/70 dark:bg-amber-950/40",
    },
    {
      icon: Users,
      title: "Khó quản lý chính xác số lượng khách?",
      description: "Không biết chắc ai sẽ đi hay vắng mặt, dễ bị lãng phí tiệc hoặc thiếu chỗ ngồi.",
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100/70 dark:bg-blue-950/40",
    },
    {
      icon: DollarSign,
      title: "Chi phí thiết kế & in ấn quá cao?",
      description: "Thiệp in cao cấp rất đắt đỏ nhưng khách nhận xong thường không lưu lại lâu dài.",
      color: "text-rose-600 dark:text-rose-400",
      bgColor: "bg-rose-100/70 dark:bg-rose-950/40",
    },
    {
      icon: Share2,
      title: "Muốn chia sẻ nhanh qua Zalo, Messenger?",
      description: "Gửi ảnh chụp thiệp đơn điệu thiếu tính tương tác, không có bản đồ hay nhạc nền.",
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-100/70 dark:bg-purple-950/40",
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-slate-50/70 dark:bg-slate-900/40 relative border-y border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-block text-xs uppercase tracking-widest font-bold text-[#db2777] bg-pink-100/80 dark:bg-pink-950/50 px-3.5 py-1.5 rounded-full border border-pink-200/60">
            Thấu Hiểu Nỗi Lo Của Cặp Đôi
          </span>
          <h2 className="text-lg sm:text-2xl md:text-4xl font-black text-foreground tracking-tight">
            Bạn Có Đang Gặp Những Bất Tiện Này?
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            Chuẩn bị ngày cưới có hàng trăm việc phải lo, đừng để việc gửi thiệp mời khiến bạn thêm áp lực!
          </p>
        </div>

        {/* 4 Pain Points Grid (2 cột compact trên mobile) */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-8">
          {PAIN_POINTS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="bg-card p-4 sm:p-7 rounded-2xl sm:rounded-3xl border border-border/80 shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className={`w-10 h-10 sm:w-13 sm:h-13 rounded-xl sm:rounded-2xl ${item.bgColor} ${item.color} flex items-center justify-center mb-3 sm:mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <h3 className="text-xs sm:text-base font-bold text-foreground mb-1.5 sm:mb-3 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-[11px] sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Solution Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-14 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#db2777] via-rose-600 to-amber-600 text-white shadow-2xl text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden"
        >
          {/* Decorative ambient background glow */}
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/10 rounded-full blur-2xl pointer-events-none" />

          <div className="space-y-3 max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold text-pink-50">
              <Sparkles size={14} /> Giải Pháp Đột Phá Từ Viora
            </div>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
              Chúng tôi giải quyết tất cả chỉ trong vài phút!
            </h3>
            <p className="text-sm sm:text-base text-pink-100 leading-relaxed opacity-95">
              Sở hữu ngay website thiệp cưới độc đáo, tích hợp đầy đủ tính năng tương tác hiện đại và vận hành hoàn toàn tự động.
            </p>
          </div>

          <div className="flex items-center gap-2.5 bg-white text-[#db2777] font-bold px-7 py-4 rounded-2xl shadow-xl whitespace-nowrap text-sm sm:text-base relative z-10 shrink-0">
            <CheckCircle2 size={20} className="text-emerald-500 shrink-0" />
            <span>Tiết kiệm 80% thời gian & chi phí</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
