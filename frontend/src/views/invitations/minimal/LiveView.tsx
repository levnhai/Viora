import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Phone, Mail } from "lucide-react";

import { Envelope } from "@/widgets/envelope";
import { InvitationCover } from "./InvitationCover";
import { CoupleSpotlight } from "@/entities/invitation/ui/CoupleSpotlight";
import { Timeline } from "@/widgets/timeline";
import { GalleryGrid } from "@/widgets/gallery";
import { EventInfo } from "@/entities/invitation/ui/EventInfo";
import { VenueMap } from "@/entities/invitation/ui/VenueMap";
import { GiftRegistry } from "@/entities/invitation/ui/GiftRegistry";
import {
  GuestbookList,
  GuestMessage,
} from "@/entities/invitation/ui/GuestbookList";
import { RsvpForm } from "@/features/submit-rsvp/ui/RsvpForm";
import { GuestbookForm } from "@/features/write-guestbook/ui/GuestbookForm";
import { FadeIn } from "@/shared/ui/FadeIn";
import { SectionHeading } from "@/entities/invitation/ui/SectionHeading";
import { useCountdown } from "@/shared/lib/hooks";
import { WeddingData } from "@/entities/invitation/model/types";
import { WeddingNavigation } from "@/entities/invitation/ui/WeddingNavigation";
import { API_URL } from "@/shared/lib/config";
import { formatTimeAgo } from "@/shared/lib/utils/date";

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
  const [playing, setPlaying] = useState(false);
  const [messages, setMessages] = useState<GuestMessage[]>([]);
  // Mặc định mở phong bì cho giao diện minimal để có thể scroll do chưa có component Envelope
  const [envelopeOpen, setEnvelopeOpen] = useState(true);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const targetTime = new Date(weddingData.weddingDate).getTime();
  const countdown = useCountdown(targetTime);

  useEffect(() => {
    if (previewMode) {
      setEnvelopeOpen(previewMode === "invitation");
    }
  }, [previewMode]);

  useEffect(() => {
    fetch(`${API_URL}/api/weddings/${weddingData.slug}/guestbook`)
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
  }, [weddingData.slug]);

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

  const handleSendMessage = async (name: string, msg: string) => {
    try {
      const response = await fetch(
        `${API_URL}/api/weddings/${weddingData.slug}/guestbook`,
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
      } else {
        alert(data.message || "Gửi lời chúc thất bại!");
      }
    } catch (err) {
      console.error(err);
      alert("Đã xảy ra lỗi khi gửi lời chúc!");
    }
  };

  const primaryEvent =
    weddingData.events.find(
      (ev) =>
        ev.title.toUpperCase().includes("TIỆC") ||
        ev.title.toUpperCase().includes("HÔN LỄ"),
    ) || weddingData.events[0];

  const formattedWeddingDateLabel = () => {
    try {
      const d = new Date(weddingData.weddingDate);
      const daysOfWeek = [
        "Chủ Nhật",
        "Thứ Hai",
        "Thứ Ba",
        "Thứ Tư",
        "Thứ Năm",
        "Thứ Sáu",
        "Thứ Bảy",
      ];
      const dayName = daysOfWeek[d.getDay()];
      const day = String(d.getDate()).padStart(2, "0");
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const year = d.getFullYear();
      return `${dayName}, ngày ${day} tháng ${month} năm ${year} · ${weddingData.weddingTime || "18:00"}`;
    } catch {
      return weddingData.weddingDate;
    }
  };

  return (
    <div className="w-full h-screen text-center relative font-sans bg-[rgb(0,26,8)] text-[rgb(225,188,124)]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <p>THE WEDDING OF</p>
        <div className="flex items-center justify-center gap-2 mt-2">
          <h3 style={{ fontFamily: "'The Nautigal', cursive", fontSize: "4rem", lineHeight: 1 }}>Trung hiếu</h3> 
          <span className="text-2xl">&amp;</span>
          <h3 style={{ fontFamily: "'The Nautigal', cursive", fontSize: "4rem", lineHeight: 1 }}>Như ý</h3>
        </div>
      </div>
    </div>
  );
}
