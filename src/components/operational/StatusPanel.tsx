/**
 * Re-export, not a rebuild. Inspector Panel's own shell (header, optional
 * tabs, scrollable section content, footer, loading/empty states) is
 * already fully generic — nothing inspector-specific in its own
 * implementation — so this system reuses it directly under a
 * family-appropriate name, the same precedent Property Panel already
 * established for PropertyPanel/PropertySection/PropertyGroup/PropertyActions.
 */
export { InspectorPanel as StatusPanel, type InspectorPanelProps as StatusPanelProps } from "./InspectorPanel";
