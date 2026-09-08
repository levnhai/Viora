"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import { useGoogleLogin } from "@react-oauth/google";
import { toast, Toaster } from "sonner";

import { authService } from "@/features/auth/api/authService";
import { LoginBanner } from "./components/LoginBanner";
import { LoginForm } from "./components/LoginForm";
import { RegisterForm } from "./components/RegisterForm";
import { RegisterOtpForm } from "./components/RegisterOtpForm";
import { ForgotPasswordForm } from "./components/ForgotPasswordForm";
import { ForgotPasswordOtpForm } from "./components/ForgotPasswordOtpForm";
import { ResetPasswordForm } from "./components/ResetPasswordForm";
import { FaAngleLeft } from "react-icons/fa";

interface UserSessionData {
  role: string;
  username: string;
  name: string;
  picture?: string;
  weddingSlug?: string;
  token?: string;
}

const saveUserSession = (data: UserSessionData) => {
  localStorage.setItem("role", data.role);
  localStorage.setItem("username", data.username);
  localStorage.setItem("name", data.name);
  if (data.token) {
    localStorage.setItem("token", data.token);
  }
  if (data.picture) {
    localStorage.setItem("picture", data.picture);
  } else {
    localStorage.removeItem("picture");
  }
  if (data.weddingSlug) {
    localStorage.setItem("weddingSlug", data.weddingSlug);
  } else {
    localStorage.removeItem("weddingSlug");
  }
};

export function LoginPage() {
  const router = useRouter();
  const navigate = (path: string) => router.push(path);

  // States
  const [mode, setMode] = useState<
    | "login"
    | "register"
    | "register-otp"
    | "register-success"
    | "forgot-password"
    | "forgot-password-otp"
    | "reset-password"
    | "check-email"
  >("login");
  const [email, setEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [loading, setLoading] = useState(false);

  // Social loading states
  const [socialLoading, setSocialLoading] = useState(false);
  const [socialProvider, setSocialProvider] = useState<
    "Google" | "Facebook" | null
  >(null);

  // 1. ĐĂNG NHẬP
  const handleLoginSubmit = async (emailInput: string, passInput: string) => {
    setLoading(true);
    try {
      const data = await authService.login(emailInput, passInput);
      const { role, weddingSlug, name, email: resEmail, token } = data;

      if (role === "admin") {
        throw new Error("tài khoản không tồn tại!");
      }

      saveUserSession({
        role,
        username: resEmail || emailInput,
        name: name || (resEmail || emailInput).split("@")[0],
        weddingSlug,
        token,
      });

      confetti({ particleCount: 100, spread: 60 });
      toast.success("Đăng nhập thành công!");
      navigate("/dashboard");
    } catch (err: any) {
      toast.error(err.message || "Đăng nhập thất bại!");
    } finally {
      setLoading(false);
    }
  };

  // 2. ĐĂNG KÝ
  const handleRegisterSubmit = async (
    emailInput: string,
    passInput: string,
    nameInput: string,
    phoneInput?: string,
  ) => {
    setLoading(true);
    setEmail(emailInput);
    try {
      await authService.register(emailInput, passInput, nameInput, phoneInput);
      toast.success("Mã xác thực OTP đã được gửi về Email của bạn!");
      setMode("register-otp");
    } catch (err: any) {
      toast.error(err.message || "Đăng ký thất bại!");
    } finally {
      setLoading(false);
    }
  };

  // 3. XÁC THỰC OTP ĐĂNG KÝ
  const handleVerifyOtpSubmit = async (code: string) => {
    setLoading(true);
    try {
      const data = await authService.registerVerifyOtp(email, code);
      const { role, weddingSlug, name, email: resEmail, token } = data;

      saveUserSession({
        role,
        username: resEmail || email,
        name: name || (resEmail || email).split("@")[0],
        weddingSlug,
        token,
      });

      setMode("register-success");
      confetti({ particleCount: 100, spread: 60 });
      toast.success("Kích hoạt tài khoản thành công!");
    } catch (err: any) {
      toast.error(err.message || "Mã xác thực không chính xác!");
    } finally {
      setLoading(false);
    }
  };

  // 4. GỬI LẠI OTP
  const handleResendOtp = async () => {
    setLoading(true);
    try {
      await authService.register(email, "secured_otp_resend", "resend"); // Chỉ trigger gửi lại OTP
      toast.success("Đã gửi lại mã xác thực OTP mới!");
    } catch (err: any) {
      toast.error(err.message || "Gửi lại OTP thất bại!");
    } finally {
      setLoading(false);
    }
  };

  // 5. QUÊN MẬT KHẨU
  const handleForgotPasswordSubmit = async (emailInput: string) => {
    setLoading(true);
    setEmail(emailInput);
    try {
      await authService.forgotPassword(emailInput);
      toast.success("Mã OTP khôi phục mật khẩu đã được gửi về Email của bạn!");
      setMode("forgot-password-otp");
    } catch (err: any) {
      toast.error(err.message || "Gửi yêu cầu thất bại!");
    } finally {
      setLoading(false);
    }
  };

  // 5.1 XÁC THỰC OTP QUÊN MẬT KHẨU
  const handleVerifyForgotPasswordOtpSubmit = async (code: string) => {
    setLoading(true);
    try {
      await authService.verifyForgotPasswordOtp(email, code);
      setOtpCode(code);
      toast.success("Mã xác thực chính xác!");
      setMode("reset-password");
    } catch (err: any) {
      toast.error(err.message || "Mã xác thực không chính xác!");
    } finally {
      setLoading(false);
    }
  };

  // 5.2 ĐẶT LẠI MẬT KHẨU MỚI
  const handleResetPasswordSubmit = async (passwordNew: string) => {
    setLoading(true);
    try {
      await authService.resetPassword(email, otpCode, passwordNew);
      toast.success("Đặt lại mật khẩu thành công! Vui lòng đăng nhập lại.");
      setMode("login");
    } catch (err: any) {
      toast.error(err.message || "Đặt lại mật khẩu thất bại!");
    } finally {
      setLoading(false);
    }
  };

  // 6. ĐĂNG NHẬP GOOGLE
  const verifyGoogleWithBackend = async (token: string) => {
    try {
      const data = await authService.loginWithGoogle(token);
      const { role, weddingSlug, name, picture, email: resEmail } = data;

      if (role === "admin") {
        throw new Error("Tài khoản quản trị viên không thể đăng nhập tại đây!");
      }

      saveUserSession({
        role,
        username: resEmail || "google_user",
        name: name || (resEmail || "google_user").split("@")[0],
        picture,
        weddingSlug,
      });

      confetti({ particleCount: 100, spread: 60 });
      toast.success("Đăng nhập bằng Google thành công!");
      navigate("/dashboard");
    } catch (err: any) {
      toast.error(err.message || "Đăng nhập Google thất bại!");
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
        toast.error("Đăng nhập bằng Google thất bại!");
        setSocialLoading(false);
        setSocialProvider(null);
      }
    },
    onError: () => {
      toast.error("Đăng nhập bằng Google thất bại!");
      setSocialLoading(false);
      setSocialProvider(null);
    },
  });

  const handleGoogleLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    if (!clientId) {
      toast.error("Chưa cấu hình Google Client ID cho ứng dụng!");
      return;
    }
    setSocialLoading(true);
    setSocialProvider("Google");
    loginWithGoogle();
  };

  // 7. ĐĂNG NHẬP FACEBOOK (Mô phỏng)
  const handleFacebookLogin = async () => {
    setSocialLoading(true);
    setSocialProvider("Facebook");

    await new Promise((resolve) => setTimeout(resolve, 1500));
    const simulatedEmail = "facebook.demo@viora.vn";
    const simulatedPassword = "oauth_secured_pass_123456";

    try {
      let data;
      try {
        data = await authService.register(
          simulatedEmail,
          simulatedPassword,
          "FB User",
        );
      } catch (err: any) {
        data = await authService.login(simulatedEmail, simulatedPassword);
      }

      const { role, weddingSlug, name, email: resEmail } = data;

      if (role === "admin") {
        throw new Error("Tài khoản quản trị viên không thể đăng nhập tại đây!");
      }

      saveUserSession({
        role,
        username: resEmail || simulatedEmail,
        name: name || (resEmail || simulatedEmail).split("@")[0],
        weddingSlug,
      });

      toast.success("Đăng nhập bằng Facebook thành công!");
      navigate("/dashboard");
    } catch (err: any) {
      toast.error(err.message || "Lỗi liên kết tài khoản Facebook!");
    } finally {
      setSocialLoading(false);
      setSocialProvider(null);
    }
  };

  return (
    <div
      className="theme-pink min-h-screen bg-[#faf5f0] flex select-none antialiased"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* ── BANNER TRÁI (ẨN TRÊN MOBILE) ────────── */}
      <LoginBanner />

      {/* ── FORM BÊN PHẢI (CHỨA MỌI TRẠNG THÁI FORM) ────────── */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between items-center p-6 sm:p-12 md:p-16 bg-[#faf5f0] min-h-screen relative">
        {/* Nút Back quay lại trên Header khi ở các mode OTP/Success/Forgot */}
        <div className="w-full flex items-center justify-between">
          {mode !== "login" ? (
            <button
              onClick={() => {
                if (mode === "register-otp") setMode("register");
                else if (mode === "register-success") setMode("login");
                else if (mode === "forgot-password-otp")
                  setMode("forgot-password");
                else if (mode === "reset-password")
                  setMode("forgot-password-otp");
                else if (mode === "check-email") setMode("forgot-password");
                else setMode("login");
              }}
              className="text-xs text-gray-500 hover:text-[#db2777] font-semibold flex items-center gap-1 transition-colors"
            >
              <FaAngleLeft /> Quay lại
            </button>
          ) : (
            <div />
          )}
        </div>

        {/* Khung chứa các form */}
        <div className="w-full max-w-md my-auto pt-6">
          {/* Màn hình 1: LOGIN FORM */}
          {mode === "login" && (
            <LoginForm
              onLogin={handleLoginSubmit}
              onSwitchRegister={() => setMode("register")}
              onSwitchForgotPassword={() => setMode("forgot-password")}
              onGoogleLogin={handleGoogleLogin}
              onFacebookLogin={handleFacebookLogin}
              loading={loading}
              socialLoading={socialLoading}
              socialProvider={socialProvider}
            />
          )}

          {/* Màn hình 2: REGISTER FORM */}
          {mode === "register" && (
            <RegisterForm
              onRegister={handleRegisterSubmit}
              onSwitchLogin={() => setMode("login")}
              onGoogleLogin={handleGoogleLogin}
              onFacebookLogin={handleFacebookLogin}
              loading={loading}
              socialLoading={socialLoading}
            />
          )}

          {/* Màn hình 3: OTP REGISTER VERIFY */}
          {mode === "register-otp" && (
            <RegisterOtpForm
              email={email}
              onVerifyOtp={handleVerifyOtpSubmit}
              onResendOtp={handleResendOtp}
              loading={loading}
            />
          )}

          {/* Màn hình 4: REGISTER SUCCESS */}
          {mode === "register-success" && (
            <div className="w-full max-w-md mx-auto text-center space-y-6">
              <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center text-3xl mx-auto shadow-inner text-green-500 border border-green-200">
                ✓
              </div>
              <div className="space-y-2">
                <h2
                  className="text-2xl font-serif font-bold text-[#2c1810]"
                  style={{ fontFamily: "'EB Garamond', serif" }}
                >
                  Đăng ký thành công!
                </h2>
                <p className="text-sm text-gray-600">
                  Chào mừng bạn đến với Viora. Tài khoản của bạn đã được kích
                  hoạt.
                </p>
              </div>
              <button
                onClick={() => navigate("/dashboard")}
                className="w-full py-2.5 bg-[#db2777] hover:bg-[#c2185b] text-white font-medium rounded-xl text-sm transition-colors shadow-md shadow-pink-600/10 focus:outline-none"
              >
                Bắt đầu ngay
              </button>
            </div>
          )}

          {/* Màn hình 5: FORGOT PASSWORD */}
          {mode === "forgot-password" && (
            <ForgotPasswordForm
              onForgotPassword={handleForgotPasswordSubmit}
              onSwitchLogin={() => setMode("login")}
              loading={loading}
            />
          )}

          {/* Màn hình 5.1: OTP FORGOT PASSWORD */}
          {mode === "forgot-password-otp" && (
            <ForgotPasswordOtpForm
              email={email}
              onVerifyOtp={handleVerifyForgotPasswordOtpSubmit}
              onResendOtp={() => authService.forgotPassword(email)}
              loading={loading}
            />
          )}

          {/* Màn hình 5.2: RESET PASSWORD */}
          {mode === "reset-password" && (
            <ResetPasswordForm
              onResetPassword={handleResetPasswordSubmit}
              loading={loading}
            />
          )}

          {/* Màn hình 6: CHECK EMAIL REPORT */}
          {mode === "check-email" && (
            <div className="w-full max-w-md mx-auto text-center space-y-6">
              <div className="w-20 h-20 rounded-full bg-pink-50 flex items-center justify-center text-3xl mx-auto shadow-inner text-[#db2777] border border-pink-100">
                ✉️
              </div>
              <div className="space-y-2">
                <h2
                  className="text-2xl font-serif font-bold text-[#2c1810]"
                  style={{ fontFamily: "'EB Garamond', serif" }}
                >
                  Kiểm tra Email của bạn
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Chúng tôi đã gửi liên kết đặt lại mật khẩu tới hòm thư <br />
                  <span className="font-semibold text-[#db2777]">{email}</span>
                </p>
              </div>
              <a
                href="https://mail.google.com"
                target="_blank"
                rel="noreferrer"
                className="block w-full py-2.5 bg-[#db2777] hover:bg-[#c2185b] text-white font-medium rounded-xl text-sm transition-colors text-center shadow-md shadow-pink-600/10"
              >
                Mở Gmail
              </a>
              <button
                onClick={() => setMode("login")}
                className="text-xs text-gray-500 hover:text-[#db2777] font-semibold hover:underline"
              >
                Quay lại đăng nhập
              </button>
            </div>
          )}
        </div>

        {/* Footer copyright */}
        <p className="text-center text-[13px] text-[#7a5c4f]/50 leading-relaxed max-w-xs mt-8">
          Bằng cách tiếp tục, bạn đồng ý với{" "}
          <span className="underline hover:text-[#2c1810] cursor-pointer">
            Điều khoản dịch vụ
          </span>{" "}
          của chúng tôi.
        </p>
      </div>
      <Toaster richColors closeButton position="top-right" />
    </div>
  );
}
