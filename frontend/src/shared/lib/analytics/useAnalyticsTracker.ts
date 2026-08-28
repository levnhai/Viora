"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { sendTrackEvent } from "@/entities/analytics/api/analyticsApi";

const getOrCreateVisitorId = (): { visitorId: string; isReturning: boolean } => {
  if (typeof window === "undefined") {
    return { visitorId: "", isReturning: false };
  }

  const STORAGE_KEY = "viora_vid";
  const VISITED_BEFORE_KEY = "viora_has_visited";

  let visitorId: string | null = null;
  let hasVisited: string | null = null;

  try {
    visitorId = localStorage.getItem(STORAGE_KEY);
    hasVisited = localStorage.getItem(VISITED_BEFORE_KEY);
  } catch {}

  if (!visitorId) {
    visitorId = "vid_" + Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
    try {
      localStorage.setItem(STORAGE_KEY, visitorId);
      localStorage.setItem(VISITED_BEFORE_KEY, "true");
    } catch {}
    return { visitorId, isReturning: false };
  }

  return { visitorId, isReturning: !!hasVisited };
};

const detectDevice = (): "desktop" | "mobile" | "tablet" | "unknown" => {
  if (typeof window === "undefined") return "desktop";

  // 1. Kiểm tra Client Hints (Google Chrome, Edge)
  const navAny = navigator as any;
  if (navAny.userAgentData && typeof navAny.userAgentData.mobile === "boolean") {
    if (navAny.userAgentData.mobile) {
      return window.innerWidth >= 768 ? "tablet" : "mobile";
    }
    return "desktop";
  }

  const ua = navigator.userAgent || "";

  // 2. Kiểm tra Tablet
  if (
    /(tablet|ipad|playbook|silk)|(android(?!.*mobile))/i.test(ua) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  ) {
    return "tablet";
  }

  // 3. Kiểm tra Mobile
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Opera Mini/i.test(ua)) {
    return "mobile";
  }

  // 4. Nếu màn hình lớn -> Desktop
  if (window.innerWidth >= 1024 || navigator.maxTouchPoints === 0) {
    return "desktop";
  }

  return "desktop";
};

const detectBrowser = (): string => {
  if (typeof window === "undefined") return "Google Chrome";
  const ua = navigator.userAgent;

  if (ua.includes("Zalo")) return "Zalo App";
  if (ua.includes("FBAV") || ua.includes("FBAN") || ua.includes("FB_IAB")) return "Facebook App";
  if (ua.includes("CocCoc")) return "Cốc Cốc";
  if (ua.includes("Edg/")) return "Microsoft Edge";
  if (ua.includes("OPR/") || ua.includes("Opera")) return "Opera";
  if (ua.includes("Chrome/") && !ua.includes("Edg/")) return "Google Chrome";
  if (ua.includes("Safari/") && !ua.includes("Chrome/")) return "Apple Safari";
  if (ua.includes("Firefox/")) return "Mozilla Firefox";

  return "Google Chrome";
};

const detectTemplateSlug = (pathname: string): string | undefined => {
  if (typeof window === "undefined") return undefined;

  // 1. Kiểm tra query param ?template=... hoặc ?templateId=...
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const templateParam = urlParams.get("template") || urlParams.get("templateId") || urlParams.get("code");
    if (templateParam) return templateParam;
  } catch {}

  // 2. Bắt route xem thiệp cưới: /w/[slug]
  if (pathname.startsWith("/w/")) {
    const slug = pathname.split("/w/")[1]?.split("/")[0]?.split("?")[0];
    return slug || "temp_1";
  }

  // 3. Bắt các route xem mẫu khác
  if (pathname.startsWith("/templates/")) {
    return pathname.split("/templates/")[1]?.split("/")[0]?.split("?")[0];
  }
  if (pathname.startsWith("/invitations/")) {
    return pathname.split("/invitations/")[1]?.split("/")[0]?.split("?")[0];
  }
  if (pathname.startsWith("/wedding-invitation-demo") || pathname.startsWith("/wedding-demo")) {
    return "temp_1";
  }

  return undefined;
};

const normalizeProvince = (rawName: string): string => {
  if (!rawName) return "TP. Hồ Chí Minh";
  const c = rawName.toLowerCase();
  if (c.includes("ho chi minh") || c.includes("hồ chí minh") || c.includes("saigon") || c.includes("sai gon")) return "TP. Hồ Chí Minh";
  if (c.includes("hanoi") || c.includes("ha noi") || c.includes("hà nội")) return "Hà Nội";
  if (c.includes("da nang") || c.includes("đà nẵng")) return "Đà Nẵng";
  if (c.includes("binh duong") || c.includes("bình dương")) return "Bình Dương";
  if (c.includes("dong nai") || c.includes("đồng nai")) return "Đồng Nai";
  if (c.includes("can tho") || c.includes("cần thơ")) return "Cần Thơ";
  if (c.includes("hai phong") || c.includes("hải phòng")) return "Hải Phòng";
  if (c.includes("khanh hoa") || c.includes("nha trang") || c.includes("khánh hòa")) return "Khánh Hòa";
  if (c.includes("thua thien hue") || c.includes("hue") || c.includes("huế")) return "Thừa Thiên Huế";
  if (c.includes("nghe an") || c.includes("vinh") || c.includes("nghệ an")) return "Nghệ An";
  if (c.includes("quang ninh") || c.includes("hạ long") || c.includes("quảng ninh")) return "Quảng Ninh";
  if (c.includes("lam dong") || c.includes("da lat") || c.includes("đà lạt") || c.includes("lâm đồng")) return "Lâm Đồng";
  if (c.includes("ba ria") || c.includes("vung tau") || c.includes("vũng tàu")) return "Bà Rịa - Vũng Tàu";
  return rawName.trim();
};

const getRealUserCity = async (): Promise<string> => {
  if (typeof window === "undefined") return "TP. Hồ Chí Minh";

  const STORAGE_KEY = "viora_user_city";
  try {
    const cached = sessionStorage.getItem(STORAGE_KEY);
    if (cached) return cached;
  } catch {}

  try {
    // 1. Gọi ipwho.is (nhẹ, nhanh, miễn phí, không cần key)
    const res = await fetch("https://ipwho.is/", { signal: AbortSignal.timeout(2500) });
    if (res.ok) {
      const data = await res.json();
      const rawCity = data.city || data.region || data.country || "TP. Hồ Chí Minh";
      const normalized = normalizeProvince(rawCity);
      try {
        sessionStorage.setItem(STORAGE_KEY, normalized);
      } catch {}
      return normalized;
    }
  } catch {}

  // 2. Fallback qua ipapi.co nếu ipwho bị chặn
  try {
    const res = await fetch("https://ipapi.co/json/", { signal: AbortSignal.timeout(2500) });
    if (res.ok) {
      const data = await res.json();
      const rawCity = data.city || data.region || "TP. Hồ Chí Minh";
      const normalized = normalizeProvince(rawCity);
      try {
        sessionStorage.setItem(STORAGE_KEY, normalized);
      } catch {}
      return normalized;
    }
  } catch {}

  return "TP. Hồ Chí Minh";
};

export const useAnalyticsTracker = () => {
  const pathname = usePathname();
  const trackedPathRef = useRef<string>("");

  useEffect(() => {
    // Không track các trang admin
    if (!pathname || pathname.startsWith("/admin")) {
      return;
    }

    // Nếu vừa track path này trong 3 giây thì bỏ qua
    if (trackedPathRef.current === pathname) {
      return;
    }
    trackedPathRef.current = pathname;

    // Lấy thông tin tracking thực tế
    const { visitorId, isReturning } = getOrCreateVisitorId();
    const deviceType = detectDevice();
    const browser = detectBrowser();
    const templateSlug = detectTemplateSlug(pathname);
    const referrer = typeof document !== "undefined" ? document.referrer : "";

    // Lấy thành phố thực tế và gửi event
    getRealUserCity().then((city) => {
      const payload = {
        visitorId,
        isReturning,
        path: pathname,
        templateSlug,
        deviceType,
        browser,
        referrer,
        city,
      };

      console.info("🚀 [Viora Analytics] Sending real track:", payload);
      sendTrackEvent(payload);
    });

    // Reset lại cờ sau 3 giây để cho phép track lại nếu user quay lại trang
    const resetTimer = setTimeout(() => {
      trackedPathRef.current = "";
    }, 3000);

    return () => clearTimeout(resetTimer);
  }, [pathname]);
};
