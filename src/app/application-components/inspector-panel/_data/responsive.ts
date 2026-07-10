export interface BreakpointNote {
  breakpoint: string;
  note: string;
}

export const BREAKPOINT_NOTES: BreakpointNote[] = [
  { breakpoint: "Desktop", note: "The Inspector sits as a permanent side panel alongside the primary workspace; every section can stay expanded at once without crowding." },
  { breakpoint: "Tablet", note: "The same panel holds, but Sections default to collapsed sooner (the caller's own choice of defaultOpen) since there's less vertical room to show everything expanded at once." },
  { breakpoint: "Mobile", note: "The Inspector becomes a full-screen Drawer (the Overlay System's own Drawer, edge=\"bottom\" or \"right\") rather than a permanent side panel — InspectorPanel itself doesn't know whether it's in a Drawer or docked; that choice belongs to the caller composing them together." },
];

export interface ResponsiveTopic {
  label: string;
  note: string;
}

export const RESPONSIVE_TOPICS: ResponsiveTopic[] = [
  {
    label: "Collapsible sections",
    note: "InspectorSection collapses via Foundation UI's own Expandable — a controlled or uncontrolled disclosure, not a bespoke accordion. Progressive disclosure (common fields first, advanced behind an expand) is the caller's own choice of which fields go in which InspectorSection/InspectorGroup.",
  },
  {
    label: "Sticky actions",
    note: "InspectorFooter pins to the bottom of InspectorPanel regardless of scroll position — the same sticky rule InspectorHeader applies to the top, so a save/cancel row is never scrolled out of reach on a long panel.",
  },
  {
    label: "Scrolling",
    note: "InspectorPanel's body is a Foundation Layout ScrollArea (direction=\"vertical\", an optional maxHeight) — Header and Footer stay fixed, only Sections/Groups/Properties/Validation/Status/History scroll beneath them.",
  },
];
