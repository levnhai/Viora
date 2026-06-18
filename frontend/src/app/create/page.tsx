'use client';

import { Suspense } from 'react';
import { WeddingEditorPage } from "@/views/wedding-editor/ui/WeddingEditorPage";

export default function CreateRoute() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0c0a09] flex items-center justify-center text-slate-400">Đang tải...</div>}>
      <WeddingEditorPage isEditMode={false} />
    </Suspense>
  );
}
