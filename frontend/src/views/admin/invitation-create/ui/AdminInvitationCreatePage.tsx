"use client";

import { AdminSidebar } from "@/widgets/admin";
import { InvitationCreateProvider, useInvitationCreate } from "../model/InvitationCreateProvider";
import { InvitationTemplateSelector } from "@/widgets/invitation-builder";
import { TemplateDetailModal } from "@/widgets/invitation-builder";

import { InvitationEditorScreen } from "@/widgets/invitation-builder";

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
