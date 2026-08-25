import { API_URL } from "@/shared/lib/config";
import { AnalyticsOverviewData, TrackEventPayload } from "../model/types";

const getApiBase = (): string => API_URL || (typeof window === "undefined" ? "http://localhost:8080" : "");

export const sendTrackEvent = async (payload: TrackEventPayload): Promise<void> => {
  try {
    await fetch(`${getApiBase()}/api/analytics/track`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload), keepalive: true });
  } catch (err) {
    console.debug("Analytics track error:", err);
  }
};

const getAuthHeaders = (): Record<string, string> => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const fetchAnalyticsOverview = async (range: "today" | "7days" | "30days" | "year" = "7days"): Promise<AnalyticsOverviewData | null> => {
  try {
    const res = await fetch(`${getApiBase()}/api/analytics/overview?range=${range}`, { credentials: "include", headers: getAuthHeaders() });
    if (!res.ok) throw new Error(`Failed to fetch analytics: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("fetchAnalyticsOverview error:", err);
    return null;
  }
};

export const fetchRealtimeOnline = async (): Promise<number> => {
  try {
    const res = await fetch(`${getApiBase()}/api/analytics/realtime`, { credentials: "include", headers: getAuthHeaders() });
    return res.ok ? (await res.json()).onlineUsers || 0 : 0;
  } catch {
    return 0;
  }
};