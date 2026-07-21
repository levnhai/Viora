import { Heart, Users, BookOpen, Settings } from "lucide-react";

interface DashboardSidebarProps {
  activeTab: string;
  setActiveTab: (tab: "overview" | "guests" | "guestbook" | "setting") => void;
  guestListLength: number;
  guestbookListLength: number;
  weddingSlug: string | null;
  navigate: (path: string) => void;
}

export const DashboardSidebar = ({
  activeTab,
  setActiveTab,
  guestListLength,
  guestbookListLength,
  weddingSlug,
  navigate,
}: DashboardSidebarProps) => {
  return (
    <aside className="w-full md:w-64 shrink-0 hidden md:block font-sans">
      <div className="bg-white rounded-2xl border border-slate-100 p-4 space-y-2 shadow-sm">
        <button
          onClick={() => setActiveTab("overview")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all border-0 cursor-pointer ${
            activeTab === "overview"
              ? "bg-[#1b365d] text-white shadow-sm"
              : "bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          }`}
        >
          <Heart
            size={16}
            fill={activeTab === "overview" ? "currentColor" : "none"}
          />{" "}
          Tổng quan
        </button>
        <button
          onClick={() => setActiveTab("guests")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all border-0 cursor-pointer ${
            activeTab === "guests"
              ? "bg-[#1b365d] text-white shadow-sm"
              : "bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          }`}
        >
          <Users size={16} /> Khách mời
          <span
            className={`ml-auto text-2xs px-2 py-0.5 rounded-full ${
              activeTab === "guests"
                ? "bg-white/20 text-white"
                : "bg-[#1b365d]/10 text-[#1b365d]"
            }`}
          >
            {guestListLength}
          </span>
        </button>
        <button
          onClick={() => setActiveTab("guestbook")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all border-0 cursor-pointer ${
            activeTab === "guestbook"
              ? "bg-[#1b365d] text-white shadow-sm"
              : "bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          }`}
        >
          <BookOpen size={16} /> Lời chúc
          <span
            className={`ml-auto text-2xs px-2 py-0.5 rounded-full ${
              activeTab === "guestbook"
                ? "bg-white/20 text-white"
                : "bg-[#1b365d]/10 text-[#1b365d]"
            }`}
          >
            {guestbookListLength}
          </span>
        </button>
        <button
          onClick={() => setActiveTab("setting")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all border-0 cursor-pointer ${
            activeTab === "setting"
              ? "bg-[#1b365d] text-white shadow-sm"
              : "bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          }`}
        >
          <Settings size={16} /> Cài đặt
        </button>
      </div>
    </aside>
  );
};
