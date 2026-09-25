import { useState } from "react";

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

  const handleSubmitRsvp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName.trim()) return;
    setSubmitting(true);
    await onSendMessage(rsvpName, `[Xác nhận: ${rsvpAttend}] ${rsvpMsg}`);
    setSubmitting(false);
    setShowPopup(true);
  };

  return (
    <>
      <div id="SECTION11" className="ladi-section" suppressHydrationWarning>
        <div className="ladi-section-background"></div>
        <div className="ladi-container">
          <div id="BOX87" className="ladi-element"><div className="ladi-box"></div></div>
          <div id="HEADLINE93" className="ladi-element">
            <h3 className="ladi-headline">
              <span>Rất mong có bạn đến chung vui cùng mình!</span>
              <br />
              <span>Xin vui lòng xác nhận sự có mặt của bạn để mình chuẩn bị đón tiếp một cách chu đáo nhất.</span>
              <br />
              <span>Xin cảm ơn!</span>
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

      {/* POPUP Xác nhận thành công */}
      {showPopup && (
        <div
          id="SECTION_POPUP"
          className="ladi-section"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            className="backdrop-popup"
            onClick={() => setShowPopup(false)}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          ></div>
          <div id="POPUP1" className="ladi-element" style={{ position: "relative", zIndex: 1000 }}>
            <div className="ladi-popup">
              <div className="ladi-popup-background"></div>
              <div id="HEADLINE95" className="ladi-element" style={{ position: "static", padding: "20px", textAlign: "center" }}>
                <h3 className="ladi-headline" style={{ color: "#8F323B" }}>
                  <span>Cảm ơn bạn đã dành thời gian phản hồi.</span>
                  <br />
                  <span>Mình vô cùng trân quý sự quan tâm của bạn.</span>
                </h3>
              </div>
              <button
                onClick={() => setShowPopup(false)}
                style={{
                  margin: "10px auto 20px auto",
                  display: "block",
                  padding: "8px 24px",
                  borderRadius: "20px",
                  backgroundColor: "#8F323B",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
