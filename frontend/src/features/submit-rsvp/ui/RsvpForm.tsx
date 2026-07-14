import { useState, useEffect } from "react";
import { Send, Heart } from "lucide-react";
import { FadeIn } from "@/shared/ui/FadeIn";
import { SectionHeading } from "@/entities/invitation/ui/SectionHeading";
import { API_URL } from "@/shared/lib/config";

interface RsvpFormProps {
  weddingSlug: string;
  prefilledName?: string;
  theme?: "default" | "minimal";
  hideMessage?: boolean;
}

export function RsvpForm({
  weddingSlug,
  prefilledName,
  theme = "default",
  hideMessage = false,
}: RsvpFormProps) {
  const [rsvpData, setRsvpData] = useState({
    name: prefilledName || "",
    attend: "yes",
    guests: "1",
    message: "",
  });
  const [rsvpSent, setRsvpSent] = useState(false);

  useEffect(() => {
    if (prefilledName) {
      setRsvpData((prev) => ({ ...prev, name: prefilledName }));
    }
  }, [prefilledName]);

  async function submitRsvp(e: React.FormEvent) {
    e.preventDefault();
    try {
      const response = await fetch(
        `${API_URL}/api/weddings/${weddingSlug}/rsvp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: rsvpData.name,
            attend: rsvpData.attend,
            guests:
              rsvpData.attend === "yes"
                ? Number(rsvpData.guests.replace("+", ""))
                : 0,
            message: rsvpData.message,
          }),
        },
      );
      const data = await response.json();
      if (response.ok && data.success) {
        setRsvpSent(true);
      } else {
        alert(data.message || "Gửi xác nhận tham dự thất bại!");
      }
    } catch (err) {
      console.error(err);
      alert("Đã xảy ra lỗi kết nối mạng!");
    }
  }

  const isMinimal = theme === "minimal";

  return (
    <section
      className={`py-10 px-4 max-w-lg mx-auto ${isMinimal ? "" : "py-20"}`}
    >
      {!isMinimal && (
        <FadeIn>
          <SectionHeading en="RSVP" vi="Xác nhận tham dự" />
        </FadeIn>
      )}
      <FadeIn delay={100}>
        {rsvpSent ? (
          <div
            className={
              isMinimal
                ? "rounded-2xl p-8 text-center"
                : "bg-white rounded-2xl p-10 text-center shadow-sm border"
            }
            style={!isMinimal ? { borderColor: "rgba(201,130,142,0.2)" } : {}}
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={
                isMinimal
                  ? { backgroundColor: "rgba(225,188,124,0.1)" }
                  : { backgroundColor: "rgba(139,58,82,0.08)" }
              }
            >
              <Heart
                size={28}
                fill={isMinimal ? "rgb(225,188,124)" : "#8b3a52"}
                stroke={isMinimal ? "rgb(225,188,124)" : "#8b3a52"}
              />
            </div>
            <h3
              className="text-2xl mb-2 font-serif"
              style={{ color: isMinimal ? "rgb(225,188,124)" : "#8b3a52" }}
            >
              Cảm ơn bạn!
            </h3>
            <p
              className="text-sm font-serif"
              style={{ color: isMinimal ? "rgba(225,188,124,0.8)" : "#7a5c4f" }}
            >
              Chúng mình đã nhận được xác nhận của bạn. Hẹn gặp nhau tại tiệc
              cưới! 🎉
            </p>
          </div>
        ) : (
          <form
            onSubmit={submitRsvp}
            className={
              isMinimal
                ? "space-y-6 text-left"
                : "bg-white rounded-2xl p-8 shadow-sm border space-y-5 text-left"
            }
            style={!isMinimal ? { borderColor: "rgba(201,130,142,0.2)" } : {}}
          >
            <div>
              <label
                className="block text-xs uppercase tracking-wider mb-2 font-serif"
                style={{
                  color: isMinimal ? "rgba(225,188,124,0.8)" : "#7a5c4f",
                }}
              >
                Họ và tên *
              </label>
              <input
                required
                value={rsvpData.name}
                onChange={(e) =>
                  setRsvpData({ ...rsvpData, name: e.target.value })
                }
                placeholder="Ví dụ: Nguyễn Văn A"
                className={`w-full px-4 py-3 rounded-xl text-sm outline-none border transition-colors ${isMinimal ? "bg-transparent focus:border-[rgb(225,188,124)]" : ""}`}
                style={
                  isMinimal
                    ? {
                        borderColor: "rgba(225,188,124,0.3)",
                        color: "rgb(225,188,124)",
                      }
                    : {
                        borderColor: "rgba(201,130,142,0.3)",
                        backgroundColor: "#fdf6ef",
                        color: "#2c1810",
                      }
                }
                onFocus={(e) =>
                  (e.target.style.borderColor = isMinimal
                    ? "rgb(225,188,124)"
                    : "#8b3a52")
                }
                onBlur={(e) =>
                  (e.target.style.borderColor = isMinimal
                    ? "rgba(225,188,124,0.3)"
                    : "rgba(201,130,142,0.3)")
                }
              />
            </div>
            <div>
              <label
                className="block text-xs uppercase tracking-wider mb-2 font-serif"
                style={{
                  color: isMinimal ? "rgba(225,188,124,0.8)" : "#7a5c4f",
                }}
              >
                Bạn sẽ tham dự? *
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { val: "yes", label: "🎉 Có, mình sẽ đến" },
                  { val: "no", label: "😢 Rất tiếc, không thể" },
                ].map((opt) => (
                  <button
                    key={opt.val}
                    type="button"
                    onClick={() =>
                      setRsvpData({ ...rsvpData, attend: opt.val })
                    }
                    className="py-3 px-2 rounded-xl text-[13px] border transition-all cursor-pointer font-serif"
                    style={
                      isMinimal
                        ? {
                            borderColor:
                              rsvpData.attend === opt.val
                                ? "rgb(225,188,124)"
                                : "rgba(225,188,124,0.2)",
                            backgroundColor:
                              rsvpData.attend === opt.val
                                ? "rgba(225,188,124,0.1)"
                                : "transparent",
                            color:
                              rsvpData.attend === opt.val
                                ? "rgb(225,188,124)"
                                : "rgba(225,188,124,0.6)",
                          }
                        : {
                            borderColor:
                              rsvpData.attend === opt.val
                                ? "#8b3a52"
                                : "rgba(201,130,142,0.3)",
                            backgroundColor:
                              rsvpData.attend === opt.val
                                ? "rgba(139,58,82,0.06)"
                                : "transparent",
                            color:
                              rsvpData.attend === opt.val
                                ? "#8b3a52"
                                : "#7a5c4f",
                            fontWeight: rsvpData.attend === opt.val ? 500 : 400,
                          }
                    }
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            {rsvpData.attend === "yes" && (
              <div>
                <label
                  className="block text-xs uppercase tracking-wider mb-2 font-serif"
                  style={{
                    color: isMinimal ? "rgba(225,188,124,0.8)" : "#7a5c4f",
                  }}
                >
                  Số người tham dự
                </label>
                <select
                  value={rsvpData.guests}
                  onChange={(e) =>
                    setRsvpData({ ...rsvpData, guests: e.target.value })
                  }
                  className={`w-full px-4 h-[46px] rounded-xl text-sm outline-none border ${isMinimal ? "bg-[rgb(0,26,8)]" : ""}`}
                  style={
                    isMinimal
                      ? {
                          borderColor: "rgba(225,188,124,0.3)",
                          color: "rgb(225,188,124)",
                        }
                      : {
                          borderColor: "rgba(201,130,142,0.3)",
                          backgroundColor: "#fdf6ef",
                          color: "#2c1810",
                        }
                  }
                >
                  {["1", "2", "3", "4", "5+"].map((n) => (
                    <option key={n} value={n}>
                      {n} người
                    </option>
                  ))}
                </select>
              </div>
            )}
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl text-sm font-serif uppercase tracking-widest flex items-center justify-center gap-2 transition-opacity hover:opacity-90 cursor-pointer"
              style={
                isMinimal
                  ? {
                      backgroundColor: "rgb(225,188,124)",
                      color: "rgb(0,26,8)",
                      fontWeight: 600,
                    }
                  : {
                      backgroundColor: "#8b3a52",
                      color: "white",
                      fontWeight: 500,
                    }
              }
            >
              <Send size={15} /> XÁC NHẬN
            </button>
          </form>
        )}
      </FadeIn>
    </section>
  );
}
