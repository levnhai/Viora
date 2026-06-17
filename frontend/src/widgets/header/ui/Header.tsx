import { useState } from "react";
import { Heart, Menu, X } from "lucide-react";

interface HeaderProps {
  onOpenRequest: () => void;
}

export function Header({ onOpenRequest }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <Heart
                size={14}
                className="text-primary-foreground"
                fill="currentColor"
              />
            </div>
            <span
              className="text-lg text-foreground font-medium"
              style={{ fontFamily: "'EB Garamond', serif" }}
            >
              Thiệp Online
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {[
              ["Tính năng", "#tinh-nang"],
              ["Mẫu thiệp", "#mau-thiep"],
              ["Đăng ký", "#dang-ky-tu-van"],
              ["Bảng giá", "#bang-gia"],
              ["FAQ", "#faq"],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <a
              href="#"
              className="hidden sm:block text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Đăng nhập
            </a>
            <button 
              onClick={onOpenRequest}
              className="bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity cursor-pointer"
            >
              Tạo thiệp ngay
            </button>
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X size={20} className="text-foreground" />
              ) : (
                <Menu size={20} className="text-foreground" />
              )}
            </button>
          </div>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-card px-4 py-4 space-y-3">
          {["Tính năng", "Mẫu thiệp", "Đăng ký", "Bảng giá", "FAQ"].map((item) => {
            const hrefs: Record<string, string> = {
              "Tính năng": "#tinh-nang",
              "Mẫu thiệp": "#mau-thiep",
              "Đăng ký": "#dang-ky-tu-van",
              "Bảng giá": "#bang-gia",
              "FAQ": "#faq"
            };
            return (
              <a
                key={item}
                href={hrefs[item] || "#"}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm text-muted-foreground py-1"
              >
                {item}
              </a>
            );
          })}
        </div>
      )}
    </nav>
  );
}
