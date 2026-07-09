"use client";

import { useEffect } from "react";
import { useInvitationCreate } from "@/views/admin-invitation-create/model/InvitationCreateProvider";
import { 
  FileText, Image as ImageIcon, CalendarClock, Images, 
  MessageSquareHeart, UserCheck, Gift, Settings, Share2 
} from "lucide-react";
import { getTemplatePackage } from "@/entities/template/model/registry";

export function InvitationEditorForm() {
  const { editorActiveTab, setEditorActiveTab, basicInfo, setBasicInfo, story, setStory, activeTemplate } = useInvitationCreate();

  const templatePackage = getTemplatePackage(activeTemplate?.code || "minimal-green");
  const schema = templatePackage.config.schema;

  const MENU_ITEMS = [
    { id: "Thông tin cơ bản", icon: FileText, alwaysShow: true },
    { id: "Ảnh & Video", icon: ImageIcon, alwaysShow: true },
    { id: "Timeline sự kiện", icon: CalendarClock, isEnabled: schema.timeline.enabled },
    { id: "Album ảnh", icon: Images, isEnabled: schema.gallery.maxImages > 0 },
    { id: "Lời ngỏ", icon: MessageSquareHeart, isEnabled: schema.story?.enabled !== false },
    { id: "RSVP", icon: UserCheck, isEnabled: schema.rsvp?.enabled !== false },
    { id: "Quà mừng", icon: Gift, isEnabled: schema.gift?.enabled !== false },
    { id: "Thiết lập khác", icon: Settings, alwaysShow: true },
    { id: "SEO & Chia sẻ", icon: Share2, alwaysShow: true },
  ];

  const visibleTabs = MENU_ITEMS.filter(item => item.alwaysShow || item.isEnabled);

  useEffect(() => {
    if (!visibleTabs.find((tab) => tab.id === editorActiveTab)) {
      setEditorActiveTab("Thông tin cơ bản");
    }
  }, [activeTemplate, editorActiveTab, setEditorActiveTab]);

  return (
    <div className="flex w-full h-full">
      {/* Sidebar Menu */}
      <div className="w-[180px] bg-slate-50 border-r border-slate-200 flex flex-col py-4 shrink-0 overflow-y-auto custom-scrollbar">
        {visibleTabs.map((item) => {
          const Icon = item.icon;
          const isActive = editorActiveTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setEditorActiveTab(item.id)}
              className={`flex items-center gap-3 px-4 py-3 text-[13px] font-medium transition-colors relative ${
                isActive 
                  ? "text-rose-600 bg-rose-50/50" 
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/50"
              }`}
            >
              <Icon size={16} className={isActive ? "text-rose-500" : "text-slate-400"} />
              {item.id}
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-rose-500 rounded-r"></div>
              )}
            </button>
          );
        })}
      </div>

      {/* Form Area */}
      <div className="flex-1 flex flex-col bg-white overflow-y-auto custom-scrollbar p-6">
        <h3 className="text-lg font-bold text-slate-800 mb-6">{editorActiveTab}</h3>
        
        {editorActiveTab === "Thông tin cơ bản" && (
          <div className="space-y-6">
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-slate-700">Họ tên cô dâu chú rể</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-500 mb-1.5">Tên chú rể</label>
                  <input
                    type="text"
                    value={basicInfo.groomName}
                    onChange={(e) => setBasicInfo({ ...basicInfo, groomName: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1.5">Tên cô dâu</label>
                  <input
                    type="text"
                    value={basicInfo.brideName}
                    onChange={(e) => setBasicInfo({ ...basicInfo, brideName: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-slate-700">Thời gian tổ chức</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-500 mb-1.5">Ngày cưới</label>
                  <input
                    type="date"
                    value={basicInfo.weddingDate}
                    onChange={(e) => setBasicInfo({ ...basicInfo, weddingDate: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1.5">Giờ cưới</label>
                  <input
                    type="time"
                    value={basicInfo.weddingTime}
                    onChange={(e) => setBasicInfo({ ...basicInfo, weddingTime: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-slate-700">Địa điểm tổ chức</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-slate-500 mb-1.5">Tên địa điểm (Nhà hàng, tư gia...)</label>
                  <input
                    type="text"
                    value={basicInfo.locationName}
                    onChange={(e) => setBasicInfo({ ...basicInfo, locationName: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1.5">Địa chỉ cụ thể</label>
                  <input
                    type="text"
                    value={basicInfo.address}
                    onChange={(e) => setBasicInfo({ ...basicInfo, address: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1.5">Link Google Maps</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={basicInfo.mapLink}
                      onChange={(e) => setBasicInfo({ ...basicInfo, mapLink: e.target.value })}
                      className="w-full pl-3 pr-10 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                    />
                    <a href={basicInfo.mapLink} target="_blank" rel="noreferrer" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-rose-500">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {editorActiveTab === "Lời ngỏ" && (
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-slate-700">Lời ngỏ / Story</h4>
            <textarea
              rows={8}
              value={story}
              onChange={(e) => setStory(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 resize-none"
              placeholder="Nhập lời ngỏ..."
            />
            <p className="text-xs text-slate-500">Lời ngỏ sẽ được hiển thị ở phần đầu thiệp cưới của bạn.</p>
          </div>
        )}

        {/* Other tabs can be implemented similarly... */}
        {editorActiveTab !== "Thông tin cơ bản" && editorActiveTab !== "Lời ngỏ" && (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400 text-sm">
            <p>Đang xây dựng nội dung cho tab này...</p>
          </div>
        )}

      </div>
    </div>
  );
}
