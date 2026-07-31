import React, { useState } from "react";
import { playfairDisplay, montserrat } from "@/shared/lib/fonts";
import { WeddingData } from "@/entities/invitation/model/types";

interface GiftModalProps {
  isOpen: boolean;
  onClose: () => void;
  weddingData: WeddingData;
}

export function GiftModal({ isOpen, onClose, weddingData }: GiftModalProps) {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  if (!isOpen) return null;

  const groomBank = {
    name: weddingData.groomName || "Chú rể",
    bankName: "MB Bank",
    accountNumber: "999988886666",
    qrCode:
      weddingData.groomBankQr ||
      "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=MUNG%20CUOI%20CHU%20RE",
  };

  const brideBank = {
    name: weddingData.brideName || "Cô dâu",
    bankName: "Vietcombank",
    accountNumber: "888866669999",
    qrCode:
      weddingData.brideBankQr ||
      "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=MUNG%20CUOI%20CO%20DAU",
  };

  const handleCopy = (accNum: string, key: string) => {
    navigator.clipboard.writeText(accNum);
    setCopiedAccount(key);
    setTimeout(() => setCopiedAccount(null), 2000);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[150] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 select-none animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#fffdfa] w-full max-w-sm sm:max-w-md rounded-3xl p-6 sm:p-8 border border-[#e5d9c8] shadow-2xl relative space-y-6 text-center max-h-[90vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#8b6c42] hover:text-[#3a2d24] text-2xl font-light p-1"
        >
          ✕
        </button>

        {/* Modal Title */}
        <div className="space-y-1 pt-2">
          <h2
            className={`${playfairDisplay.className} text-2xl sm:text-3xl text-[#8b6c42] font-bold tracking-wider uppercase`}
          >
            HỘP MỪNG CƯỚI
          </h2>
          <p className={`${montserrat.className} text-xs text-[#785c37] font-medium`}>
            Gửi món quà yêu thương đến Dâu & Rể
          </p>
        </div>

        {/* Bank Cards Container */}
        <div className="space-y-5 text-left">
          {/* GROOM BANK */}
          <div className="bg-[#fcf8f2] rounded-2xl p-4 border border-[#eee4d6] shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-[#e8ded0] pb-2">
              <span
                className={`${playfairDisplay.className} text-lg font-bold text-[#8b6c42]`}
              >
                Mừng cưới Chú rể
              </span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#8b6c42] text-white">
                {groomBank.bankName}
              </span>
            </div>

            <div className="flex items-center gap-4">
              {/* QR Image */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl bg-white p-1.5 border border-[#e5d9c8] flex-shrink-0 shadow-sm">
                <img
                  src={groomBank.qrCode}
                  alt="QR Chú rể"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Account Details */}
              <div className="space-y-1 text-xs sm:text-sm text-[#3a2d24]">
                <p className="font-semibold text-[#8b6c42]">{groomBank.name}</p>
                <p className="font-mono font-bold text-sm tracking-wider text-[#3a2d24]">
                  {groomBank.accountNumber}
                </p>
                <button
                  onClick={() => handleCopy(groomBank.accountNumber, "groom")}
                  className="mt-1 px-3 py-1 bg-[#8b6c42] hover:bg-[#785c37] text-white rounded-lg text-xs font-semibold transition-colors shadow-sm"
                >
                  {copiedAccount === "groom" ? "✓ Đã sao chép" : "📋 Sao chép STK"}
                </button>
              </div>
            </div>
          </div>

          {/* BRIDE BANK */}
          <div className="bg-[#fcf8f2] rounded-2xl p-4 border border-[#eee4d6] shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-[#e8ded0] pb-2">
              <span
                className={`${playfairDisplay.className} text-lg font-bold text-[#8b6c42]`}
              >
                Mừng cưới Cô dâu
              </span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#8b6c42] text-white">
                {brideBank.bankName}
              </span>
            </div>

            <div className="flex items-center gap-4">
              {/* QR Image */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl bg-white p-1.5 border border-[#e5d9c8] flex-shrink-0 shadow-sm">
                <img
                  src={brideBank.qrCode}
                  alt="QR Cô dâu"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Account Details */}
              <div className="space-y-1 text-xs sm:text-sm text-[#3a2d24]">
                <p className="font-semibold text-[#8b6c42]">{brideBank.name}</p>
                <p className="font-mono font-bold text-sm tracking-wider text-[#3a2d24]">
                  {brideBank.accountNumber}
                </p>
                <button
                  onClick={() => handleCopy(brideBank.accountNumber, "bride")}
                  className="mt-1 px-3 py-1 bg-[#8b6c42] hover:bg-[#785c37] text-white rounded-lg text-xs font-semibold transition-colors shadow-sm"
                >
                  {copiedAccount === "bride" ? "✓ Đã sao chép" : "📋 Sao chép STK"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
