/**
 * Re-export, not a rebuild. Foundation Metadata's own StatusSummary
 * (a row of status Badges) already covers this exactly — nothing
 * object-specific in its own implementation — so this system reuses it
 * directly under the operational family, the same shared-ownership
 * precedent as DescriptionList and SegmentedControl before it.
 */
export { StatusSummary, type StatusSummaryItem } from "@/components/metadata";
