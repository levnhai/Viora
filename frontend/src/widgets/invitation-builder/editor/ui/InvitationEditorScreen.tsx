"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Save,
  Eye,
  CheckCircle,
  Loader2,
  QrCode,
  Smartphone,
  Monitor,
  RotateCcw,
  Sparkles,
  ExternalLink,
  X,
  Download,
  Check,
} from "lucide-react";
import Link from "next/link";

import { InvitationEditorForm } from "./InvitationEditorForm";
import { InvitationPreview } from "@/widgets/invitation-builder";
import { PublishSuccessModal } from "@/widgets/invitation-builder";
import { useInvitationCreate } from "@/views/admin";
import { AdminThemeToggle } from "@/widgets/admin";
import { API_URL } from "@/shared/lib/config";

export function InvitationEditorScreen() {
  const {
    setStep,
    activeTemplate,
    setIsPublishSuccessModalOpen,
    basicInfo,
    events,
    publishSettings,
    setPublishSettings,
    giftInfo,
    galleryImages,
    deletedGalleryImages,
    timeline,
    isEditMode,
  } = useInvitationCreate();

  const [isPublishing, setIsPublishing] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isQrTestOpen, setIsQrTestOpen] = useState(false);
  const [customerEmail, setCustomerEmail] = useState("");
  const [slugInput, setSlugInput] = useState(publishSettings.urlSlug || "");
  const [source, setSource] = useState(publishSettings.source || "fb");
  const [publishError, setPublishError] = useState<string | null>(null);
  const [deviceMode, setDeviceMode] = useState<"mobile" | "desktop">("mobile");
  const [refreshKey, setRefreshKey] = useState(0);
  const [credentials, setCredentials] = useState<{
    email: string;
    password: string;
  } | null>(null);

  const triggerPublish = () => {
    setSlugInput(publishSettings.urlSlug || "");
    setPublishError(null);
    if (isEditMode) {
      handlePublish();
    } else {
      setIsEmailModalOpen(true);
    }
  };

  const handlePublish = async () => {
    try {
      setPublishError(null);
      setIsPublishing(true);

      const finalSlug = isEditMode
        ? publishSettings.urlSlug
        : slugInput.trim();
      setPublishSettings({ ...publishSettings, urlSlug: finalSlug });

      const formattedEvents = (events && events.length > 0 ? events : [
        {
          title: "LỄ TIỆC CƯỚI",
          time: basicInfo.weddingTime,
          date: basicInfo.weddingDate,
          locationName: basicInfo.locationName,
          address: basicInfo.address,
          mapUrl: basicInfo.mapLink,
        },
      ]).map((ev) => ({
        ...ev,
        title: ev.title || "LỄ TIỆC CƯỚI",
        time: ev.time || basicInfo.weddingTime || "11:00 AM",
        date: ev.date || basicInfo.weddingDate || "2026-12-31",
        locationName: ev.locationName || basicInfo.locationName || "TRUNG TÂM HỘI NGHỊ TIỆC CƯỚI NINH BÌNH LEGEND",
        address: ev.address || basicInfo.address || "177 Đ. Lê Thái Tổ, Khu Đô Thị Xuân Thành, Hoa Lư, Ninh Bình",
        mapUrl: ev.mapUrl || basicInfo.mapLink || "",
      }));

      const payload = {
        slug: finalSlug,
        templateId:
          (activeTemplate as any)?.id || (activeTemplate as any)?._id || 1,
        groomName: basicInfo.groomName,
        brideName: basicInfo.brideName,
        groomFatherName: basicInfo.groomFatherName,
        groomMotherName: basicInfo.groomMotherName,
        brideFatherName: basicInfo.brideFatherName,
        brideMotherName: basicInfo.brideMotherName,
        groomRank: basicInfo.groomRank,
        brideRank: basicInfo.brideRank,
        groomAddress: basicInfo.groomAddress,
        brideAddress: basicInfo.brideAddress,
        weddingDate: basicInfo.weddingDate,
        weddingTime: basicInfo.weddingTime,
        musicUrl: basicInfo.musicUrl,
        giftInfo: giftInfo,
        galleryImages: galleryImages,
        deletedGalleryImages: deletedGalleryImages,
        timeline: timeline,
        customerEmail: customerEmail || undefined,
        events: formattedEvents,
        source: source,
        templateConfig: {
          coverImage: basicInfo.coverImage,
        },
      };

      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("token") ||
            document.cookie
              .split("; ")
              .find((row) => row.startsWith("token="))
              ?.split("=")[1]
          : null;

      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const endpoint = isEditMode
        ? `${API_URL}/api/invitations/${publishSettings.urlSlug}`
        : `${API_URL}/api/invitations`;

      const res = await fetch(endpoint, {
        method: isEditMode ? "PUT" : "POST",
        headers,
        body: JSON.stringify(payload),
        credentials: "include",
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ message: "Lỗi lưu thiệp" }));
        throw new Error(err.message || "Không thể lưu thiệp");
      }

      const resData = await res.json();
      if (resData.credentials) {
        setCredentials(resData.credentials);
      }

      setIsEmailModalOpen(false);
      setIsPublishSuccessModalOpen(true);
    } catch (error: any) {
      console.error(error);
      const msg = error.message || "Có lỗi xảy ra khi xuất bản";
      if (isEmailModalOpen) {
        setPublishError(msg);
      } else {
        alert(msg);
      }
    } finally {
      setIsPublishing(false);
    }
  };

  const previewSlug = publishSettings.urlSlug || slugInput || "preview";
  const previewLiveUrl = `/invitation/${previewSlug}`;

  return (
    <div className="flex-1 w-full flex flex-col h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden text-slate-800 dark:text-slate-100 select-none">
      {/* Studio Header Bar */}
      <header className="h-16 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 px-4 sm:px-6 flex items-center justify-between shrink-0 z-20 transition-colors shadow-2xs">
        {/* Left Side: Back + Title & Template Badge */}
        <div className="flex items-center gap-3.5">
          <button
            onClick={() => {
              if (isEditMode) {
                window.location.href = "/admin/invitations";
              } else {
                setStep("select_template");
              }
            }}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-xl transition-all active:scale-95 border border-slate-200/60 dark:border-slate-700/60"
            title="Quay lại danh sách"
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-serif font-bold text-slate-900 dark:text-white text-base sm:text-lg tracking-tight">
                {basicInfo.groomName || basicInfo.brideName
                  ? `${basicInfo.groomName || "Chú rể"} & ${basicInfo.brideName || "Cô dâu"}`
                  : isEditMode
                  ? "Chỉnh sửa thiệp cưới"
                  : "Studio Tạo Thiệp Mới"}
              </h2>

              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/25">
                <Sparkles size={11} />
                {activeTemplate?.name || "Mẫu thiệp cưới"}
              </span>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <span className="inline-flex items-center gap-1 text-emerald-500 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                {isPublishing ? "Đang xử lý lưu..." : "Studio sẵn sàng"}
              </span>
              <span>•</span>
              <span className="font-mono text-slate-400">
                /{publishSettings.urlSlug || slugInput || "duong-dan-thiep"}
              </span>
            </div>
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Quick QR Test button */}
          <button
            onClick={() => setIsQrTestOpen(true)}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold transition-all active:scale-95"
            title="Xem mã QR quét thử trên điện thoại"
          >
            <QrCode size={14} className="text-amber-500" />
            <span>Quét QR Test</span>
          </button>

          <AdminThemeToggle />

          {/* Save Draft Button */}
          <button
            onClick={handlePublish}
            disabled={isPublishing}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all disabled:opacity-50 active:scale-95 shadow-2xs"
          >
            <Save size={14} className="text-slate-400" />
            <span className="hidden sm:inline">Lưu nháp</span>
          </button>

          {/* Publish CTA Button */}
          <button
            onClick={triggerPublish}
            disabled={isPublishing}
            className="flex items-center gap-1.5 px-4 sm:px-5 py-2 text-xs font-bold text-white bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 hover:opacity-95 rounded-xl shadow-md shadow-rose-500/25 transition-all disabled:opacity-70 disabled:cursor-not-allowed active:scale-95"
          >
            {isPublishing ? (
              <Loader2 size={15} className="animate-spin" />
            ) : (
              <CheckCircle size={15} />
            )}
            <span>{isPublishing ? "Đang xử lý..." : isEditMode ? "Lưu thay đổi" : "Xuất bản thiệp"}</span>
          </button>
        </div>
      </header>

      {/* Main Workspace (Split View) */}
      <main className="flex-1 flex overflow-hidden">
        {/* Form Panel (Left) */}
        <div className="w-[680px] xl:w-[740px] flex shrink-0 border-r border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 z-10 overflow-hidden">
          <InvitationEditorForm />
        </div>

        {/* Canvas Preview Panel (Right) */}
        <div className="flex-1 flex flex-col relative bg-slate-100/90 dark:bg-slate-950 overflow-hidden">
          {/* Canvas Sub-header */}
          <div className="h-11 border-b border-slate-200/80 dark:border-slate-800/80 flex items-center px-6 justify-between shrink-0 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md z-10">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                <Sparkles size={13} className="text-amber-500" />
                Live Canvas
              </span>
              <span className="text-[11px] text-slate-400 hidden lg:inline">
                (Tương tác trực tiếp trên màn hình)
              </span>
            </div>

            {/* Device Switcher & Controls */}
            <div className="flex items-center gap-1.5">
              <div className="flex items-center p-0.5 bg-slate-200/60 dark:bg-slate-800/60 rounded-xl">
                <button
                  onClick={() => setDeviceMode("mobile")}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    deviceMode === "mobile"
                      ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs"
                      : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                  }`}
                  title="Giao diện di động"
                >
                  <Smartphone size={13} />
                  <span>390px</span>
                </button>
                <button
                  onClick={() => setDeviceMode("desktop")}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    deviceMode === "desktop"
                      ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs"
                      : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                  }`}
                  title="Giao diện máy tính"
                >
                  <Monitor size={13} />
                  <span>Desktop</span>
                </button>
              </div>

              {/* Refresh preview */}
              <button
                onClick={() => setRefreshKey((k) => k + 1)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-colors"
                title="Làm mới xem trước"
              >
                <RotateCcw size={14} />
              </button>

              {/* Open in new tab */}
              {isEditMode && (
                <a
                  href={previewLiveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-500 hover:bg-indigo-500/10 transition-colors"
                  title="Mở trên tab mới"
                >
                  <ExternalLink size={14} />
                </a>
              )}
            </div>
          </div>

          {/* Canvas Body (Dot pattern background) */}
          <div
            key={refreshKey}
            className="flex-1 overflow-hidden flex items-center justify-center p-4 relative bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px]"
          >
            <InvitationPreview deviceMode={deviceMode} />
          </div>
        </div>
      </main>

      {/* Publish / Setup Modal */}
      {isEmailModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsEmailModalOpen(false)}
          />
          <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 rounded-3xl shadow-2xl w-full max-w-lg p-6 sm:p-7 flex flex-col animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-serif font-bold text-slate-900 dark:text-white">
                Xác nhận xuất bản thiệp cưới
              </h3>
              <button
                onClick={() => setIsEmailModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">
              Thiệp cưới sẽ được công khai với đường dẫn duy nhất dưới đây:
            </p>

            {publishError && (
              <div className="p-3 mb-4 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 rounded-2xl text-xs font-semibold flex items-center gap-2">
                <span>⚠️ {publishError}</span>
              </div>
            )}

            <div className="space-y-4 mb-6">
              {/* Slug Input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                  Mã đường dẫn thiệp (Slug) <span className="text-rose-500">*</span>
                </label>
                <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 focus-within:ring-2 focus-within:ring-amber-500/20 focus-within:border-amber-500 transition-colors">
                  <span className="text-xs text-slate-400 dark:text-slate-500 font-mono select-none">/invitation/</span>
                  <input
                    type="text"
                    placeholder="minh-quan-thu-ha"
                    className="w-full bg-transparent text-sm font-semibold text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none"
                    value={slugInput}
                    onChange={(e) => setSlugInput(e.target.value.toLowerCase().replace(/\s+/g, "-"))}
                  />
                </div>
              </div>

              {/* Source (Nguồn thiệp) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                  Kênh khách hàng (Nguồn) <span className="text-rose-500">*</span>
                </label>
                <select
                  value={source}
                  onChange={(e) => {
                    setSource(e.target.value);
                    setPublishSettings({ ...publishSettings, source: e.target.value });
                  }}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors"
                >
                  <option value="fb">📘 Facebook (FB)</option>
                  <option value="zalo">💬 Zalo</option>
                  <option value="ins">📸 Instagram (Ins)</option>
                  <option value="tiktok">🎵 TikTok</option>
                  <option value="demo">🧪 Bản Demo</option>
                  <option value="other">🌐 Nguồn khác</option>
                </select>
              </div>

              {/* Customer Email */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                  Email khách hàng (Tùy chọn)
                </label>
                <input
                  type="email"
                  placeholder="khachhang@gmail.com"
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                />
                <p className="text-[11px] text-slate-400 mt-1">Dùng để tự động tạo tài khoản quản lý thiệp cho dâu rể</p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setIsEmailModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                onClick={handlePublish}
                disabled={isPublishing || !slugInput.trim()}
                className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 shadow-md shadow-rose-500/20 hover:opacity-95 transition-all disabled:opacity-50"
              >
                {isPublishing ? <Loader2 size={14} className="animate-spin" /> : null}
                <span>{isPublishing ? "Đang xử lý..." : "Xác nhận & Xuất bản"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick QR Test Modal */}
      {isQrTestOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsQrTestOpen(false)}
          />
          <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-sm w-full shadow-2xl text-center space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <QrCode size={16} className="text-amber-500" />
                Quét Thử Trên Điện Thoại
              </h3>
              <button
                onClick={() => setIsQrTestOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-inner flex flex-col items-center justify-center">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(
                  typeof window !== "undefined"
                    ? `${window.location.origin}/invitation/${previewSlug}`
                    : `/invitation/${previewSlug}`
                )}`}
                alt="QR Code"
                className="w-48 h-48 rounded-lg"
              />
            </div>

            <div>
              <p className="font-serif font-bold text-base text-slate-900 dark:text-white">
                {basicInfo.groomName || "Chú rể"} & {basicInfo.brideName || "Cô dâu"}
              </p>
              <p className="text-xs text-slate-400 font-mono mt-0.5 truncate">
                /invitation/{previewSlug}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
                Dùng camera điện thoại để quét mã và trải nghiệm thiệp cưới trực tiếp.
              </p>
            </div>

            <button
              onClick={() => setIsQrTestOpen(false)}
              className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              Đóng
            </button>
          </div>
        </div>
      )}

      <PublishSuccessModal credentials={credentials} />
    </div>
  );
}
