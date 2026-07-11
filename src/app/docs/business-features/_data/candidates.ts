import { ADOPTION_TARGETS, VERDICT_LABEL, type FeatureAdoptionVerdict } from "@/app/docs/application-composition/_data/adoption";

export interface CandidateFeature {
  name: string;
  adoptionTargetId: string;
  verdict: FeatureAdoptionVerdict;
  verdictLabel: string;
  finding: string;
  suggestedCategory: string;
}

/**
 * The ten candidates this package's own work order names, resolved against
 * DS-5.1's own Adoption Targets rather than re-run as a fresh audit — this
 * page adds a suggested Feature Category per candidate, it does not
 * re-derive the underlying grep-based finding. The five names this package's
 * own work order suffixes with "Workspace" (Production, Product, Publishing,
 * Commerce, Intelligence) resolve DS-5.1's own flagged "Products" (plural)
 * vs "Product Platform" (singular) naming discrepancy by standardizing on
 * singular-plus-Workspace-suffix here. No implementation — architecture
 * only, per this package's own instruction.
 */
const WORK_ORDER_NAMES: { name: string; adoptionTargetId: string; suggestedCategory: string }[] = [
  { name: "Production Workspace", adoptionTargetId: "Production", suggestedCategory: "workspace-feature" },
  { name: "Product Workspace", adoptionTargetId: "Products", suggestedCategory: "workspace-feature" },
  { name: "Publishing Workspace", adoptionTargetId: "Publishing", suggestedCategory: "workspace-feature" },
  { name: "Commerce Workspace", adoptionTargetId: "Commerce", suggestedCategory: "workspace-feature" },
  { name: "Intelligence Workspace", adoptionTargetId: "Intelligence", suggestedCategory: "workspace-feature" },
  { name: "Settings", adoptionTargetId: "Settings", suggestedCategory: "configuration-feature" },
  { name: "Administration", adoptionTargetId: "Administration", suggestedCategory: "management-feature" },
  { name: "Automation", adoptionTargetId: "Automation", suggestedCategory: "automation-feature" },
  { name: "Planning", adoptionTargetId: "Planning", suggestedCategory: "workspace-feature" },
  { name: "Creative", adoptionTargetId: "Creative", suggestedCategory: "workspace-feature" },
];

function resolveCandidate(entry: { name: string; adoptionTargetId: string; suggestedCategory: string }): CandidateFeature {
  const target = ADOPTION_TARGETS.find((t) => t.candidate === entry.adoptionTargetId);
  if (!target) {
    throw new Error(`No DS-5.1 Adoption Target found for "${entry.adoptionTargetId}"`);
  }
  return {
    name: entry.name,
    adoptionTargetId: entry.adoptionTargetId,
    verdict: target.verdict,
    verdictLabel: VERDICT_LABEL[target.verdict],
    finding: target.finding,
    suggestedCategory: entry.suggestedCategory,
  };
}

export const CANDIDATE_FEATURES: CandidateFeature[] = WORK_ORDER_NAMES.map(resolveCandidate);

export const CANDIDATE_SUMMARY =
  "All ten candidates and their underlying findings are DS-5.1's own — this page adds a suggested Feature Category to each, nothing more. Five (Production, Product, Publishing, Commerce, Intelligence Workspace) are Platform-certified and category-obvious: Workspace Feature. Administration maps to Management Feature; Settings maps to the renamed Configuration Feature; Automation maps to the new Automation Feature category, grounded in Operations Platform's own partial OperationsAutomation coverage. Planning and Creative have no Platform-tier coverage at all, per DS-5.1's own finding — Workspace Feature is suggested as their eventual category on the assumption a future DS-4.x-style platform precedes them, not as a claim that one exists today.";
