"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import { useGoogleLogin } from "@react-oauth/google";
import { toast, Toaster } from "sonner";

import { authService } from "@/features/auth/api/authService";
import { LeftPanel } from "./components/LeftPanel";
import { LoginHeader } from "./components/LoginHeader";
import { LoginOptions } from "./components/LoginOptions";
import { EmailForm } from "./components/EmailForm";
import { OtpForm } from "./components/OtpForm";

const otpResendDelay = 60;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface UserSessionData {
  role: string;
  username: string;
  name: string;
  picture?: string;
  weddingSlug?: string;
}

const saveUserSession = (data: UserSessionData) => {
  localStorage.setItem("role", data.role);
  localStorage.setItem("username", data.username);
  localStorage.setItem("name", data.name);
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
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<"options" | "email" | "otp">("options");
  const [otpCode, setOtpCode] = useState("");
  const [timer, setTimer] = useState(0);
  const [loading, setLoading] = useState(false);

  // Social loading states
  const [socialLoading, setSocialLoading] = useState(false);
  const [socialProvider, setSocialProvider] = useState<
    "Google" | "Facebook" | null
  >(null);

  // Timer logic for OTP resend
  useEffect(() => {
    if (timer <= 0) return;

    const timeout = setTimeout(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [timer]);

  // Reset OTP values when step changes away from OTP
  const [otpValues, setOtpValues] = useState<string[]>(Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (step !== "otp") {
      setOtpValues(Array(6).fill(""));
      setOtpCode("");
    }
  }, [step]);

  // Handle individual input changes
  const handleOtpChange = (index: number, value: string) => {
    const cleanVal = value.replace(/[^0-9]/g, "");
    if (!cleanVal) {
      const newVals = [...otpValues];
      newVals[index] = "";
      setOtpValues(newVals);
      setOtpCode(newVals.join(""));
      return;
    }

    const char = cleanVal[cleanVal.length - 1];
    const newVals = [...otpValues];
    newVals[index] = char;
    setOtpValues(newVals);
    setOtpCode(newVals.join(""));

    if (index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace navigation
  const handleOtpKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace") {
      if (!otpValues[index] && index > 0 && inputRefs.current[index - 1]) {
        const newVals = [...otpValues];
        newVals[index - 1] = "";
        setOtpValues(newVals);
        setOtpCode(newVals.join(""));
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  // Handle pasting full OTP code
  const handleOtpPaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/[^0-9]/g, "")
      .slice(0, 6);
    if (pastedData.length === 6) {
      const newVals = pastedData.split("");
      setOtpValues(newVals);
      setOtpCode(pastedData);
      inputRefs.current[5]?.focus();
    }
  };

  // Send OTP trigger
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Vui lòng nhập địa chỉ Email!");
      return;
    }

    if (!emailRegex.test(email.trim())) {
      toast.error("Email không đúng định dạng!");
      return;
    }

    setLoading(true);

    try {
      await authService.sendOtp(email.trim());
      setStep("otp");
      setTimer(otpResendDelay);
      toast.success("Mã xác thực OTP đã được gửi về Email của bạn!");
    } catch (err: any) {
      toast.error(err.message || "Đã xảy ra lỗi khi gửi mã xác thực!");
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP trigger
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode.trim() || otpCode.length < 6) {
      toast.error("Vui lòng nhập đầy đủ mã xác thực OTP 6 số!");
      return;
    }

    setLoading(true);

    try {
      const data = await authService.verifyOtp(email.trim(), otpCode.trim());
      const { role, weddingSlug, name, email: responseEmail } = data;

      saveUserSession({
        role,
        username: responseEmail || email.trim(),
        name: name || (responseEmail || email.trim()).split("@")[0],
        weddingSlug,
      });

      confetti({ particleCount: 100, spread: 60 });
      toast.success("Đăng nhập thành công!");
      navigate("/");
    } catch (err: any) {
      toast.error(err.message || "Đã xảy ra lỗi trong quá trình xác thực!");
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP trigger
  const handleResendOtp = async () => {
    if (timer > 0) return;

    setLoading(true);
    setOtpCode("");
    setOtpValues(Array(6).fill(""));

    try {
      await authService.sendOtp(email.trim());
      setTimer(otpResendDelay);
      toast.success("Đã gửi lại mã xác thực OTP mới!");

      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 50);
    } catch (err: any) {
      toast.error(err.message || "Đã xảy ra lỗi khi gửi lại mã xác thực!");
    } finally {
      setLoading(false);
    }
  };

  // Google verify callback
  const verifyGoogleWithBackend = async (token: string) => {
    try {
      const data = await authService.loginWithGoogle(token);
      const { role, weddingSlug, name, picture, email } = data;

      saveUserSession({
        role,
        username: email || "google_user",
        name: name || (email || "google_user").split("@")[0],
        picture,
        weddingSlug,
      });

      confetti({ particleCount: 100, spread: 60 });
      toast.success("Đăng nhập bằng Google thành công!");
      navigate("/");
    } catch (err: any) {
      toast.error(err.message || "Đã xảy ra lỗi khi đăng nhập bằng Google!");
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
        toast.error("Đăng nhập bằng Google thất bại (không có access token)!");
        setSocialLoading(false);
        setSocialProvider(null);
      }
    },
    onError: (error) => {
      console.error("Lỗi đăng nhập Google:", error);
      toast.error("Đăng nhập bằng Google thất bại!");
      setSocialLoading(false);
      setSocialProvider(null);
    },
  });

  const handleGoogleLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    if (!clientId) {
      toast.error(
        "Chưa cấu hình Google Client ID cho ứng dụng! Không thể đăng nhập bằng Google.",
      );
      return;
    }

    setSocialLoading(true);
    setSocialProvider("Google");
    loginWithGoogle();
  };

  // Facebook simulated flow using real authService endpoints
  const handleSocialLogin = async (provider: "Facebook") => {
    setSocialLoading(true);
    setSocialProvider(provider);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const simulatedEmail = "facebook.demo.viora@facebook.com";
    const simulatedPassword = "oauth_secured_pass_123456";

    try {
      let data;
      try {
        data = await authService.registerFacebook(
          simulatedEmail,
          simulatedPassword,
        );
      } catch (err: any) {
        if (err.message?.toLowerCase().includes("tồn tại")) {
          data = await authService.loginWithFacebook(
            simulatedEmail,
            simulatedPassword,
          );
        } else {
          throw err;
        }
      }

      const { role, weddingSlug, name, email } = data;

      saveUserSession({
        role,
        username: email || simulatedEmail,
        name: name || (email || simulatedEmail).split("@")[0],
        weddingSlug,
      });

      toast.success("Đăng nhập bằng Facebook thành công!");
      navigate("/");
    } catch (err: any) {
      toast.error(
        err.message || "Đã xảy ra lỗi trong quá trình liên kết tài khoản!",
      );
    } finally {
      setSocialLoading(false);
      setSocialProvider(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf5f0] flex select-none antialiased font-sans">
      {/* ── LEFT PANEL: DECORATION & MOCKUP CARD ────────── */}
      <LeftPanel />

      {/* ── RIGHT PANEL: LOGIN FORM ──────────────────────── */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between items-center p-8 sm:p-16 relative bg-[#faf5f0] min-h-screen">
        {/* Top element for alignment */}
        <div className="w-full max-w-md flex flex-col mt-8">
          <LoginHeader
            step={step}
            onBack={() => {
              if (step === "otp") setStep("email");
              else setStep("options");
            }}
          />

          <div className="w-full space-y-6 mt-20">
            {step === "options" && (
              <LoginOptions
                onGoogleLogin={handleGoogleLogin}
                onFacebookLogin={() => handleSocialLogin("Facebook")}
                onEmailContinue={() => setStep("email")}
                socialLoading={socialLoading}
                socialProvider={socialProvider}
                loading={loading}
              />
            )}

            {step === "email" && (
              <EmailForm
                email={email}
                setEmail={setEmail}
                onSubmit={handleSendOtp}
                loading={loading}
              />
            )}

            {step === "otp" && (
              <OtpForm
                email={email}
                otpValues={otpValues}
                otpCode={otpCode}
                timer={timer}
                loading={loading}
                inputRefs={inputRefs}
                handleOtpChange={handleOtpChange}
                handleOtpKeyDown={handleOtpKeyDown}
                handleOtpPaste={handleOtpPaste}
                onSubmit={handleVerifyOtp}
                onResendOtp={handleResendOtp}
              />
            )}
          </div>
        </div>

        {/* Footer info text at bottom of page */}
        <p className="text-center text-[10px] text-[#7a5c4f]/50 leading-relaxed max-w-xs mt-8">
          Bằng cách tiếp tục, bạn đồng ý với{" "}
          <span className="underline hover:text-[#2c1810] cursor-pointer">
            Điều khoản dịch vụ
          </span>{" "}
          của chúng tôi.
        </p>
        <Toaster richColors closeButton position="top-right" />
      </div>
    </div>
  );
}
