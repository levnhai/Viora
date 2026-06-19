import { X, Clock, MapPin, Music } from "lucide-react";
import { TemplateConfig } from "../model/schema";

interface PreviewModalProps {
  tpl: TemplateConfig;
  onClose: () => void;
  onRequestDesign: () => void;
}

export function PreviewModal({ tpl, onClose, onRequestDesign }: PreviewModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className={`relative bg-card rounded-2xl overflow-hidden shadow-2xl w-full max-w-sm ${tpl.themeClass}`}
        style={{ maxHeight: "90vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-card/80 backdrop-blur flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
        >
          <X size={16} />
        </button>
        <div
          className="overflow-y-auto"
          style={{ maxHeight: "90vh", backgroundColor: "var(--background)" }}
        >
          <div className="relative h-52 overflow-hidden">
            <img
              src={tpl.preview}
              alt={tpl.name}
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to bottom, transparent 40%, var(--background))`,
              }}
            />
          </div>
          <div className="px-8 pb-8 text-center -mt-6 relative">
            <p
              className="text-xs uppercase tracking-widest mb-3"
              style={{
                color: tpl.accentColor,
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Trân trọng kính mời
            </p>
            <h2
              style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: "2.2rem",
                color: tpl.accentColor,
                lineHeight: 1.2,
              }}
            >
              Nguyễn Văn An
            </h2>
            <p className="my-1 text-muted-foreground text-xs">&amp;</p>
            <h2
              style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: "2.2rem",
                color: tpl.accentColor,
                lineHeight: 1.2,
              }}
            >
              Trần Thị Bình
            </h2>
            <p
              className="mt-4 text-xs text-muted-foreground leading-relaxed"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Trân trọng kính mời quý vị đến dự lễ thành hôn của chúng tôi
            </p>
            <div className="mt-5 grid grid-cols-4 gap-2">
              {[
                ["142", "Ngày"],
                ["08", "Giờ"],
                ["34", "Phút"],
                ["22", "Giây"],
              ].map(([v, l]) => (
                <div
                  key={l}
                  className="rounded-lg py-2"
                  style={{ backgroundColor: `${tpl.accentColor}15` }}
                >
                  <p
                    className="text-lg font-medium"
                    style={{
                      color: tpl.accentColor,
                      fontFamily: "'EB Garamond', serif",
                    }}
                  >
                    {v}
                  </p>
                  <p className="text-[9px] text-muted-foreground">{l}</p>
                </div>
              ))}
            </div>
            <div
              className="mt-4 p-4 rounded-xl border border-border/50 space-y-2"
              style={{ backgroundColor: `${tpl.accentColor}08` }}
            >
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Clock size={11} style={{ color: tpl.accentColor }} /> 18:00 ·
                Thứ Bảy, 15/11/2025
              </div>
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <MapPin size={11} style={{ color: tpl.accentColor }} /> Nhà hàng
                Đại Dương, Hà Nội
              </div>
            </div>
            <button
              className="mt-5 w-full py-3 rounded-xl text-sm font-medium text-white transition-opacity hover:opacity-90"
              style={{
                backgroundColor: tpl.accentColor,
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Xác nhận tham dự
            </button>
            <button
              onClick={() => {
                onClose();
                onRequestDesign();
              }}
              className="mt-3 w-full py-3 rounded-xl text-sm font-medium border transition-all hover:opacity-85 flex items-center justify-center gap-1.5 bg-background"
              style={{
                borderColor: tpl.accentColor,
                color: tpl.accentColor,
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              ✨ Đăng ký thiết kế mẫu này
            </button>
            <div className="mt-3.5 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
              <Music size={10} /> <span>Đang phát: A Thousand Years</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
