"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Heart,
  LogOut,
  Users,
  BookOpen,
  Loader2,
  Edit3,
  Settings,
  Plus,
} from "lucide-react";
import { authService } from "@/features/auth/api/authService";
import { API_URL } from "@/shared/lib/config";
import * as XLSX from 'xlsx';

// Imports default data and sub components
import {
  defaultWeddingData,
  defaultGuestList,
  defaultGuestbookList,
} from "../model/defaultData";
import { OverviewTab } from "./OverviewTab";
import { GuestsTab } from "./GuestsTab";
import { GuestbookTab } from "./GuestbookTab";

const getAvatarColor = (name: string) => {
  const colors = [
    { bg: "bg-pink-100/80 text-pink-700" },
    { bg: "bg-blue-100/80 text-blue-700" },
    { bg: "bg-green-100/80 text-green-700" },
    { bg: "bg-amber-100/80 text-amber-700" },
    { bg: "bg-purple-100/80 text-purple-700" },
    { bg: "bg-teal-100/80 text-teal-700" },
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

const getInitials = (name: string) => {
  if (!name) return "";
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

export function BuyerDashboardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const actionParam = searchParams.get("action");
  const navigate = (path: string) => router.push(path);
  const [activeTab, setActiveTab] = useState<
    "overview" | "guests" | "guestbook" | "qr"
  >("overview");
  const [subTab, setSubTab] = useState<"list" | "rsvp">("list");

  useEffect(() => {
    if (
      tabParam === "overview" ||
      tabParam === "guests" ||
      tabParam === "guestbook" ||
      tabParam === "qr"
    ) {
      setActiveTab(tabParam);
    } else if (tabParam === "rsvp") {
      setActiveTab("guests");
      setSubTab("rsvp");
    }
  }, [tabParam]);

  useEffect(() => {
    if (actionParam === "add") {
      setIsAddModalOpen(true);
      const params = new URLSearchParams(window.location.search);
      params.delete("action");
      router.replace(`/dashboard?${params.toString()}`);
    }
  }, [actionParam, router]);

  const [weddingSlug, setWeddingSlug] = useState<string | null>(null);

  // Data States
  const [weddingData, setWeddingData] = useState<any>(defaultWeddingData);
  const [guestList, setGuestList] = useState<any[]>([]);
  const [rsvpList, setRsvpList] = useState<any[]>([]);
  const [guestbookList, setGuestbookList] = useState<any[]>([]);

  // Form State for Adding Guest
  const [newGuest, setNewGuest] = useState({
    name: "",
    phone: "",
    relationship: "Bạn bè",
  });

  // Hydration & Mounted States
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Loading & Error States
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [guestSubmitting, setGuestSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [origin, setOrigin] = useState<string>("");

  // Search, Filter & Menu states
  const [filterRsvp, setFilterRsvp] = useState<"all" | "confirmed" | "pending">(
    "all",
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [activeActionMenuId, setActiveActionMenuId] = useState<string | null>(
    null,
  );
  const [isMobileGuestMenuOpen, setIsMobileGuestMenuOpen] = useState(false);
  const [isMobileGuestbookMenuOpen, setIsMobileGuestbookMenuOpen] = useState(false);

  const exportGuestbookToExcel = () => {
    if (!guestbookList || guestbookList.length === 0) {
      alert("Không có lời chúc nào để xuất.");
      return;
    }
    
    const data = guestbookList.map((gb: any) => ({
      "Họ và tên": gb.name || "",
      "Lời chúc": gb.message || "",
      "Thời gian gửi": gb.createdAt ? new Date(gb.createdAt).toLocaleString('vi-VN') : ""
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    
    // Tùy chỉnh độ rộng các cột
    worksheet['!cols'] = [
      { wch: 25 }, // Họ và tên
      { wch: 60 }, // Lời chúc
      { wch: 25 }  // Thời gian
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Lời chúc");

    XLSX.writeFile(workbook, `Danh_Sach_Loi_Chuc_${weddingSlug || 'export'}.xlsx`);
    setIsMobileGuestbookMenuOpen(false);
  };

  const exportToExcel = () => {
    if (!guestList || guestList.length === 0) {
      alert("Không có khách mời nào để xuất.");
      return;
    }
    
    const baseUrl = window.location.origin;
    const data = guestList.map((g: any) => ({
      "Họ và tên": g.name || "",
      "Số điện thoại": g.phone || "",
      "Nhóm quan hệ": g.relationship || "",
      "Số người đi cùng": g.guests || 1,
      "Trạng thái": g.rsvpStatus === 'confirmed' ? 'Đã xác nhận' : (g.rsvpStatus === 'declined' ? 'Từ chối' : 'Chưa phản hồi'),
      "Link mời": `${baseUrl}/w/${weddingSlug}?to=${encodeURIComponent(g.name || "")}`
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    
    // Tùy chỉnh độ rộng các cột cho đẹp
    worksheet['!cols'] = [
      { wch: 25 }, // Họ và tên
      { wch: 15 }, // Số điện thoại
      { wch: 20 }, // Nhóm quan hệ
      { wch: 20 }, // Số người đi cùng
      { wch: 15 }, // Trạng thái
      { wch: 60 }  // Link mời
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Khách mời");

    XLSX.writeFile(workbook, `Danh_Sach_Khach_Moi_${weddingSlug || 'export'}.xlsx`);
    setIsMobileGuestMenuOpen(false);
  };

  useEffect(() => {
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
      navigate("/login");
      return;
    }

    setWeddingSlug(savedSlug || null);
  }, [navigate]);

  // Fetch initial data
  const fetchData = async () => {
    if (!weddingSlug) return;
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
        {
          credentials: "include",
        },
      );
      if (guestRes.ok) {
        const guestJson = await guestRes.json();
        setGuestList(guestJson?.data || []);
      }

      // 3. Fetch RSVPs
      const rsvpRes = await fetch(
        `${API_URL}/api/weddings/${weddingSlug}/rsvp`,
        {
          credentials: "include",
        },
      );
      if (rsvpRes.ok) {
        const rsvpJson = await rsvpRes.json();
        setRsvpList(rsvpJson?.data || []);
      }

      // 4. Fetch Guestbook
      const gbRes = await fetch(
        `${API_URL}/api/weddings/${weddingSlug}/guestbook`,
        {
          credentials: "include",
        },
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
    }
  }, [weddingSlug]);

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.error("Lỗi đăng xuất:", err);
    }
    localStorage.clear();
    navigate("/login");
  };

  // Guest Operations
  const handleAddGuest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!weddingSlug || !newGuest.name.trim()) return;

    setGuestSubmitting(true);
    setError(null);
    try {
      const names = newGuest.name.split('\n').map(n => n.trim()).filter(n => n);
      
      for (const name of names) {
        const guestPayload = { ...newGuest, name, relationship: "Bạn bè" };
        const response = await fetch(
          `${API_URL}/api/weddings/${weddingSlug}/guests`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(guestPayload),
          },
        );

        if (!response.ok) {
          const resData = await response.json();
          throw new Error(resData.message || `Thêm khách mời ${name} thất bại!`);
        }
      }

      setSuccessMsg(`Đã thêm ${names.length} khách mời thành công!`);
      setNewGuest({ name: "", phone: "", relationship: "Bạn bè" });
      fetchData(); // Reload list
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err: any) {
      setError(err.message || "Không thể thêm khách mời!");
    } finally {
      setGuestSubmitting(false);
    }
  };

  const handleDeleteGuest = async (id: string) => {
    if (!weddingSlug) return;
    if (
      !window.confirm("Bạn có chắc chắn muốn xóa khách mời này khỏi danh sách?")
    )
      return;

    setError(null);
    try {
      const response = await fetch(
        `${API_URL}/api/weddings/${weddingSlug}/guests/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      if (!response.ok) {
        const resData = await response.json();
        throw new Error(resData.message || "Xóa thất bại!");
      }

      setSuccessMsg("Đã xóa khách mời!");
      fetchData(); // Reload list
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err: any) {
      setError(err.message || "Không thể xóa khách mời!");
    }
  };

  const handleUpdateGuestStatus = async (id: string, newStatus: string) => {
    if (!weddingSlug) return;

    try {
      const response = await fetch(
        `${API_URL}/api/weddings/${weddingSlug}/guests/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ rsvpStatus: newStatus }),
        },
      );

      if (response.ok) {
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCopyLink = (name: string, id: string) => {
    const baseUrl = window.location.origin;
    const personalizedUrl = `${baseUrl}/w/${weddingSlug}?to=${encodeURIComponent(name)}`;
    navigator.clipboard.writeText(personalizedUrl);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!hasMounted || loading) {
    return (
      <div className="min-h-screen bg-[#fdf6ef] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-10 h-10 animate-spin text-[#8b3a52]" />
        <p className="text-sm font-medium text-[#7a5c4f] tracking-wide">
          Đang tải trang quản lý...
        </p>
      </div>
    );
  }

  // Welcome Empty State for new buyers without a wedding yet
  if (!weddingSlug) {
    return (
      <div
        className="min-h-screen bg-[#faf5f0] flex flex-col font-sans pb-24 md:pb-0"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <header className="bg-white border-b border-[#c9828e]/15 sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#8b3a52] flex items-center justify-center">
                <Heart size={14} className="text-white" fill="currentColor" />
              </div>
              <span
                className="text-lg font-semibold text-[#2c1810]"
                style={{ fontFamily: "'EB Garamond', serif" }}
              >
                Viora Studio{" "}
                <span className="text-xs font-normal text-[#7a5c4f]/70">
                  / Dashboard
                </span>
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-xs text-[#7a5c4f] hidden sm:inline-block">
                Tài khoản:{" "}
                <span className="font-semibold">
                  {localStorage.getItem("username")}
                </span>
              </span>
              <button
                onClick={handleLogout}
                className="text-xs text-[#7a5c4f] hover:text-red-600 transition-colors flex items-center gap-1.5 border-0 bg-transparent cursor-pointer font-medium"
              >
                <LogOut size={14} /> Đăng xuất
              </button>
            </div>
          </div>
        </header>

        <div className="flex-1 flex flex-col items-center justify-center p-8 max-w-lg mx-auto text-center space-y-6">
          <div className="w-16 h-16 rounded-3xl bg-[#8b3a52]/10 flex items-center justify-center mx-auto shadow-sm">
            <Heart
              size={28}
              className="text-[#8b3a52] animate-pulse"
              fill="currentColor"
            />
          </div>
          <div className="space-y-2">
            <h2
              className="text-3xl font-semibold text-[#2c1810]"
              style={{ fontFamily: "'EB Garamond', serif" }}
            >
              Chào mừng bạn đến với Viora Wedding
            </h2>
            <p className="text-sm text-[#7a5c4f] leading-relaxed max-w-sm mx-auto">
              Bạn chưa tạo thiệp cưới trực tuyến nào. Hãy bắt đầu tạo một mẫu
              thiệp cưới thật lộng lẫy để chia sẻ niềm vui của bạn!
            </p>
          </div>
          <button
            onClick={() => navigate("/create")}
            className="px-6 py-3.5 bg-[#8b3a52] text-white rounded-xl text-xs font-semibold hover:opacity-95 active:scale-[0.98] transition-all border-0 shadow-md shadow-pink-900/10 cursor-pointer flex items-center gap-2 mx-auto font-sans"
          >
            <Plus size={14} />
            <span>Tạo thiệp cưới đầu tiên</span>
          </button>
        </div>
      </div>
    );
  }

  // Guest List statistics
  const totalGuests = guestList.length;
  const confirmedGuests = guestList.filter(
    (g) => g.rsvpStatus === "confirmed",
  ).length;
  const declinedGuests = guestList.filter(
    (g) => g.rsvpStatus === "declined",
  ).length;
  const pendingGuests = guestList.filter(
    (g) => g.rsvpStatus === "pending",
  ).length;

  const filteredGuestList = guestList.filter((g) => {
    if (filterRsvp === "confirmed" && g.rsvpStatus !== "confirmed")
      return false;
    if (filterRsvp === "pending" && g.rsvpStatus === "confirmed") return false;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      const matchName = g.name?.toLowerCase().includes(query);
      const matchPhone = g.phone?.includes(query);
      return matchName || matchPhone;
    }

    return true;
  });

  return (
    <div
      className="min-h-screen bg-[#faf5f0] flex flex-col"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Header Desktop (hidden md:block) */}
      <header className="bg-white border-b border-[#c9828e]/15 sticky top-0 z-30 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <img
            src="/icon.svg"
            alt="Viora Logo"
            className="h-10 w-auto select-none font-sans"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/dashboard")}
          />

          <div className="flex items-center gap-4">
            <span className="text-xs text-[#7a5c4f] hidden sm:inline-block">
              Tài khoản:{" "}
              <span className="font-semibold">
                {localStorage.getItem("username")}
              </span>
            </span>
            <a
              href={`/w/${weddingSlug}`}
              target="_blank"
              rel="noreferrer"
              className="text-xs px-3 py-1.5 rounded-lg border border-[#c9828e]/30 text-[#8b3a52] hover:bg-[#8b3a52]/5 transition-colors no-underline font-medium font-sans"
            >
              Xem thiệp live
            </a>
            <button
              onClick={handleLogout}
              className="text-xs text-[#7a5c4f] hover:text-red-600 transition-colors flex items-center gap-1.5 border-0 bg-transparent cursor-pointer font-medium font-sans"
            >
              <LogOut size={14} /> Đăng xuất
            </button>
          </div>
        </div>
      </header>

      {/* Header Mobile (block md:hidden) */}
      <header className="border-b border-stone-100 top-2 z-30 block md:hidden">
        <div className="flex items-center justify-between">
          {activeTab === "overview" && (
            <div className="flex item-center justify-between border-b w-full px-3">
              <div className="flex items-center justify-center">
                <img
                  src="/icon.svg"
                  alt="Viora Logo"
                  className="h-18 w-auto select-none"
                />
                <div>
                  <h3 className="text-lg font-extrabold text-pink-500 font-sans">
                    VIORA
                  </h3>
                </div>
              </div>
              <div className="relative flex item-center">
                <button className="flex p-1.5 text-stone-600 hover:bg-stone-100 rounded-full border-0 bg-transparent cursor-pointer relative">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white" />
                </button>
              </div>
            </div>
          )}

          {activeTab === "guests" && (
            <>
              <button
                onClick={() => setActiveTab("overview")}
                className="p-1 hover:bg-stone-100 rounded-full border-0 bg-transparent cursor-pointer flex items-center justify-center text-stone-600"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <span className="text-base font-bold text-stone-900 font-sans">
                Khách mời
              </span>
              <div className="relative">
                <button 
                  onClick={() => setIsMobileGuestMenuOpen(!isMobileGuestMenuOpen)}
                  className="p-1 hover:bg-stone-100 rounded-full border-0 bg-transparent cursor-pointer flex items-center justify-center text-stone-600"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                    />
                  </svg>
                </button>
                {isMobileGuestMenuOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-40"
                      onClick={() => setIsMobileGuestMenuOpen(false)}
                    />
                    <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-xl shadow-lg border border-stone-100 py-1.5 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100 origin-top-right">
                      <button
                        onClick={exportToExcel}
                        className="w-full px-4 py-2.5 text-xs text-left hover:bg-stone-50 border-0 bg-transparent cursor-pointer text-stone-700 font-medium flex items-center gap-2"
                      >
                        <svg className="w-4 h-4 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                        Xuất file Excel
                      </button>
                    </div>
                  </>
                )}
              </div>
            </>
          )}

          {activeTab === "guestbook" && (
            <>
              <button
                onClick={() => setActiveTab("overview")}
                className="p-1 hover:bg-stone-100 rounded-full border-0 bg-transparent cursor-pointer flex items-center justify-center text-stone-600"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <span className="text-base font-bold text-stone-900 font-sans">
                Lời chúc
              </span>
              <div className="relative">
                <button 
                  onClick={() => setIsMobileGuestbookMenuOpen(!isMobileGuestbookMenuOpen)}
                  className="p-1 hover:bg-stone-100 rounded-full border-0 bg-transparent cursor-pointer flex items-center justify-center text-stone-600"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                    />
                  </svg>
                </button>
                {isMobileGuestbookMenuOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-40"
                      onClick={() => setIsMobileGuestbookMenuOpen(false)}
                    />
                    <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-xl shadow-lg border border-stone-100 py-1.5 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100 origin-top-right">
                      <button
                        onClick={exportGuestbookToExcel}
                        className="w-full px-4 py-2.5 text-xs text-left hover:bg-stone-50 border-0 bg-transparent cursor-pointer text-stone-700 font-medium flex items-center gap-2"
                      >
                        <svg className="w-4 h-4 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                        Xuất file Excel
                      </button>
                    </div>
                  </>
                )}
              </div>
            </>
          )}

          {activeTab === "qr" && (
            <>
              <button
                onClick={() => setActiveTab("overview")}
                className="p-1 hover:bg-stone-100 rounded-full border-0 bg-transparent cursor-pointer flex items-center justify-center text-stone-600"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <span className="text-base font-bold text-stone-900 font-sans">
                QR mừng cưới
              </span>
              <div className="w-7 h-7" />
            </>
          )}
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8 pb-24 md:pb-8">
        {/* Navigation Sidebar */}
        <aside className="w-full md:w-64 shrink-0 hidden md:block">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-[#c9828e]/15 p-4 space-y-2">
            <button
              onClick={() => setActiveTab("overview")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all border-0 cursor-pointer ${
                activeTab === "overview"
                  ? "bg-[#8b3a52] text-white shadow-sm"
                  : "bg-transparent text-[#7a5c4f] hover:bg-[#8b3a52]/5"
              }`}
            >
              <Heart
                size={16}
                fill={activeTab === "overview" ? "currentColor" : "none"}
              />{" "}
              Tổng quan
            </button>
            <button
              onClick={() => setActiveTab("guests")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all border-0 cursor-pointer ${
                activeTab === "guests"
                  ? "bg-[#8b3a52] text-white shadow-sm"
                  : "bg-transparent text-[#7a5c4f] hover:bg-[#8b3a52]/5"
              }`}
            >
              <Users size={16} /> Khách mời
              <span
                className={`ml-auto text-2xs px-2 py-0.5 rounded-full ${activeTab === "guests" ? "bg-white/20 text-white" : "bg-[#8b3a52]/10 text-[#8b3a52]"}`}
              >
                {guestList.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab("guestbook")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all border-0 cursor-pointer ${
                activeTab === "guestbook"
                  ? "bg-[#8b3a52] text-white shadow-sm"
                  : "bg-transparent text-[#7a5c4f] hover:bg-[#8b3a52]/5"
              }`}
            >
              <BookOpen size={16} /> Lời chúc
              <span
                className={`ml-auto text-2xs px-2 py-0.5 rounded-full ${activeTab === "guestbook" ? "bg-white/20 text-white" : "bg-[#8b3a52]/10 text-[#8b3a52]"}`}
              >
                {guestbookList.length}
              </span>
            </button>
            <hr className="border-[#c9828e]/15 my-2" />
            <button
              onClick={() => navigate(`/edit/${weddingSlug}`)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all border-0 cursor-pointer bg-transparent text-[#7a5c4f] hover:bg-[#8b3a52]/5"
            >
              <Edit3 size={16} /> Chỉnh sửa thiệp cưới
            </button>
            <button
              onClick={() => navigate("/account")}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all border-0 cursor-pointer bg-transparent text-[#7a5c4f] hover:bg-[#8b3a52]/5"
            >
              <Settings size={16} /> Cài đặt tài khoản
            </button>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1">
          {error && (
            <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-xl text-xs border border-red-200">
              {error}
            </div>
          )}
          {successMsg && (
            <div className="mb-4 p-4 bg-green-50 text-green-700 rounded-xl text-xs border border-green-200">
              {successMsg}
            </div>
          )}

          {activeTab === "overview" && weddingData && (
            <OverviewTab
              weddingData={weddingData}
              confirmedGuests={confirmedGuests}
              declinedGuests={declinedGuests}
              pendingGuests={pendingGuests}
              totalGuests={totalGuests}
              guestList={guestList}
              guestbookList={guestbookList}
              origin={origin}
              weddingSlug={weddingSlug}
              copiedId={copiedId}
              setCopiedId={setCopiedId}
              setActiveTab={setActiveTab}
              setSubTab={setSubTab}
              navigate={navigate}
            />
          )}

          {activeTab === "guests" && (
            <GuestsTab
              guestList={guestList}
              filteredGuestList={filteredGuestList}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              filterRsvp={filterRsvp}
              setFilterRsvp={setFilterRsvp}
              totalGuests={totalGuests}
              confirmedGuests={confirmedGuests}
              pendingGuests={pendingGuests}
              declinedGuests={declinedGuests}
              copiedId={copiedId}
              handleCopyLink={handleCopyLink}
              activeActionMenuId={activeActionMenuId}
              setActiveActionMenuId={setActiveActionMenuId}
              handleUpdateGuestStatus={handleUpdateGuestStatus}
              handleDeleteGuest={handleDeleteGuest}
              isAddModalOpen={isAddModalOpen}
              setIsAddModalOpen={setIsAddModalOpen}
              newGuest={newGuest}
              setNewGuest={setNewGuest}
              handleAddGuest={handleAddGuest}
              guestSubmitting={guestSubmitting}
              getAvatarColor={getAvatarColor}
              getInitials={getInitials}
              weddingSlug={weddingSlug}
            />
          )}

          {activeTab === "guestbook" && (
            <GuestbookTab
              guestbookList={guestbookList}
              getAvatarColor={getAvatarColor}
              getInitials={getInitials}
            />
          )}
        </main>
      </div>
    </div>
  );
}
