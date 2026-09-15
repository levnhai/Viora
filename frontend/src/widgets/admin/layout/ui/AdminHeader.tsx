"use client";

import { useState, useEffect } from "react";
import { Search, Menu, Radio, ExternalLink } from "lucide-react";
import { AdminCommandPalette } from "./AdminCommandPalette";
import { AdminNotificationMenu } from "./AdminNotificationMenu";
import { AdminUserMenu } from "./AdminUserMenu";
import { AdminThemeToggle } from "./AdminThemeToggle";

interface AdminHeaderProps {
  onToggleMobileSidebar?: () => void;
  onlineCount?: number;
}

export function AdminHeader({
  onToggleMobileSidebar,
  onlineCount = 1,
}: AdminHeaderProps) {
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header className="h-16 sm:h-[70px] bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between px-4 sm:px-6 lg:px-8 shrink-0 z-30 sticky top-0 transition-colors shadow-2xs">
        {/* Left: Mobile Toggle & Quick Search */}
        <div className="flex items-center gap-3.5">
          {onToggleMobileSidebar && (
            <button
              onClick={onToggleMobileSidebar}
              className="p-2.5 -ml-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 md:hidden transition-all active:scale-95"
              title="Mở menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          {/* Quick Search trigger button */}
          <button
            onClick={() => setIsCommandOpen(true)}
            className="h-10 sm:h-11 flex items-center gap-3 px-3.5 sm:px-4 bg-slate-100/80 hover:bg-slate-200/70 dark:bg-slate-800/80 dark:hover:bg-slate-750 rounded-xl sm:rounded-2xl text-xs sm:text-sm text-slate-500 dark:text-slate-400 w-44 sm:w-80 md:w-96 border border-slate-200/80 dark:border-slate-700/70 transition-all group shadow-2xs hover:border-indigo-300 dark:hover:border-indigo-700 active:scale-[0.99]"
          >
            <Search className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 transition-colors shrink-0" />
            <span className="truncate font-medium">Tìm kiếm nhanh tính năng, thiệp...</span>
            <div className="ml-auto hidden sm:flex items-center gap-1 shrink-0">
              <kbd className="text-[11px] px-1.5 py-0.5 rounded-md border border-slate-300/80 dark:border-slate-600 font-mono bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 shadow-2xs font-semibold">
                ⌘
              </kbd>
              <kbd className="text-[11px] px-1.5 py-0.5 rounded-md border border-slate-300/80 dark:border-slate-600 font-mono bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 shadow-2xs font-semibold">
                K
              </kbd>
            </div>
          </button>
        </div>

        {/* Right: Realtime status, View Site, Notifications & Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Live Online Badge */}
          <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-bold shadow-2xs tabular-nums">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>{onlineCount} Khách online</span>
            </span>
          </div>

          {/* Quick External Link to Public Site */}
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="hidden lg:flex items-center gap-2 h-10 px-3.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-all border border-slate-200/60 dark:border-slate-700/60 hover:border-slate-300 dark:hover:border-slate-600 active:scale-95"
            title="Mở website khách hàng"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Xem trang web</span>
          </a>

          {/* Theme Toggle (Dark / Light) */}
          <AdminThemeToggle />

          {/* Notifications Popover */}
          <AdminNotificationMenu />

          {/* User Account Popover */}
          <AdminUserMenu />
        </div>
      </header>

      {/* Command Palette Modal */}
      <AdminCommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
      />
    </>
  );
}
