import { ComponentType } from "react";
import { RoyalEnvelope } from "./variants/RoyalEnvelope";
import { MinimalEnvelope } from "./variants/MinimalEnvelope";
import { LavenderEnvelope } from "./variants/LavenderEnvelope";

export type EnvelopeKey = "royal" | "minimal" | "lavender";

interface EnvelopeProps {
  variant: EnvelopeKey;
  guestName?: string;
  groomName: string;
  brideName: string;
  onOpen: () => void;
  isFixed?: boolean;
}

const envelopeRegistry: Record<
  EnvelopeKey,
  ComponentType<Omit<EnvelopeProps, "variant">>
> = {
  royal: RoyalEnvelope,
  minimal: MinimalEnvelope,
  lavender: LavenderEnvelope,
};

export function Envelope({ variant, ...props }: EnvelopeProps) {
  const TargetEnvelope = envelopeRegistry[variant] || MinimalEnvelope;
  return <TargetEnvelope {...props} />;
}
