"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Bell, Heart, Inbox, MessageSquare, CheckCircle2, ChevronRight } from "lucide-react";

export function AdminNotificationMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const notifications = [
    {
      id: "1",
      type: "request",
      title: "Yêu cầu tạo thiệp mới",
      desc: "Khách hàng Nguyễn Văn A vừa gửi đăng ký mẫu Elegant Pink",
      time: "5 phút trước",
      isUnread: true,
      href: "/admin/template-requests",
      icon: Inbox,
      iconColor: "text-amber-500 bg-amber-50 dark:bg-amber-950/40",
    },
    {
      id: "2",
      type: "rsvp",
      title: "Khách xác nhận tham dự",
      desc: "Lê Thị B vừa xác nhận tham dự đám cưới Hải & Linh (2 người)",
      time: "25 phút trước",
      isUnread: true,
      href: "/admin/invitations",
      icon: Heart,
      iconColor: "text-rose-500 bg-rose-50 dark:bg-rose-950/40",
    },
    {
      id: "3",
      type: "wish",
      title: "Lời chúc mới trên sổ lưu bút",
      desc: "Trần Minh: 'Chúc hai bạn trăm năm hạnh phúc, đầu bạc răng long!'",
      time: "1 giờ trước",
      isUnread: true,
      href: "/admin/invitations",
      icon: MessageSquare,
      iconColor: "text-indigo-500 bg-indigo-50 dark:bg-indigo-950/40",
    },
  ];

  const handleMarkAllAsRead = () => {
    setUnreadCount(0);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        title="Thông báo hệ thống"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-sm ring-2 ring-white dark:ring-slate-900 animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200/80 dark:border-slate-800 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex items-center justify-between px-3 py-2.5 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-800 dark:text-slate-100">
                Thông báo
              </span>
              {unreadCount > 0 && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400">
                  {unreadCount} mới
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 font-medium"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Đã đọc tất cả
              </button>
            )}
          </div>

          <div className="max-h-[340px] overflow-y-auto py-1 divide-y divide-slate-50 dark:divide-slate-800/60">
            {notifications.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors group"
                >
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${item.iconColor}`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {item.title}
                      </p>
                      <span className="text-[10px] text-slate-400 whitespace-nowrap ml-1">
                        {item.time}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="p-2 border-t border-slate-100 dark:border-slate-800 text-center">
            <Link
              href="/admin/template-requests"
              onClick={() => setIsOpen(false)}
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 inline-flex items-center gap-1 py-1"
            >
              Xem tất cả yêu cầu khách hàng
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
