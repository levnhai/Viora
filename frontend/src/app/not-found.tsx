import Link from 'next/link';
import { Compass, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-6 text-slate-800 dark:text-slate-100">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-900/50 text-indigo-600 dark:text-indigo-400 mx-auto flex items-center justify-center">
          <Compass size={32} />
        </div>

        <div className="space-y-2">
          <span className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            404
          </span>
          <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Không tìm thấy trang
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            Đường dẫn bạn vừa truy cập không tồn tại hoặc đã được thay đổi. Vui lòng kiểm tra lại URL.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-md shadow-indigo-600/25 transition-all cursor-pointer"
          >
            <Home size={16} />
            <span>Về trang chủ</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
