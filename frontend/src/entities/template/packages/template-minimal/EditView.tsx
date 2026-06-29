import { useState } from "react";
import {
  Heart,
  Image as ImageIcon,
  Paintbrush,
  MapPin,
  Gift,
  Lock,
} from "lucide-react";

import { TEMPLATES } from "@/entities/template/model/templates";
import { WeddingData, WeddingEvent } from "@/entities/invitation/model/types";

interface EditViewProps {
  weddingData: WeddingData;
  updateField: (path: string[], value: any) => void;
}

export function EditView({ weddingData, updateField }: EditViewProps) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    design: false,
    basic: true,
    cover: false,
    events: false,
    gallery: false,
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
      {/* ACCORDION 0: THIẾT KẾ & CHỌN MẪU */}
      <div className="bg-[#1c1917] border border-[#292524] rounded-2xl overflow-hidden shadow-xs">
        <div
          onClick={() => toggleSection("design")}
          className="flex items-center justify-between p-5 cursor-pointer hover:bg-[#292524]/30 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Paintbrush size={18} className="text-[#db2777]" />
            <span
              className="text-sm font-semibold tracking-wide"
              style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: "1.1rem",
              }}
            >
              Chọn mẫu thiệp cưới
            </span>
          </div>
          <span className="text-xs text-slate-500">
            {openSections.design ? "▲" : "▼"}
          </span>
        </div>

        {openSections.design && (
          <div className="p-6 border-t border-[#292524] space-y-6 bg-[#1c1917]/50 text-left">
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
                    className={`p-3 rounded-xl border text-left flex flex-col gap-3.5 transition-all cursor-pointer bg-[#1c1917] relative overflow-hidden ${
                      weddingData.templateId === t.id
                        ? "border-[#db2777] shadow-lg ring-1 ring-[#db2777]/40 bg-[#292524]/20"
                        : "border-[#292524] hover:border-[#db2777]/40"
                    }`}
                  >
                    <span
                      className={`absolute top-3 right-3 px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider z-10 ${
                        t.price === 0
                          ? "bg-slate-700 text-white"
                          : "bg-amber-600 text-white"
                      }`}
                    >
                      {t.price === 0
                        ? "Miễn phí"
                        : `${t.price.toLocaleString("vi-VN")}đ`}
                    </span>

                    <div className="relative w-full aspect-[4/3] bg-stone-900 rounded-lg overflow-hidden border border-[#292524] flex items-center justify-center">
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
                            <span className="text-[9px] font-medium tracking-wide">
                              Chưa mở khóa
                            </span>
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

            <div className="border-t border-[#292524] pt-5 space-y-2">
              <h4 className="text-2xs uppercase tracking-wider text-slate-400 font-bold">
                Đường dẫn thiệp mời (Slug)
              </h4>
              <div className="flex rounded-xl border border-[#292524] overflow-hidden bg-[#0c0a09] focus-within:border-[#db2777] transition-colors">
                <span className="px-3.5 py-3 text-xs text-slate-500 bg-[#1c1917] border-r border-[#292524] select-none">
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

      {/* ACCORDION 1: THÔNG TIN CƠ BẢN */}
      <div className="bg-[#151515] rounded-xl overflow-hidden shadow-xs border border-transparent hover:border-[#2a2a2a] transition-all">
        <div
          onClick={() => toggleSection("basic")}
          className="flex items-center justify-between p-4 cursor-pointer hover:bg-[#1a1a1a] transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 w-3 text-center">
              {openSections.basic ? "v" : ">"}
            </span>
            <Heart size={14} className="text-slate-400" />
            <span className="text-sm font-medium text-slate-200">
              Thông tin cơ bản
            </span>
          </div>
        </div>

        {openSections.basic && (
          <div className="p-5 border-t border-[#222] space-y-5 bg-[#151515] text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-300">
                  Họ tên chú rể
                </label>
                <input
                  type="text"
                  required
                  value={weddingData.groomName}
                  onChange={(e) => updateField(["groomName"], e.target.value)}
                  placeholder="VD. Nguyễn Thế Bảo"
                  className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-slate-500 transition-colors placeholder:text-slate-600"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-300">
                  Họ tên cô dâu
                </label>
                <input
                  type="text"
                  required
                  value={weddingData.brideName}
                  onChange={(e) => updateField(["brideName"], e.target.value)}
                  placeholder="VD. Trần Ngọc Ánh"
                  className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-slate-500 transition-colors placeholder:text-slate-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-300">
                  Tên ngắn chú rể
                </label>
                <input
                  type="text"
                  value={weddingData.groomShortName || ""}
                  onChange={(e) =>
                    updateField(["groomShortName"], e.target.value)
                  }
                  className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-slate-500 transition-colors"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-300">
                  Tên ngắn cô dâu
                </label>
                <input
                  type="text"
                  value={weddingData.brideShortName || ""}
                  onChange={(e) =>
                    updateField(["brideShortName"], e.target.value)
                  }
                  className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-slate-500 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-4 border-t border-[#292524]/60 pt-4">
              <h4 className="text-2xs uppercase tracking-wider text-slate-400 font-bold">
                Thông tin phụ huynh hai bên
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3 p-4 rounded-xl bg-[#0c0a09]/50 border border-[#292524]">
                  <span className="text-[10px] font-bold text-[#db2777] uppercase tracking-wide">
                    Nhà Trai
                  </span>
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Họ tên Bố chú rể"
                      value={weddingData.groomFatherName || ""}
                      onChange={(e) =>
                        updateField(["groomFatherName"], e.target.value)
                      }
                      className="w-full bg-[#0c0a09] border border-[#292524] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#db2777]"
                    />
                    <input
                      type="text"
                      placeholder="Họ tên Mẹ chú rể"
                      value={weddingData.groomMotherName || ""}
                      onChange={(e) =>
                        updateField(["groomMotherName"], e.target.value)
                      }
                      className="w-full bg-[#0c0a09] border border-[#292524] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#db2777]"
                    />
                  </div>
                </div>

                <div className="space-y-3 p-4 rounded-xl bg-[#0c0a09]/50 border border-[#292524]">
                  <span className="text-[10px] font-bold text-[#db2777] uppercase tracking-wide">
                    Nhà Gái
                  </span>
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Họ tên Bố cô dâu"
                      value={weddingData.brideFatherName || ""}
                      onChange={(e) =>
                        updateField(["brideFatherName"], e.target.value)
                      }
                      className="w-full bg-[#0c0a09] border border-[#292524] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#db2777]"
                    />
                    <input
                      type="text"
                      placeholder="Họ tên Mẹ cô dâu"
                      value={weddingData.brideMotherName || ""}
                      onChange={(e) =>
                        updateField(["brideMotherName"], e.target.value)
                      }
                      className="w-full bg-[#0c0a09] border border-[#292524] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#db2777]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ACCORDION 2: ẢNH BÌA */}
      <div className="bg-[#151515] rounded-xl overflow-hidden shadow-xs border border-transparent hover:border-[#2a2a2a] transition-all">
        <div
          onClick={() => toggleSection("cover")}
          className="flex items-center justify-between p-4 cursor-pointer hover:bg-[#1a1a1a] transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 w-3 text-center">
              {openSections.cover ? "v" : ">"}
            </span>
            <ImageIcon size={14} className="text-slate-400" />
            <span className="text-sm font-medium text-slate-200">
              Ảnh đầu thiệp
            </span>
          </div>
        </div>

        {openSections.cover && (
          <div className="p-6 border-t border-[#222] bg-[#151515] text-center">
            <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-[#111] space-y-4">
              <div className="relative w-32 aspect-[3/4] bg-[#0a0a0a] rounded-xl border border-[#222] flex items-center justify-center overflow-hidden shadow-inner">
                {weddingData.galleryImages?.[0] ? (
                  <img
                    src={weddingData.galleryImages[0]}
                    alt="Cover"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageIcon size={24} className="text-[#333]" />
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
                  placeholder="Link ảnh bìa thiệp..."
                  className="w-full bg-[#151515] border border-[#333] rounded-lg px-3 py-2 text-xs text-center text-white outline-none focus:border-slate-500 placeholder:text-[#555]"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ACCORDION 3: SỰ KIỆN CHÍNH */}
      <div className="bg-[#1c1917] border border-[#292524] rounded-2xl overflow-hidden shadow-xs">
        <div
          onClick={() => toggleSection("events")}
          className="flex items-center justify-between p-5 cursor-pointer hover:bg-[#292524]/30 transition-colors"
        >
          <div className="flex items-center gap-3">
            <MapPin size={18} className="text-[#db2777]" />
            <span
              className="text-sm font-semibold tracking-wide"
              style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: "1.1rem",
              }}
            >
              Sự kiện chính & Bản đồ
            </span>
          </div>
          <span className="text-xs text-slate-500">
            {openSections.events ? "▲" : "▼"}
          </span>
        </div>

        {openSections.events && (
          <div className="p-6 border-t border-[#292524] space-y-6 bg-[#1c1917]/50 text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-2xs uppercase tracking-wider text-slate-400 font-semibold">
                  Ngày cưới tổng thể *
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
                  className="w-full bg-[#0c0a09] border border-[#292524] rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#db2777]"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-2xs uppercase tracking-wider text-slate-400 font-semibold">
                  Giờ bắt đầu tiệc cưới
                </label>
                <input
                  type="text"
                  value={weddingData.weddingTime || ""}
                  onChange={(e) => updateField(["weddingTime"], e.target.value)}
                  placeholder="18:00"
                  className="w-full bg-[#0c0a09] border border-[#292524] rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#db2777]"
                />
              </div>
            </div>

            <div className="space-y-4 border-t border-[#292524]/60 pt-4">
              <h4 className="text-2xs uppercase tracking-wider text-slate-400 font-bold">
                Chi tiết từng sự kiện
              </h4>
              {weddingData.events.map((event, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl border border-[#292524] bg-[#0c0a09]/40 space-y-4"
                >
                  <div className="font-semibold text-2xs text-[#db2777] uppercase flex items-center justify-between border-b border-[#292524] pb-1.5">
                    <span>
                      Sự kiện {index + 1}: {event.title}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-3xs uppercase tracking-wider text-slate-500 font-medium">
                      Tên sự kiện
                    </label>
                    <input
                      type="text"
                      value={event.title}
                      onChange={(e) =>
                        updateEvent(index, "title", e.target.value)
                      }
                      className="w-full bg-[#0c0a09] border border-[#292524] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#db2777]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="block text-3xs uppercase tracking-wider text-slate-500 font-medium">
                        Giờ bắt đầu
                      </label>
                      <input
                        type="text"
                        value={event.time}
                        onChange={(e) =>
                          updateEvent(index, "time", e.target.value)
                        }
                        className="w-full bg-[#0c0a09] border border-[#292524] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#db2777]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-3xs uppercase tracking-wider text-slate-500 font-medium">
                        Ngày diễn ra
                      </label>
                      <input
                        type="text"
                        value={event.date}
                        onChange={(e) =>
                          updateEvent(index, "date", e.target.value)
                        }
                        className="w-full bg-[#0c0a09] border border-[#292524] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#db2777]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-3xs uppercase tracking-wider text-slate-500 font-medium">
                      Tên nơi tổ chức (VD: Nhà hàng Diamond...)
                    </label>
                    <input
                      type="text"
                      value={event.locationName}
                      onChange={(e) =>
                        updateEvent(index, "locationName", e.target.value)
                      }
                      className="w-full bg-[#0c0a09] border border-[#292524] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#db2777]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-3xs uppercase tracking-wider text-slate-500 font-medium">
                      Địa chỉ chính xác
                    </label>
                    <input
                      type="text"
                      value={event.address}
                      onChange={(e) =>
                        updateEvent(index, "address", e.target.value)
                      }
                      className="w-full bg-[#0c0a09] border border-[#292524] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#db2777]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-3xs uppercase tracking-wider text-slate-500 font-medium">
                      Đường dẫn Google Maps (Tùy chọn)
                    </label>
                    <input
                      type="text"
                      value={event.mapUrl || ""}
                      onChange={(e) =>
                        updateEvent(index, "mapUrl", e.target.value)
                      }
                      className="w-full bg-[#0c0a09] border border-[#292524] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#db2777]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ACCORDION 4: ALBUM ẢNH CƯỚI (Giới hạn tối đa 3 ảnh cho mẫu Tinh Giản) */}
      <div className="bg-[#1c1917] border border-[#292524] rounded-2xl overflow-hidden shadow-xs">
        <div
          onClick={() => toggleSection("gallery")}
          className="flex items-center justify-between p-5 cursor-pointer hover:bg-[#292524]/30 transition-colors"
        >
          <div className="flex items-center gap-3">
            <ImageIcon size={18} className="text-[#db2777]" />
            <span
              className="text-sm font-semibold tracking-wide"
              style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: "1.1rem",
              }}
            >
              Album ảnh cưới (Tối đa 3 ảnh)
            </span>
          </div>
          <span className="text-xs text-slate-500">
            {openSections.gallery ? "▲" : "▼"}
          </span>
        </div>

        {openSections.gallery && (
          <div className="p-6 border-t border-[#292524] space-y-6 bg-[#1c1917]/50 text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Array.from({ length: 3 }).map((_, index) => {
                const imgUrl = weddingData.galleryImages[index] || "";
                return (
                  <div
                    key={index}
                    className="p-4 rounded-xl border border-[#292524] bg-[#0c0a09]/40 flex gap-3.5 items-center"
                  >
                    <div className="w-14 h-14 bg-[#1c1917] border border-[#292524] rounded-lg overflow-hidden flex items-center justify-center shrink-0">
                      {imgUrl ? (
                        <img
                          src={imgUrl}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <ImageIcon
                          size={16}
                          className="text-slate-600 animate-pulse"
                        />
                      )}
                    </div>

                    <div className="flex-1 space-y-1">
                      <span className="text-[9px] font-bold text-[#db2777] uppercase">
                        Ảnh cưới {index + 1}
                      </span>
                      <input
                        type="text"
                        placeholder="Nhập link ảnh cưới..."
                        value={imgUrl}
                        onChange={(e) => {
                          const updated = [
                            ...(weddingData.galleryImages || []),
                          ];
                          updated[index] = e.target.value;
                          updateField(["galleryImages"], updated);
                        }}
                        className="w-full bg-transparent border-b border-[#292524] py-1 text-xs text-white outline-none focus:border-[#db2777] focus:placeholder-transparent"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* ACCORDION 5: QUÀ MỪNG CƯỚI & VIETQR */}
      <div className="bg-[#1c1917] border border-[#292524] rounded-2xl overflow-hidden shadow-xs">
        <div
          onClick={() => toggleSection("gift")}
          className="flex items-center justify-between p-5 cursor-pointer hover:bg-[#292524]/30 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Gift size={18} className="text-[#db2777]" />
            <span
              className="text-sm font-semibold tracking-wide"
              style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: "1.1rem",
              }}
            >
              Tài khoản mừng cưới & mã QR
            </span>
          </div>
          <span className="text-xs text-slate-500">
            {openSections.gift ? "▲" : "▼"}
          </span>
        </div>

        {openSections.gift && (
          <div className="p-6 border-t border-[#292524] space-y-6 bg-[#1c1917]/50 text-left">
            <p className="text-2xs text-slate-400 leading-relaxed">
              Nhập thông tin tài khoản ngân hàng của hai bên gia đình.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nhà Trai */}
              <div className="p-4 rounded-xl border border-[#292524] bg-[#0c0a09]/40 space-y-3">
                <span className="text-[10px] font-bold text-[#db2777] uppercase tracking-wider">
                  Mừng cưới nhà trai
                </span>

                <div className="space-y-1.5">
                  <label className="block text-3xs uppercase tracking-wider text-slate-500 font-medium">
                    Ngân hàng (VCB, TCB, ACB...)
                  </label>
                  <input
                    type="text"
                    placeholder="Nhập tên viết tắt (vd: vcb)"
                    value={weddingData.giftInfo?.groomBankName || ""}
                    onChange={(e) =>
                      updateField(["giftInfo", "groomBankName"], e.target.value)
                    }
                    className="w-full bg-[#0c0a09] border border-[#292524] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#db2777]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-3xs uppercase tracking-wider text-slate-500 font-medium">
                    Số tài khoản
                  </label>
                  <input
                    type="text"
                    placeholder="Số tài khoản ngân hàng"
                    value={weddingData.giftInfo?.groomAccountNumber || ""}
                    onChange={(e) =>
                      updateField(
                        ["giftInfo", "groomAccountNumber"],
                        e.target.value,
                      )
                    }
                    className="w-full bg-[#0c0a09] border border-[#292524] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#db2777]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-3xs uppercase tracking-wider text-slate-500 font-medium">
                    Tên chủ tài khoản
                  </label>
                  <input
                    type="text"
                    placeholder="TÊN CHỦ TÀI KHOẢN KHÔNG DẤU"
                    value={weddingData.giftInfo?.groomAccountName || ""}
                    onChange={(e) =>
                      updateField(
                        ["giftInfo", "groomAccountName"],
                        e.target.value,
                      )
                    }
                    className="w-full bg-[#0c0a09] border border-[#292524] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#db2777]"
                  />
                </div>
              </div>

              {/* Nhà Gái */}
              <div className="p-4 rounded-xl border border-[#292524] bg-[#0c0a09]/40 space-y-3">
                <span className="text-[10px] font-bold text-[#db2777] uppercase tracking-wider">
                  Mừng cưới nhà gái
                </span>

                <div className="space-y-1.5">
                  <label className="block text-3xs uppercase tracking-wider text-slate-500 font-medium">
                    Ngân hàng
                  </label>
                  <input
                    type="text"
                    placeholder="Nhập tên viết tắt (vd: tcb)"
                    value={weddingData.giftInfo?.brideBankName || ""}
                    onChange={(e) =>
                      updateField(["giftInfo", "brideBankName"], e.target.value)
                    }
                    className="w-full bg-[#0c0a09] border border-[#292524] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#db2777]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-3xs uppercase tracking-wider text-slate-500 font-medium">
                    Số tài khoản
                  </label>
                  <input
                    type="text"
                    placeholder="Số tài khoản ngân hàng"
                    value={weddingData.giftInfo?.brideAccountNumber || ""}
                    onChange={(e) =>
                      updateField(
                        ["giftInfo", "brideAccountNumber"],
                        e.target.value,
                      )
                    }
                    className="w-full bg-[#0c0a09] border border-[#292524] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#db2777]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-3xs uppercase tracking-wider text-slate-500 font-medium">
                    Tên chủ tài khoản
                  </label>
                  <input
                    type="text"
                    placeholder="TÊN CHỦ TÀI KHOẢN KHÔNG DẤU"
                    value={weddingData.giftInfo?.brideAccountName || ""}
                    onChange={(e) =>
                      updateField(
                        ["giftInfo", "brideAccountName"],
                        e.target.value,
                      )
                    }
                    className="w-full bg-[#0c0a09] border border-[#292524] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#db2777]"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
