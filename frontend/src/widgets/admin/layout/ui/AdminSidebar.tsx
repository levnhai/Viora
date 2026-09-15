"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Heart,
  PlusCircle,
  Inbox,
  Settings,
  ChevronDown,
  ChevronLeft,
  Users,
  MessageSquare,
  PanelLeftClose,
  PanelLeft,
  Layers,
  Sparkles,
  Radio,
} from "lucide-react";

interface AdminSidebarProps {
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export function AdminSidebar({
  isMobileOpen = false,
  onCloseMobile,
}: AdminSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isWeddingMenuOpen, setIsWeddingMenuOpen] = useState(true);
  const pathname = usePathname();

  const isDashboardActive = pathname === "/admin";
  const isCreateActive = pathname === "/admin/invitations/create";
  const isRequestsActive = pathname === "/admin/template-requests";
  const isInvitationsActive =
    pathname.startsWith("/admin/invitations") && !isCreateActive;
  const isSettingsActive = pathname.startsWith("/admin/settings");

  const navItemClass = (isActive: boolean) =>
    `relative flex items-center gap-3.5 px-3.5 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-200 group select-none ${
      isActive
        ? "bg-gradient-to-r from-indigo-600 via-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/25 font-bold"
        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/90 dark:hover:bg-slate-800/70"
    } ${isCollapsed ? "justify-center px-0" : ""}`;

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 border-r border-slate-200/80 dark:border-slate-800/80 select-none shadow-xs transition-colors">
      {/* Brand / Logo */}
      <div
        className={`h-16 sm:h-[70px] flex items-center border-b border-slate-100 dark:border-slate-800/80 shrink-0 transition-all duration-300 ${
          isCollapsed ? "justify-center px-2" : "justify-between px-5"
        }`}
      >
        <Link href="/admin" className="flex items-center gap-3.5 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 via-pink-500 to-indigo-600 flex items-center justify-center shadow-md shadow-rose-500/20 group-hover:scale-105 group-hover:shadow-rose-500/35 transition-all shrink-0">
            <Heart size={20} className="text-white fill-white" />
          </div>
          {!isCollapsed && (
            <div className="overflow-hidden">
              <div className="flex items-center gap-2">
                <span className="text-lg font-black tracking-wider text-slate-900 dark:text-white font-sans">
                  VIORA
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-black bg-gradient-to-r from-indigo-500/15 to-violet-500/15 text-indigo-600 dark:text-indigo-400 border border-indigo-500/25 tracking-widest shadow-2xs">
                  PRO
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium tracking-tight">
                Wedding & Event Admin
              </p>
            </div>
          )}
        </Link>

        {/* Mobile close button */}
        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="md:hidden p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
        )}
      </div>

      {/* Navigation Groups */}
      <nav className="flex-1 overflow-y-auto px-3.5 py-4 space-y-5.5 custom-admin-scrollbar">
        {/* SECTION: TỔNG QUAN */}
        <div className="space-y-1">
          {!isCollapsed && (
            <p className="px-3 text-[11px] font-extrabold text-slate-400/90 dark:text-slate-500 uppercase tracking-widest mb-2">
              Trung tâm điều hành
            </p>
          )}
          <Link
            href="/admin"
            className={navItemClass(isDashboardActive)}
            title="Tổng quan Dashboard"
          >
            <LayoutDashboard
              size={18}
              className={`shrink-0 transition-transform group-hover:scale-110 ${
                isDashboardActive
                  ? "text-white"
                  : "text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400"
              }`}
            />
            {!isCollapsed && <span>Tổng quan</span>}
          </Link>
        </div>

        {/* SECTION: VẬN HÀNH THIỆP CƯỚI */}
        <div className="space-y-1">
          {!isCollapsed && (
            <p className="px-3 text-[11px] font-extrabold text-slate-400/90 dark:text-slate-500 uppercase tracking-widest mb-2">
              Quản lý thiệp cưới
            </p>
          )}

          {/* Accordion parent for Weddings */}
          <div>
            <button
              onClick={() => {
                if (isCollapsed) setIsCollapsed(false);
                setIsWeddingMenuOpen(!isWeddingMenuOpen);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                isInvitationsActive || isCreateActive || isRequestsActive
                  ? "text-indigo-600 dark:text-indigo-300 bg-indigo-50/70 dark:bg-indigo-950/50 font-bold border border-indigo-200/50 dark:border-indigo-900/40"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/90 dark:hover:bg-slate-800/70"
              } ${isCollapsed ? "justify-center px-0" : ""}`}
              title="Thiệp cưới"
            >
              <div className="flex items-center gap-3">
                <Heart
                  size={18}
                  className={`shrink-0 transition-transform group-hover:scale-110 ${
                    isInvitationsActive || isCreateActive || isRequestsActive
                      ? "text-rose-500 fill-rose-500/20"
                      : "text-rose-500/90"
                  }`}
                />
                {!isCollapsed && <span>Thiệp sự kiện</span>}
              </div>
              {!isCollapsed && (
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 text-slate-400 ${
                    isWeddingMenuOpen ? "rotate-180 text-slate-700 dark:text-slate-200" : ""
                  }`}
                />
              )}
            </button>

            {/* Sub-menu */}
            {!isCollapsed && isWeddingMenuOpen && (
              <div className="pl-3.5 pr-1 pt-1.5 space-y-1 border-l-2 border-slate-100 dark:border-slate-800 ml-5 my-1">
                {/* 1. Danh sách thiệp */}
                <Link
                  href="/admin/invitations"
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs sm:text-[13px] transition-all ${
                    isInvitationsActive
                      ? "text-indigo-600 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/70 font-bold"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 font-medium"
                  }`}
                >
                  <Layers size={14} className={isInvitationsActive ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400"} />
                  <span>Danh sách thiệp</span>
                </Link>

                {/* 2. Tạo thiệp mới */}
                <Link
                  href="/admin/invitations/create"
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs sm:text-[13px] transition-all ${
                    isCreateActive
                      ? "text-indigo-600 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/70 font-bold"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 font-medium"
                  }`}
                >
                  <PlusCircle size={14} className="text-emerald-500 shrink-0" />
                  <span>Tạo thiệp mới</span>
                </Link>

                {/* 3. Yêu cầu làm thiệp */}
                <Link
                  href="/admin/template-requests"
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-[13px] transition-all ${
                    isRequestsActive
                      ? "text-indigo-600 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/70 font-bold"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 font-medium"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Inbox size={14} className="text-amber-500 shrink-0" />
                    <span>Yêu cầu làm thiệp</span>
                  </span>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-2xs tracking-wider">
                    HOT
                  </span>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* SECTION: QUẢN LÝ DỮ LIỆU & TƯƠNG TÁC */}
        <div className="space-y-1">
          {!isCollapsed && (
            <p className="px-3 text-[11px] font-extrabold text-slate-400/90 dark:text-slate-500 uppercase tracking-widest mb-2">
              Khách mời & Tương tác
            </p>
          )}

          <Link
            href="/admin/invitations"
            className={navItemClass(false)}
            title="Quản lý khách mời và RSVP"
          >
            <Users size={18} className="shrink-0 text-slate-400 group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors" />
            {!isCollapsed && <span>Khách mời & RSVP</span>}
          </Link>

          <Link
            href="/admin/invitations"
            className={navItemClass(false)}
            title="Sổ lưu bút & Lời chúc"
          >
            <MessageSquare size={18} className="shrink-0 text-slate-400 group-hover:text-pink-500 dark:group-hover:text-pink-400 transition-colors" />
            {!isCollapsed && <span>Sổ lưu bút & Lời chúc</span>}
          </Link>
        </div>

        {/* SECTION: HỆ THỐNG */}
        <div className="space-y-1">
          {!isCollapsed && (
            <p className="px-3 text-[11px] font-extrabold text-slate-400/90 dark:text-slate-500 uppercase tracking-widest mb-2">
              Hệ thống
            </p>
          )}
          <Link
            href="/admin/settings"
            className={navItemClass(isSettingsActive)}
            title="Cài đặt hệ thống"
          >
            <Settings
              size={18}
              className={`shrink-0 transition-transform group-hover:scale-110 ${
                isSettingsActive
                  ? "text-white"
                  : "text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400"
              }`}
            />
            {!isCollapsed && <span>Cài đặt hệ thống</span>}
          </Link>
        </div>
      </nav>

      {/* Footer / Status Card */}
      <div className="p-3.5 border-t border-slate-100 dark:border-slate-800/80 shrink-0 space-y-2 pb-3.5">
        {!isCollapsed && (
          <div className="p-2.5 rounded-2xl bg-slate-50/90 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex items-center justify-between shadow-2xs backdrop-blur-xs">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-slate-100">Socket Live</p>
                <p className="text-[10px] text-slate-400 font-medium">Kết nối thời gian thực</p>
              </div>
            </div>
            <span className="text-[11px] font-mono font-black text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/80 px-2 py-0.5 rounded-lg border border-indigo-200/80 dark:border-indigo-800/60 tabular-nums">
              v2.4
            </span>
          </div>
        )}

        {/* Collapse Toggle Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title={isCollapsed ? "Mở rộng sidebar" : "Thu gọn sidebar"}
        >
          {isCollapsed ? (
            <PanelLeft size={17} />
          ) : (
            <>
              <PanelLeftClose size={15} />
              <span>Thu gọn menu</span>
            </>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`h-screen sticky top-0 shrink-0 hidden md:block transition-all duration-300 z-40 ${
          isCollapsed ? "w-[76px]" : "w-[275px]"
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs"
            onClick={onCloseMobile}
          />
          <div className="relative w-[280px] max-w-[85vw] h-full z-10 shadow-2xl">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
