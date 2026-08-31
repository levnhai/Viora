"use client";

import React, { useState, useEffect } from "react";
import {
  Save,
  CreditCard,
  Building2,
  User,
  QrCode,
  Sparkles,
  Loader2,
  Download,
  Maximize2,
  X,
} from "lucide-react";
import { createPortal } from "react-dom";
import { toast } from "sonner";
import { API_URL } from "@/shared/lib/config";

interface SettingTabProps {
  weddingData: any;
  weddingSlug: string | null;
  refetch: () => void;
}

const VIETNAM_BANKS = [
  { code: "VCB", shortName: "Vietcombank", name: "Vietcombank (Ngoại thương)", aliases: ["vietcombank", "vcb", "ngoai thuong"] },
  { code: "CTG", shortName: "VietinBank", name: "VietinBank (Công thương)", aliases: ["vietinbank", "vietin bank", "icb", "ctg", "cong thuong"] },
  { code: "BIDV", shortName: "BIDV", name: "BIDV (Đầu tư & Phát triển)", aliases: ["bidv", "dau tu va phat trien"] },
  { code: "MB", shortName: "MBBank", name: "MB Bank (Quân đội)", aliases: ["mbbank", "mb bank", "mb", "quan doi"] },
  { code: "TCB", shortName: "Techcombank", name: "Techcombank (Kỹ thương)", aliases: ["techcombank", "tcb", "ky thuong"] },
  { code: "ACB", shortName: "ACB", name: "ACB (Á Châu)", aliases: ["acb", "a chau"] },
  { code: "VPB", shortName: "VPBank", name: "VPBank (Thịnh Vượng)", aliases: ["vpbank", "vp bank", "vpb", "thinh vuong"] },
  { code: "TPB", shortName: "TPBank", name: "TPBank (Tiên Phong)", aliases: ["tpbank", "tp bank", "tpb", "tien phong"] },
  { code: "VBA", shortName: "Agribank", name: "Agribank (Nông nghiệp)", aliases: ["agribank", "vbard", "vba", "nong nghiep"] },
  { code: "HDB", shortName: "HDBank", name: "HDBank (Phát triển TP.HCM)", aliases: ["hdbank", "hd bank", "hdb"] },
  { code: "STB", shortName: "Sacombank", name: "Sacombank (Sài Gòn Thương Tín)", aliases: ["sacombank", "stb", "sai gon thuong tin"] },
  { code: "VIB", shortName: "VIB", name: "VIB (Quốc tế)", aliases: ["vib", "quoc te"] },
  { code: "SHB", shortName: "SHB", name: "SHB (Sài Gòn - Hà Nội)", aliases: ["shb", "sai gon ha noi"] },
  { code: "MSB", shortName: "MSB", name: "MSB (Hàng Hải)", aliases: ["msb", "maritime bank", "hang hai"] },
  { code: "OCB", shortName: "OCB", name: "OCB (Phương Đông)", aliases: ["ocb", "phuong dong"] },
  { code: "LPB", shortName: "LPBank", name: "LPBank (Bưu điện Liên Việt)", aliases: ["lpbank", "lienvietpostbank", "lpb", "buu dien lien viet"] },
  { code: "SEAB", shortName: "SeABank", name: "SeABank (Đông Nam Á)", aliases: ["seabank", "sea bank", "seab", "dong nam a"] },
  { code: "NAB", shortName: "Nam A Bank", name: "Nam A Bank (Nam Á)", aliases: ["nam a bank", "nam a", "nab"] },
  { code: "ABB", shortName: "ABBank", name: "ABBank (An Bình)", aliases: ["abbank", "ab bank", "abb", "an binh"] },
  { code: "BAB", shortName: "Bac A Bank", name: "Bac A Bank (Bắc Á)", aliases: ["bac a bank", "bac a", "bab"] },
  { code: "BVB", shortName: "BaoViet Bank", name: "BaoViet Bank (Bảo Việt)", aliases: ["baoviet", "bao viet", "bvb"] },
  { code: "EIB", shortName: "Eximbank", name: "Eximbank (Xuất Nhập Khẩu)", aliases: ["eximbank", "exim bank", "eib", "xuat nhap khau"] },
  { code: "KLB", shortName: "Kienlongbank", name: "Kienlongbank (Kiên Long)", aliases: ["kienlongbank", "kien long", "klb"] },
  { code: "PGB", shortName: "PGBank", name: "PGBank (Xăng dầu Petrolimex)", aliases: ["pgbank", "pg bank", "pgb", "petrolimex"] },
  { code: "PVB", shortName: "PVcomBank", name: "PVcomBank (Đại Chúng)", aliases: ["pvcombank", "pvcom bank", "pvb"] },
  { code: "SCB", shortName: "SCB", name: "SCB (Sài Gòn)", aliases: ["scb", "sai gon"] },
  { code: "VAB", shortName: "VietABank", name: "VietABank (Việt Á)", aliases: ["vietabank", "viet a", "vab"] },
  { code: "VCCB", shortName: "VietBank", name: "VietBank (Việt Nam Thương Tín)", aliases: ["vietbank", "vccb", "viet nam thuong tin"] },
  { code: "CAKE", shortName: "CAKE", name: "Cake by VPBank", aliases: ["cake", "cake by vpbank"] },
  { code: "TIMO", shortName: "Timo", name: "Timo by BanVietBank", aliases: ["timo", "timo by banvietbank"] },
];

/**
 * Hàm tìm kiếm mã ngân hàng chuẩn từ dữ liệu thô trong DB
 */
export const findBankCode = (input: string | undefined | null): string => {
  if (!input) return "";
  const clean = input.trim().toLowerCase();
  if (!clean) return "";

  // 1. Khớp mã code chính xác (VCB, MB, CTG...)
  const matchCode = VIETNAM_BANKS.find(
    (b) => b.code.toLowerCase() === clean
  );
  if (matchCode) return matchCode.code;

  // 2. Khớp shortName
  const matchShort = VIETNAM_BANKS.find(
    (b) => b.shortName.toLowerCase() === clean
  );
  if (matchShort) return matchShort.code;

  // 3. Khớp aliases
  const matchAlias = VIETNAM_BANKS.find((b) =>
    b.aliases.some(
      (alias) => clean === alias || clean.includes(alias) || alias.includes(clean)
    )
  );
  if (matchAlias) return matchAlias.code;

  // 4. Khớp full name
  const matchName = VIETNAM_BANKS.find((b) =>
    b.name.toLowerCase().includes(clean)
  );
  if (matchName) return matchName.code;

  return input.trim();
};

export function SettingTab({
  weddingData,
  weddingSlug,
  refetch,
}: SettingTabProps) {
  const [loading, setLoading] = useState(false);
  const [zoomQr, setZoomQr] = useState<{
    url: string;
    title: string;
    accountName: string;
    accountNumber: string;
    bankName: string;
  } | null>(null);

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
      const rawGroomBank = weddingData.giftInfo?.groomBankName || "";
      const rawBrideBank = weddingData.giftInfo?.brideBankName || "";

      setGiftInfo({
        groomBankName: findBankCode(rawGroomBank),
        groomAccountNumber: weddingData.giftInfo?.groomAccountNumber || "",
        groomAccountName: weddingData.giftInfo?.groomAccountName || "",
        brideBankName: findBankCode(rawBrideBank),
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

  const handleDownloadQr = async (url: string, fileName: string) => {
    try {
      toast.loading("Đang chuẩn bị tải mã QR...", { id: "download-qr" });
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${fileName}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
      toast.success(`Đã tải mã VietQR thành công!`, { id: "download-qr" });
    } catch (e) {
      window.open(url, "_blank");
      toast.info("Đã mở mã QR trong tab mới để bạn tải xuống.", {
        id: "download-qr",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!weddingSlug) return;

    setLoading(true);

    const payload = {
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

      toast.success("Đã lưu cấu hình tài khoản mừng cưới thành công!");
      refetch();
    } catch (err: any) {
      toast.error(err.message || "Đã xảy ra lỗi kết nối!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 pb-24 md:pb-6 font-sans max-w-5xl animate-fade-in text-[11px]"
    >
      {/* Header Bar Desktop */}
      <div className="hidden md:flex items-center justify-between bg-white px-4 py-3 rounded-2xl border border-[#e2e8f0]/20 shadow-3xs">
        <div>
          <h2 className="text-sm font-bold text-slate-800 tracking-tight flex items-center gap-1.5">
            <CreditCard size={15} className="text-[#1b365d]" />
            Cấu hình Mừng Cưới &amp; VietQR
          </h2>
          <p className="text-[11px] text-slate-400 font-medium mt-0.5">
            Thông tin tài khoản ngân hàng nhận tiền mừng cưới trực tiếp qua thiệp
          </p>
        </div>

        {/* Nút lưu trên Desktop */}
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#1b365d] text-white hover:bg-[#152a48] rounded-xl text-[11px] font-bold shadow-2xs hover:shadow-xs active:scale-98 transition-all cursor-pointer border-0 disabled:opacity-50"
        >
          {loading ? (
            <Loader2 size={13} className="animate-spin" />
          ) : (
            <Save size={13} />
          )}
          <span>{loading ? "Đang lưu..." : "Lưu thay đổi"}</span>
        </button>
      </div>

      {/* Grid 2 cột: Chú rể & Cô dâu */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
        {/* KHỐI 1: TÀI KHOẢN CHÚ RỂ */}
        <div className="bg-white rounded-2xl border border-stone-100 shadow-3xs p-3.5 sm:p-4 space-y-3.5 flex flex-col justify-between">
          <div className="space-y-3">
            {/* Header Chú rể */}
            <div className="flex items-center justify-between border-b border-stone-50 pb-2">
              <div className="flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-md bg-[#1b365d] text-white flex items-center justify-center text-[9px] font-bold">
                  CR
                </span>
                <h3 className="text-[11.5px] font-bold text-stone-800 tracking-tight">
                  Tài khoản Chú Rể
                </h3>
              </div>
              <span className="text-[8.5px] font-bold px-2 py-0.5 rounded-full bg-[#1b365d]/5 text-[#1b365d]">
                VietQR Chú Rể
              </span>
            </div>

            {/* Input fields */}
            <div className="space-y-2">
              {/* Ngân hàng */}
              <div>
                <label className="block text-[9px] font-bold text-stone-500 uppercase tracking-wide mb-1 flex items-center gap-1">
                  <Building2 size={10} className="text-stone-400" />
                  Ngân hàng
                </label>
                <select
                  value={giftInfo.groomBankName}
                  onChange={(e) =>
                    setGiftInfo((prev) => ({
                      ...prev,
                      groomBankName: e.target.value,
                    }))
                  }
                  className="w-full text-[10px] sm:text-[11px] font-normal bg-stone-50/70 border border-stone-200/70 rounded-lg px-2.5 py-1.5 outline-none focus:bg-white focus:border-[#1b365d] transition-all text-stone-700 cursor-pointer"
                >
                  <option value="">-- Chọn ngân hàng --</option>
                  {giftInfo.groomBankName &&
                    !VIETNAM_BANKS.some(
                      (b) => b.code === giftInfo.groomBankName
                    ) && (
                      <option value={giftInfo.groomBankName}>
                        {giftInfo.groomBankName}
                      </option>
                    )}
                  {VIETNAM_BANKS.map((b) => (
                    <option key={b.code} value={b.code}>
                      {b.code} - {b.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Số tài khoản */}
              <div>
                <label className="block text-[9px] font-bold text-stone-500 uppercase tracking-wide mb-1 flex items-center gap-1">
                  <CreditCard size={10} className="text-stone-400" />
                  Số tài khoản
                </label>
                <input
                  type="text"
                  value={giftInfo.groomAccountNumber}
                  onChange={(e) =>
                    setGiftInfo((prev) => ({
                      ...prev,
                      groomAccountNumber: e.target.value,
                    }))
                  }
                  placeholder="Nhập số tài khoản..."
                  className="w-full text-[10px] sm:text-[11px] font-mono font-normal bg-stone-50/70 border border-stone-200/70 rounded-lg px-2.5 py-1.5 outline-none focus:bg-white focus:border-[#1b365d] transition-all text-stone-700 placeholder:text-stone-350"
                />
              </div>

              {/* Tên chủ tài khoản */}
              <div>
                <label className="block text-[9px] font-bold text-stone-500 uppercase tracking-wide mb-1 flex items-center gap-1">
                  <User size={10} className="text-stone-400" />
                  Tên chủ tài khoản
                </label>
                <input
                  type="text"
                  value={giftInfo.groomAccountName}
                  onChange={(e) =>
                    setGiftInfo((prev) => ({
                      ...prev,
                      groomAccountName: e.target.value,
                    }))
                  }
                  placeholder="NGUYEN VAN A (IN HOA KHÔNG DẤU)"
                  className="w-full text-[10px] sm:text-[11px] font-medium uppercase tracking-wide bg-stone-50/70 border border-stone-200/70 rounded-lg px-2.5 py-1.5 outline-none focus:bg-white focus:border-[#1b365d] transition-all text-stone-700 placeholder:text-stone-350 placeholder:normal-case placeholder:font-normal"
                />
              </div>
            </div>
          </div>

          {/* QR Preview Box: QR bên trái, nút bên phải */}
          <div className="pt-1">
            {groomQrPreview ? (
              <div className="bg-stone-50/90 rounded-2xl p-3.5 border border-stone-200/60 shadow-3xs animate-fade-in flex items-center gap-3.5 sm:gap-4">
                {/* QR bên trái: kích thước siêu to rõ (160px - 192px), click để mở modal xem */}
                <div
                  onClick={() =>
                    setZoomQr({
                      url: groomQrPreview,
                      title: "Mã VietQR - Chú Rể",
                      accountName: giftInfo.groomAccountName || "CHỦ TÀI KHOẢN",
                      accountNumber: giftInfo.groomAccountNumber,
                      bankName: giftInfo.groomBankName,
                    })
                  }
                  className="relative group cursor-pointer w-40 h-40 sm:w-48 sm:h-48 bg-white rounded-2xl p-2.5 shadow-xs border border-stone-200/80 shrink-0 flex items-center justify-center transition-transform active:scale-95"
                  title="Bấm để xem phóng to"
                >
                  <img
                    src={groomQrPreview}
                    alt="VietQR Chú Rể"
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute inset-0 bg-stone-900/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-white text-[11px] font-bold">
                    <Maximize2 size={15} />
                    <span>Xem</span>
                  </div>
                </div>

                {/* Bên phải: Tiêu đề và 2 nút bấm */}
                <div className="min-w-0 flex-1 flex flex-col justify-between self-stretch py-1">
                  <div>
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 mb-1">
                      <Sparkles size={13} />
                      <span>Mã VietQR Chú Rể</span>
                    </div>
                    <p className="text-[10px] text-stone-500 leading-relaxed font-medium">
                      Quét trực tiếp qua ứng dụng ngân hàng hoặc tải ảnh QR về máy
                    </p>
                  </div>

                  {/* 2 nút bấm bên phải */}
                  <div className="flex flex-col gap-2 mt-3">
                    <button
                      type="button"
                      onClick={() =>
                        setZoomQr({
                          url: groomQrPreview,
                          title: "Mã VietQR - Chú Rể",
                          accountName:
                            giftInfo.groomAccountName || "CHỦ TÀI KHOẢN",
                          accountNumber: giftInfo.groomAccountNumber,
                          bankName: giftInfo.groomBankName,
                        })
                      }
                      className="w-full py-2.5 px-3 rounded-xl bg-white border border-stone-200 text-stone-700 text-[10.5px] font-bold hover:bg-stone-50 flex items-center justify-center gap-1.5 cursor-pointer shadow-3xs"
                    >
                      <Maximize2 size={13} className="text-stone-500" />
                      <span>Xem</span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleDownloadQr(
                          groomQrPreview,
                          `vietqr-chu-re-${giftInfo.groomAccountNumber}`
                        )
                      }
                      className="w-full py-2.5 px-3 rounded-xl bg-[#1b365d] text-white text-[10.5px] font-bold hover:bg-[#152a48] flex items-center justify-center gap-1.5 cursor-pointer shadow-3xs border-0 whitespace-nowrap"
                    >
                      <Download size={13} />
                      <span>Tải ảnh QR</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 bg-stone-50/50 rounded-xl p-3 border border-dashed border-stone-200 text-stone-400">
                <QrCode size={16} className="shrink-0 opacity-40" />
                <p className="text-[9.5px] italic leading-tight">
                  Nhập ngân hàng &amp; số TK để tự động tạo mã VietQR xem trước.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* KHỐI 2: TÀI KHOẢN CÔ DÂU */}
        <div className="bg-white rounded-2xl border border-stone-100 shadow-3xs p-3.5 sm:p-4 space-y-3.5 flex flex-col justify-between">
          <div className="space-y-3">
            {/* Header Cô dâu */}
            <div className="flex items-center justify-between border-b border-stone-50 pb-2">
              <div className="flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-md bg-rose-500 text-white flex items-center justify-center text-[9px] font-bold">
                  CD
                </span>
                <h3 className="text-[11.5px] font-bold text-stone-800 tracking-tight">
                  Tài khoản Cô Dâu
                </h3>
              </div>
              <span className="text-[8.5px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-600">
                VietQR Cô Dâu
              </span>
            </div>

            {/* Input fields */}
            <div className="space-y-2">
              {/* Ngân hàng */}
              <div>
                <label className="block text-[9px] font-bold text-stone-500 uppercase tracking-wide mb-1 flex items-center gap-1">
                  <Building2 size={10} className="text-stone-400" />
                  Ngân hàng
                </label>
                <select
                  value={giftInfo.brideBankName}
                  onChange={(e) =>
                    setGiftInfo((prev) => ({
                      ...prev,
                      brideBankName: e.target.value,
                    }))
                  }
                  className="w-full text-[10px] sm:text-[11px] font-normal bg-stone-50/70 border border-stone-200/70 rounded-lg px-2.5 py-1.5 outline-none focus:bg-white focus:border-rose-400 transition-all text-stone-700 cursor-pointer"
                >
                  <option value="">-- Chọn ngân hàng --</option>
                  {giftInfo.brideBankName &&
                    !VIETNAM_BANKS.some(
                      (b) => b.code === giftInfo.brideBankName
                    ) && (
                      <option value={giftInfo.brideBankName}>
                        {giftInfo.brideBankName}
                      </option>
                    )}
                  {VIETNAM_BANKS.map((b) => (
                    <option key={b.code} value={b.code}>
                      {b.code} - {b.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Số tài khoản */}
              <div>
                <label className="block text-[9px] font-bold text-stone-500 uppercase tracking-wide mb-1 flex items-center gap-1">
                  <CreditCard size={10} className="text-stone-400" />
                  Số tài khoản
                </label>
                <input
                  type="text"
                  value={giftInfo.brideAccountNumber}
                  onChange={(e) =>
                    setGiftInfo((prev) => ({
                      ...prev,
                      brideAccountNumber: e.target.value,
                    }))
                  }
                  placeholder="Nhập số tài khoản..."
                  className="w-full text-[10px] sm:text-[11px] font-mono font-normal bg-stone-50/70 border border-stone-200/70 rounded-lg px-2.5 py-1.5 outline-none focus:bg-white focus:border-rose-400 transition-all text-stone-700 placeholder:text-stone-350"
                />
              </div>

              {/* Tên chủ tài khoản */}
              <div>
                <label className="block text-[9px] font-bold text-stone-500 uppercase tracking-wide mb-1 flex items-center gap-1">
                  <User size={10} className="text-stone-400" />
                  Tên chủ tài khoản
                </label>
                <input
                  type="text"
                  value={giftInfo.brideAccountName}
                  onChange={(e) =>
                    setGiftInfo((prev) => ({
                      ...prev,
                      brideAccountName: e.target.value,
                    }))
                  }
                  placeholder="TRAN THI B (IN HOA KHÔNG DẤU)"
                  className="w-full text-[10px] sm:text-[11px] font-medium uppercase tracking-wide bg-stone-50/70 border border-stone-200/70 rounded-lg px-2.5 py-1.5 outline-none focus:bg-white focus:border-rose-400 transition-all text-stone-700 placeholder:text-stone-350 placeholder:normal-case placeholder:font-normal"
                />
              </div>
            </div>
          </div>

          {/* QR Preview Box: QR bên trái, nút bên phải */}
          <div className="pt-1">
            {brideQrPreview ? (
              <div className="bg-stone-50/90 rounded-2xl p-3.5 border border-stone-200/60 shadow-3xs animate-fade-in flex items-center gap-3.5 sm:gap-4">
                {/* QR bên trái: kích thước siêu to rõ (160px - 192px), click để mở modal xem */}
                <div
                  onClick={() =>
                    setZoomQr({
                      url: brideQrPreview,
                      title: "Mã VietQR - Cô Dâu",
                      accountName: giftInfo.brideAccountName || "CHỦ TÀI KHOẢN",
                      accountNumber: giftInfo.brideAccountNumber,
                      bankName: giftInfo.brideBankName,
                    })
                  }
                  className="relative group cursor-pointer w-40 h-40 sm:w-48 sm:h-48 bg-white rounded-2xl p-2.5 shadow-xs border border-stone-200/80 shrink-0 flex items-center justify-center transition-transform active:scale-95"
                  title="Bấm để xem phóng to"
                >
                  <img
                    src={brideQrPreview}
                    alt="VietQR Cô Dâu"
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute inset-0 bg-stone-900/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-white text-[11px] font-bold">
                    <Maximize2 size={15} />
                    <span>Xem</span>
                  </div>
                </div>

                {/* Bên phải: Tiêu đề và 2 nút bấm */}
                <div className="min-w-0 flex-1 flex flex-col justify-between self-stretch py-1">
                  <div>
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-600 mb-1">
                      <Sparkles size={13} />
                      <span>Mã VietQR Cô Dâu</span>
                    </div>
                    <p className="text-[10px] text-stone-500 leading-relaxed font-medium">
                      Quét trực tiếp qua ứng dụng ngân hàng hoặc tải ảnh QR về máy
                    </p>
                  </div>

                  {/* 2 nút bấm bên phải */}
                  <div className="flex flex-col gap-2 mt-3">
                    <button
                      type="button"
                      onClick={() =>
                        setZoomQr({
                          url: brideQrPreview,
                          title: "Mã VietQR - Cô Dâu",
                          accountName:
                            giftInfo.brideAccountName || "CHỦ TÀI KHOẢN",
                          accountNumber: giftInfo.brideAccountNumber,
                          bankName: giftInfo.brideBankName,
                        })
                      }
                      className="w-full py-2.5 px-3 rounded-xl bg-white border border-stone-200 text-stone-700 text-[10.5px] font-bold hover:bg-stone-50 flex items-center justify-center gap-1.5 cursor-pointer shadow-3xs"
                    >
                      <Maximize2 size={13} className="text-stone-500" />
                      <span>Xem</span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleDownloadQr(
                          brideQrPreview,
                          `vietqr-co-dau-${giftInfo.brideAccountNumber}`
                        )
                      }
                      className="w-full py-2.5 px-3 rounded-xl bg-rose-600 text-white text-[10.5px] font-bold hover:bg-rose-700 flex items-center justify-center gap-1.5 cursor-pointer shadow-3xs border-0 whitespace-nowrap"
                    >
                      <Download size={13} />
                      <span>Tải ảnh QR</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 bg-stone-50/50 rounded-xl p-3 border border-dashed border-stone-200 text-stone-400">
                <QrCode size={16} className="shrink-0 opacity-40" />
                <p className="text-[9.5px] italic leading-tight">
                  Nhập ngân hàng &amp; số TK để tự động tạo mã VietQR xem trước.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Nút lưu cấu hình dưới cùng (độc lập, không bị đè lên thẻ) */}
      <div className="pt-3 flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto px-8 py-3 bg-[#1b365d] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#152a48] shadow-md shadow-[#1b365d]/20 active:scale-98 transition-all cursor-pointer border-0 disabled:opacity-50"
        >
          {loading ? (
            <Loader2 size={15} className="animate-spin" />
          ) : (
            <Save size={15} />
          )}
          <span>{loading ? "Đang lưu..." : "Lưu cài đặt cấu hình"}</span>
        </button>
      </div>

      {/* Modal Phóng To QR để Quét Kiểm Tra Toàn Màn Hình */}
      {zoomQr &&
        typeof document !== "undefined" &&
        createPortal(
          <div className="fixed inset-0 bg-stone-900/70 backdrop-blur-sm z-[999] flex items-center justify-center p-4">
            <div className="fixed inset-0" onClick={() => setZoomQr(null)} />
            <div className="bg-white w-full max-w-sm rounded-[2rem] p-6 shadow-2xl relative z-10 border border-stone-100 animate-fade-in font-sans text-center">
              {/* Nút đóng */}
              <button
                type="button"
                onClick={() => setZoomQr(null)}
                className="absolute right-4 top-4 p-1.5 text-stone-400 hover:bg-stone-100 rounded-full border-0 bg-transparent cursor-pointer flex items-center justify-center"
              >
                <X size={20} />
              </button>

              <h3 className="text-sm font-bold text-stone-850 mb-1">
                {zoomQr.title}
              </h3>
              <p className="text-[11px] text-stone-500 font-medium mb-4">
                Dùng ứng dụng ngân hàng bất kỳ để quét kiểm tra trực tiếp
              </p>

              {/* Ảnh QR siêu lớn */}
              <div className="w-56 h-56 mx-auto bg-white rounded-2xl p-2.5 shadow-md border border-stone-200/80 mb-4 flex items-center justify-center">
                <img
                  src={zoomQr.url}
                  alt={zoomQr.title}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Chi tiết tài khoản */}
              <div className="bg-stone-50 rounded-xl p-3 text-left space-y-1 mb-4 text-[11px] border border-stone-100">
                <div className="flex justify-between">
                  <span className="text-stone-400 font-medium">Ngân hàng:</span>
                  <span className="font-bold text-stone-800">
                    {zoomQr.bankName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400 font-medium">Số tài khoản:</span>
                  <span className="font-mono font-bold text-stone-800">
                    {zoomQr.accountNumber}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400 font-medium">Chủ tài khoản:</span>
                  <span className="font-bold text-stone-800 uppercase">
                    {zoomQr.accountName}
                  </span>
                </div>
              </div>

              {/* Nút tải ảnh trong modal */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setZoomQr(null)}
                  className="flex-1 py-2.5 rounded-xl border border-stone-200 text-stone-600 text-xs font-bold bg-white hover:bg-stone-50 cursor-pointer"
                >
                  Đóng
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleDownloadQr(
                      zoomQr.url,
                      `vietqr-${zoomQr.accountNumber}`
                    )
                  }
                  className="flex-1 py-2.5 rounded-xl bg-[#1b365d] text-white text-xs font-bold hover:bg-[#152a48] flex items-center justify-center gap-1.5 cursor-pointer border-0 shadow-md shadow-[#1b365d]/20"
                >
                  <Download size={14} />
                  <span>Tải ảnh QR</span>
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </form>
  );
}

