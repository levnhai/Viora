"use client";

import Link from "next/link";
import { Heart, Calendar, ExternalLink, ChevronRight, Edit3 } from "lucide-react";

interface RecentWeddingsListProps {
  weddings?: any[];
}

export function RecentWeddingsList({ weddings = [] }: RecentWeddingsListProps) {
  const displayList = weddings.slice(0, 5);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 p-5 sm:p-6 lg:p-7 shadow-xs flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800/80">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center border border-rose-500/20">
              <Heart className="w-4.5 h-4.5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                  Thiệp Cưới Mới Nhất
                </h3>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/20">
                  Gần đây
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Danh sách các thiệp cưới vừa được khởi tạo
              </p>
            </div>
          </div>
        </div>

        <Link
          href="/admin/invitations"
          className="text-xs sm:text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 inline-flex items-center gap-1 transition-colors group"
        >
          <span>Quản lý tất cả</span>
          <ChevronRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* List */}
      <div className="mt-2 divide-y divide-slate-100 dark:divide-slate-800/60 overflow-x-auto flex-1">
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
                className="py-3.5 px-2 flex items-center justify-between gap-3.5 hover:bg-slate-50/80 dark:hover:bg-slate-800/50 rounded-2xl transition-all group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500/15 to-indigo-500/15 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold text-xs shrink-0 border border-rose-500/20 group-hover:scale-105 transition-transform">
                    <Heart size={18} className="fill-rose-500/20 text-rose-500" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {title}
                      </p>
                      {isPublished ? (
                        <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                          Active
                        </span>
                      ) : (
                        <span className="text-[10px] font-medium px-2 py-0.2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">
                          Draft
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                      <span className="flex items-center gap-1 font-medium text-slate-600 dark:text-slate-400 tabular-nums">
                        <Calendar size={11} />
                        {weddingDate}
                      </span>
                      <span>•</span>
                      <span className="text-slate-400 font-mono text-[11px]">/{slug}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <a
                    href={`/invitation/${slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors active:scale-95"
                    title="Mở xem thiệp online"
                  >
                    <ExternalLink size={15} />
                  </a>
                  <Link
                    href={`/admin/invitations/${wedding._id || wedding.id || slug}`}
                    className="p-2 rounded-xl text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors active:scale-95"
                    title="Chỉnh sửa thiệp"
                  >
                    <Edit3 size={15} />
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <div className="py-12 text-center text-sm font-medium text-slate-400">
            Chưa có thiệp cưới nào được tạo. Hãy tạo thiệp đầu tiên!
          </div>
        )}
      </div>
    </div>
  );
}
