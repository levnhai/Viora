import { TemplatePackage } from "./types";
import { TEMPLATES } from "./templates";
import { LiveView as MinimalLiveView } from "@/views/invitations/minimal/LiveView";
import { LiveView as FloralLiveView } from "@/views/invitations/floral/LiveView";
import { LiveView as LuxuryLiveView } from "@/views/invitations/luxury/LiveView";

// Bộ EditView cũ không còn được sử dụng ở giao diện biên tập chính
const LegacyMockEditView = () => null;

export const getTemplatePackage = (id: number): TemplatePackage => {
  const config = TEMPLATES.find((t) => t.id === id) || TEMPLATES[0];

  switch (id) {
    case 1:
    case 2:
    case 3:
    case 4:
      return {
        config,
        LiveView: MinimalLiveView,
        EditView: LegacyMockEditView,
      };
    case 5:
      return {
        config,
        LiveView: FloralLiveView,
        EditView: LegacyMockEditView,
      };
    case 6:
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
