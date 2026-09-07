"use client";

import { Check, X, Sparkles, Zap, ShieldCheck, ArrowRight } from "lucide-react";

export function PackageComparisonSection() {
  const packages = [
    {
      id: "basic",
      name: "Gói Cơ Bản",
      price: "99.000đ",
      originalPrice: "150.000đ",
      badge: "CƠ BẢN",
      badgeClass: "bg-white/10 text-stone-300 border-white/15",
      description:
        "Thích hợp cho dâu rể yêu thích phong cách tối giản, tinh tế với chi phí tối ưu nhất.",
      isPopular: false,
      features: [
        { title: "Phong cách thiết kế đơn giản, thanh lịch", included: true },
        { title: "Đầy đủ thông tin Lễ cưới & Hai bên gia đình", included: true },
        { title: "Bản đồ chỉ đường Google Maps tiện lợi", included: true },
        { title: "RSVP Xác nhận tham dự qua Form trực tuyến", included: true },
        { title: "Sổ gửi Lời chúc mừng trực tuyến", included: true },
        { title: "Nhạc nền thiệp cưới cơ bản", included: true },
        { title: "Album ảnh cưới (Tối đa 6 ảnh)", included: true },
        { title: "Mã QR Mừng cưới (Tài khoản ngân hàng / Momo)", included: false },
        { title: "Đếm ngược thời gian cưới (Countdown)", included: false },
        { title: "Link mời riêng đích danh từng khách", included: false },
      ],
    },
    {
      id: "standard",
      name: "Gói Tiêu Chuẩn",
      price: "149.000đ",
      originalPrice: "250.000đ",
      badge: "✨ BÁN CHẠY NHẤT",
      badgeClass:
        "bg-[#e0b769]/15 text-[#e0b769] border-[#e0b769]/40 font-semibold",
      description:
        "Lựa chọn được yêu thích nhất với đầy đủ Nhạc nền tự chọn, QR Mừng cưới & Link đích danh từng khách.",
      isPopular: true,
      features: [
        { title: "Phong cách Truyền thống Song Hỷ & Hoa lá cao cấp", included: true },
        { title: "Đầy đủ thông tin Lễ cưới & Hai bên gia đình", included: true },
        { title: "Bản đồ chỉ đường Google Maps 1-click", included: true },
        { title: "RSVP Xác nhận tham dự qua Form tự động", included: true },
        { title: "Sổ gửi Lời chúc mừng trực tuyến", included: true },
        { title: "Nhạc nền tự chọn theo yêu cầu của CD-CR", included: true },
        { title: "Album ảnh cưới mở rộng (Tối đa 15 ảnh)", included: true },
        { title: "Mã QR Mừng cưới (Ngân hàng / Momo)", included: true },
        { title: "Đếm ngược thời gian cưới (Countdown sống động)", included: true },
        { title: "Chỉnh sửa thông tin thiệp trọn đời", included: true },
        { title: "Link mời riêng cho từng khách mời", included: true },
        { title: "Hiển thị tên khách mời trang trọng ngay trên thiệp", included: true },
      ],
    },
  ];

  const handleSelectPackage = () => {
    const el = document.getElementById("mau-thiep");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="mt-20 pt-16 border-t border-white/10 text-white select-none relative">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#d4af37]/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Header section */}
      <div className="text-center max-w-3xl mx-auto space-y-3.5 mb-14 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#e0b769] text-[11px] uppercase tracking-[0.25em] font-medium font-sans">
          <Sparkles size={13} className="text-[#e0b769]" />
          <span>Bảng Giá & So Sánh Quyền Lợi</span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-normal tracking-wide text-white leading-tight">
          So Sánh Quyền Lợi Các{" "}
          <span className="italic font-light text-[#e0b769]">
            Gói Thiệp Cưới
          </span>
        </h2>

        <p className="text-xs sm:text-sm text-stone-300/90 max-w-xl mx-auto leading-relaxed font-light font-sans">
          Minh bạch 100% tính năng giữa các gói Cơ bản và Tiêu chuẩn để dâu rể dễ dàng lựa chọn mẫu thiệp ưng ý nhất cho ngày trọng đại.
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="flex flex-col md:flex-row justify-center items-stretch gap-6 lg:gap-8 max-w-4xl mx-auto relative z-10">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className={`w-full md:w-1/2 max-w-md relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
              pkg.isPopular
                ? "bg-gradient-to-b from-stone-900 via-stone-900/95 to-stone-950 border-2 border-[#e0b769]/50 shadow-2xl shadow-amber-950/30 scale-[1.02]"
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
                  <span className="text-[11px] font-semibold text-[#e0b769] flex items-center gap-1">
                    <Zap size={13} className="fill-[#e0b769]" /> Khuyên dùng
                  </span>
                )}
              </div>

              <h3 className="text-xl sm:text-2xl font-serif font-normal text-white mb-1.5">
                {pkg.name}
              </h3>
              <p className="text-xs text-stone-400 font-light leading-relaxed mb-5 min-h-[36px]">
                {pkg.description}
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-2 mb-6 pb-6 border-b border-white/10">
                <span className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#e0b769] font-sans">
                  {pkg.price}
                </span>
                <span className="text-xs text-stone-500 line-through font-light">
                  {pkg.originalPrice}
                </span>
                <span className="text-[11px] text-stone-400 ml-auto font-light">
                  / Trọn gói thiệp
                </span>
              </div>

              {/* Feature List */}
              <div className="space-y-3 mb-8">
                <p className="text-[11px] font-medium text-stone-400 uppercase tracking-wider mb-2 font-sans">
                  Tính năng bao gồm:
                </p>
                {pkg.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 text-xs text-left"
                  >
                    {feat.included ? (
                      <div className="w-4 h-4 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-500/30">
                        <Check size={11} />
                      </div>
                    ) : (
                      <div className="w-4 h-4 rounded-full bg-white/5 text-stone-500 flex items-center justify-center shrink-0 mt-0.5 border border-white/10">
                        <X size={11} />
                      </div>
                    )}
                    <span
                      className={
                        feat.included
                          ? "text-stone-200 font-normal"
                          : "text-stone-500 line-through opacity-50 font-light"
                      }
                    >
                      {feat.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action CTA Button & Bottom Guarantee */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleSelectPackage}
                className={`w-full py-3 rounded-2xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  pkg.isPopular
                    ? "bg-gradient-to-r from-[#d4af37] to-[#e0b769] text-stone-950 hover:brightness-110 shadow-lg shadow-amber-900/30"
                    : "bg-white/10 text-white hover:bg-white/15 border border-white/15"
                }`}
              >
                <span>{pkg.isPopular ? "Chọn Gói Tiêu Chuẩn" : "Xem Mẫu Cơ Bản"}</span>
                <ArrowRight size={14} />
              </button>

              <div className="pt-2 flex items-center justify-center gap-1.5 text-[11px] text-stone-400 font-light">
                <ShieldCheck size={14} className="text-[#e0b769]" />
                <span>Hỗ trợ tùy chỉnh thông tin trọn đời</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

