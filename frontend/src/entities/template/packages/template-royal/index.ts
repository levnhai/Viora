import { TemplatePackage } from "../../model/types";
import { TEMPLATES } from "../../model/templates";
import { LiveView } from "./LiveView";
import { EditView } from "./EditView";

export const TemplateRoyalPackage: TemplatePackage = {
  config: TEMPLATES.find((t) => t.id === 6)!,
  LiveView,
  EditView,
};
