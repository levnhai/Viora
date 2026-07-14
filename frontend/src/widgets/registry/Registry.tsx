import { ComponentType } from "react";
import { MinimalRegistry } from "./variants/MinimalRegistry";
import { WeddingData } from "@/entities/invitation/model/types";

export type RegistryId = "minimal" | "royal" | "lavender" | "floral";

export interface RegistryProps {
  variantId: RegistryId;
  weddingData: WeddingData;
}

const registryComponents: Record<RegistryId, ComponentType<any>> = {
  minimal: MinimalRegistry,
  royal: MinimalRegistry, // Fallback tạm thời
  lavender: MinimalRegistry, // Fallback tạm thời
  floral: MinimalRegistry, // Fallback tạm thời
};

export function Registry({ variantId, ...props }: RegistryProps) {
  const Component = registryComponents[variantId] || registryComponents.minimal;
  return <Component {...props} />;
}
