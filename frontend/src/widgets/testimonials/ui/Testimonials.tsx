import { Star } from "lucide-react";

export function Testimonials() {
  const TESTIMONIALS = [
    {
      couple: "Minh Anh & Quốc Bảo",
      date: "Hà Nội · Tháng 3/2025",
      text: "Link thiệp gửi qua Zalo, chỉ 5 phút là cả họ hàng đã xem được. Tính năng RSVP giúp mình đếm số khách mời cực kỳ tiện lợi!",
      avatar:
        "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=80&h=80&fit=crop&auto=format",
    },
    {
      couple: "Thu Hà & Tiến Dũng",
      date: "TP. Hồ Chí Minh · Tháng 1/2025",
      text: "Thiệp online đẹp hơn mình tưởng. Khách mời ai cũng khen và tò mò hỏi làm ở đâu. Đặc biệt phần nhạc nền rất cảm xúc.",
      avatar:
        "https://images.unsplash.com/photo-1585814932-e5d8b46dd762?w=80&h=80&fit=crop&auto=format",
    },
    {
      couple: "Phương Linh & Đức Hiếu",
      date: "Đà Nẵng · Tháng 11/2024",
      text: "Tiết kiệm được cả triệu tiền in ấn mà thiệp lại đẹp hơn. Bản đồ tích hợp sẵn, khách không bị lạc đường như trước nữa.",
      avatar:
        "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=80&h=80&fit=crop&auto=format",
    },
  ];

  return (
    <section className="py-24 bg-secondary/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <p className="text-xs text-accent uppercase tracking-widest mb-2">
            Cảm nhận
          </p>
          <h2
            className="text-4xl text-foreground"
            style={{ fontFamily: "'EB Garamond', serif" }}
          >
            Những đôi đã dùng &amp; yêu thích
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 text-left">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.couple}
              className="bg-card p-7 rounded-2xl border border-border"
            >
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={13} fill="#c9956c" stroke="#c9956c" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 italic">
                "{t.text}"
              </p>
              <div className="flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.couple}
                  className="w-10 h-10 rounded-full object-cover bg-muted"
                />
                <div>
                  <p
                    className="text-sm font-medium text-foreground"
                    style={{ fontFamily: "'EB Garamond', serif" }}
                  >
                    {t.couple}
                  </p>
                  <p className="text-xs text-muted-foreground">{t.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
