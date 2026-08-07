export interface OverlayAccessibilityTopic {
  label: string;
  text: string;
}

/** One topic per shared mechanism plus one per component-specific requirement — matches the exact accessibility fields already recorded on each component's Foundation Component Catalog entry. */
export const OVERLAY_ACCESSIBILITY_TOPICS: OverlayAccessibilityTopic[] = [
  {
    label: "Focus trap (Dialog, Drawer, Menu, Popover)",
    text: "Tab and Shift+Tab cycle only within the open overlay's focusable elements — built once in useFocusTrap and shared by all four, not reimplemented per component.",
  },
  {
    label: "Focus restoration",
    text: "Whatever element had focus before the overlay opened regains it automatically on close — the same hook that traps focus also restores it, so there's no separate mechanism to keep in sync.",
  },
  {
    label: "Escape to dismiss",
    text: "Every overlay in this system closes on Escape: Dialog, Drawer, Popover, Menu, Tooltip, and Command Palette all wire useEscapeKey identically.",
  },
  {
    label: "Outside click to dismiss",
    text: "Popover and Menu close on a pointerdown outside their content; Dialog and Drawer close on a backdrop click by default (toggle off with dismissible={false} for a flow that must be confirmed explicitly).",
  },
  {
    label: "Dialog: role and modal semantics",
    text: "role=\"dialog\" with aria-modal=\"true\", plus aria-labelledby/aria-describedby wired to the caller's own heading and body content.",
  },
  {
    label: "Menu: ARIA menu pattern",
    text: "role=\"menu\" and role=\"menuitem\" with a roving tabindex (only the highlighted item is tab-stoppable), Up/Down/Home/End move the highlight, and type-ahead jumps to the next item starting with the typed letter.",
  },
  {
    label: "Tooltip: focus as well as hover",
    text: "Tooltip's label is revealed on focus, not just hover — a keyboard user tabbing to the trigger sees the same information a mouse user gets from hovering.",
  },
  {
    label: "Command Palette: combobox/listbox pattern",
    text: "The search input carries role=\"combobox\" with aria-expanded/aria-controls/aria-activedescendant pointing into a role=\"listbox\" of role=\"option\" results, grouped with role=\"group\"/aria-label by Actions vs. Navigation destinations.",
  },
  {
    label: "Reduced motion",
    text: "Every overlay's enter/exit animation checks useMotionEnabled() (from the existing Motion system) before animating at all — with motion paused or reduced-motion enabled, overlays appear and disappear instantly rather than skipping content.",
  },
];
