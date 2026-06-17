import { Heart, Facebook, Instagram, Youtube, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-primary-foreground py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12 text-left">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center">
                <Heart
                  size={12}
                  className="text-primary-foreground"
                  fill="currentColor"
                />
              </div>
              <span style={{ fontFamily: "'EB Garamond', serif" }}>
                Thiệp Online
              </span>
            </div>
            <p className="text-sm opacity-50 leading-relaxed">
              Thiệp mời kỹ thuật số đẹp nhất Việt Nam.
            </p>
            <div className="flex gap-2.5">
              {[Facebook, Instagram, Youtube].map((Icon, i) => (
                <button
                  key={i}
                  className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center hover:border-primary/60 transition-colors cursor-pointer"
                >
                  <Icon size={13} />
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <h4
              style={{ fontFamily: "'EB Garamond', serif", fontSize: "1rem" }}
            >
              Sản phẩm
            </h4>
            <ul className="space-y-2.5">
              {["Mẫu thiệp", "Tính năng", "Bảng giá", "Tên miền riêng"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm opacity-50 hover:opacity-100 transition-opacity"
                    >
                      {item}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>
          <div className="space-y-4">
            <h4
              style={{ fontFamily: "'EB Garamond', serif", fontSize: "1rem" }}
            >
              Hỗ trợ
            </h4>
            <ul className="space-y-2.5">
              {[
                "Hướng dẫn sử dụng",
                "FAQ",
                "Chính sách bảo mật",
                "Điều khoản dịch vụ",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm opacity-50 hover:opacity-100 transition-opacity"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h4
              style={{ fontFamily: "'EB Garamond', serif", fontSize: "1rem" }}
            >
              Liên hệ
            </h4>
            <ul className="space-y-3">
              {[
                { Icon: Phone, text: "0901 234 567" },
                { Icon: Mail, text: "hello@thieponline.vn" },
              ].map(({ Icon, text }) => (
                <li
                  key={text}
                  className="flex items-center gap-2 text-sm opacity-50"
                >
                  <Icon size={13} /> {text}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs opacity-30">
            © 2025 Thiệp Online · Thiệp mời cưới kỹ thuật số
          </p>
          <p className="text-xs opacity-30">Làm với ❤ tại Việt Nam</p>
        </div>
      </div>
    </footer>
  );
}
