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
} from "lucide-react";
import { useRouter } from "next/navigation";
import { AdminLayout } from "@/widgets/admin-layout/ui/AdminLayout";
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
        router.push("/admin/login");
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
      console.error("Failed to update request status:", error);
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            Mới
          </span>
        );
      case "contacted":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
            <Clock size={11} />
            Đã liên hệ
          </span>
        );
      case "completed":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle size={11} />
            Hoàn thành
          </span>
        );
      case "cancelled":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
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
        {/* Header Page */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
              <MessageSquare className="text-pink-600" size={24} />
              Yêu cầu tạo thiệp mới
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Quản lý các thông tin liên hệ và tư vấn làm thiệp cưới từ khách
              hàng
            </p>
          </div>

          <button
            onClick={fetchRequests}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 shadow-sm transition-all cursor-pointer self-start sm:self-auto"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            Làm mới dữ liệu
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Tổng số yêu cầu
            </p>
            <p className="text-2xl font-bold text-slate-900 mt-2">
              {totalCount}
            </p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
            <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider">
              Chờ xử lý (Mới)
            </p>
            <p className="text-2xl font-bold text-amber-600 mt-2">{newCount}</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
              Đã liên hệ
            </p>
            <p className="text-2xl font-bold text-blue-600 mt-2">
              {contactedCount}
            </p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
            <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">
              Hoàn thành
            </p>
            <p className="text-2xl font-bold text-emerald-600 mt-2">
              {completedCount}
            </p>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm theo tên, SĐT, mẫu thiệp..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:border-pink-500 focus:bg-white transition-all placeholder:text-slate-400"
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
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  statusFilter === tab.id
                    ? "bg-pink-600 text-white shadow-md shadow-pink-600/20"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Table Data */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 border-b border-slate-200 text-[11px] uppercase tracking-wider font-bold text-slate-500">
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
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="p-8 text-center text-slate-400 font-medium"
                    >
                      Đang tải dữ liệu yêu cầu...
                    </td>
                  </tr>
                ) : filteredRequests.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="p-8 text-center text-slate-400 font-medium"
                    >
                      Chưa có yêu cầu tạo thiệp nào phù hợp.
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
                        className="hover:bg-slate-50/80 transition-colors"
                      >
                        <td className="p-4 font-bold text-slate-400">
                          #{index + 1}
                        </td>

                        {/* Khách hàng */}
                        <td className="p-4">
                          <div className="space-y-0.5">
                            <p className="font-bold text-slate-900 flex items-center gap-1.5">
                              <User size={13} className="text-pink-600" />
                              {item.name}
                            </p>
                            <a
                              href={`https://zalo.me/${item.phone}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                            >
                              <PhoneCall size={12} />
                              {item.phone}
                              <ExternalLink size={10} />
                            </a>
                          </div>
                        </td>

                        {/* Mẫu thiệp */}
                        <td className="p-4">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-pink-50 text-pink-700 font-bold border border-pink-100">
                            <Sparkles size={12} />
                            {item.templateName}
                          </span>
                        </td>

                        {/* Ghi chú */}
                        <td className="p-4 max-w-xs">
                          <p className="text-slate-600 line-clamp-2 leading-relaxed italic">
                            {item.notes
                              ? `"${item.notes}"`
                              : "Không có ghi chú"}
                          </p>
                        </td>

                        {/* Thời gian */}
                        <td className="p-4 text-slate-500 font-medium whitespace-nowrap">
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
                              className="mt-1 bg-slate-100 border border-slate-200 rounded-lg px-2 py-1 text-[11px] font-bold text-slate-700 focus:outline-none cursor-pointer"
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
                              className="p-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors shadow-xs"
                              title="Gọi điện ngay"
                            >
                              <PhoneCall size={14} />
                            </a>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors cursor-pointer border-0 shadow-xs"
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
