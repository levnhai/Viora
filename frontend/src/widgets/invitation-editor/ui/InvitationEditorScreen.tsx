"use client";

import { useState } from "react";
import { useInvitationCreate } from "@/views/admin-invitation-create/model/InvitationCreateProvider";
import { ArrowLeft, Save, Eye, CheckCircle, Loader2 } from "lucide-react";
import { InvitationEditorForm } from "./InvitationEditorForm";
import { InvitationPreview } from "@/widgets/invitation-preview/ui/InvitationPreview";
import { PublishSuccessModal } from "@/widgets/invitation-publish-settings/ui/PublishSuccessModal";
import { API_URL } from "@/shared/lib/config";

export function InvitationEditorScreen() {
  const {
    setStep,
    activeTemplate,
    setIsPublishSuccessModalOpen,
    basicInfo,
    publishSettings,
    giftInfo,
    galleryImages,
    deletedGalleryImages,
    timeline,
    isEditMode,
  } = useInvitationCreate();

  const [isPublishing, setIsPublishing] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [customerEmail, setCustomerEmail] = useState("");
  const [credentials, setCredentials] = useState<{email: string, password: string} | null>(null);

  const triggerPublish = () => {
    if (isEditMode) {
      handlePublish();
    } else {
      setIsEmailModalOpen(true);
    }
  };

  const handlePublish = async () => {
    try {
      setIsEmailModalOpen(false);
      setIsPublishing(true);

      const payload = {
        slug: publishSettings.urlSlug,
        templateId:
          Number((activeTemplate as any)?.id || (activeTemplate as any)?._id) ||
          1,
        groomName: basicInfo.groomName,
        brideName: basicInfo.brideName,
        groomFatherName: basicInfo.groomFatherName,
        groomMotherName: basicInfo.groomMotherName,
        brideFatherName: basicInfo.brideFatherName,
        brideMotherName: basicInfo.brideMotherName,
        groomRank: basicInfo.groomRank,
        brideRank: basicInfo.brideRank,
        groomAddress: basicInfo.groomAddress,
        brideAddress: basicInfo.brideAddress,
        weddingDate: basicInfo.weddingDate,
        weddingTime: basicInfo.weddingTime,
        giftInfo: giftInfo,
        galleryImages: galleryImages,
        deletedGalleryImages: deletedGalleryImages,
        timeline: timeline,
        customerEmail: customerEmail || undefined,
        events: [
          {
            title: "TIỆC CƯỚI",
            time: basicInfo.weddingTime,
            date: basicInfo.weddingDate,
            locationName: basicInfo.locationName,
            address: basicInfo.address,
            mapUrl: basicInfo.mapLink,
          },
        ],
      };

      const res = await fetch(`${API_URL}/api/weddings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Không thể xuất bản thiệp cưới");
      }

      if (data.data?.credentials) {
        setCredentials(data.data.credentials);
      } else {
        setCredentials(null);
      }

      setIsPublishSuccessModalOpen(true);
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Có lỗi xảy ra khi xuất bản");
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="flex-1 w-full flex flex-col h-screen bg-[#f8fafc] overflow-hidden">
      {/* Email Modal */}
      {isEmailModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-[#1e1e2d]/80 backdrop-blur-sm"
            onClick={() => setIsEmailModalOpen(false)}
          ></div>
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 flex flex-col animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-xl font-bold text-slate-800 mb-2">
              Email khách hàng (Bắt buộc)
            </h3>
            <p className="text-sm text-slate-500 mb-6">
              Vui lòng nhập email của Cô dâu/Chú rể để hệ thống tự động tạo tài khoản quản lý thiệp cho họ.
            </p>
            <input
              type="email"
              placeholder="VD: minh.lan@gmail.com"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-colors mb-6 text-slate-700"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsEmailModalOpen(false)}
                className="px-5 py-2 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handlePublish}
                disabled={!customerEmail || !customerEmail.includes('@')}
                className="px-5 py-2 text-sm font-medium text-white bg-rose-500 hover:bg-rose-600 rounded-xl shadow-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Tiếp tục Xuất bản
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Topbar */}
      <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0 z-10">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setStep("select_template")}
            className="p-2 hover:bg-slate-100 text-slate-500 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="font-bold text-slate-800 text-sm">
              {isEditMode ? "Chỉnh sửa thiệp cưới" : (activeTemplate?.name || "Tạo thiệp mới")}
            </h2>
            <p className="text-[10px] text-slate-500">
              {isPublishing ? "Đang lưu..." : "Sẵn sàng lưu"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={handlePublish}
            disabled={isPublishing}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors disabled:opacity-50"
          >
            <Save size={16} /> Lưu nháp
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
            <Eye size={16} /> Xem trước
          </button>
          <button
            onClick={triggerPublish}
            disabled={isPublishing}
            className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-rose-500 hover:bg-rose-600 rounded-xl shadow-md shadow-rose-500/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isPublishing ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <CheckCircle size={16} />
            )}
            {isPublishing ? "Đang xử lý..." : "Xuất bản"}
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 flex overflow-hidden">
        {/* Form Panel (Left + Middle combined) */}
        <div className="w-[700px] flex shrink-0 border-r border-slate-200 bg-white z-0">
          <InvitationEditorForm />
        </div>

        {/* Preview Panel (Right) */}
        <div className="flex-1 flex flex-col relative bg-slate-50 overflow-hidden">
          {/* Top Bar of Preview */}
          <div className="h-12 border-b border-slate-200 flex items-center px-6 justify-between shrink-0 bg-white/50 backdrop-blur-sm">
            <h3 className="text-sm font-bold text-slate-800">Xem trước</h3>
            <div className="flex items-center gap-2">
              <button className="p-1.5 text-slate-400 hover:text-slate-600 rounded hover:bg-slate-100 transition-colors">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                  <line x1="12" y1="18" x2="12.01" y2="18"></line>
                </svg>
              </button>
              <button className="p-1.5 text-slate-400 hover:text-slate-600 rounded hover:bg-slate-100 transition-colors">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar flex items-center justify-center p-8">
            <InvitationPreview />
          </div>
        </div>
      </main>

      <PublishSuccessModal credentials={credentials} />
    </div>
  );
}
