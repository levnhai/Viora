"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import {
  Star,
  Quote,
  Heart,
  Sparkles,
  MapPin,
  ArrowUpRight,
  MessageSquare,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface ReviewItem {
  id: string;
  coupleNames: string;
  location: string;
  weddingDate: string;
  templateName: string;
  avatarText: string;
  avatarColor: string;
  rating: number;
  highlight: string;
  comment: string;
}

const REVIEWS_DATA: ReviewItem[] = [
  {
    id: "review-1",
    coupleNames: "Thanh Tùng & Mai Linh",
    location: "Hà Nội",
    weddingDate: "Tháng 11/2026",
    templateName: "Luxury Royal Gold",
    avatarText: "TL",
    avatarColor: "from-amber-600 to-amber-800",
    rating: 5,
    highlight: "Thiệp đẹp xuất sắc, bạn bè ai nhận cũng khen!",
    comment:
      "Giao diện mở phong bì sang xịn mịn, nhạc nền nghe rất cảm xúc. Bạn bè mình nhận link mở xem ai cũng khen tấm tắc.",
  },
  {
    id: "review-2",
    coupleNames: "Minh Trí & Thảo Vy",
    location: "TP. Hồ Chí Minh",
    weddingDate: "Tháng 12/2026",
    templateName: "Sage Olive Botanical",
    avatarText: "TV",
    avatarColor: "from-emerald-600 to-teal-800",
    rating: 5,
    highlight: "Tính năng RSVP và mã QR mừng siêu tiện!",
    comment:
      "Nhờ có form xác nhận tham dự mà tụi mình chốt bàn tiệc chuẩn đét. Bạn bè ở xa quét QR chuyển khoản mừng cưới tiện cực kỳ.",
  },
  {
    id: "review-3",
    coupleNames: "Quang Dũng & Ánh Nguyệt",
    location: "Đà Nẵng",
    weddingDate: "Tháng 10/2026",
    templateName: "Modern Minimalist",
    avatarText: "DN",
    avatarColor: "from-indigo-600 to-blue-800",
    rating: 5,
    highlight: "Làm thiệp siêu nhanh, hỗ trợ nhiệt tình 10 điểm!",
    comment:
      "Mình đặt gấp sát ngày cưới, 20 phút sau đã có thiệp hoàn chỉnh để gửi khách. Bạn hỗ trợ tư vấn rất dễ thương và có tâm.",
  },
  {
    id: "review-4",
    coupleNames: "Đức Huy & Phương Trang",
    location: "Hải Phòng",
    weddingDate: "Tháng 01/2027",
    templateName: "Red Velvet Traditional",
    avatarText: "HT",
    avatarColor: "from-rose-600 to-red-800",
    rating: 5,
    highlight: "Bố mẹ hai bên ban đầu khó tính xem xong ưng liền!",
    comment:
      "Bố mẹ thích nhất phần bản đồ chỉ đường và đếm ngược ngày cưới. Vừa hiện đại vừa trang trọng, gửi cho họ hàng ai cũng thích.",
  },
  {
    id: "review-5",
    coupleNames: "Văn Hậu & Hải Yến",
    location: "Cần Thơ",
    weddingDate: "Tháng 11/2026",
    templateName: "Floral Romantic Pink",
    avatarText: "HY",
    avatarColor: "from-pink-600 to-purple-800",
    rating: 5,
    highlight: "Link thiệp có tên từng người, cảm giác rất được trân trọng!",
    comment:
      "Gửi link hiển thị đúng tên từng bạn bè nên ai cũng hào hứng mở xem rồi nhắn chúc mừng ngay. Gói 149k quá hời luôn.",
  },
  {
    id: "review-6",
    coupleNames: "Tuấn Anh & Khánh Huyền",
    location: "Nha Trang",
    weddingDate: "Tháng 09/2026",
    templateName: "Luxury Royal Gold",
    avatarText: "AH",
    avatarColor: "from-violet-600 to-indigo-800",
    rating: 5,
    highlight: "Tiết kiệm chi phí in ấn mà xịn hơn thiệp giấy nhiều!",
    comment:
      "Thiệp mở trên điện thoại load mượt mà, ảnh cưới nét căng. Tiết kiệm được cả đống tiền in thiệp giấy dư thừa.",
  },
];

export function CustomerReviewsSection() {
  const reviews = REVIEWS_DATA;
  const sliderRef = useRef<HTMLDivElement>(null);
  const DEFAULT_INITIAL_INDEX = 2; // Hiển thị đánh giá thứ 3 ở giữa để 2 bên đều có thẻ, không bị trống
  const [canScrollLeft, setCanScrollLeft] = useState(true);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(DEFAULT_INITIAL_INDEX);

  // Mouse drag state
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftPos = useRef(0);

  const checkActiveCard = useCallback(() => {
    if (!sliderRef.current) return;
    const container = sliderRef.current;
    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;
    const cards = Array.from(container.children) as HTMLElement[];

    let closestIdx = 0;
    let minDiff = Infinity;

    cards.forEach((card, idx) => {
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const diff = Math.abs(containerCenter - cardCenter);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = idx;
      }
    });

    setActiveIndex(closestIdx);
    setCanScrollLeft(closestIdx > 0);
    setCanScrollRight(closestIdx < reviews.length - 1);
  }, [reviews.length]);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    // Cuộn tới đánh giá thứ 3 ngay khi tải xong trang để 2 bên cân đối mà không làm cuộn cửa sổ trang (window)
    const cards = Array.from(slider.children) as HTMLElement[];
    const initTimer = setTimeout(() => {
      const targetCard = cards[DEFAULT_INITIAL_INDEX];
      if (targetCard) {
        const cardLeft = targetCard.offsetLeft;
        const cardWidth = targetCard.offsetWidth;
        const containerWidth = slider.clientWidth;
        slider.scrollLeft = cardLeft - (containerWidth - cardWidth) / 2;
        checkActiveCard();
      }
    }, 60);

    slider.addEventListener("scroll", checkActiveCard, { passive: true });
    window.addEventListener("resize", checkActiveCard);
    return () => {
      clearTimeout(initTimer);
      slider.removeEventListener("scroll", checkActiveCard);
      window.removeEventListener("resize", checkActiveCard);
    };
  }, [checkActiveCard]);

  const scrollToIndex = (index: number) => {
    if (!sliderRef.current) return;
    const targetIdx = Math.max(0, Math.min(reviews.length - 1, index));
    const cards = Array.from(sliderRef.current.children) as HTMLElement[];
    const targetCard = cards[targetIdx];
    if (targetCard) {
      const cardLeft = targetCard.offsetLeft;
      const cardWidth = targetCard.offsetWidth;
      const containerWidth = sliderRef.current.clientWidth;
      sliderRef.current.scrollTo({
        left: cardLeft - (containerWidth - cardWidth) / 2,
        behavior: "smooth",
      });
      setActiveIndex(targetIdx);
      setCanScrollLeft(targetIdx > 0);
      setCanScrollRight(targetIdx < reviews.length - 1);
    }
  };

  const handleScroll = (direction: "left" | "right") => {
    if (direction === "left") {
      scrollToIndex(Math.max(0, activeIndex - 1));
    } else {
      scrollToIndex(Math.min(reviews.length - 1, activeIndex + 1));
    }
  };

  // Mouse drag events
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX - sliderRef.current.offsetLeft;
    scrollLeftPos.current = sliderRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    sliderRef.current.scrollLeft = scrollLeftPos.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDragging.current = false;
  };

  const scrollToTemplates = () => {
    const el = document.getElementById("mau-thiep");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="khach-hang-noi-gi"
      className="mt-20 pt-16 border-t border-white/10 text-white relative select-none"
    >
      {/* Background Ambient Glow Effect */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-[#e0b769]/10 via-pink-600/5 to-transparent rounded-full blur-[150px] pointer-events-none" />

      {/* 1. Header Section (Căn giữa hoàn hảo) */}
      <div className="text-center max-w-3xl mx-auto space-y-3.5 mb-12 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#e0b769] text-[11px] uppercase tracking-[0.25em] font-medium font-sans">
          <Sparkles size={13} className="text-[#e0b769]" />
          <span>Feedback & Đánh Giá Thực Tế</span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-normal tracking-wide text-white leading-tight">
          Khách Hàng Nói Gì{" "}
          <span className="italic font-light text-[#e0b769]">
            Về Chúng Tôi
          </span>
        </h2>

        <p className="text-xs sm:text-sm md:text-base text-stone-300/90 max-w-xl mx-auto leading-relaxed font-light font-sans">
          Hơn <strong className="text-white font-semibold">1.200+ cặp đôi</strong> đã tin tưởng lựa chọn Viora để gửi gắm ngày trọng đại. Kéo sang để đọc thêm cảm nhận chân thực.
        </p>
      </div>

      {/* 2. Horizontal Scrollable Slider */}
      <div className="relative z-10">
        <div
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          className="flex gap-5 overflow-x-auto pb-6 pt-2 px-4 sm:px-[calc(50%-190px)] md:px-[calc(50%-205px)] scrollbar-none snap-x snap-mandatory cursor-grab active:cursor-grabbing scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {reviews.map((review, idx) => (
            <div
              key={review.id}
              className={`w-[300px] sm:w-[380px] md:w-[410px] shrink-0 snap-center rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1 shadow-sm hover:shadow-xl backdrop-blur-md select-none border ${
                activeIndex === idx
                  ? "bg-white/[0.07] border-[#e0b769]/60 shadow-xl shadow-black/40 ring-1 ring-[#e0b769]/20"
                  : "bg-white/[0.03] hover:bg-white/[0.05] border-white/10 opacity-75 hover:opacity-100"
              }`}
            >
              <div>
                {/* Top Row: Rating Stars & Quote Icon */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className="text-amber-400 fill-amber-400"
                      />
                    ))}
                  </div>
                  <Quote
                    size={24}
                    className="text-white/10 group-hover:text-[#e0b769]/30 transition-colors"
                  />
                </div>

                {/* Review Highlight */}
                <h3 className="text-sm sm:text-base font-bold text-white leading-snug mb-3 group-hover:text-[#e0b769] transition-colors">
                  &ldquo;{review.highlight}&rdquo;
                </h3>

                {/* Detailed Comment */}
                <p className="text-xs sm:text-sm text-stone-300/85 leading-relaxed font-light mb-5">
                  {review.comment}
                </p>
              </div>

                {/* Reviewer Profile */}
                <div className="flex items-center justify-between gap-3 pt-4 border-t border-white/5">
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div
                      className={`w-10 h-10 rounded-full bg-gradient-to-br ${review.avatarColor} text-white font-bold text-xs flex items-center justify-center shadow-inner ring-2 ring-white/10 group-hover:ring-[#e0b769]/50 transition-all`}
                    >
                      {review.avatarText}
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs sm:text-sm font-bold text-white tracking-wide">
                          {review.coupleNames}
                        </span>
                        <span
                          title="Đã xác thực cặp đôi tổ chức đám cưới"
                          className="inline-flex items-center"
                        >
                          <ShieldCheck
                            size={14}
                            className="text-emerald-400 shrink-0"
                          />
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-stone-400 font-light mt-0.5">
                        <span className="flex items-center gap-0.5">
                          <MapPin size={11} className="text-stone-400" />
                          {review.location}
                        </span>
                        <span>•</span>
                        <span>{review.weddingDate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Template badge */}
                  <div className="hidden sm:block text-right">
                    <span className="text-[10px] text-stone-400 block">
                      Mẫu đã chọn
                    </span>
                    <span className="text-[11px] font-medium text-[#e0b769] truncate max-w-[90px] block">
                      {review.templateName}
                    </span>
                  </div>
                </div>
            </div>
          ))}
        </div>

        {/* Navigation Controls: Prev + Dots + Next (Căn giữa hoàn hảo) */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={() => handleScroll("left")}
            disabled={!canScrollLeft}
            aria-label="Xem đánh giá trước"
            className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
              canScrollLeft
                ? "bg-white/10 hover:bg-white/20 border-white/20 text-white hover:scale-105 active:scale-95 shadow-sm"
                : "bg-white/5 border-white/5 text-stone-600 cursor-not-allowed opacity-40"
            }`}
          >
            <ChevronLeft size={16} />
          </button>

          {/* Dots Indicators */}
          <div className="flex items-center gap-2">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollToIndex(idx)}
                aria-label={`Chuyển đến đánh giá ${idx + 1}`}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  activeIndex === idx
                    ? "w-8 bg-[#e0b769]"
                    : "w-2 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => handleScroll("right")}
            disabled={!canScrollRight}
            aria-label="Xem đánh giá tiếp theo"
            className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
              canScrollRight
                ? "bg-[#e0b769]/20 hover:bg-[#e0b769]/30 border-[#e0b769]/40 text-[#e0b769] hover:scale-105 active:scale-95 shadow-md shadow-amber-900/20"
                : "bg-white/5 border-white/5 text-stone-600 cursor-not-allowed opacity-40"
            }`}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* 3. Bottom Call to Action Card */}
      <div className="mt-14 rounded-3xl bg-gradient-to-r from-white/[0.04] via-white/[0.07] to-white/[0.04] border border-white/10 p-6 sm:p-10 text-center relative overflow-hidden backdrop-blur-md">
        <div className="max-w-2xl mx-auto space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/20 text-xs font-semibold">
            <Heart size={13} className="fill-pink-400" />
            <span>Ngày cưới hoàn hảo trong tầm tay</span>
          </div>

          <h3 className="text-xl sm:text-2xl md:text-3xl font-serif text-white font-normal">
            Bạn cũng muốn có một thiệp cưới ấn tượng như thế?
          </h3>

          <p className="text-xs sm:text-sm text-stone-300 font-light max-w-lg mx-auto leading-relaxed">
            Chỉ từ <strong className="text-[#e0b769] font-bold">149.000đ</strong>, sở hữu ngay thiệp cưới công nghệ sang trọng, lưu giữ trọn đời và gửi trọn yêu thương tới từng vị khách quý.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={scrollToTemplates}
              className="w-full sm:w-auto px-7 py-3 rounded-2xl bg-gradient-to-r from-[#d4af37] via-[#e0b769] to-[#c5a880] text-stone-950 text-xs sm:text-sm font-bold tracking-wide shadow-lg shadow-amber-900/30 hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Chọn mẫu thiệp ngay</span>
              <ArrowUpRight size={16} />
            </button>

            <a
              href="https://zalo.me"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-white text-xs sm:text-sm font-medium border border-white/15 transition-all flex items-center justify-center gap-2"
            >
              <MessageSquare size={16} className="text-blue-400" />
              <span>Tư vấn qua Zalo</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
