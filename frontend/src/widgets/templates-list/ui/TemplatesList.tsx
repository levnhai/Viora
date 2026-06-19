import { useState } from "react";
import { TEMPLATES } from "@/entities/template/model/templates";
import { TemplateConfig } from "@/entities/template/model/schema";
import { TemplateCard } from "@/entities/template/ui/TemplateCard";
import { PreviewModal } from "@/entities/template/ui/PreviewModal";

interface TemplatesListProps {
  onPreviewDemo: (tplId: number) => void;
  onUseTemplate: (tplId: number) => void;
}

const TIER_LABELS: Record<string, string> = {
  free: "Miễn phí",
  basic: "Cơ bản",
  premium: "Cao cấp",
};

export function TemplatesList({ onPreviewDemo, onUseTemplate }: TemplatesListProps) {
  const [activeTier, setActiveTier] = useState("Tất cả");
  const [previewTpl, setPreviewTpl] = useState<TemplateConfig | null>(null);

  const tiers = ["Tất cả", "Miễn phí", "Cơ bản", "Cao cấp"];

  const filtered =
    activeTier === "Tất cả"
      ? TEMPLATES
      : TEMPLATES.filter((t) => TIER_LABELS[t.tier] === activeTier);

  return (
    <section id="mau-thiep" className="py-24 bg-secondary/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div className="text-left">
            <p className="text-xs text-accent uppercase tracking-widest mb-2">
              Mẫu thiệp
            </p>
            <h2
              className="text-4xl text-foreground"
              style={{ fontFamily: "'EB Garamond', serif" }}
            >
              Chọn mẫu yêu thích
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {tiers.map((t) => (
              <button
                key={t}
                onClick={() => setActiveTier(t)}
                className={`px-4 py-2 rounded-xl text-sm transition-all cursor-pointer ${activeTier === t ? "bg-primary text-primary-foreground" : "bg-card border border-border text-muted-foreground hover:text-foreground"}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {filtered.map((tpl) => (
            <TemplateCard
              key={tpl.id}
              tpl={tpl}
              onPreviewDemo={() => {
                setPreviewTpl(tpl);
              }}
              onUseTemplate={onUseTemplate}
            />
          ))}
        </div>
      </div>

      {previewTpl && (
        <PreviewModal
          tpl={previewTpl}
          onClose={() => setPreviewTpl(null)}
          onRequestDesign={() => {
            onUseTemplate(previewTpl.id);
          }}
        />
      )}
    </section>
  );
}
