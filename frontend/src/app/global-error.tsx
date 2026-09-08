"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="vi">
      <body className="min-h-screen flex items-center justify-center bg-slate-950 text-white p-6 font-sans">
        <div className="max-w-md w-full bg-slate-900 p-8 rounded-2xl border border-slate-800 text-center space-y-4 shadow-2xl">
          <h2 className="text-xl font-bold text-white">Đã xảy ra sự cố hệ thống</h2>
          <p className="text-xs text-slate-400">
            {error.message || "Vui lòng tải lại trang hoặc liên hệ quản trị viên."}
          </p>
          <button
            onClick={() => reset()}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all"
          >
            Tải lại trang
          </button>
        </div>
      </body>
    </html>
  );
}
