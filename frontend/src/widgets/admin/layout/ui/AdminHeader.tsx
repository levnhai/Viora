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
      <header className="h-16 bg-white/85 dark:bg-slate-900/85 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between px-4 sm:px-6 shrink-0 z-30 sticky top-0 transition-colors">
        {/* Left: Mobile Toggle & Quick Search */}
        <div className="flex items-center gap-3">
          {onToggleMobileSidebar && (
            <button
              onClick={onToggleMobileSidebar}
              className="p-2 -ml-2 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 md:hidden transition-colors"
              title="Mở menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          {/* Quick Search trigger button */}
          <button
            onClick={() => setIsCommandOpen(true)}
            className="flex items-center gap-3 px-3.5 py-1.5 bg-slate-100/90 dark:bg-slate-800/90 hover:bg-slate-200/80 dark:hover:bg-slate-700/80 rounded-xl text-xs text-slate-500 dark:text-slate-400 w-44 sm:w-64 md:w-80 border border-slate-200/60 dark:border-slate-700/60 transition-all group"
          >
            <Search className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 transition-colors" />
            <span className="truncate">Tìm kiếm nhanh...</span>
            <div className="ml-auto flex items-center gap-1">
              <kbd className="text-[10px] px-1.5 py-0.5 rounded border border-slate-300/80 dark:border-slate-600 font-mono bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 shadow-2xs">
                Ctrl
              </kbd>
              <kbd className="text-[10px] px-1.5 py-0.5 rounded border border-slate-300/80 dark:border-slate-600 font-mono bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 shadow-2xs">
                K
              </kbd>
            </div>
          </button>
        </div>

        {/* Right: Realtime status, View Site, Notifications & Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Live Online Badge */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200/80 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold shadow-2xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="flex items-center gap-1">
              <Radio className="w-3.5 h-3.5 text-emerald-500" />
              <span>{onlineCount} Online</span>
            </span>
          </div>

          {/* Quick External Link to Public Site */}
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Mở website khách hàng"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Trang chủ</span>
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
