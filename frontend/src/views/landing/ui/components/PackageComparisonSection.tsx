"use client";

import { Check, X, Sparkles, Zap, ShieldCheck } from "lucide-react";

export function PackageComparisonSection() {
  const packages = [
    {
      id: "basic",
      name: "Gói Cơ Bản",
      price: "99.000đ",
      originalPrice: "150.000đ",
      badge: "CƠ BẢN",
      badgeClass: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      description:
        "Thích hợp cho dâu rể thích phong cách tối giản, tinh tế với chi phí tối ưu.",
      isPopular: false,
      features: [
        { title: "Phong cách thiết kế đơn giản", included: true },
        { title: "Đầy đủ thông tin Lễ cưới & Gia đình", included: true },
        { title: "Bản đồ chỉ đường Google Maps", included: true },
        { title: "RSVP Xác nhận tham dự qua Form", included: true },
        { title: "Sổ gửi Lời chúc mừng trực tuyến", included: true },
        { title: "Nhạc nền thiệp cưới cơ bản", included: true },
        { title: "Album ảnh cưới (Tối đa 6 ảnh)", included: true },
        { title: "Mã QR Mừng cưới (Mừng tuổi online)", included: false },
        { title: "Đếm ngược thời gian cưới (Countdown)", included: false },
        { title: "Hiệu ứng hoa rơi / GSAP 3D Độc quyền", included: false },
      ],
    },
    {
      id: "standard",
      name: "Gói Tiêu Chuẩn",
      price: "149.000đ",
      originalPrice: "250.000đ",
      badge: "🔥 BÁN CHẠY NHẤT",
      badgeClass:
        "bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black",
      description:
        "Lựa chọn phổ biến nhất với đầy đủ Nhạc nền tự chọn, QR Mừng cưới & Album ảnh.",
      isPopular: true,
      features: [
        { title: "Phong cách Truyền thống Song Hỷ & Hoa lá", included: true },
        { title: "Đầy đủ thông tin Lễ cưới & Gia đình", included: true },
        { title: "Bản đồ chỉ đường Google Maps 1-click", included: true },
        { title: "RSVP Xác nhận tham dự qua Form", included: true },
        { title: "Sổ gửi Lời chúc mừng trực tuyến", included: true },
        { title: "Nhạc nền tự chọn theo yêu cầu", included: true },
        { title: "Album ảnh cưới mở rộng (Tối đa 15 ảnh)", included: true },
        { title: "Mã QR Mừng cưới (Ngân hàng / Momo)", included: true },
        { title: "Đếm ngược thời gian cưới (Countdown)", included: true },
        { title: "Chỉnh sửa thông tin trọn đời", included: true },
        { title: "Link mời riêng cho từng khách", included: true },
        { title: "Hiển thị tên khách ngay trên thiệp", included: true },
        // { title: "Hiệu ứng hoa rơi / GSAP 3D Độc quyền", included: false },
      ],
    },
    // {
    //   id: "pro",
    //   name: "Gói Cao Cấp VIP",
    //   price: "199.000đ",
    //   originalPrice: "350.000đ",
    //   badge: "👑 PRO VIP",
    //   badgeClass:
    //     "bg-gradient-to-r from-amber-500 via-pink-600 to-purple-600 text-white font-black",
    //   description:
    //     "Trải nghiệm đẳng cấp cao nhất với hiệu ứng 3D độc quyền, album không giới hạn.",
    //   isPopular: false,
    //   features: [
    //     { title: "Phong cách Độc quyền 3D GSAP Animation", included: true },
    //     { title: "Đầy đủ thông tin Lễ cưới & Gia đình", included: true },
    //     { title: "Bản đồ chỉ đường Google Maps 1-click", included: true },
    //     { title: "RSVP Xác nhận tham dự + Tự động báo tin", included: true },
    //     {
    //       title: "Sổ gửi Lời chúc mừng với bong bóng hiệu ứng",
    //       included: true,
    //     },
    //     { title: "Nhạc nền tự chọn cao cấp theo yêu cầu", included: true },
    //     { title: "Album ảnh cưới KHÔNG GIỚI HẠN (Grid/3D)", included: true },
    //     { title: "Mã QR Mừng cưới + Pháo hoa Confetti", included: true },
    //     { title: "Đếm ngược thời gian thực sống động", included: true },
    //     { title: "Hiệu ứng hoa rơi / tuyết rơi / tim bay 3D", included: true },
    //   ],
    // },
  ];

  return (
    <section className="mt-20 pt-12 border-t border-white/10 text-white select-none">
      {/* Header section */}
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-pink-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles size={14} />
          <span>Bảng Giá & So Sánh Tính Năng</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
          So sánh quyền lợi các{" "}
          <span className="text-[#ff007a] italic font-serif">
            Gói Thiệp Cưới
          </span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
          Minh bạch 100% tính năng giữa các gói Cơ bản, Tiêu chuẩn và Cao cấp để
          bạn dễ dàng lựa chọn mẫu thiệp ưng ý nhất.
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="flex flex-col md:flex-row justify-center items-stretch gap-6 lg:gap-8 max-w-4xl mx-auto">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className={`w-full md:w-1/2 max-w-md relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 ${
              pkg.isPopular
                ? "bg-gradient-to-b from-stone-900 via-stone-900/90 to-stone-950 border-2 border-[#ff007a] shadow-2xl shadow-pink-600/20 scale-[1.02]"
                : "bg-white/5 border border-white/10 hover:border-white/20"
            }`}
          >
            {/* Header / Badge */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span
                  className={`px-3 py-1 rounded-full text-[10px] tracking-wider uppercase border ${pkg.badgeClass}`}
                >
                  {pkg.badge}
                </span>
                {pkg.isPopular && (
                  <span className="text-[11px] font-bold text-pink-400 flex items-center gap-1">
                    <Zap size={13} /> Khuyên dùng
                  </span>
                )}
              </div>

              <h3 className="text-xl font-bold text-white mb-1">{pkg.name}</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4 min-h-[36px]">
                {pkg.description}
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-2 mb-6 pb-6 border-b border-white/10">
                <span className="text-3xl sm:text-4xl font-black font-mono text-[#ff007a]">
                  {pkg.price}
                </span>
                <span className="text-xs text-slate-500 line-through font-mono">
                  {pkg.originalPrice}
                </span>
              </div>

              {/* Feature List */}
              <div className="space-y-3 mb-6">
                <p className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Tính năng bao gồm:
                </p>
                {pkg.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 text-xs text-left"
                  >
                    {feat.included ? (
                      <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-500/30">
                        <Check size={11} />
                      </div>
                    ) : (
                      <div className="w-4 h-4 rounded-full bg-rose-500/10 text-rose-400/60 flex items-center justify-center shrink-0 mt-0.5 border border-rose-500/20">
                        <X size={11} />
                      </div>
                    )}
                    <span
                      className={
                        feat.included
                          ? "text-slate-200 font-medium"
                          : "text-slate-500 line-through opacity-60"
                      }
                    >
                      {feat.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Note */}
            <div className="pt-4 border-t border-white/5 flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-medium">
              <ShieldCheck size={14} className="text-emerald-400" />
              <span>Hỗ trợ tùy chỉnh thông tin trọn đời</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
