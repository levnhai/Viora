"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AdminLayout } from "@/widgets/admin-layout/ui/AdminLayout";
import { AdminInvitationsStats } from "@/widgets/admin-invitations-list/ui/AdminInvitationsStats";
import { AdminInvitationsFilter } from "@/widgets/admin-invitations-list/ui/AdminInvitationsFilter";
import { AdminInvitationsTable } from "@/widgets/admin-invitations-list/ui/AdminInvitationsTable";
import { AdminInvitationsSidebar } from "@/widgets/admin-invitations-list/ui/AdminInvitationsSidebar";
import { useInvitations } from "@/entities/invitation/model/useInvitations";
import { Loader2 } from "lucide-react";

export function AdminInvitationsPage() {
  const router = useRouter();
  const { loading, data, error, query, updateQuery } = useInvitations({ page: 1, limit: 10 });
  
  useEffect(() => {
    if (error === "UNAUTHORIZED") {
      router.push("/admin/login");
    }
  }, [error, router]);

  const handlePageChange = (newPage: number) => {
    updateQuery({ page: newPage });
  };

  const handleFilterChange = (filters: any) => {
    updateQuery({ ...filters, page: 1 });
  };

  if (error === "UNAUTHORIZED") {
    return null;
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-red-500 font-medium">
          Có lỗi xảy ra: {error}
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="flex flex-col lg:flex-row gap-6 w-full max-w-[1600px] mx-auto">
        
        {/* Main Content Area */}
        <div className="flex-1 min-w-0">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Danh sách thiệp cưới</h2>
            <p className="text-sm text-slate-500 mt-1">Quản lý tất cả thiệp cưới của bạn</p>
          </div>
          
          <AdminInvitationsStats statsData={data?.stats} />
          
          <AdminInvitationsFilter onFilterChange={handleFilterChange} currentFilter={query} />
          
          {loading ? (
            <div className="flex justify-center items-center h-64 bg-white rounded-xl border border-slate-200 shadow-sm">
              <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
            </div>
          ) : (
            <AdminInvitationsTable 
              invitations={data?.items || []} 
              total={data?.total || 0}
              page={data?.page || 1}
              limit={data?.limit || 10}
              onPageChange={handlePageChange}
            />
          )}
        </div>

        {/* Right Sidebar Area */}
        <div className="w-full lg:w-[320px] shrink-0 pt-16 lg:pt-[76px]">
          <AdminInvitationsSidebar topTemplatesData={data?.topTemplates} />
        </div>

      </div>
    </AdminLayout>
  );
}
