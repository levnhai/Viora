"use client";

import { Heart, Mail, Phone, MapPin, Facebook, Instagram, Youtube } from "lucide-react";

export function LandingFooter() {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1 & 2: Brand & About */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">🌸</span>
              <span className="text-2xl font-black tracking-widest text-white">
                VIORA
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed font-normal">
              Nền tảng thiệp cưới trực tuyến thông minh (E-Invitation). Giúp các cặp đôi sở hữu thiệp cưới online hiện đại, tùy chỉnh chuyên nghiệp cho ngày trọng đại.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 hover:border-pink-500 hover:text-pink-400 flex items-center justify-center transition-colors">
                <Facebook size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 hover:border-pink-500 hover:text-pink-400 flex items-center justify-center transition-colors">
                <Instagram size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 hover:border-pink-500 hover:text-pink-400 flex items-center justify-center transition-colors">
                <Youtube size={16} />
              </a>
            </div>
          </div>

          {/* Col 3: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Khám Phá
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm font-medium">
              <li><a href="#mau-thiep" className="hover:text-pink-400 transition-colors">Kho Mẫu Thiệp</a></li>
              <li><a href="#tinh-nang" className="hover:text-pink-400 transition-colors">Tính Năng Nổi Bật</a></li>
              <li><a href="#how-it-works" className="hover:text-pink-400 transition-colors">Quy Trình Triển Khai</a></li>
              <li><a href="#bang-gia" className="hover:text-pink-400 transition-colors">Bảng Giá Dịch Vụ</a></li>
              <li><a href="#faq" className="hover:text-pink-400 transition-colors">Câu Hỏi Thường Gặp</a></li>
            </ul>
          </div>

          {/* Col 4: Policies & Terms */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Chính Sách & Điều Khoản
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm font-medium">
              <li><a href="#" className="hover:text-pink-400 transition-colors">Điều khoản sử dụng</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">Chính sách bảo mật</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">Quy định thanh toán</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">Chính sách hoàn tiền</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">Trung tâm hỗ trợ khách hàng</a></li>
            </ul>
          </div>

          {/* Col 5: Contact Info */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Liên Hệ
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400 font-medium">
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-pink-500 shrink-0" />
                <span>Hotline: 0988 123 456</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-pink-500 shrink-0" />
                <span>Email: support@viora.vn</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={14} className="text-pink-500 shrink-0 mt-0.5" />
                <span>Hà Nội & TP. Hồ Chí Minh, Việt Nam</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
          <p>© {new Date().getFullYear()} Viora Wedding Invitations. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Thiết kế với <Heart size={12} className="text-pink-500 fill-pink-500" /> dành cho các cặp đôi Việt.
          </p>
        </div>

      </div>
    </footer>
  );
}
