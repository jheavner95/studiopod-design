export interface BrowserAccessibilityTopic {
  label: string;
  text: string;
}

export const BROWSER_ACCESSIBILITY_TOPICS: BrowserAccessibilityTopic[] = [
  {
    label: "Keyboard navigation",
    text: "AssetCard is a real, focusable role=\"button\" element (when onItemClick is passed) responding to Enter/Space, reachable by Tab in DOM order — the same rule AssetList's underlying Data Grid rows already follow.",
  },
  {
    label: "Selection",
    text: "AssetCard's selection checkbox is a real Foundation UI Checkbox, individually labeled, and stops click propagation so checking it never also triggers the card's own onItemClick — the same pattern Data Grid's TableSelectionCell already establishes for list view.",
  },
  {
    label: "Focus",
    text: "Nothing in this family traps or redirects focus — an inspector slot's own focus behavior (if it's a Drawer on mobile, for instance) belongs to the Overlay System, not Asset Browser.",
  },
  {
    label: "Screen readers",
    text: "AssetList's required caption prop is announced via Data Grid's own visually-hidden <caption> — every real browser must describe what library it's browsing, not just \"table.\"",
  },
  {
    label: "ARIA",
    text: "AssetViewToggle inherits Foundation Navigation's SegmentedControl ARIA radiogroup pattern unchanged; AssetList inherits every ARIA guarantee Data Grid's own table already makes (real <th scope>, aria-sort, aria-selected).",
  },
];
