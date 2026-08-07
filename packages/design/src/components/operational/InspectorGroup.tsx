/**
 * Re-export, not a rebuild. Foundation Metadata's PropertyGroup already
 * covers this exactly — a titled grid that arranges whatever children it's
 * given without caring whether they're read-only (MetadataField) or
 * editable (an InspectorProperty in edit mode) — the same shared-ownership
 * precedent as this family's other thin re-exports (Navigation's
 * SegmentedControl, Feedback's Skeleton).
 */
export { PropertyGroup as InspectorGroup } from "@/components/metadata";
