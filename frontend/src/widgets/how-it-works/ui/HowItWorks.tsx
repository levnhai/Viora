import { ArrowRight, Share2 } from "lucide-react";

interface HowItWorksProps {
  onOpenRequest: () => void;
}

export function HowItWorks({ onOpenRequest }: HowItWorksProps) {
  const STEPS = [
    {
      step: "1",
      title: "Chọn mẫu & điền thông tin",
      desc: "Chọn giao diện yêu thích, nhập ngày giờ địa điểm, thêm ảnh cưới và bài nhạc ưa thích.",
    },
    {
      step: "2",
      title: "Nhận link chia sẻ",
      desc: "Hệ thống tạo ngay một đường link đẹp như thieponline.vn/tên-của-bạn để gửi cho khách mời.",
    },
    {
      step: "3",
      title: "Khách mời xác nhận dự",
      desc: "Khách nhấn link, xem thiệp, bấm xác nhận tham dự. Bạn nhận thông báo ngay lập tức.",
    },
  ];

  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 text-left">
            <div>
              <p className="text-xs text-accent uppercase tracking-widest mb-2">
                Cách hoạt động
              </p>
              <h2
                className="text-4xl text-foreground"
                style={{ fontFamily: "'EB Garamond', serif" }}
              >
                Tạo xong là chia sẻ ngay
              </h2>
            </div>
            <div className="space-y-6">
              {STEPS.map((s) => (
                <div key={s.step} className="flex gap-5">
                  <div className="flex-shrink-0 w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm text-primary font-medium">
                      {s.step}
                    </span>
                  </div>
                  <div>
                    <h4
                      className="text-base text-foreground mb-1"
                      style={{ fontFamily: "'EB Garamond', serif" }}
                    >
                      {s.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <button 
              onClick={onOpenRequest}
              className="bg-primary text-primary-foreground px-7 py-3.5 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-2 cursor-pointer"
            >
              Bắt đầu tạo thiệp <ArrowRight size={15} />
            </button>
          </div>
          {/* Visual */}
          <div className="relative flex items-center justify-center h-80">
            <div className="absolute left-2 top-2 w-52 bg-card border border-border rounded-xl overflow-hidden shadow-lg">
              <div className="bg-foreground h-5 flex items-center px-2 gap-1">
                {["bg-red-400", "bg-yellow-400", "bg-green-400"].map((c) => (
                  <div key={c} className={`w-2 h-2 rounded-full ${c}`} />
                ))}
              </div>
              <div className="p-3">
                <img
                  src="https://images.unsplash.com/photo-1593043927112-08289c3f1b64?w=300&h=200&fit=crop&auto=format"
                  alt="Desktop view"
                  className="w-full h-28 object-cover rounded-lg"
                />
                <div className="mt-2 h-2 bg-muted rounded w-3/4" />
                <div className="mt-1 h-2 bg-muted rounded w-1/2" />
              </div>
            </div>
            <div className="absolute right-2 bottom-2 w-28 bg-foreground rounded-2xl p-1.5 shadow-xl">
              <div
                className="bg-background rounded-xl overflow-hidden"
                style={{ height: 180 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1764423805989-ec426dfb8de8?w=200&h=280&fit=crop&auto=format"
                  alt="Mobile view"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex justify-center mt-1">
                <div className="w-10 h-0.5 bg-white/20 rounded-full" />
              </div>
            </div>
            <div className="relative z-10 bg-card border border-border rounded-2xl px-5 py-4 shadow-lg text-center">
              <Share2 size={20} className="text-accent mx-auto mb-2" />
              <p className="text-xs font-medium text-foreground">
                thieponline.vn/
              </p>
              <p
                className="text-sm text-primary"
                style={{ fontFamily: "'EB Garamond', serif" }}
              >
                anhvaem
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
