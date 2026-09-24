import { useState } from "react";
import { WeddingData } from "@/entities/invitation/model/types";

interface GraduationRsvpProps {
  weddingData: WeddingData;
  guestName?: string;
  onSendMessage?: (name: string, message: string) => Promise<void>;
}

export function GraduationRsvp({
  guestName = "",
  onSendMessage,
}: GraduationRsvpProps) {
  const [name, setName] = useState(guestName);
  const [attendance, setAttendance] = useState("yes");
  const [relationship, setRelationship] = useState("Bạn bè");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Vui lòng nhập tên của bạn");
      return;
    }
    setSubmitting(true);
    try {
      const fullMessage = `[Tham dự: ${
        attendance === "yes" ? "Sẽ đến" : "Rất tiếc không thể đến"
      } - Mối quan hệ: ${relationship}] ${message}`;
      if (onSendMessage) {
        await onSendMessage(name, fullMessage);
      }
      setSubmitted(true);
    } catch {
      alert("Có lỗi xảy ra, vui lòng thử lại sau!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="w-full relative min-h-[384px] bg-[#F8F6F3] flex flex-col items-center pt-8 pb-10 px-5">
      {/* 1. Header Invitation Note */}
      <div className="w-full max-w-[375px] text-center mb-6">
        <p className="text-[14.5px] font-hastegi text-[#9B343D] leading-relaxed tracking-wide">
          Rất mong có bạn đến chung vui cùng mình!
          <br />
          Xin vui lòng xác nhận sự có mặt của bạn để mình chuẩn bị đón tiếp một
          cách chu đáo nhất.
          <br />
          <span className="font-semibold">Xin cảm ơn!</span>
        </p>
      </div>

      {/* 2. RSVP Form Container */}
      <div className="w-full max-w-[355px]">
        {submitted ? (
          <div className="bg-white/80 border border-[#9B343D]/30 rounded-2xl p-6 text-center shadow-sm">
            <h4 className="text-[18px] font-hastegi font-bold text-[#9B343D] mb-1">
              Xác Nhận Thành Công!
            </h4>
            <p className="text-[14px] font-hastegi text-[#9B343D]/80">
              Cảm ơn {name} đã phản hồi lời mời tốt nghiệp. Hẹn gặp lại bạn nhé!
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 font-hastegi text-[#9B343D]"
          >
            {/* Tên khách mời */}
            <div>
              <input
                type="text"
                placeholder="Tên của bạn"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full h-10 px-4 rounded-xl bg-white border border-[#9B343D]/30 focus:border-[#9B343D] outline-none text-[14px] placeholder-[#9B343D]/50 shadow-inner"
              />
            </div>

            {/* Mối quan hệ */}
            <div className="grid grid-cols-2 gap-2">
              <select
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-white border border-[#9B343D]/30 focus:border-[#9B343D] outline-none text-[13.5px] text-[#9B343D] shadow-inner"
              >
                <option value="Bạn bè">Bạn bè</option>
                <option value="Người thân / Gia đình">Người thân / Gia đình</option>
                <option value="Thầy cô">Thầy cô</option>
                <option value="Đồng nghiệp">Đồng nghiệp</option>
              </select>

              <select
                value={attendance}
                onChange={(e) => setAttendance(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-white border border-[#9B343D]/30 focus:border-[#9B343D] outline-none text-[13.5px] text-[#9B343D] shadow-inner"
              >
                <option value="yes">Mình sẽ tham gia</option>
                <option value="no">Tiếc quá, mình bận</option>
              </select>
            </div>

            {/* Lời chúc */}
            <div>
              <textarea
                placeholder="Gửi lời chúc đến tân cử nhân..."
                rows={2}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-3 rounded-xl bg-white border border-[#9B343D]/30 focus:border-[#9B343D] outline-none text-[14px] placeholder-[#9B343D]/50 shadow-inner resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full h-[44px] rounded-[22px] bg-[#9B343D]/90 hover:bg-[#9B343D] text-white font-hastegi font-bold text-[17px] uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center justify-center mt-1"
            >
              {submitting ? "Đang gửi..." : "XÁC NHẬN"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
