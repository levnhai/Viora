"use client";

import { Facebook, Instagram, Mail, Send } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#fffdfb] border-t border-[#e2d8cf]/40 text-left pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-16">
          
          {/* Cột trái: Giới thiệu & Mạng xã hội (Chiếm 4 cột) */}
          <div className="md:col-span-4 space-y-5">
            <div className="flex items-center gap-2">
              <span className="text-2xl text-[#db2777]">🌸</span>
              <div className="flex flex-col text-left">
                <span
                  className="text-lg font-bold tracking-widest text-[#2c1810] leading-none"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  VIORA
                </span>
                <span className="text-[7px] text-[#7a5c4f]/60 tracking-wider font-semibold">
                  WEDDING INVITATIONS
                </span>
              </div>
            </div>
            
            <p className="text-xs text-[#7a5c4f]/70 leading-relaxed max-w-sm font-light">
              Nền tảng thiệp cưới online đẹp, hiện đại và dễ dàng cho ngày trọng đại.
            </p>
            
            {/* Icons mạng xã hội */}
            <div className="flex gap-2.5">
              {[
                { Icon: Facebook, href: "#" },
                { Icon: Instagram, href: "#" },
                { Icon: Mail, href: "mailto:hello@viora.vn" }
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  className="w-8 h-8 rounded-full border border-[#e2d8cf] flex items-center justify-center text-[#7a5c4f]/70 hover:text-[#db2777] hover:border-[#db2777]/30 hover:bg-pink-50/50 transition-colors"
                >
                  <item.Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Cột 1: SẢN PHẨM (Chiếm 2 cột) */}
          <div className="md:col-span-2 space-y-4">
            <h4 
              className="text-xs font-bold text-[#2c1810] uppercase tracking-wider"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Sản phẩm
            </h4>
            <ul className="space-y-2.5 text-xs font-light text-[#7a5c4f]/80">
              {["Mẫu thiệp", "Tính năng", "Bảng giá", "Kho giao diện", "Quản lý khách mời"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-[#db2777] transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Cột 2: HỖ TRỢ (Chiếm 2 cột) */}
          <div className="md:col-span-2 space-y-4">
            <h4 
              className="text-xs font-bold text-[#2c1810] uppercase tracking-wider"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Hỗ trợ
            </h4>
            <ul className="space-y-2.5 text-xs font-light text-[#7a5c4f]/80">
              {["Hướng dẫn sử dụng", "Câu hỏi thường gặp", "Chính sách bảo mật", "Điều khoản sử dụng", "Liên hệ hỗ trợ"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-[#db2777] transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Cột 3: TÀI NGUYÊN (Chiếm 2 cột) */}
          <div className="md:col-span-2 space-y-4">
            <h4 
              className="text-xs font-bold text-[#2c1810] uppercase tracking-wider"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Tài nguyên
            </h4>
            <ul className="space-y-2.5 text-xs font-light text-[#7a5c4f]/80">
              {["Blog", "Cẩm nang cưới hỏi", "Ý tưởng đám cưới", "Xu hướng cưới 2024", "Tải app"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-[#db2777] transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Cột 4: ĐĂNG KÝ NHẬN TIN (Chiếm 2 cột) */}
          <div className="md:col-span-2 space-y-4">
            <h4 
              className="text-xs font-bold text-[#2c1810] uppercase tracking-wider"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Đăng ký nhận tin
            </h4>
            <p className="text-[11px] text-[#7a5c4f]/70 leading-relaxed font-light">
              Nhận những mẫu thiệp mới nhất và ưu đãi đặc biệt qua email.
            </p>
            {/* Input đăng ký email */}
            <div className="flex items-center border border-[#e2d8cf] focus-within:border-[#db2777] rounded-xl p-1 bg-white shadow-xs">
              <input 
                type="email" 
                placeholder="Nhập email của bạn" 
                className="w-full bg-transparent border-0 outline-none text-[11px] text-[#2c1810] px-2"
              />
              <button className="bg-[#db2777] hover:bg-[#c2185b] text-white w-7 h-7 rounded-lg flex items-center justify-center cursor-pointer transition-colors border-0 flex-shrink-0">
                <Send size={12} />
              </button>
            </div>
          </div>

        </div>

        {/* Dòng bản quyền */}
        <div className="border-t border-[#e2d8cf]/40 pt-8 text-center md:flex md:justify-between md:items-center">
          <p className="text-[11px] text-[#7a5c4f]/50 font-medium">
            © 2024 Viora. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
