"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Send, CheckCircle2 } from "lucide-react";

export function FinalCtaSection() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", note: "" });

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.phone) {
      setSubmitted(true);
    }
  };

  return (
    <section id="dang-ky-tu-van" className="py-20 md:py-32 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-[36px] overflow-hidden bg-gradient-to-r from-[#db2777] via-rose-600 to-amber-600 p-8 sm:p-14 md:p-18 text-white shadow-2xl"
        >
          {/* Background Decorative Ambient Glows */}
          <div className="absolute -top-28 -left-28 w-80 h-80 bg-white/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-28 -right-28 w-80 h-80 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
            
            {/* Left Column Text */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-pink-50">
                <Sparkles size={16} /> Tư Vấn Chuyên Nghiệp Trọn Gói
              </div>

              <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-[1.2]">
                Sẵn Sàng Trải Nghiệm Dịch Vụ Thiệp Cưới Online Viora?
              </h2>

              <p className="text-xs sm:text-sm md:text-base text-pink-100 opacity-95 leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
                Để lại thông tin, đội ngũ tư vấn của Viora sẽ liên hệ gửi báo giá & tư vấn mẫu thiệp phù hợp nhất cho hai bạn trong vòng 15 phút.
              </p>

              <div className="pt-2 flex items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={() => scrollToSection("mau-thiep")}
                  className="px-7 py-3.5 rounded-2xl bg-black/20 hover:bg-black/30 backdrop-blur-md border border-white/30 text-white font-bold text-sm transition-all duration-300 inline-flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <span>Khám phá bộ sưu tập mẫu thiệp</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Right Column Form Card */}
            <div className="lg:col-span-5">
              <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-7 sm:p-9 rounded-3xl text-foreground shadow-2xl border border-white/50 dark:border-slate-800">
                {submitted ? (
                  <div className="text-center py-10 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                      <CheckCircle2 size={36} />
                    </div>
                    <h3 className="text-2xl font-black text-foreground">
                      Gửi Thông Tin Thành Công!
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                      Cảm ơn bạn. Đội ngũ Viora sẽ liên hệ lại qua số điện thoại <strong className="text-foreground">{formData.phone}</strong> sớm nhất.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 text-left">
                    <h3 className="text-xl font-bold text-foreground mb-1">
                      Đăng Ký Tư Vấn Dịch Vụ
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">
                      Điền thông tin để nhận báo giá & danh mục mẫu xem thử.
                    </p>

                    <div>
                      <label className="block text-xs font-bold text-foreground mb-1.5">
                        Họ và tên của bạn
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ví dụ: Nguyễn Văn A"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-[#db2777] transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-foreground mb-1.5">
                        Số điện thoại / Zalo
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="Ví dụ: 0988 123 456"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-[#db2777] transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-foreground mb-1.5">
                        Ghi chú yêu cầu riêng (nếu có)
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Ví dụ: Cần tư vấn mẫu thiệp phong cách Hàn Quốc..."
                        value={formData.note}
                        onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-[#db2777] transition-all"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#db2777] to-rose-600 hover:from-[#be185d] hover:to-rose-700 text-white font-bold text-sm sm:text-base shadow-xl shadow-pink-500/25 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer mt-3"
                    >
                      <Send size={18} />
                      <span>Gửi Đăng Ký Tư Vấn</span>
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}
