"use client";

import { useState, useEffect, useCallback } from "react";
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
    coverImage:
      weddingData.coverImage ||
      weddingData.galleryImages?.[0] ||
      "/templates/hen-uoc/couple_hero.jpg",
    groomImage:
      weddingData.groomImage ||
      (weddingData.galleryImages && weddingData.galleryImages.length > 1
        ? weddingData.galleryImages[1]
        : weddingData.galleryImages?.[0]) ||
      "/templates/hen-uoc/groom_portrait.jpg",
    brideImage:
      weddingData.brideImage ||
      (weddingData.galleryImages && weddingData.galleryImages.length > 2
        ? weddingData.galleryImages[2]
        : weddingData.galleryImages?.[1] || weddingData.galleryImages?.[0]) ||
      "/templates/hen-uoc/bride_portrait.jpg",
  };

function normalizeAudioUrl(url?: string): string {
  if (!url) return "/templates/hen-uoc/music_marry_you.mp3";
  const trimmed = url.trim();
  if (!trimmed) return "/templates/hen-uoc/music_marry_you.mp3";
  try {
    return encodeURI(decodeURI(trimmed));
  } catch {
    return encodeURI(trimmed);
  }
}

  const rawMusicSource =
    enrichedWeddingData.musicUrl?.trim() ||
    (enrichedWeddingData as any).themeSettings?.musicUrl?.trim() ||
    (weddingData as any).musicUrl?.trim() ||
    (weddingData as any).themeSettings?.musicUrl?.trim() ||
    "/templates/hen-uoc/music_marry_you.mp3";

  const musicSource = normalizeAudioUrl(rawMusicSource);

  const { playing, togglePlay, autoPlayOnce, audioRef } = useWeddingMusic(musicSource);
  const { messages, handleSendMessage } = useGuestbook(enrichedWeddingData.slug || "hen-uoc");

  const handleStartOpen = useCallback(() => {
    setIsOpening(true);
    autoPlayOnce();
  }, [autoPlayOnce]);

  const handleOpenInvitation = useCallback(() => {
    setIsOpened(true);
  }, []);

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
          transition: "opacity 1.2s cubic-bezier(0.25, 1, 0.5, 1), transform 1.2s cubic-bezier(0.25, 1, 0.5, 1)",
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

      {/* Nút bật/tắt nhạc nổi ở góc phải màn hình chuẩn thiết kế vòng tròn đỏ & sóng âm equalizer */}
      <aside aria-label="Điều khiển âm thanh" className="fixed bottom-6 right-4 sm:right-6 z-50">
        <button
          onClick={togglePlay}
          className="group relative flex items-center justify-center w-12 h-12 rounded-full transition-transform duration-300 hover:scale-105 active:scale-95 cursor-pointer select-none"
          title={playing ? "Dừng nhạc" : "Mở nhạc"}
          aria-label={playing ? "Dừng nhạc" : "Mở nhạc"}
        >
          {/* Lớp vòng tròn hào quang bên ngoài (halo ring) */}
          <span
            className={`absolute inset-0 rounded-full transition-all duration-500 ${
              playing
                ? "bg-[#7D1F2A]/35 ring-2 ring-[#7D1F2A]/40 scale-100"
                : "bg-[#7D1F2A]/20 ring-1 ring-[#7D1F2A]/30 scale-95 opacity-80"
            }`}
          />

          {/* Nút tròn màu đỏ chủ đạo bên trong */}
          <span
            className={`relative w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 border border-white/25 ${
              playing
                ? "bg-[#7D1F2A] shadow-[#7D1F2A]/50 group-hover:bg-[#651520]"
                : "bg-[#7D1F2A]/90 shadow-[#7D1F2A]/30 group-hover:bg-[#7D1F2A]"
            }`}
          >
            {/* 4 thanh sóng âm equalizer | . . | */}
            <span className="flex items-center gap-[3px] h-5 px-1 justify-center">
              <span
                className={`w-[2.5px] bg-white rounded-full transition-all duration-300 ${
                  playing ? "henuoc-wave-bar-1" : "h-3.5 opacity-70"
                }`}
              />
              <span
                className={`w-[2.5px] bg-white rounded-full transition-all duration-300 ${
                  playing ? "henuoc-wave-bar-2" : "h-1.5 opacity-70"
                }`}
              />
              <span
                className={`w-[2.5px] bg-white rounded-full transition-all duration-300 ${
                  playing ? "henuoc-wave-bar-3" : "h-1.5 opacity-70"
                }`}
              />
              <span
                className={`w-[2.5px] bg-white rounded-full transition-all duration-300 ${
                  playing ? "henuoc-wave-bar-4" : "h-3.5 opacity-70"
                }`}
              />
            </span>
          </span>
        </button>
      </aside>

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
              messages={messages.map((m) => ({ name: m.name, message: m.msg, createdAt: m.time }))}
              onSendMessage={async (name, msg) => {
                const res = await handleSendMessage(name, msg);
                if (!res.success) alert(res.error || "Gửi lời chúc thất bại!");
              }}
              guestName={guestName}
            />
            </div>
          </div>
        )}

      {/* Audio phát nhạc nền */}
      <audio
        ref={audioRef}
        src={musicSource}
        loop
        preload="auto"
      >
        <source src={musicSource} type="audio/mpeg" />
      </audio>
    </div>
  );
}
