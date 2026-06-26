"use client";

import { Layers, Edit3, Eye, Share2 } from "lucide-react";

export function HowItWorks() {
  const STEPS = [
    {
      number: "01",
      icon: Layers,
      title: "Chọn mẫu thiệp",
      desc: "Chọn mẫu thiệp phù hợp với phong cách của bạn.",
    },
    {
      number: "02",
      icon: Edit3,
      title: "Chỉnh sửa thông tin",
      desc: "Thay đổi nội dung, hình ảnh, bài hát, và các chi tiết theo ý muốn.",
    },
    {
      number: "03",
      icon: Eye,
      title: "Xem trước & Lưu",
      desc: "Xem trước mẫu hiển thị thực tế, nhấn lưu khi bạn hài lòng.",
    },
    {
      number: "04",
      icon: Share2,
      title: "Chia sẻ thiệp",
      desc: "Chia sẻ thiệp cho bạn bè, người thân qua link hoặc mạng xã hội.",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-[#fffdfb] border-b border-[#e2d8cf]/30 relative overflow-hidden">
      {/* Họa tiết trang trí chìm */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-pink-100/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-amber-100/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Tiêu đề chính */}
        <div className="text-center space-y-3 mb-16">
          <p className="text-xs text-[#db2777] uppercase tracking-widest font-bold">
            QUY TRÌNH TẠO THIỆP CƯỚI
          </p>
          <h2 
            className="text-4xl text-[#2c1810] font-bold flex justify-center items-baseline gap-x-2"
            style={{ fontFamily: "'EB Garamond', serif" }}
          >
            <span>Chỉ với</span>
            <span className="text-[#db2777] font-normal text-4xl sm:text-5xl" style={{ fontFamily: "'Great Vibes', cursive" }}>4 bước đơn giản</span>
          </h2>
        </div>

        {/* 4 Bước nằm ngang có nét vẽ kết nối */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          
          {/* Nét vẽ đứt kết nối cho màn hình desktop */}
          <div className="hidden md:block absolute top-[28px] left-[10%] right-[10%] h-[1.5px] border-t border-dashed border-[#db2777]/30 z-0" />

          {STEPS.map((s, idx) => (
            <div key={idx} className="flex flex-col items-center text-center space-y-4 group relative z-10">
              
              {/* Vòng tròn số & Icon */}
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-white border border-[#db2777]/30 shadow-md flex items-center justify-center group-hover:border-[#db2777] group-hover:shadow-pink-100/50 group-hover:scale-105 transition-all">
                  <s.icon size={22} className="text-[#db2777]" />
                </div>
                {/* Số thứ tự bước */}
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#db2777] text-white text-[9px] font-bold flex items-center justify-center border border-white">
                  {s.number}
                </span>
              </div>

              {/* Nội dung chữ */}
              <div className="space-y-2 max-w-[200px]">
                <h3 
                  className="text-sm font-bold text-[#2c1810]"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {s.title}
                </h3>
                <p className="text-[11px] text-[#7a5c4f]/70 font-light leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
