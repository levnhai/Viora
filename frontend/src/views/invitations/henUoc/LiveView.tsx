"use client";

import { useState, useEffect } from "react";
import { Volume2, VolumeX, Gift, MessageSquareHeart, CheckCircle2, X } from "lucide-react";
import { WeddingData } from "@/entities/invitation/model/types";
import { useWeddingMusic, useGuestbook } from "@/shared/lib/hooks";

import "./styles.css";
import {
  InvitationCover,
  HeroSection,
  AsymmetricStory,
  PortraitSection,
  FamilyInvitationSection,
  WeddingScheduleSection,
  EditorialGallerySection,
  RsvpSection,
  CountdownSection,
  GiftBoxModalSection,
  GuestbookSection,
  ThankYouFooter,
} from "./components";

interface LiveViewProps {
  weddingData: WeddingData;
  guestName?: string;
  previewMode?: "envelope" | "invitation";
}

export function LiveView({
  weddingData,
  guestName,
  previewMode,
}: LiveViewProps) {
  const [isOpened, setIsOpened] = useState(previewMode === "invitation");
  const [isOpening, setIsOpening] = useState(false);
  const [showGuestbookModal, setShowGuestbookModal] = useState(false);

  // Fallback demo data chuẩn mẫu Hẹn Ước
  const enrichedWeddingData: WeddingData = {
    ...weddingData,
    groomName: weddingData.groomName || "Mạnh Đức",
    brideName: weddingData.brideName || "Lan Nhi",
    groomShortName: weddingData.groomShortName || "Mạnh Đức",
    brideShortName: weddingData.brideShortName || "Lan Nhi",
    groomFatherName: weddingData.groomFatherName || "Lê Văn Anh",
    groomMotherName: weddingData.groomMotherName || "Lê Thị Nhung",
    brideFatherName: weddingData.brideFatherName || "Vũ Văn Tài",
    brideMotherName: weddingData.brideMotherName || "Trần Thị Hoà",
    weddingDate: weddingData.weddingDate || "2026-12-29T17:30:00",
    coverImage: weddingData.coverImage || "/templates/hen-uoc/couple_hero.jpg",
    groomImage: weddingData.groomImage || "/templates/hen-uoc/groom_portrait.jpg",
    brideImage: weddingData.brideImage || "/templates/hen-uoc/bride_portrait.jpg",
  };

  const musicSource =
    enrichedWeddingData.musicUrl?.trim() ||
    "/templates/hen-uoc/music_marry_you.mp3";

  const { playing, togglePlay, autoPlayOnce } = useWeddingMusic(musicSource);
  const { messages, handleSendMessage } = useGuestbook(enrichedWeddingData.slug || "hen-uoc");

  const handleStartOpen = () => {
    setIsOpening(true);
    autoPlayOnce();
  };

  const handleOpenInvitation = () => {
    setIsOpened(true);
  };

  const scrollToRsvp = () => {
    const el = document.getElementById("rsvp");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToGiftBox = () => {
    const el = document.getElementById("giftbox");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Kích hoạt hiệu ứng chữ chạy lướt tới đâu xuất hiện tới đó
  useEffect(() => {
    if (typeof window === "undefined") return;

    const selector = ".henuoc-reveal, .henuoc-reveal-left, .henuoc-reveal-right, .henuoc-reveal-zoom, .henuoc-text-slide";
    const elements = document.querySelectorAll(selector);

    // Kích hoạt ngay những phần tử đã nằm trong tầm nhìn lúc tải/mở
    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 30) {
        el.classList.add("henuoc-revealed");
      }
    });

    if (!("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("henuoc-revealed"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("henuoc-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px -20px 0px",
      }
    );

    elements.forEach((el) => {
      if (!el.classList.contains("henuoc-revealed")) {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [isOpened]);

  return (
    <div className="w-full min-h-screen relative font-henuoc-serif text-[#7D1F2A] bg-[#1a0507] flex justify-center selection:bg-[#7D1F2A] selection:text-white">
      {/* 1. Phong Bì Mở Thiệp Ban Đầu */}
      {!isOpened && previewMode !== "invitation" && (
        <InvitationCover
          weddingData={enrichedWeddingData}
          guestName={guestName}
          onStartOpen={handleStartOpen}
          onOpen={handleOpenInvitation}
        />
      )}

      {/* 2. Thân Thiệp Cưới Hẹn Ước Chuẩn Mẫu ZenLove - Hiển thị dần dần khi mở phong bì */}
      <main
        style={{
          backgroundColor: "#FAF8F5",
          transition: "opacity 2.2s cubic-bezier(0.25, 1, 0.5, 1), transform 2.2s cubic-bezier(0.25, 1, 0.5, 1)",
          opacity: !isOpened && !isOpening ? 0.35 : 1,
          transform: !isOpened && !isOpening ? "scale(0.96)" : "scale(1)",
        }}
        className="w-full max-w-[480px] md:max-w-[500px] min-h-screen shadow-2xl relative z-10 flex flex-col overflow-hidden"
      >
        {/* Mục 1: Hero Cover */}
        <HeroSection weddingData={enrichedWeddingData} />

        {/* Dải ruy băng chữ chạy vô tận (Infinite Marquee Ribbon) */}
        <div
          style={{
            backgroundColor: "#7D1F2A",
            color: "#FAF8F5",
            padding: "9px 0",
            borderTop: "1px solid rgba(255,255,255,0.18)",
            borderBottom: "1px solid rgba(255,255,255,0.18)",
          }}
          className="henuoc-marquee-track"
        >
          <div className="henuoc-marquee-inner">
            <span style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "11.5px", letterSpacing: "0.22em", textTransform: "uppercase", paddingRight: "28px" }}>
              ✦ SAVE THE DATE ✦ {enrichedWeddingData.groomShortName} &amp; {enrichedWeddingData.brideShortName} ✦ 29.12.2026 ✦ TOGETHER FOREVER ✦ HAPPY WEDDING ✦
            </span>
            <span style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "11.5px", letterSpacing: "0.22em", textTransform: "uppercase", paddingRight: "28px" }}>
              ✦ SAVE THE DATE ✦ {enrichedWeddingData.groomShortName} &amp; {enrichedWeddingData.brideShortName} ✦ 29.12.2026 ✦ TOGETHER FOREVER ✦ HAPPY WEDDING ✦
            </span>
            <span style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "11.5px", letterSpacing: "0.22em", textTransform: "uppercase", paddingRight: "28px" }}>
              ✦ SAVE THE DATE ✦ {enrichedWeddingData.groomShortName} &amp; {enrichedWeddingData.brideShortName} ✦ 29.12.2026 ✦ TOGETHER FOREVER ✦ HAPPY WEDDING ✦
            </span>
            <span style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "11.5px", letterSpacing: "0.22em", textTransform: "uppercase", paddingRight: "28px" }}>
              ✦ SAVE THE DATE ✦ {enrichedWeddingData.groomShortName} &amp; {enrichedWeddingData.brideShortName} ✦ 29.12.2026 ✦ TOGETHER FOREVER ✦ HAPPY WEDDING ✦
            </span>
          </div>
        </div>

        {/* Mục 2: Phong bì cài hoa & Tấm thiệp ren lượn sóng */}
        <AsymmetricStory weddingData={enrichedWeddingData} />

        {/* Mục 3: Chân dung Chú rể & Cô dâu trên nền hoàng hôn */}
        <PortraitSection weddingData={enrichedWeddingData} />

        {/* Mục 4: Lời mời & Song thân hai họ */}
        <FamilyInvitationSection weddingData={enrichedWeddingData} />

        {/* Mục 5: Lịch trình Buổi tiệc chung vui & Lễ thành hôn (kèm đôi thiên nga) */}
        <WeddingScheduleSection weddingData={enrichedWeddingData} />

        {/* Mục 6: Bộ sưu tập ảnh Golden Hour of Love */}
        <EditorialGallerySection weddingData={enrichedWeddingData} />

        {/* Mục 7: Form Xác nhận tham dự RSVP */}
        <RsvpSection weddingData={enrichedWeddingData} guestName={guestName} />

        {/* Mục 8: Đếm ngược Ngày Về Chung Nhà (4 ô đỏ rượu) */}
        <CountdownSection weddingData={enrichedWeddingData} />

        {/* Mục 9: Hộp Mừng Cưới Trực Tiếp */}
        <GiftBoxModalSection weddingData={enrichedWeddingData} />

        {/* Mục 10: Chân trang Thank You */}
        <ThankYouFooter weddingData={enrichedWeddingData} />
      </main>

      {/* 3. Nút Điều Khiển Nổi & Phím Tắt Tiện Ích */}
      {isOpened && (
        <aside aria-label="Nút điều khiển thiệp" className="fixed bottom-6 right-4 sm:right-6 z-40 flex flex-col gap-2.5">
          {/* Nút bật/tắt nhạc */}
          <button
            onClick={togglePlay}
            className={`w-11 h-11 rounded-full flex items-center justify-center text-white shadow-xl backdrop-blur-md transition-all duration-300 ${
              playing
                ? "bg-[#7D1F2A] shadow-[#7D1F2A]/50 hover:bg-[#621620]"
                : "bg-black/70 hover:bg-black/90"
            }`}
            title={playing ? "Tắt nhạc" : "Bật nhạc"}
          >
            {playing ? (
              <Volume2 className="w-5 h-5 animate-spin" style={{ animationDuration: "4s" }} />
            ) : (
              <VolumeX className="w-5 h-5 text-white/70" />
            )}
          </button>

          {/* Nút cuộn tới RSVP */}
          <button
            onClick={scrollToRsvp}
            className="w-11 h-11 rounded-full bg-[#7D1F2A] hover:bg-[#621620] text-white shadow-lg flex items-center justify-center transition-all hover:scale-105 cursor-pointer"
            title="Xác nhận tham dự"
          >
            <CheckCircle2 className="w-5 h-5" />
          </button>

          {/* Nút Cuộn Tới Hộp Mừng Cưới */}
          <button
            onClick={scrollToGiftBox}
            className="w-11 h-11 rounded-full bg-white hover:bg-[#F5F3EF] text-[#7D1F2A] border border-[#7D1F2A]/20 shadow-lg flex items-center justify-center transition-all hover:scale-105 cursor-pointer"
            title="Mừng cưới"
          >
            <Gift className="w-5 h-5" />
          </button>

          {/* Nút Mở Sổ Lời Chúc */}
          <button
            onClick={() => setShowGuestbookModal(true)}
            className="w-11 h-11 rounded-full bg-white hover:bg-[#F5F3EF] text-[#7D1F2A] border border-[#7D1F2A]/20 shadow-lg flex items-center justify-center transition-all hover:scale-105 cursor-pointer"
            title="Sổ lời chúc"
          >
            <MessageSquareHeart className="w-5 h-5" />
          </button>
        </aside>
      )}

      {/* Modal Sổ Lời Chúc */}
      {showGuestbookModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-[#F5F3EF] rounded-2xl overflow-hidden shadow-2xl animate-henuoc-fade-in max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowGuestbookModal(false)}
              className="absolute top-4 right-4 z-10 p-1.5 rounded-full bg-black/10 hover:bg-black/20 text-[#7D1F2A]"
            >
              <X className="w-5 h-5" />
            </button>
            <GuestbookSection
              messages={messages}
              onSendMessage={async (name, msg) => {
                const res = await handleSendMessage(name, msg);
                if (!res.success) alert(res.error || "Gửi lời chúc thất bại!");
              }}
              guestName={guestName}
            />
          </div>
        </div>
      )}
    </div>
  );
}
