import { useState } from "react";
import {
  Heart,
  Image as ImageIcon,
  Paintbrush,
  MapPin,
  Gift,
  Lock,
  Plus,
  Trash2,
  Quote,
  Phone,
  Mail,
  Calendar,
} from "lucide-react";

import { TEMPLATES } from "@/entities/template/model/templates";
import {
  WeddingData,
  WeddingEvent,
  LoveStoryTimelineItem,
} from "@/entities/invitation/model/types";

interface EditViewProps {
  weddingData: WeddingData;
  updateField: (path: string[], value: any) => void;
}

export function EditView({ weddingData, updateField }: EditViewProps) {
  // Trạng thái đóng mở các phân đoạn accordion
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    design: false,
    basic: true,
    quote: false,
    coverAndSpotlight: false,
    events: false,
    timeline: false,
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

  // Các phương thức chỉnh sửa Timeline
  const updateTimelineItem = (
    index: number,
    field: keyof LoveStoryTimelineItem,
    value: string,
  ) => {
    const updatedTimeline = [...(weddingData.timeline || [])];
    updatedTimeline[index] = { ...updatedTimeline[index], [field]: value };
    updateField(["timeline"], updatedTimeline);
  };

  const addTimelineItem = () => {
    const updatedTimeline = [
      ...(weddingData.timeline || []),
      { year: "", title: "", description: "", imageUrl: "" },
    ];
    updateField(["timeline"], updatedTimeline);
  };

  const removeTimelineItem = (index: number) => {
    const updatedTimeline = (weddingData.timeline || []).filter(
      (_, i) => i !== index,
    );
    updateField(["timeline"], updatedTimeline);
  };

  // Các phương thức chỉnh sửa Album ảnh cưới (từ index 3 trở đi của galleryImages)
  const getAlbumImages = () => {
    return weddingData.galleryImages ? weddingData.galleryImages.slice(3) : [];
  };

  const updateAlbumImage = (albumIndex: number, value: string) => {
    const updatedImages = [...(weddingData.galleryImages || [])];
    // Đảm bảo có ít nhất 3 phần tử đầu tiên (ảnh bìa, ảnh chú rể, ảnh cô dâu)
    while (updatedImages.length < 3) {
      updatedImages.push("");
    }
    updatedImages[albumIndex + 3] = value;
    updateField(["galleryImages"], updatedImages);
  };

  const addAlbumImage = () => {
    const updatedImages = [...(weddingData.galleryImages || [])];
    while (updatedImages.length < 3) {
      updatedImages.push("");
    }
    if (updatedImages.length - 3 >= 30) {
      alert("Mẫu Đêm Hoàng Gia giới hạn tối đa 30 ảnh cưới trong Album!");
      return;
    }
    updatedImages.push("");
    updateField(["galleryImages"], updatedImages);
  };

  const removeAlbumImage = (albumIndex: number) => {
    const updatedImages = [...(weddingData.galleryImages || [])];
    updatedImages.splice(albumIndex + 3, 1);
    updateField(["galleryImages"], updatedImages);
  };

  // Lấy danh sách template đã mua từ localStorage
  const purchasedTemplates: number[] = JSON.parse(
    (typeof window !== "undefined"
      ? localStorage.getItem("purchasedTemplates")
      : null) || "[]",
  );

  // Gọi modal nâng cấp/mở khóa template lẻ
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
      {/* Khối giới thiệu template sang trọng */}
      <div className="bg-[#241a12]/40 border border-[#c6925c]/25 rounded-2xl p-4 text-center">
        <h3
          className="text-sm font-semibold text-[#c6925c]"
          style={{ fontFamily: "'EB Garamond', serif" }}
        >
          Mẫu đang sửa: Đêm Hoàng Gia (Royal)
        </h3>
        <p className="text-[10px] text-slate-400 mt-1">
          Mẫu thiệp cưới Premium mang phong cách cổ điển phương Tây, hỗ trợ đầy
          đủ các hiệu ứng trình diễn ảnh, countdown và câu chuyện tình yêu.
        </p>
      </div>

      {/* ACCORDION 0: CHỌN MẪU THIỆP CƯỚI */}
      <div className="bg-[#1c1917] border border-[#292524] rounded-2xl overflow-hidden shadow-xs">
        <div
          onClick={() => toggleSection("design")}
          className="flex items-center justify-between p-5 cursor-pointer hover:bg-[#292524]/30 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Paintbrush size={18} className="text-[#c6925c]" />
            <span
              className="text-sm font-semibold tracking-wide text-slate-200"
              style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: "1.1rem",
              }}
            >
              Chọn mẫu thiệp cưới
            </span>
          </div>
          <span className="text-xs text-[#c6925c]">
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
                        ? "border-[#c6925c] shadow-lg ring-1 ring-[#c6925c]/40 bg-[#292524]/20"
                        : "border-[#292524] hover:border-[#c6925c]/40"
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
              <div className="flex rounded-xl border border-[#292524] overflow-hidden bg-[#0c0a09] focus-within:border-[#c6925c] transition-colors">
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

      {/* ACCORDION 1: CÔ DÂU & CHÚ RỂ VÀ THÔNG TIN PHỤ HUYNH */}
      <div className="bg-[#1c1917] border border-[#292524] rounded-2xl overflow-hidden shadow-xs">
        <div
          onClick={() => toggleSection("basic")}
          className="flex items-center justify-between p-5 cursor-pointer hover:bg-[#292524]/30 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Heart size={18} className="text-[#c6925c]" />
            <span
              className="text-sm font-semibold tracking-wide text-slate-200"
              style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: "1.1rem",
              }}
            >
              Cô dâu & Chú rể
            </span>
          </div>
          <span className="text-xs text-[#c6925c]">
            {openSections.basic ? "▲" : "▼"}
          </span>
        </div>

        {openSections.basic && (
          <div className="p-6 border-t border-[#292524] space-y-6 bg-[#1c1917]/50 text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-2xs uppercase tracking-wider text-slate-400 font-semibold">
                  Họ tên Chú rể *
                </label>
                <input
                  type="text"
                  required
                  value={weddingData.groomName}
                  onChange={(e) => updateField(["groomName"], e.target.value)}
                  placeholder="VD. Nguyễn Thế Bảo"
                  className="w-full bg-[#0c0a09] border border-[#292524] rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#c6925c] transition-colors"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-2xs uppercase tracking-wider text-slate-400 font-semibold">
                  Họ tên Cô dâu *
                </label>
                <input
                  type="text"
                  required
                  value={weddingData.brideName}
                  onChange={(e) => updateField(["brideName"], e.target.value)}
                  placeholder="VD. Trần Ngọc Ánh"
                  className="w-full bg-[#0c0a09] border border-[#292524] rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#c6925c] transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-2xs uppercase tracking-wider text-slate-400 font-semibold">
                  Tên ngắn Chú rể
                </label>
                <input
                  type="text"
                  value={weddingData.groomShortName || ""}
                  onChange={(e) =>
                    updateField(["groomShortName"], e.target.value)
                  }
                  placeholder="VD. Thế Bảo"
                  className="w-full bg-[#0c0a09] border border-[#292524] rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#c6925c]"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-2xs uppercase tracking-wider text-slate-400 font-semibold">
                  Tên ngắn Cô dâu
                </label>
                <input
                  type="text"
                  value={weddingData.brideShortName || ""}
                  onChange={(e) =>
                    updateField(["brideShortName"], e.target.value)
                  }
                  placeholder="VD. Ngọc Ánh"
                  className="w-full bg-[#0c0a09] border border-[#292524] rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#c6925c]"
                />
              </div>
            </div>

            <div className="space-y-4 border-t border-[#292524]/60 pt-4">
              <h4 className="text-2xs uppercase tracking-wider text-[#c6925c] font-bold">
                Thông tin phụ huynh hai bên
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3 p-4 rounded-xl bg-[#0c0a09]/50 border border-[#292524]">
                  <span className="text-[10px] font-bold text-[#c6925c] uppercase tracking-wide">
                    Họ hàng nhà trai
                  </span>
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Họ tên Bố chú rể"
                      value={weddingData.groomFatherName || ""}
                      onChange={(e) =>
                        updateField(["groomFatherName"], e.target.value)
                      }
                      className="w-full bg-[#0c0a09] border border-[#292524] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#c6925c]"
                    />
                    <input
                      type="text"
                      placeholder="Họ tên Mẹ chú rể"
                      value={weddingData.groomMotherName || ""}
                      onChange={(e) =>
                        updateField(["groomMotherName"], e.target.value)
                      }
                      className="w-full bg-[#0c0a09] border border-[#292524] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#c6925c]"
                    />
                  </div>
                </div>

                <div className="space-y-3 p-4 rounded-xl bg-[#0c0a09]/50 border border-[#292524]">
                  <span className="text-[10px] font-bold text-[#c6925c] uppercase tracking-wide">
                    Họ hàng nhà gái
                  </span>
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Họ tên Bố cô dâu"
                      value={weddingData.brideFatherName || ""}
                      onChange={(e) =>
                        updateField(["brideFatherName"], e.target.value)
                      }
                      className="w-full bg-[#0c0a09] border border-[#292524] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#c6925c]"
                    />
                    <input
                      type="text"
                      placeholder="Họ tên Mẹ cô dâu"
                      value={weddingData.brideMotherName || ""}
                      onChange={(e) =>
                        updateField(["brideMotherName"], e.target.value)
                      }
                      className="w-full bg-[#0c0a09] border border-[#292524] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#c6925c]"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 border-t border-[#292524]/60 pt-4">
              <h4 className="text-2xs uppercase tracking-wider text-[#c6925c] font-bold">
                Thông tin liên hệ (Hiển thị chân trang)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-3xs uppercase tracking-wider text-slate-500 font-medium">
                    SĐT Chú rể
                  </label>
                  <input
                    type="text"
                    value={weddingData.contactInfo?.groomPhone || ""}
                    onChange={(e) =>
                      updateField(["contactInfo", "groomPhone"], e.target.value)
                    }
                    placeholder="VD. 0912345678"
                    className="w-full bg-[#0c0a09] border border-[#292524] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#c6925c]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-3xs uppercase tracking-wider text-slate-500 font-medium">
                    SĐT Cô dâu
                  </label>
                  <input
                    type="text"
                    value={weddingData.contactInfo?.bridePhone || ""}
                    onChange={(e) =>
                      updateField(["contactInfo", "bridePhone"], e.target.value)
                    }
                    placeholder="VD. 0987654321"
                    className="w-full bg-[#0c0a09] border border-[#292524] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#c6925c]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-3xs uppercase tracking-wider text-slate-500 font-medium">
                    Email chung
                  </label>
                  <input
                    type="email"
                    value={weddingData.contactInfo?.email || ""}
                    onChange={(e) =>
                      updateField(["contactInfo", "email"], e.target.value)
                    }
                    placeholder="VD. cuoi@gmail.com"
                    className="w-full bg-[#0c0a09] border border-[#292524] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#c6925c]"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ACCORDION 2: LỜI TRÍCH DẪN HOÀNG GIA (CUSTOM FOR ROYAL) */}
      <div className="bg-[#1c1917] border border-[#292524] rounded-2xl overflow-hidden shadow-xs">
        <div
          onClick={() => toggleSection("quote")}
          className="flex items-center justify-between p-5 cursor-pointer hover:bg-[#292524]/30 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Quote size={18} className="text-[#c6925c]" />
            <span
              className="text-sm font-semibold tracking-wide text-slate-200"
              style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: "1.1rem",
              }}
            >
              Lời trích dẫn hoàng gia
            </span>
          </div>
          <span className="text-xs text-[#c6925c]">
            {openSections.quote ? "▲" : "▼"}
          </span>
        </div>

        {openSections.quote && (
          <div className="p-6 border-t border-[#292524] space-y-4 bg-[#1c1917]/50 text-left">
            <div className="space-y-1.5">
              <label className="block text-2xs uppercase tracking-wider text-slate-400 font-semibold">
                Nội dung trích dẫn tình yêu
              </label>
              <textarea
                rows={3}
                value={weddingData.royalQuote || ""}
                onChange={(e) => updateField(["royalQuote"], e.target.value)}
                placeholder="VD: Được yêu một người sâu sắc mang lại cho bạn sức mạnh, được yêu một người sâu sắc mang lại cho bạn lòng dũng cảm..."
                className="w-full bg-[#0c0a09] border border-[#292524] rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#c6925c] resize-none font-sans"
              />
              <p className="text-[10px] text-slate-500 italic">
                Lời trích dẫn này sẽ được hiển thị ngay bên dưới ảnh bìa đầu
                thiệp cưới của bạn.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ACCORDION 3: ẢNH ĐẦU THIỆP & SPOTLIGHT CÔ DÂU CHÚ RỂ */}
      <div className="bg-[#1c1917] border border-[#292524] rounded-2xl overflow-hidden shadow-xs">
        <div
          onClick={() => toggleSection("coverAndSpotlight")}
          className="flex items-center justify-between p-5 cursor-pointer hover:bg-[#292524]/30 transition-colors"
        >
          <div className="flex items-center gap-3">
            <ImageIcon size={18} className="text-[#c6925c]" />
            <span
              className="text-sm font-semibold tracking-wide text-slate-200"
              style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: "1.1rem",
              }}
            >
              Ảnh đầu thiệp & Spotlight
            </span>
          </div>
          <span className="text-xs text-[#c6925c]">
            {openSections.coverAndSpotlight ? "▲" : "▼"}
          </span>
        </div>

        {openSections.coverAndSpotlight && (
          <div className="p-6 border-t border-[#292524] space-y-6 bg-[#1c1917]/50 text-left">
            <p className="text-2xs text-slate-400 leading-relaxed">
              Tải lên hoặc dán liên kết các bức ảnh quan trọng nhất để làm nổi
              bật thiệp cưới.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Ảnh bìa */}
              <div className="flex flex-col items-center p-4 rounded-xl bg-[#0c0a09]/40 border border-[#292524] space-y-3">
                <span className="text-[10px] font-bold text-[#c6925c] uppercase">
                  Ảnh bìa thiệp cưới
                </span>
                <div className="relative w-24 aspect-[3/4] bg-[#0c0a09] border border-[#292524] rounded-lg overflow-hidden flex items-center justify-center shadow-inner">
                  {weddingData.galleryImages?.[0] ? (
                    <img
                      src={weddingData.galleryImages[0]}
                      alt="Ảnh bìa"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ImageIcon
                      size={20}
                      className="text-slate-700 animate-pulse"
                    />
                  )}
                </div>
                <input
                  type="text"
                  placeholder="Dán link ảnh..."
                  value={weddingData.galleryImages?.[0] || ""}
                  onChange={(e) => {
                    const updated = [...(weddingData.galleryImages || [])];
                    updated[0] = e.target.value;
                    updateField(["galleryImages"], updated);
                  }}
                  className="w-full bg-[#0c0a09] border border-[#292524] rounded-lg px-2.5 py-1.5 text-[11px] text-white outline-none focus:border-[#c6925c]"
                />
              </div>

              {/* Ảnh chú rể */}
              <div className="flex flex-col items-center p-4 rounded-xl bg-[#0c0a09]/40 border border-[#292524] space-y-3">
                <span className="text-[10px] font-bold text-[#c6925c] uppercase">
                  Ảnh Spotlight Chú rể
                </span>
                <div className="relative w-24 aspect-[3/4] bg-[#0c0a09] border border-[#292524] rounded-lg overflow-hidden flex items-center justify-center shadow-inner">
                  {weddingData.galleryImages?.[1] ? (
                    <img
                      src={weddingData.galleryImages[1]}
                      alt="Chú rể"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ImageIcon
                      size={20}
                      className="text-slate-700 animate-pulse"
                    />
                  )}
                </div>
                <input
                  type="text"
                  placeholder="Dán link ảnh..."
                  value={weddingData.galleryImages?.[1] || ""}
                  onChange={(e) => {
                    const updated = [...(weddingData.galleryImages || [])];
                    while (updated.length < 2) updated.push("");
                    updated[1] = e.target.value;
                    updateField(["galleryImages"], updated);
                  }}
                  className="w-full bg-[#0c0a09] border border-[#292524] rounded-lg px-2.5 py-1.5 text-[11px] text-white outline-none focus:border-[#c6925c]"
                />
              </div>

              {/* Ảnh cô dâu */}
              <div className="flex flex-col items-center p-4 rounded-xl bg-[#0c0a09]/40 border border-[#292524] space-y-3">
                <span className="text-[10px] font-bold text-[#c6925c] uppercase">
                  Ảnh Spotlight Cô dâu
                </span>
                <div className="relative w-24 aspect-[3/4] bg-[#0c0a09] border border-[#292524] rounded-lg overflow-hidden flex items-center justify-center shadow-inner">
                  {weddingData.galleryImages?.[2] ? (
                    <img
                      src={weddingData.galleryImages[2]}
                      alt="Cô dâu"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ImageIcon
                      size={20}
                      className="text-slate-700 animate-pulse"
                    />
                  )}
                </div>
                <input
                  type="text"
                  placeholder="Dán link ảnh..."
                  value={weddingData.galleryImages?.[2] || ""}
                  onChange={(e) => {
                    const updated = [...(weddingData.galleryImages || [])];
                    while (updated.length < 3) updated.push("");
                    updated[2] = e.target.value;
                    updateField(["galleryImages"], updated);
                  }}
                  className="w-full bg-[#0c0a09] border border-[#292524] rounded-lg px-2.5 py-1.5 text-[11px] text-white outline-none focus:border-[#c6925c]"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ACCORDION 4: SỰ KIỆN CHÍNH & BẢN ĐỒ */}
      <div className="bg-[#1c1917] border border-[#292524] rounded-2xl overflow-hidden shadow-xs">
        <div
          onClick={() => toggleSection("events")}
          className="flex items-center justify-between p-5 cursor-pointer hover:bg-[#292524]/30 transition-colors"
        >
          <div className="flex items-center gap-3">
            <MapPin size={18} className="text-[#c6925c]" />
            <span
              className="text-sm font-semibold tracking-wide text-slate-200"
              style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: "1.1rem",
              }}
            >
              Sự kiện chính & Bản đồ
            </span>
          </div>
          <span className="text-xs text-[#c6925c]">
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
                  className="w-full bg-[#0c0a09] border border-[#292524] rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#c6925c]"
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
                  className="w-full bg-[#0c0a09] border border-[#292524] rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#c6925c]"
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
                  <div className="font-semibold text-2xs text-[#c6925c] uppercase flex items-center justify-between border-b border-[#292524] pb-1.5">
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
                      className="w-full bg-[#0c0a09] border border-[#292524] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#c6925c]"
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
                        className="w-full bg-[#0c0a09] border border-[#292524] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#c6925c]"
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
                        className="w-full bg-[#0c0a09] border border-[#292524] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#c6925c]"
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
                      className="w-full bg-[#0c0a09] border border-[#292524] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#c6925c]"
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
                      className="w-full bg-[#0c0a09] border border-[#292524] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#c6925c]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-3xs uppercase tracking-wider text-slate-500 font-medium">
                      Đường dẫn Google Maps (Bản đồ)
                    </label>
                    <input
                      type="text"
                      value={event.mapUrl || ""}
                      onChange={(e) =>
                        updateEvent(index, "mapUrl", e.target.value)
                      }
                      className="w-full bg-[#0c0a09] border border-[#292524] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#c6925c]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ACCORDION 5: CHUYỆN TÌNH YÊU (TIMELINE) */}
      <div className="bg-[#1c1917] border border-[#292524] rounded-2xl overflow-hidden shadow-xs">
        <div
          onClick={() => toggleSection("timeline")}
          className="flex items-center justify-between p-5 cursor-pointer hover:bg-[#292524]/30 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Calendar size={18} className="text-[#c6925c]" />
            <span
              className="text-sm font-semibold tracking-wide text-slate-200"
              style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: "1.1rem",
              }}
            >
              Chuyện tình yêu (Timeline)
            </span>
          </div>
          <span className="text-xs text-[#c6925c]">
            {openSections.timeline ? "▲" : "▼"}
          </span>
        </div>

        {openSections.timeline && (
          <div className="p-6 border-t border-[#292524] space-y-4 bg-[#1c1917]/50 text-left">
            <p className="text-2xs text-slate-400">
              Thiết lập các mốc thời gian đáng nhớ của hai bạn (ngày quen nhau,
              lời cầu hôn...).
            </p>

            {weddingData.timeline?.map((item, index) => (
              <div
                key={index}
                className="p-4 rounded-xl border border-[#292524] bg-[#0c0a09]/40 space-y-3 relative"
              >
                <div className="font-semibold text-2xs text-[#c6925c] uppercase border-b border-[#292524] pb-1.5 flex justify-between items-center">
                  <span>Mốc sự kiện {index + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeTimelineItem(index)}
                    className="text-red-500 hover:text-red-400 border-0 bg-transparent cursor-pointer text-3xs uppercase font-bold flex items-center gap-1"
                  >
                    <Trash2 size={11} /> Xóa
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="block text-3xs uppercase tracking-wider text-slate-500 font-medium">
                      Thời gian (Ví dụ: 2024, 05/2025)
                    </label>
                    <input
                      type="text"
                      value={item.year}
                      onChange={(e) =>
                        updateTimelineItem(index, "year", e.target.value)
                      }
                      className="w-full bg-[#0c0a09] border border-[#292524] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#c6925c]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-3xs uppercase tracking-wider text-slate-500 font-medium">
                      Tiêu đề sự kiện
                    </label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) =>
                        updateTimelineItem(index, "title", e.target.value)
                      }
                      className="w-full bg-[#0c0a09] border border-[#292524] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#c6925c]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-3xs uppercase tracking-wider text-slate-500 font-medium">
                    Mô tả câu chuyện
                  </label>
                  <textarea
                    value={item.description}
                    onChange={(e) =>
                      updateTimelineItem(index, "description", e.target.value)
                    }
                    className="w-full bg-[#0c0a09] border border-[#292524] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#c6925c] min-h-[60px]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-3xs uppercase tracking-wider text-slate-500 font-medium">
                    Đường dẫn hình ảnh sự kiện (Tùy chọn)
                  </label>
                  <input
                    type="text"
                    value={item.imageUrl || ""}
                    onChange={(e) =>
                      updateTimelineItem(index, "imageUrl", e.target.value)
                    }
                    placeholder="Link hình ảnh minh họa..."
                    className="w-full bg-[#0c0a09] border border-[#292524] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#c6925c]"
                  />
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addTimelineItem}
              className="w-full bg-[#c6925c]/10 hover:bg-[#c6925c]/25 border border-[#c6925c]/45 text-[#c6925c] hover:text-white rounded-xl py-3 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer font-sans"
            >
              <Plus size={14} /> Thêm mốc thời gian tình yêu
            </button>
          </div>
        )}
      </div>

      {/* ACCORDION 6: ALBUM ẢNH CƯỚI (TỐI ĐA 30 ẢNH - TRỪ 3 ẢNH BÌA/SPOTLIGHT) */}
      <div className="bg-[#1c1917] border border-[#292524] rounded-2xl overflow-hidden shadow-xs">
        <div
          onClick={() => toggleSection("gallery")}
          className="flex items-center justify-between p-5 cursor-pointer hover:bg-[#292524]/30 transition-colors"
        >
          <div className="flex items-center gap-3">
            <ImageIcon size={18} className="text-[#c6925c]" />
            <span
              className="text-sm font-semibold tracking-wide text-slate-200"
              style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: "1.1rem",
              }}
            >
              Album ảnh cưới (Tối đa 30 ảnh)
            </span>
          </div>
          <span className="text-xs text-[#c6925c]">
            {openSections.gallery ? "▲" : "▼"}
          </span>
        </div>

        {openSections.gallery && (
          <div className="p-6 border-t border-[#292524] space-y-6 bg-[#1c1917]/50 text-left">
            <p className="text-2xs text-slate-400">
              Quản lý album ảnh cưới sẽ hiển thị ở lưới ảnh chính của thiệp mời
              (không bao gồm 3 ảnh bìa & spotlight ở trên).
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {getAlbumImages().map((imgUrl, idx) => (
                <div
                  key={idx}
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

                  <div className="flex-1 space-y-1 relative">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-bold text-[#c6925c] uppercase">
                        Ảnh cưới {idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeAlbumImage(idx)}
                        className="text-red-500 hover:text-red-400 bg-transparent border-0 cursor-pointer text-3xs font-bold"
                      >
                        Xóa
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="Dán link ảnh cưới..."
                      value={imgUrl}
                      onChange={(e) => updateAlbumImage(idx, e.target.value)}
                      className="w-full bg-transparent border-b border-[#292524] py-1 text-xs text-white outline-none focus:border-[#c6925c] focus:placeholder-transparent"
                    />
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addAlbumImage}
              className="w-full bg-[#c6925c]/10 hover:bg-[#c6925c]/25 border border-[#c6925c]/45 text-[#c6925c] hover:text-white rounded-xl py-3 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer font-sans"
            >
              <Plus size={14} /> Thêm hình ảnh mới vào Album
            </button>
          </div>
        )}
      </div>

      {/* ACCORDION 7: QUÀ MỪNG CƯỚI & TÀI KHOẢN NGÂN HÀNG */}
      <div className="bg-[#1c1917] border border-[#292524] rounded-2xl overflow-hidden shadow-xs">
        <div
          onClick={() => toggleSection("gift")}
          className="flex items-center justify-between p-5 cursor-pointer hover:bg-[#292524]/30 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Gift size={18} className="text-[#c6925c]" />
            <span
              className="text-sm font-semibold tracking-wide text-slate-200"
              style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: "1.1rem",
              }}
            >
              Tài khoản mừng cưới & mã QR
            </span>
          </div>
          <span className="text-xs text-[#c6925c]">
            {openSections.gift ? "▲" : "▼"}
          </span>
        </div>

        {openSections.gift && (
          <div className="p-6 border-t border-[#292524] space-y-6 bg-[#1c1917]/50 text-left">
            <p className="text-2xs text-slate-400 leading-relaxed">
              Nhập thông tin tài khoản ngân hàng của hai bên gia đình để tự động
              kích hoạt mã VietQR mừng cưới cao cấp.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nhà Trai */}
              <div className="p-4 rounded-xl border border-[#292524] bg-[#0c0a09]/40 space-y-3">
                <span className="text-[10px] font-bold text-[#c6925c] uppercase tracking-wider">
                  Mừng cưới nhà trai
                </span>

                <div className="space-y-1.5">
                  <label className="block text-3xs uppercase tracking-wider text-slate-500 font-medium">
                    Tên viết tắt Ngân hàng (vcb, tcb, acb...)
                  </label>
                  <input
                    type="text"
                    placeholder="VD: vcb"
                    value={weddingData.giftInfo?.groomBankName || ""}
                    onChange={(e) =>
                      updateField(
                        ["giftInfo", "groomBankName"],
                        e.target.value.toLowerCase().trim(),
                      )
                    }
                    className="w-full bg-[#0c0a09] border border-[#292524] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#c6925c]"
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
                        e.target.value.trim(),
                      )
                    }
                    className="w-full bg-[#0c0a09] border border-[#292524] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#c6925c]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-3xs uppercase tracking-wider text-slate-500 font-medium">
                    Tên chủ tài khoản (KHÔNG DẤU)
                  </label>
                  <input
                    type="text"
                    placeholder="TÊN CHỦ TÀI KHOẢN KHÔNG DẤU"
                    value={weddingData.giftInfo?.groomAccountName || ""}
                    onChange={(e) =>
                      updateField(
                        ["giftInfo", "groomAccountName"],
                        e.target.value.toUpperCase(),
                      )
                    }
                    className="w-full bg-[#0c0a09] border border-[#292524] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#c6925c]"
                  />
                </div>
              </div>

              {/* Nhà Gái */}
              <div className="p-4 rounded-xl border border-[#292524] bg-[#0c0a09]/40 space-y-3">
                <span className="text-[10px] font-bold text-[#c6925c] uppercase tracking-wider">
                  Mừng cưới nhà gái
                </span>

                <div className="space-y-1.5">
                  <label className="block text-3xs uppercase tracking-wider text-slate-500 font-medium">
                    Tên viết tắt Ngân hàng (vcb, tcb, acb...)
                  </label>
                  <input
                    type="text"
                    placeholder="VD: tcb"
                    value={weddingData.giftInfo?.brideBankName || ""}
                    onChange={(e) =>
                      updateField(
                        ["giftInfo", "brideBankName"],
                        e.target.value.toLowerCase().trim(),
                      )
                    }
                    className="w-full bg-[#0c0a09] border border-[#292524] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#c6925c]"
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
                        e.target.value.trim(),
                      )
                    }
                    className="w-full bg-[#0c0a09] border border-[#292524] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#c6925c]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-3xs uppercase tracking-wider text-slate-500 font-medium">
                    Tên chủ tài khoản (KHÔNG DẤU)
                  </label>
                  <input
                    type="text"
                    placeholder="TÊN CHỦ TÀI KHOẢN KHÔNG DẤU"
                    value={weddingData.giftInfo?.brideAccountName || ""}
                    onChange={(e) =>
                      updateField(
                        ["giftInfo", "brideAccountName"],
                        e.target.value.toUpperCase(),
                      )
                    }
                    className="w-full bg-[#0c0a09] border border-[#292524] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#c6925c]"
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
