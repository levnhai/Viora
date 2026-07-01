import { TemplatePackage } from "./types";
import { TEMPLATES } from "./templates";
import { LiveView as MinimalLiveView } from "@/views/invitations/minimal/LiveView";
import { LiveView as FloralLiveView } from "@/views/invitations/floral/LiveView";
import { LiveView as LuxuryLiveView } from "@/views/invitations/luxury/LiveView";

const LegacyMockEditView = () => null;

export const getTemplatePackage = (id: number): TemplatePackage => {
  const config = TEMPLATES.find((t) => t.id === id) || TEMPLATES[0];

  switch (id) {
    case 1:
      return {
        config,
        LiveView: MinimalLiveView,
        EditView: LegacyMockEditView,
      };
    case 2:
      return {
        config,
        LiveView: FloralLiveView,
        EditView: LegacyMockEditView,
      };
    case 3:
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
