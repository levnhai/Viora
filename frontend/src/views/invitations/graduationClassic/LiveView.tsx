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
        "https://res.cloudinary.com/dynrs5wzt/image/upload/v1790470052/47683b85-039b-49ff-a554-1a3f129bb0a7_talmmy.jpg",
        "https://res.cloudinary.com/dynrs5wzt/image/upload/v1790558929/c2e847c4-0a1d-428f-974b-096611d84cf4_ltucuy.jpg",
        "https://res.cloudinary.com/dynrs5wzt/image/upload/v1790558930/7ae22457-3822-49c7-98cc-c36c16e03976_rftlyr.jpg"
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

  // Tối ưu tự động phát nhạc cho In-App Browser (Zalo, Facebook Messenger, WebView)
  useEffect(() => {
    let cleanedUp = false;

    const tryPlay = () => {
      if (cleanedUp || !audioRef.current) return;
      const audio = audioRef.current;
      audio.muted = false;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setPlaying(true);
            cleanupListeners();
          })
          .catch(() => {
            // Trình duyệt đang chờ cử chỉ tương tác đầu tiên
          });
      }
    };

    // 1. Kích hoạt trực tiếp ngay khi nạp component
    tryPlay();
    const timer1 = setTimeout(tryPlay, 100);
    const timer2 = setTimeout(tryPlay, 500);

    // 2. Kích hoạt qua WebView Bridge của Zalo / WeChat (WeixinJSBridgeReady)
    const handleWeixinBridge = () => {
      try {
        if (typeof (window as any).WeixinJSBridge !== "undefined") {
          (window as any).WeixinJSBridge.invoke("getNetworkType", {}, () => {
            tryPlay();
          });
        }
      } catch (_) {}
      tryPlay();
    };

    if (typeof (window as any).WeixinJSBridge !== "undefined") {
      handleWeixinBridge();
    } else {
      document.addEventListener("WeixinJSBridgeReady", handleWeixinBridge, { once: true });
    }

    // 3. Tối ưu cho Facebook / Messenger / Instagram In-App Browser khi Webview active
    const handleVisibilityOrFocus = () => {
      if (document.visibilityState === "visible") {
        tryPlay();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityOrFocus);
    window.addEventListener("pageshow", handleVisibilityOrFocus);
    window.addEventListener("focus", handleVisibilityOrFocus);

    // 4. Bắt cú chạm / vuốt đầu tiên trên màn hình điện thoại (User Gesture)
    const handleGesture = () => {
      tryPlay();
    };

    const gestureEvents = [
      "touchstart",
      "touchend",
      "pointerdown",
      "click",
      "keydown"
    ];

    gestureEvents.forEach((evt) => {
      window.addEventListener(evt, handleGesture, { capture: true, passive: true });
    });

    const cleanupListeners = () => {
      cleanedUp = true;
      clearTimeout(timer1);
      clearTimeout(timer2);
      document.removeEventListener("WeixinJSBridgeReady", handleWeixinBridge);
      document.removeEventListener("visibilitychange", handleVisibilityOrFocus);
      window.removeEventListener("pageshow", handleVisibilityOrFocus);
      window.removeEventListener("focus", handleVisibilityOrFocus);
      gestureEvents.forEach((evt) => {
        window.removeEventListener(evt, handleGesture, { capture: true });
      });
    };

    return () => {
      cleanupListeners();
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

      let rawTime = (weddingData.weddingTime || weddingData.events?.[0]?.time || "").replace(/\s*(AM|PM)\s*/gi, "").trim();
      if (!rawTime || rawTime.includes("09:00") || rawTime.includes("08:30") || rawTime.includes("11:00")) {
        rawTime = "11:30";
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
          weddingSlug={weddingData.slug}
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

      {/* Audio Element tối ưu cho In-App Browser & iOS */}
      {musicSource && (
        <audio
          ref={audioRef}
          src={musicSource}
          autoPlay
          loop
          playsInline
          // @ts-ignore
          webkit-playsinline="true"
          preload="auto"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
      )}
    </div>
  );
}
