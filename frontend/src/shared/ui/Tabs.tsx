"use client";

interface TabsProps {
  tabs: string[];
  activeTab: string;
  onChange: (tab: string) => void;
}

export function Tabs({ tabs, activeTab, onChange }: TabsProps) {
  return (
    <div className="flex gap-4 border-b border-slate-200 overflow-x-auto custom-scrollbar pb-[-1px]">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`pb-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
            activeTab === tab
              ? "text-indigo-600 border-indigo-600"
              : "text-slate-500 border-transparent hover:text-slate-700"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
