"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useInvitationCreate } from "@/views/admin-invitation-create/model/InvitationCreateProvider";
import { API_URL } from "@/shared/lib/config";
import {
  FileText,
  Image as ImageIcon,
  CalendarClock,
  Images,
  MessageSquareHeart,
  UserCheck,
  Gift,
  Settings,
  Share2,
  Upload,
  X,
  Loader2,
  Heart,
  Gem,
  Camera,
  ConciergeBell,
  Cake,
  Music,
  Plus,
  GripVertical,
  Clock,
  Edit2,
  Trash2,
  CloudUpload,
  Info,
  Maximize2,
  Move,
} from "lucide-react";
import { getTemplatePackage } from "@/entities/template/model/registry";

export function InvitationEditorForm() {
  const {
    editorActiveTab,
    setEditorActiveTab,
    basicInfo,
    setBasicInfo,
    events: weddingEvents,
    handleAddEvent: handleAddWeddingEvent,
    handleRemoveEvent: handleRemoveWeddingEvent,
    handleUpdateEvent: handleUpdateWeddingEvent,
    publishSettings,
    story,
    setStory,
    giftInfo,
    setGiftInfo,
    galleryImages,
    setGalleryImages,
    deletedGalleryImages,
    setDeletedGalleryImages,
    activeTemplate,
    timeline,
    setTimeline,
  } = useInvitationCreate();

  const handleRemoveGalleryImage = (urlToRemove: string) => {
    setDeletedGalleryImages((prev: string[]) => {
      if (!prev.includes(urlToRemove)) return [...prev, urlToRemove];
      return prev;
    });
    setGalleryImages((prev: string[]) =>
      prev.filter((img) => img !== urlToRemove),
    );
  };

  const handleAddEvent = () => {
    const newEvent = {
      id: Date.now().toString(),
      time: "12:00",
      title: "Sự kiện mới",
      description: "Mô tả chi tiết sự kiện",
      icon: "Heart",
    };
    setTimeline([...timeline, newEvent]);
  };

  const handleRemoveEvent = (id: string) => {
    setTimeline(timeline.filter((e) => e.id !== id));
  };

  const updateEvent = (id: string, field: string, value: string) => {
    setTimeline(
      timeline.map((e) => (e.id === id ? { ...e, [field]: value } : e)),
    );
  };

  const ICON_LIST = [
    "Heart",
    "Gem",
    "Camera",
    "ConciergeBell",
    "Cake",
    "Music",
    "Gift",
  ];
  const cycleIcon = (id: string, currentIcon: string) => {
    const currentIndex = ICON_LIST.indexOf(currentIcon);
    const nextIndex = (currentIndex + 1) % ICON_LIST.length;
    updateEvent(id, "icon", ICON_LIST[nextIndex]);
  };

  const getIconProps = (iconName: string) => {
    switch (iconName) {
      case "Heart":
        return {
          icon: <Heart size={20} />,
          bg: "bg-rose-50",
          color: "text-rose-500",
        };
      case "Gem":
        return {
          icon: <Gem size={20} />,
          bg: "bg-orange-50",
          color: "text-orange-500",
        };
      case "Camera":
        return {
          icon: <Camera size={20} />,
          bg: "bg-emerald-50",
          color: "text-emerald-500",
        };
      case "ConciergeBell":
        return {
          icon: <ConciergeBell size={20} />,
          bg: "bg-purple-50",
          color: "text-purple-500",
        };
      case "Cake":
        return {
          icon: <Cake size={20} />,
          bg: "bg-blue-50",
          color: "text-blue-500",
        };
      case "Music":
        return {
          icon: <Music size={20} />,
          bg: "bg-pink-50",
          color: "text-pink-500",
        };
      case "Gift":
        return {
          icon: <Gift size={20} />,
          bg: "bg-amber-50",
          color: "text-amber-500",
        };
      default:
        return {
          icon: <Heart size={20} />,
          bg: "bg-rose-50",
          color: "text-rose-500",
        };
    }
  };

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [banks, setBanks] = useState<any[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [customMusicList, setCustomMusicList] = useState<Array<{ name: string; url: string }>>([]);
  const [systemAudioList, setSystemAudioList] = useState<Array<{ name: string; url: string }>>([]);

  useEffect(() => {
    fetch("/api/media/audio")
      .then((res) => res.json())
      .then((res) => {
        if (res.success && Array.isArray(res.data) && res.data.length > 0) {
          setSystemAudioList(res.data);
        }
      })
      .catch((err) => console.error("Lỗi khi tải danh sách nhạc hệ thống:", err));
  }, []);

  useEffect(() => {
    fetch("https://api.vietqr.io/v2/banks")
      .then((res) => res.json())
      .then((data) => {
        if (data.code === "00") {
          setBanks(data.data);
        }
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (banks.length === 0) return;

    setGiftInfo((prev) => {
      let updated = false;
      const next = { ...prev };

      // Groom
      if (
        prev.groomBankName &&
        prev.groomAccountNumber &&
        prev.groomAccountName
      ) {
        const bank = banks.find((b) => b.shortName === prev.groomBankName);
        if (bank) {
          const encodedName = encodeURIComponent(prev.groomAccountName.trim());
          const newUrl = `https://qr.sepay.vn/img?acc=${prev.groomAccountNumber.trim()}&bank=${bank.bin}&name=${encodedName}`;
          if (
            !prev.groomQrUrl ||
            prev.groomQrUrl.includes("img.vietqr.io") ||
            prev.groomQrUrl.includes("qr.sepay.vn")
          ) {
            if (prev.groomQrUrl !== newUrl) {
              next.groomQrUrl = newUrl;
              updated = true;
            }
          }
        }
      } else if (
        prev.groomQrUrl &&
        (prev.groomQrUrl.includes("img.vietqr.io") ||
          prev.groomQrUrl.includes("qr.sepay.vn"))
      ) {
        next.groomQrUrl = "";
        updated = true;
      }

      // Bride
      if (
        prev.brideBankName &&
        prev.brideAccountNumber &&
        prev.brideAccountName
      ) {
        const bank = banks.find((b) => b.shortName === prev.brideBankName);
        if (bank) {
          const encodedName = encodeURIComponent(prev.brideAccountName.trim());
          const newUrl = `https://qr.sepay.vn/img?acc=${prev.brideAccountNumber.trim()}&bank=${bank.bin}&name=${encodedName}`;
          if (
            !prev.brideQrUrl ||
            prev.brideQrUrl.includes("img.vietqr.io") ||
            prev.brideQrUrl.includes("qr.sepay.vn")
          ) {
            if (prev.brideQrUrl !== newUrl) {
              next.brideQrUrl = newUrl;
              updated = true;
            }
          }
        }
      } else if (
        prev.brideQrUrl &&
        (prev.brideQrUrl.includes("img.vietqr.io") ||
          prev.brideQrUrl.includes("qr.sepay.vn"))
      ) {
        next.brideQrUrl = "";
        updated = true;
      }

      return updated ? next : prev;
    });
  }, [
    giftInfo.groomBankName,
    giftInfo.groomAccountNumber,
    giftInfo.groomAccountName,
    giftInfo.brideBankName,
    giftInfo.brideAccountNumber,
    giftInfo.brideAccountName,
    banks,
    setGiftInfo,
  ]);

  const getTargetSlug = () => publishSettings?.urlSlug || (basicInfo as any)?.slug;

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "groomQrUrl" | "brideQrUrl",
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("type", "qr");
        const slug = getTargetSlug();
        if (slug) {
          formData.append("slug", slug);
        }

        const res = await fetch(`${API_URL}/api/media/upload`, {
          method: "POST",
          body: formData,
          credentials: "include",
        });

        if (res.ok) {
          const result = await res.json();
          const uploadedUrl = result.data?.url || result.url;
          if (uploadedUrl) {
            setGiftInfo({ ...giftInfo, [field]: uploadedUrl });
          }
        }
      } catch (error) {
        console.error("Upload failed", error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleGalleryUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setIsUploading(true);
      try {
        const uploadedUrls: string[] = [];
        for (const file of files) {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("type", "gallery");
          const slug = getTargetSlug();
          if (slug) {
            formData.append("slug", slug);
          }

          const res = await fetch(`${API_URL}/api/media/upload`, {
            method: "POST",
            body: formData,
            credentials: "include",
          });

          if (res.ok) {
            const result = await res.json();
            const url = result.data?.url || result.url;
            if (url) {
              uploadedUrls.push(url);
            }
          }
        }
        setGalleryImages((prev) => [...prev, ...uploadedUrls]);
      } catch (error) {
        console.error("Upload failed", error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleAudioUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("type", "audio");
        const slug = getTargetSlug();
        if (slug) {
          formData.append("slug", slug);
        }

        const res = await fetch(`${API_URL}/api/media/upload`, {
          method: "POST",
          body: formData,
          credentials: "include",
        });

        if (res.ok) {
          const result = await res.json();
          const uploadedUrl = result.data?.url || result.url;
          if (uploadedUrl) {
            const songName = file.name ? `🎵 ${file.name}` : "🎵 Nhạc cá nhân vừa tải";
            setCustomMusicList((prev) => {
              if (prev.some((item) => item.url === uploadedUrl)) return prev;
              return [{ name: songName, url: uploadedUrl }, ...prev];
            });
            setBasicInfo({ ...basicInfo, musicUrl: uploadedUrl });
          }
        }
      } catch (error) {
        console.error("Audio upload failed", error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleCoverImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("type", "image");
        const slug = getTargetSlug();
        if (slug) {
          formData.append("slug", slug);
        }

        const res = await fetch(`${API_URL}/api/media/upload`, {
          method: "POST",
          body: formData,
          credentials: "include",
        });

        if (res.ok) {
          const result = await res.json();
          const uploadedUrl = result.data?.url || result.url;
          if (uploadedUrl) {
            setBasicInfo({ ...basicInfo, coverImage: uploadedUrl });
          }
        }
      } catch (error) {
        console.error("Cover image upload failed", error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const templatePackage = getTemplatePackage(
    activeTemplate?.code || "minimal-green",
  );
  const schema = templatePackage.config.schema;

  const defaultPresetMusic = [
    { name: "Chỉ Cần Có Nhau", url: "/audio/Chỉ Cần Có Nhau.mp3" },
    { name: "Lễ Đường", url: "/audio/Lễ Đường.mp3" },
    { name: "Một Đời", url: "/audio/một đời.mp3" },
    { name: "River Flows In You - Yiruma", url: "/audio/RiverFlowsInYou.mp3" },
  ];

  const PRESET_MUSIC = [
    { name: "-- Chọn bài hát từ thư viện --", url: "" },
    ...(systemAudioList.length > 0 ? systemAudioList : defaultPresetMusic),
  ];

  const MENU_ITEMS = [
    { id: "Thông tin cơ bản", icon: FileText, alwaysShow: true },
    { id: "Ảnh & Video", icon: ImageIcon, alwaysShow: true },
    {
      id: "Timeline sự kiện",
      icon: CalendarClock,
      isEnabled: schema.timeline.enabled,
    },
    { id: "Album ảnh", icon: Images, isEnabled: schema.gallery.maxImages > 0 },
    {
      id: "Lời ngỏ",
      icon: MessageSquareHeart,
      isEnabled: schema.story?.enabled !== false,
    },
    { id: "RSVP", icon: UserCheck, isEnabled: schema.rsvp?.enabled !== false },
    { id: "Quà mừng", icon: Gift, isEnabled: schema.gift?.enabled !== false },
    { id: "Thiết lập khác", icon: Settings, alwaysShow: true },
    { id: "SEO & Chia sẻ", icon: Share2, alwaysShow: true },
  ];

  const visibleTabs = MENU_ITEMS.filter(
    (item) => item.alwaysShow || item.isEnabled,
  );

  // Auto reset active tab if current tab is hidden
  useEffect(() => {
    if (!visibleTabs.find((tab) => tab.id === editorActiveTab)) {
      setEditorActiveTab("Thông tin cơ bản");
    }
  }, [activeTemplate, editorActiveTab, setEditorActiveTab, visibleTabs]);

  return (
    <div className="flex w-full h-full">
      {/* Sidebar Menu */}
      <div className="w-[180px] bg-slate-50 border-r border-slate-200 flex flex-col py-4 shrink-0 overflow-y-auto custom-scrollbar">
        {visibleTabs.map((item) => {
          const Icon = item.icon;
          const isActive = editorActiveTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setEditorActiveTab(item.id)}
              className={`flex items-center gap-3 px-4 py-3 text-[13px] font-medium transition-colors relative ${
                isActive
                  ? "text-rose-600 bg-rose-50/50"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/50"
              }`}
            >
              <Icon
                size={16}
                className={isActive ? "text-rose-500" : "text-slate-400"}
              />
              {item.id}
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-rose-500 rounded-r"></div>
              )}
            </button>
          );
        })}
      </div>

      {/* Form Area */}
      <div className="flex-1 flex flex-col bg-white overflow-y-auto custom-scrollbar p-6">
        <h3 className="text-lg font-bold text-slate-800 mb-6">
          {editorActiveTab}
        </h3>

        {editorActiveTab === "Thông tin cơ bản" && (
          <div className="space-y-6">
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-slate-700">
                Họ tên cô dâu chú rể
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-500 mb-1.5">
                    Tên chú rể
                  </label>
                  <input
                    type="text"
                    value={basicInfo.groomName}
                    onChange={(e) =>
                      setBasicInfo({ ...basicInfo, groomName: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1.5">
                    Tên cô dâu
                  </label>
                  <input
                    type="text"
                    value={basicInfo.brideName}
                    onChange={(e) =>
                      setBasicInfo({ ...basicInfo, brideName: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                  />
                </div>
              </div>

              {/* Tên cha mẹ cô dâu chú rể */}
              {schema.basicInfo?.hasParentsInfo && (
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs text-slate-500 mb-1.5">
                        Ông (Bố chú rể)
                      </label>
                      <input
                        type="text"
                        value={basicInfo.groomFatherName || ""}
                        onChange={(e) =>
                          setBasicInfo({
                            ...basicInfo,
                            groomFatherName: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                        placeholder="Nguyễn Văn A"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-500 mb-1.5">
                        Bà (Mẹ chú rể)
                      </label>
                      <input
                        type="text"
                        value={basicInfo.groomMotherName || ""}
                        onChange={(e) =>
                          setBasicInfo({
                            ...basicInfo,
                            groomMotherName: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                        placeholder="Trần Thị B"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs text-slate-500 mb-1.5">
                        Ông (Bố cô dâu)
                      </label>
                      <input
                        type="text"
                        value={basicInfo.brideFatherName || ""}
                        onChange={(e) =>
                          setBasicInfo({
                            ...basicInfo,
                            brideFatherName: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                        placeholder="Lê Văn C"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-500 mb-1.5">
                        Bà (Mẹ cô dâu)
                      </label>
                      <input
                        type="text"
                        value={basicInfo.brideMotherName || ""}
                        onChange={(e) =>
                          setBasicInfo({
                            ...basicInfo,
                            brideMotherName: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                        placeholder="Phạm Thị D"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Thứ bậc */}
              {schema.basicInfo?.hasRankInfo && (
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-xs text-slate-500 mb-1.5">
                      Thứ bậc chú rể
                    </label>
                    <input
                      type="text"
                      value={basicInfo.groomRank || ""}
                      onChange={(e) =>
                        setBasicInfo({
                          ...basicInfo,
                          groomRank: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                      placeholder="VD: Trưởng nam"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1.5">
                      Thứ bậc cô dâu
                    </label>
                    <input
                      type="text"
                      value={basicInfo.brideRank || ""}
                      onChange={(e) =>
                        setBasicInfo({
                          ...basicInfo,
                          brideRank: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                      placeholder="VD: Út nữ"
                    />
                  </div>
                </div>
              )}
              {/* Địa chỉ hai nhà */}
              {schema.basicInfo?.hasAddressInfo && (
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-xs text-slate-500 mb-1.5">
                      Địa chỉ nhà nam
                    </label>
                    <input
                      type="text"
                      value={basicInfo.groomAddress || ""}
                      onChange={(e) =>
                        setBasicInfo({
                          ...basicInfo,
                          groomAddress: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                      placeholder="Số nhà, đường, phường, quận..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1.5">
                      Địa chỉ nhà nữ
                    </label>
                    <input
                      type="text"
                      value={basicInfo.brideAddress || ""}
                      onChange={(e) =>
                        setBasicInfo({
                          ...basicInfo,
                          brideAddress: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                      placeholder="Số nhà, đường, phường, quận..."
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Thông tin Lễ & Tiệc Cưới (Multi-event Card Editor) */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h4 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <CalendarClock size={16} className="text-rose-500" />
                  Thông tin Lễ & Tiệc Cưới (Nhiều sự kiện)
                </h4>
                <div className="flex gap-1.5 flex-wrap">
                  <button
                    type="button"
                    onClick={() => handleAddWeddingEvent("LỄ TIỆC CƯỚI")}
                    className="px-2 py-1 bg-rose-50 text-rose-600 border border-rose-200 rounded-lg text-xs font-semibold hover:bg-rose-100 transition-colors"
                  >
                    + Lễ Tiệc Cưới
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAddWeddingEvent("LỄ THÀNH HÔN")}
                    className="px-2 py-1 bg-blue-50 text-blue-600 border border-blue-200 rounded-lg text-xs font-semibold hover:bg-blue-100 transition-colors"
                  >
                    + Lễ Thành Hôn
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAddWeddingEvent("LỄ VU QUY")}
                    className="px-2 py-1 bg-amber-50 text-amber-600 border border-amber-200 rounded-lg text-xs font-semibold hover:bg-amber-100 transition-colors"
                  >
                    + Lễ Vu Quy
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {weddingEvents.map((event, index) => {
                  const eventId = event.id || String(index);
                  return (
                    <div
                      key={eventId}
                      className="p-4 border border-slate-200 rounded-2xl bg-slate-50/80 space-y-3 relative shadow-sm"
                    >
                      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                        <span className="font-bold text-xs text-slate-800 flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-rose-600 text-white text-[11px] flex items-center justify-center font-bold">
                            {index + 1}
                          </span>
                          {event.title || `Sự kiện ${index + 1}`}
                        </span>
                        {weddingEvents.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveWeddingEvent(eventId)}
                            className="text-red-500 hover:text-red-700 text-xs font-medium flex items-center gap-1 cursor-pointer border-0 bg-transparent"
                          >
                            <Trash2 size={13} /> Xóa sự kiện
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                            Tiêu đề lễ
                          </label>
                          <input
                            type="text"
                            value={event.title}
                            onChange={(e) => handleUpdateWeddingEvent(eventId, "title", e.target.value)}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs outline-none focus:border-rose-500 bg-white"
                            placeholder="LỄ TIỆC CƯỚI / LỄ THÀNH HÔN..."
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                            Giờ tổ chức
                          </label>
                          <input
                            type="text"
                            value={event.time}
                            onChange={(e) => handleUpdateWeddingEvent(eventId, "time", e.target.value)}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs outline-none focus:border-rose-500 bg-white"
                            placeholder="11:00 AM"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                          Ngày tổ chức
                        </label>
                        <input
                          type="date"
                          value={event.date}
                          onChange={(e) => handleUpdateWeddingEvent(eventId, "date", e.target.value)}
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs outline-none focus:border-rose-500 bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                          Tên địa điểm / Nhà hàng
                        </label>
                        <input
                          type="text"
                          value={event.locationName}
                          onChange={(e) => handleUpdateWeddingEvent(eventId, "locationName", e.target.value)}
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs outline-none focus:border-rose-500 bg-white"
                          placeholder="Trung tâm hội nghị tiệc cưới Ninh Bình Legend..."
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                          Địa chỉ chi tiết
                        </label>
                        <input
                          type="text"
                          value={event.address}
                          onChange={(e) => handleUpdateWeddingEvent(eventId, "address", e.target.value)}
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs outline-none focus:border-rose-500 bg-white"
                          placeholder="177 Đ. Lê Thái Tổ, Khu Đô Thị Xuân Thành, Hoa Lư..."
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                          Link Google Maps chỉ đường (Tuỳ chọn)
                        </label>
                        <input
                          type="text"
                          value={event.mapUrl || ""}
                          onChange={(e) => handleUpdateWeddingEvent(eventId, "mapUrl", e.target.value)}
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs outline-none focus:border-rose-500 bg-white"
                          placeholder="https://maps.google.com/..."
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-slate-700">Nhạc nền</h4>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">
                  Link nhạc nền (tuỳ chọn)
                </label>

                {(() => {
                  const allMusicOptions = [...PRESET_MUSIC, ...customMusicList];
                  if (
                    basicInfo.musicUrl &&
                    !allMusicOptions.some((m) => m.url === basicInfo.musicUrl)
                  ) {
                    const rawFileName = basicInfo.musicUrl.split("/").pop()?.split("?")[0] || "File nhạc";
                    const cleanName = decodeURIComponent(rawFileName);
                    allMusicOptions.push({
                      name: `🎵 Nhạc đã tải lên (${cleanName})`,
                      url: basicInfo.musicUrl,
                    });
                  }

                  return (
                    <div className="mb-3">
                      <select
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-rose-500 bg-white cursor-pointer"
                        onChange={(e) => {
                          setBasicInfo({
                            ...basicInfo,
                            musicUrl: e.target.value,
                          });
                        }}
                        value={basicInfo.musicUrl || ""}
                      >
                        {allMusicOptions.map((song, idx) => (
                          <option key={idx} value={song.url}>
                            {song.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  );
                })()}

                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={basicInfo.musicUrl || ""}
                    onChange={(e) =>
                      setBasicInfo({
                        ...basicInfo,
                        musicUrl: e.target.value,
                      })
                    }
                    placeholder="VD: /audio/wedding-song.mp3 hoặc dán link nhạc..."
                    className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                  />
                  <div className="relative shrink-0">
                    <button
                      type="button"
                      disabled={isUploading}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
                    >
                      {isUploading ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <Upload size={16} />
                      )}
                      Tải lên
                    </button>
                    <input
                      type="file"
                      accept="audio/mpeg, audio/mp3, audio/wav"
                      onChange={handleAudioUpload}
                      disabled={isUploading}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      title="Tải file nhạc lên"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {editorActiveTab === "Lời ngỏ" && (
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-slate-700">
              Lời ngỏ / Story
            </h4>
            <textarea
              rows={8}
              value={story}
              onChange={(e) => setStory(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 resize-none"
              placeholder="Nhập lời ngỏ..."
            />
            <p className="text-xs text-slate-500">
              Lời ngỏ sẽ được hiển thị ở phần đầu thiệp cưới của bạn.
            </p>
          </div>
        )}

        {editorActiveTab === "Quà mừng" && (
          <div className="space-y-6">
            <h4 className="text-sm font-semibold text-slate-700">
              Thông tin nhận quà mừng (Chuyển khoản)
            </h4>

            {/* Mừng cưới chú rể */}
            <div className="p-4 border border-slate-200 rounded-xl space-y-4">
              <h5 className="text-sm font-bold text-slate-800">
                Mừng cưới Nhà trai (Chú rể)
              </h5>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-500 mb-1.5">
                    Ngân hàng
                  </label>
                  <select
                    value={giftInfo.groomBankName || ""}
                    onChange={(e) =>
                      setGiftInfo({
                        ...giftInfo,
                        groomBankName: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 bg-white"
                  >
                    <option value="">Chọn ngân hàng</option>
                    {banks.map((bank, idx) => (
                      <option key={`groom-bank-${idx}`} value={bank.shortName}>
                        {bank.shortName} - {bank.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1.5">
                    Tên chủ tài khoản
                  </label>
                  <input
                    type="text"
                    value={giftInfo.groomAccountName || ""}
                    onChange={(e) =>
                      setGiftInfo({
                        ...giftInfo,
                        groomAccountName: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                    placeholder="VD: NGUYEN VAN A"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1.5">
                    Số tài khoản
                  </label>
                  <input
                    type="text"
                    value={giftInfo.groomAccountNumber || ""}
                    onChange={(e) =>
                      setGiftInfo({
                        ...giftInfo,
                        groomAccountNumber: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                    placeholder="Nhập số tài khoản"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs text-slate-500 mb-1.5">
                    Ảnh mã QR
                  </label>
                  {giftInfo.groomQrUrl ? (
                    <div
                      className="relative w-32 h-32 border border-slate-200 rounded-lg overflow-hidden group cursor-pointer"
                      onClick={() =>
                        setPreviewImage(giftInfo.groomQrUrl || null)
                      }
                    >
                      <img
                        src={giftInfo.groomQrUrl}
                        alt="QR Code"
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setGiftInfo({ ...giftInfo, groomQrUrl: "" });
                        }}
                        className="absolute top-1 right-1 p-1 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <div className="relative w-32 h-32 border-2 border-dashed border-slate-200 rounded-lg flex flex-col items-center justify-center text-slate-400 hover:border-rose-400 hover:text-rose-500 transition-colors cursor-pointer bg-slate-50">
                      {isUploading ? (
                        <Loader2 size={24} className="mb-2 animate-spin" />
                      ) : (
                        <Upload size={24} className="mb-2" />
                      )}
                      <span className="text-xs font-medium">
                        {isUploading ? "Đang tải..." : "Tải ảnh lên"}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={(e) => handleImageUpload(e, "groomQrUrl")}
                        disabled={isUploading}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Mừng cưới cô dâu */}
            <div className="p-4 border border-slate-200 rounded-xl space-y-4 mt-6">
              <h5 className="text-sm font-bold text-slate-800">
                Mừng cưới Nhà gái (Cô dâu)
              </h5>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-500 mb-1.5">
                    Ngân hàng
                  </label>
                  <select
                    value={giftInfo.brideBankName || ""}
                    onChange={(e) =>
                      setGiftInfo({
                        ...giftInfo,
                        brideBankName: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 bg-white"
                  >
                    <option value="">Chọn ngân hàng</option>
                    {banks.map((bank, idx) => (
                      <option key={`bride-bank-${idx}`} value={bank.shortName}>
                        {bank.shortName} - {bank.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1.5">
                    Tên chủ tài khoản
                  </label>
                  <input
                    type="text"
                    value={giftInfo.brideAccountName || ""}
                    onChange={(e) =>
                      setGiftInfo({
                        ...giftInfo,
                        brideAccountName: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                    placeholder="VD: NGUYEN THI B"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1.5">
                    Số tài khoản
                  </label>
                  <input
                    type="text"
                    value={giftInfo.brideAccountNumber || ""}
                    onChange={(e) =>
                      setGiftInfo({
                        ...giftInfo,
                        brideAccountNumber: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                    placeholder="Nhập số tài khoản"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs text-slate-500 mb-1.5">
                    Ảnh mã QR
                  </label>
                  {giftInfo.brideQrUrl ? (
                    <div
                      className="relative w-32 h-32 border border-slate-200 rounded-lg overflow-hidden group cursor-pointer"
                      onClick={() =>
                        setPreviewImage(giftInfo.brideQrUrl || null)
                      }
                    >
                      <img
                        src={giftInfo.brideQrUrl}
                        alt="QR Code"
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setGiftInfo({ ...giftInfo, brideQrUrl: "" });
                        }}
                        className="absolute top-1 right-1 p-1 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <div className="relative w-32 h-32 border-2 border-dashed border-slate-200 rounded-lg flex flex-col items-center justify-center text-slate-400 hover:border-rose-400 hover:text-rose-500 transition-colors cursor-pointer bg-slate-50">
                      {isUploading ? (
                        <Loader2 size={24} className="mb-2 animate-spin" />
                      ) : (
                        <Upload size={24} className="mb-2" />
                      )}
                      <span className="text-xs font-medium">
                        {isUploading ? "Đang tải..." : "Tải ảnh lên"}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={(e) => handleImageUpload(e, "brideQrUrl")}
                        disabled={isUploading}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {editorActiveTab === "Album ảnh" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-slate-700">
                Thư viện ảnh ({galleryImages.length} ảnh)
              </h4>

              <div className="relative">
                <button
                  className={`flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg text-sm font-semibold transition-colors ${isUploading ? "opacity-70 cursor-not-allowed" : ""}`}
                >
                  {isUploading ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Upload size={16} />
                  )}
                  <span>{isUploading ? "Đang tải..." : "Tải ảnh lên"}</span>
                </button>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed"
                  onChange={handleGalleryUpload}
                  disabled={isUploading}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {galleryImages.map((img, idx) => (
                <div
                  key={img}
                  className="relative aspect-square rounded-xl overflow-hidden group border border-slate-200"
                >
                  <img
                    src={img}
                    alt={`Gallery ${idx}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      onClick={() => handleRemoveGalleryImage(img)}
                      className="p-2 bg-white/20 hover:bg-rose-500 text-white rounded-full backdrop-blur-sm transition-colors"
                      title="Xóa ảnh này"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ))}

              {galleryImages.length === 0 && (
                <div className="col-span-3 py-12 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-xl text-slate-400 bg-slate-50">
                  <Images size={32} className="mb-3 text-slate-300" />
                  <p className="text-sm font-medium">
                    Chưa có ảnh nào trong thư viện
                  </p>
                  <p className="text-xs mt-1">
                    Nhấn nút "Tải ảnh lên" để thêm ảnh vào thiệp
                  </p>
                </div>
              )}
            </div>
            <p className="text-xs text-slate-500">
              * Gợi ý: Nên chọn ảnh chất lượng cao và có tỷ lệ đồng đều (tốt
              nhất là dọc hoặc vuông) để giao diện hiển thị đẹp nhất.
            </p>
          </div>
        )}

        {editorActiveTab === "Timeline sự kiện" && (
          <div className="space-y-6">
            <div className="mb-2">
              <h3 className="text-xl font-bold text-slate-800 mb-2">
                Timeline sự kiện
              </h3>
              <p className="text-sm text-slate-500">
                Thêm và chỉnh sửa các mốc sự kiện trong ngày trọng đại của bạn
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h4 className="text-sm font-bold text-slate-800">
                    Danh sách sự kiện
                  </h4>
                </div>
                <button
                  onClick={handleAddEvent}
                  className="flex items-center space-x-1.5 px-3 py-1.5 bg-rose-50 text-rose-600 rounded-lg text-sm font-medium hover:bg-rose-100 transition-colors"
                >
                  <Plus size={16} />
                  <span>Thêm sự kiện</span>
                </button>
              </div>

              <div className="space-y-4">
                {timeline.map((event, index) => {
                  const { icon, bg, color } = getIconProps(event.icon);
                  return (
                    <div
                      key={event.id}
                      className="flex items-center space-x-4 p-4 border border-slate-100 bg-slate-50/50 shadow-sm rounded-xl hover:border-slate-200 transition-colors group relative"
                    >
                      <button
                        onClick={() => cycleIcon(event.id, event.icon)}
                        className={`flex-shrink-0 w-12 h-12 rounded-full ${bg} flex items-center justify-center ${color} hover:opacity-80 transition-opacity cursor-pointer`}
                        title="Click để đổi icon"
                      >
                        {icon}
                      </button>

                      <div className="flex-1 grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-8 bg-white border border-slate-200 rounded-lg p-2 space-y-1">
                          <input
                            className="font-bold text-sm text-slate-800 w-full outline-none border-b border-transparent focus:border-slate-300 bg-transparent px-1 placeholder-slate-400"
                            value={event.title}
                            onChange={(e) =>
                              updateEvent(event.id, "title", e.target.value)
                            }
                            placeholder="Tên sự kiện"
                          />
                          <input
                            className="text-xs text-slate-500 w-full outline-none border-b border-transparent focus:border-slate-300 bg-transparent px-1 placeholder-slate-300"
                            value={event.description}
                            onChange={(e) =>
                              updateEvent(
                                event.id,
                                "description",
                                e.target.value,
                              )
                            }
                            placeholder="Mô tả chi tiết sự kiện (không bắt buộc)"
                          />
                        </div>
                        <div className="col-span-4 h-full">
                          <div className="bg-white border border-slate-200 rounded-lg p-2 h-full flex flex-col justify-center">
                            <div className="text-[10px] text-slate-400 mb-1 font-medium uppercase tracking-wider">
                              Thời gian
                            </div>
                            <div className="flex items-center space-x-2">
                              <input
                                type="time"
                                className="text-sm font-semibold text-slate-700 w-full bg-transparent outline-none cursor-pointer"
                                value={event.time}
                                onChange={(e) =>
                                  updateEvent(event.id, "time", e.target.value)
                                }
                              />
                              <Clock size={14} className="text-slate-400" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Nút X nổi lên bề mặt ở góc trên bên phải */}
                      <button
                        onClick={() => handleRemoveEvent(event.id)}
                        className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-white border border-slate-200 text-slate-400 hover:text-rose-600 shadow-sm hover:shadow flex items-center justify-center transition-all cursor-pointer z-10 opacity-0 group-hover:opacity-100"
                        title="Xóa sự kiện"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-start space-x-3 p-4 bg-blue-50/50 text-blue-700 rounded-xl mt-6 border border-blue-100">
                <div className="mt-0.5">
                  <div className="w-4 h-4 rounded-full border border-blue-500 flex items-center justify-center text-[10px] font-bold">
                    i
                  </div>
                </div>
                <div className="text-sm">
                  <strong>Hướng dẫn:</strong> Kéo thả để sắp xếp thứ tự các sự
                  kiện. Thời gian sẽ hiển thị theo thứ tự từ trên xuống trong
                  thiệp cưới. <br />
                  <span className="text-xs text-blue-500 mt-1 inline-block">
                    Mẹo: Click vào biểu tượng tròn để đổi icon sự kiện.
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other tabs can be implemented similarly... */}
        {editorActiveTab === "Ảnh & Video" && (
          <div className="p-8 max-w-2xl">
            <div className="mb-8">
              <h3 className="text-lg font-bold text-slate-800">Ảnh & Video</h3>
              <p className="text-sm text-slate-500 mt-1">
                Thêm và quản lý hình ảnh, video hiển thị trên thiệp cưới
              </p>
            </div>

            {/* Cấu hình Ảnh Bìa */}
            {schema.cover?.hasCoverImage && (
              <div className="mb-10">
                <div className="mb-4 flex flex-col">
                  <h4 className="text-sm font-bold text-slate-800">
                    Ảnh bìa (Hero Image)
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Ảnh bìa sẽ hiển thị ở phần đầu của thiệp cưới
                  </p>
                </div>

                <div className="flex gap-4">
                  {basicInfo.coverImage ? (
                    <div className="w-[200px] h-[220px] rounded-xl overflow-hidden border border-slate-200 shadow-sm relative group">
                      <img
                        src={basicInfo.coverImage}
                        className="w-full h-full object-cover"
                        alt="Cover Image"
                      />
                      <button
                        onClick={() =>
                          setPreviewImage(basicInfo.coverImage || null)
                        }
                        className="absolute bottom-2 right-2 p-1.5 bg-black/40 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60 backdrop-blur-sm"
                      >
                        <Maximize2 size={14} />
                      </button>
                      <button
                        onClick={() =>
                          setBasicInfo({ ...basicInfo, coverImage: "" })
                        }
                        className="absolute top-2 right-2 p-1.5 bg-black/40 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-500 backdrop-blur-sm"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ) : (
                    <div className="w-[200px] h-[220px] rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-center text-slate-300">
                      <ImageIcon size={48} strokeWidth={1} />
                    </div>
                  )}

                  <div
                    className={`w-[200px] h-[220px] border-2 border-dashed border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/30 transition-all rounded-xl flex flex-col items-center justify-center p-4 text-center relative ${basicInfo.coverImage ? "opacity-40 hover:opacity-100" : ""}`}
                  >
                    <div className="w-12 h-12 bg-white border border-slate-100 shadow-sm rounded-full flex items-center justify-center text-slate-600 mb-4">
                      {isUploading ? (
                        <Loader2
                          size={20}
                          className="animate-spin text-indigo-500"
                        />
                      ) : (
                        <CloudUpload size={20} />
                      )}
                    </div>
                    <h5 className="text-[13px] font-bold text-slate-800 mb-1">
                      Thay đổi ảnh bìa
                    </h5>
                    <p className="text-[11px] text-slate-500 mb-2 leading-relaxed">
                      Định dạng: JPG,
                      <br />
                      PNG, WebP
                    </p>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Kích thước khuyến
                      <br />
                      nghị: 1920x1080px
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleCoverImageUpload}
                      disabled={isUploading}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Ảnh & Video nổi bật */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-800">
                    Ảnh & Video nổi bật
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Hiển thị trên trang chủ của thiệp cưới
                  </p>
                </div>
                <div className="relative">
                  <button
                    disabled={isUploading}
                    className={`flex items-center justify-center gap-2 px-6 py-2.5 bg-rose-50 text-rose-600 rounded-xl text-sm font-bold transition-colors ${isUploading ? "opacity-70 cursor-not-allowed" : "hover:bg-rose-100"}`}
                  >
                    {isUploading ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Plus size={16} />
                    )}
                    Thêm ảnh / video
                  </button>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleGalleryUpload}
                    disabled={isUploading}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {galleryImages.map((img, idx) => (
                  <div
                    key={img}
                    className="bg-white border border-slate-200 rounded-xl overflow-hidden group shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="aspect-[4/3] relative bg-slate-100">
                      <img
                        src={img}
                        className="w-full h-full object-cover"
                        alt={`Gallery ${idx}`}
                      />
                      <div className="absolute top-2 right-2 flex gap-1">
                        <button className="p-1.5 bg-black/40 text-white rounded-md hover:bg-black/60 transition-colors backdrop-blur-sm cursor-grab active:cursor-grabbing">
                          <Move size={14} />
                        </button>
                      </div>
                      {idx === 0 &&
                        schema.cover?.hasCoverImage &&
                        !basicInfo.coverImage && (
                          <div className="absolute top-2 left-2 px-2 py-0.5 bg-rose-500 text-white text-[10px] font-bold rounded">
                            Ảnh bìa
                          </div>
                        )}
                    </div>
                    <div className="p-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-slate-700">
                          Ảnh {idx + 1}
                        </span>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="relative">
                            <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md">
                              <Edit2 size={14} />
                            </button>
                          </div>
                          <button
                            onClick={() => handleRemoveGalleryImage(img)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-400">
                        1920 x 1280 • 2.0 MB
                      </span>
                    </div>
                  </div>
                ))}

                {galleryImages.length === 0 && (
                  <div className="col-span-full py-12 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-xl text-slate-400 bg-slate-50/50">
                    <ImageIcon
                      size={40}
                      className="mb-3 text-slate-300"
                      strokeWidth={1}
                    />
                    <p className="text-[13px] font-medium text-slate-500">
                      Chưa có ảnh/video nào
                    </p>
                    <p className="text-[12px] mt-1 text-slate-400">
                      Nhấn nút "Thêm ảnh / video" để tải lên
                    </p>
                  </div>
                )}
              </div>

              <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 flex gap-3">
                <div className="mt-0.5">
                  <div className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <Info size={12} />
                  </div>
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-blue-800 mb-1">
                    Hướng dẫn
                  </h5>
                  <ul className="text-xs text-blue-700 list-disc list-inside space-y-1">
                    <li>
                      Ảnh sẽ hiển thị theo thứ tự từ trái sang phải, từ trên
                      xuống dưới.
                    </li>
                    <li>Kéo thả để thay đổi thứ tự hiển thị.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {editorActiveTab !== "Thông tin cơ bản" &&
          editorActiveTab !== "Lời ngỏ" &&
          editorActiveTab !== "Quà mừng" &&
          editorActiveTab !== "Album ảnh" &&
          editorActiveTab !== "Timeline sự kiện" &&
          editorActiveTab !== "Ảnh & Video" && (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400 text-sm">
              <p>Đang xây dựng nội dung cho tab này...</p>
            </div>
          )}
      </div>

      {/* Modal Phóng to Ảnh */}
      {previewImage &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setPreviewImage(null)}
          >
            <div
              className="relative flex items-center justify-center max-w-md w-full animate-in fade-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={previewImage}
                alt="Preview Fullscreen"
                className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl object-contain bg-white"
              />
              <button
                onClick={() => setPreviewImage(null)}
                className="absolute -top-4 -right-4 p-2 bg-white text-slate-800 rounded-full hover:bg-slate-200 transition-colors shadow-lg"
              >
                <X size={20} />
              </button>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
