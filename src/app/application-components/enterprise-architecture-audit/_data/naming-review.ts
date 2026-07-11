export interface NamingEntry {
  name: string;
  scope: string;
  verdict: "Intentional, disclosed" | "Real gap, still open" | "New, checked — clean";
  detail: string;
}

/**
 * Every per-tier certification page (Foundation, Operational, Workflow,
 * Platform) already ran its own naming audit against its own scope. This
 * audit's own contribution is threefold: re-verify each already-disclosed
 * collision is still accurately described against current source, check
 * the newest additions to the codebase (LiveRegionProvider, useAnnounce,
 * useBodyLock) against every tier for the first time, and check the one
 * cross-tier ambiguity (the word "Field") that no single per-tier audit
 * was positioned to catch since both halves of the collision sit inside
 * the same tier's own two different families.
 */
export const NAMING_COLLISIONS: NamingEntry[] = [
  {
    name: "ProductionPipeline",
    scope: "Production Platform component vs. src/production/types/production.ts's own interface",
    verdict: "Real gap, still open",
    detail: "Re-confirmed present in current source: src/components/platform/production/ProductionPipeline.tsx re-exports Pipeline as ProductionPipeline, and src/production/types/production.ts:120 still independently declares export interface ProductionPipeline. Same identifier, different module, no compile-time conflict — disclosed by Production Platform's own promotion-candidates.ts, and still disclosed rather than renamed as of this audit.",
  },
  {
    name: "WorkflowStep (type) / PipelineStage (component)",
    scope: "Workflow tier, against itself and the plural Workflow Diagram Library",
    verdict: "Real gap, still open",
    detail: "Workflow Certification's own audit found and disclosed this; workflow-certification's own certification.ts still lists it as an unresolved REMAINING_BLOCKERS item toward Certified. Re-confirmed present: src/components/workflow/index.ts still exports WorkflowStep from ./WorkflowStep unchanged.",
  },
  {
    name: "\"Field\" — form/FormField.tsx vs. metadata/MetadataField.tsx",
    scope: "Foundation tier, form/ family vs. metadata/ family",
    verdict: "Real gap, still open",
    detail: "The same identifier describes structurally opposite jobs (an editable-control wrapper vs. a static label/value pair) within Foundation itself. Already disclosed in Foundation Audit's own api-consistency.ts as a MEDIUM-severity finding; cross-referenced here rather than re-litigated, since it is a naming question at heart even though it surfaced in an API-consistency audit.",
  },
  {
    name: "\"Operations\" (platform) vs. \"Operational\" (tier)",
    scope: "Operations Platform vs. the Operational Component Library tier",
    verdict: "Intentional, disclosed",
    detail: "Pre-disclosed in Platform Architecture's own templates.ts before Operations Platform was built; re-confirmed both src/components/operational/ and src/components/platform/operations/ still coexist exactly as anticipated, sharing a name by coincidence only.",
  },
  {
    name: "LiveRegionProvider / useAnnounce",
    scope: "New this session — src/components/feedback/LiveRegion.tsx",
    verdict: "New, checked — clean",
    detail: "Repo-wide grep for both identifiers outside src/components/feedback/ and its consumers found zero competing declarations. Neither name collides with any Foundation, Operational, Workflow, or Platform export.",
  },
  {
    name: "useBodyLock",
    scope: "New this session — src/hooks/useBodyLock.ts",
    verdict: "New, checked — clean",
    detail: "Repo-wide grep found a single declaration and zero competing exports of the same name anywhere else in src/.",
  },
];

export const NAMING_SUMMARY =
  "Two naming collisions already disclosed by earlier per-tier audits (ProductionPipeline, WorkflowStep/PipelineStage) are re-confirmed still open — disclosed, not fixed, in both the earlier audit and this one. One further already-disclosed item (the \"Field\" ambiguity) is cross-referenced from this audit's own API Consistency findings rather than duplicated as a second investigation. The two genuinely new identifiers introduced since the last naming audit ran (LiveRegionProvider, useBodyLock) were checked for the first time here and collide with nothing. Zero new, previously-undisclosed collisions were found anywhere in the six-tier stack during this pass.";
