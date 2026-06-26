"use client";

import { X, Edit3, MapPin, Users, CheckSquare, Image, Globe, Share2, MessageSquare, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { TemplateConfig } from "../model/schema";

interface PreviewModalProps {
  tpl: TemplateConfig;
  onClose: () => void;
  onRequestDesign: () => void;
}

export function PreviewModal({ tpl, onClose, onRequestDesign }: PreviewModalProps) {
  const router = useRouter();

  const handlePreviewDemo = () => {
    onClose();
    router.push("/wedding-demo");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-[#1c1917] border border-stone-800 rounded-3xl overflow-hidden shadow-2xl w-full max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl max-h-[90vh] flex flex-col md:flex-row p-6 md:p-10 gap-8 text-white select-none text-left transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Nút đóng */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-stone-900/60 hover:bg-stone-800 border-0 flex items-center justify-center text-stone-400 hover:text-white transition-colors cursor-pointer"
        >
          <X size={16} />
        </button>

        {/* Cột trái: Phone Preview mockup */}
        <div className="w-full md:w-[280px] lg:w-[320px] shrink-0 flex items-center justify-center">
          <div className="w-full max-w-[280px] aspect-[9/19] rounded-[2rem] border-8 border-stone-800 bg-stone-950 shadow-2xl overflow-hidden relative flex flex-col">
            {/* Thanh Status bar của điện thoại giả lập */}
            <div className="absolute top-0 inset-x-0 h-5 bg-black/15 z-10 flex items-center justify-between px-4 text-[8px] text-white/50 font-sans">
              <span>9:41</span>
              <div className="flex items-center gap-1">
                <span>📶</span>
                <span>🔋</span>
              </div>
            </div>
            
            {/* Nội dung màn hình điện thoại */}
            <div
              className={`flex-1 overflow-y-auto pt-5 text-center flex flex-col scrollbar-none ${tpl.themeClass}`}
              style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}
            >
              {/* Ảnh bìa lãng mạn phía trên */}
              <div className="relative aspect-[4/5] w-full overflow-hidden shrink-0">
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
                {/* Tấm ảnh nghiêng đè lên (giống phong cách của demo ảnh chụp) */}
                <div className="absolute bottom-3 right-3 w-20 aspect-[3/4] bg-white p-1 rounded shadow-md rotate-[6deg] border border-gray-100/40">
                  <img
                    src={tpl.preview}
                    alt={tpl.name}
                    className="w-full h-full object-cover rounded-sm"
                  />
                </div>
              </div>

              {/* Chi tiết thiệp giả lập */}
              <div className="px-5 pb-5 pt-1 flex-1 flex flex-col justify-between">
                <div className="space-y-1">
                  <p
                    className="text-[8px] uppercase tracking-widest font-sans font-semibold"
                    style={{ color: tpl.accentColor }}
                  >
                    Trân trọng kính mời
                  </p>
                  <h3
                    style={{
                      fontFamily: "'Great Vibes', cursive",
                      fontSize: "1.6rem",
                      color: tpl.accentColor,
                      lineHeight: 1.1,
                    }}
                  >
                    Thanh Diệp
                  </h3>
                  <p className="text-[8px] text-muted-foreground my-0.5">&amp;</p>
                  <h3
                    style={{
                      fontFamily: "'Great Vibes', cursive",
                      fontSize: "1.6rem",
                      color: tpl.accentColor,
                      lineHeight: 1.1,
                    }}
                  >
                    Khánh Duy
                  </h3>
                </div>

                <div className="mt-4 py-2 border-y border-border/50 text-[9px] text-muted-foreground space-y-0.5 font-sans leading-relaxed">
                  <p className="font-semibold">18:00 · Thứ Bảy, 15/11/2025</p>
                  <p className="truncate">Nhà hàng Đại Dương, Hà Nội</p>
                </div>

                <button
                  className="mt-4 w-full py-2 rounded-lg text-[9px] font-bold text-white tracking-wider uppercase font-sans border-0 shadow-sm transition-all"
                  style={{
                    backgroundColor: tpl.accentColor,
                  }}
                >
                  Xác nhận tham dự
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Cột phải: Chi tiết tính năng & Nút kêu gọi */}
        <div className="flex-1 flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            {/* Tiêu đề & Tag */}
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tight text-white font-serif">
                {tpl.name}
              </h2>
              <p className="text-xs text-stone-400 font-light font-sans">
                Phong cách thiết kế {tpl.style.toLowerCase()} tinh tế với tông màu {tpl.name.toLowerCase()}.
              </p>
              <div className="flex gap-2 pt-1">
                <span className="px-3 py-1 rounded-full bg-stone-900 text-stone-300 text-[10px] font-semibold font-sans border border-stone-800">
                  {tpl.style}
                </span>
                <span className="px-3 py-1 rounded-full bg-stone-900 text-stone-300 text-[10px] font-semibold font-sans border border-stone-800">
                  {tpl.price === 0 ? "Miễn phí" : "Cao cấp"}
                </span>
              </div>
            </div>

            <hr className="border-t border-stone-800" />

            {/* Tính năng */}
            <div className="space-y-4">
              <h3 className="text-[13px] font-bold uppercase tracking-wider text-stone-400">
                Tính năng
              </h3>
              
              <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-xs font-sans text-stone-300">
                {[
                  { Icon: Edit3, label: "Tùy chỉnh nội dung" },
                  { Icon: Image, label: "Ảnh không giới hạn" },
                  { Icon: MapPin, label: "Google Maps" },
                  { Icon: Globe, label: "Đa ngôn ngữ" },
                  { Icon: Users, label: "Ghi tên khách mời" },
                  { Icon: Share2, label: "Chia sẻ qua link" },
                  { Icon: CheckSquare, label: "Xác nhận tham dự" },
                  { Icon: MessageSquare, label: "Nhận lời chúc" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5">
                    <item.Icon size={14} className="text-[#db2777] shrink-0" />
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-stone-800">
            {/* Dòng ghi chú nhỏ */}
            <div className="text-[10px] text-stone-400 font-sans leading-relaxed">
              <p>Tạo miễn phí · Thử 3 ngày · Đẹp mới thanh toán</p>
              <p className="text-[9px] text-stone-500 mt-0.5">Bạn có thể đổi mẫu bất cứ lúc nào khi chỉnh sửa</p>
            </div>

            {/* Nút hành động */}
            <div className="flex gap-4">
              <button
                onClick={() => {
                  onClose();
                  onRequestDesign();
                }}
                className="flex-1 py-3 px-6 rounded-full bg-[#db2777] hover:bg-[#c2185b] active:scale-95 text-white font-bold text-xs tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer border-0 shadow-lg shadow-pink-900/10"
              >
                <span>+</span> Tạo thiệp
              </button>
              <button
                onClick={handlePreviewDemo}
                className="flex-1 py-3 px-6 rounded-full border border-stone-700 bg-transparent hover:bg-stone-800 active:scale-95 text-stone-200 hover:text-white font-bold text-xs tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Eye size={14} /> Xem demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
