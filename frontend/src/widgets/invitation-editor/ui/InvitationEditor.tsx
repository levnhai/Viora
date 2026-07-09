"use client";

import { useInvitationCreate } from "@/views/admin-invitation-create/model/InvitationCreateProvider";
import { Accordion } from "@/shared/ui/Accordion";
import { Upload, Calendar, Clock, MapPin, Map, AlignLeft, Bold, Italic, Underline, Link as LinkIcon, Image as ImageIcon } from "lucide-react";

export function InvitationEditor() {
  const { basicInfo, setBasicInfo, story, setStory } = useInvitationCreate();

  const handleBasicInfoChange = (field: keyof typeof basicInfo, value: string) => {
    setBasicInfo({ ...basicInfo, [field]: value });
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-full overflow-hidden">
      <div className="p-4 border-b border-slate-200 shrink-0">
        <h3 className="font-semibold text-slate-800">Chỉnh sửa thông tin</h3>
      </div>

      <div className="p-4 overflow-y-auto flex-1 custom-scrollbar space-y-4">
        
        {/* Basic Info */}
        <Accordion title="Thông tin cơ bản" defaultOpen>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Tên chú rể <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={basicInfo.groomName}
                onChange={(e) => handleBasicInfoChange("groomName", e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Tên cô dâu <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={basicInfo.brideName}
                onChange={(e) => handleBasicInfoChange("brideName", e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Ngày cưới <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={basicInfo.weddingDate}
                    onChange={(e) => handleBasicInfoChange("weddingDate", e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Giờ cưới <span className="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  value={basicInfo.weddingTime}
                  onChange={(e) => handleBasicInfoChange("weddingTime", e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Địa điểm <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={basicInfo.locationName}
                  onChange={(e) => handleBasicInfoChange("locationName", e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Địa chỉ <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={basicInfo.address}
                  onChange={(e) => handleBasicInfoChange("address", e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Link Google Maps
              </label>
              <input
                type="text"
                value={basicInfo.mapLink}
                onChange={(e) => handleBasicInfoChange("mapLink", e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </div>
        </Accordion>

        {/* Images */}
        <Accordion title="Hình ảnh" defaultOpen>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-2">
                Ảnh chú rể
              </label>
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden shrink-0">
                  <img src="https://i.pravatar.cc/150?img=11" alt="Groom" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <button className="flex flex-col items-center justify-center w-full h-16 border-2 border-dashed border-slate-200 rounded-lg hover:border-indigo-400 hover:bg-indigo-50 transition-colors cursor-pointer group">
                    <Upload size={14} className="text-slate-400 group-hover:text-indigo-500 mb-1" />
                    <span className="text-[10px] text-slate-500 group-hover:text-indigo-600">Thay ảnh</span>
                  </button>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-2">
                Ảnh cô dâu
              </label>
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden shrink-0">
                  <img src="https://i.pravatar.cc/150?img=5" alt="Bride" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <button className="flex flex-col items-center justify-center w-full h-16 border-2 border-dashed border-slate-200 rounded-lg hover:border-indigo-400 hover:bg-indigo-50 transition-colors cursor-pointer group">
                    <Upload size={14} className="text-slate-400 group-hover:text-indigo-500 mb-1" />
                    <span className="text-[10px] text-slate-500 group-hover:text-indigo-600">Thay ảnh</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Accordion>

        {/* Story */}
        <Accordion title="Lời ngỏ / Story" defaultOpen>
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            {/* Fake Toolbar */}
            <div className="flex items-center gap-1 border-b border-slate-200 p-1 bg-slate-50">
              <select className="text-xs bg-transparent border-none outline-none font-medium px-2 py-1 text-slate-700">
                <option>Paragraph</option>
                <option>Heading 1</option>
                <option>Heading 2</option>
              </select>
              <div className="w-px h-4 bg-slate-300 mx-1" />
              <button className="p-1.5 hover:bg-slate-200 rounded text-slate-600"><Bold size={14} /></button>
              <button className="p-1.5 hover:bg-slate-200 rounded text-slate-600"><Italic size={14} /></button>
              <button className="p-1.5 hover:bg-slate-200 rounded text-slate-600"><Underline size={14} /></button>
              <div className="w-px h-4 bg-slate-300 mx-1" />
              <button className="p-1.5 hover:bg-slate-200 rounded text-slate-600"><AlignLeft size={14} /></button>
              <div className="w-px h-4 bg-slate-300 mx-1" />
              <button className="p-1.5 hover:bg-slate-200 rounded text-slate-600"><LinkIcon size={14} /></button>
              <button className="p-1.5 hover:bg-slate-200 rounded text-slate-600"><ImageIcon size={14} /></button>
            </div>
            <textarea
              value={story}
              onChange={(e) => setStory(e.target.value)}
              rows={4}
              className="w-full p-3 text-sm outline-none resize-none"
              placeholder="Nhập lời ngỏ..."
            />
          </div>
        </Accordion>

        {/* Other Sections (Collapsed) */}
        <Accordion title="Thông tin sự kiện" />
        <Accordion title="Timeline" />
        <Accordion title="Quà mừng" />
        <Accordion title="Thiết lập khác" />

      </div>

      <div className="p-4 border-t border-slate-100 shrink-0">
        <button className="w-full py-2.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-sm shadow-indigo-600/20">
          Lưu và xem trước
        </button>
      </div>
    </div>
  );
}
