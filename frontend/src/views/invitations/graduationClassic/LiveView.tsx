"use client";

import { useState, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { WeddingData } from "@/entities/invitation/model/types";
import { useWeddingMusic, useGuestbook } from "@/shared/lib/hooks";

import "./styles.css";
import { InvitationCover } from "./InvitationCover";
import {
  GraduationHero,
  GraduationPortrait,
  GraduationTimeline,
  GraduationCountdown,
  GraduateStory,
  GraduationGallery,
  GraduationRsvp,
  GraduationFooter,
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
  const [mounted, setMounted] = useState(false);
  const [isOpened, setIsOpened] = useState(previewMode === "invitation");

  const isDefaultWeddingCouple =
    weddingData.groomName === "Minh Quân" &&
    weddingData.brideName === "Thu Hà";

  const getGraduateNames = () => {
    if (isDefaultWeddingCouple) {
      return {
        lastName: "ĐẶNG",
        firstName: "Mai Trang",
        fullName: "Đặng Mai Trang",
      };
    }

    const groom = (weddingData.groomName || "").trim();
    const bride = (weddingData.brideName || "").trim();

    // Trường hợp 1: Nhập cả 2 ô khác nhau (Họ đệm ở ô groomName, Tên ở ô brideName)
    if (groom && bride && groom.toLowerCase() !== bride.toLowerCase()) {
      return {
        lastName: groom.toUpperCase(),
        firstName: bride,
        fullName: `${groom} ${bride}`,
      };
    }

    // Trường hợp 2: Chỉ nhập 1 trong 2 ô hoặc cả 2 ô giống nhau
    const singleName = (bride || groom || "Đặng Mai Trang").trim();
    const parts = singleName.split(/\s+/);
    if (parts.length > 1) {
      return {
        lastName: parts[0].toUpperCase(),
        firstName: parts.slice(1).join(" "),
        fullName: singleName,
      };
    }

    return {
      lastName: "ĐẶNG",
      firstName: singleName || "Mai Trang",
      fullName: singleName || "Đặng Mai Trang",
    };
  };

  const { lastName, firstName, fullName: graduateName } = getGraduateNames();
  const recipient = guestName?.trim() || "Cả nhà iu";

  const musicSource =
    weddingData.musicUrl?.trim() ||
    "https://lamiwedding.io.vn/storage/music-1/a-little-dream-of-me-lyrics-video-cam-on-nguoi-da-thuc-cung-toi-ost-mp3cutnet.mp3";
  const { playing, togglePlay, autoPlayOnce, audioRef } =
    useWeddingMusic(musicSource);
  const { handleSendMessage } = useGuestbook(weddingData.slug);

  const galleryImages = weddingData.galleryImages?.length
    ? weddingData.galleryImages
    : [
        "https://w.ladicdn.com/s650x700/69b247cf4f6ddc0012f0ce55/1784774421170_3379540865962086579_g2668429489759155549_987364ad977145acecd0b9ccee916950-20260723163343-c0hna.jpg",
        "https://w.ladicdn.com/s650x700/69b247cf4f6ddc0012f0ce55/1784774421188_3379540865962086579_g2668429489759155549_fe35cc6df98c1db7d8bc02d16a94ec2b-20260723163344-wkfcw.jpg",
        "https://w.ladicdn.com/s650x700/69b247cf4f6ddc0012f0ce55/1784774421208_3379540865962086579_g2668429489759155549_a296b5a3fa8d575c9bb0d8e874836f32-20260723163435-0sug9.jpg",
        "https://w.ladicdn.com/s650x700/69b247cf4f6ddc0012f0ce55/1784774421263_3379540865962086579_g2668429489759155549_8ee5c45ee5a08ba393a4a2ec8db2f7ab-20260723163500-2ay81.jpg",
      ];

  const handleOpenInvitation = () => {
    setIsOpened(true);
    autoPlayOnce();
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (previewMode) {
      setIsOpened(previewMode === "invitation");
    }
  }, [previewMode]);

  useEffect(() => {
    const handleFirstInteraction = () => {
      autoPlayOnce();
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };
    window.addEventListener("click", handleFirstInteraction, { once: true });
    window.addEventListener("touchstart", handleFirstInteraction, { once: true });
    return () => {
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getEventDateParts = (dateStr?: string) => {
    let d = new Date(2026, 8, 26);
    if (dateStr) {
      if (typeof dateStr === "string") {
        if (dateStr.includes("-")) {
          const parts = dateStr.split("T")[0].split("-");
          if (parts.length === 3) {
            const y = parseInt(parts[0], 10);
            const m = parseInt(parts[1], 10) - 1;
            const day = parseInt(parts[2], 10);
            if (!isNaN(y) && !isNaN(m) && !isNaN(day)) {
              d = new Date(y, m, day);
            }
          }
        } else if (dateStr.includes("/")) {
          const parts = dateStr.split("/");
          if (parts.length === 3) {
            const day = parseInt(parts[0], 10);
            const m = parseInt(parts[1], 10) - 1;
            const y = parseInt(parts[2], 10);
            if (!isNaN(y) && !isNaN(m) && !isNaN(day)) {
              d = new Date(y, m, day);
            }
          }
        }
      } else {
        const parsed = new Date(dateStr);
        if (!isNaN(parsed.getTime())) d = parsed;
      }
    }
    const m = d.getMonth() + 1;
    return {
      monthText: `Tháng ${m}`,
      day: String(d.getDate()),
      month: `tháng ${m}`,
      year: `năm ${d.getFullYear()}`,
    };
  };
  const { monthText, day: timelineDay, month: timelineMonth, year: timelineYear } =
    getEventDateParts(weddingData.weddingDate);

  return (
    <div
      className="w-full min-h-screen flex justify-center bg-white template-graduation-wrapper"
      suppressHydrationWarning
    >
      {/* 1. Màn hình phong bì mở thiệp */}
      {!isOpened && previewMode !== "invitation" && (
        <InvitationCover
          weddingData={weddingData}
          guestName={guestName}
          onOpen={handleOpenInvitation}
        />
      )}

      {/* 2. Thân thiệp chính (LadiPage 420px container) */}
      <div
        className="ladi-wraper template-graduation-14"
        style={{
          backgroundColor: "rgb(248, 246, 243)",
          boxShadow: "0 10px 45px rgba(143, 50, 59, 0.15)",
        }}
        suppressHydrationWarning
      >
        {/* Section 5: Hero, dải ảnh film, lịch tháng */}
        <GraduationHero
          firstName={firstName}
          lastName={lastName}
          recipient={recipient}
          monthText={monthText}
          eventDate={weddingData.weddingDate}
        />

        {/* Section 20: Ảnh chân dung Mai Trang */}
        <GraduationPortrait />

        {/* Section 23: Cặp tem vintage & Thông tin thời gian địa điểm */}
        <GraduationTimeline
          locationName={weddingData.events?.[0]?.locationName}
          address={weddingData.events?.[0]?.address}
          mapUrl={weddingData.events?.[0]?.mapUrl}
          day={timelineDay}
          month={timelineMonth}
          year={timelineYear}
        />

        {/* Section 15: Lịch trình chi tiết & Countdown */}
        <GraduationCountdown
          weddingDate={weddingData.weddingDate}
          weddingTime={weddingData.weddingTime}
        />

        {/* Section 13: My Story thư giấy vintage */}
        <GraduateStory graduateName={graduateName} />

        {/* Section 24: Album ảnh cử nhân slider */}
        <GraduationGallery
          galleryImages={galleryImages}
          graduateName={graduateName}
        />

        {/* Section 11: RSVP Form xác nhận tham dự & Popup cảm ơn */}
        <GraduationRsvp
          guestName={guestName}
          onSendMessage={handleSendMessage}
        />

        {/* Section 12: Thank you footer & Social links */}
        <GraduationFooter />
      </div>

      {/* 3. Nút bật/tắt nhạc nổi */}
      <button
        onClick={togglePlay}
        className={`fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer border ${
          playing
            ? "bg-[#FFF3E0] text-[#8F323B] border-[#8F323B]/30"
            : "bg-white text-[#8F323B] border-slate-200"
        }`}
        aria-label={playing ? "Tắt nhạc" : "Bật nhạc"}
        title={playing ? "Tắt nhạc" : "Bật nhạc"}
      >
        {playing ? (
          <Volume2 className="w-5 h-5 text-[#8F323B] animate-pulse" />
        ) : (
          <VolumeX className="w-5 h-5 text-[#8F323B]/70" />
        )}
      </button>

      {/* Audio Element */}
      {musicSource && (
        <audio ref={audioRef} loop preload="auto">
          <source src={musicSource} type="audio/mpeg" />
        </audio>
      )}
    </div>
  );
}
