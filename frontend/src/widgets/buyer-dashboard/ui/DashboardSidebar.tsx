import { Heart, Users, BookOpen, Edit3, Settings } from "lucide-react";

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
    <aside className="w-full md:w-64 shrink-0 hidden md:block">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-[#c9828e]/15 p-4 space-y-2">
        <button
          onClick={() => setActiveTab("overview")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all border-0 cursor-pointer ${
            activeTab === "overview"
              ? "bg-[#8b3a52] text-white shadow-sm"
              : "bg-transparent text-[#7a5c4f] hover:bg-[#8b3a52]/5"
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
              ? "bg-[#8b3a52] text-white shadow-sm"
              : "bg-transparent text-[#7a5c4f] hover:bg-[#8b3a52]/5"
          }`}
        >
          <Users size={16} /> Khách mời
          <span
            className={`ml-auto text-2xs px-2 py-0.5 rounded-full ${
              activeTab === "guests"
                ? "bg-white/20 text-white"
                : "bg-[#8b3a52]/10 text-[#8b3a52]"
            }`}
          >
            {guestListLength}
          </span>
        </button>
        <button
          onClick={() => setActiveTab("guestbook")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all border-0 cursor-pointer ${
            activeTab === "guestbook"
              ? "bg-[#8b3a52] text-white shadow-sm"
              : "bg-transparent text-[#7a5c4f] hover:bg-[#8b3a52]/5"
          }`}
        >
          <BookOpen size={16} /> Lời chúc
          <span
            className={`ml-auto text-2xs px-2 py-0.5 rounded-full ${
              activeTab === "guestbook"
                ? "bg-white/20 text-white"
                : "bg-[#8b3a52]/10 text-[#8b3a52]"
            }`}
          >
            {guestbookListLength}
          </span>
        </button>
        <hr className="border-[#c9828e]/15 my-2" />
        <button
          onClick={() => navigate(`/edit/${weddingSlug}`)}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all border-0 cursor-pointer bg-transparent text-[#7a5c4f] hover:bg-[#8b3a52]/5"
        >
          <Edit3 size={16} /> Chỉnh sửa thiệp cưới
        </button>
        <button
          onClick={() => navigate("/account")}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all border-0 cursor-pointer bg-transparent text-[#7a5c4f] hover:bg-[#8b3a52]/5"
        >
          <Settings size={16} /> Cài đặt tài khoản
        </button>
      </div>
    </aside>
  );
};
