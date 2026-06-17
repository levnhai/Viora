import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { Heart, Loader2, ArrowLeft } from "lucide-react";

export function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError("Vui lòng nhập tên đăng nhập và mật khẩu!");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const resData = await response.json();
      if (!response.ok) {
        throw new Error(resData.message || "Đăng nhập thất bại!");
      }

      const { token, role, weddingSlug } = resData.data;

      // Save to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("username", username);
      if (weddingSlug) {
        localStorage.setItem("weddingSlug", weddingSlug);
      } else {
        localStorage.removeItem("weddingSlug");
      }

      // Redirect based on role
      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err: any) {
      setError(err.message || "Đã xảy ra lỗi kết nối đến máy chủ!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fdf6ef] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Back button */}
      <Link to="/" className="absolute top-6 left-6 text-[#7a5c4f] hover:text-[#8b3a52] transition-colors flex items-center gap-2 text-sm font-medium">
        <ArrowLeft size={16} /> Quay lại trang chủ
      </Link>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="w-12 h-12 rounded-full bg-[#8b3a52] flex items-center justify-center mx-auto shadow-sm">
          <Heart size={20} className="text-white" fill="currentColor" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-medium text-[#2c1810]" style={{ fontFamily: "'EB Garamond', serif" }}>
          Đăng nhập hệ thống
        </h2>
        <p className="mt-2 text-center text-sm text-[#7a5c4f]">
          Quản lý thiệp mời online của bạn
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white/60 backdrop-blur-sm py-8 px-6 shadow-md rounded-2xl border border-[#c9828e]/15 sm:px-10">
          <form className="space-y-6" onSubmit={handleLogin}>
            {error && (
              <div className="bg-red-50 text-red-600 text-xs p-3 rounded-lg border border-red-200">
                ⚠️ {error}
              </div>
            )}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#7a5c4f] mb-1.5">
                Tên đăng nhập
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Tên đăng nhập"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none border border-[#c9828e]/30 bg-white focus:border-[#8b3a52] transition-colors text-[#2c1810]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#7a5c4f] mb-1.5">
                Mật khẩu
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none border border-[#c9828e]/30 bg-white focus:border-[#8b3a52] transition-colors text-[#2c1810]"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-[#8b3a52] text-white rounded-xl font-medium hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer border-0"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    Đang đăng nhập...
                  </>
                ) : (
                  <>Đăng nhập</>
                )}
              </button>
            </div>
          </form>
          
          <div className="mt-6 border-t border-[#c9828e]/15 pt-4 text-center">
            <p className="text-xs text-[#7a5c4f] italic">
              Tài khoản được cung cấp sau khi bạn hoàn tất thanh toán dịch vụ.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
