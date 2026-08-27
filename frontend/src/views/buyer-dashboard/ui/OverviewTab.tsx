import React, { useState, useMemo, useEffect } from "react";
import { createPortal } from "react-dom";
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
  Copy,
  Users,
  Eye,
  Share2,
  MessageSquare,
  Heart,
  X,
  Sparkles,
  ExternalLink,
  UserPlus,
  CreditCard,
  ChevronRight,
  Clock,
  Quote,
} from "lucide-react";
import zaloIcon from "../../../shared/assets/image/social/zalo.svg";
import fbIcon from "../../../shared/assets/image/social/facebook.svg";
import instaIcon from "../../../shared/assets/image/social/instagram.png";
import { toast } from "sonner";

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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Tính đếm ngược ngày cưới
  useEffect(() => {
    if (!weddingData?.weddingDate) return;

    const timePart = weddingData.weddingTime || "00:00:00";
    const weddingDateTimeStr = `${weddingData.weddingDate}T${
      timePart.length === 5 ? timePart + ":00" : timePart
    }`;
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

  // Format ngày cưới hiển thị đẹp
  const formattedWeddingDate = useMemo(() => {
    if (!weddingData?.weddingDate) return "Ngày hạnh phúc";
    try {
      const date = new Date(weddingData.weddingDate);
      return date.toLocaleDateString("vi-VN", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    } catch {
      return weddingData.weddingDate;
    }
  }, [weddingData?.weddingDate]);

  // Dữ liệu giả lập biểu đồ lượt xem 7 ngày
  const totalViews = weddingData?.views || 0;
  const chartData = useMemo(() => {
    if (!totalViews) {
      return Array.from({ length: 7 }).map((_, i) => ({
        date: new Date(
          Date.now() - (6 - i) * 24 * 60 * 60 * 1000
        ).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" }),
        views: 0,
      }));
    }

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

  const handleCopyLink = () => {
    if (typeof window !== "undefined" && weddingSlug) {
      navigator.clipboard.writeText(`${origin}/w/${weddingSlug}`);
      toast.success("Đã sao chép liên kết thiệp cưới!");
    }
  };

  return (
    <div className="space-y-4 md:space-y-6 font-sans">
      {/* ========================================================
          1. HERO HEADER: BANNER ĐẲNG CẤP DÀNH CHO CẶP ĐÔI
      ======================================================== */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#11223e] via-[#1b365d] to-[#234778] p-4 sm:p-6 text-white shadow-lg shadow-[#1b365d]/15">
        {/* Hoa văn trang trí background */}
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-rose-400/10 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-sky-400/10 blur-xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            {/* Huy hiệu online */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[10px] font-medium text-emerald-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Thiệp đang hoạt động trực tuyến</span>
            </div>

            {/* Tên cặp đôi */}
            <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
              <span>
                {weddingData?.groomName && weddingData?.brideName
                  ? `${weddingData.groomName} & ${weddingData.brideName}`
                  : weddingData?.groomName || "Hôn lễ của bạn"}
              </span>
              <Heart size={16} className="text-rose-400 fill-rose-400 shrink-0" />
            </h1>

            {/* Link thiệp rút gọn */}
            <p className="text-[11px] text-slate-300 flex items-center gap-1.5 font-medium">
              <Sparkles size={12} className="text-amber-300" />
              <span>viora.vn/{weddingSlug || "thiep-cuoi"}</span>
            </p>
          </div>

          {/* 2 Nút hành động nhanh trên Hero */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Nút Xem thiệp */}
            <a
              href={`${origin}/w/${weddingSlug}`}
              target="_blank"
              rel="noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-white text-[#1b365d] hover:bg-slate-50 text-[11px] font-bold shadow-xs active:scale-95 transition-all no-underline cursor-pointer"
            >
              <ExternalLink size={13} />
              <span>Xem thiệp</span>
            </a>

            {/* Nút Chia sẻ */}
            <button
              type="button"
              onClick={() => setIsShareModalOpen(true)}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white border border-white/20 text-[11px] font-bold backdrop-blur-md active:scale-95 transition-all cursor-pointer"
            >
              <Share2 size={13} />
              <span>Chia sẻ</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================
          2. BỘ 3 THẺ CHỈ SỐ THỐNG KÊ (STAT CARDS MINI)
      ======================================================== */}
      <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
        {/* Thẻ 1: Lượt xem */}
        <div className="bg-white rounded-2xl border border-stone-100 p-3 sm:p-4 shadow-3xs hover:shadow-xs transition-all relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] sm:text-xs font-semibold text-stone-500">
              Lượt xem
            </span>
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-[#1b365d]/5 text-[#1b365d] flex items-center justify-center">
              <Eye size={13} />
            </div>
          </div>
          <div>
            <span className="text-lg sm:text-2xl font-black text-stone-900 font-mono tracking-tight leading-none block">
              {totalViews}
            </span>
            <span className="text-[9px] text-emerald-600 font-semibold mt-1 inline-block">
              +100% online
            </span>
          </div>
        </div>

        {/* Thẻ 2: Khách mời */}
        <div
          onClick={() => {
            setActiveTab("guests");
            setSubTab("list");
          }}
          className="bg-white rounded-2xl border border-stone-100 p-3 sm:p-4 shadow-3xs hover:shadow-xs transition-all relative overflow-hidden flex flex-col justify-between cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] sm:text-xs font-semibold text-stone-500 group-hover:text-[#1b365d] transition-colors">
              Khách mời
            </span>
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Users size={13} />
            </div>
          </div>
          <div>
            <span className="text-lg sm:text-2xl font-black text-stone-900 font-mono tracking-tight leading-none block">
              {totalGuests}
            </span>
            <span className="text-[9px] text-emerald-700 font-semibold mt-1 inline-block">
              {confirmedGuests} tham gia
            </span>
          </div>
        </div>

        {/* Thẻ 3: Lời chúc */}
        <div
          onClick={() => setActiveTab("guestbook")}
          className="bg-white rounded-2xl border border-stone-100 p-3 sm:p-4 shadow-3xs hover:shadow-xs transition-all relative overflow-hidden flex flex-col justify-between cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] sm:text-xs font-semibold text-stone-500 group-hover:text-rose-600 transition-colors">
              Lời chúc
            </span>
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-rose-50 text-rose-500 flex items-center justify-center">
              <MessageSquare size={13} />
            </div>
          </div>
          <div>
            <span className="text-lg sm:text-2xl font-black text-stone-900 font-mono tracking-tight leading-none block">
              {guestbookList?.length || 0}
            </span>
            <span className="text-[9px] text-rose-600 font-semibold mt-1 inline-block">
              Sổ lưu bút
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================
          3. THANH HÀNH ĐỘNG NHANH (QUICK ACTIONS)
      ======================================================== */}
      <div className="bg-white rounded-2xl border border-stone-100 p-3 sm:p-3.5 shadow-3xs">
        <div className="flex items-center justify-between gap-2">
          {/* Nút Copy Link */}
          <button
            type="button"
            onClick={handleCopyLink}
            className="flex-1 py-2 px-1.5 rounded-xl bg-stone-50 hover:bg-stone-100 border border-stone-200/60 text-stone-700 text-[10px] font-bold flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 cursor-pointer transition-all active:scale-95"
          >
            <Copy size={13} className="text-[#1b365d]" />
            <span>Sao chép link</span>
          </button>

          {/* Nút Thêm khách */}
          <button
            type="button"
            onClick={() => {
              setActiveTab("guests");
              setSubTab("list");
            }}
            className="flex-1 py-2 px-1.5 rounded-xl bg-stone-50 hover:bg-stone-100 border border-stone-200/60 text-stone-700 text-[10px] font-bold flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 cursor-pointer transition-all active:scale-95"
          >
            <UserPlus size={13} className="text-emerald-600" />
            <span>Thêm khách</span>
          </button>

          {/* Nút Sổ lưu bút */}
          <button
            type="button"
            onClick={() => setActiveTab("guestbook")}
            className="flex-1 py-2 px-1.5 rounded-xl bg-stone-50 hover:bg-stone-100 border border-stone-200/60 text-stone-700 text-[10px] font-bold flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 cursor-pointer transition-all active:scale-95"
          >
            <MessageSquare size={13} className="text-rose-500" />
            <span>Sổ lưu bút</span>
          </button>

          {/* Nút Mừng cưới QR */}
          <button
            type="button"
            onClick={() => setActiveTab("setting")}
            className="flex-1 py-2 px-1.5 rounded-xl bg-stone-50 hover:bg-stone-100 border border-stone-200/60 text-stone-700 text-[10px] font-bold flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 cursor-pointer transition-all active:scale-95"
          >
            <CreditCard size={13} className="text-amber-600" />
            <span>Cài đặt QR</span>
          </button>
        </div>
      </div>

      {/* ========================================================
          4. THẺ ĐẾM NGƯỢC HÔN LỄ (COUNTDOWN CARD)
      ======================================================== */}
      <div className="bg-white rounded-2xl border border-stone-100 p-4 shadow-3xs space-y-3">
        <div className="flex items-center justify-between border-b border-stone-50 pb-2.5">
          <div className="flex items-center gap-1.5">
            <Calendar size={14} className="text-[#1b365d]" />
            <h3 className="text-xs font-bold text-stone-800 tracking-tight">
              Đếm ngược ngày cưới
            </h3>
          </div>
          <span className="text-[10px] font-semibold text-stone-500 capitalize">
            {formattedWeddingDate}
          </span>
        </div>

        {/* 4 Hộp số đếm ngược */}
        <div className="grid grid-cols-4 gap-2 text-center">
          <div className="bg-stone-50/80 border border-stone-200/50 rounded-xl py-2 px-1 shadow-3xs">
            <span className="text-lg sm:text-xl font-black text-[#1b365d] font-mono leading-none block">
              {timeLeft.days}
            </span>
            <span className="text-[8px] font-bold text-stone-400 uppercase tracking-wide mt-0.5 block">
              Ngày
            </span>
          </div>

          <div className="bg-stone-50/80 border border-stone-200/50 rounded-xl py-2 px-1 shadow-3xs">
            <span className="text-lg sm:text-xl font-black text-[#1b365d] font-mono leading-none block">
              {String(timeLeft.hours).padStart(2, "0")}
            </span>
            <span className="text-[8px] font-bold text-stone-400 uppercase tracking-wide mt-0.5 block">
              Giờ
            </span>
          </div>

          <div className="bg-stone-50/80 border border-stone-200/50 rounded-xl py-2 px-1 shadow-3xs">
            <span className="text-lg sm:text-xl font-black text-[#1b365d] font-mono leading-none block">
              {String(timeLeft.minutes).padStart(2, "0")}
            </span>
            <span className="text-[8px] font-bold text-stone-400 uppercase tracking-wide mt-0.5 block">
              Phút
            </span>
          </div>

          <div className="bg-stone-50/80 border border-stone-200/50 rounded-xl py-2 px-1 shadow-3xs">
            <span className="text-lg sm:text-xl font-black text-rose-500 font-mono leading-none block">
              {String(timeLeft.seconds).padStart(2, "0")}
            </span>
            <span className="text-[8px] font-bold text-stone-400 uppercase tracking-wide mt-0.5 block">
              Giây
            </span>
          </div>
        </div>

        {/* Thông điệp lãng mạn */}
        <p className="text-[10px] text-center text-stone-400 font-medium pt-0.5">
          {timeLeft.days > 0 ? (
            <>
              Chỉ còn <span className="font-bold text-stone-700">{timeLeft.days} ngày</span> nữa là tới khoảnh khắc hạnh phúc nhất 💕
            </>
          ) : (
            "Chúc mừng ngày trọng đại của hai bạn! 🎉"
          )}
        </p>
      </div>

      {/* ========================================================
          5. BẢNG TIN HOẠT ĐỘNG GẦN ĐÂY (RSVP & LỜI CHÚC)
      ======================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
        {/* Cột 1: Phản hồi khách mời mới nhất */}
        <div className="bg-white rounded-2xl border border-stone-100 p-4 shadow-3xs flex flex-col justify-between min-h-[160px]">
          <div>
            <div className="flex items-center justify-between border-b border-stone-50 pb-2 mb-3">
              <div className="flex items-center gap-1.5">
                <Users size={13} className="text-[#1b365d]" />
                <h3 className="text-xs font-bold text-stone-800">
                  Phản hồi mới nhất
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("guests");
                  setSubTab("list");
                }}
                className="text-[10px] text-[#1b365d] font-bold hover:underline bg-transparent border-0 cursor-pointer flex items-center gap-0.5"
              >
                <span>Xem tất cả</span>
                <ChevronRight size={12} />
              </button>
            </div>

            {/* Nội dung khách mới nhất */}
            {(() => {
              const latestRsvp = guestList?.find(
                (g: any) =>
                  g.rsvpStatus === "confirmed" || g.rsvpStatus === "declined"
              );
              if (latestRsvp) {
                const isConfirmed = latestRsvp.rsvpStatus === "confirmed";
                return (
                  <div className="flex items-center gap-3 bg-stone-50/70 p-3 rounded-xl border border-stone-200/50">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-xs font-black font-mono ${
                        isConfirmed
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-rose-100 text-rose-700"
                      }`}
                    >
                      {latestRsvp.name?.charAt(0)?.toUpperCase() || "K"}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="text-xs font-bold text-stone-900 truncate">
                          {latestRsvp.name}
                        </h4>
                        <span
                          className={`text-[9px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                            isConfirmed
                              ? "bg-emerald-50 text-emerald-600"
                              : "bg-rose-50 text-rose-600"
                          }`}
                        >
                          {isConfirmed ? "Đồng ý tham dự" : "Không thể đến"}
                        </span>
                      </div>
                      <p className="text-[10px] text-stone-500 font-medium mt-0.5">
                        {latestRsvp.relationship || "Khách mời"} •{" "}
                        {latestRsvp.phone || "Chưa có SĐT"}
                      </p>
                    </div>
                  </div>
                );
              }
              return (
                <div className="flex flex-col items-center justify-center py-6 text-stone-400">
                  <Users size={20} className="opacity-30 mb-1" />
                  <p className="text-[10px] italic">Chưa có khách phản hồi</p>
                </div>
              );
            })()}
          </div>
        </div>

        {/* Cột 2: Lời chúc mới nhất */}
        <div className="bg-white rounded-2xl border border-stone-100 p-4 shadow-3xs flex flex-col justify-between min-h-[160px]">
          <div>
            <div className="flex items-center justify-between border-b border-stone-50 pb-2 mb-3">
              <div className="flex items-center gap-1.5">
                <MessageSquare size={13} className="text-rose-500" />
                <h3 className="text-xs font-bold text-stone-800">
                  Lời chúc mới nhất
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab("guestbook")}
                className="text-[10px] text-rose-600 font-bold hover:underline bg-transparent border-0 cursor-pointer flex items-center gap-0.5"
              >
                <span>Sổ lưu bút</span>
                <ChevronRight size={12} />
              </button>
            </div>

            {/* Nội dung lời chúc */}
            {guestbookList && guestbookList.length > 0 ? (
              <div className="bg-rose-50/40 p-3 rounded-xl border border-rose-100/60 space-y-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center text-[9px] font-bold shrink-0">
                    {guestbookList[0].name?.charAt(0)?.toUpperCase() || "W"}
                  </div>
                  <span className="text-xs font-bold text-stone-800 truncate">
                    {guestbookList[0].name}
                  </span>
                </div>
                <p className="text-[10.5px] text-stone-600 italic leading-relaxed line-clamp-2 pl-8">
                  "{guestbookList[0].message}"
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-6 text-stone-400">
                <MessageSquare size={20} className="opacity-30 mb-1" />
                <p className="text-[10px] italic">Chưa có lời chúc nào mới</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================
          6. BIỂU ĐỒ TRUY CẬP 7 NGÀY (DESKTOP & TABLET VIEW)
      ======================================================== */}
      <div className="hidden sm:block bg-white rounded-2xl border border-stone-100 p-5 shadow-3xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xs font-bold text-stone-800 tracking-tight flex items-center gap-1.5">
              <Eye size={14} className="text-[#1b365d]" />
              Thống kê lượt xem thiệp
            </h3>
            <p className="text-[10px] text-stone-400 font-medium">
              Biểu đồ tương tác trong 7 ngày gần nhất
            </p>
          </div>
          <span className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-stone-100 text-stone-600 font-mono">
            Tổng: {totalViews} lượt
          </span>
        </div>

        <div className="h-[180px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1b365d" stopOpacity={0.25} />
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
                tick={{ fontSize: 9, fill: "#a8a29e", fontFamily: "monospace" }}
                dy={5}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 9, fill: "#a8a29e", fontFamily: "monospace" }}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "10px",
                  border: "none",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  fontSize: "11px",
                  fontWeight: "bold",
                }}
                itemStyle={{ color: "#1b365d" }}
              />
              <Area
                type="monotone"
                dataKey="views"
                name="Lượt xem"
                stroke="#1b365d"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorViews)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ========================================================
          7. MODAL CHIA SẺ THIỆP CƯỚI (SHARE MODAL)
      ======================================================== */}
      {isShareModalOpen &&
        mounted &&
        typeof document !== "undefined" &&
        createPortal(
          <div className="fixed inset-0 z-[999] flex justify-center items-center p-4 bg-stone-900/60 backdrop-blur-xs animate-fade-in">
            <div
              className="fixed inset-0"
              onClick={() => setIsShareModalOpen(false)}
            />
            <div className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl relative z-10 border border-stone-100 animate-fade-in font-sans text-center">
              {/* Nút đóng */}
              <button
                type="button"
                onClick={() => setIsShareModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 text-stone-400 hover:bg-stone-100 rounded-full border-0 bg-transparent cursor-pointer"
              >
                <X size={18} />
              </button>

              <h3 className="text-sm font-bold text-stone-850 mb-1">
                Chia sẻ thiệp cưới
              </h3>
              <p className="text-[11px] text-stone-500 font-medium mb-4">
                Gửi liên kết thiệp cưới đến bạn bè &amp; người thân
              </p>

              {/* Link Box */}
              <div className="flex items-center bg-stone-50 border border-stone-200/80 rounded-xl p-2 mb-4">
                <span className="flex-1 text-[11px] font-mono font-medium text-stone-700 truncate px-1 text-left">
                  {origin}/w/{weddingSlug}
                </span>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="p-1.5 bg-white text-[#1b365d] hover:bg-slate-50 rounded-lg shadow-3xs border border-stone-200 cursor-pointer active:scale-95 transition-transform"
                  title="Sao chép liên kết"
                >
                  <Copy size={14} />
                </button>
              </div>

              {/* Các nút mạng xã hội */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                {/* Zalo */}
                <a
                  href={`https://zalo.me/share?url=${origin}/w/${weddingSlug}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center gap-1.5 p-2 rounded-2xl bg-stone-50 hover:bg-stone-100 transition-colors no-underline"
                >
                  <img
                    src={zaloIcon.src || zaloIcon}
                    alt="Zalo"
                    className="w-10 h-10 rounded-full object-cover shadow-3xs"
                  />
                  <span className="text-[10px] font-bold text-stone-700">
                    Zalo
                  </span>
                </a>

                {/* Facebook */}
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${origin}/w/${weddingSlug}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center gap-1.5 p-2 rounded-2xl bg-stone-50 hover:bg-stone-100 transition-colors no-underline"
                >
                  <img
                    src={fbIcon.src || fbIcon}
                    alt="Facebook"
                    className="w-10 h-10 rounded-full object-cover shadow-3xs"
                  />
                  <span className="text-[10px] font-bold text-stone-700">
                    Facebook
                  </span>
                </a>

                {/* Sao chép nhanh */}
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="flex flex-col items-center gap-1.5 p-2 rounded-2xl bg-stone-50 hover:bg-stone-100 transition-colors border-0 cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-full bg-[#1b365d] text-white flex items-center justify-center shadow-3xs">
                    <Copy size={16} />
                  </div>
                  <span className="text-[10px] font-bold text-stone-700">
                    Sao chép
                  </span>
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
