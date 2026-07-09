export interface WorkPackageSummary {
  code: string;
  title: string;
  href: string;
  oneLiner: string;
}

/** Every DS-1 work package this certification depends on — one line each, not a restatement of the page's own intro. */
export const DS1_WORK_PACKAGES: WorkPackageSummary[] = [
  {
    code: "DS-1.1",
    title: "Workspace Shell",
    href: "/application-components/workspace-framework",
    oneLiner: "The seven-region shell every platform is built on.",
  },
  {
    code: "DS-1.2",
    title: "Workspace Header",
    href: "/application-components/workspace-header",
    oneLiner: "Platform identity, status, actions, and context, always in the same place.",
  },
  {
    code: "DS-1.3",
    title: "Workspace Layout",
    href: "/application-components/workspace-layout",
    oneLiner: "Width, density, scrolling, and spacing rules for every tier.",
  },
  {
    code: "DS-1.4",
    title: "Workspace Toolbar",
    href: "/application-components/workspace-toolbar",
    oneLiner: "Where interaction lives, separated cleanly from the Header's context.",
  },
  {
    code: "DS-1.5",
    title: "Asset Workspace",
    href: "/application-components/asset-workspace",
    oneLiner: "The shared anatomy for browsing and selecting from any library.",
  },
  {
    code: "DS-1.6",
    title: "Primary Workspace",
    href: "/application-components/primary-workspace",
    oneLiner: "One focused working surface, whatever the current task happens to be.",
  },
  {
    code: "DS-1.7",
    title: "Inspector Workspace",
    href: "/application-components/inspector-workspace",
    oneLiner: "Contextual detail and editing that responds to the current selection.",
  },
  {
    code: "DS-1.8",
    title: "Operational Status Workspace",
    href: "/application-components/status-workspace",
    oneLiner: "Passive, ambient awareness of jobs, notifications, and platform health.",
  },
];
