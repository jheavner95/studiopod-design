export interface ImplementationGuidanceTopic {
  label: string;
  text: string;
}

export const IMPLEMENTATION_GUIDANCE: ImplementationGuidanceTopic[] = [
  {
    label: "Controlled, not self-managed",
    text: "Dialog, Drawer, Popover, Menu, and Command Palette are all controlled (open + onOpenChange) — the same convention Table and Forms already use for selection and field state, rather than hiding open/closed state inside the component where the caller can't coordinate it. Tooltip is the one exception: its visibility is genuinely internal, since no real caller needs to control it externally.",
  },
  {
    label: "One z-index scale for the whole system",
    text: "Dropdown-shaped overlays (Menu) use --z-dropdown, anchored content (Popover) uses --z-overlay, blocking surfaces (Dialog, Drawer, Command Palette) use --z-modal, and Tooltip always wins at --z-tooltip — the same tokens.css scale that was already reserved for this system before it existed.",
  },
  {
    label: "Portal everything",
    text: "Every overlay renders through the shared Portal component into document.body — an overlay's stacking and clipping never depend on an ancestor's overflow:hidden or z-index, which matters most for Popover/Menu triggered from inside a scrolling Table or Card.",
  },
  {
    label: "Reuse useFocusTrap / useOutsideClick / useEscapeKey",
    text: "These three hooks live in src/hooks/, not inside the overlay family, because they're genuinely general-purpose interaction hooks, not overlay-specific — a future Forms or Navigation component that needs focus trapping shouldn't have to import from @/components/overlay to get it.",
  },
  {
    label: "Menu composes MenuItem, not a data-list prop",
    text: "Menu takes MenuItem elements as children, matching how TableRow/TableCell and Dialog's own children are composed — not a items={[...]} array. Arrow-key navigation, roving tabindex, and type-ahead are computed from the actual rendered children, not from a parallel data structure.",
  },
  {
    label: "Cap Menu at 2–3 destructive items, separated",
    text: "A destructive MenuItem renders in the error tone — the same pattern this codebase already uses for Badge and status cells. Keep destructive actions visually separated from the rest of the list (a divider or trailing position), never interleaved with routine actions.",
  },
];
