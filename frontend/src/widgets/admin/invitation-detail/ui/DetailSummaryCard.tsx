"use client";

import { MapPin, CalendarDays, Clock, User, Copy, QrCode, Download, Printer } from "lucide-react";
import dayjs from "dayjs";

export function DetailSummaryCard({ data }: { data: any }) {
  const { wedding, template, guestStats } = data;
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-6 flex flex-col md:flex-row gap-8">
      
      {/* Left part: Image and Basic Info */}
      <div className="flex flex-col sm:flex-row gap-6 flex-1">
        <div className="w-full sm:w-48 shrink-0 relative rounded-lg overflow-hidden border border-slate-200 shadow-sm aspect-[3/4]">
          <img src={template?.thumbnail || "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=400&q=80"} alt="Cover" className="w-full h-full object-cover" />
        </div>
        
        <div className="flex-1 space-y-5">
          <div>
            <p className="text-xs font-medium text-slate-500 mb-1">Cô dâu & Chú rể</p>
            <p className="flex items-center gap-2 text-slate-800 font-medium"><User size={16} className="text-slate-400" /> {wedding?.groomName} & {wedding?.brideName}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-medium text-slate-500 mb-1">Ngày cưới</p>
              <p className="flex items-center gap-2 text-slate-800 font-medium"><CalendarDays size={16} className="text-slate-400" /> {wedding?.weddingDate ? dayjs(wedding?.weddingDate).format('DD/MM/YYYY') : 'Chưa thiết lập'}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 mb-1">Giờ cưới</p>
              <p className="flex items-center gap-2 text-slate-800 font-medium"><Clock size={16} className="text-slate-400" /> {wedding?.weddingDate ? dayjs(wedding?.weddingDate).format('HH:mm') : 'Chưa thiết lập'}</p>
            </div>
          </div>
          
          <div>
            <p className="text-xs font-medium text-slate-500 mb-1">Địa điểm</p>
            <div className="flex gap-2">
              <MapPin size={16} className="text-slate-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-slate-800 font-medium">{wedding?.location?.name || 'Chưa thiết lập'}</p>
                <p className="text-sm text-slate-500">{wedding?.location?.address || ''}</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div>
              <p className="text-xs font-medium text-slate-500 mb-1">Thiệp đã gửi</p>
              <p className="text-slate-800 font-medium flex items-center gap-1.5"><span className="w-4 h-4 bg-indigo-50 text-indigo-600 rounded flex items-center justify-center text-[10px]">&uarr;</span> {guestStats?.sent || 0} khách</p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 mb-1">Thiệp chưa gửi</p>
              <p className="text-slate-800 font-medium flex items-center gap-1.5"><span className="w-4 h-4 bg-pink-50 text-pink-600 rounded flex items-center justify-center text-[10px]">&uarr;</span> {guestStats?.unsent || 0} khách</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
            <div>
              <p className="text-xs font-medium text-slate-500 mb-2">Danh mục template</p>
              <span className="px-2.5 py-1 text-xs font-medium bg-green-50 text-green-600 rounded-md border border-green-100">{template?.category?.toUpperCase() || 'KHÔNG RÕ'}</span>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 mb-2">Template sử dụng</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-800">{template?.name || 'Giao diện tùy chỉnh'}</span>
                <button className="text-xs px-2 py-1 border border-slate-200 rounded text-slate-600 hover:bg-slate-50 transition-colors">Xem template</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right part: Link, QR, Status */}
      <div className="w-full md:w-72 shrink-0 flex flex-col gap-5 md:pl-8 md:border-l md:border-slate-100">
        <div>
          <p className="text-xs font-medium text-slate-500 mb-2">Link thiệp cưới</p>
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg p-1.5 pr-2">
            <input type="text" readOnly value={`https://viora.vn/${wedding?.slug}`} className="bg-transparent text-sm text-slate-700 w-full outline-none px-2" />
            <button className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-white rounded border border-transparent hover:border-slate-200 shadow-sm transition-all" title="Copy">
              <Copy size={14} />
            </button>
          </div>
        </div>

        <div>
          <p className="text-xs font-medium text-slate-500 mb-2">Mã QR</p>
          <div className="flex gap-4">
            <div className="w-24 h-24 bg-white border border-slate-200 rounded-lg p-1 shadow-sm flex items-center justify-center">
              <QrCode className="w-full h-full text-slate-800" strokeWidth={1} />
            </div>
            <div className="flex flex-col gap-2 flex-1 justify-center">
              <button className="flex items-center justify-center gap-2 w-full py-2 bg-pink-50 text-pink-600 hover:bg-pink-100 rounded-lg text-sm font-medium transition-colors">
                <Download size={14} /> Tải xuống
              </button>
              <button className="flex items-center justify-center gap-2 w-full py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg text-sm font-medium transition-colors">
                <Printer size={14} /> In mã QR
              </button>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 mt-1 space-y-4">
          <div>
            <p className="text-xs font-medium text-slate-500 mb-1.5">Trạng thái</p>
            <span className={`px-2.5 py-1 text-xs font-medium rounded-full border flex items-center gap-1.5 w-fit ${
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
          <div>
            <p className="text-xs font-medium text-slate-500 mb-1">Thời gian cập nhật cuối</p>
            <p className="text-sm text-slate-800 font-medium">{dayjs(wedding?.updatedAt).format('DD/MM/YYYY HH:mm')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
