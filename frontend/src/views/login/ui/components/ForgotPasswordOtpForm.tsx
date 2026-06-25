import React, { useRef, useState, useEffect } from "react";
import { toast } from "sonner";

interface ForgotPasswordOtpFormProps {
  email: string;
  onVerifyOtp: (code: string) => Promise<void>;
  onResendOtp: () => Promise<void>;
  loading: boolean;
}

export function ForgotPasswordOtpForm({
  email,
  onVerifyOtp,
  onResendOtp,
  loading,
}: ForgotPasswordOtpFormProps) {
  const [timer, setTimer] = useState(60);
  const [otpValues, setOtpValues] = useState<string[]>(Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Count down timer
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleOtpChange = (index: number, value: string) => {
    const cleanVal = value.replace(/[^0-9]/g, "");
    if (!cleanVal) {
      const newVals = [...otpValues];
      newVals[index] = "";
      setOtpValues(newVals);
      return;
    }

    const char = cleanVal[cleanVal.length - 1];
    const newVals = [...otpValues];
    newVals[index] = char;
    setOtpValues(newVals);

    // Auto focus next input
    if (index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (!otpValues[index] && index > 0 && inputRefs.current[index - 1]) {
        const newVals = [...otpValues];
        newVals[index - 1] = "";
        setOtpValues(newVals);
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/[^0-9]/g, "")
      .slice(0, 6);
    if (pastedData.length === 6) {
      const newVals = pastedData.split("");
      setOtpValues(newVals);
      inputRefs.current[5]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otpValues.join("");
    if (code.length < 6) {
      toast.error("Vui lòng điền đủ 6 số của mã OTP!");
      return;
    }
    await onVerifyOtp(code);
  };

  const handleResendClick = async () => {
    if (timer > 0) return;
    await onResendOtp();
    setTimer(60);
    setOtpValues(Array(6).fill(""));
    inputRefs.current[0]?.focus();
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-7" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div className="space-y-2">
        <h2 className="text-4xl font-bold text-[#2c1810] tracking-tight" style={{ fontFamily: "'EB Garamond', serif" }}>
          Nhập mã xác thực
        </h2>
        <p className="text-sm text-[#7a5c4f]/60 font-light leading-relaxed">
          Mã xác thực OTP khôi phục mật khẩu đã được gửi đến hòm thư: <br />
          <span className="font-semibold text-[#db2777]">{email}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* OTP Inputs container */}
        <div 
          className="flex justify-between gap-2.5" 
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
              maxLength={1}
              value={val}
              onChange={(e) => handleOtpChange(idx, e.target.value)}
              onKeyDown={(e) => handleOtpKeyDown(idx, e)}
              disabled={loading}
              className="w-12 h-14 text-center text-xl font-bold bg-white border border-[#e2d8cf] rounded-xl focus:outline-none focus:border-[#db2777] focus:ring-2 focus:ring-[#db2777]/10 transition-all disabled:opacity-50 auth-input-focus"
            />
          ))}
        </div>

        {/* Action Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-[#db2777] hover:bg-[#c2185b] text-white font-semibold rounded-full text-sm transition-all shadow-md shadow-pink-600/10 hover:shadow-pink-600/20 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-[#db2777]/50 disabled:opacity-75 flex justify-center items-center gap-2"
        >
          {loading ? "Đang xác thực..." : "Xác thực OTP"}
        </button>
      </form>

      {/* Resend link */}
      <p className="text-center text-xs text-gray-600">
        Không nhận được mã?{" "}
        {timer > 0 ? (
          <span className="text-gray-400 font-semibold">
            Gửi lại sau ({timer}s)
          </span>
        ) : (
          <button
            type="button"
            onClick={handleResendClick}
            className="text-[#db2777] hover:underline font-bold"
          >
            Gửi lại ngay
          </button>
        )}
      </p>
    </div>
  );
}
