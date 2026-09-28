import { useState } from "react";
import { Check, X, Sparkles, HeartHandshake } from "lucide-react";
import confetti from "canvas-confetti";

interface GraduationRsvpProps {
  guestName?: string;
  onSendMessage: (name: string, message: string) => Promise<any>;
}

export function GraduationRsvp({
  guestName = "",
  onSendMessage,
}: GraduationRsvpProps) {
  const [rsvpName, setRsvpName] = useState(guestName);
  const [rsvpAttend, setRsvpAttend] = useState("Tôi chắc chắn sẽ đến");
  const [rsvpMsg, setRsvpMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.6 },
        colors: ["#8F323B", "#D5B064", "#E5C384", "#B87333", "#FFE7ED"],
      });
    } catch (_) {}
  };

  const handleSubmitRsvp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName.trim()) return;
    setSubmitting(true);
    await onSendMessage(rsvpName, `[Xác nhận: ${rsvpAttend}] ${rsvpMsg}`);
    setSubmitting(false);
    setShowPopup(true);
    triggerConfetti();
    setRsvpName("");
    setRsvpMsg("");
    setRsvpAttend("Tôi chắc chắn sẽ đến");
  };

  return (
    <>
      <div id="SECTION11" className="ladi-section" suppressHydrationWarning>
        <div className="ladi-section-background"></div>
        <div className="ladi-container">
          <div id="BOX87" className="ladi-element"><div className="ladi-box"></div></div>
          <div id="HEADLINE93" className="ladi-element">
            <h3 className="ladi-headline">
              <span>Rất mong mọi người đến chung vui cùng mình nha!</span>
              <br />
              <span>Xin vui lòng xác nhận sự có mặt của bạn để mình chuẩn bị đón tiếp một cách chu đáo nhất.</span>
              <br />
              <span>Cảm ơn mọi người rất nhiều❤️</span>
            </h3>
          </div>

          <div id="FORM4" className="ladi-element">
            <form onSubmit={handleSubmitRsvp} className="ladi-form">
              <div
                id="BUTTON5"
                className="ladi-element"
                onClick={() => {
                  const form = document.querySelector('.ladi-form') as HTMLFormElement;
                  if (form) form.requestSubmit();
                }}
              >
                <div className="ladi-button">
                  <div className="ladi-button-background"></div>
                  <div id="BUTTON_TEXT5" className="ladi-element ladi-button-headline">
                    <p className="ladi-headline">{submitting ? "ĐANG GỬI..." : "XÁC NHẬN"}</p>
                  </div>
                </div>
              </div>

              {/* Tên khách mời */}
              <div id="FORM_ITEM13" className="ladi-element">
                <div className="ladi-form-item-container">
                  <div className="ladi-form-item-background"></div>
                  <div className="ladi-form-item">
                    <input
                      name="name"
                      required
                      className="ladi-form-control"
                      type="text"
                      placeholder="Tên của bạn"
                      value={rsvpName}
                      onChange={(e) => setRsvpName(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Lời chúc */}
              <div id="FORM_ITEM14" className="ladi-element">
                <div className="ladi-form-item-container">
                  <div className="ladi-form-item-background"></div>
                  <div className="ladi-form-item">
                    <textarea
                      name="message"
                      className="ladi-form-control"
                      placeholder="Gửi lời chúc đến tân cử nhân"
                      value={rsvpMsg}
                      onChange={(e) => setRsvpMsg(e.target.value)}
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Bạn sẽ đến chứ? */}
              <div id="FORM_ITEM15" className="ladi-element">
                <div className="ladi-form-item-container">
                  <div className="ladi-form-item-background"></div>
                  <div className="ladi-form-item">
                    <select
                      name="form_item10"
                      className="ladi-form-control ladi-form-control-select"
                      value={rsvpAttend}
                      onChange={(e) => setRsvpAttend(e.target.value)}
                    >
                      <option value="Tôi chắc chắn sẽ đến">Tôi chắc chắn sẽ đến</option>
                      <option value="Xin lỗi tôi bận rồi">Xin lỗi tôi bận rồi</option>
                    </select>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* POPUP XÁC NHẬN SỰ KIỆN - SANG TRỌNG, ĐẲNG CẤP, CÔ LẬP HOÀN TOÀN */}
      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            backgroundColor: "rgba(18, 12, 14, 0.75)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
          onClick={() => setShowPopup(false)}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "380px",
              backgroundColor: "#FFFDF9",
              borderRadius: "28px",
              padding: "36px 24px 28px 24px",
              textAlign: "center",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(213, 176, 100, 0.3)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
              margin: "auto",
              maxHeight: "90vh",
              overflowY: "auto",
              boxSizing: "border-box",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Viền đôi mạ vàng lồng bên trong */}
            <div
              style={{
                position: "absolute",
                top: "10px",
                left: "10px",
                right: "10px",
                bottom: "10px",
                border: "1px dashed rgba(213, 176, 100, 0.5)",
                borderRadius: "20px",
                pointerEvents: "none",
              }}
            />

            {/* Nút đóng X sang trọng */}
            <button
              type="button"
              onClick={() => setShowPopup(false)}
              aria-label="Đóng"
              style={{
                position: "absolute",
                top: "14px",
                right: "14px",
                zIndex: 30,
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                border: "1px solid rgba(143, 50, 59, 0.15)",
                backgroundColor: "#FFF9F2",
                color: "#8F323B",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <X style={{ width: "18px", height: "18px" }} />
            </button>

            {/* Emblem Wax Seal màu Burgundy & Vàng Hoàng Gia */}
            <div style={{ position: "relative", marginTop: "-6px" }}>
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #A23B45 0%, #6E232B 100%)",
                  border: "2.5px solid #E5C384",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 8px 20px rgba(143, 50, 59, 0.35)",
                }}
              >
                <Check style={{ width: "32px", height: "32px", color: "#FFFFFF", strokeWidth: 3 }} />
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: "-4px",
                  right: "-4px",
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  backgroundColor: "#D5B064",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "2px solid #FFFDF9",
                }}
              >
                <Sparkles style={{ width: "13px", height: "13px", color: "#FFFFFF" }} />
              </div>
            </div>

            {/* Header Tagline */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                width: "100%",
                marginTop: "4px",
              }}
            >
              <div style={{ height: "1px", flex: 1, backgroundColor: "#D5B064", opacity: 0.35 }} />
              <span style={{ color: "#D5B064", fontSize: "11px" }}>✦</span>
              <h3
                style={{
                  color: "#8F323B",
                  fontSize: "12px",
                  fontWeight: "700",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontFamily: "'Hastegi', sans-serif",
                  margin: 0,
                  whiteSpace: "nowrap",
                }}
              >
                GỬI LỜI CHÚC THÀNH CÔNG
              </h3>
              <span style={{ color: "#D5B064", fontSize: "11px" }}>✦</span>
              <div style={{ height: "1px", flex: 1, backgroundColor: "#D5B064", opacity: 0.35 }} />
            </div>

            {/* Cảm ơn bạn! */}
            <h4
              style={{
                color: "#B87333",
                fontSize: "30px",
                fontWeight: "normal",
                fontFamily: "'UVNHoaTay', 'MorginaItalic', cursive",
                margin: "-4px 0 0 0",
                lineHeight: 1.15,
              }}
            >
              Cảm ơn bạn!
            </h4>

            {/* Lời chúc chi tiết */}
            <p
              style={{
                color: "#4A2E35",
                fontSize: "13.5px",
                lineHeight: "1.6",
                fontFamily: "'Hastegi', sans-serif",
                margin: 0,
                textAlign: "center",
                maxWidth: "290px",
              }}
            >
              Sự có mặt và lời chúc ý nghĩa của bạn là niềm vinh hạnh lớn đối với Tân Cử Nhân!
            </p>

            {/* Phân cách trang trí */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", width: "100%", margin: "2px 0" }}>
              <div style={{ height: "1px", width: "40px", backgroundColor: "#D5B064", opacity: 0.4 }} />
              <HeartHandshake style={{ width: "18px", height: "18px", color: "#D5B064" }} />
              <div style={{ height: "1px", width: "40px", backgroundColor: "#D5B064", opacity: 0.4 }} />
            </div>

            {/* Nút Đóng / Đón nhận lời chúc (Pill Button đặt gọn trong Padding, viền vàng gold) */}
            <button
              type="button"
              onClick={() => setShowPopup(false)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                maxWidth: "260px",
                padding: "13px 24px",
                marginTop: "4px",
                background: "linear-gradient(135deg, #8F323B 0%, #6E232B 100%)",
                color: "#FFFFFF",
                borderRadius: "50px",
                border: "1.5px solid #E5C384",
                boxShadow: "0 6px 18px rgba(143, 50, 59, 0.35)",
                fontFamily: "'Hastegi', sans-serif",
                fontSize: "13px",
                fontWeight: "700",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                cursor: "pointer",
                boxSizing: "border-box",
              }}
            >
              Đón Nhận Lời Chúc
            </button>
          </div>
        </div>
      )}
    </>
  );
}
