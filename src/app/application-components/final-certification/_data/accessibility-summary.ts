export interface AccessibilityItem {
  title: string;
  location: string;
  detail: string;
  status: "resolved" | "reopened" | "still-open";
}

export const ACCESSIBILITY_HEADLINE =
  "Accessibility & Interaction Quality Certification (DS-6.3) and Enterprise Architecture Audit (DS-6.4) both hold up on re-verification, with real movement in both directions: two long-open items are now genuinely fixed, and one long-closed item is genuinely reopened at a worse severity than originally reported.";

export const ACCESSIBILITY_RESOLVED: AccessibilityItem[] = [
  {
    title: "TableRow keyboard activation",
    location: "src/components/table/TableRow.tsx:14-27",
    detail:
      "TableRow now sets tabIndex={0} and wires onKeyDown whenever onClick is passed, firing the click handler on Enter or Space with preventDefault. Enterprise Architecture Audit had marked this \"Still open\" as recently as its own pass; it landed afterward and is confirmed present now.",
    status: "resolved",
  },
  {
    title: "Popover aria-label on FilterPopover and DataGridColumnPicker",
    location: "src/components/operational/FilterPopover.tsx:50; src/components/operational/DataGridColumnPicker.tsx:44",
    detail:
      "Both components now pass aria-label to Popover — FilterPopover forwards its own label prop when it's a string and falls back to \"Filter options\" otherwise (closing a residual gap this session's own re-verification pass caught: label is typed ReactNode, so a non-string label previously left the Popover unnamed), DataGridColumnPicker passes a fixed \"Choose columns\". Also landed after Enterprise Architecture Audit's own pass.",
    status: "resolved",
  },
];

export const ACCESSIBILITY_REOPENED: AccessibilityItem[] = [
  {
    title: "Field description text was never actually wired to aria-describedby — for any field type",
    location: "src/components/form/*Field.tsx (all 10 files, including DatePickerField.tsx:51,66)",
    detail:
      "Foundation Audit's oft-repeated claim — \"only DatePickerField wires the description line to aria-describedby, 9 of 10 field types affected\" — is factually wrong. Direct inspection of all 10 *Field.tsx files shows none of them assign an id to the description paragraph or reference it via aria-describedby, including DatePickerField: its aria-describedby only covers helperText/error, the same partial pattern several sibling fields already have via their own describedBy/errorId prop. The correct count is 10 of 10, and DatePickerField is not a usable reference implementation, contrary to Foundation Audit's own remediation recommendation. This claim was repeated across five of Foundation Audit's own data files and inherited uncritically by Enterprise Architecture Audit, which reported the gap \"now resolved tier-wide\" without independently re-checking it — the same wrong claim survived two certifications before this page caught it by reading the source directly.",
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
      "Newly found this pass while re-verifying DS-1.9 directly. Not previously disclosed by any accessibility audit because DS-1.9 sits outside the two tiers (Foundation, Operational) Accessibility Certification scoped itself to.",
    status: "still-open",
  },
];
