'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, Loader2, ArrowRight, ShieldCheck } from "lucide-react";
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
      setError("Vui lòng nhập đầy đủ email và mật khẩu.");
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
    <div className="min-h-screen bg-gradient-to-br from-[#faf8f5] to-[#f0e6e6] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-[#c9828e]/20 overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#8b3a52] p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none"></div>
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-md">
            <ShieldCheck size={32} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-wide" style={{ fontFamily: "'EB Garamond', serif" }}>
            Quản Trị Hệ Thống
          </h1>
          <p className="text-white/80 text-sm mt-2">Viora Wedding Admin Portal</p>
        </div>

        {/* Form */}
        <div className="p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100 flex items-start gap-2">
              <span className="font-semibold text-red-700">Lỗi:</span> {error}
            </div>
          )}

          <form onSubmit={handleLogin} autoComplete="off" className="space-y-6">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-[#2c1810]">Tài khoản / Email quản trị</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-[#c9828e]" />
                </div>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[#faf8f5] border border-[#e6d5d8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8b3a52]/30 focus:border-[#8b3a52] transition-all text-[#2c1810]"
                  placeholder="Nhập tài khoản hoặc email"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-[#2c1810]">Mật khẩu</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-[#c9828e]" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[#faf8f5] border border-[#e6d5d8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8b3a52]/30 focus:border-[#8b3a52] transition-all text-[#2c1810]"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#8b3a52] hover:bg-[#722f42] text-white py-3.5 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-md shadow-[#8b3a52]/20"
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
        <div className="bg-[#faf5f0] p-4 text-center border-t border-[#c9828e]/10">
          <p className="text-xs text-[#7a5c4f]">
            Khu vực dành riêng cho nhân viên. <br/>Mọi truy cập trái phép đều được ghi nhận.
          </p>
        </div>
      </div>
    </div>
  );
}
