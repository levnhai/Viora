"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Heart, Loader2, Plus } from "lucide-react";

import { OverviewTab } from "./OverviewTab";
import { GuestsTab } from "./GuestsTab";
import { GuestbookTab } from "./GuestbookTab";

import { useBuyerDashboard } from "@/features/buyer-dashboard/model/useBuyerDashboard";
import { useGuestActions } from "@/features/guest-management/model/useGuestActions";
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

  const {
    weddingSlug,
    weddingData,
    guestList,
    rsvpList,
    guestbookList,
    loading,
    hasMounted,
    origin,
    handleLogout,
    refetch,
  } = useBuyerDashboard();

  const {
    guestSubmitting,
    error,
    successMsg,
    handleAddGuest,
    handleDeleteGuest,
    handleUpdateGuestStatus,
  } = useGuestActions(weddingSlug, refetch);

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
      <div className="min-h-screen bg-[#fdf6ef] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-10 h-10 animate-spin text-[#8b3a52]" />
        <p className="text-sm font-medium text-[#7a5c4f] tracking-wide">
          Đang tải trang quản lý...
        </p>
      </div>
    );
  }

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
              <span className="text-lg font-semibold text-[#2c1810]">
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
                Đăng xuất
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
            onClick={() => router.push("/create")}
            className="px-6 py-3.5 bg-[#8b3a52] text-white rounded-xl text-xs font-semibold hover:opacity-95 active:scale-[0.98] transition-all border-0 cursor-pointer flex items-center gap-2 mx-auto"
          >
            <Plus size={14} />
            <span>Tạo thiệp cưới đầu tiên</span>
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
      className="min-h-screen bg-[#faf5f0] flex flex-col"
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

      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8 pb-24 md:pb-8">
        <DashboardSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          guestListLength={guestList.length}
          guestbookListLength={guestbookList.length}
          weddingSlug={weddingSlug}
          navigate={router.push}
        />

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
            />
          )}
        </main>
      </div>
    </div>
  );
}
