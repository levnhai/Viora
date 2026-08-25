"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { io } from "socket.io-client";
import { API_URL } from "@/shared/lib/config";
import { useAnalyticsTracker } from "./useAnalyticsTracker";

export function AnalyticsTracker() {
  const pathname = usePathname();
  useAnalyticsTracker();

  useEffect(() => {
    if (!pathname || pathname.startsWith("/admin")) return;
    const visitorId = localStorage.getItem("viora_vid");
    if (!visitorId) return;
    const socket = io(API_URL, { transports: ["websocket", "polling"], reconnectionAttempts: 5, reconnectionDelay: 2000 });
    socket.on("connect", () => socket.emit("identify-visitor", visitorId));
    return () => socket.disconnect();
  }, [pathname]);

  return null;
}