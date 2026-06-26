"use client";

import { ArrowRight } from "lucide-react";

export function BlogSection() {
  const POSTS = [
    {
      title: "Xu hướng thiệp cưới 2024 được yêu thích nhất",
      date: "19.02.2024",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=300&h=200&fit=crop&auto=format",
    },
    {
      title: "5 lưu ý khi viết nội dung thiệp cưới",
      date: "08.02.2024",
      image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=300&h=200&fit=crop&auto=format",
    },
    {
      title: "Cách tạo thiệp cưới online đẹp và chuyên nghiệp",
      date: "05.02.2024",
      image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=300&h=200&fit=crop&auto=format",
    },
    {
      title: "Kinh nghiệm quản lý khách mời hiệu quả",
      date: "01.02.2024",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=300&h=200&fit=crop&auto=format",
    },
    {
      title: "Những lời chúc cưới hay và ý nghĩa nhất",
      date: "28.01.2024",
      image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=300&h=200&fit=crop&auto=format",
    },
  ];

  return (
    <section className="py-24 bg-white border-b border-[#e2d8cf]/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div className="text-left space-y-2">
            <p className="text-xs text-[#db2777] uppercase tracking-widest font-bold flex items-center gap-1.5">
              <span>🌸</span> BÀI VIẾT MỚI
            </p>
            <h2 
              className="text-4xl text-[#2c1810] font-bold"
              style={{ fontFamily: "'EB Garamond', serif" }}
            >
              Cẩm nang cưới hỏi
            </h2>
          </div>
          <div className="text-left">
            <button className="border border-[#db2777]/30 bg-white text-[#db2777] hover:bg-[#db2777]/5 px-6 py-2.5 rounded-full font-semibold text-xs flex items-center gap-2 cursor-pointer transition-all active:scale-95 shadow-xs">
              Xem tất cả bài viết <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Grid hiển thị 5 bài viết ngang */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {POSTS.map((p, idx) => (
            <div 
              key={idx}
              className="group cursor-pointer flex flex-col justify-between space-y-3 bg-[#fffdfb] border border-[#e2d8cf]/30 p-2.5 rounded-2xl hover:shadow-md hover:border-[#db2777]/20 transition-all text-left"
            >
              <div className="space-y-3">
                {/* Thumbnail */}
                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#faf6f0]">
                  <img 
                    src={p.image} 
                    alt={p.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                {/* Ngày tháng */}
                <span className="text-[10px] font-semibold text-[#7a5c4f]/50 tracking-wider">
                  {p.date}
                </span>
                {/* Tiêu đề bài viết */}
                <h3 
                  className="text-xs font-semibold text-[#2c1810] line-clamp-3 leading-snug group-hover:text-[#db2777] transition-colors"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {p.title}
                </h3>
              </div>
              <div className="pt-2 text-[10px] font-bold text-[#db2777] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                Đọc bài viết <ArrowRight size={10} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
