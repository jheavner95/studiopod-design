export interface ComplianceCheck {
  id: string;
  rule: string;
  verdict: "Verified" | "Partially verified" | "Not verified";
  evidence: string;
}

export const COMPOSITION_RULES: ComplianceCheck[] = [
  {
    id: "tables-compose-layout",
    rule: "Tables compose Layout",
    verdict: "Verified",
    evidence:
      "3 of 13 Table files import from @/components/layout: Table.tsx (Surface, ScrollArea), TableActionCell.tsx (Inline), TableToolbar.tsx (Surface, Inline). The remaining 10 are self-contained aside from cn().",
  },
  {
    id: "metadata-composes-layout",
    rule: "Metadata composes Layout",
    verdict: "Verified",
    evidence:
      "10 of 16 Metadata files import from @/components/layout (Stack, Grid, Inline, Panel, Cluster); DescriptionList re-exports directly from layout/DescriptionList. Only MetadataField, MetadataLabel, MetadataRow, and MetadataValue are fully self-contained.",
  },
  {
    id: "forms-compose-layout",
    rule: "Forms compose Layout",
    verdict: "Verified",
    evidence:
      "17 import lines across the family: nearly every *Field wrapper uses Stack, FormRow uses Grid, FormSection uses Panel, FormActions uses Inline + Separator.",
  },
  {
    id: "metadata-never-edits",
    rule: "Metadata never edits",
    verdict: "Verified",
    evidence:
      "Direct grep across all 16 files for onChange, onClick, <input, <button, <select, <textarea, contentEditable — zero matches. The one interactive element in the whole family is RelationshipList's next/link Link, a navigational link explicitly sanctioned by the family's own accessibility.ts (\"the only interactive element anywhere in the metadata system\").",
  },
  {
    id: "forms-never-present",
    rule: "Forms never present read-only information",
    verdict: "Verified",
    evidence:
      "All 11 field-editing components (InputField, TextareaField, SelectField, ComboboxField, CheckboxField, RadioGroupField, SwitchField, SliderField, DatePickerField, FileUploadField, PropertyEditor) require a genuine caller-controlled value/onChange pair — none render a display-only mode. Forms' own states.ts explicitly defers \"read-only\" to Foundation Metadata rather than building it as a Field state.",
  },
  {
    id: "no-cross-family-coupling",
    rule: "Table, Metadata, and Forms don't depend on each other",
    verdict: "Verified",
    evidence:
      "Zero imports from @/components/metadata or @/components/table anywhere in Forms. Zero imports from @/components/form or @/components/table anywhere in Metadata (its full import list is layout + ui only). Zero imports from @/components/metadata or @/components/form anywhere in Table.",
  },
  {
    id: "operational-can-compose",
    rule: "Operational components can compose these foundations",
    verdict: "Partially verified",
    evidence:
      "Structurally nothing prevents it — all three sibling families are self-contained and depend only on Layout + ui. Table and Metadata now have real evidence: 4 of the 9 Workspace Architecture pages (workspace-layout, workspace-toolbar, primary-workspace, workspace-certification) import Table primitives, and 7 of the 9 import DescriptionList from Metadata. Forms remains unverified: zero workspace or operational page imports anything from it, and no page imports Panel or Surface from Layout either.",
  },
];

export interface DependencyLayer {
  id: string;
  label: string;
  members: string[];
  dependsOn: string[];
  note: string;
}

/** A left-to-right, base-to-consumer read of the dependency graph, built from the import grep above. */
export const DEPENDENCY_LAYERS: DependencyLayer[] = [
  {
    id: "ui",
    label: "ui/ primitives",
    members: ["Button", "Badge", "TextInput", "Select", "Checkbox", "ToggleSwitch", "Slider", "RadioGroup", "StatCard", "Skeleton", "Body", "Caption"],
    dependsOn: [],
    note: "The base atom layer every other family reaches into for leaf controls and typography.",
  },
  {
    id: "layout",
    label: "Foundation Layout",
    members: ["Stack", "Inline", "Grid", "Cluster", "Surface", "Panel", "ScrollArea", "Separator", "DescriptionList", "Container", "PageShell", "SectionShell", "CardGrid"],
    dependsOn: ["ui (SectionPlaceholder only)"],
    note: "13 of the 16 files depend on nothing but react and cn() — Cluster→Inline, Panel→Surface, and SectionShell→Container are the only internal cross-dependencies.",
  },
  {
    id: "table",
    label: "Foundation Table",
    members: ["Table", "TableHeader", "TableBody", "TableRow", "TableCell", "TableHead", "TableToolbar", "TableSelectionCell", "TableStatusCell", "TableActionCell", "TableEmptyState", "TableLoadingState", "TableFooter"],
    dependsOn: ["layout", "ui"],
    note: "Depends on Layout and ui only — never on Metadata or Forms.",
  },
  {
    id: "metadata",
    label: "Foundation Metadata",
    members: ["IdentityBlock", "PropertyGroup", "PropertySection", "RelationshipList", "StatusSummary", "HealthSummary", "StatGroup", "TagCollection", "MetadataRow", "MetadataField"],
    dependsOn: ["layout", "ui"],
    note: "Depends on Layout and ui only — never on Table or Forms.",
  },
  {
    id: "forms",
    label: "Foundation Forms",
    members: ["Form", "FormSection", "FormRow", "FormActions", "InputField", "TextareaField", "SelectField", "ComboboxField", "CheckboxField", "RadioGroupField", "SwitchField", "SliderField", "DatePickerField", "FileUploadField", "PropertyEditor", "ValidationSummary", "UnsavedChangesBanner"],
    dependsOn: ["layout", "ui"],
    note: "Depends on Layout and ui only — never on Table or Metadata.",
  },
  {
    id: "workspace",
    label: "Workspace Architecture (9 pages)",
    members: ["workspace-layout", "workspace-header", "workspace-toolbar", "asset-workspace", "primary-workspace", "inspector-workspace", "status-workspace", "workspace-certification", "workspace-framework"],
    dependsOn: ["layout (outer shell only: PageShell, SectionShell, CardGrid)"],
    note: "Every page still imports the same 3 names from Layout's page-shell level and nothing else from that module — zero pages import Panel or Surface. But 7 of the 9 now import DescriptionList from @/components/metadata, and 4 (workspace-layout, workspace-toolbar, primary-workspace, workspace-certification) now import Table primitives from @/components/table — real cracks in what used to be a page-shell-only pattern.",
  },
];

export const COMPOSITION_SUMMARY =
  "The Foundation Layer is internally well-composed: Table, Metadata, and Forms each build cleanly on Layout and ui, never on each other, and both hard behavioral rules (Metadata never edits, Forms never present) hold with zero exceptions under direct grep. The next layer up — Workspace Architecture — has started consuming it: 7 of 9 pages now use DescriptionList and 4 of 9 now use Table primitives, both through real adoption pilots. Forms and Layout's Panel/Surface remain entirely unadopted at that layer.";
