"use client";

import Link from "next/link";
import { Heart, Calendar, ExternalLink, ChevronRight, Edit3 } from "lucide-react";

interface RecentWeddingsListProps {
  weddings?: any[];
}

export function RecentWeddingsList({ weddings = [] }: RecentWeddingsListProps) {
  const displayList = weddings.slice(0, 5);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-sm flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 tracking-tight flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-500" />
              Thiệp Cưới Mới Tạo Gần Đây
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-900/50">
              Vừa tạo
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Các thiệp cưới được khởi tạo và cập nhật gần nhất
          </p>
        </div>

        <Link
          href="/admin/invitations"
          className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1"
        >
          Quản lý tất cả
          <ChevronRight size={14} />
        </Link>
      </div>

      {/* List */}
      <div className="mt-3 divide-y divide-slate-100 dark:divide-slate-800/80 overflow-x-auto">
        {displayList.length > 0 ? (
          displayList.map((wedding: any, idx: number) => {
            const title =
              wedding.title ||
              `${wedding.groomName || "Chú rể"} & ${wedding.brideName || "Cô dâu"}`;
            const slug = wedding.slug || `wedding-${idx + 1}`;
            const weddingDate = wedding.date
              ? new Date(wedding.date).toLocaleDateString("vi-VN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })
              : "Chưa đặt ngày";
            const isPublished = wedding.isPublished !== false;

            return (
              <div
                key={wedding._id || wedding.id || idx}
                className="py-3 flex items-center justify-between gap-4 hover:bg-slate-50/70 dark:hover:bg-slate-800/50 px-2 rounded-xl transition-colors group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-500/10 to-indigo-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold text-xs shrink-0 border border-rose-200/40 dark:border-rose-900/30">
                    <Heart size={16} className="fill-rose-500/20" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {title}
                      </p>
                      {isPublished ? (
                        <span className="text-[9px] font-semibold px-1.5 py-0.2 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-900/40">
                          Active
                        </span>
                      ) : (
                        <span className="text-[9px] font-semibold px-1.5 py-0.2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">
                          Draft
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                      <span className="flex items-center gap-1 font-mono">
                        <Calendar size={11} />
                        {weddingDate}
                      </span>
                      <span>•</span>
                      <span className="font-mono text-slate-400">/{slug}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={`/invitation/${slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    title="Mở xem thiệp online"
                  >
                    <ExternalLink size={14} />
                  </a>
                  <Link
                    href={`/admin/invitations/${wedding._id || wedding.id || slug}`}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    title="Chỉnh sửa thiệp"
                  >
                    <Edit3 size={14} />
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <div className="py-8 text-center text-xs text-slate-400">
            Chưa có thiệp cưới nào được tạo. Hãy tạo thiệp đầu tiên!
          </div>
        )}
      </div>
    </div>
  );
}
