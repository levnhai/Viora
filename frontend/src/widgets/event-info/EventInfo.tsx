import { ComponentType } from "react";
import { MinimalEventInfo } from "./variants/MinimalEventInfo";
import { WeddingData } from "@/entities/invitation/model/types";
import { EventInfo1 } from "@/widgets/event-info/variants/EventInfo1";

export type EventInfoKey = "minimal" | "EventInfo1";

export interface EventInfoProps {
  variantId: EventInfoKey;
  weddingData: WeddingData;
  onOpenRsvpModal: () => void;
  primaryColor?: string;
  textColor?: string;
}

const eventInfoRegistry: Record<EventInfoKey, ComponentType<any>> = {
  minimal: MinimalEventInfo,
  EventInfo1: EventInfo1,
};

export function EventInfo({ variantId, ...props }: EventInfoProps) {
  const Component = eventInfoRegistry[variantId] || eventInfoRegistry.minimal;
  return <Component {...props} />;
}
