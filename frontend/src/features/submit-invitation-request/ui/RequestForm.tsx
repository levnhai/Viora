import { useState } from "react";
import { Check } from "lucide-react";
import confetti from "canvas-confetti";
import { TEMPLATES } from "@/entities/template/model/templates";

interface RequestFormProps {
  preSelectedTemplateId?: number;
  preSelectedPlanName?: string;
  onSuccessSubmitted?: (data: { id: string; fullName: string; templateName: string; planName: string }) => void;
}

export function RequestForm({
  preSelectedTemplateId = 1,
  preSelectedPlanName = "Phổ biến",
  onSuccessSubmitted,
}: RequestFormProps) {
  const [selectedTemplateId, setSelectedTemplateId] = useState<number>(preSelectedTemplateId);
  const [selectedPlanName, setSelectedPlanName] = useState<string>(preSelectedPlanName);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    weddingDate: "",
    notes: ""
  });

  const [successData, setSuccessData] = useState({
    id: "",
    fullName: "",
    templateName: "",
    planName: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phoneNumber.trim()) {
      setErrorMessage("Vui lòng điền đầy đủ Họ tên và Số điện thoại!");
      return;
    }
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const template = TEMPLATES.find(t => t.id === selectedTemplateId) || TEMPLATES[0];
      const body = {
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        email: formData.email || undefined,
        templateId: selectedTemplateId,
        templateName: template.name,
        planName: selectedPlanName,
        weddingDate: formData.weddingDate || undefined,
        notes: formData.notes || undefined,
      };

      const response = await fetch("http://localhost:8080/api/invitation-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const resData = await response.json();
      if (!response.ok || !resData.success) {
        throw new Error(resData.message || "Gửi yêu cầu thất bại!");
      }

      const orderData = {
        id: resData.data._id || "TO-" + Math.floor(1000 + Math.random() * 9000),
        fullName: resData.data.fullName,
        templateName: resData.data.templateName,
        planName: resData.data.planName,
      };

      setFormSubmitted(true);
      setSuccessData(orderData);
      if (onSuccessSubmitted) {
        onSuccessSubmitted(orderData);
      }

      // Reset form fields
      setFormData({
        fullName: "",
        phoneNumber: "",
        email: "",
        weddingDate: "",
        notes: ""
      });

      // Trigger confetti explosion
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err: any) {
      setErrorMessage(err.message || "Đã xảy ra lỗi kết nối đến máy chủ!");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (formSubmitted) {
    return (
      <div className="text-center py-6 space-y-4">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600 animate-bounce">
          <Check size={32} />
        </div>
        <h3 className="text-2xl font-semibold text-foreground" style={{ fontFamily: "'EB Garamond', serif" }}>
          Gửi yêu cầu thành công!
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
          Cảm ơn <span className="font-semibold text-foreground">{successData.fullName}</span>, yêu cầu làm thiệp của bạn đã được ghi nhận.
        </p>
        <div className="bg-secondary/40 p-4 rounded-xl border text-left space-y-2 text-xs max-w-sm mx-auto">
          <p><span className="text-muted-foreground">Mã số yêu cầu:</span> <span className="font-mono font-semibold text-primary">{successData.id}</span></p>
          <p><span className="text-muted-foreground">Mẫu thiệp:</span> <span className="font-semibold text-foreground">{successData.templateName}</span></p>
          <p><span className="text-muted-foreground">Gói dịch vụ:</span> <span className="font-semibold text-foreground">{successData.planName}</span></p>
        </div>
        <p className="text-xs text-muted-foreground italic max-w-sm mx-auto">
          Chúng tôi sẽ liên hệ lại với bạn qua Số điện thoại / Zalo trong vòng 15 phút.
        </p>
        <button
          onClick={() => setFormSubmitted(false)}
          className="mt-4 px-6 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-opacity text-sm cursor-pointer"
        >
          Gửi yêu cầu mới
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleFormSubmit} className="space-y-5 text-left">
      {errorMessage && (
        <div className="bg-destructive/10 text-destructive text-xs p-3 rounded-lg border border-destructive/20">
          ⚠️ {errorMessage}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium uppercase tracking-wider mb-1.5 text-muted-foreground">Họ và tên *</label>
          <input
            type="text"
            required
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="Nguyễn Văn A"
            className="w-full px-4 py-3 rounded-xl text-sm outline-none border border-border bg-background focus:border-primary transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-medium uppercase tracking-wider mb-1.5 text-muted-foreground">Số điện thoại *</label>
          <input
            type="tel"
            required
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            placeholder="0901234567"
            className="w-full px-4 py-3 rounded-xl text-sm outline-none border border-border bg-background focus:border-primary transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium uppercase tracking-wider mb-1.5 text-muted-foreground">Chọn mẫu thiệp</label>
          <select
            name="templateId"
            value={selectedTemplateId}
            onChange={(e) => setSelectedTemplateId(Number(e.target.value))}
            className="w-full px-4 py-3 rounded-xl text-sm outline-none border border-border bg-background focus:border-primary transition-colors"
          >
            {TEMPLATES.map(t => (
              <option key={t.id} value={t.id}>{t.name} ({t.style})</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium uppercase tracking-wider mb-1.5 text-muted-foreground">Chọn gói dịch vụ</label>
          <select
            name="planName"
            value={selectedPlanName}
            onChange={(e) => setSelectedPlanName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl text-sm outline-none border border-border bg-background focus:border-primary transition-colors"
          >
            <option value="Phổ biến">Phổ biến (199.000đ)</option>
            <option value="Cao cấp">Cao cấp (349.000đ)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium uppercase tracking-wider mb-1.5 text-muted-foreground">Ngày cưới dự kiến</label>
          <input
            type="date"
            name="weddingDate"
            value={formData.weddingDate}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-xl text-sm outline-none border border-border bg-background focus:border-primary transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-medium uppercase tracking-wider mb-1.5 text-muted-foreground">Email (tùy chọn)</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="email@example.com"
            className="w-full px-4 py-3 rounded-xl text-sm outline-none border border-border bg-background focus:border-primary transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium uppercase tracking-wider mb-1.5 text-muted-foreground">Ghi chú thêm</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleInputChange}
          placeholder="Mô tả thêm yêu cầu của bạn (nếu có)..."
          rows={3}
          className="w-full px-4 py-3 rounded-xl text-sm outline-none border border-border bg-background focus:border-primary transition-colors resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3.5 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
      >
        {isSubmitting ? (
          <>
            <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
            Đang xử lý...
          </>
        ) : (
          <>Gửi yêu cầu thiết kế</>
        )}
      </button>
    </form>
  );
}
