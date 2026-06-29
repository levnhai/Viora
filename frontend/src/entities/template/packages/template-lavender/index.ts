import { TemplatePackage } from "../../model/types";
import { TEMPLATES } from "../../model/templates";
import { LiveView } from "./LiveView";
import { EditView } from "./EditView";

export const TemplateLavenderPackage: TemplatePackage = {
  config: TEMPLATES.find((t) => t.id === 5)!,
  LiveView,
  EditView,
};
