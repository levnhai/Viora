'use client';

import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Loader2 } from "lucide-react";

import { WeddingData } from "@/entities/invitation/model/types";
import { TEMPLATES } from "@/entities/template/model/templates";
import { getTemplatePackage } from "@/entities/template/model/registry";
import { API_URL } from "@/shared/lib/config";
import { getDemoWeddingData } from "@/entities/invitation/model/mockData";

export function WeddingInvitationPage() {
  const params = useParams();
  const weddingSlug = params?.weddingSlug as string;
  const searchParams = useSearchParams();
  const guestName = searchParams?.get("to") || undefined;
  const isEmbed = searchParams?.get("embed") === "true";
  const customGroom = searchParams?.get("groom");
  const customBride = searchParams?.get("bride");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [weddingData, setWeddingData] = useState<WeddingData | null>(null);

  useEffect(() => {
    if (!weddingSlug) return;

    setLoading(true);
    setError(null);

    // Fetch wedding details
    fetch(`${API_URL}/api/weddings/${weddingSlug}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Không tìm thấy thiệp cưới hoặc lỗi máy chủ!");
        }
        return res.json();
      })
      .then((data) => {
        if (data.success && data.data) {
          const wd = { ...data.data };
          // Ensure musicUrl is at the root level for templates to consume
          if (wd.themeSettings?.musicUrl) {
            wd.musicUrl = wd.themeSettings.musicUrl;
          }
          if (customGroom) wd.groomName = customGroom;
          if (customBride) wd.brideName = customBride;
          setWeddingData(wd);
        } else {
          throw new Error("Không lấy được thông tin đám cưới!");
        }
      })
      .catch((err) => {
        // Nếu ở chế độ embed hoặc slug demo mà DB 404, fallback sang mock data chứ không hiện lỗi hỏng
        if (isEmbed || weddingSlug.includes("demo") || weddingSlug.includes("vanan") || weddingSlug.includes("leminhhai")) {
          const fallbackData = getDemoWeddingData("temp_1");
          if (customGroom) fallbackData.groomName = customGroom;
          if (customBride) fallbackData.brideName = customBride;
          setWeddingData(fallbackData);
        } else {
          setError(err.message || "Đã xảy ra lỗi kết nối!");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [weddingSlug, isEmbed, customGroom, customBride]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fdf6ef] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-10 h-10 animate-spin text-[#8b3a52]" />
        <p className="text-sm font-medium text-[#7a5c4f] tracking-wide animate-pulse">
          Đang tải thiệp cưới...
        </p>
      </div>
    );
  }

  if (error || !weddingData) {
    return (
      <div className="min-h-screen bg-[#fdf6ef] flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-white rounded-3xl p-8 max-w-md shadow-md border border-[#c9828e]/20 space-y-5">
          <div className="text-4xl">💔</div>
          <h2
            className="text-2xl font-semibold text-[#8b3a52]"
            style={{ fontFamily: "'EB Garamond', serif" }}
          >
            Không tìm thấy thiệp cưới
          </h2>
          <p className="text-sm text-[#7a5c4f] leading-relaxed">
            Đường dẫn thiệp mời không tồn tại hoặc đã hết hạn lưu trữ. Vui lòng
            kiểm tra lại liên kết.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-[#8b3a52] text-white rounded-xl text-sm font-medium hover:opacity-95 transition-opacity border-0"
          >
            Quay lại trang chủ
          </Link>
        </div>
      </div>
    );
  }

  const getThemeClass = (code: string) => {
    const tpl = TEMPLATES.find(t => t.code === code);
    return tpl ? tpl.themeClass : "theme-pink";
  };

  const currentTheme = getThemeClass(weddingData.templateId);
  const tplPackage = getTemplatePackage(weddingData.templateId);
  const LiveView = tplPackage.LiveView;

  return (
    <div className={`min-h-screen transition-all duration-500 ${currentTheme}`}>
      <LiveView weddingData={weddingData} guestName={guestName} />
    </div>
  );
}
