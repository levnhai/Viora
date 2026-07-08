"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  X,
  Edit3,
  Smartphone,
  Heart,
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { TemplateConfig } from "../model/schema";
import { TEMPLATES } from "../model/templates";

interface PreviewModalProps {
  tpl: TemplateConfig;
  onClose: () => void;
  onRequestDesign: () => void;
  onSelectTemplate?: (tpl: TemplateConfig) => void;
}

// Helper to get custom descriptive text for each template
const getDetailedDesc = (tpl: TemplateConfig) => {
  switch (tpl.id) {
    case 1:
      return "Màu hồng pastel ngọt ngào, viền vàng kim sang trọng kiểu Pháp";
    case 2:
      return "Lá khuynh diệp thanh mát, tối giản phong cách Botanical gần gũi thiên nhiên";
    case 3:
      return "Chữ lồng cổ điển, họa tiết hoàng gia Baroque quý phái trang nhã";
    case 4:
      return "Khung ảnh đôi hiện đại, kiểu chữ phóng khoáng, trẻ trung";
    case 5:
      return "Họa tiết hoa lavender thơ mộng, mang lại sự lãng mạn nhẹ nhàng";
    case 6:
      return "Nền tối huyền bí, chữ ép kim nhũ vàng phong cách luxury đẳng cấp";
    default:
      return `Mẫu thiết kế phong cách ${tpl.style.toLowerCase()} tinh tế với tông màu đặc trưng.`;
  }
};

// Helper to get custom tags for each template
const getTemplateTags = (tpl: TemplateConfig) => {
  switch (tpl.id) {
    case 1:
      return ["Lãng mạn", "Hoa Lá"];
    case 2:
      return ["Tinh giản", "Màu Xanh"];
    case 3:
      return ["Cổ điển", "Sang trọng"];
    case 4:
      return ["Hiện đại", "Khung Ảnh"];
    case 5:
      return ["Thơ mộng", "Tím Nhẹ"];
    case 6:
      return ["Đẳng cấp", "Nền Tối"];
    default:
      return [tpl.style, "Thiệp cưới"];
  }
};

export function PreviewModal({
  tpl,
  onClose,
  onRequestDesign,
  onSelectTemplate,
}: PreviewModalProps) {
  const router = useRouter();

  const handlePreviewDemo = () => {
    onClose();
    router.push(`/wedding-demo?templateId=${tpl.code}`);
  };

  const similarTpls = TEMPLATES.filter((t) => t.id !== tpl.id).slice(0, 6);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-[#121110] border border-stone-850 rounded-[2.2rem] overflow-y-auto shadow-2xl w-full max-w-[420px] max-h-[92vh] flex flex-col p-6 text-white select-none text-left transition-all duration-300 scrollbar-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Navigation Bar */}
        <div className="flex items-center justify-between mb-5 shrink-0">
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-stone-900/50 hover:bg-stone-800 border border-stone-850 flex items-center justify-center text-stone-300 hover:text-white transition-colors cursor-pointer"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="text-[11px] font-bold text-stone-400 tracking-wider uppercase font-sans">
            Chi tiết mẫu thiệp
          </span>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-stone-900/50 hover:bg-stone-800 border border-stone-850 flex items-center justify-center text-stone-300 hover:text-white transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tiêu đề & Mô tả */}
        <div className="space-y-1.5 mb-4 shrink-0">
          <div className="flex items-center">
            <h2 className="text-xl font-extrabold tracking-tight text-white font-sans">
              {tpl.name}
            </h2>
            <span className="ml-2.5 px-2.5 py-0.5 rounded-full bg-[#ff007f]/10 border border-[#ff007f]/20 text-[#ff007f] text-[9px] font-bold tracking-wider uppercase">
              {tpl.popular ? "Đẹp nhất" : "Mới nhất"}
            </span>
          </div>
          <p className="text-xs text-stone-400 font-sans leading-relaxed">
            {getDetailedDesc(tpl)}
          </p>
          {/* Hàng Tags */}
          <div className="flex gap-2 pt-1">
            {getTemplateTags(tpl).map((tag, idx) => (
              <span
                key={idx}
                className="px-2.5 py-0.5 rounded-full bg-stone-900 text-stone-400 text-[10px] font-semibold font-sans border border-stone-850"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Live Wedding Preview (No Phone Mockup) */}
        <div className="relative w-full aspect-[9/16.5] rounded-3xl overflow-hidden shadow-2xl border border-stone-850 bg-[#121110] shrink-0 my-4">
          <iframe
            src={`/wedding-demo?embed=true&templateId=${tpl.code}`}
            className="w-full h-full border-0"
            title="Wedding Invitation Demo"
          />
        </div>

        {/* 3 Tính Năng Nằm Ngang */}
        <div className="grid grid-cols-3 gap-1.5 py-3.5 border-y border-stone-850/80 my-2 text-[9px] font-sans shrink-0">
          <div className="flex items-center gap-1.5 pr-1 border-r border-stone-850/80">
            <Edit3 size={14} className="text-stone-300 shrink-0" />
            <div className="flex flex-col min-w-0">
              <span className="font-bold text-stone-200 leading-tight">Tùy chỉnh dễ dàng</span>
              <span className="text-[7.5px] text-stone-500 leading-tight mt-0.5">Chỉ thay đổi nội dung</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-1 border-r border-stone-850/80">
            <Smartphone size={14} className="text-stone-300 shrink-0" />
            <div className="flex flex-col min-w-0">
              <span className="font-bold text-stone-200 leading-tight">Hiển thị đẹp mắt</span>
              <span className="text-[7.5px] text-stone-500 leading-tight mt-0.5">Tối ưu mọi thiết bị</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 pl-1">
            <Heart size={14} className="text-stone-300 shrink-0" />
            <div className="flex flex-col min-w-0">
              <span className="font-bold text-stone-200 leading-tight">Phù hợp mọi gu</span>
              <span className="text-[7.5px] text-stone-500 leading-tight mt-0.5">Truyền thống & hiện đại</span>
            </div>
          </div>
        </div>

        {/* Nút hành động */}
        <div className="flex gap-3 mt-3 mb-6 shrink-0">
          <button
            onClick={() => {
              onClose();
              onRequestDesign();
            }}
            className="flex-1 py-3 px-6 rounded-2xl bg-[#ff007f] hover:bg-[#e60072] active:scale-95 text-white font-bold text-xs tracking-wider transition-all flex items-center justify-center gap-1 cursor-pointer border-0 shadow-lg shadow-pink-900/10"
          >
            <span>+</span> Tạo thiệp này
          </button>
          <button
            onClick={handlePreviewDemo}
            className="flex-1 py-3 px-6 rounded-2xl border border-stone-800 bg-transparent hover:bg-stone-850 active:scale-95 text-stone-300 hover:text-white font-bold text-xs tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Eye size={14} /> Xem demo
          </button>
        </div>

        {/* Các mẫu tương tự */}
        <div className="space-y-3 pt-3 border-t border-stone-850/80 shrink-0">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-stone-200 font-sans">Các mẫu tương tự</h3>
            <button
              onClick={onClose}
              className="text-[10px] text-stone-400 hover:text-white font-medium border-0 bg-transparent cursor-pointer flex items-center gap-0.5"
            >
              Xem tất cả <ChevronRight size={10} />
            </button>
          </div>

          {/* Danh sách trượt ngang */}
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none scroll-smooth">
            {similarTpls.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  if (onSelectTemplate) {
                    onSelectTemplate(item);
                  }
                }}
                className="w-[72px] flex-shrink-0 cursor-pointer text-center group"
              >
                <div className="w-[72px] h-[98px] rounded-xl overflow-hidden border border-stone-850 relative shadow-md group-hover:border-stone-600 transition-colors bg-stone-900">
                  <img
                    src={item.preview}
                    alt={item.name}
                    className="w-full h-full object-cover select-none pointer-events-none group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <span className="block text-[9px] text-stone-400 mt-1 truncate max-w-full font-sans group-hover:text-white transition-colors">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
