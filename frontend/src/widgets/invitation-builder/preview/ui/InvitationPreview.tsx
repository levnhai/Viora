"use client";

import { useInvitationCreate } from "@/views/admin";
import { getTemplatePackage } from "@/widgets/invitation-renderer";
import { WeddingData } from "@/entities/invitation/model/types";

interface InvitationPreviewProps {
  deviceMode?: "mobile" | "desktop";
}

export function InvitationPreview({ deviceMode = "mobile" }: InvitationPreviewProps) {
  const { basicInfo, events, activeTemplate, templateId, giftInfo, galleryImages, timeline, story } = useInvitationCreate();

  const resolvedTemplateCode =
    activeTemplate?.code ||
    (typeof (activeTemplate as any)?.id === "number" ? `temp_${(activeTemplate as any).id}` : "") ||
    (templateId ? (templateId.startsWith("temp_") ? templateId : `temp_${templateId}`) : "") ||
    "temp_15";

  const templatePackage = getTemplatePackage(resolvedTemplateCode);
  const SelectedLiveView = templatePackage.LiveView;

  // Mock data for empty state
  const mockGalleryImages = [
    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=800&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=800&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&h=800&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=600&h=800&fit=crop&auto=format"
  ];
  const mockCoverImage = "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=800&fit=crop&auto=format";

  // Transform basicInfo to WeddingData format for the LiveView
  const dummyWeddingData: WeddingData = {
    slug: "preview",
    templateId: resolvedTemplateCode,
    groomName: basicInfo.groomName || "Minh Quân",
    brideName: basicInfo.brideName || "Thu Hà",
    groomFatherName: basicInfo.groomFatherName ?? "",
    groomMotherName: basicInfo.groomMotherName ?? "",
    brideFatherName: basicInfo.brideFatherName ?? "",
    brideMotherName: basicInfo.brideMotherName ?? "",
    groomRank: basicInfo.groomRank || "Trưởng nam",
    brideRank: basicInfo.brideRank || "Út nữ",
    groomAddress: basicInfo.groomAddress || "Hà Nội",
    brideAddress: basicInfo.brideAddress || "Ninh Bình",
    giftInfo: {
      groomBankName: giftInfo.groomBankName || "",
      groomAccountNumber: giftInfo.groomAccountNumber || "",
      groomAccountName: giftInfo.groomAccountName || "",
      groomQrUrl: giftInfo.groomQrUrl || "",
      brideBankName: giftInfo.brideBankName || "",
      brideAccountNumber: giftInfo.brideAccountNumber || "",
      brideAccountName: giftInfo.brideAccountName || "",
      brideQrUrl: giftInfo.brideQrUrl || "",
    },
    galleryImages: galleryImages.length > 0 ? galleryImages : mockGalleryImages,
    weddingDate: basicInfo.weddingDate || "2026-12-31",
    weddingTime: basicInfo.weddingTime || "11:00 AM",
    musicUrl: basicInfo.musicUrl,
    story: story,
    events: events && events.length > 0 ? events : [
      {
        id: "evt_preview_1",
        title: "LỄ TIỆC CƯỚI",
        time: basicInfo.weddingTime || "11:00 AM",
        date: basicInfo.weddingDate || "2026-12-31",
        locationName: basicInfo.locationName || "TRUNG TÂM HỘI NGHỊ TIỆC CƯỚI NINH BÌNH LEGEND",
        address: basicInfo.address || "177 Đ. Lê Thái Tổ, Khu Đô Thị Xuân Thành, Hoa Lư, Ninh Bình",
        mapUrl: basicInfo.mapLink || "",
      },
    ],
    timeline: timeline.length > 0 ? timeline.map((t, index) => ({
      year: t.time,
      title: t.title,
      description: t.description,
      imageUrl: mockGalleryImages[index % mockGalleryImages.length],
    })) : [
      { year: "09:00", title: "Lễ Đón Dâu", description: "Tại tư gia nhà gái" },
      { year: "11:00", title: "Tiệc Cưới", description: "Khai tiệc mừng hạnh phúc" },
    ],
    coverImage: basicInfo.coverImage || (galleryImages.length > 0 ? galleryImages[0] : mockCoverImage),
    groomImage: galleryImages.length > 2 ? galleryImages[1] : (galleryImages.length > 0 ? galleryImages[0] : undefined),
    brideImage: galleryImages.length > 2 ? galleryImages[2] : (galleryImages.length > 1 ? galleryImages[1] : (galleryImages.length > 0 ? galleryImages[0] : undefined)),
    templateConfig: {
      coverImage: basicInfo.coverImage || (galleryImages.length > 0 ? galleryImages[0] : mockCoverImage),
    },
  };

  if (deviceMode === "desktop") {
    return (
      <div className="w-full h-full p-4 flex items-center justify-center">
        <div className="w-full max-w-4xl h-full max-h-[85vh] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col">
          {/* Desktop Browser Bar */}
          <div className="h-9 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center px-4 gap-2 shrink-0 select-none">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-rose-400"></div>
              <div className="w-3 h-3 rounded-full bg-amber-400"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
            </div>
            <div className="mx-auto px-4 py-0.5 bg-white dark:bg-slate-900 rounded-md text-[11px] text-slate-500 font-mono border border-slate-200 dark:border-slate-700 max-w-md w-full text-center truncate">
              https://viora.wedding/invitation/{dummyWeddingData.slug}
            </div>
          </div>
          {/* Browser Viewport */}
          <div className="flex-1 overflow-y-auto bg-white">
            <SelectedLiveView
              weddingData={dummyWeddingData}
              guestName="Khách mời"
              previewMode="invitation"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full overflow-hidden items-center justify-center relative">
      {/* Scaled Phone Mockup Container */}
      <div
        className="relative flex items-center justify-center overflow-visible shrink-0 transition-transform duration-300"
        style={{
          width: "calc(375px * var(--mockup-scale, 1))",
          height: "calc(780px * var(--mockup-scale, 1))",
          ["--mockup-scale" as any]: "min(1, calc((100vh - 220px) / 780))",
        }}
      >
        {/* iPhone 16 Pro Titanium Frame */}
        <div
          className="absolute w-[375px] h-[780px] bg-slate-950 rounded-[3.25rem] p-[10px] shadow-[0_30px_90px_-20px_rgba(0,0,0,0.6)] ring-1 ring-white/20 border border-slate-700/60 overflow-hidden shrink-0 flex flex-col"
          style={{
            transform: "scale(var(--mockup-scale, 1))",
            transformOrigin: "center center",
          }}
        >
          {/* Outer Titanium Rim */}
          <div className="relative w-full h-full rounded-[2.65rem] overflow-hidden bg-white flex flex-col">
            {/* Dynamic Island */}
            <div className="absolute top-2.5 inset-x-0 flex justify-center z-30 pointer-events-none">
              <div className="w-28 h-6 bg-black rounded-full flex items-center justify-between px-2.5 shadow-sm">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-900 ring-1 ring-white/10"></div>
                <div className="w-2 h-2 rounded-full bg-indigo-950/80 ring-1 ring-indigo-500/40"></div>
              </div>
            </div>

            {/* Dynamic Content based on Template */}
            <div className="absolute inset-0 bg-white" style={{ zoom: 0.78 }}>
              <div
                className="h-full w-full overflow-y-auto relative [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                style={{ transform: "translateZ(0)" }}
              >
                <SelectedLiveView
                  weddingData={dummyWeddingData}
                  guestName="Khách mời"
                  previewMode="invitation"
                />
              </div>
            </div>

            {/* Home Indicator Bar */}
            <div className="absolute bottom-1.5 inset-x-0 flex justify-center z-30 pointer-events-none">
              <div className="w-32 h-1 bg-black/40 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
