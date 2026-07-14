import { ComponentType } from "react";
import { RoyalEnvelope } from "./variants/RoyalEnvelope";
import { MinimalEnvelope } from "./variants/MinimalEnvelope";
import { LavenderEnvelope } from "./variants/LavenderEnvelope";
import { FloralEnvelope } from "./variants/FloralEnvelope";

export type EnvelopeKey = "royal" | "minimal" | "lavender" | "floral";

export interface EnvelopeProps {
  variant: EnvelopeKey;
  guestName?: string;
  groomName: string;
  brideName: string;
  weddingDate: string;
  weddingTime?: string;
  onOpen: () => void;
  isFixed?: boolean;
  primaryColor?: string;
  textColor?: string;
}

const envelopeRegistry: Record<
  EnvelopeKey,
  ComponentType<any>
> = {
  royal: RoyalEnvelope,
  minimal: MinimalEnvelope,
  lavender: LavenderEnvelope,
  floral: FloralEnvelope,
};

export function Envelope({ variant, ...props }: EnvelopeProps) {
  const TargetEnvelope = envelopeRegistry[variant] || MinimalEnvelope;
  return <TargetEnvelope {...props} />;
}
