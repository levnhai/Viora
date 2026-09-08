import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { API_URL } from "@/shared/lib/config";
import { defaultWeddingData } from "@/views/public-pages";
import { authService } from "@/features/auth/api/authService";
import { io } from "socket.io-client";

export const useBuyerDashboard = () => {
  const router = useRouter();
  const [weddingSlug, setWeddingSlug] = useState<string | null>(null);
  
  // Data States
  const [weddingData, setWeddingData] = useState<any>(defaultWeddingData);
  const [guestList, setGuestList] = useState<any[]>([]);
  const [rsvpList, setRsvpList] = useState<any[]>([]);
  const [guestbookList, setGuestbookList] = useState<any[]>([]);
  
  // Loading States
  const [loading, setLoading] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);
  const [origin, setOrigin] = useState<string>("");

  useEffect(() => {
    setHasMounted(true);
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  // Authentication Check
  useEffect(() => {
    const savedRole = localStorage.getItem("role");
    const savedSlug = localStorage.getItem("weddingSlug");

    if (savedRole === "admin") {
      router.push("/admin");
      return;
    }

    if (!savedRole || (savedRole !== "user" && savedRole !== "staff")) {
      localStorage.clear();
      router.push("/login");
      return;
    }

    setWeddingSlug(savedSlug || null);
  }, [router]);

  // Fetch initial data
  const fetchData = useCallback(async () => {
    let currentSlug = weddingSlug;
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const authHeaders: Record<string, string> = {};
    if (token) {
      authHeaders["Authorization"] = `Bearer ${token}`;
    }

    // Nếu chưa có slug từ localStorage, tự động hỏi Backend thiệp cưới của user này
    if (!currentSlug) {
      try {
        const myWeddingRes = await fetch(`${API_URL}/api/weddings/my-wedding`, {
          headers: authHeaders,
          credentials: "include",
        });
        if (myWeddingRes.ok) {
          const myWeddingJson = await myWeddingRes.json();
          if (myWeddingJson?.data?.slug) {
            currentSlug = myWeddingJson.data.slug;
            localStorage.setItem("weddingSlug", currentSlug!);
            setWeddingSlug(currentSlug);
          }
        }
      } catch (e) {
        console.error("Lỗi lấy thiệp cưới cá nhân:", e);
      }
    }

    if (!currentSlug) {
      setLoading(false);
      return;
    }
    
    try {
      // 1. Fetch wedding details
      const weddingRes = await fetch(`${API_URL}/api/weddings/${currentSlug}`, {
        headers: authHeaders,
        credentials: "include",
      });
      if (weddingRes.ok) {
        const weddingJson = await weddingRes.json();
        if (weddingJson && weddingJson.data) {
          setWeddingData(weddingJson.data);
        }
      }

      // 2. Fetch Guests
      const guestRes = await fetch(
        `${API_URL}/api/weddings/${currentSlug}/guests`,
        { headers: authHeaders, credentials: "include" }
      );
      if (guestRes.ok) {
        const guestJson = await guestRes.json();
        setGuestList(guestJson?.data || []);
      }

      // 3. Fetch RSVPs
      const rsvpRes = await fetch(
        `${API_URL}/api/weddings/${currentSlug}/rsvp`,
        { headers: authHeaders, credentials: "include" }
      );
      if (rsvpRes.ok) {
        const rsvpJson = await rsvpRes.json();
        setRsvpList(rsvpJson?.data || []);
      }

      // 4. Fetch Guestbook
      const gbRes = await fetch(
        `${API_URL}/api/weddings/${currentSlug}/guestbook`,
        { headers: authHeaders, credentials: "include" }
      );
      if (gbRes.ok) {
        const gbJson = await gbRes.json();
        setGuestbookList(gbJson?.data || []);
      }
    } catch (err: any) {
      console.error("Lỗi fetch data ngầm:", err);
    } finally {
      setLoading(false);
    }
  }, [weddingSlug]);

  useEffect(() => {
    if (hasMounted) {
      fetchData();
    }
  }, [hasMounted, fetchData]);

  // Realtime Socket.io listener
  useEffect(() => {
    if (!weddingSlug) return;

    // Use environment variable backend api URL (e.g. http://localhost:8080) for Socket server endpoint
    const socketUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
    const socket = io(socketUrl, {
      withCredentials: true,
      transports: ["websocket", "polling"],
    });

    socket.on("connect", () => {
      console.log("WebSocket connected. Joining room:", weddingSlug);
      socket.emit("join-wedding", weddingSlug);
    });

    socket.on("guestbook-updated", () => {
      console.log("Realtime event: guestbook-updated. Refetching...");
      fetchData();
    });

    socket.on("guests-updated", () => {
      console.log("Realtime event: guests-updated. Refetching...");
      fetchData();
    });

    socket.on("disconnect", () => {
      console.log("WebSocket disconnected");
    });

    return () => {
      socket.disconnect();
    };
  }, [weddingSlug, fetchData]);

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.error("Lỗi đăng xuất:", err);
    }
    localStorage.clear();
    router.push("/login");
  };

  return {
    weddingSlug,
    weddingData,
    guestList,
    rsvpList,
    guestbookList,
    loading,
    hasMounted,
    origin,
    handleLogout,
    refetch: fetchData
  };
};
