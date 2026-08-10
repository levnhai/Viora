import { ComponentType } from "react";
import { RoyalEnvelope } from "./variants/RoyalEnvelope";
import { MinimalEnvelope } from "./variants/MinimalEnvelope";
import { LavenderEnvelope } from "./variants/LavenderEnvelope";
import { FloralEnvelope } from "./variants/FloralEnvelope";
import { Envelope_4 } from "./variants/envelope_4";
import { Envelope_6 } from "./variants/envelope_6";
import { Envelope_7 } from "./variants/envelope_7";
import { Envelope_8 } from "./variants/envelope_8";

export type EnvelopeKey =
  | "royal"
  | "minimal"
  | "lavender"
  | "floral"
  | "envelope_4"
  | "envelope_6"
  | "envelope_7"
  | "envelope_8";

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

const envelopeRegistry: Record<EnvelopeKey, ComponentType<any>> = {
  royal: RoyalEnvelope,
  minimal: MinimalEnvelope,
  lavender: LavenderEnvelope,
  floral: FloralEnvelope,
  envelope_4: Envelope_4,
  envelope_6: Envelope_6,
  envelope_7: Envelope_7,
  envelope_8: Envelope_8,
};

export function Envelope({ variant, ...props }: EnvelopeProps) {
  const TargetEnvelope = envelopeRegistry[variant] || MinimalEnvelope;
  return <TargetEnvelope {...props} />;
}
