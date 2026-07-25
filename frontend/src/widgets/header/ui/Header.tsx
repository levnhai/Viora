"use client";

import { useState } from "react";
import { Menu, X, PhoneCall } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface HeaderProps {
  onOpenRequest?: () => void;
}

export function Header({ onOpenRequest }: HeaderProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToConsult = () => {
    const el = document.getElementById("dang-ky-tu-van");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else if (onOpenRequest) {
      onOpenRequest();
    }
  };

  return (
    <nav className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-2.5 no-underline">
            <span className="text-2xl text-[#db2777]">🌸</span>
            <div className="flex flex-col text-left">
              <span className="text-lg font-black tracking-widest text-[#2c1810] dark:text-white leading-none">
                VIORA
              </span>
              <span className="text-[7px] text-[#7a5c4f]/70 dark:text-slate-400 tracking-widest font-bold uppercase mt-0.5">
                WEDDING INVITATIONS
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {[
              ["Trang chủ", "/"],
              ["Mẫu thiệp", "/templates"],
              ["Tính năng", "/#tinh-nang"],
              ["Quy trình", "/#how-it-works"],
              ["FAQ", "/#faq"],
              ["Liên hệ tư vấn", "/#dang-ky-tu-van"],
            ].map(([label, href]) => {
              const isActive = (href === "/" && pathname === "/") || (href === "/templates" && pathname === "/templates");

              return (
                <Link
                  key={label}
                  href={href}
                  className={`text-[13px] font-semibold transition-colors no-underline pb-1 ${
                    isActive
                      ? "text-[#db2777] border-b-2 border-[#db2777]"
                      : "text-[#7a5c4f]/80 dark:text-slate-200 hover:text-[#db2777]"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          {/* Right Action */}
          <div className="flex items-center gap-3">
            {/* Language Selector */}
            <div className="hidden sm:flex items-center gap-1 text-[12px] font-semibold text-[#7a5c4f]/80 dark:text-slate-200 hover:text-[#db2777] cursor-pointer mr-2">
              <span>🌐</span>
              <span>VI</span>
              <span className="text-[9px] opacity-60">▼</span>
            </div>

            {/* Consultation CTA Button */}
            <button
              onClick={scrollToConsult}
              className="bg-[#db2777] hover:bg-[#c2185b] text-white px-5 py-2.5 rounded-full text-xs font-bold hover:opacity-90 active:scale-95 transition-all cursor-pointer border-0 shadow-sm shadow-pink-600/10 flex items-center gap-1.5"
            >
              <PhoneCall size={14} />
              <span>Tư vấn ngay</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-1.5 text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X size={20} />
              ) : (
                <Menu size={20} />
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-card px-4 py-4 space-y-3">
          {[
            ["Trang chủ", "/"],
            ["Mẫu thiệp", "/templates"],
            ["Tính năng", "/#tinh-nang"],
            ["Quy trình", "/#how-it-works"],
            ["FAQ", "/#faq"],
            ["Liên hệ tư vấn", "/#dang-ky-tu-van"],
          ].map(([label, href]) => (
            <Link
              key={label}
              href={href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm text-muted-foreground hover:text-[#db2777] py-1.5 no-underline font-semibold"
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
