"use client";

import { useState } from "react";
import Image from "next/image";
import { Sparkles, MailOpen } from "lucide-react";
import { WeddingData } from "@/entities/invitation/model/types";

interface InvitationCoverProps {
  weddingData: WeddingData;
  guestName?: string;
  onOpen: () => void;
}

export function InvitationCover({
  weddingData,
  guestName,
  onOpen,
}: InvitationCoverProps) {
  const [isOpening, setIsOpening] = useState(false);

  const graduateName =
    weddingData.brideName || weddingData.groomName || "Đặng Mai Trang";
  const recipient = guestName?.trim() || "Cả nhà iu";

  const handleOpenClick = () => {
    setIsOpening(true);
    setTimeout(() => {
      onOpen();
    }, 700);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#F8F6F3] px-4 transition-all duration-700 ${
        isOpening ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
      }`}
    >
      {/* Background Soft Pink Watercolor Glows */}
      <div className="absolute top-10 left-10 w-60 h-60 bg-[#FFE7ED] rounded-full blur-3xl pointer-events-none opacity-80" />
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-[#FFE7ED] rounded-full blur-3xl pointer-events-none opacity-80" />

      {/* Main Elegant Envelope Container matching Burgundy & Blush Theme */}
      <div className="relative w-full max-w-[380px] aspect-[4/5] sm:aspect-[3/4] flex flex-col items-center justify-between p-6 sm:p-8 rounded-2xl bg-[#FFF9FA] border border-[#9B343D]/25 shadow-[0_20px_50px_rgba(155,52,61,0.15)] text-center overflow-hidden">
        {/* Top Wax Seal Bow */}
        <div className="absolute -top-3 -right-3 w-16 h-16 pointer-events-none z-20">
          <Image
            src="https://w.ladicdn.com/s450x450/69b247cf4f6ddc0012f0ce55/elements-thiep-16-20260723042420-yfzqc.png"
            alt="Wax Seal Bow"
            fill
            className="object-contain drop-shadow-md"
          />
        </div>

        {/* Top Emblem & Header */}
        <div className="flex flex-col items-center gap-1 pt-2 z-10">
          <div className="w-12 h-12 relative pointer-events-none mb-1">
            <Image
              src="https://w.ladicdn.com/s550x550/69b247cf4f6ddc0012f0ce55/elements-thiep-17-20260723043335-d3sit.png"
              alt="Graduation Cap"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-[12px] font-hastegi tracking-[0.25em] uppercase text-[#9B343D] font-bold flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-[#9B343D]" />
            THIỆP MỜI TỐT NGHIỆP
            <Sparkles className="w-3 h-3 text-[#9B343D]" />
          </span>
          <span className="text-[10px] font-hastegi tracking-[0.2em] uppercase text-[#9B343D]/70">
            CLASS OF 2026
          </span>
        </div>

        {/* Middle Recipient Card */}
        <div className="w-full bg-[#FFE7ED]/60 text-[#9B343D] rounded-xl p-5 shadow-sm border border-[#9B343D]/20 relative my-auto z-10">
          <div className="text-[13px] font-hastegi italic text-[#9B343D]">
            Thân mời
          </div>
          <div className="text-2xl sm:text-3xl font-morgina font-normal text-[#9B343D] mt-0.5 text-balance">
            {recipient}
          </div>
          <div className="w-12 h-[1px] bg-[#9B343D]/40 mx-auto my-2" />
          <div className="text-[12px] font-hastegi text-[#9B343D]/90">
            Đến tham dự Lễ Tốt Nghiệp của Tân cử nhân
          </div>
          <div className="text-2xl font-hoatay text-[#9B343D] mt-1">
            {graduateName}
          </div>
        </div>

        {/* Bottom Button */}
        <div className="w-full pb-2 flex flex-col items-center gap-2 z-10">
          <button
            onClick={handleOpenClick}
            className="w-full py-3.5 px-6 rounded-full bg-[#9B343D] text-white font-hastegi font-bold text-[14px] tracking-wider uppercase shadow-[0_4px_16px_rgba(155,52,61,0.3)] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer border border-[#fff]/30 animate-pulse"
          >
            <MailOpen className="w-4 h-4" />
            <span>Mở Thiệp Chúc Mừng</span>
          </button>
          <span className="text-[11px] text-[#9B343D]/70 font-hastegi tracking-wide">
            Chạm để mở thiệp & lắng nghe giai điệu
          </span>
        </div>
      </div>
    </div>
  );
}
