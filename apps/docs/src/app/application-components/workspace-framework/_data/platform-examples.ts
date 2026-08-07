import { PLATFORM_TEMPLATES } from "../../_data/templates";

export type PrimaryWorkspaceMode = "Canvas" | "Dashboard" | "Timeline" | "Queue" | "Analytics" | "Wizard";

/** Which Primary Workspace mode each platform template reaches for — new content, since templates.ts doesn't record a mode. */
const PRIMARY_MODE_BY_TEMPLATE_ID: Record<string, PrimaryWorkspaceMode> = {
  publishing: "Canvas",
  commerce: "Dashboard",
  production: "Queue",
  assets: "Canvas",
  operations: "Timeline",
  intelligence: "Analytics",
};

export interface PlatformExample {
  id: string;
  title: string;
  purpose: string;
  primaryMode: PrimaryWorkspaceMode;
}

/** Six of DS-0.3's seven platform templates (Integrations omitted, per DS-1.1 scope), paired with which Primary Workspace mode each reaches for — reused, not restated, from templates.ts. */
export const PLATFORM_EXAMPLES: PlatformExample[] = Object.entries(PRIMARY_MODE_BY_TEMPLATE_ID).map(([id, primaryMode]) => {
  const template = PLATFORM_TEMPLATES.find((t) => t.id === id);
  if (!template) throw new Error(`Workspace framework references unknown platform template: ${id}`);
  return { id, title: template.title, purpose: template.purpose, primaryMode };
});
