import React, { useState } from "react";
import { BookOpen, Trash2 } from "lucide-react";
import { ConfirmModal } from "@/shared/ui/ConfirmModal";

interface GuestbookTabProps {
  guestbookList: any[];
  getAvatarColor: (name: string) => any;
  getInitials: (name: string) => string;
  onDeleteGuestbook?: (id: string) => void;
}

export function GuestbookTab({
  guestbookList,
  getAvatarColor,
  getInitials,
  onDeleteGuestbook,
}: GuestbookTabProps) {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const handleConfirmDelete = async () => {
    if (!deleteId || !onDeleteGuestbook) return;
    setDeleting(true);
    try {
      await onDeleteGuestbook(deleteId);
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  };
  return (
    <>
      {/* PHIÊN BẢN MOBILE (block md:hidden) */}
      <div className="block md:hidden space-y-3 font-sans">
        {guestbookList.length === 0 ? (
          <div className="text-center py-12 text-[#475569]/60 text-xs italic bg-white rounded-2xl border border-[#e2e8f0]/15">
            Chưa có lời chúc nào được gửi qua thiệp cưới.
          </div>
        ) : (
          <div className="space-y-2.5">
            {guestbookList.map((msg: any) => {
              const avatarColor = getAvatarColor(msg.name);
              const initials = getInitials(msg.name);
              return (
                <div
                  key={msg._id}
                  className="p-3.5 bg-white rounded-2xl border border-stone-100 shadow-3xs flex items-center gap-3 relative animate-fade-in font-sans"
                >
                  {/* Avatar tròn */}
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold font-mono shrink-0 shadow-xs border border-white ${avatarColor.bg}`}
                  >
                    {initials}
                  </div>

                  {/* Nội dung */}
                  <div className="flex-1 min-w-0 pr-1">
                    <h4 className="font-bold text-[13px] text-stone-800 leading-tight mb-1 truncate">
                      {msg.name}
                    </h4>
                    <p className="text-xs leading-relaxed text-stone-600 mb-1">
                      {msg.message}
                    </p>
                    <span className="text-[9.5px] text-stone-400 font-mono block">
                      {new Date(msg.createdAt).toLocaleTimeString(
                        "vi-VN",
                        { hour: "2-digit", minute: "2-digit" },
                      )}{" "}
                      {new Date(msg.createdAt).toLocaleDateString(
                        "vi-VN",
                      )}
                    </span>
                  </div>

                  {/* Nút Xóa căn giữa theo chiều dọc của thẻ */}
                  <button
                    onClick={() => setDeleteId(msg._id)}
                    className="w-8 h-8 flex items-center justify-center text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-full border-0 bg-transparent cursor-pointer transition-colors shrink-0"
                    title="Xóa lời chúc"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* PHIÊN BẢN DESKTOP (hidden md:block) */}
      <div className="hidden md:block bg-white rounded-2xl border border-[#e2e8f0]/15 p-6 sm:p-8">
        <h2
          className="text-xl font-medium text-[#1e293b] mb-6 border-b border-[#e2e8f0]/10 pb-4 flex items-center gap-2"
          style={{ fontFamily: "'EB Garamond', serif" }}
        >
          <BookOpen size={20} className="text-[#1b365d]" /> Lời chúc đã
          nhận
        </h2>

        {guestbookList.length === 0 ? (
          <div className="text-center py-12 text-[#475569]/60 text-sm">
            Chưa có lời chúc nào được gửi qua thiệp cưới.
          </div>
        ) : (
          <div className="space-y-4">
            {guestbookList.map((msg: any) => {
              const avatarColor = getAvatarColor(msg.name);
              const initials = getInitials(msg.name);
              return (
                <div
                  key={msg._id}
                  className="p-5 rounded-2xl bg-[#f8fafc]/40 border border-[#e2e8f0]/10 relative hover:border-[#1b365d]/30 transition-all animate-fade-in group"
                >
                  <div className="flex justify-between items-start mb-2.5">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold font-mono shrink-0 shadow-xs border border-white ${avatarColor.bg}`}
                      >
                        {initials}
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-[#1e293b]">
                          {msg.name}
                        </h4>
                        <span className="text-[11px] text-[#475569]/50 font-mono">
                          {new Date(msg.createdAt).toLocaleString("vi-VN", {
                            dateStyle: "short",
                            timeStyle: "short",
                          })}
                        </span>
                      </div>
                    </div>
                    {onDeleteGuestbook && (
                      <button
                        onClick={() => setDeleteId(msg._id)}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors border-0 bg-transparent cursor-pointer"
                        title="Xóa lời chúc"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                  <p className="text-sm leading-relaxed text-[#475569] whitespace-pre-wrap pl-12">
                    {msg.message}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal xác nhận xóa lời chúc */}
      <ConfirmModal
        isOpen={Boolean(deleteId)}
        onClose={() => setDeleteId(null)}
        onConfirm={handleConfirmDelete}
        title="Xác nhận xóa lời chúc"
        message="Bạn có chắc chắn muốn xóa lời chúc này khỏi sổ lưu bút không? Hành động này không thể hoàn tác."
        confirmText="Xác nhận xóa"
        cancelText="Hủy"
        type="danger"
        loading={deleting}
      />
    </>
  );
}
