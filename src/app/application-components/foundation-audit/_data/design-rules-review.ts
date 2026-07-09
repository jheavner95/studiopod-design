export interface RuleReview {
  id: string;
  rule: string;
  source: string;
  verdict: "Followed" | "Violated" | "Needs clarification";
  detail: string;
}

export const DESIGN_RULES_REVIEW: RuleReview[] = [
  {
    id: "metadata-presents-forms-edit",
    rule: "\"Metadata presents\" / \"Forms edit\"",
    source: "Foundation Metadata & Foundation Forms implementation guidance",
    verdict: "Followed",
    detail: "Verified by direct grep in Section 3 with zero exceptions in either direction — the single most consistently followed rule in the whole audit.",
  },
  {
    id: "boring-reliable-accessible",
    rule: "\"Foundation components must be boring, reliable, and accessible\"",
    source: "Foundation Component Catalog design rules",
    verdict: "Followed",
    detail: "Structurally true across all 68 files — closed prop interfaces, real native elements, no novel interaction patterns invented for their own sake.",
  },
  {
    id: "prefer-primitives",
    rule: "\"Prefer Stack / Inline / Grid before a custom flex\"",
    source: "Foundation Layout rules",
    verdict: "Needs clarification",
    detail: "Followed inside the Foundation Layer's own implementation — none of the 68 files hand-roll flex-col internally. Violated at the wider codebase level: 242 raw flex flex-col gap-N occurrences still exist outside the Foundation Layer. The rule doesn't currently distinguish \"the primitives follow this\" from \"the codebase adopts the primitives\" — worth stating both as separate, trackable claims.",
  },
  {
    id: "operational-compose-not-reinvent",
    rule: "\"Operational components compose foundations; they do not reinvent them\"",
    source: "Foundation Component Catalog design rules",
    verdict: "Violated",
    detail: "Actively violated today by every duplication finding in Section 4 — 8 duplicate tables, 9 duplicate description lists, 19 duplicate Panel/Surface wrappers, 5 duplicate ControlDocks, all still un-migrated. Important nuance: DS-2.1.2 through DS-2.1.5 each explicitly instructed \"do not refactor existing pages yet\" — so this is an accepted, temporary, intentional violation tracked by design, not a surprise regression.",
  },
  {
    id: "forms-accessible-by-default",
    rule: "Implicit — every Forms field should wire its own accessibility affordances by default",
    source: "Foundation Forms accessibility.ts",
    verdict: "Violated",
    detail: "Self-disclosed by the family's own documentation: field descriptions aren't wired to aria-describedby on 9 of 10 field types. Not a fabricated finding — the source file states it outright.",
  },
  {
    id: "real-findings-not-estimates",
    rule: "\"Real findings, not estimates\" (the standing methodology every promotion-candidates.ts claims to follow)",
    source: "Foundation Layout / Metadata / Forms promotion-candidates.ts header comments",
    verdict: "Violated",
    detail: "Table's promotion-candidates.ts has no findingCommand field at all, and its stated discovery method (grep for <table) doesn't literally reproduce its own file list — 2 of its 8 candidates contain no <table> element. Layout's and Metadata's description-list and surface/panel findingCommands are self-referentially inflated by their own _data files. The underlying findings are still accurate; the reproducibility claim isn't fully honored.",
  },
  {
    id: "real-screen-definition",
    rule: "What counts as a \"real (non-playground) screen\" for Certified maturity",
    source: "application-components/_data/maturity.ts",
    verdict: "Needs clarification",
    detail: "This ambiguity directly affected Section 6: are application-components pages themselves \"real screens,\" or does Certified require adoption by a page outside the Foundation Layer's own documentation? The audit assumed the stricter reading (adoption elsewhere) for consistency, but the rule doesn't say so explicitly.",
  },
  {
    id: "rest-spread-convention",
    rule: "When a wrapper component should rest-spread onto its base control versus enumerate props explicitly",
    source: "Not currently documented anywhere",
    verdict: "Needs clarification",
    detail: "Forms does both (see Section 2's rest-spread finding) with no stated rule distinguishing the two cases.",
  },
  {
    id: "tone-vocabulary-rule",
    rule: "Whether every family should share one tone/severity vocabulary",
    source: "Not currently documented anywhere",
    verdict: "Needs clarification",
    detail: "Table and Metadata already share a 5-value StatusTone; Forms uses a narrower 2-value FieldMessageTone for validation messages specifically. This may be entirely correct (validation genuinely only has two severities) but it isn't a stated decision anywhere.",
  },
];

export const RECOMMENDED_ADDITIONS: string[] = [
  "A rule requiring every duplication-finding grep to exclude a family's own _data/*.ts and page.tsx files, since three independent families' commands were found to be self-referentially inflated by the exact same class of bug.",
  "A rule requiring every new foundation family's promotion-candidates.ts to include a findingCommand field per entry, closing the one gap found in Table's version.",
  "A rule (or lint check) preventing the same local type from being declared independently in two files of the same family, as happened with CellAlign in Table.",
  "A rule defining when a family's real component count should be reflected as its own catalog group versus folded into an existing one — Metadata's 16 components and Forms' 22 currently collapse into a handful of Data Display / Inputs rows.",
];
