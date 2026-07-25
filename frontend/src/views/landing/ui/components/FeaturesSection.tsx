"use client";

import { motion } from "framer-motion";
import { 
  Sparkles, 
  Sliders, 
  CheckSquare, 
  MapPin, 
  Timer, 
  Image as ImageIcon, 
  Video, 
  QrCode, 
  Share2, 
  Smartphone 
} from "lucide-react";

export function FeaturesSection() {
  const FEATURES = [
    {
      icon: Sparkles,
      title: "Thiệp cưới online đẹp",
      description: "Hàng trăm mẫu thiết kế sang trọng, hiệu ứng hoa rơi & nhạc nền sống động.",
      color: "text-pink-600 dark:text-pink-400",
      bgColor: "bg-pink-100/70 dark:bg-pink-950/40",
    },
    {
      icon: Sliders,
      title: "Cá nhân hóa nội dung",
      description: "Tùy chỉnh thông tin hai họ, ngày giờ, câu chuyện tình yêu và thông điệp riêng.",
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-100/70 dark:bg-purple-950/40",
    },
    {
      icon: CheckSquare,
      title: "RSVP xác nhận tham dự",
      description: "Thu thập phản hồi đi hay vắng, số khách tham dự và lời chúc từ khách mời realtime.",
      color: "text-emerald-600 dark:text-emerald-400",
      bgColor: "bg-emerald-100/70 dark:bg-emerald-950/40",
    },
    {
      icon: MapPin,
      title: "Google Maps chỉ đường",
      description: "Tích hợp bản đồ vị trí nhà hàng/tư gia, khách mở chỉ đường Google Maps 1-click.",
      color: "text-rose-600 dark:text-rose-400",
      bgColor: "bg-rose-100/70 dark:bg-rose-950/40",
    },
    {
      icon: Timer,
      title: "Countdown đếm ngược",
      description: "Đồng hồ đếm ngược từng ngày, giờ, phút đến thời điểm hôn lễ chính thức.",
      color: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-100/70 dark:bg-amber-950/40",
    },
    {
      icon: ImageIcon,
      title: "Album ảnh cưới HD",
      description: "Trình chiếu bộ sưu tập ảnh cưới sắc nét với hiệu ứng vuốt phóng to mượt mà.",
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100/70 dark:bg-blue-950/40",
    },
    {
      icon: Video,
      title: "Video giới thiệu",
      description: "Chèn video Pre-wedding từ Youtube/Vimeo trực tiếp vào website thiệp cưới.",
      color: "text-[#db2777]",
      bgColor: "bg-pink-100/70 dark:bg-pink-950/40",
    },
    {
      icon: QrCode,
      title: "QR Code mừng cưới",
      description: "Tích hợp mã QR tài khoản ngân hàng Cô dâu & Chú rể giúp khách xa mừng cưới dễ dàng.",
      color: "text-indigo-600 dark:text-indigo-400",
      bgColor: "bg-indigo-100/70 dark:bg-indigo-950/40",
    },
    {
      icon: Share2,
      title: "Chia sẻ qua mạng xã hội",
      description: "Tạo đường link thiệp riêng gọn đẹp, chia sẻ 1-click qua Zalo, Messenger, Facebook.",
      color: "text-cyan-600 dark:text-cyan-400",
      bgColor: "bg-cyan-100/70 dark:bg-cyan-950/40",
    },
    {
      icon: Smartphone,
      title: "Responsive mọi thiết bị",
      description: "Hiển thị tràn màn hình rực rỡ chuẩn UX/UI trên iPhone, Android, Tablet và Máy tính.",
      color: "text-teal-600 dark:text-teal-400",
      bgColor: "bg-teal-100/70 dark:bg-teal-950/40",
    },
  ];

  return (
    <section id="tinh-nang" className="py-20 md:py-32 bg-slate-50/70 dark:bg-slate-900/40 relative border-b border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-block text-xs uppercase tracking-widest font-bold text-[#db2777] bg-pink-100/80 dark:bg-pink-950/50 px-3.5 py-1.5 rounded-full border border-pink-200/60">
            Trải Nghiệm Độc Đáo & Hiện Đại
          </span>
          <h2 className="text-lg sm:text-2xl md:text-4xl font-black text-foreground tracking-tight">
            Những Gì Bạn Nhận Được Cùng Viora
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            Trọn bộ tính năng cao cấp biến trang thiệp cưới số của bạn thành một tác phẩm nghệ thuật đáng nhớ.
          </p>
        </div>

        {/* 10 Features Grid (Grid 2 cột compact trên mobile) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-6">
          {FEATURES.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: idx * 0.03 }}
                className="bg-card p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-border/80 hover:border-[#db2777]/60 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className={`w-10 h-10 sm:w-13 sm:h-13 rounded-xl sm:rounded-2xl ${feat.bgColor} ${feat.color} flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <h3 className="text-xs sm:text-base font-bold text-foreground mb-1.5 leading-snug">
                    {feat.title}
                  </h3>
                  <p className="text-[11px] sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                    {feat.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
