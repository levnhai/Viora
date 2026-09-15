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
  paidWeddings?: number;
  totalWeddings?: number;
  pendingRequests?: number;
  totalViews?: number;
  onlineCount?: number;
  returningRate?: number;
}

export function PrimaryKpiGrid({
  revenue = 0,
  paidWeddings = 0,
  totalWeddings = 0,
  pendingRequests = 0,
  totalViews = 0,
  onlineCount = 0,
  returningRate = 100,
}: PrimaryKpiGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
      {/* 1. Tổng Doanh thu */}
      <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 p-5 sm:p-6 border border-slate-200/80 dark:border-slate-800/80 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between min-h-[175px]">
        <div>
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Tổng doanh thu
            </span>
            <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/20 group-hover:scale-110 transition-transform shrink-0">
              <CreditCard size={20} />
            </div>
          </div>
          <div className="mt-3.5">
            <div className="text-2xl sm:text-3xl lg:text-[34px] font-black text-slate-900 dark:text-white tracking-tight tabular-nums flex items-baseline gap-1.5 leading-none">
              <span>{revenue.toLocaleString("vi-VN")}</span>
              <span className="text-base sm:text-lg font-bold text-emerald-600 dark:text-emerald-400">₫</span>
            </div>
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/70 flex items-center justify-between text-xs gap-2">
          <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-300 font-bold bg-emerald-500/10 px-2.5 py-0.5 rounded-full text-[11px] border border-emerald-500/20">
            <TrendingUp size={12} />
            {paidWeddings} thiệp đã mua
          </span>
          <span className="text-slate-400 text-[11px] font-medium truncate" title="Chỉ tính thiệp thực tế thanh toán">
            Thực tế
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-400" />
      </div>

      {/* 2. Tổng thiệp cưới */}
      <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 p-5 sm:p-6 border border-slate-200/80 dark:border-slate-800/80 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between min-h-[175px]">
        <div>
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Thiệp cưới đã tạo
            </span>
            <div className="w-11 h-11 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-500/20 group-hover:scale-110 transition-transform shrink-0">
              <Heart size={20} />
            </div>
          </div>
          <div className="mt-3.5">
            <div className="text-2xl sm:text-3xl lg:text-[34px] font-black text-slate-900 dark:text-white tracking-tight tabular-nums flex items-baseline gap-2 leading-none">
              <span>{totalWeddings}</span>
              <span className="text-sm font-semibold text-slate-400 dark:text-slate-500">thiệp</span>
            </div>
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/70 flex items-center justify-between text-xs">
          <span className="text-slate-500 dark:text-slate-400 font-medium text-[11px] truncate">
            {paidWeddings} thật · {Math.max(0, totalWeddings - paidWeddings)} mẫu demo
          </span>
          <Link
            href="/admin/invitations"
            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-bold inline-flex items-center gap-0.5 text-xs transition-colors shrink-0 ml-1"
          >
            <span>Xem</span>
            <ArrowUpRight size={13} />
          </Link>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-violet-500" />
      </div>

      {/* 3. Yêu cầu tạo thiệp */}
      <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 p-5 sm:p-6 border border-slate-200/80 dark:border-slate-800/80 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between min-h-[175px]">
        <div>
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Yêu cầu làm thiệp
            </span>
            <div className="w-11 h-11 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center border border-amber-500/20 group-hover:scale-110 transition-transform shrink-0">
              <Inbox size={20} />
            </div>
          </div>
          <div className="mt-3.5">
            <div className="text-2xl sm:text-3xl lg:text-[34px] font-black text-slate-900 dark:text-white tracking-tight tabular-nums flex items-baseline gap-2 leading-none">
              <span>{pendingRequests}</span>
              <span className="text-sm font-semibold text-slate-400 dark:text-slate-500">đơn</span>
            </div>
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/70 flex items-center justify-between text-xs">
          {pendingRequests > 0 ? (
            <span className="inline-flex items-center gap-1 text-amber-700 dark:text-amber-300 font-bold bg-amber-500/10 px-2.5 py-0.5 rounded-full text-[11px] border border-amber-500/20">
              Cần duyệt ngay
            </span>
          ) : (
            <span className="text-slate-400 font-medium text-[11px]">Đã xử lý tất cả</span>
          )}
          <Link
            href="/admin/template-requests"
            className="text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 font-bold inline-flex items-center gap-0.5 text-xs transition-colors shrink-0 ml-1"
          >
            <span>Chi tiết</span>
            <ArrowUpRight size={13} />
          </Link>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-orange-400" />
      </div>

      {/* 4. Lượt xem & Khách trực tuyến */}
      <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 p-5 sm:p-6 border border-slate-200/80 dark:border-slate-800/80 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between min-h-[175px]">
        <div>
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Lưu lượng xem
            </span>
            <div className="w-11 h-11 rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center border border-rose-500/20 group-hover:scale-110 transition-transform shrink-0">
              <Eye size={20} />
            </div>
          </div>
          <div className="mt-3.5">
            <div className="text-2xl sm:text-3xl lg:text-[34px] font-black text-slate-900 dark:text-white tracking-tight tabular-nums flex items-baseline gap-2 leading-none">
              <span>{totalViews.toLocaleString("vi-VN")}</span>
              <span className="text-sm font-semibold text-slate-400 dark:text-slate-500">lượt xem</span>
            </div>
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/70 flex items-center justify-between text-xs gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold text-[11px]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>{onlineCount} online</span>
          </span>
          <span className="text-slate-400 text-[11px] font-medium">
            Quay lại: <strong className="text-slate-700 dark:text-slate-200 font-bold tabular-nums">{returningRate}%</strong>
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 to-pink-500" />
      </div>
    </div>
  );
}
