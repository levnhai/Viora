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

    // Gửi tracking ngay lập tức (không dùng setTimeout để tránh bị StrictMode cancel)
    const { visitorId, isReturning } = getOrCreateVisitorId();
    const deviceType = detectDevice();
    const browser = detectBrowser();
    const templateSlug = detectTemplateSlug(pathname);
    const referrer = typeof document !== "undefined" ? document.referrer : "";

    const payload = {
      visitorId,
      isReturning,
      path: pathname,
      templateSlug,
      deviceType,
      browser,
      referrer,
    };

    console.info("🚀 [Viora Analytics] Sending track:", payload);
    sendTrackEvent(payload);

    // Reset lại cờ sau 3 giây để cho phép track lại nếu user quay lại trang
    const resetTimer = setTimeout(() => {
      trackedPathRef.current = "";
    }, 3000);

    return () => clearTimeout(resetTimer);
  }, [pathname]);
};
