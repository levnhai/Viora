import { ComponentType } from "react";
import { MinimalGuestbook } from "./variants/MinimalGuestbook";
import { GuestMessage } from "@/entities/invitation/ui/GuestbookList";
import { Guestbook_4 } from "@/widgets/guestbook/variants/Guestbook_4";

export type GuestbookKey = "minimal" | "guestbook_4";

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
  guestbook_4: Guestbook_4,
};

export function Guestbook({ variantId, ...props }: GuestbookProps) {
  const Component = guestbookRegistry[variantId] || guestbookRegistry.minimal;
  return <Component {...props} />;
}
