import React, { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, "Mật khẩu mới là bắt buộc")
      .min(6, "Mật khẩu phải có nhất 6 ký tự"),
    confirmPassword: z.string().min(1, "Xác nhận mật khẩu là bắt buộc"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không trùng khớp",
    path: ["confirmPassword"],
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

interface ResetPasswordFormProps {
  onResetPassword: (passwordNew: string) => Promise<void>;
  loading: boolean;
}

export function ResetPasswordForm({
  onResetPassword,
  loading,
}: ResetPasswordFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    await onResetPassword(data.password);
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-7" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div className="space-y-2">
        <h2 className="text-4xl font-bold text-[#2c1810] tracking-tight" style={{ fontFamily: "'EB Garamond', serif" }}>
          Đặt lại mật khẩu
        </h2>
        <p className="text-sm text-[#7a5c4f]/60 font-light">
          Vui lòng nhập mật khẩu mới cho tài khoản của bạn.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Password Input */}
        <div className="space-y-2">
          <label className="text-[13px] font-semibold text-[#2c1810] tracking-wide block">Mật khẩu mới</label>
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
          <label className="text-[13px] font-semibold text-[#2c1810] tracking-wide block">Xác nhận mật khẩu mới</label>
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

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-[#db2777] hover:bg-[#c2185b] text-white font-semibold rounded-full text-sm transition-all shadow-md shadow-pink-600/10 hover:shadow-pink-600/20 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-[#db2777]/50 disabled:opacity-75 flex justify-center items-center gap-2"
        >
          {loading ? "Đang cập nhật..." : "Đổi mật khẩu"}
        </button>
      </form>
    </div>
  );
}
