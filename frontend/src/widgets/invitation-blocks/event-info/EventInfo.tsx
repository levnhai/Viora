import { ComponentType } from "react";
import { MinimalEventInfo } from "./variants/MinimalEventInfo";
import { WeddingData } from "@/entities/invitation/model/types";
import { EventInfo1 } from "./variants/EventInfo1";
import { EventInfoWood } from "./variants/EventInfoWood";

export type EventInfoKey = "minimal" | "EventInfo1" | "wood";

export interface EventInfoProps {
  variantId: EventInfoKey;
  weddingData: WeddingData;
  onOpenRsvpModal: () => void;
  primaryColor?: string;
  textColor?: string;
  flowerImage?: string;
  paperBg?: boolean;
}

const eventInfoRegistry: Record<EventInfoKey, ComponentType<any>> = {
  minimal: MinimalEventInfo,
  EventInfo1: EventInfo1,
  wood: EventInfoWood,
};

export function EventInfo({ variantId, ...props }: EventInfoProps) {
  const Component = eventInfoRegistry[variantId] || eventInfoRegistry.minimal;
  return <Component {...props} />;
}
