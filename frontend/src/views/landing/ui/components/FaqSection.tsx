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
    <section id="faq" className="py-16 sm:py-24 md:py-32 bg-slate-50/70 dark:bg-slate-900/40 relative border-b border-slate-200/60 dark:border-slate-800/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 space-y-3 sm:space-y-4">
          <span className="inline-block text-[11px] sm:text-xs uppercase tracking-widest font-extrabold text-[#db2777] bg-pink-50 dark:bg-pink-950/50 px-4 py-1.5 rounded-full border border-pink-200/80 dark:border-pink-800/50">
            Giải Đáp Thắc Mắc
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight font-sans">
            Câu Hỏi Thường Gặp
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-medium max-w-xl mx-auto">
            Mọi thông tin bạn cần biết trước khi bắt đầu sở hữu thiệp cưới số cùng Viora.
          </p>
        </div>

        {/* Accordions List */}
        <div className="space-y-3.5 sm:space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="bg-white dark:bg-slate-950 rounded-2xl border border-slate-200/90 dark:border-slate-800/90 overflow-hidden shadow-xs hover:border-[#db2777]/40 transition-all duration-200"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-6 text-left flex items-start justify-between gap-3 sm:gap-4 font-semibold text-sm sm:text-base text-slate-800 dark:text-slate-100 hover:text-[#db2777] dark:hover:text-[#ff007a] transition-colors cursor-pointer"
                >
                  <span className="flex items-start gap-3 sm:gap-3.5 pr-2">
                    <HelpCircle size={18} className="text-[#db2777] shrink-0 mt-0.5" />
                    <span className="leading-snug sm:leading-normal font-semibold font-sans text-slate-800 dark:text-slate-100">
                      {faq.q}
                    </span>
                  </span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 transition-transform duration-300 text-slate-400 mt-0.5 ${
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
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/80 font-normal font-sans">
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
