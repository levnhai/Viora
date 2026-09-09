import { useState } from "react";
import { VolumeX } from "lucide-react";

import { InvitationCover } from "./InvitationCover";
import { LoveStorySpotlight } from "./components/LoveStorySpotlight";
import { FamilyInvitationIntro } from "./components/FamilyInvitationIntro";
import { EventScheduleCard } from "./components/EventScheduleCard";
import { MonthlyCalendarCard } from "./components/MonthlyCalendarCard";
import { EditorialGallery } from "./components/EditorialGallery";
import { RsvpAndGuestbook } from "./components/RsvpAndGuestbook";
import { WeddingCountdown } from "./components/WeddingCountdown";
import { ThankYouSection } from "./components/ThankYouSection";
import { GiftRegistryModal } from "@/widgets/invitation-blocks";
import { GatefoldCurtainOverlay } from "@/widgets/invitation-blocks";
import { RunningMarquee } from "@/widgets/invitation-blocks";

import { WeddingData } from "@/entities/invitation/model/types";
import { useWeddingMusic, useGuestbook } from "@/shared/lib/hooks";
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
  const [giftModalOpen, setGiftModalOpen] = useState(false);

  const musicSource = weddingData.musicUrl?.trim() || "/audio/wedding-song.mp3";

  const { playing, togglePlay, autoPlayOnce, audioRef } = useWeddingMusic(musicSource);
  const { messages, handleSendMessage } = useGuestbook(weddingData.slug);

  const onSendMessage = async (name: string, msg: string) => {
    const result = await handleSendMessage(name, msg);
    if (!result.success) {
      alert(result.error || "Gửi lời chúc thất bại!");
    }
  };

  const formattedDate = formatToDDMMYYYY(weddingData.weddingDate, ".");

  const marqueeText = `${weddingData.groomName || "Tuấn Anh"} & ${weddingData.brideName || "Bích Ngọc"} • SAVE OUR DATE • ${formattedDate} • THE WEDDING`;

  return (
    <div className="w-full min-h-screen relative font-serif text-[#2C2018] bg-[#EDE9E1] flex justify-center selection:bg-[#2C6E91] selection:text-white">
      {previewMode !== "invitation" && (
        <GatefoldCurtainOverlay
          accentColor="#2C6E91"
          gradientTop="#3881A7"
          gradientBottom="#1F516C"
          onComplete={() => {
            autoPlayOnce();
          }}
        />
      )}

      {/* Toàn Bộ Thiệp Cưới */}
      <div className="w-full max-w-[480px] md:max-w-xl lg:max-w-2xl min-h-screen bg-white shadow-2xl relative z-10 flex flex-col overflow-hidden ring-1 ring-black/5">
        {/* 1. Hero Cover */}
        <InvitationCover
          weddingData={weddingData}
          guestName={guestName}
        />

        {/* Dải Băng Chữ Chạy */}
        <RunningMarquee
          text={marqueeText}
          speed={22}
          className="bg-[#2C6E91] text-white py-2 text-[11px] sm:text-xs uppercase tracking-[0.25em] font-lora shadow-inner"
        />

        {/* 2. Câu Chuyện Tình Yêu */}
        <LoveStorySpotlight weddingData={weddingData} />

        {/* 3. Lời Mời & Thông Tin Hai Họ */}
        <FamilyInvitationIntro weddingData={weddingData} />

        {/* 4. Lịch Sự Kiện Cưới */}
        <EventScheduleCard weddingData={weddingData} />

        {/* 5. Lịch Tháng*/}
        <MonthlyCalendarCard weddingData={weddingData} />

        {/* Dải Chữ Chạy */}
        <RunningMarquee
          text="FOREVER TOGETHER • HAPPY WEDDING • BEST WISHES"
          speed={28}
          className="bg-[#FAF8F5] text-[#2C6E91] border-y border-[#2C6E91]/20 py-2 text-[10px] sm:text-[11px] uppercase tracking-[0.3em] font-lora"
        />

        {/* 6. Album Golden Hour of Love Mosaic */}
        <EditorialGallery weddingData={weddingData} />

        {/* 7. Form RSVP & Sổ Lời Chúc */}
        <RsvpAndGuestbook
          weddingData={weddingData}
          guestName={guestName}
          messages={messages}
          onSendMessage={onSendMessage}
          onOpenGiftModal={() => setGiftModalOpen(true)}
        />

        {/* 8. Đếm Ngược */}
        <WeddingCountdown
          weddingDate={weddingData.weddingDate || weddingData.events?.[0]?.date}
          weddingTime={weddingData.weddingTime || weddingData.events?.[0]?.time}
        />

        {/* 9. Lời Cảm Ơn & Chân Trang */}
        <ThankYouSection weddingData={weddingData} />

        {/* Modal Mừng Cưới */}
        <GiftRegistryModal
          weddingData={weddingData}
          isOpen={giftModalOpen}
          onClose={() => setGiftModalOpen(false)}
          accentColor="#2C6E91"
          hoverColor="#1F516C"
        />

        {/* Nút Điều Khiển Nhạc Sóng Âm */}
        <button
          onClick={togglePlay}
          className={`fixed top-4 right-4 z-40 h-8 px-2.5 flex items-center gap-1.5 rounded-full transition-all duration-300 shadow-md cursor-pointer ${
            playing
              ? "bg-[#1D1D1D]/60 backdrop-blur-md text-white hover:scale-105"
              : "bg-black/50 backdrop-blur-md text-white/70 hover:text-white hover:scale-105"
          }`}
          aria-label={playing ? "Tắt nhạc" : "Bật nhạc"}
          title={playing ? "Tắt nhạc" : "Bật nhạc"}
        >
          {playing ? (
            <div className="flex items-center gap-1 h-3.5 px-0.5">
              <span className="w-[2px] bg-white rounded-full animate-sound-1" />
              <span className="w-[2px] bg-white rounded-full animate-sound-2" />
              <span className="w-[2px] bg-white rounded-full animate-sound-3" />
              <span className="w-[2px] bg-white rounded-full animate-sound-4" />
            </div>
          ) : (
            <div className="flex items-center gap-1 text-[11px] font-sans">
              <VolumeX size={14} />
            </div>
          )}
        </button>

        {/* Audio Tag */}
        <audio ref={audioRef} loop preload="auto">
          <source
            src={musicSource}
            type="audio/mpeg"
          />
        </audio>
      </div>
    </div>
  );
}
