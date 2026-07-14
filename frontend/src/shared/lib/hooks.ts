import { useState, useEffect, useRef } from "react";
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
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (playing) {
        audioRef.current.play().catch(() => {
          setPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [playing]);

  const togglePlay = () => setPlaying((prev) => !prev);

  return { playing, setPlaying, togglePlay, audioRef };
}

// quản lý sổ lưu bút đám cưới
export function useGuestbook(weddingSlug: string) {
  const [messages, setMessages] = useState<GuestMessage[]>([]);

  useEffect(() => {
    if (!weddingSlug) return;
    fetch(`${API_URL}/api/weddings/${weddingSlug}/guestbook`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          const formatted = data.data.map((item: any) => ({
            name: item.name,
            msg: item.message,
            time: formatTimeAgo(item.createdAt),
          }));
          setMessages(formatted);
        }
      })
      .catch((err) => console.error("Lỗi khi tải sổ lưu bút:", err));
  }, [weddingSlug]);

  const handleSendMessage = async (name: string, msg: string) => {
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
        setMessages((prev) => [{ name, msg, time: "Vừa xong" }, ...prev]);
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
