import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { X, Download, Copy, Check } from "lucide-react";
import { WeddingData } from "@/entities/invitation/model/types";

interface GiftBoxModalSectionProps {
  weddingData: WeddingData;
}

export const GiftBoxModalSection: React.FC<GiftBoxModalSectionProps> = ({ weddingData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const giftInfo = weddingData.giftInfo || {};

  const bankAccounts: Array<{
    title: string;
    name: string;
    bank: string;
    account: string;
    qr: string;
  }> = [];

  const hasGroom = Boolean(
    giftInfo.groomAccountNumber?.trim() ||
    giftInfo.groomQrUrl?.trim()
  );
  if (hasGroom) {
    const groomName =
      giftInfo.groomAccountName?.trim() ||
      weddingData.groomName ||
      "Chú Rể";
    const groomBankName = giftInfo.groomBankName?.trim() || "Vietcombank";
    const groomAccount = giftInfo.groomAccountNumber?.trim() || "";
    const groomQr =
      giftInfo.groomQrUrl?.trim() ||
      (groomBankName && groomAccount
        ? `https://img.vietqr.io/image/${encodeURIComponent(groomBankName)}-${encodeURIComponent(groomAccount)}-compact2.jpg?accountName=${encodeURIComponent(groomName)}`
        : "");
    bankAccounts.push({
      title: "Chú Rể",
      name: groomName,
      bank: groomBankName,
      account: groomAccount,
      qr: groomQr,
    });
  }

  const hasBride = Boolean(
    giftInfo.brideAccountNumber?.trim() ||
    giftInfo.brideQrUrl?.trim()
  );
  if (hasBride) {
    const brideName =
      giftInfo.brideAccountName?.trim() ||
      weddingData.brideName ||
      "Cô Dâu";
    const brideBankName = giftInfo.brideBankName?.trim() || "MB Bank";
    const brideAccount = giftInfo.brideAccountNumber?.trim() || "";
    const brideQr =
      giftInfo.brideQrUrl?.trim() ||
      (brideBankName && brideAccount
        ? `https://img.vietqr.io/image/${encodeURIComponent(brideBankName)}-${encodeURIComponent(brideAccount)}-compact2.jpg?accountName=${encodeURIComponent(brideName)}`
        : "");
    bankAccounts.push({
      title: "Cô Dâu",
      name: brideName,
      bank: brideBankName,
      account: brideAccount,
      qr: brideQr,
    });
  }

  // Nếu không có thông tin chuyển khoản nào, ẩn toàn bộ Hộp Quà Mừng
  if (bankAccounts.length === 0) {
    return null;
  }

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleDownloadQr = (url: string, filename: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = `${filename}.png`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const modalPortal = mounted && typeof document !== "undefined" && (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="gift-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            key="gift-modal-content"
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 10 }}
            transition={{
              type: "spring",
              damping: 26,
              stiffness: 380,
              mass: 0.8,
            }}
            className={`relative w-full ${
              bankAccounts.length === 1 ? "max-w-sm" : "max-w-lg"
            } rounded-2xl overflow-hidden shadow-2xl border border-[#ffdfaf]/40 will-change-transform`}
            style={{
              backgroundColor: "#2b0303",
              backgroundImage:
                "linear-gradient(rgba(43,3,3,0.92), rgba(43,3,3,0.92)), url('/images/themes/baroque-v2-dark-red/bg.webp')",
              backgroundSize: "100% auto",
              backgroundRepeat: "repeat",
              boxShadow:
                "0 25px 50px -12px rgba(0, 0, 0, 0.85), 0 0 30px rgba(255, 223, 175, 0.15)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Modal */}
            <div
              className="relative px-6 py-4 text-center border-b border-[#ffdfaf]/25"
              style={{ backgroundColor: "#3a0808" }}
            >
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full text-[#ffdfaf] hover:bg-white/10 hover:text-white transition-colors cursor-pointer active:scale-90"
                aria-label="Đóng"
              >
                <X size={20} />
              </button>
              <h3
                className="text-lg md:text-xl font-bold uppercase tracking-wider text-[#ffdfaf]"
                style={{ fontFamily: '"Times New Roman", serif' }}
              >
                Hộp Quà Mừng
              </h3>
            </div>

            {/* Nội dung danh sách tài khoản */}
            <div className="p-5 sm:p-6 max-h-[75vh] overflow-y-auto">
              <div
                className={`grid gap-5 justify-center ${
                  bankAccounts.length === 1
                    ? "grid-cols-1 max-w-[280px] sm:max-w-[300px] mx-auto"
                    : "grid-cols-1 sm:grid-cols-2"
                }`}
              >
                {bankAccounts.map((acc, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center bg-black/40 rounded-xl p-4 border border-[#ffdfaf]/20 shadow-lg text-center"
                  >
                    <span className="text-xs font-semibold text-[#ffdfaf] uppercase tracking-wide mb-2.5">
                      {acc.title} - {acc.name}
                    </span>

                    {/* QR Code Frame */}
                    <div className="w-32 h-32 sm:w-36 sm:h-36 bg-white rounded-xl p-2 shadow-inner flex items-center justify-center">
                      <img
                        src={acc.qr}
                        alt={`QR ${acc.title}`}
                        className="w-full h-full object-contain"
                        loading="eager"
                      />
                    </div>

                    {/* Bank Info */}
                    <div className="mt-3 space-y-0.5 text-xs text-[#ffefd6]">
                      <p className="font-semibold text-[#ffdfaf]">{acc.bank}</p>
                      <p className="font-mono font-bold tracking-wider text-sm text-[#ffefd6]">
                        {acc.account}
                      </p>
                      <p className="text-[11px] opacity-80">{acc.name}</p>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2 mt-3.5">
                      <button
                        type="button"
                        onClick={() => handleCopy(acc.account, idx)}
                        className="inline-flex items-center gap-1 text-[11px] px-3 py-1.5 rounded-full font-bold text-[#511419] bg-[#ffdfaf] hover:bg-white transition-all cursor-pointer shadow-sm active:scale-95"
                      >
                        {copiedIndex === idx ? (
                          <>
                            <Check size={12} /> Đã sao chép
                          </>
                        ) : (
                          <>
                            <Copy size={12} /> Sao chép STK
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleDownloadQr(
                            acc.qr,
                            `QR_Mung_Cuoi_${acc.title}_${acc.name}`
                          )
                        }
                        className="inline-flex items-center gap-1 text-[11px] px-3 py-1.5 rounded-full font-medium text-[#ffdfaf] border border-[#ffdfaf]/40 hover:bg-[#ffdfaf]/15 transition-all cursor-pointer active:scale-95"
                      >
                        <Download size={12} /> Lưu QR
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-center text-[12px] text-[#ffdfaf]/70 mt-5 italic">
                Sự hiện diện của quý khách là niềm vinh hạnh cho gia đình chúng tôi!
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="relative z-10 flex w-full flex-col items-center justify-center py-6">
      <h2
        className="mb-4 uppercase text-[20px] md:text-[24px] font-bold tracking-wider"
        style={{
          color: "#ffdfaf",
          fontFamily: '"Times New Roman", "Baskerville", serif',
        }}
      >
        Hộp Quà Mừng
      </h2>

      {/* Interactive 3D Envelope Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="group relative cursor-pointer outline-none border-none bg-transparent transition-transform duration-300 hover:scale-105 active:scale-95"
        style={{ width: "200px", height: "260px" }}
        aria-label="Mở hộp quà mừng"
      >
        <div className="relative w-full h-full flex items-end justify-center pb-8">
          {/* Sparkles */}
          <span className="absolute top-[8%] left-[10%] text-[#ffefd6] text-sm animate-pulse">
            ✦
          </span>
          <span className="absolute top-[16%] right-[8%] text-[#ffdfaf] text-xs animate-ping">
            ✦
          </span>
          <span className="absolute top-[32%] left-[4%] text-[#ffefd6] text-xs animate-pulse">
            ✦
          </span>
          <span className="absolute top-[26%] right-[4%] text-[#ffdfaf] text-xs animate-pulse">
            ✦
          </span>

          {/* Phong bì 3D */}
          <div className="relative w-[140px] h-[190px]">
            {/* Đổ bóng */}
            <div
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[90px] h-[10px] rounded-full bg-black/60 blur-sm pointer-events-none"
            />
            {/* Lớp sau */}
            <img
              src="/images/envelope/baroque_v2_darkred.webp"
              alt=""
              className="absolute inset-0 w-full h-full object-contain pointer-events-none drop-shadow-lg transition-transform duration-500 group-hover:-translate-y-2 group-hover:rotate-[-8deg]"
              style={{
                transform: "translateX(15%) translateY(-6%) scale(-0.85, 0.85) rotate(-12deg)",
              }}
            />
            {/* Lớp trước */}
            <img
              src="/images/envelope/baroque_v2_darkred.webp"
              alt=""
              className="absolute inset-0 w-full h-full object-contain pointer-events-none drop-shadow-xl transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-[4deg]"
              style={{
                transform: "rotate(-8deg)",
              }}
            />
          </div>
        </div>

        <p className="absolute bottom-1 left-1/2 -translate-x-1/2 text-xs font-semibold text-[#ffefd6] whitespace-nowrap bg-black/40 px-3 py-1 rounded-full border border-[#ffdfaf]/30 tracking-wide">
          Nhấn để gửi quà mừng
        </p>
      </button>

      {/* Modal QR Mừng Cưới Portal */}
      {mounted && typeof document !== "undefined" && createPortal(modalPortal, document.body)}
    </div>
  );
};

