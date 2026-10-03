"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Eye,
  Edit3,
  Copy,
  Check,
  QrCode,
  Calendar,
  Clock,
  Sparkles,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  X,
  Download,
} from "lucide-react";

interface AdminInvitationsGridProps {
  invitations: any[];
  total: number;
  page: number;
  limit: number;
  onPageChange: (newPage: number) => void;
}

export function AdminInvitationsGrid({
  invitations,
  total,
  page,
  limit,
  onPageChange,
}: AdminInvitationsGridProps) {
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const [qrModalItem, setQrModalItem] = useState<any | null>(null);

  const handleCopyLink = (slug: string) => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const url = `${origin}/invitation/${slug}`;
    navigator.clipboard.writeText(url);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 backdrop-blur-md shadow-xs shadow-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Đã xuất bản
          </span>
        );
      case "draft":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30 backdrop-blur-md shadow-xs shadow-amber-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            Bản nháp
          </span>
        );
      case "hidden":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-500/15 text-rose-300 border border-rose-500/30 backdrop-blur-md shadow-xs shadow-rose-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
            Tạm ẩn
          </span>
        );
      default:
        return null;
    }
  };

  const getSourceBadge = (source?: string) => {
    switch (source) {
      case "fb":
      case "facebook":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-bold bg-blue-500/15 text-blue-500 dark:text-blue-400 border border-blue-500/20">
            📘 FB
          </span>
        );
      case "zalo":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            💬 Zalo
          </span>
        );
      case "ins":
      case "instagram":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-bold bg-pink-500/15 text-pink-600 dark:text-pink-400 border border-pink-500/20">
            📸 Ins
          </span>
        );
      case "tiktok":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-bold bg-slate-900/80 text-slate-100 border border-slate-700">
            🎵 TikTok
          </span>
        );
      case "demo":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-bold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            🧪 Demo
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-bold bg-slate-500/10 text-slate-500 dark:text-slate-400 border border-slate-300/30">
            🌐 Khác
          </span>
        );
    }
  };

  const calculateDaysRemaining = (weddingDate: string) => {
    if (!weddingDate) return null;
    const target = new Date(weddingDate);
    if (isNaN(target.getTime())) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    target.setHours(0, 0, 0, 0);
    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return { text: "Hôm nay!", isUrgent: true };
    if (diffDays > 0) return { text: `Còn ${diffDays} ngày`, isUrgent: diffDays <= 7 };
    return { text: `Đã diễn ra`, isUrgent: false };
  };

  const totalPages = Math.ceil(total / limit) || 1;

  return (
    <>
      {invitations.length === 0 ? (
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl border border-slate-200/80 dark:border-slate-800/80 p-12 text-center flex flex-col items-center justify-center space-y-4 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
            <Sparkles className="w-8 h-8" />
          </div>
          <div className="max-w-md">
            <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1">
              Chưa có thiệp cưới nào phù hợp
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Hãy thử tìm kiếm với từ khóa khác hoặc tạo thiệp cưới mới ngay bây giờ.
            </p>
          </div>
          <Link
            href="/admin/invitations/create"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 text-white font-bold text-xs shadow-lg shadow-rose-500/20 hover:scale-105 transition-all"
          >
            <span>+ Tạo thiệp cưới mới</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {invitations.map((item) => {
            const d = new Date(item.weddingDate);
            const formattedDate = !isNaN(d.getTime())
              ? `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth() + 1).toString().padStart(2, "0")}/${d.getFullYear()}`
              : "Chưa đặt ngày";
            const daysInfo = calculateDaysRemaining(item.weddingDate);
            const isCopied = copiedSlug === item.slug;
            const previewUrl = `/invitation/${item.slug}`;
            const editUrl = `/admin/invitations/${item.slug}/edit`;
            const coverThumbnail =
              item.templateConfig?.coverImage ||
              item.coverImage ||
              item.templateId?.thumbnail ||
              "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80";

            return (
              <div
                key={item._id || item.id}
                className="group relative bg-white dark:bg-slate-900/90 backdrop-blur-md rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-xs hover:shadow-xl hover:border-amber-500/40 dark:hover:border-amber-400/40 transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1"
              >
                {/* Visual Header / Cover Media */}
                <div className="relative h-48 w-full bg-slate-950 overflow-hidden shrink-0">
                  <img
                    src={coverThumbnail}
                    alt={item.slug}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                  {/* Top Status & Source Badges */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2 z-10">
                    <div>{getStatusBadge(item.status)}</div>
                    <div>{getSourceBadge(item.source)}</div>
                  </div>

                  {/* Bottom of Cover: Template Name & Views */}
                  <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between z-10 text-white">
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-slate-200">
                      {item.templateId?.name || "Mẫu thiệp"}
                    </span>
                    <span className="text-[11px] font-mono font-bold flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-amber-300">
                      <Eye size={12} className="text-amber-400" />
                      {(item.views || 0).toLocaleString()} views
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Couple Names */}
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={editUrl}
                        className="font-serif text-lg sm:text-xl font-bold text-slate-900 dark:text-white hover:text-amber-600 dark:hover:text-amber-400 transition-colors line-clamp-1"
                        title={`${item.groomName || "Chú rể"} & ${item.brideName || "Cô dâu"}`}
                      >
                        {item.groomName || "Chú rể"} & {item.brideName || "Cô dâu"}
                      </Link>
                    </div>

                    {/* URL Slug */}
                    <p className="text-[11px] font-mono text-slate-400 dark:text-slate-500 mt-1 truncate">
                      /invitation/{item.slug}
                    </p>

                    {/* Wedding Date & Countdown */}
                    <div className="mt-3 flex items-center justify-between text-xs py-2 px-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-300">
                      <div className="flex items-center gap-2">
                        <Calendar size={13} className="text-amber-500 shrink-0" />
                        <span className="font-mono font-medium">{formattedDate}</span>
                        {item.weddingTime && (
                          <span className="text-[11px] text-slate-400">
                            • {item.weddingTime}
                          </span>
                        )}
                      </div>
                      {daysInfo && (
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            daysInfo.isUrgent
                              ? "bg-rose-500/15 text-rose-500 dark:text-rose-400 border border-rose-500/20 animate-pulse"
                              : "bg-slate-200/60 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300"
                          }`}
                        >
                          {daysInfo.text}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Bar */}
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-1.5">
                    {/* Copy Link Button */}
                    <button
                      onClick={() => handleCopyLink(item.slug)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                        isCopied
                          ? "bg-emerald-500 text-white shadow-xs shadow-emerald-500/25"
                          : "text-slate-600 dark:text-slate-300 bg-slate-100/80 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700"
                      }`}
                      title="Sao chép liên kết thiệp"
                    >
                      {isCopied ? <Check size={13} /> : <Copy size={13} />}
                      <span>{isCopied ? "Đã chép!" : "Chép link"}</span>
                    </button>

                    {/* QR Code trigger */}
                    <button
                      onClick={() => setQrModalItem(item)}
                      className="p-2 rounded-xl text-slate-500 hover:text-amber-500 hover:bg-amber-500/10 transition-colors"
                      title="Mã QR chia sẻ thiệp"
                    >
                      <QrCode size={16} />
                    </button>

                    {/* View Live */}
                    <a
                      href={previewUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-xl text-slate-500 hover:text-indigo-500 hover:bg-indigo-500/10 transition-colors"
                      title="Xem trực tiếp trên web"
                    >
                      <ExternalLink size={16} />
                    </a>

                    {/* Edit Button */}
                    <Link
                      href={editUrl}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 text-white font-bold text-xs shadow-xs hover:shadow-md hover:scale-105 active:scale-95 transition-all ml-auto"
                    >
                      <Edit3 size={13} />
                      <span>Studio</span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination Controls */}
      {total > 0 && (
        <div className="mt-6 bg-white dark:bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Hiển thị <span className="font-bold text-slate-800 dark:text-slate-200">{(page - 1) * limit + 1} - {Math.min(page * limit, total)}</span> trên tổng số <span className="font-bold text-slate-800 dark:text-slate-200">{total}</span> thiệp cưới
          </p>
          <div className="flex items-center gap-1.5">
            <button
              disabled={page === 1}
              onClick={() => onPageChange(page - 1)}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 transition-colors"
              title="Trang trước"
            >
              <ChevronLeft size={16} />
            </button>
            <div className="px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 font-mono font-bold text-xs">
              Trang {page} / {totalPages}
            </div>
            <button
              disabled={page * limit >= total}
              onClick={() => onPageChange(page + 1)}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 transition-colors"
              title="Trang tiếp"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* QR Code Quick Modal */}
      {qrModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setQrModalItem(null)}
          />
          <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-sm w-full shadow-2xl text-center space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Mã QR Thiệp Cưới
              </h3>
              <button
                onClick={() => setQrModalItem(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-inner flex flex-col items-center justify-center">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(
                  typeof window !== "undefined"
                    ? `${window.location.origin}/invitation/${qrModalItem.slug}`
                    : `/invitation/${qrModalItem.slug}`
                )}`}
                alt="QR Code"
                className="w-48 h-48 rounded-lg"
              />
            </div>

            <div>
              <p className="font-serif font-bold text-base text-slate-900 dark:text-white">
                {qrModalItem.groomName} & {qrModalItem.brideName}
              </p>
              <p className="text-xs text-slate-400 font-mono mt-0.5 truncate">
                /invitation/{qrModalItem.slug}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleCopyLink(qrModalItem.slug)}
                className="flex-1 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
              >
                {copiedSlug === qrModalItem.slug ? "Đã chép link!" : "Chép link"}
              </button>
              <a
                href={`https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(
                  typeof window !== "undefined"
                    ? `${window.location.origin}/invitation/${qrModalItem.slug}`
                    : `/invitation/${qrModalItem.slug}`
                )}`}
                download={`QR_${qrModalItem.slug}.png`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-md transition-colors"
              >
                <Download size={13} />
                <span>Tải QR</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
