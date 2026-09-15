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
    <div className="admin-theme min-h-screen h-screen bg-slate-50/80 dark:bg-slate-950 flex text-slate-800 dark:text-slate-100 transition-colors overflow-hidden antialiased selection:bg-indigo-500/20 selection:text-indigo-600">
      {/* Sidebar with Desktop & Mobile support */}
      <AdminSidebar
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden bg-gradient-to-br from-slate-50 via-slate-50/80 to-slate-100/60 dark:from-slate-950 dark:via-slate-950/90 dark:to-slate-900/60">
        <AdminHeader
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(true)}
          onlineCount={onlineCount}
        />
        <main className="flex-1 overflow-y-auto px-3.5 sm:px-6 lg:px-8 py-5 sm:py-6 space-y-6 w-full custom-admin-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
}
