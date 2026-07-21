"use client";

import { useInvitationCreate } from "@/views/admin-invitation-create/model/InvitationCreateProvider";
import { Monitor, Smartphone, ChevronDown } from "lucide-react";

import { getTemplatePackage } from "@/entities/template/model/registry";
import { WeddingData } from "@/entities/invitation/model/types";

export function InvitationPreview() {
  const { basicInfo, activeTemplate, giftInfo, galleryImages, timeline, story } = useInvitationCreate();

  const templatePackage = getTemplatePackage(
    activeTemplate?.code || "minimal-green",
  );
  const SelectedLiveView = templatePackage.LiveView;

  // Mock data for empty state
  const mockGalleryImages = [
    "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=800&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&h=800&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=600&h=800&fit=crop&auto=format"
  ];
  const mockCoverImage = "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=800&fit=crop&auto=format";

  // Transform basicInfo to WeddingData format for the LiveView
  const dummyWeddingData: WeddingData = {
    slug: "preview",
    templateId: activeTemplate?.code || "minimal-green",
    groomName: basicInfo.groomName || "Chú Rể",
    brideName: basicInfo.brideName || "Cô Dâu",
    groomFatherName: basicInfo.groomFatherName || "",
    groomMotherName: basicInfo.groomMotherName || "",
    brideFatherName: basicInfo.brideFatherName || "",
    brideMotherName: basicInfo.brideMotherName || "",
    groomRank: basicInfo.groomRank || "",
    brideRank: basicInfo.brideRank || "",
    groomAddress: basicInfo.groomAddress || "",
    brideAddress: basicInfo.brideAddress || "",
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
    weddingDate: basicInfo.weddingDate || new Date().toISOString(),
    weddingTime: basicInfo.weddingTime || "18:00",
    musicUrl: basicInfo.musicUrl,
    story: story,
    events: [
      {
        title: "TIỆC CƯỚI",
        time: basicInfo.weddingTime || "18:00",
        date: basicInfo.weddingDate || new Date().toISOString(),
        locationName: basicInfo.locationName || "Nhà hàng Tiệc cưới",
        address: basicInfo.address || "Địa chỉ nhà hàng",
        mapUrl: basicInfo.mapLink || "",
      },
    ],
    timeline: timeline.map((t, index) => ({
      year: t.time,
      title: t.title,
      description: t.description,
      imageUrl: mockGalleryImages[index % mockGalleryImages.length],
    })),
    templateConfig: {
      coverImage: basicInfo.coverImage || mockCoverImage,
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
