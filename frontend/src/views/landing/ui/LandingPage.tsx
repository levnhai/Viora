"use client";

import { AllTemplatesSection } from "./components/AllTemplatesSection";

export function LandingPage() {
  return (
    <div
      className="min-h-screen bg-[#121111] text-foreground flex flex-col font-sans selection:bg-pink-500 selection:text-white"
      style={{
        fontFamily:
          "'Be Vietnam Pro', 'Inter', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Hiển thị toàn bộ tất cả mẫu thiệp cưới */}
      <main className="flex-1">
        <AllTemplatesSection />
      </main>
    </div>
  );
}
