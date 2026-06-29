import { TemplatePackage } from "./types";
import { TEMPLATES } from "./templates";
import { TemplateMinimalPackage } from "../packages/template-minimal";
import { TemplateLavenderPackage } from "../packages/template-lavender";
import { TemplateRoyalPackage } from "../packages/template-royal";

export const getTemplatePackage = (id: number): TemplatePackage => {
  const config = TEMPLATES.find((t) => t.id === id) || TEMPLATES[0];
  switch (id) {
    case 1:
      return { ...TemplateMinimalPackage, config };
    case 2:
      return { ...TemplateMinimalPackage, config };
    case 3:
      return { ...TemplateMinimalPackage, config };
    case 4:
      return { ...TemplateMinimalPackage, config };
    case 5:
      return { ...TemplateLavenderPackage, config };
    case 6:
      return { ...TemplateRoyalPackage, config };
    default:
      return { ...TemplateMinimalPackage, config };
  }
};

