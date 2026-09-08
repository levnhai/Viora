"use client";

import { useState, useEffect } from "react";
import {
  PhoneCall,
  Search,
  RefreshCw,
  Trash2,
  CheckCircle,
  Clock,
  MessageSquare,
  Sparkles,
  ExternalLink,
  User,
  Inbox,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { AdminLayout } from "@/widgets/admin";
import { AdminPageHeader } from "@/widgets/admin";
import { TemplateRequest } from "@/app/api/template-requests/route";

export function AdminTemplateRequestsPage() {
  const router = useRouter();
  const [requests, setRequests] = useState<TemplateRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/template-requests");
      if (res.status === 401) {
        router.push("/admin/login-2h");
        return;
      }
      const data = await res.json();
      if (data.success) {
        setRequests(data.data || []);
      }
    } catch (error) {
      console.error("Failed to fetch template requests:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch("/api/template-requests", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setRequests((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, status: newStatus as any } : item,
          ),
        );
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa yêu cầu này?")) return;
    try {
      const res = await fetch(`/api/template-requests?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setRequests((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete request:", error);
    }
  };

  // Filter requests
  const filteredRequests = requests.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.phone.includes(searchTerm) ||
      (item.templateName &&
        item.templateName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.notes &&
        item.notes.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus =
      statusFilter === "all" ? true : item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalCount = requests.length;
  const newCount = requests.filter((r) => r.status === "new").length;
  const contactedCount = requests.filter(
    (r) => r.status === "contacted",
  ).length;
  const completedCount = requests.filter(
    (r) => r.status === "completed",
  ).length;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            Mới
          </span>
        );
      case "contacted":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/60">
            <Clock size={11} />
            Đã liên hệ
          </span>
        );
      case "completed":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
            <CheckCircle size={11} />
            Hoàn thành
          </span>
        );
      case "cancelled":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800/60">
            Đã hủy
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-[1600px] mx-auto">
        {/* Unified Page Header */}
        <AdminPageHeader
          breadcrumbs={[
            { label: "Khách mời & Tương tác" },
            { label: "Yêu cầu tạo thiệp" },
          ]}
          title="Yêu cầu tạo thiệp mới"
          description="Quản lý các thông tin liên hệ và tư vấn làm thiệp cưới từ khách hàng"
          icon={<MessageSquare size={20} />}
          badge={
            newCount > 0 ? (
              <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-amber-50 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 animate-pulse">
                {newCount} yêu cầu mới
              </span>
            ) : undefined
          }
          actions={
            <button
              onClick={fetchRequests}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 shadow-xs transition-all cursor-pointer"
            >
              <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
              <span>Làm mới dữ liệu</span>
            </button>
          }
        />

        {/* Stats KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
          <div className="bg-white dark:bg-slate-900/90 backdrop-blur-xs p-4 sm:p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md hover:-translate-y-0.5 transition-all">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Tổng số yêu cầu
            </p>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-2 tracking-tight">
              {totalCount}
            </p>
          </div>
          <div className="bg-white dark:bg-slate-900/90 backdrop-blur-xs p-4 sm:p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md hover:-translate-y-0.5 transition-all">
            <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              Chờ xử lý (Mới)
            </p>
            <p className="text-2xl sm:text-3xl font-extrabold text-amber-600 dark:text-amber-400 mt-2 tracking-tight">
              {newCount}
            </p>
          </div>
          <div className="bg-white dark:bg-slate-900/90 backdrop-blur-xs p-4 sm:p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md hover:-translate-y-0.5 transition-all">
            <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              Đã liên hệ
            </p>
            <p className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400 mt-2 tracking-tight">
              {contactedCount}
            </p>
          </div>
          <div className="bg-white dark:bg-slate-900/90 backdrop-blur-xs p-4 sm:p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md hover:-translate-y-0.5 transition-all">
            <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              Hoàn thành
            </p>
            <p className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-2 tracking-tight">
              {completedCount}
            </p>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white dark:bg-slate-900/90 backdrop-blur-xs p-2.5 sm:p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-xs flex flex-col md:flex-row gap-3 justify-between items-stretch md:items-center">
          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm theo tên khách, SĐT, mẫu thiệp..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 text-xs font-medium text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400"
            />
          </div>

          {/* Status Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {[
              { id: "all", label: "Tất cả" },
              { id: "new", label: "Mới" },
              { id: "contacted", label: "Đã liên hệ" },
              { id: "completed", label: "Hoàn thành" },
              { id: "cancelled", label: "Đã hủy" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shadow-2xs ${
                  statusFilter === tab.id
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/25"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200/60 dark:border-slate-700/60"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Table Data */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700 dark:text-slate-200">
              <thead className="bg-slate-50/70 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700 text-[11px] uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400">
                <tr>
                  <th className="p-4">STT</th>
                  <th className="p-4">Khách hàng</th>
                  <th className="p-4">Mẫu thiệp chọn</th>
                  <th className="p-4">Ghi chú</th>
                  <th className="p-4">Thời gian</th>
                  <th className="p-4">Trạng thái</th>
                  <th className="p-4 text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {loading ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="p-12 text-center text-slate-400 font-medium"
                    >
                      <div className="flex flex-col items-center justify-center gap-2">
                        <RefreshCw size={24} className="animate-spin text-pink-500" />
                        <p>Đang tải dữ liệu yêu cầu...</p>
                      </div>
                    </td>
                  </tr>
                ) : filteredRequests.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="p-12 text-center"
                    >
                      <div className="flex flex-col items-center justify-center gap-2 max-w-sm mx-auto">
                        <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                          <Inbox size={24} />
                        </div>
                        <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
                          {requests.length === 0
                            ? "Không có dữ liệu yêu cầu tạo thiệp"
                            : "Không tìm thấy yêu cầu phù hợp"}
                        </p>
                        <p className="text-xs text-slate-400">
                          {requests.length === 0
                            ? "Hiện tại chưa có yêu cầu tư vấn hoặc tạo thiệp nào từ khách hàng."
                            : "Thử thay đổi từ khóa tìm kiếm hoặc trạng thái bộ lọc."}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredRequests.map((item, index) => {
                    const formattedDate = new Date(
                      item.createdAt,
                    ).toLocaleString("vi-VN", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    });

                    return (
                      <tr
                        key={item.id}
                        className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors"
                      >
                        <td className="p-4 font-bold text-slate-400">
                          #{index + 1}
                        </td>

                        {/* Khách hàng */}
                        <td className="p-4">
                          <div className="space-y-0.5">
                            <p className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                              <User size={13} className="text-indigo-600 dark:text-indigo-400" />
                              {item.name}
                            </p>
                            <a
                              href={`https://zalo.me/${item.phone}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline transition-colors"
                            >
                              <PhoneCall size={12} />
                              {item.phone}
                              <ExternalLink size={10} />
                            </a>
                          </div>
                        </td>

                        {/* Mẫu thiệp */}
                        <td className="p-4">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-bold border border-indigo-100 dark:border-indigo-900/50">
                            <Sparkles size={12} />
                            {item.templateName}
                          </span>
                        </td>

                        {/* Ghi chú */}
                        <td className="p-4 max-w-xs">
                          <p className="text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed italic">
                            {item.notes
                              ? `"${item.notes}"`
                              : "Không có ghi chú"}
                          </p>
                        </td>

                        {/* Thời gian */}
                        <td className="p-4 text-slate-500 dark:text-slate-400 font-medium font-mono text-[11px] whitespace-nowrap">
                          {formattedDate}
                        </td>

                        {/* Trạng thái */}
                        <td className="p-4">
                          <div className="flex flex-col gap-1">
                            {getStatusBadge(item.status)}
                            <select
                              value={item.status}
                              onChange={(e) =>
                                handleUpdateStatus(item.id, e.target.value)
                              }
                              className="mt-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 text-[11px] font-bold text-slate-700 dark:text-slate-200 focus:outline-none cursor-pointer"
                            >
                              <option value="new">Mới</option>
                              <option value="contacted">Đã liên hệ</option>
                              <option value="completed">Hoàn thành</option>
                              <option value="cancelled">Đã hủy</option>
                            </select>
                          </div>
                        </td>

                        {/* Thao tác */}
                        <td className="p-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <a
                              href={`tel:${item.phone}`}
                              className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/60 transition-colors shadow-xs"
                              title="Gọi điện ngay"
                            >
                              <PhoneCall size={14} />
                            </a>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/60 transition-colors cursor-pointer border-0 shadow-xs"
                              title="Xóa yêu cầu"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
