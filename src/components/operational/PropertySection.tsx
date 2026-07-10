/**
 * Re-export, not a rebuild. Inspector Panel's own InspectorSection (built in
 * DS-2.5.2) already covers this — a collapsible, titled top-level region —
 * with nothing inspector-specific in its implementation.
 */
export { InspectorSection as PropertySection } from "./InspectorSection";
