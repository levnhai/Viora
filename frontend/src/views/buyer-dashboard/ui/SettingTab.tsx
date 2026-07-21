"use client";

import React, { useState, useEffect } from "react";
import { Save, Music, Heart, BookOpen, CreditCard, Check, AlertCircle, Settings } from "lucide-react";
import { API_URL } from "@/shared/lib/config";

interface SettingTabProps {
  weddingData: any;
  weddingSlug: string | null;
  refetch: () => void;
}

const VIETNAM_BANKS = [
  { code: "VCB", name: "Vietcombank (Ngoại thương)" },
  { code: "CTG", name: "VietinBank (Công thương)" },
  { code: "BIDV", name: "BIDV (Đầu tư & Phát triển)" },
  { code: "MB", name: "MB Bank (Quân đội)" },
  { code: "TCB", name: "Techcombank (Kỹ thương)" },
  { code: "ACB", name: "ACB (Á Châu)" },
  { code: "VPB", name: "VPBank (Thịnh Vượng)" },
  { code: "TPB", name: "TPBank (Tiên Phong)" },
  { code: "VBA", name: "Agribank (Nông nghiệp)" },
  { code: "HDB", name: "HDBank (Phát triển TP.HCM)" },
  { code: "STB", name: "Sacombank (Sài Gòn Thương Tín)" },
  { code: "VIB", name: "VIB (Quốc tế)" },
  { code: "SHB", name: "SHB (Sài Gòn - Hà Nội)" },
];

export function SettingTab({ weddingData, weddingSlug, refetch }: SettingTabProps) {
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Cấu hình hiển thị & nhạc nền
  const [settings, setSettings] = useState({
    showRSVP: true,
    showGuestbook: true,
    musicEnabled: true,
    musicUrl: "",
  });

  // Mừng cưới QR
  const [giftInfo, setGiftInfo] = useState({
    groomBankName: "",
    groomAccountNumber: "",
    groomAccountName: "",
    brideBankName: "",
    brideAccountNumber: "",
    brideAccountName: "",
  });

  useEffect(() => {
    if (weddingData) {
      setSettings({
        showRSVP: weddingData.settings?.showRSVP ?? true,
        showGuestbook: weddingData.settings?.showGuestbook ?? true,
        musicEnabled: weddingData.settings?.musicEnabled ?? true,
        musicUrl: weddingData.themeSettings?.musicUrl || weddingData.settings?.musicUrl || "",
      });

      setGiftInfo({
        groomBankName: weddingData.giftInfo?.groomBankName || "",
        groomAccountNumber: weddingData.giftInfo?.groomAccountNumber || "",
        groomAccountName: weddingData.giftInfo?.groomAccountName || "",
        brideBankName: weddingData.giftInfo?.brideBankName || "",
        brideAccountNumber: weddingData.giftInfo?.brideAccountNumber || "",
        brideAccountName: weddingData.giftInfo?.brideAccountName || "",
      });
    }
  }, [weddingData]);

  // Sinh mã VietQR preview
  const groomQrPreview =
    giftInfo.groomBankName && giftInfo.groomAccountNumber
      ? `https://img.vietqr.io/image/${giftInfo.groomBankName}-${giftInfo.groomAccountNumber}-compact.png?amount=200000&addInfo=Chuc%20mung%20hanh%20phuc`
      : "";

  const brideQrPreview =
    giftInfo.brideBankName && giftInfo.brideAccountNumber
      ? `https://img.vietqr.io/image/${giftInfo.brideBankName}-${giftInfo.brideAccountNumber}-compact.png?amount=200000&addInfo=Chuc%20mung%20hanh%20phuc`
      : "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!weddingSlug) return;

    setLoading(true);
    setSuccessMsg(null);
    setErrorMsg(null);

    const payload = {
      settings: {
        showRSVP: settings.showRSVP,
        showGuestbook: settings.showGuestbook,
        musicEnabled: settings.musicEnabled,
      },
      giftInfo: {
        groomBankName: giftInfo.groomBankName,
        groomAccountNumber: giftInfo.groomAccountNumber,
        groomAccountName: giftInfo.groomAccountName,
        groomQrUrl: groomQrPreview,
        brideBankName: giftInfo.brideBankName,
        brideAccountNumber: giftInfo.brideAccountNumber,
        brideAccountName: giftInfo.brideAccountName,
        brideQrUrl: brideQrPreview,
      },
      musicUrl: settings.musicUrl,
    };

    try {
      const res = await fetch(`${API_URL}/api/weddings/${weddingSlug}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Cập nhật cài đặt thất bại!");

      setSuccessMsg("Đã lưu cấu hình cài đặt thành công!");
      refetch();
      
      // Auto clear message after 3s
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err: any) {
      setErrorMsg(err.message || "Đã xảy ra lỗi kết nối!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 pb-28 md:pb-6 font-sans">
      {/* Alert Messages */}
      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-2xl text-xs font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <Check size={16} className="text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 bg-rose-50 border border-rose-100 text-rose-800 rounded-2xl text-xs font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <AlertCircle size={16} className="text-rose-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* SECTION 1: CÀI ĐẶT HIỂN THỊ THIỆP */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-3xs p-5 space-y-5">
        <h3 className="text-sm font-extrabold text-stone-900 tracking-tight flex items-center gap-2 border-b border-slate-50 pb-3">
          <Settings className="w-4 h-4 text-stone-500" />
          Cài đặt hiển thị & tính năng
        </h3>

        <div className="space-y-4">
          {/* RSVP Switch */}
          <div className="flex items-center justify-between py-1">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                <Heart size={15} fill="currentColor" strokeWidth={0} />
              </div>
              <div>
                <p className="text-xs font-bold text-stone-850">Xác nhận RSVP</p>
                <p className="text-[10px] text-stone-400 font-medium">Bật/Tắt form xác nhận khách mời tham dự</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.showRSVP}
                onChange={(e) => setSettings((prev) => ({ ...prev, showRSVP: e.target.checked }))}
                className="sr-only peer"
              />
              <div className="w-10 h-5.5 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4.5 after:w-4.5 after:transition-all peer-checked:bg-[#1b365d]"></div>
            </label>
          </div>

          {/* Guestbook Switch */}
          <div className="flex items-center justify-between py-1">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <BookOpen size={15} />
              </div>
              <div>
                <p className="text-xs font-bold text-stone-850">Lời chúc mừng cưới</p>
                <p className="text-[10px] text-stone-400 font-medium">Cho phép khách mời gửi lời chúc & bình luận</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.showGuestbook}
                onChange={(e) => setSettings((prev) => ({ ...prev, showGuestbook: e.target.checked }))}
                className="sr-only peer"
              />
              <div className="w-10 h-5.5 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4.5 after:w-4.5 after:transition-all peer-checked:bg-[#1b365d]"></div>
            </label>
          </div>

          {/* Music Switch */}
          <div className="flex items-center justify-between py-1">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                <Music size={15} />
              </div>
              <div>
                <p className="text-xs font-bold text-stone-850">Nhạc nền tự động phát</p>
                <p className="text-[10px] text-stone-400 font-medium">Tự động phát nhạc khi mở xem thiệp</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.musicEnabled}
                onChange={(e) => setSettings((prev) => ({ ...prev, musicEnabled: e.target.checked }))}
                className="sr-only peer"
              />
              <div className="w-10 h-5.5 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4.5 after:w-4.5 after:transition-all peer-checked:bg-[#1b365d]"></div>
            </label>
          </div>

          {/* Music URL Input (only shown if musicEnabled) */}
          {settings.musicEnabled && (
            <div className="pt-2 animate-in fade-in slide-in-from-top-1 duration-200">
              <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider mb-1.5">
                Đường dẫn nhạc nền (Youtube, MP3, Soundcloud...)
              </label>
              <input
                type="text"
                value={settings.musicUrl}
                onChange={(e) => setSettings((prev) => ({ ...prev, musicUrl: e.target.value }))}
                placeholder="Ví dụ: https://www.youtube.com/watch?v=..."
                className="w-full text-xs font-medium bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-2.5 focus:bg-white focus:border-[#1b365d]/45 outline-none transition-all placeholder:text-stone-300"
              />
            </div>
          )}
        </div>
      </div>

      {/* SECTION 2: QUẢN LÝ QR MỪNG CƯỚI */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-3xs p-5 space-y-6">
        <h3 className="text-sm font-extrabold text-stone-900 tracking-tight flex items-center gap-2 border-b border-slate-50 pb-3">
          <CreditCard className="w-4 h-4 text-stone-500" />
          Cấu hình mã QR mừng cưới (VietQR)
        </h3>

        {/* Tab chú rể */}
        <div className="space-y-4">
          <span className="inline-block px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-[#1b365d]/5 text-[#1b365d]">
            Mừng cưới Chú Rể
          </span>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider mb-1">Ngân hàng</label>
              <select
                value={giftInfo.groomBankName}
                onChange={(e) => setGiftInfo((prev) => ({ ...prev, groomBankName: e.target.value }))}
                className="w-full text-xs font-bold bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-2.5 outline-none focus:bg-white"
              >
                <option value="">Chọn ngân hàng</option>
                {VIETNAM_BANKS.map((b) => (
                  <option key={b.code} value={b.code}>
                    {b.code} - {b.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider mb-1">Số tài khoản</label>
              <input
                type="text"
                value={giftInfo.groomAccountNumber}
                onChange={(e) => setGiftInfo((prev) => ({ ...prev, groomAccountNumber: e.target.value }))}
                placeholder="Nhập số TK"
                className="w-full text-xs font-medium bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-2.5 outline-none focus:bg-white focus:border-[#1b365d]/45"
              />
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider mb-1">Tên chủ tài khoản</label>
            <input
              type="text"
              value={giftInfo.groomAccountName}
              onChange={(e) => setGiftInfo((prev) => ({ ...prev, groomAccountName: e.target.value }))}
              placeholder="TÊN KHÔNG DẤU IN HOA"
              className="w-full text-xs font-medium bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-2.5 outline-none focus:bg-white focus:border-[#1b365d]/45 uppercase"
            />
          </div>
          {groomQrPreview && (
            <div className="flex items-center gap-4 bg-slate-50 rounded-xl p-3 border border-slate-200/40">
              <img src={groomQrPreview} alt="Groom QR" className="w-16 h-16 rounded-md shadow-xs bg-white p-1 border" />
              <p className="text-[10px] text-stone-400 font-semibold leading-relaxed">
                Mã VietQR tự động đồng bộ theo thông tin tài khoản chú rể. Khách mời có thể quét mừng cưới trực tiếp.
              </p>
            </div>
          )}
        </div>

        <hr className="border-slate-50" />

        {/* Tab cô dâu */}
        <div className="space-y-4">
          <span className="inline-block px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-rose-50 text-rose-600">
            Mừng cưới Cô Dâu
          </span>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider mb-1">Ngân hàng</label>
              <select
                value={giftInfo.brideBankName}
                onChange={(e) => setGiftInfo((prev) => ({ ...prev, brideBankName: e.target.value }))}
                className="w-full text-xs font-bold bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-2.5 outline-none focus:bg-white"
              >
                <option value="">Chọn ngân hàng</option>
                {VIETNAM_BANKS.map((b) => (
                  <option key={b.code} value={b.code}>
                    {b.code} - {b.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider mb-1">Số tài khoản</label>
              <input
                type="text"
                value={giftInfo.brideAccountNumber}
                onChange={(e) => setGiftInfo((prev) => ({ ...prev, brideAccountNumber: e.target.value }))}
                placeholder="Nhập số TK"
                className="w-full text-xs font-medium bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-2.5 outline-none focus:bg-white focus:border-[#1b365d]/45"
              />
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider mb-1">Tên chủ tài khoản</label>
            <input
              type="text"
              value={giftInfo.brideAccountName}
              onChange={(e) => setGiftInfo((prev) => ({ ...prev, brideAccountName: e.target.value }))}
              placeholder="TÊN KHÔNG DẤU IN HOA"
              className="w-full text-xs font-medium bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-2.5 outline-none focus:bg-white focus:border-[#1b365d]/45 uppercase"
            />
          </div>
          {brideQrPreview && (
            <div className="flex items-center gap-4 bg-slate-50 rounded-xl p-3 border border-slate-200/40">
              <img src={brideQrPreview} alt="Bride QR" className="w-16 h-16 rounded-md shadow-xs bg-white p-1 border" />
              <p className="text-[10px] text-stone-400 font-semibold leading-relaxed">
                Mã VietQR tự động đồng bộ theo thông tin tài khoản cô dâu. Khách mời có thể quét mừng cưới trực tiếp.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Floating Save Button on Mobile, normal on desktop */}
      <div className="fixed bottom-16 inset-x-0 p-4 bg-white/95 backdrop-blur-md border-t border-slate-100 flex md:relative md:bottom-0 md:p-0 md:bg-transparent md:border-0 z-40">
        <button
          type="submit"
          disabled={loading}
          className="w-full md:w-auto px-6 py-3.5 bg-[#1b365d] text-white rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 hover:opacity-95 shadow-lg shadow-[#1b365d]/20 active:scale-98 transition-all cursor-pointer disabled:opacity-50"
        >
          <Save size={14} />
          {loading ? "Đang lưu..." : "Lưu cài đặt cấu hình"}
        </button>
      </div>
    </form>
  );
}
