import { useState, useEffect, useRef } from "react";
import { API_URL } from "./config";
import { formatTimeAgo } from "./utils/date";

// đếm ngược thời gian
export function useCountdown(targetMs: number) {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  useEffect(() => {
    function calc() {
      const diff = Math.max(0, targetMs - Date.now());
      setTime({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    }
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
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
        return { success: false, error: data.message || "Gửi lời chúc thất bại!" };
      }
    } catch (err) {
      console.error(err);
      return { success: false, error: "Đã xảy ra lỗi khi gửi lời chúc!" };
    }
  };

  return { messages, handleSendMessage, setMessages };
}
