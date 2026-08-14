import { createElement } from "react";
import { TemplatePackage } from "./types";
import { TEMPLATES } from "./templates";
import { LiveView as MinimalLiveView } from "@/views/invitations/minimal/LiveView";
import { LiveView as temp_3 } from "@/views/invitations/luxury/LiveView";
import { LiveView as Temp_4 } from "@/views/invitations/temp_4/LiveView";
import { LiveView as temp_5 } from "@/views/invitations/floral/LiveView";
import { LiveView as temp_6 } from "@/views/invitations/temp_6/LiveView";
import { LiveView as temp_7 } from "@/views/invitations/temp_7/LiveView";
import { LiveView as temp_8 } from "@/views/invitations/temp_8/LiveView";
import { LiveView as LinenCream } from "@/views/invitations/LinenCream/LiveView";

const LegacyMockEditView = () => null;

export const getTemplatePackage = (code: string): TemplatePackage => {
  const config = TEMPLATES.find((t) => t.code === code) || TEMPLATES[0];

  switch (code) {
    case "temp_1":
    case "temp_2":
      return {
        config,
        LiveView: (props) =>
          createElement(MinimalLiveView, { ...props, config }),
        EditView: LegacyMockEditView,
      };
    case "temp_3":
      return {
        config,
        LiveView: temp_3,
        EditView: LegacyMockEditView,
      };
    case "temp_4":
      return {
        config,
        LiveView: Temp_4,
        EditView: LegacyMockEditView,
      };
    case "temp_5":
      return {
        config,
        LiveView: temp_5,
        EditView: LegacyMockEditView,
      };
    case "temp_6":
      return {
        config,
        LiveView: temp_6,
        EditView: LegacyMockEditView,
      };
    case "temp_7":
      return {
        config,
        LiveView: temp_7,
        EditView: LegacyMockEditView,
      };
    case "temp_8":
      return {
        config,
        LiveView: temp_8,
        EditView: LegacyMockEditView,
      };
    case "temp_9":
      return {
        config,
        LiveView: LinenCream,
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
