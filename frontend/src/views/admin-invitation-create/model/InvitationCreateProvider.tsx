"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Template } from "@/entities/template/api/template.api";
import { TEMPLATES } from "@/entities/template/model/templates";

export function toSlug(str: string) {
  if (!str) return "";
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[đĐ]/g, "d")
    .replace(/([^a-z0-9\s])/g, "")
    .replace(/\s+/g, "")
    .replace(/-+/g, "")
    .trim();
}

export function formatDateSlug(dateStr: string) {
  if (!dateStr) return "";
  const parts = dateStr.split("-");
  if (parts.length === 3) {
    const [year, month, day] = parts;
    return `${day}${month}${year.slice(-2)}`;
  }
  return "";
}

export interface BasicInfo {
  groomName: string;
  groomFatherName?: string;
  groomMotherName?: string;
  groomRank?: string;
  groomAddress?: string;
  brideName: string;
  brideFatherName?: string;
  brideMotherName?: string;
  brideRank?: string;
  brideAddress?: string;
  weddingDate: string;
  weddingTime: string;
  locationName: string;
  address: string;
  mapLink: string;
  musicUrl?: string;
}

export interface PublishSettings {
  urlSlug: string;
  domain: string;
  seoTitle: string;
  seoDescription: string;
  seoImage: string;
  allowComments: boolean;
  showRsvp: boolean;
  passwordProtect: boolean;
}

export interface GiftInfo {
  groomBankName?: string;
  groomAccountNumber?: string;
  groomAccountName?: string;
  groomQrUrl?: string;

  brideBankName?: string;
  brideAccountNumber?: string;
  brideAccountName?: string;
  brideQrUrl?: string;
}

export interface TimelineEvent {
  id: string;
  time: string;
  title: string;
  description: string;
  icon: string;
}

interface InvitationCreateState {
  step: "select_template" | "editor";
  setStep: (step: "select_template" | "editor") => void;

  templateId: string;
  setTemplateId: (id: string) => void;

  activeTemplate: Template | null;
  setActiveTemplate: (template: Template | null) => void;

  isTemplateModalOpen: boolean;
  setIsTemplateModalOpen: (isOpen: boolean) => void;

  isPublishSuccessModalOpen: boolean;
  setIsPublishSuccessModalOpen: (isOpen: boolean) => void;

  editorActiveTab: string;
  setEditorActiveTab: (tab: string) => void;

  basicInfo: BasicInfo;
  setBasicInfo: (info: BasicInfo) => void;

  giftInfo: GiftInfo;
  setGiftInfo: (info: GiftInfo) => void;

  galleryImages: string[];
  setGalleryImages: React.Dispatch<React.SetStateAction<string[]>>;

  deletedGalleryImages: string[];
  setDeletedGalleryImages: React.Dispatch<React.SetStateAction<string[]>>;

  story: string;
  setStory: (story: string) => void;

  timeline: TimelineEvent[];
  setTimeline: React.Dispatch<React.SetStateAction<TimelineEvent[]>>;

  publishSettings: PublishSettings;
  setPublishSettings: (settings: PublishSettings) => void;

  isSlugEdited: boolean;
  setIsSlugEdited: (isEdited: boolean) => void;

  isEditMode: boolean;
}

const InvitationCreateContext = createContext<InvitationCreateState | undefined>(
  undefined
);

export function InvitationCreateProvider({
  children,
  initialData,
  isEditMode = false,
}: {
  children: ReactNode;
  initialData?: any;
  isEditMode?: boolean;
}) {
  const [step, setStep] = useState<"select_template" | "editor">(isEditMode ? "editor" : "select_template");
  const [templateId, setTemplateId] = useState(initialData?.wedding?.templateId?.toString() || "");
  const [activeTemplate, setActiveTemplate] = useState<Template | null>(() => {
    if (initialData?.template?.code) {
      const found = TEMPLATES.find(t => t.code === initialData.template.code);
      if (found) return { ...initialData.template, schema: found.schema };
    }
    return null;
  });
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [isPublishSuccessModalOpen, setIsPublishSuccessModalOpen] = useState(false);
  const [editorActiveTab, setEditorActiveTab] = useState("Thông tin cơ bản");

  const [basicInfo, setBasicInfo] = useState<BasicInfo>({
    groomName: initialData?.wedding?.groomName || "Minh Quân",
    groomFatherName: initialData?.wedding?.groomFatherName || "",
    groomMotherName: initialData?.wedding?.groomMotherName || "",
    groomRank: initialData?.wedding?.groomRank || "",
    groomAddress: initialData?.wedding?.groomAddress || "",
    brideName: initialData?.wedding?.brideName || "Thu Hà",
    brideFatherName: initialData?.wedding?.brideFatherName || "",
    brideMotherName: initialData?.wedding?.brideMotherName || "",
    brideRank: initialData?.wedding?.brideRank || "",
    brideAddress: initialData?.wedding?.brideAddress || "",
    weddingDate: initialData?.wedding?.weddingDate ? new Date(initialData.wedding.weddingDate).toISOString().split('T')[0] : "2025-06-25",
    weddingTime: initialData?.wedding?.weddingTime || "17:00",
    locationName: initialData?.sections?.find((s:any) => s.type === 'rsvp')?.settings?.events?.[0]?.locationName || "Gem Center",
    address: initialData?.sections?.find((s:any) => s.type === 'rsvp')?.settings?.events?.[0]?.address || "08 Nguyễn Bỉnh Khiêm, P. Đa Kao, Q.1, TP.HCM",
    mapLink: initialData?.sections?.find((s:any) => s.type === 'rsvp')?.settings?.events?.[0]?.mapUrl || "https://maps.google.com/?q=Gem+Center",
    musicUrl: initialData?.themeSettings?.musicUrl || "",
  });
  
  const [giftInfo, setGiftInfo] = useState<GiftInfo>(initialData?.wedding?.giftInfo || {});
  
  const dbMedia = initialData?.media?.filter((m:any) => m.type === 'gallery').map((m:any) => m.url) || [];
  const dbGallery = initialData?.wedding?.galleryImages || [];
  
  const [galleryImages, setGalleryImages] = useState<string[]>(
    dbMedia.length > 0 ? dbMedia : dbGallery.length > 0 ? dbGallery : []
  );

  const [deletedGalleryImages, setDeletedGalleryImages] = useState<string[]>([]);

  const dbTimeline = initialData?.sections?.find((s:any) => s.type === 'timeline')?.settings?.timeline || [
    { id: "1", time: "17:00", title: "Đón khách", description: "Đón khách và chụp ảnh lưu niệm", icon: "Heart" },
    { id: "2", time: "18:00", title: "Lễ cưới", description: "Nghi thức trao nhẫn và tuyên thệ", icon: "Gem" },
    { id: "3", time: "19:00", title: "Tiệc tối", description: "Cùng chung vui bữa tiệc thân mật", icon: "ConciergeBell" },
    { id: "4", time: "20:00", title: "Kết thúc", description: "Cảm ơn và hẹn gặp lại", icon: "Gift" }
  ];
  const [timeline, setTimeline] = useState<TimelineEvent[]>(dbTimeline);

  const [story, setStory] = useState(
    initialData?.wedding?.story || "Sau bao nhiêu ngày tháng bên nhau, chúng tôi quyết định đi đến một hành trình mới..."
  );
  
  const [publishSettings, setPublishSettings] = useState<PublishSettings>({
    urlSlug: initialData?.wedding?.slug || "minh-quan-thu-ha-250625",
    domain: "wedding.com",
    seoTitle: initialData?.wedding?.seoTitle || "Thiệp cưới Minh Quân & Thu Hà",
    seoDescription: initialData?.wedding?.seoDescription || "Thiệp cưới của Minh Quân & Thu Hà. Trân trọng kính mời!",
    seoImage: initialData?.wedding?.seoImage || "",
    allowComments: true,
    showRsvp: true,
    passwordProtect: false,
  });

  const [isSlugEdited, setIsSlugEdited] = useState(isEditMode);

  useEffect(() => {
    if (!isSlugEdited) {
      const groom = toSlug(basicInfo.groomName);
      const bride = toSlug(basicInfo.brideName);
      const date = formatDateSlug(basicInfo.weddingDate);
      const newSlug = [groom, bride, date].filter(Boolean).join("-");
      setPublishSettings(prev => ({ ...prev, urlSlug: newSlug || "thiep-cuoi" }));
    }
  }, [basicInfo.groomName, basicInfo.brideName, basicInfo.weddingDate, isSlugEdited]);

  return (
    <InvitationCreateContext.Provider
      value={{
        step,
        setStep,
        templateId,
        setTemplateId,
        activeTemplate,
        setActiveTemplate,
        isTemplateModalOpen,
        setIsTemplateModalOpen,
        isPublishSuccessModalOpen,
        setIsPublishSuccessModalOpen,
        editorActiveTab,
        setEditorActiveTab,
        basicInfo,
        setBasicInfo,
        giftInfo,
        setGiftInfo,
        galleryImages,
        setGalleryImages,
        deletedGalleryImages,
        setDeletedGalleryImages,
        timeline,
        setTimeline,
        story,
        setStory,
        publishSettings,
        setPublishSettings,
        isSlugEdited,
        setIsSlugEdited,
        isEditMode,
      }}
    >
      {children}
    </InvitationCreateContext.Provider>
  );
}

export function useInvitationCreate() {
  const context = useContext(InvitationCreateContext);
  if (!context) {
    throw new Error(
      "useInvitationCreate must be used within an InvitationCreateProvider"
    );
  }
  return context;
}
