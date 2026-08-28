"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Heart, Loader2, Plus, Key, ChevronDown, LogOut } from "lucide-react";
import { toast } from "sonner";

import { OverviewTab } from "./OverviewTab";
import { GuestsTab } from "./GuestsTab";
import { GuestbookTab } from "./GuestbookTab";
import { SettingTab } from "./SettingTab";

import { useBuyerDashboard } from "@/features/buyer-dashboard/model/useBuyerDashboard";
import { useGuestActions } from "@/features/guest-management/model/useGuestActions";
import { useGuestbookActions } from "@/features/guestbook-management/model/useGuestbookActions";
import {
  exportGuestsToExcel,
  exportGuestbookToExcel,
} from "@/shared/lib/utils/excel";
import { getInitials } from "@/shared/lib/utils/string";
import { getAvatarColor } from "@/shared/lib/utils/color";

import { DashboardSidebar } from "@/widgets/buyer-dashboard/ui/DashboardSidebar";
import { DashboardHeader } from "@/widgets/buyer-dashboard/ui/DashboardHeader";

export function BuyerDashboardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const actionParam = searchParams.get("action");

  const [activeTab, setActiveTab] = useState<
    "overview" | "guests" | "guestbook" | "setting" | "qr"
  >("overview");
  const [subTab, setSubTab] = useState<"list" | "rsvp">("list");
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUsername(localStorage.getItem("username"));
    }
  }, []);

  const {
    weddingSlug,
    weddingData,
    guestList,
    guestbookList,
    loading,
    hasMounted,
    origin,
    handleLogout,
    refetch,
  } = useBuyerDashboard();

  const {
    guestSubmitting,
    handleAddGuest,
    handleDeleteGuest,
    handleUpdateGuestStatus,
  } = useGuestActions(weddingSlug, refetch);

  const { handleDeleteGuestbook } = useGuestbookActions(weddingSlug, refetch);

  // Form State for Adding Guest
  const [newGuest, setNewGuest] = useState({
    name: "",
    phone: "",
    relationship: "Bạn bè",
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [activeActionMenuId, setActiveActionMenuId] = useState<string | null>(
    null,
  );
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterRsvp, setFilterRsvp] = useState<"all" | "confirmed" | "pending">(
    "all",
  );

  useEffect(() => {
    if (
      tabParam === "overview" ||
      tabParam === "guests" ||
      tabParam === "guestbook" ||
      tabParam === "setting" ||
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

  const handleCopyLink = (name: string, id: string) => {
    const baseUrl = window.location.origin;
    const personalizedUrl = `${baseUrl}/w/${weddingSlug}?to=${encodeURIComponent(name)}`;
    navigator.clipboard.writeText(personalizedUrl);
    setCopiedId(id);
    toast.success(`Đã sao chép link mời cho "${name}" thành công!`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExportGuests = () => exportGuestsToExcel(guestList, weddingSlug);
  const handleExportGuestbook = () =>
    exportGuestbookToExcel(guestbookList, weddingSlug);

  const onAddGuestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await handleAddGuest(newGuest);
    if (success) {
      setNewGuest({ name: "", phone: "", relationship: "Bạn bè" });
      setIsAddModalOpen(false);
    }
  };

  if (!hasMounted || loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-10 h-10 animate-spin text-[#1b365d]" />
        <p className="text-sm font-medium text-slate-500 tracking-wide">
          Đang tải trang quản lý...
        </p>
      </div>
    );
  }

  if (!weddingSlug) {
    return (
      <div
        className="min-h-screen bg-slate-50 flex flex-col font-sans pb-24 md:pb-0"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <header className="bg-white border-b border-slate-100 sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div
              className="flex items-center gap-3 cursor-pointer select-none"
              onClick={() => router.push("/dashboard")}
            >
              <div className="">
                <img src="/icon.svg" alt="Viora Logo" className="h-6 w-auto" />
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-lg font-black text-slate-800 tracking-wider font-sans uppercase">
                  2H
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {/* User Avatar Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-50 border-0 bg-transparent cursor-pointer transition-all focus:outline-none"
                >
                  <div className="w-8 h-8 rounded-full bg-[#1b365d] text-white flex items-center justify-center text-xs font-bold font-mono tracking-wider shadow-2xs">
                    {getInitials(username || "")}
                  </div>
                  <ChevronDown size={14} className="text-slate-450" />
                </button>

                {isUserMenuOpen && (
                  <>
                    {/* Overlay to close menu */}
                    <div
                      className="fixed inset-0 z-40 cursor-default"
                      onClick={() => setIsUserMenuOpen(false)}
                    />
                    {/* Dropdown Menu */}
                    <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-100 py-2.5 z-50 animate-in fade-in zoom-in-95 duration-100 origin-top-right">
                      {/* User Info Section */}
                      <div className="px-4 py-2 border-b border-slate-100 mb-2">
                        <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                          Tài khoản
                        </p>
                        <p className="text-sm font-bold text-slate-800 truncate mt-0.5">
                          {username || "Người dùng"}
                        </p>
                      </div>

                      {/* Menu Items */}
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          router.push("/account");
                        }}
                        className="w-full px-4 py-2 text-xs text-left hover:bg-slate-50 border-0 bg-transparent cursor-pointer text-slate-700 font-medium flex items-center gap-2.5 transition-colors"
                      >
                        <Key size={14} className="text-slate-400" />
                        Đổi mật khẩu
                      </button>

                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          handleLogout();
                        }}  
                        className="w-full px-4 py-2 text-xs text-left hover:bg-red-50 hover:text-red-600 border-0 bg-transparent cursor-pointer text-slate-700 font-medium flex items-center gap-2.5 transition-colors"
                      >
                        <LogOut size={14} className="text-slate-400" />
                        Đăng xuất
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 flex flex-col items-center justify-center p-8 max-w-lg mx-auto text-center space-y-6">
          <div className="w-16 h-16 rounded-3xl bg-[#c6925c]/10 flex items-center justify-center mx-auto shadow-sm">
            <Heart
              size={28}
              className="text-[#c6925c] animate-pulse"
              fill="currentColor"
            />
          </div>
          <div className="space-y-2">
            <h2
              className="text-3xl font-semibold text-slate-800"
              style={{ fontFamily: "'EB Garamond', serif" }}
            >
              Chào mừng bạn đến với 2H Wedding
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed max-w-sm mx-auto">
              Bạn chưa tạo thiệp cưới trực tuyến nào. Hãy bắt đầu tạo một mẫu
              thiệp cưới thật lộng lẫy để chia sẻ niềm vui của bạn!
            </p>
          </div>
          <button
            onClick={() => router.push("/templates")}
            className="px-6 py-3.5 bg-[#1b365d] text-white rounded-xl text-xs font-semibold hover:opacity-95 active:scale-[0.98] transition-all border-0 cursor-pointer flex items-center gap-2 mx-auto"
          >
            <Plus size={14} />
            <span>Xem mẫu thiệp &amp; Đăng ký</span>
          </button>
        </div>
      </div>
    );
  }

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
      return g.name?.toLowerCase().includes(query) || g.phone?.includes(query);
    }
    return true;
  });

  return (
    <div
      className="buyer-dashboard min-h-screen bg-slate-50 flex flex-col"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <DashboardHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        weddingSlug={weddingSlug}
        username={localStorage.getItem("username")}
        navigate={router.push}
        handleLogout={handleLogout}
        onExportGuests={handleExportGuests}
        onExportGuestbook={handleExportGuestbook}
      />

      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8 flex flex-col md:flex-row gap-5 lg:gap-8 pb-24 md:pb-8">
        <DashboardSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          guestListLength={guestList.length}
          guestbookListLength={guestbookList.length}
          weddingSlug={weddingSlug}
          navigate={router.push}
        />

        <main className="buyer-dashboard__content flex-1 min-w-0">
          {activeTab === "overview" && (
            <OverviewTab
              weddingData={weddingData}
              confirmedGuests={confirmedGuests}
              totalGuests={guestList.length}
              guestList={guestList}
              guestbookList={guestbookList}
              origin={origin}
              weddingSlug={weddingSlug}
              setActiveTab={setActiveTab}
              setSubTab={setSubTab}
              navigate={router.push}
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
              handleAddGuest={onAddGuestSubmit}
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
              onDeleteGuestbook={handleDeleteGuestbook}
            />
          )}

          {activeTab === "setting" && (
            <SettingTab
              weddingData={weddingData}
              weddingSlug={weddingSlug}
              refetch={refetch}
            />
          )}
        </main>
      </div>
    </div>
  );
}
