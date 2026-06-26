"use client";

import { Layout, Users, Image, Gift, Music, Share2, QrCode, Clock, Lock, Headphones } from "lucide-react";

export function FeaturesList() {
  const FEATURES = [
    {
      icon: Layout,
      title: "Thiệp cưới online",
      desc: "Thiết kế đẹp, hiện đại và dễ dàng tùy chỉnh.",
    },
    {
      icon: Users,
      title: "Quản lý khách mời (RSVP)",
      desc: "Theo dõi xác nhận tham dự một cách dễ dàng.",
    },
    {
      icon: Image,
      title: "Album ảnh cưới",
      desc: "Lưu giữ những khoảnh khắc đáng nhớ của bạn.",
    },
    {
      icon: Gift,
      title: "Lời chúc & Hộp quà",
      desc: "Nhận lời chúc và quà từ bạn bè, người thân.",
    },
    {
      icon: Music,
      title: "Nhạc nền & Video",
      desc: "Thêm nhạc Youtube và video kỷ niệm.",
    },
    {
      icon: Share2,
      title: "Chia sẻ đa kênh",
      desc: "Chia sẻ nhanh chóng qua nhiều nền tảng.",
    },
    {
      icon: QrCode,
      title: "Mã QR cá nhân hóa",
      desc: "Tạo QR code riêng cho thiệp cưới của bạn.",
    },
    {
      icon: Clock,
      title: "Đếm ngược ngày cưới",
      desc: "Hiển thị thời gian đến ngày trọng đại.",
    },
    {
      icon: Lock,
      title: "Bảo mật tuyệt đối",
      desc: "Thông tin của bạn được bảo vệ an toàn.",
    },
    {
      icon: Headphones,
      title: "Hỗ trợ 24/7",
      desc: "Đội ngũ hỗ trợ luôn sẵn lòng giúp bạn.",
    },
  ];

  return (
    <section id="tinh-nang" className="py-24 bg-[#fffdfb] border-b border-[#e2d8cf]/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Tiêu đề chính */}
        <div className="text-center space-y-3 mb-16">
          <p className="text-xs text-[#db2777] uppercase tracking-widest font-bold">
            TÍNH NĂNG NỔI BẬT
          </p>
          <h2 
            className="text-4xl text-[#2c1810] font-bold"
            style={{ fontFamily: "'EB Garamond', serif" }}
          >
            Tất cả những gì bạn cần
          </h2>
        </div>

        {/* Grid 10 tính năng (2 hàng x 5 cột trên màn hình lớn) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {FEATURES.map((f, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center p-4 rounded-2xl bg-white border border-[#e2d8cf]/20 hover:border-[#db2777]/30 hover:shadow-md hover:-translate-y-1 transition-all group"
            >
              {/* Icon tròn nền hồng nhạt */}
              <div className="w-12 h-12 rounded-full bg-pink-50 flex items-center justify-center flex-shrink-0 mb-4 transition-colors group-hover:bg-[#db2777]/10">
                <f.icon
                  size={18}
                  className="text-[#db2777]"
                />
              </div>
              
              {/* Text */}
              <div className="space-y-1">
                <h3
                  className="text-xs font-bold text-[#2c1810]"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {f.title}
                </h3>
                <p className="text-[10px] text-[#7a5c4f]/70 font-light leading-relaxed">
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
