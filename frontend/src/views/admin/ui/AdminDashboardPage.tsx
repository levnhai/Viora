"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ChevronRight } from "lucide-react";
import { useDashboardData } from "@/entities/admin-dashboard/model/useDashboardData";

import { AdminLayout } from "@/widgets/admin-layout/ui/AdminLayout";
import { AdminDashboardKpi } from "@/widgets/admin-dashboard-kpi/ui/AdminDashboardKpi";
import { AdminDashboardCharts } from "@/widgets/admin-dashboard-charts/ui/AdminDashboardCharts";
import { AdminDashboardTables } from "@/widgets/admin-dashboard-tables/ui/AdminDashboardTables";
import { AdminDashboardSystem } from "@/widgets/admin-dashboard-system/ui/AdminDashboardSystem";

export function AdminDashboardPage() {
  const router = useRouter();
  const { loading, requestsList, dashboardData, error } = useDashboardData();

  useEffect(() => {
    if (error === "UNAUTHORIZED") {
      router.push("/admin/login");
    }
  }, [error, router]);

  if (loading || error === "UNAUTHORIZED") {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
        <p className="text-sm font-medium text-slate-500 animate-pulse">
          Đang tải hệ thống quản trị...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex flex-col items-center justify-center space-y-4">
        <p className="text-sm font-medium text-red-500">
          Lỗi tải dữ liệu. Vui lòng thử lại.
        </p>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex flex-col items-center justify-center space-y-4">
        <p className="text-sm font-medium text-red-500">
          Không có dữ liệu. Vui lòng thử lại.
        </p>
      </div>
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
  const charts = dashboardData.charts || { rsvpData: [], rsvpPieData: [] };
  const tables = dashboardData.tables || {
    topWeddings: [],
    recentActivities: [],
  };
  const system = dashboardData.system || { totalUsers: 0, activeUsers: 0 };
  const totalRsvp = kpi.rsvpConfirmed + kpi.rsvpDeclined + kpi.rsvpPending || 1;

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">
            Dashboard
          </h2>
          <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-1">
            <span className="hover:text-indigo-600 cursor-pointer">
              Trang chủ
            </span>{" "}
            <ChevronRight size={12} />{" "}
            <span className="text-slate-700">Dashboard</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-slate-50 text-slate-600 outline-none focus:ring-2 focus:ring-indigo-500/20">
            <option>Hôm nay</option>
            <option>7 ngày qua</option>
            <option>30 ngày qua</option>
            <option>Năm nay</option>
          </select>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors shadow-sm shadow-indigo-600/20">
            Xuất báo cáo
          </button>
        </div>
      </div>

      <AdminDashboardKpi kpi={kpi} />
      <AdminDashboardCharts
        charts={charts}
        tables={tables}
        totalRsvp={totalRsvp}
      />
      <AdminDashboardTables tables={tables} requestsList={requestsList} />
      <AdminDashboardSystem kpi={kpi} system={system} />
    </AdminLayout>
  );
}
