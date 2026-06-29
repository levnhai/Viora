'use client';

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Heart, LogOut, Edit3, Users, BookOpen, Save, Loader2, Calendar, MapPin, CreditCard, Copy, Check, Plus, Trash2, UserPlus, Phone, Tag, Settings } from "lucide-react";
import { authService } from "@/features/auth/api/authService";
import { API_URL } from "@/shared/lib/config";

export function BuyerDashboardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const navigate = (path: string) => router.push(path);
  const [activeTab, setActiveTab] = useState<"guests" | "rsvp" | "guestbook">("guests");

  useEffect(() => {
    if (tabParam === "guests" || tabParam === "rsvp" || tabParam === "guestbook") {
      setActiveTab(tabParam);
    }
  }, [tabParam]);
  const [weddingSlug, setWeddingSlug] = useState<string | null>(null);
  
  // Data States
  const [weddingData, setWeddingData] = useState<any>(null);
  const [guestList, setGuestList] = useState<any[]>([]);
  const [rsvpList, setRsvpList] = useState<any[]>([]);
  const [guestbookList, setGuestbookList] = useState<any[]>([]);
  
  // Form State for Adding Guest
  const [newGuest, setNewGuest] = useState({ name: "", phone: "", relationship: "Bạn bè" });
  
  // Loading & Error States
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [guestSubmitting, setGuestSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Authentication Check
  useEffect(() => {
    const savedRole = localStorage.getItem("role");
    const savedSlug = localStorage.getItem("weddingSlug");

    if (!savedRole || (savedRole !== "user" && savedRole !== "staff" && savedRole !== "admin")) {
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
        credentials: "include"
      });
      if (!weddingRes.ok) throw new Error("Không thể tải thông tin thiệp cưới!");
      const weddingJson = await weddingRes.json();
      setWeddingData(weddingJson.data);

      // 2. Fetch Guests
      const guestRes = await fetch(`${API_URL}/api/weddings/${weddingSlug}/guests`, {
        credentials: "include"
      });
      if (guestRes.ok) {
        const guestJson = await guestRes.json();
        setGuestList(guestJson.data || []);
      }

      // 3. Fetch RSVPs
      const rsvpRes = await fetch(`${API_URL}/api/weddings/${weddingSlug}/rsvp`, {
        credentials: "include"
      });
      if (rsvpRes.ok) {
        const rsvpJson = await rsvpRes.json();
        setRsvpList(rsvpJson.data || []);
      }

      // 4. Fetch Guestbook
      const gbRes = await fetch(`${API_URL}/api/weddings/${weddingSlug}/guestbook`, {
        credentials: "include"
      });
      if (gbRes.ok) {
        const gbJson = await gbRes.json();
        setGuestbookList(gbJson.data || []);
      }
    } catch (err: any) {
      setError(err.message || "Đã xảy ra lỗi khi tải dữ liệu!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedRole = localStorage.getItem("role");
    if (weddingSlug) {
      setLoading(true);
      fetchData();
    } else if (savedRole) {
      setLoading(false);
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

  const handleUpdateWedding = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!weddingSlug) return;

    setSaving(true);
    setSuccessMsg(null);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/weddings/${weddingSlug}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(weddingData)
      });

      const resData = await response.json();
      if (!response.ok) {
        throw new Error(resData.message || "Cập nhật thất bại!");
      }

      setSuccessMsg("Cập nhật thông tin thiệp cưới thành công!");
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err: any) {
      setError(err.message || "Có lỗi xảy ra khi lưu!");
    } finally {
      setSaving(false);
    }
  };

  // Guest Operations
  const handleAddGuest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!weddingSlug || !newGuest.name.trim()) return;

    setGuestSubmitting(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/api/weddings/${weddingSlug}/guests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(newGuest)
      });

      const resData = await response.json();
      if (!response.ok) {
        throw new Error(resData.message || "Thêm khách mời thất bại!");
      }

      setSuccessMsg("Đã thêm khách mời thành công!");
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
    if (!window.confirm("Bạn có chắc chắn muốn xóa khách mời này khỏi danh sách?")) return;

    setError(null);
    try {
      const response = await fetch(`${API_URL}/api/weddings/${weddingSlug}/guests/${id}`, {
        method: "DELETE",
        credentials: "include"
      });

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
      const response = await fetch(`${API_URL}/api/weddings/${weddingSlug}/guests/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ rsvpStatus: newStatus })
      });

      if (response.ok) {
        fetchData(); // Reload data to sync with RSVP status changes
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

  // Helper change handlers for nested values
  const updateField = (path: string[], value: any) => {
    setWeddingData((prev: any) => {
      const copy = { ...prev };
      let current = copy;
      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]];
      }
      current[path[path.length - 1]] = value;
      return copy;
    });
  };

  const updateEventField = (index: number, field: string, value: any) => {
    setWeddingData((prev: any) => {
      const copy = { ...prev };
      const updatedEvents = [...copy.events];
      updatedEvents[index] = { ...updatedEvents[index], [field]: value };
      copy.events = updatedEvents;
      return copy;
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fdf6ef] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-10 h-10 animate-spin text-[#8b3a52]" />
        <p className="text-sm font-medium text-[#7a5c4f] tracking-wide">Đang tải trang quản lý...</p>
      </div>
    );
  }

  // Welcome Empty State for new buyers without a wedding yet
  if (!weddingSlug) {
    return (
      <div className="min-h-screen bg-[#faf5f0] flex flex-col font-sans pb-24 md:pb-0" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        {/* Header */}
        <header className="bg-white border-b border-[#c9828e]/15 sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#8b3a52] flex items-center justify-center">
                <Heart size={14} className="text-white" fill="currentColor" />
              </div>
              <span className="text-lg font-semibold text-[#2c1810]" style={{ fontFamily: "'EB Garamond', serif" }}>
                Viora Studio <span className="text-xs font-normal text-[#7a5c4f]/70">/ Dashboard</span>
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-xs text-[#7a5c4f] hidden sm:inline-block">
                Tài khoản: <span className="font-semibold">{localStorage.getItem("username")}</span>
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

        {/* Welcome Empty State Area */}
        <div className="flex-1 flex flex-col items-center justify-center p-8 max-w-lg mx-auto text-center space-y-6">
          <div className="w-16 h-16 rounded-3xl bg-[#8b3a52]/10 flex items-center justify-center mx-auto shadow-sm">
            <Heart size={28} className="text-[#8b3a52] animate-pulse" fill="currentColor" />
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold text-[#2c1810]" style={{ fontFamily: "'EB Garamond', serif" }}>
              Chào mừng bạn đến với Viora Wedding
            </h2>
            <p className="text-sm text-[#7a5c4f] leading-relaxed max-w-sm mx-auto">
              Bạn chưa tạo thiệp cưới trực tuyến nào. Hãy bắt đầu tạo một mẫu thiệp cưới thật lộng lẫy để chia sẻ niềm vui của bạn!
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

  // RSVP statistics
  const totalGuestsYes = rsvpList
    .filter(r => r.attend === "yes")
    .reduce((sum, r) => sum + (r.guests || 1), 0);
  
  // Guest List statistics
  const totalGuests = guestList.length;
  const confirmedGuests = guestList.filter(g => g.rsvpStatus === "confirmed").length;
  const declinedGuests = guestList.filter(g => g.rsvpStatus === "declined").length;
  const pendingGuests = guestList.filter(g => g.rsvpStatus === "pending").length;

  return (
    <div className="min-h-screen bg-[#faf5f0] flex flex-col" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Header */}
      <header className="bg-white border-b border-[#c9828e]/15 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#8b3a52] flex items-center justify-center">
              <Heart size={14} className="text-white" fill="currentColor" />
            </div>
            <span className="text-lg font-semibold text-[#2c1810]" style={{ fontFamily: "'EB Garamond', serif" }}>
              Viora Studio <span className="text-xs font-normal text-[#7a5c4f]/70">/ Dashboard</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs text-[#7a5c4f] hidden sm:inline-block">
              Tài khoản: <span className="font-semibold">{localStorage.getItem("username")}</span>
            </span>
            <a 
              href={`/w/${weddingSlug}`} 
              target="_blank" 
              rel="noreferrer"
              className="text-xs px-3 py-1.5 rounded-lg border border-[#c9828e]/30 text-[#8b3a52] hover:bg-[#8b3a52]/5 transition-colors no-underline font-medium"
            >
              Xem thiệp live
            </a>
            <button 
              onClick={handleLogout}
              className="text-xs text-[#7a5c4f] hover:text-red-600 transition-colors flex items-center gap-1.5 border-0 bg-transparent cursor-pointer font-medium"
            >
              <LogOut size={14} /> Đăng xuất
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8 pb-24 md:pb-8">
        
        {/* Navigation Sidebar */}
        <aside className="w-full md:w-64 shrink-0 hidden md:block">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-[#c9828e]/15 p-4 space-y-2">
            <button
              onClick={() => navigate(`/edit/${weddingSlug}`)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all border-0 cursor-pointer bg-transparent text-[#7a5c4f] hover:bg-[#8b3a52]/5"
            >
              <Edit3 size={16} /> Chỉnh sửa thiệp cưới
            </button>
            <button
              onClick={() => setActiveTab("guests")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all border-0 cursor-pointer ${
                activeTab === "guests"
                  ? "bg-[#8b3a52] text-white shadow-sm"
                  : "bg-transparent text-[#7a5c4f] hover:bg-[#8b3a52]/5"
              }`}
            >
              <Users size={16} /> Danh sách khách mời
              <span className={`ml-auto text-2xs px-2 py-0.5 rounded-full ${activeTab === "guests" ? "bg-white/20 text-white" : "bg-[#8b3a52]/10 text-[#8b3a52]"}`}>
                {guestList.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab("rsvp")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all border-0 cursor-pointer ${
                activeTab === "rsvp"
                  ? "bg-[#8b3a52] text-white shadow-sm"
                  : "bg-transparent text-[#7a5c4f] hover:bg-[#8b3a52]/5"
              }`}
            >
              <Users size={16} /> Phản hồi từ thiệp (RSVP)
              <span className={`ml-auto text-2xs px-2 py-0.5 rounded-full ${activeTab === "rsvp" ? "bg-white/20 text-white" : "bg-[#8b3a52]/10 text-[#8b3a52]"}`}>
                {rsvpList.length}
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
              <BookOpen size={16} /> Lời chúc (Lưu bút)
              <span className={`ml-auto text-2xs px-2 py-0.5 rounded-full ${activeTab === "guestbook" ? "bg-white/20 text-white" : "bg-[#8b3a52]/10 text-[#8b3a52]"}`}>
                {guestbookList.length}
              </span>
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
            <div className="bg-red-50 text-red-600 text-sm p-4 rounded-xl border border-red-200 mb-6 flex items-center gap-2 animate-fade-in">
              ⚠️ {error}
            </div>
          )}
          {successMsg && (
            <div className="bg-green-50 text-green-700 text-sm p-4 rounded-xl border border-green-200 mb-6 flex items-center gap-2 animate-fade-in">
              ✓ {successMsg}
            </div>
          )}

          {/* TAB 2: GUEST LIST MANAGEMENT */}
          {activeTab === "guests" && (
            <div className="space-y-6">
              
              {/* Statistics */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-[#c9828e]/15 shadow-2xs">
                  <p className="text-2xs uppercase tracking-widest text-[#7a5c4f] font-semibold mb-1">Tổng Số Khách Mời</p>
                  <h3 className="text-2xl font-bold text-[#2c1810]" style={{ fontFamily: "'EB Garamond', serif" }}>{totalGuests} khách</h3>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-[#c9828e]/15 shadow-2xs">
                  <p className="text-2xs uppercase tracking-widest text-green-700 font-semibold mb-1">Sẽ tham dự</p>
                  <h3 className="text-2xl font-bold text-green-600" style={{ fontFamily: "'EB Garamond', serif" }}>{confirmedGuests} khách</h3>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-[#c9828e]/15 shadow-2xs">
                  <p className="text-2xs uppercase tracking-widest text-red-700 font-semibold mb-1">Không tham dự</p>
                  <h3 className="text-2xl font-bold text-red-500" style={{ fontFamily: "'EB Garamond', serif" }}>{declinedGuests} khách</h3>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-[#c9828e]/15 shadow-2xs">
                  <p className="text-2xs uppercase tracking-widest text-orange-600 font-semibold mb-1">Chưa phản hồi</p>
                  <h3 className="text-2xl font-bold text-orange-500" style={{ fontFamily: "'EB Garamond', serif" }}>{pendingGuests} khách</h3>
                </div>
              </div>

              {/* Add Guest Form inline */}
              <div className="bg-white rounded-2xl border border-[#c9828e]/15 p-6">
                <h3 className="text-sm font-semibold text-[#2c1810] mb-4 flex items-center gap-1.5">
                  <UserPlus size={16} className="text-[#8b3a52]" /> Thêm khách mời mới
                </h3>
                <form onSubmit={handleAddGuest} className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
                  <div>
                    <label className="block text-2xs text-[#7a5c4f] mb-1 font-medium">Họ và tên *</label>
                    <input 
                      type="text" 
                      required 
                      value={newGuest.name}
                      onChange={(e) => setNewGuest({ ...newGuest, name: e.target.value })}
                      placeholder="Nguyễn Văn A"
                      className="w-full px-3 py-2 rounded-xl text-xs border border-[#c9828e]/20 outline-none focus:border-[#8b3a52] text-[#2c1810]"
                    />
                  </div>
                  <div>
                    <label className="block text-2xs text-[#7a5c4f] mb-1 font-medium">Số điện thoại</label>
                    <input 
                      type="tel" 
                      value={newGuest.phone}
                      onChange={(e) => setNewGuest({ ...newGuest, phone: e.target.value })}
                      placeholder="0901234567"
                      className="w-full px-3 py-2 rounded-xl text-xs border border-[#c9828e]/20 outline-none focus:border-[#8b3a52] text-[#2c1810]"
                    />
                  </div>
                  <div>
                    <label className="block text-2xs text-[#7a5c4f] mb-1 font-medium">Nhóm khách mời</label>
                    <select 
                      value={newGuest.relationship}
                      onChange={(e) => setNewGuest({ ...newGuest, relationship: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl text-xs border border-[#c9828e]/20 outline-none focus:border-[#8b3a52] text-[#2c1810]"
                    >
                      <option value="Bạn bè">Bạn bè</option>
                      <option value="Đồng nghiệp">Đồng nghiệp</option>
                      <option value="Họ hàng nhà trai">Họ hàng nhà trai</option>
                      <option value="Họ hàng nhà gái">Họ hàng nhà gái</option>
                      <option value="Khác">Khác</option>
                    </select>
                  </div>
                  <div>
                    <button 
                      type="submit" 
                      disabled={guestSubmitting}
                      className="w-full py-2 bg-[#8b3a52] text-white rounded-xl text-xs font-semibold hover:opacity-90 active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-1.5 border-0 cursor-pointer h-[34px]"
                    >
                      {guestSubmitting ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <>
                          <Plus size={14} /> Thêm khách
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>

              {/* Guest Table */}
              <div className="bg-white rounded-2xl border border-[#c9828e]/15 overflow-hidden">
                <div className="px-6 py-4 border-b border-[#c9828e]/10 flex items-center justify-between">
                  <h2 className="text-lg font-medium text-[#2c1810]" style={{ fontFamily: "'EB Garamond', serif" }}>Danh sách khách mời đã lập</h2>
                  <span className="text-xs text-[#7a5c4f]/70 italic">Link mời riêng biệt từng người</span>
                </div>

                {guestList.length === 0 ? (
                  <div className="text-center py-12 text-[#7a5c4f]/60 text-sm">
                    Danh sách đang trống. Bạn hãy thêm những khách mời đầu tiên ở phía trên!
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-[#faf5f0] border-b border-[#c9828e]/10 text-2xs uppercase tracking-wider text-[#7a5c4f] font-semibold">
                          <th className="px-6 py-3">Khách mời</th>
                          <th className="px-6 py-3"><Phone size={11} className="inline mr-1" />Số điện thoại</th>
                          <th className="px-6 py-3"><Tag size={11} className="inline mr-1" />Nhóm</th>
                          <th className="px-6 py-3 text-center">Trạng thái RSVP</th>
                          <th className="px-6 py-3">Link gửi thiệp mời</th>
                          <th className="px-6 py-3 text-center">Hành động</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#c9828e]/10 text-sm text-[#2c1810]">
                        {guestList.map((g: any) => (
                          <tr key={g._id} className="hover:bg-[#faf5f0]/30 transition-colors">
                            <td className="px-6 py-4 font-semibold">{g.name}</td>
                            <td className="px-6 py-4 text-xs font-mono">{g.phone || "—"}</td>
                            <td className="px-6 py-4">
                              <span className="inline-block px-2 py-0.5 rounded-md text-2xs bg-[#faf5f0] text-[#7a5c4f] border border-[#c9828e]/15">
                                {g.relationship}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <select 
                                value={g.rsvpStatus} 
                                onChange={(e) => handleUpdateGuestStatus(g._id, e.target.value)}
                                className={`text-2xs font-semibold px-2 py-1 rounded-full border outline-none cursor-pointer ${
                                  g.rsvpStatus === "confirmed" 
                                    ? "bg-green-50 text-green-700 border-green-200"
                                    : g.rsvpStatus === "declined"
                                      ? "bg-red-50 text-red-600 border-red-200"
                                      : "bg-slate-50 text-slate-500 border-slate-200"
                                }`}
                              >
                                <option value="pending">Chưa phản hồi</option>
                                <option value="confirmed">Đồng ý</option>
                                <option value="declined">Từ chối</option>
                              </select>
                            </td>
                            <td className="px-6 py-4">
                              <button 
                                onClick={() => handleCopyLink(g.name, g._id)}
                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-2xs bg-[#8b3a52]/5 text-[#8b3a52] hover:bg-[#8b3a52]/10 transition-colors border-0 cursor-pointer font-medium"
                              >
                                {copiedId === g._id ? (
                                  <>
                                    <Check size={11} className="text-green-600" />
                                    <span className="text-green-600">Đã copy!</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy size={11} />
                                    <span>Copy link mời</span>
                                  </>
                                )}
                              </button>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <button 
                                onClick={() => handleDeleteGuest(g._id)}
                                className="text-red-500 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50 transition-colors border-0 bg-transparent cursor-pointer"
                                title="Xóa khách mời"
                              >
                                <Trash2 size={14} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: RSVPS (FEEDBACK FROM WEB) */}
          {activeTab === "rsvp" && (
            <div className="space-y-6">
              {/* RSVP Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-[#c9828e]/15 flex items-center justify-between">
                  <div>
                    <p className="text-2xs uppercase tracking-widest text-[#7a5c4f] font-semibold mb-1">Tổng Số Phản Hồi</p>
                    <h3 className="text-2xl font-bold text-[#2c1810]" style={{ fontFamily: "'EB Garamond', serif" }}>{rsvpList.length} khách</h3>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                    <Users size={20} />
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#c9828e]/15 flex items-center justify-between">
                  <div>
                    <p className="text-2xs uppercase tracking-widest text-green-700 font-semibold mb-1">Có tham dự</p>
                    <h3 className="text-2xl font-bold text-green-600" style={{ fontFamily: "'EB Garamond', serif" }}>
                      {rsvpList.filter(r => r.attend === "yes").length} lượt <span className="text-sm font-normal text-[#7a5c4f]/70">({totalGuestsYes} người)</span>
                    </h3>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
                    ✓
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#c9828e]/15 flex items-center justify-between">
                  <div>
                    <p className="text-2xs uppercase tracking-widest text-red-700 font-semibold mb-1">Không tham dự</p>
                    <h3 className="text-2xl font-bold text-red-500" style={{ fontFamily: "'EB Garamond', serif" }}>{rsvpList.filter(r => r.attend === "no").length} lượt</h3>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-500">
                    ✗
                  </div>
                </div>
              </div>

              {/* RSVP Table */}
              <div className="bg-white rounded-2xl border border-[#c9828e]/15 overflow-hidden">
                <div className="px-6 py-4 border-b border-[#c9828e]/10 flex items-center justify-between">
                  <h2 className="text-lg font-medium text-[#2c1810]" style={{ fontFamily: "'EB Garamond', serif" }}>Danh sách khách mời phản hồi từ Web</h2>
                  <span className="text-xs text-[#7a5c4f]/70 font-mono">Real-time RSVP</span>
                </div>

                {rsvpList.length === 0 ? (
                  <div className="text-center py-12 text-[#7a5c4f]/60 text-sm">
                    Chưa có khách mời nào phản hồi trực tiếp qua form trên thiệp cưới.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-[#faf5f0] border-b border-[#c9828e]/10 text-2xs uppercase tracking-wider text-[#7a5c4f] font-semibold">
                          <th className="px-6 py-3">Họ Tên</th>
                          <th className="px-6 py-3">Tham Dự?</th>
                          <th className="px-6 py-3 text-center">Số Người đi cùng</th>
                          <th className="px-6 py-3">Lời nhắn của khách</th>
                          <th className="px-6 py-3">Ngày gửi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#c9828e]/10 text-sm text-[#2c1810]">
                        {rsvpList.map((rsvp: any) => (
                          <tr key={rsvp._id} className="hover:bg-[#faf5f0]/30 transition-colors">
                            <td className="px-6 py-4 font-medium">{rsvp.name}</td>
                            <td className="px-6 py-4">
                              {rsvp.attend === "yes" ? (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-2xs font-medium bg-green-50 text-green-700 border border-green-200">
                                  Có tham dự
                                </span>
                              ) : (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-2xs font-medium bg-red-50 text-red-600 border border-red-200">
                                  Bận / Không đi
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-4 text-center font-mono font-medium">
                              {rsvp.attend === "yes" ? rsvp.guests : 0}
                            </td>
                            <td className="px-6 py-4 max-w-xs truncate text-xs text-[#7a5c4f] italic" title={rsvp.message}>
                              {rsvp.message || "—"}
                            </td>
                            <td className="px-6 py-4 text-2xs text-[#7a5c4f]/70 font-mono">
                              {new Date(rsvp.createdAt).toLocaleString("vi-VN", { dateStyle: "short", timeStyle: "short" })}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: GUESTBOOK */}
          {activeTab === "guestbook" && (
            <div className="bg-white rounded-2xl border border-[#c9828e]/15 p-6 sm:p-8">
              <h2 className="text-xl font-medium text-[#2c1810] mb-6 border-b border-[#c9828e]/10 pb-4 flex items-center gap-2" style={{ fontFamily: "'EB Garamond', serif" }}>
                <BookOpen size={20} className="text-[#8b3a52]" /> Lời chúc đã nhận
              </h2>

              {guestbookList.length === 0 ? (
                <div className="text-center py-12 text-[#7a5c4f]/60 text-sm">
                  Chưa có lời chúc nào được gửi qua thiệp cưới.
                </div>
              ) : (
                <div className="space-y-4">
                  {guestbookList.map((msg: any) => (
                    <div 
                      key={msg._id} 
                      className="p-5 rounded-2xl bg-[#faf5f0]/40 border border-[#c9828e]/10 relative hover:border-[#8b3a52]/30 transition-all"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-sm text-[#2c1810]">{msg.name}</h4>
                        <span className="text-2xs text-[#7a5c4f]/50 font-mono">
                          {new Date(msg.createdAt).toLocaleString("vi-VN", { dateStyle: "short", timeStyle: "short" })}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed text-[#7a5c4f] whitespace-pre-wrap">{msg.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
