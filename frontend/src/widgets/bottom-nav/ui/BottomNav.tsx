"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { LayoutGrid, Mail, Users } from "lucide-react";
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
  }, [pathname, searchParams]); // recheck on navigation

  if (!isLoggedIn) return null;

  // Detect active tab based on URL path/query
  let activeTab = "templates";
  if (pathname === "/") {
    activeTab = "templates";
  } else if (pathname.includes("/dashboard")) {
    if (tabParam === "guests") {
      activeTab = "guests";
    } else {
      activeTab = "wedding";
    }
  } else if (pathname.includes("/edit") || pathname.includes("/create")) {
    activeTab = "wedding";
  }

  const handleNav = (tab: string) => {
    if (tab === "templates") {
      router.push("/");
    } else if (tab === "wedding") {
      if (weddingSlug) {
        router.push(`/edit/${weddingSlug}`);
      } else {
        router.push("/dashboard");
      }
    } else if (tab === "guests") {
      router.push("/dashboard?tab=guests");
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#1c1917] border-t border-[#292524] flex items-center justify-around h-16 shadow-[0_-4px_12px_rgba(0,0,0,0.35)] select-none">
      {/* 1. Mẫu Thiệp */}
      <button
        onClick={() => handleNav("templates")}
        className={`flex flex-col items-center justify-center gap-1 w-20 h-full border-0 bg-transparent cursor-pointer transition-colors ${
          activeTab === "templates" ? "text-[#db2777]" : "text-stone-400"
        }`}
      >
        <LayoutGrid size={20} />
        <span className="text-[10px] font-semibold tracking-wide">
          Mẫu Thiệp
        </span>
      </button>

      {/* 2. Thiệp của tôi */}
      <button
        onClick={() => handleNav("wedding")}
        className={`flex flex-col items-center justify-center gap-1 w-20 h-full border-0 bg-transparent cursor-pointer transition-colors ${
          activeTab === "wedding" ? "text-[#db2777]" : "text-stone-400"
        }`}
      >
        <Mail
          size={20}
          fill={activeTab === "wedding" ? "currentColor" : "none"}
        />
        <span className="text-[10px] font-semibold tracking-wide">
          Thiệp của tôi
        </span>
      </button>

      {/* 3. Khách mời */}
      <button
        onClick={() => handleNav("guests")}
        className={`flex flex-col items-center justify-center gap-1 w-20 h-full border-0 bg-transparent cursor-pointer transition-colors ${
          activeTab === "guests" ? "text-[#db2777]" : "text-stone-400"
        }`}
      >
        <Users size={20} />
        <span className="text-[10px] font-semibold tracking-wide">
          Khách mời
        </span>
      </button>
    </div>
  );
}
