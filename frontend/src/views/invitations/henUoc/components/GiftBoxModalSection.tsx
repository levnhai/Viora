"use client";

import { useState } from "react";
import Image from "next/image";
import { Gift, Copy, Check, QrCode } from "lucide-react";
import { WeddingData } from "@/entities/invitation/model/types";

interface GiftBoxModalSectionProps {
  weddingData: WeddingData;
}

export function GiftBoxModalSection({
  weddingData,
}: GiftBoxModalSectionProps) {
  const [copiedGroom, setCopiedGroom] = useState(false);
  const [copiedBride, setCopiedBride] = useState(false);
  const [activeTab, setActiveTab] = useState<"groom" | "bride">("groom");

  const groomName = weddingData.groomShortName || weddingData.groomName || "Mạnh Đức";
  const brideName = weddingData.brideShortName || weddingData.brideName || "Lan Nhi";

  const groomBank = {
    bankName: "MB Bank",
    accountNumber: "999988882912",
    accountHolder: "LE MANH DUC",
    qrUrl: `https://api.vietqr.io/image/970422-999988882912-compact2.jpg?amount=0&addInfo=Mung%20Cuoi%20Manh%20Duc&accountName=LE%20MANH%20DUC`,
  };

  const brideBank = {
    bankName: "Techcombank",
    accountNumber: "190367882912",
    accountHolder: "VU LAN NHI",
    qrUrl: `https://api.vietqr.io/image/970407-190367882912-compact2.jpg?amount=0&addInfo=Mung%20Cuoi%20Lan%20Nhi&accountName=VU%20LAN%20NHI`,
  };

  const copyText = (text: string, type: "groom" | "bride") => {
    navigator.clipboard.writeText(text);
    if (type === "groom") {
      setCopiedGroom(true);
      setTimeout(() => setCopiedGroom(false), 2000);
    } else {
      setCopiedBride(true);
      setTimeout(() => setCopiedBride(false), 2000);
    }
  };

  return (
    <section id="giftbox" className="relative w-full px-5 py-14 bg-[#F5F3EF] text-[#7D1F2A] border-t border-[#7D1F2A]/10">
      <div className="max-w-[440px] mx-auto flex flex-col items-center">
        {/* Tiêu đề */}
        <div className="text-center mb-8">
          <div className="w-10 h-10 rounded-full bg-[#7D1F2A]/10 flex items-center justify-center mx-auto mb-3 text-[#7D1F2A]">
            <Gift className="w-5 h-5" />
          </div>
          <span className="text-[11px] uppercase tracking-[0.3em] font-henuoc-sans text-[#7D1F2A]/60 block mb-1">
            Wedding Gift
          </span>
          <h3 className="text-2xl sm:text-3xl font-henuoc-serif font-medium uppercase tracking-wide">
            Hộp Mừng Cưới
          </h3>
          <p className="mt-2 text-xs sm:text-sm font-henuoc-serif italic text-[#7D1F2A]/80 leading-relaxed max-w-[340px] mx-auto">
            Sự hiện diện và lời chúc phúc của Quý Khách là món quà ý nghĩa nhất. Nếu muốn gửi quà mừng từ xa, Quý Khách có thể chuyển khoản qua thông tin dưới đây:
          </p>
        </div>

        {/* Tab Chọn Chú Rể / Cô Dâu */}
        <div className="grid grid-cols-2 gap-2 w-full max-w-[340px] mb-6">
          <button
            type="button"
            onClick={() => setActiveTab("groom")}
            className={`py-2 px-4 rounded-xl text-xs font-henuoc-serif font-medium transition-all ${
              activeTab === "groom"
                ? "bg-[#7D1F2A] text-white shadow"
                : "bg-white text-[#7D1F2A]/70 hover:bg-[#7D1F2A]/10 border border-[#7D1F2A]/15"
            }`}
          >
            Mừng Chú Rể ({groomName})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("bride")}
            className={`py-2 px-4 rounded-xl text-xs font-henuoc-serif font-medium transition-all ${
              activeTab === "bride"
                ? "bg-[#7D1F2A] text-white shadow"
                : "bg-white text-[#7D1F2A]/70 hover:bg-[#7D1F2A]/10 border border-[#7D1F2A]/15"
            }`}
          >
            Mừng Cô Dâu ({brideName})
          </button>
        </div>

        {/* Khung Thông Tin Chuyển Khoản & QR */}
        <div className="w-full max-w-[360px] p-6 rounded-2xl bg-white border border-[#7D1F2A]/15 shadow-sm flex flex-col items-center text-center animate-henuoc-fade-in">
          {activeTab === "groom" ? (
            <>
              {/* QR Chú rể */}
              <div className="relative w-48 h-48 rounded-xl overflow-hidden border border-[#7D1F2A]/20 p-2 bg-white shadow-sm mb-4">
                <Image
                  src={groomBank.qrUrl}
                  alt="QR Mừng Chú Rể"
                  fill
                  className="object-contain p-2"
                />
              </div>

              <div className="text-xs uppercase tracking-wider font-henuoc-sans text-[#7D1F2A]/70">
                {groomBank.bankName}
              </div>
              <div className="text-lg font-henuoc-serif font-bold text-[#7D1F2A] my-0.5">
                {groomBank.accountHolder}
              </div>
              <div className="flex items-center gap-2 mt-2 px-3 py-1.5 rounded-lg bg-[#F5F3EF] border border-[#7D1F2A]/15">
                <span className="font-mono text-sm text-[#7D1F2A] font-semibold">
                  {groomBank.accountNumber}
                </span>
                <button
                  onClick={() => copyText(groomBank.accountNumber, "groom")}
                  className="p-1 text-[#7D1F2A] hover:opacity-80 active:scale-90 transition-transform"
                  title="Sao chép số tài khoản"
                >
                  {copiedGroom ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
              {copiedGroom && (
                <span className="text-[11px] text-emerald-600 font-henuoc-sans mt-1">
                  Đã sao chép số tài khoản!
                </span>
              )}
            </>
          ) : (
            <>
              {/* QR Cô dâu */}
              <div className="relative w-48 h-48 rounded-xl overflow-hidden border border-[#7D1F2A]/20 p-2 bg-white shadow-sm mb-4">
                <Image
                  src={brideBank.qrUrl}
                  alt="QR Mừng Cô Dâu"
                  fill
                  className="object-contain p-2"
                />
              </div>

              <div className="text-xs uppercase tracking-wider font-henuoc-sans text-[#7D1F2A]/70">
                {brideBank.bankName}
              </div>
              <div className="text-lg font-henuoc-serif font-bold text-[#7D1F2A] my-0.5">
                {brideBank.accountHolder}
              </div>
              <div className="flex items-center gap-2 mt-2 px-3 py-1.5 rounded-lg bg-[#F5F3EF] border border-[#7D1F2A]/15">
                <span className="font-mono text-sm text-[#7D1F2A] font-semibold">
                  {brideBank.accountNumber}
                </span>
                <button
                  onClick={() => copyText(brideBank.accountNumber, "bride")}
                  className="p-1 text-[#7D1F2A] hover:opacity-80 active:scale-90 transition-transform"
                  title="Sao chép số tài khoản"
                >
                  {copiedBride ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
              {copiedBride && (
                <span className="text-[11px] text-emerald-600 font-henuoc-sans mt-1">
                  Đã sao chép số tài khoản!
                </span>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
