import React from "react";
import {
  Search,
  Plus,
  Phone,
  Tag,
  Copy,
  Check,
  Trash2,
  X,
  Users,
  UserPlus,
  Loader2,
  MoreHorizontal,
} from "lucide-react";

interface GuestsTabProps {
  guestList: any[];
  filteredGuestList: any[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterRsvp: "all" | "confirmed" | "pending";
  setFilterRsvp: (filter: "all" | "confirmed" | "pending") => void;
  totalGuests: number;
  confirmedGuests: number;
  pendingGuests: number;
  declinedGuests: number;
  copiedId: string | null;
  handleCopyLink: (name: string, id: string) => void;
  activeActionMenuId: string | null;
  setActiveActionMenuId: (id: string | null) => void;
  handleUpdateGuestStatus: (id: string, status: string) => void;
  handleDeleteGuest: (id: string) => void;
  isAddModalOpen: boolean;
  setIsAddModalOpen: (open: boolean) => void;
  newGuest: any;
  setNewGuest: (guest: any) => void;
  handleAddGuest: (e: React.FormEvent) => void;
  guestSubmitting: boolean;
  getAvatarColor: (name: string) => any;
  getInitials: (name: string) => string;
  weddingSlug: string | null;
}

export function GuestsTab({
  guestList,
  filteredGuestList,
  searchQuery,
  setSearchQuery,
  filterRsvp,
  setFilterRsvp,
  totalGuests,
  confirmedGuests,
  pendingGuests,
  declinedGuests,
  copiedId,
  handleCopyLink,
  activeActionMenuId,
  setActiveActionMenuId,
  handleUpdateGuestStatus,
  handleDeleteGuest,
  isAddModalOpen,
  setIsAddModalOpen,
  newGuest,
  setNewGuest,
  handleAddGuest,
  guestSubmitting,
  getAvatarColor,
  getInitials,
  weddingSlug,
}: GuestsTabProps) {
  return (
    <div className="space-y-6">
      {/* Nội dung danh sách khách mời */}
      <div className="space-y-6 animate-fade-in">
        {/* Mobile Search Bar */}
        <div className="block md:hidden mb-2">
          <div className="relative w-full shadow-3xs rounded-[1.25rem] bg-white border border-stone-100 transition-all focus-within:border-pink-200 focus-within:shadow-pink-100">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm khách mời..."
              className="w-full pl-11 pr-4 py-3.5 bg-transparent border-0 rounded-[1.25rem] text-xs font-medium outline-none placeholder:text-stone-400 text-stone-800"
            />
          </div>
        </div>

        {/* Mobile Segmented Tabs */}
        <div className="flex md:hidden bg-stone-100/60 p-1.5 rounded-[1rem] mb-6 font-sans overflow-x-auto hide-scrollbar snap-x">
          <button
            onClick={() => setFilterRsvp("all")}
            className={`flex-1 min-w-max text-center py-2.5 px-3 text-[11px] font-bold rounded-[0.75rem] transition-all cursor-pointer whitespace-nowrap snap-start border-0 ${
              filterRsvp === "all"
                ? "bg-white text-[#db2777] shadow-sm"
                : "text-stone-500 hover:text-stone-700 bg-transparent"
            }`}
          >
            Tất cả ({totalGuests})
          </button>
          <button
            onClick={() => setFilterRsvp("confirmed")}
            className={`flex-1 min-w-max text-center py-2.5 px-3 text-[11px] font-bold rounded-[0.75rem] transition-all cursor-pointer whitespace-nowrap snap-start border-0 ${
              filterRsvp === "confirmed"
                ? "bg-white text-green-600 shadow-sm"
                : "text-stone-500 hover:text-stone-700 bg-transparent"
            }`}
          >
            Xác nhận ({confirmedGuests})
          </button>
          <button
            onClick={() => setFilterRsvp("pending")}
            className={`flex-1 min-w-max text-center py-2.5 px-3 text-[11px] font-bold rounded-[0.75rem] transition-all cursor-pointer whitespace-nowrap snap-start border-0 ${
              filterRsvp === "pending"
                ? "bg-white text-orange-500 shadow-sm"
                : "text-stone-500 hover:text-stone-700 bg-transparent"
            }`}
          >
            Chờ KQ ({pendingGuests + declinedGuests})
          </button>
        </div>

        {/* Desktop Filter Bar */}
        <div className="hidden md:flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 bg-white p-4 rounded-xl border border-[#c9828e]/15">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#7a5c4f]/50" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo tên hoặc số điện thoại..."
              className="w-full pl-9 pr-4 py-2.5 border border-[#c9828e]/20 rounded-xl text-xs outline-none focus:border-[#8b3a52] text-[#2c1810]"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <select
              value={filterRsvp}
              onChange={(e: any) => setFilterRsvp(e.target.value)}
              className="px-3 py-2 border border-[#c9828e]/20 rounded-xl text-xs outline-none focus:border-[#8b3a52] bg-white text-[#2c1810] cursor-pointer font-medium"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="confirmed">Đã xác nhận</option>
              <option value="pending">Chưa xác nhận</option>
            </select>
          </div>
        </div>

        {/* Statistics Boxes (3 columns) */}
        <div className="grid grid-cols-3 gap-2.5 sm:gap-4 mb-6">
          <div className="bg-white p-3 sm:p-4 rounded-[1.25rem] border border-stone-100 flex flex-col justify-between shadow-3xs relative overflow-hidden">
            <div className="absolute top-0 right-0 w-12 h-12 bg-blue-50/80 rounded-full blur-xl -z-10"></div>
            <span className="text-[9px] sm:text-[11px] font-extrabold text-stone-400 tracking-wide uppercase">
              Tổng số
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-stone-800 mt-1.5 font-mono leading-none">
              {totalGuests}
            </h3>
          </div>
          <div className="bg-white p-3 sm:p-4 rounded-[1.25rem] border border-stone-100 flex flex-col justify-between shadow-3xs relative overflow-hidden">
            <div className="absolute top-0 right-0 w-12 h-12 bg-green-50/80 rounded-full blur-xl -z-10"></div>
            <span className="text-[9px] sm:text-[11px] font-extrabold text-stone-400 tracking-wide uppercase">
              Xác nhận
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-green-600 mt-1.5 font-mono leading-none">
              {confirmedGuests}
            </h3>
          </div>
          <div className="bg-white p-3 sm:p-4 rounded-[1.25rem] border border-stone-100 flex flex-col justify-between shadow-3xs relative overflow-hidden">
            <div className="absolute top-0 right-0 w-12 h-12 bg-orange-50/80 rounded-full blur-xl -z-10"></div>
            <span className="text-[9px] sm:text-[11px] font-extrabold text-stone-400 tracking-wide uppercase">
              Chờ KQ
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-orange-500 mt-1.5 font-mono leading-none">
              {pendingGuests + declinedGuests}
            </h3>
          </div>
        </div>

        {/* Mobile List View */}
        <div className="block md:hidden space-y-3">
          {filteredGuestList.map((g) => {
            const avatarColor = getAvatarColor(g.name);
            const initials = getInitials(g.name);
            return (
              <div
                key={g._id}
                className="bg-white rounded-[1.25rem] border border-stone-100/80 p-4 shadow-3xs hover:shadow-md transition-shadow relative flex flex-col gap-3 font-sans animate-fade-in"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-11 h-11 rounded-full flex items-center justify-center text-sm font-black font-mono shrink-0 shadow-sm border border-white ${avatarColor.bg}`}
                    >
                      {initials}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-[15px] text-stone-900 leading-tight">
                        {g.name}
                      </h4>
                      <div className="inline-block bg-stone-50 px-2 py-0.5 rounded border border-stone-100 mt-1.5">
                        <p className="text-[9px] text-stone-500 font-bold uppercase tracking-wider">
                          {g.relationship}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Nút 3 chấm action */}
                  <div className="relative">
                    <button
                      onClick={() =>
                        setActiveActionMenuId(
                          activeActionMenuId === g._id ? null : g._id,
                        )
                      }
                      className="p-1 hover:bg-stone-50 rounded-full border-0 bg-transparent text-stone-400 cursor-pointer"
                    >
                      <MoreHorizontal size={20} />
                    </button>

                    {activeActionMenuId === g._id && (
                      <>
                        <div
                          className="fixed inset-0 z-40"
                          onClick={() => setActiveActionMenuId(null)}
                        />
                        <div className="absolute right-0 mt-1 w-44 bg-white border border-stone-100 rounded-2xl shadow-xl py-2 z-50 text-xs font-medium text-stone-700 animate-fade-in overflow-hidden">
                          <button
                            onClick={() => {
                              handleCopyLink(g.name, g._id);
                              setActiveActionMenuId(null);
                            }}
                            className="w-full text-left px-4 py-2.5 hover:bg-stone-50 border-0 bg-transparent text-stone-700 cursor-pointer flex items-center gap-2"
                          >
                            <Copy size={14} className="text-stone-400" /> Copy
                            link mời
                          </button>

                          {g.rsvpStatus !== "confirmed" && (
                            <button
                              onClick={() => {
                                handleUpdateGuestStatus(g._id, "confirmed");
                                setActiveActionMenuId(null);
                              }}
                              className="w-full text-left px-4 py-2.5 hover:bg-green-50 border-0 bg-transparent text-green-600 cursor-pointer flex items-center gap-2 font-semibold"
                            >
                              <Check size={14} /> Xác nhận đi
                            </button>
                          )}

                          {g.rsvpStatus !== "declined" && (
                            <button
                              onClick={() => {
                                handleUpdateGuestStatus(g._id, "declined");
                                setActiveActionMenuId(null);
                              }}
                              className="w-full text-left px-4 py-2.5 hover:bg-red-50 border-0 bg-transparent text-red-500 cursor-pointer flex items-center gap-2 font-semibold"
                            >
                              <X size={14} /> Bận / Từ chối
                            </button>
                          )}

                          <div className="h-px bg-stone-100 my-1 mx-2" />
                          <button
                            onClick={() => {
                              handleDeleteGuest(g._id);
                              setActiveActionMenuId(null);
                            }}
                            className="w-full text-left px-4 py-2.5 hover:bg-red-50 border-0 bg-transparent text-red-600 cursor-pointer flex items-center gap-2 font-bold"
                          >
                            <Trash2 size={14} /> Xóa khách
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Phần chân dòng */}
                <div className="flex justify-between items-center mt-1 border-t border-stone-50/80">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5">
                      <Phone size={11} className="text-stone-400" />
                      <span className="text-[10px] text-stone-600 font-mono font-medium">
                        {g.phone || "Không có SĐT"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users size={11} className="text-stone-400" />
                      <span className="text-[10px] text-stone-600 font-medium">
                        Đi cùng:{" "}
                        <span className="font-bold">{g.guests || 1}</span>
                      </span>
                    </div>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-3 py-1.5 rounded-lg ${
                      g.rsvpStatus === "confirmed"
                        ? "bg-green-50/80 text-green-700 border border-green-100 shadow-3xs"
                        : g.rsvpStatus === "declined"
                          ? "bg-red-50/80 text-red-600 border border-red-100 shadow-3xs"
                          : "bg-orange-50/80 text-orange-600 border border-orange-100 shadow-3xs"
                    }`}
                  >
                    {g.rsvpStatus === "confirmed"
                      ? "Đã xác nhận"
                      : g.rsvpStatus === "declined"
                        ? "Từ chối"
                        : "Chưa phản hồi"}
                  </span>
                </div>
              </div>
            );
          })}

          {filteredGuestList.length === 0 && (
            <div className="text-center py-12 text-stone-400 italic text-xs bg-white rounded-2xl border border-stone-100">
              Không tìm thấy khách mời phù hợp.
            </div>
          )}

          {/* Spacer to push content above fixed bottom button */}
          <div className="h-16" />

          {/* Nút bấm nổi Red/Pink dưới đáy trên mobile */}
          <div className="fixed bottom-20 left-4 right-4 z-40">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="w-full py-4 bg-[#db2777] text-white hover:bg-[#be185d] border-0 rounded-2xl text-xs font-bold transition-all shadow-md shadow-pink-900/20 active:scale-98 cursor-pointer flex items-center justify-center gap-1.5 font-sans"
            >
              <Plus size={16} /> Thêm khách mới
            </button>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block bg-white rounded-2xl border border-[#c9828e]/15 overflow-hidden shadow-2xs">
          <div className="px-6 py-4 border-b border-[#c9828e]/10 flex items-center justify-between">
            <h2
              className="text-lg font-medium text-[#2c1810]"
              style={{ fontFamily: "'EB Garamond', serif" }}
            >
              Danh sách khách mời đã lập
            </h2>
            <span className="text-xs text-[#7a5c4f]/70 italic">
              Link mời riêng biệt từng người
            </span>
          </div>

          {filteredGuestList.length === 0 ? (
            <div className="text-center py-12 text-[#7a5c4f]/60 text-sm">
              Danh sách đang trống hoặc không khớp với bộ lọc.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#faf5f0] border-b border-[#c9828e]/10 text-[10px] uppercase tracking-wider text-[#7a5c4f] font-semibold">
                    <th className="px-6 py-3">Khách mời</th>
                    <th className="px-6 py-3">
                      <Phone size={11} className="inline mr-1" />
                      Số điện thoại
                    </th>
                    <th className="px-6 py-3">
                      <Tag size={11} className="inline mr-1" />
                      Nhóm
                    </th>
                    <th className="px-6 py-3 text-center">Trạng thái RSVP</th>
                    <th className="px-6 py-3">Link gửi thiệp mời</th>
                    <th className="px-6 py-3 text-center">Hành động</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#c9828e]/10 text-sm text-[#2c1810]">
                  {filteredGuestList.map((g) => {
                    const avatarColor = getAvatarColor(g.name);
                    const initials = getInitials(g.name);
                    return (
                      <tr
                        key={g._id}
                        className="hover:bg-[#faf5f0]/30 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-2xs font-bold font-mono ${avatarColor.bg}`}
                            >
                              {initials}
                            </div>
                            <span className="font-semibold">{g.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-xs font-mono">
                          {g.phone || "—"}
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-block px-2 py-0.5 rounded-md text-[10px] bg-[#faf5f0] text-[#7a5c4f] border border-[#c9828e]/15 font-medium">
                            {g.relationship}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <select
                            value={g.rsvpStatus}
                            onChange={(e) =>
                              handleUpdateGuestStatus(g._id, e.target.value)
                            }
                            className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border outline-none cursor-pointer ${
                              g.rsvpStatus === "confirmed"
                                ? "bg-green-50 text-green-700 border-green-200"
                                : g.rsvpStatus === "declined"
                                  ? "bg-red-50 text-red-700 border-red-200"
                                  : "bg-orange-50 text-orange-600 border-orange-200"
                            }`}
                          >
                            <option value="pending">Chưa phản hồi</option>
                            <option value="confirmed">Đồng ý</option>
                            <option value="declined">Từ chối</option>
                          </select>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleCopyLink(g.name, g._id)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-2xs bg-[#8b3a52]/5 text-[#8b3a52] hover:bg-[#8b3a52]/10 transition-colors border-0 cursor-pointer font-medium font-sans font-semibold"
                          >
                            {copiedId === g._id ? (
                              <>
                                <Check size={11} className="text-green-600" />
                                <span className="text-green-600">Đã copy!</span>
                              </>
                            ) : (
                              <>
                                <Copy size={11} />
                                <span>Copy link mời</span>
                              </>
                            )}
                          </button>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() => handleDeleteGuest(g._id)}
                            className="p-1 text-stone-400 hover:text-red-600 bg-transparent border-0 cursor-pointer rounded-lg hover:bg-stone-50 transition-colors"
                            title="Xóa khách mời"
                          >
                            <Trash2 size={15} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal Popup Thêm Khách Mới (Dùng chung cho cả Desktop và Mobile) */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-2xs z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0"
            onClick={() => setIsAddModalOpen(false)}
          />
          <div className="bg-white w-full max-w-sm rounded-[2.5rem] p-6 shadow-2xl relative z-10 border border-stone-100 animate-fade-in font-sans">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute right-5 top-5 p-1.5 text-stone-400 hover:bg-stone-50 rounded-full border-0 bg-transparent cursor-pointer flex items-center justify-center"
            >
              <X size={20} />
            </button>

            <h3
              className="text-lg font-bold text-[#2c1810] mb-4 flex items-center gap-2"
              style={{ fontFamily: "'EB Garamond', serif" }}
            >
              <UserPlus size={20} className="text-[#8b3a52]" /> Thêm khách mời
              mới
            </h3>

            <form
              onSubmit={(e) => {
                handleAddGuest(e);
                const submitter = (e.nativeEvent as any)
                  .submitter as HTMLButtonElement;
                if (submitter && submitter.name === "keepOpen") {
                  // Keep modal open for adding more
                } else {
                  setIsAddModalOpen(false);
                }
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-semibold text-[#7a5c4f] mb-1">
                  Danh sách họ và tên *
                </label>
                <p className="text-[10px] text-stone-500 mb-2 font-medium">
                  Mỗi khách mời nằm trên một dòng riêng biệt.
                </p>
                <textarea
                  required
                  rows={6}
                  value={newGuest.name}
                  onChange={(e) =>
                    setNewGuest({
                      ...newGuest,
                      name: e.target.value,
                    })
                  }
                  placeholder={`Anh Tuấn\nChị Hương\nHoàng Minh Đức`}
                  className="w-full px-3.5 py-3 rounded-xl text-xs border border-stone-200 outline-none focus:border-[#8b3a52] text-[#2c1810] resize-none leading-relaxed"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold border border-stone-200 text-stone-700 bg-white hover:bg-stone-50 cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  name="close"
                  value="true"
                  disabled={guestSubmitting}
                  className="flex-1 py-2.5 bg-[#8b3a52] text-white rounded-xl text-xs font-bold hover:opacity-90 disabled:opacity-50 cursor-pointer border-0 flex items-center justify-center gap-1.5"
                >
                  {guestSubmitting ? (
                    <Loader2 className="w-4.5 h-4.5 animate-spin" />
                  ) : (
                    "Xác nhận thêm"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
