import { ReactNode } from "react";
import { AdminSidebar } from "./AdminSidebar";
import { AdminHeader } from "./AdminHeader";

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div
      className="min-h-screen bg-[#f3f4f6] flex text-slate-800"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <AdminSidebar />
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#f8fafc]">
        <AdminHeader />
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {children}
        </div>
      </main>
    </div>
  );
}
