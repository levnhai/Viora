"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminLayout } from "@/widgets/admin";
import { AdminPageHeader } from "@/widgets/admin";
import { AdminInvitationsStats } from "@/widgets/admin";
import { AdminInvitationsFilter } from "@/widgets/admin";
import { AdminInvitationsTable } from "@/widgets/admin";
import { AdminInvitationsGrid } from "@/widgets/admin";
import { AdminInvitationsSidebar } from "@/widgets/admin";
import { useInvitations } from "@/entities/invitation/model/useInvitations";
import { Loader2, Plus, Sparkles } from "lucide-react";
import Link from "next/link";

export function AdminInvitationsPage() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const { loading, data, error, query, updateQuery } = useInvitations({
    page: 1,
    limit: 12,
  });

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

  const handleStatusSelect = (status: string) => {
    updateQuery({ status, page: 1 });
  };

  if (error === "UNAUTHORIZED") {
    return null;
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-rose-500 font-semibold bg-white dark:bg-slate-900 rounded-3xl border border-rose-200 dark:border-rose-900/50 p-6 shadow-sm">
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
            { label: "Studio Thiệp Cưới" },
            { label: "Quản lý thiệp mời" },
          ]}
          title="Bộ sưu tập thiệp cưới"
          description="Quản lý, xuất bản và giám sát thời gian thực các thiệp cưới trực tuyến"
          badge={
            data?.total !== undefined ? (
              <span className="text-xs px-3 py-1 rounded-full font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center gap-1.5">
                <Sparkles size={12} />
                {data.total} thiệp
              </span>
            ) : undefined
          }
          actions={
            <Link
              href="/admin/invitations/create"
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 hover:opacity-95 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-rose-500/20 active:scale-95 cursor-pointer"
            >
              <Plus size={16} />
              <span>+ Tạo thiệp mới</span>
            </Link>
          }
        />

        {/* 2-Column Grid: Main List vs Sidebar */}
        <div className="flex flex-col xl:flex-row gap-6 items-start">
          {/* Main Content Area */}
          <div className="flex-1 min-w-0 w-full space-y-6">
            <AdminInvitationsStats
              statsData={data?.stats}
              activeStatus={query.status}
              onSelectStatus={handleStatusSelect}
            />

            <AdminInvitationsFilter
              onFilterChange={handleFilterChange}
              currentFilter={query}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />

            {loading ? (
              <div className="flex flex-col justify-center items-center h-80 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-3">
                <div className="relative">
                  <Loader2 className="w-10 h-10 animate-spin text-amber-500" />
                  <Sparkles className="w-4 h-4 text-rose-500 absolute top-0 right-0 animate-ping" />
                </div>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Đang tải danh sách thiệp cưới...
                </p>
              </div>
            ) : viewMode === "grid" ? (
              <AdminInvitationsGrid
                invitations={data?.items || []}
                total={data?.total || 0}
                page={data?.page || 1}
                limit={data?.limit || 12}
                onPageChange={handlePageChange}
              />
            ) : (
              <AdminInvitationsTable
                invitations={data?.items || []}
                total={data?.total || 0}
                page={data?.page || 1}
                limit={data?.limit || 12}
                onPageChange={handlePageChange}
              />
            )}
          </div>

          {/* Right Sidebar Area */}
          <div className="w-full xl:w-[320px] shrink-0">
            <AdminInvitationsSidebar topTemplatesData={data?.topTemplates} />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
