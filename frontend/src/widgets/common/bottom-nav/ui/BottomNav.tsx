"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Heart, BookOpen, Plus, Users, Settings } from "lucide-react";
import { useEffect, useState } from "react";

export function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem("role");
    const slug = localStorage.getItem("weddingSlug");
    if (role) {
      setIsLoggedIn(true);
    }
  }, [pathname, searchParams]);

  if (!isLoggedIn) return null;
  if (!pathname.startsWith("/dashboard")) return null;

  // Detect active tab based on URL path/query
  let activeTab = "overview";
  if (pathname.includes("/dashboard")) {
    if (tabParam === "guests") {
      activeTab = "guests";
    } else if (tabParam === "setting") {
      activeTab = "setting";
    } else if (tabParam === "guestbook") {
      activeTab = "guestbook";
    } else {
      activeTab = "overview";
    }
  } else if (pathname.includes("/account")) {
    activeTab = "account";
  }

  const handleNav = (tab: string) => {
    if (tab === "overview") {
      router.push("/dashboard?tab=overview");
    } else if (tab === "guestbook") {
      router.push("/dashboard?tab=guestbook");
    } else if (tab === "guests") {
      router.push("/dashboard?tab=guests");
    } else if (tab === "setting") {
      router.push("/dashboard?tab=setting");
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/95 backdrop-blur-md border-t border-slate-100 flex items-center justify-around h-16 rounded-t-2xl shadow-[0_-4px_20px_rgba(0,0,0,0.04)] select-none px-2">
      {/* 1. Tổng quan */}
      <button
        onClick={() => handleNav("overview")}
        className={`flex flex-col items-center justify-center gap-1 w-14 h-full border-0 bg-transparent cursor-pointer transition-all active:scale-95 relative ${
          activeTab === "overview" ? "text-[#1b365d]" : "text-slate-400"
        }`}
      >
        <Heart
          size={18}
          fill={activeTab === "overview" ? "currentColor" : "none"}
          className="transition-transform duration-200"
        />
        <span className="text-[10px] font-medium tracking-wide">Tổng quan</span>
        {activeTab === "overview" && (
          <span className="absolute bottom-1 w-1 h-1 rounded-full bg-[#c6925c] animate-pulse" />
        )}
      </button>

      {/* 2. Lời chúc */}
      <button
        onClick={() => handleNav("guestbook")}
        className={`flex flex-col items-center justify-center gap-1 w-14 h-full border-0 bg-transparent cursor-pointer transition-all active:scale-95 relative ${
          activeTab === "guestbook" ? "text-[#1b365d]" : "text-slate-400"
        }`}
      >
        <BookOpen
          size={18}
          fill={activeTab === "guestbook" ? "currentColor" : "none"}
          className="transition-transform duration-200"
        />
        <span className="text-[10px] font-medium tracking-wide">Lời chúc</span>
        {activeTab === "guestbook" && (
          <span className="absolute bottom-1 w-1 h-1 rounded-full bg-[#c6925c] animate-pulse" />
        )}
      </button>

      {/* 3. Nút tròn hồng đỏ nổi dấu + ở giữa */}
      <button
        onClick={() => router.push("/dashboard?tab=guests&action=add")}
        className="flex items-center justify-center w-12 h-12 rounded-full bg-[#1b365d] text-white hover:bg-[#122543] transition-all border-0 shadow-[0_4px_14px_rgba(27,54,93,0.3)] active:scale-90 cursor-pointer -mt-6 shrink-0 ring-4 ring-white/90"
      >
        <Plus
          size={22}
          className="transition-transform active:rotate-90 duration-200"
        />
      </button>

      {/* 4. Khách mời */}
      <button
        onClick={() => handleNav("guests")}
        className={`flex flex-col items-center justify-center gap-1 w-14 h-full border-0 bg-transparent cursor-pointer transition-all active:scale-95 relative ${
          activeTab === "guests" ? "text-[#1b365d]" : "text-slate-400"
        }`}
      >
        <Users size={18} className="transition-transform duration-200" />
        <span className="text-[10px] font-medium tracking-wide">Khách mời</span>
        {activeTab === "guests" && (
          <span className="absolute bottom-1 w-1 h-1 rounded-full bg-[#c6925c] animate-pulse" />
        )}
      </button>

      {/* 5. Cài đặt */}
      <button
        onClick={() => handleNav("setting")}
        className={`flex flex-col items-center justify-center gap-1 w-14 h-full border-0 bg-transparent cursor-pointer transition-all active:scale-95 relative ${
          activeTab === "setting" ? "text-[#1b365d]" : "text-slate-400"
        }`}
      >
        <Settings size={18} className="transition-transform duration-200" />
        <span className="text-[10px] font-medium tracking-wide">Cài đặt</span>
        {activeTab === "setting" && (
          <span className="absolute bottom-1 w-1 h-1 rounded-full bg-[#c6925c] animate-pulse" />
        )}
      </button>
    </div>
  );
}
