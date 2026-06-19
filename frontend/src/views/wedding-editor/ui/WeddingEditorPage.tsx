'use client';

import { useState, useEffect, useRef } from "react";
import { useSearchParams, useParams, useRouter } from "next/navigation";
import { 
  Heart, Save, Loader2, ArrowLeft, Paintbrush, FileText, 
  MapPin, Image as ImageIcon, Gift, Eye, Smartphone, Monitor, Music, Check, Copy, Lock
} from "lucide-react";
import confetti from "canvas-confetti";
import { TEMPLATES } from "@/entities/template/model/templates";

// Invitation components for preview
import { EnvelopeIntro } from "@/entities/invitation/ui/EnvelopeIntro";
import { InvitationCover } from "@/entities/invitation/ui/InvitationCover";
import { CoupleSpotlight } from "@/entities/invitation/ui/CoupleSpotlight";
import { EventInfo } from "@/entities/invitation/ui/EventInfo";
import { VenueMap } from "@/entities/invitation/ui/VenueMap";
import { GiftRegistry } from "@/entities/invitation/ui/GiftRegistry";
import { LoveStoryTimeline } from "@/entities/invitation/ui/LoveStoryTimeline";
import { GalleryGrid } from "@/entities/invitation/ui/GalleryGrid";
import { SectionHeading } from "@/entities/invitation/ui/SectionHeading";
import { WeddingData, WeddingEvent } from "@/entities/invitation/model/types";

interface WeddingEditorPageProps {
  isEditMode?: boolean;
}

export function WeddingEditorPage({ isEditMode = false }: WeddingEditorPageProps) {
  const router = useRouter();
  const navigate = (path: string) => router.push(path);
  const params = useParams();
  const weddingSlug = params?.weddingSlug as string;
  const searchParams = useSearchParams();
  const initialTemplateId = Number(searchParams?.get("templateId")) || 1;
  const initialPlan = searchParams?.get("plan") || "Phổ biến";

  // Tab State
  const [activeTab, setActiveTab] = useState<"design" | "info" | "events" | "gallery" | "gift">("design");
  
  // Preview Mode State (To toggle envelope vs inner invitation)
  const [previewMode, setPreviewMode] = useState<"envelope" | "invitation">("envelope");
  const [previewDevice, setPreviewDevice] = useState<"mobile" | "desktop">("mobile");

  // Authentication & Request State
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("register");
  const [authForm, setAuthForm] = useState({ username: "", password: "", confirmPassword: "" });
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);

  // Core Wedding Data State
  const [weddingData, setWeddingData] = useState<WeddingData>({
    slug: "",
    templateId: initialTemplateId,
    groomName: "Nguyễn Thế Bảo",
    brideName: "Trần Ngọc Ánh",
    groomShortName: "Thế Bảo",
    brideShortName: "Ngọc Ánh",
    groomTitle: "Trưởng Nam",
    brideTitle: "Út Nữ",
    displayOrder: "groom_first",
    isCoverImageVisible: true,
    groomFatherName: "Nguyễn Văn Hùng",
    groomMotherName: "Lê Thị Mai",
    brideFatherName: "Trần Văn Nam",
    brideMotherName: "Phạm Thị Lan",
    weddingDate: new Date(Date.now() + 60 * 24 * 3600 * 1000).toISOString().substring(0, 10),
    weddingTime: "18:00",
    events: [
      { 
        title: "LỄ VU QUY", 
        time: "09:00", 
        date: new Date(Date.now() + 60 * 24 * 3600 * 1000).toLocaleDateString("vi-VN"), 
        locationName: "Tư gia nhà gái", 
        address: "123 Đường Nguyễn Trãi, Quận 1, TP. HCM",
        mapUrl: "https://maps.google.com"
      },
      { 
        title: "TIỆC CHIÊU ĐÃI", 
        time: "18:00", 
        date: new Date(Date.now() + 60 * 24 * 3600 * 1000).toLocaleDateString("vi-VN"), 
        locationName: "Nhà hàng tiệc cưới Diamond", 
        address: "456 Đường Nguyễn Huệ, Quận 1, TP. HCM",
        mapUrl: "https://maps.google.com"
      }
    ],
    timeline: [
      { 
        year: "2024", 
        title: "Lần đầu gặp gỡ", 
        description: "Chúng mình tình cờ gặp nhau tại một quán cà phê nhỏ vào một ngày mưa gió...", 
        imageUrl: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&h=400&fit=crop&auto=format" 
      }
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1519225495810-7517cbd14bc4?w=800&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&h=600&fit=crop&auto=format"
    ],
    giftInfo: {
      groomBankName: "",
      groomAccountNumber: "",
      groomAccountName: "",
      groomQrUrl: "",
      brideBankName: "",
      brideAccountNumber: "",
      brideAccountName: "",
      brideQrUrl: ""
    },
    contactInfo: {
      groomPhone: "",
      bridePhone: "",
      email: ""
    }
  });

  // Action States
  const [loading, setLoading] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [publishedSlug, setPublishedSlug] = useState<string | null>(null);

  // SaaS Gói dịch vụ States
  const [userPlan, setUserPlan] = useState<"standard" | "premium">(
    (localStorage.getItem("userPlan") as "standard" | "premium") || "standard"
  );
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  // Giao diện tối tùy chỉnh States
  const [editorView, setEditorView] = useState<"edit" | "preview">("edit");
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    basic: true,
    cover: false,
    events: false,
    gallery: false,
    gift: false,
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Fetch wedding data if in Edit Mode
  useEffect(() => {
    if (isEditMode && weddingSlug) {
      setLoading(true);
      fetch(`http://localhost:8080/api/weddings/${weddingSlug}`)
        .then((res) => {
          if (!res.ok) throw new Error("Không thể tải thông tin thiệp cưới!");
          return res.json();
        })
        .then((data) => {
          if (data.success && data.data) {
            setWeddingData(data.data);
          }
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }
  }, [isEditMode, weddingSlug]);

  // Sync state for VietQR URLs when bank data changes
  useEffect(() => {
    setWeddingData(prev => {
      const groomBank = prev.giftInfo?.groomBankName?.trim();
      const groomAcc = prev.giftInfo?.groomAccountNumber?.trim();
      const brideBank = prev.giftInfo?.brideBankName?.trim();
      const brideAcc = prev.giftInfo?.brideAccountNumber?.trim();

      const groomQr = groomBank && groomAcc 
        ? `https://img.vietqr.io/image/${groomBank}-${groomAcc}-compact.png?amount=200000&addInfo=Chuc%20mung%20hanh%20phuc` 
        : "";
      const brideQr = brideBank && brideAcc 
        ? `https://img.vietqr.io/image/${brideBank}-${brideAcc}-compact.png?amount=200000&addInfo=Chuc%20mung%20hanh%20phuc` 
        : "";

      if (prev.giftInfo?.groomQrUrl === groomQr && prev.giftInfo?.brideQrUrl === brideQr) {
        return prev;
      }

      return {
        ...prev,
        giftInfo: {
          ...prev.giftInfo,
          groomQrUrl: groomQr,
          brideQrUrl: brideQr
        }
      };
    });
  }, [
    weddingData.giftInfo?.groomBankName, 
    weddingData.giftInfo?.groomAccountNumber,
    weddingData.giftInfo?.brideBankName,
    weddingData.giftInfo?.brideAccountNumber
  ]);

  // Form input change handlers
  const updateField = (path: string[], value: any) => {
    setWeddingData((prev: any) => {
      const copy = { ...prev };
      let current = copy;
      for (let i = 0; i < path.length - 1; i++) {
        if (!current[path[i]]) current[path[i]] = {};
        current = current[path[i]];
      }
      current[path[path.length - 1]] = value;
      return copy;
    });
  };

  const updateEvent = (index: number, field: keyof WeddingEvent, value: string) => {
    setWeddingData(prev => {
      const updatedEvents = [...prev.events];
      updatedEvents[index] = { ...updatedEvents[index], [field]: value };
      return { ...prev, events: updatedEvents };
    });
  };

  const handlePublish = async () => {
    if (!weddingData.groomName.trim() || !weddingData.brideName.trim()) {
      alert("Vui lòng nhập đầy đủ tên Chú rể và Cô dâu!");
      return;
    }

    // Kiểm tra giới hạn gói cước SaaS
    const selectedTemplate = TEMPLATES.find(t => t.id === weddingData.templateId) || TEMPLATES[0];
    if (selectedTemplate.tier === "premium" && userPlan === "standard") {
      setShowUpgradeModal(true);
      return;
    }

    // Tự sinh slug từ tên nếu chưa nhập
    let slug = weddingData.slug.trim();
    if (!slug) {
      const normalizedGroom = weddingData.groomName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "");
      const normalizedBride = weddingData.brideName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "");
      slug = `${normalizedGroom}-${normalizedBride}`;
    }

    // Check Authentication
    if (!token) {
      setShowAuthModal(true);
      return;
    }

    setPublishing(true);
    setError(null);

    try {
      const url = isEditMode 
        ? `http://localhost:8080/api/weddings/${weddingSlug}` 
        : "http://localhost:8080/api/weddings";
      const method = isEditMode ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ ...weddingData, slug })
      });

      const resData = await response.json();
      if (!response.ok) {
        throw new Error(resData.message || "Xuất bản thất bại!");
      }

      setPublishedSlug(slug);
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (err: any) {
      setError(err.message || "Đã xảy ra lỗi kết nối đến máy chủ!");
    } finally {
      setPublishing(false);
    }
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authForm.username.trim() || !authForm.password.trim()) {
      setAuthError("Vui lòng điền đầy đủ các trường thông tin!");
      return;
    }
    if (authMode === "register" && authForm.password !== authForm.confirmPassword) {
      setAuthError("Mật khẩu xác nhận không khớp!");
      return;
    }

    setAuthLoading(true);
    setAuthError(null);

    try {
      const endpoint = authMode === "login" ? "login" : "register";
      const response = await fetch(`http://localhost:8080/api/auth/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: authForm.username, password: authForm.password })
      });

      const resData = await response.json();
      if (!response.ok) {
        throw new Error(resData.message || "Xác thực thất bại!");
      }

      const { token: userToken, role, weddingSlug: userSlug } = resData.data;
      localStorage.setItem("token", userToken);
      localStorage.setItem("role", role);
      localStorage.setItem("username", authForm.username);
      if (userSlug) localStorage.setItem("weddingSlug", userSlug);

      setToken(userToken);
      setShowAuthModal(false);
      
      // Auto trigger publish with the newly active token
      setTimeout(() => {
        handlePublish();
      }, 100);
    } catch (err: any) {
      setAuthError(err.message || "Không thể thực hiện yêu cầu!");
    } finally {
      setAuthLoading(false);
    }
  };

  const selectedTemplate = TEMPLATES.find(t => t.id === weddingData.templateId) || TEMPLATES[0];
  const currentTheme = selectedTemplate.themeClass;
  const templateSchema = selectedTemplate.schema;

  return (
    <div className="min-h-screen bg-[#0c0a09] text-slate-100 flex flex-col font-sans select-none antialiased">
      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <header className="bg-[#0c0a09]/95 border-b border-[#292524] backdrop-blur-md sticky top-0 z-40 px-4 h-16 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate("/")} 
            className="p-2 hover:bg-[#1c1917] rounded-full transition-colors text-slate-400 hover:text-white cursor-pointer border-0 bg-transparent flex items-center justify-center"
          >
            <ArrowLeft size={18} />
          </button>
          
          <div className="h-4 w-px bg-[#292524] hidden sm:block" />
          
          {/* Template Badge */}
          <div className="flex items-center gap-2 bg-gradient-to-r from-red-950 to-red-900 border border-red-800/40 px-3 py-1.5 rounded-full text-xs font-semibold text-red-100 shadow-inner">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <span>{TEMPLATES.find(t => t.id === weddingData.templateId)?.name || "Mẫu thiệp"}</span>
            <span className="hidden xs:inline text-[10px] text-red-300/80 font-normal">/ {weddingData.groomShortName || "Chú rể"} - {weddingData.brideShortName || "Cô dâu"}</span>
          </div>

          {/* Language Pill */}
          <div className="hidden md:flex items-center gap-1 bg-[#1c1917] border border-[#292524] px-3 py-1.5 rounded-full text-[11px] text-slate-300 font-medium">
            <span>Tiếng Việt</span>
            <span className="text-[8px] text-slate-500">▼</span>
          </div>
        </div>

        {/* Edit / Preview Tabs (Mobile Only) */}
        <div className="flex lg:hidden bg-[#1c1917] p-1 rounded-full border border-[#292524]">
          <button
            onClick={() => setEditorView("edit")}
            className={`px-5 py-1.5 rounded-full text-xs font-semibold transition-all border-0 cursor-pointer ${
              editorView === "edit"
                ? "bg-[#292524] text-white shadow-xs"
                : "bg-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            Chỉnh sửa
          </button>
          <button
            onClick={() => setEditorView("preview")}
            className={`px-5 py-1.5 rounded-full text-xs font-semibold transition-all border-0 cursor-pointer ${
              editorView === "preview"
                ? "bg-[#292524] text-white shadow-xs"
                : "bg-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            Xem trước
          </button>
        </div>

        {/* Plan Status & Publish Button */}
        <div className="flex items-center gap-3">
          <span className={`hidden sm:inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
            userPlan === "premium"
              ? "bg-amber-950 text-amber-300 border-amber-800/50"
              : "bg-slate-900 text-slate-400 border-slate-800"
          }`}>
            Gói: {userPlan === "premium" ? "Cao cấp" : "Phổ biến"}
          </span>

          <button
            onClick={handlePublish}
            disabled={publishing}
            className="bg-[#db2777] hover:bg-[#be185d] text-white px-5 py-2 rounded-full text-xs font-semibold hover:opacity-95 active:scale-95 transition-all disabled:opacity-50 flex items-center gap-1.5 cursor-pointer border-0 shadow-md font-sans"
          >
            {publishing ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Save size={14} />
            )}
            <span>Xuất bản</span>
          </button>
        </div>
      </header>

      {/* ── MAIN WORKSPACE ─────────────────────────────────────────────────── */}
      <div className="flex-1 overflow-hidden bg-[#0c0a09] flex flex-col lg:flex-row">
        
        {/* EDIT PANEL */}
        <div className={`w-full lg:w-[450px] xl:w-[550px] lg:flex-shrink-0 lg:border-r border-[#292524] overflow-y-auto h-full ${editorView === "edit" ? "block" : "hidden lg:block"}`}>
          <div className="w-full mx-auto px-4 py-8 space-y-6">
            
            {/* ACCORDION 1: THÔNG TIN CƠ BẢN */}
            <div className="bg-[#151515] rounded-xl overflow-hidden shadow-xs border border-transparent hover:border-[#2a2a2a] transition-all">
              <div 
                onClick={() => toggleSection("basic")}
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-[#1a1a1a] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-500 w-3 text-center">{openSections.basic ? "v" : ">"}</span>
                  <Heart size={14} className="text-slate-400" />
                  <span className="text-sm font-medium text-slate-200">
                    Thông tin cơ bản
                  </span>
                </div>
              </div>

              {openSections.basic && (
                <div className="p-5 border-t border-[#222] space-y-5 bg-[#151515] text-left">
                  {/* Họ tên chú rể & cô dâu */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-slate-300">Họ tên chú rể</label>
                      <input 
                        type="text" 
                        required
                        value={weddingData.groomName} 
                        onChange={(e) => updateField(["groomName"], e.target.value)}
                        placeholder="VD. Nguyễn Thế Bảo"
                        className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-slate-500 transition-colors placeholder:text-slate-600"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-slate-300">Họ tên cô dâu</label>
                      <input 
                        type="text" 
                        required
                        value={weddingData.brideName} 
                        onChange={(e) => updateField(["brideName"], e.target.value)}
                        placeholder="VD. Trần Ngọc Ánh"
                        className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-slate-500 transition-colors placeholder:text-slate-600"
                      />
                    </div>
                  </div>

                  {/* Tên ngắn chú rể & cô dâu */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-slate-300">Tên ngắn chú rể</label>
                      <div className="relative">
                        <input 
                          type="text" 
                          value={weddingData.groomShortName || ""} 
                          onChange={(e) => updateField(["groomShortName"], e.target.value)}
                          className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-slate-500 transition-colors"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-slate-300">Tên ngắn cô dâu</label>
                      <div className="relative">
                        <input 
                          type="text" 
                          value={weddingData.brideShortName || ""} 
                          onChange={(e) => updateField(["brideShortName"], e.target.value)}
                          className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-slate-500 transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Danh xưng chú rể & cô dâu */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-slate-300">Danh xưng chú rể</label>
                      <input 
                        type="text" 
                        value={weddingData.groomTitle || ""} 
                        onChange={(e) => updateField(["groomTitle"], e.target.value)}
                        placeholder="Trưởng Nam"
                        className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-slate-500 transition-colors placeholder:text-slate-600"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-slate-300">Danh xưng cô dâu</label>
                      <input 
                        type="text" 
                        value={weddingData.brideTitle || ""} 
                        onChange={(e) => updateField(["brideTitle"], e.target.value)}
                        placeholder="Út Nữ"
                        className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-slate-500 transition-colors placeholder:text-slate-600"
                      />
                    </div>
                  </div>

                  {/* Thứ tự hiển thị */}
                  <div className="space-y-2 pt-2">
                    <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-3">Thứ tự hiển thị</label>
                    <div className="grid grid-cols-2 gap-4 bg-[#111] p-1 rounded-xl border border-[#222]">
                      <button
                        type="button"
                        onClick={() => updateField(["displayOrder"], "groom_first")}
                        className={`py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                          weddingData.displayOrder !== "bride_first"
                            ? "bg-[#222] text-white shadow-sm"
                            : "bg-transparent text-slate-500 hover:text-slate-300 border-transparent"
                        } border-0`}
                      >
                        Nhà trai trước
                      </button>
                      <button
                        type="button"
                        onClick={() => updateField(["displayOrder"], "bride_first")}
                        className={`py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                          weddingData.displayOrder === "bride_first"
                            ? "bg-[#222] text-white shadow-sm"
                            : "bg-transparent text-slate-500 hover:text-slate-300 border-transparent"
                        } border-0`}
                      >
                        Nhà gái trước
                      </button>
                    </div>
                    <p className="text-[10px] text-slate-600 italic mt-2 text-center">Hiển thị tên chú rể và nhà trai trước trên thiệp</p>
                  </div>

                  {/* Thông tin bố mẹ hai bên */}
                  <div className="border-t border-[#292524]/60 pt-4 space-y-4">
                    <h4 className="text-2xs uppercase tracking-wider text-slate-400 font-bold">Thông tin phụ huynh hai bên</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Nhà trai */}
                      <div className="space-y-3 p-4 rounded-xl bg-[#0c0a09]/50 border border-[#292524]">
                        <span className="text-[10px] font-bold text-[#db2777] uppercase tracking-wide">Nhà Trai</span>
                        <div className="space-y-2">
                          <input 
                            type="text" 
                            placeholder="Họ tên Bố chú rể"
                            value={weddingData.groomFatherName || ""} 
                            onChange={(e) => updateField(["groomFatherName"], e.target.value)}
                            className="w-full bg-[#0c0a09] border border-[#292524] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#db2777]"
                          />
                          <input 
                            type="text" 
                            placeholder="Họ tên Mẹ chú rể"
                            value={weddingData.groomMotherName || ""} 
                            onChange={(e) => updateField(["groomMotherName"], e.target.value)}
                            className="w-full bg-[#0c0a09] border border-[#292524] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#db2777]"
                          />
                        </div>
                      </div>

                      {/* Nhà gái */}
                      <div className="space-y-3 p-4 rounded-xl bg-[#0c0a09]/50 border border-[#292524]">
                        <span className="text-[10px] font-bold text-[#db2777] uppercase tracking-wide">Nhà Gái</span>
                        <div className="space-y-2">
                          <input 
                            type="text" 
                            placeholder="Họ tên Bố cô dâu"
                            value={weddingData.brideFatherName || ""} 
                            onChange={(e) => updateField(["brideFatherName"], e.target.value)}
                            className="w-full bg-[#0c0a09] border border-[#292524] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#db2777]"
                          />
                          <input 
                            type="text" 
                            placeholder="Họ tên Mẹ cô dâu"
                            value={weddingData.brideMotherName || ""} 
                            onChange={(e) => updateField(["brideMotherName"], e.target.value)}
                            className="w-full bg-[#0c0a09] border border-[#292524] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#db2777]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Số điện thoại liên lạc */}
                  <div className="border-t border-[#292524]/60 pt-4 space-y-3">
                    <h4 className="text-2xs uppercase tracking-wider text-slate-400 font-bold">Số điện thoại liên hệ</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <input 
                          type="tel" 
                          placeholder="SĐT chú rể"
                          value={weddingData.contactInfo?.groomPhone || ""} 
                          onChange={(e) => updateField(["contactInfo", "groomPhone"], e.target.value)}
                          className="w-full bg-[#0c0a09] border border-[#292524] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#db2777]"
                        />
                      </div>
                      <div>
                        <input 
                          type="tel" 
                          placeholder="SĐT cô dâu"
                          value={weddingData.contactInfo?.bridePhone || ""} 
                          onChange={(e) => updateField(["contactInfo", "bridePhone"], e.target.value)}
                          className="w-full bg-[#0c0a09] border border-[#292524] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#db2777]"
                        />
                      </div>
                    </div>
                  </div>

                </div>
              )}
            </div>

            {/* ACCORDION 2: ẢNH ĐẦU THIỆP */}
            {templateSchema.cover.hasCoverImage && (
              <div className="bg-[#151515] rounded-xl overflow-hidden shadow-xs border border-transparent hover:border-[#2a2a2a] transition-all">
              <div 
                onClick={() => toggleSection("cover")}
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-[#1a1a1a] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-500 w-3 text-center">{openSections.cover ? "v" : ">"}</span>
                  <ImageIcon size={14} className="text-slate-400" />
                  <span className="text-sm font-medium text-slate-200">
                    Ảnh đầu thiệp
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
                    <span className="text-[10px] text-slate-400 font-medium">Hiện</span>
                    <button
                      type="button"
                      onClick={() => updateField(["isCoverImageVisible"], !weddingData.isCoverImageVisible)}
                      className={`w-9 h-5 rounded-full p-0.5 border-0 cursor-pointer transition-colors ${
                        weddingData.isCoverImageVisible !== false ? "bg-[#db2777]" : "bg-[#292524]"
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                        weddingData.isCoverImageVisible !== false ? "translate-x-4" : "translate-x-0"
                      }`} />
                    </button>
                  </div>
                </div>
              </div>

              {openSections.cover && (
                <div className="p-6 border-t border-[#222] bg-[#151515] text-center">
                  <span className="text-xs font-medium text-slate-400 block mb-4">Ảnh đầu thiệp</span>
                  <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-[#111] space-y-4">
                    <div className="relative w-32 aspect-[3/4] bg-[#0a0a0a] rounded-xl border border-[#222] flex items-center justify-center overflow-hidden shadow-inner">
                      {weddingData.galleryImages?.[0] ? (
                        <img src={weddingData.galleryImages[0]} alt="Cover" className="w-full h-full object-cover" />
                      ) : (
                        <ImageIcon size={24} className="text-[#333]" />
                      )}
                    </div>
                    
                    <div className="w-full max-w-sm space-y-1.5 text-left">
                      <input
                        type="text"
                        value={weddingData.galleryImages?.[0] || ""}
                        onChange={(e) => {
                          const updated = [...weddingData.galleryImages];
                          updated[0] = e.target.value;
                          updateField(["galleryImages"], updated);
                        }}
                        placeholder="Link ảnh bìa thiệp..."
                        className="w-full bg-[#151515] border border-[#333] rounded-lg px-3 py-2 text-xs text-center text-white outline-none focus:border-slate-500 placeholder:text-[#555]"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        const link = prompt("Nhập liên kết hình ảnh mới cho ảnh bìa:");
                        if (link) {
                          const updated = [...weddingData.galleryImages];
                          updated[0] = link;
                          updateField(["galleryImages"], updated);
                        }
                      }}
                      className="bg-[#db2777]/10 hover:bg-[#db2777]/20 text-[#db2777] px-5 py-2 rounded-xl text-xs font-semibold transition-all border border-[#db2777]/30 cursor-pointer font-sans"
                    >
                      Tải ảnh mới
                    </button>
                    
                    <p className="text-[10px] text-slate-600">Hỗ trợ các định dạng .JPG, .PNG, .GIF, .WebP, .HEIC</p>
                  </div>
                </div>
              )}
            </div>
            )}

            {/* ACCORDION 3: THIẾT KẾ & CHỌN MẪU */}
            <div className="bg-[#1c1917] border border-[#292524] rounded-2xl overflow-hidden shadow-xs">
              <div 
                onClick={() => toggleSection("design")}
                className="flex items-center justify-between p-5 cursor-pointer hover:bg-[#292524]/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Paintbrush size={18} className="text-[#db2777]" />
                  <span className="text-sm font-semibold tracking-wide" style={{ fontFamily: "'EB Garamond', serif", fontSize: "1.1rem" }}>
                    Chọn mẫu thiệp cưới
                  </span>
                </div>
                <span className="text-xs text-slate-500">{openSections.design ? "▲" : "▼"}</span>
              </div>

              {openSections.design && (
                <div className="p-6 border-t border-[#292524] space-y-6 bg-[#1c1917]/50 text-left">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {TEMPLATES.map((t) => {
                      const isLocked = t.tier === "premium" && userPlan === "standard";
                      return (
                        <button
                          key={t.id}
                          onClick={() => updateField(["templateId"], t.id)}
                          className={`p-3 rounded-xl border text-left flex flex-col gap-3.5 transition-all cursor-pointer bg-[#1c1917] relative overflow-hidden ${
                            weddingData.templateId === t.id 
                              ? "border-[#db2777] shadow-lg ring-1 ring-[#db2777]/40 bg-[#292524]/20" 
                              : "border-[#292524] hover:border-[#db2777]/40"
                          }`}
                        >
                          {/* Plan Badge */}
                          <span className={`absolute top-3 right-3 px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider z-10 ${
                            t.tier === "premium"
                              ? "bg-amber-600 text-white"
                              : "bg-slate-700 text-white"
                          }`}>
                            {t.tier === "premium" ? "Cao cấp" : "Phổ biến"}
                          </span>

                          <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden shadow-sm border border-[#292524]/50">
                            <img src={t.preview} alt={t.name} className="w-full h-full object-cover" />
                            {isLocked && (
                              <div className="absolute inset-0 bg-black/55 backdrop-blur-xs flex items-center justify-center text-white">
                                <div className="flex flex-col items-center gap-1.5">
                                  <Lock size={14} className="text-white animate-pulse" />
                                  <span className="text-[9px] font-medium tracking-wide">Yêu cầu VIP</span>
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="flex items-center justify-between w-full">
                            <div>
                              <p className="text-xs font-semibold text-white">{t.name}</p>
                              <p className="text-[10px] text-slate-400 mt-0.5">{t.style}</p>
                            </div>
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: t.accentColor }} />
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="border-t border-[#292524] pt-5 space-y-2">
                    <h4 className="text-2xs uppercase tracking-wider text-slate-400 font-bold">Đường dẫn thiệp mời (Slug)</h4>
                    <div className="flex rounded-xl border border-[#292524] overflow-hidden bg-[#0c0a09] focus-within:border-[#db2777] transition-colors">
                      <span className="px-3.5 py-3 text-xs text-slate-500 bg-[#1c1917] border-r border-[#292524] select-none">thieponline.vn/w/</span>
                      <input 
                        type="text" 
                        placeholder="vd: thebao-ngocanh"
                        value={weddingData.slug}
                        onChange={(e) => updateField(["slug"], e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                        className="flex-1 px-4 py-3 text-xs outline-none bg-transparent text-white"
                      />
                    </div>
                    <p className="text-[10px] text-slate-500 italic">Nếu để trống, hệ thống sẽ tự động tạo đường dẫn theo tên hai bạn.</p>
                  </div>
                </div>
              )}
            </div>

            {/* ACCORDION 4: SỰ KIỆN CHÍNH */}
            <div className="bg-[#1c1917] border border-[#292524] rounded-2xl overflow-hidden shadow-xs">
              <div 
                onClick={() => toggleSection("events")}
                className="flex items-center justify-between p-5 cursor-pointer hover:bg-[#292524]/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <MapPin size={18} className="text-[#db2777]" />
                  <span className="text-sm font-semibold tracking-wide" style={{ fontFamily: "'EB Garamond', serif", fontSize: "1.1rem" }}>
                    Sự kiện chính & Bản đồ
                  </span>
                </div>
                <span className="text-xs text-slate-500">{openSections.events ? "▲" : "▼"}</span>
              </div>

              {openSections.events && (
                <div className="p-6 border-t border-[#292524] space-y-6 bg-[#1c1917]/50 text-left">
                  {/* Ngày cưới tổng thể */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-2xs uppercase tracking-wider text-slate-400 font-semibold">Ngày cưới tổng thể *</label>
                      <input 
                        type="date" 
                        required
                        value={weddingData.weddingDate ? weddingData.weddingDate.split("T")[0] : ""} 
                        onChange={(e) => updateField(["weddingDate"], e.target.value)}
                        className="w-full bg-[#0c0a09] border border-[#292524] rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#db2777]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-2xs uppercase tracking-wider text-slate-400 font-semibold">Giờ bắt đầu tiệc cưới</label>
                      <input 
                        type="text" 
                        value={weddingData.weddingTime || ""} 
                        onChange={(e) => updateField(["weddingTime"], e.target.value)}
                        placeholder="18:00"
                        className="w-full bg-[#0c0a09] border border-[#292524] rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#db2777]"
                      />
                    </div>
                  </div>

                  {/* Danh sách các sự kiện chi tiết */}
                  <div className="space-y-4 border-t border-[#292524]/60 pt-4">
                    <h4 className="text-2xs uppercase tracking-wider text-slate-400 font-bold">Chi tiết từng sự kiện</h4>
                    {weddingData.events.map((event, index) => (
                      <div key={index} className="p-4 rounded-xl border border-[#292524] bg-[#0c0a09]/40 space-y-4">
                        <div className="font-semibold text-2xs text-[#db2777] uppercase flex items-center justify-between border-b border-[#292524] pb-1.5">
                          <span>Sự kiện {index + 1}: {event.title}</span>
                        </div>
                        
                        <div className="space-y-1.5">
                          <label className="block text-3xs uppercase tracking-wider text-slate-500 font-medium">Tên sự kiện</label>
                          <input 
                            type="text" 
                            value={event.title} 
                            onChange={(e) => updateEvent(index, "title", e.target.value)}
                            className="w-full bg-[#0c0a09] border border-[#292524] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#db2777]"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1.5">
                            <label className="block text-3xs uppercase tracking-wider text-slate-500 font-medium">Giờ bắt đầu</label>
                            <input 
                              type="text" 
                              value={event.time} 
                              onChange={(e) => updateEvent(index, "time", e.target.value)}
                              className="w-full bg-[#0c0a09] border border-[#292524] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#db2777]"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="block text-3xs uppercase tracking-wider text-slate-500 font-medium">Ngày diễn ra</label>
                            <input 
                              type="text" 
                              value={event.date} 
                              onChange={(e) => updateEvent(index, "date", e.target.value)}
                              className="w-full bg-[#0c0a09] border border-[#292524] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#db2777]"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-3xs uppercase tracking-wider text-slate-500 font-medium">Tên nơi tổ chức (VD: Nhà hàng Diamond...)</label>
                          <input 
                            type="text" 
                            value={event.locationName} 
                            onChange={(e) => updateEvent(index, "locationName", e.target.value)}
                            className="w-full bg-[#0c0a09] border border-[#292524] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#db2777]"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-3xs uppercase tracking-wider text-slate-500 font-medium">Địa chỉ chính xác</label>
                          <input 
                            type="text" 
                            value={event.address} 
                            onChange={(e) => updateEvent(index, "address", e.target.value)}
                            className="w-full bg-[#0c0a09] border border-[#292524] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#db2777]"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-3xs uppercase tracking-wider text-slate-500 font-medium">Đường dẫn Google Maps (Tùy chọn)</label>
                          <input 
                            type="text" 
                            value={event.mapUrl || ""} 
                            onChange={(e) => updateEvent(index, "mapUrl", e.target.value)}
                            placeholder="Dán link chia sẻ Google Maps..."
                            className="w-full bg-[#0c0a09] border border-[#292524] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#db2777]"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ACCORDION 5: ALBUM ẢNH CƯỚI */}
            {templateSchema.gallery.maxImages > 0 && (
              <div className="bg-[#1c1917] border border-[#292524] rounded-2xl overflow-hidden shadow-xs">
              <div 
                onClick={() => toggleSection("gallery")}
                className="flex items-center justify-between p-5 cursor-pointer hover:bg-[#292524]/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <ImageIcon size={18} className="text-[#db2777]" />
                  <span className="text-sm font-semibold tracking-wide" style={{ fontFamily: "'EB Garamond', serif", fontSize: "1.1rem" }}>
                    Album ảnh cưới (Gallery)
                  </span>
                </div>
                <span className="text-xs text-slate-500">{openSections.gallery ? "▲" : "▼"}</span>
              </div>

              {openSections.gallery && (
                <div className="p-6 border-t border-[#292524] space-y-6 bg-[#1c1917]/50 text-left">
                  <div className="flex items-center justify-between">
                    <h4 className="text-2xs uppercase tracking-wider text-slate-400 font-bold">Danh sách ảnh cưới</h4>
                    <span className="text-[10px] bg-slate-900 border border-slate-800 text-slate-400 px-2.5 py-0.5 rounded-full font-medium">
                      Tối đa: {TEMPLATES.find(t => t.id === weddingData.templateId)?.features.maxGalleryImages || 3} ảnh
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Array.from({ length: TEMPLATES.find(t => t.id === weddingData.templateId)?.features.maxGalleryImages || 3 }).map((_, index) => {
                      const imgUrl = weddingData.galleryImages[index] || "";
                      return (
                        <div key={index} className="p-4 rounded-xl border border-[#292524] bg-[#0c0a09]/40 flex gap-3.5 items-center">
                          <div className="w-14 h-14 bg-[#1c1917] border border-[#292524] rounded-lg overflow-hidden flex items-center justify-center shrink-0">
                            {imgUrl ? (
                              <img src={imgUrl} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                              <ImageIcon size={16} className="text-slate-600 animate-pulse" />
                            )}
                          </div>
                          
                          <div className="flex-1 space-y-1">
                            <span className="text-[9px] font-bold text-[#db2777] uppercase">Ảnh cưới {index + 1}</span>
                            <input 
                              type="text" 
                              placeholder="Nhập link ảnh cưới..."
                              value={imgUrl} 
                              onChange={(e) => {
                                const updated = [...weddingData.galleryImages];
                                updated[index] = e.target.value;
                                updateField(["galleryImages"], updated);
                              }}
                              className="w-full bg-transparent border-b border-[#292524] py-1 text-xs text-white outline-none focus:border-[#db2777] focus:placeholder-transparent"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
            )}

            {/* ACCORDION 5.5: CHUYỆN TÌNH YÊU (TIMELINE) */}
            {templateSchema.timeline.enabled && (
              <div className="bg-[#1c1917] border border-[#292524] rounded-2xl overflow-hidden shadow-xs">
                <div 
                  onClick={() => toggleSection("timeline")}
                  className="flex items-center justify-between p-5 cursor-pointer hover:bg-[#292524]/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <FileText size={18} className="text-[#db2777]" />
                    <span className="text-sm font-semibold tracking-wide" style={{ fontFamily: "'EB Garamond', serif", fontSize: "1.1rem" }}>
                      Chuyện tình yêu (Timeline)
                    </span>
                  </div>
                  <span className="text-xs text-slate-500">{openSections.timeline ? "▲" : "▼"}</span>
                </div>

                {openSections.timeline && (
                  <div className="p-6 border-t border-[#292524] space-y-4 bg-[#1c1917]/50 text-left">
                    <p className="text-2xs text-slate-400">Thiết lập các mốc thời gian đáng nhớ của hai bạn.</p>
                    {weddingData.timeline?.map((item, index) => (
                      <div key={index} className="p-4 rounded-xl border border-[#292524] bg-[#0c0a09]/40 space-y-3 relative">
                        <div className="font-semibold text-2xs text-[#db2777] uppercase border-b border-[#292524] pb-1.5 flex justify-between">
                          <span>Mốc thời gian {index + 1}</span>
                          <button 
                            type="button"
                            onClick={() => {
                              const updated = [...weddingData.timeline];
                              updated.splice(index, 1);
                              updateField(["timeline"], updated);
                            }}
                            className="text-red-500 hover:text-red-400 border-0 bg-transparent cursor-pointer text-3xs uppercase"
                          >
                            Xóa
                          </button>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1.5">
                            <label className="block text-3xs uppercase tracking-wider text-slate-500 font-medium">Năm / Thời gian</label>
                            <input 
                              type="text" 
                              value={item.year} 
                              onChange={(e) => {
                                const updated = [...weddingData.timeline];
                                updated[index].year = e.target.value;
                                updateField(["timeline"], updated);
                              }}
                              className="w-full bg-[#0c0a09] border border-[#292524] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#db2777]"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="block text-3xs uppercase tracking-wider text-slate-500 font-medium">Tiêu đề</label>
                            <input 
                              type="text" 
                              value={item.title} 
                              onChange={(e) => {
                                const updated = [...weddingData.timeline];
                                updated[index].title = e.target.value;
                                updateField(["timeline"], updated);
                              }}
                              className="w-full bg-[#0c0a09] border border-[#292524] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#db2777]"
                            />
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <label className="block text-3xs uppercase tracking-wider text-slate-500 font-medium">Mô tả chi tiết</label>
                          <textarea 
                            value={item.description} 
                            onChange={(e) => {
                              const updated = [...weddingData.timeline];
                              updated[index].description = e.target.value;
                              updateField(["timeline"], updated);
                            }}
                            className="w-full bg-[#0c0a09] border border-[#292524] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#db2777] min-h-[60px]"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="block text-3xs uppercase tracking-wider text-slate-500 font-medium">Link hình ảnh</label>
                          <input 
                            type="text" 
                            value={item.imageUrl || ""} 
                            onChange={(e) => {
                              const updated = [...weddingData.timeline];
                              updated[index].imageUrl = e.target.value;
                              updateField(["timeline"], updated);
                            }}
                            className="w-full bg-[#0c0a09] border border-[#292524] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#db2777]"
                          />
                        </div>
                      </div>
                    ))}
                    <button 
                      type="button"
                      onClick={() => updateField(["timeline"], [...(weddingData.timeline || []), { year: "", title: "", description: "", imageUrl: "" }])}
                      className="w-full py-2 border border-dashed border-[#db2777]/50 text-[#db2777] rounded-xl text-xs font-semibold bg-transparent hover:bg-[#db2777]/10 cursor-pointer transition-colors"
                    >
                      + Thêm mốc thời gian
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* ACCORDION 5.6: TUỲ CHỈNH THÊM (CUSTOM FIELDS) */}
            {templateSchema.customFields && templateSchema.customFields.length > 0 && (
              <div className="bg-[#1c1917] border border-[#292524] rounded-2xl overflow-hidden shadow-xs">
                <div 
                  onClick={() => toggleSection("custom")}
                  className="flex items-center justify-between p-5 cursor-pointer hover:bg-[#292524]/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Music size={18} className="text-[#db2777]" />
                    <span className="text-sm font-semibold tracking-wide" style={{ fontFamily: "'EB Garamond', serif", fontSize: "1.1rem" }}>
                      Tuỳ chỉnh thêm
                    </span>
                  </div>
                  <span className="text-xs text-slate-500">{openSections.custom ? "▲" : "▼"}</span>
                </div>

                {openSections.custom && (
                  <div className="p-6 border-t border-[#292524] space-y-4 bg-[#1c1917]/50 text-left">
                    <p className="text-2xs text-slate-400">Các tuỳ chỉnh đặc biệt dành riêng cho mẫu thiệp này.</p>
                    {templateSchema.customFields.map((field) => (
                      <div key={field.key} className="space-y-1.5">
                        <label className="block text-3xs uppercase tracking-wider text-slate-500 font-medium">{field.label}</label>
                        {field.type === "textarea" ? (
                          <textarea
                            placeholder={field.placeholder}
                            value={(weddingData as any)[field.key] || ""}
                            onChange={(e) => updateField([field.key], e.target.value)}
                            className="w-full bg-[#0c0a09] border border-[#292524] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#db2777] min-h-[80px]"
                          />
                        ) : field.type === "select" && field.options ? (
                          <select
                            value={(weddingData as any)[field.key] || field.options[0].value}
                            onChange={(e) => updateField([field.key], e.target.value)}
                            className="w-full bg-[#0c0a09] border border-[#292524] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#db2777]"
                          >
                            {field.options.map(opt => (
                              <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type={field.type === "date" ? "date" : "text"}
                            placeholder={field.placeholder}
                            value={(weddingData as any)[field.key] || ""}
                            onChange={(e) => updateField([field.key], e.target.value)}
                            className="w-full bg-[#0c0a09] border border-[#292524] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#db2777]"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ACCORDION 6: MỪNG CƯỚI & VIETQR */}
            <div className="bg-[#1c1917] border border-[#292524] rounded-2xl overflow-hidden shadow-xs">
              <div 
                onClick={() => toggleSection("gift")}
                className="flex items-center justify-between p-5 cursor-pointer hover:bg-[#292524]/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Gift size={18} className="text-[#db2777]" />
                  <span className="text-sm font-semibold tracking-wide" style={{ fontFamily: "'EB Garamond', serif", fontSize: "1.1rem" }}>
                    Tài khoản mừng cưới & mã QR
                  </span>
                </div>
                <span className="text-xs text-slate-500">{openSections.gift ? "▲" : "▼"}</span>
              </div>

              {openSections.gift && (
                <div className="p-6 border-t border-[#292524] space-y-6 bg-[#1c1917]/50 text-left">
                  <p className="text-2xs text-slate-400 leading-relaxed">Nhập thông tin tài khoản ngân hàng của hai bên gia đình. Hệ thống VietQR sẽ tự động tạo mã quét chuẩn xác gửi tới khách mời mừng cưới.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Nhà Trai */}
                    <div className="p-4 rounded-xl border border-[#292524] bg-[#0c0a09]/40 space-y-3">
                      <span className="text-[10px] font-bold text-[#db2777] uppercase tracking-wider">Mừng cưới nhà trai</span>
                      
                      <div className="space-y-1.5">
                        <label className="block text-3xs uppercase tracking-wider text-slate-500 font-medium">Ngân hàng (VCB, TCB, ACB...)</label>
                        <input 
                          type="text" 
                          placeholder="Nhập tên viết tắt (vd: vcb)"
                          value={weddingData.giftInfo?.groomBankName || ""} 
                          onChange={(e) => updateField(["giftInfo", "groomBankName"], e.target.value)}
                          className="w-full bg-[#0c0a09] border border-[#292524] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#db2777]"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-3xs uppercase tracking-wider text-slate-500 font-medium">Số tài khoản</label>
                        <input 
                          type="text" 
                          placeholder="Số tài khoản ngân hàng"
                          value={weddingData.giftInfo?.groomAccountNumber || ""} 
                          onChange={(e) => updateField(["giftInfo", "groomAccountNumber"], e.target.value)}
                          className="w-full bg-[#0c0a09] border border-[#292524] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#db2777]"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-3xs uppercase tracking-wider text-slate-500 font-medium">Tên chủ tài khoản (VIẾT HOA)</label>
                        <input 
                          type="text" 
                          placeholder="TÊN CHỦ TÀI KHOẢN KHÔNG DẤU"
                          value={weddingData.giftInfo?.groomAccountName || ""} 
                          onChange={(e) => updateField(["giftInfo", "groomAccountName"], e.target.value)}
                          className="w-full bg-[#0c0a09] border border-[#292524] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#db2777]"
                        />
                      </div>
                    </div>

                    {/* Nhà Gái */}
                    <div className="p-4 rounded-xl border border-[#292524] bg-[#0c0a09]/40 space-y-3">
                      <span className="text-[10px] font-bold text-[#db2777] uppercase tracking-wider">Mừng cưới nhà gái</span>
                      
                      <div className="space-y-1.5">
                        <label className="block text-3xs uppercase tracking-wider text-slate-500 font-medium">Ngân hàng (VCB, TCB, ACB...)</label>
                        <input 
                          type="text" 
                          placeholder="Nhập tên viết tắt (vd: tcb)"
                          value={weddingData.giftInfo?.brideBankName || ""} 
                          onChange={(e) => updateField(["giftInfo", "brideBankName"], e.target.value)}
                          className="w-full bg-[#0c0a09] border border-[#292524] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#db2777]"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-3xs uppercase tracking-wider text-slate-500 font-medium">Số tài khoản</label>
                        <input 
                          type="text" 
                          placeholder="Số tài khoản ngân hàng"
                          value={weddingData.giftInfo?.brideAccountNumber || ""} 
                          onChange={(e) => updateField(["giftInfo", "brideAccountNumber"], e.target.value)}
                          className="w-full bg-[#0c0a09] border border-[#292524] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#db2777]"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-3xs uppercase tracking-wider text-slate-500 font-medium">Tên chủ tài khoản (VIẾT HOA)</label>
                        <input 
                          type="text" 
                          placeholder="TÊN CHỦ TÀI KHOẢN KHÔNG DẤU"
                          value={weddingData.giftInfo?.brideAccountName || ""} 
                          onChange={(e) => updateField(["giftInfo", "brideAccountName"], e.target.value)}
                          className="w-full bg-[#0c0a09] border border-[#292524] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#db2777]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* PREVIEW PANEL */}
        <div className={`flex-1 overflow-y-auto bg-[#0c0a09] relative ${editorView === "preview" ? "block" : "hidden lg:block"}`}>
          <div className="flex flex-col items-center justify-center p-4 sm:p-8 min-h-full">
            {/* Top controls to toggle preview style & device */}
            <div className="flex flex-wrap items-center justify-center gap-4 bg-[#1c1917] p-2 rounded-2xl sm:rounded-full border border-[#292524] mb-6 shadow-lg z-10">
              {/* Envelope vs Invitation view mode */}
              <div className="flex p-0.5 bg-[#0c0a09] rounded-full border border-[#292524]">
                <button
                  onClick={() => setPreviewMode("envelope")}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold border-0 cursor-pointer transition-all ${
                    previewMode === "envelope" ? "bg-[#db2777] text-white" : "bg-transparent text-slate-400 hover:text-slate-200"
                  }`}
                >
                  Xem Phong bì
                </button>
                <button
                  onClick={() => setPreviewMode("invitation")}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold border-0 cursor-pointer transition-all ${
                    previewMode === "invitation" ? "bg-[#db2777] text-white" : "bg-transparent text-slate-400 hover:text-slate-200"
                  }`}
                >
                  Xem Thiệp mời
                </button>
              </div>

              {/* Separator on larger screens */}
              <div className="hidden sm:block w-px h-5 bg-[#292524]" />

              {/* Device Mode Selector */}
              <div className="flex p-0.5 bg-[#0c0a09] rounded-full border border-[#292524] gap-1">
                <button
                  onClick={() => setPreviewDevice("mobile")}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold border-0 cursor-pointer transition-all flex items-center gap-1.5 ${
                    previewDevice === "mobile" 
                      ? "bg-[#292524] text-[#db2777] border border-[#db2777]/30" 
                      : "bg-transparent text-slate-400 hover:text-slate-200 border border-transparent"
                  }`}
                >
                  <Smartphone size={13} />
                  <span>Di động</span>
                </button>
                <button
                  onClick={() => setPreviewDevice("desktop")}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold border-0 cursor-pointer transition-all flex items-center gap-1.5 ${
                    previewDevice === "desktop" 
                      ? "bg-[#292524] text-[#db2777] border border-[#db2777]/30" 
                      : "bg-transparent text-slate-400 hover:text-slate-200 border border-transparent"
                  }`}
                >
                  <Monitor size={13} />
                  <span>Máy tính</span>
                </button>
              </div>
            </div>

            {/* Device Mockup Shell based on selected device */}
            {previewDevice === "mobile" ? (
              /* MOBILE MOCKUP */
              <div className="relative w-[320px] sm:w-[360px] h-[640px] bg-black rounded-[40px] p-3.5 shadow-2xl border-4 border-[#292524] overflow-hidden flex flex-col mb-4 transition-all duration-300">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-4 bg-black rounded-b-2xl z-40 flex items-center justify-center">
                  <div className="w-16 h-1 bg-slate-900 rounded-full" />
                </div>

                {/* Mobile Screen content container */}
                <div className="overflow-y-auto w-full h-full rounded-[28px] relative scroll-smooth bg-[#fdf6ef]">
                  <div className={`w-full h-full ${currentTheme} bg-background text-foreground transition-colors duration-500`}>
                    {previewMode === "envelope" ? (
                      <EnvelopeIntro 
                        guestName="Khách mời danh dự"
                        groomName={weddingData.groomName}
                        brideName={weddingData.brideName}
                        onOpen={() => setPreviewMode("invitation")}
                      />
                    ) : (
                      <div className="w-full text-center relative font-sans">
                        <InvitationCover 
                          groomName={weddingData.groomName}
                          brideName={weddingData.brideName}
                          weddingDate={weddingData.weddingDate}
                          coverImageUrl={weddingData.galleryImages?.[0]}
                          onScrollNext={() => {}}
                        />
                        
                        <CoupleSpotlight 
                          groomName={weddingData.groomName}
                          brideName={weddingData.brideName}
                          groomImage={weddingData.galleryImages?.[1]}
                          brideImage={weddingData.galleryImages?.[2]}
                        />

                        <LoveStoryTimeline timeline={weddingData.timeline} />

                        <GalleryGrid images={weddingData.galleryImages} />

                        <EventInfo 
                          events={weddingData.events}
                          groomFatherName={weddingData.groomFatherName}
                          groomMotherName={weddingData.groomMotherName}
                          brideFatherName={weddingData.brideFatherName}
                          brideMotherName={weddingData.brideMotherName}
                        />

                        <GiftRegistry giftInfo={weddingData.giftInfo} />

                        <footer className="py-12 px-4 text-center bg-slate-900 text-white" style={{ backgroundColor: "var(--foreground)", color: "var(--background)" }}>
                          <h2 style={{ fontFamily: "'Great Vibes', cursive", fontSize: "2.2rem", color: "var(--accent)" }}>
                            {weddingData.groomName} & {weddingData.brideName}
                          </h2>
                          <p className="text-[10px] mt-2 opacity-70">Cảm ơn hai bạn đã tham dự lễ cưới của chúng tôi!</p>
                        </footer>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              /* DESKTOP RESPONSIVE MOCKUP */
              <div className="relative w-full max-w-5xl h-[600px] bg-[#1c1917] rounded-3xl p-3 shadow-2xl border-4 border-[#292524] overflow-hidden flex flex-col mb-4 transition-all duration-300">
                {/* Browser bar mockup */}
                <div className="flex items-center justify-between px-4 pb-3 border-b border-[#292524]/60 mb-2">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  </div>
                  <div className="bg-[#0c0a09] border border-[#292524] text-[10px] text-slate-400 px-8 py-1 rounded-md font-mono select-all truncate max-w-xs sm:max-w-md">
                    thieponline.vn/w/{weddingData.slug || "thebao-ngocanh"}
                  </div>
                  <div className="w-12" />
                </div>

                {/* Desktop Screen content container */}
                <div className="overflow-y-auto w-full h-full rounded-xl relative scroll-smooth bg-[#fdf6ef]">
                  <div className={`w-full h-full ${currentTheme} bg-background text-foreground transition-colors duration-500`}>
                    {previewMode === "envelope" ? (
                      <EnvelopeIntro 
                        guestName="Khách mời danh dự"
                        groomName={weddingData.groomName}
                        brideName={weddingData.brideName}
                        onOpen={() => setPreviewMode("invitation")}
                      />
                    ) : (
                      <div className="w-full text-center relative font-sans">
                        <InvitationCover 
                          groomName={weddingData.groomName}
                          brideName={weddingData.brideName}
                          weddingDate={weddingData.weddingDate}
                          coverImageUrl={weddingData.galleryImages?.[0]}
                          onScrollNext={() => {}}
                        />
                        
                        <CoupleSpotlight 
                          groomName={weddingData.groomName}
                          brideName={weddingData.brideName}
                          groomImage={weddingData.galleryImages?.[1]}
                          brideImage={weddingData.galleryImages?.[2]}
                        />

                        <LoveStoryTimeline timeline={weddingData.timeline} />

                        <GalleryGrid images={weddingData.galleryImages} />

                        <EventInfo 
                          events={weddingData.events}
                          groomFatherName={weddingData.groomFatherName}
                          groomMotherName={weddingData.groomMotherName}
                          brideFatherName={weddingData.brideFatherName}
                          brideMotherName={weddingData.brideMotherName}
                        />

                        <GiftRegistry giftInfo={weddingData.giftInfo} />

                        <footer className="py-12 px-4 text-center bg-slate-900 text-white" style={{ backgroundColor: "var(--foreground)", color: "var(--background)" }}>
                          <h2 style={{ fontFamily: "'Great Vibes', cursive", fontSize: "2.2rem", color: "var(--accent)" }}>
                            {weddingData.groomName} & {weddingData.brideName}
                          </h2>
                          <p className="text-[10px] mt-2 opacity-70">Cảm ơn hai bạn đã tham dự lễ cưới của chúng tôi!</p>
                        </footer>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-2">
              {previewDevice === "mobile" ? (
                <>
                  <Smartphone size={14} /> Giao diện hiển thị thực tế trên Điện thoại
                </>
              ) : (
                <>
                  <Monitor size={14} /> Giao diện hiển thị thực tế trên Máy tính (Desktop responsive)
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── SUCCESS MODAL ─────────────────────────────────────────────────── */}
      {publishedSlug && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-[#1c1917] border border-[#292524] rounded-3xl p-8 max-w-md w-full shadow-2xl text-center space-y-5">
            <div className="w-16 h-16 bg-green-950/50 border border-green-800 text-green-400 rounded-full flex items-center justify-center mx-auto">
              <Check size={32} />
            </div>
            <h3 className="text-2xl font-semibold text-white font-sans">
              Xuất bản thiệp thành công!
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Chúc mừng hai bạn! Thiệp cưới trực tuyến đã được phát sóng thành công. Bạn có thể chia sẻ liên kết này tới tất cả bạn bè, người thân.
            </p>
            <div className="bg-[#0c0a09] p-4 rounded-xl border border-[#292524] text-left space-y-2 text-xs">
              <p className="font-semibold text-slate-400">Đường dẫn thiệp cưới của bạn:</p>
              <div className="flex items-center justify-between gap-2 bg-[#1c1917] px-3.5 py-2.5 rounded-lg border border-[#292524]">
                <span className="font-mono text-[#db2777] font-semibold text-[11px] truncate">
                  {window.location.origin}/w/{publishedSlug}
                </span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`${window.location.origin}/w/${publishedSlug}`);
                    alert("Đường dẫn đã được copy vào bộ nhớ tạm!");
                  }}
                  className="p-1.5 hover:bg-[#292524] rounded-md transition-colors border-0 bg-transparent cursor-pointer text-[#db2777]"
                >
                  <Copy size={14} />
                </button>
              </div>
            </div>
            <div className="flex gap-3">
              <a 
                href={`/w/${publishedSlug}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 bg-[#db2777] text-white rounded-xl text-xs font-semibold hover:bg-[#be185d] active:scale-95 transition-all text-center no-underline border-0 shadow-sm flex items-center justify-center"
              >
                Xem thiệp live
              </a>
              <button 
                onClick={() => {
                  setPublishedSlug(null);
                  navigate("/dashboard");
                }}
                className="flex-1 py-3 bg-[#292524] hover:bg-[#3f3935] text-slate-200 rounded-xl text-xs font-semibold active:scale-95 transition-all cursor-pointer border-0"
              >
                Về trang quản lý
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── AUTH MODAL FOR PUBLISH ─────────────────────────────────────────── */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-[#1c1917] border border-[#292524] rounded-3xl p-8 max-w-sm w-full shadow-2xl text-left">
            <div className="flex items-center justify-between border-b border-[#292524] pb-3 mb-5">
              <h3 className="text-lg font-semibold text-white">
                {authMode === "register" ? "Đăng ký lưu thiệp mời" : "Đăng nhập hệ thống"}
              </h3>
              <button 
                onClick={() => setShowAuthModal(false)}
                className="text-slate-400 hover:text-white border-0 bg-transparent cursor-pointer text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-4 font-sans">
              {authError && (
                <div className="bg-red-950/50 text-red-400 text-2xs p-3 rounded-lg border border-red-900/50">
                  ⚠️ {authError}
                </div>
              )}
              
              <div className="space-y-1">
                <label className="block text-3xs font-semibold uppercase tracking-wider text-slate-400">
                  Tên đăng nhập
                </label>
                <input
                  type="text"
                  required
                  value={authForm.username}
                  onChange={(e) => setAuthForm({ ...authForm, username: e.target.value })}
                  placeholder="Nhập tên đăng nhập"
                  className="w-full bg-[#0c0a09] border border-[#292524] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#db2777]"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-3xs font-semibold uppercase tracking-wider text-slate-400">
                  Mật khẩu
                </label>
                <input
                  type="password"
                  required
                  value={authForm.password}
                  onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                  placeholder="••••••"
                  className="w-full bg-[#0c0a09] border border-[#292524] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#db2777]"
                />
              </div>

              {authMode === "register" && (
                <div className="space-y-1">
                  <label className="block text-3xs font-semibold uppercase tracking-wider text-slate-400">
                    Xác nhận mật khẩu
                  </label>
                  <input
                    type="password"
                    required
                    value={authForm.confirmPassword}
                    onChange={(e) => setAuthForm({ ...authForm, confirmPassword: e.target.value })}
                    placeholder="••••••"
                    className="w-full bg-[#0c0a09] border border-[#292524] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#db2777]"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={authLoading}
                className="w-full py-3 bg-[#db2777] text-white rounded-xl text-xs font-semibold hover:bg-[#be185d] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer border-0 mt-5 shadow-md"
              >
                {authLoading ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <span>{authMode === "register" ? "Đăng ký & Lưu thiệp" : "Đăng nhập & Lưu thiệp"}</span>
                )}
              </button>
            </form>

            <div className="mt-5 pt-4 border-t border-[#292524] text-center text-xs text-slate-400 font-sans">
              {authMode === "register" ? (
                <p>
                  Đã có tài khoản?{" "}
                  <button 
                    onClick={() => { setAuthMode("login"); setAuthError(null); }}
                    className="text-[#db2777] font-semibold border-0 bg-transparent cursor-pointer hover:underline"
                  >
                    Đăng nhập ngay
                  </button>
                </p>
              ) : (
                <p>
                  Chưa có tài khoản?{" "}
                  <button 
                    onClick={() => { setAuthMode("register"); setAuthError(null); }}
                    className="text-[#db2777] font-semibold border-0 bg-transparent cursor-pointer hover:underline"
                  >
                    Đăng ký tài khoản
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── SAAS UPGRADE MODAL ───────────────────────────────────────────── */}
      {showUpgradeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-[#1c1917] border border-[#292524] rounded-3xl p-8 max-w-md w-full shadow-2xl text-center space-y-6">
            <div className="w-16 h-16 bg-amber-955 border border-amber-900 text-amber-500 rounded-full flex items-center justify-center mx-auto text-2xl">
              👑
            </div>
            
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold text-white" style={{ fontFamily: "'EB Garamond', serif" }}>
                Nâng cấp gói Cao cấp VIP
              </h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                Mẫu thiệp cưới <strong className="text-[#db2777]">Ngà Cổ Điển</strong> thuộc bộ sưu tập Cao cấp VIP. Hãy nâng cấp tài khoản để mở khóa toàn bộ quyền lợi cao cấp:
              </p>
            </div>

            <div className="bg-amber-950/20 border border-amber-900/50 p-4 rounded-2xl text-left text-xs space-y-2 text-slate-300">
              <p className="flex items-center gap-2 font-semibold text-amber-400">
                ✨ Quyền lợi gói Cao cấp VIP:
              </p>
              <ul className="space-y-1.5 list-disc list-inside pl-1">
                <li>Sử dụng toàn bộ các mẫu thiệp VIP cao cấp nhất</li>
                <li>Album ảnh mở rộng lên đến <strong>6 hình ảnh HD</strong></li>
                <li><strong>Nhạc nền tùy chọn tự chọn</strong> tự động phát lãng mạn</li>
                <li>Đường dẫn thiệp mời đẹp tùy chọn (Custom Slug)</li>
                <li>Không giới hạn số lượt khách truy cập và phản hồi RSVP</li>
              </ul>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  // Simulate payment & upgrade success
                  localStorage.setItem("userPlan", "premium");
                  setUserPlan("premium");
                  setShowUpgradeModal(false);
                  confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 }
                  });
                  setTimeout(() => {
                    alert("Nâng cấp tài khoản lên gói Cao cấp VIP thành công! Bạn có thể xuất bản thiệp ngay bây giờ.");
                  }, 100);
                }}
                className="flex-1 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-xl text-xs font-semibold active:scale-95 transition-all cursor-pointer border-0 shadow-md flex items-center justify-center gap-1.5 font-sans"
              >
                <span>⚡ Nâng cấp Cao cấp chỉ 150.000đ</span>
              </button>
              <button 
                onClick={() => setShowUpgradeModal(false)}
                className="px-4 py-3.5 bg-[#292524] hover:bg-[#3f3935] text-slate-200 rounded-xl text-xs font-semibold active:scale-95 transition-all cursor-pointer border-0 font-sans"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
