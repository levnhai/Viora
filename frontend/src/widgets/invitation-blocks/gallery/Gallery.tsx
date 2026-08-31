import { ComponentType } from "react";
import { MinimalGallery } from "./variants/MinimalGallery";
import { WeddingData } from "@/entities/invitation/model/types";

export type GalleryId = "minimal" | "royal" | "lavender" | "floral";

export interface GalleryProps {
  variantId: GalleryId;
  weddingData: WeddingData;
  primaryColor?: string;
  textColor?: string;
}

const galleryRegistry: Record<GalleryId, ComponentType<any>> = {
  minimal: MinimalGallery,
  royal: MinimalGallery, // Fallback tạm thời
  lavender: MinimalGallery, // Fallback tạm thời
  floral: MinimalGallery, // Fallback tạm thời
};

export function Gallery({ variantId, ...props }: GalleryProps) {
  const TargetGallery = galleryRegistry[variantId] || galleryRegistry["minimal"];
  return <TargetGallery {...props} />;
}
