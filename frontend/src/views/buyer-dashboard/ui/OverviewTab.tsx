import React, { useState, useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  Calendar,
  Edit3,
  Check,
  Copy,
  Users,
  Eye,
  Share2,
  MessageSquare,
  Image,
  UserPlus,
  Heart,
  Settings,
  X,
  Mail,
} from "lucide-react";
import zaloIcon from "../../../shared/assets/image/social/zalo.svg";
import fbIcon from "../../../shared/assets/image/social/facebook.svg";
import instaIcon from "../../../shared/assets/image/social/instagram.png";

interface OverviewTabProps {
  weddingData: any;
  confirmedGuests: number;
  declinedGuests?: number;
  pendingGuests?: number;
  totalGuests: number;
  guestList: any[];
  guestbookList: any[];
  origin: string;
  weddingSlug: string | null;
  copiedId?: string | null;
  setCopiedId?: (id: string | null) => void;
  setActiveTab: (tab: any) => void;
  setSubTab: (subTab: any) => void;
  navigate?: (path: string) => void;
}

export function OverviewTab({
  weddingData,
  confirmedGuests,
  totalGuests,
  guestList,
  guestbookList,
  origin,
  weddingSlug,
  setActiveTab,
  setSubTab,
}: OverviewTabProps) {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [timeRange, setTimeRange] = useState("7 ngày qua");
  const [isDropdownOpenMobile, setIsDropdownOpenMobile] = useState(false);
  const [isDropdownOpenDesktop, setIsDropdownOpenDesktop] = useState(false);

  const timeOptions = ["Hôm qua", "Hôm nay", "7 ngày qua", "1 tháng"];

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  React.useEffect(() => {
    if (!weddingData?.weddingDate) return;

    // Ghép ngày cưới với giờ cưới, mặc định 00:00:00
    const timePart = weddingData.weddingTime || "00:00:00";
    const weddingDateTimeStr = `${weddingData.weddingDate}T${timePart.length === 5 ? timePart + ":00" : timePart}`;
    let targetDate = new Date(weddingDateTimeStr);

    if (isNaN(targetDate.getTime())) {
      targetDate = new Date(weddingData.weddingDate);
    }

    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();
      let newTimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

      if (difference > 0) {
        newTimeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      setTimeLeft(newTimeLeft);
    };

    calculateTimeLeft();
    const intervalId = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(intervalId);
  }, [weddingData?.weddingDate, weddingData?.weddingTime]);

  // Dữ liệu giả lập lượt xem theo ngày dựa trên tổng số views
  const totalViews = weddingData?.views || 0;
  const chartData = useMemo(() => {
    if (!totalViews) {
      return Array.from({ length: 7 }).map((_, i) => ({
        date: new Date(
          Date.now() - (6 - i) * 24 * 60 * 60 * 1000,
        ).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" }),
        views: 0,
      }));
    }

    // Giả lập dữ liệu 7 ngày qua chiếm khoảng 30% tổng views
    const recentViews = Math.floor(totalViews * 0.3);
    const baseValue = Math.floor(recentViews / 7);

    return Array.from({ length: 7 }).map((_, i) => {
      const date = new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000);
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
      const multiplier = isWeekend ? 1.5 : 0.7 + Math.random() * 0.6;

      return {
        date: date.toLocaleDateString("vi-VN", {
          day: "2-digit",
          month: "2-digit",
        }),
        views: Math.floor(baseValue * multiplier),
      };
    });
  }, [totalViews]);

  return (
    <div className="space-y-6">
      {/* PHIÊN BẢN MOBILE (block md:hidden) */}
      <div className="block md:hidden space-y-5 font-sans pb-6">
        {/* Chào hỏi */}
        <div className="flex flex-col gap-0.5 mt-2 px-1">
          <h1 className="text-xl font-black text-stone-900 leading-none flex items-center gap-1">
            Xin chào, {weddingData?.groomName || "Bạn"} 👋
          </h1>
          <p className="text-[11px] text-stone-400 font-semibold mt-0.5">
            Thiệp cưới của bạn đang hoạt động tốt
          </p>
        </div>

        {/* Banner Rose Gold hồng nhạt */}
        <div className="bg-white rounded-2xl p-6 relative overflow-hidden flex justify-between items-center shadow-3xs border border-[#1b365d]/5 min-h-[240px]">
          <div className="flex-1 flex flex-col justify-between min-h-[188px] z-10 min-w-3 pr-[35%]">
            <div>
              <span className="inline-block px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-green-50 text-green-700 border border-green-200">
                Đã xuất bản
              </span>
              <h2 className="text-lg font-black text-stone-900 mt-2 leading-tight">
                Rose Gold
              </h2>
            </div>

            <a
              href={`/w/${weddingSlug}`}
              target="_blank"
              rel="noreferrer"
              className="text-[12px] font-bold text-[#1b365d] flex items-center gap-0.5 hover:underline no-underline truncate"
            >
              viora.vn/{weddingSlug}
              <svg
                className="w-2.5 h-2.5 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                />
              </svg>
            </a>

            <div className="flex gap-2 pt-1">
              <a
                href={`/w/${weddingSlug}`}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2 bg-white text-stone-850 rounded-lg text-[10px] font-extrabold border border-stone-100 shadow-3xs flex items-center gap-1.5 no-underline active:scale-95 transition-transform"
              >
                <Eye size={12} className="text-stone-500" />
                Xem thiệp
              </a>
              <button
                onClick={() => setIsShareModalOpen(true)}
                className="px-5 py-2 bg-white text-stone-850 rounded-lg text-[10px] font-extrabold border border-stone-100 shadow-3xs flex items-center gap-1.5 active:scale-95 transition-transform cursor-pointer"
              >
                <Share2 size={12} className="text-stone-500" />
                Chia sẻ
              </button>
            </div>
          </div>

          {/* Banner cô dâu chú rể góc phải tràn viền bao phủ toàn bộ chiều cao */}
          <div className="absolute right-0 top-0 bottom-0 w-[100%] overflow-hidden pointer-events-none">
            <img
              src={
                weddingData.coverUrl ||
                "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop"
              }
              alt="Rose Gold Theme"
              className="w-full h-full object-cover"
              style={{
                maskImage:
                  "linear-gradient(to left, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)",
                WebkitMaskImage:
                  "linear-gradient(to left, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)",
              }}
            />
          </div>
        </div>

        {/* Hàng 2: Thống kê tổng quan to */}
        <div className="bg-white rounded-2xl border border-pink-50/60 p-7 shadow-3xs flex flex-col relative">
          {/* Header */}
          <div className="flex justify-between items-center mb-6 z-10">
            <h2 className="text-base font-black text-stone-900 tracking-tight">
              Thống kê tổng quan
            </h2>
          </div>

          {/* Bộ Stats 4 cột vuông dạng grid 2x2 trên mobile */}
          <div className="grid grid-cols-2 gap-3">
            {/* Lượt xem */}
            <div className="bg-white rounded-2xl border border-stone-100 p-3 flex items-center justify-between shadow-3xs overflow-hidden relative min-h-[76px] transition-transform active:scale-98">
              <div className="w-7 h-7 rounded-full bg-[#1b365d]/5 flex items-center justify-center text-[#1b365d] shrink-0">
                <Eye size={13} />
              </div>
              <div className="mt-1 z-10 text-right">
                <h4 className="text-sm font-extrabold text-[#1e293b] font-mono leading-none tracking-tight">
                  {weddingData.views || 0}
                </h4>
                <p className="text-[9px] text-[#475569]/85 font-semibold mt-1">
                  Lượt xem
                </p>
              </div>
            </div>

            {/* Lời mời */}
            <div className="bg-white rounded-2xl border border-stone-100 p-3 flex items-center justify-between shadow-3xs overflow-hidden relative min-h-[76px] transition-transform active:scale-98">
              <div className="w-7 h-7 rounded-full bg-[#1b365d]/5 flex items-center justify-center text-[#1b365d] shrink-0">
                <Mail size={13} />
              </div>
              <div className="mt-1 z-10 text-right">
                <h4 className="text-sm font-extrabold text-[#1e293b] font-mono leading-none tracking-tight">
                  {totalGuests || 0}
                </h4>
                <p className="text-[9px] text-[#475569]/85 font-semibold mt-1">
                  Lời mời
                </p>
              </div>
            </div>

            {/* Khách xác nhận */}
            <div className="bg-white rounded-2xl border border-stone-100 p-3 flex items-center justify-between shadow-3xs overflow-hidden relative min-h-[76px] transition-transform active:scale-98">
              <div className="w-7 h-7 rounded-full bg-[#1b365d]/5 flex items-center justify-center text-[#1b365d] shrink-0">
                <Heart size={13} fill="currentColor" strokeWidth={0} />
              </div>
              <div className="mt-1 z-10 text-right">
                <h4 className="text-sm font-extrabold text-[#1e293b] font-mono leading-none tracking-tight">
                  {confirmedGuests || 0}
                </h4>
                <p className="text-[9px] text-[#475569]/85 font-semibold mt-1">
                  Xác nhận
                </p>
              </div>
            </div>

            {/* Lời chúc */}
            <div className="bg-white rounded-2xl border border-stone-100 p-3 flex items-center justify-between shadow-3xs overflow-hidden relative min-h-[76px] transition-transform active:scale-98">
              <div className="w-7 h-7 rounded-full bg-[#1b365d]/5 flex items-center justify-center text-[#1b365d] shrink-0">
                <MessageSquare size={13} />
              </div>
              <div className="mt-1 z-10 text-right">
                <h4 className="text-sm font-extrabold text-[#1e293b] font-mono leading-none tracking-tight">
                  {guestbookList.length || 0}
                </h4>
                <p className="text-[9px] text-[#475569]/85 font-semibold mt-1">
                  Lời chúc
                </p>
              </div>
            </div>
          </div>

          {/* Chart Area */}
          <div className="h-[250px] w-full relative z-10 -ml-2 mt-10">
            {/* Trục y label */}
            <div className="absolute left-0 top-0 bottom-6 w-8 flex flex-col justify-between text-[10px] font-mono font-medium text-stone-400 pb-1">
              <span>2K</span>
              <span>1.5K</span>
              <span>1K</span>
              <span>500</span>
              <span>0</span>
            </div>
            {/* Trục X label */}
            <div className="absolute left-10 right-0 bottom-0 h-6 flex justify-between items-end text-[10px] font-mono font-medium text-stone-400 px-1">
              <span>17/05</span>
              <span>18/05</span>
              <span>19/05</span>
              <span>20/05</span>
              <span>21/05</span>
              <span>22/05</span>
              <span>23/05</span>
            </div>

            {/* Vùng grid lines và chart */}
            <div className="absolute left-10 right-0 top-2 bottom-8 group cursor-crosshair">
              {/* Grid lines ngang */}
              <div className="absolute inset-0 flex flex-col justify-between z-0 pointer-events-none">
                <div className="border-b border-stone-100/80 w-full h-0 border-dashed"></div>
                <div className="border-b border-stone-100/80 w-full h-0 border-dashed"></div>
                <div className="border-b border-stone-100/80 w-full h-0 border-dashed"></div>
                <div className="border-b border-stone-100/80 w-full h-0 border-dashed"></div>
                <div className="border-b border-stone-100/80 w-full h-0 border-dashed"></div>
              </div>

              {/* SVG Curve Line & Area */}
              <svg
                className="w-full h-full absolute inset-0 z-10 pointer-events-none"
                viewBox="0 0 1000 200"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient
                    id="area-gradient"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#1b365d" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#1b365d" stopOpacity="0" />
                  </linearGradient>

                  {/* Drop shadow cho line */}
                  <filter
                    id="shadow"
                    x="-10%"
                    y="-10%"
                    width="120%"
                    height="120%"
                  >
                    <feDropShadow
                      dx="0"
                      dy="4"
                      stdDeviation="4"
                      floodColor="#1b365d"
                      floodOpacity="0.3"
                    />
                  </filter>
                </defs>

                {/* Đường dẫn cho area chart (background đổ màu mờ) */}
                <path
                  d="M0,120 C50,120 100,160 166,160 C232,160 280,100 333,100 C386,100 450,20 500,20 C550,20 616,130 666,130 C716,130 780,150 833,150 C886,150 950,30 1000,30 L1000,200 L0,200 Z"
                  fill="url(#area-gradient)"
                />

                {/* Đường line chính */}
                <path
                  d="M0,120 C50,120 100,160 166,160 C232,160 280,100 333,100 C386,100 450,20 500,20 C550,20 616,130 666,130 C716,130 780,150 833,150 C886,150 950,30 1000,30"
                  fill="none"
                  stroke="#1b365d"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  filter="url(#shadow)"
                />

                {/* Các điểm dot tròn tại các mốc (166px/bước) */}
                <circle
                  cx="0"
                  cy="120"
                  r="4.5"
                  fill="#1b365d"
                  stroke="white"
                  strokeWidth="2"
                />
                <circle
                  cx="166"
                  cy="160"
                  r="4.5"
                  fill="#1b365d"
                  stroke="white"
                  strokeWidth="2"
                />
                <circle
                  cx="333"
                  cy="100"
                  r="4.5"
                  fill="#1b365d"
                  stroke="white"
                  strokeWidth="2"
                />
                <circle
                  cx="500"
                  cy="20"
                  r="4.5"
                  fill="#1b365d"
                  stroke="white"
                  strokeWidth="2"
                />
                <circle
                  cx="666"
                  cy="130"
                  r="4.5"
                  fill="#1b365d"
                  stroke="white"
                  strokeWidth="2"
                />
                <circle
                  cx="833"
                  cy="150"
                  r="4.5"
                  fill="#1b365d"
                  stroke="white"
                  strokeWidth="2"
                />
                <circle
                  cx="1000"
                  cy="30"
                  r="4.5"
                  fill="#1b365d"
                  stroke="white"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Cột 2: Đếm ngược */}
        <div className="bg-white rounded-2xl border border-stone-100 p-4 shadow-3xs flex flex-col justify-between overflow-hidden relative">
          <div className="flex justify-between items-center mb-1">
            <h3 className="text-[9px] font-black text-stone-400 uppercase tracking-wider">
              Đếm ngược
            </h3>
          </div>

          {/* Banner đếm ngược thời gian thực */}
          <div className="bg-[#1b365d]/5 border border-slate-100 rounded-2xl py-3.5 px-1.5 flex justify-around items-center relative my-1 text-[#1b365d] shadow-3xs overflow-hidden">
            <div className="flex flex-col items-center">
              <span className="text-lg font-black font-mono leading-none">
                {timeLeft.days}
              </span>
              <span className="text-[7px] font-bold text-slate-400 uppercase tracking-wide mt-1">
                Ngày
              </span>
            </div>
            <div className="text-[#1b365d]/35 font-bold text-[10px] -mt-1.5">
              :
            </div>
            <div className="flex flex-col items-center">
              <span className="text-lg font-black font-mono leading-none">
                {String(timeLeft.hours).padStart(2, "0")}
              </span>
              <span className="text-[7px] font-bold text-slate-400 uppercase tracking-wide mt-1">
                Giờ
              </span>
            </div>
            <div className="text-[#1b365d]/35 font-bold text-[10px] -mt-1.5">
              :
            </div>
            <div className="flex flex-col items-center">
              <span className="text-lg font-black font-mono leading-none">
                {String(timeLeft.minutes).padStart(2, "0")}
              </span>
              <span className="text-[7px] font-bold text-slate-400 uppercase tracking-wide mt-1">
                Phút
              </span>
            </div>
            <div className="text-[#1b365d]/35 font-bold text-[10px] -mt-1.5">
              :
            </div>
            <div className="flex flex-col items-center">
              <span className="text-lg font-black font-mono leading-none">
                {String(timeLeft.seconds).padStart(2, "0")}
              </span>
              <span className="text-[7px] font-bold text-slate-400 uppercase tracking-wide mt-1">
                Giây
              </span>
            </div>
          </div>
        </div>

        {/* Khối kép Grid (Xác nhận mới nhất & Lời chúc mới nhất) */}
        <div className="grid grid-cols-2 gap-3">
          {/* Cột 1: Xác nhận mới nhất */}
          <div className="bg-white rounded-2xl border border-stone-100 p-4 shadow-3xs flex flex-col justify-between min-h-[190px]">
            <div className="flex justify-between items-center mb-2.5">
              <h3 className="text-[9px] font-black text-stone-400 uppercase tracking-wider">
                Xác nhận mới nhất
              </h3>
              <button
                onClick={() => {
                  setActiveTab("guests");
                  setSubTab("list");
                }}
                className="text-[9px] text-[#1b365d] font-bold bg-transparent border-0 cursor-pointer"
              >
                Tất cả
              </button>
            </div>

            <div className="flex-1 flex flex-col justify-center">
              {(() => {
                const latestRsvp = guestList?.find(
                  (g: any) => g.rsvpStatus === "confirmed" || g.rsvpStatus === "declined"
                );
                if (latestRsvp) {
                  const isConfirmed = latestRsvp.rsvpStatus === "confirmed";
                  return (
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-black font-mono ${
                        isConfirmed ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                      }`}>
                        {latestRsvp.name?.charAt(0)?.toUpperCase() || "G"}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-[10px] font-extrabold text-stone-900 truncate">
                          {latestRsvp.name}
                        </h4>
                        <p className="text-[9px] text-stone-650 leading-tight mt-1 font-medium">
                          {isConfirmed ? "👍 Đồng ý tham dự" : "👎 Không thể tham dự"}
                        </p>
                        <span className="text-[7px] text-stone-400 font-mono mt-0.5 block">
                          {latestRsvp.relationship || "Khách mời"}
                        </span>
                      </div>
                    </div>
                  );
                }
                return (
                  <div className="flex flex-col items-center justify-center py-2 text-stone-400">
                    <Users size={16} className="opacity-40 mb-1" />
                    <p className="text-[9px] italic text-center">Chưa có phản hồi</p>
                  </div>
                );
              })()}
            </div>
          </div>

          {/* Cột 2: Lời chúc mới nhất */}
          <div className="bg-white rounded-2xl border border-stone-100 p-4 shadow-3xs flex flex-col justify-between min-h-[190px]">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-[9px] font-black text-stone-400 uppercase tracking-wider">
                Lời chúc mới nhất
              </h3>
              <button
                onClick={() => setActiveTab("guestbook")}
                className="text-[9px] text-[#1b365d] font-bold bg-transparent border-0 cursor-pointer"
              >
                Tất cả
              </button>
            </div>

            <div className="flex-1 flex flex-col justify-center gap-1">
              {guestbookList && guestbookList.length > 0 ? (
                <>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#1b365d]/5 flex items-center justify-center text-[10px] font-black font-mono text-[#1b365d] shrink-0">
                      {guestbookList[0].name?.charAt(0)?.toUpperCase() || "W"}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-[10px] font-extrabold text-stone-900 leading-none truncate">
                        {guestbookList[0].name}
                      </h4>
                      <span className="text-[7px] text-stone-400 font-mono">
                        Gần đây
                      </span>
                    </div>
                  </div>
                  <p className="text-[9px] text-stone-600 leading-snug italic line-clamp-3 mt-1.5">
                    "{guestbookList[0].message}"
                  </p>
                </>
              ) : (
                <p className="text-[9px] text-stone-400 italic text-center">
                  Chưa có lời chúc nào
                </p>
              )}
            </div>
          </div>
        </div>
      </div>



      {/* PHIÊN BẢN DESKTOP (hidden md:block) - GIAO DIỆN MỚI */}
      <div className="hidden md:block space-y-6">
        {/* Hàng 1: 4 khối thống kê nhỏ */}
        <div className="grid grid-cols-4 gap-6">
          {/* Tổng lượt xem */}
          <div className="bg-white rounded-3xl border border-pink-50/60 p-5 shadow-3xs flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#1b365d]/5 rounded-full blur-3xl opacity-50 -z-10 group-hover:scale-110 transition-transform"></div>
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#1b365d]/5 text-[#1b365d] flex items-center justify-center mb-4 shadow-sm border border-slate-100/50">
                <Eye size={20} strokeWidth={2.5} />
              </div>
              <p className="text-xs text-stone-500 font-medium mb-1 tracking-wide">
                Tổng lượt xem
              </p>
              <h3 className="text-[26px] font-black text-stone-900 font-mono tracking-tight leading-none mb-1.5">
                {weddingData?.views || 0}
              </h3>
              <p className="text-[9px] font-bold flex items-center gap-1">
                <span className="text-green-500 bg-green-50 px-1 py-0.5 rounded flex items-center gap-0.5">
                  ▲ 18.2%
                </span>
                <span className="text-stone-400 font-medium">
                  so với 7 ngày trước
                </span>
              </p>
            </div>
            {/* SVG line chart mini */}
            <div className="h-10 mt-4 w-[110%] -ml-[5%] -mb-2">
              <svg
                viewBox="0 0 100 30"
                preserveAspectRatio="none"
                className="w-full h-full"
              >
                <path
                  d="M0,25 Q15,10 30,20 T60,5 T80,15 T100,5"
                  fill="none"
                  stroke="#1b365d"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M0,25 Q15,10 30,20 T60,5 T80,15 T100,5 L100,30 L0,30 Z"
                  fill="url(#grad1)"
                  opacity="0.3"
                />
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#1b365d" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#1b365d" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* Khách xác nhận */}
          <div className="bg-white rounded-3xl border border-pink-50/60 p-5 shadow-3xs flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#1b365d]/5 rounded-full blur-3xl opacity-50 -z-10 group-hover:scale-110 transition-transform"></div>
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#1b365d]/5 text-[#1b365d] flex items-center justify-center mb-4 shadow-sm border border-slate-100/50">
                <Heart size={20} fill="currentColor" strokeWidth={0} />
              </div>
              <p className="text-xs text-stone-500 font-medium mb-1 tracking-wide">
                Khách xác nhận
              </p>
              <h3 className="text-[26px] font-black text-stone-900 font-mono tracking-tight leading-none mb-1.5">
                {confirmedGuests || 0}
              </h3>
              <p className="text-[9px] font-bold flex items-center gap-1">
                <span className="text-green-500 bg-green-50 px-1 py-0.5 rounded flex items-center gap-0.5">
                  ▲ 12.4%
                </span>
                <span className="text-stone-400 font-medium">
                  so với 7 ngày trước
                </span>
              </p>
            </div>
            <div className="h-10 mt-4 w-[110%] -ml-[5%] -mb-2">
              <svg
                viewBox="0 0 100 30"
                preserveAspectRatio="none"
                className="w-full h-full"
              >
                <path
                  d="M0,15 Q20,25 40,10 T70,20 T100,10"
                  fill="none"
                  stroke="#1b365d"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M0,15 Q20,25 40,10 T70,20 T100,10 L100,30 L0,30 Z"
                  fill="url(#grad1)"
                  opacity="0.3"
                />
              </svg>
            </div>
          </div>

          {/* Lời chúc */}
          <div className="bg-white rounded-3xl border border-pink-50/60 p-5 shadow-3xs flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#1b365d]/5 rounded-full blur-3xl opacity-50 -z-10 group-hover:scale-110 transition-transform"></div>
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#1b365d]/5 text-[#1b365d] flex items-center justify-center mb-4 relative shadow-sm border border-slate-100/50">
                <MessageSquare size={20} strokeWidth={2.5} />
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-slate-100"></span>
              </div>
              <p className="text-xs text-stone-500 font-medium mb-1 tracking-wide">
                Lời chúc
              </p>
              <h3 className="text-[26px] font-black text-stone-900 font-mono tracking-tight leading-none mb-1.5">
                {guestbookList?.length || 0}
              </h3>
              <p className="text-[9px] font-bold flex items-center gap-1">
                <span className="text-green-500 bg-green-50 px-1 py-0.5 rounded flex items-center gap-0.5">
                  ▲ 8.1%
                </span>
                <span className="text-stone-400 font-medium">
                  so với 7 ngày trước
                </span>
              </p>
            </div>
            <div className="h-10 mt-4 w-[110%] -ml-[5%] -mb-2">
              <svg
                viewBox="0 0 100 30"
                preserveAspectRatio="none"
                className="w-full h-full"
              >
                <path
                  d="M0,20 Q15,5 35,15 T65,10 T100,25"
                  fill="none"
                  stroke="#1b365d"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M0,20 Q15,5 35,15 T65,10 T100,25 L100,30 L0,30 Z"
                  fill="url(#grad1)"
                  opacity="0.3"
                />
              </svg>
            </div>
          </div>

          {/* Lời mời */}
          <div className="bg-white rounded-3xl border border-pink-50/60 p-5 shadow-3xs flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#1b365d]/5 rounded-full blur-3xl opacity-50 -z-10 group-hover:scale-110 transition-transform"></div>
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#1b365d]/5 text-[#1b365d] flex items-center justify-center mb-4 relative shadow-sm border border-slate-100/50">
                <Mail size={20} strokeWidth={2.5} />
              </div>
              <p className="text-xs text-stone-500 font-medium mb-1 tracking-wide">
                Lời mời
              </p>
              <h3 className="text-[26px] font-black text-stone-900 font-mono tracking-tight leading-none mb-1.5">
                {totalGuests || 0}
              </h3>
              <p className="text-[9px] font-bold flex items-center gap-1">
                <span className="text-green-500 bg-green-50 px-1 py-0.5 rounded flex items-center gap-0.5">
                  ▲ 10.5%
                </span>
                <span className="text-stone-400 font-medium">
                  so với 7 ngày trước
                </span>
              </p>
            </div>
            <div className="h-10 mt-4 w-[110%] -ml-[5%] -mb-2">
              <svg
                viewBox="0 0 100 30"
                preserveAspectRatio="none"
                className="w-full h-full"
              >
                <path
                  d="M0,10 Q25,20 50,5 T80,25 T100,15"
                  fill="none"
                  stroke="#1b365d"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M0,10 Q25,20 50,5 T80,25 T100,15 L100,30 L0,30 Z"
                  fill="url(#grad1)"
                  opacity="0.3"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Hàng 2: Thống kê tổng quan to */}
        <div className="bg-white rounded-2xl border border-pink-50/60 p-7 shadow-3xs flex flex-col relative">
          {/* Header */}
          <div className="flex justify-between items-center mb-6 z-10">
            <h2 className="text-base font-black text-stone-900 tracking-tight">
              Thống kê tổng quan
            </h2>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpenDesktop(!isDropdownOpenDesktop)}
                onBlur={() =>
                  setTimeout(() => setIsDropdownOpenDesktop(false), 200)
                }
                className="flex items-center gap-2 bg-white hover:bg-[#1b365d]/5 transition-colors px-3 py-1.5 rounded-lg border border-slate-100 cursor-pointer text-xs font-semibold text-stone-600 outline-none"
              >
                {timeRange}
                <svg
                  className={`w-3.5 h-3.5 text-stone-400 transition-transform ${isDropdownOpenDesktop ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>

              {isDropdownOpenDesktop && (
                <div className="absolute right-0 top-full mt-1.5 w-32 bg-white rounded-xl shadow-lg shadow-pink-500/5 border border-slate-100 py-1.5 z-50 overflow-hidden">
                  {timeOptions.map((option) => (
                    <div
                      key={option}
                      onClick={() => {
                        setTimeRange(option);
                        setIsDropdownOpenDesktop(false);
                      }}
                      className={`px-3 py-2 text-xs cursor-pointer hover:bg-[#1b365d]/5 transition-colors flex items-center justify-between ${
                        timeRange === option
                          ? "text-[#1b365d] font-bold bg-[#1b365d]/5/50"
                          : "text-stone-600 font-semibold"
                      }`}
                    >
                      {option}
                      {timeRange === option && (
                        <Check size={12} strokeWidth={3} />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 3 thông số summary */}
          <div className="bg-white rounded-3xl p-6 grid grid-cols-3 gap-6 mb-8 border border-slate-100 shadow-sm z-10">
            <div className="border-r border-slate-100">
              <p className="text-xs text-stone-500 font-medium mb-1.5">
                Lượt xem
              </p>
              <div className="flex flex-col gap-1.5">
                <span className="text-[28px] font-black text-stone-900 font-mono tracking-tight leading-none">
                  {weddingData?.views || 0}
                </span>
                <span className="text-[10px] text-green-500 font-bold flex items-center gap-1">
                  ▲ 18.2%
                </span>
              </div>
            </div>
            <div className="border-r border-slate-100 pl-2">
              <p className="text-xs text-stone-500 font-medium mb-1.5">
                Lượt xem duy nhất
              </p>
              <div className="flex flex-col gap-1.5">
                <span className="text-[28px] font-black text-stone-900 font-mono tracking-tight leading-none">
                  {Math.floor((weddingData?.views || 0) * 0.65)}
                </span>
                <span className="text-[10px] text-green-500 font-bold flex items-center gap-1">
                  ▲ 15.6%
                </span>
              </div>
            </div>
            <div className="pl-2">
              <p className="text-xs text-stone-500 font-medium mb-1.5">
                Khách đến dự
              </p>
              <div className="flex flex-col gap-1.5">
                <span className="text-[28px] font-black text-stone-900 font-mono tracking-tight leading-none">
                  {confirmedGuests || 0}
                </span>
                <span className="text-[10px] text-green-500 font-bold flex items-center gap-1">
                  ▲ 9.3%
                </span>
              </div>
            </div>
          </div>

          {/* Chart Area */}
          <div className="h-[250px] w-full relative z-10 -ml-4 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1b365d" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#1b365d" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f5f5f4"
                />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 10,
                    fill: "#a8a29e",
                    fontFamily: "monospace",
                    fontWeight: 500,
                  }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 10,
                    fill: "#a8a29e",
                    fontFamily: "monospace",
                    fontWeight: 500,
                  }}
                  dx={-10}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow:
                      "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
                    fontSize: "12px",
                    fontWeight: "bold",
                    color: "#1e293b",
                  }}
                  itemStyle={{ color: "#1b365d" }}
                  labelStyle={{ color: "#475569", marginBottom: "4px" }}
                />
                <Area
                  type="monotone"
                  dataKey="views"
                  name="Lượt xem"
                  stroke="#1b365d"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorViews)"
                  activeDot={{
                    r: 6,
                    fill: "#1b365d",
                    stroke: "#fff",
                    strokeWidth: 2,
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Hàng 3: Khách xác nhận mới nhất & Lời chúc mới nhất */}
        <div className="grid grid-cols-2 gap-6 mt-6">
          {/* Cột 1: Khách xác nhận mới nhất */}
          <div className="bg-white rounded-3xl border border-pink-50/60 p-6 shadow-3xs flex flex-col justify-between min-h-[160px]">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xs font-black text-[#1b365d] uppercase tracking-wider">
                  Khách xác nhận mới nhất
                </h3>
                <span className="text-[10px] text-green-600 bg-green-50 px-2 py-0.5 rounded-full font-bold">
                  Đồng ý tham dự
                </span>
              </div>

              {(() => {
                const recentGuest = guestList?.find(
                  (g: any) => g.rsvpStatus === "confirmed",
                );
                return recentGuest ? (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#1b365d]/5 flex items-center justify-center text-[#1b365d] shrink-0 text-sm font-black font-mono">
                      {recentGuest.name?.charAt(0)?.toUpperCase() || "G"}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm font-extrabold text-stone-900 truncate">
                        {recentGuest.name}
                      </h4>
                      <p className="text-xs text-stone-500 font-medium mt-1 flex gap-2">
                        <span>📞 {recentGuest.phone || "Không có SĐT"}</span>
                        <span>•</span>
                        <span>👥 {recentGuest.relationship || "Bạn bè"}</span>
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-4 text-stone-400">
                    <Users size={24} className="opacity-40 mb-1" />
                    <p className="text-xs italic">
                      Chưa có khách xác nhận tham gia
                    </p>
                  </div>
                );
              })()}
            </div>
            <div className="border-t border-stone-50 pt-3 mt-4 flex justify-between items-center">
              <span className="text-[10px] text-stone-400 font-semibold uppercase">
                Cập nhật: Gần đây
              </span>
              <button
                onClick={() => {
                  setActiveTab("guests");
                  setSubTab("list");
                }}
                className="text-xs font-bold text-[#1b365d] hover:underline cursor-pointer bg-transparent border-0"
              >
                Xem tất cả khách mời →
              </button>
            </div>
          </div>

          {/* Cột 2: Lời chúc mới nhất */}
          <div className="bg-white rounded-3xl border border-pink-50/60 p-6 shadow-3xs flex flex-col justify-between min-h-[160px]">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xs font-black text-[#1b365d] uppercase tracking-wider">
                  Lời chúc mới nhất
                </h3>
                <span className="text-[10px] text-[#1b365d] bg-[#1b365d]/5 px-2 py-0.5 rounded-full font-bold">
                  Guestbook
                </span>
              </div>

              {guestbookList && guestbookList.length > 0 ? (
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1b365d]/5 flex items-center justify-center text-[#1b365d] shrink-0 text-sm font-black font-mono">
                    {guestbookList[0].name?.charAt(0)?.toUpperCase() || "W"}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-extrabold text-stone-900 truncate">
                      {guestbookList[0].name}
                    </h4>
                    <p className="text-xs text-stone-600 italic mt-1.5 leading-relaxed line-clamp-2">
                      "{guestbookList[0].message}"
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-4 text-stone-400">
                  <MessageSquare size={24} className="opacity-40 mb-1" />
                  <p className="text-xs italic">Chưa có lời chúc nào mới</p>
                </div>
              )}
            </div>
            <div className="border-t border-stone-50 pt-3 mt-4 flex justify-between items-center">
              <span className="text-[10px] text-stone-400 font-semibold uppercase">
                Trạng thái: Đã duyệt
              </span>
              <button
                onClick={() => setActiveTab("guestbook")}
                className="text-xs font-bold text-[#1b365d] hover:underline cursor-pointer bg-transparent border-0"
              >
                Xem tất cả lời chúc →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SHARE MODAL */}
      {isShareModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center p-4 bg-black/40 animate-fade-in transition-opacity">
          <div className="bg-white w-full max-w-[400px] rounded-2xl p-6 shadow-2xl relative animate-fade-in">
            {/* Nút đóng */}
            <button
              onClick={() => setIsShareModalOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-600 bg-stone-100 p-1.5 rounded-full cursor-pointer border-0 transition-colors z-10"
            >
              <X size={16} />
            </button>

            <h3 className="text-stone-500 text-xs font-semibold mb-2">
              Link thiệp cưới
            </h3>

            {/* Input link */}
            <div className="flex items-center bg-white border border-[#1b365d]/20 rounded-xl p-2.5 mb-5">
              <span className="flex-1 text-sm font-semibold text-stone-800 truncate px-1">
                viora.vn/{weddingSlug}
              </span>
              <button
                onClick={() => {
                  if (typeof window !== "undefined") {
                    navigator.clipboard.writeText(`${origin}/w/${weddingSlug}`);
                    alert("Đã sao chép liên kết thiệp cưới!");
                  }
                }}
                className="ml-2 p-2 bg-white text-[#1b365d] rounded-lg shadow-sm border border-slate-100 cursor-pointer active:scale-95 transition-transform"
              >
                <Copy size={16} />
              </button>
            </div>

            {/* Nút chia sẻ thiệp */}
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: "Thiệp cưới của chúng tôi",
                    text: "Mời bạn tham dự lễ cưới!",
                    url: `${origin}/w/${weddingSlug}`,
                  });
                } else {
                  if (typeof window !== "undefined") {
                    navigator.clipboard.writeText(`${origin}/w/${weddingSlug}`);
                    alert("Đã sao chép liên kết thiệp cưới!");
                  }
                }
              }}
              className="w-full bg-[#1b365d] hover:bg-[#be185d] text-white font-bold py-3.5 rounded-xl text-sm transition-colors cursor-pointer border-0 shadow-md shadow-pink-500/20 mb-6"
            >
              Chia sẻ thiệp
            </button>

            {/* Social Icons */}
            <div className="flex justify-between items-center px-1">
              {/* Zalo */}
              <a
                href={`https://zalo.me/share?url=${origin}/w/${weddingSlug}`}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col items-center gap-1.5 cursor-pointer no-underline group w-14"
              >
                <img
                  src={zaloIcon.src || zaloIcon}
                  alt="Zalo"
                  className="w-12 h-12 rounded-full shadow-md group-hover:scale-110 transition-transform object-cover"
                />
                <span className="text-[10px] text-stone-600 font-medium">
                  Zalo
                </span>
              </a>

              {/* Facebook */}
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${origin}/w/${weddingSlug}`}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col items-center gap-1.5 cursor-pointer no-underline group w-14"
              >
                <img
                  src={fbIcon.src || fbIcon}
                  alt="Facebook"
                  className="w-12 h-12 rounded-full shadow-md group-hover:scale-110 transition-transform object-cover"
                />
                <span className="text-[10px] text-stone-600 font-medium">
                  Facebook
                </span>
              </a>

              {/* Instagram */}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  alert(
                    "Instagram chưa hỗ trợ share link trực tiếp qua web, vui lòng copy link để gửi thủ công.",
                  );
                }}
                className="flex flex-col items-center gap-1.5 cursor-pointer no-underline group w-14"
              >
                <img
                  src={instaIcon.src || instaIcon}
                  alt="Instagram"
                  className="w-12 h-12 rounded-full shadow-md group-hover:scale-110 transition-transform object-cover"
                />
                <span className="text-[10px] text-stone-600 font-medium">
                  Instagram
                </span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
