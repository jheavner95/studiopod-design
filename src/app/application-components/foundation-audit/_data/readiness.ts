export type ReadinessVerdict = "Ready" | "Not ready" | "Partially ready";

export interface ReadinessRow {
  id: string;
  system: string;
  verdict: ReadinessVerdict;
  reasoning: string;
  blockingComponents: string[];
}

export const READINESS_ASSESSMENT: ReadinessRow[] = [
  {
    id: "overlay-system",
    system: "Overlay System",
    verdict: "Partially ready",
    reasoning:
      "All 6 overlay components (Dialog, Drawer, Popover, Menu, Tooltip, Command Palette) are Needed — 0% built. But the Foundation Layer they'd be built on is ready to support them: Surface's floating elevation tier is already proven in production use inside UnsavedChangesBanner, and Layout's composition patterns (Panel headers, Stack bodies) transfer directly to overlay content.",
    blockingComponents: ["Dialog", "Drawer", "Popover", "Menu", "Tooltip", "Command Palette"],
  },
  {
    id: "navigation-system",
    system: "Navigation System",
    verdict: "Not ready",
    reasoning:
      "Tabs and Section Nav sit at Partial; Breadcrumbs, Pagination, Stepper, and Sidebar Nav are all Needed. Inspector Components is explicitly blocked in part on Tabs. The Foundation Layer doesn't block this system, but Navigation's own components are the prerequisite gap, and none of the four built families substitutes for them.",
    blockingComponents: ["Tabs", "Breadcrumbs", "Pagination", "Stepper", "Sidebar Nav"],
  },
  {
    id: "feedback-system",
    system: "Feedback System",
    verdict: "Partially ready",
    reasoning:
      "Roughly half-built: Badge, Progress, and Skeleton exist; Spinner and Empty State are Partial; Chip, Tag, Toast, and Alert are Needed, with Toast and Alert both flagged High priority. Table and Metadata already shipped their own local empty-state answers (TableEmptyState, EmptyMetadata) — when a shared Feedback empty-state primitive is eventually built, it should generalize from those two real implementations rather than starting from scratch.",
    blockingComponents: ["Toast", "Alert", "Chip", "Tag"],
  },
  {
    id: "operational-components",
    system: "Operational Components",
    verdict: "Partially ready",
    reasoning:
      "Table, Metadata, and Forms give real, composable building blocks for asset cards, property editing, and status displays — the core of what Operational Components need. But the Operational, Workflow, and Platform systems' own readiness blockers still include several Needed items (Chip, Avatar, Toast, Menu, Dropdown Button, Alert, List, Popover) plus Partial Spinner. Table and Metadata now have a proven integration pattern — 4 and 7 of the 9 Workspace Architecture pages consume them, respectively — but Forms remains completely unconsumed by any workspace or operational page, so there's still no proven pattern for wiring an editing surface into a real screen specifically.",
    blockingComponents: ["Chip", "Avatar", "Toast", "Menu", "Dropdown Button", "Alert", "List", "Popover"],
  },
  {
    id: "workflow-components",
    system: "Workflow Components",
    verdict: "Not ready",
    reasoning:
      "Shares Operational Components' blockers plus Stepper — Progress exists, but Stepper, Toast, Menu, and Dropdown Button are all Needed, and Workflow Components' own readiness entry names exactly this set.",
    blockingComponents: ["Stepper", "Toast", "Menu", "Dropdown Button"],
  },
  {
    id: "platform-templates",
    system: "Platform Templates",
    verdict: "Not ready",
    reasoning:
      "Composes Operational and Workflow Components, neither of which is ready yet — transitively not ready. Separately, the certification data this system would report against has its own integrity issue worth fixing first: platform-certification.ts tracks 9 platforms (including \"Product\"), while coverage.ts tracks a different 8 (including \"Admin\" but not \"Product\") — the two lists don't agree, which is exactly why \"Product\" shows a null component-coverage figure today.",
    blockingComponents: ["Operational Components", "Workflow Components"],
  },
];

export const READINESS_SUMMARY =
  "Nothing downstream is fully ready today. The Foundation Layer itself (Layout/Table/Metadata/Forms) is real, and Table is now Certified — a genuine precondition for Operational Components specifically. But Overlay, Navigation, and Feedback each have real component gaps of their own that the Foundation Layer doesn't close, and Forms specifically still has no proven integration pattern for how a downstream system should consume it — unlike Table and Metadata, which now have real, measured usage across the Workspace Architecture pages.";
