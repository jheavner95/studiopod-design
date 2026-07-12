export interface AccessibilityItem {
  title: string;
  location: string;
  detail: string;
  status: "resolved" | "reopened" | "still-open";
}

export const ACCESSIBILITY_HEADLINE =
  "Two long-open items are now resolved, and one item previously reported as closed is open again, at a broader scope than earlier documented.";

export const ACCESSIBILITY_RESOLVED: AccessibilityItem[] = [
  {
    title: "TableRow keyboard activation",
    location: "src/components/table/TableRow.tsx:14-27",
    detail:
      "TableRow now sets tabIndex={0} and wires onKeyDown whenever onClick is passed, firing the click handler on Enter or Space with preventDefault.",
    status: "resolved",
  },
  {
    title: "Popover aria-label on FilterPopover and DataGridColumnPicker",
    location: "src/components/operational/FilterPopover.tsx:50; src/components/operational/DataGridColumnPicker.tsx:44",
    detail:
      "Both components now pass aria-label to Popover — FilterPopover forwards its own label prop when it's a string and falls back to \"Filter options\" otherwise (label is typed ReactNode, so a non-string label would otherwise leave the Popover unnamed), and DataGridColumnPicker passes a fixed \"Choose columns\".",
    status: "resolved",
  },
];

export const ACCESSIBILITY_REOPENED: AccessibilityItem[] = [
  {
    title: "Field description text was never actually wired to aria-describedby — for any field type",
    location: "src/components/form/*Field.tsx (all 10 files, including DatePickerField.tsx:51,66)",
    detail:
      "Field description text is not wired to aria-describedby for any of the 10 *Field.tsx files, including DatePickerField — its aria-describedby only covers helperText/error, the same partial pattern several sibling fields already have via their own describedBy/errorId prop. DatePickerField is not a usable reference implementation for this pattern. The gap applies to 10 of 10 field types.",
    status: "reopened",
  },
];

export const ACCESSIBILITY_STILL_OPEN: AccessibilityItem[] = [
  {
    title: "Touch-target sizing under the WCAG 2.5.8 24×24 CSS px minimum",
    location: "PropertyReset, SavedFilter's delete button, SearchHistory's remove button, FilterChip's remove button",
    detail:
      "All four icon-only affordances Accessibility Certification originally flagged still render at their original, unremediated sizes — no min-h/min-w utility applied to any of the four.",
    status: "still-open",
  },
  {
    title: "\"Every workspace architecture page documents accessibility as a first-class section\" overclaims",
    location: "workspace-framework, workspace-layout — see Architecture Summary",
    detail:
      "Not previously disclosed, because Workspace Architecture sits outside the two tiers (Foundation, Operational) Accessibility Certification scoped itself to.",
    status: "still-open",
  },
];
