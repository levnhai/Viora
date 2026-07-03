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
  const [weddingSlug, setWeddingSlug] = useState<string | null>(null);
 
  useEffect(() => {
    const role = localStorage.getItem("role");
    const slug = localStorage.getItem("weddingSlug");
    if (role) {
      setIsLoggedIn(true);
      setWeddingSlug(slug);
    }
  }, [pathname, searchParams]);
 
  if (!isLoggedIn) return null;
  if (!pathname.startsWith("/dashboard")) return null;
 
  // Detect active tab based on URL path/query
  let activeTab = "overview";
  if (pathname.includes("/dashboard")) {
    if (tabParam === "guests") {
      activeTab = "guests";
    } else if (tabParam === "qr") {
      activeTab = "qr";
    } else if (tabParam === "guestbook") {
      activeTab = "guestbook";
    } else {
      activeTab = "overview";
    }
  } else if (pathname.includes("/edit") || pathname.includes("/create")) {
    activeTab = "wedding";
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
    } else if (tab === "qr") {
      router.push("/dashboard?tab=qr");
    }
  };
 
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#1c1917] border-t border-[#292524] flex items-center justify-around h-16 shadow-[0_-4px_12px_rgba(0,0,0,0.35)] select-none px-2">
      {/* 1. Tổng quan */}
      <button
        onClick={() => handleNav("overview")}
        className={`flex flex-col items-center justify-center gap-1 w-14 h-full border-0 bg-transparent cursor-pointer transition-colors ${
          activeTab === "overview" ? "text-[#db2777]" : "text-stone-400"
        }`}
      >
        <Heart size={18} fill={activeTab === "overview" ? "currentColor" : "none"} />
        <span className="text-[9px] font-bold tracking-wide">
          Tổng quan
        </span>
      </button>
 
      {/* 2. Lời chúc */}
      <button
        onClick={() => handleNav("guestbook")}
        className={`flex flex-col items-center justify-center gap-1 w-14 h-full border-0 bg-transparent cursor-pointer transition-colors ${
          activeTab === "guestbook" ? "text-[#db2777]" : "text-stone-400"
        }`}
      >
        <BookOpen size={18} fill={activeTab === "guestbook" ? "currentColor" : "none"} />
        <span className="text-[9px] font-bold tracking-wide">
          Lời chúc
        </span>
      </button>

      {/* 3. Nút tròn hồng đỏ nổi dấu + ở giữa */}
      <button
        onClick={() => router.push("/dashboard?tab=guests&action=add")}
        className="flex items-center justify-center w-12 h-12 rounded-full bg-[#db2777] text-white hover:bg-[#be185d] transition-all border-0 shadow-lg active:scale-95 cursor-pointer -mt-5 shrink-0"
      >
        <Plus size={24} />
      </button>
 
      {/* 4. Khách mời */}
      <button
        onClick={() => handleNav("guests")}
        className={`flex flex-col items-center justify-center gap-1 w-14 h-full border-0 bg-transparent cursor-pointer transition-colors ${
          activeTab === "guests" ? "text-[#db2777]" : "text-stone-400"
        }`}
      >
        <Users size={18} />
        <span className="text-[9px] font-bold tracking-wide">
          Khách mời
        </span>
      </button>
 
      {/* 5. Cài đặt */}
      <button
        onClick={() => handleNav("qr")}
        className={`flex flex-col items-center justify-center gap-1 w-14 h-full border-0 bg-transparent cursor-pointer transition-colors ${
          activeTab === "qr" ? "text-[#db2777]" : "text-stone-400"
        }`}
      >
        <Settings size={18} />
        <span className="text-[9px] font-bold tracking-wide">
          Cài đặt
        </span>
      </button>
    </div>
  );
}
