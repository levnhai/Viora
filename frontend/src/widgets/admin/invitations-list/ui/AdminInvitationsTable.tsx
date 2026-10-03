"use client";

import { useState } from "react";
import { Eye, Edit3, Copy, Check, QrCode, X, Download, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export function AdminInvitationsTable({
  invitations,
  total,
  page,
  limit,
  onPageChange,
}: {
  invitations: any[];
  total: number;
  page: number;
  limit: number;
  onPageChange: (newPage: number) => void;
}) {
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Đã xuất bản
          </span>
        );
      case "draft":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            Bản nháp
          </span>
        );
      case "hidden":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
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
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/60">
            📘 Facebook
          </span>
        );
      case "zalo":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60">
            💬 Zalo
          </span>
        );
      case "ins":
      case "instagram":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-pink-50 dark:bg-pink-950/60 text-pink-600 dark:text-pink-400 border border-pink-200 dark:border-pink-800/60">
            📸 Instagram
          </span>
        );
      case "tiktok":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-900 text-white border border-slate-700">
            🎵 TikTok
          </span>
        );
      case "demo":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800/60">
            🧪 Demo
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
            🌐 Khác
          </span>
        );
    }
  };

  const totalPages = Math.ceil(total / limit) || 1;

  return (
    <>
      <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden mb-6 transition-colors">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-800/40 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="px-5 py-4">Mẫu thiệp</th>
                <th className="px-5 py-4">Cô dâu & Chú rể</th>
                <th className="px-5 py-4">Nguồn</th>
                <th className="px-5 py-4">Ngày cưới</th>
                <th className="px-5 py-4">Lượt xem</th>
                <th className="px-5 py-4">Trạng thái</th>
                <th className="px-5 py-4 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs">
              {invitations.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-12 text-center text-slate-400 font-medium"
                  >
                    Không tìm thấy thiệp cưới nào.
                  </td>
                </tr>
              ) : (
                invitations.map((item) => {
                  const d = new Date(item.weddingDate);
                  const formattedDate = !isNaN(d.getTime())
                    ? `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth() + 1).toString().padStart(2, "0")}/${d.getFullYear()}`
                    : "Chưa đặt";
                  const isCopied = copiedSlug === item.slug;
                  const coverThumbnail =
                    item.templateConfig?.coverImage ||
                    item.coverImage ||
                    item.templateId?.thumbnail ||
                    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=100&q=80";
                  const editUrl = `/admin/invitations/${item.slug}/edit`;

                  return (
                    <tr
                      key={item._id || item.id}
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors group"
                    >
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <Link href={editUrl}>
                            <img
                              src={coverThumbnail}
                              alt={item.slug}
                              className="w-10 h-14 object-cover rounded-xl border border-slate-200 dark:border-slate-700 hover:opacity-80 transition-opacity shadow-2xs group-hover:scale-105 duration-200"
                            />
                          </Link>
                          <div>
                            <Link
                              href={editUrl}
                              className="font-bold text-slate-800 dark:text-slate-100 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
                            >
                              {item.templateId?.name || "Mẫu thiệp cưới"}
                            </Link>
                            <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                              /{item.slug}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 font-serif font-bold text-sm text-slate-800 dark:text-slate-200">
                        {item.groomName || "Chú rể"} & {item.brideName || "Cô dâu"}
                      </td>
                      <td className="px-5 py-3.5">{getSourceBadge(item.source)}</td>
                      <td className="px-5 py-3.5">
                        <p className="text-slate-800 dark:text-slate-100 font-bold font-mono">
                          {formattedDate}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          {item.weddingTime || "Cả ngày"}
                        </p>
                      </td>
                      <td className="px-5 py-3.5">
                        <p className="font-bold font-mono text-slate-800 dark:text-slate-100">
                          {(item.views || 0).toLocaleString()}
                        </p>
                      </td>
                      <td className="px-5 py-3.5">{getStatusBadge(item.status)}</td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => handleCopyLink(item.slug)}
                            className="p-1.5 text-slate-400 hover:text-amber-500 hover:bg-amber-500/10 rounded-lg transition-colors"
                            title="Sao chép link"
                          >
                            {isCopied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                          </button>
                          <button
                            onClick={() => setQrModalItem(item)}
                            className="p-1.5 text-slate-400 hover:text-amber-500 hover:bg-amber-500/10 rounded-lg transition-colors"
                            title="Xem mã QR"
                          >
                            <QrCode size={14} />
                          </button>
                          <a
                            href={`/invitation/${item.slug}`}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                            title="Xem online"
                          >
                            <Eye size={14} />
                          </a>
                          <Link
                            href={editUrl}
                            className="p-1.5 flex items-center justify-center text-slate-400 hover:text-amber-600 hover:bg-amber-500/10 rounded-lg transition-colors"
                            title="Chỉnh sửa Studio"
                          >
                            <Edit3 size={14} />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {total > 0 && (
          <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Hiển thị {(page - 1) * limit + 1} - {Math.min(page * limit, total)} trong tổng số {total} thiệp
            </p>
            <div className="flex items-center gap-2">
              <button
                disabled={page === 1}
                onClick={() => onPageChange(page - 1)}
                className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 text-xs font-semibold"
              >
                <ChevronLeft size={16} />
              </button>

              <span className="text-xs font-mono font-bold text-amber-500 px-2.5 py-1 rounded-lg bg-amber-500/10">
                {page} / {totalPages}
              </span>

              <button
                disabled={page * limit >= total}
                onClick={() => onPageChange(page + 1)}
                className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 text-xs font-semibold"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

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
