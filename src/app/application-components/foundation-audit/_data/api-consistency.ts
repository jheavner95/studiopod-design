export interface ConsistencyDimension {
  id: string;
  dimension: string;
  layout: string;
  table: string;
  metadata: string;
  forms: string;
  verdict: "Consistent" | "Inconsistent";
}

/** Every cell below is drawn from a full prop-interface read of all 68 files across the four families — not sampled. */
export const API_CONSISTENCY_MATRIX: ConsistencyDimension[] = [
  {
    id: "classname",
    dimension: "className support",
    layout: "All 13 primitives",
    table: "All 13 components",
    metadata: "All 16 components",
    forms: "All 23 files",
    verdict: "Consistent",
  },
  {
    id: "rest-spread",
    dimension: "Rest-prop spreading",
    layout: "None — every prop interface is closed",
    table: "None — every prop interface is closed",
    metadata: "None — every prop interface is closed",
    forms: "Mixed: 7 *Field wrappers spread onto their base ui/ control; 16 other files enumerate props explicitly",
    verdict: "Inconsistent",
  },
  {
    id: "polymorphism",
    dimension: "Polymorphic \"as\" prop",
    layout: "4 of 13 (Container, Inline, Stack, Surface)",
    table: "None — every component renders a fixed native table element",
    metadata: "None",
    forms: "None — every field renders a fixed native form element",
    verdict: "Consistent",
  },
  {
    id: "tone-vocabulary",
    dimension: "Tone / severity vocabulary",
    layout: "N/A",
    table: "StatusTone: neutral | accent | success | warning | error (5 values)",
    metadata: "StatusTone: neutral | accent | success | warning | error (5 values, same type as Table)",
    forms: "FieldMessageTone: error | warning only (2 values)",
    verdict: "Inconsistent",
  },
  {
    id: "responsive-props",
    dimension: "Per-component responsive props",
    layout: "None — responsiveness is structural (Grid columns, ScrollArea), not a variant prop",
    table: "None — relies on ScrollArea composition",
    metadata: "None — DescriptionList's layout=\"responsive\" is Layout's own prop, reused",
    forms: "None",
    verdict: "Consistent",
  },
  {
    id: "density",
    dimension: "Density / size scale",
    layout: "Not present on any of the 13 primitives",
    table: "TableDensityContext: comfortable | compact | dense — the only family with this concept",
    metadata: "Not present",
    forms: "Not present",
    verdict: "Inconsistent",
  },
  {
    id: "required-error",
    dimension: "required / error prop naming",
    layout: "N/A",
    table: "N/A — no editable state",
    metadata: "N/A — no editable state",
    forms: "required?: boolean and error?: ReactNode on every *Field wrapper, uniformly",
    verdict: "Consistent",
  },
  {
    id: "aria-describedby",
    dimension: "Description wired to aria-describedby",
    layout: "N/A",
    table: "N/A",
    metadata: "N/A",
    forms: "Only DatePickerField wires it; the other 9 field types render a description line with no aria-describedby link",
    verdict: "Inconsistent",
  },
];

export interface ConsistencyFinding {
  id: string;
  title: string;
  detail: string;
  severity: "high" | "medium" | "low";
}

export const CONSISTENCY_FINDINGS: ConsistencyFinding[] = [
  {
    id: "field-naming-collision",
    title: "\"Field\" means two different things across families",
    detail:
      "src/components/form/FormField.tsx re-exports ui/FormField — a label + description + editable control + message wrapper. src/components/metadata/MetadataField.tsx wraps MetadataLabel + MetadataValue — a label + static value pair. Same word, structurally opposite jobs (one hosts an editable control, one never does). A reader skimming import statements can't tell which is which without opening the file.",
    severity: "medium",
  },
  {
    id: "cellalign-duplication",
    title: "CellAlign is declared twice inside Foundation Table itself",
    detail:
      "TableCell.tsx and TableHead.tsx each independently declare their own local type CellAlign = \"left\" | \"center\" | \"right\" — identical definitions, neither exported, no shared source. A genuine internal duplication inside a single family, not just across families.",
    severity: "low",
  },
  {
    id: "surface-role-workaround",
    title: "Surface has no role prop, and two Forms components need one",
    detail:
      "ValidationSummary and UnsavedChangesBanner both need role=\"alert\"/role=\"status\" on their outer element, but Surface's closed prop interface doesn't accept role and doesn't spread rest props. Both worked around it identically: wrap Surface in a plain outer <div role=\"...\">. The workaround is consistent between the two occurrences, but it isn't a documented, sanctioned pattern anywhere — the next component that needs a role on a Surface has no written guidance to follow.",
    severity: "low",
  },
  {
    id: "aria-describedby-gap",
    title: "Forms' own accessibility docs admit the aria-describedby gap",
    detail:
      "foundation-forms/_data/accessibility.ts states outright: \"A field's optional description line renders before the control and isn't currently wired to aria-describedby.\" Confirmed in code: DatePickerField wires it, but InputField, TextareaField, SelectField, ComboboxField, FileUploadField, CheckboxField, RadioGroupField, SwitchField, and SliderField do not. This is the most concrete, self-disclosed defect found anywhere in the four families.",
    severity: "high",
  },
  {
    id: "findingcommand-inconsistency",
    title: "Table's promotion-candidates data has no findingCommand field",
    detail:
      "Layout, Metadata, and Forms each define findingCommand: string on every promotion-candidate entry, rendered as a reproducible <code> block on their docs pages. Table's promotion-candidates.ts has no such field — only a prose header comment describing the method. Re-running that method literally (grep for \"<table\") returns a different file set than the one documented (see Section 4).",
    severity: "medium",
  },
];

export const NORMALIZATION_RECOMMENDATIONS: string[] = [
  "Document when a wrapper component should rest-spread onto its base control (single-base-control wrappers like InputField) versus fully enumerate props (freestanding composed components like FormSection) — Forms currently does both with no stated rule.",
  "Extract one shared CellAlign type in Foundation Table instead of two identical local declarations.",
  "Decide and document whether Forms' validation tone should adopt the 5-value StatusTone already shared by Table and Metadata, or whether a narrower 2-value error/warning tone is an intentional, stated divergence for validation messaging specifically.",
  "Wire aria-describedby consistently across all 10 Forms field types, using DatePickerField's existing implementation as the reference.",
  "Document the Surface-wrapped-in-a-role-div pattern as the sanctioned idiom (or add an optional role passthrough to Surface directly) so the next component needing it doesn't reinvent the workaround.",
  "Add a findingCommand field to every entry in foundation-table/_data/promotion-candidates.ts, matching its three sibling families.",
];
