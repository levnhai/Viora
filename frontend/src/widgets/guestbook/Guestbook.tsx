import { ComponentType } from "react";
import { MinimalGuestbook } from "./variants/MinimalGuestbook";
import { GuestMessage } from "@/entities/invitation/ui/GuestbookList";

export type GuestbookKey = "minimal" | "royal" | "lavender" | "floral";

export interface GuestbookProps {
  variantId: GuestbookKey;
  messages: GuestMessage[];
  onSendMessage: (name: string, msg: string) => void;
  guestName?: string;
  primaryColor?: string;
  textColor?: string;
}

const guestbookRegistry: Record<GuestbookKey, ComponentType<any>> = {
  minimal: MinimalGuestbook,
  royal: MinimalGuestbook, // Fallback tạm thời
  lavender: MinimalGuestbook, // Fallback tạm thời
  floral: MinimalGuestbook, // Fallback tạm thời
};

export function Guestbook({ variantId, ...props }: GuestbookProps) {
  const Component = guestbookRegistry[variantId] || guestbookRegistry.minimal;
  return <Component {...props} />;
}
