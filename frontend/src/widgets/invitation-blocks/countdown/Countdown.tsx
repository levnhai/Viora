import { ComponentType } from "react";
import { MinimalCountdown } from "./variants/MinimalCountdown";
import { WeddingData } from "@/entities/invitation/model/types";

export type CountdownId = "minimal" | "royal" | "lavender" | "floral";

export interface CountdownProps {
  variantId: CountdownId;
  weddingData: WeddingData;
  primaryColor?: string;
  textColor?: string;
}

const countdownRegistry: Record<CountdownId, ComponentType<any>> = {
  minimal: MinimalCountdown,
  royal: MinimalCountdown, // Fallback tạm thời
  lavender: MinimalCountdown, // Fallback tạm thời
  floral: MinimalCountdown, // Fallback tạm thời
};

export function Countdown({ variantId, ...props }: CountdownProps) {
  const TargetCountdown = countdownRegistry[variantId] || countdownRegistry["minimal"];
  return <TargetCountdown {...props} />;
}
