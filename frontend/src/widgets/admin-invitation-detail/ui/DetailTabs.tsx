"use client";

import { Info, LayoutTemplate, Users, CheckCircle, MessageSquare, Gift, BarChart2, Settings } from "lucide-react";
import { useState } from "react";

export function DetailTabs() {
  const [activeTab, setActiveTab] = useState("info");

  const tabs = [
    { id: "info", label: "Thông tin", icon: <Info size={16} /> },
    { id: "content", label: "Nội dung", icon: <LayoutTemplate size={16} /> },
    { id: "guests", label: "Khách mời", icon: <Users size={16} /> },
    { id: "rsvp", label: "RSVP", icon: <CheckCircle size={16} /> },
    { id: "messages", label: "Lời chúc", icon: <MessageSquare size={16} /> },
    { id: "gifts", label: "Quà mừng", icon: <Gift size={16} /> },
    { id: "stats", label: "Thống kê", icon: <BarChart2 size={16} /> },
    { id: "seo", label: "Cài đặt SEO", icon: <Settings size={16} /> },
  ];

  return (
    <div className="flex items-center gap-1 overflow-x-auto border-b border-slate-200 hide-scrollbar mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
            activeTab === tab.id
              ? "border-pink-500 text-pink-600"
              : "border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300"
          }`}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </div>
  );
}
