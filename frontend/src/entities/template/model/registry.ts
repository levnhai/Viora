import { createElement } from "react";
import { TemplatePackage } from "./types";
import { TEMPLATES } from "./templates";
import { LiveView as MinimalLiveView } from "@/views/invitations/minimal/LiveView";
import { LiveView as FloralLiveView } from "@/views/invitations/floral/LiveView";
import { LiveView as LuxuryLiveView } from "@/views/invitations/luxury/LiveView";
import { LiveView as Temp_4 } from "@/views/invitations/temp_4/LiveView";

const LegacyMockEditView = () => null;

export const getTemplatePackage = (code: string): TemplatePackage => {
  const config = TEMPLATES.find((t) => t.code === code) || TEMPLATES[0];

  switch (code) {
    case "temp_1":
    case "temp_2":
      return {
        config,
        LiveView: (props) => createElement(MinimalLiveView, { ...props, config }),
        EditView: LegacyMockEditView,
      };
    case "temp_3":
      return {
        config,
        LiveView: LuxuryLiveView,
        EditView: LegacyMockEditView,
      };
    case "temp_4":
      return {
        config,
        LiveView: Temp_4,
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
