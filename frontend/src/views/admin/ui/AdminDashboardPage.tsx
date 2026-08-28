"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ChevronRight } from "lucide-react";
import { useDashboardData } from "@/entities/admin-dashboard/model/useDashboardData";

import { AdminLayout } from "@/widgets/admin-layout/ui/AdminLayout";
import { AdminAnalyticsSection } from "@/widgets/admin-analytics/ui/AdminAnalyticsSection";

export function AdminDashboardPage() {
  const router = useRouter();
  const { loading, requestsList, dashboardData, error } = useDashboardData();

  useEffect(() => {
    if (error === "UNAUTHORIZED") {
      router.push("/admin/login-2h");
    }
  }, [error, router]);

  if (error === "UNAUTHORIZED") {
    return null;
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
          <p className="text-sm font-medium text-slate-500 animate-pulse">
            Đang tải hệ thống quản trị...
          </p>
        </div>
      </AdminLayout>
    );
  }

  if (error || !dashboardData) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-red-500 font-medium">
          {error || "Không có dữ liệu. Vui lòng thử lại."}
        </div>
      </AdminLayout>
    );
  }

  // Fallback defaults
  const kpi = dashboardData.kpi || {
    totalWeddings: 0,
    totalGuests: 0,
    rsvpConfirmed: 0,
    rsvpDeclined: 0,
    rsvpPending: 0,
    totalViews: 0,
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">
            Dashboard Tổng Quan
          </h2>
          <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-1">
            <span className="hover:text-indigo-600 cursor-pointer">
              Trang chủ
            </span>
            <ChevronRight size={12} />{" "}
            <span className="text-slate-700">Dashboard</span>
          </p>
        </div>
      </div>

      {/* Phần Thống kê Chi tiết Lưu lượng Web, Realtime Online, Thiết bị, Trình duyệt, Top Mẫu & Yêu cầu */}
      <AdminAnalyticsSection
        initialRange="7days"
        dashboardKpi={kpi}
        requestsList={requestsList}
      />
    </AdminLayout>
  );
}
