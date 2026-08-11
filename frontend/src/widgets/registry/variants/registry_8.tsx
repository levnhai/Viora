import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { GsapReveal } from "@/shared/ui/GsapReveal";
import { WeddingData } from "@/entities/invitation/model/types";
import { Download, X } from "lucide-react";
import confetti from "canvas-confetti";
import img_3 from "@/shared/assets/image/giffbox/img_3.svg";
import img_4 from "@/shared/assets/image/giffbox/img_4.svg";
import img_5 from "@/shared/assets/image/giffbox/img_5.svg";
import img_6 from "@/shared/assets/image/giffbox/img_6.svg";
import img_7 from "@/shared/assets/image/giffbox/img_7.svg";
import img_9 from "@/shared/assets/image/giffbox/img_9.svg";
import img_10 from "@/shared/assets/image/giffbox/img_10.svg";
import img_11 from "@/shared/assets/image/giffbox/img_11.svg";
import img_12 from "@/shared/assets/image/giffbox/img_12.png";

interface Registry_8Props {
  weddingData: WeddingData;
  primaryColor?: string;
  textColor?: string;
}

export function Registry_8({
  weddingData,
  textColor: textColorProp,
}: Registry_8Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [openedBox, setOpenedBox] = useState(false);

  const textColor = textColorProp || "#4e0b12";

  const img12Src =
    typeof img_12 === "string" ? img_12 : (img_12 as any)?.src || img_12;

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const giffboxImages = [
        img_3,
        img_4,
        img_5,
        img_6,
        img_7,
        img_9,
        img_10,
        img_11,
        img12Src,
      ];
      giffboxImages.forEach((img) => {
        const src = typeof img === "string" ? img : (img as any)?.src;
        if (src) {
          const i = new window.Image();
          i.src = src;
        }
      });
    }
  }, [img12Src]);

  const handleOpenGift = () => {
    setOpenedBox(true);
    // Bắn pháo hoa
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: [textColor, "#e8d5c4", "#fdfbf6", "#C41E26"],
      zIndex: 10000,
    });

    // Mở modal sau 1 chút delay để thấy hiệu ứng
    setTimeout(() => {
      setModalOpen(true);
    }, 400);
  };

  const giftInfo = weddingData.giftInfo;
  const registries: any[] = [];

  if (giftInfo) {
    if (giftInfo.groomBankName && giftInfo.groomAccountNumber) {
      registries.push({
        role: "groom",
        bankName: giftInfo.groomBankName,
        accountName: giftInfo.groomAccountName || weddingData.groomName,
        accountNumber: giftInfo.groomAccountNumber,
        qrCode: giftInfo.groomQrUrl,
      });
    }
    if (giftInfo.brideBankName && giftInfo.brideAccountNumber) {
      registries.push({
        role: "bride",
        bankName: giftInfo.brideBankName,
        accountName: giftInfo.brideAccountName || weddingData.brideName,
        accountNumber: giftInfo.brideAccountNumber,
        qrCode: giftInfo.brideQrUrl,
      });
    }
  }

  const handleSaveQR = (qrUrl: string, name: string) => {
    const link = document.createElement("a");
    link.href = qrUrl;
    link.download = `QR_${name}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="py-16 sm:py-24 px-4 relative">
      <style>{`
        @keyframes float-rotate-1 {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
          50% { transform: translateY(-15px) rotate(8deg) scale(1.05); }
        }
        @keyframes float-rotate-2 {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
          50% { transform: translateY(12px) rotate(-12deg) scale(0.95); }
        }
        @keyframes float-rotate-3 {
          0%, 100% { transform: translateY(0px) rotate(5deg) scale(1); }
          50% { transform: translateY(-18px) rotate(-5deg) scale(1.1); }
        }
        @keyframes float-rotate-4 {
          0%, 100% { transform: translateY(0px) rotate(-5deg) scale(1); }
          50% { transform: translateY(18px) rotate(15deg) scale(0.95); }
        }
        @keyframes float-rotate-5 {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
          50% { transform: translateY(-10px) rotate(-8deg) scale(1.1); }
        }
        @keyframes float-rotate-6 {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
          50% { transform: translateY(15px) rotate(10deg) scale(0.9); }
        }
        .animate-float-1 { animation: float-rotate-1 4s ease-in-out infinite; }
        .animate-float-2 { animation: float-rotate-2 5.5s ease-in-out infinite; }
        .animate-float-3 { animation: float-rotate-3 6s ease-in-out infinite; }
        .animate-float-4 { animation: float-rotate-4 4.5s ease-in-out infinite; }
        .animate-float-5 { animation: float-rotate-5 5s ease-in-out infinite; }
        .animate-float-6 { animation: float-rotate-6 6.5s ease-in-out infinite; }
      `}</style>
      <div className="max-w-4xl mx-auto text-center">
        <GsapReveal direction="up" distance={30}>
          <div className="mb-12">
            <h2 
              className="text-2xl uppercase tracking-widest font-serif font-bold"
              style={{ color: textColor }}
            >
              HỘP QUÀ MỪNG
            </h2>
          </div>

          {/* Gift Box Graphic */}
          <div
            onClick={handleOpenGift}
            className="relative w-64 h-64 mx-auto cursor-pointer group transition-transform hover:scale-105 duration-500 flex items-center justify-center"
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-[#f4efe6] blur-[50px] opacity-40 group-hover:opacity-60 transition-opacity duration-500 rounded-full" />

            {/* Floating small boxes - Sparkles and Background */}
            <img 
              src={img_10.src || (img_10 as unknown as string)} 
              className="absolute top-[0%] left-[20%] w-6 h-6 sm:w-8 sm:h-8 object-contain animate-pulse pointer-events-none drop-shadow-sm z-0 opacity-80" 
              style={{ animationDelay: '0.2s' }} 
              alt="sparkle 1" 
            />
            <img 
              src={img_11.src || (img_11 as unknown as string)} 
              className="absolute top-[25%] right-[10%] w-5 h-5 sm:w-7 sm:h-7 object-contain animate-pulse pointer-events-none drop-shadow-sm z-0 opacity-80" 
              style={{ animationDelay: '1s' }} 
              alt="sparkle 2" 
            />
            
            {/* Floating small boxes - Mid layer */}
            <img 
              src={img_4.src || (img_4 as unknown as string)} 
              className="absolute top-[5%] left-[5%] w-14 h-14 sm:w-16 sm:h-16 object-contain animate-float-1 pointer-events-none drop-shadow-md z-0" 
              alt="gift box 4" 
            />
            <img 
              src={img_5.src || (img_5 as unknown as string)} 
              className="absolute top-[5%] right-[12%] w-14 h-14 sm:w-16 sm:h-16 object-contain animate-float-2 pointer-events-none drop-shadow-md z-0" 
              style={{ animationDelay: '1s' }} 
              alt="gift box 5" 
            />
            <img 
              src={img_6.src || (img_6 as unknown as string)} 
              className="absolute top-[45%] left-[5%] w-12 h-12 sm:w-14 sm:h-14 object-contain animate-float-3 pointer-events-none drop-shadow-md z-20" 
              style={{ animationDelay: '0.5s' }} 
              alt="gift box 6" 
            />
            <img 
              src={img_7.src || (img_7 as unknown as string)} 
              className="absolute top-[40%] right-[8%] w-10 h-10 sm:w-12 sm:h-12 object-contain animate-float-4 pointer-events-none drop-shadow-md z-20" 
              style={{ animationDelay: '1.5s' }} 
              alt="gift box 7" 
            />

            {/* Floating small boxes - Foreground layer */}
            <img 
              src={img_9.src || (img_9 as unknown as string)} 
              className="absolute bottom-[5%] left-[10%] w-20 h-20 sm:w-24 sm:h-24 object-contain animate-float-5 pointer-events-none drop-shadow-lg z-20" 
              style={{ animationDelay: '0.8s' }} 
              alt="gift box 9" 
            />
            <img 
              src={img_3.src || (img_3 as unknown as string)} 
              className="absolute bottom-[8%] right-[15%] w-14 h-14 sm:w-16 sm:h-16 object-contain animate-float-6 pointer-events-none drop-shadow-lg z-20" 
              style={{ animationDelay: '1.2s' }} 
              alt="gift box 3" 
            />

            {/* Gift Box Image img_12.png */}
            <div className="relative z-10 w-full h-full animate-bounce-slow flex items-center justify-center p-2">
              <img 
                src={img12Src} 
                alt="Hộp quà mừng cưới 12" 
                loading="eager"
                // @ts-ignore
                fetchPriority="high"
                decoding="async"
                className="w-full h-full object-contain drop-shadow-2xl filter contrast-[1.02] transition-transform duration-300 group-hover:scale-105" 
              />
            </div>
          </div>

          <p className="mt-4 text-sm font-serif" style={{ color: `${textColor}b3` }}>
            Nhấn để mở
          </p>
        </GsapReveal>

        {/* Modal */}
        {mounted &&
          modalOpen &&
          createPortal(
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
              <div
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
                onClick={() => {
                  setModalOpen(false);
                  setOpenedBox(false);
                }}
              />

              <div
                className="bg-[#fdfbf6] rounded-3xl w-full max-w-xl relative flex flex-col max-h-[90vh] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300 border"
                style={{ borderColor: `${textColor}33` }}
              >
                {/* Header */}
                <div
                  className="p-4 sm:p-6 flex justify-between items-center shrink-0 border-b relative"
                  style={{ borderColor: `${textColor}1a` }}
                >
                  <div className="w-8" />
                  <h3
                    className="text-xl sm:text-2xl font-serif tracking-widest font-semibold uppercase text-center flex-1 drop-shadow-sm"
                    style={{ color: textColor }}
                  >
                    Hộp Quà Mừng
                  </h3>
                  <button
                    onClick={() => {
                      setModalOpen(false);
                      setOpenedBox(false);
                    }}
                    className="w-8 h-8 flex items-center justify-center rounded-full transition-all"
                    style={{ color: `${textColor}80` }}
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Content / Scrollable */}
                <div className="p-4 sm:p-6 overflow-y-auto custom-scrollbar flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 text-center bg-[#fdfbf6]">
                  {registries.length === 0 ? (
                    <div
                      className="font-serif italic py-10 opacity-70 w-full"
                      style={{ color: textColor }}
                    >
                      Gia đình chưa cập nhật thông tin tài khoản
                    </div>
                  ) : (
                    registries.map((reg: any, idx: number) => {
                      const roleName =
                        reg.role === "groom" ? "Chú Rể" : "Cô Dâu";
                      const fullName =
                        reg.accountName ||
                        (reg.role === "groom"
                          ? weddingData.groomName
                          : weddingData.brideName);

                      return (
                        <div
                          key={idx}
                          className="flex flex-col items-center flex-1 bg-white p-4 sm:p-5 rounded-2xl shadow-sm border relative overflow-hidden group transition-shadow"
                          style={{ borderColor: `${textColor}20` }}
                        >
                          <div
                            className="absolute top-0 left-0 w-full h-1"
                            style={{
                              background: `linear-gradient(90deg, ${textColor}1a, ${textColor}66, ${textColor}1a)`,
                            }}
                          />

                          <h4
                            className="font-serif mb-3 text-[15px] sm:text-base tracking-[0.2em] uppercase font-medium"
                            style={{ color: textColor }}
                          >
                            {roleName}
                          </h4>

                          {reg.qrCode ? (
                            <div
                              className="bg-white p-2 rounded-xl mb-3 w-32 h-32 sm:w-36 sm:h-36 border shadow-sm mx-auto relative group"
                              style={{ borderColor: `${textColor}33` }}
                            >
                              <img
                                src={reg.qrCode}
                                alt="QR Code"
                                className="w-full h-full object-contain"
                              />
                            </div>
                          ) : (
                            <div
                              className="border-2 border-dashed rounded-xl mb-3 w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center mx-auto"
                              style={{
                                backgroundColor: `${textColor}0d`,
                                borderColor: `${textColor}33`,
                              }}
                            >
                              <span
                                className="text-sm font-serif italic"
                                style={{ color: `${textColor}80` }}
                              >
                                Chưa có mã QR
                              </span>
                            </div>
                          )}

                          <div
                            className="font-serif space-y-1 mb-4"
                            style={{ color: textColor }}
                          >
                            <p className="text-[10px] opacity-70 uppercase tracking-widest font-sans">
                              {reg.bankName || "Tên ngân hàng"}
                            </p>
                            <p
                              className="font-bold tracking-widest text-base sm:text-lg drop-shadow-sm"
                              style={{
                                fontVariantNumeric: "lining-nums tabular-nums",
                              }}
                            >
                              {reg.accountNumber || "Số tài khoản"}
                            </p>
                            <p className="text-[13px] opacity-90 capitalize font-medium">
                              {reg.accountName || fullName}
                            </p>
                          </div>

                          {reg.qrCode && (
                            <button
                              onClick={() => handleSaveQR(reg.qrCode, fullName)}
                              className="px-4 py-2 bg-transparent border rounded-full text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 mx-auto w-full max-w-[120px] font-medium hover:opacity-90"
                              style={{
                                borderColor: `${textColor}4d`,
                                color: textColor,
                              }}
                            >
                              <Download size={14} />
                              LƯU QR
                            </button>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>,
            document.body,
          )}
      </div>
    </section>
  );
}
