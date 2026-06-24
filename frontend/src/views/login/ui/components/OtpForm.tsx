import React from "react";
import { Loader2, RefreshCw } from "lucide-react";

interface OtpFormProps {
  email: string;
  otpValues: string[];
  otpCode: string;
  timer: number;
  loading: boolean;
  inputRefs: React.MutableRefObject<(HTMLInputElement | null)[]>;
  handleOtpChange: (index: number, value: string) => void;
  handleOtpKeyDown: (index: number, e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleOtpPaste: (e: React.ClipboardEvent<HTMLDivElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onResendOtp: () => void;
}

export function OtpForm({
  email,
  otpValues,
  otpCode,
  timer,
  loading,
  inputRefs,
  handleOtpChange,
  handleOtpKeyDown,
  handleOtpPaste,
  onSubmit,
  onResendOtp,
}: OtpFormProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-3 text-center">
        <h2
          className="text-4xl font-semibold text-[#2c1810] tracking-wide"
          style={{ fontFamily: "'EB Garamond', serif" }}
        >
          Kiểm tra email
        </h2>
        <p className="text-sm text-[#7a5c4f] leading-relaxed font-normal">
          Chúng tôi đã gửi mã gồm 6 chữ số đến <br />
          <span className="text-[#8b3a52] font-semibold font-mono break-all">
            {email}
          </span>
        </p>
      </div>

      <form className="space-y-6" onSubmit={onSubmit} noValidate>
        {/* 6 Digit OTP input */}
        <div
          className="flex justify-between gap-2 max-w-sm mx-auto"
          onPaste={handleOtpPaste}
        >
          {otpValues.map((val, idx) => (
            <input
              key={idx}
              ref={(el) => {
                inputRefs.current[idx] = el;
              }}
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              pattern="[0-9]*"
              maxLength={1}
              value={val}
              onChange={(e) => handleOtpChange(idx, e.target.value)}
              onKeyDown={(e) => handleOtpKeyDown(idx, e)}
              className="w-12 h-14 text-center text-lg font-semibold bg-white border border-[#c9828e]/25 rounded-2xl focus:border-[#8b3a52] focus:ring-1 focus:ring-[#8b3a52] outline-none transition-all text-[#2c1810]"
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={loading || otpCode.length < 6}
          className="w-full py-4 text-white rounded-full text-xs font-semibold active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer border-0 shadow-xs"
          style={{
            backgroundColor: otpCode.length === 6 ? "#8b3a52" : "#d6a2a8",
          }}
        >
          {loading ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
          ) : (
            <span>Xác nhận & Đăng nhập</span>
          )}
        </button>

        <div className="text-center pt-2">
          {timer > 0 ? (
            <p className="text-xs text-[#7a5c4f]/70 font-light">
              Không nhận được mã? Gửi lại sau{" "}
              <strong className="text-[#2c1810] font-mono font-medium">
                {timer}s
              </strong>
            </p>
          ) : (
            <button
              type="button"
              onClick={onResendOtp}
              disabled={loading}
              className="text-xs text-[#8b3a52] hover:text-[#732d42] transition-colors bg-transparent border-0 cursor-pointer flex items-center gap-1.5 mx-auto font-medium"
            >
              <RefreshCw
                size={12}
                className={loading ? "animate-spin" : ""}
              />{" "}
              Gửi lại mã xác thực
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
