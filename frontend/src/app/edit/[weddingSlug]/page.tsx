'use client';

import { Suspense } from 'react';
import { WeddingEditorPage } from "@/views/wedding-editor/ui/WeddingEditorPage";
import { useParams } from "next/navigation";

export default function EditRoute() {
  const params = useParams();
  const weddingSlug = params?.weddingSlug as string;

  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0c0a09] flex items-center justify-center text-slate-400">Đang tải...</div>}>
      <WeddingEditorPage isEditMode={true} weddingSlug={weddingSlug} />
    </Suspense>
  );
}
