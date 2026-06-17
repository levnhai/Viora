import { Link2, Users, Clock, Music, MapPin, Smartphone } from "lucide-react";

export function FeaturesList() {
  const FEATURES = [
    {
      icon: Link2,
      title: "Link chia sẻ duy nhất",
      desc: "Mỗi thiệp có một đường link riêng — gửi qua Zalo, Facebook, Messenger chỉ trong vài giây.",
    },
    {
      icon: Users,
      title: "RSVP trực tuyến",
      desc: "Khách mời xác nhận tham dự ngay trên trang thiệp. Bạn nhận thông báo và theo dõi danh sách theo thời gian thực.",
    },
    {
      icon: Clock,
      title: "Đồng hồ đếm ngược",
      desc: "Hiển thị thời gian còn lại đến ngày cưới để khách mời cảm nhận sự háo hức cùng bạn.",
    },
    {
      icon: Music,
      title: "Nhạc nền lãng mạn",
      desc: "Chọn bài nhạc yêu thích hoặc dùng thư viện nhạc cưới có sẵn — tự động phát khi khách mở thiệp.",
    },
    {
      icon: MapPin,
      title: "Bản đồ & chỉ đường",
      desc: "Tích hợp Google Maps trực tiếp. Khách mời nhấn một cái là có chỉ đường đến địa điểm tổ chức.",
    },
    {
      icon: Smartphone,
      title: "Hiển thị mọi thiết bị",
      desc: "Thiệp tự điều chỉnh đẹp trên điện thoại, máy tính bảng và máy tính. Không cần cài ứng dụng.",
    },
  ];

  return (
    <section id="tinh-nang" className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <p className="text-xs text-accent uppercase tracking-widest mb-2">
            Tính năng
          </p>
          <h2
            className="text-4xl text-foreground"
            style={{ fontFamily: "'EB Garamond', serif" }}
          >
            Mọi thứ bạn cần cho một trang thiệp hoàn hảo
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="p-7 bg-card border border-border rounded-2xl hover:shadow-md transition-shadow group"
            >
              <div className="w-11 h-11 rounded-xl bg-secondary flex items-center justify-center mb-5 group-hover:bg-primary/10 transition-colors">
                <f.icon
                  size={20}
                  className="text-accent group-hover:text-primary transition-colors"
                />
              </div>
              <h3
                className="text-lg text-foreground mb-2"
                style={{ fontFamily: "'EB Garamond', serif" }}
              >
                {f.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
