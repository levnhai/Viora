import { ComponentType, createElement } from "react";
import { TemplatePackage, TemplateProps } from "@/entities/template/model/types";
import { TEMPLATES } from "@/entities/template/model/templates";

// Template Components
import { LiveView as SonghyView } from "@/views/invitations/songhy/LiveView";
import { LiveView as LuxuryView } from "@/views/invitations/luxury/LiveView";
import { LiveView as TheRoyalView } from "@/views/invitations/theRoyal/LiveView";
import { LiveView as TheGoldenView } from "@/views/invitations/floral/LiveView";
import { LiveView as HoneyWoodView } from "@/views/invitations/honeyWood/LiveView";
import { LiveView as LinenCreamView } from "@/views/invitations/LinenCream/LiveView";

// Minimal
import { LiveView as MinimalDoView } from "@/views/invitations/minimal-do/LiveView";
import { LiveView as MinimalXanhView } from "@/views/invitations/minimal-xanh/LiveView";
import { LiveView as MinimalHongView } from "@/views/invitations/minimal-hong/LiveView";

import { LiveView as SageOliveView } from "@/views/invitations/sageOlive/LiveView";
import { LiveView as WarmTerracottaView } from "@/views/invitations/warmTerracotta/LiveView";
import { LiveView as BaroqueDarkRedView } from "@/views/invitations/baroqueDarkRed/LiveView";
import dynamic from "next/dynamic";

const GraduationClassicView = dynamic<TemplateProps>(
  () => import("@/views/invitations/graduationClassic/LiveView").then((mod) => mod.LiveView),
  { ssr: false }
);

const LegacyMockEditView = () => null;

const TEMPLATE_COMPONENT_MAP: Record<string, ComponentType<TemplateProps>> = {
  temp_1: SonghyView,
  temp_2: SonghyView,
  temp_3: LuxuryView,
  temp_4: TheRoyalView,
  temp_5: TheGoldenView,
  temp_6: MinimalDoView,
  temp_7: MinimalXanhView,
  temp_8: HoneyWoodView,
  temp_9: LinenCreamView,
  temp_10: MinimalHongView,
  temp_11: SageOliveView,
  temp_12: WarmTerracottaView,
  temp_13: BaroqueDarkRedView,
  temp_14: GraduationClassicView,
};

export const getTemplatePackage = (codeOrId: string | number): TemplatePackage => {
  const query = String(codeOrId || "").trim().toLowerCase();

  const config =
    TEMPLATES.find(
      (t) =>
        t.code.toLowerCase() === query ||
        String(t.id) === query ||
        `temp_${t.id}` === query,
    ) || TEMPLATES[0];

  const Component = TEMPLATE_COMPONENT_MAP[config.code] || SonghyView;

  return {
    config,
    LiveView: (props) => createElement(Component, { ...props, config }),
    EditView: LegacyMockEditView,
  };
};
