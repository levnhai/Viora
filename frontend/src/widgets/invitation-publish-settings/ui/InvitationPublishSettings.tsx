"use client";

import { useInvitationCreate } from "@/views/admin-invitation-create/model/InvitationCreateProvider";
import { Toggle } from "@/shared/ui/Toggle";
import { CheckCircle2, Copy, Facebook, Twitter, Mail, Link as LinkIcon, Upload } from "lucide-react";

export function InvitationPublishSettings() {
  const { publishSettings, setPublishSettings, setIsSlugEdited } = useInvitationCreate();

  const handleSettingChange = (field: keyof typeof publishSettings, value: any) => {
    setPublishSettings({ ...publishSettings, [field]: value });
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSlugEdited(true);
    let val = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "");
    handleSettingChange("urlSlug", val);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-full overflow-hidden">
      <div className="p-4 border-b border-slate-200 shrink-0">
        <h3 className="font-semibold text-slate-800">Xuất bản thiệp</h3>
      </div>

      <div className="p-4 overflow-y-auto flex-1 custom-scrollbar space-y-6">
        
        {/* Status */}
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-2">
            Trạng thái
          </label>
          <div className="flex items-center gap-2 text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-2 rounded-lg border border-emerald-100">
            <CheckCircle2 size={16} /> Sẵn sàng xuất bản
          </div>
          <p className="text-[10px] text-slate-500 mt-2">
            Thiệp của bạn đã sẵn sàng để xuất bản và chia sẻ.
          </p>
        </div>

        {/* Link */}
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-2">
            Link thiệp cưới
          </label>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-600 flex items-center">
              <span className="text-slate-400 shrink-0">https://{publishSettings.domain}/</span>
              <input 
                type="text" 
                value={publishSettings.urlSlug}
                onChange={handleSlugChange}
                className="bg-transparent border-none outline-none w-full ml-1 text-slate-700 font-medium"
                placeholder="ten-co-dau-chu-re"
              />
            </div>
            <button className="flex items-center gap-1.5 px-3 py-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-lg text-xs font-medium transition-colors shrink-0">
              <Copy size={12} /> Sao chép
            </button>
          </div>
        </div>

        {/* Domain */}
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-2">
            Tên miền
          </label>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-slate-600">
              <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center">
                <LinkIcon size={10} className="text-slate-500" />
              </div>
              {publishSettings.domain}
            </div>
            <button className="text-xs font-medium text-indigo-600 hover:text-indigo-700">
              Thay đổi
            </button>
          </div>
        </div>

        <hr className="border-slate-100" />

        {/* Social Share */}
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-3">
            Chia sẻ nhanh
          </label>
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center gap-1.5">
              <button className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition-colors">
                <Facebook size={18} />
              </button>
              <span className="text-[10px] text-slate-500">Facebook</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <button className="w-10 h-10 rounded-full bg-sky-50 text-sky-500 flex items-center justify-center hover:bg-sky-100 transition-colors">
                <div className="font-bold">Zalo</div>
              </button>
              <span className="text-[10px] text-slate-500">Zalo</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <button className="w-10 h-10 rounded-full bg-slate-50 text-slate-600 flex items-center justify-center hover:bg-slate-100 transition-colors">
                <Twitter size={18} />
              </button>
              <span className="text-[10px] text-slate-500">Twitter</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <button className="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 transition-colors">
                <Mail size={18} />
              </button>
              <span className="text-[10px] text-slate-500">Email</span>
            </div>
          </div>
        </div>

        <hr className="border-slate-100" />

        {/* SEO Settings */}
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-3 uppercase tracking-wider">
            Cài đặt SEO
          </label>
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] text-slate-500 mb-1">
                Tiêu đề trang
              </label>
              <input
                type="text"
                value={publishSettings.seoTitle}
                onChange={(e) => handleSettingChange("seoTitle", e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
            <div>
              <label className="block text-[10px] text-slate-500 mb-1">
                Mô tả
              </label>
              <textarea
                value={publishSettings.seoDescription}
                onChange={(e) => handleSettingChange("seoDescription", e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs outline-none resize-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
            <div>
              <label className="block text-[10px] text-slate-500 mb-2">
                Ảnh đại diện (OG Image)
              </label>
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
                  <span className="text-[10px] text-slate-400 text-center leading-tight">No<br/>Image</span>
                </div>
                <button className="flex flex-col items-center justify-center flex-1 h-16 border-2 border-dashed border-slate-200 rounded-lg hover:border-indigo-400 hover:bg-indigo-50 transition-colors cursor-pointer group">
                  <span className="text-xs font-medium text-slate-600 group-hover:text-indigo-600">Thay ảnh</span>
                  <span className="text-[8px] text-slate-400 mt-0.5">JPG, PNG, WEBP</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-slate-100" />

        {/* Advanced Settings */}
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-3 uppercase tracking-wider">
            Cài đặt nâng cao
          </label>
          <div className="space-y-4">
            <Toggle
              label="Cho phép khách gửi lời chúc"
              checked={publishSettings.allowComments}
              onChange={(v) => handleSettingChange("allowComments", v)}
            />
            <Toggle
              label="Hiển thị form RSVP"
              checked={publishSettings.showRsvp}
              onChange={(v) => handleSettingChange("showRsvp", v)}
            />
            <Toggle
              label="Bật bảo mật mật khẩu"
              checked={publishSettings.passwordProtect}
              onChange={(v) => handleSettingChange("passwordProtect", v)}
            />
          </div>
        </div>

      </div>

      <div className="p-4 border-t border-slate-100 shrink-0">
        <button className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-sm shadow-indigo-600/20">
          <CheckCircle2 size={16} /> Xuất bản ngay
        </button>
      </div>
    </div>
  );
}
