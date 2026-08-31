"use client";

import { ExternalLink, Copy } from "lucide-react";
import dayjs from "dayjs";

export function DetailInfoTab({ data }: { data: any }) {
  const { wedding, template, themeSettings, media, sections } = data;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Thông tin cơ bản */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="font-semibold text-slate-800 mb-4 pb-3 border-b border-slate-100">
          Thông tin cơ bản
        </h3>
        <div className="space-y-4">
          <div className="flex justify-between items-start gap-4">
            <span className="text-sm text-slate-500 w-1/3 shrink-0">
              Tên thiệp cưới
            </span>
            <span className="text-sm text-slate-800 font-medium text-right">
              {wedding?.name || "Chưa đặt tên"}
            </span>
          </div>
          <div className="flex justify-between items-start gap-4">
            <span className="text-sm text-slate-500 w-1/3 shrink-0">
              Slug (URL)
            </span>
            <span className="text-sm text-slate-800 font-medium text-right flex items-center gap-1.5 justify-end">
              {wedding?.slug}{" "}
              <Copy
                size={14}
                className="text-slate-400 cursor-pointer hover:text-slate-800"
              />
            </span>
          </div>
          <div className="flex justify-between items-start gap-4">
            <span className="text-sm text-slate-500 w-1/3 shrink-0">Mô tả</span>
            <span className="text-sm text-slate-800 text-right">
              {wedding?.description || "Chưa có mô tả"}
            </span>
          </div>
          <div className="flex justify-between items-start gap-4">
            <span className="text-sm text-slate-500 w-1/3 shrink-0">
              Ngôn ngữ
            </span>
            <span className="text-sm text-slate-800 text-right">
              {wedding?.language || "Tiếng Việt"}
            </span>
          </div>
          <div className="flex justify-between items-start gap-4">
            <span className="text-sm text-slate-500 w-1/3 shrink-0">
              Giao diện
            </span>
            <span className="text-sm text-green-600 font-medium text-right flex items-center gap-1.5 justify-end">
              Điện thoại & Máy tính
            </span>
          </div>
          <div className="flex justify-between items-start gap-4">
            <span className="text-sm text-slate-500 w-1/3 shrink-0">
              Danh mục
            </span>
            <span className="text-xs font-medium bg-green-50 text-green-600 px-2 py-0.5 rounded border border-green-100 text-right">
              {template?.category?.toUpperCase() || "KHÔNG RÕ"}
            </span>
          </div>
          <div className="flex justify-between items-start gap-4">
            <span className="text-sm text-slate-500 w-1/3 shrink-0">
              Tạo lúc
            </span>
            <span className="text-sm text-slate-800 text-right">
              {dayjs(wedding?.createdAt).format("DD/MM/YYYY HH:mm")}
            </span>
          </div>
          <div className="flex justify-between items-start gap-4">
            <span className="text-sm text-slate-500 w-1/3 shrink-0">
              Cập nhật lúc
            </span>
            <span className="text-sm text-slate-800 text-right">
              {dayjs(wedding?.updatedAt).format("DD/MM/YYYY HH:mm")}
            </span>
          </div>
        </div>
      </div>

      {/* Thông tin sự kiện */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="font-semibold text-slate-800 mb-4 pb-3 border-b border-slate-100">
          Thông tin sự kiện
        </h3>
        <div className="space-y-4">
          <div className="flex justify-between items-start gap-4">
            <span className="text-sm text-slate-500 w-1/3 shrink-0">
              Ngày cưới
            </span>
            <span className="text-sm text-slate-800 font-medium text-right">
              {wedding?.weddingDate
                ? dayjs(wedding?.weddingDate).format("DD/MM/YYYY")
                : "Chưa thiết lập"}
            </span>
          </div>
          <div className="flex justify-between items-start gap-4">
            <span className="text-sm text-slate-500 w-1/3 shrink-0">
              Giờ cưới
            </span>
            <span className="text-sm text-slate-800 font-medium text-right">
              {wedding?.weddingDate
                ? dayjs(wedding?.weddingDate).format("HH:mm")
                : "Chưa thiết lập"}
            </span>
          </div>
          <div className="flex justify-between items-start gap-4">
            <span className="text-sm text-slate-500 w-1/3 shrink-0">
              Địa điểm
            </span>
            <div className="text-sm text-slate-800 text-right">
              <p className="font-medium mb-1">
                {wedding?.location?.name || "Chưa thiết lập"}
              </p>
              <p className="text-slate-500">
                {wedding?.location?.address || ""}
              </p>
            </div>
          </div>
          <div className="flex justify-between items-start gap-4">
            <span className="text-sm text-slate-500 w-1/3 shrink-0">
              Link Google Maps
            </span>
            {wedding?.location?.mapUrl ? (
              <a
                href={wedding.location.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-indigo-600 hover:underline cursor-pointer flex items-center justify-end gap-1.5 text-right"
              >
                Xem trên Google Maps <ExternalLink size={14} />
              </a>
            ) : (
              <span className="text-sm text-slate-400 text-right">
                Chưa có link
              </span>
            )}
          </div>
          <div className="flex justify-between items-start gap-4">
            <span className="text-sm text-slate-500 w-1/3 shrink-0">
              Lời nhắn
            </span>
            <span className="text-sm text-slate-800 text-right italic">
              {wedding?.location?.note ||
                "Sự hiện diện của quý vị là niềm vinh hạnh của gia đình chúng tôi. Rất mong được đón tiếp!"}
            </span>
          </div>
        </div>
      </div>

      {/* Cài đặt hiển thị */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="font-semibold text-slate-800 mb-4 pb-3 border-b border-slate-100">
          Cài đặt hiển thị
        </h3>
        <div className="space-y-4">
          <div className="flex justify-between items-start gap-4">
            <span className="text-sm text-slate-500 w-2/3 shrink-0">
              Hiển thị form RSVP
            </span>
            <span
              className={`text-sm font-medium text-right ${themeSettings?.features?.rsvp ? "text-green-600" : "text-slate-500"}`}
            >
              {themeSettings?.features?.rsvp ? "Có" : "Không"}
            </span>
          </div>
          <div className="flex justify-between items-start gap-4">
            <span className="text-sm text-slate-500 w-2/3 shrink-0">
              Hiển thị lời chúc
            </span>
            <span
              className={`text-sm font-medium text-right ${themeSettings?.features?.guestbook ? "text-green-600" : "text-slate-500"}`}
            >
              {themeSettings?.features?.guestbook ? "Có" : "Không"}
            </span>
          </div>
          <div className="flex justify-between items-start gap-4">
            <span className="text-sm text-slate-500 w-2/3 shrink-0">
              Hiển thị quà mừng
            </span>
            <span
              className={`text-sm font-medium text-right ${themeSettings?.features?.gift ? "text-green-600" : "text-slate-500"}`}
            >
              {themeSettings?.features?.gift ? "Có" : "Không"}
            </span>
          </div>
          <div className="flex justify-between items-start gap-4">
            <span className="text-sm text-slate-500 w-2/3 shrink-0">
              Mật khẩu bảo vệ
            </span>
            <span
              className={`text-sm text-right ${wedding?.settings?.passwordProtected ? "text-amber-600 font-medium" : "text-slate-800"}`}
            >
              {wedding?.settings?.passwordProtected ? "Đã bật" : "Không"}
            </span>
          </div>
          <div className="flex justify-between items-start gap-4">
            <span className="text-sm text-slate-500 w-2/3 shrink-0">
              Google index
            </span>
            <span
              className={`text-sm font-medium text-right ${wedding?.settings?.allowSearchEngine ? "text-green-600" : "text-slate-500"}`}
            >
              {wedding?.settings?.allowSearchEngine ? "Cho phép" : "Chặn"}
            </span>
          </div>
          <div className="flex justify-between items-start gap-4">
            <span className="text-sm text-slate-500 w-2/3 shrink-0">
              Hiển thị bộ đếm ngược
            </span>
            <span
              className={`text-sm font-medium text-right ${themeSettings?.features?.countdown ? "text-green-600" : "text-slate-500"}`}
            >
              {themeSettings?.features?.countdown ? "Có" : "Không"}
            </span>
          </div>
        </div>
      </div>

      {/* Nội dung chính */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="font-semibold text-slate-800 mb-4 pb-3 border-b border-slate-100">
          Nội dung chính
        </h3>
        <div className="space-y-4">
          <div className="flex justify-between items-start gap-4">
            <span className="text-sm text-slate-500 w-2/3 shrink-0">
              Ảnh & Video tải lên
            </span>
            <span className="text-sm text-slate-800 font-medium text-right">
              {media?.length || 0} tệp
            </span>
          </div>
          <div className="flex justify-between items-start gap-4">
            <span className="text-sm text-slate-500 w-2/3 shrink-0">
              Timeline sự kiện
            </span>
            <span className="text-sm text-slate-800 font-medium text-right">
              {sections?.find((s: any) => s.type === "timeline")?.isVisible
                ? "Có hiển thị"
                : "Không"}
            </span>
          </div>
          <div className="flex justify-between items-start gap-4">
            <span className="text-sm text-slate-500 w-2/3 shrink-0">
              Album ảnh
            </span>
            <span className="text-sm text-slate-800 font-medium text-right">
              {sections?.find((s: any) => s.type === "gallery")?.isVisible
                ? "Có hiển thị"
                : "Không"}
            </span>
          </div>
          <div className="flex justify-between items-start gap-4">
            <span className="text-sm text-slate-500 w-2/3 shrink-0">
              Lời ngỏ / Story
            </span>
            <span className="text-sm text-slate-800 text-right">
              {sections?.find((s: any) => s.type === "story")?.isVisible
                ? "Đã thiết lập"
                : "Không"}
            </span>
          </div>
          <div className="flex justify-between items-start gap-4">
            <span className="text-sm text-slate-500 w-2/3 shrink-0">
              Các phân đoạn hiển thị
            </span>
            <span className="text-sm text-slate-800 text-right">
              {sections?.filter((s: any) => s.isVisible)?.length || 0} mục
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
