"use client";

import { useState, useEffect } from "react";
import { Heart, Menu, X, Sun, Check } from "lucide-react";
import Link from "next/link";

interface HeaderProps {
  onOpenRequest: () => void;
}

export function Header({ onOpenRequest }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState<{
    name: string;
    email: string;
    picture?: string;
  }>({ name: "", email: "" });
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name") || "";
    const email = localStorage.getItem("username") || "";
    const picture = localStorage.getItem("picture") || undefined;

    if (token) {
      setIsLoggedIn(true);
      setUserProfile({ name, email, picture });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    localStorage.removeItem("name");
    localStorage.removeItem("picture");
    localStorage.removeItem("weddingSlug");
    setIsLoggedIn(false);
    setDropdownOpen(false);
    window.location.reload();
  };

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
              ["Mẫu thiệp", "#mau-thiep"],
              ["Tính năng", "#tinh-nang"],
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
            {isLoggedIn ? (
              <div className="flex items-center gap-4 relative">
                {/* Theme Toggle Button */}
                {/* <button className="text-slate-400 hover:text-white transition-colors bg-transparent border-0 cursor-pointer p-1.5 rounded-lg flex items-center justify-center">
                  <Sun size={20} />
                </button> */}
                <button
                  onClick={onOpenRequest}
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity cursor-pointer border-0"
                >
                  Tạo thiệp ngay
                </button>

                {/* Profile Avatar Button */}
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#db2777] to-red-500 flex items-center justify-center text-white font-bold text-sm shadow-md border-0 cursor-pointer overflow-hidden active:scale-95 transition-transform"
                >
                  {userProfile.picture ? (
                    <img
                      src={userProfile.picture}
                      alt={userProfile.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    userProfile.name.charAt(0).toUpperCase() || "U"
                  )}
                </button>

                {/* Dropdown Menu Profile */}
                {dropdownOpen && (
                  <div className="absolute right-0 top-12 w-64 bg-[#1c1917] border border-[#292524] rounded-2xl p-4 shadow-2xl z-50 text-left text-slate-200 animate-fade-in space-y-3">
                    {/* User Info */}
                    <div className="space-y-1 py-1">
                      <h4 className="text-sm font-semibold text-white truncate">
                        {userProfile.name}
                      </h4>
                      <p className="text-2xs text-slate-400 truncate">
                        {userProfile.email}
                      </p>
                    </div>

                    <hr className="border-t border-[#292524] my-1" />

                    {/* Main Links */}
                    <div className="space-y-1">
                      <Link
                        href="/account"
                        onClick={() => setDropdownOpen(false)}
                        className="block text-xs font-semibold py-2 px-2.5 rounded-lg hover:bg-[#292524]/50 hover:text-white text-slate-300 no-underline"
                      >
                        Tài khoản
                      </Link>
                      <a
                        href="#blog"
                        onClick={() => setDropdownOpen(false)}
                        className="block text-xs font-semibold py-2 px-2.5 rounded-lg hover:bg-[#292524]/50 hover:text-white text-slate-300 no-underline"
                      >
                        Blog
                      </a>
                    </div>

                    <hr className="border-t border-[#292524] my-1" />

                    {/* Language Section */}
                    <div className="space-y-1">
                      <span className="block text-[10px] uppercase tracking-wider text-slate-500 font-bold px-2.5 mb-1.5">
                        Ngôn ngữ
                      </span>
                      <button className="w-full flex items-center justify-between py-1.5 px-2.5 rounded-lg text-xs font-semibold text-[#db2777] bg-transparent border-0 cursor-pointer text-left">
                        <span>Tiếng Việt</span>
                        <Check size={14} className="text-[#db2777]" />
                      </button>
                      {["English", "繁體中文 (台灣)", "العربية"].map((lang) => (
                        <button
                          key={lang}
                          className="w-full py-1.5 px-2.5 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-[#292524]/40 bg-transparent border-0 cursor-pointer text-left"
                        >
                          {lang}
                        </button>
                      ))}
                    </div>

                    <hr className="border-t border-[#292524] my-1" />

                    {/* Logout Button */}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left py-2 px-2.5 rounded-lg text-xs font-semibold text-red-500 hover:text-red-400 hover:bg-red-950/20 bg-transparent border-0 cursor-pointer font-sans"
                    >
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="hidden sm:block text-sm text-muted-foreground hover:text-foreground transition-colors no-underline"
                >
                  Đăng nhập
                </Link>
                <button
                  onClick={onOpenRequest}
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity cursor-pointer border-0"
                >
                  Tạo thiệp ngay
                </button>
              </div>
            )}
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
          {["Tính năng", "Mẫu thiệp", "Đăng ký", "Bảng giá", "FAQ"].map(
            (item) => {
              const hrefs: Record<string, string> = {
                "Tính năng": "#tinh-nang",
                "Mẫu thiệp": "#mau-thiep",
                "Đăng ký": "#dang-ky-tu-van",
                "Bảng giá": "#bang-gia",
                FAQ: "#faq",
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
            },
          )}
        </div>
      )}
    </nav>
  );
}
