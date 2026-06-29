import { useState } from "react";
import {
  Heart,
  Image as ImageIcon,
  Calendar,
  MapPin,
  Gift,
  FileText,
  Paintbrush,
  Lock,
} from "lucide-react";
import { TEMPLATES } from "@/entities/template/model/templates";
import { WeddingData, WeddingEvent } from "@/entities/invitation/model/types";

interface EditViewProps {
  weddingData: WeddingData;
  updateField: (path: string[], value: any) => void;
}

export function EditView({ weddingData, updateField }: EditViewProps) {
  // Trạng thái đóng mở các phân đoạn accordion
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    design: false,
    basic: true,
    cover: false,
    events: false,
    quote: false,
    gift: false,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const updateEvent = (
    index: number,
    field: keyof WeddingEvent,
    value: string,
  ) => {
    const updatedEvents = [...weddingData.events];
    updatedEvents[index] = { ...updatedEvents[index], [field]: value };
    updateField(["events"], updatedEvents);
  };

  // Lấy danh sách template đã mua từ localStorage
  const purchasedTemplates: number[] = JSON.parse(
    (typeof window !== "undefined"
      ? localStorage.getItem("purchasedTemplates")
      : null) || "[]",
  );

  // Gọi modal mở khóa template
  const triggerUpgradeModal = (tplId: number) => {
    if (typeof window !== "undefined" && (window as any).triggerUpgradeModal) {
      (window as any).triggerUpgradeModal(tplId);
    } else {
      alert(
        "Tính năng này yêu cầu mua template. Vui lòng thanh toán để mở khóa!",
      );
    }
  };

  return (
    <div className="w-full mx-auto px-4 py-8 space-y-6">
      {/* Khối Header nhỏ giới thiệu template đang chỉnh sửa */}
      <div className="bg-[#251b2b]/40 border border-[#7c4d90]/25 rounded-2xl p-4 text-center">
        <h3 className="text-sm font-semibold text-[#ac81bd]">
          Mẫu đang sửa: Tím Oải Hương (Lavender)
        </h3>
        <p className="text-[10px] text-slate-400 mt-1">
          Mẫu thiệp cưới tối giản, sang trọng phong cách độc lập với hiệu ứng
          phong bì sáp và nhạc nền.
        </p>
      </div>

      {/* ACCORDION 0: THIẾT KẾ & CHỌN MẪU */}
      <div className="bg-[#15121c] rounded-xl overflow-hidden shadow-xs border border-transparent hover:border-[#7c4d90]/35 transition-all">
        <div
          onClick={() => toggleSection("design")}
          className="flex items-center justify-between p-4 cursor-pointer hover:bg-[#1a1722] transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-xs text-[#ac81bd] w-3 text-center">
              {openSections.design ? "▼" : "▶"}
            </span>
            <Paintbrush size={14} className="text-[#ac81bd]" />
            <span className="text-sm font-medium text-slate-200">
              Chọn mẫu thiệp cưới
            </span>
          </div>
        </div>

        {openSections.design && (
          <div className="p-5 border-t border-[#7c4d90]/15 space-y-6 bg-[#15121c] text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {TEMPLATES.map((t) => {
                const isLocked =
                  t.price > 0 && !purchasedTemplates.includes(t.id);
                return (
                  <button
                    key={t.id}
                    onClick={() => {
                      if (isLocked) {
                        triggerUpgradeModal(t.id);
                      } else {
                        updateField(["templateId"], t.id);
                      }
                    }}
                    type="button"
                    className={`p-3 rounded-xl border text-left flex flex-col gap-3.5 transition-all cursor-pointer bg-[#15121c] relative overflow-hidden ${
                      weddingData.templateId === t.id
                        ? "border-[#7c4d90] shadow-lg ring-1 ring-[#7c4d90]/40 bg-[#251b2b]/20"
                        : "border-[#2a2533] hover:border-[#7c4d90]/40"
                    }`}
                  >
                    <span
                      className={`absolute top-3 right-3 px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider z-10 ${
                        t.price === 0
                          ? "bg-[#2a2533] text-slate-400"
                          : "bg-amber-600 text-white"
                      }`}
                    >
                      {t.price === 0
                        ? "Miễn phí"
                        : `${t.price.toLocaleString("vi-VN")}đ`}
                    </span>

                    <div className="relative w-full aspect-[4/3] bg-[#050407] rounded-lg overflow-hidden border border-[#2a2533] flex items-center justify-center">
                      <img
                        src={t.preview}
                        alt={t.name}
                        className="w-full h-full object-cover"
                      />
                      {isLocked && (
                        <div className="absolute inset-0 bg-black/55 backdrop-blur-xs flex items-center justify-center text-white">
                          <div className="flex flex-col items-center gap-1.5">
                            <Lock
                              size={14}
                              className="text-white animate-pulse"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between w-full">
                      <div>
                        <p className="text-xs font-semibold text-white">
                          {t.name}
                        </p>
                        <p className="text-[10px] text-slate-400 mt-0.5">
                          {t.style}
                        </p>
                      </div>
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: t.accentColor }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="border-t border-[#2a2533] pt-5 space-y-2">
              <h4 className="text-2xs uppercase tracking-wider text-slate-400 font-bold">
                Đường dẫn thiệp mời (Slug)
              </h4>
              <div className="flex rounded-xl border border-[#2a2533] overflow-hidden bg-[#0e0c12] focus-within:border-[#7c4d90] transition-colors">
                <span className="px-3.5 py-3 text-xs text-slate-500 bg-[#15121c] border-r border-[#2a2533] select-none">
                  thieponline.vn/w/
                </span>
                <input
                  type="text"
                  placeholder="vd: thebao-ngocanh"
                  value={weddingData.slug}
                  onChange={(e) =>
                    updateField(
                      ["slug"],
                      e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""),
                    )
                  }
                  className="flex-1 px-4 py-3 text-xs outline-none bg-transparent text-white"
                />
              </div>
              <p className="text-[10px] text-slate-500 italic">
                Nếu để trống, hệ thống sẽ tự động tạo đường dẫn theo tên hai
                bạn.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ACCORDION 1: THÔNG TIN CÔ DÂU & CHÚ RỂ */}
      <div className="bg-[#15121c] rounded-xl overflow-hidden shadow-xs border border-transparent hover:border-[#7c4d90]/35 transition-all">
        <div
          onClick={() => toggleSection("basic")}
          className="flex items-center justify-between p-4 cursor-pointer hover:bg-[#1a1722] transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-xs text-[#ac81bd] w-3 text-center">
              {openSections.basic ? "▼" : "▶"}
            </span>
            <Heart size={14} className="text-[#ac81bd]" />
            <span className="text-sm font-medium text-slate-200">
              Cô dâu & Chú rể
            </span>
          </div>
        </div>

        {openSections.basic && (
          <div className="p-5 border-t border-[#7c4d90]/15 space-y-5 bg-[#15121c] text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-300">
                  Họ tên Chú rể
                </label>
                <input
                  type="text"
                  required
                  value={weddingData.groomName}
                  onChange={(e) => updateField(["groomName"], e.target.value)}
                  placeholder="VD. Nguyễn Thế Bảo"
                  className="w-full bg-[#0e0c12] border border-[#2a2533] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#ac81bd] transition-colors placeholder:text-slate-600"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-300">
                  Họ tên Cô dâu
                </label>
                <input
                  type="text"
                  required
                  value={weddingData.brideName}
                  onChange={(e) => updateField(["brideName"], e.target.value)}
                  placeholder="VD. Trần Ngọc Ánh"
                  className="w-full bg-[#0e0c12] border border-[#2a2533] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#ac81bd] transition-colors placeholder:text-slate-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-300">
                  Tên ngắn Chú rể
                </label>
                <input
                  type="text"
                  value={weddingData.groomShortName || ""}
                  onChange={(e) =>
                    updateField(["groomShortName"], e.target.value)
                  }
                  placeholder="Thế Bảo"
                  className="w-full bg-[#0e0c12] border border-[#2a2533] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#ac81bd] transition-colors"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-300">
                  Tên ngắn Cô dâu
                </label>
                <input
                  type="text"
                  value={weddingData.brideShortName || ""}
                  onChange={(e) =>
                    updateField(["brideShortName"], e.target.value)
                  }
                  placeholder="Ngọc Ánh"
                  className="w-full bg-[#0e0c12] border border-[#2a2533] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#ac81bd] transition-colors"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ACCORDION 2: LỜI NGỎ LAVENDER (CUSTOM FIELD) */}
      <div className="bg-[#15121c] rounded-xl overflow-hidden shadow-xs border border-transparent hover:border-[#7c4d90]/35 transition-all">
        <div
          onClick={() => toggleSection("quote")}
          className="flex items-center justify-between p-4 cursor-pointer hover:bg-[#1a1722] transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-xs text-[#ac81bd] w-3 text-center">
              {openSections.quote ? "▼" : "▶"}
            </span>
            <FileText size={14} className="text-[#ac81bd]" />
            <span className="text-sm font-medium text-slate-200">
              Lời ngỏ tình yêu
            </span>
          </div>
        </div>

        {openSections.quote && (
          <div className="p-5 border-t border-[#7c4d90]/15 space-y-4 bg-[#15121c] text-left">
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-300">
                Lời ngỏ bìa thiệp (Mặc định hoặc riêng biệt cho Lavender)
              </label>
              <textarea
                rows={4}
                value={weddingData.customFields?.lavenderQuote || ""}
                onChange={(e) =>
                  updateField(["customFields", "lavenderQuote"], e.target.value)
                }
                placeholder="Một tình yêu đẹp bắt đầu từ những điều giản dị nhất, hôm nay chúng mình chính thức về chung một nhà..."
                className="w-full bg-[#0e0c12] border border-[#2a2533] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#ac81bd] transition-colors placeholder:text-slate-600 resize-none font-sans"
              />
            </div>
          </div>
        )}
      </div>

      {/* ACCORDION 3: ẢNH ĐẦU THIỆP (SPOTLIGHT) */}
      <div className="bg-[#15121c] rounded-xl overflow-hidden shadow-xs border border-transparent hover:border-[#7c4d90]/35 transition-all">
        <div
          onClick={() => toggleSection("cover")}
          className="flex items-center justify-between p-4 cursor-pointer hover:bg-[#1a1722] transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-xs text-[#ac81bd] w-3 text-center">
              {openSections.cover ? "▼" : "▶"}
            </span>
            <ImageIcon size={14} className="text-[#ac81bd]" />
            <span className="text-sm font-medium text-slate-200">
              Ảnh bìa kỷ niệm
            </span>
          </div>
        </div>

        {openSections.cover && (
          <div className="p-5 border-t border-[#7c4d90]/15 bg-[#15121c] text-center space-y-4">
            <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-[#0e0c12] space-y-4">
              <div className="relative w-32 aspect-[3/4] bg-[#050407] rounded-lg border border-[#2a2533] flex items-center justify-center overflow-hidden shadow-inner">
                {weddingData.galleryImages?.[0] ? (
                  <img
                    src={weddingData.galleryImages[0]}
                    alt="Cover"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageIcon size={24} className="text-[#2a2533]" />
                )}
              </div>

              <div className="w-full max-w-sm space-y-1.5 text-left">
                <input
                  type="text"
                  value={weddingData.galleryImages?.[0] || ""}
                  onChange={(e) => {
                    const updated = [...(weddingData.galleryImages || [])];
                    updated[0] = e.target.value;
                    updateField(["galleryImages"], updated);
                  }}
                  placeholder="Dán link ảnh bìa thiệp..."
                  className="w-full bg-[#15121c] border border-[#2a2533] rounded-lg px-3 py-2 text-xs text-center text-white outline-none focus:border-[#ac81bd] placeholder:text-[#453e50]"
                />
              </div>

              <button
                type="button"
                onClick={() => {
                  const link = prompt(
                    "Nhập liên kết hình ảnh mới cho ảnh bìa:",
                  );
                  if (link) {
                    const updated = [...(weddingData.galleryImages || [])];
                    updated[0] = link;
                    updateField(["galleryImages"], updated);
                  }
                }}
                className="bg-[#7c4d90]/10 hover:bg-[#7c4d90]/20 text-[#ac81bd] px-5 py-2 rounded-xl text-xs font-semibold transition-all border border-[#7c4d90]/30 cursor-pointer font-sans"
              >
                Nhập liên kết ảnh khác
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ACCORDION 4: SỰ KIỆN CHÍNH */}
      <div className="bg-[#15121c] rounded-xl overflow-hidden shadow-xs border border-transparent hover:border-[#7c4d90]/35 transition-all">
        <div
          onClick={() => toggleSection("events")}
          className="flex items-center justify-between p-4 cursor-pointer hover:bg-[#1a1722] transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-xs text-[#ac81bd] w-3 text-center">
              {openSections.events ? "▼" : "▶"}
            </span>
            <MapPin size={14} className="text-[#ac81bd]" />
            <span className="text-sm font-medium text-slate-200">
              Sự kiện & Ngày cưới
            </span>
          </div>
        </div>

        {openSections.events && (
          <div className="p-5 border-t border-[#7c4d90]/15 space-y-6 bg-[#15121c] text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-300">
                  Ngày cưới chung đôi *
                </label>
                <input
                  type="date"
                  required
                  value={
                    weddingData.weddingDate
                      ? weddingData.weddingDate.split("T")[0]
                      : ""
                  }
                  onChange={(e) => updateField(["weddingDate"], e.target.value)}
                  className="w-full bg-[#0e0c12] border border-[#2a2533] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#ac81bd]"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-300">
                  Giờ bắt đầu
                </label>
                <input
                  type="text"
                  value={weddingData.weddingTime || ""}
                  onChange={(e) => updateField(["weddingTime"], e.target.value)}
                  placeholder="18:00"
                  className="w-full bg-[#0e0c12] border border-[#2a2533] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#ac81bd]"
                />
              </div>
            </div>

            <div className="space-y-4 border-t border-[#2a2533] pt-4">
              <h4 className="text-xs font-bold text-[#ac81bd] uppercase tracking-wider">
                Chi tiết các sự kiện ({weddingData.events.length})
              </h4>
              {weddingData.events.map((event, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl border border-[#2a2533] bg-[#0e0c12]/60 space-y-4"
                >
                  <div className="font-semibold text-xs text-[#ac81bd] uppercase flex items-center justify-between border-b border-[#2a2533] pb-1.5">
                    <span>
                      Sự kiện {index + 1}: {event.title}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[10px] text-slate-400 font-medium uppercase">
                      Tên sự kiện
                    </label>
                    <input
                      type="text"
                      value={event.title}
                      onChange={(e) =>
                        updateEvent(index, "title", e.target.value)
                      }
                      className="w-full bg-[#0e0c12] border border-[#2a2533] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#ac81bd]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="block text-[10px] text-slate-400 font-medium uppercase">
                        Giờ bắt đầu
                      </label>
                      <input
                        type="text"
                        value={event.time}
                        onChange={(e) =>
                          updateEvent(index, "time", e.target.value)
                        }
                        className="w-full bg-[#0e0c12] border border-[#2a2533] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#ac81bd]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[10px] text-slate-400 font-medium uppercase">
                        Ngày diễn ra
                      </label>
                      <input
                        type="text"
                        value={event.date}
                        onChange={(e) =>
                          updateEvent(index, "date", e.target.value)
                        }
                        className="w-full bg-[#0e0c12] border border-[#2a2533] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#ac81bd]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[10px] text-slate-400 font-medium uppercase">
                      Tên địa điểm tổ chức
                    </label>
                    <input
                      type="text"
                      value={event.locationName}
                      onChange={(e) =>
                        updateEvent(index, "locationName", e.target.value)
                      }
                      className="w-full bg-[#0e0c12] border border-[#2a2533] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#ac81bd]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[10px] text-slate-400 font-medium uppercase">
                      Địa chỉ chính xác
                    </label>
                    <input
                      type="text"
                      value={event.address}
                      onChange={(e) =>
                        updateEvent(index, "address", e.target.value)
                      }
                      className="w-full bg-[#0e0c12] border border-[#2a2533] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#ac81bd]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ACCORDION 5: QUÀ MỪNG CƯỚI */}
      <div className="bg-[#15121c] rounded-xl overflow-hidden shadow-xs border border-transparent hover:border-[#7c4d90]/35 transition-all">
        <div
          onClick={() => toggleSection("gift")}
          className="flex items-center justify-between p-4 cursor-pointer hover:bg-[#1a1722] transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-xs text-[#ac81bd] w-3 text-center">
              {openSections.gift ? "▼" : "▶"}
            </span>
            <Gift size={14} className="text-[#ac81bd]" />
            <span className="text-sm font-medium text-slate-200">
              Quà mừng cưới & Số tài khoản
            </span>
          </div>
        </div>

        {openSections.gift && (
          <div className="p-5 border-t border-[#7c4d90]/15 space-y-6 bg-[#15121c] text-left">
            <p className="text-[11px] text-slate-400">
              Điền thông tin tài khoản ngân hàng để khách mời có thể gửi quà
              mừng cưới online thông qua chuyển khoản.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nhà Trai */}
              <div className="p-4 rounded-xl border border-[#2a2533] bg-[#0e0c12]/60 space-y-4">
                <span className="text-xs font-bold text-[#ac81bd] uppercase tracking-wide">
                  Gia đình Nhà Trai
                </span>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="block text-[10px] text-slate-400 font-semibold uppercase">
                      Tên ngân hàng
                    </label>
                    <input
                      type="text"
                      placeholder="VD: Vietcombank"
                      value={weddingData.giftInfo?.groomBankName || ""}
                      onChange={(e) =>
                        updateField(
                          ["giftInfo", "groomBankName"],
                          e.target.value,
                        )
                      }
                      className="w-full bg-[#0e0c12] border border-[#2a2533] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#ac81bd]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] text-slate-400 font-semibold uppercase">
                      Số tài khoản
                    </label>
                    <input
                      type="text"
                      placeholder="VD: 1023456789"
                      value={weddingData.giftInfo?.groomAccountNumber || ""}
                      onChange={(e) =>
                        updateField(
                          ["giftInfo", "groomAccountNumber"],
                          e.target.value,
                        )
                      }
                      className="w-full bg-[#0e0c12] border border-[#2a2533] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#ac81bd]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] text-slate-400 font-semibold uppercase">
                      Tên chủ tài khoản
                    </label>
                    <input
                      type="text"
                      placeholder="VD: NGUYEN THE BAO"
                      value={weddingData.giftInfo?.groomAccountName || ""}
                      onChange={(e) =>
                        updateField(
                          ["giftInfo", "groomAccountName"],
                          e.target.value,
                        )
                      }
                      className="w-full bg-[#0e0c12] border border-[#2a2533] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#ac81bd]"
                    />
                  </div>
                </div>
              </div>

              {/* Nhà Gái */}
              <div className="p-4 rounded-xl border border-[#2a2533] bg-[#0e0c12]/60 space-y-4">
                <span className="text-xs font-bold text-[#ac81bd] uppercase tracking-wide">
                  Gia đình Nhà Gái
                </span>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="block text-[10px] text-slate-400 font-semibold uppercase">
                      Tên ngân hàng
                    </label>
                    <input
                      type="text"
                      placeholder="VD: Techcombank"
                      value={weddingData.giftInfo?.brideBankName || ""}
                      onChange={(e) =>
                        updateField(
                          ["giftInfo", "brideBankName"],
                          e.target.value,
                        )
                      }
                      className="w-full bg-[#0e0c12] border border-[#2a2533] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#ac81bd]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] text-slate-400 font-semibold uppercase">
                      Số tài khoản
                    </label>
                    <input
                      type="text"
                      placeholder="VD: 1903456789"
                      value={weddingData.giftInfo?.brideAccountNumber || ""}
                      onChange={(e) =>
                        updateField(
                          ["giftInfo", "brideAccountNumber"],
                          e.target.value,
                        )
                      }
                      className="w-full bg-[#0e0c12] border border-[#2a2533] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#ac81bd]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] text-slate-400 font-semibold uppercase">
                      Tên chủ tài khoản
                    </label>
                    <input
                      type="text"
                      placeholder="VD: TRAN NGOC ANH"
                      value={weddingData.giftInfo?.brideAccountName || ""}
                      onChange={(e) =>
                        updateField(
                          ["giftInfo", "brideAccountName"],
                          e.target.value,
                        )
                      }
                      className="w-full bg-[#0e0c12] border border-[#2a2533] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#ac81bd]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
