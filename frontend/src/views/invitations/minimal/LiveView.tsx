import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Phone, Mail, X, Music } from "lucide-react";

import { InvitationCover } from "./InvitationCover";
import { MinimalFrame } from "./components/MinimalFrame";
import { MinimalCoupleSpotlight } from "./components/MinimalCoupleSpotlight";
import { MinimalTimeline } from "./components/MinimalTimeline";
import { MinimalEventInfo } from "./components/MinimalEventInfo";
import { MinimalGuestbook } from "./components/MinimalGuestbook";
import { MinimalRegistry } from "./components/MinimalRegistry";
import { MinimalVenueMap } from "./components/MinimalVenueMap";
import { MinimalGallery } from "./components/MinimalGallery";
import { MinimalCountdown } from "./components/MinimalCountdown";
import { FallingLeaves } from "./components/FallingLeaves";
import { GuestMessage } from "@/entities/invitation/ui/GuestbookList";
import { RsvpForm } from "@/features/submit-rsvp/ui/RsvpForm";
import { FadeIn } from "@/shared/ui/FadeIn";
import { useCountdown } from "@/shared/lib/hooks";
import { WeddingData } from "@/entities/invitation/model/types";
import { API_URL } from "@/shared/lib/config";
import { formatTimeAgo, formatVietnameseDate } from "@/shared/lib/utils/date";

import img_1 from "@/shared/assets/image/flower/img_1.png";

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
  console.log({ weddingData, guestName, previewMode });
  const [playing, setPlaying] = useState(false);
  const [messages, setMessages] = useState<GuestMessage[]>([]);
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [rsvpModalOpen, setRsvpModalOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const audioRef = useRef<HTMLAudioElement | null>(null);

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

  const weddingDateLabel = formatVietnameseDate(weddingData.weddingDate, {
    includeWeekday: true,
    time: weddingData.weddingTime,
  });

  return (
    <div className="w-full min-h-screen relative font-sans bg-[rgb(0,26,8)] text-[rgb(225,188,124)] overflow-hidden">
      {/* {isMounted && <FallingLeaves />} */}

      {!envelopeOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[rgba(0,14,6,0.98)]">
          <div className="relative z-10">
            <div className="relative w-[310px] sm:w-[340px] md:w-[520px] lg:w-[600px]">
              {/* Wax Seal */}
              <div
                className="absolute left-1/2 rounded-full flex items-center justify-center animate-seal-pulse"
                style={
                  {
                    top: "50px",
                    width: "56px",
                    height: "56px",
                    transform: "translate(-50%, -50%)",
                    background:
                      "radial-gradient(circle at 30% 30%, #E1BC7C, rgb(195, 158, 94))",
                    "--shadow-color": "rgba(225, 188, 124, 0.5)",
                    zIndex: 30,
                  } as any
                }
              >
                <svg
                  style={{ fill: "#001A08" }}
                  viewBox="0 0 24 24"
                  className="w-7 h-7"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>

              {/* Envelope Body */}
              <div
                className="relative rounded-lg"
                style={{
                  boxShadow:
                    "0 25px 60px -12px rgba(0, 0, 0, 0.45), 0 8px 24px rgba(0, 0, 0, 0.2), 0 0 40px rgba(225, 188, 124, 0.15)",
                }}
              >
                <div
                  className="absolute inset-0 rounded-lg overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(to bottom right, #001A08, #003F1E, #001A08)",
                    border: "1px solid rgba(225, 188, 124, 0.15)",
                    clipPath: "inset(0 round 8px)",
                  }}
                >
                  <img
                    src={img_1.src}
                    alt=""
                    aria-hidden="true"
                    className="absolute pointer-events-none w-[80%] top-0 left-1/2 -translate-x-1/2 -translate-y-[40%] opacity-20"
                  />
                  <img
                    src={img_1.src}
                    alt=""
                    aria-hidden="true"
                    className="absolute pointer-events-none w-[80%] bottom-0 left-1/2 -translate-x-1/2 translate-y-[40%] opacity-20 -scale-y-100"
                  />
                </div>

                <div className="relative z-10 text-center px-6 pt-28 pb-14 md:pt-24 md:pb-8 flex flex-col items-center">
                  <h1
                    className="mb-2 flex flex-col items-center leading-tight text-4xl sm:text-5xl md:text-6xl text-[#E1BC7C]"
                    style={{ fontFamily: "'The Nautigal', cursive" }}
                  >
                    <span className="block w-full text-center">
                      {weddingData?.groomName || "Tên chú rễ"}
                    </span>
                    <span className="block w-full text-center text-2xl leading-none my-2 font-serif">
                      &amp;
                    </span>
                    <span className="block w-full text-center">
                      {weddingData?.brideName || "Tên cô dâu"}
                    </span>
                  </h1>

                  <div className="flex items-center justify-center gap-3 mb-2 w-full max-w-[200px]">
                    <div
                      className="flex-1 h-px"
                      style={{
                        background:
                          "linear-gradient(to right, transparent, #E1BC7C)",
                      }}
                    ></div>
                    <span className="text-[#E1BC7C] opacity-70 text-sm">❦</span>
                    <div
                      className="flex-1 h-px"
                      style={{
                        background:
                          "linear-gradient(to left, transparent, #E1BC7C)",
                      }}
                    ></div>
                  </div>

                  <div className="text-[18px] mb-5 flex flex-col items-center font-serif text-[rgba(225,188,124,0.75)]">
                    <span>{weddingDateLabel}</span>
                  </div>

                  <div className="mb-8">
                    <p className="text-[18px] font-light font-serif text-[rgba(225,188,124,0.75)]">
                      Thân Mời
                    </p>
                  </div>

                  <button
                    onClick={() => setEnvelopeOpen(true)}
                    className="relative px-8 py-2.5 text-lg font-serif font-semibold rounded-full shadow-lg flex items-center justify-center overflow-hidden transition-transform hover:scale-105 active:scale-95"
                    style={{
                      backgroundColor: "#E1BC7C",
                      color: "#001A08",
                      boxShadow: "0 4px 14px rgba(225, 188, 124, 0.35)",
                    }}
                  >
                    <span>Mở thiệp</span>
                    <div
                      className="absolute top-0 h-full w-8 pointer-events-none animate-shine"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                      }}
                    ></div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative z-10 w-full bg-[rgb(0,26,8)]">
          <div className="max-w-3xl mx-auto min-h-screen relative pb-20">
            <FadeIn>
              <InvitationCover
                weddingData={weddingData}
                guestName={guestName}
              />
            </FadeIn>
            <div className="relative pt-8 pb-12 mt-4 mb-16">
              <MinimalFrame />
              <FadeIn>
                <MinimalCoupleSpotlight weddingData={weddingData} />
              </FadeIn>

              <FadeIn className="flex justify-center my-8">
                <img
                  src={img_1.src}
                  alt="divider"
                  className="w-24 sm:w-32 opacity-40"
                />
              </FadeIn>

              <FadeIn>
                <MinimalEventInfo
                  weddingData={weddingData}
                  onOpenRsvpModal={() => setRsvpModalOpen(true)}
                />
              </FadeIn>

              <FadeIn className="flex justify-center my-8">
                <img
                  src={img_1.src}
                  alt="divider"
                  className="w-24 sm:w-32 opacity-40 -scale-y-100"
                />
              </FadeIn>

              {/* ảnh */}
              <MinimalGallery weddingData={weddingData} />

              {/* đếm ngược */}
              <MinimalCountdown weddingData={weddingData} />

              <FadeIn className="flex justify-center my-2">
                <img
                  src={img_1.src}
                  alt="divider"
                  className="w-24 sm:w-32 opacity-40"
                />
              </FadeIn>

              {/* thông tin tiệc cưới */}
              <FadeIn>
                <MinimalTimeline weddingData={weddingData} />
              </FadeIn>
            </div>

            {/* địa điểm */}
            {primaryEvent && <MinimalVenueMap event={primaryEvent} />}
            {/* lời chúc */}
            <FadeIn>
              <MinimalRegistry weddingData={weddingData} />
            </FadeIn>
            {/* sổ lời chúc */}
            <FadeIn>
              <MinimalGuestbook
                messages={messages}
                guestName={guestName}
                onSendMessage={handleSendMessage}
              />
            </FadeIn>
          </div>

          {/* Nút bật/tắt nhạc */}
          <button
            onClick={() => setPlaying(!playing)}
            className={`fixed bottom-6 right-6 z-50 w-12 h-12 flex items-center justify-center rounded-full transition-all duration-500 ${
              playing
                ? "bg-[rgb(225,188,124)] text-[rgb(0,26,8)] shadow-[0_0_25px_rgba(225,188,124,0.6)] hover:shadow-[0_0_35px_rgba(225,188,124,0.8)]"
                : "bg-white/10 backdrop-blur-md text-[rgb(225,188,124)] border border-[rgb(225,188,124)]/30 hover:bg-white/20"
            } hover:scale-110`}
            aria-label={playing ? "Tắt nhạc" : "Bật nhạc"}
          >
            <div className={playing ? "animate-[spin_4s_linear_infinite]" : ""}>
              {playing ? (
                <Music size={20} />
              ) : (
                <VolumeX size={20} />
              )}
            </div>
            {/* Lấp lánh khi đang phát nhạc */}
            {playing && (
              <div className="absolute inset-0 rounded-full border-2 border-white/40 animate-ping opacity-20"></div>
            )}
          </button>

          {/* Audio Element */}
          <audio ref={audioRef} loop preload="auto">
            <source src={(weddingData as any).musicUrl || "/audio/wedding-song.mp3"} type="audio/mpeg" />
          </audio>

          {/* RSVP Modal */}
          {rsvpModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
              <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={() => setRsvpModalOpen(false)}
              />
              <div className="bg-[rgb(0,26,8)] rounded-3xl w-full max-w-md relative flex flex-col max-h-[90vh] overflow-hidden shadow-2xl border border-[rgb(225,188,124)]/30 animate-in fade-in zoom-in duration-300">
                <div className="p-4 flex justify-between items-center border-b border-[rgb(225,188,124)]/20 shrink-0">
                  <div className="w-8" />
                  <h3 className="text-lg text-[rgb(225,188,124)] font-serif tracking-widest uppercase">
                    Xác Nhận Tham Dự
                  </h3>
                  <button
                    onClick={() => setRsvpModalOpen(false)}
                    className="w-8 h-8 flex items-center justify-center text-[rgb(225,188,124)]/70 hover:text-[rgb(225,188,124)] transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="p-4 sm:p-6 overflow-y-auto custom-scrollbar">
                  <RsvpForm
                    weddingSlug={weddingData.slug}
                    guestName={guestName}
                    theme="minimal"
                    hideMessage
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
