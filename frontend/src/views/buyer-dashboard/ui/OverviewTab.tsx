import React, { useState, useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
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

  const mobilePieData = useMemo(() => {
    const views = weddingData?.views || 0;
    const guests = totalGuests || 0;
    const wishes = guestbookList?.length || 0;

    return [
      { name: "Lượt xem", value: views, color: "#1b365d" },
      { name: "Khách mời", value: guests, color: "#0ea5e9" },
      { name: "Lời chúc", value: wishes, color: "#f43f5e" },
    ];
  }, [weddingData?.views, totalGuests, guestbookList?.length]);

  const mobilePieTotal = useMemo(() => {
    const views = weddingData?.views || 0;
    const guests = totalGuests || 0;
    const wishes = guestbookList?.length || 0;
    return views + guests + wishes;
  }, [weddingData?.views, totalGuests, guestbookList?.length]);

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

        {/* Hàng 2: Biểu đồ tròn thống kê tổng quan (Mobile) */}
        <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-3xs flex flex-col relative">
          {/* Header */}
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-sm font-black text-stone-900 tracking-tight">
              Thống kê tổng quan
            </h2>
            <span className="text-[10px] font-bold text-stone-400">
              Tổng hợp
            </span>
          </div>

          <div className="flex items-center justify-between gap-3">
            {/* Donut Chart */}
            <div className="w-[130px] h-[130px] relative shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip
                    contentStyle={{
                      borderRadius: "10px",
                      border: "none",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                      fontSize: "11px",
                      fontWeight: "bold",
                    }}
                  />
                  <Pie
                    data={mobilePieTotal > 0 ? mobilePieData : [{ name: "Chưa có", value: 1, color: "#f1f5f9" }]}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={36}
                    outerRadius={56}
                    paddingAngle={mobilePieTotal > 0 ? 4 : 0}
                    cornerRadius={4}
                  >
                    {(mobilePieTotal > 0 ? mobilePieData : [{ name: "Chưa có", value: 1, color: "#f1f5f9" }]).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-[8px] font-bold text-stone-400 uppercase tracking-wider leading-none">Tổng</span>
                <span className="text-sm font-black text-stone-900 font-mono leading-tight mt-0.5">{mobilePieTotal}</span>
              </div>
            </div>

            {/* Chú thích 3 mục */}
            <div className="flex-1 space-y-2.5 pl-1">
              {mobilePieData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-stone-600 font-medium text-xs truncate">{item.name}</span>
                  </div>
                  <span className="font-black text-stone-900 font-mono text-xs ml-2 shrink-0">{item.value}</span>
                </div>
              ))}
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
        <div className="grid grid-cols-4 gap-4">
          {/* Tổng lượt xem */}
          <div className="bg-white rounded-2xl border border-slate-100 px-4 py-3 shadow-3xs relative overflow-hidden group">
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-[#1b365d]/5 rounded-full blur-lg opacity-60 pointer-events-none"></div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-stone-500 font-medium tracking-wide">
                Tổng lượt xem
              </span>
              <div className="w-7 h-7 rounded-lg bg-[#1b365d]/5 text-[#1b365d] flex items-center justify-center border border-slate-100/60 shrink-0">
                <Eye size={15} strokeWidth={2.5} />
              </div>
            </div>
            <p className="text-2xl font-black text-stone-900 font-mono tracking-tight leading-none m-0">
              {weddingData?.views || 0}
            </p>
          </div>

          {/* Khách xác nhận */}
          <div className="bg-white rounded-2xl border border-slate-100 px-4 py-3 shadow-3xs relative overflow-hidden group">
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-[#1b365d]/5 rounded-full blur-lg opacity-60 pointer-events-none"></div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-stone-500 font-medium tracking-wide">
                Khách xác nhận
              </span>
              <div className="w-7 h-7 rounded-lg bg-[#1b365d]/5 text-[#1b365d] flex items-center justify-center border border-slate-100/60 shrink-0">
                <Heart size={15} fill="currentColor" strokeWidth={0} />
              </div>
            </div>
            <p className="text-2xl font-black text-stone-900 font-mono tracking-tight leading-none m-0">
              {confirmedGuests || 0}
            </p>
          </div>

          {/* Lời chúc */}
          <div className="bg-white rounded-2xl border border-slate-100 px-4 py-3 shadow-3xs relative overflow-hidden group">
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-[#1b365d]/5 rounded-full blur-lg opacity-60 pointer-events-none"></div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-stone-500 font-medium tracking-wide">
                Lời chúc
              </span>
              <div className="w-7 h-7 rounded-lg bg-[#1b365d]/5 text-[#1b365d] flex items-center justify-center relative border border-slate-100/60 shrink-0">
                <MessageSquare size={15} strokeWidth={2.5} />
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
              </div>
            </div>
            <p className="text-2xl font-black text-stone-900 font-mono tracking-tight leading-none m-0">
              {guestbookList?.length || 0}
            </p>
          </div>

          {/* Lời mời */}
          <div className="bg-white rounded-2xl border border-slate-100 px-4 py-3 shadow-3xs relative overflow-hidden group">
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-[#1b365d]/5 rounded-full blur-lg opacity-60 pointer-events-none"></div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-stone-500 font-medium tracking-wide">
                Lời mời
              </span>
              <div className="w-7 h-7 rounded-lg bg-[#1b365d]/5 text-[#1b365d] flex items-center justify-center relative border border-slate-100/60 shrink-0">
                <Mail size={15} strokeWidth={2.5} />
              </div>
            </div>
            <p className="text-2xl font-black text-stone-900 font-mono tracking-tight leading-none m-0">
              {totalGuests || 0}
            </p>
          </div>
        </div>

        {/* Hàng 2: Thống kê tổng quan to */}
        <div className="bg-white rounded-2xl border border-pink-50/60 p-7 shadow-3xs flex flex-col relative">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-base font-black text-stone-900 tracking-tight">
              Lượt xem
            </h2>
            <span className="text-xs font-semibold text-stone-400">
              7 ngày gần nhất
            </span>
          </div>

          {/* Chart Area */}
          <div className="h-[250px] w-full relative z-0 -ml-4 mt-4">
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
          <div className="bg-white rounded-3xl border border-pink-50/60 p-6 shadow-3xs flex flex-col justify-between h-[380px]">
            <div className="flex-1 flex flex-col min-h-0">
              <div className="flex justify-between items-center mb-4 shrink-0">
                <h3 className="text-xs font-black text-[#1b365d] uppercase tracking-wider">
                  Khách đã xác nhận
                </h3>
                <span className="text-[10px] text-green-600 bg-green-50 px-2 py-0.5 rounded-full font-bold">
                  Đồng ý tham dự
                </span>
              </div>

              {(() => {
                const confirmedGuests = guestList?.filter(
                  (g: any) => g.rsvpStatus === "confirmed",
                ) || [];
                
                const sortedGuests = [...confirmedGuests].sort((a: any, b: any) => {
                  const dateA = new Date(a.updatedAt || a.createdAt || 0).getTime();
                  const dateB = new Date(b.updatedAt || b.createdAt || 0).getTime();
                  return dateB - dateA;
                });

                return sortedGuests.length > 0 ? (
                  <div className="flex-1 overflow-y-auto pr-1 space-y-3.5">
                    {sortedGuests.map((guest: any) => (
                      <div key={guest._id} className="flex items-center gap-3 pb-3 border-b border-stone-50 last:pb-0 last:border-b-0">
                        <div className="w-9 h-9 rounded-full bg-[#1b365d]/5 flex items-center justify-center text-[#1b365d] shrink-0 text-xs font-black font-mono">
                          {guest.name?.charAt(0)?.toUpperCase() || "G"}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="text-sm font-extrabold text-stone-900 truncate">
                            {guest.name}
                          </h4>
                          <p className="text-[11px] text-stone-500 font-medium mt-0.5 flex gap-2">
                            <span>📞 {guest.phone || "Không có SĐT"}</span>
                            <span>•</span>
                            <span>👥 {guest.relationship || "Bạn bè"}</span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center py-4 text-stone-400">
                    <Users size={24} className="opacity-40 mb-1" />
                    <p className="text-xs italic">
                      Chưa có khách xác nhận tham gia
                    </p>
                  </div>
                );
              })()}
            </div>
            <div className="border-t border-stone-50 pt-3 mt-4 flex justify-between items-center shrink-0">
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
          <div className="bg-white rounded-3xl border border-pink-50/60 p-6 shadow-3xs flex flex-col justify-between h-[380px]">
            <div className="flex-1 flex flex-col min-h-0">
              <div className="flex justify-between items-center mb-4 shrink-0">
                <h3 className="text-xs font-black text-[#1b365d] uppercase tracking-wider">
                  Lời chúc đã nhận
                </h3>
                <span className="text-[10px] text-[#1b365d] bg-[#1b365d]/5 px-2 py-0.5 rounded-full font-bold">
                  Guestbook
                </span>
              </div>

              {guestbookList && guestbookList.length > 0 ? (
                (() => {
                  const sortedWishes = [...guestbookList].sort((a: any, b: any) => {
                    const dateA = new Date(a.createdAt || 0).getTime();
                    const dateB = new Date(b.createdAt || 0).getTime();
                    return dateB - dateA;
                  });

                  return (
                    <div className="flex-1 overflow-y-auto pr-1 space-y-3.5">
                      {sortedWishes.map((wish: any) => (
                        <div key={wish._id} className="flex items-start gap-3 pb-3 border-b border-stone-50 last:pb-0 last:border-b-0">
                          <div className="w-9 h-9 rounded-full bg-[#1b365d]/5 flex items-center justify-center text-[#1b365d] shrink-0 text-xs font-black font-mono mt-0.5">
                            {wish.name?.charAt(0)?.toUpperCase() || "W"}
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="text-sm font-extrabold text-stone-900 truncate">
                              {wish.name}
                            </h4>
                            <p className="text-xs text-stone-600 italic mt-1 leading-relaxed">
                              "{wish.message}"
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })()
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center py-4 text-stone-400">
                  <MessageSquare size={24} className="opacity-40 mb-1" />
                  <p className="text-xs italic">Chưa có lời chúc nào mới</p>
                </div>
              )}
            </div>
            <div className="border-t border-stone-50 pt-3 mt-4 flex justify-between items-center shrink-0">
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
