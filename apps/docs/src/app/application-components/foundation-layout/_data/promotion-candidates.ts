export interface PromotionCandidate {
  primitiveId: string;
  primitiveName: string;
  /** An exact, grep-verifiable count against this repository at the time this page was written — not an estimate. */
  occurrenceCount: number;
  findingCommand: string;
  examples: string[];
  note: string;
}

/**
 * Real findings, not estimates — every count below was produced by
 * grepping this repository and is reproducible with findingCommand.
 */
export const PROMOTION_CANDIDATES: PromotionCandidate[] = [
  {
    primitiveId: "description-list",
    primitiveName: "Description List",
    occurrenceCount: 8,
    findingCommand: String.raw`grep -rl 'dl className="flex flex-col"' src/app/application-components/`,
    examples: [
      "workspace-header/page.tsx",
      "workspace-layout/page.tsx",
      "workspace-toolbar/page.tsx",
      "asset-workspace/page.tsx",
      "primary-workspace/page.tsx",
      "inspector-workspace/page.tsx",
      "status-workspace/page.tsx",
    ],
    note: "Every Accessibility section across this design system hand-rolled the identical dl/dt/dd block. This is the clearest migration case in the catalog — now replaced by DescriptionList going forward.",
  },
  {
    primitiveId: "inline",
    primitiveName: "Inline",
    occurrenceCount: 10,
    findingCommand: String.raw`grep -rl 'flex flex-wrap gap-4' src/app/application-components/*/page.tsx`,
    examples: ["Every CrossLinks row across this design system"],
    note: "The CrossLinks pattern at the top of nearly every page in this design system is a flex flex-wrap gap-4 row — exactly what Inline exists to express directly.",
  },
  {
    primitiveId: "stack",
    primitiveName: "Stack",
    occurrenceCount: 161,
    findingCommand: String.raw`grep -roE 'className="flex flex-col gap-[0-9]+"' src/app/application-components/ | wc -l`,
    examples: ["Nearly every section wrapper, card body, and detail panel in application-components/"],
    note: "The single most repeated exact className string in this package. Not every instance needs to migrate — many are one-off and low-value to touch — but it's the strongest signal for why Stack belongs in the foundation layer.",
  },
  {
    primitiveId: "surface",
    primitiveName: "Surface / Panel",
    occurrenceCount: 13,
    findingCommand: String.raw`grep -rl 'rounded-lg border border-border-subtle bg-surface p-4 sm:p-6' src/app/application-components/`,
    examples: [
      "workspace-certification/page.tsx",
      "status-workspace/page.tsx",
      "workspace-toolbar/page.tsx",
      "inspector-workspace/page.tsx",
      "_components/MaturityTable.tsx",
      "inventory/_components/InventoryTable.tsx",
    ],
    note: "The bordered-card-with-padding wrapper around checklists, tables, and accessibility blocks is the exact shape Surface and Panel now express directly.",
  },
];
