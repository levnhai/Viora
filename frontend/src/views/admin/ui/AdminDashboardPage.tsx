'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Heart, LogOut, Loader2, Sparkles, Phone, Mail, Calendar, Layers, Clock, MessageSquare } from "lucide-react";

export function AdminDashboardPage() {
  const router = useRouter();
  const navigate = (path: string) => router.push(path);
  const [requestsList, setRequestsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Authentication check
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedRole = localStorage.getItem("role");

    if (!savedToken || (savedRole !== "admin" && savedRole !== "staff")) {
      localStorage.clear();
      navigate("/login");
      return;
    }

    setToken(savedToken);
  }, [navigate]);

  // Fetch invitation requests
  useEffect(() => {
    if (!token) return;

    const fetchRequests = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("http://localhost:8080/api/invitation-requests", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        const resData = await response.json();
        if (!response.ok) {
          throw new Error(resData.message || "Không thể tải danh sách yêu cầu!");
        }

        setRequestsList(resData.data || []);
      } catch (err: any) {
        setError(err.message || "Đã xảy ra lỗi kết nối đến máy chủ!");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [token]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-10 h-10 animate-spin text-[#8b3a52]" />
        <p className="text-sm font-medium text-[#7a5c4f] tracking-wide animate-pulse">Đang tải trang quản trị viên...</p>
      </div>
    );
  }

  // Summary statistics
  const totalRequests = requestsList.length;
  const planCounts = requestsList.reduce((acc: any, r: any) => {
    acc[r.planName] = (acc[r.planName] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-[#faf8f5] flex flex-col" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Header */}
      <header className="bg-white border-b border-[#c9828e]/15 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#8b3a52] flex items-center justify-center">
              <Heart size={14} className="text-white" fill="currentColor" />
            </div>
            <span className="text-lg font-semibold text-[#2c1810]" style={{ fontFamily: "'EB Garamond', serif" }}>
              Viora Wedding <span className="text-xs font-normal text-red-700 font-semibold uppercase tracking-wider ml-1 bg-red-50 px-2 py-0.5 rounded-full border border-red-200">Admin</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs text-[#7a5c4f]">
              Tài khoản: <span className="font-semibold">{localStorage.getItem("username")}</span>
            </span>
            <button 
              onClick={handleLogout}
              className="text-xs text-[#7a5c4f] hover:text-red-600 transition-colors flex items-center gap-1.5 border-0 bg-transparent cursor-pointer font-medium"
            >
              <LogOut size={14} /> Đăng xuất
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Title */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-[#2c1810] flex items-center gap-2" style={{ fontFamily: "'EB Garamond', serif" }}>
              Danh sách Yêu cầu Làm thiệp
            </h1>
            <p className="text-xs text-[#7a5c4f]">Quản lý khách hàng đăng ký thiết kế thiệp cưới online trên hệ thống.</p>
          </div>
          <div className="text-2xs text-[#7a5c4f] bg-white px-3 py-1.5 rounded-xl border border-[#c9828e]/15 font-mono">
            Tổng số yêu cầu: <span className="font-semibold text-[#8b3a52]">{totalRequests}</span>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-4 rounded-xl border border-red-200 flex items-center gap-2">
            ⚠️ {error}
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-[#c9828e]/15 shadow-2xs">
            <p className="text-2xs uppercase tracking-widest text-[#7a5c4f] font-semibold mb-1">Tổng Số Yêu Cầu</p>
            <h3 className="text-2xl font-bold text-[#2c1810]" style={{ fontFamily: "'EB Garamond', serif" }}>{totalRequests} đơn</h3>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-[#c9828e]/15 shadow-2xs">
            <p className="text-2xs uppercase tracking-widest text-amber-700 font-semibold mb-1">Gói Cao Cấp</p>
            <h3 className="text-2xl font-bold text-amber-600" style={{ fontFamily: "'EB Garamond', serif" }}>{(planCounts["Cao cấp"] || planCounts["Cặp đôi"] || planCounts["Đặc biệt"] || 0)} đơn</h3>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-[#c9828e]/15 shadow-2xs">
            <p className="text-2xs uppercase tracking-widest text-[#7a5c4f]/70 font-semibold mb-1">Gói Phổ Biến</p>
            <h3 className="text-2xl font-bold text-[#7a5c4f]" style={{ fontFamily: "'EB Garamond', serif" }}>{(planCounts["Phổ biến"] || planCounts["Miễn phí"] || 0)} đơn</h3>
          </div>
        </div>

        {/* Requests List */}
        <div className="bg-white rounded-2xl border border-[#c9828e]/15 shadow-2xs overflow-hidden">
          {requestsList.length === 0 ? (
            <div className="text-center py-20 text-[#7a5c4f]/60 text-sm space-y-2">
              <Sparkles size={32} className="mx-auto text-[#c9828e]/40 animate-pulse" />
              <p>Hiện chưa có yêu cầu làm thiệp nào được đăng ký trên hệ thống.</p>
            </div>
          ) : (
            <div className="divide-y divide-[#c9828e]/10">
              {requestsList.map((req: any, index: number) => (
                <div key={req._id} className="p-6 hover:bg-[#faf5f0]/30 transition-colors flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  
                  {/* Customer details */}
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="text-2xs font-mono bg-[#faf5f0] border px-2 py-0.5 rounded-md text-[#7a5c4f]/80">
                        #{index + 1}
                      </span>
                      <h3 className="text-base font-semibold text-[#2c1810]">{req.fullName}</h3>
                      <span className={`text-2xs font-medium px-2 py-0.5 rounded-full border ${
                        req.planName === "Đặc biệt" || req.planName === "Cao cấp"
                          ? "bg-purple-50 text-purple-700 border-purple-200" 
                          : req.planName === "Cặp đôi" || req.planName === "Phổ biến"
                            ? "bg-blue-50 text-blue-700 border-blue-200" 
                            : "bg-slate-50 text-slate-600 border-slate-200"
                      }`}>
                        Gói {req.planName}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs text-[#7a5c4f]">
                      <a href={`tel:${req.phoneNumber}`} className="flex items-center gap-1.5 text-[#8b3a52] hover:underline no-underline font-medium">
                        <Phone size={13} /> {req.phoneNumber}
                      </a>
                      {req.email && (
                        <div className="flex items-center gap-1.5">
                          <Mail size={13} /> {req.email}
                        </div>
                      )}
                      <div className="flex items-center gap-1.5">
                        <Layers size={13} /> Mẫu: <span className="font-semibold text-[#2c1810]">{req.templateName}</span> (ID: {req.templateId})
                      </div>
                      {req.weddingDate && (
                        <div className="flex items-center gap-1.5">
                          <Calendar size={13} /> Ngày cưới: <span className="font-medium text-[#2c1810]">{new Date(req.weddingDate).toLocaleDateString("vi-VN")}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Notes & Time */}
                  <div className="w-full md:w-auto flex flex-col md:items-end justify-between self-stretch md:self-auto gap-4">
                    <div className="flex items-center gap-1 text-2xs text-[#7a5c4f]/70 font-mono">
                      <Clock size={12} /> {new Date(req.createdAt).toLocaleString("vi-VN")}
                    </div>

                    {req.notes && (
                      <div className="p-3 bg-[#faf5f0]/50 rounded-xl border border-[#c9828e]/10 text-xs text-[#7a5c4f] italic max-w-sm md:text-right flex gap-1.5 items-start">
                        <MessageSquare size={13} className="shrink-0 text-[#8b3a52] mt-0.5" />
                        <span>"{req.notes}"</span>
                      </div>
                    )}
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

      </main>
    </div>
  );
}
