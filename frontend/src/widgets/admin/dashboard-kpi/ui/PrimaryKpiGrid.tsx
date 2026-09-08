"use client";

import Link from "next/link";
import {
  TrendingUp,
  Heart,
  Inbox,
  Eye,
  CreditCard,
  Radio,
  ArrowUpRight,
} from "lucide-react";

interface PrimaryKpiGridProps {
  revenue?: number;
  totalWeddings?: number;
  pendingRequests?: number;
  totalViews?: number;
  onlineCount?: number;
  returningRate?: number;
}

export function PrimaryKpiGrid({
  revenue = 0,
  totalWeddings = 0,
  pendingRequests = 0,
  totalViews = 0,
  onlineCount = 0,
  returningRate = 100,
}: PrimaryKpiGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Tổng Doanh thu */}
      <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Tổng doanh thu
          </span>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-100 dark:border-emerald-900/50 group-hover:scale-105 transition-transform">
            <CreditCard size={20} />
          </div>
        </div>
        <div className="mt-3">
          <div className="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
            {revenue.toLocaleString()} <span className="text-base font-semibold text-slate-500">đ</span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs">
            <span className="inline-flex items-center gap-0.5 text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-full">
              <TrendingUp size={12} />
              +100%
            </span>
            <span className="text-slate-400">giai đoạn này</span>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-400 opacity-80" />
      </div>

      {/* 2. Tổng thiệp cưới */}
      <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Thiệp cưới tạo
          </span>
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-100 dark:border-indigo-900/50 group-hover:scale-105 transition-transform">
            <Heart size={20} />
          </div>
        </div>
        <div className="mt-3">
          <div className="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
            {totalWeddings} <span className="text-sm font-medium text-slate-400">thiệp</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-slate-500 dark:text-slate-400">Đang hoạt động trên hệ thống</span>
            <Link
              href="/admin/invitations"
              className="text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-0.5 font-semibold"
            >
              Xem
              <ArrowUpRight size={13} />
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-violet-500 opacity-80" />
      </div>

      {/* 3. Yêu cầu tạo thiệp */}
      <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Yêu cầu tạo thiệp
          </span>
          <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center border border-amber-100 dark:border-amber-900/50 group-hover:scale-105 transition-transform">
            <Inbox size={20} />
          </div>
        </div>
        <div className="mt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
              {pendingRequests}
            </span>
            <span className="text-xs font-semibold text-slate-400">đơn chờ duyệt</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs">
            {pendingRequests > 0 ? (
              <span className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400 font-bold bg-amber-50 dark:bg-amber-950 px-2 py-0.5 rounded-full">
                Cần xử lý ngay
              </span>
            ) : (
              <span className="text-slate-400">Đã giải quyết tất cả</span>
            )}
            <Link
              href="/admin/template-requests"
              className="text-amber-600 dark:text-amber-400 hover:underline inline-flex items-center gap-0.5 font-semibold"
            >
              Chi tiết
              <ArrowUpRight size={13} />
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-orange-400 opacity-80" />
      </div>

      {/* 4. Lượt xem & Khách trực tuyến */}
      <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Lượt truy cập
          </span>
          <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 flex items-center justify-center border border-rose-100 dark:border-rose-900/50 group-hover:scale-105 transition-transform">
            <Eye size={20} />
          </div>
        </div>
        <div className="mt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
              {totalViews.toLocaleString()}
            </span>
            <span className="text-xs font-semibold text-slate-400">views</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              {onlineCount} online
            </span>
            <span className="text-slate-400">
              Quay lại: <strong className="text-slate-700 dark:text-slate-200">{returningRate}%</strong>
            </span>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 to-pink-500 opacity-80" />
      </div>
    </div>
  );
}
