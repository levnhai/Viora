import React from "react";
import { BookOpen, Heart } from "lucide-react";

interface GuestbookTabProps {
  guestbookList: any[];
  getAvatarColor: (name: string) => any;
  getInitials: (name: string) => string;
}

export function GuestbookTab({
  guestbookList,
  getAvatarColor,
  getInitials,
}: GuestbookTabProps) {
  return (
    <>
      {/* PHIÊN BẢN MOBILE (block md:hidden) */}
      <div className="block md:hidden space-y-4 font-sans">
        {guestbookList.length === 0 ? (
          <div className="text-center py-12 text-[#7a5c4f]/60 text-xs italic bg-white rounded-2xl border border-[#c9828e]/15">
            Chưa có lời chúc nào được gửi qua thiệp cưới.
          </div>
        ) : (
          <div className="space-y-3">
            {guestbookList.map((msg: any) => {
              const avatarColor = getAvatarColor(msg.name);
              const initials = getInitials(msg.name);
              return (
                <div
                  key={msg._id}
                  className="p-4 bg-white rounded-2xl border border-stone-100 shadow-2xs flex gap-3 relative animate-fade-in font-sans"
                >
                  {/* Avatar tròn */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold font-mono shrink-0 ${avatarColor.bg}`}
                  >
                    {initials}
                  </div>

                  {/* Nội dung */}
                  <div className="flex-1 min-w-0 pr-6">
                    <h4 className="font-bold text-sm text-[#2c1810] leading-none mb-1">
                      {msg.name}
                    </h4>
                    <p className="text-xs leading-relaxed text-stone-600 mb-2">
                      {msg.message}
                    </p>
                    <span className="text-[10px] text-stone-400 font-mono block">
                      {new Date(msg.createdAt).toLocaleTimeString(
                        "vi-VN",
                        { hour: "2-digit", minute: "2-digit" },
                      )}{" "}
                      {new Date(msg.createdAt).toLocaleDateString(
                        "vi-VN",
                      )}
                    </span>
                  </div>

                  {/* Icon Trái tim màu hồng/đỏ ở góc phải ngoài cùng */}
                  <div className="absolute right-4 top-4 text-red-500">
                    <Heart size={14} />
                  </div>
                </div>
              );
            })}

            {/* Nút Xem tất cả lời chúc ở cuối */}
            <button className="w-full py-3.5 bg-[#db2777] hover:bg-[#be185d] text-white rounded-2xl text-xs font-bold transition-all border-0 shadow-xs cursor-pointer flex items-center justify-center gap-1.5 font-sans mt-6">
              Xem tất cả {guestbookList.length} lời chúc
            </button>
          </div>
        )}
      </div>

      {/* PHIÊN BẢN DESKTOP (hidden md:block) */}
      <div className="hidden md:block bg-white rounded-2xl border border-[#c9828e]/15 p-6 sm:p-8">
        <h2
          className="text-xl font-medium text-[#2c1810] mb-6 border-b border-[#c9828e]/10 pb-4 flex items-center gap-2"
          style={{ fontFamily: "'EB Garamond', serif" }}
        >
          <BookOpen size={20} className="text-[#8b3a52]" /> Lời chúc đã
          nhận
        </h2>

        {guestbookList.length === 0 ? (
          <div className="text-center py-12 text-[#7a5c4f]/60 text-sm">
            Chưa có lời chúc nào được gửi qua thiệp cưới.
          </div>
        ) : (
          <div className="space-y-4">
            {guestbookList.map((msg: any) => (
              <div
                key={msg._id}
                className="p-5 rounded-2xl bg-[#faf5f0]/40 border border-[#c9828e]/10 relative hover:border-[#8b3a52]/30 transition-all animate-fade-in"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-sm text-[#2c1810]">
                    {msg.name}
                  </h4>
                  <span className="text-2xs text-[#7a5c4f]/50 font-mono">
                    {new Date(msg.createdAt).toLocaleString("vi-VN", {
                      dateStyle: "short",
                      timeStyle: "short",
                    })}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-[#7a5c4f] whitespace-pre-wrap">
                  {msg.message}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
