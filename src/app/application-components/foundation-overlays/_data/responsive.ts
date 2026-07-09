export interface BreakpointNote {
  breakpoint: string;
  note: string;
}

export const BREAKPOINT_NOTES: BreakpointNote[] = [
  {
    breakpoint: "Desktop",
    note: "Popover, Menu, and Tooltip anchor precisely to their trigger with room to flip above/below or clamp within the viewport. Dialog centers; Drawer docks to its chosen edge at a fixed max width.",
  },
  {
    breakpoint: "Tablet",
    note: "Anchored overlays behave identically — useAnchoredPosition already clamps to the viewport regardless of width. Dialog's max-width keeps it from spanning the full tablet width edge-to-edge.",
  },
  {
    breakpoint: "Mobile",
    note: "Drawer's bottom edge variant is the natural mobile pattern (full width, capped height) where the right edge variant would otherwise eat the whole screen. Dialog's sm/md sizes stay comfortably inset; its full size intentionally fills nearly the whole viewport on small screens.",
  },
];

export interface ResponsiveTopic {
  label: string;
  note: string;
}

export const RESPONSIVE_TOPICS: ResponsiveTopic[] = [
  {
    label: "Anchored positioning clamps to the viewport",
    note: "useAnchoredPosition recalculates on resize and scroll, and clamps the final position within an 8px margin of every edge — a Popover or Menu never renders partially off-screen, on any device.",
  },
  {
    label: "Placement flips when there's no room",
    note: "A Popover or Tooltip placed \"bottom\" flips to \"top\" (and vice versa) if the viewport doesn't have room below the trigger — most noticeable on mobile, where triggers near the bottom of the screen are common.",
  },
  {
    label: "Drawer edge is a deliberate choice, not automatic",
    note: "This system doesn't switch a Drawer's edge based on viewport width on its own — the calling page picks right or bottom based on its own layout, matching how Inspector Workspace and Operational Status already describe their own responsive Drawer modes.",
  },
];
