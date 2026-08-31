import { ComponentType } from "react";
import { MinimalRegistry } from "./variants/MinimalRegistry";
import { WeddingData } from "@/entities/invitation/model/types";
import { Registry_4 } from "./variants/registry_4";
import { Registry_8 } from "./variants/registry_8";

export type RegistryId = "minimal" | "register_4" | "register_8";

export interface RegistryProps {
  variantId: RegistryId;
  weddingData: WeddingData;
  primaryColor?: string;
  textColor?: string;
}

const registryComponents: Record<RegistryId, ComponentType<any>> = {
  minimal: MinimalRegistry,
  register_4: Registry_4,
  register_8: Registry_8,
};

export function Registry({ variantId, ...props }: RegistryProps) {
  const Component = registryComponents[variantId] || registryComponents.minimal;
  return <Component {...props} />;
}
