"use client";

import { useState } from "react";
import Image from "next/image";
import { Copy, Check, Download } from "lucide-react";
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

  const giftInfo = weddingData.giftInfo || {};

  const groomBank = {
    bankName: giftInfo.groomBankName || "MB Bank",
    accountNumber: giftInfo.groomAccountNumber || "999988882912",
    accountHolder: (giftInfo.groomAccountName || "LE MANH DUC").toUpperCase(),
    qrUrl:
      giftInfo.groomQrUrl ||
      `https://api.vietqr.io/image/970422-${giftInfo.groomAccountNumber || "999988882912"}-compact2.jpg?amount=0&addInfo=Mung%20Cuoi%20${encodeURIComponent(groomName)}&accountName=${encodeURIComponent(giftInfo.groomAccountName || "LE MANH DUC")}`,
  };

  const brideBank = {
    bankName: giftInfo.brideBankName || "Techcombank",
    accountNumber: giftInfo.brideAccountNumber || "190367882912",
    accountHolder: (giftInfo.brideAccountName || "VU LAN NHI").toUpperCase(),
    qrUrl:
      giftInfo.brideQrUrl ||
      `https://api.vietqr.io/image/970407-${giftInfo.brideAccountNumber || "190367882912"}-compact2.jpg?amount=0&addInfo=Mung%20Cuoi%20${encodeURIComponent(brideName)}&accountName=${encodeURIComponent(giftInfo.brideAccountName || "VU LAN NHI")}`,
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

  const handleDownloadQr = (url: string, filename: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = `${filename}.jpg`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const isGroom = activeTab === "groom";
  const currentBank = isGroom ? groomBank : brideBank;
  const isCopied = isGroom ? copiedGroom : copiedBride;

  return (
    <section
      id="giftbox"
      style={{
        backgroundColor: "#FAF8F5",
        padding: "44px 20px 48px 20px",
      }}
      className="relative w-full select-none overflow-hidden"
    >
      <div style={{ maxWidth: "380px", margin: "0 auto", textAlign: "center" }} className="henuoc-reveal">
        {/* Phụ đề thanh lịch */}
        <span
          style={{
            fontFamily: "'Cinzel', 'Lora', Georgia, serif",
            fontSize: "11px",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(125, 31, 42, 0.6)",
            fontWeight: 600,
            display: "block",
            marginBottom: "2px",
          }}
        >
          ✦ WEDDING GIFT ✦
        </span>

        {/* Tiêu đề viết tay nghệ thuật đúng chuẩn Hẹn Ước (như Ngày Về Chung Nhà & Thank You) */}
        <h3
          style={{
            fontFamily: "'Great Vibes', 'Alex Brush', cursive",
            fontSize: "48px",
            color: "#7D1F2A",
            lineHeight: 1.15,
            margin: "0 0 6px 0",
          }}
        >
          Hộp Mừng Cưới
        </h3>

        {/* Lời tựa ngắn gọn, duyên dáng */}
        <p
          style={{
            fontFamily: "'Lora', Georgia, serif",
            fontSize: "13px",
            fontStyle: "italic",
            lineHeight: 1.6,
            color: "rgba(125, 31, 42, 0.75)",
            margin: "0 auto 20px auto",
            maxWidth: "310px",
          }}
        >
          Sự hiện diện của Quý Khách là niềm vui lớn nhất. Quý Khách cũng có thể gửi quà mừng từ xa qua mã QR dưới đây:
        </p>

        {/* Tab Chuyển Đổi Thu Gọn Dạng Pill Mảnh Mai */}
        <div
          style={{
            display: "inline-flex",
            padding: "3px",
            borderRadius: "9999px",
            backgroundColor: "rgba(125, 31, 42, 0.08)",
            marginBottom: "18px",
            border: "1px solid rgba(125, 31, 42, 0.1)",
          }}
        >
          <button
            type="button"
            onClick={() => setActiveTab("groom")}
            style={{
              padding: "7px 18px",
              borderRadius: "9999px",
              fontFamily: "'Lora', Georgia, serif",
              fontSize: "12.5px",
              fontWeight: isGroom ? 600 : 400,
              color: isGroom ? "#ffffff" : "#7D1F2A",
              backgroundColor: isGroom ? "#7D1F2A" : "transparent",
              boxShadow: isGroom ? "0 2px 6px rgba(125, 31, 42, 0.25)" : "none",
              border: "none",
              cursor: "pointer",
              transition: "all 0.2s ease",
              whiteSpace: "nowrap",
            }}
          >
            Mừng Chú Rể
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("bride")}
            style={{
              padding: "7px 18px",
              borderRadius: "9999px",
              fontFamily: "'Lora', Georgia, serif",
              fontSize: "12.5px",
              fontWeight: !isGroom ? 600 : 400,
              color: !isGroom ? "#ffffff" : "#7D1F2A",
              backgroundColor: !isGroom ? "#7D1F2A" : "transparent",
              boxShadow: !isGroom ? "0 2px 6px rgba(125, 31, 42, 0.25)" : "none",
              border: "none",
              cursor: "pointer",
              transition: "all 0.2s ease",
              whiteSpace: "nowrap",
            }}
          >
            Mừng Cô Dâu
          </button>
        </div>

        {/* Card Trắng Tinh Gọn (Compact Silk Card) */}
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "18px",
            border: "1px solid rgba(125, 31, 42, 0.12)",
            boxShadow: "0 8px 24px rgba(125, 31, 42, 0.06)",
            padding: "20px 18px 18px 18px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          key={activeTab}
        >
          {/* Mã QR Thu Nhỏ Gọn Gàng 150px */}
          <div
            style={{
              width: "154px",
              height: "154px",
              borderRadius: "12px",
              backgroundColor: "#ffffff",
              border: "1px solid rgba(125, 31, 42, 0.15)",
              padding: "6px",
              boxSizing: "border-box",
              position: "relative",
              marginBottom: "12px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
            }}
          >
            <Image
              src={currentBank.qrUrl}
              alt={`QR ${isGroom ? groomName : brideName}`}
              fill
              sizes="154px"
              className="object-contain p-1"
              unoptimized
            />
          </div>

          {/* Tên Ngân Hàng & Tên Chủ Tài Khoản Thu Gọn */}
          <div
            style={{
              fontFamily: "'Cinzel', Georgia, serif",
              fontSize: "11px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "rgba(125, 31, 42, 0.65)",
              fontWeight: 600,
            }}
          >
            {currentBank.bankName}
          </div>

          <div
            style={{
              fontFamily: "'Lora', Georgia, serif",
              fontSize: "15px",
              fontWeight: 700,
              color: "#7D1F2A",
              marginTop: "2px",
              marginBottom: "10px",
              letterSpacing: "0.04em",
            }}
          >
            {currentBank.accountHolder}
          </div>

          {/* Khung STK & Nút Sao Chép Gọn Gàng */}
          <div
            style={{
              width: "100%",
              maxWidth: "290px",
              backgroundColor: "#FAF8F5",
              border: "1px solid rgba(125, 31, 42, 0.12)",
              borderRadius: "10px",
              padding: "6px 8px 6px 12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "8px",
              boxSizing: "border-box",
              marginBottom: "10px",
            }}
          >
            <span
              style={{
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                fontSize: "14px",
                fontWeight: 700,
                letterSpacing: "0.06em",
                color: "#7D1F2A",
              }}
            >
              {currentBank.accountNumber}
            </span>

            <button
              type="button"
              onClick={() => copyText(currentBank.accountNumber, isGroom ? "groom" : "bride")}
              style={{
                backgroundColor: isCopied ? "#059669" : "#7D1F2A",
                color: "#ffffff",
                border: "none",
                borderRadius: "6px",
                padding: "5px 10px",
                fontFamily: "'Lora', Georgia, serif",
                fontSize: "11.5px",
                fontWeight: 600,
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                cursor: "pointer",
                transition: "all 0.2s ease",
                whiteSpace: "nowrap",
              }}
              className="hover:opacity-90 active:scale-95"
            >
              {isCopied ? (
                <>
                  <Check size={12} />
                  <span>Đã chép</span>
                </>
              ) : (
                <>
                  <Copy size={12} />
                  <span>Sao chép</span>
                </>
              )}
            </button>
          </div>

          {/* Nút Tải QR Nhỏ Xinh Mảnh Mai */}
          <button
            type="button"
            onClick={() =>
              handleDownloadQr(
                currentBank.qrUrl,
                `QR_Mung_Cuoi_${isGroom ? `Chu_Re_${groomName}` : `Co_Dau_${brideName}`}`
              )
            }
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "rgba(125, 31, 42, 0.7)",
              fontFamily: "'Lora', Georgia, serif",
              fontSize: "11.5px",
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              cursor: "pointer",
              padding: "4px 8px",
              transition: "color 0.2s ease",
            }}
            className="hover:text-[#7D1F2A]"
          >
            <Download size={12} />
            <span>Tải ảnh mã QR</span>
          </button>
        </div>
      </div>
    </section>
  );
}
