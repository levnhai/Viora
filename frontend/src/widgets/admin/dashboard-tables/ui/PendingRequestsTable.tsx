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
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-sm flex flex-col justify-between">
      {/* Table Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 tracking-tight flex items-center gap-2">
              <Inbox className="w-4 h-4 text-amber-500" />
              Yêu Cầu Tạo Thiệp Cần Xử Lý
            </h3>
            {requestsList.length > 0 && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 border border-amber-200/60 dark:border-amber-900/50">
                {requestsList.length} đơn
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Khách hàng vừa để lại thông tin đăng ký tư vấn và thiết kế thiệp
          </p>
        </div>

        <Link
          href="/admin/template-requests"
          className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1"
        >
          Xem tất cả
          <ChevronRight size={14} />
        </Link>
      </div>

      {/* Requests List */}
      <div className="mt-3 divide-y divide-slate-100 dark:divide-slate-800/80 overflow-x-auto">
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
                className="py-3 flex items-center justify-between gap-4 hover:bg-slate-50/70 dark:hover:bg-slate-800/50 px-2 rounded-xl transition-colors group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-xs shrink-0 border border-amber-200/60 dark:border-amber-900/40">
                    {customerName.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {customerName}
                    </p>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                      <span className="flex items-center gap-1 font-mono">
                        <Phone size={11} className="text-slate-400" />
                        {contact}
                      </span>
                      <span>•</span>
                      <span className="truncate max-w-[120px]">
                        {templateName}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="hidden sm:flex items-center gap-1 text-[11px] text-slate-400 font-mono">
                    <Clock size={11} />
                    {timeAgo}
                  </span>
                  <Link
                    href="/admin/template-requests"
                    className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white transition-all shadow-2xs"
                  >
                    Duyệt đơn
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <div className="py-8 text-center text-xs text-slate-400">
            Hiện không có yêu cầu nào đang chờ xử lý 🎉
          </div>
        )}
      </div>
    </div>
  );
}
