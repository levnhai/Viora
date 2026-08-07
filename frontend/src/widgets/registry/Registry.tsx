import { ComponentType } from "react";
import { MinimalRegistry } from "./variants/MinimalRegistry";
import { WeddingData } from "@/entities/invitation/model/types";
import { Registry_4 } from "@/widgets/registry/variants/registry_4";

export type RegistryId = "minimal" | "register_4";

export interface RegistryProps {
  variantId: RegistryId;
  weddingData: WeddingData;
  primaryColor?: string;
  textColor?: string;
}

const registryComponents: Record<RegistryId, ComponentType<any>> = {
  minimal: MinimalRegistry,
  register_4: Registry_4,
};

export function Registry({ variantId, ...props }: RegistryProps) {
  const Component = registryComponents[variantId] || registryComponents.minimal;
  return <Component {...props} />;
}
