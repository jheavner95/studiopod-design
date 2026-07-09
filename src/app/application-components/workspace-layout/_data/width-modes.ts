export interface WidthMode {
  id: string;
  name: string;
  purpose: string;
  useCases: string[];
  /** Design intent, never a pixel value. */
  maxWidth: string;
  examples: string[];
}

/** Five width modes, expressed as intent — none of these is a pixel value. */
export const WIDTH_MODES: WidthMode[] = [
  {
    id: "compact",
    name: "Compact",
    purpose: "The narrowest workspace mode — a single focused task, minimal peripheral distraction.",
    useCases: ["Settings screens", "Single-object wizards", "Auth and onboarding flows"],
    maxWidth:
      "Narrower than the design system's own Narrow container — content never needs to stretch when there's only one column of it.",
    examples: ["Settings Header variant", "Wizard Header variant"],
  },
  {
    id: "comfortable",
    name: "Comfortable",
    purpose: "The default — enough room for a Library and an Inspector without either feeling cramped.",
    useCases: ["Most Library Header screens", "Standard browse-and-inspect workflows"],
    maxWidth:
      "Matches the design system's Content container — the same width every marketing and documentation page already reads at.",
    examples: ["Library Header variant", "Dashboard Header variant"],
  },
  {
    id: "wide",
    name: "Wide",
    purpose:
      "Extra breathing room for workspaces with a lot of simultaneous information — a dense Library table, or several metric cards side by side.",
    useCases: ["Dense data tables", "Multi-metric dashboards"],
    maxWidth: "Matches the design system's Wide container — used sparingly, only once Comfortable genuinely runs out of room.",
    examples: ["Queue Header variant", "Dashboard Header variant at scale"],
  },
  {
    id: "canvas",
    name: "Canvas",
    purpose: "No maximum at all — the Primary Workspace claims the full available width, edge to edge.",
    useCases: ["Freeform canvas editing", "Anything spatial or visual, not columnar"],
    maxWidth:
      "The full viewport minus whatever Library or Inspector rails are open — Canvas mode is defined by having no content ceiling, not a wider one.",
    examples: ["Editor Header variant", "Publishing and Assets platforms in Canvas mode"],
  },
  {
    id: "full-screen",
    name: "Full Screen",
    purpose: "Temporarily exits the workspace shell's own chrome — no Global Navigation, no Workspace Header — for a task that needs every pixel.",
    useCases: ["Presentation and preview modes", "Distraction-free editing", "Print and export preview"],
    maxWidth: "The entire viewport, chrome included — the only mode that isn't a width at all, but an escape from the anatomy above it.",
    examples: ["A Canvas-mode Editor entering a distraction-free preview"],
  },
];
