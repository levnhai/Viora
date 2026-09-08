"use client";

import { Sparkles, Eye, ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface TopTemplatesRankProps {
  topTemplates?: Array<{
    id?: string;
    templateId?: string;
    name?: string;
    title?: string;
    views?: number;
    count?: number;
    thumbnail?: string;
    previewUrl?: string;
  }>;
}

export function TopTemplatesRank({
  topTemplates = [],
}: TopTemplatesRankProps) {
  const templates =
    topTemplates.length > 0
      ? topTemplates
      : [
          {
            id: "1",
            title: "Mẫu Minimalist Luxury",
            views: 12,
            thumbnail: "https://images.unsplash.com/photo-1519741497674-611481863552?w=150&auto=format&fit=crop&q=80",
          },
          {
            id: "2",
            title: "Mẫu Vintage Floral Rose",
            views: 8,
            thumbnail: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=150&auto=format&fit=crop&q=80",
          },
          {
            id: "3",
            title: "Mẫu Traditional Red Elegance",
            views: 5,
            thumbnail: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=150&auto=format&fit=crop&q=80",
          },
        ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 tracking-tight flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            Top Mẫu Thiệp Được Yêu Thích
          </h3>
          <Link
            href="/admin/invitations"
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-0.5"
          >
            Tất cả
            <ArrowUpRight size={13} />
          </Link>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          Các mẫu thiết kế thu hút nhiều lượt xem và tương tác nhất
        </p>
      </div>

      <div className="mt-4 space-y-3">
        {templates.map((tpl, idx) => (
          <div
            key={tpl.id || idx}
            className="flex items-center justify-between p-3 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 border border-slate-100 dark:border-slate-800 transition-all group"
          >
            <div className="flex items-center gap-3 min-w-0">
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  idx === 0
                    ? "bg-amber-500 text-white shadow-xs shadow-amber-500/30"
                    : idx === 1
                    ? "bg-slate-300 dark:bg-slate-700 text-slate-700 dark:text-slate-200"
                    : "bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200"
                }`}
              >
                {idx + 1}
              </span>
              <img
                src={
                  tpl.thumbnail ||
                  "https://images.unsplash.com/photo-1519741497674-611481863552?w=150&auto=format&fit=crop&q=80"
                }
                alt={tpl.title || tpl.name || "Template"}
                className="w-10 h-10 rounded-lg object-cover border border-slate-200 dark:border-slate-700 shrink-0 shadow-2xs"
              />
              <div className="truncate">
                <p className="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
                  {tpl.title || tpl.name || `Mẫu thiệp cưới #${idx + 1}`}
                </p>
                <p className="text-[11px] text-slate-400">
                  Thiết kế hiện đại
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0 ml-3 text-xs font-mono font-bold text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-200/60 dark:border-slate-700">
              <Eye size={12} className="text-rose-500" />
              <span>{(tpl.views || tpl.count || 0).toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
