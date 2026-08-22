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
  const normalizedCode = (code || "").trim().toLowerCase();
  const config =
    TEMPLATES.find(
      (t) =>
        t.code.toLowerCase() === normalizedCode ||
        t.id.toString() === normalizedCode ||
        `temp_${t.id}` === normalizedCode,
    ) || TEMPLATES[0];

  switch (normalizedCode) {
    case "temp_1":
    case "1":
    case "songhy-xanh":
    case "songhy_xanh":
    case "temp_2":
    case "2":
    case "songhy-do":
    case "songhy_do":
      return {
        config,
        LiveView: (props) =>
          createElement(SonghyView, { ...props, config }),
        EditView: LegacyMockEditView,
      };
    case "temp_3":
    case "3":
    case "luxury":
      return {
        config,
        LiveView: temp_3,
        EditView: LegacyMockEditView,
      };
    case "temp_4":
    case "4":
    case "the-royal":
    case "the_royal":
    case "theroyal":
      return {
        config,
        LiveView: TheRoyalView,
        EditView: LegacyMockEditView,
      };
    case "temp_5":
    case "5":
    case "the-golden":
    case "the_golden":
    case "floral":
      return {
        config,
        LiveView: TheGoldenView,
        EditView: LegacyMockEditView,
      };
    case "temp_6":
    case "6":
    case "minimal-do":
    case "minimal-red":
    case "minimal_do":
      return {
        config,
        LiveView: MinimalView,
        EditView: LegacyMockEditView,
      };
    case "temp_7":
    case "7":
    case "minimal-xanh":
    case "minimal-green":
    case "minimal_xanh":
      return {
        config,
        LiveView: temp_7,
        EditView: LegacyMockEditView,
      };
    case "temp_8":
    case "8":
    case "honey-wood":
    case "honey_wood":
    case "honeywood":
      return {
        config,
        LiveView: honeyWoodView,
        EditView: LegacyMockEditView,
      };
    case "temp_9":
    case "9":
    case "linen-cream":
    case "linen_cream":
    case "linencream":
      return {
        config,
        LiveView: LinenCream,
        EditView: LegacyMockEditView,
      };
    default:
      return {
        config,
        LiveView: (props) =>
          createElement(SonghyView, { ...props, config }),
        EditView: LegacyMockEditView,
      };
  }
};
