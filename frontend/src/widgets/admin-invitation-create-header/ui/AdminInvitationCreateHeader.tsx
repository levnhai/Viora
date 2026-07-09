import { Menu, Check, LogOut } from "lucide-react";
import { authService } from "@/features/auth/api/authService";
import { useRouter } from "next/navigation";

export function AdminInvitationCreateHeader() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await authService.logout();
      router.push("/admin/login");
    } catch (error) {
      console.error("Lỗi đăng xuất:", error);
    }
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 z-10 sticky top-0">
      <div className="flex items-center gap-4">
        <button className="text-slate-400 hover:text-slate-600 md:hidden">
          <Menu size={20} />
        </button>
        <div className="flex items-center gap-3">
          <Menu size={16} className="text-slate-400 hidden sm:block" />
          <h2 className="text-base font-bold text-slate-800">
            Tạo thiệp cưới mới
          </h2>
        </div>
      </div>

      {/* Steps (Hidden on mobile) */}
      <div className="hidden lg:flex items-center gap-2">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-bold">
            <Check size={12} />
          </div>
          <span className="text-xs font-semibold text-indigo-600">
            Chọn template
          </span>
        </div>
        <div className="w-8 h-px bg-slate-200" />
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-bold">
            2
          </div>
          <span className="text-xs font-semibold text-indigo-600">
            Chỉnh sửa thông tin
          </span>
        </div>
        <div className="w-8 h-px bg-slate-200" />
        <div className="flex items-center gap-2 opacity-50 grayscale">
          <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-[10px] font-bold">
            3
          </div>
          <span className="text-xs font-medium text-slate-500">Xem trước</span>
        </div>
        <div className="w-8 h-px bg-slate-200" />
        <div className="flex items-center gap-2 opacity-50 grayscale">
          <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-[10px] font-bold">
            4
          </div>
          <span className="text-xs font-medium text-slate-500">Xuất bản</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="hidden sm:block px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
          Lưu nháp
        </button>
        <button className="hidden sm:block px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
          Xem trước
        </button>
        <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-600/20 flex items-center gap-2">
          Xuất bản <ChevronDownIcon size={14} />
        </button>
        <div className="h-6 w-px bg-slate-200 mx-2 hidden sm:block" />
        <div className="flex items-center gap-3 cursor-pointer group hidden sm:flex">
          <img
            src="https://i.pravatar.cc/150?img=11"
            alt="Avatar"
            className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
          />
          <div className="text-right hidden md:block">
            <p className="text-xs font-semibold text-slate-700 group-hover:text-indigo-600 transition-colors">
              Super Admin
            </p>
            <p className="text-[10px] text-slate-400">Quản trị viên</p>
          </div>
          <button
            onClick={handleLogout}
            className="text-slate-400 hover:text-red-500 ml-1"
            title="Đăng xuất"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}

function ChevronDownIcon({ size }: { size: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
