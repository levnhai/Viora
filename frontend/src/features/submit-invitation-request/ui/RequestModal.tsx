import { X } from "lucide-react";
import { RequestForm } from "./RequestForm";

interface RequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedTemplateId?: number;
  preSelectedPlanName?: string;
}

export function RequestModal({
  isOpen,
  onClose,
  preSelectedTemplateId = 1,
  preSelectedPlanName = "Phổ biến",
}: RequestModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/50 backdrop-blur-sm overflow-y-auto" onClick={onClose}>
      <div className="relative bg-card rounded-2xl overflow-hidden shadow-2xl w-full max-w-lg p-8 border border-border" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors w-8 h-8 rounded-full bg-secondary/50 flex items-center justify-center cursor-pointer"
        >
          <X size={16} />
        </button>
        
        <div className="text-center pb-2">
          <h3 className="text-2xl text-foreground font-medium" style={{ fontFamily: "'EB Garamond', serif" }}>
            Đăng Ký Tư Vấn & Thiết Kế Thiệp
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            Điền thông tin của bạn bên dưới để nhận thiệp mời demo cá nhân hóa.
          </p>
        </div>

        <div className="mt-4">
          <RequestForm
            preSelectedTemplateId={preSelectedTemplateId}
            preSelectedPlanName={preSelectedPlanName}
          />
        </div>
      </div>
    </div>
  );
}
