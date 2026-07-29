"use client";

import { useInvitationCreate } from "@/views/admin-invitation-create/model/InvitationCreateProvider";
import {
  CheckCircle2,
  Copy,
  Download,
  X,
  Eye,
  ExternalLink,
} from "lucide-react";

import { useState, useEffect } from "react";

export function PublishSuccessModal({
  credentials,
}: {
  credentials?: { email: string; password: string } | null;
}) {
  const {
    isPublishSuccessModalOpen,
    setIsPublishSuccessModalOpen,
    setStep,
    publishSettings,
  } = useInvitationCreate();
  const [mounted, setMounted] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isPublishSuccessModalOpen || !mounted) return null;

  const fullUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/w/${publishSettings.urlSlug}`
      : `https://wedding.com/w/${publishSettings.urlSlug}`;

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
    fullUrl,
  )}`;

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleDownloadQr = async () => {
    try {
      const response = await fetch(qrCodeUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `QR-${publishSettings.urlSlug}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch {
      window.open(qrCodeUrl, "_blank");
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#1e1e2d]/80 backdrop-blur-sm"
        onClick={() => setIsPublishSuccessModalOpen(false)}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={() => setIsPublishSuccessModalOpen(false)}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors z-10"
        >
          <X size={20} />
        </button>

        <div className="p-6 pb-4 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-3 border-4 border-green-50">
            <CheckCircle2 size={32} strokeWidth={2.5} />
          </div>

          <h2 className="text-xl font-bold text-slate-800 mb-1">
            Xuất bản thiệp thành công!
          </h2>
          <p className="text-xs text-slate-500">
            Dưới đây là thông tin đường dẫn, mã QR và tài khoản quản lý thiệp
          </p>
        </div>

        <div className="px-6 pb-6 space-y-4">
          {/* 1. Slug & Link */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
              1. Mã đường dẫn thiệp (Slug & Link)
            </label>
            <div className="flex items-center gap-2 p-2 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="flex-1 px-2 text-xs font-mono text-slate-700 truncate">
                {fullUrl}
              </div>
              <button
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-rose-600 border border-rose-200 hover:bg-rose-50 rounded-lg text-xs font-semibold transition-colors shrink-0"
                onClick={() => copyToClipboard(fullUrl, "link")}
              >
                <Copy size={14} />
                {copiedField === "link" ? "Đã chép!" : "Sao chép"}
              </button>
            </div>
          </div>

          {/* 2. QR Code */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
              2. Mã QR Truy cập
            </label>
            <div className="flex items-center gap-4 p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="w-20 h-20 bg-white p-1 rounded-lg border border-slate-200 shrink-0 flex items-center justify-center">
                <img src={qrCodeUrl} alt="QR Code" className="w-full h-full" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-slate-600 mb-2">
                  Quét mã QR bằng điện thoại để mở trực tiếp thiệp cưới
                </p>
                <button
                  onClick={handleDownloadQr}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg text-xs font-semibold transition-colors"
                >
                  <Download size={14} /> Tải ảnh QR Code (.png)
                </button>
              </div>
            </div>
          </div>

          {/* 3 & 4. Email & Password */}
          {credentials && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                3. Tài khoản khách hàng (Email & Password)
              </label>
              <div className="p-3 bg-rose-50/60 border border-rose-200/80 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-600">
                    Email:
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-800 bg-white px-2 py-1 rounded border border-rose-100 font-semibold">
                      {credentials.email}
                    </span>
                    <button
                      onClick={() =>
                        copyToClipboard(credentials.email, "email")
                      }
                      className="text-rose-600 hover:text-rose-700 p-1"
                      title="Sao chép Email"
                    >
                      <Copy size={14} />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-600">
                    Mật khẩu:
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-800 bg-white px-2 py-1 rounded border border-rose-100 font-semibold">
                      {credentials.password}
                    </span>
                    <button
                      onClick={() =>
                        copyToClipboard(credentials.password, "password")
                      }
                      className="text-rose-600 hover:text-rose-700 p-1"
                      title="Sao chép Mật khẩu"
                    >
                      <Copy size={14} />
                    </button>
                  </div>
                </div>

                <button
                  className="w-full mt-1 flex items-center justify-center gap-2 px-3 py-1.5 bg-white text-rose-600 border border-rose-200 hover:bg-rose-50 rounded-lg text-xs font-semibold transition-colors"
                  onClick={() =>
                    copyToClipboard(
                      `Tài khoản thiệp cưới:\nLink: ${fullUrl}\nEmail: ${credentials.email}\nMật khẩu: ${credentials.password}`,
                      "full",
                    )
                  }
                >
                  <Copy size={14} />
                  {copiedField === "full"
                    ? "Đã sao chép tất cả!"
                    : "Sao chép toàn bộ thông tin bàn giao"}
                </button>
              </div>
            </div>
          )}

          {/* Bottom Action Buttons */}
          <div className="pt-2 flex gap-3">
            <a
              href={fullUrl}
              target="_blank"
              rel="noreferrer"
              className="flex-1 py-2.5 text-center text-xs font-semibold text-slate-700 bg-white border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 rounded-xl transition-all flex items-center justify-center gap-1.5"
            >
              <Eye size={16} /> Xem website thiệp
            </a>
            <button
              onClick={() => {
                setIsPublishSuccessModalOpen(false);
                setStep("select_template");
              }}
              className="flex-1 py-2.5 text-xs font-semibold text-white bg-rose-500 hover:bg-rose-600 rounded-xl shadow-md shadow-rose-500/20 transition-all flex items-center justify-center gap-1.5"
            >
              Quản lý thiệp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
