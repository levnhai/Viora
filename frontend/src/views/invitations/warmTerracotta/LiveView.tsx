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
import { formatDateToDDMMYYYY } from "@/shared/lib/utils/date";

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

  const { playing, togglePlay, setPlaying, audioRef } = useWeddingMusic(
    weddingData.musicUrl
  );
  const { messages, handleSendMessage } = useGuestbook(weddingData.slug);

  const onSendMessage = async (name: string, msg: string) => {
    const result = await handleSendMessage(name, msg);
    if (!result.success) {
      alert(result.error || "Gửi lời chúc thất bại!");
    }
  };

  const formattedDate = weddingData.weddingDate
    ? formatDateToDDMMYYYY(weddingData.weddingDate)
    : "26.12.2026";

  const marqueeText = `${weddingData.groomName || "Tuấn Anh"} & ${weddingData.brideName || "Bích Ngọc"} • SAVE OUR DATE • ${formattedDate} • THE WEDDING`;

  return (
    <div className="w-full min-h-screen relative font-serif text-[#2C2018] bg-[#EDE9E1] flex justify-center selection:bg-[#844C3A] selection:text-white">
      {/* Import Animate.css cho toàn bộ hiệu ứng chữ chạy và hoạt ảnh */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
      />

      {/* Import 7 Web Fonts đặc trưng của mẫu thiepcuoimau30 */}
      <link
        href="https://cdn.taothiep.com/wedding-app-assets/fonts/alisheia/font.css"
        rel="stylesheet"
      />
      <link
        href="https://cdn.taothiep.com/wedding-app-assets/fonts/arcittya-begatri/font.css"
        rel="stylesheet"
      />
      <link
        href="https://cdn.taothiep.com/wedding-app-assets/fonts/edwardian/font.css"
        rel="stylesheet"
      />
      <link
        href="https://cdn.taothiep.com/wedding-app-assets/fonts/hastegi/font.css"
        rel="stylesheet"
      />
      <link
        href="https://cdn.taothiep.com/wedding-app-assets/fonts/lora/font.css"
        rel="stylesheet"
      />
      <link
        href="https://cdn.taothiep.com/wedding-app-assets/fonts/luxurious/font.css"
        rel="stylesheet"
      />
      <link
        href="https://cdn.taothiep.com/wedding-app-assets/fonts/uvn/font.css"
        rel="stylesheet"
      />

      {/* Sound Bar Animation Keyframes & Helper Styles */}
      <style>{`
        .font-luxurious { font-family: 'Luxurious', 'Playfair Display', serif; }
        .font-edwardian { font-family: 'Edwardian', 'Pinyon', cursive; }
        .font-hastegi { font-family: 'Hastegi', 'Plus Jakarta Sans', sans-serif; }
        .font-lora { font-family: 'Lora', Georgia, serif; }
        .font-alisheia { font-family: 'Alisheia', sans-serif; }
        .font-uvn { font-family: 'UVN', serif; }
        .font-arcittya { font-family: 'Arcittya Begatri', serif; }

        @keyframes soundWave1 { 0%, 100% { height: 2px; } 20% { height: 5px; } 40% { height: 8px; } 60% { height: 3px; } 80% { height: 7px; } }
        @keyframes soundWave2 { 0%, 100% { height: 3px; } 20% { height: 7px; } 40% { height: 2px; } 60% { height: 8px; } 80% { height: 4px; } }
        @keyframes soundWave3 { 0%, 100% { height: 2px; } 20% { height: 8px; } 40% { height: 4px; } 60% { height: 7px; } 80% { height: 3px; } }
        @keyframes soundWave4 { 0%, 100% { height: 4px; } 20% { height: 3px; } 40% { height: 7px; } 60% { height: 2px; } 80% { height: 8px; } }
        .animate-sound-1 { animation: soundWave1 1.4s ease-in-out infinite; }
        .animate-sound-2 { animation: soundWave2 1.6s ease-in-out infinite 0.2s; }
        .animate-sound-3 { animation: soundWave3 1.8s ease-in-out infinite 0.4s; }
        .animate-sound-4 { animation: soundWave4 1.5s ease-in-out infinite 0.1s; }
      `}</style>

      {/* Màn hình mở cửa 2 cánh nổi trên mẫu thiệp khi vừa mount */}
      {previewMode !== "invitation" && (
        <GatefoldCurtainOverlay
          onComplete={() => {
            if (weddingData.musicUrl) setPlaying(true);
          }}
        />
      )}

      {/* Toàn Bộ Thân Thiệp Cưới (Chuẩn Mobile Viewport 430px) */}
      <div className="w-full max-w-[430px] min-h-screen bg-white shadow-2xl relative z-10 flex flex-col overflow-hidden">
        {/* 1. Hero Cover */}
        <InvitationCover
          weddingData={weddingData}
          guestName={guestName}
        />

        {/* Dải Băng Chữ Chạy Vô Tận (Marquee Ticker) */}
        <RunningMarquee
          text={marqueeText}
          speed={22}
          className="bg-[#844C3A] text-white py-2 text-[11px] sm:text-xs uppercase tracking-[0.25em] font-lora shadow-inner"
        />

        {/* 2. Câu Chuyện Tình Yêu & Chân Dung So Le Độc Đáo */}
        <LoveStorySpotlight weddingData={weddingData} />

        {/* 3. Lời Mời Trang Trọng & Thông Tin Hai Họ */}
        <FamilyInvitationIntro weddingData={weddingData} />

        {/* 4. Lịch Sự Kiện Cưới (2 Tiệc) */}
        <EventScheduleCard weddingData={weddingData} />

        {/* 5. Lịch Tháng (Calendar Grid Trên Nền Ảnh) */}
        <MonthlyCalendarCard weddingData={weddingData} />

        {/* Dải Chữ Chạy Nghệ Thuật Giữa Lịch và Album */}
        <RunningMarquee
          text="FOREVER TOGETHER • HAPPY WEDDING • BEST WISHES"
          speed={28}
          className="bg-[#FAF8F5] text-[#844C3A] border-y border-[#844C3A]/20 py-2 text-[10px] sm:text-[11px] uppercase tracking-[0.3em] font-lora"
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

        {/* 8. Đếm Ngược Countdown "Đừng quên mình có hẹn nhé!" */}
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
        />

        {/* Nút Điều Khiển Nhạc Sóng Âm (Floating Music Control) */}
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
            src={(weddingData as any).musicUrl || "/audio/wedding-song.mp3"}
            type="audio/mpeg"
          />
        </audio>
      </div>
    </div>
  );
}
