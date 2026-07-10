"use client";

import { ArrowLeft, Edit3, Globe, Copy, Share2, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import dayjs from "dayjs";

export function DetailHeader({ data }: { data: any }) {
  const { wedding } = data;
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div className="flex flex-col gap-3">
        <Link 
          href="/admin/invitations" 
          className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors w-fit border border-slate-200 bg-white px-3 py-1.5 rounded-lg shadow-sm"
        >
          <ArrowLeft size={16} />
          Quay lại danh sách
        </Link>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">{wedding?.name || 'Chưa đặt tên'}</h1>
          <span className={`px-2.5 py-1 text-xs font-medium rounded-full border flex items-center gap-1.5 ${
            wedding?.status === 'published' ? 'bg-green-50 text-green-600 border-green-100' : 
            wedding?.status === 'draft' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-slate-50 text-slate-600 border-slate-200'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${
              wedding?.status === 'published' ? 'bg-green-500' : 
              wedding?.status === 'draft' ? 'bg-amber-500' : 'bg-slate-500'
            }`}></span>
            {wedding?.status === 'published' ? 'Đã xuất bản' : wedding?.status === 'draft' ? 'Bản nháp' : 'Tạm ẩn'}
          </span>
        </div>
        <div className="flex items-center gap-4 text-sm text-slate-500">
          <p>Tạo lúc: {dayjs(wedding?.createdAt).format('DD/MM/YYYY HH:mm')}</p>
          <span className="w-1 h-1 rounded-full bg-slate-300"></span>
          <p>Cập nhật: {dayjs(wedding?.updatedAt).format('DD/MM/YYYY HH:mm')} bởi {wedding?.createdBy}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 rounded-lg text-sm font-medium transition-colors shadow-sm">
          <Edit3 size={16} />
          Chỉnh sửa
        </button>
        <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 rounded-lg text-sm font-medium transition-colors shadow-sm">
          <Globe size={16} />
          Xem website
        </button>
        <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 rounded-lg text-sm font-medium transition-colors shadow-sm">
          <Copy size={16} />
          Nhân bản
        </button>
        <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 rounded-lg text-sm font-medium transition-colors shadow-sm">
          <Share2 size={16} />
          Chia sẻ
        </button>
        <button className="flex items-center justify-center w-9 h-9 border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 rounded-lg transition-colors shadow-sm">
          <MoreHorizontal size={16} />
        </button>
      </div>
    </div>
  );
}
