"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

export function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const FAQS = [
    {
      q: "Tôi có cần biết thiết kế hay lập trình để dùng dịch vụ không?",
      a: "Hoàn toàn không! Đội ngũ Viora sẽ hỗ trợ tiếp nhận thông tin và tư vấn giao diện hoàn chỉnh. Bạn chỉ cần gửi thông tin ngày cưới, hình ảnh và chọn mẫu thiết kế ưng ý nhất.",
    },
    {
      q: "Sau khi xuất bản thiệp, tôi có thể chỉnh sửa lại thông tin được không?",
      a: "Có! Bạn có thể liên hệ hệ thống để cập nhật lại thông tin ngày giờ, địa điểm, thêm ảnh hoặc đổi nhạc nền bất cứ lúc nào. Thông tin trên đường link thiệp sẽ tự động được cập nhật ngay lập tức.",
    },
    {
      q: "Thiệp cưới online có hiển thị đẹp trên điện thoại không?",
      a: "100% Giao diện của Viora được thiết kế chuẩn Mobile-First, giúp thiệp load cực nhanh, hiển thị tràn màn hình rực rỡ trên tất cả các dòng smartphone (iPhone, Samsung, Xiaomi...) cũng như tablet và PC.",
    },
    {
      q: "Viora có tư vấn gói dịch vụ miễn phí không?",
      a: "Có! Bạn hoàn toàn có thể đăng ký nhận tư vấn và xem trải nghiệm mẫu miễn phí. Nếu muốn mở khóa toàn bộ mẫu VIP, album ảnh HD không giới hạn và tắt watermark, bạn có thể nâng cấp gói Premium với mức giá rất tiết kiệm.",
    },
    {
      q: "Tính năng RSVP (Xác nhận tham dự) hoạt động như thế nào?",
      a: "Khi khách mở thiệp, họ có thể nhấn vào biểu mẫu RSVP để chọn: Có tham dự hay không, đi cùng bao nhiêu người và gửi kèm lời chúc. Tất cả thông tin này sẽ được tự động tổng hợp gửi tới bạn giúp theo dõi số lượng chính xác.",
    },
  ];

  return (
    <section id="faq" className="py-20 md:py-32 bg-slate-50/70 dark:bg-slate-900/40 relative border-b border-border/40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-block text-xs uppercase tracking-widest font-bold text-[#db2777] bg-pink-100/80 dark:bg-pink-950/50 px-3.5 py-1.5 rounded-full border border-pink-200/60">
            Giải Đáp Thắc Mắc
          </span>
          <h2 className="text-lg sm:text-2xl md:text-4xl font-black text-foreground tracking-tight">
            Câu Hỏi Thường Gặp
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            Mọi thông tin bạn cần biết trước khi bắt đầu sở hữu thiệp cưới số cùng Viora.
          </p>
        </div>

        {/* Accordions List */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="bg-card rounded-2xl border border-border/80 overflow-hidden shadow-xs hover:border-[#db2777]/50 transition-colors"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-6 sm:p-7 text-left flex items-center justify-between gap-4 font-bold text-base text-foreground hover:text-[#db2777] transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-3.5">
                    <HelpCircle size={20} className="text-[#db2777] shrink-0" />
                    <span className="leading-snug">{faq.q}</span>
                  </span>
                  <ChevronDown
                    size={20}
                    className={`shrink-0 transition-transform duration-300 text-slate-400 ${
                      isOpen ? "rotate-180 text-[#db2777]" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-7 pb-6 pt-0 text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-border/40 my-1 pt-4 font-normal">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
