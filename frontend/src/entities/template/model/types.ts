import { ComponentType } from "react";
import { WeddingData } from "@/entities/invitation/model/types";
import { TemplateConfig } from "./schema";

export interface TemplatePackage {
  config: TemplateConfig;
  LiveView: ComponentType<{
    weddingData: WeddingData;
    guestName?: string;
    previewMode?: "envelope" | "invitation";
  }>;
  EditView: ComponentType<{
    weddingData: WeddingData;
    updateField: (path: string[], value: any) => void;
  }>;
}
