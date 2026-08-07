/**
 * Metadata presentation and layout share one DescriptionList — never
 * two implementations of the same label/value list. This file exists
 * so the metadata system's own import path is complete, but the real
 * component lives in the foundation layout system.
 */
export { DescriptionList, type DescriptionListItem, type DescriptionListLayout } from "@/components/layout/DescriptionList";
