import { useState } from "react";
import { Gift, Check, Copy } from "lucide-react";
import { FadeIn } from "@/shared/ui/FadeIn";
import { SectionHeading } from "./SectionHeading";
import { GiftRegistryInfo } from "../model/types";

interface GiftRegistryProps {
  giftInfo?: GiftRegistryInfo;
}

export function GiftRegistry({ giftInfo }: GiftRegistryProps) {
  const [copied, setCopied] = useState<string | null>(null);

  if (!giftInfo) return null;

  function copyBank(val: string, key: string) {
    navigator.clipboard.writeText(val).catch(() => {});
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  }

  const accounts = [];
  if (giftInfo.groomBankName && giftInfo.groomAccountNumber) {
    accounts.push({
      bank: giftInfo.groomBankName,
      name: giftInfo.groomAccountName || "Chú rể",
      number: giftInfo.groomAccountNumber,
      qrUrl: giftInfo.groomQrUrl,
      title: "Mừng cưới Chú rể",
      key: "groom"
    });
  }
  if (giftInfo.brideBankName && giftInfo.brideAccountNumber) {
    accounts.push({
      bank: giftInfo.brideBankName,
      name: giftInfo.brideAccountName || "Cô dâu",
      number: giftInfo.brideAccountNumber,
      qrUrl: giftInfo.brideQrUrl,
      title: "Mừng cưới Cô dâu",
      key: "bride"
    });
  }

  if (accounts.length === 0) return null;

  return (
    <section className="py-20 px-4 max-w-lg mx-auto">
      <FadeIn><SectionHeading en="Gift" vi="Mừng cưới" /></FadeIn>
      <FadeIn delay={100}>
        <div className="bg-white rounded-2xl p-8 shadow-sm border text-center" style={{ borderColor: "rgba(201,130,142,0.2)" }}>
          <Gift size={32} className="mx-auto mb-4 text-[#c9828e]" strokeWidth={1.5} />
          <p className="text-sm leading-relaxed mb-6" style={{ color: "#7a5c4f" }}>
            Sự hiện diện của quý vị là món quà quý giá nhất với chúng mình. Nếu quý vị muốn gửi thêm tình cảm, đây là thông tin mừng cưới:
          </p>
          <div className="space-y-4">
            {accounts.map((acc) => (
              <div key={acc.key} className="rounded-xl p-4 text-left flex flex-col sm:flex-row gap-4 items-center" style={{ backgroundColor: "rgba(253,246,239,0.8)", border: "1px solid rgba(201,130,142,0.15)" }}>
                {acc.qrUrl && (
                  <div className="w-24 h-24 bg-white p-1 rounded-lg border border-[#c9828e]/20 flex-shrink-0 flex items-center justify-center">
                    <img src={acc.qrUrl} alt={`QR ${acc.title}`} className="w-full h-full object-contain" />
                  </div>
                )}
                <div className="flex-1 w-full">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#c9828e" }}>{acc.title} ({acc.bank})</p>
                    <button onClick={() => copyBank(acc.number, acc.key)}
                      className="flex items-center gap-1 text-xs px-3 py-1 rounded-lg transition-colors border-0 cursor-pointer"
                      style={{ color: "#8b3a52", backgroundColor: "rgba(139,58,82,0.08)" }}>
                      {copied === acc.key ? <><Check size={11} /> Đã copy</> : <><Copy size={11} /> Sao chép</>}
                    </button>
                  </div>
                  <p className="text-sm font-semibold" style={{ color: "#2c1810" }}>STK: {acc.number}</p>
                  <p className="text-xs mt-0.5" style={{ color: "#7a5c4f" }}>Chủ TK: {acc.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
