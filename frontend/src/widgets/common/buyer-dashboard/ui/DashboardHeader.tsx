"use client";

import { useState } from "react";
import { LogOut, User, Key, ChevronDown, Eye } from "lucide-react";

interface DashboardHeaderProps {
  activeTab: string;
  setActiveTab: (tab: "overview" | "guests" | "guestbook" | "setting") => void;
  weddingSlug: string | null;
  username: string | null;
  navigate: (path: string) => void;
  handleLogout: () => void;
  onExportGuests: () => void;
  onExportGuestbook: () => void;
}

export const DashboardHeader = ({
  activeTab,
  setActiveTab,
  weddingSlug,
  username,
  navigate,
  handleLogout,
  onExportGuests,
  onExportGuestbook,
}: DashboardHeaderProps) => {
  const [isMobileGuestMenuOpen, setIsMobileGuestMenuOpen] = useState(false);
  const [isMobileGuestbookMenuOpen, setIsMobileGuestbookMenuOpen] =
    useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const getInitials = (name: string | null) => {
    if (!name) return "U";
    const cleanName = name.trim();
    if (!cleanName) return "U";
    const parts = cleanName.split(" ");
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <>
      {/* Header Desktop (hidden md:block) */}
      <header className="buyer-dashboard__header bg-white/95 backdrop-blur-xl border-b border-slate-200/80 sticky top-0 z-30 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer select-none"
            onClick={() => navigate("/dashboard")}
          >
            <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 shadow-3xs transition-transform duration-200 hover:scale-105">
              <img
                src="/icon.svg"
                alt="Viora Logo"
                className="h-6 w-auto"
              />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-black text-slate-800 tracking-wider font-sans uppercase">
                2H
              </span>
              <span className="text-[10px] font-bold text-slate-400 font-sans tracking-wide uppercase pt-0.5">
                / Dashboard
              </span>
            </div>
          </div>
 
          <div className="flex items-center gap-4">
            {weddingSlug && (
              <a
                href={`/w/${weddingSlug}`}
                target="_blank"
                rel="noreferrer"
                className="text-xs px-3.5 py-2 rounded-xl border border-[#1b365d]/20 text-[#1b365d] hover:bg-[#1b365d]/5 transition-colors no-underline font-medium font-sans flex items-center justify-center"
              >
                Xem thiệp live
              </a>
            )}
            
            {/* User Avatar Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-50 border-0 bg-transparent cursor-pointer transition-all focus:outline-none"
              >
                <div className="w-8 h-8 rounded-full bg-[#1b365d] text-white flex items-center justify-center text-xs font-bold font-mono tracking-wider shadow-2xs">
                  {getInitials(username)}
                </div>
                <ChevronDown size={14} className="text-slate-450" />
              </button>

              {isUserMenuOpen && (
                <>
                  {/* Overlay to close menu */}
                  <div
                    className="fixed inset-0 z-40 cursor-default"
                    onClick={() => setIsUserMenuOpen(false)}
                  />
                  {/* Dropdown Menu */}
                  <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-100 py-2.5 z-50 animate-in fade-in zoom-in-95 duration-100 origin-top-right">
                    {/* User Info Section */}
                    <div className="px-4 py-2 border-b border-slate-100 mb-2">
                      <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                        Tài khoản
                      </p>
                      <p className="text-sm font-bold text-slate-800 truncate mt-0.5">
                        {username || "Người dùng"}
                      </p>
                    </div>

                    {/* Menu Items */}
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        navigate("/account");
                      }}
                      className="w-full px-4 py-2 text-xs text-left hover:bg-slate-50 border-0 bg-transparent cursor-pointer text-slate-700 font-medium flex items-center gap-2.5 transition-colors"
                    >
                      <Key size={14} className="text-slate-400" />
                      Đổi mật khẩu
                    </button>
                    
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        handleLogout();
                      }}
                      className="w-full px-4 py-2 text-xs text-left hover:bg-red-50 hover:text-red-600 border-0 bg-transparent cursor-pointer text-slate-700 font-medium flex items-center gap-2.5 transition-colors"
                    >
                      <LogOut size={14} className="text-slate-400" />
                      Đăng xuất
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
 
      {/* Header Mobile (block md:hidden) */}
      <header className="buyer-dashboard__header sticky top-0 w-full border-b border-slate-200/80 z-30 block md:hidden bg-white/95 backdrop-blur-xl">
        <div className="flex items-center justify-between h-14 px-4 w-full">
          {activeTab === "overview" && (
            <>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100">
                  <img
                    src="/icon.svg"
                    alt="Viora Logo"
                    className="h-5.5 w-auto select-none"
                  />
                </div>
                <h3 className="text-[15px] font-black text-slate-800 font-sans tracking-wider uppercase pt-0.5">
                  2H
                </h3>
              </div>
              <div className="flex items-center">
                {weddingSlug ? (
                  <a
                    href={`/w/${weddingSlug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1b365d] text-white text-xs font-semibold shadow-xs active:scale-95 transition-transform no-underline"
                  >
                    <Eye size={13} />
                    <span>Xem thiệp</span>
                  </a>
                ) : (
                  <button
                    onClick={() => navigate("/templates")}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1b365d] text-white text-xs font-semibold shadow-xs active:scale-95 transition-transform border-0 cursor-pointer"
                  >
                    <span>Tạo thiệp</span>
                  </button>
                )}
              </div>
            </>
          )}

          {activeTab === "guests" && (
            <>
              <button
                onClick={() => setActiveTab("overview")}
                className="p-1 hover:bg-stone-100 rounded-full border-0 bg-transparent cursor-pointer flex items-center justify-center text-stone-600"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <span className="text-base font-bold text-stone-900 font-sans">
                Khách mời
              </span>
              <div className="relative">
                <button
                  onClick={() =>
                    setIsMobileGuestMenuOpen(!isMobileGuestMenuOpen)
                  }
                  className="p-1 hover:bg-stone-100 rounded-full border-0 bg-transparent cursor-pointer flex items-center justify-center text-stone-600"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                    />
                  </svg>
                </button>
                {isMobileGuestMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setIsMobileGuestMenuOpen(false)}
                    />
                    <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-xl shadow-lg border border-stone-100 py-1.5 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100 origin-top-right">
                      <button
                        onClick={() => {
                          setIsMobileGuestMenuOpen(false);
                          onExportGuests();
                        }}
                        className="w-full px-4 py-2.5 text-xs text-left hover:bg-stone-50 border-0 bg-transparent cursor-pointer text-stone-700 font-medium flex items-center gap-2"
                      >
                        <svg
                          className="w-4 h-4 text-stone-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                          />
                        </svg>
                        Xuất file Excel
                      </button>
                    </div>
                  </>
                )}
              </div>
            </>
          )}

          {activeTab === "guestbook" && (
            <>
              <button
                onClick={() => setActiveTab("overview")}
                className="p-1 hover:bg-stone-100 rounded-full border-0 bg-transparent cursor-pointer flex items-center justify-center text-stone-600"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <span className="text-base font-bold text-stone-900 font-sans">
                Lời chúc
              </span>
              <div className="relative">
                <button
                  onClick={() =>
                    setIsMobileGuestbookMenuOpen(!isMobileGuestbookMenuOpen)
                  }
                  className="p-1 hover:bg-stone-100 rounded-full border-0 bg-transparent cursor-pointer flex items-center justify-center text-stone-600"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                    />
                  </svg>
                </button>
                {isMobileGuestbookMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setIsMobileGuestbookMenuOpen(false)}
                    />
                    <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-xl shadow-lg border border-stone-100 py-1.5 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100 origin-top-right">
                      <button
                        onClick={() => {
                          setIsMobileGuestbookMenuOpen(false);
                          onExportGuestbook();
                        }}
                        className="w-full px-4 py-2.5 text-xs text-left hover:bg-stone-50 border-0 bg-transparent cursor-pointer text-stone-700 font-medium flex items-center gap-2"
                      >
                        <svg
                          className="w-4 h-4 text-stone-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                          />
                        </svg>
                        Xuất file Excel
                      </button>
                    </div>
                  </>
                )}
              </div>
            </>
          )}

          {activeTab === "setting" && (
            <>
              <button
                onClick={() => setActiveTab("overview")}
                className="p-1 hover:bg-stone-100 rounded-full border-0 bg-transparent cursor-pointer flex items-center justify-center text-stone-600"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <span className="text-base font-bold text-stone-900 font-sans">
                Cài đặt
              </span>
              <div className="w-7 h-7" />
            </>
          )}
        </div>
      </header>
    </>
  );
};
