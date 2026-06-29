"use client";

import { Users, Layers, Heart, Headphones } from "lucide-react";

export function Stats() {
  const STATS_ITEMS = [
    {
      icon: Users,
      value: "5.000+",
      label: "Cặp đôi tin tưởng",
    },
    {
      icon: Layers,
      value: "1.000+",
      label: "Mẫu thiệp cao cấp",
    },
    {
      icon: Heart,
      value: "98%",
      label: "Khách hàng hài lòng",
    },
    {
      icon: Headphones,
      value: "24/7",
      label: "Hỗ trợ tận tâm",
    },
  ];

  return (
    <section className="bg-[#fffdfb] py-8 border-b border-[#e2d8cf]/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {STATS_ITEMS.map((item, index) => (
            <div 
              key={index} 
              className="flex items-center justify-center gap-4 py-2 px-4 rounded-2xl hover:bg-[#faf6f0]/40 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-pink-50 flex items-center justify-center flex-shrink-0">
                <item.icon size={20} className="text-[#db2777]" />
              </div>
              <div className="text-left">
                <p 
                  className="text-2xl font-bold text-[#db2777] leading-none"
                  style={{ fontFamily: "'Outfit', 'DM Sans', sans-serif" }}
                >
                  {item.value}
                </p>
                <p className="text-[11px] text-[#7a5c4f]/80 mt-1 font-medium">
                  {item.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
