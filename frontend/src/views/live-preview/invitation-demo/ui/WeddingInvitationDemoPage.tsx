"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { WeddingData } from "@/entities/invitation/model/types";
import { getDemoWeddingData } from "@/entities/invitation/model/mockData";
import { TEMPLATES } from "@/entities/template/model/templates";
import { getTemplatePackage } from "@/widgets/invitation-renderer";
import { API_URL } from "@/shared/lib/config";

interface WeddingInvitationDemoPageProps {
  onBack: () => void;
  onSelect?: () => void;
}

export function WeddingInvitationDemoPage({
  onBack,
  onSelect,
}: WeddingInvitationDemoPageProps) {
  const [loading, setLoading] = useState(true);
  const [weddingData, setWeddingData] = useState<WeddingData | null>(null);
  const [isEmbed, setIsEmbed] = useState(false);
  const [guestName, setGuestName] = useState<string | undefined>();

  useEffect(() => {
    let tId: string | null = null;
    let embedMode = false;

    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      embedMode = params.get("embed") === "true";
      tId = params.get("templateId") || params.get("template") || params.get("code") || params.get("id");
      const toParam = params.get("to") || params.get("guest");
      if (toParam) setGuestName(toParam);
      setIsEmbed(embedMode);
    }

    // Xác định demo slug theo templateId
    const getDemoSlug = (code: string | null) => {
      switch (code) {
        case "temp_1":
          return "vanan-thibinh";
        case "minimal-green":
          return "minh-lan";
        case "classic-white":
          return "hoang-yen";
        case "love-story":
          return "love-story-demo";
        case "eternal-flower":
          return "royal-demo";
        case "black-elegant":
          return "lavender-demo";
        default:
          return "vanan-thibinh";
      }
    };

    const demoSlug = getDemoSlug(tId);
    setLoading(true);

    // Dữ liệu demo dùng chung
    const mockWeddingData = getDemoWeddingData(tId || "temp_1");
    mockWeddingData.slug = demoSlug;

    // Fetch wedding details with fast timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1200);

    fetch(`${API_URL}/api/weddings/${demoSlug}`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) {
          // Fallback sang vanan-thibinh nếu slug kia không có
          return fetch(`${API_URL}/api/weddings/vanan-thibinh`, { signal: controller.signal }).then((r) => {
            if (!r.ok) throw new Error("Not Found");
            return r.json();
          });
        }
        return res.json();
      })
      .then((data) => {
        if (data.success && data.data) {
          const finalData = data.data;
          // Ép buộc render theo templateId trong URL để test/preview đúng mẫu
          if (tId) {
            finalData.templateId = tId;
          }
          setWeddingData(finalData);
        } else {
          throw new Error("Invalid format");
        }
      })
      .catch((err) => {
        setWeddingData(mockWeddingData);
      })
      .finally(() => {
        clearTimeout(timeoutId);
        setLoading(false);
      });

    return () => {
      controller.abort();
      clearTimeout(timeoutId);
    };
  }, []);

  if (loading || !weddingData) {
    return (
      <div className="min-h-screen bg-[#fdf6ef] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-10 h-10 animate-spin text-[#8b3a52]" />
        <p className="text-sm font-medium text-[#7a5c4f] tracking-wide">
          Đang tải bản xem thử...
        </p>
      </div>
    );
  }

  const getThemeClass = (code: string) => {
    const tpl = TEMPLATES.find((t) => t.code === code);
    return tpl ? tpl.themeClass : "theme-pink";
  };

  const currentTheme = getThemeClass(weddingData.templateId);
  const tplPackage = getTemplatePackage(weddingData.templateId);
  const LiveView = tplPackage.LiveView;

  return (
    <div className={`min-h-screen transition-all duration-500 ${currentTheme}`}>
      {/* Render đúng template package tương ứng */}
      <LiveView
        weddingData={weddingData}
        guestName={guestName}
        previewMode={isEmbed ? "invitation" : undefined}
      />
    </div>
  );
}
