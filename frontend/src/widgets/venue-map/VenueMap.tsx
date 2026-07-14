import { ComponentType } from "react";
import { MinimalVenueMap } from "./variants/MinimalVenueMap";
import { WeddingEvent } from "@/entities/invitation/model/types";

export type VenueMapKey = "minimal" | "royal" | "lavender" | "floral";

export interface VenueMapProps {
  variantId: VenueMapKey;
  event: WeddingEvent;
  primaryColor?: string;
  textColor?: string;
}

const venueMapRegistry: Record<VenueMapKey, ComponentType<any>> = {
  minimal: MinimalVenueMap,
  royal: MinimalVenueMap, // Fallback tạm thời
  lavender: MinimalVenueMap, // Fallback tạm thời
  floral: MinimalVenueMap, // Fallback tạm thời
};

export function VenueMap({ variantId, ...props }: VenueMapProps) {
  const Component = venueMapRegistry[variantId] || venueMapRegistry.minimal;
  return <Component {...props} />;
}
