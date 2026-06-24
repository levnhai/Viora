import { Loader2 } from "lucide-react";

interface EmailFormProps {
  email: string;
  setEmail: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
}

export function EmailForm({
  email,
  setEmail,
  onSubmit,
  loading,
}: EmailFormProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2 text-center">
        <h2
          className="text-4xl font-semibold text-[#2c1810] tracking-wide"
          style={{ fontFamily: "'EB Garamond', serif" }}
        >
          Nhập email của bạn
        </h2>
        <p className="text-sm text-[#7a5c4f] leading-relaxed font-normal">
          Chúng tôi sẽ gửi mã xác nhận gồm 6 chữ số đến email của bạn
        </p>
      </div>

      <form className="space-y-6" onSubmit={onSubmit} noValidate>
        <div className="space-y-2">
          <label className="block text-[9px] font-bold uppercase tracking-widest text-[#7a5c4f]/80">
            ĐỊA CHỈ EMAIL
          </label>
          <div className="relative flex items-center rounded-2xl border border-[#c9828e]/20 bg-white focus-within:border-[#8b3a52] transition-all p-0.5">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ten@example.com"
              className="w-full px-4 py-3.5 bg-transparent text-xs text-[#2c1810] outline-none border-0 placeholder-[#7a5c4f]/30"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 text-white rounded-full text-xs font-semibold active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer border-0 shadow-xs"
          style={{ backgroundColor: email.trim() ? "#8b3a52" : "#d6a2a8" }}
        >
          {loading ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
              <span>Đang gửi...</span>
            </>
          ) : (
            <span>Gửi mã xác nhận</span>
          )}
        </button>
      </form>
    </div>
  );
}
