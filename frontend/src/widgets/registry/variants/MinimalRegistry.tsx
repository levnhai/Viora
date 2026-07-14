import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { FadeIn } from "@/shared/ui/FadeIn";
import { WeddingData } from "@/entities/invitation/model/types";
import { Download, X } from "lucide-react";

interface MinimalRegistryProps {
  weddingData: WeddingData;
}

export function MinimalRegistry({ weddingData }: MinimalRegistryProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  // Bỏ return null để luôn hiển thị phong bao mừng cưới (dùng cho preview)
  // if (registries.length === 0) return null;

  const handleSaveQR = (qrUrl: string, name: string) => {
    // Logic to save/download QR code image
    const link = document.createElement("a");
    link.href = qrUrl;
    link.download = `QR_${name}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="py-10 sm:py-20 px-4 relative">
      <div className="max-w-4xl mx-auto text-center">
        <FadeIn>
          <div className="mb-16">
            <h2 className="text-2xl text-[rgb(225,188,124)] uppercase tracking-widest font-serif">
              PHONG BAO MỪNG CƯỚI
            </h2>
          </div>

          {/* Red Envelope Graphic */}
          <div
            onClick={() => setModalOpen(true)}
            className="relative w-48 h-64 mx-auto cursor-pointer group transition-transform hover:scale-105 duration-500"
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-[rgb(225,188,124)] blur-[50px] opacity-20 group-hover:opacity-40 transition-opacity duration-500 rounded-full" />

            {/* Envelope body */}
            <div className="absolute inset-0 bg-[#C41E26] rounded-xl shadow-2xl border border-[rgb(225,188,124)]/30 overflow-hidden flex items-center justify-center">
              {/* Corner decorations */}
              <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[rgb(225,188,124)]" />
              <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-[rgb(225,188,124)]" />
              <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-[rgb(225,188,124)]" />
              <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[rgb(225,188,124)]" />

              {/* Double Happiness Character */}
              <div className="w-16 h-16 rounded-full border-2 border-[rgb(225,188,124)] flex items-center justify-center bg-[#C41E26] z-10 shadow-[0_0_15px_rgba(225,188,124,0.3)]">
                <span className="text-3xl text-[rgb(225,188,124)] font-bold">
                  囍
                </span>
              </div>
            </div>

            {/* Floating coins */}
            <div className="absolute top-4 -left-6 w-6 h-6 rounded-full bg-[rgb(225,188,124)] animate-bounce shadow-lg flex items-center justify-center">
              <div className="w-2 h-2 border border-[#C41E26]" />
            </div>
            <div
              className="absolute bottom-12 -right-8 w-8 h-8 rounded-full bg-[rgb(225,188,124)] animate-bounce shadow-lg flex items-center justify-center"
              style={{ animationDelay: "0.5s" }}
            >
              <div className="w-2.5 h-2.5 border border-[#C41E26]" />
            </div>
            <div
              className="absolute top-1/2 -left-10 w-5 h-5 rounded-full bg-[rgb(225,188,124)] animate-bounce shadow-lg flex items-center justify-center"
              style={{ animationDelay: "1s" }}
            >
              <div className="w-1.5 h-1.5 border border-[#C41E26]" />
            </div>
            <div
              className="absolute bottom-4 -left-4 w-7 h-7 rounded-full bg-[rgb(225,188,124)] animate-bounce shadow-lg flex items-center justify-center"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="w-2 h-2 border border-[#C41E26]" />
            </div>
          </div>

          <p className="mt-8 text-[rgb(225,188,124)] text-sm font-serif">
            Nhấn để mở
          </p>

          <p className="text-[rgb(225,188,124)]/80 max-w-lg mx-auto font-serif text-sm leading-relaxed mt-12 px-4">
            Sự hiện diện của quý khách là niềm vinh hạnh của gia đình chúng tôi!
          </p>
        </FadeIn>

        {/* Modal */}
        {mounted &&
          modalOpen &&
          createPortal(
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
              <div
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
                onClick={() => setModalOpen(false)}
              />

              <div className="bg-[rgb(0,26,8)] rounded-3xl w-full max-w-xl relative flex flex-col max-h-[90vh] overflow-hidden shadow-[0_0_40px_rgba(225,188,124,0.2)] animate-in fade-in zoom-in duration-300 border border-[rgb(225,188,124)]/50">
                {/* Header */}
                <div className="p-4 sm:p-6 flex justify-between items-center shrink-0 border-b border-[rgb(225,188,124)]/20 relative">
                  <div className="w-8" /> {/* spacer for centering */}
                  <h3 className="text-xl sm:text-2xl text-[rgb(225,188,124)] font-serif tracking-widest font-semibold uppercase text-center flex-1 drop-shadow-sm">
                    Mừng Cưới
                  </h3>
                  <button
                    onClick={() => setModalOpen(false)}
                    className="w-8 h-8 flex items-center justify-center text-[rgb(225,188,124)]/50 hover:text-[rgb(225,188,124)] hover:bg-[rgb(225,188,124)]/10 rounded-full transition-all"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Content / Scrollable */}
                <div className="p-4 sm:p-6 overflow-y-auto custom-scrollbar flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 text-center bg-[rgb(0,26,8)]">
                  {registries.length === 0 ? (
                    <div className="text-[rgb(225,188,124)] font-serif italic py-10 opacity-70 w-full">
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
                          className="flex flex-col items-center flex-1 bg-[rgb(0,35,12)] p-4 sm:p-5 rounded-2xl shadow-sm border border-[rgb(225,188,124)]/20 relative overflow-hidden group hover:shadow-[0_0_20px_rgba(225,188,124,0.1)] transition-shadow"
                        >
                          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[rgb(225,188,124)]/20 via-[rgb(225,188,124)]/60 to-[rgb(225,188,124)]/20" />

                          <h4 className="font-serif text-[rgb(225,188,124)] mb-3 text-[15px] sm:text-base tracking-[0.2em] uppercase font-medium">
                            {roleName}
                          </h4>

                          {reg.qrCode ? (
                            <div className="bg-white p-2 rounded-xl mb-3 w-32 h-32 sm:w-36 sm:h-36 border border-[rgb(225,188,124)]/30 shadow-[0_0_15px_rgba(255,255,255,0.1)] mx-auto relative group">
                              <img
                                src={reg.qrCode}
                                alt="QR Code"
                                className="w-full h-full object-contain"
                              />
                            </div>
                          ) : (
                            <div className="bg-white/5 border-2 border-dashed border-[rgb(225,188,124)]/30 rounded-xl mb-3 w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center mx-auto">
                              <span className="text-[rgb(225,188,124)]/50 text-sm font-serif italic">
                                Chưa có mã QR
                              </span>
                            </div>
                          )}

                          <div className="text-[rgb(225,188,124)] font-serif space-y-1 mb-4">
                            <p className="text-[10px] opacity-70 uppercase tracking-widest font-sans">
                              {reg.bankName || "Tên ngân hàng"}
                            </p>
                            <p className="font-bold tracking-widest text-base sm:text-lg text-[rgb(225,188,124)] drop-shadow-[0_0_8px_rgba(225,188,124,0.3)]">
                              {reg.accountNumber || "Số tài khoản"}
                            </p>
                            <p className="text-[13px] opacity-90 capitalize font-medium">
                              {reg.accountName || fullName}
                            </p>
                          </div>

                          {reg.qrCode && (
                            <button
                              onClick={() => handleSaveQR(reg.qrCode, fullName)}
                              className="px-2 py-2 bg-transparent border border-[rgb(225,188,124)]/50 rounded-full text-[9px] uppercase tracking-widest text-[rgb(225,188,124)] hover:bg-[rgb(225,188,124)] hover:text-[rgb(0,26,8)] transition-all flex items-center justify-center gap-2 mx-auto w-full max-w-[100px] font-medium"
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
