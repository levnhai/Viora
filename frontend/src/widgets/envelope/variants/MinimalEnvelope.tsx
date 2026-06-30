import { useState } from "react";
import { Heart } from "lucide-react";

interface MinimalEnvelopeProps {
  guestName?: string;
  groomName: string;
  brideName: string;
  onOpen: () => void;
  isFixed?: boolean;
}

export function MinimalEnvelope({
  guestName,
  groomName,
  brideName,
  onOpen,
  isFixed = true,
}: MinimalEnvelopeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMerged, setIsMerged] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    // Đợi hiệu ứng đóng gói và mở phong bì hoàn tất
    setTimeout(() => {
      setIsMerged(true);
      onOpen();
    }, 1200);
  };

  if (isMerged) return null;

  return <div>Chào bạn</div>;
}
