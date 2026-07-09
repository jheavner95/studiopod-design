export interface ArchitecturePrinciple {
  title: string;
  explanation: string;
  reuseLink?: { label: string; href: string };
}

/** The DS-1 philosophy in eight statements — each one this certification page holds every workspace to. */
export const ARCHITECTURE_PRINCIPLES: ArchitecturePrinciple[] = [
  {
    title: "Every workspace shares one anatomy",
    explanation: "The six-tier blueprint above is not a suggestion any one platform can opt out of — it's what makes a StudioPOD workspace recognizable as one.",
    reuseLink: { label: "Canonical Workspace Blueprint", href: "#blueprint" },
  },
  {
    title: "Business objects change. Architecture does not.",
    explanation: "Products, orders, and artwork projects are all different things browsed through the exact same Asset Workspace anatomy — the object changes, the pattern doesn't.",
    reuseLink: { label: "Asset Workspace", href: "/application-components/asset-workspace" },
  },
  {
    title: "Context before interaction",
    explanation: "A user always knows what they're looking at before they're offered something to do about it — the Header exists before the Toolbar can mean anything.",
    reuseLink: { label: "Workspace Header", href: "/application-components/workspace-header" },
  },
  {
    title: "Discovery before work",
    explanation: "Browsing and selecting comes before editing — the Asset Workspace feeds the Primary Workspace, never the other way around.",
    reuseLink: { label: "Primary Workspace", href: "/application-components/primary-workspace" },
  },
  {
    title: "Inspection before editing",
    explanation: "The Inspector shows what something is before it lets a user change what it is — confirmation precedes commitment.",
    reuseLink: { label: "Inspector Workspace", href: "/application-components/inspector-workspace" },
  },
  {
    title: "Operational awareness remains passive",
    explanation: "Background work, notifications, and health all report continuously without ever taking focus away from what the user is actually doing.",
    reuseLink: { label: "Operational Status Workspace", href: "/application-components/status-workspace" },
  },
  {
    title: "Accessibility is foundational",
    explanation: "Every DS-1 page documents its own accessibility guidance as a first-class section, not an appendix — the Scorecard weighs it accordingly.",
  },
  {
    title: "Consistency scales better than customization",
    explanation: "A platform-specific layout tweak saves one team a little time; a shared anatomy saves every future team from relearning StudioPOD from scratch.",
  },
];
