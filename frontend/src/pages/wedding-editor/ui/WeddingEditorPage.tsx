import { useState, useEffect, useRef } from "react";
import { useSearchParams, useParams, useNavigate } from "react-router";
import { 
  Heart, Save, Loader2, ArrowLeft, Paintbrush, FileText, 
  MapPin, Image as ImageIcon, Gift, Eye, Smartphone, Music, Check, Copy
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
  const navigate = useNavigate();
  const { weddingSlug } = useParams<{ weddingSlug: string }>();
  const [searchParams] = useSearchParams();
  const initialTemplateId = Number(searchParams.get("templateId")) || 1;
  const initialPlan = searchParams.get("plan") || "Cặp đôi";

  // Tab State
  const [activeTab, setActiveTab] = useState<"design" | "info" | "events" | "gallery" | "gift">("design");
  
  // Preview Mode State (To toggle envelope vs inner invitation)
  const [previewMode, setPreviewMode] = useState<"envelope" | "invitation">("envelope");

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
    groomName: "Chú rể",
    brideName: "Cô dâu",
    groomFatherName: "",
    groomMotherName: "",
    brideFatherName: "",
    brideMotherName: "",
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

  // Theme variable map
  const getThemeClass = (id: number) => {
    if (id === 2) return "theme-green";
    if (id === 3) return "theme-navy";
    return "theme-pink";
  };
  const currentTheme = getThemeClass(weddingData.templateId);

  return (
    <div className="min-h-screen bg-[#faf5f0] flex flex-col font-sans">
      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <header className="bg-white border-b border-[#c9828e]/15 sticky top-0 z-30 px-4 h-16 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate("/")} 
            className="p-2 hover:bg-slate-100 rounded-xl transition-colors border-0 bg-transparent cursor-pointer text-[#7a5c4f]"
          >
            <ArrowLeft size={18} />
          </button>
          <span className="text-md font-semibold text-[#2c1810]" style={{ fontFamily: "'EB Garamond', serif" }}>
            Trình thiết kế trực quan <span className="text-xs font-normal text-muted-foreground">/ {isEditMode ? "Chỉnh sửa thiệp" : "Tạo thiệp mới"}</span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePublish}
            disabled={publishing}
            className="bg-[#8b3a52] text-white px-5 py-2 rounded-xl text-xs font-semibold hover:opacity-90 active:scale-95 transition-all disabled:opacity-50 flex items-center gap-1.5 cursor-pointer border-0 shadow-sm"
          >
            {publishing ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Save size={14} />
            )}
            <span>Xuất bản thiệp mời</span>
          </button>
        </div>
      </header>

      {/* ── MAIN LAYOUT ────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden max-w-8xl w-full mx-auto">
        
        {/* LEFT COLUMN: CONTROL PANEL */}
        <div className="w-full lg:w-[480px] shrink-0 border-r border-[#c9828e]/15 bg-white flex flex-col overflow-y-auto h-auto lg:h-[calc(100vh-64px)]">
          {/* Tab Navigation Icons */}
          <div className="grid grid-cols-5 border-b border-[#c9828e]/10 text-[#7a5c4f] sticky top-0 bg-white z-10">
            {[
              { id: "design", icon: Paintbrush, label: "Mẫu" },
              { id: "info", icon: FileText, label: "Cặp đôi" },
              { id: "events", icon: MapPin, label: "Sự kiện" },
              { id: "gallery", icon: ImageIcon, label: "Ảnh" },
              { id: "gift", icon: Gift, label: "Mừng" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3.5 flex flex-col items-center justify-center gap-1 cursor-pointer border-0 border-b-2 transition-all bg-transparent ${
                  activeTab === tab.id 
                    ? "border-[#8b3a52] text-[#8b3a52] font-semibold" 
                    : "border-transparent text-[#7a5c4f]/70 hover:text-[#8b3a52]"
                }`}
              >
                <tab.icon size={16} />
                <span className="text-[10px] tracking-wide">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Form Content */}
          <div className="p-6 space-y-6">
            
            {/* TAB: DESIGN */}
            {activeTab === "design" && (
              <div className="space-y-6 animate-fade-in text-left">
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3">Chọn mẫu thiết kế sẵn</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {TEMPLATES.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => updateField(["templateId"], t.id)}
                        className={`p-2.5 rounded-xl border text-left flex flex-col gap-2 transition-all cursor-pointer bg-white ${
                          weddingData.templateId === t.id 
                            ? "border-[#8b3a52] shadow-sm ring-1 ring-[#8b3a52]/40" 
                            : "border-border hover:border-[#8b3a52]/40"
                        }`}
                      >
                        <img src={t.preview} alt={t.name} className="w-full aspect-[4/3] object-cover rounded-lg" />
                        <div>
                          <p className="text-xs font-semibold text-foreground">{t.name}</p>
                          <p className="text-[10px] text-muted-foreground">{t.style}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-5">
                  <h3 className="text-sm font-semibold text-foreground mb-3">Đường dẫn thiệp mời mong muốn</h3>
                  <div className="flex rounded-xl border border-border overflow-hidden bg-slate-50 focus-within:border-[#8b3a52] transition-colors">
                    <span className="px-3 py-2.5 text-xs text-muted-foreground bg-slate-100/80 border-r select-none">thieponline.vn/w/</span>
                    <input 
                      type="text" 
                      placeholder="vd: an-binh"
                      value={weddingData.slug}
                      onChange={(e) => updateField(["slug"], e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                      className="flex-1 px-3 py-2.5 text-xs outline-none bg-transparent text-foreground"
                    />
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1.5 italic">Nếu để trống, hệ thống sẽ tự động tạo đường dẫn theo tên hai bạn.</p>
                </div>
              </div>
            )}

            {/* TAB: INFO */}
            {activeTab === "info" && (
              <div className="space-y-6 animate-fade-in text-left">
                {/* Chú rể */}
                <div className="space-y-3.5 p-4 rounded-xl border border-[#c9828e]/10 bg-[#faf5f0]/20">
                  <h4 className="text-xs uppercase tracking-wider text-[#8b3a52] font-semibold border-b border-[#c9828e]/10 pb-1.5">Thông tin Nhà Trai</h4>
                  <div>
                    <label className="block text-2xs text-[#7a5c4f] mb-1 font-medium">Họ tên Chú Rể *</label>
                    <input 
                      type="text" 
                      required
                      value={weddingData.groomName} 
                      onChange={(e) => updateField(["groomName"], e.target.value)}
                      className="w-full px-3 py-2 rounded-lg text-xs outline-none border border-border bg-white focus:border-[#8b3a52] text-[#2c1810]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-2xs text-[#7a5c4f] mb-1 font-medium">Họ tên Bố</label>
                      <input 
                        type="text" 
                        value={weddingData.groomFatherName || ""} 
                        onChange={(e) => updateField(["groomFatherName"], e.target.value)}
                        className="w-full px-3 py-2 rounded-lg text-xs outline-none border border-border bg-white focus:border-[#8b3a52]"
                      />
                    </div>
                    <div>
                      <label className="block text-2xs text-[#7a5c4f] mb-1 font-medium">Họ tên Mẹ</label>
                      <input 
                        type="text" 
                        value={weddingData.groomMotherName || ""} 
                        onChange={(e) => updateField(["groomMotherName"], e.target.value)}
                        className="w-full px-3 py-2 rounded-lg text-xs outline-none border border-border bg-white focus:border-[#8b3a52]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-2xs text-[#7a5c4f] mb-1 font-medium">Số điện thoại</label>
                    <input 
                      type="tel" 
                      value={weddingData.contactInfo?.groomPhone || ""} 
                      onChange={(e) => updateField(["contactInfo", "groomPhone"], e.target.value)}
                      className="w-full px-3 py-2 rounded-lg text-xs outline-none border border-border bg-white focus:border-[#8b3a52]"
                    />
                  </div>
                </div>

                {/* Cô dâu */}
                <div className="space-y-3.5 p-4 rounded-xl border border-[#c9828e]/10 bg-[#faf5f0]/20">
                  <h4 className="text-xs uppercase tracking-wider text-[#8b3a52] font-semibold border-b border-[#c9828e]/10 pb-1.5">Thông tin Nhà Gái</h4>
                  <div>
                    <label className="block text-2xs text-[#7a5c4f] mb-1 font-medium">Họ tên Cô Dâu *</label>
                    <input 
                      type="text" 
                      required
                      value={weddingData.brideName} 
                      onChange={(e) => updateField(["brideName"], e.target.value)}
                      className="w-full px-3 py-2 rounded-lg text-xs outline-none border border-border bg-white focus:border-[#8b3a52] text-[#2c1810]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-2xs text-[#7a5c4f] mb-1 font-medium">Họ tên Bố</label>
                      <input 
                        type="text" 
                        value={weddingData.brideFatherName || ""} 
                        onChange={(e) => updateField(["brideFatherName"], e.target.value)}
                        className="w-full px-3 py-2 rounded-lg text-xs outline-none border border-border bg-white focus:border-[#8b3a52]"
                      />
                    </div>
                    <div>
                      <label className="block text-2xs text-[#7a5c4f] mb-1 font-medium">Họ tên Mẹ</label>
                      <input 
                        type="text" 
                        value={weddingData.brideMotherName || ""} 
                        onChange={(e) => updateField(["brideMotherName"], e.target.value)}
                        className="w-full px-3 py-2 rounded-lg text-xs outline-none border border-border bg-white focus:border-[#8b3a52]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-2xs text-[#7a5c4f] mb-1 font-medium">Số điện thoại</label>
                    <input 
                      type="tel" 
                      value={weddingData.contactInfo?.bridePhone || ""} 
                      onChange={(e) => updateField(["contactInfo", "bridePhone"], e.target.value)}
                      className="w-full px-3 py-2 rounded-lg text-xs outline-none border border-border bg-white focus:border-[#8b3a52]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB: EVENTS */}
            {activeTab === "events" && (
              <div className="space-y-6 animate-fade-in text-left">
                {/* Ngày giờ chính */}
                <div className="space-y-3.5">
                  <h4 className="text-xs uppercase tracking-wider text-[#8b3a52] font-semibold">Ngày Cưới Tổng Thể</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-2xs text-[#7a5c4f] mb-1 font-medium">Ngày cưới *</label>
                      <input 
                        type="date" 
                        required
                        value={weddingData.weddingDate ? weddingData.weddingDate.split("T")[0] : ""} 
                        onChange={(e) => updateField(["weddingDate"], e.target.value)}
                        className="w-full px-3 py-2 rounded-lg text-xs outline-none border border-border bg-white focus:border-[#8b3a52]"
                      />
                    </div>
                    <div>
                      <label className="block text-2xs text-[#7a5c4f] mb-1 font-medium">Giờ hiển thị</label>
                      <input 
                        type="text" 
                        value={weddingData.weddingTime || ""} 
                        onChange={(e) => updateField(["weddingTime"], e.target.value)}
                        placeholder="18:00"
                        className="w-full px-3 py-2 rounded-lg text-xs outline-none border border-border bg-white focus:border-[#8b3a52]"
                      />
                    </div>
                  </div>
                </div>

                {/* Các sự kiện cụ thể */}
                <div className="space-y-4 border-t pt-5">
                  <h4 className="text-xs uppercase tracking-wider text-[#8b3a52] font-semibold">Danh sách sự kiện chính</h4>
                  
                  {weddingData.events.map((event, index) => (
                    <div key={index} className="p-4 rounded-xl border border-[#c9828e]/10 bg-[#faf5f0]/20 space-y-3">
                      <div className="font-semibold text-2xs text-[#8b3a52] uppercase flex items-center justify-between border-b pb-1">
                        <span>Sự kiện {index + 1}: {event.title}</span>
                      </div>
                      <div>
                        <label className="block text-2xs text-[#7a5c4f] mb-1">Tên sự kiện (VD: Lễ Vu Quy, Tiệc Cưới)</label>
                        <input 
                          type="text" 
                          value={event.title} 
                          onChange={(e) => updateEvent(index, "title", e.target.value)}
                          className="w-full px-3 py-2 rounded-lg text-xs outline-none border border-border bg-white focus:border-[#8b3a52]"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-2xs text-[#7a5c4f] mb-1">Giờ bắt đầu</label>
                          <input 
                            type="text" 
                            value={event.time} 
                            onChange={(e) => updateEvent(index, "time", e.target.value)}
                            className="w-full px-3 py-2 rounded-lg text-xs outline-none border border-border bg-white focus:border-[#8b3a52]"
                          />
                        </div>
                        <div>
                          <label className="block text-2xs text-[#7a5c4f] mb-1">Ngày diễn ra</label>
                          <input 
                            type="text" 
                            value={event.date} 
                            onChange={(e) => updateEvent(index, "date", e.target.value)}
                            className="w-full px-3 py-2 rounded-lg text-xs outline-none border border-border bg-white focus:border-[#8b3a52]"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-2xs text-[#7a5c4f] mb-1">Tên nơi tổ chức (VD: Nhà hàng Diamond...)</label>
                        <input 
                          type="text" 
                          value={event.locationName} 
                          onChange={(e) => updateEvent(index, "locationName", e.target.value)}
                          className="w-full px-3 py-2 rounded-lg text-xs outline-none border border-border bg-white focus:border-[#8b3a52]"
                        />
                      </div>
                      <div>
                        <label className="block text-2xs text-[#7a5c4f] mb-1">Địa chỉ chính xác</label>
                        <input 
                          type="text" 
                          value={event.address} 
                          onChange={(e) => updateEvent(index, "address", e.target.value)}
                          className="w-full px-3 py-2 rounded-lg text-xs outline-none border border-border bg-white focus:border-[#8b3a52]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: GALLERY */}
            {activeTab === "gallery" && (
              <div className="space-y-5 animate-fade-in text-left">
                <h3 className="text-sm font-semibold text-foreground">Liên kết ảnh Album</h3>
                <p className="text-2xs text-muted-foreground leading-relaxed -mt-2">Nhập URL ảnh cưới (từ máy chủ ảnh hoặc dịch vụ Cloud của bạn) để hiển thị trong Album của thiệp mời.</p>
                
                {weddingData.galleryImages.map((imgUrl, index) => (
                  <div key={index} className="space-y-1.5 p-3 rounded-lg border bg-slate-50 relative">
                    <span className="text-[10px] font-semibold text-[#8b3a52] uppercase">Ảnh {index + 1}</span>
                    <input 
                      type="text" 
                      value={imgUrl} 
                      onChange={(e) => {
                        const updated = [...weddingData.galleryImages];
                        updated[index] = e.target.value;
                        updateField(["galleryImages"], updated);
                      }}
                      className="w-full px-3 py-2 rounded-lg text-xs outline-none border border-border bg-white focus:border-[#8b3a52]"
                    />
                    <img src={imgUrl} alt="Preview" className="w-14 h-14 object-cover rounded-md mt-1.5 border" />
                  </div>
                ))}
              </div>
            )}

            {/* TAB: GIFT */}
            {activeTab === "gift" && (
              <div className="space-y-6 animate-fade-in text-left">
                <h3 className="text-sm font-semibold text-foreground">Mã QR mừng cưới (VietQR)</h3>
                <p className="text-2xs text-muted-foreground leading-relaxed -mt-4">Mã VietQR nhận tiền mừng sẽ tự động được sinh khi bạn điền đúng tên ngân hàng viết tắt (VD: vcb, tcb, acb, mbbank) và số tài khoản.</p>
                
                {/* Nhà Trai */}
                <div className="p-4 rounded-xl border border-[#c9828e]/10 bg-[#faf5f0]/20 space-y-3">
                  <div className="font-semibold text-2xs text-[#8b3a52] uppercase border-b pb-1">Mừng cưới nhà trai</div>
                  <div>
                    <label className="block text-2xs text-[#7a5c4f] mb-1 font-medium">Ngân hàng (Tên viết tắt: vcb, tcb, acb, mbbank...)</label>
                    <input 
                      type="text" 
                      placeholder="vietcombank"
                      value={weddingData.giftInfo?.groomBankName || ""} 
                      onChange={(e) => updateField(["giftInfo", "groomBankName"], e.target.value)}
                      className="w-full px-3 py-2 rounded-lg text-xs outline-none border border-border bg-white focus:border-[#8b3a52]"
                    />
                  </div>
                  <div>
                    <label className="block text-2xs text-[#7a5c4f] mb-1 font-medium">Số tài khoản</label>
                    <input 
                      type="text" 
                      value={weddingData.giftInfo?.groomAccountNumber || ""} 
                      onChange={(e) => updateField(["giftInfo", "groomAccountNumber"], e.target.value)}
                      className="w-full px-3 py-2 rounded-lg text-xs outline-none border border-border bg-white focus:border-[#8b3a52]"
                    />
                  </div>
                  <div>
                    <label className="block text-2xs text-[#7a5c4f] mb-1 font-medium">Tên người nhận (VIẾT HOA KHÔNG DẤU)</label>
                    <input 
                      type="text" 
                      value={weddingData.giftInfo?.groomAccountName || ""} 
                      onChange={(e) => updateField(["giftInfo", "groomAccountName"], e.target.value)}
                      className="w-full px-3 py-2 rounded-lg text-xs outline-none border border-border bg-white focus:border-[#8b3a52]"
                    />
                  </div>
                </div>

                {/* Nhà Gái */}
                <div className="p-4 rounded-xl border border-[#c9828e]/10 bg-[#faf5f0]/20 space-y-3">
                  <div className="font-semibold text-2xs text-[#8b3a52] uppercase border-b pb-1">Mừng cưới nhà gái</div>
                  <div>
                    <label className="block text-2xs text-[#7a5c4f] mb-1 font-medium">Ngân hàng (Tên viết tắt: vcb, tcb, acb, mbbank...)</label>
                    <input 
                      type="text" 
                      placeholder="techcombank"
                      value={weddingData.giftInfo?.brideBankName || ""} 
                      onChange={(e) => updateField(["giftInfo", "brideBankName"], e.target.value)}
                      className="w-full px-3 py-2 rounded-lg text-xs outline-none border border-border bg-white focus:border-[#8b3a52]"
                    />
                  </div>
                  <div>
                    <label className="block text-2xs text-[#7a5c4f] mb-1 font-medium">Số tài khoản</label>
                    <input 
                      type="text" 
                      value={weddingData.giftInfo?.brideAccountNumber || ""} 
                      onChange={(e) => updateField(["giftInfo", "brideAccountNumber"], e.target.value)}
                      className="w-full px-3 py-2 rounded-lg text-xs outline-none border border-border bg-white focus:border-[#8b3a52]"
                    />
                  </div>
                  <div>
                    <label className="block text-2xs text-[#7a5c4f] mb-1 font-medium">Tên người nhận (VIẾT HOA KHÔNG DẤU)</label>
                    <input 
                      type="text" 
                      value={weddingData.giftInfo?.brideAccountName || ""} 
                      onChange={(e) => updateField(["giftInfo", "brideAccountName"], e.target.value)}
                      className="w-full px-3 py-2 rounded-lg text-xs outline-none border border-border bg-white focus:border-[#8b3a52]"
                    />
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* RIGHT COLUMN: LIVE PREVIEW IN MOBILE SHELL */}
        <div className="flex-1 bg-slate-100 flex flex-col justify-center items-center p-4 relative h-[calc(100vh-64px)] overflow-y-auto">
          {/* Top Controls to toggle preview mode */}
          <div className="absolute top-4 z-20 flex bg-white/80 backdrop-blur-sm rounded-full p-1 border border-border shadow-xs">
            <button
              onClick={() => setPreviewMode("envelope")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border-0 cursor-pointer transition-all ${
                previewMode === "envelope" ? "bg-[#8b3a52] text-white" : "bg-transparent text-[#7a5c4f] hover:text-[#8b3a52]"
              }`}
            >
              Xem Phong bì
            </button>
            <button
              onClick={() => setPreviewMode("invitation")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border-0 cursor-pointer transition-all ${
                previewMode === "invitation" ? "bg-[#8b3a52] text-white" : "bg-transparent text-[#7a5c4f] hover:text-[#8b3a52]"
              }`}
            >
              Xem Thiệp mời
            </button>
          </div>

          {/* Device Mockup Shell */}
          <div className="relative w-[320px] sm:w-[360px] h-[640px] bg-foreground rounded-[40px] p-3.5 shadow-2xl border-4 border-slate-700/60 overflow-hidden flex flex-col mt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-4 bg-foreground rounded-b-2xl z-40 flex items-center justify-center">
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
                  <div className="w-full text-center relative">
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

          <div className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
            <Smartphone size={14} /> Trực quan di động 100%
          </div>
        </div>

      </div>

      {/* ── SUCCESS MODAL ─────────────────────────────────────────────────── */}
      {publishedSlug && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-xl text-center space-y-5 border animate-scale-in">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600">
              <Check size={32} />
            </div>
            <h3 className="text-2xl font-semibold text-[#2c1810]" style={{ fontFamily: "'EB Garamond', serif" }}>
              Xuất bản thiệp thành công!
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Xin chúc mừng! Thiệp mời cưới của bạn đã được khởi tạo và phát trực tiếp. Bạn có thể chia sẻ liên kết này với mọi người.
            </p>
            <div className="bg-secondary/40 p-4 rounded-xl border text-left space-y-2 text-xs">
              <p className="font-semibold text-muted-foreground">Đường dẫn thiệp cưới của bạn:</p>
              <div className="flex items-center justify-between gap-2 bg-white px-3 py-2.5 rounded-lg border border-border">
                <span className="font-mono text-primary font-semibold text-[11px] truncate">
                  {window.location.origin}/w/{publishedSlug}
                </span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`${window.location.origin}/w/${publishedSlug}`);
                    alert("Đường dẫn đã được copy vào bộ nhớ tạm!");
                  }}
                  className="p-1.5 hover:bg-slate-100 rounded-md transition-colors border-0 bg-transparent cursor-pointer text-[#8b3a52]"
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
                className="flex-1 py-3 bg-[#8b3a52] text-white rounded-xl text-xs font-semibold hover:opacity-90 active:scale-95 transition-all text-center no-underline border-0"
              >
                Xem thiệp mời live
              </a>
              <button 
                onClick={() => {
                  setPublishedSlug(null);
                  navigate("/dashboard");
                }}
                className="flex-1 py-3 bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-200 active:scale-95 transition-all cursor-pointer border-0"
              >
                Về trang quản lý
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── AUTH MODAL FOR PUBLISH ─────────────────────────────────────────── */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl border animate-scale-in text-left">
            <div className="flex items-center justify-between border-b pb-3 mb-5">
              <h3 className="text-xl font-semibold text-[#2c1810]" style={{ fontFamily: "'EB Garamond', serif" }}>
                {authMode === "register" ? "Đăng ký lưu thiệp mời" : "Đăng nhập hệ thống"}
              </h3>
              <button 
                onClick={() => setShowAuthModal(false)}
                className="text-muted-foreground hover:text-foreground border-0 bg-transparent cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              {authError && (
                <div className="bg-red-50 text-red-600 text-2xs p-3 rounded-lg border border-red-200">
                  ⚠️ {authError}
                </div>
              )}
              
              <div>
                <label className="block text-2xs font-semibold uppercase tracking-wider text-[#7a5c4f] mb-1">
                  Tên đăng nhập
                </label>
                <input
                  type="text"
                  required
                  value={authForm.username}
                  onChange={(e) => setAuthForm({ ...authForm, username: e.target.value })}
                  placeholder="Nhập tên đăng nhập"
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs outline-none border border-border bg-slate-50 focus:border-[#8b3a52] transition-colors"
                />
              </div>

              <div>
                <label className="block text-2xs font-semibold uppercase tracking-wider text-[#7a5c4f] mb-1">
                  Mật khẩu
                </label>
                <input
                  type="password"
                  required
                  value={authForm.password}
                  onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                  placeholder="••••••"
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs outline-none border border-border bg-slate-50 focus:border-[#8b3a52] transition-colors"
                />
              </div>

              {authMode === "register" && (
                <div>
                  <label className="block text-2xs font-semibold uppercase tracking-wider text-[#7a5c4f] mb-1">
                    Xác nhận mật khẩu
                  </label>
                  <input
                    type="password"
                    required
                    value={authForm.confirmPassword}
                    onChange={(e) => setAuthForm({ ...authForm, confirmPassword: e.target.value })}
                    placeholder="••••••"
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs outline-none border border-border bg-slate-50 focus:border-[#8b3a52] transition-colors"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={authLoading}
                className="w-full py-3 bg-[#8b3a52] text-white rounded-xl text-xs font-semibold hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer border-0 mt-5 shadow-sm"
              >
                {authLoading ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <span>{authMode === "register" ? "Tạo tài khoản & Lưu" : "Đăng nhập & Lưu"}</span>
                )}
              </button>
            </form>

            <div className="mt-5 pt-4 border-t text-center text-xs text-[#7a5c4f]">
              {authMode === "register" ? (
                <p>
                  Đã có tài khoản?{" "}
                  <button 
                    onClick={() => { setAuthMode("login"); setAuthError(null); }}
                    className="text-[#8b3a52] font-semibold border-0 bg-transparent cursor-pointer hover:underline"
                  >
                    Đăng nhập ngay
                  </button>
                </p>
              ) : (
                <p>
                  Chưa có tài khoản?{" "}
                  <button 
                    onClick={() => { setAuthMode("register"); setAuthError(null); }}
                    className="text-[#8b3a52] font-semibold border-0 bg-transparent cursor-pointer hover:underline"
                  >
                    Đăng ký tài khoản mới
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
