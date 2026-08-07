export interface PresentationPattern {
  id: string;
  name: string;
  description: string;
  advantages: string[];
  tradeoffs: string[];
}

export const PRESENTATION_PATTERNS: PresentationPattern[] = [
  {
    id: "single-column",
    name: "Single column",
    description: "Every MetadataRow stacked in one vertical column — DescriptionList's own \"stacked\" layout.",
    advantages: ["Reads correctly at any width, no responsive logic needed", "Simplest possible scan order"],
    tradeoffs: ["Wastes horizontal space on wide screens", "A long property list gets tall fast"],
  },
  {
    id: "two-column",
    name: "Two column",
    description: "Label and value side by side — DescriptionList's \"two-column\" layout, or a 2-column PropertyGroup.",
    advantages: ["Denser than single column", "Familiar key/value reading pattern"],
    tradeoffs: ["Long values can crowd the value column", "Doesn't reflow at mobile widths on its own — pair with \"responsive\" instead for that"],
  },
  {
    id: "compact",
    name: "Compact",
    description: "Tighter gaps and smaller type, for a sidebar or a dense summary card.",
    advantages: ["Fits more information in a constrained space", "Matches Foundation Table's own compact/dense density options"],
    tradeoffs: ["Reduced legibility for long sessions of reading", "Not appropriate as the default for a primary Inspector"],
  },
  {
    id: "inspector-layout",
    name: "Inspector layout",
    description: "IdentityBlock, then PropertySection(s), then RelationshipList — the full anatomy in sequence, inside a Panel.",
    advantages: ["Matches the canonical Metadata Anatomy exactly", "The pattern every Inspector Workspace region should converge on"],
    tradeoffs: ["Taller than a summary card — needs a scrolling Panel for long objects"],
  },
  {
    id: "dashboard-layout",
    name: "Dashboard layout",
    description: "StatGroup and HealthSummary leading, with lighter supporting metadata below.",
    advantages: ["Puts operational numbers first, matching Information Hierarchy's own tiering", "Scannable at a glance across many objects"],
    tradeoffs: ["Not appropriate for a single object's full detail view — too summary-oriented"],
  },
  {
    id: "card-layout",
    name: "Card layout",
    description: "IdentityBlock plus a couple of MetadataRows or a TagCollection, inside a Card — the shape an Asset Card's metadata footer takes.",
    advantages: ["Compact enough for a grid of many cards at once", "Reuses Card directly rather than a bespoke container"],
    tradeoffs: ["Only room for the highest-priority facts — most properties have to be deferred to the full Inspector"],
  },
  {
    id: "responsive-stacking",
    name: "Responsive stacking",
    description: "Two-column layouts collapse to single column below sm: — the default behavior of DescriptionList and Grid-based components alike.",
    advantages: ["One layout definition works at every breakpoint", "Consistent with every other Foundation primitive's own responsive rules"],
    tradeoffs: ["Requires trusting Grid/DescriptionList's built-in breakpoints rather than hand-tuning per page"],
  },
];
