import { TemplatePackage } from "./types";
import { TEMPLATES } from "./templates";
import { LiveView as MinimalLiveView } from "@/views/invitations/minimal/LiveView";
import { LiveView as FloralLiveView } from "@/views/invitations/floral/LiveView";
import { LiveView as LuxuryLiveView } from "@/views/invitations/luxury/LiveView";

const LegacyMockEditView = () => null;

export const getTemplatePackage = (code: string): TemplatePackage => {
  const config = TEMPLATES.find((t) => t.code === code) || TEMPLATES[0];

  switch (code) {
    case "temp_1":
      return {
        config,
        LiveView: MinimalLiveView,
        EditView: LegacyMockEditView,
      };
    case "temp_2":
      return {
        config,
        LiveView: FloralLiveView,
        EditView: LegacyMockEditView,
      };
    case "temp_3":
      return {
        config,
        LiveView: LuxuryLiveView,
        EditView: LegacyMockEditView,
      };
    default:
      return {
        config,
        LiveView: MinimalLiveView,
        EditView: LegacyMockEditView,
      };
  }
};
