import { ComponentType } from "react";
import { MinimalEventInfo } from "./variants/MinimalEventInfo";
import { WeddingData } from "@/entities/invitation/model/types";

export type EventInfoKey = "minimal" | "royal" | "lavender" | "floral";

export interface EventInfoProps {
  variantId: EventInfoKey;
  weddingData: WeddingData;
  onOpenRsvpModal: () => void;
  primaryColor?: string;
  textColor?: string;
}

const eventInfoRegistry: Record<EventInfoKey, ComponentType<any>> = {
  minimal: MinimalEventInfo,
  royal: MinimalEventInfo, // Fallback tạm thời
  lavender: MinimalEventInfo, // Fallback tạm thời
  floral: MinimalEventInfo, // Fallback tạm thời
};

export function EventInfo({ variantId, ...props }: EventInfoProps) {
  const Component = eventInfoRegistry[variantId] || eventInfoRegistry.minimal;
  return <Component {...props} />;
}
