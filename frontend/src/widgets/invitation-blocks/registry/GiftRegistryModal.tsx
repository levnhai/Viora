"use client";

import { useState } from "react";
import { WeddingData } from "@/entities/invitation/model/types";
import { X, Copy, Check, QrCode } from "lucide-react";

export interface GiftRegistryModalProps {
  weddingData: WeddingData;
  isOpen: boolean;
  onClose: () => void;
  accentColor?: string;
  hoverColor?: string;
}

export function GiftRegistryModal({
  weddingData,
  isOpen,
  onClose,
  accentColor = "#5D733F",
  hoverColor = "#4d6034",
}: GiftRegistryModalProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"groom" | "bride">("groom");

  if (!isOpen) return null;

  const {
    groomName,
    brideName,
    groomBankName,
    groomAccountNumber,
    groomAccountName,
    groomQrCode,
    brideBankName,
    brideAccountNumber,
    brideAccountName,
    brideQrCode,
  } = weddingData;

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const isGroom = activeTab === "groom";
  const currentBankName = isGroom ? (groomBankName || "Vietcombank") : (brideBankName || "MB Bank");
  const currentAccNum = isGroom ? (groomAccountNumber || "1028394859") : (brideAccountNumber || "9876543210");
  const currentAccName = isGroom ? (groomAccountName || (groomName || "NGUYEN VAN A")) : (brideAccountName || (brideName || "LE THI B"));
  const currentQr = isGroom ? (groomQrCode || "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=MUNG%20CUOI%20CHU%20RE") : (brideQrCode || "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=MUNG%20CUOI%20CO%20DAU");

  return (
    <div
      className="fixed inset-0 z-[120] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 select-none animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl border border-stone-200 flex flex-col text-stone-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="text-white p-4 flex justify-between items-center relative"
          style={{ backgroundColor: accentColor }}
        >
          <div className="flex items-center gap-2">
            <QrCode size={20} />
            <h3 className="font-serif text-base font-semibold uppercase tracking-wider">
              Mừng Cưới Đến Dâu Rể
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-all cursor-pointer"
            aria-label="Đóng"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-stone-200 bg-stone-50">
          <button
            onClick={() => setActiveTab("groom")}
            className={`flex-1 py-3 text-xs sm:text-sm font-serif font-semibold tracking-wider transition-all cursor-pointer ${
              isGroom
                ? "bg-white"
                : "text-gray-500"
            }`}
            style={{
              color: isGroom ? accentColor : undefined,
              borderBottom: isGroom ? `2px solid ${accentColor}` : undefined,
            }}
          >
            CHÚ RỂ ({groomName || "Chú rể"})
          </button>
          <button
            onClick={() => setActiveTab("bride")}
            className={`flex-1 py-3 text-xs sm:text-sm font-serif font-semibold tracking-wider transition-all cursor-pointer ${
              !isGroom
                ? "bg-white"
                : "text-gray-500"
            }`}
            style={{
              color: !isGroom ? accentColor : undefined,
              borderBottom: !isGroom ? `2px solid ${accentColor}` : undefined,
            }}
          >
            CÔ DÂU ({brideName || "Cô dâu"})
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 flex flex-col items-center text-center">
          {/* QR Code Container */}
          <div
            className="w-48 h-48 bg-white p-2 rounded-2xl border-2 shadow-md mb-4 flex items-center justify-center"
            style={{ borderColor: `${accentColor}40` }}
          >
            <img
              src={currentQr}
              alt="Mã QR Mừng Cưới"
              className="w-full h-full object-contain rounded-xl"
            />
          </div>

          {/* Account Details */}
          <div className="w-full bg-stone-50 rounded-2xl p-3.5 border border-stone-200 space-y-2 text-xs font-serif">
            <div className="flex justify-between items-center py-1 border-b border-gray-200">
              <span className="text-gray-500">Ngân hàng:</span>
              <span className="font-bold uppercase" style={{ color: accentColor }}>
                {currentBankName}
              </span>
            </div>

            <div className="flex justify-between items-center py-1 border-b border-gray-200">
              <span className="text-gray-500">Chủ tài khoản:</span>
              <span className="font-bold text-stone-800 uppercase">{currentAccName}</span>
            </div>

            <div className="flex justify-between items-center py-1">
              <span className="text-gray-500">Số tài khoản:</span>
              <div className="flex items-center gap-2">
                <span className="font-bold font-mono text-sm" style={{ color: accentColor }}>
                  {currentAccNum}
                </span>
                <button
                  onClick={() => copyToClipboard(currentAccNum, "accNum")}
                  className="p-1 text-gray-500 hover:text-stone-800 transition-colors cursor-pointer"
                  title="Sao chép số tài khoản"
                >
                  {copiedField === "accNum" ? (
                    <Check size={14} className="text-emerald-600" />
                  ) : (
                    <Copy size={14} />
                  )}
                </button>
              </div>
            </div>
          </div>

          {copiedField && (
            <p className="text-[11px] text-emerald-600 font-serif mt-2 animate-in fade-in">
              ✓ Đã sao chép vào bộ nhớ tạm!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
