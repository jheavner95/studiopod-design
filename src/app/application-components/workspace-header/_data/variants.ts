export interface HeaderVariant {
  id: string;
  title: string;
  purpose: string;
  additionalRegions: string[];
  typicalActions: string[];
  whenToUse: string;
}

/** Seven ways the same four-region header adapts to what the Primary Workspace below it is doing. */
export const HEADER_VARIANTS: HeaderVariant[] = [
  {
    id: "library",
    title: "Library Header",
    purpose: "The default — Platform Identity, Status, and a single Primary Action for creating a new object.",
    additionalRegions: [],
    typicalActions: ["Create", "Import"],
    whenToUse: "Any platform whose Primary Workspace is in Library-browsing mode — the majority of platforms, most of the time.",
  },
  {
    id: "dashboard",
    title: "Dashboard Header",
    purpose:
      "Trades the single Primary Action for a date-range or scope picker — dashboards are about the view of the data, not creating something new.",
    additionalRegions: ["Scope / date-range picker"],
    typicalActions: ["Export", "Refresh"],
    whenToUse: "A platform whose Primary Workspace is a Dashboard mode (Commerce, Operations).",
  },
  {
    id: "editor",
    title: "Editor Header",
    purpose:
      "Replaces Status badges with a save/autosave indicator — while editing, this object's saved state matters more than the platform's ambient health.",
    additionalRegions: ["Save-state indicator"],
    typicalActions: ["Save", "Publish", "Discard"],
    whenToUse: "A platform whose Primary Workspace is a Canvas mode (Publishing, Assets).",
  },
  {
    id: "queue",
    title: "Queue Header",
    purpose: "Adds a live queue-depth count next to Status — the single most important number on a Queue-mode screen.",
    additionalRegions: ["Queue-depth counter"],
    typicalActions: ["Pause queue", "Retry failed"],
    whenToUse: "A platform whose Primary Workspace is a Queue mode (Production).",
  },
  {
    id: "settings",
    title: "Settings Header",
    purpose: "Drops Status and most Actions entirely — settings screens are read-then-write, not ambient-monitoring surfaces.",
    additionalRegions: [],
    typicalActions: ["Save changes"],
    whenToUse: "Any settings or configuration surface, regardless of platform.",
  },
  {
    id: "wizard",
    title: "Wizard Header",
    purpose:
      "Replaces the Actions region with step progress — a wizard's only real action is “advance,” and that lives in the Primary Workspace, not the header.",
    additionalRegions: ["Step-progress indicator"],
    typicalActions: ["Cancel"],
    whenToUse: "A platform whose Primary Workspace is a Wizard mode (guided multi-step creation).",
  },
  {
    id: "comparison",
    title: "Comparison View",
    purpose: "Doubles the Platform Identity region — two names, two icons — so it's unambiguous which side you're changing.",
    additionalRegions: ["A second Platform Identity, for the comparison target"],
    typicalActions: ["Swap sides", "Exit comparison"],
    whenToUse: "A platform whose Primary Workspace is comparing two objects side by side (e.g. two providers on the Integrations Workspace).",
  },
];
