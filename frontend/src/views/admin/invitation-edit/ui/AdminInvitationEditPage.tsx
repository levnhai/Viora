"use client";

import { useInvitationDetail } from "@/entities/invitation/model/useInvitationDetail";
import { Loader2 } from "lucide-react";
import { InvitationCreateProvider } from "@/views/admin";
import { InvitationEditorScreen } from "@/widgets/invitation-builder";

export function AdminInvitationEditPage({ slug }: { slug: string }) {
  const { loading, data, error } = useInvitationDetail(slug);

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500 bg-slate-50">
        Có lỗi xảy ra: {error}
      </div>
    );
  }

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-50">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  // Inject initial data and skip directly to Editor
  return (
    <InvitationCreateProvider initialData={data} isEditMode={true}>
      <InvitationEditorScreen />
    </InvitationCreateProvider>
  );
}
