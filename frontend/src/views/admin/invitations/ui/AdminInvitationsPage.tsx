"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AdminLayout } from "@/widgets/admin";
import { AdminPageHeader } from "@/widgets/admin";
import { AdminInvitationsStats } from "@/widgets/admin";
import { AdminInvitationsFilter } from "@/widgets/admin";
import { AdminInvitationsTable } from "@/widgets/admin";
import { AdminInvitationsSidebar } from "@/widgets/admin";
import { useInvitations } from "@/entities/invitation/model/useInvitations";
import { Loader2, Plus } from "lucide-react";
import Link from "next/link";

export function AdminInvitationsPage() {
  const router = useRouter();
  const { loading, data, error, query, updateQuery } = useInvitations({ page: 1, limit: 10 });
  
  useEffect(() => {
    if (error === "UNAUTHORIZED") {
      router.push("/admin/login-2h");
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
        <div className="flex items-center justify-center h-64 text-rose-500 font-medium bg-white dark:bg-slate-900 rounded-2xl border border-rose-200 dark:border-rose-900/50 p-6">
          Có lỗi xảy ra khi tải dữ liệu: {error}
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-[1600px] mx-auto space-y-6">
        {/* Unified Page Header */}
        <AdminPageHeader
          breadcrumbs={[
            { label: "Quản lý thiệp cưới" },
            { label: "Danh sách thiệp" },
          ]}
          title="Danh sách thiệp cưới"
          description="Quản lý, xuất bản và theo dõi thống kê các thiệp cưới trực tuyến của bạn"
          badge={
            data?.total !== undefined ? (
              <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                {data.total} thiệp
              </span>
            ) : undefined
          }
          actions={
            <Link
              href="/admin/invitations/create"
              className="flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-600/25 active:scale-95 cursor-pointer"
            >
              <Plus size={15} />
              <span>Tạo thiệp mới</span>
            </Link>
          }
        />

        {/* 2-Column Grid: Main List vs Sidebar */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Main Content Area */}
          <div className="flex-1 min-w-0 w-full space-y-6">
            <AdminInvitationsStats statsData={data?.stats} />
            
            <AdminInvitationsFilter onFilterChange={handleFilterChange} currentFilter={query} />
            
            {loading ? (
              <div className="flex flex-col justify-center items-center h-64 bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-3">
                  Đang tải danh sách thiệp cưới...
                </p>
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
          <div className="w-full lg:w-[320px] shrink-0">
            <AdminInvitationsSidebar topTemplatesData={data?.topTemplates} />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
