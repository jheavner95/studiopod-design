/**
 * Re-export, not a rebuild. Inspector Panel's own shell (header, optional
 * tabs, scrollable section content, footer, loading/empty states) is
 * already fully generic — the same precedent Status & Health's StatusPanel
 * already established for the identical composition. Composes
 * InspectorPanel directly rather than through Workflow's own root shell,
 * since a review doesn't need Workflow's added sidebar/two-column layout —
 * upgrade to ApprovalFlow/Workflow if a real screen later needs one.
 */
export { InspectorPanel as ReviewPanel, type InspectorPanelProps as ReviewPanelProps } from "@/components/operational";
