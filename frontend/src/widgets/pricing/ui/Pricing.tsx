import { Check } from "lucide-react";

interface PricingProps {
  onSelectPlan: (planName: string) => void;
}

export function Pricing({ onSelectPlan }: PricingProps) {
  const PLANS = [
    {
      name: "Phổ biến",
      price: "199.000đ",
      note: "Trọn đời, không phát sinh phí",
      highlight: false,
      cta: "Bắt đầu ngay",
      features: [
        "Sử dụng mẫu thiệp phổ biến",
        "RSVP & Quản lý phản hồi khách mời",
        "Album ảnh cưới (Tối đa 3 ảnh)",
        "Bản đồ & Chỉ đường chi tiết",
        "Không giới hạn lượt xem",
        "Hỗ trợ trọn đời",
      ],
    },
    {
      name: "Cao cấp",
      price: "349.000đ",
      note: "Trọn đời, đầy đủ tính năng VIP",
      highlight: true,
      cta: "Chọn gói Cao cấp",
      features: [
        "Mở khóa toàn bộ mẫu thiệp VIP",
        "Album ảnh mở rộng (Lên tới 6 ảnh)",
        "Nhạc nền tùy chọn tự động phát",
        "Đường dẫn thiệp đẹp tự chọn (Custom Slug)",
        "Không hiển thị quảng cáo thương hiệu",
        "RSVP & Quản lý phản hồi khách mời",
        "Bản đồ & Chỉ đường chi tiết",
      ],
    },
  ];

  return (
    <section id="bang-gia" className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <p className="text-xs text-accent uppercase tracking-widest mb-2">
            Bảng giá
          </p>
          <h2
            className="text-4xl text-foreground"
            style={{ fontFamily: "'EB Garamond', serif" }}
          >
            Một lần thanh toán, dùng mãi mãi
          </h2>
          <p className="text-sm text-muted-foreground mt-3">
            Không thuê bao hàng tháng. Không ẩn phí.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto text-left">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`p-8 rounded-2xl border flex flex-col gap-5 ${plan.highlight ? "bg-primary text-primary-foreground border-primary shadow-2xl md:scale-105" : "bg-card border-border"}`}
            >
              <div>
                <p
                  className={`text-xs uppercase tracking-widest mb-1 ${plan.highlight ? "opacity-60" : "text-accent"}`}
                >
                  {plan.name}
                </p>
                <p
                  className="text-3xl"
                  style={{ fontFamily: "'EB Garamond', serif" }}
                >
                  {plan.price}
                </p>
                <p
                  className={`text-xs mt-1 ${plan.highlight ? "opacity-60" : "text-muted-foreground"}`}
                >
                  {plan.note}
                </p>
              </div>
              <ul className="space-y-3 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <Check
                      size={13}
                      className={`mt-0.5 flex-shrink-0 ${plan.highlight ? "opacity-70" : "text-accent"}`}
                    />
                    <span
                      className={
                        plan.highlight
                          ? "opacity-85"
                          : "text-muted-foreground"
                      }
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => onSelectPlan(plan.name)}
                className={`w-full py-3 rounded-xl text-sm font-medium transition-all active:scale-95 cursor-pointer ${plan.highlight ? "bg-primary-foreground text-primary hover:opacity-90" : "bg-primary text-primary-foreground hover:opacity-90"}`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
