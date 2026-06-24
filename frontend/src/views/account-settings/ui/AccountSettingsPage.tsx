"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Save } from "lucide-react";

export function AccountSettingsPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Profile and Stats States
  const [profile, setProfile] = useState<any>(null);
  const [stats, setStats] = useState({
    weddingCount: 0,
    viewCount: 0,
    rsvpCount: 0,
    guestbookCount: 0,
  });

  // Loading, saving, error & success states
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Form inputs state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [emailNotification, setEmailNotification] = useState(true);
  const [showOnHomepage, setShowOnHomepage] = useState(true);

  // Authenticate user
  useEffect(() => {
    const savedRole = localStorage.getItem("role");

    if (
      !savedRole ||
      (savedRole !== "user" && savedRole !== "staff" && savedRole !== "admin")
    ) {
      localStorage.clear();
      router.push("/login");
      return;
    }

    setIsLoggedIn(true);
  }, [router]);

  // Fetch profile on logged in load
  useEffect(() => {
    if (!isLoggedIn) return;

    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/users/profile", {
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Không thể tải thông tin tài khoản.");
        }

        const json = await res.json();
        const userData = json.data.user;
        const userStats = json.data.stats;

        setProfile(userData);
        setStats(userStats);

        // Populate form inputs
        setName(userData.name);
        setPhone(userData.phone);
        setEmailNotification(userData.emailNotification);
        setShowOnHomepage(userData.showOnHomepage);
      } catch (err: any) {
        setError(err.message || "Đã xảy ra lỗi khi tải dữ liệu.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [isLoggedIn]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoggedIn) return;

    setSaving(true);
    setError(null);
    setSuccessMsg(null);

    try {
      const res = await fetch("http://localhost:8080/api/users/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name,
          phone,
          emailNotification,
          showOnHomepage,
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.message || "Cập nhật tài khoản thất bại.");
      }

      // Update local storage so Header avatar and details match
      localStorage.setItem("name", name);

      setSuccessMsg("Lưu thay đổi thành công!");
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err: any) {
      setError(err.message || "Có lỗi xảy ra khi cập nhật.");
    } finally {
      setSaving(false);
    }
  };

  const formatJoinedDate = (dateString: string) => {
    if (!dateString) return "—";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("vi-VN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch {
      return "—";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f0e0d] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-10 h-10 animate-spin text-[#db2777]" />
        <p className="text-sm font-medium text-slate-400 tracking-wide">
          Đang tải cài đặt tài khoản...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0e0d] text-slate-200 font-sans p-4 sm:p-6 md:p-8 pb-24 md:pb-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header section */}
        <div className="flex items-center justify-between border-b border-stone-800/80 pb-4">
          <h1
            className="text-2xl font-bold text-white tracking-tight"
            style={{ fontFamily: "'EB Garamond', serif" }}
          >
            Cài đặt
          </h1>
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors bg-transparent border-0 cursor-pointer"
          >
            <ArrowLeft size={14} /> Quay lại
          </button>
        </div>

        {/* Message Alert Banner */}
        {error && (
          <div className="bg-red-950/20 border border-red-800/40 text-red-400 text-xs px-4 py-3 rounded-xl flex items-center">
            ⚠️ {error}
          </div>
        )}
        {successMsg && (
          <div className="bg-green-950/20 border border-green-800/40 text-green-400 text-xs px-4 py-3 rounded-xl flex items-center">
            ✓ {successMsg}
          </div>
        )}

        {/* PROFILE SECTION CARD */}
        <form onSubmit={handleSave} className="space-y-6">
          <div className="bg-[#1c1917]/90 border border-[#292524] rounded-2xl p-5 sm:p-6 shadow-xl space-y-5">
            {/* Avatar & Stats Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-850 pb-5">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#db2777] to-red-500 flex items-center justify-center text-white font-extrabold text-lg shadow-md border-0 overflow-hidden">
                  {name ? name.charAt(0).toUpperCase() : "U"}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white truncate">
                    {name || profile?.username}
                  </h3>
                  <p className="text-2xs text-slate-400 truncate">
                    {profile?.email || profile?.username}
                  </p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="flex items-center gap-4 text-center select-none bg-stone-900/60 p-2.5 px-4 rounded-xl border border-stone-800/50">
                <div>
                  <span className="block text-sm font-bold text-[#db2777]">
                    {stats.weddingCount}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">
                    Thiệp
                  </span>
                </div>
                <div className="w-px h-6 bg-stone-800" />
                <div>
                  <span className="block text-sm font-bold text-[#3b82f6]">
                    {stats.viewCount}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">
                    Lượt xem
                  </span>
                </div>
                <div className="w-px h-6 bg-stone-800" />
                <div>
                  <span className="block text-sm font-bold text-[#10b981]">
                    {stats.guestbookCount}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">
                    Lời chúc
                  </span>
                </div>
                <div className="w-px h-6 bg-stone-800" />
                <div>
                  <span className="block text-sm font-bold text-[#f97316]">
                    {stats.rsvpCount}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">
                    RSVP
                  </span>
                </div>
              </div>
            </div>

            {/* Input Form Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-450 mb-1.5">
                  Họ và tên
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nhập họ và tên"
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-stone-900/90 border border-stone-800 focus:border-[#db2777] outline-none text-white transition-all font-medium"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-450 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  disabled
                  value={profile?.email || profile?.username || ""}
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-stone-900/40 border border-stone-800/80 text-stone-500 cursor-not-allowed outline-none font-medium"
                  title="Không thể chỉnh sửa Email của tài khoản này"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-450 mb-1.5">
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Nhập số điện thoại"
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-stone-900/90 border border-stone-800 focus:border-[#db2777] outline-none text-white transition-all font-medium"
                />
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={saving}
                className="px-5 py-2.5 bg-[#db2777] text-white rounded-xl text-xs font-semibold hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-65 cursor-pointer border-0 flex items-center justify-center gap-1.5"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Đang lưu...</span>
                  </>
                ) : (
                  <>
                    <Save size={14} />
                    <span>Lưu thay đổi</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* CUSTOMIZATION OPTIONS SECTION */}
          <div className="bg-[#1c1917]/90 border border-[#292524] rounded-2xl p-5 sm:p-6 shadow-xl space-y-5">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 border-b border-stone-800/50 pb-2">
              Tùy chỉnh
            </h4>

            <div className="space-y-4 divide-y divide-stone-800/50">
              {/* Email Notification Switch */}
              <div className="flex items-center justify-between pt-2">
                <div className="space-y-0.5">
                  <h5 className="text-xs font-semibold text-white">
                    Thông báo email
                  </h5>
                  <p className="text-[10px] text-slate-400">
                    Thanh toán, đánh giá và tin tức
                  </p>
                </div>

                {/* Custom Toggle Switch */}
                <button
                  type="button"
                  onClick={() => setEmailNotification(!emailNotification)}
                  className={`w-11 h-6 rounded-full p-1 transition-colors cursor-pointer border-0 outline-none flex items-center ${
                    emailNotification ? "bg-[#db2777]" : "bg-stone-850"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform ${
                      emailNotification ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Show on Homepage Switch */}
              <div className="flex items-center justify-between pt-4">
                <div className="space-y-0.5">
                  <h5 className="text-xs font-semibold text-white">
                    Hiển thị trên trang chủ
                  </h5>
                  <p className="text-[10px] text-slate-400">
                    Thiệp có thể được chọn hiển thị trên trang chủ
                  </p>
                </div>

                {/* Custom Toggle Switch */}
                <button
                  type="button"
                  onClick={() => setShowOnHomepage(!showOnHomepage)}
                  className={`w-11 h-6 rounded-full p-1 transition-colors cursor-pointer border-0 outline-none flex items-center ${
                    showOnHomepage ? "bg-[#db2777]" : "bg-stone-850"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform ${
                      showOnHomepage ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* ACCOUNT METADATA INFO SECTION */}
          <div className="bg-[#1c1917]/90 border border-[#292524] rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 border-b border-stone-800/50 pb-2">
              Tài khoản
            </h4>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-medium">
                  Loại tài khoản
                </span>
                <span className="text-white font-bold">
                  {(
                    {
                      user: "Khách hàng",
                      collaborator: "Cộng tác viên",
                      admin: "Quản trị viên",
                    } as any
                  )[profile?.accountType?.toLowerCase()] ||
                    profile?.accountType ||
                    "Khách hàng"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-medium">
                  Thành viên từ
                </span>
                <span className="text-white font-bold">
                  {formatJoinedDate(profile?.createdAt)}
                </span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
