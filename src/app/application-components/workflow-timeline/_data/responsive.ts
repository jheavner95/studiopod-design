export interface BreakpointNote {
  breakpoint: string;
  note: string;
}

export const BREAKPOINT_NOTES: BreakpointNote[] = [
  { breakpoint: "Desktop", note: "WorkflowTimelineEvent renders title, description, and the actor/timestamp line all on their own rows, with room for a source Badge beside the title — the fullest layout this family renders." },
  { breakpoint: "Tablet", note: "The same vertical layout holds; WorkflowTimelineFilters' SegmentedControl may wrap to a second row before any text truncates, the same behavior Queue & Job's own QueueFilters already has at this width." },
  { breakpoint: "Mobile", note: "WorkflowTimelineEvent's title/source Badge row wraps (flex-wrap) rather than overflowing, and the actor/timestamp caption line shrinks to Foundation Typography's own caption scale — no separate mobile-only layout exists." },
];

export interface ResponsiveTopic {
  label: string;
  note: string;
}

export const RESPONSIVE_TOPICS: ResponsiveTopic[] = [
  {
    label: "Collapsed groups",
    note: "WorkflowTimelineGroup itself has no built-in collapse — a screen with many groups (e.g. one per day, going back months) wraps a WorkflowTimelineGroup in Foundation UI's own Expandable, the same opt-in disclosure pattern InspectorHistory already uses for overflow entries.",
  },
  {
    label: "Compact events",
    note: "WorkflowTimelineEvent's description line is optional — a dense timeline (many events, little vertical room) omits it and shows only title, marker, and the actor/timestamp caption, the same optional-detail convention WorkflowStepperStep's own description prop already establishes.",
  },
  {
    label: "Sticky filters",
    note: "WorkflowTimelineFilters has no sticky positioning of its own — a screen wanting filters pinned above a long scrolling timeline places them in WorkflowTimelineHeader (which sits above the scrollable Inspector Panel body this family composes from) rather than inline with the events.",
  },
];
