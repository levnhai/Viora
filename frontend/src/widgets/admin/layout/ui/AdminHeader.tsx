import { Menu, Search, Sun, Bell, Mail, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { authService } from "@/features/auth/api/authService";

export function AdminHeader() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await authService.logout();
      router.push("/admin/login-2h");
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
        <div className="relative hidden sm:block">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Tìm kiếm nhanh..."
            className="pl-9 pr-12 py-1.5 bg-slate-100 border-none rounded-lg text-sm w-[280px] focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
            <span className="text-[10px] px-1.5 py-0.5 rounded border border-slate-200 text-slate-400 font-mono bg-white">
              Ctrl
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded border border-slate-200 text-slate-400 font-mono bg-white">
              K
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-5">
        <button className="text-slate-400 hover:text-slate-600">
          <Sun size={20} />
        </button>
        <div className="relative">
          <button className="text-slate-400 hover:text-slate-600">
            <Bell size={20} />
          </button>
          <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center border-2 border-white">
            5
          </span>
        </div>
        <div className="relative">
          <button className="text-slate-400 hover:text-slate-600">
            <Mail size={20} />
          </button>
          <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center border-2 border-white">
            3
          </span>
        </div>
        <div className="h-6 w-px bg-slate-200 mx-1" />
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-slate-700 group-hover:text-indigo-600 transition-colors">
              Super Admin
            </p>
            <p className="text-[11px] text-slate-400">Quản trị viên</p>
          </div>
          <img
            src="https://i.pravatar.cc/150?img=11"
            alt="Avatar"
            className="w-9 h-9 rounded-full border-2 border-white shadow-sm"
          />
          <button
            onClick={handleLogout}
            className="text-slate-400 hover:text-red-500 ml-2"
            title="Đăng xuất"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
