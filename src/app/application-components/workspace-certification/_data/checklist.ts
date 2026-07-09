export interface ChecklistReuseLink {
  label: string;
  href: string;
}

export interface ChecklistItem {
  id: string;
  question: string;
  explanation: string;
  reuseLink?: ChecklistReuseLink;
}

/** The ten questions a reviewer works through for any workspace under review — each traces back to a standard a DS-1 page already defines. */
export const DESIGN_REVIEW_CHECKLIST: ChecklistItem[] = [
  {
    id: "canonical-anatomy",
    question: "Does the workspace follow the canonical anatomy?",
    explanation: "Every region present is one of the documented tiers, in the documented order — nothing invented, nothing skipped without a stated reason.",
    reuseLink: { label: "Canonical Workspace Blueprint", href: "#blueprint" },
  },
  {
    id: "header-contextual",
    question: "Is the Header contextual?",
    explanation: "The Header answers \"what am I looking at,\" not \"what can I do\" — that job belongs to the Toolbar.",
    reuseLink: { label: "Workspace Header", href: "/application-components/workspace-header" },
  },
  {
    id: "toolbar-interaction",
    question: "Does the Toolbar contain interaction instead of context?",
    explanation: "Everything in the Toolbar is something the user does, not something the user is told — status and identity live in the Header.",
    reuseLink: { label: "Workspace Toolbar", href: "/application-components/workspace-toolbar" },
  },
  {
    id: "asset-workspace-appropriate",
    question: "Is the Asset Workspace used appropriately?",
    explanation: "Present only where the platform genuinely browses a library of assets — not added by default to every workspace regardless of need.",
    reuseLink: { label: "Asset Workspace", href: "/application-components/asset-workspace" },
  },
  {
    id: "primary-workspace-focused",
    question: "Is the Primary Workspace focused on one task?",
    explanation: "One mode is active at a time — the Primary Workspace never asks the user to split attention between two competing working surfaces.",
    reuseLink: { label: "Primary Workspace", href: "/application-components/primary-workspace" },
  },
  {
    id: "inspector-contextual",
    question: "Is the Inspector contextual?",
    explanation: "The Inspector responds to the current selection and goes quiet — or shows an empty state — the moment nothing is selected.",
    reuseLink: { label: "Inspector Workspace", href: "/application-components/inspector-workspace" },
  },
  {
    id: "status-passive",
    question: "Are Operational Status surfaces passive?",
    explanation: "Background jobs, notifications, and health report without demanding attention — none of them steal focus from the Primary Workspace uninvited.",
    reuseLink: { label: "Operational Status Workspace", href: "/application-components/status-workspace" },
  },
  {
    id: "responsive-documented",
    question: "Is responsive behavior documented?",
    explanation: "Every region has a stated behavior at desktop, tablet, and mobile — not left to be discovered by whoever happens to resize the window.",
    reuseLink: { label: "Workspace Layout", href: "/application-components/workspace-layout" },
  },
  {
    id: "accessibility-met",
    question: "Does accessibility meet requirements?",
    explanation: "Keyboard access, live regions, reduced motion, and focus behavior are verified against each region's own accessibility guidance, not assumed.",
  },
  {
    id: "immediately-recognizable",
    question: "Would another StudioPOD user immediately recognize this workspace?",
    explanation: "The real test of consistency — someone who has never used this specific platform should still know where to look for status, actions, and detail.",
  },
];
