import React, { useState } from "react";
import { toast } from "sonner";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const loginSchema = z.object({
  email: z.string().min(1, "Email là bắt buộc").email("Email không hợp lệ"),
  password: z
    .string()
    .min(1, "Mật khẩu là bắt buộc")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onLogin: (email: string, pass: string) => Promise<void>;
  onSwitchRegister: () => void;
  onSwitchForgotPassword: () => void;
  onGoogleLogin: () => void;
  onFacebookLogin: () => void;
  loading: boolean;
  socialLoading: boolean;
  socialProvider: string | null;
}

export function LoginForm({
  onLogin,
  onSwitchRegister,
  onSwitchForgotPassword,
  onGoogleLogin,
  onFacebookLogin,
  loading,
  socialLoading,
  socialProvider,
}: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    await onLogin(data.email, data.password);
  };

  return (
    <div
      className="w-full max-w-md mx-auto space-y-7"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <div className="space-y-2">
        <h2
          className="text-4xl font-bold text-[#2c1810] tracking-tight"
          style={{ fontFamily: "'EB Garamond', serif" }}
        >
          Đăng nhập
        </h2>
        <p className="text-sm text-[#7a5c4f]/60 font-light">
          Chào mừng bạn quay trở lại Viora
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Email Input */}
        <div className="space-y-2">
          <label className="text-[13px] font-semibold text-[#2c1810] tracking-wide block">
            Email
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
              <Mail className="w-[18px] h-[18px] text-[#7a5c4f]/50" />
            </span>
            <input
              type="email"
              placeholder="viora@gmail.com"
              disabled={loading}
              autoComplete="off"
              {...register("email")}
              className={`w-full pl-10 pr-4 py-3 bg-white border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all disabled:opacity-50 ${
                errors.email
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
                  : "border-[#e2d8cf] focus:border-[#db2777] focus:ring-[#db2777]/10"
              }`}
            />
          </div>
          {errors.email && (
            <p className="text-xs text-red-500 mt-1 font-medium pl-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password Input */}
        <div className="space-y-2">
          <label className="text-[13px] font-semibold text-[#2c1810] tracking-wide block">
            Mật khẩu
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
              <Lock className="w-[18px] h-[18px] text-[#7a5c4f]/50" />
            </span>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              disabled={loading}
              autoComplete="new-password"
              {...register("password")}
              className={`w-full pl-10 pr-10 py-3 bg-white border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all disabled:opacity-50 ${
                errors.password
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
                  : "border-[#e2d8cf] focus:border-[#db2777] focus:ring-[#db2777]/10"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              {showPassword ? (
                <Eye className="w-5 h-5 text-[#7a5c4f]/60" />
              ) : (
                <EyeOff className="w-5 h-5 text-[#7a5c4f]/60" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-red-500 mt-1 font-medium pl-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Remember me & Forgot Password */}
        <div className="flex items-center justify-between text-xs pt-1">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              {...register("rememberMe")}
              className="w-4 h-4 rounded text-[#db2777] border-gray-300 focus:ring-[#db2777]/30"
            />
            <span className="text-sm text-gray-500">Ghi nhớ đăng nhập</span>
          </label>
          <button
            type="button"
            onClick={onSwitchForgotPassword}
            className="text-sm text-[#db2777] hover:underline font-semibold"
          >
            Quên mật khẩu?
          </button>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-[#db2777] hover:bg-[#c2185b] text-white font-semibold rounded-full text-sm transition-all shadow-md shadow-pink-600/10 hover:shadow-pink-600/20 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-[#db2777]/50 disabled:opacity-75 flex justify-center items-center gap-2"
        >
          {loading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Đang đăng nhập...
            </>
          ) : (
            "Đăng nhập"
          )}
        </button>
      </form>

      {/* Social login divider */}
      <div className="relative flex py-2 items-center">
        <div className="flex-grow border-t border-[#e2d8cf]"></div>
        <span className="flex-shrink mx-4 text-[10px] text-[#7a5c4f]/40 uppercase tracking-widest font-bold">
          hoặc đăng nhập với
        </span>
        <div className="flex-grow border-t border-[#e2d8cf]"></div>
      </div>

      {/* Social buttons */}
      <div className="grid grid-cols-2 gap-4">
        {/* Google button */}
        <button
          type="button"
          onClick={onGoogleLogin}
          disabled={socialLoading}
          className="flex items-center justify-center gap-2.5 py-3 border border-[#e2d8cf] bg-white rounded-full text-xs font-bold text-gray-700 hover:bg-gray-50 focus:outline-none transition-all active:scale-[0.99] shadow-sm"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-4 h-4"
          />
          Google
        </button>

        {/* Facebook button */}
        <button
          type="button"
          onClick={onFacebookLogin}
          disabled={socialLoading}
          className="flex items-center justify-center gap-2.5 py-3 border border-[#e2d8cf] bg-white rounded-full text-xs font-bold text-gray-700 hover:bg-gray-50 focus:outline-none transition-all active:scale-[0.99] shadow-sm"
        >
          <img
            src="https://www.svgrepo.com/show/475647/facebook-color.svg"
            alt="Facebook"
            className="w-4 h-4"
          />
          Facebook
        </button>
      </div>

      {/* Under footer */}
      <p className="text-center text-xs text-gray-600">
        Chưa có tài khoản?{" "}
        <button
          type="button"
          onClick={onSwitchRegister}
          className="text-[#db2777] hover:underline font-bold text-sm"
        >
          Đăng ký ngay
        </button>
      </p>
    </div>
  );
}

