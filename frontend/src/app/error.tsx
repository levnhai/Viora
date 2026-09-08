"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Next.js App Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-6 text-slate-800 dark:text-slate-100">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900/50 text-rose-500 mx-auto flex items-center justify-center">
          <AlertCircle size={24} />
        </div>
        <div className="space-y-1">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Đã xảy ra lỗi
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {error.message || "Có vấn đề phát sinh khi tải giao diện trang."}
          </p>
        </div>
        <button
          onClick={() => reset()}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/25 transition-all cursor-pointer"
        >
          <RefreshCw size={14} />
          <span>Thử lại</span>
        </button>
      </div>
    </div>
  );
}
