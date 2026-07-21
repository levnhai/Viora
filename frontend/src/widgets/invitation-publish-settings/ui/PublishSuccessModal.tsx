"use client";

import { useInvitationCreate } from "@/views/admin-invitation-create/model/InvitationCreateProvider";
import {
  CheckCircle2,
  Copy,
  Download,
  Facebook,
  Twitter,
  Mail,
  X,
  Eye,
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

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isPublishSuccessModalOpen || !mounted) return null;

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

        <div className="p-8 pb-6 flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6 border-8 border-green-50">
            <CheckCircle2 size={40} strokeWidth={2.5} />
          </div>

          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Xuất bản thành công!
          </h2>
          <p className="text-sm text-slate-500">
            Thiệp cưới của bạn đã được xuất bản và sẵn sàng chia sẻ
          </p>
        </div>

        <div className="px-8 pb-8 space-y-6">
          {/* Link website */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">
              Link website
            </label>
            <div className="flex items-center gap-2 p-1.5 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="flex-1 px-3 text-sm text-slate-600 truncate">
                {typeof window !== "undefined"
                  ? `${window.location.origin}/w/${publishSettings.urlSlug}`
                  : `https://wedding.com/w/${publishSettings.urlSlug}`}
              </div>
              <button
                className="flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg text-sm font-semibold transition-colors shrink-0"
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${window.location.origin}/w/${publishSettings.urlSlug}`,
                  );
                }}
              >
                <Copy size={16} /> Sao chép
              </button>
            </div>
          </div>

          {/* QR Code */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">
              QR Code
            </label>
            <div className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="w-16 h-16 bg-white p-1 rounded-lg border border-slate-200 shrink-0">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${typeof window !== "undefined" ? `${window.location.origin}/w/${publishSettings.urlSlug}` : `https://wedding.com/w/${publishSettings.urlSlug}`}`}
                  alt="QR"
                  className="w-full h-full"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm text-slate-600 mb-2">
                  Quét mã QR để truy cập thiệp
                </p>
                <button className="flex items-center gap-2 text-rose-600 text-sm font-semibold hover:text-rose-700">
                  <Download size={16} /> Tải xuống
                </button>
              </div>
            </div>
          </div>

          {/* Credentials */}
          {credentials && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider text-rose-600">
                Thông tin tài khoản
              </label>
              <div className="flex flex-col gap-2 p-3 bg-rose-50 border border-rose-200 rounded-xl">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-700">
                    Email:
                  </span>
                  <span className="text-sm font-mono text-slate-800 bg-white px-2 py-1 rounded border border-rose-100">
                    {credentials.email}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-700">
                    Mật khẩu:
                  </span>
                  <span className="text-sm font-mono text-slate-800 bg-white px-2 py-1 rounded border border-rose-100">
                    {credentials.password}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-700">
                    Link quản trị:
                  </span>
                  <span className="text-xs font-mono text-slate-800 bg-white px-2 py-1 rounded border border-rose-100 truncate max-w-[200px]">
                    {typeof window !== "undefined"
                      ? `${window.location.origin}/login`
                      : `https://wedding.com/login`}
                  </span>
                </div>
                <button
                  className="mt-2 flex items-center justify-center gap-2 px-4 py-2 bg-white text-rose-600 border border-rose-200 hover:bg-rose-100 rounded-lg text-sm font-semibold transition-colors"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `Tài khoản quản lý thiệp cưới:\nLink: ${window.location.origin}/w/${publishSettings.urlSlug}\nEmail: ${credentials.email}\nMật khẩu: ${credentials.password}\nĐăng nhập tại: ${window.location.origin}/login`,
                    );
                    alert("Đã sao chép thông tin tài khoản!");
                  }}
                >
                  <Copy size={16} /> Sao chép
                </button>
              </div>
            </div>
          )}

          {/* Chia sẻ nhanh */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-3 uppercase tracking-wider">
              Chia sẻ nhanh
            </label>
            <div className="grid grid-cols-4 gap-3">
              <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors text-slate-600 text-sm font-medium">
                <Facebook size={18} />
              </button>
              <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 hover:bg-sky-50 hover:text-sky-500 hover:border-sky-200 transition-colors text-slate-600 text-sm font-medium">
                <span className="font-bold">Zalo</span>
              </button>
              <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition-colors text-slate-600 text-sm font-medium">
                <span className="font-bold">Msg</span>
              </button>
              <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-colors text-slate-600 text-sm font-medium">
                <Mail size={18} />
              </button>
            </div>
          </div>

          <div className="pt-2 flex gap-3">
            <button
              onClick={() => {
                setIsPublishSuccessModalOpen(false);
              }}
              className="flex-1 py-3 text-sm font-semibold text-slate-600 bg-white border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 rounded-xl transition-all"
            >
              <Eye size={18} className="inline-block mr-2" /> Xem website
            </button>
            <button
              onClick={() => {
                setIsPublishSuccessModalOpen(false);
                setStep("select_template");
              }}
              className="flex-1 py-3 text-sm font-semibold text-white bg-rose-500 hover:bg-rose-600 rounded-xl shadow-md shadow-rose-500/20 transition-all"
            >
              Quản lý thiệp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
