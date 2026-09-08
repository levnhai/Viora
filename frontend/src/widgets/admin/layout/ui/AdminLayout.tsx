"use client";

import { ReactNode, useState } from "react";
import { AdminSidebar } from "./AdminSidebar";
import { AdminHeader } from "./AdminHeader";

interface AdminLayoutProps {
  children: ReactNode;
  onlineCount?: number;
}

export function AdminLayout({ children, onlineCount = 1 }: AdminLayoutProps) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div
      className="h-screen bg-slate-50 dark:bg-slate-950 flex text-slate-800 dark:text-slate-100 transition-colors overflow-hidden"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Sidebar with Desktop & Mobile support */}
      <AdminSidebar
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden bg-slate-50/50 dark:bg-slate-950">
        <AdminHeader
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(true)}
          onlineCount={onlineCount}
        />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {children}
        </main>
      </div>
    </div>
  );
}
