import { ComponentType } from "react";
import { MasonryGrid } from "./variants/MasonryGrid";
import { NormalGrid } from "./variants/NormalGrid";

export type GalleryKey = "masonry" | "grid";

interface GalleryGridProps {
  variant: GalleryKey;
  images?: string[];
}

const galleryRegistry: Record<
  GalleryKey,
  ComponentType<{ images: string[] }>
> = {
  masonry: MasonryGrid,
  grid: NormalGrid,
};

export function GalleryGrid({ variant, images = [] }: GalleryGridProps) {
  if (images.length === 0) return null;
  const TargetGallery = galleryRegistry[variant] || NormalGrid;
  return <TargetGallery images={images} />;
}
