import { FileText, Navigation, FileDown, EyeOff } from "lucide-react";

export function AdminInvitationsStats({ statsData }: { statsData?: any }) {
  const stats = [
    {
      title: "Tổng thiệp",
      value: statsData?.total || 0,
      subtext: "Tháng này",
      icon: <FileDown size={20} className="text-indigo-600" />,
      bgIcon: "bg-indigo-50",
      colorText: "text-indigo-600",
    },
    {
      title: "Đã xuất bản",
      value: statsData?.published || 0,
      subtext: "Tháng này",
      icon: <Navigation size={20} className="text-green-600" />,
      bgIcon: "bg-green-50",
      colorText: "text-green-600",
    },
    {
      title: "Bản nháp",
      value: statsData?.draft || 0,
      subtext: "Tháng này",
      icon: <FileText size={20} className="text-purple-600" />,
      bgIcon: "bg-purple-50",
      colorText: "text-purple-600",
    },
    {
      title: "Tạm ẩn",
      value: statsData?.hidden || 0,
      subtext: "Tháng này",
      icon: <EyeOff size={20} className="text-orange-500" />,
      bgIcon: "bg-orange-50",
      colorText: "text-orange-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow"
        >
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${stat.bgIcon}`}>
            {stat.icon}
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">{stat.title}</p>
            <h3 className="text-2xl font-bold text-slate-800">{stat.value}</h3>
            <p className={`text-xs mt-1 ${stat.colorText}`}>{stat.subtext}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
