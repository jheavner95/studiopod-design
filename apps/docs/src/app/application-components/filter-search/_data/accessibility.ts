export interface SearchAccessibilityTopic {
  label: string;
  text: string;
}

export const SEARCH_ACCESSIBILITY_TOPICS: SearchAccessibilityTopic[] = [
  {
    label: "Keyboard navigation",
    text: "SearchScope inherits Foundation Navigation's SegmentedControl roving-tabindex radiogroup unchanged; FilterGroup's popover trigger is a real button, and its checklist is real Foundation Forms Checkboxes reachable by Tab once the popover is open.",
  },
  {
    label: "Focus",
    text: "FilterPopover's Popover moves focus in on open and restores it to the trigger button on close — the same Overlay System guarantee Data Grid's DataGridColumnPicker already relies on, not a second focus implementation.",
  },
  {
    label: "ARIA",
    text: "SearchSuggestions uses role=\"listbox\"/role=\"option\" with aria-selected on the active one; the field it anchors to should carry role=\"combobox\"/aria-expanded/aria-controls/aria-activedescendant the same way Foundation Forms' ComboboxField already wires its own input.",
  },
  {
    label: "Announcements",
    text: "This family has no live region of its own — ResultSummary's text update after a search/filter change is a plain DOM text update; a screen that needs it announced to screen readers should wrap ResultSummary in an aria-live=\"polite\" region itself, the same way ValidationSummary's own live region is opt-in at the call site.",
  },
  {
    label: "Search suggestions",
    text: "Selecting a suggestion is a onMouseDown handler with preventDefault (not onClick), so the field's onBlur never fires first and closes the list before the click registers — the identical bug-avoidance ComboboxField already established for its own listbox.",
  },
  {
    label: "Filter removal",
    text: "Every FilterChip rendered by ActiveFilterList carries its own accessible label (\"Remove {label} filter\") on the dismiss button, not just an icon with no name — the same rule this session's Property Panel work already applied to PropertyReset.",
  },
];
