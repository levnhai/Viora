import { useState, useEffect, useRef, useCallback } from "react";
import { API_URL } from "./config";
import { formatTimeAgo } from "./utils/date";

interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// tính toán thời gian
function calculateCountdown(targetMs: number): Countdown {
  const diff = Math.max(0, targetMs - Date.now());

  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1_000),
  };
}

// đếm ngược thời gian
export function useCountdown(targetMs: number) {
  const [time, setTime] = useState(() => calculateCountdown(targetMs));

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      const next = calculateCountdown(targetMs);

      setTime(next);

      if (
        next.days === 0 &&
        next.hours === 0 &&
        next.minutes === 0 &&
        next.seconds === 0
      ) {
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [targetMs]);

  return time;
}

// hiệu ứng cuộn trang
export function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

export interface GuestMessage {
  name: string;
  msg: string;
  time: string;
}

// quản lý nhạc nền đám cưới
export function useWeddingMusic(musicUrl?: string) {
  const [playing, setPlaying] = useState(false);
  const userMutedRef = useRef(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Đồng bộ trạng thái từ thẻ audio thực tế
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, []);

  // Tự động phát khi tải trang và vượt qua chính sách Autoplay Policy của trình duyệt
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // 1. Thử tự động phát ngay lập tức
    const tryAutoplay = () => {
      if (userMutedRef.current || !audio.paused) return;
      audio.play().catch(() => {
        // Trình duyệt chặn autoplay khi chưa có tương tác người dùng
      });
    };

    tryAutoplay();

    // 2. Kích hoạt ngay khi người dùng chạm/click/cuộn bất kỳ đâu trên màn hình lần đầu
    const handleFirstUserGesture = () => {
      if (userMutedRef.current) return;
      if (audio.paused) {
        audio.play().catch(() => {});
      }
    };

    window.addEventListener("click", handleFirstUserGesture, { once: true, passive: true });
    window.addEventListener("touchstart", handleFirstUserGesture, { once: true, passive: true });
    window.addEventListener("scroll", handleFirstUserGesture, { once: true, passive: true });
    window.addEventListener("pointerdown", handleFirstUserGesture, { once: true, passive: true });
    window.addEventListener("wheel", handleFirstUserGesture, { once: true, passive: true });

    return () => {
      window.removeEventListener("click", handleFirstUserGesture);
      window.removeEventListener("touchstart", handleFirstUserGesture);
      window.removeEventListener("scroll", handleFirstUserGesture);
      window.removeEventListener("pointerdown", handleFirstUserGesture);
      window.removeEventListener("wheel", handleFirstUserGesture);
    };
  }, [musicUrl]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) {
      setPlaying((prev) => !prev);
      return;
    }

    if (audio.paused) {
      userMutedRef.current = false;
      audio
        .play()
        .then(() => setPlaying(true))
        .catch((err) => {
          console.warn("Lỗi phát audio:", err);
          setPlaying(false);
        });
    } else {
      userMutedRef.current = true;
      audio.pause();
      setPlaying(false);
    }
  }, []);

  const autoPlayOnce = useCallback(() => {
    const audio = audioRef.current;
    if (audio && !userMutedRef.current && audio.paused) {
      audio.play().catch((err) => {
        console.warn("Autoplay bị trình duyệt hạn chế trước khi tương tác:", err);
      });
    }
  }, []);

  return { playing, setPlaying, togglePlay, autoPlayOnce, audioRef };
}

const DEFAULT_MOCK_GUESTBOOK: GuestMessage[] = [
  {
    name: "Hội Bạn Thân 💖",
    msg: "Chúc hai bạn trăm năm hạnh phúc, sớm có bầy con thơ nhe! Yêu hai bạn nhiều!",
    time: "1 giờ trước",
  },
  {
    name: "Anh Chị Đồng Nghiệp ✨",
    msg: "Chúc hai em mãi yêu thương nhau và cùng nhau xây dựng tổ ấm tuyệt vời nhé!",
    time: "3 giờ trước",
  },
  {
    name: "Bạn Cấp 3 🌸",
    msg: "Mừng ngày chung đôi của hai bạn! Chúc hai bạn luôn ngập tràn tiếng cười!",
    time: "5 giờ trước",
  },
];

// quản lý sổ lưu bút đám cưới
export function useGuestbook(weddingSlug: string) {
  const isPreview = !weddingSlug || weddingSlug === "preview" || weddingSlug === "demo";
  const [messages, setMessages] = useState<GuestMessage[]>(
    isPreview ? DEFAULT_MOCK_GUESTBOOK : []
  );

  useEffect(() => {
    if (isPreview) {
      setMessages(DEFAULT_MOCK_GUESTBOOK);
      return;
    }

    fetch(`${API_URL}/api/weddings/${weddingSlug}/guestbook`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          const formatted = data.data.map((item: any) => ({
            name: item.name,
            msg: item.message || item.msg || "",
            time: formatTimeAgo(item.createdAt),
          }));
          setMessages(formatted);
        } else {
          setMessages([]);
        }
      })
      .catch((err) => {
        console.error("Lỗi khi tải sổ lưu bút:", err);
        setMessages([]);
      });
  }, [weddingSlug, isPreview]);

  const handleSendMessage = async (name: string, msg: string) => {
    if (isPreview) {
      setMessages((prev) => [{ name: name || "Khách mời", msg, time: "Vừa xong" }, ...prev]);
      return { success: true };
    }
    try {
      const response = await fetch(
        `${API_URL}/api/weddings/${weddingSlug}/guestbook`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, message: msg }),
        },
      );
      const data = await response.json();
      if (response.ok && data.success) {
        setMessages((prev) => [{ name: name || "Khách mời", msg, time: "Vừa xong" }, ...prev]);
        return { success: true };
      } else {
        return {
          success: false,
          error: data.message || "Gửi lời chúc thất bại!",
        };
      }
    } catch (err) {
      console.error(err);
      return { success: false, error: "Đã xảy ra lỗi khi gửi lời chúc!" };
    }
  };

  return { messages, handleSendMessage, setMessages };
}
