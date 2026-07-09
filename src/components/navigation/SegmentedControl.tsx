/**
 * SegmentedControl already exists as a real, working component at src/components/ui/SegmentedControl.tsx
 * (a radiogroup-pattern choice input, not a view-switching navigation pattern — see Tabs.tsx for that).
 * It's re-exported here rather than rebuilt, matching this codebase's existing precedent
 * (src/components/metadata/DescriptionList.tsx re-exports src/components/layout/DescriptionList.tsx)
 * for a component that legitimately belongs to more than one family.
 */
export { SegmentedControl, type SegmentedControlOption, type SegmentedControlProps } from "@/components/ui";
