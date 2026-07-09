export interface DesignContractItem {
  label: string;
  note: string;
}

/** The official checklist every future Inspector implementation must satisfy — each item traces back to a specific region or principle documented above, not restated from scratch. */
export const DESIGN_CONTRACT: DesignContractItem[] = [
  { label: "Identity always first", note: "Matches the Identity region and Inspector Principle \"Identity first.\"" },
  { label: "Validation before Health", note: "Validation precedes Health in the anatomy — a problem the user needs to act on outranks passive status." },
  { label: "Activity always chronological", note: "Matches the Activity region's own chronological-presentation rule." },
  { label: "Object actions last", note: "Matches Inspector Actions and Inspector Principle \"Actions belong last.\"" },
  { label: "Sticky header", note: "Matches the Inspector Header's own sticky-behavior rule." },
  { label: "Progressive disclosure", note: "Matches the Properties region's own progressive-disclosure rule." },
  { label: "Responsive behavior", note: "Matches one of the five presentation modes, appropriate to its breakpoint." },
  { label: "Accessibility requirements", note: "Matches every item in the Accessibility section." },
];
