"use client";

import Link from "next/link";
import { Inbox, ArrowUpRight, Phone, Clock, ChevronRight } from "lucide-react";

interface PendingRequestsTableProps {
  requestsList?: any[];
}

export function PendingRequestsTable({
  requestsList = [],
}: PendingRequestsTableProps) {
  const displayList = requestsList.slice(0, 5);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 p-5 sm:p-6 lg:p-7 shadow-xs flex flex-col justify-between h-full">
      {/* Table Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800/80">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center border border-amber-500/20">
              <Inbox className="w-4.5 h-4.5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                  Yêu Cầu Làm Thiệp
                </h3>
                {requestsList.length > 0 && (
                  <span className="text-xs font-black px-2 py-0.5 rounded-full bg-amber-500 text-white shadow-2xs tabular-nums">
                    {requestsList.length}
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Khách hàng để lại thông tin tư vấn thiệp
              </p>
            </div>
          </div>
        </div>

        <Link
          href="/admin/template-requests"
          className="text-xs sm:text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 inline-flex items-center gap-1 transition-colors group"
        >
          <span>Xem tất cả</span>
          <ChevronRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* Requests List */}
      <div className="mt-2 divide-y divide-slate-100 dark:divide-slate-800/60 overflow-x-auto flex-1">
        {displayList.length > 0 ? (
          displayList.map((req: any, idx: number) => {
            const customerName =
              req.name || req.fullName || `Khách hàng #${idx + 1}`;
            const contact =
              req.phone || req.phoneNumber || req.email || "Chưa có SĐT";
            const templateName =
              req.templateName || req.notes || "Yêu cầu thiệp cưới";
            const timeAgo = req.createdAt
              ? new Date(req.createdAt).toLocaleDateString("vi-VN", {
                  day: "2-digit",
                  month: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "Hôm nay";

            return (
              <div
                key={req._id || req.id || idx}
                className="py-3.5 px-2 flex items-center justify-between gap-3.5 hover:bg-slate-50/80 dark:hover:bg-slate-800/50 rounded-2xl transition-all group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-black text-sm shrink-0 border border-amber-500/20 group-hover:scale-105 transition-transform">
                    {customerName.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {customerName}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                      <span className="flex items-center gap-1 font-medium text-slate-600 dark:text-slate-400 tabular-nums">
                        <Phone size={11} className="text-slate-400" />
                        {contact}
                      </span>
                      <span>•</span>
                      <span className="truncate max-w-[140px] text-slate-500 dark:text-slate-400">
                        {templateName}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  <span className="hidden sm:flex items-center gap-1 text-[11px] text-slate-400 tabular-nums">
                    <Clock size={11} />
                    {timeAgo}
                  </span>
                  <Link
                    href="/admin/template-requests"
                    className="text-xs font-bold px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white transition-all shadow-2xs active:scale-95"
                  >
                    Duyệt đơn
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <div className="py-12 text-center text-sm font-medium text-slate-400">
            Hiện không có yêu cầu nào đang chờ xử lý 🎉
          </div>
        )}
      </div>
    </div>
  );
}
