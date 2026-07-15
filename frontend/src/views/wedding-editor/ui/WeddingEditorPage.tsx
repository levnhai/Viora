"use client";

import { useState, useEffect, useRef } from "react";
import iphone15ProFrame from "@/shared/assets/image/frame/iphone15_pro.png";
import { useSearchParams, useParams, useRouter } from "next/navigation";
import {
  Heart,
  Save,
  Loader2,
  ArrowLeft,
  Eye,
  Smartphone,
  Monitor,
  Check,
  Copy,
  Share2,
  Undo2,
  Redo2,
  Plus,
  Trash2,
  Play,
  Pause,
  PenTool,
  Image as ImageIcon,
  Lock,
  ChevronDown,
  ChevronRight,
  BookOpen,
  Calendar,
  Music,
  MapPin,
  Mail,
  Gift,
  Phone,
  FileText,
  Clock,
  Settings,
  HelpCircle,
  Volume2
} from "lucide-react";
import confetti from "canvas-confetti";

import { TEMPLATES } from "@/entities/template/model/templates";
import { getTemplatePackage } from "@/entities/template/model/registry";
import { WeddingData, WeddingEvent, LoveStoryTimelineItem } from "@/entities/invitation/model/types";
import { API_URL } from "@/shared/lib/config";

interface WeddingEditorPageProps {
  isEditMode?: boolean;
}

export function WeddingEditorPage({
  isEditMode = false,
}: WeddingEditorPageProps) {
  const router = useRouter();
  const navigate = (path: string) => router.push(path);
  const params = useParams();
  const weddingSlug = params?.weddingSlug as string;
  const searchParams = useSearchParams();
  const initialTemplateId = searchParams?.get("templateId") || "temp_1";

  // View state (Chỉnh sửa vs Xem trước)
  const [editorView, setEditorView] = useState<"edit" | "preview">("edit");
  const [activeTab, setActiveTab] = useState<string>("content"); // Tab hiện tại ở sidebar hẹp
  const [activePageId, setActivePageId] = useState<string>("cover"); // Trang hiện tại ở carousel
  const [zoomLevel, setZoomLevel] = useState<number>(100); // Mức zoom của mockup

  // Dropdown states
  const [showTemplateDropdown, setShowTemplateDropdown] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);

  // Chế độ xem trước (Phong bì vs Thiệp mời)
  const [previewMode, setPreviewMode] = useState<"envelope" | "invitation">("invitation");
  const [previewDevice, setPreviewDevice] = useState<"mobile" | "desktop">("mobile");

  // Các state và hiệu ứng quản lý giao diện chuyên biệt trên Mobile
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  const [mobileActiveTab, setMobileActiveTab] = useState<"edit" | "preview" | "settings">("edit");
  const [mobileOpenSections, setMobileOpenSections] = useState<Record<string, boolean>>({
    basic: true,
    cover: false,
    music: false,
  });

  const toggleMobileSection = (section: string) => {
    setMobileOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setIsMobileScreen(window.innerWidth < 768);
      };
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // Trạng thái Xác thực & Tài khoản
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    typeof window !== "undefined" ? !!localStorage.getItem("role") : false,
  );
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("register");
  const [authForm, setAuthForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);

  // Dữ liệu Thiệp cưới mặc định
  const [weddingData, setWeddingData] = useState<WeddingData>({
    slug: "",
    templateId: initialTemplateId,
    groomName: "Nguyễn Minh Khoa",
    brideName: "Trần Khải Trâm",
    groomShortName: "Minh Khoa",
    brideShortName: "Khải Trâm",
    groomTitle: "Trưởng Nam",
    brideTitle: "Út Nữ",
    displayOrder: "groom_first",
    isCoverImageVisible: true,
    groomFatherName: "Nguyễn Văn Hùng",
    groomMotherName: "Lê Thị Mai",
    brideFatherName: "Trần Văn Nam",
    brideMotherName: "Phạm Thị Lan",
    weddingDate: "2026-10-20",
    weddingTime: "18:00",
    events: [
      {
        title: "LỄ VU QUY",
        time: "09:00",
        date: "2026-10-20",
        locationName: "Tư gia nhà gái",
        address: "123 Đường Nguyễn Trãi, Quận 1, TP. HCM",
        mapUrl: "https://maps.google.com",
      },
      {
        title: "TIỆC CHIÊU ĐÃI",
        time: "18:00",
        date: "2026-10-20",
        locationName: "Nhà hàng tiệc cưới Diamond",
        address: "456 Đường Nguyễn Huệ, Quận 1, TP. HCM",
        mapUrl: "https://maps.google.com",
      },
    ],
    timeline: [
      {
        year: "2024",
        title: "Lần đầu gặp gỡ",
        description: "Chúng mình tình cờ gặp nhau tại một quán cà phê nhỏ vào một ngày mưa gió...",
        imageUrl: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&h=400&fit=crop&auto=format",
      },
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1519225495810-7517cbd14bc4?w=800&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&h=600&fit=crop&auto=format",
    ],
    giftInfo: {
      groomBankName: "Vietcombank",
      groomAccountNumber: "1012345678",
      groomAccountName: "NGUYEN MINH KHOA",
      groomQrUrl: "",
      brideBankName: "Techcombank",
      brideAccountNumber: "1903456789",
      brideAccountName: "TRAN KHAI TRAM",
      brideQrUrl: "",
    },
    contactInfo: {
      groomPhone: "0901234567",
      bridePhone: "0907654321",
      email: "khoatram@gmail.com",
    },
  });

  const currentTemplate = TEMPLATES.find((t) => t.code === weddingData?.templateId) || TEMPLATES[0];

  const [loading, setLoading] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [publishedSlug, setPublishedSlug] = useState<string | null>(null);
  const [autoSaveTime, setAutoSaveTime] = useState<string>("10:30");

  // Quản lý danh sách template đã mua lẻ
  const [purchasedTemplates, setPurchasedTemplates] = useState<number[]>([]);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [upgradeTemplateId, setUpgradeTemplateId] = useState<string | null>(null);

  // States cho các Accordion chỉnh sửa
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    basic: true,
    cover: false,
    story: false,
    invitation: false,
    gallery: false,
    events: false,
    timeline: false,
    others: false,
    gift: false,
    wishes: false,
    music: false,
  });

  // State Lịch sử (Undo / Redo)
  const [historyStack, setHistoryStack] = useState<WeddingData[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  // Lưu lịch sử khi weddingData thay đổi
  const saveToHistory = (data: WeddingData) => {
    const newStack = historyStack.slice(0, historyIndex + 1);
    newStack.push(JSON.parse(JSON.stringify(data)));
    if (newStack.length > 30) {
      newStack.shift();
    }
    setHistoryStack(newStack);
    setHistoryIndex(newStack.length - 1);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const prevIndex = historyIndex - 1;
      setHistoryIndex(prevIndex);
      setWeddingData(JSON.parse(JSON.stringify(historyStack[prevIndex])));
    }
  };

  const handleRedo = () => {
    if (historyIndex < historyStack.length - 1) {
      const nextIndex = historyIndex + 1;
      setHistoryIndex(nextIndex);
      setWeddingData(JSON.parse(JSON.stringify(historyStack[nextIndex])));
    }
  };

  // Khởi tạo lịch sử lúc đầu
  useEffect(() => {
    if (weddingData && historyStack.length === 0) {
      setHistoryStack([JSON.parse(JSON.stringify(weddingData))]);
      setHistoryIndex(0);
    }
  }, [weddingData]);

  // Tự động lưu (Giả lập auto-save sau mỗi 30s)
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
      setAutoSaveTime(timeStr);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("purchasedTemplates");
      if (saved) {
        setPurchasedTemplates(JSON.parse(saved));
      } else {
        setPurchasedTemplates([]);
      }
    }
  }, []);

  // Đăng ký triggerUpgradeModal cho window
  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).triggerUpgradeModal = (tplId?: number) => {
        if (tplId) {
          setUpgradeTemplateId(tplId);
        } else {
          setUpgradeTemplateId(weddingData.templateId);
        }
        setShowUpgradeModal(true);
      };
    }
    return () => {
      if (typeof window !== "undefined") {
        delete (window as any).triggerUpgradeModal;
      }
    };
  }, [weddingData.templateId]);

  // Fetch dữ liệu nếu ở Edit Mode
  useEffect(() => {
    if (isEditMode && weddingSlug) {
      setLoading(true);
      fetch(`${API_URL}/api/weddings/${weddingSlug}`, {
        credentials: "include"
      })
        .then((res) => {
          if (!res.ok) throw new Error("Không thể tải thông tin thiệp cưới!");
          return res.json();
        })
        .then((data) => {
          if (data.success && data.data) {
            setWeddingData(data.data);
            setHistoryStack([JSON.parse(JSON.stringify(data.data))]);
            setHistoryIndex(0);
          }
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }
  }, [isEditMode, weddingSlug]);

  // Đồng bộ VietQR tự động
  useEffect(() => {
    setWeddingData((prev) => {
      const groomBank = prev.giftInfo?.groomBankName?.trim();
      const groomAcc = prev.giftInfo?.groomAccountNumber?.trim();
      const brideBank = prev.giftInfo?.brideBankName?.trim();
      const brideAcc = prev.giftInfo?.brideAccountNumber?.trim();

      const groomQr =
        groomBank && groomAcc
          ? `https://img.vietqr.io/image/${groomBank}-${groomAcc}-compact.png?amount=200000&addInfo=Chuc%20mung%20hanh%20phuc`
          : "";
      const brideQr =
        brideBank && brideAcc
          ? `https://img.vietqr.io/image/${brideBank}-${brideAcc}-compact.png?amount=200000&addInfo=Chuc%20mung%20hanh%20phuc`
          : "";

      if (
        prev.giftInfo?.groomQrUrl === groomQr &&
        prev.giftInfo?.brideQrUrl === brideQr
      ) {
        return prev;
      }

      const nextData = {
        ...prev,
        giftInfo: {
          ...prev.giftInfo,
          groomQrUrl: groomQr,
          brideQrUrl: brideQr,
        },
      };

      return nextData;
    });
  }, [
    weddingData.giftInfo?.groomBankName,
    weddingData.giftInfo?.groomAccountNumber,
    weddingData.giftInfo?.brideBankName,
    weddingData.giftInfo?.brideAccountNumber,
  ]);

  // Handler cập nhật dữ liệu và ghi nhận lịch sử
  const updateField = (path: string[], value: any) => {
    setWeddingData((prev: any) => {
      const copy = { ...prev };
      let current = copy;
      for (let i = 0; i < path.length - 1; i++) {
        if (!current[path[i]]) current[path[i]] = {};
        current = current[path[i]];
      }
      current[path[path.length - 1]] = value;

      // Lưu lịch sử sau khi cập nhật dữ liệu
      saveToHistory(copy);
      return copy;
    });
  };

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Cuộn preview đến vùng mong muốn
  const scrollToPreviewSection = (sectionId: string) => {
    setActivePageId(sectionId);
    const container = document.querySelector(".mockup-screen-content");
    if (container) {
      const target = container.querySelector(`#${sectionId}`);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  // Xử lý lưu nháp nhanh
  const handleSaveDraft = async () => {
    setSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      const now = new Date();
      setAutoSaveTime(`${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`);
      alert("Đã lưu chỉnh sửa thiệp thành công!");
    } catch (err) {
      alert("Có lỗi xảy ra khi lưu thiệp!");
    } finally {
      setSaving(false);
    }
  };

  // Tính toán % độ hoàn thiện dữ liệu
  const calculateProgress = () => {
    let score = 0;
    let total = 7;

    if (weddingData.groomName?.trim() && weddingData.groomName !== "Nguyễn Minh Khoa") score++;
    if (weddingData.brideName?.trim() && weddingData.brideName !== "Trần Khải Trâm") score++;
    if (weddingData.weddingDate) score++;
    if (weddingData.galleryImages?.length > 1) score++;
    if (weddingData.giftInfo?.groomAccountNumber || weddingData.giftInfo?.brideAccountNumber) score++;
    if (weddingData.contactInfo?.groomPhone || weddingData.contactInfo?.bridePhone) score++;
    if (weddingData.timeline?.length > 0) score++;

    return Math.round((score / total) * 100);
  };

  const progressPercent = calculateProgress();

  // Mô phỏng kéo rê chuột để cuộn mockup di động
  const handleDragScrollMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest("button") || target.closest("input") || target.closest("a") || target.closest("select")) {
      return;
    }

    const ele = e.currentTarget;
    const startY = e.pageY - ele.offsetTop;
    const scrollTop = ele.scrollTop;
    let isDragging = false;

    const handleMouseMove = (walkEvent: MouseEvent) => {
      isDragging = true;
      const y = walkEvent.pageY - ele.offsetTop;
      const walk = (y - startY) * 1.5;
      ele.scrollTop = scrollTop - walk;
    };

    const handleMouseUp = (upEvent: MouseEvent) => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      
      if (isDragging) {
        upEvent.stopPropagation();
        const preventClick = (clickEvent: MouseEvent) => {
          clickEvent.stopPropagation();
          clickEvent.preventDefault();
          document.removeEventListener("click", preventClick, true);
        };
        document.addEventListener("click", preventClick, true);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  // Tương tác trực tiếp click mockup để mở biểu mẫu tương ứng
  const handleMockupClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest("button") || target.closest("a") || target.closest("input") || target.closest("select")) {
      return;
    }

    const coverSection = target.closest("#cover");
    const countdownSection = target.closest("#countdown");
    const eventsSection = target.closest("#events");
    const gallerySection = target.closest("#gallery");
    const giftSection = target.closest("#gift");
    const guestbookSection = target.closest("#guestbook");

    if (coverSection) {
      setActiveTab("content");
      setOpenSections({ basic: true, cover: false, story: false, invitation: false, gallery: false, events: false, timeline: false, others: false, gift: false, wishes: false, music: false });
    } else if (countdownSection) {
      setActiveTab("story");
      setOpenSections({ basic: false, cover: false, story: true, invitation: false, gallery: false, events: false, timeline: false, others: false, gift: false, wishes: false, music: false });
    } else if (gallerySection) {
      setActiveTab("gallery");
      setOpenSections({ basic: false, cover: false, story: false, invitation: false, gallery: true, events: false, timeline: false, others: false, gift: false, wishes: false, music: false });
    } else if (eventsSection) {
      setActiveTab("events");
      setOpenSections({ basic: false, cover: false, story: false, invitation: false, gallery: false, events: true, timeline: false, others: false, gift: false, wishes: false, music: false });
    } else if (giftSection) {
      setActiveTab("gift");
      setOpenSections({ basic: false, cover: false, story: false, invitation: false, gallery: false, events: false, timeline: false, others: false, gift: true, wishes: false, music: false });
    } else if (guestbookSection) {
      setActiveTab("wishes");
      setOpenSections({ basic: false, cover: false, story: false, invitation: false, gallery: false, events: false, timeline: false, others: false, gift: false, wishes: true, music: false });
    }
  };

  // Xử lý Xuất bản
  const handlePublish = async () => {
    if (!weddingData.groomName.trim() || !weddingData.brideName.trim()) {
      alert("Vui lòng nhập đầy đủ tên Chú rể và Cô dâu!");
      return;
    }

    const selectedTemplate =
      TEMPLATES.find((t) => t.code === weddingData.templateId) || TEMPLATES[0];
    const isOwned =
      selectedTemplate.price === 0 ||
      purchasedTemplates.includes(selectedTemplate.id);
    if (!isOwned) {
      setUpgradeTemplateId(selectedTemplate.id);
      setShowUpgradeModal(true);
      return;
    }

    let slug = weddingData.slug.trim();
    if (!slug) {
      const normalizedGroom = weddingData.groomName
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]/g, "");
      const normalizedBride = weddingData.brideName
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]/g, "");
      slug = `${normalizedGroom}-${normalizedBride}`;
    }

    if (!isLoggedIn) {
      setShowAuthModal(true);
      return;
    }

    setPublishing(true);
    setError(null);

    try {
      const url = isEditMode
        ? `${API_URL}/api/weddings/${weddingSlug}`
        : `${API_URL}/api/weddings`;
      const method = isEditMode ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ ...weddingData, slug }),
      });

      const resData = await response.json();
      if (!response.ok) {
        throw new Error(resData.message || "Xuất bản thất bại!");
      }

      setPublishedSlug(slug);
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
      });
    } catch (err: any) {
      setError(err.message || "Đã xảy ra lỗi kết nối đến máy chủ!");
    } finally {
      setPublishing(false);
    }
  };

  // Đăng nhập / Đăng ký
  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authForm.username.trim() || !authForm.password.trim()) {
      setAuthError("Vui lòng điền đầy đủ các trường thông tin!");
      return;
    }
    if (
      authMode === "register" &&
      authForm.password !== authForm.confirmPassword
    ) {
      setAuthError("Mật khẩu xác nhận không khớp!");
      return;
    }

    setAuthLoading(true);
    setAuthError(null);

    try {
      const endpoint = authMode === "login" ? "login" : "register";
      const response = await fetch(
        `${API_URL}/api/auth/${endpoint}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: authForm.username,
            password: authForm.password,
          }),
        },
      );

      const resData = await response.json();
      if (!response.ok) {
        throw new Error(resData.message || "Xác thực thất bại!");
      }

      const { role, weddingSlug: userSlug } = resData.data;
      localStorage.setItem("role", role);
      localStorage.setItem("username", authForm.username);
      if (userSlug) localStorage.setItem("weddingSlug", userSlug);

      setIsLoggedIn(true);
      setShowAuthModal(false);

      setTimeout(() => {
        handlePublish();
      }, 100);
    } catch (err: any) {
      setAuthError(err.message || "Không thể thực hiện yêu cầu!");
    } finally {
      setAuthLoading(false);
    }
  };

  const selectedTemplate =
    TEMPLATES.find((t) => t.code === weddingData.templateId) || TEMPLATES[0];
  const currentTheme = selectedTemplate.themeClass;

  // Lấy template package động theo id
  const tplPackage = getTemplatePackage(weddingData.templateId);
  const LiveView = tplPackage.LiveView;

  if (loading) {
    return (
      <div className="h-screen bg-[#f8fafc] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-10 h-10 animate-spin text-[#db2777]" />
        <p className="text-sm font-medium text-slate-500 tracking-wide animate-pulse">
          Đang tải dữ liệu thiệp cưới...
        </p>
      </div>
    );
  }

  // Danh sách các trang hiển thị ở Carousel phía dưới
  const PAGES_CAROUSEL = [
    { id: "cover", label: "Trang bìa", number: "01", icon: <ImageIcon size={14} /> },
    { id: "countdown", label: "Câu chuyện", number: "02", icon: <BookOpen size={14} /> },
    { id: "events", label: "Thiệp mời", number: "03", icon: <FileText size={14} /> },
    { id: "gallery", label: "Album ảnh", number: "04", icon: <ImageIcon size={14} /> },
    { id: "events-detail", label: "Timeline", number: "05", icon: <Clock size={14} /> },
    { id: "events", label: "Sự kiện", number: "06", icon: <Calendar size={14} /> },
    { id: "footer", label: "Thông tin", number: "07", icon: <Settings size={14} /> },
    { id: "gift", label: "QR & Registry", number: "08", icon: <Gift size={14} /> },
  ];

  if (isMobileScreen) {
    return (
      <div className="h-screen w-screen bg-[#121212] text-zinc-100 flex flex-col overflow-hidden font-sans select-none antialiased">
        
        {/* HEADER MOBILE (TÔNG TỐI) */}
        <header className="h-14 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between px-4 flex-shrink-0 z-40">
          <button 
            onClick={() => navigate("/create")}
            className="p-2 text-zinc-400 hover:text-white border-0 bg-transparent cursor-pointer flex items-center justify-center active:scale-95 transition-all"
          >
            <ArrowLeft size={20} />
          </button>

          <div className="flex-1 max-w-[200px] mx-4 bg-zinc-800 border border-zinc-700 rounded-lg py-1.5 px-3 flex items-center justify-between gap-1.5 cursor-pointer text-xs font-semibold text-zinc-200">
            <span className="truncate">{selectedTemplate.name}</span>
            <ChevronDown size={14} className="text-zinc-400" />
          </div>

          <button 
            onClick={handlePublish}
            disabled={publishing}
            className="bg-[#db2777] hover:bg-[#be185d] text-white px-4 py-1.5 rounded-lg text-xs font-bold active:scale-95 transition-all cursor-pointer border-0 disabled:opacity-50"
          >
            {publishing ? "Đang xuất..." : "Xuất bản"}
          </button>
        </header>

        {/* BODY MOBILE */}
        {mobileActiveTab === "preview" ? (
          /* TAB PREVIEW: RENDER LIVEVIEW TRÀN MÀN HÌNH */
          <div className="flex-1 w-full bg-[#fdf6ef] overflow-y-auto scroll-smooth mockup-screen-content relative">
            <div className={`w-full min-h-full ${currentTheme} bg-background text-foreground transition-colors duration-500`}>
              <LiveView
                weddingData={weddingData}
                guestName="Khách mời danh dự"
                previewMode={previewMode}
              />
            </div>
          </div>
        ) : mobileActiveTab === "edit" ? (
          /* TAB CHỈNH SỬA: FORM BIỂU MẪU NHẬP LIỆU MÀU TỐI */
          <div className="flex-1 w-full overflow-y-auto p-4 space-y-4 bg-[#121212] text-left">
            
            {/* 1. THÔNG TIN CƠ BẢN */}
            <div className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900/40">
              <div 
                onClick={() => toggleMobileSection("basic")}
                className="flex items-center justify-between p-3.5 bg-zinc-900/80 hover:bg-zinc-800/70 transition-colors cursor-pointer border-b border-zinc-800"
              >
                <div className="flex items-center gap-2.5">
                  <Heart size={15} className="text-pink-500" />
                  <span className="text-xs font-bold text-zinc-200 uppercase tracking-wider">Thông tin cơ bản</span>
                </div>
                <ChevronDown 
                  size={15} 
                  className={`text-zinc-500 transition-transform duration-200 ${mobileOpenSections.basic ? "rotate-180" : ""}`} 
                />
              </div>

              {mobileOpenSections.basic && (
                <div className="p-4 space-y-4 bg-zinc-950/20">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-semibold text-zinc-400">Họ tên chú rể</label>
                      <input 
                        type="text"
                        value={weddingData.groomName}
                        onChange={(e) => updateField(["groomName"], e.target.value)}
                        placeholder="VD: Nguyễn Thế Bảo"
                        className="w-full border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs bg-zinc-900 text-zinc-100 outline-none focus:border-pink-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-semibold text-zinc-400">Họ tên cô dâu</label>
                      <input 
                        type="text"
                        value={weddingData.brideName}
                        onChange={(e) => updateField(["brideName"], e.target.value)}
                        placeholder="VD: Trần Ngọc Ánh"
                        className="w-full border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs bg-zinc-900 text-zinc-100 outline-none focus:border-pink-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-semibold text-zinc-400">Tên ngắn chú rể</label>
                      <input 
                        type="text"
                        value={weddingData.groomShortName || ""}
                        onChange={(e) => updateField(["groomShortName"], e.target.value)}
                        placeholder="VD: Thế Bảo"
                        className="w-full border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs bg-zinc-900 text-zinc-100 outline-none focus:border-pink-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-semibold text-zinc-400">Tên ngắn cô dâu</label>
                      <input 
                        type="text"
                        value={weddingData.brideShortName || ""}
                        onChange={(e) => updateField(["brideShortName"], e.target.value)}
                        placeholder="VD: Ngọc Ánh"
                        className="w-full border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs bg-zinc-900 text-zinc-100 outline-none focus:border-pink-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-semibold text-zinc-400">Danh xưng chú rể</label>
                      <input 
                        type="text"
                        value={weddingData.groomTitle || ""}
                        placeholder="VD: Trưởng Nam"
                        onChange={(e) => updateField(["groomTitle"], e.target.value)}
                        className="w-full border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs bg-zinc-900 text-zinc-100 outline-none focus:border-pink-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-semibold text-zinc-400">Danh xưng cô dâu</label>
                      <input 
                        type="text"
                        value={weddingData.brideTitle || ""}
                        placeholder="VD: Út Nữ"
                        onChange={(e) => updateField(["brideTitle"], e.target.value)}
                        className="w-full border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs bg-zinc-900 text-zinc-100 outline-none focus:border-pink-500"
                      />
                    </div>
                  </div>

                  {currentTemplate.schema.cover.hasCoverImage && (
                    <div className="space-y-1 pt-3 border-t border-zinc-800">
                      <label className="text-[10px] font-semibold text-pink-500 uppercase tracking-wider">Ảnh bìa thiệp (Cover)</label>
                      <input 
                        type="text"
                        value={weddingData.templateConfig?.coverImage || ""}
                        placeholder="Nhập đường dẫn URL ảnh khổ dọc (3:4)"
                        onChange={(e) => {
                          setWeddingData((prev) => ({
                            ...prev,
                            templateConfig: {
                              ...prev.templateConfig,
                              coverImage: e.target.value,
                            }
                          }));
                        }}
                        className="w-full border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs bg-zinc-900 text-zinc-100 outline-none focus:border-pink-500"
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Thứ tự hiển thị</label>
                    <div className="flex gap-2">
                      <button 
                        type="button"
                        onClick={() => updateField(["showGroomFirst"], true)}
                        className={`flex-1 py-2 rounded-lg text-xs font-semibold border-0 cursor-pointer transition-all ${
                          weddingData.showGroomFirst !== false
                            ? "bg-zinc-800 text-zinc-100 font-bold"
                            : "bg-zinc-900/40 text-zinc-500"
                        }`}
                      >
                        Nhà trai trước
                      </button>
                      <button 
                        type="button"
                        onClick={() => updateField(["showGroomFirst"], false)}
                        className={`flex-1 py-2 rounded-lg text-xs font-semibold border-0 cursor-pointer transition-all ${
                          weddingData.showGroomFirst === false
                            ? "bg-zinc-800 text-zinc-100 font-bold"
                            : "bg-zinc-900/40 text-zinc-500"
                        }`}
                      >
                        Nhà gái trước
                      </button>
                    </div>
                    <p className="text-[9px] text-zinc-500 leading-normal">Hiển thị tên chú rể và nhà trai trước trên thiệp</p>
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-zinc-400">Link nhạc nền (tuỳ chọn)</label>
                    <input 
                      type="text"
                      value={weddingData.musicUrl || ""}
                      placeholder="Nhập đường dẫn file MP3"
                      onChange={(e) => updateField(["musicUrl"], e.target.value)}
                      className="w-full border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs bg-zinc-900 text-zinc-100 outline-none focus:border-pink-500"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* 2. ẢNH ĐẦU THIỆP */}
            <div className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900/40">
              <div 
                onClick={() => toggleMobileSection("cover")}
                className="flex items-center justify-between p-3.5 bg-zinc-900/80 hover:bg-zinc-800/70 transition-colors cursor-pointer border-b border-zinc-800"
              >
                <div className="flex items-center gap-2.5">
                  <ImageIcon size={15} className="text-pink-500" />
                  <span className="text-xs font-bold text-zinc-200 uppercase tracking-wider">Ảnh đầu thiệp</span>
                </div>
                <ChevronDown 
                  size={15} 
                  className={`text-zinc-500 transition-transform duration-200 ${mobileOpenSections.cover ? "rotate-180" : ""}`} 
                />
              </div>

              {mobileOpenSections.cover && (
                <div className="p-4 bg-zinc-950/20 text-center space-y-3">
                  <div className="w-24 h-24 rounded-lg bg-zinc-900 border border-zinc-800 mx-auto flex items-center justify-center overflow-hidden">
                    {weddingData.galleryImages?.[0] ? (
                      <img src={weddingData.galleryImages[0]} alt="Ảnh bìa" className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon size={24} className="text-zinc-600" />
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => {
                        const url = prompt("Nhập đường dẫn URL ảnh đầu thiệp cưới:", weddingData.galleryImages?.[0] || "");
                        if (url) {
                          const updated = [...(weddingData.galleryImages || [])];
                          updated[0] = url;
                          updateField(["galleryImages"], updated);
                        }
                      }}
                      className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border-0 rounded-lg py-1.5 text-xs font-semibold cursor-pointer"
                    >
                      Đổi ảnh
                    </button>
                    <button 
                      onClick={() => {
                        if (confirm("Xóa ảnh bìa?")) {
                          const updated = [...(weddingData.galleryImages || [])];
                          updated[0] = "";
                          updateField(["galleryImages"], updated);
                        }
                      }}
                      className="bg-transparent hover:bg-red-950/20 text-red-400 border border-red-900/30 rounded-lg px-3 py-1.5 text-xs font-semibold cursor-pointer"
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 3. NHẠC NỀN */}
            <div className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900/40">
              <div 
                onClick={() => toggleMobileSection("music")}
                className="flex items-center justify-between p-3.5 bg-zinc-900/80 hover:bg-zinc-800/70 transition-colors cursor-pointer border-b border-zinc-800"
              >
                <div className="flex items-center gap-2.5">
                  <Music size={15} className="text-pink-500" />
                  <span className="text-xs font-bold text-zinc-200 uppercase tracking-wider">Nhạc nền</span>
                </div>
                <ChevronDown 
                  size={15} 
                  className={`text-zinc-500 transition-transform duration-200 ${mobileOpenSections.music ? "rotate-180" : ""}`} 
                />
              </div>

              {mobileOpenSections.music && (
                <div className="p-4 bg-zinc-950/20 space-y-3">
                  <div className="flex items-center justify-between bg-zinc-900 p-2.5 rounded-lg border border-zinc-800">
                    <span className="text-xs text-zinc-200 font-medium">A Thousand Years.mp3</span>
                    <button className="w-7 h-7 rounded-full bg-pink-500/10 text-pink-500 border-0 cursor-pointer flex items-center justify-center">
                      <Play size={12} fill="currentColor" />
                    </button>
                  </div>
                  <button className="w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 rounded-lg py-2 text-xs font-semibold cursor-pointer">
                    Thay đổi nhạc nền
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* TAB SETTINGS/NGÔN NGỮ */
          <div className="flex-1 w-full overflow-y-auto p-4 space-y-4 bg-[#121212] text-left">
            <div className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900/40 p-4 space-y-3">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Cài đặt chung</span>
              <div className="flex justify-between items-center bg-zinc-950/20 p-2.5 rounded-lg border border-zinc-800">
                <span className="text-xs text-zinc-300">Ngôn ngữ hiển thị</span>
                <span className="bg-zinc-800 border border-zinc-700 text-zinc-200 px-3 py-1 rounded text-2xs font-bold">Tiếng Việt (VI)</span>
              </div>
            </div>
          </div>
        )}

        {/* BOTTOM NAV BAR MOBILE */}
        <footer className="h-16 bg-zinc-900 border-t border-zinc-800 flex justify-around items-center flex-shrink-0 z-40">
          <button 
            onClick={() => setMobileActiveTab("edit")}
            className={`flex flex-col items-center gap-1 border-0 bg-transparent cursor-pointer ${
              mobileActiveTab === "edit" ? "text-pink-500 font-semibold" : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <PenTool size={18} />
            <span className="text-[10px]">Chỉnh sửa</span>
          </button>
          <button 
            onClick={() => setMobileActiveTab("preview")}
            className={`flex flex-col items-center gap-1 border-0 bg-transparent cursor-pointer ${
              mobileActiveTab === "preview" ? "text-pink-500 font-semibold" : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Eye size={18} />
            <span className="text-[10px]">Xem trước</span>
          </button>
          <button 
            onClick={() => setMobileActiveTab("settings")}
            className={`flex flex-col items-center gap-1 border-0 bg-transparent cursor-pointer ${
              mobileActiveTab === "settings" ? "text-pink-500 font-semibold" : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-[10px] font-bold text-zinc-300">
              VI
            </span>
            <span className="text-[10px]">Ngôn ngữ</span>
          </button>
        </footer>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-hidden bg-[#f1f5f9] text-slate-800 flex flex-col font-sans select-none antialiased">
      
      {/* ── HEADER (TOP BAR) ─────────────────────────────────────────────────── */}
      <header className="bg-white border-b border-slate-200 h-14 flex items-center justify-between px-4 z-40 shadow-xs flex-shrink-0">
        
        {/* BÊN TRÁI: Logo Viora + Tên thiết kế + Auto-Save Status */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            <span className="text-2xl text-[#db2777]">🌸</span>
            <div className="flex flex-col text-left">
              <span
                className="text-md font-bold tracking-widest text-[#2c1810] leading-none"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                VIORA
              </span>
              <span className="text-[6px] text-[#7a5c4f]/60 tracking-wider font-semibold">
                WEDDING INVITATIONS
              </span>
            </div>
          </div>

          <div className="h-5 w-px bg-slate-200" />

          {/* Tên mẫu thiệp & Chỉnh sửa */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-slate-700">{selectedTemplate.name}</span>
            <button className="p-1 hover:bg-slate-100 rounded-md transition-colors text-slate-400 border-0 bg-transparent cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
              </svg>
            </button>
          </div>

          {/* Trạng thái đã lưu */}
          <div className="hidden md:flex items-center gap-1.5 text-[11px] text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-full px-2.5 py-0.5 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Đã lưu tự động {autoSaveTime}</span>
          </div>
        </div>

        {/* Ở GIỮA: Chuyển thiết bị xem thử + Zoom + Undo/Redo */}
        <div className="flex items-center gap-4">
          
          {/* Switch Device Mode */}
          <div className="flex p-0.5 bg-slate-100 rounded-lg border border-slate-200">
            <button
              onClick={() => setPreviewDevice("mobile")}
              className={`p-1.5 rounded-md transition-all cursor-pointer border-0 bg-transparent ${
                previewDevice === "mobile"
                  ? "bg-white text-[#db2777] shadow-xs"
                  : "text-slate-500 hover:text-slate-700"
              }`}
              title="Giao diện di động"
            >
              <Smartphone size={16} />
            </button>
            <button
              onClick={() => setPreviewDevice("desktop")}
              className={`p-1.5 rounded-md transition-all cursor-pointer border-0 bg-transparent ${
                previewDevice === "desktop"
                  ? "bg-white text-[#db2777] shadow-xs"
                  : "text-slate-500 hover:text-slate-700"
              }`}
              title="Giao diện máy tính"
            >
              <Monitor size={16} />
            </button>
          </div>

          <div className="h-5 w-px bg-slate-200" />

          {/* Zoom Level controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setZoomLevel(Math.max(50, zoomLevel - 10))}
              className="p-1 hover:bg-slate-100 rounded-md text-slate-500 font-bold text-xs border-0 bg-transparent cursor-pointer"
            >
              —
            </button>
            <span className="text-xs font-semibold text-slate-600 min-w-[36px] text-center">{zoomLevel}%</span>
            <button
              onClick={() => setZoomLevel(Math.min(150, zoomLevel + 10))}
              className="p-1 hover:bg-slate-100 rounded-md text-slate-500 font-bold text-xs border-0 bg-transparent cursor-pointer"
            >
              ＋
            </button>
          </div>

          <div className="h-5 w-px bg-slate-200" />

          {/* Undo / Redo */}
          <div className="flex gap-1">
            <button
              onClick={handleUndo}
              disabled={historyIndex <= 0}
              className={`p-1.5 rounded-md transition-colors border-0 bg-transparent ${
                historyIndex > 0 ? "hover:bg-slate-100 text-slate-600 cursor-pointer" : "text-slate-300 cursor-not-allowed"
              }`}
              title="Hoàn tác"
            >
              <Undo2 size={16} />
            </button>
            <button
              onClick={handleRedo}
              disabled={historyIndex >= historyStack.length - 1}
              className={`p-1.5 rounded-md transition-colors border-0 bg-transparent ${
                historyIndex < historyStack.length - 1 ? "hover:bg-slate-100 text-slate-600 cursor-pointer" : "text-slate-300 cursor-not-allowed"
              }`}
              title="Làm lại"
            >
              <Redo2 size={16} />
            </button>
          </div>

        </div>

        {/* BÊN PHẢI: Xem trước + Lưu + Xuất bản */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setEditorView(editorView === "edit" ? "preview" : "edit")}
            className="flex items-center gap-1.5 border border-slate-200 text-slate-600 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white hover:bg-slate-50 active:scale-95 transition-all cursor-pointer"
          >
            <Eye size={14} />
            <span>Xem trước</span>
          </button>
          <button
            onClick={handleSaveDraft}
            disabled={saving}
            className="flex items-center gap-1.5 border border-slate-200 text-slate-600 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white hover:bg-slate-50 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
          >
            {saving ? <Loader2 size={14} className="animate-spin text-[#db2777]" /> : <Save size={14} />}
            <span>Lưu</span>
          </button>
          <button
            onClick={handlePublish}
            disabled={publishing}
            className="flex items-center gap-1.5 bg-[#db2777] hover:bg-[#be185d] text-white px-5 py-1.5 rounded-full text-xs font-semibold active:scale-95 transition-all disabled:opacity-50 cursor-pointer border-0 shadow-md font-sans"
          >
            {publishing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Share2 size={13} />}
            <span>Xuất bản</span>
          </button>
        </div>

      </header>

      {/* ── WORKSPACE CONTAINER (3 COLUMNS) ─────────────────────────────────── */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* CỘT 1: SIDEBAR TRÁI HẸP (TAB SELECTOR) */}
        <div className="w-[72px] bg-white border-r border-slate-200 flex flex-col justify-between py-4 items-center flex-shrink-0">
          <div className="flex flex-col gap-1.5 w-full px-1">
            {[
              { id: "content", label: "Nội dung", icon: <FileText size={18} /> },
              { id: "cover", label: "Trang bìa", icon: <ImageIcon size={18} /> },
              { id: "story", label: "Câu chuyện", icon: <BookOpen size={18} /> },
              { id: "invitation", label: "Thiệp mời", icon: <Mail size={18} /> },
              { id: "gallery", label: "Album ảnh", icon: <ImageIcon size={18} /> },
              { id: "events", label: "Sự kiện", icon: <Calendar size={18} /> },
              { id: "timeline", label: "Timeline", icon: <Clock size={18} /> },
              { id: "gift", label: "QR & Quà", icon: <Gift size={18} /> },
              { id: "wishes", label: "Lời chúc", icon: <Volume2 size={18} /> },
              { id: "music", label: "Nhạc nền", icon: <Music size={18} /> },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setOpenSections((prev) => {
                      const next = { ...prev };
                      Object.keys(next).forEach((k) => (next[k] = false));
                      if (tab.id === "content") next.basic = true;
                      else if (tab.id === "cover") next.cover = true;
                      else if (tab.id === "story") next.story = true;
                      else if (tab.id === "invitation") next.invitation = true;
                      else if (tab.id === "gallery") next.gallery = true;
                      else if (tab.id === "events") next.events = true;
                      else if (tab.id === "timeline") next.timeline = true;
                      else if (tab.id === "gift") next.gift = true;
                      else if (tab.id === "wishes") next.wishes = true;
                      else if (tab.id === "music") next.music = true;
                      return next;
                    });
                    scrollToPreviewSection(tab.id === "content" ? "cover" : tab.id === "story" ? "countdown" : tab.id);
                  }}
                  className={`w-full py-2.5 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all border-0 bg-transparent cursor-pointer ${
                    isActive
                      ? "text-[#db2777] bg-pink-50 font-semibold"
                      : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {tab.icon}
                  <span className="text-[9px] tracking-tight">{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-col gap-1 w-full px-1">
            <button className="w-full py-2 rounded-xl flex flex-col items-center justify-center gap-1 text-slate-400 hover:text-slate-600 border-0 bg-transparent cursor-pointer">
              <Settings size={18} />
              <span className="text-[9px]">Cài đặt</span>
            </button>
          </div>
        </div>

        {/* CỘT 2: SIDEBAR TRÁI RỘNG (CHỈNH SỬA NỘI DUNG FORM) */}
        <div className="w-[340px] bg-white border-r border-slate-200 flex flex-col flex-shrink-0 overflow-y-auto">
          
          <div className="p-4 border-b border-slate-100 bg-slate-50/50">
            <h2 className="text-[13px] font-bold uppercase tracking-wider text-slate-700">Chỉnh sửa nội dung</h2>
            <p className="text-[11px] text-slate-400 mt-0.5">Thay đổi thông tin hiển thị trên thiệp</p>
          </div>

          {/* Thanh Tiến trình hoàn thiện */}
          <div className="px-4 py-3 border-b border-slate-100 bg-pink-50/10 space-y-2 text-left flex-shrink-0">
            <div className="flex justify-between items-center text-[10px] font-bold text-slate-500">
              <span>ĐỘ HOÀN THIỆN THIỆP CƯỚI</span>
              <span className="text-[#db2777]">{progressPercent}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-pink-400 to-[#db2777] transition-all duration-500 rounded-full" 
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="text-[9px] text-slate-400 leading-normal">
              {progressPercent === 100 
                ? "🎉 Tuyệt vời! Thiệp mời đã đầy đủ thông tin." 
                : "Bổ sung thêm hình ảnh, số tài khoản mừng cưới để hoàn thiện thiệp."}
            </p>
          </div>

          <div className="p-3 space-y-2">
            
            {/* ACCORDION 1: THÔNG TIN CÔ DÂU CHÚ RỂ */}
            <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
              <div
                onClick={() => toggleSection("basic")}
                className="flex items-center justify-between p-3.5 bg-slate-50 hover:bg-slate-100/70 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Heart size={15} className="text-[#db2777]" />
                  <span className="text-xs font-bold text-slate-700">Thông tin cô dâu chủ rể</span>
                </div>
                {openSections.basic ? <ChevronDown size={14} className="text-slate-400" /> : <ChevronRight size={14} className="text-slate-400" />}
              </div>

              {openSections.basic && (
                <div className="p-4 border-t border-slate-200 bg-white space-y-3.5 text-left">
                  <div className="space-y-1">
                    <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Tên chú rể</label>
                    <input
                      type="text"
                      value={weddingData.groomName}
                      onChange={(e) => updateField(["groomName"], e.target.value)}
                      placeholder="Nhập tên chú rể"
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-700 outline-none focus:border-[#db2777] bg-slate-50/30"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Tên cô dâu</label>
                    <input
                      type="text"
                      value={weddingData.brideName}
                      onChange={(e) => updateField(["brideName"], e.target.value)}
                      placeholder="Nhập tên cô dâu"
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-700 outline-none focus:border-[#db2777] bg-slate-50/30"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Tiêu đề phụ</label>
                    <input
                      type="text"
                      value={weddingData.groomTitle || "We're Getting Married"}
                      onChange={(e) => updateField(["groomTitle"], e.target.value)}
                      placeholder="Nhập tiêu đề phụ"
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-700 outline-none focus:border-[#db2777] bg-slate-50/30"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Ngày cưới</label>
                    <div className="relative">
                      <input
                        type="date"
                        value={weddingData.weddingDate}
                        onChange={(e) => updateField(["weddingDate"], e.target.value)}
                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-700 outline-none focus:border-[#db2777] bg-slate-50/30"
                      />
                    </div>
                  </div>

                  {currentTemplate.schema.cover.hasCoverImage && (
                    <div className="space-y-1 pt-3 border-t border-slate-100">
                      <label className="block text-[11px] font-semibold text-[#db2777] uppercase tracking-wider">Ảnh bìa (Cover Image)</label>
                      <input
                        type="text"
                        value={weddingData.templateConfig?.coverImage || ""}
                        onChange={(e) => {
                          setWeddingData((prev) => ({
                            ...prev,
                            templateConfig: {
                              ...prev.templateConfig,
                              coverImage: e.target.value,
                            }
                          }));
                        }}
                        placeholder="URL ảnh bìa (3:4 dọc)"
                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-700 outline-none focus:border-[#db2777] bg-slate-50/30"
                      />
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Link nhạc nền</label>
                    <input
                      type="text"
                      value={weddingData.musicUrl || ""}
                      onChange={(e) => updateField(["musicUrl"], e.target.value)}
                      placeholder="Nhập đường dẫn file nhạc (.mp3)"
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-700 outline-none focus:border-[#db2777] bg-slate-50/30"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* ACCORDION 2: ẢNH BÌA */}
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <div
                onClick={() => toggleSection("cover")}
                className="flex items-center justify-between p-3.5 bg-slate-50 hover:bg-slate-100/70 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <ImageIcon size={15} className="text-slate-500" />
                  <span className="text-xs font-bold text-slate-700">Ảnh bìa</span>
                </div>
                {openSections.cover ? <ChevronDown size={14} className="text-slate-400" /> : <ChevronRight size={14} className="text-slate-400" />}
              </div>
              {openSections.cover && (
                <div className="p-4 border-t border-slate-200 bg-white space-y-3 text-left">
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-semibold text-slate-500 uppercase">Đường dẫn ảnh bìa</label>
                    <input
                      type="text"
                      value={weddingData.galleryImages?.[0] || ""}
                      onChange={(e) => {
                        const updated = [...(weddingData.galleryImages || [])];
                        updated[0] = e.target.value;
                        updateField(["galleryImages"], updated);
                      }}
                      placeholder="Nhập link URL ảnh bìa"
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-700 outline-none focus:border-[#db2777]"
                    />
                  </div>
                  <div className="w-full aspect-[4/3] bg-slate-100 border border-slate-200 rounded-lg overflow-hidden relative flex items-center justify-center">
                    {weddingData.galleryImages?.[0] ? (
                      <img src={weddingData.galleryImages[0]} alt="Ảnh bìa" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-xs text-slate-400">Không có ảnh bìa</span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* ACCORDION 3: CÂU CHUYỆN TÌNH YÊU */}
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <div
                onClick={() => toggleSection("story")}
                className="flex items-center justify-between p-3.5 bg-slate-50 hover:bg-slate-100/70 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <BookOpen size={15} className="text-slate-500" />
                  <span className="text-xs font-bold text-slate-700">Câu chuyện tình yêu</span>
                </div>
                {openSections.story ? <ChevronDown size={14} className="text-slate-400" /> : <ChevronRight size={14} className="text-slate-400" />}
              </div>
              {openSections.story && (
                <div className="p-4 border-t border-slate-200 bg-white space-y-3 text-left">
                  {weddingData.timeline?.map((item, idx) => (
                    <div key={idx} className="border border-slate-100 p-3 rounded-lg bg-slate-50/50 space-y-2 relative">
                      <button
                        onClick={() => {
                          const updated = weddingData.timeline.filter((_, i) => i !== idx);
                          updateField(["timeline"], updated);
                        }}
                        className="absolute top-2 right-2 p-1 hover:bg-red-50 rounded-md text-red-500 border-0 bg-transparent cursor-pointer"
                      >
                        <Trash2 size={12} />
                      </button>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="space-y-1">
                          <label className="text-[10px] font-semibold text-slate-500 uppercase">Năm</label>
                          <input
                            type="text"
                            value={item.year}
                            onChange={(e) => {
                              const updated = [...weddingData.timeline];
                              updated[idx] = { ...updated[idx], year: e.target.value };
                              updateField(["timeline"], updated);
                            }}
                            className="w-full border border-slate-200 rounded-md px-2 py-1 text-2xs text-slate-700 outline-none"
                          />
                        </div>
                        <div className="col-span-2 space-y-1">
                          <label className="text-[10px] font-semibold text-slate-500 uppercase">Tiêu đề</label>
                          <input
                            type="text"
                            value={item.title}
                            onChange={(e) => {
                              const updated = [...weddingData.timeline];
                              updated[idx] = { ...updated[idx], title: e.target.value };
                              updateField(["timeline"], updated);
                            }}
                            className="w-full border border-slate-200 rounded-md px-2 py-1 text-2xs text-slate-700 outline-none"
                          />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-semibold text-slate-500 uppercase">Mô tả</label>
                        <textarea
                          rows={2}
                          value={item.description}
                          onChange={(e) => {
                            const updated = [...weddingData.timeline];
                            updated[idx] = { ...updated[idx], description: e.target.value };
                            updateField(["timeline"], updated);
                          }}
                          className="w-full border border-slate-200 rounded-md px-2 py-1 text-2xs text-slate-700 outline-none resize-none"
                        />
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      const updated = [...(weddingData.timeline || [])];
                      updated.push({ year: "2026", title: "Cột mốc mới", description: "Mô tả cột mốc tình yêu..." });
                      updateField(["timeline"], updated);
                    }}
                    className="w-full border border-dashed border-[#db2777] text-[#db2777] hover:bg-pink-50/50 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer bg-transparent"
                  >
                    <Plus size={14} />
                    <span>Thêm cột mốc câu chuyện</span>
                  </button>
                </div>
              )}
            </div>

            {/* ACCORDION 4: ALBUM ẢNH */}
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <div
                onClick={() => toggleSection("gallery")}
                className="flex items-center justify-between p-3.5 bg-slate-50 hover:bg-slate-100/70 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <ImageIcon size={15} className="text-slate-500" />
                  <span className="text-xs font-bold text-slate-700">Album ảnh cưới</span>
                </div>
                {openSections.gallery ? <ChevronDown size={14} className="text-slate-400" /> : <ChevronRight size={14} className="text-slate-400" />}
              </div>
              {openSections.gallery && (
                <div className="p-4 border-t border-slate-200 bg-white space-y-3.5 text-left">
                  <div className="grid grid-cols-3 gap-2">
                    {weddingData.galleryImages?.map((img, idx) => (
                      <div key={idx} className="relative aspect-square border border-slate-200 rounded-lg overflow-hidden group">
                        <img src={img} alt={`Ảnh cưới ${idx + 1}`} className="w-full h-full object-cover" />
                        <button
                          onClick={() => {
                            const updated = weddingData.galleryImages.filter((_, i) => i !== idx);
                            updateField(["galleryImages"], updated);
                          }}
                          className="absolute top-1 right-1 bg-black/60 hover:bg-red-600 p-1 rounded-md text-white border-0 cursor-pointer hidden group-hover:block transition-colors"
                        >
                          <Trash2 size={10} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-semibold text-slate-500 uppercase">Thêm ảnh mới (Đường dẫn URL)</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        id="new-image-url"
                        placeholder="Nhập link URL ảnh"
                        className="flex-1 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 outline-none focus:border-[#db2777]"
                      />
                      <button
                        onClick={() => {
                          const input = document.getElementById("new-image-url") as HTMLInputElement;
                          if (input && input.value.trim()) {
                            const updated = [...(weddingData.galleryImages || [])];
                            updated.push(input.value.trim());
                            updateField(["galleryImages"], updated);
                            input.value = "";
                          }
                        }}
                        className="bg-[#db2777] text-white hover:bg-[#be185d] px-3.5 py-1.5 rounded-lg text-xs font-semibold border-0 cursor-pointer"
                      >
                        Thêm
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ACCORDION 5: SỰ KIỆN */}
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <div
                onClick={() => toggleSection("events")}
                className="flex items-center justify-between p-3.5 bg-slate-50 hover:bg-slate-100/70 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Calendar size={15} className="text-slate-500" />
                  <span className="text-xs font-bold text-slate-700">Các sự kiện cưới</span>
                </div>
                {openSections.events ? <ChevronDown size={14} className="text-slate-400" /> : <ChevronRight size={14} className="text-slate-400" />}
              </div>
              {openSections.events && (
                <div className="p-4 border-t border-slate-200 bg-white space-y-4 text-left">
                  {weddingData.events?.map((ev, idx) => (
                    <div key={idx} className="border border-slate-200 p-3.5 rounded-xl bg-slate-50/50 space-y-3">
                      <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                        <span className="text-xs font-bold text-slate-700">{ev.title}</span>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-semibold text-slate-500 uppercase">Tên buổi lễ</label>
                        <input
                          type="text"
                          value={ev.title}
                          onChange={(e) => {
                            const updated = [...weddingData.events];
                            updated[idx] = { ...updated[idx], title: e.target.value };
                            updateField(["events"], updated);
                          }}
                          className="w-full border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-semibold text-slate-500 uppercase">Giờ</label>
                          <input
                            type="time"
                            value={ev.time}
                            onChange={(e) => {
                              const updated = [...weddingData.events];
                              updated[idx] = { ...updated[idx], time: e.target.value };
                              updateField(["events"], updated);
                            }}
                            className="w-full border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 outline-none"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-semibold text-slate-500 uppercase">Ngày</label>
                          <input
                            type="date"
                            value={ev.date}
                            onChange={(e) => {
                              const updated = [...weddingData.events];
                              updated[idx] = { ...updated[idx], date: e.target.value };
                              updateField(["events"], updated);
                            }}
                            className="w-full border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 outline-none"
                          />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-semibold text-slate-500 uppercase">Địa điểm</label>
                        <input
                          type="text"
                          value={ev.locationName}
                          onChange={(e) => {
                            const updated = [...weddingData.events];
                            updated[idx] = { ...updated[idx], locationName: e.target.value };
                            updateField(["events"], updated);
                          }}
                          className="w-full border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 outline-none"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-semibold text-slate-500 uppercase">Địa chỉ</label>
                        <input
                          type="text"
                          value={ev.address}
                          onChange={(e) => {
                            const updated = [...weddingData.events];
                            updated[idx] = { ...updated[idx], address: e.target.value };
                            updateField(["events"], updated);
                          }}
                          className="w-full border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 outline-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ACCORDION 6: QR & REGISTRY */}
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <div
                onClick={() => toggleSection("gift")}
                className="flex items-center justify-between p-3.5 bg-slate-50 hover:bg-slate-100/70 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Gift size={15} className="text-slate-500" />
                  <span className="text-xs font-bold text-slate-700">QR & Quà tặng (Registry)</span>
                </div>
                {openSections.gift ? <ChevronDown size={14} className="text-slate-400" /> : <ChevronRight size={14} className="text-slate-400" />}
              </div>
              {openSections.gift && (
                <div className="p-4 border-t border-slate-200 bg-white space-y-4 text-left">
                  {/* Chú rể */}
                  <div className="border border-slate-100 p-3 rounded-lg bg-slate-50/50 space-y-2.5">
                    <span className="text-2xs font-bold text-[#db2777] uppercase tracking-wider">Tài khoản Chú rể</span>
                    <div className="space-y-1">
                      <label className="text-[10px] font-semibold text-slate-500">Ngân hàng</label>
                      <input
                        type="text"
                        value={weddingData.giftInfo?.groomBankName || ""}
                        onChange={(e) => updateField(["giftInfo", "groomBankName"], e.target.value)}
                        placeholder="VD: Vietcombank"
                        className="w-full border border-slate-200 rounded-md px-2 py-1.5 text-xs text-slate-700 outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-semibold text-slate-500">Số tài khoản</label>
                      <input
                        type="text"
                        value={weddingData.giftInfo?.groomAccountNumber || ""}
                        onChange={(e) => updateField(["giftInfo", "groomAccountNumber"], e.target.value)}
                        placeholder="Nhập số tài khoản"
                        className="w-full border border-slate-200 rounded-md px-2 py-1.5 text-xs text-slate-700 outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-semibold text-slate-500">Tên chủ tài khoản</label>
                      <input
                        type="text"
                        value={weddingData.giftInfo?.groomAccountName || ""}
                        onChange={(e) => updateField(["giftInfo", "groomAccountName"], e.target.value)}
                        placeholder="Nhập tên viết hoa không dấu"
                        className="w-full border border-slate-200 rounded-md px-2 py-1.5 text-xs text-slate-700 outline-none"
                      />
                    </div>
                  </div>

                  {/* Cô dâu */}
                  <div className="border border-slate-100 p-3 rounded-lg bg-slate-50/50 space-y-2.5">
                    <span className="text-2xs font-bold text-pink-600 uppercase tracking-wider">Tài khoản Cô dâu</span>
                    <div className="space-y-1">
                      <label className="text-[10px] font-semibold text-slate-500">Ngân hàng</label>
                      <input
                        type="text"
                        value={weddingData.giftInfo?.brideBankName || ""}
                        onChange={(e) => updateField(["giftInfo", "brideBankName"], e.target.value)}
                        placeholder="VD: Techcombank"
                        className="w-full border border-slate-200 rounded-md px-2 py-1.5 text-xs text-slate-700 outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-semibold text-slate-500">Số tài khoản</label>
                      <input
                        type="text"
                        value={weddingData.giftInfo?.brideAccountNumber || ""}
                        onChange={(e) => updateField(["giftInfo", "brideAccountNumber"], e.target.value)}
                        placeholder="Nhập số tài khoản"
                        className="w-full border border-slate-200 rounded-md px-2 py-1.5 text-xs text-slate-700 outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-semibold text-slate-500">Tên chủ tài khoản</label>
                      <input
                        type="text"
                        value={weddingData.giftInfo?.brideAccountName || ""}
                        onChange={(e) => updateField(["giftInfo", "brideAccountName"], e.target.value)}
                        placeholder="Nhập tên viết hoa không dấu"
                        className="w-full border border-slate-200 rounded-md px-2 py-1.5 text-xs text-slate-700 outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ACCORDION 7: NHẠC NỀN */}
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <div
                onClick={() => toggleSection("music")}
                className="flex items-center justify-between p-3.5 bg-slate-50 hover:bg-slate-100/70 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Music size={15} className="text-slate-500" />
                  <span className="text-xs font-bold text-slate-700">Lựa chọn Nhạc nền</span>
                </div>
                {openSections.music ? <ChevronDown size={14} className="text-slate-400" /> : <ChevronRight size={14} className="text-slate-400" />}
              </div>
              {openSections.music && (
                <div className="p-4 border-t border-slate-200 bg-white space-y-3 text-left">
                  <div className="border border-slate-100 p-3 rounded-lg bg-pink-50/20 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-800">A Thousand Years</p>
                      <p className="text-[10px] text-slate-500">Christina Perri · Piano Version</p>
                    </div>
                    <button className="w-8 h-8 rounded-full bg-[#db2777] text-white flex items-center justify-center border-0 cursor-pointer shadow-md hover:bg-[#be185d]">
                      <Play size={12} fill="white" className="ml-0.5" />
                    </button>
                  </div>
                  <button className="w-full bg-slate-100 hover:bg-slate-200/70 border border-slate-200 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer">
                    Thay đổi nhạc nền
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>

        {/* CỘT 3: VIEWPORT PREVIEW (MOCKUP Ở GIỮA) */}
        <div className="flex-1 bg-[#f8fafc] flex flex-col items-center justify-between overflow-hidden relative p-4">
          
          {/* Mockup Container */}
          <div className="flex-1 w-full flex items-center justify-center overflow-hidden py-4">
            <div
              style={{
                transform: `scale(${zoomLevel / 100})`,
                transformOrigin: "center center",
                transition: "transform 0.15s ease-out",
              }}
              className="relative transition-all duration-300 flex-shrink-0 h-full flex items-center justify-center"
            >
              {previewDevice === "mobile" ? (
                /* MOBILE MOCKUP: Chuẩn iPhone 15 Pro (co giãn theo chiều cao màn hình) */
                <div className="relative aspect-[415/876] h-full max-h-[calc(100vh-140px)] shadow-2xl transition-all duration-300 flex flex-col">
                  {/* Ảnh Frame iPhone 15 Pro nằm ở lớp dưới */}
                  <img 
                    src={iphone15ProFrame.src} 
                    alt="iPhone 15 Pro Frame" 
                    className="absolute inset-0 w-full h-full object-fill pointer-events-none z-10"
                  />

                  {/* Vùng nội dung màn hình sử dụng % để co giãn khớp với viền iPhone khi scale */}
                  <div 
                    onMouseDown={handleDragScrollMouseDown}
                    onClick={handleMockupClick}
                    className="absolute top-[2.28%] left-[4.58%] w-[90.84%] h-[95.43%] rounded-[10%] overflow-y-auto scroll-smooth bg-[#fdf6ef] mockup-screen-content z-20 cursor-grab active:cursor-grabbing select-none"
                  >
                    <div className={`w-full h-full ${currentTheme} bg-background text-foreground transition-colors duration-500`}>
                      <LiveView
                        weddingData={weddingData}
                        guestName="Khách mời danh dự"
                        previewMode={previewMode}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                /* DESKTOP MOCKUP: Co giãn theo chiều cao màn hình */
                <div className="relative aspect-[800/520] h-full max-h-[calc(100vh-140px)] bg-[#1c1917] rounded-3xl p-3 shadow-2xl border-4 border-slate-900 overflow-hidden flex flex-col transition-all duration-300">
                  <div className="flex items-center justify-between px-4 pb-2 border-b border-slate-800 mb-2 flex-shrink-0">
                    <div className="flex gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-500/80" />
                      <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
                      <span className="w-2 h-2 rounded-full bg-green-500/80" />
                    </div>
                    <div className="bg-slate-950 border border-slate-800 text-[10px] text-slate-400 px-8 py-1 rounded-md font-mono select-all truncate max-w-sm">
                      viora.vn/w/{weddingData.slug || "minhkhoa-khaitram"}
                    </div>
                    <div className="w-12" />
                  </div>

                  <div className="overflow-y-auto w-full h-full rounded-xl bg-[#fdf6ef] mockup-screen-content flex-1">
                    <div className={`w-full h-full ${currentTheme} bg-background text-foreground transition-colors duration-500`}>
                      <LiveView
                        weddingData={weddingData}
                        guestName="Khách mời danh dự"
                        previewMode={previewMode}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>



        </div>



      </div>

      {/* ── SUCCESS MODAL ─────────────────────────────────────────────────── */}
      {publishedSlug && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-2xs p-4 animate-fade-in">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 max-w-md w-full shadow-2xl text-center space-y-5 text-slate-800">
            <div className="w-16 h-16 bg-emerald-50 border border-emerald-200 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
              <Check size={32} />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 font-sans">
              Xuất bản thiệp thành công!
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Chúc mừng hai bạn! Thiệp cưới trực tuyến đã được phát sóng thành công. Bạn có thể chia sẻ liên kết này tới tất cả bạn bè, người thân.
            </p>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-left space-y-2 text-xs">
              <p className="font-semibold text-slate-500">
                Đường dẫn thiệp cưới của bạn:
              </p>
              <div className="flex items-center justify-between gap-2 bg-white px-3.5 py-2.5 rounded-lg border border-slate-200">
                <span className="font-mono text-[#db2777] font-semibold text-[11px] truncate">
                  {typeof window !== "undefined" ? window.location.origin : ""}/w/{publishedSlug}
                </span>
                <button
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      navigator.clipboard.writeText(
                        `${window.location.origin}/w/${publishedSlug}`,
                      );
                      alert("Đường dẫn đã được copy vào bộ nhớ tạm!");
                    }
                  }}
                  className="p-1.5 hover:bg-slate-100 rounded-md transition-colors border-0 bg-transparent cursor-pointer text-[#db2777]"
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
                className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold active:scale-95 transition-all cursor-pointer border-0"
              >
                Về trang quản lý
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── AUTH MODAL FOR PUBLISH ─────────────────────────────────────────── */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-2xs p-4 animate-fade-in">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 max-w-sm w-full shadow-2xl text-left text-slate-800">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-5">
              <h3 className="text-lg font-bold text-slate-800">
                {authMode === "register" ? "Đăng ký lưu thiệp mời" : "Đăng nhập hệ thống"}
              </h3>
              <button
                onClick={() => setShowAuthModal(false)}
                className="text-slate-400 hover:text-slate-600 border-0 bg-transparent cursor-pointer text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-4 font-sans">
              {authError && (
                <div className="bg-red-50 text-red-500 text-xs p-3 rounded-lg border border-red-200">
                  ⚠️ {authError}
                </div>
              )}

              <div className="space-y-1">
                <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                  Tên đăng nhập
                </label>
                <input
                  type="text"
                  required
                  value={authForm.username}
                  onChange={(e) => setAuthForm({ ...authForm, username: e.target.value })}
                  placeholder="Nhập tên đăng nhập"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-[#db2777]"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                  Mật khẩu
                </label>
                <input
                  type="password"
                  required
                  value={authForm.password}
                  onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                  placeholder="••••••"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-[#db2777]"
                />
              </div>

              {authMode === "register" && (
                <div className="space-y-1">
                  <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    Xác nhận mật khẩu
                  </label>
                  <input
                    type="password"
                    required
                    value={authForm.confirmPassword}
                    onChange={(e) => setAuthForm({ ...authForm, confirmPassword: e.target.value })}
                    placeholder="••••••"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-[#db2777]"
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
                  <span>
                    {authMode === "register" ? "Đăng ký & Lưu thiệp" : "Đăng nhập & Lưu thiệp"}
                  </span>
                )}
              </button>
            </form>

            <div className="mt-5 pt-4 border-t border-slate-200 text-center text-xs text-slate-500 font-sans">
              {authMode === "register" ? (
                <p>
                  Đã có tài khoản?{" "}
                  <button
                    onClick={() => {
                      setAuthMode("login");
                      setAuthError(null);
                    }}
                    className="text-[#db2777] font-semibold border-0 bg-transparent cursor-pointer hover:underline"
                  >
                    Đăng nhập ngay
                  </button>
                </p>
              ) : (
                <p>
                  Chưa có tài khoản?{" "}
                  <button
                    onClick={() => {
                      setAuthMode("register");
                      setAuthError(null);
                    }}
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

      {/* ── BUY TEMPLATE MODAL ───────────────────────────────────────────── */}
      {showUpgradeModal &&
        (() => {
          const targetTpl =
            TEMPLATES.find((t) => t.code === (upgradeTemplateId || weddingData.templateId)) || selectedTemplate;
          return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-2xs p-4 animate-fade-in">
              <div className="bg-white border border-slate-200 rounded-3xl p-8 max-w-md w-full shadow-2xl text-center space-y-6 text-slate-800">
                <div className="w-16 h-16 bg-[#db2777]/10 border border-[#db2777]/20 text-[#db2777] rounded-full flex items-center justify-center mx-auto text-2xl">
                  💝
                </div>

                <div className="space-y-2">
                  <h3
                    className="text-2xl font-bold text-slate-800 font-sans"
                    style={{ fontFamily: "'Great Vibes', cursive" }}
                  >
                    Mở khóa mẫu thiệp cưới
                  </h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                    Mẫu thiệp cưới <strong className="text-[#db2777]">{targetTpl.name}</strong> là mẫu trả phí. Bạn vui lòng thanh toán một lần để sở hữu trọn đời và xuất bản thiệp mời này.
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl text-left text-xs space-y-2 text-slate-600">
                  <p className="flex items-center gap-2 font-bold text-[#db2777]">
                    ✨ Quyền lợi khi sở hữu mẫu {targetTpl.name}:
                  </p>
                  <ul className="space-y-1.5 list-disc list-inside pl-1">
                    <li>Sử dụng toàn bộ tính năng và bố cục của mẫu thiệp này</li>
                    <li>Tải lên album ảnh chất lượng HD không giới hạn</li>
                    <li>Không giới hạn số lượt khách truy cập và phản hồi RSVP</li>
                    <li>Hỗ trợ nhạc nền lãng mạn, hiệu ứng mở phong bì độc quyền</li>
                    <li>Mở khóa vĩnh viễn, không phát sinh chi phí duy trì</li>
                  </ul>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      const updated = [...purchasedTemplates, targetTpl.id];
                      setPurchasedTemplates(updated);
                      localStorage.setItem("purchasedTemplates", JSON.stringify(updated));
                      updateField(["templateId"], targetTpl.code);
                      setShowUpgradeModal(false);
                      confetti({
                        particleCount: 100,
                        spread: 70,
                        origin: { y: 0.6 },
                      });
                      setTimeout(() => {
                        alert(`Mở khóa mẫu thiệp "${targetTpl.name}" thành công! Bạn có thể chỉnh sửa và xuất bản mẫu thiệp này.`);
                      }, 100);
                    }}
                    className="flex-1 py-3.5 bg-gradient-to-r from-[#db2777] to-pink-600 hover:opacity-95 text-white rounded-xl text-xs font-semibold active:scale-95 transition-all cursor-pointer border-0 shadow-md flex items-center justify-center gap-1.5 font-sans"
                  >
                    <span>Thanh toán mở khóa: {targetTpl.price.toLocaleString("vi-VN")}đ</span>
                  </button>
                  <button
                    onClick={() => setShowUpgradeModal(false)}
                    className="px-4 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold active:scale-95 transition-all cursor-pointer border-0 font-sans"
                  >
                    Đóng
                  </button>
                </div>
              </div>
            </div>
          );
        })()}
      <style>{`
        .mockup-screen-content::-webkit-scrollbar {
          display: none !important;
        }
        .mockup-screen-content {
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
        }
      `}</style>
    </div>
  );
}
