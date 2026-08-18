import { createElement } from "react";
import { TemplatePackage } from "./types";
import { TEMPLATES } from "./templates";

//template
import { LiveView as SonghyView } from "@/views/invitations/songhy/LiveView";
import { LiveView as temp_3 } from "@/views/invitations/luxury/LiveView";
import { LiveView as TheRoyalView } from "@/views/invitations/theRoyal/LiveView";
import { LiveView as TheGoldenView } from "@/views/invitations/floral/LiveView";
import { LiveView as MinimalView } from "@/views/invitations/minimal-do/LiveView";
import { LiveView as temp_7 } from "@/views/invitations/minimal-xanh/LiveView";
import { LiveView as honeyWoodView } from "@/views/invitations/honeyWood/LiveView";
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
          createElement(SonghyView, { ...props, config }),
        EditView: LegacyMockEditView,
      };
      // ch xuất bản
    case "temp_3":
      return {
        config,
        LiveView: temp_3,
        EditView: LegacyMockEditView,
      };
    case "temp_4":
      return {
        config,
        LiveView: TheRoyalView,
        EditView: LegacyMockEditView,
      };
    case "temp_5":
      return {
        config,
        LiveView: TheGoldenView,
        EditView: LegacyMockEditView,
      };
    case "temp_6":
      return {
        config,
        LiveView: MinimalView,
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
        LiveView: honeyWoodView,
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
        LiveView: SonghyView,
        EditView: LegacyMockEditView,
      };
  }
};
