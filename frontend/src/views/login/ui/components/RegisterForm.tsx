import React, { useState } from "react";
import { toast } from "sonner";
import { User, Mail, Phone, Lock, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(1, "Họ và tên là bắt buộc")
      .min(3, "Họ và tên phải có ít nhất 3 ký tự"),
    email: z
      .string()
      .min(1, "Email là bắt buộc")
      .email("Email không hợp lệ"),
    phone: z
      .string()
      .optional()
      .refine(
        (val) => !val || /^[0-9]{10,11}$/.test(val),
        "Số điện thoại phải gồm 10 đến 11 chữ số"
      ),
    password: z
      .string()
      .min(1, "Mật khẩu là bắt buộc")
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
    confirmPassword: z.string().min(1, "Xác nhận mật khẩu là bắt buộc"),
    agreeTerms: z.literal(true, {
      errorMap: () => ({
        message: "Bạn phải đồng ý với Điều khoản và Chính sách bảo mật",
      }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không trùng khớp",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

interface RegisterFormProps {
  onRegister: (email: string, pass: string, name: string, phone?: string) => Promise<void>;
  onSwitchLogin: () => void;
  onGoogleLogin: () => void;
  onFacebookLogin: () => void;
  loading: boolean;
  socialLoading: boolean;
}

export function RegisterForm({
  onRegister,
  onSwitchLogin,
  onGoogleLogin,
  onFacebookLogin,
  loading,
  socialLoading,
}: RegisterFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    await onRegister(
      data.email,
      data.password,
      data.fullName,
      data.phone || undefined
    );
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div className="space-y-2">
        <h2 className="text-4xl font-bold text-[#2c1810] tracking-tight" style={{ fontFamily: "'EB Garamond', serif" }}>
          Đăng ký tài khoản
        </h2>
        <p className="text-sm text-[#7a5c4f]/60 font-light">Tạo tài khoản để bắt đầu với Viora</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Full Name Input */}
        <div className="space-y-2">
          <label className="text-[13px] font-semibold text-[#2c1810] tracking-wide block">Họ và tên</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
              <User className="w-[18px] h-[18px] text-[#7a5c4f]/50" />
            </span>
            <input
              type="text"
              placeholder="Nguyễn Văn A"
              disabled={loading}
              autoComplete="off"
              {...register("fullName")}
              className={`w-full pl-10 pr-4 py-3 bg-white border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all disabled:opacity-50 ${
                errors.fullName
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
                  : "border-[#e2d8cf] focus:border-[#db2777] focus:ring-[#db2777]/10"
              }`}
            />
          </div>
          {errors.fullName && (
            <p className="text-xs text-red-500 mt-1 font-medium pl-1">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Email Input */}
        <div className="space-y-2">
          <label className="text-[13px] font-semibold text-[#2c1810] tracking-wide block">Email</label>
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

        {/* Phone Input */}
        <div className="space-y-2">
          <label className="text-[13px] font-semibold text-[#2c1810] tracking-wide block">Số điện thoại (tùy chọn)</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
              <Phone className="w-[18px] h-[18px] text-[#7a5c4f]/50" />
            </span>
            <input
              type="tel"
              placeholder="0912345678"
              disabled={loading}
              autoComplete="off"
              {...register("phone")}
              className={`w-full pl-10 pr-4 py-3 bg-white border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all disabled:opacity-50 ${
                errors.phone
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
                  : "border-[#e2d8cf] focus:border-[#db2777] focus:ring-[#db2777]/10"
              }`}
            />
          </div>
          {errors.phone && (
            <p className="text-xs text-red-500 mt-1 font-medium pl-1">
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Password Input */}
        <div className="space-y-2">
          <label className="text-[13px] font-semibold text-[#2c1810] tracking-wide block">Mật khẩu</label>
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

        {/* Confirm Password Input */}
        <div className="space-y-2">
          <label className="text-[13px] font-semibold text-[#2c1810] tracking-wide block">Xác nhận mật khẩu</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
              <Lock className="w-[18px] h-[18px] text-[#7a5c4f]/50" />
            </span>
            <input
              type="password"
              placeholder="••••••••"
              disabled={loading}
              autoComplete="new-password"
              {...register("confirmPassword")}
              className={`w-full pl-10 pr-4 py-3 bg-white border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all disabled:opacity-50 ${
                errors.confirmPassword
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
                  : "border-[#e2d8cf] focus:border-[#db2777] focus:ring-[#db2777]/10"
              }`}
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-xs text-red-500 mt-1 font-medium pl-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Agree terms Checkbox */}
        <div className="flex flex-col gap-1 text-xs pt-1 select-none">
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="agreeTerms"
              {...register("agreeTerms")}
              className="mt-0.5 w-4 h-4 rounded text-[#db2777] border-gray-300 focus:ring-[#db2777]/30"
            />
            <label htmlFor="agreeTerms" className="text-sm text-gray-500 cursor-pointer leading-normal">
              Tôi đồng ý với{" "}
              <span className="underline hover:text-gray-800 cursor-pointer font-bold">
                Điều khoản sử dụng
              </span>{" "}
              và{" "}
              <span className="underline hover:text-gray-800 cursor-pointer font-bold">
                Chính sách bảo mật
              </span>
            </label>
          </div>
          {errors.agreeTerms && (
            <p className="text-xs text-red-500 font-medium pl-6">
              {errors.agreeTerms.message}
            </p>
          )}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-[#db2777] hover:bg-[#c2185b] text-white font-semibold rounded-full text-sm transition-all shadow-md shadow-pink-600/10 hover:shadow-pink-600/20 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-[#db2777]/50 disabled:opacity-75 flex justify-center items-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Đang gửi OTP...
            </>
          ) : (
            "Đăng ký"
          )}
        </button>
      </form>

      {/* Social login divider */}
      <div className="relative flex py-1.5 items-center">
        <div className="flex-grow border-t border-[#e2d8cf]"></div>
        <span className="flex-shrink mx-4 text-[10px] text-[#7a5c4f]/40 uppercase tracking-widest font-bold">
          hoặc đăng ký với
        </span>
        <div className="flex-grow border-t border-[#e2d8cf]"></div>
      </div>

      {/* Social buttons */}
      <div className="grid grid-cols-2 gap-4">
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
        Đã có tài khoản?{" "}
        <button
          type="button"
          onClick={onSwitchLogin}
          className="text-[#db2777] hover:underline font-bold text-sm"
        >
          Đăng nhập ngay
        </button>
      </p>
    </div>
  );
}
