import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { API_URL } from "@/shared/lib/config";
import { defaultWeddingData } from "@/views/buyer-dashboard/model/defaultData";
import { authService } from "@/features/auth/api/authService";

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

    if (
      !savedRole ||
      (savedRole !== "user" && savedRole !== "staff" && savedRole !== "admin")
    ) {
      localStorage.clear();
      router.push("/login");
      return;
    }

    setWeddingSlug(savedSlug || null);
  }, [router]);

  // Fetch initial data
  const fetchData = async () => {
    if (!weddingSlug) {
      setLoading(false);
      return;
    }
    
    try {
      // 1. Fetch wedding details
      const weddingRes = await fetch(`${API_URL}/api/weddings/${weddingSlug}`, {
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
        `${API_URL}/api/weddings/${weddingSlug}/guests`,
        { credentials: "include" }
      );
      if (guestRes.ok) {
        const guestJson = await guestRes.json();
        setGuestList(guestJson?.data || []);
      }

      // 3. Fetch RSVPs
      const rsvpRes = await fetch(
        `${API_URL}/api/weddings/${weddingSlug}/rsvp`,
        { credentials: "include" }
      );
      if (rsvpRes.ok) {
        const rsvpJson = await rsvpRes.json();
        setRsvpList(rsvpJson?.data || []);
      }

      // 4. Fetch Guestbook
      const gbRes = await fetch(
        `${API_URL}/api/weddings/${weddingSlug}/guestbook`,
        { credentials: "include" }
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
  };

  useEffect(() => {
    if (weddingSlug) {
      fetchData();
    } else if (hasMounted) {
      // If mounted but no slug (new user)
      setLoading(false);
    }
  }, [weddingSlug, hasMounted]);

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
