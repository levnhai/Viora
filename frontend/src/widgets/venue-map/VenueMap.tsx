import { ComponentType } from "react";
import { MinimalVenueMap } from "./variants/MinimalVenueMap";
import { WeddingEvent } from "@/entities/invitation/model/types";

export type VenueMapKey = "minimal";

export interface VenueMapProps {
  variantId: VenueMapKey;
  event: WeddingEvent;
  primaryColor?: string;
  textColor?: string;
  fontFamily?: string;
}

const venueMapRegistry: Record<VenueMapKey, ComponentType<any>> = {
  minimal: MinimalVenueMap,
};

export function VenueMap({ variantId, ...props }: VenueMapProps) {
  const Component = venueMapRegistry[variantId] || venueMapRegistry.minimal;
  return <Component {...props} />;
}
