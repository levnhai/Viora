"use client";

import { useState } from "react";
import { Search, Heart, Eye } from "lucide-react";
import { useTemplates } from "@/entities/template/model/useTemplates";
import { useInvitationCreate } from "@/views/admin-invitation-create/model/InvitationCreateProvider";

export function InvitationTemplateSelector() {
  const { setActiveTemplate, setIsTemplateModalOpen } = useInvitationCreate();
  const [activeTab, setActiveTab] = useState("Tất cả");
  const [searchQuery, setSearchQuery] = useState("");
  const { templates, loading, error } = useTemplates();

  const categories = ["Tất cả", "Hiện đại", "Cổ điển", "Rustic", "Hoa lá", "Tối giản", "Sang trọng"];
  
  const filteredTemplates = templates.filter((t) => {
    const matchTab = activeTab === "Tất cả" || t.tags.includes(activeTab) || t.tags.includes(activeTab.toLowerCase());
    const matchSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchTab && matchSearch;
  });

  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-6 shrink-0 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-800 mb-1">Tạo thiệp mới</h1>
              <p className="text-sm text-slate-500">Chọn template để bắt đầu tạo thiệp cưới của bạn</p>
            </div>
            <div className="relative w-72">
              <input
                type="text"
                placeholder="Tìm kiếm template..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:bg-white focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
              />
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
          </div>

          {/* Custom Tabs for Full width */}
          <div className="flex flex-wrap items-center gap-3">
            {categories.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === tab
                    ? "bg-rose-50 text-rose-600 border border-rose-200"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
              <div className="w-8 h-8 border-2 border-rose-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p>Đang tải danh sách template...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-20 text-red-500">
              <p className="font-medium text-lg mb-2">Đã xảy ra lỗi</p>
              <p className="text-sm">{error}</p>
            </div>
          ) : filteredTemplates.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
              <p>Không tìm thấy mẫu phù hợp với tiêu chí của bạn.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredTemplates.map((template) => (
                <div
                  key={template._id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-rose-200 transition-all duration-300 group flex flex-col"
                >
                  <div className="relative aspect-[1/1.4] bg-slate-100 overflow-hidden">
                    <img
                      src={template.thumbnail || "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=300&auto=format&fit=crop"}
                      alt={template.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {template.tags?.includes("Mới") && (
                      <span className="absolute top-3 left-3 px-2.5 py-1 bg-rose-500 text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-md">
                        Mới
                      </span>
                    )}
                  </div>
                  
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-bold text-slate-800 text-base mb-1 truncate">{template.name}</h3>
                    <p className="text-xs text-slate-500 line-clamp-1 mb-4">
                      {template.tags?.join(", ") || "Thiệp cưới đẹp"}
                    </p>
                    
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button className="text-slate-400 hover:text-rose-500 transition-colors">
                          <Heart size={16} />
                        </button>
                        <button className="text-slate-400 hover:text-slate-600 transition-colors">
                          <Eye size={16} />
                        </button>
                      </div>
                      
                      <button
                        onClick={() => {
                          setActiveTemplate(template);
                          setIsTemplateModalOpen(true);
                        }}
                        className="px-4 py-1.5 rounded-lg border border-rose-200 text-rose-600 text-xs font-semibold hover:bg-rose-50 transition-colors"
                      >
                        Xem chi tiết
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
