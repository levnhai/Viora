import { useState } from "react";
import { FadeIn } from "@/shared/ui/FadeIn";
import { WeddingData } from "@/entities/invitation/model/types";
import { Download, X } from "lucide-react";

interface MinimalRegistryProps {
  weddingData: WeddingData;
}

export function MinimalRegistry({ weddingData }: MinimalRegistryProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const giftInfo = weddingData.giftInfo;
  const registries = [];

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
    <section className="py-20 px-4 relative">
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
        {modalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setModalOpen(false)}
            />

            <div className="bg-[rgb(0,26,8)] rounded-2xl w-full max-w-md relative flex flex-col max-h-[90vh] overflow-hidden shadow-2xl border border-[rgb(225,188,124)]/20 animate-in fade-in zoom-in duration-300">
              {/* Header */}
              <div className="bg-[rgb(212,175,55)] p-4 flex justify-between items-center shrink-0">
                <div className="w-8" /> {/* spacer for centering */}
                <h3 className="text-xl text-white font-serif tracking-widest font-semibold uppercase">
                  Phong Bao Mừng Cưới
                </h3>
                <button
                  onClick={() => setModalOpen(false)}
                  className="w-8 h-8 flex items-center justify-center text-white/80 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Content / Scrollable */}
              <div className="p-8 overflow-y-auto custom-scrollbar flex flex-col gap-12 text-center">
                {registries.length === 0 ? (
                  <div className="text-[rgb(225,188,124)] font-serif italic py-10 opacity-70">
                    Gia đình chưa cập nhật thông tin tài khoản
                  </div>
                ) : (
                  registries.map((reg: any, idx: number) => {
                    const roleName = reg.role === "groom" ? "Chú Rể" : "Cô Dâu";
                    const fullName =
                      reg.accountName ||
                      (reg.role === "groom"
                        ? weddingData.groomName
                        : weddingData.brideName);

                    return (
                      <div key={idx} className="flex flex-col items-center">
                        <h4 className="font-serif text-[rgb(225,188,124)] mb-6 text-lg tracking-wide">
                          {roleName} - {fullName}
                        </h4>

                        {reg.qrCode ? (
                          <div className="bg-white p-3 rounded-2xl mb-6 w-48 h-48 shadow-lg">
                            <img
                              src={reg.qrCode}
                              alt="QR Code"
                              className="w-full h-full object-contain"
                            />
                          </div>
                        ) : (
                          <div className="bg-white/5 border border-[rgb(225,188,124)]/30 rounded-2xl mb-6 w-48 h-48 flex items-center justify-center shadow-lg">
                            <span className="text-[rgb(225,188,124)]/50 text-sm font-serif">
                              Chưa có mã QR
                            </span>
                          </div>
                        )}

                        <div className="text-[rgb(225,188,124)] font-serif space-y-2 mb-6">
                          <p className="text-sm opacity-90">
                            {reg.bankName || "Tên ngân hàng"}
                          </p>
                          <p className="font-semibold tracking-wider text-base">
                            {reg.accountNumber || "Số tài khoản"}
                          </p>
                          <p className="text-sm opacity-90">
                            {reg.accountName || fullName}
                          </p>
                        </div>

                        {reg.qrCode && (
                          <button
                            onClick={() => handleSaveQR(reg.qrCode, fullName)}
                            className="px-6 py-2 border border-[rgb(225,188,124)] rounded-full text-sm text-[rgb(225,188,124)] hover:bg-[rgb(225,188,124)] hover:text-[rgb(0,26,8)] transition-colors flex items-center justify-center gap-2"
                          >
                            <Download size={16} />
                            Lưu QR
                          </button>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
