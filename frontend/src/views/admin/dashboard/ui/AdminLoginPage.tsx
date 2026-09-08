'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, Loader2, ArrowRight, ShieldCheck, Heart } from "lucide-react";
import { authService } from "@/features/auth/api/authService";
import { toast } from "sonner";

export function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Vui lòng nhập đầy đủ email/tài khoản và mật khẩu.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await authService.login(email, password);

      if (data.role !== "admin" && data.role !== "staff") {
        throw new Error("Tài khoản không có quyền quản trị viên.");
      }

      localStorage.setItem("role", data.role);
      localStorage.setItem("username", data.name || email);

      toast.success("Đăng nhập quản trị thành công!");
      router.push("/admin");
    } catch (err: any) {
      setError(err.message || "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
      toast.error("Đăng nhập thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-200/80 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-tr from-indigo-600 via-indigo-600 to-violet-600 p-8 text-center relative overflow-hidden text-white">
          <div className="w-14 h-14 bg-white/15 rounded-2xl flex items-center justify-center mx-auto mb-3 backdrop-blur-md shadow-inner border border-white/20">
            <Heart size={28} className="text-white fill-white" />
          </div>
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <span className="text-xl font-black tracking-wide">VIORA</span>
            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-white/20 text-white">
              ADMIN
            </span>
          </div>
          <p className="text-white/80 text-xs">
            Trung tâm quản trị hệ thống thiệp cưới
          </p>
        </div>

        {/* Form */}
        <div className="p-8">
          {error && (
            <div className="mb-6 p-4 bg-rose-50 text-rose-700 text-xs font-semibold rounded-xl border border-rose-200/80 flex items-start gap-2">
              <span className="font-bold">Lỗi:</span> {error}
            </div>
          )}

          <form onSubmit={handleLogin} autoComplete="off" className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Tài khoản hoặc Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail size={17} />
                </div>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all text-slate-800 text-sm font-medium"
                  placeholder="admin@viora.vn hoặc username"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Mật khẩu
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock size={17} />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all text-slate-800 text-sm font-medium"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-60 shadow-md shadow-indigo-600/20 hover:scale-[1.01]"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> Đang đăng nhập...
                </>
              ) : (
                <>
                  Đăng nhập vào hệ thống <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 p-4 text-center border-t border-slate-100">
          <p className="text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
            <ShieldCheck size={14} className="text-emerald-500" />
            Khu vực bảo mật dành riêng cho quản trị viên Viora
          </p>
        </div>
      </div>
    </div>
  );
}
