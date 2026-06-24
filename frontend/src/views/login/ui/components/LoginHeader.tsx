import { ArrowLeft, Heart } from "lucide-react";

interface LoginHeaderProps {
  step: "options" | "email" | "otp";
  onBack: () => void;
}

export function LoginHeader({ step, onBack }: LoginHeaderProps) {
  return (
    <>
      {/* Back button on top */}
      <div className="h-8 mb-20 flex items-center order-first">
        {step !== "options" && (
          <button
            type="button"
            onClick={onBack}
            className="text-xs text-[#7a5c4f] hover:text-[#2c1810] transition-colors flex items-center gap-1.5 bg-transparent border-0 cursor-pointer font-medium p-0"
          >
            <ArrowLeft size={14} /> Quay lại
          </button>
        )}
      </div>

      {/* Logo */}
      <div className="flex items-center gap-2 mb-10 self-center">
        <div className="w-10 h-10 rounded-full bg-[#8b3a52] flex items-center justify-center shadow-xs">
          <Heart
            size={16}
            className="text-white animate-pulse"
            fill="currentColor"
          />
        </div>
        <span
          className="text-base font-semibold text-[#2c1810] tracking-wide"
          style={{ fontFamily: "'EB Garamond', serif" }}
        >
          WedInvite
        </span>
      </div>
    </>
  );
}
