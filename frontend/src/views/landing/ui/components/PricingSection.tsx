"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight, PhoneCall } from "lucide-react";

export function PricingSection() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const PLANS = [
    {
      name: "Gói Cơ Bản",
      price: "0đ",
      note: "Trải nghiệm tính năng tiêu chuẩn",
      badge: "Cơ bản",
      highlight: false,
      cta: "Đăng ký tư vấn gói Free",
      features: [
        "Mẫu thiệp cơ bản tiêu chuẩn",
        "Chia sẻ đường link trực tuyến",
        "Tùy chỉnh thông tin cô dâu chú rể",
        "Tích hợp đếm ngược ngày cưới",
        "Có Watermark thương hiệu Viora",
      ],
    },
    {
      name: "Gói Premium",
      price: "199.000đ",
      note: "Trọn đời, không phát sinh chi phí",
      badge: "🔥 Được chọn nhiều nhất",
      highlight: true,
      cta: "Đăng ký gói Premium",
      features: [
        "Mở khóa toàn bộ 300+ mẫu thiệp VIP",
        "RSVP xác nhận tham dự & Quản lý danh sách",
        "Album ảnh cưới HD (Không giới hạn ảnh)",
        "Nhạc nền tự động phát tùy chỉnh",
        "Bản đồ Google Maps & QR mừng cưới",
        "KHÔNG hiển thị Watermark thương hiệu",
      ],
    },
    {
      name: "Gói Business / Custom",
      price: "499.000đ",
      note: "Dành cho trải nghiệm độc bản cao cấp",
      badge: "Độc quyền",
      highlight: false,
      cta: "Liên hệ tư vấn gói VIP",
      features: [
        "Toàn bộ tính năng gói Premium",
        "Thiết kế phong cách độc bản theo yêu cầu",
        "Tùy chỉnh tên miền riêng (Domain riêng)",
        "Chăm sóc & Hỗ trợ kỹ thuật 1-1 ưu tiên",
        "Xuất file in thiệp giấy chất lượng cao",
      ],
    },
  ];

  return (
    <section id="bang-gia" className="py-20 md:py-32 bg-slate-50/70 dark:bg-slate-900/40 relative border-b border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-block text-xs uppercase tracking-widest font-bold text-[#db2777] bg-pink-100/80 dark:bg-pink-950/50 px-3.5 py-1.5 rounded-full border border-pink-200/60">
            Bảng Giá Minh Bạch
          </span>
          <h2 className="text-xl sm:text-3xl md:text-4xl font-black text-foreground tracking-tight">
            Một Lần Thanh Toán, Dùng Mãi Mãi
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            Chi phí minh bạch, không phí ẩn. Miễn phí lưu trữ trọn đời thiệp cưới của bạn.
          </p>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 items-stretch">
          {PLANS.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`rounded-3xl p-7 sm:p-9 flex flex-col justify-between relative transition-all duration-300 ${
                plan.highlight
                  ? "bg-gradient-to-b from-[#db2777] to-rose-600 text-white shadow-2xl shadow-pink-500/35 md:-translate-y-3 border-2 border-pink-400/80"
                  : "bg-card text-card-foreground border border-border/80 shadow-xs hover:shadow-xl hover:-translate-y-1.5"
              }`}
            >
              {/* Badge */}
              <div className="mb-5">
                <span
                  className={`text-[11px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full ${
                    plan.highlight
                      ? "bg-white/20 text-white backdrop-blur-md"
                      : "bg-pink-100 dark:bg-pink-950/50 text-[#db2777]"
                  }`}
                >
                  {plan.badge}
                </span>
              </div>

              {/* Title & Price */}
              <div className="space-y-2 mb-7">
                <h3 className="text-xl sm:text-2xl font-bold">
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
                    {plan.price}
                  </span>
                </div>
                <p className={`text-xs sm:text-sm font-semibold ${plan.highlight ? "text-pink-100 opacity-95" : "text-slate-500 dark:text-slate-400"}`}>
                  {plan.note}
                </p>
              </div>

              {/* Features List */}
              <ul className="space-y-4 mb-9 flex-1 border-t border-b py-7 my-2 border-current/15">
                {plan.features.map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-3.5 text-xs sm:text-sm">
                    <Check
                      size={18}
                      className={`shrink-0 mt-0.5 ${plan.highlight ? "text-white" : "text-[#db2777]"}`}
                    />
                    <span className={plan.highlight ? "text-pink-50" : "text-slate-600 dark:text-slate-300"}>
                      {feat}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                onClick={() => scrollToSection("dang-ky-tu-van")}
                className={`w-full py-4 rounded-2xl font-bold text-sm sm:text-base transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                  plan.highlight
                    ? "bg-white text-[#db2777] hover:bg-slate-100 shadow-xl"
                    : "bg-[#db2777] text-white hover:bg-[#be185d] shadow-md"
                }`}
              >
                <PhoneCall size={16} />
                <span>{plan.cta}</span>
                <ArrowRight size={16} />
              </button>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
