'use client';

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Heart, Loader2, ArrowLeft, Mail, Lock, Eye, EyeOff, Sparkles, KeyRound, RefreshCw, Edit } from "lucide-react";
import confetti from "canvas-confetti";
import { useGoogleLogin } from "@react-oauth/google";

export function LoginPage() {
  const router = useRouter();
  const navigate = (path: string) => router.push(path);
  
  // States
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<"email" | "otp">("email");
  const [otpCode, setOtpCode] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [timer, setTimer] = useState(0);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Social loading states
  const [socialLoading, setSocialLoading] = useState(false);
  const [socialProvider, setSocialProvider] = useState<"Google" | "Facebook" | null>(null);

  // Timer countdown hook for OTP resend
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    if (timer > 0) {
      intervalRef.current = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [timer]);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Vui lòng nhập địa chỉ Email!");
      return;
    }
    
    // Simple email validation
    if (!email.includes("@")) {
      setError("Email không đúng định dạng!");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:8080/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.message || "Không thể gửi mã xác thực!");
      }

      setStep("otp");
      setTimer(30);

      // Extract OTP from fallback message if present (for local testing/no SMTP config)
      const match = resData.message?.match(/(?:OTP|Mã OTP)(?:.*)?:\s*(\d{6})/i);
      if (match && match[1]) {
        setGeneratedOtp(match[1]);
      } else {
        setGeneratedOtp("");
      }
    } catch (err: any) {
      setError(err.message || "Đã xảy ra lỗi khi gửi mã xác thực!");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode.trim()) {
      setError("Vui lòng nhập mã xác thực OTP!");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:8080/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), code: otpCode.trim() }),
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.message || "Mã xác thực không chính xác hoặc đã hết hạn!");
      }

      const { token, role, weddingSlug, name, email: responseEmail } = resData.data;

      // Save to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("username", responseEmail || email.trim());
      localStorage.setItem("name", name || (responseEmail || email.trim()).split('@')[0]);
      if (weddingSlug) {
        localStorage.setItem("weddingSlug", weddingSlug);
      } else {
        localStorage.removeItem("weddingSlug");
      }

      // Successful confetti explosion!
      confetti({ particleCount: 100, spread: 60 });

      // Redirect to home page
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Đã xảy ra lỗi trong quá trình xác thực!");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (timer > 0) return;
    
    setLoading(true);
    setError(null);
    setOtpCode("");

    try {
      const response = await fetch("http://localhost:8080/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.message || "Không thể gửi lại mã xác thực!");
      }

      setTimer(30);

      // Extract OTP from fallback message if present
      const match = resData.message?.match(/(?:OTP|Mã OTP)(?:.*)?:\s*(\d{6})/i);
      if (match && match[1]) {
        setGeneratedOtp(match[1]);
      } else {
        setGeneratedOtp("");
      }
    } catch (err: any) {
      setError(err.message || "Đã xảy ra lỗi khi gửi lại mã xác thực!");
    } finally {
      setLoading(false);
    }
  };

  const verifyGoogleWithBackend = async (token: string) => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.message || "Xác thực Google với hệ thống thất bại!");
      }

      const { token: systemToken, role, weddingSlug, name, picture, email } = resData.data;

      // Save to localStorage
      localStorage.setItem("token", systemToken);
      localStorage.setItem("role", role);
      localStorage.setItem("username", email || "google_user");
      localStorage.setItem("name", name || (email || "google_user").split('@')[0]);
      if (picture) {
        localStorage.setItem("picture", picture);
      } else {
        localStorage.removeItem("picture");
      }
      if (weddingSlug) {
        localStorage.setItem("weddingSlug", weddingSlug);
      } else {
        localStorage.removeItem("weddingSlug");
      }

      // Successful login
      confetti({ particleCount: 100, spread: 60 });

      // Redirect to home page
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Đã xảy ra lỗi khi đăng nhập bằng Google!");
    } finally {
      setSocialLoading(false);
      setSocialProvider(null);
    }
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      if (tokenResponse.access_token) {
        await verifyGoogleWithBackend(tokenResponse.access_token);
      } else {
        setError("Đăng nhập bằng Google thất bại (không có access token)!");
        setSocialLoading(false);
        setSocialProvider(null);
      }
    },
    onError: (error) => {
      console.error("Lỗi đăng nhập Google:", error);
      setError("Đăng nhập bằng Google thất bại!");
      setSocialLoading(false);
      setSocialProvider(null);
    },
  });

  const handleGoogleLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    if (!clientId) {
      setError("Chưa cấu hình Google Client ID cho ứng dụng! Không thể đăng nhập bằng Google.");
      return;
    }

    setSocialLoading(true);
    setSocialProvider("Google");
    setError(null);
    loginWithGoogle();
  };

  const handleSocialLogin = async (provider: "Facebook") => {
    setSocialLoading(true);
    setSocialProvider(provider);
    setError(null);

    // Simulate OAuth handshake
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const simulatedEmail = "facebook.demo.viora@facebook.com";
    const simulatedPassword = "oauth_secured_pass_123456";

    try {
      // Step 1: Try to register this social user first
      let response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: simulatedEmail, password: simulatedPassword }),
      });

      let resData = await response.json();

      // Step 2: If register fails because user exists, log them in
      if (!response.ok && resData.message?.toLowerCase().includes("tồn tại")) {
        response = await fetch("http://localhost:8080/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: simulatedEmail, password: simulatedPassword }),
        });
        resData = await response.json();
      }

      if (!response.ok) {
        throw new Error(resData.message || `Đăng nhập qua ${provider} thất bại!`);
      }

      const { token, role, weddingSlug, name, email } = resData.data;

      // Save to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("username", email || simulatedEmail);
      localStorage.setItem("name", name || (email || simulatedEmail).split('@')[0]);
      if (weddingSlug) {
        localStorage.setItem("weddingSlug", weddingSlug);
      } else {
        localStorage.removeItem("weddingSlug");
      }

      // Redirect to home page
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Đã xảy ra lỗi trong quá trình liên kết tài khoản!");
    } finally {
      setSocialLoading(false);
      setSocialProvider(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0a09] text-slate-100 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 relative select-none antialiased font-sans">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(219,39,119,0.08)_0%,transparent_70%)] pointer-events-none" />
      
      {/* Back button */}
      <Link href="/" className="absolute top-6 left-6 text-slate-400 hover:text-white transition-colors flex items-center gap-2 text-xs font-semibold uppercase tracking-wider no-underline">
        <ArrowLeft size={14} /> Quay lại trang chủ
      </Link>

      <div className="w-full max-w-md space-y-8 z-10">
        {/* Header */}
        <div className="text-center space-y-2.5">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#db2777] to-red-500 flex items-center justify-center mx-auto shadow-lg shadow-pink-900/20">
            <Heart size={24} className="text-white animate-pulse" fill="currentColor" />
          </div>
          <h2 className="text-3xl font-semibold text-white tracking-wide" style={{ fontFamily: "'EB Garamond', serif" }}>
            Đăng nhập hệ thống
          </h2>
          <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
            Nhập email của bạn để nhận mã xác thực đăng nhập nhanh không cần mật khẩu.
          </p>
        </div>

        {/* Auth Card Box */}
        <div className="bg-[#1c1917]/80 backdrop-blur-md border border-[#292524] rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6 relative overflow-hidden">
          
          {error && (
            <div className="bg-red-950/40 text-red-400 text-2xs p-3.5 rounded-xl border border-red-900/40 flex items-center gap-2.5 animate-fade-in">
              <span>⚠️</span>
              <span className="flex-1 font-medium">{error}</span>
            </div>
          )}

          {step === "otp" && generatedOtp && (
            /* Visual simulated OTP alert box for test ease */
            <div className="bg-[#db2777]/10 text-[#db2777] text-2xs p-3.5 rounded-xl border border-[#db2777]/20 flex items-center justify-between gap-2.5 animate-pulse">
              <span className="flex items-center gap-1.5 font-semibold">
                <KeyRound size={12} />
                <span>Mã xác thực thử nghiệm gửi về Email:</span>
              </span>
              <span className="font-mono text-xs font-bold bg-[#db2777]/20 px-2 py-0.5 rounded-md border border-[#db2777]/30 select-all">
                {generatedOtp}
              </span>
            </div>
          )}

          {/* Form Switch Area: Email step or OTP step */}
          {step === "email" ? (
            /* STEP 1: INPUT EMAIL */
            <form className="space-y-4" onSubmit={handleSendOtp}>
              <div className="space-y-1.5">
                <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Địa chỉ Email đăng nhập
                </label>
                <div className="relative flex items-center rounded-xl border border-[#292524] bg-[#0c0a09] focus-within:border-[#db2777] transition-all">
                  <span className="pl-4 text-slate-500"><Mail size={14} /></span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-3 pr-4 py-3 bg-transparent text-xs text-white outline-none border-0 placeholder-slate-600"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || socialLoading}
                className="w-full mt-2 py-3.5 bg-gradient-to-r from-[#db2777] to-pink-700 hover:opacity-95 text-white rounded-xl text-xs font-semibold active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer border-0 shadow-md shadow-pink-900/10 font-sans"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Đang gửi mã...</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={13} />
                    <span>Gửi mã xác thực</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            /* STEP 2: INPUT OTP */
            <form className="space-y-4" onSubmit={handleVerifyOtp}>
              {/* Back to change email */}
              <div className="flex items-center justify-between text-2xs mb-2">
                <span className="text-slate-400 flex items-center gap-1">
                  Mã gửi tới: <strong className="text-slate-200 font-mono">{email}</strong>
                </span>
                <button
                  type="button"
                  onClick={() => { setStep("email"); setError(null); }}
                  className="text-[#db2777] hover:underline bg-transparent border-0 cursor-pointer flex items-center gap-1 font-semibold"
                >
                  <Edit size={10} /> Đổi Email
                </button>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Nhập mã xác thực (OTP)
                </label>
                <div className="relative flex items-center rounded-xl border border-[#292524] bg-[#0c0a09] focus-within:border-[#db2777] transition-all">
                  <span className="pl-4 text-slate-500"><KeyRound size={14} /></span>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/[^0-9]/g, ""))}
                    placeholder="Mã gồm 6 chữ số"
                    className="w-full pl-3 pr-4 py-3 bg-transparent text-xs text-white outline-none border-0 placeholder-slate-600 tracking-widest text-left"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3.5 bg-gradient-to-r from-[#db2777] to-pink-700 hover:opacity-95 text-white rounded-xl text-xs font-semibold active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer border-0 shadow-md shadow-pink-900/10 font-sans"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Đang đăng nhập...</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={13} />
                    <span>Xác nhận & Đăng nhập</span>
                  </>
                )}
              </button>

              {/* Resend button with timer countdown */}
              <div className="text-center pt-2">
                {timer > 0 ? (
                  <p className="text-3xs text-slate-500">
                    Bạn có thể gửi lại mã xác thực sau <strong className="text-slate-300 font-mono">{timer}s</strong>
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={loading}
                    className="text-xs text-slate-400 hover:text-white transition-colors bg-transparent border-0 cursor-pointer flex items-center gap-1.5 mx-auto font-medium"
                  >
                    <RefreshCw size={12} className={loading ? "animate-spin" : ""} /> Gửi lại mã xác thực
                  </button>
                )}
              </div>
            </form>
          )}

          {/* Divider */}
          <div className="relative flex items-center justify-center py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#292524]" />
            </div>
            <span className="relative bg-[#1c1917] px-3.5 text-[10px] uppercase tracking-widest text-slate-500 font-semibold select-none">
              Hoặc tiếp tục bằng
            </span>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-3.5">
            {/* Google */}
            <button
              onClick={() => handleGoogleLogin()}
              disabled={socialLoading || loading}
              className="flex items-center justify-center gap-2.5 bg-[#0c0a09] hover:bg-[#292524]/40 border border-[#292524] hover:border-slate-700/80 px-4 py-3 rounded-xl text-xs font-semibold text-slate-200 transition-all cursor-pointer disabled:opacity-50"
            >
              {socialLoading && socialProvider === "Google" ? (
                <Loader2 className="w-4 h-4 animate-spin text-[#db2777]" />
              ) : (
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              )}
              <span>Google</span>
            </button>

            {/* Facebook */}
            <button
              onClick={() => handleSocialLogin("Facebook")}
              disabled={socialLoading || loading}
              className="flex items-center justify-center gap-2.5 bg-[#0c0a09] hover:bg-[#292524]/40 border border-[#292524] hover:border-slate-700/80 px-4 py-3 rounded-xl text-xs font-semibold text-slate-200 transition-all cursor-pointer disabled:opacity-50"
            >
              {socialLoading && socialProvider === "Facebook" ? (
                <Loader2 className="w-4 h-4 animate-spin text-[#db2777]" />
              ) : (
                <svg className="w-4 h-4 shrink-0 fill-[#1877F2]" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              )}
              <span>Facebook</span>
            </button>
          </div>

        </div>

        {/* Brand footer details */}
        <p className="text-center text-[10px] text-slate-500">
          Bằng cách tiếp tục, bạn đồng ý với Điều khoản và Chính sách bảo mật của Viora.
        </p>
      </div>
    </div>
  );
}
