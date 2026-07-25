"use client";

import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Sparkles } from "lucide-react";

export function ComparisonSection() {
  const COMPARISON_ROWS = [
    {
      criterion: "Chi phí thiết kế & in ấn",
      paper: "Tốn kém hàng triệu đồng",
      paperGood: false,
      online: "Tiết kiệm tới 80% chi phí",
      onlineGood: true,
    },
    {
      criterion: "Khả năng chỉnh sửa thông tin",
      paper: "Không thể sửa khi đã in xong",
      paperGood: false,
      online: "Cập nhật thông tin 24/7 bất cứ lúc nào",
      onlineGood: true,
    },
    {
      criterion: "Quản lý khách mời (RSVP)",
      paper: "Gọi điện/hỏi thủ công tốn thời gian",
      paperGood: false,
      online: "Khách tự xác nhận 1-click & tổng hợp tự động",
      onlineGood: true,
    },
    {
      criterion: "Bản đồ & Chỉ đường",
      paper: "Mô tả bằng lời/vẽ bản đồ nhỏ khó nhìn",
      paperGood: false,
      online: "Tích hợp Google Maps mở chỉ đường tức thì",
      onlineGood: true,
    },
    {
      criterion: "Phương thức chia sẻ thiệp",
      paper: "Phải gặp mặt trao tận tay",
      paperGood: false,
      online: "Gửi 1-click qua Zalo, Messenger, QR Code",
      onlineGood: true,
    },
    {
      criterion: "Thời gian hoàn thành thiệp",
      paper: "Mất 1 - 2 tuần in ấn & phát thiệp",
      paperGood: false,
      online: "Hoàn thành trong vài phút",
      onlineGood: true,
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-background relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-block text-xs uppercase tracking-widest font-bold text-[#db2777] bg-pink-100/80 dark:bg-pink-950/50 px-3.5 py-1.5 rounded-full border border-pink-200/60">
            So Sánh Vượt Trội
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-foreground tracking-tight">
            Thiệp Giấy Truyền Thống vs Thiệp Cưới Online Viora
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            Lý do hàng ngàn cặp đôi hiện đại lựa chọn trang thiệp số cho ngày cưới trọn vẹn.
          </p>
        </div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="bg-card rounded-3xl border border-border/80 shadow-2xl overflow-hidden"
        >
          {/* Table Header */}
          <div className="grid grid-cols-12 bg-slate-100/80 dark:bg-slate-800/80 p-5 font-bold text-xs sm:text-sm text-foreground border-b border-border">
            <div className="col-span-4 flex items-center font-bold text-sm sm:text-base">Tiêu chí so sánh</div>
            <div className="col-span-4 text-center text-slate-500 font-semibold">Thiệp giấy truyền thống</div>
            <div className="col-span-4 text-center text-[#db2777] font-black flex items-center justify-center gap-1.5 text-sm sm:text-base">
              <Sparkles size={16} /> Thiệp Online Viora
            </div>
          </div>

          {/* Table Body Rows */}
          <div className="divide-y divide-border/60">
            {COMPARISON_ROWS.map((row, idx) => (
              <div
                key={idx}
                className="grid grid-cols-12 p-4 sm:p-5 text-xs sm:text-sm items-center hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors"
              >
                {/* Criterion */}
                <div className="col-span-4 font-bold text-foreground">
                  {row.criterion}
                </div>

                {/* Paper Standard */}
                <div className="col-span-4 text-center text-slate-400 px-2 flex flex-col sm:flex-row items-center justify-center gap-2 font-normal">
                  <XCircle size={17} className="text-rose-400 shrink-0" />
                  <span className="line-through opacity-80">{row.paper}</span>
                </div>

                {/* Online Viora */}
                <div className="col-span-4 text-center text-foreground font-bold px-3 flex flex-col sm:flex-row items-center justify-center gap-2 bg-pink-50/60 dark:bg-pink-950/30 py-2.5 rounded-xl border border-pink-100/60 dark:border-pink-900/30">
                  <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                  <span className="text-emerald-700 dark:text-emerald-400">{row.online}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
