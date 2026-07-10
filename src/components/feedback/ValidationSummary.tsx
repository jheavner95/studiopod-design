/**
 * Re-export, not a rebuild. src/components/form/ValidationSummary.tsx already
 * covers this exactly — an aggregate list of a form's field errors/warnings,
 * built on Surface directly — the same shared-ownership precedent as
 * src/components/layout/DescriptionList.tsx being re-exported from the
 * metadata family, or Navigation's SegmentedControl.
 */
export { ValidationSummary, type ValidationSummaryItem } from "@/components/form";
