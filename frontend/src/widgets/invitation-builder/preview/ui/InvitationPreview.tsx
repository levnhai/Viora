"use client";

import { useInvitationCreate } from "@/views/admin";
import { Monitor, Smartphone, ChevronDown } from "lucide-react";

import { getTemplatePackage } from "@/widgets/invitation-renderer";
import { WeddingData } from "@/entities/invitation/model/types";

export function InvitationPreview() {
  const { basicInfo, events, activeTemplate, templateId, giftInfo, galleryImages, timeline, story } = useInvitationCreate();

  const resolvedTemplateCode =
    activeTemplate?.code ||
    (typeof (activeTemplate as any)?.id === "number" ? `temp_${(activeTemplate as any).id}` : "") ||
    (templateId ? (templateId.startsWith("temp_") ? templateId : `temp_${templateId}`) : "") ||
    "temp_7";

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
    templateConfig: {
      coverImage: basicInfo.coverImage || (galleryImages.length > 0 ? galleryImages[0] : mockCoverImage),
    },
  };

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      <div className="flex-1 flex items-center justify-center p-6 overflow-hidden relative">
        {/* Responsive Scaled Wrapper */}
        <div
          className="relative flex items-center justify-center overflow-visible shrink-0"
          style={{
            width: "calc(360px * var(--mockup-scale, 1))",
            height: "calc(760px * var(--mockup-scale, 1))",
            ["--mockup-scale" as any]: "min(1, calc((100vh - 280px) / 760))",
          }}
        >
          {/* Mobile Mockup */}
          <div
            className="absolute w-[360px] h-[760px] bg-white rounded-[2.5rem] border-[8px] border-slate-800 shadow-xl overflow-hidden shrink-0 flex flex-col"
            style={{
              transform: "scale(var(--mockup-scale, 1))",
              transformOrigin: "center center",
            }}
          >
            {/* Top Notch */}
            <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-10">
              <div className="w-24 h-4 bg-slate-800 rounded-b-xl"></div>
            </div>

            {/* Dynamic Content based on Template */}
            <div className="absolute inset-0 bg-white" style={{ zoom: 0.75 }}>
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
          </div>
        </div>
      </div>
    </div>
  );
}
