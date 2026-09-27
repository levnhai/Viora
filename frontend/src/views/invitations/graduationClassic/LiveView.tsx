"use client";

import { useState, useEffect, useMemo } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { WeddingData } from "@/entities/invitation/model/types";
import { useWeddingMusic, useGuestbook } from "@/shared/lib/hooks";

import "./styles.css";
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
  const [isOpened, setIsOpened] = useState(true);

  const isDefaultWeddingCouple =
    weddingData.groomName === "Minh Quân" &&
    weddingData.brideName === "Thu Hà";

  const { lastName, firstName, fullName: graduateName } = useMemo(() => {
    if (isDefaultWeddingCouple) {
      return {
        lastName: "ĐẶNG",
        firstName: "Mai Trang",
        fullName: "Đặng Mai Trang",
      };
    }

    const groom = (weddingData.groomName || "").trim();
    const bride = (weddingData.brideName || "").trim();

    if (groom && bride && groom.toLowerCase() !== bride.toLowerCase()) {
      return {
        lastName: groom.toUpperCase(),
        firstName: bride,
        fullName: `${groom} ${bride}`,
      };
    }

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
  }, [isDefaultWeddingCouple, weddingData.groomName, weddingData.brideName]);

  const recipient = guestName?.trim() || "Cả nhà iu";

  const musicSource =
    weddingData.musicUrl?.trim() ||
    "https://lamiwedding.io.vn/storage/music-1/a-little-dream-of-me-lyrics-video-cam-on-nguoi-da-thuc-cung-toi-ost-mp3cutnet.mp3";
  const { playing, setPlaying, togglePlay, autoPlayOnce, audioRef } =
    useWeddingMusic(musicSource);
  const { handleSendMessage } = useGuestbook(weddingData.slug);

  const galleryImages = weddingData.galleryImages?.length
    ? weddingData.galleryImages
    : [
      "https://res.cloudinary.com/dynrs5wzt/image/upload/v1790438074/6821c23c-ba0d-4cee-b1a8-e611b01bce71_j0yepk.jpg",
        "https://res.cloudinary.com/dynrs5wzt/image/upload/v1790438581/6bbbe3d9-ca16-4207-b2c6-d1f613aeb21e_gqnn4k.jpg",
        "https://res.cloudinary.com/dynrs5wzt/image/upload/v1790440270/423da089-11dc-4713-9038-96d658461368_urzzj7.jpg",
        "https://res.cloudinary.com/dynrs5wzt/image/upload/v1790438582/ad294fb9-613c-4d33-a2fd-ddae72523e7f_unos5e.jpg",
        "https://res.cloudinary.com/dynrs5wzt/image/upload/v1790438591/a8b5a448-f13d-4aeb-8755-1af4f35ddc7d_i7avh9.jpg",
        "https://res.cloudinary.com/dynrs5wzt/image/upload/v1790466357/a72709f3-37bb-4e9e-8819-20b1ccc6a939_fu6wgm.jpg",
        "https://res.cloudinary.com/dynrs5wzt/image/upload/v1790466357/d3f009c4-dc2b-4936-9b07-699a15cc32a4_mjciqn.jpg",
        "https://res.cloudinary.com/dynrs5wzt/image/upload/v1790470052/47683b85-039b-49ff-a554-1a3f129bb0a7_talmmy.jpg"
      ];

  const handleOpenInvitation = () => {
    setIsOpened(true);
    setPlaying(true);
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (previewMode) {
      setIsOpened(previewMode === "invitation");
    }
  }, [previewMode]);

  // Tự động bật nhạc khi DOM mounted hoặc khi có tương tác đầu tiên (click, chạm, rê chuột, cuộn)
  useEffect(() => {
    const playAudio = () => {
      if (audioRef.current) {
        audioRef.current
          .play()
          .then(() => {
            setPlaying(true);
          })
          .catch(() => {
            // Trình duyệt chưa cho phép autoplay không có tương tác
          });
      }
    };

    // Thử phát ngay lập tức khi DOM mounted
    playAudio();

    // Thử lại sau 300ms đề phòng audio element vừa nạp xong buffer
    const timer = setTimeout(playAudio, 300);

    const handleFirstInteraction = () => {
      playAudio();
    };

    const events = ["click", "touchstart", "touchend", "pointerdown", "mousemove", "scroll", "keydown", "mouseenter"];
    events.forEach((ev) =>
      window.addEventListener(ev, handleFirstInteraction, { capture: true, once: true })
    );

    return () => {
      clearTimeout(timer);
      events.forEach((ev) =>
        window.removeEventListener(ev, handleFirstInteraction)
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [musicSource]);

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-active");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    const targetElements = document.querySelectorAll(
      ".ladi-section, .reveal-on-scroll, .reveal-from-left, .reveal-from-right, .reveal-zoom-in"
    );

    targetElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [mounted, isOpened]);

  const { monthText, day: timelineDay, month: timelineMonth, year: timelineYear, timeStr: timelineTimeStr } =
    useMemo(() => {
      const dateStr = weddingData.weddingDate;
      let d = new Date(2026, 9, 3);
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
      const daysOfWeek = ["chủ nhật", "thứ hai", "thứ ba", "thứ tư", "thứ năm", "thứ sáu", "thứ bảy"];
      const dayOfWeek = daysOfWeek[d.getDay()];

      let rawTime = (weddingData.weddingTime || weddingData.events?.[0]?.time || "").trim();
      if (!rawTime || rawTime.includes("09:00") || rawTime.includes("08:30")) {
        rawTime = "11:00";
      }

      return {
        monthText: `Tháng ${m}`,
        day: String(d.getDate()),
        month: `tháng ${m}`,
        year: `năm ${d.getFullYear()}`,
        timeStr: `${rawTime}, ${dayOfWeek}`,
      };
    }, [weddingData.weddingDate, weddingData.weddingTime, weddingData.events]);

  return (
    <div
      className="w-full min-h-screen flex justify-center bg-white template-graduation-wrapper"
      suppressHydrationWarning
    >
      {/* 2. Thân thiệp chính (LadiPage 420px container) */}
      <div
        className="ladi-wraper template-graduation-14"
        style={{
          backgroundColor: "rgb(248, 246, 243)",
          boxShadow: "0 10px 45px rgba(143, 50, 59, 0.15)",
          paddingBottom: "40px",
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
          timeStr={timelineTimeStr}
          day={timelineDay}
          month={timelineMonth}
          year={timelineYear}
        />

        {/* Section 15: Lịch trình chi tiết & Countdown */}
        <GraduationCountdown
          weddingDate={weddingData.weddingDate}
          weddingTime={weddingData.weddingTime}
          timeline={weddingData.timeline}
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
        <audio
          ref={audioRef}
          autoPlay
          loop
          playsInline
          preload="auto"
          onCanPlay={() => {
            if (audioRef.current && audioRef.current.paused) {
              audioRef.current.play().then(() => setPlaying(true)).catch(() => {});
            }
          }}
        >
          <source src={musicSource} type="audio/mpeg" />
        </audio>
      )}
    </div>
  );
}
