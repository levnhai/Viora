import React, { useState } from "react";
import { toast } from "sonner";
import { Mail, ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const forgotPasswordSchema = z.object({
  email: z.string().min(1, "Email là bắt buộc").email("Email không hợp lệ"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

interface ForgotPasswordFormProps {
  onForgotPassword: (email: string) => Promise<void>;
  onSwitchLogin: () => void;
  loading: boolean;
}

export function ForgotPasswordForm({
  onForgotPassword,
  onSwitchLogin,
  loading,
}: ForgotPasswordFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    await onForgotPassword(data.email);
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-7" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div className="space-y-2">
        <h2 className="text-4xl font-bold text-[#2c1810] tracking-tight" style={{ fontFamily: "'EB Garamond', serif" }}>
          Quên mật khẩu
        </h2>
        <p className="text-sm text-[#7a5c4f]/60 font-light">
          Nhập email của bạn, chúng tôi sẽ gửi liên kết đặt lại mật khẩu.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-[#db2777] hover:bg-[#c2185b] text-white font-semibold rounded-full text-sm transition-all shadow-md shadow-pink-600/10 hover:shadow-pink-600/20 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-[#db2777]/50 disabled:opacity-75 flex justify-center items-center gap-2"
        >
          {loading ? "Đang xử lý..." : "Gửi liên kết đặt lại"}
        </button>
      </form>

      {/* Switch login link */}
      <div className="text-center pt-2">
        <button
          type="button"
          onClick={onSwitchLogin}
          className="text-xs text-gray-500 hover:text-[#db2777] hover:underline font-bold flex items-center justify-center gap-1.5 mx-auto text-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Quay lại đăng nhập
        </button>
      </div>
    </div>
  );
}
