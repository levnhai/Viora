"use client";

import { useState, useEffect } from "react";
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
} from "lucide-react";
import confetti from "canvas-confetti";

import { TEMPLATES } from "@/entities/template/model/templates";
import { getTemplatePackage } from "@/entities/template/model/registry";
import { WeddingData } from "@/entities/invitation/model/types";

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
  const initialTemplateId = Number(searchParams?.get("templateId")) || 1;

  // View state (Chỉnh sửa vs Xem trước)
  const [editorView, setEditorView] = useState<"edit" | "preview">("edit");

  // Dropdown states
  const [showTemplateDropdown, setShowTemplateDropdown] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);

  // Chế độ xem trước (Phong bì vs Thiệp mời)
  const [previewMode, setPreviewMode] = useState<"envelope" | "invitation">(
    "envelope",
  );
  const [previewDevice, setPreviewDevice] = useState<"mobile" | "desktop">(
    "mobile",
  );

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
    weddingDate: new Date(Date.now() + 60 * 24 * 3600 * 1000)
      .toISOString()
      .substring(0, 10),
    weddingTime: "18:00",
    events: [
      {
        title: "LỄ VU QUY",
        time: "09:00",
        date: new Date(Date.now() + 60 * 24 * 3600 * 1000).toLocaleDateString(
          "vi-VN",
        ),
        locationName: "Tư gia nhà gái",
        address: "123 Đường Nguyễn Trãi, Quận 1, TP. HCM",
        mapUrl: "https://maps.google.com",
      },
      {
        title: "TIỆC CHIÊU ĐÃI",
        time: "18:00",
        date: new Date(Date.now() + 60 * 24 * 3600 * 1000).toLocaleDateString(
          "vi-VN",
        ),
        locationName: "Nhà hàng tiệc cưới Diamond",
        address: "456 Đường Nguyễn Huệ, Quận 1, TP. HCM",
        mapUrl: "https://maps.google.com",
      },
    ],
    timeline: [
      {
        year: "2024",
        title: "Lần đầu gặp gỡ",
        description:
          "Chúng mình tình cờ gặp nhau tại một quán cà phê nhỏ vào một ngày mưa gió...",
        imageUrl:
          "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&h=400&fit=crop&auto=format",
      },
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1519225495810-7517cbd14bc4?w=800&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&h=600&fit=crop&auto=format",
    ],
    giftInfo: {
      groomBankName: "",
      groomAccountNumber: "",
      groomAccountName: "",
      groomQrUrl: "",
      brideBankName: "",
      brideAccountNumber: "",
      brideAccountName: "",
      brideQrUrl: "",
    },
    contactInfo: {
      groomPhone: "",
      bridePhone: "",
      email: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [publishedSlug, setPublishedSlug] = useState<string | null>(null);

  // Quản lý danh sách template đã mua lẻ
  const [purchasedTemplates, setPurchasedTemplates] = useState<number[]>([]);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [upgradeTemplateId, setUpgradeTemplateId] = useState<number | null>(
    null,
  );

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

  // Đăng ký triggerUpgradeModal cho window để các template có thể gọi qua window kèm theo templateId
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
      fetch(`http://localhost:8080/api/weddings/${weddingSlug}`, {
        credentials: "include"
      })
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

      return {
        ...prev,
        giftInfo: {
          ...prev.giftInfo,
          groomQrUrl: groomQr,
          brideQrUrl: brideQr,
        },
      };
    });
  }, [
    weddingData.giftInfo?.groomBankName,
    weddingData.giftInfo?.groomAccountNumber,
    weddingData.giftInfo?.brideBankName,
    weddingData.giftInfo?.brideAccountNumber,
  ]);

  // Handler cập nhật dữ liệu từ các form của Template Package
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

  // Xử lý Xuất bản
  const handlePublish = async () => {
    if (!weddingData.groomName.trim() || !weddingData.brideName.trim()) {
      alert("Vui lòng nhập đầy đủ tên Chú rể và Cô dâu!");
      return;
    }

    const selectedTemplate =
      TEMPLATES.find((t) => t.id === weddingData.templateId) || TEMPLATES[0];
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
        ? `http://localhost:8080/api/weddings/${weddingSlug}`
        : "http://localhost:8080/api/weddings";
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
        `http://localhost:8080/api/auth/${endpoint}`,
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
    TEMPLATES.find((t) => t.id === weddingData.templateId) || TEMPLATES[0];
  const currentTheme = selectedTemplate.themeClass;

  // Lấy template package động theo id
  const tplPackage = getTemplatePackage(weddingData.templateId);
  const EditView = tplPackage.EditView;
  const LiveView = tplPackage.LiveView;

  if (loading) {
    return (
      <div className="h-screen bg-[#0c0a09] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-10 h-10 animate-spin text-[#db2777]" />
        <p className="text-sm font-medium text-slate-400 tracking-wide animate-pulse">
          Đang tải dữ liệu thiệp cưới...
        </p>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-hidden bg-[#0c0a09] text-slate-100 flex flex-col font-sans select-none antialiased pb-16 md:pb-0">
      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <header className="bg-[#0c0a09]/95 border-b border-[#292524] backdrop-blur-md sticky top-0 z-40 px-4 h-16 flex items-center justify-between shadow-md">
        {/* BÊN TRÁI: Back + Dropdown mẫu thiệp + Dropdown Ngôn ngữ */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="p-2 hover:bg-[#1c1917] rounded-full transition-colors text-slate-400 hover:text-white cursor-pointer border-0 bg-transparent flex items-center justify-center"
          >
            <ArrowLeft size={18} />
          </button>

          {/* Template Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowTemplateDropdown(!showTemplateDropdown)}
              className="bg-white/95 hover:bg-white text-slate-800 border border-slate-200 shadow-xs flex items-center gap-2 pl-1 pr-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer select-none"
            >
              <div className="w-6 h-6 rounded-full overflow-hidden border border-slate-100 flex-shrink-0 relative">
                <img
                  src={selectedTemplate.preview}
                  alt={selectedTemplate.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="truncate max-w-[100px] sm:max-w-[150px]">
                {selectedTemplate.name}
              </span>
              <span className="text-[8px] text-slate-500 font-bold">▼</span>
            </button>

            {showTemplateDropdown && (
              <>
                <div
                  className="fixed inset-0 z-40 bg-transparent"
                  onClick={() => setShowTemplateDropdown(false)}
                />
                <div className="absolute top-10 left-0 bg-[#1c1917] border border-[#292524] rounded-2xl p-2 w-64 shadow-2xl z-50 animate-fade-in flex flex-col gap-1">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-3 py-1.5 border-b border-[#292524]">
                    Chọn mẫu thiệp cưới
                  </p>
                  {TEMPLATES.map((tpl) => {
                    const isOwned =
                      tpl.price === 0 || purchasedTemplates.includes(tpl.id);
                    const isCurrent = tpl.id === weddingData.templateId;
                    return (
                      <button
                        key={tpl.id}
                        onClick={() => {
                          const isOwned =
                            tpl.price === 0 ||
                            purchasedTemplates.includes(tpl.id);
                          if (!isOwned) {
                            setUpgradeTemplateId(tpl.id);
                            setShowUpgradeModal(true);
                          } else {
                            updateField(["templateId"], tpl.id);
                          }
                          setShowTemplateDropdown(false);
                        }}
                        className={`flex items-center gap-3 p-2 rounded-xl cursor-pointer transition-colors border-0 text-left bg-transparent w-full ${
                          isCurrent
                            ? "bg-[#292524] text-white"
                            : "hover:bg-[#292524]/50 text-slate-300 hover:text-white"
                        }`}
                      >
                        <div className="w-10 h-12 rounded-lg overflow-hidden border border-[#292524] flex-shrink-0 relative">
                          <img
                            src={tpl.preview}
                            alt={tpl.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold truncate">
                            {tpl.name}
                          </p>
                          <p className="text-[10px] text-slate-500 truncate">
                            {tpl.style}
                          </p>
                        </div>
                        {isOwned ? (
                          <span className="text-[9px] text-green-400 bg-green-950/40 px-1.5 py-0.5 rounded border border-green-900/40 flex-shrink-0">
                            Sở hữu
                          </span>
                        ) : (
                          <span className="text-[9px] text-amber-400 bg-amber-950/40 px-1.5 py-0.5 rounded border border-amber-900/40 flex-shrink-0">
                            {tpl.price.toLocaleString("vi-VN")}đ
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          {/* Ngôn ngữ */}
          <div className="relative">
            <button
              onClick={() => setShowLangDropdown(!showLangDropdown)}
              className="bg-[#1c1917]/85 hover:bg-[#292524] border border-[#292524] px-4 py-1.5 rounded-full text-xs text-slate-300 font-medium cursor-pointer transition-all flex items-center gap-1.5 select-none"
            >
              <span>Tiếng Việt</span>
              <span className="text-[8px] text-slate-500">▼</span>
            </button>
            {showLangDropdown && (
              <>
                <div
                  className="fixed inset-0 z-40 bg-transparent"
                  onClick={() => setShowLangDropdown(false)}
                />
                <div className="absolute top-10 left-0 bg-[#1c1917] border border-[#292524] rounded-xl p-1 w-32 shadow-xl z-50 flex flex-col gap-1">
                  {["Tiếng Việt", "English"].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setShowLangDropdown(false)}
                      className="px-3 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-[#292524]/60 rounded-lg text-left border-0 bg-transparent w-full cursor-pointer"
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Ở GIỮA: Tab chuyển đổi Chỉnh sửa / Xem trước */}
        <div className="flex bg-[#1c1917] p-1 rounded-full border border-[#292524] items-center">
          <button
            onClick={() => setEditorView("edit")}
            className={`px-5 py-1.5 rounded-full text-xs font-semibold transition-all border-0 cursor-pointer flex items-center gap-1.5 ${
              editorView === "edit"
                ? "bg-[#292524] text-white shadow-xs"
                : "bg-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-3.5 h-3.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
              />
            </svg>
            <span>Chỉnh sửa</span>
          </button>
          <button
            onClick={() => setEditorView("preview")}
            className={`px-5 py-1.5 rounded-full text-xs font-semibold transition-all border-0 cursor-pointer flex items-center gap-1.5 ${
              editorView === "preview"
                ? "bg-[#292524] text-white shadow-xs"
                : "bg-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Eye size={13} />
            <span>Xem trước</span>
          </button>
        </div>

        {/* BÊN PHẢI: Nút Chia sẻ */}
        <div className="flex items-center gap-3">
          {(() => {
            const isOwned =
              selectedTemplate.price === 0 ||
              purchasedTemplates.includes(selectedTemplate.id);
            return (
              <span
                className={`hidden sm:inline-block px-2.5 py-1 rounded-full text-[10px] font-semibold border ${
                  isOwned
                    ? "bg-emerald-950/20 text-emerald-400 border-emerald-800/45"
                    : "bg-amber-950/20 text-amber-400 border-amber-800/45"
                }`}
              ></span>
            );
          })()}

          <button
            onClick={handlePublish}
            disabled={publishing}
            className="bg-[#db2777] hover:bg-[#be185d] text-white px-5 py-2 rounded-full text-xs font-semibold hover:opacity-95 active:scale-95 transition-all disabled:opacity-50 flex items-center gap-1.5 cursor-pointer border-0 shadow-md font-sans"
          >
            {publishing ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Share2 size={13} />
            )}
            <span>Chia sẻ</span>
          </button>
        </div>
      </header>

      {/* ── WORKSPACE ──────────────────────────────────────────────────────── */}
      <div className="flex-1 overflow-hidden bg-[#0c0a09] flex flex-col">
        {/* EDIT PANEL (GIỮA) */}
        <div
          className={`w-full overflow-y-auto h-full ${
            editorView === "edit" ? "block" : "hidden"
          }`}
        >
          <div className="max-w-3xl mx-auto px-4 py-8">
            {/* Tải Form chỉnh sửa động của từng template package */}
            <EditView weddingData={weddingData} updateField={updateField} />
          </div>
        </div>

        {/* PREVIEW PANEL (FULL SCREEN) */}
        <div
          className={`flex-1 overflow-y-auto bg-[#0c0a09] relative ${
            editorView === "preview" ? "block" : "hidden"
          }`}
        >
          <div className="flex flex-col items-center justify-start p-4 sm:p-8 min-h-full">
            {/* Thanh điều khiển xem trước */}
            <div className="flex flex-wrap items-center justify-center gap-4 bg-[#1c1917] p-2 rounded-2xl sm:rounded-full border border-[#292524] mb-6 shadow-lg z-10">
              {/* Xem phong bì vs Xem thiệp */}
              <div className="flex p-0.5 bg-[#0c0a09] rounded-full border border-[#292524]">
                <button
                  onClick={() => setPreviewMode("envelope")}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold border-0 cursor-pointer transition-all ${
                    previewMode === "envelope"
                      ? "bg-[#db2777] text-white"
                      : "bg-transparent text-slate-400 hover:text-slate-200"
                  }`}
                >
                  Xem Phong bì
                </button>
                <button
                  onClick={() => setPreviewMode("invitation")}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold border-0 cursor-pointer transition-all ${
                    previewMode === "invitation"
                      ? "bg-[#db2777] text-white"
                      : "bg-transparent text-slate-400 hover:text-slate-200"
                  }`}
                >
                  Xem Thiệp mời
                </button>
              </div>

              <div className="hidden sm:block w-px h-5 bg-[#292524]" />

              {/* Lựa chọn thiết bị giả lập */}
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

            {/* Khung giả lập Mockup */}
            {previewDevice === "mobile" ? (
              /* MOBILE MOCKUP: Chuẩn iPhone 14 Pro (Viewport: 393px x 852px) */
              <div className="relative bg-black rounded-[52px] p-4 shadow-2xl border-4 border-[#292524] overflow-hidden flex flex-col mb-4 transition-all duration-300">
                {/* Dynamic Island */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-40 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#111] absolute right-6" />{" "}
                  {/* Camera */}
                </div>

                <div className="overflow-y-auto w-[393px] h-[852px] rounded-[38px] relative scroll-smooth bg-[#fdf6ef] mockup-screen-content">
                  <div
                    className={`w-full h-full ${currentTheme} bg-background text-foreground transition-colors duration-500`}
                  >
                    {/* Tải LiveView động của Template Package */}
                    <LiveView
                      weddingData={weddingData}
                      guestName="Khách mời danh dự"
                      previewMode={previewMode}
                    />
                  </div>
                </div>
              </div>
            ) : (
              /* DESKTOP MOCKUP */
              <div className="relative w-full max-w-5xl h-[900px] bg-[#1c1917] rounded-3xl p-3 shadow-2xl border-4 border-[#292524] overflow-hidden flex flex-col mb-4 transition-all duration-300">
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

                <div className="overflow-y-auto w-full h-full rounded-xl relative scroll-smooth bg-[#fdf6ef] mockup-screen-content">
                  <div
                    className={`w-full h-full ${currentTheme} bg-background text-foreground transition-colors duration-500`}
                  >
                    {/* Tải LiveView động của Template Package */}
                    <LiveView
                      weddingData={weddingData}
                      guestName="Khách mời danh dự"
                      previewMode={previewMode}
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-2">
              {previewDevice === "mobile" ? (
                <>
                  <Smartphone size={14} /> Giao diện hiển thị thực tế trên Điện
                  thoại
                </>
              ) : (
                <>
                  <Monitor size={14} /> Giao diện hiển thị thực tế trên Máy tính
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
              Chúc mừng hai bạn! Thiệp cưới trực tuyến đã được phát sóng thành
              công. Bạn có thể chia sẻ liên kết này tới tất cả bạn bè, người
              thân.
            </p>
            <div className="bg-[#0c0a09] p-4 rounded-xl border border-[#292524] text-left space-y-2 text-xs">
              <p className="font-semibold text-slate-400">
                Đường dẫn thiệp cưới của bạn:
              </p>
              <div className="flex items-center justify-between gap-2 bg-[#1c1917] px-3.5 py-2.5 rounded-lg border border-[#292524]">
                <span className="font-mono text-[#db2777] font-semibold text-[11px] truncate">
                  {typeof window !== "undefined" ? window.location.origin : ""}
                  /w/{publishedSlug}
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
                {authMode === "register"
                  ? "Đăng ký lưu thiệp mời"
                  : "Đăng nhập hệ thống"}
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
                  onChange={(e) =>
                    setAuthForm({ ...authForm, username: e.target.value })
                  }
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
                  onChange={(e) =>
                    setAuthForm({ ...authForm, password: e.target.value })
                  }
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
                    onChange={(e) =>
                      setAuthForm({
                        ...authForm,
                        confirmPassword: e.target.value,
                      })
                    }
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
                  <span>
                    {authMode === "register"
                      ? "Đăng ký & Lưu thiệp"
                      : "Đăng nhập & Lưu thiệp"}
                  </span>
                )}
              </button>
            </form>

            <div className="mt-5 pt-4 border-t border-[#292524] text-center text-xs text-slate-400 font-sans">
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
            TEMPLATES.find(
              (t) => t.id === (upgradeTemplateId || weddingData.templateId),
            ) || selectedTemplate;
          return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4 animate-fade-in">
              <div className="bg-[#1c1917] border border-[#292524] rounded-3xl p-8 max-w-md w-full shadow-2xl text-center space-y-6">
                <div className="w-16 h-16 bg-[#db2777]/10 border border-[#db2777]/30 text-[#db2777] rounded-full flex items-center justify-center mx-auto text-2xl">
                  💝
                </div>

                <div className="space-y-2">
                  <h3
                    className="text-2xl font-semibold text-white font-sans"
                    style={{ fontFamily: "'EB Garamond', serif" }}
                  >
                    Mở khóa mẫu thiệp cưới
                  </h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                    Mẫu thiệp cưới{" "}
                    <strong className="text-[#db2777]">{targetTpl.name}</strong>{" "}
                    là mẫu trả phí. Bạn vui lòng thanh toán một lần để sở hữu
                    trọn đời và xuất bản thiệp mời này.
                  </p>
                </div>

                <div className="bg-[#0c0a09]/50 border border-[#292524] p-4 rounded-2xl text-left text-xs space-y-2 text-slate-300">
                  <p className="flex items-center gap-2 font-semibold text-[#db2777]">
                    ✨ Quyền lợi khi sở hữu mẫu {targetTpl.name}:
                  </p>
                  <ul className="space-y-1.5 list-disc list-inside pl-1">
                    <li>
                      Sử dụng toàn bộ tính năng và bố cục của mẫu thiệp này
                    </li>
                    <li>Tải lên album ảnh chất lượng HD không giới hạn</li>
                    <li>
                      Không giới hạn số lượt khách truy cập và phản hồi RSVP
                    </li>
                    <li>
                      Hỗ trợ nhạc nền lãng mạn, hiệu ứng mở phong bì độc quyền
                    </li>
                    <li>Mở khóa vĩnh viễn, không phát sinh chi phí duy trì</li>
                  </ul>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      const updated = [...purchasedTemplates, targetTpl.id];
                      setPurchasedTemplates(updated);
                      localStorage.setItem(
                        "purchasedTemplates",
                        JSON.stringify(updated),
                      );
                      updateField(["templateId"], targetTpl.id);
                      setShowUpgradeModal(false);
                      confetti({
                        particleCount: 100,
                        spread: 70,
                        origin: { y: 0.6 },
                      });
                      setTimeout(() => {
                        alert(
                          `Mở khóa mẫu thiệp "${targetTpl.name}" thành công! Bạn có thể chỉnh sửa và xuất bản mẫu thiệp này.`,
                        );
                      }, 100);
                    }}
                    className="flex-1 py-3.5 bg-gradient-to-r from-[#db2777] to-pink-600 hover:opacity-95 text-white rounded-xl text-xs font-semibold active:scale-95 transition-all cursor-pointer border-0 shadow-md flex items-center justify-center gap-1.5 font-sans"
                  >
                    <span>
                      Thanh toán mở khóa:{" "}
                      {targetTpl.price.toLocaleString("vi-VN")}đ
                    </span>
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
          );
        })()}
    </div>
  );
}
