"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { WeddingData } from "@/entities/invitation/model/types";
import { TEMPLATES } from "@/entities/template/model/templates";
import { getTemplatePackage } from "@/entities/template/model/registry";
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

  useEffect(() => {
    let tId: string | null = null;
    let embedMode = false;

    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      embedMode = params.get("embed") === "true";
      tId = params.get("templateId");
      setIsEmbed(embedMode);
    }

    // Xác định demo slug theo templateId
    const getDemoSlug = (id: string | null) => {
      switch (id) {
        case "1":
          return "vanan-thibinh";
        case "2":
          return "minh-lan";
        case "3":
          return "hoang-yen";
        case "4":
          return "love-story-demo";
        case "5":
          return "royal-demo";
        case "6":
          return "lavender-demo";
        default:
          return "vanan-thibinh";
      }
    };

    const demoSlug = getDemoSlug(tId);
    setLoading(true);

    // Mock data dự phòng khi DB chưa có dữ liệu demo (404)
    const mockWeddingData: WeddingData = {
      slug: demoSlug || "demo",
      templateId: 1,
      groomName: "Văn An",
      brideName: "Thị Bình",
      weddingDate: "2024-12-31T00:00:00.000Z",
      events: [
        {
          title: "Lễ Tiệc Cưới",
          time: "11:00",
          date: "31/12/2024",
          locationName: "Trung tâm tiệc cưới Trống Đồng",
          address: "Số 1 Trần Đăng Ninh, Cầu Giấy, Hà Nội",
        },
      ],
      timeline: [
        {
          year: "2020",
          title: "Lần đầu gặp gỡ",
          description: "Chúng mình gặp nhau tại một quán cà phê nhỏ.",
          imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=800&fit=crop&auto=format"
        },
      ],
      galleryImages: [
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=800&fit=crop&auto=format",
        "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&h=800&fit=crop&auto=format",
        "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=600&h=800&fit=crop&auto=format"
      ],
    };

    // Fetch wedding details
    fetch(`${API_URL}/api/weddings/${demoSlug}`)
      .then((res) => {
        if (!res.ok) {
          // Fallback sang vanan-thibinh nếu slug kia không có
          return fetch(`${API_URL}/api/weddings/vanan-thibinh`).then((r) => {
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
            finalData.templateId = Number(tId);
          }
          setWeddingData(finalData);
        } else {
          throw new Error("Invalid format");
        }
      })
      .catch((err) => {
        console.warn("Lỗi khi tải demo (có thể DB trống), dùng mock data:", err);
        const fallbackData = { ...mockWeddingData };
        if (tId) {
          fallbackData.templateId = Number(tId);
        }
        setWeddingData(fallbackData);
      })
      .finally(() => setLoading(false));
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

  const getThemeClass = (id: number) => {
    const tpl = TEMPLATES.find((t) => t.id === id);
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
        previewMode={isEmbed ? "invitation" : undefined}
      />
    </div>
  );
}
