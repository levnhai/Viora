"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Loader2,
  PlusCircle,
  Inbox,
  Sparkles,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import { useDashboardData } from "../model/useDashboardData";
import { fetchAnalyticsOverview } from "@/entities/analytics/api/analyticsApi";
import { useRealtimeOnline } from "@/entities/analytics/model/useRealtimeOnline";
import { AnalyticsOverviewData } from "@/entities/analytics/model/types";
import {
  AdminLayout,
  PrimaryKpiGrid,
  TrafficAreaChart,
  DeviceBreakdownCard,
  PendingRequestsTable,
  RecentWeddingsList,
} from "@/widgets/admin";

export function AdminDashboardPage() {
  const router = useRouter();
  const { loading: dashboardLoading, requestsList, dashboardData, error } =
    useDashboardData();
  const { onlineCount } = useRealtimeOnline();

  const [range, setRange] = useState<"today" | "7days" | "30days" | "year">(
    "7days"
  );
  const [analyticsData, setAnalyticsData] =
    useState<AnalyticsOverviewData | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Authentication error guard
  useEffect(() => {
    if (error === "UNAUTHORIZED") {
      router.push("/admin/login-2h");
    }
  }, [error, router]);

  // Load analytics overview
  const loadAnalytics = useCallback(
    async (selectedRange: "today" | "7days" | "30days" | "year") => {
      setIsRefreshing(true);
      try {
        const res = await fetchAnalyticsOverview(selectedRange);
        if (res) {
          setAnalyticsData(res);
        }
      } catch (err) {
        console.error("Failed to load analytics:", err);
      } finally {
        setIsRefreshing(false);
      }
    },
    []
  );

  useEffect(() => {
    loadAnalytics(range);
  }, [range, loadAnalytics]);

  if (error === "UNAUTHORIZED") {
    return null;
  }

  if (dashboardLoading) {
    return (
      <AdminLayout onlineCount={onlineCount}>
        <div className="flex flex-col items-center justify-center h-80 space-y-4">
          <div className="relative">
            <Loader2 className="w-12 h-12 animate-spin text-indigo-600" />
            <Sparkles className="w-4 h-4 text-amber-500 absolute top-0 right-0 animate-ping" />
          </div>
          <p className="text-sm font-semibold text-slate-500 animate-pulse">
            Đang tải dữ liệu trung tâm điều hành...
          </p>
        </div>
      </AdminLayout>
    );
  }

  // Fallback data when offline or not yet synchronized
  const kpi = dashboardData?.kpi || {
    totalWeddings: 10,
    totalGuests: 0,
    totalViews: 1,
  };

  const topWeddings = dashboardData?.tables?.topWeddings || [
    {
      id: "demo-1",
      name: "Hải & Linh",
      slug: "hai-linh",
      views: "1",
      date: "20/11/2026",
      isPublished: true,
    },
  ];
  const allRequests = requestsList || [];

  // Calculate greeting by hour
  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 12
      ? "Chào buổi sáng"
      : currentHour < 18
      ? "Chào buổi chiều"
      : "Chào buổi tối";

  // Calculate dynamic revenue based on range
  const totalW = kpi.totalWeddings || 0;
  const calculatedRevenue = totalW > 0 ? totalW * 149000 : 149000;

  // Returning rate
  const returningRate = analyticsData?.kpi?.returningRate || 100;
  const totalViews =
    analyticsData?.kpi?.totalPageviews || kpi.totalViews || 1;

  // Timeline chart data
  const chartTimeline =
    analyticsData?.timeline && analyticsData.timeline.length > 0
      ? analyticsData.timeline
      : [
          { time: "00:00", pageviews: 0, uniqueVisitors: 0 },
          { time: "06:00", pageviews: 0, uniqueVisitors: 0 },
          { time: "12:00", pageviews: 1, uniqueVisitors: 1 },
          { time: "18:00", pageviews: 0, uniqueVisitors: 0 },
          { time: "23:59", pageviews: 0, uniqueVisitors: 0 },
        ];

  // Device breakdown
  const deviceCounts = analyticsData?.devices || [];
  const mobileCount =
    deviceCounts.find((d: any) => d.key === "mobile" || d.name?.toLowerCase() === "mobile")?.count || 0;
  const desktopCount =
    deviceCounts.find((d: any) => d.key === "desktop" || d.name?.toLowerCase() === "desktop")?.count || 1;
  const tabletCount =
    deviceCounts.find((d: any) => d.key === "tablet" || d.name?.toLowerCase() === "tablet")?.count || 0;

  const browsers = analyticsData?.browsers || [];

  return (
    <AdminLayout onlineCount={onlineCount}>
      {/* 1. Top Greeting & Quick Actions Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm transition-colors">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-lg sm:text-xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
              {greeting}, Super Admin 👋
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[11px] font-bold border border-emerald-200/60 dark:border-emerald-900/40">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Hệ thống ổn định
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1.5">
            <span>Trang chủ</span>
            <ChevronRight size={12} />
            <span className="font-semibold text-slate-700 dark:text-slate-200">
              Trung tâm điều hành & phân tích số liệu
            </span>
          </p>
        </div>

        {/* Quick Action buttons */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <Link
            href="/admin/template-requests"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all border border-slate-200/60 dark:border-slate-700/60"
          >
            <Inbox size={15} className="text-amber-500" />
            <span>Yêu cầu làm thiệp</span>
            {allRequests.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-amber-500 text-white text-[10px] font-mono">
                {allRequests.length}
              </span>
            )}
          </Link>

          <Link
            href="/admin/invitations/create"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white text-xs font-bold shadow-md shadow-indigo-500/20 transition-all hover:scale-[1.02]"
          >
            <PlusCircle size={15} />
            <span>+ Tạo thiệp mới</span>
          </Link>
        </div>
      </div>

      {/* 2. Primary KPI Cards Grid */}
      <PrimaryKpiGrid
        revenue={calculatedRevenue}
        totalWeddings={totalW}
        pendingRequests={allRequests.length}
        totalViews={totalViews}
        onlineCount={onlineCount}
        returningRate={returningRate}
      />

      {/* 3. Analytics & Device Breakdown Grid (65% / 35%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Traffic Area Chart */}
        <div className="lg:col-span-8">
          <TrafficAreaChart
            data={chartTimeline}
            range={range}
            onRangeChange={(newRange) => setRange(newRange)}
            onRefresh={() => loadAnalytics(range)}
            isRefreshing={isRefreshing}
          />
        </div>

        {/* Right Column: Devices & Platforms */}
        <div className="lg:col-span-4">
          <DeviceBreakdownCard
            deviceStats={{
              mobile: mobileCount,
              desktop: desktopCount,
              tablet: tabletCount,
            }}
            topBrowsers={browsers}
          />
        </div>
      </div>

      {/* 4. Operational Tables & Recent Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Pending Template Requests */}
        <div className="lg:col-span-6">
          <PendingRequestsTable requestsList={allRequests} />
        </div>

        {/* Right: Recent Weddings */}
        <div className="lg:col-span-6">
          <RecentWeddingsList weddings={topWeddings} />
        </div>
      </div>
    </AdminLayout>
  );
}
