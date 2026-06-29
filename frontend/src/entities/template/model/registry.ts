import { TemplatePackage } from "./types";
import { TemplateMinimalPackage } from "../packages/template-minimal";
import { TemplateLavenderPackage } from "../packages/template-lavender";
import { TemplateRoyalPackage } from "../packages/template-royal";

export const getTemplatePackage = (id: number): TemplatePackage => {
  switch (id) {
    case 1:
      return TemplateMinimalPackage;
    case 6:
      return TemplateRoyalPackage;
    case 5:
      return TemplateLavenderPackage;
    default:
      return TemplateMinimalPackage;
  }
};

