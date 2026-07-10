/**
 * Re-export, not a rebuild. Inspector Panel's own InspectorPanel (built in
 * DS-2.5.2) already covers the panel shell this family needs — sticky
 * header/footer, a Foundation Layout ScrollArea body, Foundation Feedback's
 * LoadingState/EmptyState — none of which is specific to inspecting versus
 * editing. Property Panel's own identity comes from what's composed
 * *inside* it (PropertySection/PropertyGroup/PropertyRow), not a second
 * copy of the same chrome.
 */
export { InspectorPanel as PropertyPanel, type InspectorPanelProps as PropertyPanelProps } from "./InspectorPanel";
