import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FaqItemProps {
  q: string;
  a: string;
}

function FaqItem({ q, a }: FaqItemProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border rounded-xl overflow-hidden text-left bg-card">
      <button
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-secondary/50 transition-colors cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <span
          className="text-foreground pr-4"
          style={{ fontFamily: "'EB Garamond', serif", fontSize: "1.05rem" }}
        >
          {q}
        </span>
        <ChevronDown
          size={16}
          className={`text-muted-foreground flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="px-6 pb-5">
          <p className="text-sm text-muted-foreground leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

export function FaqList() {
  const FAQ = [
    {
      q: "Khách mời có cần cài ứng dụng không?",
      a: "Không. Khách mời chỉ cần nhấn vào link là xem được ngay trên trình duyệt điện thoại hoặc máy tính, không cần cài bất kỳ ứng dụng nào.",
    },
    {
      q: "Thiệp có dùng được mãi mãi không?",
      a: "Có. Sau khi tạo, link thiệp sẽ tồn tại vĩnh viễn. Khách mời vẫn có thể mở lại sau ngày cưới để xem lại kỷ niệm.",
    },
    {
      q: "Tôi có thể chỉnh sửa sau khi đã chia sẻ không?",
      a: "Được. Bạn có thể cập nhật nội dung bất kỳ lúc nào — thay đổi địa điểm, giờ giấc, ảnh — link chia sẻ vẫn giữ nguyên.",
    },
    {
      q: "RSVP hoạt động như thế nào?",
      a: "Khách mời nhấn nút xác nhận trên thiệp, điền tên và số người tham dự. Bạn nhận thông báo và xem danh sách trong trang quản lý.",
    },
  ];

  return (
    <section id="faq" className="py-24 bg-secondary/30">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <p className="text-xs text-accent uppercase tracking-widest mb-2">
            FAQ
          </p>
          <h2
            className="text-4xl text-foreground"
            style={{ fontFamily: "'EB Garamond', serif" }}
          >
            Câu hỏi thường gặp
          </h2>
        </div>
        <div className="space-y-3">
          {FAQ.map((item) => (
            <FaqItem key={item.q} q={item.q} a={item.a} />
          ))}
        </div>
      </div>
    </section>
  );
}
