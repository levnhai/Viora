"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Heart,
  PlusCircle,
  Inbox,
  Settings,
  Search,
  ExternalLink,
  Sparkles,
} from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function AdminCommandPalette({ isOpen, onClose }: Props) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Trigger open via custom event or handled by parent
        }
      } else if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quickLinks = [
    {
      title: "Tổng quan Dashboard",
      desc: "Xem thống kê lưu lượng, KPI và phân tích thời gian thực",
      href: "/admin",
      icon: LayoutDashboard,
      badge: "Analytics",
    },
    {
      title: "Danh sách thiệp cưới",
      desc: "Quản lý toàn bộ thiệp cưới, khách mời và RSVP",
      href: "/admin/invitations",
      icon: Heart,
      badge: "Core",
    },
    {
      title: "Tạo thiệp cưới mới",
      desc: "Khởi tạo nhanh thiệp cưới từ mẫu thiết kế",
      href: "/admin/invitations/create",
      icon: PlusCircle,
      badge: "Action",
    },
    {
      title: "Yêu cầu tạo thiệp của khách",
      desc: "Xem danh sách và duyệt đơn đăng ký của khách hàng",
      href: "/admin/template-requests",
      icon: Inbox,
      badge: "Orders",
    },
    {
      title: "Cài đặt hệ thống",
      desc: "Cấu hình tài khoản quản trị, bảo mật và tài khoản",
      href: "/admin/settings",
      icon: Settings,
      badge: "System",
    },
    {
      title: "Xem trang chủ website",
      desc: "Mở trang khách hàng trong tab mới",
      href: "/",
      icon: ExternalLink,
      badge: "Public",
      isExternal: true,
    },
  ];

  const filteredLinks = quickLinks.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.desc.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (href: string, isExternal?: boolean) => {
    onClose();
    if (isExternal) {
      window.open(href, "_blank");
    } else {
      router.push(href);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden z-10 scale-in-95 duration-150">
        {/* Search Input */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-100 dark:border-slate-800 gap-3">
          <Search className="w-5 h-5 text-indigo-500 shrink-0" />
          <input
            type="text"
            placeholder="Tìm kiếm nhanh trang, tính năng hoặc thiệp cưới... (Esc để thoát)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-slate-800 dark:text-slate-100 text-sm placeholder:text-slate-400 focus:outline-none"
          />
          <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-mono text-slate-400 bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto p-2 space-y-1">
          <div className="px-3 py-1.5 text-[11px] font-semibold tracking-wider uppercase text-slate-400">
            Điều hướng nhanh
          </div>
          {filteredLinks.length > 0 ? (
            filteredLinks.map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(item.href, item.isExternal)}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-indigo-50/70 dark:hover:bg-indigo-950/40 text-left group transition-all"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 group-hover:bg-indigo-600 text-slate-600 dark:text-slate-300 group-hover:text-white flex items-center justify-center shrink-0 transition-colors shadow-sm">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <div className="text-sm font-semibold text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {item.title}
                      </div>
                      <div className="text-xs text-slate-400 truncate">
                        {item.desc}
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/60 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 shrink-0 ml-2">
                    {item.badge}
                  </span>
                </button>
              );
            })
          ) : (
            <div className="py-10 text-center text-sm text-slate-400 flex flex-col items-center gap-2">
              <Sparkles className="w-6 h-6 text-slate-300" />
              <span>Không tìm thấy kết quả phù hợp với &quot;{search}&quot;</span>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-slate-50/80 dark:bg-slate-900/80 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Hệ thống quản trị Viora Studio</span>
          <div className="flex items-center gap-3">
            <span>Chọn mục để truy cập tức thì</span>
          </div>
        </div>
      </div>
    </div>
  );
}
