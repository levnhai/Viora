"use client";

import { useState, useEffect } from "react";
import { Heart, Menu, X, Sun, Check } from "lucide-react";
import Link from "next/link";
import { authService } from "@/features/auth/api/authService";

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
    const role = localStorage.getItem("role");
    const name = localStorage.getItem("name") || "";
    const email = localStorage.getItem("username") || "";
    const picture = localStorage.getItem("picture") || undefined;

    if (role) {
      setIsLoggedIn(true);
      setUserProfile({ name, email, picture });
    }
  }, []);

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.error("Lỗi đăng xuất:", err);
    }
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
          <div className="hidden md:flex items-center gap-8">
            {[
              ["Trang chủ", "/"],
              ["Mẫu thiệp", "#mau-thiep"],
              ["Tính năng", "#tinh-nang"],
              ["Bảng giá", "#bang-gia"],
              ["Hướng dẫn", "#how-it-works"],
              ["Blog", "#dang-ky-tu-van"],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                className={`text-[13px] font-semibold transition-colors ${
                  label === "Trang chủ"
                    ? "text-[#db2777] border-b-2 border-[#db2777] pb-1"
                    : "text-[#7a5c4f]/70 hover:text-[#db2777]"
                }`}
              >
                {label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <div className="flex items-center gap-4 relative">
                <button
                  onClick={onOpenRequest}
                  className="bg-[#db2777] hover:bg-[#c2185b] text-white px-5 py-2.5 rounded-full text-xs font-semibold hover:opacity-90 active:scale-95 transition-all cursor-pointer border-0"
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
              <div className="flex items-center gap-2.5">
                <Link
                  href="/login"
                  className="px-4 py-2 border border-[#db2777]/30 hover:border-[#db2777] rounded-full text-xs font-semibold text-[#db2777] hover:bg-[#db2777]/5 transition-all no-underline"
                >
                  Đăng nhập
                </Link>
                <button
                  onClick={onOpenRequest}
                  className="bg-[#db2777] hover:bg-[#c2185b] text-white px-5 py-2.5 rounded-full text-xs font-semibold hover:opacity-90 active:scale-95 transition-all cursor-pointer border-0 shadow-sm shadow-pink-600/10"
                >
                  Tạo thiệp miễn phí
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
