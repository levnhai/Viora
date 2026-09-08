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

  const accounts: Array<{
    bank: string;
    name: string;
    number: string;
    qrUrl?: string;
    title: string;
    key: string;
  }> = [];
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
        <div className="bg-card rounded-2xl p-8 shadow-sm border border-primary/20 text-center">
          <Gift size={32} className="mx-auto mb-4 text-primary" strokeWidth={1.5} />
          <p className="text-sm leading-relaxed mb-6 text-muted-foreground">
            Sự hiện diện của quý vị là món quà quý giá nhất với chúng mình. Nếu quý vị muốn gửi thêm tình cảm, đây là thông tin mừng cưới:
          </p>
          <div className="space-y-4">
            {accounts.map((acc) => (
              <div key={acc.key} className="rounded-xl p-4 text-left flex flex-col sm:flex-row gap-4 items-center bg-background/80 border border-primary/15">
                {acc.qrUrl && (
                  <div className="w-24 h-24 bg-card p-1 rounded-lg border border-primary/20 flex-shrink-0 flex items-center justify-center">
                    <img src={acc.qrUrl} alt={`QR ${acc.title}`} className="w-full h-full object-contain" />
                  </div>
                )}
                <div className="flex-1 w-full">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary">{acc.title} ({acc.bank})</p>
                    <button onClick={() => copyBank(acc.number, acc.key)}
                      className="flex items-center gap-1 text-xs px-3 py-1 rounded-lg transition-colors border-0 cursor-pointer text-primary bg-primary/10">
                      {copied === acc.key ? <><Check size={11} /> Đã copy</> : <><Copy size={11} /> Sao chép</>}
                    </button>
                  </div>
                  <p className="text-sm font-semibold text-foreground">STK: {acc.number}</p>
                  <p className="text-xs mt-0.5 text-muted-foreground">Chủ TK: {acc.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
