export interface BreakpointNote {
  breakpoint: string;
  note: string;
}

export const BREAKPOINT_NOTES: BreakpointNote[] = [
  { breakpoint: "Desktop", note: "The panel sits as a permanent side panel; PropertyGroup's grid comfortably shows 2-3 columns of fields at once." },
  { breakpoint: "Tablet", note: "PropertyGroup's own columns prop (inherited from Foundation Metadata's PropertyGroup) typically drops to 1-2 — the caller's own choice per group, not an automatic breakpoint PropertyGroup applies on its own." },
  { breakpoint: "Mobile", note: "Same panel, same components — PropertyColor's swatch+hex row and PropertyNumber's stepper both remain comfortably tappable at native input sizing; nothing in this family needs a distinct mobile layout." },
];

export interface ResponsiveTopic {
  label: string;
  note: string;
}

export const RESPONSIVE_TOPICS: ResponsiveTopic[] = [
  {
    label: "Section collapse",
    note: "PropertySection collapses via the same Expandable-based disclosure Inspector Panel already uses — advanced/rarely-touched groups default to collapsed (defaultOpen={false}) rather than the panel growing to show everything expanded at once.",
  },
  {
    label: "Sticky actions",
    note: "PropertyActions pinned inside Inspector Panel's own InspectorFooter — a save/cancel row is never scrolled out of reach on a long panel, the identical rule Inspector Panel already established.",
  },
  {
    label: "Scrolling",
    note: "Inherited unchanged from PropertyPanel (= InspectorPanel): a Foundation Layout ScrollArea body between a sticky header and sticky footer.",
  },
];
