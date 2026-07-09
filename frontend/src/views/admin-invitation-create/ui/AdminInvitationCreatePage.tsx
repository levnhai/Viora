"use client";

import { AdminSidebar } from "@/widgets/admin-layout/ui/AdminSidebar";
import { InvitationCreateProvider, useInvitationCreate } from "../model/InvitationCreateProvider";
import { InvitationTemplateSelector } from "@/widgets/invitation-template-selector/ui/InvitationTemplateSelector";
import { TemplateDetailModal } from "@/widgets/invitation-template-selector/ui/TemplateDetailModal";

import { InvitationEditorScreen } from "@/widgets/invitation-editor/ui/InvitationEditorScreen";

function InvitationCreateContent() {
  const { step } = useInvitationCreate();

  if (step === "editor") {
    return <InvitationEditorScreen />;
  }

  return (
    <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative">
      <InvitationTemplateSelector />
      <TemplateDetailModal />
    </div>
  );
}

function InvitationCreateLayout() {
  const { step } = useInvitationCreate();

  return (
    <div className="min-h-screen bg-[#f8fafc] flex text-slate-800" style={{ fontFamily: "'Inter', sans-serif" }}>
      {step === "select_template" && <AdminSidebar />}
      <InvitationCreateContent />
    </div>
  );
}

export function AdminInvitationCreatePage() {
  return (
    <InvitationCreateProvider>
      <InvitationCreateLayout />
    </InvitationCreateProvider>
  );
}
