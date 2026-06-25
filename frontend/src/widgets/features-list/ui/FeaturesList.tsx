import { Layers, Settings, Smartphone, Share2, HeartHandshake } from "lucide-react";

export function FeaturesList() {
  const FEATURES = [
    {
      icon: Layers,
      title: "1000+ mẫu thiệp",
      desc: "Đa dạng phong cách",
    },
    {
      icon: Settings,
      title: "Chỉnh sửa dễ dàng",
      desc: "Kéo thả, tùy chỉnh linh hoạt",
    },
    {
      icon: Smartphone,
      title: "Tối ưu mọi thiết bị",
      desc: "Hiển thị đẹp trên mọi màn hình",
    },
    {
      icon: Share2,
      title: "Chia sẻ một chạm",
      desc: "Gửi thiệp qua link, mạng xã hội",
    },
    {
      icon: HeartHandshake,
      title: "Hỗ trợ tận tâm",
      desc: "Đội ngũ hỗ trợ 24/7",
    },
  ];

  return (
    <section id="tinh-nang" className="py-16 bg-[#faf6f0]/40 border-t border-b border-[#e2d8cf]/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-left mb-10 space-y-1">
          <p className="text-[10px] text-[#db2777] uppercase tracking-widest font-bold flex items-center gap-1">
            <span>🌸</span> TẠI SAO CHỌN VIORA?
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 text-left">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="flex items-center gap-3.5 p-3 rounded-2xl group transition-all"
            >
              <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-[#db2777]/10">
                <f.icon
                  size={16}
                  className="text-[#db2777] transition-colors"
                />
              </div>
              <div className="space-y-0.5">
                <h3
                  className="text-[13px] font-bold text-[#2c1810]"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {f.title}
                </h3>
                <p className="text-[11px] text-[#7a5c4f]/70 font-light leading-relaxed">
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
