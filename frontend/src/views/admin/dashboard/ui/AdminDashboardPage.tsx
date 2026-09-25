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
    totalWeddings: 0,
    paidWeddings: 0,
    totalRevenue: 0,
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

  // Calculate dynamic revenue based on real weddings (exclude demo)
  const totalW = kpi.totalWeddings || 0;
  const paidWeddingsCount =
    typeof kpi.paidWeddings === "number" ? kpi.paidWeddings : 0;
  const calculatedRevenue =
    typeof kpi.totalRevenue === "number"
      ? kpi.totalRevenue
      : paidWeddingsCount * 149000;

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
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-white via-white to-indigo-50/40 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/20 p-5 sm:p-6 lg:p-7 border border-slate-200/80 dark:border-slate-800/80 shadow-xs transition-all">
        {/* Subtle background glow circle */}
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h1
                className="text-2xl sm:text-3xl lg:text-[32px] font-black text-slate-900 dark:text-white tracking-tight leading-tight"
                suppressHydrationWarning
              >
                {greeting}, Super Admin 👋
              </h1>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-xs sm:text-[13px] font-bold border border-emerald-500/20 shadow-2xs">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                Hệ thống ổn định
              </span>
            </div>
            <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 flex items-center gap-2">
              <span className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium">Bảng điều khiển</span>
              <ChevronRight size={14} className="text-slate-400 dark:text-slate-500" />
              <span className="font-semibold text-slate-700 dark:text-slate-200">
                Trung tâm điều hành & phân tích số liệu thời gian thực
              </span>
            </div>
          </div>

          {/* Quick Action buttons */}
          <div className="flex items-center gap-3 flex-wrap shrink-0">
            <Link
              href="/admin/template-requests"
              className="h-11 flex items-center gap-2.5 px-4.5 rounded-2xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-bold transition-all border border-slate-200/90 dark:border-slate-700/80 shadow-2xs hover:shadow-xs active:scale-[0.98]"
            >
              <Inbox size={18} className="text-amber-500" />
              <span>Yêu cầu làm thiệp</span>
              {allRequests.length > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-amber-500 text-white text-xs font-black tabular-nums shadow-2xs">
                  {allRequests.length}
                </span>
              )}
            </Link>

            <Link
              href="/admin/invitations/create"
              className="h-11 flex items-center gap-2.5 px-5 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs sm:text-sm font-bold shadow-md shadow-indigo-500/25 transition-all active:scale-[0.98] hover:shadow-indigo-500/35"
            >
              <PlusCircle size={18} />
              <span>Tạo thiệp mới</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Primary KPI Cards Grid */}
      <PrimaryKpiGrid
        revenue={calculatedRevenue}
        paidWeddings={paidWeddingsCount}
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
