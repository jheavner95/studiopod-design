/**
 * Re-export, not a rebuild. src/components/ui/Skeleton.tsx already covers this —
 * the same shared-ownership precedent as Navigation's SegmentedControl or this
 * family's own ValidationSummary. Extended with a `variant` prop (text/block/circle)
 * in this package to close the real gap already recorded against it in the
 * Foundation Component Catalog's "skeleton" entry (requiredVariants: Text line,
 * Block, Circle (avatar)) — every existing caller only ever passed className, so
 * the new prop defaulting to "block" is a no-op for them.
 */
export { Skeleton, type SkeletonVariant } from "@/components/ui";
