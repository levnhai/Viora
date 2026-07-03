import { useState } from "react";
import { LogOut } from "lucide-react";

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

  return (
    <>
      {/* Header Desktop (hidden md:block) */}
      <header className="bg-white border-b border-[#c9828e]/15 sticky top-0 z-30 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <img
            src="/icon.svg"
            alt="Viora Logo"
            className="h-10 w-auto select-none font-sans"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/dashboard")}
          />

          <div className="flex items-center gap-4">
            <span className="text-xs text-[#7a5c4f] hidden sm:inline-block">
              Tài khoản: <span className="font-semibold">{username}</span>
            </span>
            {weddingSlug && (
              <a
                href={`/w/${weddingSlug}`}
                target="_blank"
                rel="noreferrer"
                className="text-xs px-3 py-1.5 rounded-lg border border-[#c9828e]/30 text-[#8b3a52] hover:bg-[#8b3a52]/5 transition-colors no-underline font-medium font-sans"
              >
                Xem thiệp live
              </a>
            )}
            <button
              onClick={handleLogout}
              className="text-xs text-[#7a5c4f] hover:text-red-600 transition-colors flex items-center gap-1.5 border-0 bg-transparent cursor-pointer font-medium font-sans"
            >
              <LogOut size={14} /> Đăng xuất
            </button>
          </div>
        </div>
      </header>

      {/* Header Mobile (block md:hidden) */}
      <header className="sticky top-0 w-full border-b border-stone-100 z-30 block md:hidden bg-white">
        <div className="flex items-center justify-between h-14 px-4 w-full">
          {activeTab === "overview" && (
            <>
              <div className="flex items-center">
                <img
                  src="/icon.svg"
                  alt="Viora Logo"
                  className="h-20 w-auto select-none"
                />
                <h3 className="text-[16px] font-extrabold text-pink-500 font-sans tracking-tight pt-0.5">
                  VIORA
                </h3>
              </div>
              <div className="relative flex items-center">
                <button className="flex items-center justify-center p-1.5 text-stone-600 hover:bg-stone-100 rounded-full border-0 bg-transparent cursor-pointer relative transition-colors">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
                </button>
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
