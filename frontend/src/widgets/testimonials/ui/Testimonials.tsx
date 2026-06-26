"use client";

import { Star } from "lucide-react";

export function Testimonials() {
  const TESTIMONIALS = [
    {
      couple: "Minh & Hà",
      date: "20.03.2024",
      text: "Thiệp cưới đẹp hơn cả mong đợi! Giao diện dễ dùng, hỗ trợ nhiệt tình. Cảm ơn Viora rất nhiều!",
      avatar: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=100&h=100&fit=crop&auto=format",
    },
    {
      couple: "Hoàng & Linh",
      date: "15.01.2024",
      text: "Tạo thiệp chỉ trong vài phút mà hiệu quả thật tuyệt vời. Khách mời cũng rất thích!",
      avatar: "https://images.unsplash.com/photo-1585814932-e5d8b46dd762?w=100&h=100&fit=crop&auto=format",
    },
    {
      couple: "Nam & Hương",
      date: "03.02.2024",
      text: "Tính năng RSVP giúp mình quản lý khách mời rất hiệu quả. Đã giới thiệu cho bạn bè!",
      avatar: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=100&h=100&fit=crop&auto=format",
    },
  ];

  return (
    <section className="py-24 bg-[#fffdfb] border-b border-[#e2d8cf]/30 text-left">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Tiêu đề chính */}
        <div className="text-center space-y-3 mb-16">
          <p className="text-xs text-[#db2777] uppercase tracking-widest font-bold">
            KHÁCH HÀNG NÓI VỀ VIORA
          </p>
          <h2 
            className="text-4xl text-[#2c1810] font-bold flex justify-center items-baseline gap-x-2"
            style={{ fontFamily: "'EB Garamond', serif" }}
          >
            <span>Hơn</span>
            <span className="text-[#db2777] font-normal text-4xl sm:text-5xl" style={{ fontFamily: "'Great Vibes', cursive" }}>5.000+ cặp đôi</span>
            <span>đã tin tưởng</span>
          </h2>
        </div>

        {/* Danh sách thẻ đánh giá */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="bg-white p-7 rounded-2xl border border-[#e2d8cf]/30 hover:border-[#db2777]/20 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* 5 Sao màu hồng giống mẫu */}
                <div className="flex gap-0.5 mb-4 text-[#db2777]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} className="fill-current" />
                  ))}
                </div>
                {/* Lời chúc */}
                <p className="text-xs text-[#7a5c4f]/80 leading-relaxed italic mb-6">
                  "{t.text}"
                </p>
              </div>

              {/* Thông tin cặp đôi */}
              <div className="flex items-center gap-3.5 border-t border-[#e2d8cf]/20 pt-4">
                <img
                  src={t.avatar}
                  alt={t.couple}
                  className="w-10 h-10 rounded-full object-cover bg-gray-50 flex-shrink-0"
                />
                <div className="space-y-0.5">
                  <h4
                    className="text-xs font-bold text-[#2c1810]"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {t.couple}
                  </h4>
                  <p className="text-[10px] text-[#7a5c4f]/60 font-semibold">{t.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel indicators (các chấm tròn bên dưới) */}
        <div className="flex justify-center gap-1.5 mt-10">
          <span className="w-2 h-2 rounded-full bg-[#db2777] cursor-pointer" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#db2777]/30 cursor-pointer" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#db2777]/30 cursor-pointer" />
        </div>

      </div>
    </section>
  );
}
