"use client";

import { AdminLayout } from "@/widgets/admin";
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
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <InvitationTemplateSelector />
        <TemplateDetailModal />
      </div>
    </AdminLayout>
  );
}

function InvitationCreateLayout() {
  return <InvitationCreateContent />;
}

export function AdminInvitationCreatePage() {
  return (
    <InvitationCreateProvider>
      <InvitationCreateLayout />
    </InvitationCreateProvider>
  );
}
