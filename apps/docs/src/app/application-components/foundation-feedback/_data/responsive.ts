export interface BreakpointNote {
  breakpoint: string;
  note: string;
}

export const BREAKPOINT_NOTES: BreakpointNote[] = [
  {
    breakpoint: "Desktop",
    note: "Toast's viewport sits fixed at the bottom-right with room to spare; Banner and Alert have their full width available for a longer message plus an inline action.",
  },
  {
    breakpoint: "Tablet",
    note: "The same layouts hold; Toast's max-w-sm viewport already caps its width well below a tablet's, so nothing needs to change at this breakpoint specifically.",
  },
  {
    breakpoint: "Mobile",
    note: "Toast's viewport uses w-full up to its max-w-sm cap, so it naturally becomes closer to full-width with small side margins rather than needing a separate mobile layout; Banner's content wraps rather than truncating.",
  },
];

export interface ResponsiveTopic {
  label: string;
  note: string;
}

export const RESPONSIVE_TOPICS: ResponsiveTopic[] = [
  {
    label: "Placement",
    note: "Toast is fixed bottom-right via the Overlay System's Portal, at --z-toast (above modals/overlays, below Tooltip) — the one placement decision this family makes for the caller. Everything else renders exactly where its caller puts it in the document.",
  },
  {
    label: "Stacking",
    note: "ToastProvider stacks multiple toasts newest-on-top with a fixed gap, each animating in/out independently via AnimatePresence — dismissing one doesn't reflow or restart the others' timers.",
  },
  {
    label: "Auto-dismiss",
    note: "Toast defaults to a 5000ms timer (duration=0 disables it) and pauses for as long as the pointer or focus stays on that toast, resuming with a fresh full duration rather than the exact remaining time on mouse-leave/blur — a deliberate simplification, not a precision timer.",
  },
];
