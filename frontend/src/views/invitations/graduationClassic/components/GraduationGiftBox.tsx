import { useState } from "react";
import Image from "next/image";
import { Gift, Copy, Check, QrCode } from "lucide-react";
import { WeddingData } from "@/entities/invitation/model/types";

interface GraduationGiftBoxProps {
  weddingData: WeddingData;
}

export function GraduationGiftBox({ weddingData }: GraduationGiftBoxProps) {
  const [copied, setCopied] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);

  const bankName =
    weddingData.giftInfo?.groomBankName ||
    weddingData.giftInfo?.brideBankName ||
    "Techcombank";
  const accountNumber =
    weddingData.giftInfo?.groomAccountNumber ||
    weddingData.giftInfo?.brideAccountNumber ||
    "1903688889999";
  const accountName =
    weddingData.giftInfo?.groomAccountName ||
    weddingData.giftInfo?.brideAccountName ||
    "DANG MAI TRANG";

  const qrUrl =
    weddingData.giftInfo?.groomQrUrl ||
    weddingData.giftInfo?.brideQrUrl ||
    `https://img.vietqr.io/image/${bankName}-${accountNumber}-compact2.png?amount=0&addInfo=Chuc+mung+tot+nghiep+Mai+Trang&accountName=${encodeURIComponent(
      accountName
    )}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="w-full px-4 sm:px-6 py-6 flex flex-col items-center">
      <div className="text-center mb-6">
        <span className="text-xs uppercase tracking-[0.25em] font-sans font-semibold text-[#854d0e]">
          GỬI MÓN QUÀ
        </span>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0b2046] mt-1">
          Hộp Quà Mừng Tốt Nghiệp
        </h2>
        <div className="w-12 h-[2px] bg-[#d4af37] mx-auto mt-2" />
      </div>

      <div className="w-full max-w-[420px] bg-white rounded-2xl p-6 sm:p-7 shadow-sm border border-[#0b2046]/10 text-center flex flex-col items-center">
        <div className="w-12 h-12 rounded-full bg-[#0b2046]/10 flex items-center justify-center text-[#0b2046] mb-3">
          <Gift className="w-6 h-6 text-[#b8860b]" />
        </div>

        <p className="text-xs sm:text-[13px] text-slate-600 mb-5 max-w-xs leading-relaxed font-sans">
          Sự hiện diện và lời chúc mừng của bạn là món quà trân quý nhất. Nếu bạn
          muốn gửi quà mừng tốt nghiệp từ xa, xin gửi về tài khoản:
        </p>

        {/* Bank Account Info Card */}
        <div className="w-full bg-[#fcfbfa] rounded-xl p-4 border border-[#d4af37]/30 text-left space-y-2 mb-4">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500 font-sans">Ngân hàng:</span>
            <span className="font-serif font-bold text-[#0b2046]">{bankName}</span>
          </div>

          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500 font-sans">Chủ tài khoản:</span>
            <span className="font-serif font-bold text-[#0b2046]">{accountName}</span>
          </div>

          <div className="flex justify-between items-center text-xs pt-1 border-t border-slate-200">
            <span className="text-slate-500 font-sans">Số tài khoản:</span>
            <div className="flex items-center gap-1.5">
              <span className="font-mono font-bold text-sm text-[#0b2046]">
                {accountNumber}
              </span>
              <button
                onClick={handleCopy}
                className="p-1 hover:bg-slate-200 rounded transition-colors text-slate-600"
                title="Sao chép số tài khoản"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* QR Button / View */}
        <button
          onClick={() => setShowQrModal(true)}
          className="py-2.5 px-5 rounded-xl bg-[#0b2046] text-white font-sans font-semibold text-xs sm:text-[13px] uppercase tracking-wider hover:bg-[#132e5c] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
        >
          <QrCode className="w-4 h-4 text-[#d4af37]" />
          <span>Xem Mã QR Chuyển Khoản</span>
        </button>
      </div>

      {/* QR Code Modal */}
      {showQrModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 select-none"
          onClick={() => setShowQrModal(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 max-w-sm w-full text-center flex flex-col items-center shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h4 className="text-base font-serif font-bold text-[#0b2046] mb-1">
              Mã QR Mừng Tốt Nghiệp
            </h4>
            <p className="text-xs text-slate-500 mb-4">{accountName} - {bankName}</p>

            <div className="relative w-56 h-56 rounded-xl overflow-hidden border border-slate-200 p-2 bg-white shadow-inner mb-4">
              <Image
                src={qrUrl}
                alt="VietQR Code"
                fill
                className="object-contain"
                unoptimized
              />
            </div>

            <div className="text-xs text-slate-600 font-mono font-bold mb-4">
              STK: {accountNumber}
            </div>

            <button
              onClick={() => setShowQrModal(false)}
              className="py-2 px-6 rounded-full bg-[#0b2046] text-white text-xs font-sans font-semibold uppercase tracking-wider"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
