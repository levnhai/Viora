import { ArrowRight, Play, Clock, MapPin, Share2, Check, Music } from "lucide-react";

interface HeroProps {
  onOpenRequest: () => void;
  onOpenDemo: () => void;
}

export function Hero({ onOpenRequest, onOpenDemo }: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-16 pb-28 text-left">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full opacity-[0.07]"
          style={{
            background:
              "radial-gradient(circle, var(--primary) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-24 -left-24 w-[500px] h-[500px] rounded-full opacity-[0.06]"
          style={{
            background:
              "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
          }}
        />
      </div>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div className="space-y-7">
            <div className="inline-flex items-center gap-2 bg-secondary px-4 py-2 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <span className="text-xs text-muted-foreground">
                Đã có 12.000+ cặp đôi tin dùng
              </span>
            </div>
            <h1
              style={{
                fontFamily: "'EB Garamond', Georgia, serif",
                fontWeight: 400,
                lineHeight: 1.1,
              }}
              className="text-5xl sm:text-6xl text-foreground"
            >
              Thiệp mời cưới
              <br />
              <em
                style={{
                  fontFamily: "'Great Vibes', cursive",
                  fontSize: "1.1em",
                  color: "var(--primary)",
                }}
              >
                online
              </em>{" "}
              đẹp &amp; tiện
            </h1>
            <p className="text-base text-muted-foreground leading-relaxed max-w-md">
              Tạo trang thiệp cưới kỹ thuật số trong 5 phút. Chia sẻ link với
              khách mời qua Zalo, Facebook, hay email — không cần in ấn, không
              cần vận chuyển.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={onOpenRequest}
                className="bg-primary text-primary-foreground px-7 py-3.5 rounded-xl font-medium hover:opacity-90 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                Tạo thiệp miễn phí <ArrowRight size={16} />
              </button>
              <button
                onClick={onOpenDemo}
                className="border border-border text-foreground px-7 py-3.5 rounded-xl font-medium hover:bg-secondary transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Play size={14} /> Xem thử thiệp mẫu
              </button>
            </div>
            <div className="flex gap-8 pt-1">
              {[
                ["5 phút", "Tạo xong"],
                ["∞", "Lượt xem"],
                ["Miễn phí", "Bắt đầu"],
              ].map(([val, label]) => (
                <div key={label}>
                  <p
                    className="text-xl text-foreground"
                    style={{ fontFamily: "'EB Garamond', serif" }}
                  >
                    {val}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Phone mockup */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="relative w-[272px] bg-foreground rounded-[38px] p-3 shadow-2xl">
                <div
                  className="bg-background rounded-[28px] overflow-hidden"
                  style={{ height: 548 }}
                >
                  <div className="flex items-center justify-between px-5 py-2 bg-card">
                    <span className="text-[10px] text-foreground">9:41</span>
                    <div className="flex gap-1">
                      <div className="w-3 h-1.5 rounded-sm bg-foreground/20" />
                      <div className="w-1 h-1.5 rounded-sm bg-foreground/20" />
                    </div>
                  </div>
                  <div
                    className="overflow-y-auto h-full"
                    style={{ backgroundColor: "#fdf6ef" }}
                  >
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=400&h=300&fit=crop&auto=format"
                        alt="Wedding"
                        className="w-full h-full object-cover"
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(to bottom, transparent 30%, #fdf6ef)",
                        }}
                      />
                    </div>
                    <div className="px-6 pb-6 text-center -mt-4">
                      <p className="text-[9px] uppercase tracking-widest text-accent mb-1">
                        Trân trọng kính mời
                      </p>
                      <h3
                        style={{
                          fontFamily: "'Great Vibes', cursive",
                          fontSize: "1.75rem",
                          color: "var(--primary)",
                          lineHeight: 1.2,
                        }}
                      >
                        Văn An & Thị Bình
                      </h3>
                      <p className="text-[9px] text-muted-foreground mt-2 leading-relaxed">
                        Kính mời đến dự lễ thành hôn của chúng tôi
                      </p>
                      <div className="mt-3 grid grid-cols-4 gap-1">
                        {[
                          ["142", "Ngày"],
                          ["08", "Giờ"],
                          ["34", "Phút"],
                          ["22", "Giây"],
                        ].map(([v, l]) => (
                          <div
                            key={l}
                            className="rounded-lg py-1.5"
                            style={{
                              backgroundColor: "rgba(139,58,82,0.08)",
                            }}
                          >
                            <p
                              className="text-sm font-medium text-primary"
                              style={{ fontFamily: "'EB Garamond', serif" }}
                            >
                              {v}
                            </p>
                            <p className="text-[7px] text-muted-foreground">
                              {l}
                            </p>
                          </div>
                        ))}
                      </div>
                      <div className="mt-3 space-y-1.5 text-[9px] text-muted-foreground">
                        <div className="flex items-center justify-center gap-1.5">
                          <Clock size={9} className="text-accent" /> 18:00 ·
                          Thứ Bảy, 15/11/2025
                        </div>
                        <div className="flex items-center justify-center gap-1.5">
                          <MapPin size={9} className="text-accent" /> Nhà hàng
                          Đại Dương, Hà Nội
                        </div>
                      </div>
                      <button className="mt-4 w-full py-2.5 rounded-xl text-[10px] font-medium text-white bg-primary cursor-pointer">
                        Xác nhận tham dự
                      </button>
                      <div className="mt-2 flex items-center justify-center gap-1 text-[8px] text-muted-foreground">
                        <Music size={8} /> A Thousand Years đang phát...
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center mt-2">
                  <div className="w-20 h-0.5 bg-white/20 rounded-full" />
                </div>
              </div>
              {/* Floating badges */}
              <div className="absolute -right-5 top-16 bg-card border border-border rounded-2xl px-4 py-3 shadow-lg flex items-center gap-2.5">
                <Share2 size={14} className="text-accent" />
                <div>
                  <p className="text-xs font-medium text-foreground">
                    Chia sẻ link
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    thieponline.vn/anhvaem
                  </p>
                </div>
              </div>
              <div className="absolute -left-8 bottom-24 bg-card border border-border rounded-2xl px-4 py-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-green-100 rounded-full flex items-center justify-center">
                    <Check size={12} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-[10px] font-medium text-foreground">
                      48 xác nhận
                    </p>
                    <p className="text-[9px] text-muted-foreground">
                      hôm nay
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
