"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Heart,
  ChevronDown,
  Users,
  CalendarCheck,
  MessageSquare,
  Image as ImageIcon,
  Video,
  Gift,
  Clock,
  FileText,
  Shield,
  Settings,
  Database,
  ShoppingCart,
  CreditCard,
  BarChart2,
} from "lucide-react";

export function AdminSidebar() {
  const [isWeddingMenuOpen, setIsWeddingMenuOpen] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={`bg-[#1e1e2d] text-slate-300 flex flex-col h-screen sticky top-0 shrink-0 overflow-y-auto overflow-x-hidden hidden md:flex custom-scrollbar transition-all duration-300 ${isCollapsed ? "w-[80px]" : "w-[260px]"}`}
    >
      {/* Logo */}
      <div
        className={`h-16 flex items-center ${isCollapsed ? "justify-center" : "gap-3 px-6"} border-b border-white/5 shrink-0 transition-all duration-300`}
      >
        <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 shrink-0">
          <Heart size={16} className="text-white" fill="currentColor" />
        </div>
        {!isCollapsed && (
          <div className="overflow-hidden whitespace-nowrap transition-all duration-300">
            <h1 className="text-sm font-bold text-white tracking-wide">
              Wedding Admin
            </h1>
            <p className="text-[10px] text-slate-400">Quản trị hệ thống</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav
        className={`flex-1 py-6 space-y-6 ${isCollapsed ? "px-2" : "px-4"} transition-all duration-300`}
      >
        <div>
          <Link
            href="/admin"
            className={`flex items-center gap-3 px-3 py-2.5 bg-indigo-500 text-white rounded-lg text-sm font-medium shadow-md shadow-indigo-500/20 transition-colors ${isCollapsed ? "justify-center" : ""}`}
            title="Tổng quan"
          >
            <LayoutDashboard size={18} className="shrink-0" />{" "}
            {!isCollapsed && (
              <span className="whitespace-nowrap">Tổng quan</span>
            )}
          </Link>
        </div>

        <div>
          {!isCollapsed && (
            <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 whitespace-nowrap">
              Quản lý thiệp cưới
            </p>
          )}
          <div className="space-y-1">
            <button
              onClick={() => {
                if (isCollapsed) setIsCollapsed(false);
                setIsWeddingMenuOpen(!isWeddingMenuOpen);
              }}
              className={`w-full flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${
                isCollapsed ? "justify-center" : "justify-between"
              } ${
                isWeddingMenuOpen && !isCollapsed
                  ? "bg-white/10 text-white"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
              title="Thiệp cưới"
            >
              <span className="flex items-center gap-3">
                <Heart size={18} className="shrink-0" />{" "}
                {!isCollapsed && (
                  <span className="whitespace-nowrap">Thiệp cưới</span>
                )}
              </span>
              {!isCollapsed && (
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 shrink-0 ${
                    isWeddingMenuOpen ? "rotate-180 opacity-100" : "opacity-50"
                  }`}
                />
              )}
            </button>

            {!isCollapsed && (
              <div
                className={`space-y-1 overflow-hidden transition-all duration-200 ${
                  isWeddingMenuOpen
                    ? "max-h-40 opacity-100 mt-1"
                    : "max-h-0 opacity-0"
                }`}
              >
                <Link
                  href="#"
                  className="flex items-center gap-3 px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  <div className="w-4" /> Danh sách thiệp
                </Link>
                <Link
                  href="/admin/invitations/create"
                  className="flex items-center gap-3 px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  <div className="w-4" /> Tạo thiệp mới
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-3 px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  <div className="w-4" /> Template
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* <div>
          <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
            Quản lý khách mời
          </p>
          <div className="space-y-1">
            <a
              href="#"
              className="flex items-center justify-between px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-3">
                <Users size={18} /> Khách mời
              </div>
              <ChevronDown size={14} className="opacity-50" />
            </a>
            <a
              href="#"
              className="flex items-center justify-between px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-3">
                <CalendarCheck size={18} /> RSVP (Xác nhận)
              </div>
              <ChevronDown size={14} className="opacity-50" />
            </a>
            <a
              href="#"
              className="flex items-center justify-between px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-3">
                <MessageSquare size={18} /> Lời chúc
              </div>
              <ChevronDown size={14} className="opacity-50" />
            </a>
          </div>
        </div> */}

        {/* <div>
          <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
            Nội dung & tiện ích
          </p>
          <div className="space-y-1">
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              <ImageIcon size={18} /> Album ảnh
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              <Video size={18} /> Video
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              <Gift size={18} /> Quà mừng
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              <Clock size={18} /> Timeline
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              <FileText size={18} /> Trang thông tin
            </a>
          </div>
        </div> */}

        {/* <div>
          <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
            Quản trị hệ thống
          </p>
          <div className="space-y-1">
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              <Users size={18} /> Người dùng
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              <Shield size={18} /> Vai trò & Phân quyền
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              <Settings size={18} /> Cài đặt hệ thống
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              <FileText size={18} /> Nhật ký hoạt động
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              <Database size={18} /> Sao lưu dữ liệu
            </a>
          </div>
        </div> */}

        {/* <div>
          <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
            Thanh toán
          </p>
          <div className="space-y-1">
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              <Heart size={18} /> Gói dịch vụ
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              <ShoppingCart size={18} /> Đơn hàng
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              <CreditCard size={18} /> Thanh toán
            </a>
          </div>
        </div> */}

        {/* <div>
          <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
            Báo cáo & Thống kê
          </p>
          <div className="space-y-1">
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              <BarChart2 size={18} /> Thống kê
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              <FileText size={18} /> Báo cáo
            </a>
          </div>
        </div> */}
      </nav>

      {/* Bottom Toggle */}
      <div className="p-4 mt-auto">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`w-full flex items-center px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors ${isCollapsed ? "justify-center" : "gap-3"}`}
          title={isCollapsed ? "Mở rộng menu" : "Thu gọn menu"}
        >
          <span className="w-8 flex items-center justify-center shrink-0">
            <Settings
              size={18}
              className={`transition-transform duration-300 ${isCollapsed ? "rotate-180" : ""}`}
            />
          </span>
          {!isCollapsed && (
            <span className="whitespace-nowrap">Thu gọn menu</span>
          )}
        </button>
      </div>
    </aside>
  );
}
