"use client";

import { ExternalLink, ArrowUp, ArrowDown, CheckCircle2, MessageSquare, Heart } from "lucide-react";
import dayjs from "dayjs";

export function DetailSidebar({ data }: { data: any }) {
  const { wedding, template, guestStats } = data;
  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* Xem trước thiệp cưới */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center">
        <div className="w-full flex justify-between items-center mb-4">
          <h3 className="font-semibold text-slate-800">Xem trước thiệp cưới</h3>
        </div>
        
        {/* Mockup Mobile */}
        <div className="relative w-[240px] h-[480px] bg-slate-900 rounded-[36px] border-[6px] border-slate-900 shadow-xl overflow-hidden shrink-0 mb-4">
          <div className="absolute top-0 inset-x-0 h-6 bg-slate-900 z-10 rounded-b-2xl mx-16"></div>
          <img src={template?.thumbnail || "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=400&q=80"} alt="Preview" className="w-full h-full object-cover" />
          
          <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center">
            <p className="text-[10px] tracking-widest text-slate-600 mb-2 uppercase">The Wedding of</p>
            <h4 className="font-serif text-3xl text-slate-800 mb-1">{wedding?.groomName || 'Chú rể'}</h4>
            <p className="font-serif text-xl text-slate-600 mb-1">&</p>
            <h4 className="font-serif text-3xl text-slate-800 mb-4">{wedding?.brideName || 'Cô dâu'}</h4>
            <p className="text-sm font-medium text-slate-800 tracking-wider">{wedding?.weddingDate ? dayjs(wedding?.weddingDate).format('DD . MM . YYYY') : 'Chưa định ngày'}</p>
            
            <div className="mt-8">
              <p className="text-[8px] uppercase tracking-wider text-slate-500 mb-2">Còn lại đến ngày cưới</p>
              <div className="flex gap-2">
                <div className="bg-white/80 p-2 rounded text-center min-w-[36px] shadow-sm"><p className="font-bold text-slate-800">24</p><p className="text-[8px] text-slate-500">NGÀY</p></div>
                <div className="bg-white/80 p-2 rounded text-center min-w-[36px] shadow-sm"><p className="font-bold text-slate-800">08</p><p className="text-[8px] text-slate-500">GIỜ</p></div>
                <div className="bg-white/80 p-2 rounded text-center min-w-[36px] shadow-sm"><p className="font-bold text-slate-800">35</p><p className="text-[8px] text-slate-500">PHÚT</p></div>
                <div className="bg-white/80 p-2 rounded text-center min-w-[36px] shadow-sm"><p className="font-bold text-slate-800">12</p><p className="text-[8px] text-slate-500">GIÂY</p></div>
              </div>
            </div>
          </div>
        </div>

        <button className="w-full py-2.5 bg-pink-50 text-pink-600 hover:bg-pink-100 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
          Mở trang xem trước <ExternalLink size={14} />
        </button>
      </div>

      {/* Thống kê tổng quan */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-slate-800">Thống kê tổng quan</h3>
          <select className="text-xs border border-slate-200 rounded p-1 text-slate-600 outline-none">
            <option>7 ngày qua</option>
            <option>30 ngày qua</option>
            <option>Tất cả</option>
          </select>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 border border-slate-100 rounded-lg bg-slate-50/50">
            <p className="text-xs text-slate-500 mb-1">Lượt xem</p>
            <p className="text-xl font-bold text-slate-800 mb-1">0</p>
            <p className="text-[10px] font-medium text-slate-400 flex items-center"><ArrowUp size={10} className="mr-0.5" /> 0%</p>
          </div>
          <div className="p-3 border border-slate-100 rounded-lg bg-slate-50/50">
            <p className="text-xs text-slate-500 mb-1">Khách mời</p>
            <p className="text-xl font-bold text-slate-800 mb-1">{guestStats?.total || 0}</p>
            <p className="text-[10px] font-medium text-slate-400 flex items-center"><ArrowUp size={10} className="mr-0.5" /> 0%</p>
          </div>
          <div className="p-3 border border-slate-100 rounded-lg bg-slate-50/50">
            <p className="text-xs text-slate-500 mb-1">Xác nhận tham dự</p>
            <p className="text-xl font-bold text-slate-800 mb-1">{guestStats?.attending || 0}</p>
            <p className="text-[10px] font-medium text-slate-400 flex items-center"><ArrowUp size={10} className="mr-0.5" /> 0%</p>
          </div>
          <div className="p-3 border border-slate-100 rounded-lg bg-slate-50/50">
            <p className="text-xs text-slate-500 mb-1">Từ chối tham dự</p>
            <p className="text-xl font-bold text-slate-800 mb-1">{guestStats?.declined || 0}</p>
            <p className="text-[10px] font-medium text-slate-400 flex items-center"><ArrowUp size={10} className="mr-0.5" /> 0%</p>
          </div>
          <div className="p-3 border border-slate-100 rounded-lg bg-slate-50/50">
            <p className="text-xs text-slate-500 mb-1">Lượt mở thiệp</p>
            <p className="text-xl font-bold text-slate-800 mb-1">0</p>
            <p className="text-[10px] font-medium text-slate-400 flex items-center"><ArrowUp size={10} className="mr-0.5" /> 0%</p>
          </div>
          <div className="p-3 border border-slate-100 rounded-lg bg-slate-50/50">
            <p className="text-xs text-slate-500 mb-1">Lượt click bản đồ</p>
            <p className="text-xl font-bold text-slate-800 mb-1">0</p>
            <p className="text-[10px] font-medium text-slate-400 flex items-center"><ArrowUp size={10} className="mr-0.5" /> 0%</p>
          </div>
        </div>
      </div>

      {/* Hoạt động gần đây */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="font-semibold text-slate-800 mb-4">Hoạt động gần đây</h3>
        <div className="space-y-4">
          <div className="flex gap-3">
            <div className="mt-0.5 shrink-0 w-6 h-6 rounded-full bg-green-50 flex items-center justify-center">
              <CheckCircle2 size={12} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm text-slate-800"><span className="font-medium">Nguyễn Văn A</span> xác nhận tham dự</p>
              <p className="text-xs text-slate-400 mt-0.5">25/06/2025 16:45</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="mt-0.5 shrink-0 w-6 h-6 rounded-full bg-pink-50 flex items-center justify-center">
              <Heart size={12} className="text-pink-500" />
            </div>
            <div>
              <p className="text-sm text-slate-800"><span className="font-medium">Trần Thị B</span> gửi lời chúc</p>
              <p className="text-xs text-slate-400 mt-0.5">25/06/2025 15:30</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="mt-0.5 shrink-0 w-6 h-6 rounded-full bg-indigo-50 flex items-center justify-center">
              <ExternalLink size={12} className="text-indigo-600" />
            </div>
            <div>
              <p className="text-sm text-slate-800"><span className="font-medium">Lê Văn C</span> mở thiệp</p>
              <p className="text-xs text-slate-400 mt-0.5">25/06/2025 14:20</p>
            </div>
          </div>
        </div>
        <button className="w-full mt-4 py-2 text-xs font-medium text-pink-600 hover:text-pink-700 transition-colors">
          Xem tất cả hoạt động &rarr;
        </button>
      </div>

    </div>
  );
}
