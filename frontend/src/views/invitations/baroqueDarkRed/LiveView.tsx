import { useState } from "react";
import { VolumeX } from "lucide-react";
import { WeddingData } from "@/entities/invitation/model/types";
import { useWeddingMusic, useGuestbook } from "@/shared/lib/hooks";

import { RunningMarquee } from "@/widgets/invitation-blocks";

import { InvitationCover } from "./InvitationCover";
import { SaveTheDateHeader } from "./components/SaveTheDateHeader";
import { FamilyWeddingInfo } from "./components/FamilyWeddingInfo";
import { CoverFlowGallery } from "./components/CoverFlowGallery";
import { ReceptionInfo } from "./components/ReceptionInfo";
import { WeddingMapSection } from "./components/WeddingMapSection";
import { DressCodeSection } from "./components/DressCodeSection";
import { EventTimeline } from "./components/EventTimeline";
import { GuestbookSection } from "./components/GuestbookSection";
import { GiftBoxModalSection } from "./components/GiftBoxModalSection";
import { ThankYouFooter } from "./components/ThankYouFooter";
import { formatToDDMMYYYY } from "@/shared/lib/utils/date";

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

  const musicSource = weddingData.musicUrl?.trim() || "/audio/wedding-song.mp3";
  const { playing, togglePlay, autoPlayOnce, audioRef } = useWeddingMusic(musicSource);
  const { messages, handleSendMessage } = useGuestbook(weddingData.slug);

  const groomName = weddingData.groomShortName || weddingData.groomName || "Gia Bảo";
  const brideName = weddingData.brideShortName || weddingData.brideName || "Ngọc Diệp";
  const formattedDate = formatToDDMMYYYY(weddingData.weddingDate, ".");

  const topMarqueeText = `${groomName} & ${brideName} • SAVE THE DATE • ${formattedDate || "19.12.2026"} • THE WEDDING`;

  const handleOpenInvitation = () => {
    setIsOpened(true);
    autoPlayOnce();
  };

  const onSendMessage = async (name: string, msg: string) => {
    const result = await handleSendMessage(name, msg);
    if (!result.success) {
      alert(result.error || "Gửi lời chúc thất bại!");
    }
  };

  const scrollToGuestbook = () => {
    const el = document.getElementById("guestbook");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full min-h-screen relative font-serif text-[#ffefd6] bg-[#1e0202] flex justify-center selection:bg-[#ffdfaf] selection:text-[#511419]">
      {/* 1. Màn Hình Phong Bì Mở Thiệp (Cover Landing) */}
      {!isOpened && previewMode !== "invitation" && (
        <InvitationCover
          weddingData={weddingData}
          guestName={guestName}
          onOpen={handleOpenInvitation}
        />
      )}

      {/* 2. Thân Thiệp Cưới Chính Baroque V2 Đỏ Đậm */}
      <div className="w-full max-w-[480px] md:max-w-xl lg:max-w-2xl min-h-screen shadow-2xl relative z-10 flex flex-col overflow-hidden border-x border-[#ffdfaf]/20 bg-[#2b0303]">
        {/* Lớp Hoa Văn Nền Gấm Damask Chìm */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 select-none opacity-60"
          style={{
            backgroundImage: "url('/images/themes/baroque-v2-dark-red/bg.webp')",
            backgroundSize: "100% auto",
            backgroundRepeat: "repeat",
            backgroundPosition: "top left",
          }}
        />

        {/* Nội dung các phần của thiệp cưới */}
        <div className="relative z-10 flex flex-col items-center w-full">
          {/* Hero: Save The Date & Khung Tranh Baroque */}
          <SaveTheDateHeader weddingData={weddingData} />

          {/* Dải Chữ Chạy 1: Tên Cặp Đôi & Ngày Cưới */}
          <RunningMarquee
            text={topMarqueeText}
            speed={20}
            separator="❦"
            className="bg-[#3a0808] text-[#ffdfaf] border-y border-[#ffdfaf]/25 py-2.5 text-[11px] sm:text-xs uppercase tracking-[0.25em] font-serif shadow-inner"
          />

          {/* Thông Tin Lễ Cưới & Gia Đình */}
          <FamilyWeddingInfo weddingData={weddingData} />

          {/* Album Ảnh Cưới 3D Cover Flow */}
          <CoverFlowGallery weddingData={weddingData} />

          {/* Thông Tin Tiệc Cưới, Lịch Tháng & Đếm Ngược */}
          <ReceptionInfo
            weddingData={weddingData}
            onScrollToRsvp={scrollToGuestbook}
          />

          {/* Dải Chữ Chạy 2: Lời Chúc Mừng */}
          <RunningMarquee
            text="FOREVER TOGETHER • HAPPY WEDDING • BEST WISHES • TRĂM NĂM HẠNH PHÚC"
            speed={25}
            separator="✦"
            className="bg-[#240202] text-[#ffefd6] border-y border-[#ffdfaf]/20 py-2 text-[10px] sm:text-[11px] uppercase tracking-[0.3em] font-serif"
          />

          {/* Địa Điểm & Bản Đồ Google Maps */}
          <WeddingMapSection weddingData={weddingData} />

          {/* Quy Định Trang Phục (Dress Code) */}
          <DressCodeSection />

          {/* Lịch Trình Ngày Cưới */}
          <EventTimeline weddingData={weddingData} />

          {/* Sổ Lưu Bút & Lời Chúc */}
          <GuestbookSection
            guestName={guestName}
            messages={messages}
            onSendMessage={onSendMessage}
          />

          {/* Hộp Quà Mừng & Mã QR Ngân Hàng */}
          <GiftBoxModalSection weddingData={weddingData} />

          {/* Lời Cảm Ơn & Chân Trang */}
          <ThankYouFooter />
        </div>

        {/* Nút Điều Khiển Nhạc Sóng Âm (Floating Music Wave) */}
        <button
          onClick={togglePlay}
          className={`fixed top-4 right-4 z-40 h-8 px-2.5 flex items-center gap-1.5 rounded-full transition-all duration-300 shadow-lg cursor-pointer border border-[#ffdfaf]/30 ${
            playing
              ? "bg-[#2b0303]/80 backdrop-blur-md text-[#ffdfaf] hover:scale-105"
              : "bg-black/60 backdrop-blur-md text-[#ffdfaf]/70 hover:text-[#ffdfaf] hover:scale-105"
          }`}
          aria-label={playing ? "Tắt nhạc" : "Bật nhạc"}
          title={playing ? "Tắt nhạc" : "Bật nhạc"}
        >
          {playing ? (
            <div className="flex items-center gap-1 h-3.5 px-0.5">
              <span className="w-[2px] bg-[#ffdfaf] rounded-full animate-sound-1" />
              <span className="w-[2px] bg-[#ffdfaf] rounded-full animate-sound-2" />
              <span className="w-[2px] bg-[#ffdfaf] rounded-full animate-sound-3" />
              <span className="w-[2px] bg-[#ffdfaf] rounded-full animate-sound-4" />
            </div>
          ) : (
            <div className="flex items-center gap-1 text-[11px] font-sans">
              <VolumeX size={14} />
            </div>
          )}
        </button>

        {/* Audio Tag */}
        <audio ref={audioRef} loop preload="auto">
          <source src={musicSource} type="audio/mpeg" />
        </audio>
      </div>
    </div>
  );
}
