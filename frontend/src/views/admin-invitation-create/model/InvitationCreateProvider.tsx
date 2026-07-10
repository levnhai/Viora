"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Template } from "@/entities/template/api/template.api";

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
  setGalleryImages: (images: string[]) => void;

  story: string;
  setStory: (story: string) => void;

  publishSettings: PublishSettings;
  setPublishSettings: (settings: PublishSettings) => void;
}

const InvitationCreateContext = createContext<InvitationCreateState | undefined>(
  undefined
);

export function InvitationCreateProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [step, setStep] = useState<"select_template" | "editor">("select_template");
  const [templateId, setTemplateId] = useState("");
  const [activeTemplate, setActiveTemplate] = useState<Template | null>(null);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [isPublishSuccessModalOpen, setIsPublishSuccessModalOpen] = useState(false);
  const [editorActiveTab, setEditorActiveTab] = useState("Thông tin cơ bản");

  const [basicInfo, setBasicInfo] = useState<BasicInfo>({
    groomName: "Minh Quân",
    brideName: "Thu Hà",
    weddingDate: "2025-06-25",
    weddingTime: "17:00",
    locationName: "Gem Center",
    address: "08 Nguyễn Bỉnh Khiêm, P. Đa Kao, Q.1, TP.HCM",
    mapLink: "https://maps.google.com/?q=Gem+Center",
  });
  
  const [giftInfo, setGiftInfo] = useState<GiftInfo>({});
  
  const [galleryImages, setGalleryImages] = useState<string[]>([
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80"
  ]);

  const [story, setStory] = useState(
    "Sau bao nhiêu ngày tháng bên nhau, chúng tôi quyết định đi đến một hành trình mới..."
  );
  
  const [publishSettings, setPublishSettings] = useState<PublishSettings>({
    urlSlug: "minh-quan-thu-ha",
    domain: "wedding.com",
    seoTitle: "Thiệp cưới Minh Quân & Thu Hà",
    seoDescription: "Thiệp cưới của Minh Quân & Thu Hà. Trân trọng kính mời!",
    seoImage: "",
    allowComments: true,
    showRsvp: true,
    passwordProtect: false,
  });

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
        story,
        setStory,
        publishSettings,
        setPublishSettings,
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
